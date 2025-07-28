import { FaLinkedin, FaGithub } from "react-icons/fa";
import { useState } from "react";
import styles from "../../styles/Contact.module.css";
// import Navbar from "../navBar";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    // Clear error when user starts typing
    if (error) setError("");
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      // const response = await fetch('/api/contact', {
      const response = await fetch("https://portfolio-7asdhwv0z-kreetika-s-projects.vercel.app/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setIsSubmitted(true);
        // Clear form and success message after 3 seconds
        setTimeout(() => {
          setFormData({ name: "", email: "", subject: "", message: "" });
          setIsSubmitted(false);
        }, 7000);
      } else {
        setError(data.error || "Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      setError("Network error. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.container}>
      {/* <Navbar /> */}

      <div className={styles.content}>
        <div className={styles.header}>
          <h1 className={styles.title}>Let’s Connect</h1>
          <p className={styles.subtitle}>
            From ideas to opportunities, let's talk about it.
          </p>
        </div>

        <div className={styles.contactWrapper}>
          {/* Contact Form */}
          <div className={styles.formSection}>
            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.inputGroup}>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className={styles.input}
                  placeholder=" "
                />
                <label className={styles.label}>Your Name</label>
              </div>

              <div className={styles.inputGroup}>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className={styles.input}
                  placeholder=" "
                />
                <label className={styles.label}>Email Address</label>
              </div>

              <div className={styles.inputGroup}>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className={styles.input}
                  placeholder=" "
                />
                <label className={styles.label}>Subject</label>
              </div>

              <div className={styles.inputGroup}>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className={`${styles.input} ${styles.textarea}`}
                  placeholder=" "
                ></textarea>
                <label className={styles.label}>Message</label>
              </div>

              {error && <div className={styles.errorMessage}>{error}</div>}

              <button
                type="submit"
                disabled={isSubmitting}
                className={`${styles.submitBtn} ${
                  isSubmitting ? styles.submitting : ""
                }`}
              >
                {isSubmitting ? (
                  <span className={styles.spinner}></span>
                ) : (
                  "Send Message"
                )}
              </button>

              {isSubmitted && (
                <div className={styles.overlay}>
                  <div className={styles.successPopup}>
                    <span className={styles.checkmark}>✓</span>
                    Got it! Now it’s my turn. I’ll reply soon. 😊
                  </div>
                </div>
              )}
            </form>
          </div>

          {/* Contact Info */}
          <div className={styles.infoSection}>
            <div className={styles.contactInfo}>
              <h3 className={styles.infoTitle}>Reach Out Anytime</h3>
              <p className={styles.infoText}>
                I'm always interested in new opportunities and exciting
                projects.
              </p>

              <div className={styles.contactDetails}>
                <div className={styles.contactItem}>
                  <span className={styles.contactLabel}>Email</span>
                  <a
                    href="mailto:Kritikabhetuwal8@gmail.com"
                    className={styles.contactLink}
                  >
                    Kritikabhetuwal8@gmail.com
                  </a>
                </div>

                <div className={styles.contactItem}>
                  <span className={styles.contactLabel}>Response Time</span>
                  <span className={styles.contactValue}>Within 24 hours</span>
                </div>
              </div>

              <div className={styles.socialLinks}>
                <h4 className={styles.socialTitle}>Follow Me</h4>
                <div className={styles.socialIcons}>
                  <a
                    href="https://www.linkedin.com/in/kreetika-bhetuwal/"
                    className={styles.socialLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaLinkedin className={styles.socialIcon} />
                    LinkedIn
                  </a>

                  <a
                    href="https://github.com/Kreetika8"
                    className={styles.socialLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaGithub className={styles.socialIcon} />
                    GitHub
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
