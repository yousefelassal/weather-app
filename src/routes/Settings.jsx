import { motion } from "framer-motion";

export default function Settings() {
    return (
      <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: .15 }}
      >
        <p>
          This is the settings page.
        </p>
      </motion.div>
    );
  }