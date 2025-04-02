
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import Header from './Header';
import Sidebar from './Sidebar';
import { Toaster } from '@/components/ui/toaster';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar collapsed={collapsed} onToggle={toggleSidebar} />
        <main className={cn(
          "flex-1 overflow-y-auto transition-all duration-300 p-6",
          collapsed ? "ml-16" : "ml-64"
        )}>
          <div className="container mx-auto max-w-7xl">
            {children}
          </div>
        </main>
      </div>
      <Toaster />
    </div>
  );
};

export default Layout;
