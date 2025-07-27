// src/components/sections/projects.tsx
import React from 'react';
import styles from "../../styles/Projects.module.css";

const projects = [
  {
    id: 1,
    title: "SauceDemo-AutomationTesting",
    description: "Automated end-to-end testing of the SauceDemo web application using Cypress. Implements Page Object Model (POM) for maintainability and covers key user flows such as login, product purchase, cart details and logout.",
    githubUrl: "https://github.com/Kreetika8/SauceDemo-AutomationTesting",
    tags: ["Cypress", "Automation", "POM", "E2E test"]
  },
  {
    id: 2,
    title: "Api Test with Cypress",
    description: "API testing project using Cypress to validate RESTful endpoints. Covers CRUD operations with assertions on response status, headers, and payloads. Ensures reliability and accuracy of backend services.",
    githubUrl: "https://github.com/Kreetika8/ApiTestWithCypress",
    tags: ["API Testing", "Cypress", "CRUD", "REST API"]
  },
  {
    id: 3,
    title: "Nourishmind",
    description: "A front-end wellness website focused on mental health awareness and eating disorder. Built with HTML and CSS, it features informative content, calming design elements, and user-friendly navigation to promote eating disorder.",
    githubUrl: "https://github.com/Kreetika8/NourishMind",
    tags: ["HTML", "CSS", "JS", "Front-End"]
  },
  {
    id: 4,
    title: "Jalsewa",
    description: "A water delivery service platform, where user can order water directly from water factories.",
    githubUrl: "https://github.com/Kreetika8/JalSewa-Website",
    tags: ["HTML", "CSS", "PHP"]
  },
  // {
  //   id: 5,
  //   title: "API Testing Framework",
  //   description: "Automated API testing framework using Postman collections and Newman for continuous integration and comprehensive API validation.",
  //   githubUrl: "https://github.com/yourusername/api-testing-framework",
  //   tags: ["Postman", "Newman", "API Testing"]
  // },
  // {
  //   id: 6,
  //   title: "Performance Testing Tool",
  //   description: "Load testing and performance monitoring tool built with JMeter scripts and custom reporting dashboards for performance analysis.",
  //   githubUrl: "https://github.com/yourusername/performance-testing-tool",
  //   tags: ["JMeter", "Performance", "Load Testing"]
  // }
];

type Project = {
  id: number;
  title: string;
  description: string;
  githubUrl: string;
  tags: string[];
};

const ProjectCard = ({ project }: { project: Project }) => {
  const handleCardClick = () => {
    window.open(project.githubUrl, '_blank');
  };

  return (
    <div 
      className={styles.projectCard}
      onClick={handleCardClick}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          handleCardClick();
        }
      }}
    >
      <div className={styles.projectCardHeader}>
        <h3 className={styles.projectCardTitle}>
          {project.title}
        </h3>
      </div>
      
      <p className={styles.projectCardDescription}>
        {project.description}
      </p>
      
      <div className={styles.projectTags}>
        {project.tags.map((tag: string, index: number) => (
          <span key={index} className={styles.projectTag}>
            {tag}
          </span>
        ))}
      </div>
      
      <div className={styles.projectGithubLink}>
        <svg className={styles.githubIcon} viewBox="0 0 16 16">
          <path fillRule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>
        </svg>
        View on GitHub
      </div>
    </div>
  );
};

export default function Projects() {
  return (
    <div className={styles.pageWrapper}>
      <div className={styles.projectsContainer}>
        <div className={styles.projectsHeader}>
          <h2 className={styles.projectsTitle}>
            My Projects
          </h2>
          <p className={styles.projectsSubtitle}>
            Here are some of the projects I've worked on. Click on any card to view the source code on GitHub.
          </p>
        </div>
        
        <div className={styles.projectsGrid}>
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </div>
  );
}