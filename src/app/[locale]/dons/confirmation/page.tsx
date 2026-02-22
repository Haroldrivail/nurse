"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { CheckCircle, XCircle, Clock, ArrowRight, Home } from "lucide-react";
import Reveal from "@/components/motion/reveal";
import { useTranslations } from "next-intl";
import confetti from "canvas-confetti";

type ConfirmationStatus = "loading" | "successful" | "cancelled" | "pending";

function ConfirmationContent() {
  const t = useTranslations("confirmation");
  const searchParams = useSearchParams();
  const txRef = searchParams.get("tx_ref");

  // Initialize state based on txRef to avoid synchronous setState in useEffect
  const [status, setStatus] = useState<ConfirmationStatus>(
    txRef ? "loading" : "cancelled",
  );
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!txRef) {
      return;
    }

    const transactionId = searchParams.get("transaction_id");
    const flwStatus = searchParams.get("status");

    const params = new URLSearchParams();
    params.set("tx_ref", txRef);
    if (transactionId) params.set("transaction_id", transactionId);
    if (flwStatus) params.set("status", flwStatus);

    fetch(`/api/donate/verify?${params.toString()}`)
      .then((res) => res.json())
      .then((data) => {
        setStatus(data.status as ConfirmationStatus);
        setMessage(data.message);

        // Célébration si succès
        if (data.status === "successful") {
          confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.6 },
            colors: ["#be123c", "#fbbf24", "#10b981"], // Couleurs Nurse Hilfe
          });
        }
      })
      .catch(() => {
        setStatus("pending");
        setMessage(t("verifying"));
      });
  }, [searchParams, t, txRef]);

  const config = {
    successful: {
      icon: <CheckCircle className="h-20 w-20 text-success" />,
      title: t("success"),
      bg: "bg-success/5",
      border: "border-success/20",
    },
    cancelled: {
      icon: <XCircle className="h-20 w-20 text-error" />,
      title: t("cancelled"),
      bg: "bg-error/5",
      border: "border-error/20",
    },
    pending: {
      icon: <Clock className="h-20 w-20 text-warning" />,
      title: t("pending"),
      bg: "bg-warning/5",
      border: "border-warning/20",
    },
    loading: {
      icon: (
        <span className="loading loading-spinner loading-lg text-primary scale-150" />
      ),
      title: t("verifying"),
      bg: "bg-base-200",
      border: "border-base-300",
    },
  };

  const current = config[status];

  return (
    <section className="min-h-[80vh] flex items-center justify-center bg-base-200/30 px-4 py-20">
      <Reveal from="up">
        <div
          className={`card w-full max-w-lg bg-base-100 shadow-2xl rounded-[3rem] overflow-hidden border ${current.border}`}
        >
          {/* Header coloré selon le statut */}
          <div
            className={`h-3 w-full ${status === "successful" ? "bg-success" : status === "cancelled" ? "bg-error" : "bg-primary"}`}
          />

          <div className="card-body items-center text-center p-10 md:p-16">
            <div className={`mb-8 p-6 rounded-full ${current.bg}`}>
              {current.icon}
            </div>

            <h1 className="text-4xl font-black tracking-tighter mb-4 italic">
              {current.title}
            </h1>

            <p className="text-base-content/70 leading-relaxed text-lg mb-10">
              {message || (status === "loading" ? "..." : "")}
            </p>

            <div className="flex flex-col w-full gap-3">
              {status === "successful" ? (
                <>
                  <Link
                    href="/impact"
                    className="btn btn-primary btn-block rounded-full shadow-lg shadow-primary/20"
                  >
                    {t("seeImpact")} <ArrowRight className="h-4 w-4 ml-2" />
                  </Link>
                  <Link href="/" className="btn btn-ghost btn-sm opacity-60">
                    <Home className="h-4 w-4 mr-2" /> {t("backHome")}
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    href="/dons"
                    className="btn btn-primary btn-block rounded-full"
                  >
                    {t("retry")}
                  </Link>
                  <Link href="/" className="btn btn-ghost btn-block">
                    {t("backHome")}
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Footer de la carte */}
          <div className="bg-base-200/50 py-6 px-10 text-center border-t border-base-200">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-40">
              Nurse Hilfe Menschen Internationale — Merci pour votre confiance
            </p>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

export default function DonationConfirmation() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[80vh] flex items-center justify-center">
          <span className="loading loading-spinner loading-lg text-primary" />
        </div>
      }
    >
      <ConfirmationContent />
    </Suspense>
  );
}
