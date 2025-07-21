import React, { useState, useEffect } from "react";
import {
  ChevronRight,
  Calendar,
  MapPin,
  Award,
  Briefcase,
  GraduationCap,
  X,
  Star,
  ArrowRight,
} from "lucide-react";
import styles from "@/styles/Aboutme.module.css";
import Navbar from "../components/navBar";

import Lottie from "lottie-react";

import generalAnim from "@/animations/achievement.json";
import educationAnim from "@/animations/education.json";
import internshipAnim from "@/animations/internship.json";

// Mock animation component (replace with your Lottie animations)
const MockAnimation = ({
  type,
}: {
  type: "education" | "internship" | "achievement";
}) => (
  <div className={styles.mockAnimation}>
    <div className="text-4xl">
      {type === "education" && "🎓"}
      {type === "internship" && "💼"}
      {type === "achievement" && "🏆"}
    </div>
  </div>
);

// Types
type MilestoneDetails = {
  title: string;
  date: string;
  description: string;
  skills?: string[];
  highlights?: string[];
  animation: string;
};

type Milestone = {
  id: string;
  icon: string;
  title: string;
  position: {
    top: string;
    left: string;
  };
  details: MilestoneDetails;
  color: string;
};

const milestones: Milestone[] = [
  {
    id: "education",
    icon: "🎓",
    title: "Education",
    color: "milestoneEducation",
    position: { top: "14%", left: "30%" },
    details: {
      title: "Computer Science Journey",
      date: "2022 – 2026",
      description:
        "Currently in my 8th semester, pursuing Bachelor's in Computer Science with a focus on software development and emerging technologies.",
      skills: [
        "Python",
        "JavaScript",
        "React",
        "Data Structures",
        "Algorithms",
      ],
      highlights: [
        "Bachelor's in Computer Science (2022-2026)",
        "Higher Secondary in Management (2019-2021)",
        "Currently in 8th Semester",
      ],
      animation: "education",
    },
  },
  {
    id: "internship",
    icon: "💼",
    title: "Internship",
    color: "milestoneInternship",
    position: { top: "35%", left: "65%" },
    details: {
      title: "QA Engineer at Intuji",
      date: "May 2025 – Present",
      description:
        "Leading comprehensive testing initiatives with focus on automation and quality assurance processes.",
      skills: [
        "Cypress",
        "Test Automation",
        "Bug Reporting",
        "Manual Testing",
        "QA Processes",
      ],
      highlights: [
        "Developed automated test scripts",
        "Created comprehensive test plans",
        "Improved bug detection by 40%",
        "Led testing team initiatives",
      ],
      animation: "internship",
    },
  },
  {
    id: "project",
    icon: "🏆",
    title: "Achievement",
    color: "milestoneAchievement",
    position: { top: "65%", left: "35%" },
    details: {
      title: "Smart Home Energy Project",
      date: "March 2025",
      description:
        "Innovative system for visualizing and analyzing home energy consumption with predictive modeling capabilities.",
      skills: ["Python", "Tableau", "Machine Learning", "Data Analysis", "IoT"],
      highlights: [
        "Reduced energy consumption by 25%",
        "Implemented predictive modeling",
        "Created interactive dashboards",
        "Presented at tech conference",
      ],
      animation: "achievement",
    },
  },
];

export default function AboutMe() {
  const [activeMilestone, setActiveMilestone] = useState<Milestone | null>(
    null
  );
  const [showDetails, setShowDetails] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [hoveredMilestone, setHoveredMilestone] = useState<string | null>(null);
  const [animationPhase, setAnimationPhase] = useState(0);

  useEffect(() => {
    const checkMobile = () => {
      if (typeof window !== "undefined") {
        setIsMobile(window.innerWidth <= 768);
      }
    };

    checkMobile();
    if (typeof window !== "undefined") {
      window.addEventListener("resize", checkMobile);
      return () => window.removeEventListener("resize", checkMobile);
    }
  }, []);

  // Progressive animation effect
  useEffect(() => {
    const timer = setInterval(() => {
      setAnimationPhase((prev) => (prev + 1) % milestones.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const handleMilestoneClick = (milestone: Milestone) => {
    setActiveMilestone(milestone);
    setShowDetails(true);

    if (isMobile) {
      setTimeout(() => {
        document.getElementById("detailsPanel")?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 100);
    }
  };

  const closeDetails = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowDetails(false);
    setActiveMilestone(null);
  };

  const nextMilestone = () => {
    const currentIndex = milestones.findIndex(
      (m) => m.id === activeMilestone?.id
    );
    const nextIndex = (currentIndex + 1) % milestones.length;
    setActiveMilestone(milestones[nextIndex]);
  };

  const prevMilestone = () => {
    const currentIndex = milestones.findIndex(
      (m) => m.id === activeMilestone?.id
    );
    const prevIndex =
      currentIndex === 0 ? milestones.length - 1 : currentIndex - 1;
    setActiveMilestone(milestones[prevIndex]);
  };

  return (
    <div className={styles.aboutMeContainer}>
      <Navbar />
      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className={styles.heroContent}>
          <div className="relative">
            <h1 className={styles.heroTitle}>My Journey</h1>
            <div
              className={`${styles.decorativeElement} ${styles.decorativeElement}:nth-child(1)`}
            ></div>
            <div
              className={`${styles.decorativeElement} ${styles.decorativeElement}:nth-child(2)`}
            ></div>
          </div>
          <div className={styles.heroGuide}>
            <p className="text-lg text-gray-500 flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-500" />
              Click on each milestone to explore details
            </p>
          </div>
        </div>
      </section>

      {/* Journey Map */}
      <section className={styles.journeySection}>
        <div className={styles.journeyContainer}>
          <div className={styles.journeyMap}>
            {/* Animated Path */}
            <svg className={styles.journeyPath}>
              <defs>
                <linearGradient
                  id="pathGradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="#3b82f6" />
                  <stop offset="50%" stopColor="#8b5cf6" />
                  <stop offset="100%" stopColor="#06b6d4" />
                </linearGradient>
              </defs>
              <path
                d="M 200 150 Q 400 200 500 300 Q 600 400 300 450"
                stroke="url(#pathGradient)"
                strokeWidth="3"
                fill="none"
                className={styles.animatedPath}
              />
            </svg>

            {/* Milestones */}
            {milestones.map((milestone, index) => (
              <div
                key={milestone.id}
                className={`${styles.milestone} ${
                  activeMilestone?.id === milestone.id ? styles.active : ""
                } ${animationPhase === index ? styles.animated : ""}`}
                style={{
                  top: milestone.position.top,
                  left: milestone.position.left,
                }}
                onClick={() => handleMilestoneClick(milestone)}
                onMouseEnter={() => setHoveredMilestone(milestone.id)}
                onMouseLeave={() => setHoveredMilestone(null)}
              >
                <div
                  className={`${styles.milestoneCard} ${
                    styles[milestone.color]
                  }`}
                >
                  <div className={styles.milestoneIcon}>{milestone.icon}</div>
                  <div className={styles.milestoneTitle}>{milestone.title}</div>

                  {/* Hover Tooltip */}
                  {hoveredMilestone === milestone.id && (
                    <div className={styles.milestoneTooltip}>
                      Click to explore {milestone.title}
                    </div>
                  )}

                  {/* Active Indicator */}
                  {activeMilestone?.id === milestone.id && (
                    <div className={styles.activeIndicator}></div>
                  )}
                </div>
              </div>
            ))}

            {/* Floating Elements */}
            <div className={styles.floatingElements}>
              <div
                className={`${styles.floatingElement} ${styles.floatingElement}:nth-child(1)`}
              ></div>
              <div
                className={`${styles.floatingElement} ${styles.floatingElement}:nth-child(2)`}
              ></div>
            </div>
          </div>
        </div>
      </section>

      {/* Details Panel */}
      {showDetails && activeMilestone && (
        <div
          className={`${styles.modalOverlay} ${
            showDetails ? styles.visible : ""
          }`}
        >
          <div className={styles.modalContent}>
            {/* Header */}
            <div
              className={`${styles.modalHeader} ${
                styles[activeMilestone.color]
              }`}
            >
              <div className={styles.modalHeaderContent}>
                <div>
                  <h2 className={styles.modalTitle}>
                    {activeMilestone.details.title}
                  </h2>
                  <div className={styles.modalDate}>
                    <Calendar className="w-5 h-5" />
                    <span>{activeMilestone.details.date}</span>
                  </div>
                </div>
                <button onClick={closeDetails} className={styles.modalClose}>
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className={styles.modalBody}>
              <div className={styles.modalGrid}>
                {/* Animation/Visual */}
                <div className={styles.animationSection}>
                  <Lottie
                    animationData={
                      activeMilestone.details.animation === "education"
                        ? educationAnim
                        : activeMilestone.details.animation === "internship"
                        ? internshipAnim
                        : generalAnim
                    }
                    loop={true}
                    className={styles.lottieAnimation}
                  />

                  {/* Skills */}
                  {activeMilestone.details.skills && (
                    <div className={styles.skillsSection}>
                      <h3>
                        <Star className="w-5 h-5 text-yellow-500" />
                        Skills & Technologies
                      </h3>
                      <div className={styles.skillsGrid}>
                        {activeMilestone.details.skills.map((skill, index) => (
                          <span key={index} className={styles.skillTag}>
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Details */}
                <div className={styles.detailsSection}>
                  <div>
                    <h3>About</h3>
                    <p className={styles.detailsDescription}>
                      {activeMilestone.details.description}
                    </p>
                  </div>

                  {/* Highlights */}
                  {activeMilestone.details.highlights && (
                    <div>
                      <h3>
                        <Award className="w-5 h-5 text-purple-500" />
                        Key Highlights
                      </h3>
                      <ul className={styles.highlightsList}>
                        {activeMilestone.details.highlights.map(
                          (highlight, index) => (
                            <li key={index}>
                              <ChevronRight className="w-4 h-4 mt-1 text-green-500 flex-shrink-0" />
                              {highlight}
                            </li>
                          )
                        )}
                      </ul>
                    </div>
                  )}
                </div>
              </div>

              {/* Navigation */}
              <div className={styles.modalNavigation}>
                <button onClick={prevMilestone} className={styles.navButton}>
                  <ArrowRight className="w-4 h-4 rotate-180" />
                  Previous
                </button>

                <div className={styles.navDots}>
                  {milestones.map((milestone, index) => (
                    <button
                      key={milestone.id}
                      onClick={() => setActiveMilestone(milestone)}
                      className={`${styles.navDot} ${
                        milestone.id === activeMilestone.id ? styles.active : ""
                      }`}
                    />
                  ))}
                </div>

                <button onClick={nextMilestone} className={styles.navButton}>
                  Next
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
