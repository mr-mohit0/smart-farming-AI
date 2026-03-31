import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mountain, Droplet, Sprout, Bug, Shield, AlertTriangle } from 'lucide-react';
import { useApp } from '../context/AppContext';

const EducationalContent = () => {
  const { language } = useApp();
  const [activeTab, setActiveTab] = useState('soils');

  const translations = {
    hindi: {
      title: 'कृषि ज्ञान केंद्र',
      subtitle: 'अपनी खेती को बेहतर बनाने के लिए जानकारी प्राप्त करें',
      soilsTab: 'मिट्टी के प्रकार',
      erosionTab: 'मिट्टी का कटाव',
      pesticidesTab: 'कीटनाशक',
      diseasesTab: 'फसल रोग'
    },
    english: {
      title: 'Agricultural Knowledge Center',
      subtitle: 'Learn to improve your farming',
      soilsTab: 'Soil Types',
      erosionTab: 'Soil Erosion',
      pesticidesTab: 'Pesticides',
      diseasesTab: 'Crop Diseases'
    }
  };

  const t = translations[language];

  const soilTypes = [
    {
      name: language === 'hindi' ? 'दोमट मिट्टी' : 'Loamy Soil',
      desc: language === 'hindi' 
        ? 'सर्वोत्तम कृषि मिट्टी, अच्छी जल निकासी और पोषक तत्व' 
        : 'Best agricultural soil, good drainage and nutrients',
      image: 'https://images.unsplash.com/photo-1592150621744-aca64f48394a?w=400&h=300&fit=crop',
      icon: Mountain
    },
    {
      name: language === 'hindi' ? 'चिकनी मिट्टी' : 'Clay Soil',
      desc: language === 'hindi'
        ? 'पानी को अच्छी तरह से बनाए रखती है, धान की खेती के लिए अच्छी'
        : 'Retains water well, good for rice cultivation',
      image: 'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=400&h=300&fit=crop',
      icon: Droplet
    },
    {
      name: language === 'hindi' ? 'रेतीली मिट्टी' : 'Sandy Soil',
      desc: language === 'hindi'
        ? 'अच्छी जल निकासी, मूंगफली और गाजर के लिए उपयुक्त'
        : 'Good drainage, suitable for groundnuts and carrots',
      image: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=400&h=300&fit=crop',
      icon: Sprout
    },
    {
      name: language === 'hindi' ? 'काली मिट्टी' : 'Black Soil',
      desc: language === 'hindi'
        ? 'कपास और सोयाबीन के लिए आदर्श, नमी बनाए रखती है'
        : 'Ideal for cotton and soybean, retains moisture',
      image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400&h=300&fit=crop',
      icon: Mountain
    }
  ];

  const erosionTypes = [
    {
      name: language === 'hindi' ? 'जल अपरदन' : 'Water Erosion',
      desc: language === 'hindi'
        ? 'बारिश से मिट्टी का बहना, छतों और नालियां बनाएं'
        : 'Soil washing away by rain, create terraces and channels',
      image: 'https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=400&h=300&fit=crop'
    },
    {
      name: language === 'hindi' ? 'पवन अपरदन' : 'Wind Erosion',
      desc: language === 'hindi'
        ? 'हवा से मिट्टी का उड़ना, पेड़ लगाकर रोकें'
        : 'Soil blown away by wind, prevent with tree planting',
      image: 'https://images.unsplash.com/photo-1500534623283-312aade485b7?w=400&h=300&fit=crop'
    },
    {
      name: language === 'hindi' ? 'नाली अपरदन' : 'Gully Erosion',
      desc: language === 'hindi'
        ? 'गहरी खाइयां बनना, जल संरक्षण तकनीक अपनाएं'
        : 'Deep channels formation, adopt water conservation',
      image: 'https://images.unsplash.com/photo-1563207153-f403bf289096?w=400&h=300&fit=crop'
    }
  ];

  const pesticides = [
    {
      name: language === 'hindi' ? 'जैविक कीटनाशक' : 'Organic Pesticides',
      desc: language === 'hindi'
        ? 'नीम तेल, प्राकृतिक और सुरक्षित'
        : 'Neem oil, natural and safe',
      image: 'https://images.unsplash.com/photo-1591361443750-571e194e6f36?w=400&h=300&fit=crop',
      icon: Sprout
    },
    {
      name: language === 'hindi' ? 'रासायनिक कीटनाशक' : 'Chemical Pesticides',
      desc: language === 'hindi'
        ? 'तेज प्रभावी लेकिन सावधानी से उपयोग करें'
        : 'Fast acting but use with caution',
      image: 'https://images.unsplash.com/photo-1585435465992-19f335837c4b?w=400&h=300&fit=crop',
      icon: Shield
    },
    {
      name: language === 'hindi' ? 'जैविक नियंत्रण' : 'Biological Control',
      desc: language === 'hindi'
        ? 'लाभकारी कीड़ों का उपयोग, पर्यावरण के अनुकूल'
        : 'Using beneficial insects, eco-friendly',
      image: 'https://images.unsplash.com/photo-1530836176992-5a494c4b9e5d?w=400&h=300&fit=crop',
      icon: Bug
    }
  ];

  const diseases = [
    {
      name: language === 'hindi' ? 'पत्ती का धब्बा रोग' : 'Leaf Spot Disease',
      desc: language === 'hindi'
        ? 'पत्तियों पर भूरे धब्बे, कवकनाशी का प्रयोग करें'
        : 'Brown spots on leaves, use fungicide',
      image: 'https://images.unsplash.com/photo-1593113646773-028c64a8f1b8?w=400&h=300&fit=crop',
      icon: AlertTriangle
    },
    {
      name: language === 'hindi' ? 'जड़ सड़न रोग' : 'Root Rot Disease',
      desc: language === 'hindi'
        ? 'जड़ों का सड़ना, जल निकासी सुधारें'
        : 'Roots rotting, improve drainage',
      image: 'https://images.unsplash.com/photo-1585408643739-5ac259e969e7?w=400&h=300&fit=crop',
      icon: AlertTriangle
    },
    {
      name: language === 'hindi' ? 'पाउडरी मिल्ड्यू' : 'Powdery Mildew',
      desc: language === 'hindi'
        ? 'सफेद पाउडर जैसी परत, हवा का संचार बढ़ाएं'
        : 'White powdery coating, increase air circulation',
      image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=300&fit=crop',
      icon: AlertTriangle
    },
    {
      name: language === 'hindi' ? 'विषाणु रोग' : 'Viral Disease',
      desc: language === 'hindi'
        ? 'पत्तियों का पीलापन और मुड़ना, संक्रमित पौधे हटाएं'
        : 'Yellowing and curling of leaves, remove infected plants',
      image: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=400&h=300&fit=crop',
      icon: AlertTriangle
    }
  ];

  const tabs = [
    { id: 'soils', label: t.soilsTab, data: soilTypes },
    { id: 'erosion', label: t.erosionTab, data: erosionTypes },
    { id: 'pesticides', label: t.pesticidesTab, data: pesticides },
    { id: 'diseases', label: t.diseasesTab, data: diseases }
  ];

  const activeData = tabs.find(tab => tab.id === activeTab)?.data || [];

  return (
    <section className="mt-16 mb-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h2 className="text-2xl sm:text-3xl lg:text-4xl tracking-tight font-semibold text-stone-900 dark:text-white mb-4">
          {t.title}
        </h2>
        <p className="text-base leading-relaxed text-stone-600 dark:text-stone-300 max-w-2xl mx-auto">
          {t.subtitle}
        </p>
      </motion.div>

      <div className="flex flex-wrap justify-center gap-3 mb-8">
        {tabs.map((tab, index) => (
          <motion.button
            key={tab.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            onClick={() => setActiveTab(tab.id)}
            className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
              activeTab === tab.id
                ? 'bg-gradient-to-r from-green-600 to-green-700 text-white shadow-lg scale-105'
                : 'bg-white dark:bg-stone-800 text-stone-700 dark:text-stone-300 border border-stone-200 dark:border-stone-700 hover:border-green-600 dark:hover:border-green-500'
            }`}
          >
            {tab.label}
          </motion.button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {activeData.map((item, index) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group bg-white dark:bg-stone-800 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-stone-200 dark:border-stone-700"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                {Icon && (
                  <div className="absolute top-3 right-3 w-10 h-10 bg-white/90 dark:bg-stone-800/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg">
                    <Icon className="w-5 h-5 text-green-700 dark:text-green-500" />
                  </div>
                )}
              </div>
              <div className="p-5">
                <h3 className="text-lg font-semibold text-stone-900 dark:text-white mb-2 line-clamp-1">
                  {item.name}
                </h3>
                <p className="text-sm text-stone-600 dark:text-stone-300 line-clamp-2">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default EducationalContent;