import type { NextConfig } from "next";
import path from "path";
import { fileURLToPath } from "url";

/** Lockfile also exists at repo root; pin Turbopack to this app so dev/build resolve modules correctly. */
const appDir = path.dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  turbopack: {
    root: appDir,
  },
};

export default nextConfig;
