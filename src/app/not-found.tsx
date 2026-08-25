import Link from "next/link";

export default function NotFound() {
  return (
    <section className="section bg-[#f1f0f3]">
      <div className="container max-w-3xl text-center">
        <p className="eyebrow">404</p>
        <h1 className="mt-4 text-4xl font-extrabold text-[#191c33]">Page not found</h1>
        <p className="mt-4 text-[#242424]">
          The Cordova page you requested is not part of this static rebuild.
        </p>
        <Link
          href="/"
          className="brand-button-primary mt-8 inline-flex min-h-12 items-center justify-center rounded-[10px] border-2 px-6 py-3 text-sm font-black uppercase tracking-[0.1em] transition"
        >
          Return home
        </Link>
      </div>
    </section>
  );
}
