import { readFile } from 'node:fs/promises'
import * as path from 'node:path'
import * as runtime from 'react/jsx-runtime'

import { evaluate } from '@mdx-js/mdx'
import * as cheerio from 'cheerio'
import { Feed } from 'feed'
// @ts-expect-error -- react-dom/server.browser has no type declarations but is
// the supported entry point for a Next.js server route (direct imports of
// 'react-dom/server' are blocked by the Next.js compiler).
import { renderToStaticMarkup } from 'react-dom/server.browser'
import remarkGfm from 'remark-gfm'

import { getAllArticles } from '@/lib/articles'

export const dynamic = 'force-static'

// Stub components used while rendering MDX to HTML for the feed. We bypass the
// real ArticleLayout (a client component that depends on next/navigation and
// app context) because renderToStaticMarkup cannot evaluate client components.
function StubArticleLayout({ children }: { children?: React.ReactNode }) {
  return <div data-mdx-content>{children}</div>
}

async function renderArticleHtml(slug: string): Promise<string> {
  const filePath = path.join(
    process.cwd(),
    'src',
    'app',
    'articles',
    slug,
    'page.mdx',
  )
  const source = await readFile(filePath, 'utf8')

  // Strip all imports from the MDX source. evaluate() cannot resolve them
  // from a route-handler context (no baseUrl, no webpack asset pipeline).
  // We also capture the identifier names so we can rewrite JSX expressions
  // that reference them (e.g. <Image src={parkmania} />) to placeholder
  // strings - otherwise MDX evaluation fails with "X is not defined".
  const importedIdentifiers = new Set<string>()
  const importRe =
    /^import\s+(?:(\w+)|\{([^}]+)\})\s+from\s+['"][^'"]+['"];?\s*$/gm
  let cleaned = source.replace(importRe, (_, defaultName, namedList) => {
    if (defaultName) importedIdentifiers.add(defaultName)
    if (namedList) {
      namedList
        .split(',')
        .map((s: string) => s.trim().split(/\s+as\s+/).pop()!.trim())
        .forEach((n: string) => importedIdentifiers.add(n))
    }
    return ''
  })

  // Replace `{identifier}` expressions with a placeholder string so MDX can
  // still parse and evaluate the JSX without those imports resolving.
  for (const name of importedIdentifiers) {
    const exprRe = new RegExp(`\\{\\s*${name}\\s*\\}`, 'g')
    cleaned = cleaned.replace(exprRe, `""`)
  }

  const stubMap: Record<string, React.ComponentType<Record<string, unknown>>> =
    {
      ArticleLayout: StubArticleLayout,
      Image: () => null,
    }

  const { default: MDXContent } = await evaluate(cleaned, {
    ...(runtime as unknown as Parameters<typeof evaluate>[1]),
    baseUrl: import.meta.url,
    remarkPlugins: [remarkGfm],
    useMDXComponents: () => stubMap,
  })

  const html = renderToStaticMarkup(<MDXContent components={stubMap} />)

  const $ = cheerio.load(html)
  return (
    $('[data-mdx-content]').first().html() ?? $('article').first().html() ?? html
  )
}

export async function GET() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL

  if (!siteUrl) {
    throw Error('Missing NEXT_PUBLIC_SITE_URL environment variable')
  }

  const author = {
    name: 'Peter Braun',
    email: 'info@beipeter.com',
  }

  const feed = new Feed({
    title: author.name,
    description:
      'Peter Braun - Software designer, founder, and tech enthusiast.',
    author,
    id: siteUrl,
    link: siteUrl,
    language: 'en',
    image: `${siteUrl}/favicon.ico`,
    favicon: `${siteUrl}/favicon.ico`,
    copyright: `All rights reserved ${new Date().getFullYear()}`,
    feedLinks: {
      rss2: `${siteUrl}/feed.xml`,
    },
  })

  const articles = await getAllArticles()

  for (const article of articles) {
    const publicUrl = `${siteUrl}/articles/${article.slug}`
    const content = await renderArticleHtml(article.slug)

    feed.addItem({
      title: article.title,
      id: publicUrl,
      link: publicUrl,
      content,
      author: [author],
      contributor: [author],
      date: new Date(article.date),
    })
  }

  return new Response(feed.rss2(), {
    status: 200,
    headers: {
      'content-type': 'application/xml',
      'cache-control': 's-maxage=31556952',
    },
  })
}
