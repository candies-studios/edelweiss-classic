import type { Metadata } from "next";
import { careers, company } from "@/content/site";
import { PageHero, Section, SectionHeader } from "@/components/ui";

export const metadata: Metadata = {
  title: "Careers",
  description: "Build your future with Edelweiss: culture, development and how to apply.",
  alternates: { canonical: "/careers" },
};

export default function Careers() {
  return (
    <>
      <PageHero eyebrow="Careers" title="Build your future with Edelweiss" intro="Varied businesses and roles, room to grow personally and professionally, and the freedom to lead." crumbs={[{ label: "Careers", href: "/careers" }]} />

      <Section>
        <SectionHeader eyebrow="Our culture" title="Where people grow" />
        <div className="mt-12 grid gap-px border border-silver-300 bg-silver-300 sm:grid-cols-2 lg:grid-cols-4">
          {careers.culture.map((c) => (
            <div key={c.title} className="bg-white p-8">
              <h3 className="text-[18px] font-semibold text-navy">{c.title}</h3>
              <p className="mt-3 text-[15px] text-ink-soft">{c.text}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section tone="mist">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <SectionHeader eyebrow="Development" title="Growing leaders" intro="The Edelweiss Emerging Leaders programme, senior leadership meets and the Titans awards recognise and develop talent across the group." />
          </div>
          <div className="bg-white p-8 md:p-10 lg:col-span-5 lg:col-start-8">
            <h2 className="font-display text-[26px] text-navy">Apply</h2>
            <p className="mt-3 text-ink-soft">Send your CV and the area you’d like to work in to our talent acquisition team.</p>
            <a href={`mailto:${company.careersEmail}?subject=Application`} className="btn-primary mt-6">Apply now</a>
            <p className="mt-4 break-all text-[13.5px] text-ink-faint">{company.careersEmail}</p>
          </div>
        </div>
      </Section>
    </>
  );
}
