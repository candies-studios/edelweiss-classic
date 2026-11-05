import type { Metadata } from "next";
import Link from "next/link";
import { company, investorDocs, irLinks } from "@/content/site";
import { DocLibrary } from "@/components/investors/DocLibrary";
import { Arrow, ArrowLink, PageHero, Section, SmartLink } from "@/components/ui";

export const metadata: Metadata = {
  title: "Investor Relations",
  description: "Financial results, investor presentations, annual reports, governance and shareholder information for Edelweiss Financial Services Limited.",
  alternates: { canonical: "/investors" },
};

const hubs = [
  { t: "Financial results", d: "Earnings updates, presentations, call transcripts and audio.", h: "/investors/financial-results" },
  { t: "Annual reports", d: "Annual reports, Chairman’s letters, ESG reports and AGM materials.", h: "/investors/annual-reports" },
  { t: "Corporate governance", d: "Board committees, codes of conduct and governance policies.", h: "/investors/governance" },
  { t: "Sustainability", d: "ESG reports and our environment and social policies.", h: "/sustainability" },
  { t: "Financial analysis tool", d: "Explore historical financials interactively.", h: irLinks.analysisTool },
  { t: "Investor services", d: "Shareholder services and contacts.", h: irLinks.investorServices },
];

export default function Investors() {
  return (
    <>
      <PageHero eyebrow="Investor relations" title="Information for shareholders and investors" intro="Results, reports, disclosures and governance information for Edelweiss Financial Services Limited." crumbs={[{ label: "Investors", href: "/investors" }]} />

      <Section>
        <div className="grid gap-6 lg:grid-cols-12">
          <div className="bg-navy p-8 text-white lg:col-span-4">
            <h2 className="text-[13px] font-semibold text-glacier">Shareholder information</h2>
            <dl className="mt-6 grid grid-cols-[auto_1fr] gap-x-8 gap-y-4 text-[15px]">
              <dt className="text-silver">NSE symbol</dt><dd className="font-semibold">{company.listings[0].code}</dd>
              <dt className="text-silver">BSE code</dt><dd className="font-semibold">{company.listings[1].code}</dd>
              <dt className="text-silver">Reuters</dt><dd className="font-semibold">{company.reuters}</dd>
              <dt className="text-silver">Bloomberg</dt><dd className="font-semibold">{company.bloomberg}</dd>
            </dl>
            <p className="mt-8 text-[14px] text-silver">Investor queries</p>
            <a href={`mailto:${company.irEmail}`} className="mt-1 block font-semibold text-white underline-offset-4 hover:underline">{company.irEmail}</a>
          </div>
          <div className="grid gap-px border border-silver-300 bg-silver-300 sm:grid-cols-2 lg:col-span-8 lg:grid-cols-3">
            {hubs.map((x) => (
              <SmartLink key={x.t} href={x.h} className="group flex flex-col bg-white p-7 hover:bg-mist">
                <span className="font-display text-[21px] text-navy group-hover:text-blue">{x.t}</span>
                <span className="mt-2 flex-1 text-[14.5px] text-ink-soft">{x.d}</span>
                <Arrow className="mt-5 text-blue" />
              </SmartLink>
            ))}
          </div>
        </div>
      </Section>

      <Section tone="mist" id="documents">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <h2 className="font-display text-display-md text-navy">Document library</h2>
            <p className="mt-4 text-ink-soft">Filter by financial year or document type. All documents open from the official Edelweiss document server.</p>
            <div className="mt-8 space-y-3">
              <ArrowLink href={irLinks.overview}>Full archive from FY16</ArrowLink>
              <br />
              <ArrowLink href={irLinks.structuredNcd}>Valuations of structured product NCDs</ArrowLink>
            </div>
          </div>
          <div className="bg-white p-6 md:p-10 lg:col-span-8">
            <DocLibrary docs={investorDocs} />
          </div>
        </div>
      </Section>

      <Section>
        <div className="grid gap-10 md:grid-cols-2">
          <div>
            <h2 className="font-display text-[26px] text-navy">Stock exchange disclosures</h2>
            <p className="mt-3 text-ink-soft">Corporate announcements and disclosures filed with the exchanges are available on the official investor relations page and on the NSE and BSE websites.</p>
            <div className="mt-5"><ArrowLink href={irLinks.overview}>Corporate announcements</ArrowLink></div>
          </div>
          <div>
            <h2 className="font-display text-[26px] text-navy">Credit ratings</h2>
            <p className="mt-3 text-ink-soft">Rating actions and related releases are published under AGM and other releases on the official investor relations page.</p>
            <div className="mt-5"><ArrowLink href={irLinks.overview}>Rating releases</ArrowLink></div>
          </div>
        </div>
        <p className="mt-12 text-[13px] text-ink-faint">
          Looking for something specific? <Link href="/contact" className="underline">Contact investor relations</Link>.
        </p>
      </Section>
    </>
  );
}
