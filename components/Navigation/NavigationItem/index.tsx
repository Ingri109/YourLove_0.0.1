import Link from "next/link";
import Image from "next/image";
import AccountActivSVG from '@/assets/img/accountActiv.svg';
import AccountSVG from '@/assets/img/account.svg';
import { useState } from 'react';

const NavigationItem = ({ to, pageName, currentPage }: { to: string; pageName: string, currentPage: string }) => {
  const [isHovered, setIsHovered] = useState(false);

  const Account = currentPage === 'Account' ? AccountActivSVG : (isHovered ? AccountActivSVG : AccountSVG);
  return (
    <>
      {
        pageName === 'Account' ?
          <Link href="/account">
            <Image src={Account}
              alt={currentPage === 'Account' ? 'Active Account Icon' : 'Account Icon'}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className={`rounded-full h-[32px] w-[32px] md:h-[40px] md:w-[40px] ${currentPage === 'Account' ? 'shadow-none md:shadow-[0_0_16px_6px_rgba(0,0,0,0.4)] md:shadow-color2' : 'shadow-none delay-100 ease-out duration-200 md:hover:shadow-color2 md:shadow-[#FE8ACB] md:shadow-[0_0_12px_2px_rgba(0,0,0,0.3)] md:hover:shadow-[0_0_14px_4px_rgba(0,0,0,0.4)]'} `}></Image>
          </Link>
          :
          <li>
            <Link
              className={`flex font-Source items-center justify-center ${currentPage === pageName ? ' text-header_act ' : 'text-header'} text-[12px] py-[3px] px-[4px] mr-[8px] md:mr-[28px] md:text-[16px] transition delay-100 duration-300 relative overflow-hidden hover:text-header_act group `}
              href={to}>
              {pageName === 'Events'? 'Події': pageName}
              {currentPage === pageName ?
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-header_act rounded"></div>
                :
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-header_act origin-left rounded transform scale-x-0 transition-transform delay-100 duration-300 group-hover:scale-x-100"></div>
              }
            </Link>
          </li>
      }
    </>
  )
}
export default NavigationItem;