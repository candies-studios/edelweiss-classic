import type { Metadata } from "next";
import { investorDocs, irLinks } from "@/content/site";
import { DocLibrary } from "@/components/investors/DocLibrary";
import { ArrowLink, PageHero, Section } from "@/components/ui";

export const metadata: Metadata = {
  title: "Annual Reports",
  description: "Annual reports, Chairman’s letters, ESG reports and AGM materials of Edelweiss Financial Services Limited.",
  alternates: { canonical: "/investors/annual-reports" },
};

export default function AnnualReports() {
  const letter = investorDocs.find((d) => d.title === "Chairman's Letter FY26")!;
  return (
    <>
      <PageHero eyebrow="Investor relations" title="Annual reports" intro="Our yearly account to shareholders, alongside the Chairman’s letter and ESG reporting." crumbs={[{ label: "Investors", href: "/investors" }, { label: "Annual reports", href: "/investors/annual-reports" }]} />
      <Section>
        <div className="grid items-center gap-10 bg-navy p-8 text-white md:p-14 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <p className="eyebrow mb-3 !text-glacier">Chairman’s letter</p>
            <h2 className="font-display text-display-md">Chairman’s Letter FY26, by Rashesh Shah</h2>
          </div>
          <div className="lg:col-span-4 lg:text-right">
            <a href={letter.href} target="_blank" rel="noopener noreferrer" className="btn-light">Read the letter (PDF)</a>
          </div>
        </div>
      </Section>
      <Section tone="mist">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <h2 className="font-display text-display-md text-navy">Reports and AGM</h2>
            <p className="mt-4 text-ink-soft">Full annual reports for every year are published on the official annual reports page.</p>
            <div className="mt-6"><ArrowLink href={irLinks.annualReports}>Annual reports archive</ArrowLink></div>
          </div>
          <div className="bg-white p-6 md:p-10 lg:col-span-8">
            <DocLibrary docs={investorDocs} categories={["Chairman's letter", "ESG report", "AGM"]} />
          </div>
        </div>
      </Section>
    </>
  );
}
