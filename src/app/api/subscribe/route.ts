import mailchimp from "@mailchimp/mailchimp_marketing";
import { NextResponse } from "next/server";

mailchimp.setConfig({
  apiKey: process.env.MAILCHIMP_API_KEY!,
  server: process.env.MAILCHIMP_API_SERVER!,
});

type MailchimpError = {
  status?: number;
  response?: {
    body?: {
      title?: string;
      detail?: string;
      status?: number;
      errors?: Array<{ field?: string; message?: string }>;
    };
  };
};

const getMailchimpErrorMessage = (error: MailchimpError) => {
  const detail = error.response?.body?.detail;
  if (detail) return detail;
  const title = error.response?.body?.title;
  if (title) return title;
  return "Une erreur est survenue. Veuillez réessayer.";
};

export async function POST(request: Request) {
  try {
    if (
      !process.env.MAILCHIMP_API_KEY ||
      !process.env.MAILCHIMP_API_SERVER ||
      !process.env.MAILCHIMP_LIST_ID
    ) {
      return NextResponse.json(
        { error: "Configuration Mailchimp manquante." },
        { status: 500 },
      );
    }

    const { email } = (await request.json()) as { email: string };

    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { error: "Adresse e-mail invalide" },
        { status: 400 },
      );
    }

    const response = await mailchimp.lists.addListMember(
      process.env.MAILCHIMP_LIST_ID!,
      {
        email_address: email,
        status: "subscribed",
      },
    );

    return NextResponse.json(
      { message: "Abonné avec succès", data: response },
      { status: 201 },
    );
  } catch (error) {
    const mailchimpError = error as MailchimpError;
    const status =
      mailchimpError.status || mailchimpError.response?.body?.status || 500;
    const message = getMailchimpErrorMessage(mailchimpError);

    console.error("Erreur de souscription Mailchimp :", mailchimpError);
    return NextResponse.json({ error: message }, { status });
  }
}
