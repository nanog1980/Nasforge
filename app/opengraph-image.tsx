import { ImageResponse } from "next/og";

export const runtime = "nodejs";
export const alt = "Nasforge — Forge ton propre NAS";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background:
            "linear-gradient(135deg, #0a0d12 0%, #161b24 50%, #0a0d12 100%)",
          color: "#f5f5f5",
          fontFamily: "sans-serif",
          padding: 80,
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(circle at 80% 20%, rgba(217, 119, 87, 0.15) 0%, transparent 50%)",
            display: "flex",
          }}
        />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 32,
            zIndex: 1,
          }}
        >
          <svg width="130" height="130" viewBox="0 0 24 24" fill="none">
            <path
              d="M12 2 L4 7 L4 17 L12 22 L20 17 L20 7 Z"
              stroke="#d97757"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="rgba(217, 119, 87, 0.12)"
            />
            <path d="M12 7 L12 17" stroke="#d97757" strokeWidth="1.8" strokeLinecap="round" />
            <path d="M8 9 L16 9" stroke="#d97757" strokeWidth="1.8" strokeLinecap="round" />
            <path d="M8 13 L16 13" stroke="#d97757" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
          <div
            style={{
              fontSize: 140,
              fontWeight: 700,
              letterSpacing: "-0.04em",
              color: "#f5f5f5",
              display: "flex",
            }}
          >
            Nas<span style={{ color: "#d97757" }}>forge</span>
          </div>
        </div>
        <div
          style={{
            fontSize: 44,
            marginTop: 32,
            color: "#cccccc",
            textAlign: "center",
            maxWidth: 1000,
            lineHeight: 1.25,
            zIndex: 1,
          }}
        >
          Forge ton propre NAS.
        </div>
        <div
          style={{
            fontSize: 24,
            marginTop: 22,
            color: "#888888",
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            zIndex: 1,
          }}
        >
          Hardware · TrueNAS Scale · ZFS · Backup · Monitoring
        </div>
      </div>
    ),
    { ...size }
  );
}
