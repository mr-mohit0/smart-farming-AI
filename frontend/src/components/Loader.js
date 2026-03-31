import React from 'react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { useApp } from '../context/AppContext';

const Loader = () => {
  const { language } = useApp();

  const text =
    language === 'hindi'
      ? 'AI आपके खेत का विश्लेषण कर रहा है...'
      : 'AI is analyzing your farm...';

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col items-center justify-center p-12"
      data-testid="loader"
    >
      <Loader2 className="w-12 h-12 text-green-700 animate-spin" />
      <p className="mt-4 text-stone-600 text-base leading-relaxed">{text}</p>
    </motion.div>
  );
};

export default Loader;