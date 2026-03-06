'use client'

import { useState, useRef, useCallback, useEffect } from 'react'
import Image from 'next/image'
import BlurRevealText from '@/components/BlurRevealText'

const slides = [
  { src: '/media/web/photography/bathroom-stone.webp', alt: 'Bathroom with natural stone at Azzura Villas' },
  { src: '/media/web/photography/hot-tub-bay-view.webp', alt: 'Hot tub with panoramic Vasiliki Bay view at Azzura Villas' },
  { src: '/media/web/photography/villa-exterior.webp', alt: 'Luxury villa exterior at Azzura Villas Lefkada' },
  { src: '/media/web/photography/villa-architectural-detail.webp', alt: 'Villa architectural detail at Azzura Villas' },
  { src: '/media/web/photography/living-area.webp', alt: 'Stylish living area at Azzura Villas Lefkada' },
  { src: '/media/web/photography/interior-detail.webp', alt: 'Interior design detail at Azzura Villas' },
  { src: '/media/web/photography/kitchen.webp', alt: 'Modern kitchen at Azzura Villas Lefkada' },
  { src: '/media/web/photography/dining-area.webp', alt: 'Dining area at Azzura Villas' },
  { src: '/media/web/photography/bedroom-natural-light.webp', alt: 'Bedroom with natural light at Azzura Villas' },
  { src: '/media/web/photography/bathroom-interior.webp', alt: 'Bathroom interior at Azzura Villas Lefkada' },
  { src: '/media/web/photography/terrace-view.webp', alt: 'Villa terrace view at Azzura Villas' },
  { src: '/media/web/photography/outdoor-seating.webp', alt: 'Outdoor seating area at Azzura Villas Lefkada' },
  { src: '/media/web/photography/pool-sunset.webp', alt: 'Pool area at sunset at Azzura Villas' },
  { src: '/media/web/photography/bedroom-designer.webp', alt: 'Designer bedroom interior at Azzura Villas' },
  { src: '/media/web/photography/balcony-hot-tub.webp', alt: 'Private balcony with hot tub overlooking the Ionian Sea' },
  { src: '/media/web/photography/lounge-sea-view.webp', alt: 'Villa lounge with sea view at Azzura Villas' },
  { src: '/media/web/photography/stone-interior.webp', alt: 'Stone-finished interior at Azzura Villas Lefkada' },
  { src: '/media/web/photography/panoramic-bay.webp', alt: 'Panoramic bay view from Azzura Villas' },
  { src: '/media/web/photography/bedroom-sea-view.webp', alt: 'Evening atmosphere at Azzura Villas' },
  { src: '/media/web/photography/garden-pathway.webp', alt: 'Garden pathway at Azzura Villas Lefkada' },
  { src: '/media/web/photography/outdoor-dining.webp', alt: 'Outdoor dining setup at Azzura Villas' },
  { src: '/media/web/photography/sun-terrace-loungers.webp', alt: 'Sun terrace with loungers at Azzura Villas' },
  { src: '/media/web/photography/villa-facade.webp', alt: 'Villa facade at Azzura Villas Lefkada' },
  { src: '/media/web/photography/outdoor-lounge-terrace.webp', alt: 'Outdoor lounge terrace at Azzura Villas Lefkada' },
  { src: '/media/web/photography/infinity-pool-mountains.webp', alt: 'Infinity pool with mountain backdrop at Azzura Villas' },
  { src: '/media/web/photography/poolside-relaxation.webp', alt: 'Poolside relaxation at Azzura Villas Lefkada' },
  { src: '/media/web/photography/villa-interior-dining.webp', alt: 'Villa exterior at dusk at Azzura Villas' },
  { src: '/media/web/photography/living-room-panoramic.webp', alt: 'Living room with panoramic windows at Azzura Villas' },
  { src: '/media/web/photography/master-bedroom.webp', alt: 'Master bedroom at Azzura Villas Lefkada' },

  { src: '/media/web/photography/terrace-ionian-views.webp', alt: 'Terrace with Ionian Sea views at Azzura Villas' },
  { src: '/media/web/photography/sunset-view.webp', alt: 'Sunset view from Azzura Villas Lefkada' },
  { src: '/media/web/photography/outdoor-bbq.webp', alt: 'Outdoor BBQ area at Azzura Villas' },
  { src: '/media/web/photography/aerial-view.webp', alt: 'Aerial view of Azzura Villas and surroundings' },
  { src: '/media/web/photography/vasiliki-bay-panorama.webp', alt: 'Vasiliki Bay panorama from Azzura Villas' },
  { src: '/media/web/photography/garden-landscaping.webp', alt: 'Villa garden and landscaping at Azzura Villas' },
  { src: '/media/web/photography/coastal-scenery.webp', alt: 'Coastal scenery near Azzura Villas Lefkada' },
  { src: '/media/web/photography/mountain-sea-view.webp', alt: 'Mountain and sea view from Azzura Villas' },
  { src: '/media/web/photography/villa-entrance.webp', alt: 'Villa entrance at Azzura Villas Lefkada' },
  { src: '/media/web/photography/outdoor-shower.webp', alt: 'Outdoor shower area at Azzura Villas' },
  { src: '/media/web/photography/hillside-setting.webp', alt: 'Hillside setting of Azzura Villas Lefkada' },
  { src: '/media/web/photography/infinity-pool-edge.webp', alt: 'Infinity pool edge with Ionian Sea view at Azzura Villas' },
  { src: '/media/web/photography/evening-lights.webp', alt: 'Evening lights at Azzura Villas Lefkada' },
  { src: '/media/web/photography/deck-sea-view.webp', alt: 'Deck area with sea view at Azzura Villas' },
  { src: '/media/web/photography/coastal-landscape.webp', alt: 'Coastal landscape near Azzura Villas' },
  { src: '/media/web/photography/sunrise-vasiliki-bay.webp', alt: 'Sunrise over Vasiliki Bay from Azzura Villas' },
  { src: '/media/web/photography/panoramic-villa-view.webp', alt: 'Panoramic villa view at Azzura Villas Lefkada' },
]

// Extended slides: [clone of last, ...real slides, clone of first]
// This lets us show the last image when scrolling left from the first,
// and the first image when scrolling right past the last.
const extSlides = [slides[slides.length - 1], ...slides, slides[0]]
// The "real" first slide is at index 1 in extSlides
const START = 13 // dsc-0091 - default visible slide on load

export function Gallery() {
  const [current, setCurrent] = useState(START)
  const currentRef = useRef(START)
  const isJumping = useRef(false)

  const trackRef = useRef<HTMLDivElement>(null)
  const wrapRef = useRef<HTMLDivElement>(null)
  const startX = useRef<number | null>(null)
  const isDragging = useRef(false)

  const setTransform = useCallback((index: number, drag = 0, animate = true) => {
    const el = trackRef.current
    if (!el) return
    el.style.transition = animate ? '' : 'none'
    el.style.transform = drag !== 0
      ? `translateX(calc(var(--gallery-offset) - ${index} * (var(--gallery-slide) + var(--gallery-gap)) + ${drag}px))`
      : `translateX(calc(var(--gallery-offset) - ${index} * (var(--gallery-slide) + var(--gallery-gap))))`
  }, [])

  const goTo = useCallback((index: number) => {
    currentRef.current = index
    setCurrent(index)
    setTransform(index, 0, true)
  }, [setTransform])

  // After the CSS transition ends on a clone slide, silently jump to the real one
  useEffect(() => {
    const el = trackRef.current
    if (!el) return
    const onEnd = (e: TransitionEvent) => {
      if (e.target !== el) return // ignore bubbled events from child slides
      const i = currentRef.current
      if (i === 0) {
        // Clone of last slide - jump to real last
        isJumping.current = true
        const real = extSlides.length - 2
        currentRef.current = real
        setCurrent(real)
        setTransform(real, 0, false)
        requestAnimationFrame(() => { isJumping.current = false })
      } else if (i === extSlides.length - 1) {
        // Clone of first slide - jump to real first
        isJumping.current = true
        const real = 1
        currentRef.current = real
        setCurrent(real)
        setTransform(real, 0, false)
        requestAnimationFrame(() => { isJumping.current = false })
      }
    }
    el.addEventListener('transitionend', onEnd)
    return () => el.removeEventListener('transitionend', onEnd)
  }, [setTransform])

  // Shared drag logic
  const onDragStart = (x: number) => {
    startX.current = x
    isDragging.current = false
    if (trackRef.current) trackRef.current.style.transition = 'none'
  }

  const onDragMove = (x: number) => {
    if (startX.current === null) return
    const delta = x - startX.current
    if (Math.abs(delta) > 4) {
      isDragging.current = true
      if (wrapRef.current) wrapRef.current.style.cursor = 'grabbing'
    }
    if (isDragging.current) {
      setTransform(currentRef.current, delta, false)
    }
  }

  const onDragEnd = (x: number) => {
    if (startX.current === null) return
    const delta = startX.current - x
    if (wrapRef.current) wrapRef.current.style.cursor = 'grab'
    if (Math.abs(delta) > 60) {
      const next = delta > 0 ? currentRef.current + 1 : currentRef.current - 1
      // Allow going to clone indices (0 and extSlides.length-1) for wrap-around
      const clamped = Math.max(0, Math.min(extSlides.length - 1, next))
      goTo(clamped)
    } else {
      setTransform(currentRef.current, 0, true)
    }
    startX.current = null
  }

  // Mouse handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault()
    onDragStart(e.clientX)
  }
  const handleMouseMove = (e: React.MouseEvent) => onDragMove(e.clientX)
  const handleMouseUp = (e: React.MouseEvent) => { onDragEnd(e.clientX); }
  const handleMouseLeave = () => {
    if (startX.current !== null) {
      setTransform(currentRef.current, 0, true)
      startX.current = null
      if (wrapRef.current) wrapRef.current.style.cursor = 'grab'
    }
    isDragging.current = false
  }

  // Touch handlers
  const handleTouchStart = (e: React.TouchEvent) => onDragStart(e.touches[0].clientX)
  const handleTouchMove = (e: React.TouchEvent) => onDragMove(e.touches[0].clientX)
  const handleTouchEnd = (e: React.TouchEvent) => onDragEnd(e.changedTouches[0].clientX)

  return (
    <section className="gallery" id="gallery">
      <div className="gallery__header">
        <p className="section-label">Gallery</p>
        <BlurRevealText text="See the Villas" accentWord="Villas" as="h2" className="gallery__heading" />
        <p className="gallery__desc">
          From the infinity pool to the sun terrace, from stone-finished interiors
          to the endless blue beyond the balcony. This is what a stay at Azzura
          Villas in Lefkada looks like.
        </p>
      </div>

      <div
        ref={wrapRef}
        className="gallery__track-wrap"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{ cursor: 'grab' }}
      >
        <div
          ref={trackRef}
          className="gallery__track"
          style={{
            transform: `translateX(calc(var(--gallery-offset) - ${START} * (var(--gallery-slide) + var(--gallery-gap))))`,
          }}
        >
          {extSlides.map((slide, i) => {
            const cls = i === current
              ? 'gallery__slide gallery__slide--active'
              : 'gallery__slide'
            // Shift each non-active slide toward active to close the visual
            // gap created by scale(0.82). The shrink per side = 0.09 * W,
            // so accumulated compensation at distance d = (0.18d - 0.09) * W.
            const d = Math.abs(i - current)
            const dir = i > current ? -1 : i < current ? 1 : 0
            const mult = d > 0 ? dir * (0.18 * d - 0.09) : 0
            const slideStyle = mult !== 0
              ? { '--slide-shift': `calc(${mult.toFixed(4)} * var(--gallery-slide))` } as React.CSSProperties
              : undefined
            return (
              <div
                key={i}
                className={cls}
                style={slideStyle}
                onClick={() => {
                  if (!isDragging.current && i !== current) {
                    const clamped = Math.max(0, Math.min(extSlides.length - 1, i))
                    goTo(clamped)
                  }
                }}
              >
                <Image
                  src={slide.src}
                  alt={slide.alt}
                  fill
                  sizes="(max-width: 809px) 95vw, 50vw"
                  draggable={false}
                  priority={i <= 2}
                />
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
