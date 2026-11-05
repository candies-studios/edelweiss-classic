import Image from "next/image";
import Link from "next/link";
import { businesses, careers, company, investorDocs, irLinks, leadership, news } from "@/content/site";
import { ArchJaali } from "@/components/home/ArchJaali";
import { Reveal } from "@/components/Reveal";
import { Arrow, ArrowLink, External, SectionHeader, SmartLink } from "@/components/ui";

const dateFmt = new Intl.DateTimeFormat("en-IN", { day: "numeric", month: "long", year: "numeric" });

/** Figures published by the company on edelweissfin.com (see content/site.ts for sources). */
const glance = [
  { value: "7", label: "Independent businesses, each with its own board" },
  { value: "$10 bn+", label: "Customer assets in asset management" },
  { value: "850+", label: "Talukas reached by Nido Home Finance" },
  { value: "70+", label: "Bank and FI relationships in asset reconstruction" },
];

export default function Home() {
  const latest = investorDocs.filter((d) => d.fy === "FY27").slice(0, 5);

  return (
    <>
      {/* ───────── Hero ───────── */}
      <section className="relative overflow-hidden bg-white">
        <div className="container grid gap-12 pb-20 pt-12 md:pb-24 md:pt-16 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <p className="eyebrow mb-8">Edelweiss Financial Services</p>
            <h1 className="font-display text-display-2xl font-normal">
              Building financial futures. <span className="text-ink-soft">Creating lasting value.</span>
            </h1>
            <div className="mt-14 grid gap-10 border-t border-ink pt-8 md:grid-cols-2">
              <div>
                <p className="font-display text-[22px] leading-snug">{company.tagline}.</p>
                <p className="mt-1 font-deva text-[19px] text-ink-soft" lang="hi">विचार सृजन करते हैं, मूल्य रक्षा करते हैं।</p>
              </div>
              <div>
                <p className="text-ink-soft">
                  Edelweiss brings together financial expertise, innovation and a diversified ecosystem of solutions to help individuals and businesses move forward with confidence.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link href="/businesses" className="btn-primary !px-5">Explore our businesses</Link>
                  <Link href="/about" className="btn-outline !px-5">Discover Edelweiss</Link>
                </div>
              </div>
            </div>
          </div>
          <ArchJaali className="mx-auto hidden h-[520px] w-[336px] lg:col-span-4 lg:block" />
        </div>
      </section>

      {/* ───────── At a glance ───────── */}
      <section className="bg-navy text-white">
        <div className="container py-16 md:py-20">
          <dl className="grid gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {glance.map((g, i) => (
              <div key={g.label} className={`pr-8 ${i > 0 ? "lg:border-l lg:border-white/20 lg:pl-8" : ""}`}>
                <dd className="font-display text-[clamp(44px,5vw,64px)] leading-none">{g.value}</dd>
                <dt className="mt-4 max-w-[16rem] text-[15px] text-silver">{g.label}</dt>
              </div>
            ))}
          </dl>
          <p className="mt-12 text-[12px] text-silver/70">Figures as published by Edelweiss on edelweissfin.com.</p>
        </div>
      </section>

      {/* ───────── Who we are ───────── */}
      <section className="bg-white py-24 md:py-36">
        <div className="container grid gap-10 lg:grid-cols-12">
          <p className="eyebrow lg:col-span-3">Who we are</p>
          <Reveal className="lg:col-span-8">
            <p className="font-display text-[clamp(28px,3.2vw,44px)] leading-[1.18]">
              One vision. Multiple financial possibilities. Edelweiss is one of India’s leading diversified financial services groups, serving corporations, institutions and individuals.
            </p>
            <p className="mt-10 max-w-2xl text-ink-soft">{company.description}</p>
            <div className="mt-10 flex flex-wrap gap-x-10 gap-y-4">
              <ArrowLink href="/about">About Edelweiss</ArrowLink>
              <ArrowLink href={investorDocs.find((d) => d.category === "Chairman's letter")!.href}>Chairman’s letter FY26</ArrowLink>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ───────── Businesses ───────── */}
      <section className="border-t border-silver-300 bg-white pb-24 pt-20 md:pb-36 md:pt-28">
        <div className="container">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeader eyebrow="Our businesses" title="Four areas of expertise" />
            <ArrowLink href="/businesses">All businesses</ArrowLink>
          </div>
          <ul className="mt-16 border-t border-ink">
            {businesses.map((b, i) => (
              <li key={b.slug} className="border-b border-silver-300">
                <Link href={`/businesses/${b.slug}`} className="group grid items-center gap-4 py-8 transition-colors md:grid-cols-12 md:gap-8 md:py-10">
                  <span className="text-[14px] text-ink-faint md:col-span-1">0{i + 1}</span>
                  <span className="font-display text-[clamp(30px,3.4vw,48px)] leading-none transition-colors group-hover:text-blue md:col-span-4">{b.name}</span>
                  <span className="max-w-md text-ink-soft md:col-span-5">{b.summary}</span>
                  <span className="relative hidden h-24 overflow-hidden md:col-span-2 md:block">
                    <Image src={b.image} alt="" fill sizes="200px" className="object-cover opacity-0 grayscale transition duration-500 group-hover:opacity-100 group-hover:grayscale-0" />
                    <Arrow className="absolute right-0 top-1/2 -translate-y-1/2 transition-opacity group-hover:opacity-0" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ───────── Why Edelweiss ───────── */}
      <section className="bg-mist py-24 md:py-36">
        <div className="container">
          <SectionHeader eyebrow="Why Edelweiss" title="Built for the long term" intro="The commitments that shape how we work, in our own principles." />
          <div className="mt-16 grid gap-x-12 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { t: "A diversified ecosystem", d: "Seven independent businesses across credit, asset management, asset reconstruction and insurance." },
              { t: "Independent governance", d: "Each business has its own operating platform, management team and board." },
              { t: "Risk awareness", d: "We continually balance risk against reward, and use capital with prudence." },
              { t: "Reputation first", d: "We value our good name above financial gain, and uphold high standards of integrity." },
              { t: "Customer understanding", d: "We listen first, then meet needs with the right products and solutions." },
              { t: "Responsible growth", d: "An ESG Council and published ESG reports guide how we create value for every stakeholder." },
            ].map((x, i) => (
              <Reveal key={x.t} delay={(i % 3) * 0.05} className="border-t border-ink pt-6">
                <h3 className="font-display text-[24px] leading-tight">{x.t}</h3>
                <p className="mt-3 text-[16px] text-ink-soft">{x.d}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── Investors ───────── */}
      <section className="bg-white py-24 md:py-36">
        <div className="container grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeader eyebrow="Investor relations" title="For shareholders and investors" />
            <dl className="mt-12 grid grid-cols-2 gap-y-5 border-t border-ink pt-6 text-[15px]">
              <dt className="text-ink-faint">NSE</dt><dd>{company.listings[0].code}</dd>
              <dt className="text-ink-faint">BSE</dt><dd>{company.listings[1].code}</dd>
              <dt className="text-ink-faint">Reuters</dt><dd>{company.reuters}</dd>
              <dt className="text-ink-faint">Bloomberg</dt><dd>{company.bloomberg}</dd>
            </dl>
            <div className="mt-10 flex flex-col items-start gap-4">
              <ArrowLink href="/investors">Investor Relations</ArrowLink>
              <ArrowLink href={irLinks.analysisTool}>Financial analysis tool</ArrowLink>
            </div>
          </div>
          <div className="lg:col-span-7 lg:col-start-6">
            <div className="flex items-baseline justify-between border-b border-ink pb-4">
              <h3 className="font-display text-[28px]">Latest results · Q1 FY27</h3>
              <span className="hidden text-[13px] text-ink-faint sm:inline">April–June 2026</span>
            </div>
            <ul>
              {latest.map((d) => (
                <li key={d.href} className="border-b border-silver-300">
                  <a href={d.href} target="_blank" rel="noopener noreferrer" className="group grid grid-cols-[1fr_auto] items-center gap-6 py-5">
                    <span>
                      <span className="block text-[17px] transition-colors group-hover:text-blue">{d.title}</span>
                      <span className="text-[13px] text-ink-faint">{d.category}</span>
                    </span>
                    <span className="flex items-center gap-2 text-[13px] text-ink-soft">{d.format} <External /></span>
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {[
                { l: "Annual reports", h: "/investors/annual-reports" },
                { l: "Corporate governance", h: "/investors/governance" },
                { l: "Disclosures", h: irLinks.overview },
              ].map((x) => (
                <SmartLink key={x.l} href={x.h} className="group flex items-center justify-between bg-mist px-5 py-4 text-[15px] transition-colors hover:bg-ink hover:text-white">
                  {x.l} <Arrow />
                </SmartLink>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ───────── Insights ───────── */}
      <section id="insights" className="border-t border-silver-300 bg-white py-24 md:py-36">
        <div className="container">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeader eyebrow="Insights and news" title="Perspectives" />
            <ArrowLink href="/media">All news</ArrowLink>
          </div>
          <div className="mt-16 grid gap-12 md:grid-cols-3">
            {[news[0], news[1], news[3]].map((n) => (
              <a key={n.href} href={n.href} target="_blank" rel="noopener noreferrer" className="group block border-t border-ink pt-6">
                <p className="text-[13px] text-ink-faint">
                  {n.kind === "In the news" ? n.outlet : "Press release"} · <time dateTime={n.date}>{dateFmt.format(new Date(n.date))}</time>
                </p>
                <p className="mt-5 font-display text-[26px] leading-[1.2] transition-colors group-hover:text-blue">{n.title}</p>
                <span className="mt-6 inline-flex items-center gap-2 text-[14px] text-ink-soft">Read <External /></span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── Leadership ───────── */}
      <section className="bg-mist py-24 md:py-36">
        <div className="container">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeader eyebrow="Leadership" title="Board of Directors" />
            <ArrowLink href="/leadership">Meet the Board</ArrowLink>
          </div>
          <div className="mt-16 grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-4">
            {leadership.slice(0, 4).map((p) => (
              <figure key={p.name} className="group">
                <div className="relative aspect-[3/4] overflow-hidden bg-silver-300">
                  <Image src={p.photo} alt={`Portrait of ${p.name}`} fill sizes="(min-width:768px) 25vw, 50vw" className="object-cover grayscale transition duration-700 group-hover:grayscale-0" />
                </div>
                <figcaption className="mt-5">
                  <p className="font-display text-[22px] leading-tight">{p.name}</p>
                  <p className="mt-1 text-[14px] text-ink-soft">{p.role}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── Sustainability + Careers ───────── */}
      <section className="grid md:grid-cols-2">
        <div className="bg-white px-5 py-24 sm:px-8 md:py-32 lg:px-16">
          <p className="eyebrow mb-6">Sustainability and responsibility</p>
          <h2 className="max-w-md font-display text-display-lg">Governance and responsible growth</h2>
          <p className="mt-6 max-w-md text-ink-soft">We treat governance and sustainability as the foundation of our business, acting with transparency, fairness and accountability.</p>
          <div className="mt-10 flex flex-col items-start gap-4">
            <ArrowLink href={investorDocs.find((d) => d.title === "ESG Report FY26")!.href}>ESG Report FY26</ArrowLink>
            <ArrowLink href="/sustainability">Sustainability at Edelweiss</ArrowLink>
            <ArrowLink href="https://www.edelgive.org/">EdelGive Foundation</ArrowLink>
          </div>
        </div>
        <div className="bg-navy px-5 py-24 text-white sm:px-8 md:py-32 lg:px-16">
          <p className="eyebrow mb-6 !text-silver">Careers</p>
          <h2 className="max-w-md font-display text-display-lg">Build your future with Edelweiss</h2>
          <ul className="mt-8 max-w-md space-y-3 text-silver">
            {careers.culture.slice(0, 3).map((c) => (
              <li key={c.title} className="border-t border-white/15 pt-3">{c.text}</li>
            ))}
          </ul>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link href="/careers" className="btn-light">Explore careers</Link>
            <a href={`mailto:${company.careersEmail}`} className="btn-outline-light">Apply now</a>
          </div>
        </div>
      </section>
    </>
  );
}
