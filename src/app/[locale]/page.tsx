import { useTranslations } from 'next-intl';
import Link from "next/link";
import Image from 'next/image';
import Kiss from "@/assets/img/Kiss.png"

const Home = () => {
    const t = useTranslations('Index');
    return (
        <>
            <div className='flex justify-center items-center'>
                <Link href="/login" className='flex justify-center items-center px-[32px] py-[5px] bg-color4_1 bg-opacity-80 backdrop-blur text-center text-white text-[18px] rounded-xl my-[120px] md:text-[30px] md:px-[60px] md:raunded-2xl md:my-[200px] shadow-[0_3px_10px_3px_rgba(0,0,0,0.35)] transition delay-100 duration-200 ease-in hover:bg-color4_3 hover:bg-opacity-70 hover:backdrop-blur hover:scale-105 hover:shadow-[0_6px_10px_4px_rgba(0,0,0,0.4)]'>Get Start</Link>
            </div>
            <div className='flex flex-col items-center justify-center bg-color1 backdrop-blur h-[820px] w-full mb-[180px] xl:h-[980px] md:h-[1000px] sm:h-[750px]'>
                <div className='flex flex-col items-center justify-between xl:flex-row'>
                    <Image className='h-[400px] w-[360px] ml-[0px] mt-[10px] xl:h-[600px] xl:w-[500px] xl:ml-[100px] xl:mt-[20px]' src={Kiss} alt='Skrin sait'></Image>
                    <div className='mr-[20px] ml-[20px] lg:mr-[200px] lg:ml-[100px]'>
                        <h1 className=' text-color5 text-[28px] font-semibold text-center mb-[10px] text-balanc xl:mb-[25px] lg:text-[32px] lg:font-bold'>About the site</h1>
                        <p className=' text-[12px] text-white font-medium tracking-normal text-justify md:text-[18px]'>Welcome to our site, this site is for people in a relationship to make your love even stronger. The main advantage of this site is that you can kiss your virtual partner in real time, this virtual partner has no emotions or thoughts of his own, but he is directly connected to your partner, so when you do something with the VP (Virtual Partner), your partner will be able to see what you would do with him if you were nearby. You can also find out the state of your partner, whether he/she is sad, happy, sleeping or possibly sick, all this and even more you can see when you add your partner to this site. This site was created for romantic events, so that when you are at a distance you can at least somehow interact with your partner.</p>
                    </div>
                </div>
                <div className='flex items-center justify-center bg-color3 border-2 border-color4 px-[10px] py-[15px] my-[20px] mx-[30px] xl:px-[80px] xl:py-[25px] xl:mx-[400px] md:px-[40px] md:py-[20px] md:my-[60px] md:mx-[40px]'>
                    <p className='text-[10px] text-white font-medium tracking-normal text-center mx-[10px] md:text-[18px] md:mx-[40px]'>
                        The site is under development, so there may be bugs or malfunctions on the site, if you find any errors on the site, please contact the
                        <span className='text-[12px] text-color4 font-bold tracking-normal md:text-[20px]'> Support Service</span>. Also, please contact the
                        <span className='text-[12px] text-color4 font-bold tracking-normal md:text-[20px]'> Support Service </span>if you have any questions or requests, we will try to listen to everyone.
                    </p>
                </div>
            </div>
        </>
    );
}

export default Home;
