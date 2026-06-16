// components/AppInitializer.tsx
import { useEffect } from "react";
import { useCoreData } from "@/hooks/useCoreData";
import { Loader2 } from "lucide-react";

interface AppInitializerProps {
  children: React.ReactNode;
}

export const AppInitializer = ({ children }: AppInitializerProps) => {
  const { data, isLoading, error, refetch } = useCoreData();

  useEffect(() => {
    // Optional: Prefetch critical data that might be needed
    if (data) {
      console.log('Core data loaded successfully');
    }
  }, [data]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto" />
          <p className="mt-4 text-muted-foreground">Loading application...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center max-w-md mx-auto p-6">
          <div className="text-red-500 text-lg mb-4">Failed to load core data</div>
          <p className="text-muted-foreground mb-4">
            There was an error loading the application data. Please check your connection.
          </p>
          <button
            onClick={() => refetch()}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};