"use client";

import { useState, useRef, useEffect } from "react";
import { Facebook, Linkedin, Twitter, CheckCircle, Loader2 } from "lucide-react";

import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";

const HUBSPOT_PORTAL_ID = "20451141";
const HUBSPOT_FORM_ID = "1bd8ce72-8c0d-4dd0-89c2-f2d2bd7dfcd5";

type FormState = "idle" | "submitting" | "success" | "error";

export const ContactPage = () => {
  const [formState, setFormState] = useState<FormState>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const form = formRef.current;
    if (!form) return;

    const handler = async (e: Event) => {
      e.preventDefault();
      setFormState("submitting");
      setErrorMsg("");

      const data = new FormData(form);

      const fullName = (data.get("fullName") as string || "").trim();
      const nameParts = fullName.split(/\s+/);
      const firstName = nameParts[0] || "";
      const lastName = nameParts.slice(1).join(" ") || "";

      const email = (data.get("email") as string || "").trim();
      const company = (data.get("company") as string || "").trim();
      const employees = (data.get("employees") as string || "").trim();
      const message = (data.get("message") as string || "").trim();

      if (!fullName || !email) {
        setFormState("error");
        setErrorMsg("Please fill in your name and email address.");
        return;
      }

      const fields = [
        { name: "firstname", value: firstName },
        { name: "lastname", value: lastName },
        { name: "email", value: email },
        ...(company ? [{ name: "company", value: company }] : []),
        ...(employees ? [{ name: "numemployees", value: employees }] : []),
        ...(message ? [{ name: "message", value: message }] : []),
      ];

      try {
        const res = await fetch(
          `https://api.hsforms.com/submissions/v3/integration/submit/${HUBSPOT_PORTAL_ID}/${HUBSPOT_FORM_ID}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              fields,
              context: {
                pageUri: window.location.href,
                pageName: "Contact Us",
              },
            }),
          }
        );

        if (res.ok) {
          setFormState("success");
        } else {
          setFormState("error");
          setErrorMsg("Something went wrong. Please try again or email us directly.");
        }
      } catch {
        setFormState("error");
        setErrorMsg("Network error. Please try again or email us directly.");
      }
    };

    form.addEventListener("submit", handler);
    return () => form.removeEventListener("submit", handler);
  }, []);

  return (
    <section className="py-16 md:py-28 lg:py-32">
      <div className="container max-w-4xl">
        <h1 className="text-center text-4xl font-semibold tracking-tight sm:text-5xl">
          Contact us
        </h1>
        <p className="mt-4 text-center text-muted-foreground">
          We'd love to hear from you. Reach out and we'll get back to you soon.
        </p>

        <div className="mt-8 flex max-md:flex-col md:mt-12 md:divide-x lg:mt-20">
          {/* Contact Information */}
          <div className="space-y-10 md:pe-14">
            <div>
              <h2 className="text-lg font-semibold">Corporate office</h2>
              <p className="mt-3 text-lg font-medium tracking-tight text-muted-foreground">
                6001 W Parmer Ln, STE 370
                <br />
                Austin, Texas 78727, USA
              </p>
            </div>

            <div>
              <h2 className="text-lg font-semibold">Email us</h2>
              <div className="mt-3 space-y-2">
                <div>
                  <p>Support</p>
                  <a
                    href="mailto:support@plivo.com"
                    className="mt-3 text-lg font-medium tracking-tight text-muted-foreground"
                  >
                    support@plivo.com
                  </a>
                </div>
                <div>
                  <p>Press</p>
                  <a
                    href="mailto:press@plivo.com"
                    className="mt-3 text-lg font-medium tracking-tight text-muted-foreground"
                  >
                    press@plivo.com
                  </a>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-lg font-semibold">Follow us</h2>
              <div className="mt-3 flex gap-6">
                <a
                  href="https://www.facebook.com/Plivo/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground"
                  aria-label="Follow Plivo on Facebook"
                >
                  <Facebook className="size-6" aria-hidden="true" />
                </a>
                <a
                  href="https://x.com/plaboratory"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground"
                  aria-label="Follow Plivo on X"
                >
                  <Twitter className="size-6" aria-hidden="true" />
                </a>
                <a
                  href="https://www.linkedin.com/company/plivo/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground"
                  aria-label="Follow Plivo on LinkedIn"
                >
                  <Linkedin className="size-6" aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>

          {/* Inquiry Form */}
          <div className="flex-1 md:ps-8">
            <h2 className="text-lg font-semibold">Inquiries</h2>

            {formState === "success" ? (
              <div className="mt-8 flex flex-col items-center gap-4 rounded-lg border border-green-200 bg-green-50 p-8 text-center">
                <CheckCircle className="h-10 w-10 text-green-600" />
                <h3 className="text-lg font-semibold text-green-900">
                  Thank you for reaching out!
                </h3>
                <p className="text-sm text-green-700">
                  We've received your message and will get back to you soon.
                </p>
              </div>
            ) : (
              <form ref={formRef} className="mt-5 space-y-5">
                <div className="flex flex-col gap-2">
                  <Label>Full name</Label>
                  <Input
                    type="text"
                    name="fullName"
                    placeholder="First and last name"
                    required
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <Label>Work email address</Label>
                  <Input
                    type="email"
                    name="email"
                    placeholder="me@company.com"
                    required
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <Label>
                    Company name
                    <span className="text-muted-foreground/60"> (optional)</span>
                  </Label>
                  <Input
                    type="text"
                    name="company"
                    placeholder="Company name"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <Label>
                    Number of employees
                    <span className="text-muted-foreground/60"> (optional)</span>
                  </Label>
                  <Input
                    type="text"
                    name="employees"
                    placeholder="e.g. 50"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <Label>Your message</Label>
                  <Textarea
                    name="message"
                    placeholder="Write your message"
                    className="min-h-[120px] resize-none"
                    required
                  />
                </div>

                {formState === "error" && errorMsg && (
                  <p className="text-sm text-red-600">{errorMsg}</p>
                )}

                <div className="flex justify-end">
                  <Button
                    type="submit"
                    size="lg"
                    disabled={formState === "submitting"}
                  >
                    {formState === "submitting" ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      "Submit"
                    )}
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
