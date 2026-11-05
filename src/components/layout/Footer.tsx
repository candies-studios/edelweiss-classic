import Link from "next/link";
import { businesses, company, irLinks } from "@/content/site";
import { Logo } from "@/components/Logo";
import { Jaali } from "@/components/Jaali";
import { SmartLink } from "@/components/ui";

const columns = [
  {
    title: "About",
    links: [
      { label: "Overview", href: "/about" },
      { label: "Leadership", href: "/leadership" },
      { label: "Guiding Principles", href: "/about#principles" },
      { label: "Sustainability", href: "/sustainability" },
      { label: "EdelGive Foundation", href: "https://www.edelgive.org/" },
    ],
  },
  { title: "Businesses", links: businesses.map((b) => ({ label: b.name, href: `/businesses/${b.slug}` })) },
  {
    title: "Investors",
    links: [
      { label: "Investor Relations", href: "/investors" },
      { label: "Financial Results", href: "/investors/financial-results" },
      { label: "Annual Reports", href: "/investors/annual-reports" },
      { label: "Corporate Governance", href: "/investors/governance" },
      { label: "Investor Services", href: irLinks.investorServices },
    ],
  },
  {
    title: "Connect",
    links: [
      { label: "Media", href: "/media" },
      { label: "Careers", href: "/careers" },
      { label: "Contact Us", href: "/contact" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-navy-900 text-silver">
      <Jaali className="pointer-events-none absolute right-0 top-0 hidden h-72 w-[40%] md:block" stroke="#ffffff" opacity={0.12} fade="left" id="footer-jaali" />
      <div className="container relative pb-12 pt-20">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Logo variant="light" />
            <p className="mt-10 max-w-sm font-display text-[30px] leading-tight text-white">{company.tagline}.</p>
            <p className="mt-3 font-deva text-[18px] text-silver" lang="hi">विचार सृजन करते हैं, मूल्य रक्षा करते हैं।</p>
          </div>
          <div className="grid grid-cols-2 gap-10 sm:grid-cols-4 lg:col-span-7">
            {columns.map((c) => (
              <div key={c.title}>
                <p className="mb-5 text-[13px] text-white">{c.title}</p>
                <ul className="space-y-3 text-[14.5px]">
                  {c.links.map((l) => (
                    <li key={l.label}>
                      <SmartLink href={l.href} className="transition-colors hover:text-white">{l.label}</SmartLink>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-20 flex flex-col gap-6 border-t border-white/15 pt-8 text-[12.5px] md:flex-row md:items-start md:justify-between">
          <div className="max-w-3xl space-y-3 leading-relaxed">
            <p>Index values shown on this website are for information only and do not constitute investment advice. Investments are subject to market risks; read all offer and scheme-related documents carefully before investing.</p>
            <p>© {new Date().getFullYear()} {company.name}. NSE: {company.listings[0].code} · BSE: {company.listings[1].code}</p>
          </div>
          <div className="space-y-4 md:text-right">
            <ul className="flex flex-wrap gap-x-6 gap-y-2 md:justify-end">
              <li><a href={company.privacyPolicy} target="_blank" rel="noopener noreferrer" className="hover:text-white">Privacy Policy</a></li>
              <li><Link href="/terms" className="hover:text-white">Terms and Conditions</Link></li>
              <li><Link href="/investors/governance" className="hover:text-white">Regulatory Disclosures</Link></li>
              <li><a href={company.publicNotice} target="_blank" rel="noopener noreferrer" className="hover:text-white">Public Notice</a></li>
            </ul>
            <ul className="flex flex-wrap gap-x-6 gap-y-2 md:justify-end">
              {company.social.map((s) => (
                <li key={s.label}><a href={s.href} target="_blank" rel="noopener noreferrer" className="hover:text-white">{s.label}</a></li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
