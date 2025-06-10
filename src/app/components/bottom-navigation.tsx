"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { BarChart2, Package, Settings, Wallet, ReceiptText } from 'lucide-react';

const BottomNavigation = () => {
  const pathname = usePathname();
  
  const navItems = [
    {
      name: 'Home',
      href: '/',
      icon: ReceiptText,
    },
    {
      name: 'Analytics',
      href: '/analytics',
      icon: BarChart2,
    },
    {
      name: 'Inventory',
      href: '/inventory',
      icon: Package,
    },
    {
      name: 'Lendings',
      href: '/lendings',
      icon: Wallet,
    },
    {
      name: 'Settings',
      href: '/settings',
      icon: Settings,
    },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-background border-t-2 ">
      <nav className="flex items-center justify-around max-w-md mx-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link 
              key={item.name}
              href={item.href}
              className="flex flex-col items-center py-2 px-3 relative"
            >
              <div className="relative">
                {isActive && (
                  <motion.div
                    layoutId="bottomNavIndicator"
                    className="absolute -top-1 -left-1 -right-1 -bottom-1 bg-primary/10 rounded-lg"
                    initial={false}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
                <item.icon 
                  size={20} 
                  className={`relative ${isActive ? 'text-primary' : 'text-muted-foreground'}`}
                />
              </div>
              <span className={`text-xs mt-1 ${isActive ? 'font-medium text-primary' : 'text-muted-foreground'}`}>
                {item.name}
              </span>
            </Link>
          );
        })}
      </nav>
      
      {/* Add space at the bottom to prevent content from being hidden behind the navigation */}
      <div className="h-safe-area-bottom" />
    </div>
  );
};

export default BottomNavigation;