const BRAND_LINE = /^cordova property management$/i;
const DATE_LINE = /^[A-Z][a-z]+\s+\d{1,2},\s+\d{4}$/;

export function cleanPostTitle(value: string) {
  const title = value.replace(/\s+/g, " ").trim();
  const parts = title.split(/\s*\|\s*/).map((part) => part.trim()).filter(Boolean);
  const hasDraftBanner = parts.some((part) => /\bblog draft\b/i.test(part));

  if (!hasDraftBanner) return title;

  const articleParts = parts.filter((part) =>
    !BRAND_LINE.test(part)
    && !/\bblog draft\b/i.test(part)
    && !DATE_LINE.test(part)
  );

  return (articleParts.at(-1) || title).replace(/^\d+\s+/, "");
}
