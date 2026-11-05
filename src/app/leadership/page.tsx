import type { Metadata } from "next";
import Image from "next/image";
import { irLinks, leadership } from "@/content/site";
import { ArrowLink, PageHero, Section } from "@/components/ui";

export const metadata: Metadata = {
  title: "Our Leadership",
  description: "The Board of Directors of Edelweiss Financial Services Limited.",
  alternates: { canonical: "/leadership" },
};

export default function Leadership() {
  return (
    <>
      <PageHero eyebrow="Our leadership" title="Board of Directors" intro="Experienced leaders from financial services, economics, banking and public service." crumbs={[{ label: "About", href: "/about" }, { label: "Leadership", href: "/leadership" }]} />
      <Section>
        <ul className="grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {leadership.map((p) => (
            <li key={p.name}>
              <article>
                <div className="relative aspect-[4/5] overflow-hidden bg-mist">
                  <Image src={p.photo} alt={`Portrait of ${p.name}`} fill sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw" className="object-cover" />
                </div>
                <h2 className="mt-5 font-display text-[24px] text-navy">{p.name}</h2>
                <p className="mt-1 text-[14px] font-semibold text-blue">{p.role}</p>
                <p className="mt-3 text-[15px] text-ink-soft">{p.bio}</p>
              </article>
            </li>
          ))}
        </ul>
        <div className="mt-16 flex flex-wrap gap-x-8 gap-y-3 border-t border-silver-300 pt-8">
          <ArrowLink href={irLinks.boardCommittees}>Board committees</ArrowLink>
          <ArrowLink href="https://www.edelweissfin.com/our-leadership">Full profiles on edelweissfin.com</ArrowLink>
        </div>
      </Section>
    </>
  );
}
