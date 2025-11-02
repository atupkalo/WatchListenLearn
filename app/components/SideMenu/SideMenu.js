'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { useState } from 'react';
import "./SideMenu.scss";

const menuItems = [
  { label: 'Lessons', path: '/pages/lessons', icon: 'lessons' },
  { label: 'Vocabulary', path: '/pages/words', icon: 'words' },
  { label: 'Grammar', path: '/pages/grammar', icon: 'grammar' },
  { label: 'Pronunciation', path: '/pages/pronunc', icon: 'pronunc' },
  { label: 'Dashboard', path: '/pages/dashboard', icon: 'dashboard' },
];

export default function SideMenu() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const renderMenuItems = () =>
    menuItems.map((item) => {
      const isActive =
        pathname === item.path || (pathname === '/' && item.path === '/pages/lessons');
      return (
        <li className="menu-item-wrap" key={item.path}>
          <Image
            src={`/icons/${item.icon}${isActive ? '-a' : ''}.svg`}
            alt={item.label}
            width={32}
            height={32}
          />
          <Link
            className={`menu-item ${isActive ? 'menu-item-active' : ''}`}
            href={item.path}
          >
            {item.label}
          </Link>
        </li>
      );
    });

  return (
    <>
      {/* Desktop menu */}
      <div className="side-menu desktop">
        <ul className="menu">{renderMenuItems()}</ul>
      </div>

      {/* Mobile menu toggle button */}


      {/* Mobile menu */}
      <div className={`side-menu mobile ${isMobileMenuOpen ? 'show' : ''}`}>
        <div className="mobile-close" onClick={() => setIsMobileMenuOpen(false)}>
          <Image src="/icons/close.svg" alt="close icon" width={24} height={24} />
        </div>
      {!isMobileMenuOpen && (
        <div className="mobile-open" onClick={() => setIsMobileMenuOpen(true)}>
          <Image src="/icons/open.svg" alt="open icon" width={24} height={24} />
        </div>
      )}
        <ul className="menu">{renderMenuItems()}</ul>
      </div>
    </>
  );
}
