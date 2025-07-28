"use client";

import "@/app/globals.css";
import { SessionProvider } from "next-auth/react";
import Script from "next/script";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <html lang="fr">
        <head>
          {/* Google Tag Manager Script */}
          <Script id="gtm-script" strategy="afterInteractive">
            {`
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-WVVGCPPQ');
            `}
          </Script>
        </head>
        <body>
          {/* Google Tag Manager noscript */}
          <noscript>
            <iframe
              src="https://www.googletagmanager.com/ns.html?id=GTM-WVVGCPPQ"
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
            ></iframe>
          </noscript>

          {children}
        </body>
      </html>
    </SessionProvider>
  );
}
