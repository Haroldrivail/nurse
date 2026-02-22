import { NextResponse } from "next/server";
import { createServiceSupabase } from "@/lib/supabase/server";

/**
 * Flutterwave Webhook handler.
 * Verifies payment status and updates the donation record.
 *
 * Set this URL in your Flutterwave dashboard:
 *   https://your-domain.com/api/donate/webhook
 */
export async function POST(request: Request) {
  /* ── Verify webhook hash ───────────────────────────── */
  const hash = request.headers.get("verif-hash");
  const expectedHash = process.env.FLW_WEBHOOK_HASH;

  if (!expectedHash || hash !== expectedHash) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  /* ── Parse payload ─────────────────────────────────── */
  let payload: {
    event: string;
    data: {
      id: number;
      tx_ref: string;
      flw_ref: string;
      amount: number;
      currency: string;
      status: string;
      payment_type: string;
      customer: {
        email: string;
        name: string;
        phone_number?: string;
      };
    };
  };

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  if (payload.event !== "charge.completed") {
    // We only process completed charges
    return NextResponse.json({ received: true });
  }

  const { data } = payload;

  /* ── Verify transaction with Flutterwave ───────────── */
  try {
    const verifyResponse = await fetch(
      `https://api.flutterwave.com/v3/transactions/${data.id}/verify`,
      {
        headers: {
          Authorization: `Bearer ${process.env.FLW_SECRET_KEY}`,
        },
      },
    );

    const verifyData = await verifyResponse.json();

    if (
      verifyData.status !== "success" ||
      verifyData.data.status !== "successful"
    ) {
      console.error("Payment verification failed:", verifyData);

      // Update DB with failed status
      const supabase = createServiceSupabase();
      await supabase
        .from("donations")
        .update({ status: "failed", flw_ref: data.flw_ref })
        .eq("tx_ref", data.tx_ref);

      return NextResponse.json(
        { error: "Verification failed" },
        { status: 400 },
      );
    }

    /* ── Update donation to success ──────────────────── */
    const supabase = createServiceSupabase();
    const { error } = await supabase
      .from("donations")
      .update({
        status: "successful",
        flw_ref: data.flw_ref,
        amount: verifyData.data.amount,
        currency: verifyData.data.currency,
        payment_method: verifyData.data.payment_type,
      })
      .eq("tx_ref", data.tx_ref);

    if (error) {
      console.error("Donation update error:", error);
      return NextResponse.json(
        { error: "Database update failed" },
        { status: 500 },
      );
    }

    return NextResponse.json({ received: true, status: "success" });
  } catch (err) {
    console.error("Webhook processing error:", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
