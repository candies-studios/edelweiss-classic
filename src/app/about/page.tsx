import type { Metadata } from "next";
import Link from "next/link";
import { businesses, company, investorDocs, principles } from "@/content/site";
import { Reveal } from "@/components/Reveal";
import { Arrow, ArrowLink, PageHero, Section, SectionHeader } from "@/components/ui";
import { heroImages } from "@/content/heroes";

export const metadata: Metadata = {
  title: "About Edelweiss",
  description: "Edelweiss is a diversified financial services company with seven independent businesses across credit, asset management, asset reconstruction and insurance.",
  alternates: { canonical: "/about" },
};

export default function About() {
  return (
    <>
      <PageHero image={heroImages.about} eyebrow="About Edelweiss" title="A diversified financial services group, built on principles" intro={company.description} crumbs={[{ label: "About", href: "/about" }]} />

      <Section>
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeader eyebrow="Who we are" title="Ideas create, values protect" />
          </div>
          <div className="space-y-5 text-ink-soft lg:col-span-6 lg:col-start-7">
            <p className="font-display text-[22px] leading-snug text-navy">
              Edelweiss provides a broad range of financial products and services to corporations, institutions and individuals.
            </p>
            <p>
              The group is organised as seven independent businesses: Alternative Asset Management, Mutual Fund, Asset Reconstruction, NBFC, Housing Finance, General Insurance and Life Insurance. Each has its own operating platform, management team and board — a structure designed for focus, accountability and strong governance.
            </p>
            <p>
              Edelweiss Financial Services Limited is listed on the National Stock Exchange (EDELWEISS) and BSE (532922).
            </p>
            <div className="flex flex-wrap gap-x-8 gap-y-3 pt-2">
              <ArrowLink href="/leadership">Our leadership</ArrowLink>
              <ArrowLink href={investorDocs.find((d) => d.category === "Chairman's letter")!.href}>Chairman’s letter FY26</ArrowLink>
              <ArrowLink href={company.boilerplate}>Company boilerplate</ArrowLink>
            </div>
          </div>
        </div>
      </Section>

      <Section tone="mist">
        <SectionHeader eyebrow="Our businesses" title="Four areas of expertise" />
        <div className="mt-12 grid gap-px border border-silver-300 bg-silver-300 md:grid-cols-2">
          {businesses.map((b) => (
            <Link key={b.slug} href={`/businesses/${b.slug}`} className="group bg-white p-8 hover:bg-white/80 md:p-10">
              <h3 className="font-display text-[26px] text-navy group-hover:text-blue">{b.name}</h3>
              <p className="mt-3 max-w-md text-ink-soft">{b.summary}</p>
              <Arrow className="mt-6 text-blue transition-transform group-hover:translate-x-1" />
            </Link>
          ))}
        </div>
      </Section>

      <Section id="principles">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeader eyebrow="Guiding principles" title="How we work" intro="Thirteen principles shape our decisions, our culture and our relationships with every stakeholder." />
          </div>
          <ol className="grid gap-x-10 sm:grid-cols-2 lg:col-span-8">
            {principles.map((p, i) => (
              <Reveal key={p.title}>
                <li className="flex gap-5 border-t border-silver-300 py-5">
                  <span className="w-6 shrink-0 font-display text-[18px] text-blue">{i + 1}</span>
                  <span>
                    <span className="block font-semibold text-navy">{p.title}</span>
                    <span className="mt-1 block text-[15px] text-ink-soft">{p.text}</span>
                  </span>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </Section>
    </>
  );
}
