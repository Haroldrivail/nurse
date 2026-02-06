"use client";
import { LoaderCircle, Mail, SendHorizonalIcon } from "lucide-react";
import { useState, type ReactNode } from "react";
import { toast } from "react-toastify";

type NewsletterVariant = "card" | "split" | "inline";

type NewsletterProps = {
  variant?: NewsletterVariant;
  id?: string;
  className?: string;
  eyebrow?: string;
  title?: string;
  description?: string;
  inputLabel?: string;
  placeholder?: string;
  buttonText?: string;
  note?: string;
  leadingIcon?: ReactNode;
  buttonIcon?: ReactNode;
  ariaLabel?: string;
};

export default function Newsletter({
  variant = "card",
  id,
  className,
  eyebrow,
  title,
  description,
  inputLabel,
  placeholder = "mail@example.com",
  buttonText = "S'abonner",
  note,
  leadingIcon,
  buttonIcon,
  ariaLabel = "Email pour la newsletter",
}: NewsletterProps) {
  const defaultLeadingIcon = <Mail className="h-4 w-4 text-base-content/50" />;
  const defaultButtonIcon = <SendHorizonalIcon className="h-4 w-4" />;
  leadingIcon = leadingIcon ?? defaultLeadingIcon;
  buttonIcon = buttonIcon ?? defaultButtonIcon;

  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [emailError, setEmailError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setEmailError("");
    if (!email) return;
    setIsLoading(true);

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(data?.message || "Merci pour votre inscription.");
        setEmail("");
      } else {
        toast.error(
          data?.error || "Une erreur est survenue. Veuillez réessayer.",
        );
      }
    } catch (error) {
      console.error(
        "Erreur de souscription Mailchimp lors de l'envoi de la requête :",
        error,
      );
      toast.error("Une erreur est survenue. Veuillez réessayer.");
    } finally {
      setIsLoading(false);
    }
  };

  const inputField = (
    <input
      type="email"
      className={`input input-bordered w-full ${emailError ? "input-error" : ""}`.trim()}
      placeholder={placeholder}
      value={email}
      onChange={(e) => {
        setEmail(e.target.value);
        if (emailError) setEmailError("");
      }}
      onInvalid={(event) => {
        event.preventDefault();
        setEmailError("Entrer une adresse email valide");
      }}
      onInput={(event) => {
        if (
          emailError &&
          (event.currentTarget as HTMLInputElement).validity.valid
        ) {
          setEmailError("");
        }
      }}
      aria-label={ariaLabel}
      required
      disabled={isLoading}
    />
  );

  const buttonLabel = isLoading ? (
    <>
      <span className="inline-block mr-2 animate-spin">
        <LoaderCircle className="inline-block rotate-0" />
      </span>
      En cours...
    </>
  ) : (
    buttonText
  );

  if (variant === "inline") {
    return (
      <div className={`text-sm ${className ?? ""}`.trim()}>
        {title ? <p className="text-base font-semibold">{title}</p> : null}
        {description ? (
          <p className="mt-3 text-base-content/70">{description}</p>
        ) : null}
        <form
          onSubmit={handleSubmit}
          className="mt-4 flex flex-col gap-2 sm:flex-row"
        >
          <label className="input flex w-full items-center gap-2 px-3 py-2">
            {leadingIcon}
            <input
              type="email"
              placeholder={placeholder}
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (emailError) setEmailError("");
              }}
              onInvalid={(event) => {
                event.preventDefault();
                setEmailError("Entrer une adresse email valide");
              }}
              onInput={(event) => {
                if (
                  emailError &&
                  (event.currentTarget as HTMLInputElement).validity.valid
                ) {
                  setEmailError("");
                }
              }}
              aria-label={ariaLabel}
              required
              disabled={isLoading}
            />
          </label>
          {emailError ? (
            <div className="text-xs text-error">{emailError}</div>
          ) : null}
          <button
            className="btn btn-primary whitespace-nowrap gap-2"
            disabled={isLoading}
          >
            <span>{buttonLabel}</span>
            {buttonIcon}
          </button>
        </form>
        {note ? (
          <p className="mt-3 text-xs text-base-content/60">{note}</p>
        ) : null}
      </div>
    );
  }

  if (variant === "split") {
    return (
      <section className={`bg-base-200/60 ${className ?? ""}`.trim()}>
        <div className="w-full p-2 ">
          <div className="flex flex-col gap-3 md:items-center md:justify-between">
            <div>
              {eyebrow ? (
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
                  {eyebrow}
                </p>
              ) : null}
              {title ? (
                <h2 className="mt-3 text-3xl font-semibold text-center">
                  {title}
                </h2>
              ) : null}
              {description ? (
                <p className="mt-4 text-base text-base-content/70">
                  {description}
                </p>
              ) : null}
            </div>
            <div className="card bg-base-100 shadow">
              <div className="card-body">
                <form onSubmit={handleSubmit} className="space-y-3">
                  {inputLabel ? (
                    <label className="text-sm font-semibold">
                      {inputLabel}
                    </label>
                  ) : null}
                  {leadingIcon ? (
                    <>
                      <label className="input flex w-full items-center gap-2 px-3 py-2">
                        {leadingIcon}
                        <input
                          type="email"
                          placeholder={placeholder}
                          value={email}
                          onChange={(e) => {
                            setEmail(e.target.value);
                            if (emailError) setEmailError("");
                          }}
                          onInvalid={(event) => {
                            event.preventDefault();
                            setEmailError("Entrer une adresse email valide");
                          }}
                          onInput={(event) => {
                            if (
                              emailError &&
                              (event.currentTarget as HTMLInputElement).validity
                                .valid
                            ) {
                              setEmailError("");
                            }
                          }}
                          aria-label={ariaLabel}
                          required
                          disabled={isLoading}
                        />
                      </label>
                      {emailError ? (
                        <div className="text-xs text-error">{emailError}</div>
                      ) : null}
                    </>
                  ) : (
                    inputField
                  )}
                  <button
                    type="submit"
                    className="btn btn-primary w-full whitespace-nowrap gap-2"
                    disabled={isLoading}
                  >
                    <span>{buttonLabel}</span>
                    {buttonIcon}
                  </button>
                  {note ? (
                    <p className="text-xs text-base-content/60">{note}</p>
                  ) : null}
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id={id} className={`bg-base-200/60 ${className ?? ""}`.trim()}>
      <div className="mx-auto w-full max-w-6xl px-4 py-16 md:py-20">
        <div className="card bg-base-100 shadow">
          <div className="card-body md:flex-row md:items-center md:justify-between">
            <div>
              {eyebrow ? (
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
                  {eyebrow}
                </p>
              ) : null}
              {title ? (
                <h3 className="mt-2 text-3xl font-semibold">{title}</h3>
              ) : null}
              {description ? (
                <p className="mt-2 text-sm text-base-content/70">
                  {description}
                </p>
              ) : null}
            </div>
            <form
              onSubmit={handleSubmit}
              className="mt-4 flex w-full flex-col gap-2 md:mt-0 md:max-w-md md:flex-row"
            >
              <div className="w-full flex items-center gap-2">
                {leadingIcon ? (
                  <>
                    <label className="input flex w-full items-center gap-2 px-3 py-2">
                      {leadingIcon}
                      <input
                        type="email"
                        placeholder={placeholder}
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          if (emailError) setEmailError("");
                        }}
                        onInvalid={(event) => {
                          event.preventDefault();
                          setEmailError("Entrer une adresse email valide");
                        }}
                        onInput={(event) => {
                          if (
                            emailError &&
                            (event.currentTarget as HTMLInputElement).validity
                              .valid
                          ) {
                            setEmailError("");
                          }
                        }}
                        aria-label={ariaLabel}
                        required
                        disabled={isLoading}
                      />
                    </label>
                    {emailError ? (
                      <div className="text-xs text-error">{emailError}</div>
                    ) : null}
                  </>
                ) : (
                  inputField
                )}
              </div>
              <button
                className="btn btn-primary flex items-center gap-2"
                disabled={isLoading}
              >
                {buttonLabel}
                {buttonIcon}
              </button>
              {emailError ? (
                <div className="mt-2 text-xs text-error">{emailError}</div>
              ) : null}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
