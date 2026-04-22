import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  // Let .mdx files be treated as pages, in addition to the usual
  // ts/tsx/js/jsx extensions. Required for the MDX-based blog at
  // /app/blog/<slug>/page.mdx.
  pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],
  reactCompiler: true,
  experimental: {
    optimizePackageImports: ["framer-motion", "lucide-react", "react-icons"],
  },
};

const withMDX = createMDX({
  // Room for remark/rehype plugins later (syntax highlighting, slugs,
  // autolink headings). Left empty for now — base MDX output is fine
  // because mdx-components.tsx styles every block element globally.
});

export default withMDX(nextConfig);
