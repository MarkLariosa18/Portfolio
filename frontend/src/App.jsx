
import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import Swal from 'sweetalert2';
import profileImage from './profile1.jpg';
import fallbackImage from './meteor_echo_by_mind_makers_djs000n.png';
import 'sweetalert2/dist/sweetalert2.min.css';

// Utility for reduced motion
const useMotionVariants = (defaultVariants) => {
  const shouldReduceMotion = useReducedMotion();
  return shouldReduceMotion ? {} : defaultVariants;
};

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: 'Home', href: '#', onClick: () => window.scrollTo({ top: 0, behavior: 'smooth' }) },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ];

  const navVariants = useMotionVariants({
    initial: { y: -100, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    transition: { duration: 0.5, ease: 'easeOut' },
  });

  return (
    <motion.nav
      className="bg-gray-900/95 backdrop-blur-md text-white fixed w-full z-20 top-0 shadow-md"
      {...navVariants}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0 flex items-center">
            <motion.span
              className="text-xl sm:text-2xl font-semibold tracking-tight"
              whileHover={{ scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 400, damping: 15 }}
            >
              Mark Lariosa
            </motion.span>
          </div>
          <div className="hidden sm:flex sm:items-center space-x-8">
            {navItems.map((item) => (
              <motion.a
                key={item.name}
                href={item.href}
                onClick={item.onClick}
                className="px-3 py-2 text-sm font-medium text-gray-200 hover:text-white hover:bg-gray-800/50 rounded-md transition-colors duration-200"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: 'spring', stiffness: 400, damping: 15 }}
              >
                {item.name}
              </motion.a>
            ))}
          </div>
          <div className="sm:hidden flex items-center">
            <motion.button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md text-gray-200 hover:text-white hover:bg-gray-800/50"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 400, damping: 15 }}
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </motion.button>
          </div>
        </div>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="sm:hidden bg-gray-900/95 backdrop-blur-md"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <div className="pt-2 pb-4 space-y-1">
              {navItems.map((item) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => {
                    if (item.onClick) {
                      e.preventDefault();
                      item.onClick();
                    }
                    setIsOpen(false);
                  }}
                  className="block px-4 py-2 text-base font-medium text-gray-200 hover:text-white hover:bg-gray-800/50"
                  whileHover={{ scale: 1.02, x: 5 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                >
                  {item.name}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

const Header = () => {
  const headerVariants = useMotionVariants({
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.7 },
  });

  return (
    <motion.section
      className="relative text-white pt-32 pb-20 min-h-[85vh] flex items-center bg-gradient-to-br from-gray-900 to-blue-900"
      {...headerVariants}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center relative z-10">
        <motion.div
          className="relative w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 rounded-full overflow-hidden border-4 border-white/90 shadow-xl"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          whileHover={{ scale: 1.03 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        >
          <img
            src={profileImage}
            alt="Mark Christian Javes Lariosa"
            className="w-full h-full object-cover rounded-full"
            onError={(e) => {
              console.error('Failed to load profile image');
              e.target.src = fallbackImage;
            }}
          />
        </motion.div>
        <motion.h1
          className="text-4xl sm:text-5xl md:text-6xl font-bold mt-8 tracking-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Mark Christian Javes Lariosa
        </motion.h1>
        <motion.p
          className="text-lg sm:text-xl md:text-2xl mt-4 text-gray-200 font-medium"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          Computer Science Student | Developer
        </motion.p>
        <motion.div
          className="mt-8 flex space-x-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <motion.a
            href="https://github.com/MarkLariosa18?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-200 hover:text-white"
            whileHover={{ scale: 1.1 }}
            transition={{ type: 'spring', stiffness: 400, damping: 15 }}
          >
            <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.49.5.09.68-.22.68-.48v-1.7c-2.78.61-3.36-1.34-3.36-1.34-.46-1.16-1.12-1.47-1.12-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.89 1.52 2.34 1.08 2.91.83.09-.65.35-1.08.64-1.33-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02A9.564 9.564 0 0112 6.8c.85.004 1.71.11 2.52.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.69-4.57 4.94.36.31.56.83.56 1.67v2.48c0 .26.18.58.69.48A10.007 10.007 0 0022 12c0-5.52-4.48-10-10-10z" />
            </svg>
          </motion.a>
          <motion.a
            href="https://www.linkedin.com/in/mark-lariosa-b348b4366"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-200 hover:text-white"
            whileHover={{ scale: 1.1 }}
            transition={{ type: 'spring', stiffness: 400, damping: 15 }}
          >
            <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 3a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h14m-.5 15.5v-5.3a3.26 3.26 0 00-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 011.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 001.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 00-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
            </svg>
          </motion.a>
        </motion.div>
      </div>
    </motion.section>
  );
};

const About = () => {
  const sectionVariants = useMotionVariants({
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.7 },
    viewport: { once: true },
  });

  return (
    <motion.section
      id="about"
      className="py-20 bg-gray-50"
      {...sectionVariants}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          About Me
        </motion.h2>
        <motion.p
          className="mt-6 text-lg text-gray-600 leading-7 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          I'm Mark Christian Javes Lariosa, a dedicated 3rd-year Computer Science student passionate about building innovative digital solutions. With expertise in full-stack development and system design, I thrive on solving complex problems and exploring cutting-edge technologies. My goal is to create impactful projects that blend creativity and functionality.
        </motion.p>
      </div>
    </motion.section>
  );
};

const Skills = () => {
  const skills = [
    'Python', 'JavaScript', 'React', 'Express.js', 'HTML', 'CSS', 'Tailwind CSS', 'SQL', 'Node.js', 'MongoDB'
  ];

  const containerVariants = useMotionVariants({
    initial: 'hidden',
    whileInView: 'visible',
    viewport: { once: true },
    transition: { staggerChildren: 0.1 },
  });

  const skillVariants = useMotionVariants({
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    transition: { type: 'spring', stiffness: 300, damping: 20 },
  });

  return (
    <motion.section
      id="skills"
      className="py-20 bg-white"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      viewport={{ once: true }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Skills
        </motion.h2>
        <motion.div
          className="mt-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
          variants={containerVariants}
        >
          {skills.map((skill) => (
            <motion.div
              key={skill}
              className="bg-gray-50 p-4 rounded-lg text-center text-gray-800 font-medium shadow-sm hover:shadow-md border border-gray-200/50"
              variants={skillVariants}
              whileHover={{ scale: 1.03, y: -3 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              {skill}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};

const ProjectCard = ({ title, description, link }) => {
  return (
    <motion.div
      className="bg-white p-6 rounded-xl shadow-sm border border-gray-200/50 hover:bg-gray-50"
      whileHover={{ scale: 1.02, y: -5, boxShadow: '0 10px 20px rgba(0, 0, 0, 0.05)' }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
      <p className="mt-2 text-gray-600 leading-relaxed">{description}</p>
      <motion.a
        href={link}
        className="mt-4 inline-block text-blue-600 hover:text-blue-800 font-medium"
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.05, x: 3 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: 'spring', stiffness: 400, damping: 15 }}
      >
        View Project →
      </motion.a>
    </motion.div>
  );
};

const Projects = () => {
  const projects = [
    {
      title: 'Balane-Saspa Dental Clinic Appointment System',
      description: 'A client-based appointment system for managing dental bookings, built with Bootstrap, HTML, CSS, JavaScript, and Express.js.',
      link: 'https://balane-saspa-dental-1.onrender.com'
    },
    {
      title: 'Portfolio Website',
      description: 'This portfolio, showcasing my skills and projects, built with React and Tailwind CSS.',
      link: 'https://portfolio-4s1j.onrender.com'
    },
    {
      title: 'NumPy Activities',
      description: 'Web app for NumPy activities.',
      link: 'https://numpy-web-app.onrender.com'
    },
    {
      title: 'Python Pandas Exam',
      description: 'A web app for the Python Pandas library.',
      link: 'https://pl-exam-private.onrender.com'
    },
    {
      title: 'View My GitHub',
      description: 'Explore all of my projects on GitHub.',
      link: 'https://github.com/MarkLariosa18?tab=repositories'
    }
  ];

  const containerVariants = useMotionVariants({
    initial: 'hidden',
    whileInView: 'visible',
    viewport: { once: true },
    transition: { staggerChildren: 0.1 },
  });

  const projectVariants = useMotionVariants({
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    transition: { type: 'spring', stiffness: 300, damping: 20 },
  });

  return (
    <motion.section
      id="projects"
      className="py-20 bg-gray-50"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      viewport={{ once: true }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Projects
        </motion.h2>
        <motion.div
          className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
        >
          {projects.map((project) => (
            <motion.div key={project.title} variants={projectVariants}>
              <ProjectCard
                title={project.title}
                description={project.description}
                link={project.link}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('https://portfolio-4s1j.onrender.com/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (response.ok) {
        Swal.fire({
          title: 'Success!',
          text: result.message || 'Message sent successfully!',
          icon: 'success',
          confirmButtonColor: '#2563eb',
        });
        setFormData({ name: '', email: '', message: '' });
      } else {
        Swal.fire({
          title: 'Error!',
          text: result.error || 'Failed to send message.',
          icon: 'error',
          confirmButtonColor: '#2563eb',
        });
      }
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: 'An error occurred. Please try again later.',
        icon: 'error',
        confirmButtonColor: '#2563eb',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputVariants = useMotionVariants({
    whileHover: { scale: 1.01 },
    whileFocus: { scale: 1.01 },
    transition: { type: 'spring', stiffness: 300, damping: 20 },
  });

  return (
    <motion.section
      id="contact"
      className="py-20 bg-white"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      viewport={{ once: true }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Contact Me
        </motion.h2>
        <motion.p
          className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Reach out via email at{' '}
          <motion.a
            href="mailto:marklariosa18@gmail.com"
            className="text-blue-600 hover:text-blue-800"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 400, damping: 15 }}
          >
            marklariosa18@gmail.com
          </motion.a>{' '}
          or use the form below.
        </motion.p>
        <form onSubmit={handleSubmit} className="mt-10 max-w-lg mx-auto space-y-6">
          <motion.div className="mb-4" {...inputVariants}>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <motion.input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md p-3 focus:ring-blue-500 focus:border-blue-500 bg-white shadow-sm"
              {...inputVariants}
            />
          </motion.div>
          <motion.div className="mb-4" {...inputVariants}>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <motion.input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md p-3 focus:ring-blue-500 focus:border-blue-500 bg-white shadow-sm"
              {...inputVariants}
            />
          </motion.div>
          <motion.div className="mb-4" {...inputVariants}>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700">
              Message
            </label>
            <motion.textarea
              name="message"
              id="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows="4"
              className="mt-1 block w-full border border-gray-300 rounded-md p-3 focus:ring-blue-500 focus:border-blue-500 bg-white shadow-sm"
              {...inputVariants}
            />
          </motion.div>
          <motion.button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 shadow-md disabled:bg-gray-400"
            disabled={isSubmitting}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 400, damping: 15 }}
          >
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </motion.button>
        </form>
      </div>
    </motion.section>
  );
};

const Footer = () => {
  return (
    <motion.footer
      className="bg-gray-900 text-gray-200 py-10"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      viewport={{ once: true }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-sm"
        >
          © 2025 Mark Christian Javes Lariosa. All rights reserved.
        </motion.p>
      </div>
    </motion.footer>
  );
};

const App = () => {
  useEffect(() => {
    const canvas = document.createElement('canvas');
    canvas.id = 'particles';
    document.body.appendChild(canvas);
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth * window.devicePixelRatio;
    canvas.height = window.innerHeight * window.devicePixelRatio;
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.zIndex = '0';
    canvas.style.pointerEvents = 'none';
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

    const particlesArray = [];
    const numberOfParticles = Math.min(50, Math.floor(window.innerWidth / 20));
    const connectDistance = 150;

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 1.5 + 0.5;
        this.speedX = Math.random() * 0.15 - 0.075;
        this.speedY = Math.random() * 0.15 - 0.075;
      }
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
      }
      draw() {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    function connectParticles() {
      for (let i = 0; i < particlesArray.length; i++) {
        for (let j = i + 1; j < particlesArray.length; j++) {
          const dx = particlesArray[i].x - particlesArray[j].x;
          const dy = particlesArray[i].y - particlesArray[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < connectDistance * window.devicePixelRatio) {
            ctx.strokeStyle = `rgba(255, 255, 255, ${0.8 - distance / (connectDistance * window.devicePixelRatio)})`;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
            ctx.lineTo(particlesArray[j].x, particlesArray[j].y);
            ctx.stroke();
          }
        }
      }
    }

    function init() {
      for (let i = 0; i < numberOfParticles; i++) {
        particlesArray.push(new Particle());
      }
    }

    let lastFrameTime = 0;
    function animate(timestamp) {
      if (timestamp - lastFrameTime < 16.67) {
        requestAnimationFrame(animate);
        return;
      }
      lastFrameTime = timestamp;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();
      }
      connectParticles();
      requestAnimationFrame(animate);
    }

    const shouldReduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!shouldReduceMotion) {
      init();
      animate(performance.now());
    }

    const handleResize = () => {
      canvas.width = window.innerWidth * window.devicePixelRatio;
      canvas.height = window.innerHeight * window.devicePixelRatio;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
      particlesArray.length = 0;
      init();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      document.body.removeChild(canvas);
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-gray-900">
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
          body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            margin: 0;
            padding: 0;
            overflow-x: hidden;
            scroll-behavior: smooth;
          }
          html {
            scroll-behavior: smooth;
          }
          ::selection {
            background: #3b82f6;
            color: white;
          }
        `}
      </style>
      <NavBar />
      <Header />
      <About />
      <Skills />
      <Projects />
      <Contact />
      <Footer />
    </div>
  );
};

export default App;
