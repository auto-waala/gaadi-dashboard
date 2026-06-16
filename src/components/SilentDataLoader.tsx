// components/SilentDataLoader.tsx
import { useEffect } from "react";
import { useCoreData } from "@/hooks/useCoreData";

// This component renders nothing - purely for background loading
export const SilentDataLoader = () => {
  // Just call the hook - it fetches in background without UI blocks
  const { data, isLoading, error } = useCoreData();

  useEffect(() => {
    if (data) {
      console.log('✅ Core data loaded successfully in background');
    }
    if (error) {
      console.error('❌ Failed to load core data in background:', error);
    }
  }, [data, error]);

  return null; // Renders nothing
};