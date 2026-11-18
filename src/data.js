import scholar from './assets/projects/scholar-track.jpg'
import ayurflow from './assets/projects/ayurflow.jpg'
import gems from './assets/projects/galagama-gems.jpg'
import shadow from './assets/projects/shadowsense.jpg'
import vehicles from './assets/projects/vehicles-web.jpg'

export const email = 'gihandhanushka2003@gmail.com'
export const github = 'https://github.com/GihanDhanushka'
export const linkedin = 'https://www.linkedin.com/in/gihan-dhanushka-2513a433a/'

export const projects = [
  {
    name: 'Scholar Track',
    type: 'Automated Deadline Management System',
    description: 'Track assignments, course progress, grades, and GPA in one place.',
    tags: ['React', 'Flask', 'Python', 'Machine Learning'],
    image: scholar,
    repo: github + '/Scholar_Track',
  },
  {
    name: 'AyurFlow',
    type: 'Ayurvedic Clinic Management System',
    description: 'A clinic management project for Ayurvedic care.',
    tags: ['UI/UX Design', 'Web Development'],
    image: ayurflow,
  },
  {
    name: 'Galagama Gems',
    type: 'Gem Business Platform',
    description: 'A Sri Lankan gem business platform with inventory management and e-commerce features.',
    tags: ['TypeScript', 'E-Commerce'],
    image: gems,
    repo: github + '/Galagama-Gems',
  },
  {
    name: 'ShadowSense',
    type: 'Social Engineering Detection',
    description: 'An agentic AI system for detecting social engineering attempts in real time.',
    tags: ['Agentic AI', 'Cybersecurity'],
    image: shadow,
    repo: github + '/ShadowSense-2026-Aurora',
  },
  {
    name: 'Vehicles Web',
    type: 'Vehicle Management Platform',
    description: 'Vehicle listings with search, filters, and detailed specifications.',
    tags: ['HTML', 'Web App'],
    image: vehicles,
    repo: github + '/vehicles-web',
  },
]

export const skills = {
  Frontend: ['React.js', 'JavaScript', 'TypeScript', 'HTML5', 'CSS3', 'Tailwind CSS'],
  Backend: ['Python', 'Flask', 'Node.js', 'Java'],
  Database: ['MySQL', 'PostgreSQL', 'SQLite', 'MongoDB'],
  'UI/UX': ['Figma', 'Wireframing', 'Prototyping', 'Responsive Design', 'User Interface Design'],
  Tools: ['Git', 'GitHub', 'VS Code', 'Postman', 'Azure'],
}
