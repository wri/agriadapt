import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { CROPS } from '../constants';
import Layout from 'layout/layout/layout-app';
import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import Link from 'next/link';
import cropBlob from 'public/images/components/layout/intro-header/landing/intro-landing-blob.svg';
import inputImage1 from 'public/images/adaptation/input1.svg';
import inputImage2 from 'public/images/adaptation/input2.svg';
import inputImage3 from 'public/images/adaptation/input3.svg';


const CropDetails = ({ data }) => {

  const { t } = useTranslation(); // Using the translation hook
  const router = useRouter();
  const { slug } = router.query;
  const [cropData, setCropData] = useState<any>(null);

  useEffect(() => {
    if (slug) {
      const data =
        CROPS[slug as string] || {
          name: 'adaptation:notFound.name',
          description: 'adaptation:notFound.description',
          inputCards: [],
        };
      setCropData(data);
    }
  }, [slug]);

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100); // Add class after 100px scroll
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScrollToNext = () => {
    const bannerDiv = document.querySelector(".chevron_next_div");
    if (bannerDiv) {
      const nextSection = bannerDiv.nextElementSibling;
      if (nextSection) {
        nextSection.scrollIntoView({ behavior: "smooth" });
      }
    }
  };
  return (
    <Layout>



      <div className='chevron_next_div'>
        {data && data.length > 0 ? (
          data.map((crop) => (
            <div key={crop.id}>

              {crop.slug === 'rice' && (
                <div className='l-container'>
                  <nav aria-label="breadcrumb">
                    <ol className="breadcrumb my-2">
                      <li className="breadcrumb-item"><Link href="../../../adaptations"><a>Adaptations resources</a></Link></li>
                      <li className="breadcrumb-item active" aria-current="page">rice</li>
                    </ol>
                  </nav>
                </div>

              )}
              {crop.slug === 'cotton' && (
                <div className='l-container'>
                  <nav aria-label="breadcrumb">
                    <ol className="breadcrumb my-2">
                      <li className="breadcrumb-item"><Link href="../../../adaptations"><a>Adaptations resources</a></Link></li>
                      <li className="breadcrumb-item active" aria-current="page">cotton</li>
                    </ol>
                  </nav>
                </div>
              )}

              <div className="l-about crop_slug_banner crop_intro">

                <div>
                  <div className="c-intro-header">
                    <div
                      className={`chevron_btn ${scrolled ? "scrolled" : ""}`}
                      onClick={handleScrollToNext}
                    >
                      <div className='scroll_btn'>Scroll down</div>
                    </div>
                    <div className="visual-container">
                      <div className="image-container -adaptation">
                        <Image
                          alt={t(data.Title)}
                          loader={({ src }) => src}
                          src={crop.Banner_image.url}

                          width={590}
                          height={723}
                          className="image"
                        />
                      </div>
                      <div className="blob-container">
                        {crop.card_image && (
                          <Image
                            src={cropBlob}
                            alt={crop.card_image.alternativeText || "Card Image"}
                            loader={({ src }) => src} width={720}
                            height={624}
                          />
                        )}
                      </div>
                    </div>
                    <div className="c-content">
                      <div className="l-container">
                        <div className="row">
                          <div className="column small-12">
                            <div className="info-container -adaptation -right">
                              <h2>{crop.Title} </h2>
                              <h3>{crop.Sub_heading}</h3>
                              <p className="description" dangerouslySetInnerHTML={{ __html: t(crop.Description).replace(/\n/g, '<br>') }}></p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No data available</p>
        )}
      </div>


      <div className="explore_crop">
        <div className="l-container">
          {data && data.length > 0 ? (
            data.map((crop) => (
              <div key={crop.id}>
                <h2>{crop.explore_sub_heading}</h2>

              </div>
            ))
          ) : (
            <p>No data available</p>
          )}



          <div className="row input_row">
            {cropData?.inputCards?.length > 0 ? (
              cropData.inputCards.map((card: any, index: number) => (
                <div className='col-md-4 p-0' key={index}>
                  <Link href={t(card.link)}>
                    <a>
                      <div className="input_cards d-flex flex-column justify-content-between">
                        <div>
                          <Image
                            loader={({ src }) => src}
                            src={card.image}
                            alt={`input_image_${index}`}
                            width={40}
                            height={40}
                          />
                          <h3>{t(card.title)}</h3>
                          <p>{t(card.despcription)}</p>
                        </div>
                        <div className='view_a'>View Resources</div>
                      </div>
                    </a>
                  </Link>
                </div>
              ))
            ) : (
              <p>No input cards available</p>
            )}

          </div>

        </div>
      </div>
    </Layout>
  );
};

export default CropDetails;

