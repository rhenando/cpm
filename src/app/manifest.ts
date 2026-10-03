import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Cordova Property Management",
    short_name: "Cordova",
    description: "Professional property management and property care across Dubai.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#191c33",
    icons: [
      {
        src: "/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png"
      }
    ]
  };
}
