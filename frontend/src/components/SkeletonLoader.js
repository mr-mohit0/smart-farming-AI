import React from 'react';
import { motion } from 'framer-motion';

const SkeletonLoader = ({ type = 'card' }) => {
  if (type === 'navbar') {
    return (
      <div className="animate-pulse flex items-center justify-between h-20 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center space-x-3">
          <div className="w-14 h-14 bg-stone-200 dark:bg-stone-700 rounded-2xl" />
          <div className="hidden sm:block space-y-2">
            <div className="h-5 w-48 bg-stone-200 dark:bg-stone-700 rounded" />
            <div className="h-3 w-32 bg-stone-200 dark:bg-stone-700 rounded" />
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <div className="h-10 w-20 bg-stone-200 dark:bg-stone-700 rounded-lg" />
          <div className="h-10 w-24 bg-stone-200 dark:bg-stone-700 rounded-lg" />
          <div className="h-10 w-24 bg-stone-200 dark:bg-stone-700 rounded-lg" />
        </div>
      </div>
    );
  }

  if (type === 'hero') {
    return (
      <div className="animate-pulse max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="h-16 bg-stone-200 dark:bg-stone-700 rounded w-3/4" />
              <div className="h-12 bg-stone-200 dark:bg-stone-700 rounded w-2/3" />
              <div className="h-6 bg-stone-200 dark:bg-stone-700 rounded w-full" />
              <div className="h-6 bg-stone-200 dark:bg-stone-700 rounded w-5/6" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-12 bg-stone-200 dark:bg-stone-700 rounded-2xl" />
              ))}
            </div>
            <div className="flex gap-4">
              <div className="h-14 w-40 bg-stone-200 dark:bg-stone-700 rounded-2xl" />
              <div className="h-14 w-40 bg-stone-200 dark:bg-stone-700 rounded-2xl" />
            </div>
          </div>
          <div className="h-96 bg-stone-200 dark:bg-stone-700 rounded-3xl" />
        </div>
      </div>
    );
  }

  if (type === 'form') {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="animate-pulse bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 shadow-sm rounded-2xl p-6 md:p-8"
      >
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-stone-200 dark:bg-stone-700 rounded-xl" />
          <div className="h-6 w-40 bg-stone-200 dark:bg-stone-700 rounded" />
        </div>
        <div className="space-y-6">
          <div className="space-y-2">
            <div className="h-4 w-24 bg-stone-200 dark:bg-stone-700 rounded" />
            <div className="h-12 bg-stone-200 dark:bg-stone-700 rounded-xl" />
          </div>
          <div className="space-y-2">
            <div className="h-4 w-24 bg-stone-200 dark:bg-stone-700 rounded" />
            <div className="h-12 bg-stone-200 dark:bg-stone-700 rounded-xl" />
          </div>
          <div className="h-12 bg-stone-200 dark:bg-stone-700 rounded-xl" />
        </div>
      </motion.div>
    );
  }

  // Default card skeleton
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="animate-pulse bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 shadow-sm rounded-2xl p-6 md:p-8"
    >
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-stone-200 dark:bg-stone-700 rounded-xl" />
        <div className="h-6 w-40 bg-stone-200 dark:bg-stone-700 rounded" />
      </div>
      <div className="space-y-4">
        <div className="h-4 bg-stone-200 dark:bg-stone-700 rounded w-full" />
        <div className="h-4 bg-stone-200 dark:bg-stone-700 rounded w-5/6" />
        <div className="h-4 bg-stone-200 dark:bg-stone-700 rounded w-4/6" />
      </div>
    </motion.div>
  );
};

export default SkeletonLoader;