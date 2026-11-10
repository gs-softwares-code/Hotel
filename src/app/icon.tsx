import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = {
  width: 32,
  height: 32,
};
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 18,
          background: "#070c18",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#cf9e38",
          borderRadius: "50%",
          border: "1px solid rgba(207, 158, 56, 0.4)",
          fontWeight: 700,
          fontFamily: "serif",
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

