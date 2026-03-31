import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, X, Image as ImageIcon } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { analyzeImage } from '../services/api';
import { toast } from 'sonner';

const ImageUpload = () => {
  const { language, setResult, setLoading, uploadedImage, setUploadedImage, addToHistory } =
    useApp();
  const [dragActive, setDragActive] = useState(false);

  const translations = {
    hindi: {
      title: 'छवि अपलोड करें',
      dragDrop: 'छवि यहां खींचें या क्लिक करें',
      analyzing: 'विश्लेषण कर रहे हैं...',
      analyze: 'छवि का विश्लेषण करें',
      remove: 'हटाएं'
    },
    english: {
      title: 'Upload Image',
      dragDrop: 'Drag & drop an image here or click to select',
      analyzing: 'Analyzing...',
      analyze: 'Analyze Image',
      remove: 'Remove'
    }
  };

  const t = translations[language];

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file) => {
    if (!file.type.startsWith('image/')) {
      toast.error(language === 'hindi' ? 'केवल छवि फ़ाइलें स्वीकार की जाती हैं' : 'Only image files are allowed');
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      toast.error(language === 'hindi' ? 'छवि 10MB से छोटी होनी चाहिए' : 'Image must be smaller than 10MB');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      setUploadedImage({ file, preview: e.target.result });
    };
    reader.readAsDataURL(file);
  };

  const handleAnalyze = async () => {
    if (!uploadedImage) {
      toast.error(language === 'hindi' ? 'कृपया पहले छवि अपलोड करें' : 'Please upload an image first');
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const response = await analyzeImage(uploadedImage.file);
      setResult(response.data);
      addToHistory({ type: 'image', data: { fileName: uploadedImage.file.name }, timestamp: new Date().toISOString() });
    } catch (error) {
      toast.error(error.toString());
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = () => {
    setUploadedImage(null);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 shadow-sm rounded-2xl p-6 md:p-8"
      data-testid="image-upload"
    >
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/50 rounded-xl flex items-center justify-center">
          <ImageIcon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
        </div>
        <h3 className="text-xl sm:text-2xl font-medium text-stone-800 dark:text-white">{t.title}</h3>
      </div>

      {!uploadedImage ? (
        <div
          className={`relative border-2 border-dashed rounded-2xl p-8 text-center transition-all ${
            dragActive
              ? 'border-green-700 bg-green-50 dark:bg-green-900/20'
              : 'border-stone-300 dark:border-stone-600 hover:border-green-700 hover:bg-stone-50 dark:hover:bg-stone-700/50'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          data-testid="upload-dropzone"
        >
          <input
            type="file"
            onChange={handleFileInput}
            accept="image/*"
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            data-testid="file-input"
          />
          <Upload className="w-12 h-12 mx-auto mb-4 text-stone-400 dark:text-stone-500" />
          <p className="text-base leading-relaxed text-stone-600 dark:text-stone-300">{t.dragDrop}</p>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="relative rounded-2xl overflow-hidden border border-stone-200">
            <img
              src={uploadedImage.preview}
              alt="Preview"
              className="w-full h-64 object-cover"
              data-testid="image-preview"
            />
            <button
              onClick={handleRemove}
              className="absolute top-2 right-2 p-2 bg-red-600 hover:bg-red-700 rounded-lg text-white transition-colors"
              data-testid="remove-image-btn"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <button
            onClick={handleAnalyze}
            className="w-full px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-semibold shadow-sm"
            data-testid="analyze-image-btn"
          >
            {t.analyze}
          </button>
        </div>
      )}
    </motion.div>
  );
};

export default ImageUpload;