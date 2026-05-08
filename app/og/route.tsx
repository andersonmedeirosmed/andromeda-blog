import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const title = searchParams.get("title") ?? "Andromeda LMS Blog";
  const category = searchParams.get("category") ?? "";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: "60px",
          background:
            "linear-gradient(135deg, #172554 0%, #1e3a8a 60%, #2563eb 100%)",
          fontFamily: "sans-serif",
        }}
      >
        {category && (
          <div
            style={{
              display: "flex",
              marginBottom: "20px",
            }}
          >
            <div
              style={{
                background: "rgba(96, 165, 250, 0.25)",
                color: "#93c5fd",
                padding: "6px 18px",
                borderRadius: "100px",
                fontSize: "20px",
              }}
            >
              {category}
            </div>
          </div>
        )}

        <div
          style={{
            color: "white",
            fontSize: title.length > 60 ? "44px" : "52px",
            fontWeight: 700,
            lineHeight: 1.2,
            maxWidth: "1000px",
          }}
        >
          {title}
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginTop: "44px",
            gap: "14px",
          }}
        >
          <div
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "10px",
              background: "#2563eb",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontSize: "20px",
              fontWeight: 700,
            }}
          >
            A
          </div>
          <div style={{ color: "#bfdbfe", fontSize: "20px" }}>
            Andromeda LMS Blog
          </div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
