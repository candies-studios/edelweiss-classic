import type { Metadata } from "next";
import { company, news } from "@/content/site";
import { ArrowLink, PageHero, Section } from "@/components/ui";

export const metadata: Metadata = {
  title: "Media and News",
  description: "Press releases, news coverage and leadership perspectives from Edelweiss.",
  alternates: { canonical: "/media" },
};

const fmt = new Intl.DateTimeFormat("en-IN", { day: "numeric", month: "long", year: "numeric" });

export default function Media() {
  const releases = news.filter((n) => n.kind === "Press release");
  const coverage = news.filter((n) => n.kind === "In the news");
  return (
    <>
      <PageHero eyebrow="Media" title="News, releases and insights" intro="Official announcements and perspectives from Edelweiss leadership in the press." crumbs={[{ label: "Media", href: "/media" }]} />

      <Section>
        <h2 className="font-display text-display-md text-navy">Press releases</h2>
        <ul className="mt-8 divide-y divide-silver-200 border-y border-silver-300">
          {releases.map((n) => (
            <li key={n.href}>
              <a href={n.href} target="_blank" rel="noopener noreferrer" className="group grid gap-2 py-6 md:grid-cols-[180px_1fr_auto] md:items-center md:gap-8">
                <time dateTime={n.date} className="text-[14px] text-ink-faint">{fmt.format(new Date(n.date))}</time>
                <span className="font-display text-[21px] leading-snug text-navy group-hover:text-blue">{n.title}</span>
                <span className="text-[12.5px] font-semibold text-blue">PDF</span>
              </a>
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="mist" id="insights">
        <h2 className="font-display text-display-md text-navy">Insights and coverage</h2>
        <p className="mt-3 max-w-prose text-ink-soft">Perspectives on markets, the economy and Edelweiss, as published in the media.</p>
        <div className="mt-10 grid gap-px border border-silver-300 bg-silver-300 md:grid-cols-2 lg:grid-cols-3">
          {coverage.map((n) => (
            <a key={n.href} href={n.href} target="_blank" rel="noopener noreferrer" className="group flex flex-col bg-white p-8 hover:bg-white/80">
              <span className="text-[13px] font-semibold text-blue">{n.outlet}</span>
              <span className="mt-3 flex-1 font-display text-[21px] leading-snug text-navy group-hover:text-blue">{n.title}</span>
              <time dateTime={n.date} className="mt-6 text-[13px] text-ink-faint">{fmt.format(new Date(n.date))}</time>
            </a>
          ))}
        </div>
      </Section>

      <Section>
        <div className="grid gap-10 md:grid-cols-2">
          <div>
            <h2 className="font-display text-[26px] text-navy">Media resources</h2>
            <p className="mt-3 text-ink-soft">The official company boilerplate for use in coverage.</p>
            <div className="mt-5"><ArrowLink href={company.boilerplate}>Download boilerplate (PDF)</ArrowLink></div>
          </div>
          <div>
            <h2 className="font-display text-[26px] text-navy">Full archive</h2>
            <p className="mt-3 text-ink-soft">Every press release and article is available in the official media centre.</p>
            <div className="mt-5"><ArrowLink href="https://www.edelweissfin.com/media-center">Media centre</ArrowLink></div>
          </div>
        </div>
      </Section>
    </>
  );
}
