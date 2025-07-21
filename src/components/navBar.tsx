import { useEffect, useState } from "react";
import Link from "next/link";
import { Sun, Moon, Home, User, Code, Mail } from "lucide-react";
import { useRouter } from "next/router";
import styles from "@/styles/Navbar.module.css";

export default function Navbar() {
  const [darkMode, setDarkMode] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // 🧠 Hamburger state
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setDarkMode(savedTheme === 'dark');
    }
  }, []);

  useEffect(() => {
    if (mounted) {
      document.documentElement.setAttribute("data-theme", darkMode ? "dark" : "light");
      localStorage.setItem('theme', darkMode ? 'dark' : 'light');
    }
  }, [darkMode, mounted]);

  const isActive = (path: string) => {
    return router.pathname === path;
  };

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  if (!mounted) {
    return (
      <nav className={styles.navbar}>
        <div className={styles.navContent}>
          <div className={styles.logo}>Kreetika</div>
          <div className={styles.mobileMenuButton}>
            <div className={styles.hamburger}>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav className={styles.navbar}>
  <div className={styles.navContent}>
    {/* Left: Logo */}
    <Link href="/" className={styles.logo}>
      Kreetika Bhetuwal
    </Link>

    {/* Center: Nav Links */}
    <ul className={`${styles.navLinks} ${isMenuOpen ? styles.open : ""}`}>
      <li className={isActive("/") ? styles.active : ""}>
        <Link href="/" onClick={() => setIsMenuOpen(false)}>
          <Home className={styles.icon} /> Home
        </Link>
      </li>
      <li className={isActive("/aboutMe") ? styles.active : ""}>
        <Link href="/aboutMe" onClick={() => setIsMenuOpen(false)}>
          <User className={styles.icon} /> About
        </Link>
      </li>
      <li className={isActive("/learningHub") ? styles.active : ""}>
        <Link href="/learningHub" onClick={() => setIsMenuOpen(false)}>
          <Code className={styles.icon} /> Tools
        </Link>
      </li>
      <li className={isActive("/contact") ? styles.active : ""}>
        <Link href="/contact" onClick={() => setIsMenuOpen(false)}>
          <Mail className={styles.icon} /> Contact
        </Link>
      </li>
    </ul>

    {/* Right: Hamburger + Theme Toggle */}
    <div className={styles.rightSection}>
      <div
        className={`${styles.mobileMenuButton} ${isMenuOpen ? styles.active : ""}`}
        onClick={toggleMenu}
        aria-label="Toggle menu"
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
