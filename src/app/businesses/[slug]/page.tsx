import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { businesses } from "@/content/site";
import { Arrow, External, PageHero, Section, SmartLink, SourceNote } from "@/components/ui";

export function generateStaticParams() {
  return businesses.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const b = businesses.find((x) => x.slug === slug);
  if (!b) return {};
  return { title: b.name, description: b.summary, alternates: { canonical: `/businesses/${b.slug}` } };
}

export default async function BusinessPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const b = businesses.find((x) => x.slug === slug);
  if (!b) notFound();
  const others = businesses.filter((x) => x.slug !== b.slug);

  return (
    <>
      <PageHero eyebrow="Our businesses" title={b.name} intro={b.summary} crumbs={[{ label: "Our Businesses", href: "/businesses" }, { label: b.name, href: `/businesses/${b.slug}` }]} />

      <Section>
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="space-y-5 lg:col-span-6">
            {b.body.map((p, i) => (
              <p key={i} className={i === 0 ? "font-display text-[22px] leading-snug text-navy" : "text-ink-soft"}>{p}</p>
            ))}
            <div className="flex flex-wrap gap-3 pt-4">
              {b.official.map((o) => (
                <a key={o.href} href={o.href} target="_blank" rel="noopener noreferrer" className="btn-primary">
                  Visit {o.label} <External />
                </a>
              ))}
            </div>
          </div>
          <div className="relative min-h-[320px] bg-silver-200 lg:col-span-5 lg:col-start-8">
            <Image src={b.image} alt="" fill sizes="(min-width:1024px) 40vw, 100vw" className="object-cover" priority />
          </div>
        </div>
      </Section>

      <Section tone="mist">
        <h2 className="font-display text-display-md text-navy">Key offerings</h2>
        <div className={`mt-10 grid gap-px border border-silver-300 bg-silver-300 ${b.offerings.length === 2 ? "md:grid-cols-2" : "md:grid-cols-3"}`}>
          {b.offerings.map((o) => (
            <div key={o.title} className="flex flex-col bg-white p-8">
              <h3 className="text-[19px] font-semibold text-navy">{o.title}</h3>
              <p className="mt-3 flex-1 text-[15.5px] text-ink-soft">{o.text}</p>
              {o.href && (
                <SmartLink href={o.href} className="link-arrow mt-6 self-start text-[14.5px]">
                  Learn more <External />
                </SmartLink>
              )}
            </div>
          ))}
        </div>

        {b.facts && (
          <>
            <dl className="mt-14 grid gap-10 sm:grid-cols-2">
              {b.facts.map((f) => (
                <div key={f.label} className="border-t border-navy pt-6">
                  <dt className="sr-only">{f.label}</dt>
                  <dd className="font-display text-[52px] font-light leading-none text-navy">{f.value}</dd>
                  <dd className="mt-3 text-ink-soft">{f.label}</dd>
                </div>
              ))}
            </dl>
            <SourceNote>
              Source: <a className="underline" href={b.facts[0].source} target="_blank" rel="noopener noreferrer">edelweissfin.com</a>. Figures as published by the company.
            </SourceNote>
          </>
        )}
      </Section>

      <Section>
        <h2 className="font-display text-display-md text-navy">Explore other businesses</h2>
        <ul className="mt-8 grid gap-px border border-silver-300 bg-silver-300 md:grid-cols-3">
          {others.map((o) => (
            <li key={o.slug}>
              <Link href={`/businesses/${o.slug}`} className="group flex h-full items-center justify-between bg-white p-7 hover:bg-mist">
                <span className="font-display text-[22px] text-navy group-hover:text-blue">{o.name}</span>
                <Arrow className="text-blue" />
              </Link>
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}
