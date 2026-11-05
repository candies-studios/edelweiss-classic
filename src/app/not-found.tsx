import Link from "next/link";

export default function NotFound() {
  return (
    <section className="bg-mist py-32">
      <div className="container max-w-2xl">
        <p className="eyebrow mb-4">Page not found</p>
        <h1 className="font-display text-display-lg text-navy">We couldn’t find that page.</h1>
        <p className="mt-5 text-ink-soft">It may have moved during the redesign. Try the homepage or search from the top of the page.</p>
        <div className="mt-8 flex gap-3">
          <Link href="/" className="btn-primary">Go to homepage</Link>
          <Link href="/contact" className="btn-outline">Contact us</Link>
        </div>
      </div>
    </section>
  );
}
