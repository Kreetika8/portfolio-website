
import { useEffect, useState } from "react";
import { Sun, Moon, Home, User, Code, Mail } from "lucide-react";
import styles from "../styles/Navbar.module.css";

type Props = {
  isMobile: boolean;
  onNavigate?: (section: string) => void;
};

export default function Navbar({ isMobile, onNavigate }: Props) {
  const [darkMode, setDarkMode] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentSection, setCurrentSection] = useState("home");

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setDarkMode(savedTheme === "dark");
    }
  }, []);

  useEffect(() => {
    if (mounted) {
      document.documentElement.setAttribute("data-theme", darkMode ? "dark" : "light");
      localStorage.setItem("theme", darkMode ? "dark" : "light");
    }
  }, [darkMode, mounted]);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleNavClick = (section: string, e: React.MouseEvent) => {
    e.preventDefault();
    setIsMenuOpen(false);
    setCurrentSection(section);

    if (isMobile) {
      const el = document.getElementById(section);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      // Just scroll to section, don’t update URL path
      onNavigate?.(section);
    }

    // Update hash in URL without causing full reload or 404
    window.history.replaceState(null, "", `#${section}`);
  };

  if (!mounted) return null;

  return (
    <nav className={styles.navbar}>
      <div className={styles.navContent}>
        <div className={styles.logo}>Kreetika Bhetuwal</div>

        <ul className={`${styles.navLinks} ${isMenuOpen ? styles.open : ""}`}>
          {[
            { id: "home", label: "Home", icon: <Home className={styles.icon} /> },
            { id: "aboutMe", label: "About", icon: <User className={styles.icon} /> },
            { id: "projects", label: "Projects", icon: <Code className={styles.icon} /> },
            { id: "contact", label: "Contact", icon: <Mail className={styles.icon} /> },
          ].map((item) => (
            <li key={item.id} className={currentSection === item.id ? styles.active : ""}>
              <a href={`#${item.id}`} onClick={(e) => handleNavClick(item.id, e)}>
                {item.icon} {item.label}
              </a>
            </li>
          ))}
        </ul>

        <div className={styles.rightSection}>
          <div
            className={`${styles.mobileMenuButton} ${isMenuOpen ? styles.active : ""}`}
            onClick={toggleMenu}
          >
            <div className={`${styles.hamburger} ${isMenuOpen ? styles.active : ""}`}>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>

          <button
            className={styles.themeToggle}
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            {darkMode ? <Sun className={styles.icon} /> : <Moon className={styles.icon} />}
          </button>
        </div>
      </div>
    </nav>
  );
}
