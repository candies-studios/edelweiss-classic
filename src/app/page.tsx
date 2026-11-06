import Image from "next/image";
import Link from "next/link";
import { businesses, careers, company, investorDocs, irLinks, leadership, news } from "@/content/site";
import { heroImages } from "@/content/heroes";
import heroImage from "@/assets/hero-skyline.jpg";
import { CountUp } from "@/components/home/CountUp";
import { Kinara } from "@/components/Kinara";
import { Reveal } from "@/components/Reveal";
import { Arrow, ArrowLink, External, SectionHeader, SmartLink } from "@/components/ui";

const dateFmt = new Intl.DateTimeFormat("en-IN", { day: "numeric", month: "long", year: "numeric" });

/** Figures published by the company on edelweissfin.com (sources in content/site.ts). */
const glance = [
  { value: "7", label: "Independent businesses" },
  { value: "$10 bn+", label: "Customer assets in asset management" },
  { value: "850+", label: "Talukas reached by Nido Home Finance" },
  { value: "109", label: "Life insurance branches in 88 cities" },
];

export default function Home() {
  const latest = investorDocs.filter((d) => d.fy === "FY27").slice(0, 5);
  const spans = ["lg:col-span-7", "lg:col-span-5", "lg:col-span-5", "lg:col-span-7"];

  return (
    <>
      {/* ───────── Hero: full-bleed photograph (same treatment as inner-page heroes) ───────── */}
      <section className="relative overflow-hidden bg-navy text-white">
        <Image src={heroImage} alt="" fill priority placeholder="blur" sizes="100vw" className="object-cover object-[65%_center] motion-safe:animate-settle" />
        {/* Warm-ink scrim: deepest at the bottom-left where the text sits */}
        <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/45 to-navy/10" aria-hidden="true" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy/70 via-navy/25 to-transparent" aria-hidden="true" />
        <div className="container relative flex min-h-[min(90vh,840px)] flex-col justify-end pb-28 pt-24 md:pb-32">
          <span aria-hidden="true" className="mb-8 block h-px w-14 bg-glacier" />
          <p className="mb-5 text-[13.5px] font-semibold text-glacier">{company.tagline}</p>
          <h1 className="max-w-4xl font-display text-display-2xl">
            Building financial futures.
            <br />
            Creating lasting value.
          </h1>
          <p className="mt-6 max-w-2xl text-[18px] leading-relaxed text-glacier">
            Edelweiss brings together financial expertise, innovation and a diversified ecosystem of solutions to help individuals and businesses move forward with confidence.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link href="/businesses" className="btn-light">Explore our businesses</Link>
            <Link href="/about" className="btn-outline-light">Discover Edelweiss</Link>
          </div>
        </div>
        <Kinara tone="light" className="relative opacity-80" id="home-hero-kinara" />
      </section>

      {/* ───────── At a glance: card overlapping the hero's lower edge ───────── */}
      <section aria-label="Edelweiss at a glance" className="relative z-10">
        <noscript>
          <style>{".countup-anim{display:none}.countup-final{display:block!important}"}</style>
        </noscript>
        <div className="container -mt-20 md:-mt-24">
          <dl className="grid grid-cols-2 border border-silver-300 border-t-[3px] border-t-brass bg-white shadow-[0_24px_48px_-24px_rgba(28,25,21,0.45)] lg:grid-cols-4">
            {glance.map((g, i) => (
              <div
                key={g.label}
                className="flex min-w-0 flex-col border-silver-300 px-5 py-7 sm:px-8 sm:py-9 lg:px-10 lg:py-11 max-lg:even:border-l max-lg:[&:nth-child(n+3)]:border-t lg:[&:not(:first-child)]:border-l"
              >
                <dt className="mt-4 text-[14px] leading-snug text-ink-soft sm:text-[15px]">{g.label}</dt>
                <dd className="order-first font-display text-[clamp(40px,4.4vw,60px)] leading-none text-blue lining-nums">
                  <CountUp value={g.value} delay={i * 150} suffixClassName="ml-[0.04em] text-[0.55em]" />
                </dd>
              </div>
            ))}
          </dl>
          <nav aria-label="Our businesses" className="mt-10 grid grid-cols-2 border-t border-ink/20 md:grid-cols-4">
            {businesses.map((b) => (
              <Link key={b.slug} href={`/businesses/${b.slug}`} className="group flex items-center justify-between gap-3 py-5 pr-6 text-[15px] text-ink-soft transition-colors hover:text-ink">
                {b.name}
                <Arrow className="opacity-50 transition-all group-hover:translate-x-1 group-hover:opacity-100" />
              </Link>
            ))}
          </nav>
          <div className="mt-5 flex flex-wrap items-center justify-between gap-x-8 gap-y-3">
            <p className="text-[12.5px] text-ink-faint">Figures as published by Edelweiss on edelweissfin.com. Life insurance branches as of March 2024.</p>
            <ArrowLink href="/investors">Investor relations</ArrowLink>
          </div>
        </div>
      </section>

      {/* ───────── Statement ───────── */}
      <section className="bg-white py-24 md:py-36">
        <div className="container grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-3">
            <p className="eyebrow">Who we are</p>
            <p className="mt-3 font-deva text-[17px] text-ink-soft" lang="hi">विचार सृजन करते हैं, मूल्य रक्षा करते हैं।</p>
          </div>
          <Reveal className="lg:col-span-9">
            <p className="font-display text-[clamp(28px,3.4vw,46px)] leading-[1.22]">
              One vision. Multiple financial possibilities. Edelweiss is one of India’s leading diversified financial services groups — {company.tagline.toLowerCase()}.
            </p>
            <div className="mt-12 grid gap-8 md:grid-cols-2">
              <p className="text-ink-soft">{company.description}</p>
              <div className="flex flex-col items-start gap-4 md:pl-8">
                <ArrowLink href="/about">About Edelweiss</ArrowLink>
                <ArrowLink href="/leadership">Our leadership</ArrowLink>
                <ArrowLink href={investorDocs.find((d) => d.category === "Chairman's letter")!.href}>Chairman’s letter FY26</ArrowLink>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ───────── Businesses: photo tiles ───────── */}
      <section className="bg-white pb-24 md:pb-36">
        <div className="container">
          <Kinara className="mb-16" id="biz-kinara" />
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeader eyebrow="Our businesses" title="Four areas of expertise" />
            <ArrowLink href="/businesses">All businesses</ArrowLink>
          </div>
          <div className="mt-14 grid gap-x-6 gap-y-14 lg:grid-cols-12">
            {businesses.map((b, i) => (
              <Reveal key={b.slug} className={spans[i]} delay={(i % 2) * 0.05}>
                <Link href={`/businesses/${b.slug}`} className="group block">
                  <div className="relative aspect-[16/9] overflow-hidden bg-mist">
                    <Image src={heroImages.business[b.slug]} alt="" fill sizes="(min-width:1024px) 58vw, 100vw" className="object-cover transition-transform duration-[1200ms] ease-refined group-hover:scale-[1.04]" />
                  </div>
                  <div className="mt-6 flex items-start justify-between gap-6 border-t border-ink pt-5">
                    <div>
                      <h3 className="font-display text-[30px] leading-tight transition-colors group-hover:text-blue">{b.name}</h3>
                      <p className="mt-2 max-w-md text-[15.5px] text-ink-soft">{b.summary}</p>
                    </div>
                    <Arrow className="mt-3 shrink-0 text-brass transition-transform group-hover:translate-x-1" />
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── Why Edelweiss ───────── */}
      <section className="bg-white py-24 md:py-36">
        <div className="container grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeader eyebrow="Why Edelweiss" title="Built for the long term" intro="The commitments that shape how we work, in our own principles." />
          </div>
          <dl className="grid gap-x-12 sm:grid-cols-2 lg:col-span-7 lg:col-start-6">
            {[
              { t: "A diversified ecosystem", d: "Seven independent businesses across credit, asset management, asset reconstruction and insurance." },
              { t: "Independent governance", d: "Each business has its own operating platform, management team and board." },
              { t: "Risk awareness", d: "We continually balance risk against reward, and use capital with prudence." },
              { t: "Reputation first", d: "We value our good name above financial gain, and uphold high standards of integrity." },
              { t: "Customer understanding", d: "We listen first, then meet needs with the right products and solutions." },
              { t: "Responsible growth", d: "An ESG Council and published ESG reports guide value creation for every stakeholder." },
            ].map((x) => (
              <div key={x.t} className="border-t border-silver-300 py-7">
                <dt className="font-display text-[23px] leading-tight">{x.t}</dt>
                <dd className="mt-2 text-[15.5px] text-ink-soft">{x.d}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ───────── Investors: photo + latest results ───────── */}
      <section className="grid bg-navy text-white lg:grid-cols-2">
        <div className="relative min-h-[360px]">
          <Image src={heroImages.investors} alt="" fill sizes="(min-width:1024px) 50vw, 100vw" className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/30 to-transparent" aria-hidden="true" />
          <div className="absolute inset-x-0 bottom-0 p-8 md:p-14">
            <p className="text-[13.5px] font-semibold text-glacier">Investor relations</p>
            <h2 className="mt-3 max-w-md font-display text-display-lg">For shareholders and investors</h2>
            <dl className="mt-8 flex flex-wrap gap-x-10 gap-y-3 text-[14.5px] tabular-nums">
              <div><dt className="inline text-glacier">NSE </dt><dd className="inline font-semibold">{company.listings[0].code}</dd></div>
              <div><dt className="inline text-glacier">BSE </dt><dd className="inline font-semibold">{company.listings[1].code}</dd></div>
              <div><dt className="inline text-glacier">Bloomberg </dt><dd className="inline font-semibold">{company.bloomberg}</dd></div>
            </dl>
          </div>
        </div>
        <div className="p-8 md:p-14">
          <div className="flex items-baseline justify-between border-b border-white/25 pb-4">
            <h3 className="font-display text-[26px]">Latest results · Q1 FY27</h3>
            <span className="hidden text-[13px] text-glacier sm:inline">April–June 2026</span>
          </div>
          <ul>
            {latest.map((d) => (
              <li key={d.href} className="border-b border-white/10">
                <a href={d.href} target="_blank" rel="noopener noreferrer" className="group grid grid-cols-[1fr_auto] items-center gap-6 py-5">
                  <span>
                    <span className="block text-[16px] transition-colors group-hover:text-glacier">{d.title}</span>
                    <span className="text-[13px] text-silver">{d.category}</span>
                  </span>
                  <span className="flex items-center gap-2 text-[13px] text-glacier">{d.format} <External /></span>
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link href="/investors" className="btn-light">Investor Relations</Link>
            <SmartLink href={irLinks.analysisTool} className="btn-outline-light">Financial analysis tool</SmartLink>
          </div>
        </div>
      </section>

      {/* ───────── Insights ───────── */}
      <section id="insights" className="bg-white py-24 md:py-36">
        <div className="container">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeader eyebrow="Insights and news" title="Perspectives" />
            <ArrowLink href="/media">All news and media</ArrowLink>
          </div>
          <div className="mt-14 grid gap-12 md:grid-cols-3">
            {[news[0], news[1], news[4]].map((n) => (
              <a key={n.href} href={n.href} target="_blank" rel="noopener noreferrer" className="group block border-t border-ink pt-6">
                <p className="text-[13px] text-ink-faint">
                  <span className="font-semibold text-blue">{n.kind === "In the news" ? n.outlet : "Press release"}</span> · <time dateTime={n.date}>{dateFmt.format(new Date(n.date))}</time>
                </p>
                <p className="mt-5 font-display text-[25px] leading-[1.25] transition-colors group-hover:text-blue">{n.title}</p>
                <span className="mt-6 inline-flex items-center gap-2 text-[14px] font-semibold text-ink-soft">Read <External className="text-brass" /></span>
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
          <div className="mt-14 grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-4">
            {leadership.slice(0, 4).map((p) => (
              <figure key={p.name}>
                <div className="relative aspect-[3/4] overflow-hidden bg-silver-300">
                  <Image src={p.photo} alt={`Portrait of ${p.name}`} fill sizes="(min-width:768px) 25vw, 50vw" className="object-cover" />
                </div>
                <figcaption className="mt-5 border-t border-brass/50 pt-4">
                  <p className="font-display text-[21px] leading-tight">{p.name}</p>
                  <p className="mt-1 text-[14px] text-ink-soft">{p.role}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── Sustainability ───────── */}
      <section className="grid bg-white lg:grid-cols-2">
        <div className="relative order-last min-h-[340px] lg:order-first">
          <Image src={heroImages.sustainability} alt="" fill sizes="(min-width:1024px) 50vw, 100vw" className="object-cover" />
        </div>
        <div className="flex flex-col justify-center px-5 py-20 sm:px-8 lg:px-16 lg:py-28">
          <p className="eyebrow">Sustainability and responsibility</p>
          <h2 className="mt-4 max-w-lg font-display text-display-lg">Governance, sustainability and responsible growth</h2>
          <p className="mt-6 max-w-lg text-ink-soft">We treat governance and sustainability as the foundation of our business, acting with transparency, fairness and accountability.</p>
          <div className="mt-10 flex flex-col items-start gap-4">
            <ArrowLink href={investorDocs.find((d) => d.title === "ESG Report FY26")!.href}>ESG Report FY26</ArrowLink>
            <ArrowLink href="/sustainability">Sustainability at Edelweiss</ArrowLink>
            <ArrowLink href="https://www.edelgive.org/">EdelGive Foundation</ArrowLink>
          </div>
        </div>
      </section>

      {/* ───────── Careers: full-bleed band ───────── */}
      <section className="relative overflow-hidden bg-navy text-white">
        <Image src={heroImages.careers} alt="" fill sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy/90 via-navy/60 to-navy/20" aria-hidden="true" />
        <div className="container relative py-28 md:py-40">
          <p className="text-[13.5px] font-semibold text-glacier">Careers</p>
          <h2 className="mt-4 max-w-xl font-display text-display-xl">Build your future with Edelweiss</h2>
          <p className="mt-6 max-w-lg text-glacier">{careers.culture[0].text} {careers.culture[1].text}</p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link href="/careers" className="btn-light">Explore careers</Link>
            <a href={`mailto:${company.careersEmail}`} className="btn-outline-light">Apply now</a>
          </div>
        </div>
      </section>
    </>
  );
}
