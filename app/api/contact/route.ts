import { NextResponse } from "next/server";

const TURNSTILE_VERIFY_ENDPOINT =
  "https://challenges.cloudflare.com/turnstile/v0/siteverify";
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

// Ne fait qu'attester "ce n'est pas un robot" : Web3Forms (plan gratuit)
// refuse les soumissions serveur-à-serveur, donc l'envoi réel de l'email
// est fait par le client une fois cette vérification passée.
export async function POST(req: Request) {
  const data = await req.formData();

  if (data.get("botcheck")) {
    return NextResponse.json(
      { success: false, message: "Requête invalide." },
      { status: 400 }
    );
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

  if (TURNSTILE_SECRET) {
    const token = String(data.get("cf-turnstile-response") ?? "");
    const remoteip =
      req.headers.get("cf-connecting-ip") ?? req.headers.get("x-forwarded-for");
    if (!token) {
      return NextResponse.json(
        { success: false, message: "Vérification anti-robot manquante." },
        { status: 400 }
      );
    }
    try {
      if (!(await verifyTurnstile(token, remoteip))) {
        return NextResponse.json(
          { success: false, message: "Vérification anti-robot échouée." },
          { status: 400 }
        );
      }
    } catch {
      return NextResponse.json(
        { success: false, message: "Erreur de vérification, réessaie." },
        { status: 502 }
      );
    }
  }

  return NextResponse.json({ success: true });
}
