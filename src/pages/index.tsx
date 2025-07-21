// src/pages/index.tsx (Homepage - only Hero)
// src/pages/aboutMe.tsx (About page)
// src/pages/learningHub.tsx (Tools/Learning Hub page)
// src/pages/contact.tsx (Contact page)

// Updated src/pages/index.tsx - Homepage only
import Head from "next/head";
import Navbar from "@/components/navBar";
import Hero from "@/pages/hero";

export default function Home() {
  return (
    <>
      <Head>
        <title>Kreetika | Portfolio</title>
        <meta name="description" content="Kriti's personal developer portfolio" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />

      <main>
        <Hero />
      </main>
    </>
  );
}