import type { Metadata } from "next";
import { company } from "@/content/site";
import { PageHero, Section } from "@/components/ui";

export const metadata: Metadata = {
  title: "Terms and Conditions",
  robots: { index: false },
  alternates: { canonical: "/terms" },
};

/**
 * The official website terms are to be supplied by Edelweiss Legal.
 * Replace this page's content (or point the footer link to the official URL) before launch.
 */
export default function Terms() {
  return (
    <>
      <PageHero title="Terms and Conditions" crumbs={[{ label: "Terms", href: "/terms" }]} />
      <Section>
        <div className="max-w-prose space-y-4 text-ink-soft">
          <p>The terms of use for this website are being finalised and will be published here.</p>
          <p>
            For our privacy practices, please read the{" "}
            <a className="font-semibold text-blue" href={company.privacyPolicy} target="_blank" rel="noopener noreferrer">Privacy Policy</a>.
          </p>
        </div>
      </Section>
    </>
  );
}
