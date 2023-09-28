/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    domains: ["images.ctfassets.net"],
  },
  i18n: {
    locales: ["en-US", "es-ES"],
    defaultLocale: "en-US",
    localeDetection: true,
    domains: [
      {
        domain: "kykeonanalytics.com",
        defaultLocale: "en-US",
      },
      {
        domain: "kykeonanalytics.es",
        defaultLocale: "es-ES",
      },
    ],
  },
};
