import { useEffect } from "react";

interface AdSenseBannerProps {
  slot: string;
  client?: string;
  format?: "auto" | "fluid" | "rectangle" | "vertical" | "horizontal";
  responsive?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

declare global {
  interface Window {
    adsbygoogle?: Array<Record<string, unknown>>;
  }
}

export function AdSenseBanner({
  slot,
  client = "ca-pub-5755024838228586",
  format = "auto",
  responsive = true,
  className = "",
  style,
}: AdSenseBannerProps) {
  useEffect(() => {
    try {
      if (typeof window !== "undefined") {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch (err) {
      console.error("AdSense error:", err);
    }
  }, []);

  return (
    <div className={`adsense-container overflow-hidden text-center my-4 ${className}`}>
      <ins
        className="adsbygoogle"
        style={{ display: "block", ...style }}
        data-ad-client={client}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive ? "true" : "false"}
      />
    </div>
  );
}

export default AdSenseBanner;
