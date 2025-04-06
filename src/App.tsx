import React, { useEffect } from 'react';
import './App.css';

function App() {
  useEffect(() => {
    // Add scroll reveal animation
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.feature-card, .step-card').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="App">
      <nav className="navbar">
        <div className="nav-left">
          <h1>CollabStudy</h1>
        </div>
        <div className="nav-right">
          <a href="#features">Features</a>
          <a href="#how-it-works">How It Works</a>
          <a href="#pricing">Pricing</a>
          <button className="login-btn">Log In</button>
          <button className="join-btn">Join for Free</button>
        </div>
      </nav>

      <header className="hero-section">
        <div className="hero-content">
          <h1>Study Together, Achieve More</h1>
          <p>Transform your study sessions with real-time collaboration, interactive tools, and synchronized learning experiences</p>
          <button className="cta-button">Start Your Study Journey</button>
        </div>
      </header>

      <section className="features-section" id="features">
        <h2>Powerful Study Features</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🎥</div>
            <h3>Live Study Rooms</h3>
            <p>Create or join study rooms with crystal-clear video and audio chat for real-time collaboration</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📝</div>
            <h3>Interactive Whiteboard</h3>
            <p>Draw, write, and share ideas on a collaborative digital whiteboard with unlimited space</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🎵</div>
            <h3>Music Sync</h3>
            <p>Listen to the same music with your study group with synchronized controls and playlists</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">⏱️</div>
            <h3>Pomodoro Timer</h3>
            <p>Stay focused with group Pomodoro sessions and customizable focus modes</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📋</div>
            <h3>Task Planner</h3>
            <p>Create, assign, and track study tasks with your group in real-time</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📊</div>
            <h3>Progress Tracker</h3>
            <p>Monitor your study progress, set goals, and celebrate achievements together</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📓</div>
            <h3>Notes Section</h3>
            <p>Take and share notes with your study group with rich text formatting</p>
          </div>
        </div>
      </section>

      <section className="how-it-works" id="how-it-works">
        <h2>How It Works</h2>
        <div className="steps-grid">
          <div className="step-card">
            <div className="step-number">1</div>
            <h3>Create a Study Room</h3>
            <p>Set up your perfect study environment with your preferred features and settings</p>
          </div>
          <div className="step-card">
            <div className="step-number">2</div>
            <h3>Invite Study Partners</h3>
            <p>Share your room link with friends or join public study rooms to meet new study partners</p>
          </div>
          <div className="step-card">
            <div className="step-number">3</div>
            <h3>Start Collaborating</h3>
            <p>Use all features together in real-time for effective and engaging study sessions</p>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Features</h3>
            <ul>
              <li>Live Study Rooms</li>
              <li>Interactive Whiteboard</li>
              <li>Music Sync</li>
              <li>Pomodoro Timer</li>
              <li>Task Planner</li>
              <li>Progress Tracker</li>
              <li>Notes Section</li>
            </ul>
          </div>
          <div className="footer-section">
            <h3>Resources</h3>
            <ul>
              <li>Help Center</li>
              <li>Study Tips</li>
              <li>Community</li>
              <li>Blog</li>
              <li>Study Templates</li>
              <li>Success Stories</li>
            </ul>
          </div>
          <div className="footer-section">
            <h3>Company</h3>
            <ul>
              <li>About Us</li>
              <li>Contact</li>
              <li>Privacy Policy</li>
              <li>Terms of Service</li>
              <li>Careers</li>
              <li>Press</li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2024 CollabStudy. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App; 