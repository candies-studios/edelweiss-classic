import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { businesses } from "@/content/site";
import { Arrow, PageHero, Section } from "@/components/ui";

export const metadata: Metadata = {
  title: "Our Businesses",
  description: "Credit, asset management, asset reconstruction and insurance businesses of Edelweiss.",
  alternates: { canonical: "/businesses" },
};

export default function Businesses() {
  return (
    <>
      <PageHero eyebrow="Our businesses" title="A diversified ecosystem of financial solutions" intro="Each business is run independently, with its own operating platform, management team and board." crumbs={[{ label: "Our Businesses", href: "/businesses" }]} />
      <Section>
        <div className="space-y-6">
          {businesses.map((b, i) => (
            <Link key={b.slug} href={`/businesses/${b.slug}`} className={`group grid overflow-hidden bg-mist md:grid-cols-2 ${i % 2 ? "md:[&>*:first-child]:order-2" : ""}`}>
              <div className="relative min-h-[260px] bg-silver-200">
                <Image src={b.image} alt="" fill sizes="(min-width:768px) 50vw, 100vw" className="object-cover transition-transform duration-700 ease-refined group-hover:scale-[1.03]" />
              </div>
              <div className="flex flex-col justify-center p-8 md:p-14">
                <h2 className="font-display text-display-md text-navy group-hover:text-blue">{b.name}</h2>
                <p className="mt-4 max-w-md text-ink-soft">{b.summary}</p>
                <span className="link-arrow mt-8">Explore {b.name} <Arrow /></span>
              </div>
            </Link>
          ))}
        </div>
      </Section>
    </>
  );
}
