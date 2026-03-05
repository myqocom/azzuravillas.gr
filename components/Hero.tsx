import Image from 'next/image'
import Link from 'next/link'
import BlurRevealText from '@/components/BlurRevealText'

export function Hero() {
  return (
    <section className="hero">
      <Image
        src="/images/azzura-villas-dsc-0130.webp"
        alt="Azzura Villas Lefkada, infinity pool overlooking the Ionian Sea"
        fill
        priority
        className="hero__bg"
        sizes="100vw"
      />
      <div className="hero__overlay" />

      <div className="hero__content">
        <p className="hero__eyebrow">Vasiliki, Lefkada · Greece</p>
        <BlurRevealText
          text="Azzura Villas"
          accentWord="Villas"
          as="h1"
          className="hero__title"
          baseDelay={0.2}
        />
      </div>

      <div className="hero__scroll-hint">
        <span>Scroll</span>
        <div className="hero__scroll-line" />
      </div>
    </section>
  )
}
