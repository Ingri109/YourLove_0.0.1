import Link from "next/link";
import Image from "next/image";
import AccountActivSVG from '@/assets/img/accountActiv.svg';
import AccountSVG from '@/assets/img/account.svg';

 const  NavigationItem = ({ to, pageName, currentPage }: { to: string; pageName: string, currentPage: string}) => {
  return (
    <>
      {
        pageName === 'Account' ?
          <Link href="/account">
            <Image src={currentPage === 'Account' ? AccountActivSVG : AccountSVG} alt={currentPage === 'Account' ? 'Active Account Icon' : 'Account Icon'} className={`rounded-full h-[24px] w-[24px] md:h-[40px] md:w-[40px] ${currentPage === 'Account' ? 'shadow-[0_2px_15px_3px_rgba(0,0,0,0.3)] shadow-color2' : 'hover:shadow-[0_2px_15px_3px_rgba(0,0,0,0.3)] delay-200 ease-out duration-300 hover:shadow-color2'} `}></Image>
          </Link>
          :
          <li>
            <Link
              className={`flex font-Source items-center justify-center ${currentPage === pageName ? ' text-header_act ' : 'text-header'} text-[8px] py-[3px] px-[4px] ml-[8px] md:ml-[30px] md:text-[16px] transition delay-100 duration-300 relative overflow-hidden hover:text-header_act group `}
              href={to}>
              {pageName}
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