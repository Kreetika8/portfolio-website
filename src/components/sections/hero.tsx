import { useEffect, useState } from "react";
import { TypeAnimation } from "react-type-animation";
import styles from "@/styles/Hero.module.css";
import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function Hero() {
  const [showResumeModal, setShowResumeModal] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [pdfSupported, setPdfSupported] = useState(true);

  useEffect(() => {
    // Only run on the client
    if (typeof window !== "undefined") {
      const script = document.createElement("script");
      script.type = "module";
      script.src =
        "https://unpkg.com/@splinetool/viewer@1.0.46/build/spline-viewer.js";
      document.body.appendChild(script);

      // Detect device and browser capabilities
      const userAgent = navigator.userAgent;
      const mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
      const ios = /iPad|iPhone|iPod/.test(userAgent);
      
      setIsMobile(mobile);
      setIsIOS(ios);
      
      // Check if browser supports PDF viewing in iframe
      const isChrome = /Chrome/.test(userAgent) && /Google Inc/.test(navigator.vendor);
      const isFirefox = /Firefox/.test(userAgent);
      const isSafari = /Safari/.test(userAgent) && !/Chrome/.test(userAgent);
      
      // iOS Safari and some mobile browsers don't handle PDF iframes well
      setPdfSupported(!(ios && isSafari) && !(/Android.*Chrome.*Mobile/.test(userAgent)));
    }
  }, []);

  const handleResumeClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    
    // For devices with poor PDF support, directly open in new tab
    if (isMobile && !pdfSupported) {
      window.open("/resume/Kreetika_Resume.pdf", "_blank");
      return;
    }
    
    setShowResumeModal(true);
  };

  const handleDownloadResume = async () => {
    try {
      if (isIOS) {
        // iOS devices - show instructions modal instead
        alert("To download: Tap and hold the PDF, then select 'Download' or 'Save to Files'");
        return;
      }

      // Try fetch-based download for better compatibility
      const response = await fetch("/resume/Kreetika_Resume.pdf");
      
      if (!response.ok) {
        throw new Error("Failed to fetch PDF");
      }

      const blob = await response.blob();
      
      // Check if device supports download attribute
      const link = document.createElement("a");
      const supportsDownload = "download" in link;
      
      if (supportsDownload && !isMobile) {
        // Desktop download
        const url = window.URL.createObjectURL(blob);
        link.href = url;
        link.download = "KreetikaBhetuwal_QA_Resume.pdf";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      } else {
        // Mobile fallback - open in new tab with instructions
        const url = window.URL.createObjectURL(blob);
        const newWindow = window.open(url, "_blank");
        
        if (!newWindow) {
          // Popup blocked, fallback to direct URL
          window.open("/resume/Kreetika_Resume.pdf", "_blank");
        }
        
        // Show download instructions for mobile
        if (isMobile) {
          setTimeout(() => {
            alert("PDF opened in new tab. Use your browser's download option to save the file.");
          }, 1000);
        }
      }
    } catch (error) {
      console.error("Download failed:", error);
      // Fallback to simple window.open
      window.open("/resume/Kreetika_Resume.pdf", "_blank");
    }
  };

 

  const closeModal = () => {
    setShowResumeModal(false);
  };

  // Close modal when clicking outside
  const handleModalClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  return (
    <>
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
                  "Software Quality Control",
                  2000,
                  "Automation Enthusiast",
                  2000,
                  "Ensuring High-Quality Software Products",
                  2000,
                  "Focused on Quality and Reliability",
                  2000,
                  "Keeping Software Reliable",
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
              <button onClick={handleResumeClick} className={styles.scrollBtn}>
                ⬇ My Resume
              </button>
            </div>

            {/* Photo section */}
            <div className={styles.photoSection}>
              <div className={styles.photoContainer}>
                <Image
                  src="/public/images/DP.jpg"
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

      {/* Resume Modal */}
      {showResumeModal && (
        <div className={styles.modalOverlay} onClick={handleModalClick}>
          <div className={styles.modalContent}>
            <div className={styles.modalHeader}>
              <h3>Resume - Kreetika Bhetuwal (QA)</h3>
              <div className={styles.modalActions}>
                <button
                  onClick={handleDownloadResume}
                  className={styles.downloadBtn}
                  title={isIOS ? "View download instructions" : "Download PDF"}
                >
                  {isIOS ? "📱 Download Instructions" : "⬇ Download PDF"}
                </button>
                
                <button onClick={closeModal} className={styles.closeBtn}>
                  ✕
                </button>
              </div>
            </div>
            
            {/* Conditional PDF viewer */}
            <div className={styles.resumeViewer}>
              {pdfSupported ? (
                <iframe
                  src="/resume/Kreetika_Resume.pdf#toolbar=1&navpanes=0&scrollbar=1&page=1&view=FitV&zoom=85"
                  width="100%"
                  height="600px"
                  title="Kreetika Resume"
                  style={{ border: "none" }}
                  allow="fullscreen"
                />
              ) : (
                <div className={styles.pdfFallback}>
                  <div className={styles.fallbackContent}>
                    <h4>PDF Preview Not Available</h4>
                    <p>Your device doesn't support PDF preview in this view.</p>
                    <div className={styles.fallbackActions}>
                      
                      <button onClick={handleDownloadResume} className={styles.secondaryBtn}>
                        ⬇ Download PDF
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}