import type { Metadata } from "next";
import { investorDocs, irLinks, policies } from "@/content/site";
import { DocLibrary } from "@/components/investors/DocLibrary";
import { ArrowLink, PageHero, Section, SectionHeader } from "@/components/ui";

export const metadata: Metadata = {
  title: "Sustainability",
  description: "ESG reporting, governance, environment and social policies, and the EdelGive Foundation.",
  alternates: { canonical: "/sustainability" },
};

export default function Sustainability() {
  const es = policies.filter((p) => p.group === "Environment & social");
  return (
    <>
      <PageHero eyebrow="Sustainability and responsibility" title="Governance, sustainability and responsible growth" intro="We treat these as the foundation of our business, and commit to acting with transparency, fairness and accountability." crumbs={[{ label: "Sustainability", href: "/sustainability" }]} />

      <Section>
        <div className="grid gap-px border border-silver-300 bg-silver-300 md:grid-cols-3">
          {[
            { t: "Governance", d: "Strengthening oversight, simplifying operations and reducing risk, with practices that protect stakeholders and our reputation." },
            { t: "Customers and communities", d: "Supporting customers and the communities they live in through social change and environmental challenges." },
            { t: "ESG Council", d: "Group-level ESG oversight, chaired by Vidya Shah, Non-Executive Director." },
          ].map((x) => (
            <div key={x.t} className="bg-white p-8 md:p-10">
              <h2 className="font-display text-[24px] text-navy">{x.t}</h2>
              <p className="mt-3 text-ink-soft">{x.d}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section tone="mist">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeader title="ESG reports" intro="Annual reporting on our environmental, social and governance performance." />
            <ul className="mt-8 space-y-3">
              {es.map((p) => (
                <li key={p.href}><ArrowLink href={p.href}>{p.title}</ArrowLink></li>
              ))}
              <li><ArrowLink href={irLinks.governance}>All sustainability and governance documents</ArrowLink></li>
            </ul>
          </div>
          <div className="bg-white p-6 md:p-10 lg:col-span-8">
            <DocLibrary docs={investorDocs} categories={["ESG report", "Chairman's letter"]} />
          </div>
        </div>
      </Section>

      <section className="bg-navy py-20 text-white md:py-28">
        <div className="container grid items-center gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="eyebrow mb-4 !text-glacier">EdelGive Foundation</p>
            <h2 className="font-display text-display-lg">The philanthropic arm of the Edelweiss group</h2>
            <p className="mt-5 max-w-xl text-silver">EdelGive Foundation is led by Vidya Shah, its Chairperson and CEO. Colleagues across Edelweiss take part through volunteering, Joy of Giving week and EdelGive runs.</p>
          </div>
          <div className="lg:col-span-4 lg:col-start-9 lg:text-right">
            <a href="https://www.edelgive.org/" target="_blank" rel="noopener noreferrer" className="btn-light">Visit EdelGive Foundation</a>
          </div>
        </div>
      </section>
    </>
  );
}
