import { Transition } from "framer-motion";

// Text Animation
const transitionTextContent: Transition = { type: "spring", stiffness: 300, damping: 50, duration: 0.5, ease: "easeInOut" };
export const variantsTextContent = {
    hidden:  { x: 0, y: 20, opacity: 0 },
    visible: { x: 0, y:  0, opacity: 1, transition: transitionTextContent },
    exit:    { x: 0, y:  5, opacity: 0, transition: transitionTextContent },
};

// Background Animation
const transitionBackgroundContent: Transition  = { duration: 2, ease: "easeInOut" };
export const variantsBackgroundContent = {
    hidden:  { x: -10, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: transitionBackgroundContent },
};