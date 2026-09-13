"use client";

import { FormEvent, useState } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase-browser";

type ContactProps = {
  email?: string | null;
  linkedin?: string | null;
  github?: string | null;
  leetcode?: string | null;
};

export default function Contact({
  email,
  linkedin,
  github,
  leetcode,
}: ContactProps) {
  const [visitorEmail, setVisitorEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!visitorEmail.trim() || !message.trim()) return;

    setStatus("sending");

    const supabase = createSupabaseBrowserClient();

    const { error } = await supabase.from("contact_messages").insert({
      email: visitorEmail.trim(),
      message: message.trim(),
    });

    if (error) {
      console.error(error);
      setStatus("error");
      return;
    }

    setVisitorEmail("");
    setMessage("");
    setStatus("success");
  }

  return (
    <section
      id="contact"
      className="min-h-[100svh] snap-start border-t border-zinc-800 bg-zinc-950 text-zinc-100"
    >
      <div className="mx-auto flex min-h-[100svh] max-w-7xl flex-col justify-center px-6 py-10 sm:px-10 lg:px-16">
        {/* Header */}
        <div className="grid grid-cols-1 border-b border-zinc-800 pb-6 lg:grid-cols-[1fr_2fr] lg:gap-12">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500">
              06 / Contact
            </p>
          </div>

          <div>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
              Let&apos;s build
              <br />
              <span className="text-zinc-500">something useful.</span>
            </h2>

            <p className="mt-3 max-w-lg text-sm leading-6 text-zinc-400">
              Have a project, opportunity, or something interesting to talk
              about? Drop me a message.
            </p>
          </div>
        </div>

        {/* Main grid */}
        <div className="grid border-b border-zinc-800 lg:grid-cols-[1fr_2fr] lg:gap-12">
          {/* Contact details */}
          <div className="flex flex-col justify-between py-7 lg:border-r lg:border-zinc-800 lg:py-8 lg:pr-10">
            <div className="space-y-6">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-zinc-600">
                  Email
                </p>

                {email ? (
                  <a
                    href={`mailto:${email}`}
                    className="mt-1.5 inline-block text-sm text-zinc-300 transition hover:text-white hover:underline"
                  >
                    {email}
                  </a>
                ) : (
                  <p className="mt-1.5 text-sm text-zinc-500">
                    Available on request
                  </p>
                )}
              </div>

              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-zinc-600">
                  Location
                </p>

                <p className="mt-1.5 text-sm text-zinc-300">
                  Halifax, Nova Scotia
                </p>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-x-5 gap-y-2 font-mono text-[10px] uppercase tracking-wider">
              {linkedin && (
                <a
                  href={linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="text-zinc-500 transition hover:text-zinc-100"
                >
                  LinkedIn ↗
                </a>
              )}

              {github && (
                <a
                  href={github}
                  target="_blank"
                  rel="noreferrer"
                  className="text-zinc-500 transition hover:text-zinc-100"
                >
                  GitHub ↗
                </a>
              )}

              {leetcode && (
                <a
                  href={leetcode}
                  target="_blank"
                  rel="noreferrer"
                  className="text-zinc-500 transition hover:text-zinc-100"
                >
                  LeetCode ↗
                </a>
              )}
            </div>
          </div>

          {/* Form */}
          <div className="py-7 lg:py-8">
            <form onSubmit={handleSubmit}>
              {/* Email */}
              <div className="border-b border-zinc-800 pb-4">
                <label
                  htmlFor="contact-email"
                  className="font-mono text-[10px] uppercase tracking-[0.18em] text-zinc-600"
                >
                  Your email
                </label>

                <input
                  id="contact-email"
                  type="email"
                  required
                  value={visitorEmail}
                  onChange={(event) => {
                    setVisitorEmail(event.target.value);

                    if (status !== "idle") {
                      setStatus("idle");
                    }
                  }}
                  placeholder="you@example.com"
                  className="mt-2 block w-full border-0 bg-transparent p-0 text-base text-zinc-100 outline-none placeholder:text-zinc-700 focus:ring-0"
                />
              </div>

              {/* Message */}
              <div className="border-b border-zinc-800 py-4">
                <label
                  htmlFor="contact-message"
                  className="font-mono text-[10px] uppercase tracking-[0.18em] text-zinc-600"
                >
                  Message
                </label>

                <textarea
                  id="contact-message"
                  required
                  rows={3}
                  value={message}
                  onChange={(event) => {
                    setMessage(event.target.value);

                    if (status !== "idle") {
                      setStatus("idle");
                    }
                  }}
                  placeholder="hey, how are you?..."
                  className="mt-2 block w-full resize-none border-0 bg-transparent p-0 text-base leading-7 text-zinc-100 outline-none placeholder:text-zinc-700 focus:ring-0"
                />
              </div>

              {/* Action */}
              <div className="flex items-center justify-between gap-5 pt-5">
                <div className="min-h-5 text-xs">
                  {status === "success" && (
                    <p className="text-zinc-400">
                      Message sent. I&apos;ll get back to you soon.
                    </p>
                  )}

                  {status === "error" && (
                    <p className="text-zinc-400">
                      Something went wrong. Please try again.
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="shrink-0 border border-[var(--button-border)] bg-[var(--button-bg)] px-5 py-2.5 text-sm font-medium text-[var(--button-text)] transition hover:bg-[var(--button-hover)] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {status === "sending" ? "Sending..." : "Send message →"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}