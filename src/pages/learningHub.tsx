// src/pages/learningHub.tsx
import React from 'react';

export default function LearningHub() {
  return (
    <div style={{ padding: '100px 20px', maxWidth: '1200px', margin: '0 auto' }}>
      <h2>Learning Hub</h2>
      
      <div style={{ display: 'grid', gap: '40px', marginTop: '40px' }}>
        
        {/* Cypress Section */}
        <div>
          <h3>Cypress - End-to-End Testing</h3>
          <p>Cypress is a modern testing framework for web applications.</p>
          <h4>Basic Usage:</h4>
          <ul>
            <li>Install: <code>npm install cypress --save-dev</code></li>
            <li>Open Cypress: <code>npx cypress open</code></li>
            <li>Write tests in <code>cypress/e2e/</code> directory</li>
            <li>Use commands like <code>cy.visit()</code>, <code>cy.get()</code>, <code>cy.click()</code></li>
          </ul>
        </div>

        {/* Postman Section */}
        <div>
          <h3>Postman - API Testing</h3>
          <p>Postman is a collaboration platform for API development and testing.</p>
          <h4>Basic Usage:</h4>
          <ul>
            <li>Create collections to organize your API requests</li>
            <li>Set up environments for different stages (dev, staging, prod)</li>
            <li>Write tests using JavaScript in the Tests tab</li>
            <li>Use variables with <code>&#123;&#123;variable_name&#125;&#125;</code> syntax</li>
          </ul>
        </div>

        {/* JMeter Section */}
        <div>
          <h3>JMeter - Performance Testing</h3>
          <p>Apache JMeter is a tool for load testing and measuring performance.</p>
          <h4>Basic Usage:</h4>
          <ul>
            <li>Download and install JMeter from Apache website</li>
            <li>Create Test Plan with Thread Groups</li>
            <li>Add HTTP Request samplers</li>
            <li>Configure listeners to view results</li>
            <li>Run tests and analyze performance metrics</li>
          </ul>
        </div>

      </div>
    </div>
  );
}