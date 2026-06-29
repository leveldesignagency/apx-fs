import type { NextConfig } from "next";
import path from "path";
import { fileURLToPath } from "url";
import { FS_LEGACY_NEWS_REDIRECTS, FS_LEGACY_SERVICE_REDIRECTS } from "./src/lib/fs-service-routes";

/** Lockfile also exists at repo root; pin Turbopack to this app so dev/build resolve modules correctly. */
const appDir = path.dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  /** Aligns styled-components with SWC; avoids odd client-bundle behaviour with CSS-in-JS. */
  compiler: {
    styledComponents: true,
  },
  turbopack: {
    root: appDir,
  },
  /**
   * Dev-only: keep webpack cache in memory so HMR survives when .next/cache is
   * cleared externally (e.g. parallel build/restart). Disk pack cache ENOENT
   * was causing 500s and "__webpack_modules__[moduleId] is not a function".
   */
  webpack: (config, { dev }) => {
    if (dev) {
      config.cache = { type: "memory" }
    }
    return config
  },
  async redirects() {
    const legacy = { ...FS_LEGACY_SERVICE_REDIRECTS, ...FS_LEGACY_NEWS_REDIRECTS };
    return Object.entries(legacy).map(([source, destination]) => ({
      source,
      destination,
      permanent: true,
    }));
  },
};

export default nextConfig;
