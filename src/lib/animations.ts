/**
 * Framer Motion Animation Variants
 *
 * Reusable animation configurations for consistent motion design
 * across the application.
 */

import { Variants } from "framer-motion";

/**
 * Fade in animation
 * Gradually appears with opacity change
 */
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.4, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.3, ease: "easeIn" },
  },
};

/**
 * Fade in from below
 * Slides up while fading in
 */
export const fadeInUp: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: { duration: 0.3 },
  },
};

/**
 * Fade in from right
 * Slides from right while fading in
 */
export const fadeInRight: Variants = {
  hidden: {
    opacity: 0,
    x: 20,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
  exit: {
    opacity: 0,
    x: 20,
    transition: { duration: 0.3 },
  },
};

/**
 * Scale animation
 * Grows from smaller to normal size
 */
export const scaleIn: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: [0.4, 0, 0.2, 1],
    },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    transition: { duration: 0.3 },
  },
};

/**
 * Stagger children animation
 * Animates child elements with a delay between each
 */
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

/**
 * Stagger item animation
 * Used with staggerContainer for individual items
 */
export const staggerItem: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

/**
 * Slide in from left
 * Full slide transition from left edge
 */
export const slideInLeft: Variants = {
  hidden: {
    x: "-100%",
    opacity: 0,
  },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
  exit: {
    x: "-100%",
    opacity: 0,
    transition: { duration: 0.4 },
  },
};

/**
 * Slide in from right
 * Full slide transition from right edge
 */
export const slideInRight: Variants = {
  hidden: {
    x: "100%",
    opacity: 0,
  },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
  exit: {
    x: "100%",
    opacity: 0,
    transition: { duration: 0.4 },
  },
};

/**
 * Hero section animation
 * Dramatic entrance for hero sections
 */
export const heroAnimation: Variants = {
  hidden: {
    opacity: 0,
    y: 40,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.6, 0.01, 0.05, 0.95],
    },
  },
};

/**
 * Card hover animation
 * Lift effect on hover for cards
 */
export const cardHover = {
  initial: { scale: 1, y: 0 },
  hover: {
    scale: 1.02,
    y: -4,
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  },
  tap: {
    scale: 0.98,
    transition: { duration: 0.1 },
  },
};

/**
 * Page transition animation
 * For page-level transitions
 */
export const pageTransition: Variants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.4,
      ease: "easeIn",
    },
  },
};

/**
 * Modal/Dialog animation
 * For overlay dialogs and modals
 */
export const modalAnimation: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.95,
    y: 20,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: "spring",
      damping: 25,
      stiffness: 300,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    y: 20,
    transition: {
      duration: 0.2,
      ease: "easeIn",
    },
  },
};

/**
 * Menu animation
 * For dropdown menus and navigation
 */
export const menuAnimation: Variants = {
  hidden: {
    opacity: 0,
    y: -10,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.2,
      ease: "easeOut",
    },
  },
  exit: {
    opacity: 0,
    y: -10,
    scale: 0.95,
    transition: {
      duration: 0.15,
      ease: "easeIn",
    },
  },
};
