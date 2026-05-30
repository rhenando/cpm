import Link from "next/link";

export default function NotFound() {
  return (
    <section className="section bg-[#f6f5f1]">
      <div className="container max-w-3xl text-center">
        <p className="eyebrow">404</p>
        <h1 className="mt-4 text-4xl font-extrabold text-[#191c33]">Page not found</h1>
        <p className="mt-4 text-[#5e6070]">
          The Cordova page you requested is not part of this static rebuild.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex min-h-12 items-center justify-center rounded-md bg-[#bd8f13] px-6 py-3 text-sm font-extrabold uppercase tracking-wide text-white transition hover:bg-[#d0a424]"
        >
          Return home
        </Link>
      </div>
    </section>
  );
}
