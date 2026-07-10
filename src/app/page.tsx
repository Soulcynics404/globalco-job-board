import { jobs } from "@/data/jobs";
import { countries } from "@/lib/jobs";
import { JobList } from "@/components/JobList";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string }>;
}) {
  const { saved } = await searchParams;
  const countryOptions = countries();

  const stats = [
    { label: "Open positions", value: jobs.length },
    { label: "Countries", value: countryOptions.length },
    {
      label: "Categories",
      value: new Set(jobs.map((j) => j.category)).size,
    },
  ];

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border bg-brand text-brand-foreground">
        <div className="pointer-events-none absolute inset-0 opacity-20 [background:radial-gradient(circle_at_20%_20%,#fff,transparent_40%),radial-gradient(circle_at_80%_60%,#fff,transparent_35%)]" />
        <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
          <p className="text-sm font-medium uppercase tracking-wider text-white/70">
            Careers at Globalco
          </p>
          <h1 className="mt-3 max-w-2xl text-3xl font-bold leading-tight sm:text-5xl">
            Build the future of Human&nbsp;+&nbsp;Machine Intelligence.
          </h1>
          <p className="mt-4 max-w-xl text-base text-white/80 sm:text-lg">
            Join elite global professionals delivering AI-powered workflows
            across engineering, data science, and operations. Explore our{" "}
            {jobs.length} open roles below.
          </p>

          <dl className="mt-10 flex flex-wrap gap-8">
            {stats.map((s) => (
              <div key={s.label}>
                <dt className="text-sm text-white/70">{s.label}</dt>
                <dd className="text-3xl font-bold">{s.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Listings */}
      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <JobList
          jobs={jobs}
          countryOptions={countryOptions}
          initialSavedOnly={saved === "1"}
        />
      </section>
    </>
  );
}
