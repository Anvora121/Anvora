import { motion } from "framer-motion";
import { useRef, useState } from "react";
import { ExternalLink, Eye, X, ChevronLeft, ChevronRight } from "lucide-react";

const projects = [
  {
    id: 1,
    title: "NovaTech Startup",
    category: "Startup Website",
    description: "A futuristic landing page for an AI startup, featuring smooth animations and bold typography.",
    image: "gradient-to-br from-indigo-500 to-indigo-300",
    status: "live",
  },
  {
    id: 2,
    title: "Bloom Bakery",
    category: "Small Business",
    description: "A warm, inviting website for a local bakery that increased online orders by 300%.",
    image: "gradient-to-br from-amber-500 to-amber-300",
    status: "live",
  },
  {
    id: 3,
    title: "Alex Chen Portfolio",
    category: "Student Portfolio",
    description: "A sleek portfolio that helped a CS student land their dream internship at a top firm.",
    image: "gradient-to-br from-indigo-600 to-indigo-400",
    status: "live",
  },
  {
    id: 4,
    title: "GreenLeaf Co.",
    category: "E-Commerce",
    description: "A sustainable products brand site with seamless checkout and eco-conscious design.",
    image: "gradient-to-br from-amber-600 to-amber-400",
    status: "under-construction",
  },
];

function ProjectCard({ project, index, onPreview }: any) {
  const ref = useRef<HTMLDivElement>(null);
  const [, setMousePosition] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateY = ((x - centerX) / centerX) * 8;
    const rotateX = -((y - centerY) / centerY) * 8;

    setRotation({ x: rotateX, y: rotateY });
    setMousePosition({ x, y });
  };

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group relative rounded-2xl overflow-hidden cursor-pointer"
      style={{
        perspective: "1000px",
      }}
    >
      <motion.div
        animate={rotation}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
        style={{
          transformStyle: "preserve-3d",
        }}
        className="w-full"
      >
        {/* Main card */}
        <div className={`aspect-video bg-${project.image} relative overflow-hidden rounded-2xl`}>
          {/* Content inside */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center p-8">
              <div className="font-display text-2xl md:text-3xl font-black text-white mb-2">
                {project.title}
              </div>
              <div className="text-sm text-white/70 uppercase tracking-wider font-display font-semibold">
                {project.category}
              </div>
              {project.status === "under-construction" && (
                <motion.div
                  className="mt-4 inline-block px-3 py-1 bg-gold/20 border border-gold/50 rounded-full"
                  animate={{ opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <span className="text-xs font-display font-bold text-gold">
                    Currently Under Construction
                  </span>
                </motion.div>
              )}
            </div>
          </div>

          {/* Gradient overlay on hover */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-hero-bg/95 via-transparent to-transparent"
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          />

          {/* Hover content */}
          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-6"
            initial={{ opacity: 0, scale: 0.8 }}
            whileHover={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <Eye className="w-8 h-8 text-gold" />
            <p className="text-sm text-center leading-relaxed text-white/80">
              {project.description}
            </p>
            <motion.button
              onClick={() => onPreview(project)}
              className="mt-4 px-6 py-2 bg-gradient-gold rounded-lg font-display font-bold text-sm cursor-pointer flex items-center gap-2"
              style={{ color: "hsl(235 40% 12%)" }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View Details <ExternalLink className="w-4 h-4" />
            </motion.button>
          </motion.div>
        </div>
      </motion.div>

      {/* Border glow on hover */}
      <motion.div
        className="absolute inset-0 rounded-2xl border border-gold/0 pointer-events-none"
        whileHover={{ borderColor: "hsl(42 92% 55% / 0.5)" }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
}

function ProjectModal({ project, onClose, onNext, onPrev }: any) {
  if (!project) return null;

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      {/* Backdrop */}
      <motion.div
        className="absolute inset-0 bg-black/80 backdrop-blur-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      />

      {/* Modal */}
      <motion.div
        className="relative z-10 bg-card rounded-3xl overflow-hidden max-w-4xl w-full"
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="aspect-video bg-gradient-gold rounded-t-3xl relative overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="font-display text-4xl font-black text-accent-foreground">
                {project.title}
              </div>
            </div>
          </div>
        </div>

        <div className="p-8 md:p-12">
          <p className="text-muted-foreground text-lg leading-relaxed mb-6">
            {project.description}
          </p>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div>
              <h4 className="font-display font-bold text-foreground mb-3">Project Type</h4>
              <p className="text-muted-foreground">{project.category}</p>
            </div>
            <div>
              <h4 className="font-display font-bold text-foreground mb-3">Status</h4>
              <p className={project.status === "live" ? "text-green-400" : "text-gold"}>
                {project.status === "live" ? "Live" : "Under Construction"}
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <motion.button
              onClick={onClose}
              className="px-8 py-3 bg-muted rounded-lg font-display font-bold transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Close
            </motion.button>

            <div className="flex gap-4 ml-auto">
              <motion.button
                onClick={onPrev}
                className="px-6 py-3 bg-glass rounded-lg flex items-center gap-2 font-display font-bold"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ChevronLeft className="w-5 h-5" /> Previous
              </motion.button>
              <motion.button
                onClick={onNext}
                className="px-6 py-3 bg-gradient-gold rounded-lg flex items-center gap-2 font-display font-bold"
                style={{ color: "hsl(235 40% 12%)" }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Next <ChevronRight className="w-5 h-5" />
              </motion.button>
            </div>
          </div>
        </div>

        {/* Close button */}
        <motion.button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 bg-black/50 rounded-full hover:bg-black/70 transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <X className="w-6 h-6 text-white" />
        </motion.button>
      </motion.div>
    </motion.div>
  );
}

export default function PortfolioSection() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [projectIndex, setProjectIndex] = useState(0);

  const handlePreview = (project: any) => {
    setSelectedProject(project);
    setProjectIndex(projects.findIndex((p) => p.id === project.id));
  };

  const goToNext = () => {
    const nextIndex = (projectIndex + 1) % projects.length;
    setProjectIndex(nextIndex);
    setSelectedProject(projects[nextIndex]);
  };

  const goToPrev = () => {
    const prevIndex = (projectIndex - 1 + projects.length) % projects.length;
    setProjectIndex(prevIndex);
    setSelectedProject(projects[prevIndex]);
  };

  return (
    <section id="portfolio" className="relative py-24 md:py-36 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/50 to-background pointer-events-none" />

      {/* Background decorative elements */}
      <motion.div
        className="absolute top-1/3 -right-1/4 w-[600px] h-[600px] rounded-full blur-[150px]"
        style={{
          background: "hsl(42 92% 55% / 0.08)",
        }}
        animate={{
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <div className="relative z-10 container mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-sm font-semibold text-gold uppercase tracking-[0.2em] mb-4 block font-display"
          >
            Proof {`>`} Promises
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="font-display text-4xl md:text-5xl font-black text-foreground mb-4"
          >
            Projects That <span className="text-gradient-gold">Convert</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="text-muted-foreground max-w-2xl mx-auto text-lg"
          >
            Featured and ongoing projects that showcase our craftsmanship and attention to detail.
          </motion.p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {projects.map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={i}
              onPreview={handlePreview}
            />
          ))}
        </div>
      </div>

      {/* Modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
          onNext={goToNext}
          onPrev={goToPrev}
        />
      )}
    </section>
  );
}
