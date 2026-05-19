"use client";

import { useState } from "react";

const ENDPOINT = "https://api.web3forms.com/submit";
const ACCESS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY ?? "";

type Status = "idle" | "sending" | "success" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState<string>("");

  if (!ACCESS_KEY) {
    return (
      <div className="nf-contact-pending">
        <p>
          Le formulaire de contact est en cours de configuration. En attendant,
          écris-moi via{" "}
          <a
            href="https://github.com/nanog1980"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
          .
        </p>
      </div>
    );
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus("sending");
    setErrorMsg("");
    const formData = new FormData(form);
    formData.append("access_key", ACCESS_KEY);
    formData.append("from_name", "Nasforge — formulaire contact");
    formData.append("subject", `[Nasforge] ${formData.get("subject") || "Message"}`);

    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        form.reset();
        setStatus("success");
      } else {
        setStatus("error");
        setErrorMsg(data.message || "Une erreur est survenue.");
      }
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Erreur réseau.");
    }
  }

  if (status === "success") {
    return (
      <div className="nf-contact-success">
        <div className="nf-contact-success-icon">✓</div>
        <h3>Message envoyé.</h3>
        <p>
          Merci pour ton message — je te réponds dès que possible. Tu peux fermer
          cette page ou{" "}
          <button
            type="button"
            className="nf-contact-again"
            onClick={() => setStatus("idle")}
          >
            écrire un autre message
          </button>
          .
        </p>
      </div>
    );
  }

  return (
    <form className="nf-contact-form" onSubmit={onSubmit} noValidate>
      <div className="nf-contact-row">
        <label className="nf-contact-field">
          <span>Nom</span>
          <input
            type="text"
            name="name"
            required
            autoComplete="name"
            placeholder="Ton nom ou pseudo"
            disabled={status === "sending"}
          />
        </label>
        <label className="nf-contact-field">
          <span>Email</span>
          <input
            type="email"
            name="email"
            required
            autoComplete="email"
            placeholder="toi@exemple.fr"
            disabled={status === "sending"}
          />
        </label>
      </div>
      <label className="nf-contact-field">
        <span>Sujet</span>
        <input
          type="text"
          name="subject"
          required
          placeholder="Question hardware, retour sur un tuto, suggestion…"
          disabled={status === "sending"}
        />
      </label>
      <label className="nf-contact-field">
        <span>Message</span>
        <textarea
          name="message"
          required
          rows={7}
          placeholder="Ton message…"
          disabled={status === "sending"}
        />
      </label>
      {/* Honeypot field — bots fill it, humans don't see it */}
      <input
        type="checkbox"
        name="botcheck"
        style={{ display: "none" }}
        tabIndex={-1}
        autoComplete="off"
      />
      <div className="nf-contact-actions">
        <button
          type="submit"
          className="nf-btn-primary"
          disabled={status === "sending"}
        >
          {status === "sending" ? "Envoi en cours…" : "Envoyer →"}
        </button>
        {status === "error" && (
          <p className="nf-contact-error">Erreur : {errorMsg}</p>
        )}
      </div>
      <p className="nf-contact-privacy">
        Ton email reste privé — il n&apos;est utilisé que pour ma réponse, jamais
        partagé ni stocké ailleurs que dans ma boîte mail.
      </p>
    </form>
  );
}
