import React, { useEffect } from 'react';
import { useLocation } from "react-router-dom";
import { Button } from '@/components/ui/button';
import { FileQuestion } from 'lucide-react';

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    if (import.meta.env.DEV) {
      console.error("404 Error: User attempted to access:", location.pathname);
    }

    document.title = "404 - Page Not Found";
  }, [location.pathname]);

  return (
    <main
      role="main"
      className="min-h-screen flex items-center justify-center bg-background px-4 sm:px-6 lg:px-8"
    >
      <section
        aria-labelledby="not-found-heading"
        className="text-center max-w-md p-6 animate-fade-in"
      >
        {/* Icon */}
        <div className="mb-6 flex justify-center">
          <div className="bg-muted rounded-full p-4 shadow-md">
            <FileQuestion className="h-12 w-12 text-primary" aria-hidden="true" />
          </div>
        </div>

        {/* Heading */}
        <h1 id="not-found-heading" className="text-4xl font-bold mb-4">
          404
        </h1>

        {/* Message */}
        <p className="text-xl text-muted-foreground mb-6">
          Oops! The page you're looking for isn't in our inventory.
        </p>

        {/* Debug path (dev only) */}
        {import.meta.env.DEV && (
          <p className="text-sm text-destructive mb-4">
            Tried to access: <code>{location.pathname}</code>
          </p>
        )}

        {/* Back button */}
        <Button asChild size="lg">
          <a href="/">Return to Dashboard</a>
        </Button>
      </section>
    </main>
  );
};

export default NotFound;
