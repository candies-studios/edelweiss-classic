import type { Metadata } from "next";
import { businesses, contacts, offices } from "@/content/site";
import { PageHero, Section, SmartLink } from "@/components/ui";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Offices and contacts for Edelweiss Financial Services.",
  alternates: { canonical: "/contact" },
};

export default function Contact() {
  return (
    <>
      <PageHero eyebrow="Contact us" title="Get in touch" intro="Our offices and the right contact for investors, customers, media and careers." crumbs={[{ label: "Contact", href: "/contact" }]} />

      <Section>
        <h2 className="font-display text-display-md text-navy">Offices</h2>
        <div className="mt-10 grid gap-px border border-silver-300 bg-silver-300 md:grid-cols-2">
          {offices.map((o) => (
            <address key={o.city} className="bg-white p-8 not-italic md:p-10">
              <p className="font-display text-[26px] text-navy">{o.city}</p>
              <p className="mt-1 text-[14px] font-semibold text-blue">{o.label}</p>
              <p className="mt-4 text-ink-soft">{o.address}</p>
              {o.phone && (
                <a href={`tel:${o.phone.replace(/\s/g, "")}`} className="mt-3 inline-block font-medium text-navy hover:text-blue">
                  {o.phone}
                </a>
              )}
            </address>
          ))}
        </div>
      </Section>

      <Section tone="mist">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-display-md text-navy">Write to us</h2>
            <dl className="mt-8 divide-y divide-silver-300 border-y border-silver-300">
              {contacts.map((c) => (
                <div key={c.label} className="grid gap-1 py-5 sm:grid-cols-[200px_1fr]">
                  <dt className="text-ink-soft">{c.label}</dt>
                  <dd><a href={c.href} className="break-all font-medium text-navy hover:text-blue">{c.value}</a></dd>
                </div>
              ))}
            </dl>
          </div>
          <div>
            <h2 className="font-display text-display-md text-navy">Customer service</h2>
            <p className="mt-4 text-ink-soft">For questions about a loan, policy or investment, please contact the business directly.</p>
            <ul className="mt-8 space-y-3">
              {businesses.flatMap((b) => b.official).map((o) => (
                <li key={o.href}>
                  <SmartLink href={o.href} className="link-arrow">{o.label}</SmartLink>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>
    </>
  );
}
