import mailchimp from "@mailchimp/mailchimp_marketing";
import { NextResponse } from "next/server";

const MAILCHIMP_API_KEY = process.env.MAILCHIMP_API_KEY;
const MAILCHIMP_API_SERVER = process.env.MAILCHIMP_API_SERVER;
const MAILCHIMP_LIST_ID = process.env.MAILCHIMP_LIST_ID;

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null;

if (MAILCHIMP_API_KEY && MAILCHIMP_API_SERVER) {
  mailchimp.setConfig({
    apiKey: MAILCHIMP_API_KEY,
    server: MAILCHIMP_API_SERVER,
  });
}

export async function POST(request: Request) {
  try {
    if (!MAILCHIMP_API_KEY || !MAILCHIMP_API_SERVER || !MAILCHIMP_LIST_ID) {
      return NextResponse.json(
        {
          error:
            "Service newsletter indisponible. Veuillez configurer Mailchimp.",
        },
        { status: 500 },
      );
    }

    const { email } = (await request.json()) as { email: string };

    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { error: "Cette adresse e-mail est invalide" },
        { status: 400 },
      );
    }

    const response = await mailchimp.lists.addListMember(MAILCHIMP_LIST_ID, {
      email_address: email,
      status: "subscribed",
    });

    return NextResponse.json(
      { message: "Vous êtes abonné à la newsletter", data: response },
      { status: 201 },
    );
  } catch (error: unknown) {
    const errorRecord = isRecord(error) ? error : {};
    const response = isRecord(errorRecord.response) ? errorRecord.response : {};
    const body = isRecord(response.body)
      ? response.body
      : isRecord(response.data)
        ? response.data
        : response;

    const status =
      typeof errorRecord.status === "number"
        ? errorRecord.status
        : typeof response.status === "number"
          ? response.status
          : undefined;
    const title =
      typeof errorRecord.title === "string"
        ? errorRecord.title
        : typeof body.title === "string"
          ? body.title
          : "";
    const detail =
      typeof errorRecord.detail === "string"
        ? errorRecord.detail
        : typeof body.detail === "string"
          ? body.detail
          : "";

    const alreadySubscribed =
      status === 400 &&
      (title.toLowerCase().includes("member exists") ||
        detail.toLowerCase().includes("already a list member") ||
        detail.toLowerCase().includes("déjà"));

    if (alreadySubscribed) {
      return NextResponse.json(
        { message: "Cet email est déjà abonné à la newsletter" },
        { status: 200 },
      );
    }

    if (status === 401 || status === 403) {
      return NextResponse.json(
        {
          error:
            "Accès Mailchimp refusé. Vérifiez MAILCHIMP_API_KEY et MAILCHIMP_API_SERVER.",
        },
        { status: 502 },
      );
    }

    if (status === 404) {
      return NextResponse.json(
        {
          error: "Liste Mailchimp introuvable. Vérifiez MAILCHIMP_LIST_ID.",
        },
        { status: 502 },
      );
    }

    console.error("Erreur de souscription Mailchimp :", error);
    return NextResponse.json(
      {
        error: "Erreur serveur. Veuillez réessayer.",
        ...(process.env.NODE_ENV !== "production"
          ? {
              debug: {
                status,
                title,
                detail,
              },
            }
          : {}),
      },
      { status: status ?? 500 },
    );
  }
}
