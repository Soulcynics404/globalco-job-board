import Image from "next/image";

const SERVICES = [
  "Data Science and AI",
  "Prompt Engineering and LLM Optimization",
  "Business Intelligence and Reporting",
  "Operational Support and Quality Assurance",
  "Digital Operations and Content Production",
  "Data Entry and Structuring",
];

const COMPANY = [
  "Home",
  "Services",
  "Industries",
  "About Us",
  "Academy",
  "Career",
  "Contact",
];

const INDUSTRIES = ["FinTech", "Technology and AI", "Publishing and Media"];

const LOCATIONS = [
  {
    country: "United States",
    address: "Globalco Inc, 8 The Green Ste A, Dover, DE 19901, USA",
  },
  {
    country: "United Arab Emirates",
    address:
      "Globalco Labs Ltd, Office A, RAK DAO Business Centre, RAK BANK ROC Office, Ground Floor, Al Rifaa, Sheikh Mohammed Bin Zaeyd Road, Ras Al Khaimah, United Arab Emirates",
  },
  {
    country: "Hong Kong",
    address:
      "Global Coordination Center Ltd Unit A-C, 25/F Seabright Plaza 9-23 Shell St North Point, Hong Kong",
  },
];

export function Footer() {
  return (
    <footer className="mt-16 border-t border-border bg-surface">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-5">
          {/* Brand */}
          <div className="col-span-2 lg:col-span-1">
            <Image
              src="/logo.png"
              alt="Globalco"
              width={150}
              height={32}
              className="h-7 w-auto dark:brightness-0 dark:invert"
            />
            <p className="mt-3 max-w-xs text-sm text-muted">
              The Global Coordination Center of Human + Machine Intelligence.
            </p>
          </div>

          <FooterCol title="Services" items={SERVICES} />
          <FooterCol title="Company" items={COMPANY} />
          <FooterCol title="Industries" items={INDUSTRIES} />

          {/* Locations */}
          <div className="col-span-2 lg:col-span-1">
            <h3 className="text-sm font-semibold text-foreground">Locations</h3>
            <ul className="mt-3 space-y-3">
              {LOCATIONS.map((loc) => (
                <li key={loc.country}>
                  <p className="text-sm font-medium text-foreground">
                    {loc.country}
                  </p>
                  <p className="mt-0.5 text-xs leading-relaxed text-muted">
                    {loc.address}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-2 border-t border-border pt-6 text-xs text-muted sm:flex-row">
          <p>© 2026 Global Coordination Center. All rights reserved.</p>
          <a href="https://www.globalco.com/" className="hover:text-brand-500">
            Privacy Policy
          </a>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h3 className="text-sm font-semibold text-foreground">{title}</h3>
      <ul className="mt-3 space-y-2">
        {items.map((item) => (
          <li key={item}>
            <a
              href="https://www.globalco.com/"
              className="text-sm text-muted transition hover:text-brand-500"
            >
              {item}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
