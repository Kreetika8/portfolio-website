// src/pages/index.tsx

import Head from "next/head";
import { useEffect, useState } from "react";

import Navbar from "@/components/navBar";
import Hero from "@/components/sections/hero";
import About from "@/components/sections/aboutMe";
import Projects from "@/components/sections/projects";
import Contact from "@/components/sections/contact";

export default function Home() {
  const [isMobile, setIsMobile] = useState(false);
  const [currentSection, setCurrentSection] = useState("home");

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize(); // Run once on mount
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleNavigation = (section: string) => {
    setCurrentSection(section);
  };

  const renderSection = () => {
    if (isMobile) {
      return (
        <>
          <div id="home"><Hero /></div>
          <div id="aboutMe"><About /></div>
          <div id="projects"><Projects/></div>
          <div id="contact"><Contact /></div>
        </>
      );
    } else {
      switch (currentSection) {
        case "home":
          return <Hero />;
        case "aboutMe":
          return <About />;
        case "projects":
          return <Projects/>;
        case "contact":
          return <Contact />;
        default:
          return <Hero />;
      }
    }
  };

  return (
    <>
      <Head>
        <title>Kreetika | Portfolio</title>
        <meta name="description" content="Kriti's personal developer portfolio" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar isMobile={isMobile} onNavigate={handleNavigation} />

      <main style={{ minHeight: '100vh' }}>
        {renderSection()}
      </main>

      {/* Global styles for main container scrolling */}
      <style jsx global>{`
        @media (min-width: 769px) {
          main {
            height: 100vh;
            overflow-y: auto;
            overflow-x: hidden;
          }
        }

        @media (max-width: 768px) {
          main {
            height: auto;
            overflow: visible;
          }
        }
      `}</style>
    </>
  );
}
