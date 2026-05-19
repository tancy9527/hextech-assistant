import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "海克斯助手 — Hextech ARAM",
    short_name: "海克斯助手",
    description: "英雄联盟海克斯大乱斗符文推荐助手",
    start_url: "/",
    display: "standalone",
    background_color: "#FAF7F2",
    theme_color: "#B5C4B1",
    orientation: "portrait",
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
