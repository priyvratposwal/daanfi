import React, { useState, useEffect } from 'react';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';

interface NavItem {
  label: string;
  href: string;
}

interface NavbarProps {
  logo?: React.ReactNode;
  logoText?: string;
  navItems?: NavItem[];
  className?: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  logo,
  logoText = "Daanfi",
  navItems = [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Contact", href: "#contact" }
  ],
  className = ""
}) => {
  const [activeItem, setActiveItem] = useState("Home");
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll to section
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, item: NavItem) => {
    e.preventDefault();
    setActiveItem(item.label);
    
    const targetId = item.href.replace('#', '');
    const targetElement = document.getElementById(targetId);
    
    if (targetElement) {
      // If it's Home, scroll to top
      if (item.label === "home") {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      } else {
        // Scroll to the specific section
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    }
  };

  // Update active section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      // Check if scrolled from top
      setIsScrolled(window.scrollY > 50);

      // Update active nav item based on scroll position
      const sections = navItems.map(item => ({
        id: item.href.replace('#', ''),
        label: item.label
      }));

      const currentSection = sections.find(section => {
        const element = document.getElementById(section.id);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });

      if (currentSection) {
        setActiveItem(currentSection.label);
      } else if (window.scrollY < 100) {
        setActiveItem("Home");
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [navItems]);

  return (
    <nav className={`bg-white border-b border-gray-200 sticky top-0 z-50 ${className} ${
      isScrolled ? 'shadow-sm' : ''
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-16 relative">
          {/* Logo - Click to go home */}
          <div className="flex items-center space-x-2 flex-shrink-0">
            <a 
              href="#home" 
              onClick={(e) => handleNavClick(e, { label: "Home", href: "#home" })}
              className="flex items-center space-x-2 no-underline"
            >
              {logo ? (
                logo
              ) : (
                <div className="w-8 h-8 bg-emerald-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">D</span>
                </div>
              )}
              <span className="text-xl font-semibold text-gray-800">{logoText}</span>
            </a>
          </div>

          {/* Desktop/Tablet Navigation - Centered */}
          <div className="hidden sm:flex items-center absolute left-1/2 transform -translate-x-1/2">
            {navItems.map((item, index) => (  
              <React.Fragment key={item.label}>
                <a
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item)}
                  className={`text-sm font-medium transition-colors relative pb-1 whitespace-nowrap px-2 ${
                    activeItem === item.label
                      ? "text-gray-900"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  {item.label}
                  {activeItem === item.label && (
                    <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-gray-900"></span>
                  )}
                </a>
                {index < navItems.length - 1 && (
                  <span className="text-gray-400 mx-2">-</span>
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="sm:hidden ml-auto">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-64">
                <div className="flex flex-col space-y-4 mt-8">
                  {navItems.map((item) => (
                    <a
                      key={item.label}
                      href={item.href}
                      onClick={(e) => handleNavClick(e, item)}
                      className={`text-base font-medium transition-colors px-4 py-2 rounded-md ${
                        activeItem === item.label
                          ? "bg-gray-100 text-gray-900"
                          : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                      }`}
                    >
                      {item.label}
                    </a>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};