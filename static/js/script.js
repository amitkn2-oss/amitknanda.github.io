// Smooth scrolling observer
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      
      // Animate skill bars
      if (entry.target.classList.contains('skill-progress')) {
        const level = entry.target.getAttribute('data-level');
        entry.target.style.width = level + '%';
      }
    }
  });
}, observerOptions);

// Observe all animated elements
document.addEventListener('DOMContentLoaded', function() {
  const animatedElements = document.querySelectorAll(
    '.stat-card, .activity-item, .skill-card, .project-card, .skill-progress'
  );
  
  animatedElements.forEach(el => {
    observer.observe(el);
  });

  // Fetch and populate dashboard data
  fetchDashboardData();

  // Add scroll event listener for parallax effect
  window.addEventListener('scroll', handleScroll);

  // Smooth scrolling for nav links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
});

// Fetch dashboard data from backend
async function fetchDashboardData() {
  try {
    const response = await fetch('/api/dashboard');
    const data = await response.json();
    
    // Populate profile
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
      heroContent.innerHTML = `
        <h1>${data.profile.name}</h1>
        <p>${data.profile.bio}</p>
        <button class="cta-button" onclick="scrollToSection('.projects')">View My Work</button>
      `;
    }

    // Populate stats
    const statsContainer = document.querySelector('.stats');
    if (statsContainer) {
      statsContainer.innerHTML = `
        <div class="stat-card">
          <div class="stat-number">${data.stats.projects}</div>
          <div class="stat-label">Projects</div>
        </div>
        <div class="stat-card">
          <div class="stat-number">${data.stats.contributions}</div>
          <div class="stat-label">Contributions</div>
        </div>
        <div class="stat-card">
          <div class="stat-number">${data.stats.followers}</div>
          <div class="stat-label">Followers</div>
        </div>
        <div class="stat-card">
          <div class="stat-number">${data.stats.repositories}</div>
          <div class="stat-label">Repositories</div>
        </div>
      `;
      
      // Re-observe new stat cards
      document.querySelectorAll('.stat-card').forEach(card => {
        observer.observe(card);
      });
    }

    // Populate activities
    const activitiesList = document.querySelector('.activity-list');
    if (activitiesList) {
      activitiesList.innerHTML = data.activities.map((activity, index) => `
        <div class="activity-item" style="animation-delay: ${index * 0.1}s">
          <div class="activity-icon">${activity.icon}</div>
          <div class="activity-content">
            <h3>${activity.title}</h3>
            <p>${activity.description}</p>
            <span class="activity-date">${activity.date}</span>
          </div>
        </div>
      `).join('');
      
      // Re-observe activity items
      document.querySelectorAll('.activity-item').forEach(item => {
        observer.observe(item);
      });
    }

    // Populate skills
    const skillsGrid = document.querySelector('.skills-grid');
    if (skillsGrid) {
      skillsGrid.innerHTML = data.skills.map((skill, index) => `
        <div class="skill-card" style="animation-delay: ${index * 0.1}s">
          <div class="skill-name">
            <span>${skill.name}</span>
            <span class="skill-level">${skill.level}%</span>
          </div>
          <div class="skill-bar">
            <div class="skill-progress" data-level="${skill.level}" style="width: 0%"></div>
          </div>
        </div>
      `).join('');
      
      // Re-observe skill cards
      document.querySelectorAll('.skill-card').forEach(card => {
        observer.observe(card);
      });
      
      document.querySelectorAll('.skill-progress').forEach(progress => {
        observer.observe(progress);
      });
    }

    // Populate projects
    const projectsGrid = document.querySelector('.projects-grid');
    if (projectsGrid) {
      projectsGrid.innerHTML = data.projects.map((project, index) => `
        <div class="project-card" style="animation-delay: ${index * 0.1}s">
          <div class="project-image">${project.image}</div>
          <div class="project-content">
            <h3 class="project-title">${project.name}</h3>
            <p class="project-description">${project.description}</p>
            <div class="project-tech">
              ${project.tech.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
            </div>
          </div>
        </div>
      `).join('');
      
      // Re-observe project cards
      document.querySelectorAll('.project-card').forEach(card => {
        observer.observe(card);
      });
    }
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
  }
}

// Parallax scroll effect
function handleScroll() {
  const hero = document.querySelector('.hero');
  if (hero) {
    const scrollY = window.scrollY;
    hero.style.transform = `translateY(${scrollY * 0.5}px)`;
  }

  // Update header background on scroll
  const header = document.querySelector('header');
  if (window.scrollY > 50) {
    header.style.background = 'rgba(10, 15, 31, 0.95)';
    header.style.borderBottomColor = 'rgba(99, 102, 241, 0.2)';
  } else {
    header.style.background = 'rgba(10, 15, 31, 0.8)';
    header.style.borderBottomColor = 'rgba(99, 102, 241, 0.1)';
  }
}

// Utility function to scroll to section
function scrollToSection(selector) {
  const section = document.querySelector(selector);
  if (section) {
    section.scrollIntoView({ behavior: 'smooth' });
  }
}

// Real-time activity updates
function updateActivityFeed() {
  setInterval(async () => {
    try {
      const response = await fetch('/api/activity');
      const data = await response.json();
      console.log('Latest activity:', data);
    } catch (error) {
      console.error('Error updating activity:', error);
    }
  }, 30000); // Update every 30 seconds
}

// Start real-time updates
setTimeout(() => {
  updateActivityFeed();
}, 2000);
