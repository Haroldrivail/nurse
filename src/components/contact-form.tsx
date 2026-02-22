"use client";

import { useState, useEffect, type FormEvent } from "react";
import { toast } from "react-toastify";

export default function ContactForm() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [profile, setProfile] = useState("");
  const [message, setMessage] = useState("");
  const [csrfToken, setCsrfToken] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("/api/csrf")
      .then((r) => r.json())
      .then((data) => setCsrfToken(data.token))
      .catch(() => {});
  }, []);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (!firstName || !lastName || !email || !profile || !message) {
      toast.error("Veuillez remplir tous les champs.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-csrf-token": csrfToken,
        },
        body: JSON.stringify({ firstName, lastName, email, profile, message }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || "Erreur lors de l'envoi.");
        return;
      }

      toast.success(
        "Votre demande a été envoyée ! Nous vous recontacterons sous 72h.",
      );
      setFirstName("");
      setLastName("");
      setEmail("");
      setProfile("");
      setMessage("");
    } catch {
      toast.error("Erreur de connexion. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-4">
      <div className="grid gap-4 sm:grid-cols-2 w-full">
        <input
          className="input input-bordered"
          placeholder="Prénom"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
        <input
          className="input input-bordered"
          placeholder="Nom"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />
      </div>
      <input
        type="email"
        className="input input-bordered w-full"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <select
        className="select select-bordered w-full"
        value={profile}
        onChange={(e) => setProfile(e.target.value)}
        required
      >
        <option value="">Type d&apos;engagement</option>
        <option value="benevolat">Bénévolat</option>
        <option value="partenariat">Partenariat</option>
        <option value="collecte">Collecte solidaire</option>
      </select>
      <textarea
        className="textarea textarea-bordered w-full"
        rows={4}
        placeholder="Décrivez votre projet ou vos disponibilités"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        required
      />
      <button type="submit" className="btn btn-primary" disabled={loading}>
        {loading ? (
          <span className="loading loading-spinner loading-sm" />
        ) : (
          "Envoyer la demande"
        )}
      </button>
      <p className="text-xs text-base-content/60">
        En envoyant ce formulaire, vous acceptez d&apos;être recontacté par
        notre équipe.
      </p>
    </form>
  );
}
