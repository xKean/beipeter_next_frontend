import { Card } from '@/components/Card'
import { Section } from '@/components/Section'
import { SimpleLayout } from '@/components/SimpleLayout'

function ToolsSection({
  children,
  ...props
}: React.ComponentPropsWithoutRef<typeof Section>) {
  return (
    <Section {...props}>
      <ul role="list" className="space-y-16">
        {children}
      </ul>
    </Section>
  )
}

function Tool({
  title,
  href,
  children,
}: {
  title: string
  href?: string
  children: React.ReactNode
}) {
  return (
    <Card as="li">
      <Card.Title as="h3" href={href}>
        {title}
      </Card.Title>
      <Card.Description>{children}</Card.Description>
    </Card>
  )
}

export const metadata = {
  title: 'Uses',
  description: 'Software I use, gadgets I love, and other things I recommend.',
}

export default function Uses() {
  return (
    <SimpleLayout
      title="Software I use, gadgets I love, and other things I recommend."
      intro="I get asked a lot about the things I use to build software, stay productive, or buy to fool myself into thinking I’m being productive when I’m really just procrastinating. Here’s a big list of all of my favorite stuff."
    >
      <div className="space-y-20">
        <ToolsSection title="Workstation">
          <Tool title="16” MacBook Pro, M3, 18GB RAM (2023)">
            I was using an Intel-based 16” MacBook Pro prior to this and the
            difference is night and day. I’ve never heard the fans turn on a
            single time, even under the incredibly heavy loads I put it through
            with our various app simulations and monster slaying.
          </Tool>
          <Tool title="Roccat Vulcan TKL Pro">
            They don’t make keyboards the way they used to. I buy these any time
            I see them go up for sale and keep them in storage in case I need
            parts or need to retire my main.
          </Tool>
          <Tool title="Logitech G502 HERO">
            Something about all the haptics makes me feel like a wizard with
            special powers. I really like feeling like a wizard with special
            powers.
          </Tool>
        </ToolsSection>
        <ToolsSection title="Development tools">
          <Tool title="Visual Studio Code">
            I don’t care if it’s missing all of the fancy IDE features everyone
            else relies on, VsCode is still the best text editor ever made.
          </Tool>
          <Tool title="iTerm2">
            I’m honestly not even sure what features I get with this that aren’t
            just part of the macOS Terminal but it’s what I use.
          </Tool>
          <Tool title="Postman">
            Great software for working with APIs. Has saved me from building
            about a thousand admin interfaces for my various projects over the
            years.
          </Tool>
          <Tool title="Docker Desktop & CLI">
            Whether I’m deploying applications locally or to the cloud, Docker
            makes it effortless to run containers everywhere. It’s the backbone
            of my development environment.
          </Tool>
        </ToolsSection>
        <ToolsSection title="Design">
          <Tool title="Canva">
            I initially started using Canva to create simple graphics, but now I
            rely on its amazing template library to bring my ideas to life more
            efficiently.
          </Tool>
          <Tool title="Stable Diffusion">
            At first, Stable Diffusion was just a fun way to create AI art, but
            it quickly became my go-to for brainstorming visual ideas. Its
            ability to turn abstract concepts into stunning visuals is
            unmatched.
          </Tool>
          <Tool title="Flux">
            Flux started as an experimental tool for generating images, but it’s
            now a cornerstone of our design workflow. Its speed and ability to
            handle complex prompts make it an absolute must-have for creative
            projects.
          </Tool>
        </ToolsSection>
        <ToolsSection title="Productivity">
          <Tool title="Alt-Tab">
            Coming from Windows, Alt-Tab has been a game-changer for managing
            multiple windows effortlessly on macOS. It feels natural and keeps
            my workflow smooth and efficient.
          </Tool>
          <Tool title="Stage Manager">
            Stage Manager has completely redefined how I organize my desktop.
            It’s the perfect way to keep my workspace tidy and focused without
            losing track of open apps.
          </Tool>
          <Tool title="1Password">
            1Password makes managing accounts and sensitive information a
            breeze. It’s not just about security—it’s about saving time and
            avoiding frustration when accessing my tools.
          </Tool>
        </ToolsSection>
        <ToolsSection title="HomeLab">
          <Tool title="Synology DS920+">
            A versatile and reliable NAS that powers my HomeLab projects. It’s
            perfect for storing backups, hosting media, and running lightweight
            services without breaking a sweat.
          </Tool>
          <Tool title="Ubiquiti UniFi Dream Machine Pro">
            The backbone of my home network. It combines routing, firewall, and
            network management in one sleek device, making it easy to keep
            everything running smoothly.
          </Tool>
          <Tool title="Raspberry Pi 4">
            The ultimate tinkering tool. Whether I’m running small Docker
            containers, experimenting with home automation, or setting up a
            Pi-hole, it’s always up for the job.
          </Tool>
          <Tool title="Unraid Gaming Server">
            A flexible platform for gaming, media storage, and virtual machines.
            It’s also where I run my local AI models with an RTX 3090, alongside
            essential services like TeslaMate, Nginx Proxy Manager, and Home
            Assistant, making it the cornerstone of my HomeLab setup.
          </Tool>

          <Tool title="SMLIGHT SLZB-06 Zigbee Gateway">
            A must-have for integrating Zigbee devices into my smart home. It’s
            fast, reliable, and makes managing smart home gadgets in
            HomeAssistant a breeze.
          </Tool>
        </ToolsSection>
      </div>
    </SimpleLayout>
  )
}
