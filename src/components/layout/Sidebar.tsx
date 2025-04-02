
import React from 'react';
import { Link } from 'react-router-dom';
import { Home, BarChart3, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';

const sidebarItems = [
  {
    title: 'Dashboard',
    icon: Home,
    path: '/',
    active: true
  },
];

type SidebarProps = {
  collapsed?: boolean;
  onToggle?: () => void;
};

const Sidebar = ({ collapsed = false, onToggle }: SidebarProps) => {
  return (
    <div className={cn(
      "sidebar h-screen bg-sidebar text-sidebar-foreground flex flex-col fixed left-0 top-0 z-40 transition-all duration-300 shadow-md",
      collapsed ? "w-16" : "w-64"
    )}>
      <div className="p-4 flex items-center justify-between">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-accent" />
            <span className="font-bold text-lg">RetailInsights</span>
          </div>
        )}
        {collapsed && (
          <BarChart3 className="h-5 w-5 text-accent mx-auto" />
        )}
      </div>

      <Separator className="bg-sidebar-border" />

      <div className="flex-1 py-4 overflow-y-auto">
        <nav className="space-y-1.5 px-3">
          {sidebarItems.map((item) => (
            <Link to={item.path} key={item.title}>
              <Button 
                variant={item.active ? "secondary" : "ghost"} 
                className={cn(
                  "w-full justify-start",
                  item.active ? "bg-sidebar-accent text-sidebar-accent-foreground" : "hover:bg-sidebar-accent/50"
                )}>
                <item.icon className={cn("h-4 w-4", collapsed ? "mx-auto" : "mr-3")} />
                {!collapsed && <span>{item.title}</span>}
              </Button>
            </Link>
          ))}
        </nav>
      </div>

      <div className="p-4 mt-auto">
        <Button variant="ghost" className="w-full justify-start" onClick={onToggle}>
          <Settings className={cn("h-4 w-4", collapsed ? "mx-auto" : "mr-3")} />
          {!collapsed && <span>Toggle Sidebar</span>}
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;
