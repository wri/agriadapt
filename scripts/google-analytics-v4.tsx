import Script from 'next/script';

export default function GoogleAnalyticsV4Script() {
  return (
    <>
      {/* Global site tag (gtag.js) - Google Analytics */}
      <Script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_V4_ID}`}
      />
      <Script
        id="google-analytics-v4"
        strategy="lazyOnload"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){window.dataLayer.push(arguments);}
            gtag('js', new Date());
        
            gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_V4_ID}');
        `,
        }}
      />
    </>
  );
}
