import { jobs } from "@/data/jobs";
import { Category, Job, Shift } from "@/lib/types";

export function getJob(slug: string): Job | undefined {
  return jobs.find((j) => j.slug === slug);
}

export function getAllSlugs(): string[] {
  return jobs.map((j) => j.slug);
}

export const categories: Category[] = [
  "Engineering",
  "Data Science",
  "Operations",
  "Marketing",
  "Human Resources",
  "Finance",
  "Customer Support",
];

export const shifts: Shift[] = ["Night", "Day", "Mid"];

export function countries(): string[] {
  return Array.from(new Set(jobs.map((j) => j.country))).sort();
}

export interface Filters {
  query: string;
  country: string | null;
  category: Category | null;
  shift: Shift | null;
  savedOnly: boolean;
}

export function filterJobs(
  all: Job[],
  filters: Filters,
  savedIds: string[],
): Job[] {
  const q = filters.query.trim().toLowerCase();
  return all.filter((job) => {
    if (filters.savedOnly && !savedIds.includes(job.id)) return false;
    if (filters.country && job.country !== filters.country) return false;
    if (filters.category && job.category !== filters.category) return false;
    if (filters.shift && job.shift !== filters.shift) return false;
    if (q) {
      const haystack =
        `${job.title} ${job.summary} ${job.city} ${job.country} ${job.category}`.toLowerCase();
      if (!haystack.includes(q)) return false;
    }
    return true;
  });
}
