'use client'

import { useState, useEffect } from 'react';
import NavigationItem from '../NavigationItem';
import { usePathname, useSearchParams } from 'next/navigation'



const Navigaton = ({}) => {
  const [currentPage, setCurrentPage] = useState('');
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {

    const pathToPage: { [key: string]: string} = {
      '/': 'Home',
      '/yourLove': 'Your Love',
      '/chat': 'Chat',
      '/events': 'Events',
      '/account': 'Account'
    };

    const url = `${pathname}${searchParams}`

    setCurrentPage(pathToPage[url] || 'Unknown');
  }, [pathname, searchParams])

  const handleLinkClick = (pageName: string) => {

    setCurrentPage(pageName);
  };
  
  return (
    <nav className='fixed top-0 left-0 right-0 z-10'>
      <ul className='flex justify-between items-center bg-black bg-opacity-60 h-[30px] md:h-[46px] backdrop-blur-sm'>
        <NavigationItem to='/' pageName="Home" currentPage={currentPage} onClick={handleLinkClick} />
        <div className='flex justify-end items-center space-x-2 mr-[5px] md:space-x-6 md:mr-[15px] sm:mr-[8px]'>
          <NavigationItem to="/yourLove" pageName="Your Love" currentPage={currentPage} onClick={handleLinkClick} />
          <NavigationItem to="/chat" pageName="Chat" currentPage={currentPage} onClick={handleLinkClick} />
          <NavigationItem to="/events" pageName="Events" currentPage={currentPage} onClick={handleLinkClick} />
          <NavigationItem to="/account" pageName="Account" currentPage={currentPage} onClick={handleLinkClick} />
        </div>
      </ul>
    </nav>
  );
}

export default Navigaton;