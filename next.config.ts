import type { NextConfig } from "next";
import path from "path";
import { fileURLToPath } from "url";

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
};

export default nextConfig;
