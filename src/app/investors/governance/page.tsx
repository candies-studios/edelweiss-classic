import type { Metadata } from "next";
import { company, irLinks, policies } from "@/content/site";
import { ArrowLink, PageHero, Section } from "@/components/ui";
import { heroImages } from "@/content/heroes";

export const metadata: Metadata = {
  title: "Corporate Governance",
  description: "Board committees, codes of conduct and governance policies of Edelweiss Financial Services Limited.",
  alternates: { canonical: "/investors/governance" },
};

const onRequest = [
  "Anti-Money Laundering", "Information Security", "Group Tax", "Anti-Bribery & Corruption and Gifts & Entertainment", "Human Rights",
  "Customer Relations & Experience", "People Practices", "Environmental", "Board Nomination and Board Diversity", "Remuneration",
  "Risk Management", "Prevention, Prohibition and Redressal of Sexual Harassment at Workplace",
];

export default function Governance() {
  const groups = Array.from(new Set(policies.map((p) => p.group)));
  return (
    <>
      <PageHero image={heroImages.governance} eyebrow="Investor relations" title="Corporate governance" intro="Governance practices that protect the interests of our stakeholders and the reputation of the company." crumbs={[{ label: "Investors", href: "/investors" }, { label: "Governance", href: "/investors/governance" }]} />
      <Section>
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="space-y-4 text-ink-soft lg:col-span-4">
            <p className="font-display text-[22px] leading-snug text-navy">We work continually to strengthen governance and oversight, simplify our operations and reduce risk.</p>
            <p>Each of our businesses has its own board, and the group’s Board of Directors is supported by committees whose composition is published below.</p>
            <div className="space-y-3 pt-2">
              <ArrowLink href="/leadership">Board of Directors</ArrowLink>
              <br />
              <ArrowLink href={irLinks.boardCommittees}>Board committees</ArrowLink>
            </div>
          </div>
          <div className="space-y-12 lg:col-span-8">
            {groups.map((g) => (
              <div key={g}>
                <h2 className="mb-2 font-display text-[24px] text-navy">{g}</h2>
                <ul className="divide-y divide-silver-200 border-t border-silver-300">
                  {policies.filter((p) => p.group === g).map((p) => (
                    <li key={p.href}>
                      <a href={p.href} target="_blank" rel="noopener noreferrer" className="group flex items-center justify-between gap-4 py-4">
                        <span className="font-medium text-navy group-hover:text-blue">{p.title}</span>
                        <span className="text-[12.5px] font-semibold text-blue">PDF</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <div className="bg-mist p-8">
              <h2 className="font-display text-[22px] text-navy">Policies available on request</h2>
              <p className="mt-2 text-[15px] text-ink-soft">
                Write to <a className="font-semibold text-blue" href={`mailto:${company.irEmail}`}>{company.irEmail}</a> for any of the following:
              </p>
              <ul className="mt-5 grid gap-x-8 gap-y-2 text-[14.5px] text-ink-soft sm:grid-cols-2">
                {onRequest.map((x) => <li key={x}>{x}</li>)}
              </ul>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
