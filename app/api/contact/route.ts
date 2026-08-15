import { NextResponse } from "next/server";

const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";
const TURNSTILE_VERIFY_ENDPOINT =
  "https://challenges.cloudflare.com/turnstile/v0/siteverify";
const ACCESS_KEY = process.env.WEB3FORMS_KEY ?? "";
const TURNSTILE_SECRET = process.env.TURNSTILE_SECRET_KEY ?? "";

async function verifyTurnstile(token: string, remoteip: string | null) {
  const body = new URLSearchParams();
  body.append("secret", TURNSTILE_SECRET);
  body.append("response", token);
  if (remoteip) body.append("remoteip", remoteip);

  const res = await fetch(TURNSTILE_VERIFY_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
  });
  const result = await res.json();
  return result.success === true;
}

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

  if (TURNSTILE_SECRET) {
    const token = String(data.get("cf-turnstile-response") ?? "");
    const remoteip =
      req.headers.get("cf-connecting-ip") ?? req.headers.get("x-forwarded-for");
    if (!token || !(await verifyTurnstile(token, remoteip))) {
      return NextResponse.json(
        { success: false, message: "Vérification anti-robot échouée." },
        { status: 400 }
      );
    }
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
