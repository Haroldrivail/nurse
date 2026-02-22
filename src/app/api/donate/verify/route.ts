import { NextResponse } from "next/server";
import { createServiceSupabase } from "@/lib/supabase/server";

/**
 * Donation confirmation callback.
 * After Flutterwave redirects the user back, this route verifies
 * the transaction and shows a confirmation status.
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const txRef = searchParams.get("tx_ref");
  const transactionId = searchParams.get("transaction_id");
  const status = searchParams.get("status");

  if (!txRef) {
    return NextResponse.json(
      { error: "Référence de transaction manquante." },
      { status: 400 },
    );
  }

  /* ── If Flutterwave says cancelled, update DB ──────── */
  if (status === "cancelled") {
    const supabase = createServiceSupabase();
    await supabase
      .from("donations")
      .update({ status: "cancelled" })
      .eq("tx_ref", txRef);

    return NextResponse.json({
      status: "cancelled",
      message: "Le paiement a été annulé.",
    });
  }

  /* ── Verify with Flutterwave ───────────────────────── */
  if (transactionId) {
    try {
      const verifyResponse = await fetch(
        `https://api.flutterwave.com/v3/transactions/${transactionId}/verify`,
        {
          headers: {
            Authorization: `Bearer ${process.env.FLW_SECRET_KEY}`,
          },
        },
      );

      const verifyData = await verifyResponse.json();
      const verified =
        verifyData.status === "success" &&
        verifyData.data.status === "successful";

      if (verified) {
        const supabase = createServiceSupabase();
        await supabase
          .from("donations")
          .update({
            status: "successful",
            flw_ref: verifyData.data.flw_ref,
            amount: verifyData.data.amount,
            currency: verifyData.data.currency,
          })
          .eq("tx_ref", txRef);
      }

      return NextResponse.json({
        status: verified ? "successful" : "pending",
        message: verified
          ? "Merci pour votre don ! Votre contribution fait la différence."
          : "Votre paiement est en cours de vérification.",
        txRef,
      });
    } catch {
      return NextResponse.json({
        status: "pending",
        message:
          "Vérification en cours. Vous recevrez un e-mail de confirmation.",
        txRef,
      });
    }
  }

  return NextResponse.json({
    status: "pending",
    message: "Transaction en attente de confirmation.",
    txRef,
  });
}
