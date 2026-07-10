import Link from "next/link";
import { Job } from "@/lib/types";
import { Badge, ShiftBadge } from "./Badge";
import { BookmarkButton } from "./BookmarkButton";

export function JobCard({ job }: { job: Job }) {
  return (
    <Link
      href={`/jobs/${job.slug}`}
      className="group relative flex flex-col rounded-xl border border-border bg-surface p-5 transition hover:-translate-y-0.5 hover:border-brand-500 hover:shadow-lg hover:shadow-brand/5"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <Badge tone="brand">{job.category}</Badge>
            {job.featured && <Badge tone="default">★ Featured</Badge>}
          </div>
          <h3 className="mt-2 text-base font-semibold leading-snug text-foreground group-hover:text-brand-500">
            {job.title}
          </h3>
        </div>
        <BookmarkButton id={job.id} />
      </div>

      <p className="mt-2 flex items-center gap-1.5 text-sm text-muted">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
        {job.city}, {job.country}
      </p>

      <p className="mt-3 line-clamp-2 text-sm text-muted">{job.summary}</p>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <ShiftBadge shift={job.shift} />
        <Badge>{job.type}</Badge>
        {job.salary && <Badge>{job.salary}</Badge>}
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-border pt-3 text-xs text-muted">
        <span>Posted {job.postedDaysAgo}d ago</span>
        <span className="font-medium text-brand-500 group-hover:underline">
          View details →
        </span>
      </div>
    </Link>
  );
}
