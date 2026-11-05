import Link from "next/link";
import { businesses, company, irLinks } from "@/content/site";
import { Logo } from "@/components/Logo";
import { SmartLink } from "@/components/ui";
import { Kinara } from "@/components/Kinara";

const columns = [
  {
    title: "About Edelweiss",
    links: [
      { label: "Overview", href: "/about" },
      { label: "Our Leadership", href: "/leadership" },
      { label: "Guiding Principles", href: "/about#principles" },
      { label: "Sustainability", href: "/sustainability" },
      { label: "EdelGive Foundation", href: "https://www.edelgive.org/" },
    ],
  },
  { title: "Our Businesses", links: businesses.map((b) => ({ label: b.name, href: `/businesses/${b.slug}` })) },
  {
    title: "Investor Relations",
    links: [
      { label: "Investor Relations", href: "/investors" },
      { label: "Financial Results", href: "/investors/financial-results" },
      { label: "Annual Reports", href: "/investors/annual-reports" },
      { label: "Corporate Governance", href: "/investors/governance" },
      { label: "Investor Services", href: irLinks.investorServices },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Media", href: "/media" },
      { label: "Careers", href: "/careers" },
      { label: "Contact Us", href: "/contact" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-navy-900 text-silver">
      <Kinara tone="light" className="opacity-50" id="footer-kinara" />
      <div className="container py-16">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Logo variant="light" />
            <p className="mt-8 max-w-sm font-display text-[26px] leading-tight text-white">{company.tagline}.</p>
            <p className="mt-2 font-deva text-[17px] text-glacier" lang="hi">विचार सृजन करते हैं, मूल्य रक्षा करते हैं।</p>
            <p className="mt-6 text-[13px]">
              Listed on NSE: <span className="text-white">{company.listings[0].code}</span> · BSE: <span className="text-white">{company.listings[1].code}</span>
            </p>
            <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-[13.5px]">
              {company.social.map((s) => (
                <li key={s.label}>
                  <a href={s.href} target="_blank" rel="noopener noreferrer" className="hover:text-white">
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="grid grid-cols-2 gap-10 sm:grid-cols-4 lg:col-span-8">
            {columns.map((c) => (
              <div key={c.title}>
                <p className="mb-4 text-[13.5px] font-semibold text-white">{c.title}</p>
                <ul className="space-y-2.5 text-[14px]">
                  {c.links.map((l) => (
                    <li key={l.label}>
                      <SmartLink href={l.href} className="hover:text-white">
                        {l.label}
                      </SmartLink>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 border-t border-white/10 pt-8 text-[12.5px] leading-relaxed">
          <p className="max-w-4xl">
            Index values shown on this website are for information only and do not constitute investment advice or a recommendation to buy or sell any security. Investments are subject to market risks; read all offer and scheme-related documents carefully before investing.
          </p>
          <div className="mt-6 flex flex-col justify-between gap-4 md:flex-row md:items-center">
            <p>© {new Date().getFullYear()} {company.name}. All rights reserved.</p>
            <ul className="flex flex-wrap gap-x-6 gap-y-2">
              <li><a href={company.privacyPolicy} target="_blank" rel="noopener noreferrer" className="hover:text-white">Privacy Policy</a></li>
              {/* TODO: replace with the official Terms page URL once published */}
              <li><Link href="/terms" className="hover:text-white">Terms and Conditions</Link></li>
              <li><Link href="/investors/governance" className="hover:text-white">Regulatory Disclosures</Link></li>
              <li><a href={company.publicNotice} target="_blank" rel="noopener noreferrer" className="hover:text-white">Public Notice</a></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
