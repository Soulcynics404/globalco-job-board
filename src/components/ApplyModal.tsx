"use client";

import { useEffect, useRef, useState } from "react";

const ACCEPT = ".pdf,.doc,.docx,.jpg,.jpeg,.png";
const ACCEPT_MIME = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "image/jpeg",
  "image/png",
];
const MAX_BYTES = 5 * 1024 * 1024; // 5 MB

function validateFile(file: File): string | null {
  const extOk = /\.(pdf|doc|docx|jpe?g|png)$/i.test(file.name);
  const mimeOk = ACCEPT_MIME.includes(file.type) || file.type === "";
  if (!extOk || !mimeOk) {
    return "Unsupported format. Use PDF, DOC, DOCX, JPG, JPEG or PNG.";
  }
  if (file.size > MAX_BYTES) {
    return "File is too large (max 5 MB).";
  }
  return null;
}

export function ApplyModal({ jobTitle }: { jobTitle: string }) {
  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [resume, setResume] = useState<File | null>(null);
  const [cover, setCover] = useState<File | null>(null);
  const [errors, setErrors] = useState<{ resume?: string; cover?: string }>({});

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    if (open) {
      document.addEventListener("keydown", onKey);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  function close() {
    setOpen(false);
    // Reset after the closing animation frame.
    setTimeout(() => {
      setSubmitted(false);
      setName("");
      setEmail("");
      setResume(null);
      setCover(null);
      setErrors({});
    }, 150);
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const nextErrors: { resume?: string; cover?: string } = {};
    if (!resume) {
      nextErrors.resume = "A resume / CV is required.";
    } else {
      const err = validateFile(resume);
      if (err) nextErrors.resume = err;
    }
    if (cover) {
      const err = validateFile(cover);
      if (err) nextErrors.cover = err;
    }
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;
    setSubmitted(true);
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-brand px-4 py-2.5 text-sm font-semibold text-brand-foreground transition hover:bg-brand-600 sm:w-auto"
      >
        Apply now
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 p-0 backdrop-blur-sm sm:items-center sm:p-4"
          onClick={close}
          role="dialog"
          aria-modal="true"
          aria-label={`Apply for ${jobTitle}`}
        >
          <div
            className="max-h-[92vh] w-full max-w-md overflow-y-auto rounded-t-2xl border border-border bg-surface p-6 shadow-2xl sm:rounded-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-lg font-semibold">
                  {submitted ? "Application submitted" : "Apply for this role"}
                </h2>
                <p className="mt-0.5 text-sm text-muted">{jobTitle}</p>
              </div>
              <button
                type="button"
                onClick={close}
                aria-label="Close"
                className="rounded-lg p-1 text-muted hover:text-foreground"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            {submitted ? (
              <div className="flex flex-col items-center py-6 text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-green-500/10 text-green-600">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                </div>
                <p className="mt-4 font-medium">Thanks, {name || "applicant"}!</p>
                <p className="mt-1 text-sm text-muted">
                  Your application for <strong>{jobTitle}</strong> has been received.
                  Our talent team will review it and get back to you by email.
                </p>
                <button
                  type="button"
                  onClick={close}
                  className="mt-5 w-full rounded-lg bg-brand px-4 py-2.5 text-sm font-semibold text-brand-foreground transition hover:bg-brand-600"
                >
                  Done
                </button>
              </div>
            ) : (
              <form onSubmit={submit} className="mt-4 space-y-3" noValidate>
                <Field label="Full name" value={name} onChange={setName} required />
                <Field label="Email" type="email" value={email} onChange={setEmail} required />

                <FileField
                  label="Resume / CV"
                  required
                  file={resume}
                  error={errors.resume}
                  onPick={(f) => {
                    setResume(f);
                    setErrors((prev) => ({ ...prev, resume: undefined }));
                  }}
                />
                <FileField
                  label="Cover letter"
                  file={cover}
                  error={errors.cover}
                  onPick={(f) => {
                    setCover(f);
                    setErrors((prev) => ({ ...prev, cover: undefined }));
                  }}
                />

                <p className="text-xs text-muted">
                  Accepted formats: PDF, DOC, DOCX, JPG, JPEG, PNG · max 5 MB each.
                </p>

                <button
                  type="submit"
                  className="mt-2 w-full rounded-lg bg-brand px-4 py-2.5 text-sm font-semibold text-brand-foreground transition hover:bg-brand-600"
                >
                  Submit application
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  required,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm font-medium">
        {label}
        {required && <span className="text-brand-500"> *</span>}
      </span>
      <input
        type={type}
        value={value}
        required={required}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20"
      />
    </label>
  );
}

function FileField({
  label,
  file,
  error,
  onPick,
  required,
}: {
  label: string;
  file: File | null;
  error?: string;
  onPick: (f: File | null) => void;
  required?: boolean;
}) {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div>
      <span className="mb-1 block text-sm font-medium">
        {label}
        {required ? (
          <span className="text-brand-500"> *</span>
        ) : (
          <span className="text-muted"> (optional)</span>
        )}
      </span>

      <input
        ref={inputRef}
        type="file"
        accept={ACCEPT}
        className="sr-only"
        onChange={(e) => onPick(e.target.files?.[0] ?? null)}
      />

      {file ? (
        <div
          className={`flex items-center justify-between gap-2 rounded-lg border px-3 py-2.5 ${
            error ? "border-red-500/50" : "border-border"
          } bg-background`}
        >
          <span className="flex min-w-0 items-center gap-2 text-sm">
            <svg className="flex-shrink-0 text-brand-500" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <path d="M14 2v6h6" />
            </svg>
            <span className="truncate">{file.name}</span>
          </span>
          <button
            type="button"
            onClick={() => {
              onPick(null);
              if (inputRef.current) inputRef.current.value = "";
            }}
            aria-label={`Remove ${label}`}
            className="flex-shrink-0 text-muted hover:text-red-500"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className={`flex w-full items-center gap-2 rounded-lg border border-dashed px-3 py-2.5 text-sm text-muted transition hover:border-brand-500 hover:text-brand-500 ${
            error ? "border-red-500/50" : "border-border"
          }`}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12" />
          </svg>
          Upload {label.toLowerCase()}
        </button>
      )}

      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
}
