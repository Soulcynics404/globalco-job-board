export type Category =
  | "Engineering"
  | "Data Science"
  | "Operations"
  | "Marketing"
  | "Human Resources"
  | "Finance"
  | "Customer Support";

export type Shift = "Night" | "Day" | "Mid";

export type EmploymentType = "Full-time" | "Part-time" | "Contract";

export interface Job {
  id: string;
  slug: string;
  title: string;
  city: string;
  country: string;
  category: Category;
  type: EmploymentType;
  shift: Shift;
  schedule?: string;
  salary?: string;
  workSetup: string;
  summary: string;
  responsibilities: string[];
  qualifications: string[];
  preferred: string[];
  featured?: boolean;
  postedDaysAgo: number;
}
