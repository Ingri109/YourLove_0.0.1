'use client'

import { useTranslations } from 'next-intl';
import { useState, useEffect } from 'react';
import NavigationItem from '../NavigationItem';
import { usePathname, useSearchParams } from 'next/navigation';
import LocalSwicher from "@/components/Navigation/LocalSwitcher/LocalSwitcher";


const Navigaton = ({ }) => {
  const t = useTranslations('Navigation');
  const [currentPage, setCurrentPage] = useState('');
  const pathname = usePathname()
  const searchParams = useSearchParams();

  useEffect(() => {

    const pathToPage: { [key: string]: string } = {
      '/': 'Home',
      '/yourLove': 'Your Love',
      '/events': 'Events',
      '/account': 'Account'
    };

    const url = `${pathname}${searchParams}`

    setCurrentPage(pathToPage[url] || 'Unknown');
  }, [pathname, searchParams])


  return (
    <nav className='fixed top-0 left-0 right-0 z-10'>
      <ul className='flex justify-between items-center bg-black bg-opacity-60 max-w-full h-[46px] md:h-[46px] backdrop-blur-sm'>
        <NavigationItem to='/' pageName={t('home')} currentPage={currentPage} />
        <div className='flex justify-center items-center justify-items-stretch mr-[5px] md:mr-[15px] sm:mr-[8px]'>
          <NavigationItem to="/yourLove" pageName={t('YourLove')} currentPage={currentPage} />
          <NavigationItem to="/events" pageName={t('Events')} currentPage={currentPage} />
          <LocalSwicher/>
          <NavigationItem to="/account" pageName="Account" currentPage={currentPage} />
        </div>
      </ul>
    </nav>
  );
}

export default Navigaton;