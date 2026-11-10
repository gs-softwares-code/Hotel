import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = {
  width: 180,
  height: 180,
};
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 96,
          background: "linear-gradient(135deg, #070c18 0%, #13233f 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#dfb75c",
          borderRadius: "36px",
          border: "2px solid rgba(223, 183, 92, 0.4)",
          fontWeight: 700,
          fontFamily: "serif",
          boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
        }}
      >
        A
      </div>
    ),
    {
      ...size,
    }
  );
}

