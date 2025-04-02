
import React from 'react';
import { BarChart3, Search, Settings } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { ThemeToggle } from '../theme/theme-toggle';

const Header = () => {
  return (
    <header className="border-b border-border bg-card sticky top-0 z-30 shadow-sm">
      <div className="container flex h-16 items-center justify-between px-4 max-w-7xl mx-auto">
        <div className="flex items-center gap-3">
          <BarChart3 className="h-6 w-6 text-accent" />
          <h1 className="text-xl font-bold tracking-tight">Retail Insights Explorer</h1>
        </div>
        
        <div className="hidden md:flex items-center gap-4 flex-1 max-w-md mx-6">
          <div className="relative w-full">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search items or rules..."
              className="w-full pl-8 bg-background/80"
            />
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Settings className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 shadow-md">
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Help</DropdownMenuItem>
              <DropdownMenuItem>About</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default Header;
