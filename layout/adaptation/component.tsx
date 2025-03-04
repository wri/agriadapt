import { useEffect, useState } from 'react';
import Layout from 'layout/layout/layout-app';
import MethodologyLayout from './methodology/component';
import HowToUseLayout from './howToUse/component';
import ExploreAdapt from './exploreAdapt/component';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';
import Update from './2025update/component';
import adaptBlob from 'public/images/adaptation/adapt-vector.png';
import adaptImage from 'public/images/adaptation/banner_images/banner_adapt.png';


const LayoutAdapt = ({ data, error }) => {
   const { t } = useTranslation(['adaptation']);
   const [isScrolled, setIsScrolled] = useState(false);

   const handleScroll = () => {
     const bannerDiv = document.querySelector('.chevron_next_div');
     if (bannerDiv) {
       const nextSection = bannerDiv.nextElementSibling;
       if (nextSection) {
         nextSection.scrollIntoView({ behavior: 'smooth' });
       }
     }
   };

   useEffect(() => {
     const handleWindowScroll = () => {
       const scrolled = window.scrollY > 100;  // Change this value to adjust when the class is added
       setIsScrolled(scrolled);
     };

     window.addEventListener('scroll', handleWindowScroll);

     return () => {
       window.removeEventListener('scroll', handleWindowScroll);
     };
   }, []);

   return (
     <Layout>
       <div className="adaptation_intro chevron_next_div ">
         <div className="l-about">
           <div className="c-intro-header">
             <div className={`chevron_btn ${isScrolled ? 'scrolled' : ''}`} onClick={handleScroll}>
              <div className='scroll_btn'>Scroll down</div>
             </div>
             <div className="visual-container -right">
               <div className="image-container -adaptation">
                 <Image
                   alt="banner"
                   loader={({ src }) => src}
                   src={adaptImage}
                   width={590}
                   height={723}
                   className="image"
                 />
               </div>
               <div className="blob-container">
                 <Image
                   alt="blob"
                   loader={({ src }) => src}
                   src={adaptBlob} 
                   width={800}
                   height={790}
                   className="image"
                 />
               </div>
             </div>
             <div className="c-content">
               <div className="l-container">
                 <div className="row">
                   <div className="column small-12">
                     <div className="info-container -adaptation">
                       <h2>{t(data.Seo_details.Meta_title)} </h2>
                       <p className="description">{t(data.Seo_details.Meta_description)} </p>
                     </div>
                   </div>
                 </div>
               </div>
             </div>
           </div>
         </div>
       </div>

       <MethodologyLayout data={data} />
       <HowToUseLayout data={data} />
       <ExploreAdapt data={data} error={error} />
       <Update data={data} error={error} />

     </Layout>
   );
};



export default LayoutAdapt;
