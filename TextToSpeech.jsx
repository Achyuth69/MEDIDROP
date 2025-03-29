
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/context/LanguageContext";
import { PlayCircle, StopCircle } from "lucide-react";

const TextToSpeech = ({ text }) => {
  const [speaking, setSpeaking] = useState(false);
  const [supported, setSupported] = useState(true);
  const { toast } = useToast();
  const { currentLanguage, translate } = useLanguage();
  
  // Check if browser supports speech synthesis
  useEffect(() => {
    if (!('speechSynthesis' in window)) {
      setSupported(false);
      console.warn('Text-to-speech not supported in this browser');
    }
  }, []);

  // Stop speaking when component unmounts
  useEffect(() => {
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  // Map language codes to BCP 47 language tags used by speech synthesis
  const getVoiceLanguage = (langCode) => {
    const languageMap = {
      'en': 'en-US',
      'es': 'es-ES',
      'fr': 'fr-FR',
      'hi': 'hi-IN',
      'bn': 'bn-IN'
    };
    return languageMap[langCode] || 'en-US';
  };

  const speak = () => {
    if (!supported) {
      toast({
        title: translate("tts_not_available"),
        variant: "destructive"
      });
      return;
    }

    // Cancel any ongoing speech
    window.speechSynthesis.cancel();

    // Create a new utterance
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = getVoiceLanguage(currentLanguage);
    
    // Set voice if available
    window.speechSynthesis.onvoiceschanged = () => {
      const voices = window.speechSynthesis.getVoices();
      const voice = voices.find(voice => voice.lang.includes(getVoiceLanguage(currentLanguage)));
      if (voice) utterance.voice = voice;
    };
    
    // Start speaking
    window.speechSynthesis.speak(utterance);
    setSpeaking(true);
    
    // When speech ends
    utterance.onend = () => {
      setSpeaking(false);
    };
    
    // Error handling
    utterance.onerror = () => {
      setSpeaking(false);
      toast({
        title: "Error playing audio",
        variant: "destructive"
      });
    };
  };

  const stop = () => {
    window.speechSynthesis.cancel();
    setSpeaking(false);
  };

  if (!supported) return null;

  return (
    <Button
      variant="outline"
      size="sm"
      className="flex items-center gap-1"
      onClick={speaking ? stop : speak}
    >
      {speaking ? (
        <>
          <StopCircle className="h-4 w-4" />
          <span>{translate("stop_listening")}</span>
        </>
      ) : (
        <>
          <PlayCircle className="h-4 w-4" />
          <span>{translate("listen")}</span>
        </>
      )}
    </Button>
  );
};

export default TextToSpeech;
