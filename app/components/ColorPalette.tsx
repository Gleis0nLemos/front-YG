import { motion, Variants } from "framer-motion";

// Variant para entrada inicial (mantido como estava)
const paletteItem: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

function ColorPalette() {
  const colors = [
    { label: "Branco", hex: "#ffffff" },
    { label: "Preto",  hex: "#000000" },
    { label: "Inox",   hex: "#d1d5db" },
    { label: "Bambu",  hex: "#d4a373" },
    { label: "Azul", hex: "#6b9ac9" }
  ];

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.35 }}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: { staggerChildren: 0.15 },
        },
      }}
      className="text-center my-12"
    >
      <motion.p
        variants={paletteItem}
        className="text-normal text-secondary/90 mb-4 font-light"
      >
        Inspiração de cores
      </motion.p>

      <div className="flex justify-center gap-4 md:gap-10 flex-wrap">
        {colors.map((color) => (
          <div
            key={color.label}
            className="flex flex-col items-center gap-2.5"
          >
            <motion.div
              className="w-16 h-16 md:w-20 md:h-20 rounded-full border border-border/60 shadow-sm"
              style={{ backgroundColor: color.hex }}
              whileHover={{
                scale: 1.08,
                boxShadow: "0 10px 15px -3px rgba(0,0,0,0.12), 0 4px 6px -2px rgba(0,0,0,0.05)",
                transition: {
                  duration: 0.25,
                  ease: "easeOut",
                },
              }}
              transition={{
                duration: 0.2,
                ease: "easeOut",
              }}
            />
            <span className="text-xs md:text-sm font-medium text-muted-foreground">
              {color.label}
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export default ColorPalette;