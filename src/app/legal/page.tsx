import { type Metadata } from 'next'
import { SimpleLayout } from '@/components/SimpleLayout'

export const metadata: Metadata = {
  title: 'Impressum',
  description: 'Impressum und rechtliche Hinweise.',
}

export default function Legal() {
  return (
    <SimpleLayout
      title="Impressum"
      intro="Hier finden Sie unser Impressum und alle rechtlich relevanten Informationen."
    >
      <div className="prose mx-auto dark:prose-invert">
        <h1>Impressum</h1>

        <p>
          Peter Oskar Keanu Braun
          <br />
          An den M&uuml;hlwiesen 3<br />
          36355 Grebenhain
        </p>

        <h2>Kontakt</h2>
        <p>
          Telefon: 01703122359
          <br />
          E-Mail: info@beipeter.com
        </p>

        <h2>EU-Streitschlichtung</h2>
        <p>
          Die Europ&auml;ische Kommission stellt eine Plattform zur
          Online-Streitbeilegung (OS) bereit:{' '}
          <a
            href="https://ec.europa.eu/consumers/odr/"
            target="_blank"
            rel="noopener noreferrer"
          >
            https://ec.europa.eu/consumers/odr/
          </a>
          .<br /> Unsere E-Mail-Adresse finden Sie oben im Impressum.
        </p>

        <h2>
          Verbraucher&shy;streit&shy;beilegung/Universal&shy;schlichtungs&shy;stelle
        </h2>
        <p>
          Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren
          vor einer Verbraucherschlichtungsstelle teilzunehmen.
        </p>

        <p>
          Quelle: <a href="https://www.e-recht24.de">e-recht24.de</a>
        </p>
      </div>
    </SimpleLayout>
  )
}
