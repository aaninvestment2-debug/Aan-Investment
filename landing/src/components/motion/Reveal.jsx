import { motion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1];

export const Reveal = ({ children, delay = 0, y = 32, className = "" }) => (
    <motion.div
        className={className}
        initial={{ opacity: 0, y }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.9, delay, ease: EASE }}
    >
        {children}
    </motion.div>
);

export const MaskedLine = ({ children, delay = 0, className = "" }) => (
    <span className={`block overflow-hidden ${className}`}>
        <motion.span
            className="block pb-[0.14em] -mb-[0.14em]"
            initial={{ y: "110%" }}
            animate={{ y: 0 }}
            transition={{ duration: 1.1, delay, ease: EASE }}
        >
            {children}
        </motion.span>
    </span>
);

export const FadeIn = ({ children, delay = 0, className = "" }) => (
    <motion.div
        className={className}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay, ease: "easeOut" }}
    >
        {children}
    </motion.div>
);
