import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getAllSlugs, getJob } from "@/lib/jobs";
import { Badge, ShiftBadge } from "@/components/Badge";
import { BookmarkButton } from "@/components/BookmarkButton";
import { ApplyModal } from "@/components/ApplyModal";
import { ShareButton } from "@/components/ShareButton";

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const job = getJob(slug);
  if (!job) return { title: "Job not found | Globalco" };
  return {
    title: `${job.title} | Globalco Careers`,
    description: job.summary,
  };
}

export default async function JobDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const job = getJob(slug);
  if (!job) notFound();

  const meta = [
    { label: "Location", value: `${job.city}, ${job.country}` },
    { label: "Category", value: job.category },
    { label: "Employment", value: job.type },
    { label: "Shift", value: `${job.shift} shift` },
    { label: "Work setup", value: job.workSetup },
    ...(job.schedule ? [{ label: "Schedule", value: job.schedule }] : []),
    ...(job.salary ? [{ label: "Salary", value: job.salary }] : []),
  ];

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-muted transition hover:text-brand-500"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M19 12H5M12 19l-7-7 7-7" />
        </svg>
        All positions
      </Link>

      {/* Header card */}
      <div className="mt-4 rounded-2xl border border-border bg-surface p-6 sm:p-8">
        <div className="flex flex-wrap items-center gap-2">
          <Badge tone="brand">{job.category}</Badge>
          <ShiftBadge shift={job.shift} />
          {job.featured && <Badge>★ Featured</Badge>}
        </div>
        <div className="mt-3 flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
          <div>
            <h1 className="text-2xl font-bold sm:text-3xl">{job.title}</h1>
            <p className="mt-2 flex items-center gap-1.5 text-muted">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              {job.city}, {job.country}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <ApplyModal jobTitle={job.title} />
            <BookmarkButton id={job.id} variant="full" />
          </div>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Main content */}
        <div className="space-y-8 lg:col-span-2">
          <Section title="About the role">
            <p className="text-muted">{job.summary}</p>
          </Section>
          <Section title="Key Responsibilities">
            <BulletList items={job.responsibilities} />
          </Section>
          <Section title="Qualifications">
            <BulletList items={job.qualifications} />
          </Section>
          <Section title="Preferred Attributes">
            <BulletList items={job.preferred} />
          </Section>

          <div className="flex flex-wrap gap-3">
            <ApplyModal jobTitle={job.title} />
            <ShareButton title={job.title} />
          </div>
        </div>

        {/* Sidebar */}
        <aside className="lg:col-span-1">
          <div className="sticky top-20 rounded-2xl border border-border bg-surface p-5">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-muted">
              Job overview
            </h2>
            <dl className="mt-4 space-y-3">
              {meta.map((m) => (
                <div key={m.label} className="flex flex-col">
                  <dt className="text-xs text-muted">{m.label}</dt>
                  <dd className="text-sm font-medium">{m.value}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-5 border-t border-border pt-4">
              <ApplyModal jobTitle={job.title} />
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h2 className="text-lg font-semibold">{title}</h2>
      <div className="mt-3">{children}</div>
    </section>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2">
      {items.map((item, i) => (
        <li key={i} className="flex gap-2.5 text-sm text-muted">
          <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-brand-500" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
