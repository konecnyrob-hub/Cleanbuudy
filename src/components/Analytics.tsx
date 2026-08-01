import Script from "next/script";

/**
 * Google Analytics 4 (gtag.js).
 * Vloženo v root layoutu → načítá se na všech stránkách.
 * strategy="afterInteractive": skript se stahuje asynchronně až po hydrataci,
 * takže nezdržuje první vykreslení ani LCP.
 */
const GA_MEASUREMENT_ID = "G-QTJXVT6T3B";

export default function Analytics() {
  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}');
        `}
      </Script>
    </>
  );
}
