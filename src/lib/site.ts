/**
 * Personal details and contact links.
 * Items marked PLACEHOLDER must be replaced with real values.
 */
export const site = {
  name: "Arulprakasam C M",
  shortName: "Arulprakasam",
  initials: "AC",
  role: "UI/UX Designer & Frontend Developer",
  tagline: "UI/UX Designer | Frontend Developer | Computer Science Student",
  degree: "B.E. Computer Science and Engineering",
  college: "Kongu Engineering College",
  available: true,
  // PLACEHOLDER — replace with your real email
  email: "arulprakasam2023@gmail.com",
  // PLACEHOLDER — replace with your profile URLs
  linkedin: "https://www.linkedin.com/in/your-profile",
  github: "https://github.com/arulcm",
  behance: "https://www.behance.net/your-profile",
  resumeUrl: "/downloads/arulprakasam-cm-resume.pdf",
  resumeFileName: "Arulprakasam-CM-Resume.pdf",
} as const;

export const navLinks = [
  { label: "About", hash: "about" },
  { label: "Work", hash: "work" },
  { label: "Process", hash: "process" },
  { label: "Skills", hash: "skills" },
  { label: "Journey", hash: "journey" },
  { label: "Contact", hash: "contact" },
] as const;

export const skillGroups = [
  {
    title: "UI/UX",
    items: ["Figma", "Wireframing", "Prototyping", "User Research", "Responsive Design", "Design Systems"],
  },
  { title: "Frontend", items: ["React", "JavaScript", "HTML5", "CSS3", "Tailwind CSS"] },
  { title: "Backend", items: ["Node.js", "Express.js", "REST APIs"] },
  { title: "Programming", items: ["Java", "Python", "SQL"] },
  { title: "Databases", items: ["MongoDB", "PostgreSQL", "MySQL"] },
  { title: "Tools", items: ["Git", "GitHub", "VS Code", "Postman", "Figma"] },
] as const;

export const processSteps = [
  { n: "01", title: "Research", body: "Understand users, their problems, and requirements." },
  { n: "02", title: "Define", body: "Identify user needs and establish clear design objectives." },
  { n: "03", title: "Wireframe", body: "Plan the information architecture and interface structure." },
  { n: "04", title: "Design", body: "Develop high-fidelity interfaces and visual systems." },
  { n: "05", title: "Prototype", body: "Create interactive prototypes and user flows." },
  { n: "06", title: "Improve", body: "Evaluate usability and refine the experience." },
] as const;
