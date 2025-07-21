import { useEffect } from "react";
import { TypeAnimation } from "react-type-animation";
import styles from "@/styles/Hero.module.css";
import React from "react";
import Link from "next/link";
import Image from "next/image";


export default function Hero() {
  useEffect(() => {
    // Only run on the client
    if (typeof window !== "undefined") {
      const script = document.createElement("script");
      script.type = "module";
      script.src = "https://unpkg.com/@splinetool/viewer@1.0.46/build/spline-viewer.js";
      document.body.appendChild(script);
    }
  }, []);

  return (
    <section className={styles.hero} id="home">
      <div className={styles.overlay}></div>
      <div className={styles.content}>
        <div className={styles.textAndViewer}>
          {/* Text section */}
          <div className={styles.textSection}>
            <div className={styles.headingWrapper}>
  <h2 className={styles.heading}>Hi, I'm Kreetika</h2>
  <span className={styles.wave3d}>👋</span>
</div>
            <TypeAnimation
              sequence={[
                "QA Engineer",
                2000,
                "Quality Guardian of Software",
                2000,
                "Breaking Bugs Before You See Them",
                2000,
                "Automation Alchemist Turning Code to Gold",
                2000,
                "Ensuring Software Perfection, One Test at a Time",
                2000,
                "Quality Assurance Specialist",
                2000,
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
              className={styles.typing}
            />
            <p className={styles.subtext}>
              Passionate about flawless code and delightful user journeys
            </p>
            <Link href="/aboutMe" className={styles.scrollBtn}>
              ↓ About Me
            </Link>
          </div>

          {/* Photo section */}
          <div className={styles.photoSection}>
            <div className={styles.photoContainer}>
              <Image
                src="/images/DP.jpg" // Replace with your actual image path
                alt="Kritika - QA Engineer"
                width={400}
                height={400}
                className={styles.profilePhoto}
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}