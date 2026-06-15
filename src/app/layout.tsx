import { type Metadata } from 'next'

import { Providers } from '@/app/providers'
import { Layout } from '@/components/Layout'

import '@/styles/tailwind.css'

export const metadata: Metadata = {
  title: {
    template: '%s - Peter Braun',
    default: 'Peter Braun - Software designer, founder, and tech enthusiast.',
  },
  description:
    'I’m Peter, a software designer, full-stack developer, and tech enthusiast based in Fulda, Germany. As a co-founder of Snapper, I focus on creating simple, user-friendly solutions. During my studies, I honed my full-stack skills and gained experience working independently on innovative projects.',
  alternates: {
    types: {
      'application/rss+xml': `${process.env.NEXT_PUBLIC_SITE_URL}/feed.xml`,
    },
  },
}

const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Peter Braun',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://beipeter.com',
  jobTitle: 'Software Developer',
  sameAs: [
    'https://kean-software.com',
    'https://www.linkedin.com/in/peter-braun-882869255/',
    'https://github.com/xKean',
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="h-full antialiased" suppressHydrationWarning>
      <body className="flex h-full bg-zinc-50 dark:bg-black">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <Providers>
          <div className="flex w-full">
            <Layout>{children}</Layout>
          </div>
        </Providers>
      </body>
    </html>
  )
}
