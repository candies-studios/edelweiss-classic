import type { Metadata } from "next";
import { investorDocs, irLinks } from "@/content/site";
import { DocLibrary } from "@/components/investors/DocLibrary";
import { ArrowLink, PageHero, Section } from "@/components/ui";

export const metadata: Metadata = {
  title: "Financial Results",
  description: "Quarterly earnings updates, investor presentations and earnings call transcripts and audio.",
  alternates: { canonical: "/investors/financial-results" },
};

export default function FinancialResults() {
  const latest = investorDocs.filter((d) => d.fy === "FY27" && d.category !== "AGM");
  return (
    <>
      <PageHero eyebrow="Investor relations" title="Financial results" intro="Quarterly earnings updates, investor presentations and earnings calls." crumbs={[{ label: "Investors", href: "/investors" }, { label: "Financial results", href: "/investors/financial-results" }]} />
      <Section>
        <h2 className="font-display text-display-md text-navy">Latest quarter: Q1 FY27</h2>
        <p className="mt-2 text-ink-soft">April–June 2026</p>
        <ul className="mt-8 grid gap-px border border-silver-300 bg-silver-300 sm:grid-cols-2 lg:grid-cols-4">
          {latest.map((d) => (
            <li key={d.href}>
              <a href={d.href} target="_blank" rel="noopener noreferrer" className="group flex h-full flex-col bg-white p-6 hover:bg-mist">
                <span className="text-[12.5px] font-semibold text-blue">{d.category}</span>
                <span className="mt-2 flex-1 font-medium text-navy group-hover:text-blue">{d.title}</span>
                <span className="mt-4 text-[12.5px] font-semibold text-ink-faint">{d.format}</span>
              </a>
            </li>
          ))}
        </ul>
      </Section>
      <Section tone="mist">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <h2 className="font-display text-display-md text-navy">All results</h2>
            <div className="mt-6 space-y-3">
              <ArrowLink href={irLinks.quarterly}>Quarterly results archive</ArrowLink>
              <br />
              <ArrowLink href={irLinks.analysisTool}>Financial analysis tool</ArrowLink>
            </div>
          </div>
          <div className="bg-white p-6 md:p-10 lg:col-span-8">
            <DocLibrary docs={investorDocs} categories={["Earnings release", "Investor presentation", "Earnings call transcript", "Earnings call audio"]} />
          </div>
        </div>
      </Section>
    </>
  );
}
