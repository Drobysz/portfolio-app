import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  basePath: '/portfolio-app',

  assetPrefix: '/portfolio-app/',

  output: 'export',
  
  productionBrowserSourceMaps: false,
};

export default nextConfig;
