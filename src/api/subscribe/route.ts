import mailchimp from "@mailchimp/mailchimp_marketing";
import { NextResponse } from "next/server";

mailchimp.setConfig({
  apiKey: process.env.MAILCHIMP_API_KEY!,
  server: process.env.MAILCHIMP_API_SERVER!,
});

export async function POST(request: Request) {
  try {
    const { email } = (await request.json()) as { email: string };

    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { error: "Cette adresse e-mail est invalide" },
        { status: 400 }
      );
    }

    const response = await mailchimp.lists.addListMember(
      process.env.MAILCHIMP_LIST_ID!,
      {
        email_address: email,
        status: "subscribed",
      }
    );

    return NextResponse.json(
      { message: "Vous êtes abonné à la newsletter", data: response },
      { status: 201 }
    );
  } catch (error) {
    console.error("Erreur de souscription Mailchimp :", error);
    return NextResponse.json({ error: "Cet email est déjà abonné à la newsletter" }, { status: 500 });
  }
}
