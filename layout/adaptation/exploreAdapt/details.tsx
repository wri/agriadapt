import { useState } from 'react';
import Layout from 'layout/layout/layout-app';
import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import filter from '../../../public/images/adaptation/filter.svg';
import Cross from '../../../public/images/adaptation/cross_btn.svg';
import inputimage from '../../../public/images/adaptation/close_input.svg';
import Blob from '../../../public/images/components/layout/intro-header/about/intro-about-blob.svg';

// Import JSON data
import tabsDataRiceInput from '../../../public/locales/en/input-and-production.json';
import tabsDataCottonInput from '../../../public/locales/en/inputCotton.json';
import tabsDataRicestorage from '../../../public/locales/en/storageRice.json';
import tabsDataCottonStorage from '../../../public/locales/en/storageCotton.json';
import tabsDataRiceTransport from '../../../public/locales/en/transportRice.json';
import tabsDataCottonTransport from '../../../public/locales/en/transportCotton.json';

const LayoutAdapt = () => {
  const router = useRouter();
  const { slug } = router.query;

  console.log('Router query:', router.query);
  console.log('Slug:', slug);

  // Function to get hazard data based on slug
  const getDataHazard = (slug: string | string[] | undefined) => {
    if (!slug) return [];

    if (Array.isArray(slug)) {
      slug = slug.join('/'); 
    }

    switch (slug) {
      case 'rice/input-and-production':
        return tabsDataRiceInput;
      case 'cotton/input-and-production':
        return tabsDataCottonInput;
      case 'rice/storage-and-processing':
        return tabsDataRicestorage;
      case 'cotton/storage-and-processing':
        return tabsDataCottonStorage;
      case 'rice/transport-trade-and-sales':
        return tabsDataRiceTransport;
      case 'cotton/transport-trade-and-sales':
        return tabsDataCottonTransport;
      default:
        return [];
    }
  };

  // Fetch hazard data
  const dataHazard = getDataHazard(slug);

  const { t } = useTranslation(slug);
  const [activeTabs, setActiveTabs] = useState<boolean[]>(Array(dataHazard.length).fill(false));
  const [showTabs, setShowTabs] = useState(false);

  const handleFilterClick = () => setShowTabs(true);
  const handleTabClick = (index: number) => {
    const newActiveTabs = [...activeTabs];
    newActiveTabs[index] = !newActiveTabs[index];
    setActiveTabs(newActiveTabs);
  };

  const handleImageClick = (e: React.MouseEvent<HTMLImageElement>, index: number) => {
    e.stopPropagation();
    const newActiveTabs = [...activeTabs];
    newActiveTabs[index] = false;
    setActiveTabs(newActiveTabs);
  };

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollToNext = () => {
    const bannerDiv = document.querySelector('.chevron_next_div');
    if (bannerDiv) {
      const nextSection = bannerDiv.nextElementSibling;
      if (nextSection) {
        nextSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };



  return (
    <Layout>
      <div className='l-container'>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb my-2">
            <li className="breadcrumb-item"><Link href="../../../adaptations"><a>Adaptations resources</a></Link></li>
            <li className="breadcrumb-item"><Link href={`/adaptations/${slug[0]}`}><a>{slug[0]}</a></Link></li>
            <li className="breadcrumb-item active" aria-current="page">{slug[1]}</li>
          </ol>
        </nav>
      </div>

      <div className="adaptation_intro chevron_next_div">
        <div className="l-about">
          <div className="c-intro-header">
            <div
              className={`chevron_btn ${scrolled ? "scrolled" : ""}`}
              onClick={handleScrollToNext}
            >
              <div className='scroll_btn'>Scroll down</div>
            </div>
            <div className="visual-container -right">
              <div className="image-container -adaptation">
                <Image
                  alt="image"
                  loader={({ src }) => src}
                  src={dataHazard[0].intro.banner_image}
                  width={590}
                  height={723}
                  className="image"
                />
              </div>
              <div className="blob-container">
                <Image
                  alt="blob"
                  loader={({ src }) => src}
                  src={Blob}
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
                      <h2>{dataHazard[0].intro.title}</h2>
                      {dataHazard[0].intro.description.map((desc, index) => (
                        <p key={index} dangerouslySetInnerHTML={{ __html: desc }} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


      <div className='input_weather'>
        <div className='input_container'>
          <div>
            <div className='d-flex justify-content-between'>
              <h3>Choose a climate hazard</h3>
              <div className='filter_image d-md-none d-block' onClick={handleFilterClick}>
                <Image loader={({ src }) => src} src={filter} alt='Tick Icon' width={16} height={16} />
              </div>
            </div>
            <div className={`weather_tabs d-flex mb-md-5 ${showTabs ? 'show' : ''}`}>
              <div className='resp_card d-flex justify-content-between pb-3 mb-4 d-md-none'>
                <h5>Filter</h5>
                <Image loader={({ src }) => src} className='cross_btn' src={Cross} alt='Close Icon' width={24} height={24} onClick={() => setShowTabs(false)} />
              </div>
              <span className='d-flex flex-wrap main_blog_span'>
                {dataHazard.map((tab, index) => (
                  <span key={tab.id} className={`blog_span ${activeTabs[index] ? 'active-tab' : ''}`} onClick={() => handleTabClick(index)}>
                    {tab.label}
                    {activeTabs[index] && (
                      <Image loader={({ src }) => src} src={inputimage} alt='Close Input' width={24} height={24} className='image-visible' onClick={(e) => handleImageClick(e, index)} />
                    )}
                  </span>
                ))}
              </span>
            </div>
          </div>
          <div className='blog_weather'>
            {dataHazard.map(
              (tab, index) =>
                activeTabs[index] && (
                  <div key={tab.id} id={tab.id} className='blogs_input'>
                    <h2>{tab.label}</h2>
                    <p>{tab.content}</p>
                    {tab.blogs.map((blog) => (
                      <div key={blog.id} className='blog_card mb-3'>
                        <h3>{blog.title}</h3>
                        <div className='d-flex align-items-center loc_tic_div'>
                          {blog.tags.map((tag, idx) => (
                            <div key={idx} className='d-flex align-items-center mb-0 tick_div'>
                              <Image loader={({ src }) => src} src={tag.icon} alt={tag.label} width={20} height={20} />
                              <span className='ms-1'>{tag.label}</span>
                            </div>
                          ))}
                        </div>
                        <div className='link_tabs d-flex align-items-center'>
                          {blog.links.map((link, idx) => (
                            <Link key={idx} href={link.href}>
                              <a className='d-flex align-items-center link_div'>
                                <Image loader={({ src }) => src} src={link.icon} alt={link.label} width={20} height={20} />
                                <span>{link.label}</span>
                              </a>
                            </Link>
                          ))}
                        </div>

                        {blog.journal && blog.journal.href && (
                          <div className='globe_link'>
                            <Link href={blog.journal.href}>
                              <a className='d-flex align-items-center'>
                                <Image loader={({ src }) => src} src={blog.journal.icon} alt='Journal Icon' width={20} height={20} />
                                <span>{blog.journal.label}</span>
                                <Image loader={({ src }) => src} src={blog.journal.sendIcon} alt='Send Icon' width={16} height={16} />
                              </a>
                            </Link>
                          </div>
                        )}


                      </div>
                    ))}
                  </div>
                )
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default LayoutAdapt;
