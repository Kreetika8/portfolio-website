import { FaLinkedin, FaGithub } from "react-icons/fa";

import { useState } from "react";
import styles from "../styles/Contact.module.css";
import Navbar from "../components/navBar";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);

      // Delay clearing the form data
      setTimeout(() => {
        setFormData({ name: "", email: "", subject: "", message: "" });
        setIsSubmitted(false);
      }, 3000);
    }, 1500);
  };

  return (
    <div className={styles.container}>
      <Navbar />

      <div className={styles.content}>
        <div className={styles.header}>
          <h1 className={styles.title}>Get In Touch</h1>
          <p className={styles.subtitle}>
            Have a project in mind? Let's discuss how we can work together.
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
                    Message sent successfully! I'll get back to you soon.
                  </div>
                </div>
              )}
            </form>
          </div>

          {/* Contact Info */}
          <div className={styles.infoSection}>
            <div className={styles.contactInfo}>
              <h3 className={styles.infoTitle}>Let's Connect</h3>
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

                  {/* <a href="#" className={styles.socialLink}>
                    <span className={styles.socialIcon}>🐦</span>
                    Twitter
                  </a> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
