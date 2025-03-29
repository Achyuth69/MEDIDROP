import React, { createContext, useState, useContext, useEffect } from 'react';

// Available languages
export const languages = [
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Español' },
  { code: 'fr', name: 'Français' },
  { code: 'hi', name: 'हिन्दी' },
  { code: 'bn', name: 'বাংলা' }
];

// Create the language context
const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [translations, setTranslations] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  // Load translations based on the current language
  useEffect(() => {
    const loadTranslations = async () => {
      setIsLoading(true);
      try {
        // Dynamic import of the translation file
        const translationModule = await import(`../translations/${currentLanguage}.js`);
        setTranslations(translationModule.default);
      } catch (error) {
        console.error('Failed to load translations:', error);
        // Fallback to English if translation file fails to load
        if (currentLanguage !== 'en') {
          const fallbackModule = await import('../translations/en.js');
          setTranslations(fallbackModule.default);
        }
      }
      setIsLoading(false);
    };

    loadTranslations();
  }, [currentLanguage]);

  // Function to change the language
  const changeLanguage = (languageCode) => {
    if (languages.some(lang => lang.code === languageCode)) {
      setCurrentLanguage(languageCode);
      // Store language preference in localStorage
      localStorage.setItem('preferredLanguage', languageCode);
    }
  };

  // Function to translate text
  const translate = (key) => {
    if (!translations || isLoading) return key;
    return translations[key] || key; // Return the key if translation is not found
  };

  // On initial load, check if there's a preferred language in localStorage
  useEffect(() => {
    const savedLanguage = localStorage.getItem('preferredLanguage');
    if (savedLanguage && languages.some(lang => lang.code === savedLanguage)) {
      setCurrentLanguage(savedLanguage);
    }
  }, []);

  return (
    <LanguageContext.Provider value={{ 
      currentLanguage, 
      changeLanguage, 
      translate, 
      isLoading,
      languages 
    }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Custom hook to use the language context
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
