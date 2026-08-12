import { NextResponse } from "next/server";

const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";
const ACCESS_KEY = process.env.WEB3FORMS_KEY ?? "";

export async function POST(req: Request) {
  if (!ACCESS_KEY) {
    return NextResponse.json(
      { success: false, message: "Formulaire non configuré." },
      { status: 503 }
    );
  }

  const data = await req.formData();

  // Honeypot : un bot qui remplit ce champ caché reçoit une réponse "succès"
  // sans qu'aucun email ne parte, pour ne rien lui laisser deviner.
  if (data.get("botcheck")) {
    return NextResponse.json({ success: true });
  }

  const name = String(data.get("name") ?? "").trim();
  const email = String(data.get("email") ?? "").trim();
  const subject = String(data.get("subject") ?? "").trim();
  const message = String(data.get("message") ?? "").trim();
  if (!name || !email || !subject || !message) {
    return NextResponse.json(
      { success: false, message: "Champs requis manquants." },
      { status: 400 }
    );
  }

  const forward = new FormData();
  forward.append("access_key", ACCESS_KEY);
  forward.append("name", name);
  forward.append("email", email);
  forward.append("message", message);
  forward.append("from_name", "Nasforge — formulaire contact");
  forward.append("subject", `[Nasforge] ${subject}`);

  try {
    const res = await fetch(WEB3FORMS_ENDPOINT, { method: "POST", body: forward });
    const result = await res.json();
    return NextResponse.json(result, { status: res.status });
  } catch {
    return NextResponse.json(
      { success: false, message: "Erreur réseau, réessaie plus tard." },
      { status: 502 }
    );
  }
}
