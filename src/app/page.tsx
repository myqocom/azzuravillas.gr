"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const navLinks = [
  { name: "Welcome", href: "#welcome" },
  { name: "Villas", href: "#villas" },
  { name: "Amenities", href: "#amenities" },
  { name: "Activities", href: "#activities" },
  { name: "Gallery", href: "#gallery" },
  { name: "Contact", href: "#contact" },
];

const villas = [
  {
    name: "Azzura Villa I",
    tagline: "Where the Sea Meets the Sky",
    accommodates: "6 guests",
    bedrooms: "2 Bedrooms + 1 Master",
    bathrooms: "3 En-suite Bathrooms",
    description: "Designed in an exclusive, contemporary way with natural materials that adds to comfort and relaxation. Features a private infinity pool and glass-walled balcony with unobstructed views of the Ionian Sea.",
    images: [
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&q=80",
    ],
  },
  {
    name: "Azzura Villa II",
    tagline: "Elegance in Every Detail",
    accommodates: "6 guests",
    bedrooms: "2 Bedrooms + 1 Master",
    bathrooms: "3 En-suite Bathrooms",
    description: "Surrounded by a century-old olive grove, this villa offers a spacious dining area, comfortable living room, and fully equipped kitchen. The master room features a walk-in closet and private balcony overlooking the sea.",
    images: [
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80",
    ],
  },
  {
    name: "Azzura Villa III",
    tagline: "Our Largest Retreat",
    accommodates: "8 guests",
    bedrooms: "4 Master Suites",
    bathrooms: "4 En-suite Bathrooms",
    description: "Nestled among ancient olive trees, this villa features four master suites, each with super king size beds, private en-suite bathroom, walk-in closet, and spacious private balcony. Perfect for larger families or groups.",
    images: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80",
      "https://images.unsplash.com/photo-1602343168117-bb8ffe3e2e9f?w=600&q=80",
    ],
  },
];

const amenities = [
  {
    num: "01",
    title: "Private Infinity Pool",
    description: "Each villa features a stunning 5.5 x 11 metre private infinity pool with panoramic views of the Ionian Sea and surrounding mountains.",
    image: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?w=600&q=80",
  },
  {
    num: "02",
    title: "Glass Walled Balcony",
    description: "Enjoy unobstructed, spectacular views of the Ionian Sea from your glass-walled balcony. Perfect for sunset watching and morning coffee.",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80",
  },
  {
    num: "03",
    title: "BBQ & Outdoor Dining",
    description: "Each villa includes a private barbecue area perfect for al fresco dining. The spacious outdoor area seats up to 8 guests comfortably.",
    image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=600&q=80",
  },
];

const indoorAmenities = [
  "Air Conditioning / Heating",
  "Fully Equipped Kitchen",
  "Washing Machine",
  "Smart TV",
  "High-Speed Wi-Fi",
  "Walk-in Closet",
  "Super King Size Beds",
  "Private Parking",
];

const activities = [
  { name: "Swimming", image: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?w=600&q=80" },
  { name: "Beach Hopping", image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=80" },
  { name: "Yacht Cruises", image: "https://images.unsplash.com/photo-1540946485063-a40da27545f8?w=600&q=80" },
  { name: "Island Exploration", image: "https://images.unsplash.com/photo-1533105079780-92b9be482077?w=600&q=80" },
  { name: "Local Cuisine", image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=600&q=80" },
  { name: "Sunset Views", image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=80" },
];

const galleryImages = [
  "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80",
  "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
  "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
];

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("visible");
          observer.unobserve(el);
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return ref;
}

function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled ? "bg-[#f5f3ef]/95 backdrop-blur-md py-4" : "bg-transparent py-6"
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-8 lg:px-12 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" className={isScrolled ? "text-[#1a1a1a]" : "text-white"}>
              <path d="M16 2L16 30M2 16L30 16M5.86 5.86L26.14 26.14M26.14 5.86L5.86 26.14" stroke="currentColor" strokeWidth="2"/>
            </svg>
            <span className={`font-serif text-[22px] transition-colors ${isScrolled ? "text-[#1a1a1a]" : "text-white"}`}>
              Azzura Villas
            </span>
          </Link>
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className={`p-2 transition-colors ${isScrolled ? "text-[#1a1a1a]" : "text-white"}`}
            aria-label="Open menu"
          >
            <Menu size={24} />
          </button>
        </div>
      </header>

      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-[#1a1a1a]">
          <div className="flex flex-col h-full p-8">
            <div className="flex items-center justify-between">
              <span className="font-serif text-[22px] text-white">Azzura Villas</span>
              <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 text-white">
                <X size={24} />
              </button>
            </div>
            <nav className="flex flex-col items-center justify-center flex-1 gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="font-serif text-[36px] text-white hover:text-[#c4b5a0] transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}
    </>
  );
}

function Hero() {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1920&q=80"
          alt="Azzura Villas"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30" />
      </div>

      <div className="relative z-10 h-full flex flex-col justify-between px-8 lg:px-12 py-8">
        <div />
        
        <div className="text-center">
          <p className="text-white/80 text-[14px] tracking-wide mb-4">
            Where Dreams Meet the Beauty of Lefkada
          </p>
        </div>

        <div className="w-full">
          <h1 className="font-serif text-white text-[12vw] md:text-[10vw] lg:text-[9vw] leading-[0.9] tracking-[-0.02em] text-center">
            AZZURA VILLAS.
          </h1>
        </div>

        <div className="flex justify-between items-end text-white/60 text-[12px]">
          <span>Scroll to explore</span>
          <span />
        </div>
      </div>
    </section>
  );
}

function Welcome() {
  const ref = useReveal();
  return (
    <section id="welcome" className="py-32 bg-[#f5f3ef]">
      <div ref={ref} className="max-w-[1000px] mx-auto px-8 lg:px-12 text-center reveal">
        <h2 className="font-serif text-[32px] md:text-[42px] lg:text-[52px] leading-[1.2] text-[#1a1a1a] mb-8">
          Welcome to Azzura Sea View Villas<br />
          Your Elegant Retreat<br />
          <span className="italic">in Lefkada, Greece</span>
        </h2>
        <p className="text-[#666] text-[15px] leading-relaxed max-w-[650px] mx-auto mb-8">
          These brand new villas are ideally located on an unspoilt hill with stunning sea and 
          mountain views. Surrounded by a century-old olive grove, our villas are the perfect 
          base for you and your family to enjoy the breathtaking scenery in a purely natural environment.
        </p>
        <p className="text-[#666] text-[15px] leading-relaxed max-w-[650px] mx-auto mb-8">
          Outdoors, each house has a private infinity pool and a barbeque area while 
          the glass walled balcony allows you to enjoy, unobstructed, the spectacular views of 
          the Ionian Sea.
        </p>
        <a href="#villas" className="inline-block text-[#1a1a1a] text-[13px] font-medium tracking-wide border-b border-[#1a1a1a] pb-1 hover:text-[#666] hover:border-[#666] transition-colors">
          EXPLORE OUR VILLAS
        </a>
      </div>

      <div className="mt-20 max-w-[900px] mx-auto px-8">
        <img
          src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80"
          alt="Azzura Villas exterior with sea view"
          className="w-full aspect-[16/10] object-cover"
        />
      </div>
    </section>
  );
}

function VillasSection() {
  const ref = useReveal();
  return (
    <section id="villas" className="py-32 bg-[#f5f3ef]">
      <div ref={ref} className="max-w-[1400px] mx-auto px-8 lg:px-12 reveal">
        <div className="text-center mb-20">
          <h2 className="font-serif text-[32px] md:text-[42px] lg:text-[52px] leading-[1.2] text-[#1a1a1a]">
            Lefkada Awaits at<br />
            <span className="italic">Your Azzura Retreat</span>
          </h2>
        </div>

        {villas.map((villa, index) => (
          <div key={villa.name} className={`grid md:grid-cols-2 gap-8 mb-24 ${index % 2 === 1 ? "md:flex-row-reverse" : ""}`}>
            <div className={`flex flex-col justify-center ${index % 2 === 1 ? "md:order-2" : ""}`}>
              <span className="text-[#999] text-[12px] tracking-wider mb-2">{villa.tagline}</span>
              <h3 className="font-serif text-[28px] md:text-[36px] text-[#1a1a1a] mb-4 italic">
                {villa.name}
              </h3>
              <div className="flex gap-4 mb-4 text-[12px] text-[#888]">
                <span>{villa.accommodates}</span>
                <span>•</span>
                <span>{villa.bedrooms}</span>
                <span>•</span>
                <span>{villa.bathrooms}</span>
              </div>
              <p className="text-[#666] text-[14px] leading-relaxed mb-6 max-w-[350px]">
                {villa.description}
              </p>
              <a href="#contact" className="inline-block text-[#1a1a1a] text-[12px] font-medium tracking-wide border-b border-[#1a1a1a] pb-1 hover:text-[#666] transition-colors w-fit">
                BOOK THIS VILLA
              </a>
            </div>
            <div className={`grid grid-cols-2 gap-4 ${index % 2 === 1 ? "md:order-1" : ""}`}>
              <img
                src={villa.images[0]}
                alt={villa.name}
                className="w-full aspect-[3/4] object-cover col-span-2"
              />
              <img
                src={villa.images[1]}
                alt={villa.name}
                className="w-full aspect-square object-cover"
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function AmenitiesSection() {
  const ref = useReveal();
  return (
    <section id="amenities" className="py-32 bg-[#f5f3ef]">
      <div ref={ref} className="max-w-[1200px] mx-auto px-8 lg:px-12 reveal">
        <div className="text-center mb-20">
          <h2 className="font-serif text-[32px] md:text-[42px] lg:text-[52px] leading-[1.2] text-[#1a1a1a]">
            Luxury<br />
            <span className="italic">Amenities</span>
          </h2>
        </div>

        <div className="space-y-0">
          {amenities.map((amenity) => (
            <div key={amenity.num} className="grid md:grid-cols-[60px_1fr_1fr_1fr] gap-8 py-10 border-t border-[#ddd]">
              <span className="text-[#999] text-[13px]">{amenity.num}</span>
              <h3 className="font-serif text-[24px] md:text-[32px] text-[#1a1a1a] italic">
                {amenity.title}
              </h3>
              <p className="text-[#666] text-[14px] leading-relaxed">
                {amenity.description}
              </p>
              <img
                src={amenity.image}
                alt={amenity.title}
                className="w-full aspect-[4/3] object-cover"
              />
            </div>
          ))}
        </div>

        <div className="mt-16 p-8 bg-white">
          <h3 className="font-serif text-[24px] text-[#1a1a1a] italic mb-6 text-center">Indoor Amenities</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {indoorAmenities.map((item) => (
              <div key={item} className="text-center py-3 border-b border-[#eee]">
                <span className="text-[#666] text-[13px]">{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mt-20">
          <p className="font-serif text-[24px] md:text-[32px] text-[#1a1a1a] italic leading-relaxed max-w-[600px] mx-auto mb-8">
            All villas are designed in an exclusive, contemporary way with natural materials 
            that adds to comfort and relaxation.
          </p>
          <a href="#contact" className="inline-block text-[#1a1a1a] text-[13px] font-medium tracking-wide border-b border-[#1a1a1a] pb-1 hover:text-[#666] transition-colors">
            BOOK YOUR STAY
          </a>
        </div>
      </div>
    </section>
  );
}

function MoreThanStay() {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1920&q=80"
          alt="Beach"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/20" />
      </div>

      <div className="relative z-10 h-full flex flex-col justify-between px-8 lg:px-12 py-20">
        <div className="flex justify-between items-start">
          <span className="font-serif text-white text-[10vw] md:text-[8vw] leading-none">More</span>
          <span className="font-serif text-white text-[10vw] md:text-[8vw] leading-none">than</span>
          <span className="font-serif text-white/80 text-[10vw] md:text-[8vw] leading-none italic">stay</span>
        </div>

        <div className="text-center">
          <p className="font-serif text-white text-[18px] md:text-[24px] italic leading-relaxed max-w-[500px] mx-auto">
            At Azzura Villas, every detail is designed to make you feel at home — with the elegance 
            of Lefkada just beyond your door
          </p>
        </div>
      </div>
    </section>
  );
}

function ActivitiesSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const ref = useReveal();

  return (
    <section id="activities" className="py-32 bg-[#f5f3ef]">
      <div ref={ref} className="max-w-[1200px] mx-auto px-8 lg:px-12 reveal">
        <div className="text-center mb-20">
          <h2 className="font-serif text-[32px] md:text-[42px] lg:text-[52px] leading-[1.2] text-[#1a1a1a]">
            Where Every Day is<br />
            <span className="italic">Designed for You</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <div className="aspect-[3/4] overflow-hidden">
            <img
              src={activities[activeIndex].image}
              alt={activities[activeIndex].name}
              className="w-full h-full object-cover transition-all duration-500"
            />
          </div>

          <div className="flex flex-col justify-center">
            {activities.map((activity, index) => (
              <button
                key={activity.name}
                onMouseEnter={() => setActiveIndex(index)}
                className={`text-left py-4 border-b border-[#ddd] transition-colors ${
                  index === activeIndex ? "text-[#1a1a1a]" : "text-[#ccc]"
                }`}
              >
                <span className="font-serif text-[28px] md:text-[36px] italic">
                  {activity.name}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function PlannedForYou() {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1540946485063-a40da27545f8?w=1920&q=80"
          alt="Yacht"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[#1a3a5c]/60" />
      </div>

      <div className="relative z-10 h-full flex flex-col justify-between px-8 lg:px-12 py-20">
        <div className="flex justify-between items-start">
          <span className="font-serif text-white text-[10vw] md:text-[8vw] leading-none">Planned</span>
          <span className="font-serif text-white/80 text-[10vw] md:text-[8vw] leading-none italic">for You</span>
        </div>

        <div className="text-center">
          <p className="font-serif text-white text-[18px] md:text-[24px] italic leading-relaxed max-w-[500px] mx-auto">
            Every moment curated, every experience unforgettable — leave the planning to us.
          </p>
        </div>
      </div>
    </section>
  );
}

function GallerySection() {
  const ref = useReveal();
  return (
    <section id="gallery" className="py-32 bg-[#f5f3ef]">
      <div ref={ref} className="max-w-[1200px] mx-auto px-8 lg:px-12 reveal">
        <div className="text-center mb-12">
          <h2 className="font-serif text-[32px] md:text-[42px] lg:text-[52px] leading-[1.2] text-[#1a1a1a]">
            Experience Azzura Villas<br />
            <span className="italic">in Pictures</span>
          </h2>
          <p className="text-[#666] text-[14px] leading-relaxed max-w-[500px] mx-auto mt-6 mb-8">
            Step inside the world of Azzura Villas through our gallery—where timeless 
            interiors, elegant details, and enchanting Lefkada scenes come together 
            to tell the story of your next unforgettable escape.
          </p>
          <a href="#" className="inline-block text-[#1a1a1a] text-[13px] font-medium tracking-wide border-b border-[#1a1a1a] pb-1 hover:text-[#666] transition-colors">
            VIEW GALLERY
          </a>
        </div>

        <div className="grid grid-cols-3 gap-4 mt-16">
          {galleryImages.map((img, index) => (
            <div
              key={index}
              className={`overflow-hidden ${index === 1 ? "row-span-2" : ""}`}
            >
              <img
                src={img}
                alt={`Gallery ${index + 1}`}
                className={`w-full object-cover ${index === 1 ? "h-full" : "aspect-[4/5]"}`}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ReserveSection() {
  return (
    <section id="contact" className="relative min-h-screen w-full overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1602343168117-bb8ffe3e2e9f?w=1920&q=80"
          alt="Villa interior"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center px-8 py-20">
        <div className="bg-[#f5f3ef] p-12 md:p-16 max-w-[500px] text-center">
          <svg width="40" height="40" viewBox="0 0 32 32" fill="none" className="mx-auto mb-6 text-[#1a1a1a]">
            <path d="M16 2L16 30M2 16L30 16M5.86 5.86L26.14 26.14M26.14 5.86L5.86 26.14" stroke="currentColor" strokeWidth="1.5"/>
          </svg>
          <h2 className="font-serif text-[32px] md:text-[42px] text-[#1a1a1a] italic mb-6">
            Reserve Your Stay
          </h2>
          <p className="text-[#666] text-[14px] leading-relaxed mb-4">
            Ready to experience the beauty of Lefkada from our stunning sea view villas? 
            Contact us to book your perfect Greek island getaway.
          </p>
          <p className="text-[#888] text-[13px] mb-8">
            Katouna, 31100 Lefkada, Greece<br />
            <a href="mailto:info@azzuravillas.gr" className="text-[#1a1a1a] border-b border-[#1a1a1a]">info@azzuravillas.gr</a>
          </p>
          <a
            href="tel:+306997273882"
            className="inline-block text-[#1a1a1a] text-[13px] font-medium tracking-wide border-b border-[#1a1a1a] pb-1 hover:text-[#666] transition-colors"
          >
            CALL (+30) 699 727 3882
          </a>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-[#1a1a1a] py-20">
      <div className="max-w-[1200px] mx-auto px-8 lg:px-12">
        <div className="text-center mb-16">
          <svg width="40" height="40" viewBox="0 0 32 32" fill="none" className="mx-auto mb-6 text-[#f5f3ef]">
            <path d="M16 2L16 30M2 16L30 16M5.86 5.86L26.14 26.14M26.14 5.86L5.86 26.14" stroke="currentColor" strokeWidth="1.5"/>
          </svg>
          <h3 className="font-serif text-[32px] text-[#f5f3ef] italic mb-4">Azzura Sea View Villas</h3>
          <p className="text-[#888] text-[14px]">
            A collection of elegant sea view villas<br />
            in Lefkada, Greece
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-12 py-12 border-t border-[#333]">
          <div>
            <h4 className="text-[#888] text-[11px] font-medium tracking-wider mb-6">CONTACT</h4>
            <p className="text-[#f5f3ef] text-[14px] font-serif leading-relaxed">
              Katouna, 31100<br />
              Lefkada<br />
              Greece
            </p>
            <a href="mailto:info@azzuravillas.gr" className="block text-[#f5f3ef] text-[13px] mt-4 border-b border-[#f5f3ef] w-fit">
              info@azzuravillas.gr
            </a>
            <a href="tel:+306997273882" className="block text-[#f5f3ef] text-[13px] mt-2 border-b border-[#f5f3ef] w-fit">
              (+30) 699 727 3882
            </a>
          </div>

          <div>
            <h4 className="text-[#888] text-[11px] font-medium tracking-wider mb-6">OUR VILLAS</h4>
            <div className="space-y-2">
              <a href="#villas" className="block text-[#f5f3ef] text-[13px] border-b border-[#f5f3ef] w-fit">AZZURA VILLA I</a>
              <a href="#villas" className="block text-[#f5f3ef] text-[13px] border-b border-[#f5f3ef] w-fit">AZZURA VILLA II</a>
              <a href="#villas" className="block text-[#f5f3ef] text-[13px] border-b border-[#f5f3ef] w-fit">AZZURA VILLA III</a>
            </div>
          </div>

          <div>
            <h4 className="text-[#888] text-[11px] font-medium tracking-wider mb-6">SITEMAP</h4>
            <div className="space-y-2 font-serif">
              {["Welcome", "Villas", "Amenities", "Activities", "Gallery", "Contact"].map((item) => (
                <a key={item} href={`#${item.toLowerCase()}`} className="block text-[#f5f3ef] text-[15px]">{item}</a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-[#888] text-[11px] font-medium tracking-wider mb-6">SOCIALS</h4>
            <div className="space-y-2 font-serif">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="block text-[#f5f3ef] text-[15px]">Instagram</a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="block text-[#f5f3ef] text-[15px]">Facebook</a>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-[#333] text-[#666] text-[12px]">
          <p>© {new Date().getFullYear()} Azzura Sea View Villas. All rights reserved.</p>
          <div className="flex gap-8 mt-4 md:mt-0">
            <a href="#" className="border-b border-[#666]">TERMS & CONDITIONS</a>
            <a href="#" className="border-b border-[#666]">PRIVACY POLICY</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function Home() {
  return (
    <main className="bg-[#f5f3ef]">
      <style jsx global>{`
        .reveal {
          opacity: 0;
          transform: translateY(40px);
          transition: opacity 0.8s ease-out, transform 0.8s ease-out;
        }
        .reveal.visible {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>
      <Header />
      <Hero />
      <Welcome />
      <VillasSection />
      <AmenitiesSection />
      <MoreThanStay />
      <ActivitiesSection />
      <PlannedForYou />
      <GallerySection />
      <ReserveSection />
      <Footer />
    </main>
  );
}
