import nextMDX from '@next/mdx'

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'mdx'],
  output: 'export',
  images: {
    unoptimized: true,
  },
  outputFileTracingIncludes: {
    '/articles/*': ['./src/app/articles/**/*.mdx'],
  },
}

// Next 16 uses Turbopack for `next build` by default, which requires
// serializable loader options. Passing plugins by string name (resolved by
// @next/mdx) instead of imported function references keeps the config
// serializable while preserving remark-gfm + rehype-prism-plus behavior.
const withMDX = nextMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [['remark-gfm']],
    rehypePlugins: [['rehype-prism-plus', { ignoreMissing: true }]],
  },
})

export default withMDX(nextConfig)
