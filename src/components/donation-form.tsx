"use client";

import { useState, useEffect, type FormEvent } from "react";
import { CreditCard, Smartphone } from "lucide-react";
import { toast } from "react-toastify";
import { useCurrency } from "@/hooks/use-currency"; // Import du hook de localisation

const PROJECTS = [
  "Urgence & premiers secours",
  "Santé maternelle",
  "Cliniques mobiles",
  "Nutrition & prévention",
];

type PaymentMethod = "card" | "orange_money" | "mtn_mobile_money";

export default function DonationForm() {
  // --- Utilisation du hook de monnaie ---
  const { formatter, amounts: suggestedAmounts, currency } = useCurrency();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [donationType, setDonationType] = useState<"ponctuel" | "mensuel">(
    "ponctuel",
  );
  const [project, setProject] = useState(PROJECTS[0]);

  // Initialiser avec le deuxième montant suggéré (souvent le plus populaire)
  const [amount, setAmount] = useState<number>(suggestedAmounts[1]);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("card");
  const [csrfToken, setCsrfToken] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("/api/csrf")
      .then((r) => r.json())
      .then((data) => setCsrfToken(data.token))
      .catch(() => {});
  }, []);

  // Synchroniser le montant par défaut si les suggestions changent (chargement client)
  useEffect(() => {
    setAmount(suggestedAmounts[1]);
  }, [suggestedAmounts]);

  const isMobileMoney =
    paymentMethod === "orange_money" || paymentMethod === "mtn_mobile_money";

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (!firstName || !lastName || !email) {
      toast.error("Veuillez remplir tous les champs obligatoires.");
      return;
    }
    if (isMobileMoney && (!phone || phone.length < 8)) {
      toast.error("Numéro de téléphone valide requis.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/donate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-csrf-token": csrfToken,
        },
        body: JSON.stringify({
          amount,
          currency: currency, // Utilise la devise détectée par le hook
          email: email.trim(),
          name: `${firstName.trim()} ${lastName.trim()}`,
          phone: phone.trim(),
          paymentMethod,
          project,
          recurring: donationType === "mensuel",
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      if (data.paymentLink) window.location.href = data.paymentLink;
    } catch (err) {
      const message = err instanceof Error ? err.message : "Une erreur est survenue.";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="card-body gap-6">
      <div className="border-b border-base-300 pb-2">
        <h3 className="text-xl font-bold">Détails du don</h3>
      </div>

      {/* --- Informations Personnelles --- */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="form-control">
          <label
            className="label text-xs font-semibold uppercase"
            htmlFor="donation-firstname"
          >
            Prénom <span className="text-error">*</span>
          </label>
          <input
            id="donation-firstname"
            className="input input-bordered focus:input-primary"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
            autoComplete="given-name"
            placeholder="Votre prénom"
          />
        </div>
        <div className="form-control">
          <label
            className="label text-xs font-semibold uppercase"
            htmlFor="donation-lastname"
          >
            Nom <span className="text-error">*</span>
          </label>
          <input
            id="donation-lastname"
            className="input input-bordered focus:input-primary"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
            autoComplete="family-name"
            placeholder="Votre nom"
          />
        </div>
        <div className="form-control sm:col-span-2">
          <label
            className="label text-xs font-semibold uppercase"
            htmlFor="donation-email"
          >
            Email <span className="text-error">*</span>
          </label>
          <input
            id="donation-email"
            className="input input-bordered focus:input-primary"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
            placeholder="ex: nom@domaine.com"
          />
        </div>
      </div>

      {/* --- Mode de Paiement --- */}
      <div className="form-control">
        <label className="label text-xs font-semibold uppercase mb-2">
          Mode de paiement
        </label>
        <div className="grid gap-3 sm:grid-cols-3">
          {[
            { id: "card", label: "Carte", icon: CreditCard },
            { id: "orange_money", label: "Orange", icon: Smartphone },
            { id: "mtn_mobile_money", label: "MTN", icon: Smartphone },
          ].map((method) => (
            <label
              key={method.id}
              className={`flex cursor-pointer flex-col items-center gap-2 rounded-xl border-2 p-3 transition-all ${
                paymentMethod === method.id
                  ? "border-primary bg-primary/5 ring-1 ring-primary"
                  : "border-base-300 hover:border-base-content/20"
              }`}
            >
              <input
                type="radio"
                className="hidden"
                checked={paymentMethod === method.id}
                onChange={() => setPaymentMethod(method.id as PaymentMethod)}
              />
              <method.icon
                className={`h-5 w-5 ${paymentMethod === method.id ? "text-primary" : ""}`}
              />
              <span className="text-xs font-medium">{method.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* --- Phone Input Mobile Money --- */}
      {isMobileMoney && (
        <div className="form-control animate-in fade-in slide-in-from-top-2 flex md:flex-row gap-4">
          <label className="label text-xs font-semibold uppercase">
            Téléphone
          </label>
          <input
            className="input input-primary border-2"
            placeholder="+237 6xx xxx xxx"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>
      )}

      {/* --- Montant Dynamique --- */}
      <div className="form-control">
        <label className="label text-xs font-semibold uppercase mb-2">
          Montant du don ({currency})
        </label>
        <div className="flex flex-wrap gap-2">
          {suggestedAmounts.map((val) => (
            <button
              key={val}
              type="button"
              className={`btn btn-md flex-1 ${amount === val ? "btn-primary" : "btn-outline"}`}
              onClick={() => setAmount(val)}
            >
              {/* Utilise le formateur pour afficher le prix localisé sur le bouton */}
              {formatter.format(val)}
            </button>
          ))}
          <div className="relative flex-1 min-w-[120px]">
            <input
              type="number"
              className="input input-bordered w-full pr-12"
              placeholder="Autre"
              onChange={(e) => setAmount(Number(e.target.value))}
            />
            <span className="absolute right-4 top-3 text-sm opacity-50">
              {currency}
            </span>
          </div>
        </div>
      </div>

      {/* --- Type & Projet --- */}
      <div className="grid gap-6 sm:grid-cols-2">
        <div className="form-control flex md:flex-row gap-4 md:items-center">
          <label className="label text-xs font-semibold uppercase">
            Fréquence
          </label>
          <div className="join">
            <button
              type="button"
              className={`join-item btn btn-sm flex-1 ${donationType === "ponctuel" ? "btn-active btn-primary" : ""}`}
              onClick={() => setDonationType("ponctuel")}
            >
              Une fois
            </button>
            <button
              type="button"
              className={`join-item btn btn-sm flex-1 ${donationType === "mensuel" ? "btn-active btn-primary" : ""}`}
              onClick={() => setDonationType("mensuel")}
            >
              Mensuel
            </button>
          </div>
        </div>
        <div className="form-control">
          <label className="label text-xs font-semibold uppercase">
            Affectation
          </label>
          <select
            className="select select-bordered select-sm w-full"
            value={project}
            onChange={(e) => setProject(e.target.value)}
          >
            {PROJECTS.map((p) => (
              <option key={p}>{p}</option>
            ))}
          </select>
        </div>
      </div>

      {/* --- Submit --- */}
      <div className="mt-4">
        <button
          type="submit"
          className="btn btn-primary btn-block btn-lg shadow-lg"
          disabled={loading}
        >
          {loading ? (
            <span className="loading loading-spinner" />
          ) : (
            `Soutenir`
          )}
        </button>
      </div>
    </form>
  );
}
