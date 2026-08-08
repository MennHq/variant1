/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "motion/react";
import {
  Play,
  X,
  ChevronLeft,
  ChevronRight,
  Instagram,
  Facebook,
  MessageCircle,
  ArrowRight,
  Menu,
  CheckCircle,
  MapPin,
  Phone,
  Mail,
  Calendar,
  Compass,
  Briefcase,
  Layers,
  Award,
  Maximize2,
  Clock,
  Sparkles,
} from "lucide-react";

// Project Interfaces
interface Project {
  id: string;
  title: string;
  location: string;
  size: string;
  year: string;
  category: string;
  image: string;
  description: string;
  concept: string;
  materials: string[];
  specs: {
    architect: string;
    duration: string;
    leadDesigner: string;
    style: string;
  };
}

// Gallery image URL list
const INSTAGRAM_GALLERY = [
  {
    url: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=80",
    caption: "Bespoke kitchen design with imported Italian marble and seamless cabinetry.",
  },
  {
    url: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80",
    caption: "Sunlit modern living concept blending brutalist concrete with warm oak wood.",
  },
  {
    url: "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=800&q=80",
    caption: "Monolithic luxury master bath highlighting brass metalwork and integrated lighting.",
  },
  {
    url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
    caption: "Grand entrance foyer framing curated contemporary sculpture pieces.",
  },
  {
    url: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=800&q=80",
    caption: "Infinite outdoor lounge design seamlessly connected to the internal living suite.",
  },
];

// Custom hook for counting up
const useCountUp = (target: number, duration: number = 1500, trigger: boolean) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!trigger) return;
    let start = 0;
    const end = target;
    const totalSteps = 60;
    const stepTime = duration / totalSteps;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      const progress = step / totalSteps;
      // Ease out quad
      const currentCount = Math.round(end * (progress * (2 - progress)));
      
      if (step >= totalSteps) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(currentCount);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [target, duration, trigger]);

  return count;
};

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState("PORTFOLIO");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Modal States
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Form States
  const [bookingForm, setBookingForm] = useState({
    name: "",
    email: "",
    phone: "",
    scope: "Residential Mansion",
    consultationType: "On-site",
    budget: "10M - 30M PKR",
    message: "",
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Ref for intersection observer to trigger counters
  const metricsRef = useRef<HTMLDivElement>(null);
  const [metricsInView, setMetricsInView] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setMetricsInView(true);
        }
      },
      { threshold: 0.1 }
    );

    if (metricsRef.current) {
      observer.observe(metricsRef.current);
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (metricsRef.current) {
        observer.unobserve(metricsRef.current);
      }
    };
  }, []);

  // Project data using our generated image paths
  const projects: Project[] = [
    {
      id: "gulshan-villa",
      title: "GULSHAN VILLA",
      location: "Gulshan-e-Iqbal, Karachi",
      size: "500 SQ YD",
      year: "2024",
      category: "LUXURY RESIDENCE",
      image: "/src/assets/images/gulshan_villa_1786189340971.jpg",
      description: "A breathtaking masterclass in modern architecture. Gulshan Villa showcases how sprawling space can be curated into bespoke, cozy nodes that offer luxury while preserving family warmth.",
      concept: "Harmonizing raw materials like travertine marble and seasoned burma teak wood under soft indirect ambient lighting.",
      materials: ["Italian Travertine", "Teak Wood Panel", "Brushed Brass Details", "Polished Concrete Slab"],
      specs: {
        architect: "Ar. Hammad Alvi",
        duration: "14 Months",
        leadDesigner: "Syed M. Rizvi",
        style: "Modern Warm Architectural",
      },
    },
    {
      id: "penthouse-dha",
      title: "PENTHOUSE",
      location: "DHA Phase 8, Karachi",
      size: "4500 SQ FT",
      year: "2024",
      category: "LUXURY PENTHOUSE",
      image: "/src/assets/images/penthouse_dha_1786189353849.jpg",
      description: "Perched high with beautiful views of the Arabian Sea, this penthouse was completely hollowed out to install a double-height dark luxury pavilion designed specifically to host high-profile guests.",
      concept: "Monolithic dark structural styling contrasted by exquisite gold profiles, textured plaster work, and dynamic cove illumination.",
      materials: ["Black Saint Laurent Marble", "Smoked Oak Flooring", "Graphite Metalwork", "Handmade Crystal Pendants"],
      specs: {
        architect: "Ar. Hammad Alvi",
        duration: "10 Months",
        leadDesigner: "Marium Naqvi",
        style: "Dark Contemporary Luxury",
      },
    },
    {
      id: "bahria-villa",
      title: "BAHRIA SPORTS CITY VILLA",
      location: "Bahria Town, Karachi",
      size: "350 SQ YD",
      year: "2024",
      category: "EXTERIOR VILLA DESIGN",
      image: "/src/assets/images/bahria_villa_1786189368357.jpg",
      description: "An elegant, futuristic exterior architectural concept. This masterpiece leverages stark cantilevered forms and layered lighting to stand out as a beacon of luxury in Bahria Sports City.",
      concept: "Utilizing deep overhangs, panoramic safety glass walls, and dynamic warm external lighting layouts for unmatched curb appeal.",
      materials: ["Textured Raw Concrete", "Rust-proof Thermal Steel Panels", "Tempered Safety Glass", "Integrated LED Channels"],
      specs: {
        architect: "Ar. Hammad Alvi",
        duration: "18 Months",
        leadDesigner: "Syed M. Rizvi",
        style: "Minimalist brutalist luxury",
      },
    },
  ];

  // Animated counters
  const roomsDesigned = useCountUp(650, 1500, metricsInView);
  const luxuryHomes = useCountUp(180, 1500, metricsInView);
  const yearsExp = useCountUp(12, 1000, metricsInView);
  const satisfaction = useCountUp(99, 1000, metricsInView);

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setIsBookingOpen(false);
      setBookingForm({
        name: "",
        email: "",
        phone: "",
        scope: "Residential Mansion",
        consultationType: "On-site",
        budget: "10M - 30M PKR",
        message: "",
      });
    }, 4000);
  };

  const handleNextLightbox = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex + 1) % INSTAGRAM_GALLERY.length);
  };

  const handlePrevLightbox = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex - 1 + INSTAGRAM_GALLERY.length) % INSTAGRAM_GALLERY.length);
  };

  const handleNavClick = (sectionId: string, label: string) => {
    setActiveTab(label);
    setMobileMenuOpen(false);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div id="home" className="min-h-screen bg-[#111010] font-sans text-[#F8F8F8] relative overflow-hidden">
      {/* Scroll Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-[#1F1A17] z-50">
        <motion.div 
          className="h-full bg-[#C5A059]"
          style={{ width: "100%" }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.5 }}
        />
      </div>

      {/* STICKY NAVIGATION BAR */}
      <nav
        id="navbar"
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 py-6 md:py-8 px-6 md:px-12 ${
          isScrolled 
            ? "bg-[#111010]/95 backdrop-blur-md shadow-2xl border-b border-[#2C2420]/30 py-4 md:py-5" 
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          {/* Logo Brand Block */}
          <div 
            onClick={() => handleNavClick("home", "PORTFOLIO")}
            className="flex items-center space-x-3 cursor-pointer group"
          >
            {/* Elegant WebP Image Logo */}
            <div className="w-14 h-14 flex items-center justify-center relative overflow-hidden">
              <img 
                src="https://i.postimg.cc/qqxT1nHB/logo.webp" 
                alt="Al-Hammad Interiors Logo" 
                className="w-full h-full object-contain absolute transform group-hover:scale-110 transition-transform duration-500" 
              />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-lg md:text-xl font-bold tracking-wider text-[#F8F8F8] group-hover:text-[#C5A059] transition-colors duration-500 leading-tight">
                Al-Hammad
              </span>
              <span className="text-[9px] font-sans tracking-[0.18em] text-[#C5A059] font-medium leading-none uppercase">
                Interiors & Architecture
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center space-x-10 text-xs font-medium tracking-[0.2em] text-[#F8F8F8]/80">
            {[
              { label: "Portfolio", section: "projects" },
              { label: "About Us & Showroom", section: "trust" },
              { label: "Contact Us", section: "contact" },
            ].map((item) => (
              <button
                key={item.label}
                id={`nav-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
                onClick={() => handleNavClick(item.section, item.label)}
                className={`relative py-1 cursor-pointer transition-colors hover:text-[#C5A059] ${
                  activeTab === item.label ? "text-[#C5A059] font-semibold" : ""
                }`}
              >
                {item.label}
                {activeTab === item.label && (
                  <motion.div
                    layoutId="activeNavLine"
                    className="absolute bottom-0 left-0 right-0 h-[1px] bg-[#C5A059]"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* Desktop Right CTA Action */}
          <div className="hidden lg:block">
            <button
              id="cta-nav-booking"
              onClick={() => setIsBookingOpen(true)}
              className="text-xs tracking-[0.25em] font-medium border border-[#C5A059] px-6 py-3 hover:bg-[#C5A059] hover:text-[#111010] transition-all duration-500 bg-transparent text-[#C5A059] uppercase font-sans cursor-pointer"
            >
              Consultation
            </button>
          </div>

          {/* Mobile Hamburguer Menu Button */}
          <button
            id="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-[#F8F8F8] hover:text-[#C5A059] transition-colors cursor-pointer"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Navigation overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-nav-drawer"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-30 bg-[#111010] pt-28 px-8 flex flex-col justify-between pb-12 lg:hidden"
          >
            <div className="flex flex-col space-y-8">
              {[
                { label: "Portfolio", section: "projects" },
                { label: "About Us & Showroom", section: "trust" },
                { label: "Contact Us", section: "contact" },
              ].map((item) => (
                <button
                  key={item.label}
                  id={`mobile-nav-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
                  onClick={() => handleNavClick(item.section, item.label)}
                  className="text-2xl font-serif tracking-widest text-left text-[#F8F8F8] hover:text-[#C5A059] transition-colors border-b border-[#1F1A17] pb-3"
                >
                  {item.label}
                </button>
              ))}
            </div>

            <div className="flex flex-col space-y-6">
              <button
                id="mobile-drawer-cta"
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsBookingOpen(true);
                }}
                className="w-full text-center text-xs tracking-[0.25em] border border-[#C5A059] bg-[#C5A059] text-[#111010] py-4 uppercase font-semibold transition-all duration-300"
              >
                BOOK A CONSULTATION
              </button>
              
              <div className="flex justify-center space-x-6 text-[#C5A059]">
                <a href="https://instagram.com" target="_blank" rel="noreferrer" className="p-2 border border-[#2C2420]/55 hover:border-[#C5A059] transition-all" aria-label="Instagram"><Instagram className="w-5 h-5" /></a>
                <a href="https://facebook.com" target="_blank" rel="noreferrer" className="p-2 border border-[#2C2420]/55 hover:border-[#C5A059] transition-all" aria-label="Facebook"><Facebook className="w-5 h-5" /></a>
                <a href="https://wa.me/923028212429" target="_blank" rel="noreferrer" className="p-2 border border-[#2C2420]/55 hover:border-[#C5A059] transition-all" aria-label="WhatsApp"><MessageCircle className="w-5 h-5" /></a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HERO SECTION */}
      <section 
        id="hero" 
        className="relative min-h-screen flex items-center justify-center bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(17,16,16,0.3) 0%, rgba(17,16,16,0.7) 50%, rgba(17,16,16,1) 100%), url('/src/assets/images/luxury_living_hero_1786189325121.jpg')`
        }}
      >
        {/* Subtle decorative scroll down lines */}
        <div className="absolute right-12 bottom-20 z-10 hidden md:flex flex-col items-center space-y-3 rotate-90 origin-right">
          <span className="text-[10px] tracking-[0.5em] text-[#C5A059] uppercase font-sans">AL HAMMAD STUDIO</span>
          <div className="w-16 h-[1px] bg-[#C5A059]/40"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-12 w-full pt-20">
          <div className="max-w-4xl text-left">
            {/* Super luxury subhead */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="flex items-center space-x-3 mb-6"
            >
              <div className="w-8 h-[1px] bg-[#C5A059]"></div>
              <span className="text-xs md:text-sm font-sans tracking-[0.4em] text-[#C5A059] uppercase font-medium">
                THE ART OF LUXURY LIVING
              </span>
            </motion.div>

            {/* Main Statement Title */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.2 }}
              className="font-serif text-4xl sm:text-5xl md:text-7xl font-bold leading-[1.1] mb-8 tracking-tight"
            >
              WE DON'T DESIGN <br className="hidden md:block"/>
              INTERIORS. <span className="text-[#C5A059] italic font-normal">WE DESIGN</span> <br className="hidden md:block"/>
              STATUS.
            </motion.h1>

            {/* Metadata Line */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="border-t border-[#2C2420]/60 pt-6 mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="text-xs tracking-[0.25em] text-[#F8F8F8]/90 font-medium font-sans">
                AL-HAMMAD INTERIORS & ARCHITECTURE | KARACHI • PAKISTAN
              </div>

              {/* Tag badges */}
              <div className="flex flex-wrap gap-2 text-[10px] tracking-widest text-[#C5A059]/90 font-semibold uppercase">
                <span>LUXURY INTERIOR DESIGN</span>
                <span className="text-[#F8F8F8]/40">•</span>
                <span>ARCHITECTURE</span>
                <span className="text-[#F8F8F8]/40">•</span>
                <span>TURNKEY EXECUTION</span>
              </div>
            </motion.div>

            {/* Elegant Brand Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.5 }}
              className="text-[#EBE6DD]/90 font-serif text-base sm:text-lg md:text-xl font-light italic mb-8 max-w-3xl leading-relaxed"
            >
              "Designing bespoke interior ecosystems radiating luxury warm-wood aesthetics. Complete turnkey execution across DHA, Clifton, Gulshan, and PECHS in Karachi."
            </motion.p>

            {/* Main CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <button
                id="hero-cta-discover"
                onClick={() => handleNavClick("projects", "Portfolio")}
                className="group relative px-8 py-4 border border-[#C5A059] bg-[#111010]/30 hover:bg-[#C5A059] hover:text-[#111010] transition-all duration-500 text-xs tracking-[0.25em] font-medium font-sans flex items-center justify-center space-x-2 cursor-pointer uppercase"
              >
                <span>DISCOVER OUR WORK</span>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform duration-300" />
              </button>
              
              <button
                id="hero-cta-consult"
                onClick={() => setIsBookingOpen(true)}
                className="px-8 py-4 bg-[#C5A059] text-[#111010] hover:bg-[#F8F8F8] transition-all duration-500 text-xs tracking-[0.25em] font-bold font-sans cursor-pointer uppercase"
              >
                BOOK EXCLUSIVE BRIEFING
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ABOUT US & SHOWROOM SECTION (Light Cream Background) */}
      <section 
        id="trust" 
        className="bg-[#EBE6DD] text-[#222222] py-24 px-6 md:px-12 relative overflow-hidden"
      >
        {/* Subtle decorative grid background pattern */}
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-[#222222]"></div>
          <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-[#222222]"></div>
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Core Philosophy */}
          <div id="showroom-about-column" className="lg:col-span-6 flex flex-col justify-center">
            <span className="text-xs tracking-[0.4em] text-[#C5A059] uppercase font-bold block mb-3 font-sans">
              ABOUT AL-HAMMAD
            </span>
            <h2 className="font-serif text-3xl md:text-5xl font-bold tracking-tight leading-tight mb-6 text-[#1F1A17]">
              Bespoke Interior Ecosystems
            </h2>
            <div className="w-24 h-[2px] bg-[#C5A059] mb-6"></div>
            <p className="text-base md:text-lg leading-relaxed text-[#222222] font-serif mb-6 italic">
              "Designing bespoke interior ecosystems radiating luxury warm-wood aesthetics. Complete turnkey execution across DHA, Clifton, Gulshan, and PECHS in Karachi."
            </p>
            <p className="text-sm md:text-base leading-relaxed text-[#222222]/80 font-light font-sans">
              Our award-winning design house is recognized for unparalleled structural integrity, exotic materials, and custom-engineered woodwork. We serve clients who value legacy, prestige, and seamless executive execution.
            </p>
          </div>

          {/* Right Column: Gulshan Showroom Card */}
          <div id="showroom-card-column" className="lg:col-span-6 bg-[#1F1A17] text-[#F8F8F8] p-8 md:p-10 border border-[#2C2420]/30 shadow-2xl relative">
            <div className="absolute top-0 right-0 bg-[#C5A059] text-[#111010] text-[10px] tracking-widest font-bold font-sans px-4 py-1 uppercase">
              SHOWROOM VISITS
            </div>
            
            <h3 className="font-serif text-2xl md:text-3xl font-bold text-[#F8F8F8] mb-4">
              GULSHAN SHOWROOM
            </h3>
            <div className="w-12 h-[1px] bg-[#C5A059] mb-6"></div>
            
            <div className="space-y-6 text-xs font-sans">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-[#C5A059] shrink-0 mt-0.5" />
                <p className="text-[#F8F8F8]/85 leading-relaxed tracking-wide">
                  Showroom # R-69, Railway Housing Society Project, Block 13D-1, Gulshan-e-Iqbal, Karachi 75300, Pakistan
                </p>
              </div>

              <div className="flex items-center space-x-3">
                <Clock className="w-5 h-5 text-[#C5A059] shrink-0" />
                <p className="text-[#F8F8F8]/85 tracking-wide font-medium">
                  Open • Mon to Sat (11:00 AM - 9:00 PM)
                </p>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-[#2C2420]/30 flex flex-wrap gap-4">
              <a
                href="https://wa.me/923028212429"
                target="_blank"
                rel="noreferrer"
                className="bg-[#C5A059] text-[#111010] hover:bg-[#F8F8F8] transition-colors font-bold uppercase tracking-wider text-[10px] px-5 py-3 flex items-center space-x-2"
              >
                <MessageCircle className="w-4 h-4 shrink-0" />
                <span>WHATSAPP DIRECT</span>
              </a>
              <button
                onClick={() => setIsBookingOpen(true)}
                className="border border-[#F8F8F8]/20 hover:border-[#C5A059] transition-colors font-semibold uppercase tracking-wider text-[10px] px-5 py-3 cursor-pointer"
              >
                BOOK EXCLUSIVE APPOINTMENT
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED PROJECTS GRID SECTION */}
      <section 
        id="projects" 
        className="py-24 px-6 md:px-12 bg-[#111010] border-t border-[#1F1A17]"
      >
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="max-w-xl">
              <span className="text-xs tracking-[0.4em] text-[#C5A059] uppercase font-bold block mb-3 font-sans">
                CURATED PORTFOLIO
              </span>
              <h2 className="font-serif text-3xl md:text-5xl font-bold tracking-tight">
                FEATURED PROJECTS
              </h2>
            </div>
            
            <div className="flex space-x-3 text-xs tracking-widest font-semibold uppercase font-sans">
              <span className="text-[#C5A059]">01 / ARCHITECTURE</span>
              <span className="text-[#F8F8F8]/30">|</span>
              <span className="text-[#F8F8F8]/60">02 / INTERIORS</span>
            </div>
          </div>

          {/* 3-Column Image Cards Grid */}
          <div id="projects-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <motion.div
                key={project.id}
                id={`project-card-${project.id}`}
                whileHover={{ y: -8 }}
                onClick={() => setSelectedProject(project)}
                className="group bg-[#1F1A17] overflow-hidden border border-[#2C2420]/40 flex flex-col h-full cursor-pointer transition-all duration-500 relative"
              >
                {/* Image Container with Hover zoom */}
                <div className="aspect-[4/3] w-full overflow-hidden relative">
                  <div className="absolute inset-0 bg-[#111010]/15 group-hover:bg-transparent transition-colors duration-500 z-10"></div>
                  <img
                    src={project.image}
                    alt={project.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transform scale-100 group-hover:scale-110 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute top-4 right-4 bg-[#111010]/85 border border-[#C5A059]/40 px-3 py-1 text-[9px] tracking-widest text-[#C5A059] font-sans uppercase font-bold z-20">
                    {project.category}
                  </div>
                </div>

                {/* Info Metadata Container */}
                <div className="p-6 md:p-8 flex-grow flex flex-col justify-between border-t border-[#2C2420]/30">
                  <div>
                    <h3 className="font-serif text-xl md:text-2xl font-bold mb-3 tracking-wide group-hover:text-[#C5A059] transition-colors duration-300">
                      {project.title}
                    </h3>
                    <p className="text-xs text-[#F8F8F8]/60 tracking-wider font-sans mb-6 font-light">
                      {project.location}
                    </p>
                  </div>

                  <div className="flex justify-between items-center border-t border-[#2C2420]/25 pt-4 text-[10px] tracking-[0.15em] font-semibold text-[#C5A059] font-sans">
                    <span className="uppercase">{project.size}</span>
                    <span className="text-[#F8F8F8]/30">•</span>
                    <span>{project.year}</span>
                    <span className="text-[#F8F8F8]/30">•</span>
                    <span className="underline group-hover:text-[#F8F8F8] transition-colors">VIEW CONCEPT &rarr;</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Section Footer Link */}
          <div className="mt-16 text-center">
            <button
              id="projects-cta-all"
              onClick={() => handleNavClick("projects", "Portfolio")}
              className="text-xs tracking-[0.3em] text-[#C5A059] hover:text-[#F8F8F8] font-bold uppercase transition-all duration-300 cursor-pointer border-b border-[#C5A059]/30 hover:border-[#F8F8F8] pb-1.5"
            >
              EXPLORE ALL PROJECTS &gt;
            </button>
          </div>
        </div>
      </section>

      {/* VIDEO FEATURE SECTION */}
      <section 
        id="video-feature" 
        className="relative py-32 px-6 md:px-12 bg-cover bg-center flex items-center justify-center border-t border-[#1F1A17]"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(17,16,16,0.7) 0%, rgba(17,16,16,0.75) 50%, rgba(17,16,16,0.8) 100%), url('/src/assets/images/luxury_living_hero_1786189325121.jpg')`
        }}
      >
        <div className="max-w-4xl mx-auto text-center relative z-10 flex flex-col items-center">
          {/* Animated pulsing play button */}
          <button
            id="play-walkthrough-video"
            onClick={() => setIsVideoModalOpen(true)}
            className="w-20 h-20 md:w-24 md:h-24 rounded-full border border-[#C5A059] flex items-center justify-center bg-[#111010]/70 text-[#C5A059] hover:bg-[#C5A059] hover:text-[#111010] transform scale-100 hover:scale-110 transition-all duration-500 cursor-pointer shadow-2xl relative group mb-8"
          >
            <div className="absolute inset-0 rounded-full border border-[#C5A059]/40 animate-ping opacity-75"></div>
            <Play className="w-8 h-8 ml-1 fill-current" />
          </button>

          <span className="text-xs tracking-[0.4em] text-[#C5A059] uppercase font-bold mb-3 font-sans">
            CINEMATIC TOUR
          </span>
          <h2 className="font-serif text-3xl md:text-5xl font-bold tracking-tight mb-4 uppercase">
            LUXURY VILLA TRANSFORMATION
          </h2>
          <p className="text-xs md:text-sm tracking-[0.25em] text-[#F8F8F8]/70 font-semibold font-sans uppercase">
            WATCH EXCLUSIVE WALK-THROUGH VIDEO
          </p>
        </div>
      </section>

      {/* KEY METRICS COUNTER SECTION (Light Cream Background) */}
      <section 
        ref={metricsRef} 
        id="metrics" 
        className="bg-[#EBE6DD] text-[#222222] py-20 px-6 md:px-12 border-y border-[#1F1A17]/10"
      >
        <div className="max-w-7xl mx-auto">
          {/* 4-Column Grid */}
          <div id="metrics-grid" className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
            {[
              { number: roomsDesigned, suffix: "+", label: "ROOMS DESIGNED" },
              { number: luxuryHomes, suffix: "+", label: "LUXURY HOMES" },
              { number: yearsExp, suffix: "+", label: "YEARS OF MASTERY" },
              { number: satisfaction, suffix: "%", label: "CLIENT SATISFACTION" },
            ].map((metric, idx) => (
              <div
                key={idx}
                id={`metric-item-${idx}`}
                className="flex flex-col items-center text-center p-6 border-r last:border-r-0 border-[#222222]/10 md:even:border-r lg:even:border-r"
              >
                <div className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-[#1F1A17] tracking-tight">
                  {metric.number}
                  <span className="text-[#C5A059] font-sans font-semibold">{metric.suffix}</span>
                </div>
                <div className="w-12 h-[1px] bg-[#C5A059] my-4"></div>
                <div className="text-[10px] md:text-xs tracking-[0.25em] font-bold text-[#222222]/80 uppercase font-sans">
                  {metric.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INSTAGRAM / PORTFOLIO SHOWCASE GRID SECTION */}
      <section 
        id="instagram" 
        className="py-24 px-6 md:px-12 bg-[#111010]"
      >
        <div className="max-w-7xl mx-auto">
          {/* Sub-header */}
          <div className="text-center mb-16">
            <span className="text-xs tracking-[0.4em] text-[#C5A059] uppercase font-bold block mb-4 font-sans">
              DIGITAL GALLERY
            </span>
            <h2 className="font-serif text-2xl md:text-4xl font-bold tracking-tight mb-2">
              FOLLOW OUR JOURNEY
            </h2>
            <a 
              href="https://instagram.com" 
              target="_blank" 
              rel="noreferrer" 
              className="text-xs tracking-[0.2em] text-[#C5A059] font-semibold uppercase hover:text-[#F8F8F8] transition-colors font-sans"
            >
              @ALHAMMAD.INTERIORS
            </a>
          </div>

          {/* 5-Column Horizontal Photo Gallery */}
          <div id="instagram-gallery-grid" className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {INSTAGRAM_GALLERY.map((img, index) => (
              <div
                key={index}
                id={`gallery-item-${index}`}
                onClick={() => setLightboxIndex(index)}
                className="aspect-square bg-[#1F1A17] relative group overflow-hidden cursor-pointer border border-[#2C2420]/30"
              >
                <div className="absolute inset-0 bg-[#111010]/35 group-hover:bg-[#111010]/10 transition-colors duration-300 z-10"></div>
                <img
                  src={img.url}
                  alt={`Portfolio shot ${index + 1}`}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transform scale-100 group-hover:scale-110 transition-transform duration-500 ease-out"
                />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[#111010]/60 z-20">
                  <div className="text-center p-4">
                    <Maximize2 className="w-5 h-5 text-[#C5A059] mx-auto mb-2" />
                    <span className="text-[10px] tracking-widest text-[#F8F8F8] uppercase font-semibold font-sans">VIEW IMAGE</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CALL TO ACTION (CTA) BANNER */}
      <section 
        id="cta-banner" 
        className="grid grid-cols-1 lg:grid-cols-12 bg-[#1F1A17] border-t border-b border-[#2C2420]/30"
      >
        {/* Left Side: Text and CTA Form trigger */}
        <div id="cta-text-side" className="lg:col-span-7 py-20 px-8 md:px-16 flex flex-col justify-center max-w-3xl">
          <span className="text-xs tracking-[0.4em] text-[#C5A059] uppercase font-bold block mb-4 font-sans">
            GET IN TOUCH
          </span>
          <h2 className="font-serif text-4xl md:text-6xl font-bold tracking-tight text-[#F8F8F8] leading-[1.1] mb-8">
            LET'S CREATE SOMETHING EXCEPTIONAL.
          </h2>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              id="cta-trigger-modal"
              onClick={() => setIsBookingOpen(true)}
              className="group px-8 py-4 bg-[#C5A059] text-[#111010] hover:bg-[#F8F8F8] transition-all duration-500 text-xs tracking-[0.25em] font-bold font-sans flex items-center justify-center space-x-2 cursor-pointer uppercase"
            >
              <span>BOOK CONSULTATION</span>
              <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300 text-[#111010]" />
            </button>
            <a
              id="cta-contact-phone"
              href="tel:03028212429"
              className="px-8 py-4 border border-[#F8F8F8]/20 hover:border-[#C5A059] transition-all duration-500 text-xs tracking-[0.25em] font-semibold text-center uppercase font-sans flex items-center justify-center space-x-2"
            >
              <Phone className="w-4 h-4 text-[#C5A059]" />
              <span>CALL DIRECT: 0302 8212429</span>
            </a>
          </div>
        </div>

        {/* Right Side: Warm-lit ambient dining room render background */}
        <div 
          id="cta-image-side" 
          className="lg:col-span-5 aspect-[4/3] lg:aspect-auto bg-cover bg-center min-h-[350px]"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(31,26,23,0.85) 0%, rgba(31,26,23,0.1) 100%), url('/src/assets/images/dining_room_cta_1786189384321.jpg')`
          }}
        ></div>
      </section>

      {/* FOOTER SECTION (Dark Background) */}
      <footer 
        id="contact" 
        className="bg-[#111010] text-[#F8F8F8]/80 py-20 px-6 md:px-12 border-t border-[#1F1A17]"
      >
        <div className="max-w-7xl mx-auto">
          {/* Main Footer layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 pb-16 border-b border-[#1F1A17]">
            {/* Left: Logo & Brand Name */}
            <div id="footer-brand" className="lg:col-span-4 flex flex-col space-y-6">
              <div className="flex items-center space-x-3">
                {/* Brand WebP logo container */}
                <div className="w-12 h-12 flex items-center justify-center border border-[#C5A059] bg-[#1F1A17] p-1 overflow-hidden">
                  <img src="https://i.postimg.cc/qqxT1nHB/logo.webp" alt="Al-Hammad Interiors Logo" className="w-full h-full object-contain" />
                </div>
                <div className="flex flex-col">
                  <span className="font-serif text-lg font-bold tracking-wider text-[#F8F8F8] leading-tight">
                    Al-Hammad
                  </span>
                  <span className="text-[9px] font-sans tracking-[0.18em] text-[#C5A059] font-medium leading-none uppercase">
                    Interiors & Architecture
                  </span>
                </div>
              </div>
              <p className="text-xs leading-relaxed text-[#F8F8F8]/60 max-w-sm font-sans">
                Designing bespoke interior ecosystems radiating luxury warm-wood aesthetics. Complete turnkey execution across DHA, Clifton, Gulshan, and PECHS in Karachi.
              </p>
            </div>

            {/* Center: Showroom Address & Operating Hours */}
            <div id="footer-showroom-details" className="lg:col-span-5 flex flex-col space-y-4">
              <h4 className="text-xs tracking-[0.25em] text-[#C5A059] font-bold uppercase font-sans mb-2">
                GULSHAN SHOWROOM
              </h4>
              <div className="flex items-start space-x-3 text-xs font-sans">
                <MapPin className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" />
                <span>Showroom # R-69, Railway Housing Society Project, Block 13D-1, Gulshan-e-Iqbal, Karachi 75300, Pakistan</span>
              </div>
              <div className="flex items-center space-x-3 text-xs font-sans">
                <Clock className="w-4 h-4 text-[#C5A059] shrink-0" />
                <span>Open • Mon to Sat (11:00 AM - 9:00 PM)</span>
              </div>
              
              {/* Quick Navigation list requested */}
              <div className="pt-4 border-t border-[#1F1A17]">
                <h5 className="text-[9px] tracking-[0.2em] text-[#C5A059] font-bold uppercase mb-2">NAVIGATION</h5>
                <div className="flex space-x-6 text-[11px] font-medium">
                  <button onClick={() => handleNavClick("projects", "Portfolio")} className="hover:text-[#C5A059] transition-colors cursor-pointer">Portfolio</button>
                  <button onClick={() => handleNavClick("trust", "About Us & Showroom")} className="hover:text-[#C5A059] transition-colors cursor-pointer">About Us & Showroom</button>
                  <button onClick={() => handleNavClick("contact", "Contact Us")} className="hover:text-[#C5A059] transition-colors cursor-pointer">Contact Us</button>
                </div>
              </div>
            </div>

            {/* Right: Follow Us Social Connections & direct contacts */}
            <div id="footer-social" className="lg:col-span-3 flex flex-col space-y-4">
              <h4 className="text-xs tracking-[0.25em] text-[#C5A059] font-bold uppercase font-sans mb-2">
                GET IN TOUCH
              </h4>
              <div className="space-y-2 text-xs font-sans text-[#F8F8F8]/80 mb-2">
                <div className="flex items-center space-x-2">
                  <Phone className="w-3.5 h-3.5 text-[#C5A059]" />
                  <a href="tel:03028212429" className="hover:text-[#C5A059]">0302 8212429</a>
                </div>
                <div className="flex items-center space-x-2">
                  <MessageCircle className="w-3.5 h-3.5 text-[#C5A059]" />
                  <a href="https://wa.me/923028212429" target="_blank" rel="noreferrer" className="hover:text-[#C5A059]">WhatsApp: +923028212429</a>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="w-3.5 h-3.5 text-[#C5A059]" />
                  <a href="mailto:hammadinteriors@gmail.com" className="hover:text-[#C5A059]">hammadinteriors@gmail.com</a>
                </div>
              </div>

              <div className="flex space-x-3">
                <a 
                  id="footer-social-instagram"
                  href="https://instagram.com" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="w-10 h-10 border border-[#2C2420] hover:border-[#C5A059] flex items-center justify-center hover:text-[#C5A059] transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a 
                  id="footer-social-facebook"
                  href="https://facebook.com" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="w-10 h-10 border border-[#2C2420] hover:border-[#C5A059] flex items-center justify-center hover:text-[#C5A059] transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook className="w-4 h-4" />
                </a>
                <a 
                  id="footer-social-whatsapp"
                  href="https://wa.me/923028212429" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="w-10 h-10 border border-[#2C2420] hover:border-[#C5A059] flex items-center justify-center hover:text-[#C5A059] transition-colors"
                  aria-label="WhatsApp"
                >
                  <MessageCircle className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Sub Footer Legal Credits */}
          <div className="pt-8 flex flex-col sm:flex-row justify-between items-center text-[10px] tracking-widest text-[#F8F8F8]/40 font-sans">
            <span>© 2026 AL-HAMMAD INTERIORS & ARCHITECTURE. ALL RIGHTS RESERVED.</span>
            <div className="flex space-x-6 mt-4 sm:mt-0">
              <a href="#home" className="hover:text-[#C5A059] transition-colors">TERMS OF USE</a>
              <a href="#home" className="hover:text-[#C5A059] transition-colors">PRIVACY POLICY</a>
            </div>
          </div>
        </div>
      </footer>

      {/* QUICK FLOATING CONSULTATION ACTION BUTTON */}
      <div className="fixed bottom-6 right-6 z-30">
        <button
          id="floating-consultation-btn"
          onClick={() => setIsBookingOpen(true)}
          className="bg-[#C5A059] hover:bg-[#F8F8F8] text-[#111010] p-4 rounded-none shadow-2xl flex items-center space-x-2 tracking-[0.2em] text-xs font-bold transition-all duration-300 group font-sans cursor-pointer"
        >
          <Calendar className="w-4 h-4" />
          <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 ease-out whitespace-nowrap">
            BOOK INQUIRY
          </span>
        </button>
      </div>

      {/* MODAL 1: FEATURED PROJECT DETAIL PANEL */}
      <AnimatePresence>
        {selectedProject && (
          <div 
            id="project-detail-modal" 
            className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 md:p-10 bg-[#111010]/95 backdrop-blur-md"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[#1F1A17] border border-[#2C2420]/50 max-w-5xl w-full relative overflow-hidden shadow-2xl max-h-[90vh] flex flex-col md:flex-row"
            >
              {/* Close Button */}
              <button
                id="close-project-modal"
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 z-20 p-2 bg-[#111010]/80 text-[#F8F8F8] hover:text-[#C5A059] border border-[#2C2420]/30 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Left Side: Massive Project Visualization */}
              <div className="w-full md:w-1/2 relative min-h-[250px] md:min-h-0 bg-[#111010]">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1F1A17] via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:via-transparent md:to-[#1F1A17]"></div>
              </div>

              {/* Right Side: Deep Concept Analysis & Details */}
              <div className="w-full md:w-1/2 p-8 md:p-12 overflow-y-auto flex flex-col justify-between">
                <div>
                  <span className="text-[10px] tracking-[0.4em] text-[#C5A059] uppercase font-bold block mb-2 font-sans">
                    {selectedProject.category}
                  </span>
                  <h3 className="font-serif text-3xl font-bold tracking-wide text-[#F8F8F8] mb-4">
                    {selectedProject.title}
                  </h3>
                  
                  {/* Tab Details */}
                  <div className="flex border-b border-[#2C2420]/30 mb-6 text-xs tracking-widest font-semibold font-sans space-x-6 pb-2">
                    <span className="text-[#C5A059] border-b-2 border-[#C5A059] pb-2">CONCEPT</span>
                    <span className="text-[#F8F8F8]/40">SPECS</span>
                  </div>

                  <p className="text-xs leading-relaxed text-[#F8F8F8]/70 mb-6 font-sans font-light">
                    {selectedProject.description}
                  </p>

                  <div className="mb-6">
                    <h4 className="text-[10px] tracking-widest text-[#C5A059] font-bold mb-2 uppercase font-sans">THE ARCHITECTURAL THEME</h4>
                    <p className="text-xs italic text-[#F8F8F8]/80 font-serif leading-relaxed">
                      "{selectedProject.concept}"
                    </p>
                  </div>

                  {/* Materials list */}
                  <div className="mb-8">
                    <h4 className="text-[10px] tracking-widest text-[#C5A059] font-bold mb-3 uppercase font-sans">SIGNATURE MATERIAL SELECTIONS</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.materials.map((mat, i) => (
                        <span key={i} className="text-[10px] tracking-wider font-semibold uppercase bg-[#111010] border border-[#2C2420]/40 text-[#F8F8F8]/80 px-2.5 py-1">
                          {mat}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Grid of Key Technical Specifications */}
                <div className="border-t border-[#2C2420]/40 pt-6 grid grid-cols-2 gap-4 text-xs font-sans">
                  <div>
                    <span className="block text-[9px] tracking-widest text-[#F8F8F8]/40 uppercase">PRINCIPAL ARCHITECT</span>
                    <span className="font-semibold text-[#F8F8F8]">{selectedProject.specs.architect}</span>
                  </div>
                  <div>
                    <span className="block text-[9px] tracking-widest text-[#F8F8F8]/40 uppercase">EXECUTION PERIOD</span>
                    <span className="font-semibold text-[#F8F8F8]">{selectedProject.specs.duration}</span>
                  </div>
                  <div>
                    <span className="block text-[9px] tracking-widest text-[#F8F8F8]/40 uppercase">LEAD DESIGNER</span>
                    <span className="font-semibold text-[#F8F8F8]">{selectedProject.specs.leadDesigner}</span>
                  </div>
                  <div>
                    <span className="block text-[9px] tracking-widest text-[#F8F8F8]/40 uppercase">DESIGN LANGUAGE</span>
                    <span className="font-semibold text-[#C5A059] uppercase text-[10px]">{selectedProject.specs.style}</span>
                  </div>
                </div>

                {/* Consultation trigger inside modal */}
                <div className="mt-8">
                  <button
                    id="modal-cta-consultation"
                    onClick={() => {
                      setSelectedProject(null);
                      setIsBookingOpen(true);
                    }}
                    className="w-full text-center text-xs tracking-widest bg-[#C5A059] hover:bg-[#F8F8F8] text-[#111010] py-3.5 uppercase font-bold transition-colors cursor-pointer"
                  >
                    BOOK PROJECT REPLICATE CONSULTATION
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MODAL 2: VIRTUAL WALKTHROUGH SIMULATED VIDEO PLAYER */}
      <AnimatePresence>
        {isVideoModalOpen && (
          <div 
            id="video-player-modal" 
            className="fixed inset-0 z-50 bg-[#111010]/98 backdrop-blur-md flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-[#1F1A17] border border-[#2C2420] max-w-4xl w-full relative overflow-hidden shadow-2xl flex flex-col"
            >
              {/* Close Button */}
              <button
                id="close-video-modal"
                onClick={() => setIsVideoModalOpen(false)}
                className="absolute top-4 right-4 z-20 p-2 bg-[#111010]/80 text-[#F8F8F8] hover:text-[#C5A059] border border-[#2C2420]/30 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              {/* simulated architecture walkthrough screen */}
              <div className="aspect-video w-full bg-[#111010] relative flex items-center justify-center overflow-hidden">
                {/* Loop of stunning architectural slides as an interactive mock-video */}
                <div className="absolute inset-0">
                  <img
                    src="/src/assets/images/luxury_living_hero_1786189325121.jpg"
                    alt="Panned render walkthrough"
                    className="w-full h-full object-cover animate-pulse opacity-85"
                  />
                  <div className="absolute inset-0 bg-[#111010]/40"></div>
                </div>

                <div className="z-10 text-center max-w-lg px-6">
                  <div className="w-16 h-16 rounded-full bg-[#C5A059]/20 border border-[#C5A059] flex items-center justify-center mx-auto mb-6 animate-pulse">
                    <Compass className="w-8 h-8 text-[#C5A059] animate-spin-slow" />
                  </div>
                  <h3 className="font-serif text-2xl md:text-3xl font-bold mb-4 tracking-wider">
                    AL HAMMAD LUXURY PORTFOLIO
                  </h3>
                  <p className="text-xs md:text-sm text-[#F8F8F8]/80 leading-relaxed font-sans mb-6">
                    A cinematic compilation of high-end custom mansions across Karachi, showcasing structural layouts, light designs, and exotic stone craftsmanship.
                  </p>
                  
                  {/* Fake play controls */}
                  <div className="flex flex-col items-center">
                    <div className="w-full h-1 bg-[#F8F8F8]/10 rounded-full mb-4 relative overflow-hidden">
                      <div className="absolute top-0 bottom-0 left-0 w-1/3 bg-[#C5A059]"></div>
                    </div>
                    <div className="flex items-center space-x-6 text-[#C5A059] text-xs font-semibold tracking-widest font-sans">
                      <span>01:14</span>
                      <span>/</span>
                      <span>03:45</span>
                      <span>•</span>
                      <span className="text-[#F8F8F8]/80">STREAMING HIGH DEFINITION</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Video Footer info */}
              <div className="p-6 bg-[#111010] border-t border-[#2C2420]/40 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-xs font-sans text-[#F8F8F8]/70">
                  Are you ready to design yours? Let's start the design conversation.
                </div>
                <button
                  id="video-modal-cta"
                  onClick={() => {
                    setIsVideoModalOpen(false);
                    setIsBookingOpen(true);
                  }}
                  className="bg-[#C5A059] text-[#111010] px-6 py-2.5 text-xs font-bold font-sans tracking-widest uppercase hover:bg-[#F8F8F8] transition-colors"
                >
                  START DESIGN BRIEFS
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MODAL 3: INTERACTIVE CONSULTATION BOOKING DRAWER (Slide over) */}
      <AnimatePresence>
        {isBookingOpen && (
          <div 
            id="consultation-drawer-overlay" 
            className="fixed inset-0 z-50 bg-[#111010]/90 backdrop-blur-sm flex justify-end"
          >
            {/* Click outside target */}
            <div 
              className="absolute inset-0 cursor-pointer"
              onClick={() => setIsBookingOpen(false)}
            ></div>

            {/* Slide-over Form Container */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.4, ease: "easeOut" }}
              className="bg-[#1F1A17] w-full max-w-xl h-full relative z-10 shadow-2xl overflow-y-auto flex flex-col justify-between border-l border-[#2C2420]/50"
            >
              {/* Header */}
              <div className="p-8 border-b border-[#2C2420]/30 flex justify-between items-center bg-[#111010]/40">
                <div className="flex items-center space-x-3">
                  <Briefcase className="w-5 h-5 text-[#C5A059]" />
                  <h3 className="font-serif text-2xl font-bold tracking-wide">
                    DESIGN BRIEF BRIEFING
                  </h3>
                </div>
                <button
                  id="close-booking-drawer"
                  onClick={() => setIsBookingOpen(false)}
                  className="p-1.5 border border-[#2C2420]/40 text-[#F8F8F8] hover:text-[#C5A059] transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Form Body */}
              <div className="p-8 flex-grow">
                {formSubmitted ? (
                  /* Success State rendering */
                  <div id="booking-success-container" className="h-full flex flex-col items-center justify-center text-center space-y-6 py-12">
                    <div className="w-20 h-20 rounded-full bg-[#C5A059]/10 border border-[#C5A059] flex items-center justify-center text-[#C5A059] mb-2">
                      <CheckCircle className="w-10 h-10" />
                    </div>
                    <h4 className="font-serif text-2xl font-bold tracking-wide text-[#F8F8F8]">
                      BRIEF SECURED
                    </h4>
                    <p className="text-xs tracking-widest text-[#C5A059] font-bold uppercase font-sans">
                      REFERENCE REF-AH-2026-928
                    </p>
                    <p className="text-xs text-[#F8F8F8]/70 leading-relaxed font-sans max-w-sm">
                      Thank you. Our Executive Architectural Consultant will contact you at your provided details within the next 12 working hours to confirm your private meeting slot.
                    </p>
                    <div className="w-12 h-[1px] bg-[#C5A059]/45"></div>
                    <div className="text-[10px] tracking-widest text-[#F8F8F8]/40 font-sans uppercase">
                      Redirecting back to studio...
                    </div>
                  </div>
                ) : (
                  /* Booking input Form */
                  <form id="booking-consultation-form" onSubmit={handleBookingSubmit} className="space-y-6 text-xs font-sans">
                    <div>
                      <span className="text-[10px] tracking-widest text-[#C5A059] font-bold block mb-2 uppercase">
                        REPRESENTATIVE FULL NAME
                      </span>
                      <input
                        id="booking-input-name"
                        type="text"
                        required
                        placeholder="e.g. Syed Muhammad Ali"
                        value={bookingForm.name}
                        onChange={(e) => setBookingForm({ ...bookingForm, name: e.target.value })}
                        className="w-full bg-[#111010] border border-[#2C2420]/80 rounded-none p-3.5 text-[#F8F8F8] placeholder-[#F8F8F8]/30 focus:border-[#C5A059] focus:outline-none transition-colors"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <span className="text-[10px] tracking-widest text-[#C5A059] font-bold block mb-2 uppercase">
                          PHONE CONTACT
                        </span>
                        <input
                          id="booking-input-phone"
                          type="tel"
                          required
                          placeholder="e.g. 0302 8212429"
                          value={bookingForm.phone}
                          onChange={(e) => setBookingForm({ ...bookingForm, phone: e.target.value })}
                          className="w-full bg-[#111010] border border-[#2C2420]/80 rounded-none p-3.5 text-[#F8F8F8] placeholder-[#F8F8F8]/30 focus:border-[#C5A059] focus:outline-none transition-colors"
                        />
                      </div>
                      <div>
                        <span className="text-[10px] tracking-widest text-[#C5A059] font-bold block mb-2 uppercase">
                          SECURE EMAIL
                        </span>
                        <input
                          id="booking-input-email"
                          type="email"
                          required
                          placeholder="e.g. client@domain.com"
                          value={bookingForm.email}
                          onChange={(e) => setBookingForm({ ...bookingForm, email: e.target.value })}
                          className="w-full bg-[#111010] border border-[#2C2420]/80 rounded-none p-3.5 text-[#F8F8F8] placeholder-[#F8F8F8]/30 focus:border-[#C5A059] focus:outline-none transition-colors"
                        />
                      </div>
                    </div>

                    <div>
                      <span className="text-[10px] tracking-widest text-[#C5A059] font-bold block mb-2 uppercase">
                        PROJECT SCOPE DEPT.
                      </span>
                      <select
                        id="booking-select-scope"
                        value={bookingForm.scope}
                        onChange={(e) => setBookingForm({ ...bookingForm, scope: e.target.value })}
                        className="w-full bg-[#111010] border border-[#2C2420]/80 rounded-none p-3.5 text-[#F8F8F8] focus:border-[#C5A059] focus:outline-none transition-colors"
                      >
                        <option>Residential Mansion</option>
                        <option>Penthouse / Apartment Suite</option>
                        <option>Full Architectural Blueprinting</option>
                        <option>Commercial / Corporate HQ</option>
                        <option>Bespoke Interior Modernization</option>
                      </select>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <span className="text-[10px] tracking-widest text-[#C5A059] font-bold block mb-2 uppercase">
                          CONSULTATION FORUM
                        </span>
                        <div className="grid grid-cols-2 gap-2">
                          {["On-site", "Head Office", "Virtual"].map((type) => (
                            <button
                              key={type}
                              type="button"
                              onClick={() => setBookingForm({ ...bookingForm, consultationType: type })}
                              className={`py-3.5 text-center font-bold tracking-wider uppercase border transition-all ${
                                bookingForm.consultationType === type
                                  ? "border-[#C5A059] bg-[#C5A059] text-[#111010]"
                                  : "border-[#2C2420]/75 bg-[#111010] text-[#F8F8F8]/80 hover:border-[#C5A059]/40"
                              }`}
                            >
                              {type}
                            </button>
                          ))}
                        </div>
                      </div>
                      <div>
                        <span className="text-[10px] tracking-widest text-[#C5A059] font-bold block mb-2 uppercase">
                          PROJECT BUDGET RANGE
                        </span>
                        <select
                          id="booking-select-budget"
                          value={bookingForm.budget}
                          onChange={(e) => setBookingForm({ ...bookingForm, budget: e.target.value })}
                          className="w-full bg-[#111010] border border-[#2C2420]/80 rounded-none p-3.5 text-[#F8F8F8] focus:border-[#C5A059] focus:outline-none transition-colors"
                        >
                          <option>10M - 30M PKR</option>
                          <option>30M - 50M PKR</option>
                          <option>50M - 100M PKR</option>
                          <option>100M+ PKR (Ultra Luxury)</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <span className="text-[10px] tracking-widest text-[#C5A059] font-bold block mb-2 uppercase">
                        DESIGN AMBITIONS / PROPERTY SPECIFICS
                      </span>
                      <textarea
                        id="booking-input-message"
                        rows={4}
                        placeholder="Provide space specs, architectural preferences, or any specific luxury requirements..."
                        value={bookingForm.message}
                        onChange={(e) => setBookingForm({ ...bookingForm, message: e.target.value })}
                        className="w-full bg-[#111010] border border-[#2C2420]/80 rounded-none p-3.5 text-[#F8F8F8] placeholder-[#F8F8F8]/30 focus:border-[#C5A059] focus:outline-none transition-colors resize-none"
                      ></textarea>
                    </div>

                    <button
                      id="submit-booking-form"
                      type="submit"
                      className="w-full bg-[#C5A059] hover:bg-[#F8F8F8] text-[#111010] font-bold uppercase tracking-[0.2em] py-4 transition-colors cursor-pointer text-xs"
                    >
                      REQUEST SECURED APPOINTMENT BRIEF
                    </button>
                  </form>
                )}
              </div>

              {/* Drawer Footer info */}
              <div className="p-8 border-t border-[#2C2420]/30 bg-[#111010]/40 text-center text-[10px] tracking-widest text-[#F8F8F8]/40">
                SECURE SSL VERIFIED REGISTRY | AL HAMMAD &copy; 2026
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* LIGHTBOX FOR DIGITAL GALLERY SHOWCASE */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <div 
            id="lightbox-overlay" 
            className="fixed inset-0 z-50 bg-[#111010]/98 backdrop-blur-md flex flex-col justify-between p-6"
          >
            {/* Lightbox Header */}
            <div className="flex justify-between items-center text-xs font-sans tracking-widest text-[#F8F8F8]/70">
              <span>AL HAMMAD DIGITAL ARCHIVE</span>
              <span>{lightboxIndex + 1} / {INSTAGRAM_GALLERY.length}</span>
              <button
                id="close-lightbox"
                onClick={() => setLightboxIndex(null)}
                className="p-1.5 border border-[#2C2420]/40 hover:border-[#C5A059] text-[#F8F8F8] hover:text-[#C5A059] transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Lightbox Center Area */}
            <div className="flex-grow flex items-center justify-between gap-4 max-h-[75vh]">
              {/* Prev Trigger */}
              <button
                id="lightbox-prev"
                onClick={handlePrevLightbox}
                className="p-3 border border-[#2C2420]/50 hover:border-[#C5A059] text-[#F8F8F8] hover:text-[#C5A059] transition-colors cursor-pointer shrink-0"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              {/* Main Image */}
              <div className="max-w-4xl max-h-full overflow-hidden flex items-center justify-center">
                <img
                  src={INSTAGRAM_GALLERY[lightboxIndex].url}
                  alt="Portfolio Zoomed View"
                  referrerPolicy="no-referrer"
                  className="max-h-[70vh] object-contain shadow-2xl border border-[#2C2420]/25"
                />
              </div>

              {/* Next Trigger */}
              <button
                id="lightbox-next"
                onClick={handleNextLightbox}
                className="p-3 border border-[#2C2420]/50 hover:border-[#C5A059] text-[#F8F8F8] hover:text-[#C5A059] transition-colors cursor-pointer shrink-0"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            {/* Lightbox Description Footer */}
            <div className="text-center max-w-xl mx-auto space-y-4">
              <p className="font-serif text-sm md:text-base italic text-[#F8F8F8]/90">
                "{INSTAGRAM_GALLERY[lightboxIndex].caption}"
              </p>
              <div className="flex justify-center space-x-4">
                <button
                  id="lightbox-share"
                  onClick={() => alert("Mock share link copied to clipboard.")}
                  className="text-[10px] tracking-widest text-[#C5A059] font-bold uppercase font-sans border-b border-[#C5A059]/30 hover:text-[#F8F8F8] transition-colors"
                >
                  SHARE WORK
                </button>
                <span className="text-[#F8F8F8]/20">•</span>
                <button
                  id="lightbox-cta"
                  onClick={() => {
                    setLightboxIndex(null);
                    setIsBookingOpen(true);
                  }}
                  className="text-[10px] tracking-widest text-[#C5A059] font-bold uppercase font-sans border-b border-[#C5A059]/30 hover:text-[#F8F8F8] transition-colors"
                >
                  INQUIRE SPACE
                </button>
              </div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
