import { Helmet } from "react-helmet-async";

type SEOProps = {
  title: string;
  description?: string;
  keywords?: string | string[];
  canonical?: string;
  image?: string;
  type?: string;
  jsonLd?: Record<string, any> | Record<string, any>[];
};

const SITE_NAME = "AutoNext";
const DEFAULT_DESC =
  "AutoNext — India's trusted marketplace to buy and sell new & used cars, bikes, EVs, trucks and more.";

export const SEO = ({
  title,
  description = DEFAULT_DESC,
  keywords,
  canonical,
  image,
  type = "website",
  jsonLd,
}: SEOProps) => {
  const fullTitle = title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`;
  const kw = Array.isArray(keywords) ? keywords.join(", ") : keywords;
  const url =
    canonical ||
    (typeof window !== "undefined"
      ? window.location.origin + window.location.pathname
      : undefined);

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {kw && <meta name="keywords" content={kw} />}
      {url && <link rel="canonical" href={url} />}

      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      {url && <meta property="og:url" content={url} />}
      {image && <meta property="og:image" content={image} />}

      <meta name="twitter:card" content={image ? "summary_large_image" : "summary"} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      {image && <meta name="twitter:image" content={image} />}

      {jsonLd && (
        <script type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </script>
      )}
    </Helmet>
  );
};

export default SEO;
