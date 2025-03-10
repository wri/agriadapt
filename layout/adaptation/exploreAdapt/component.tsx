import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import Image from 'next/image';
import axios from 'axios';

const ExploreAdapt = ({ data, error }) => {
  const { t } = useTranslation(['adaptation']);

  if (error) {
    return <div>{t('Failed to load data')}</div>; 
  }

  // Check if the necessary data exists
  const exploreAdaptData = data?.Explore_adaptation;
  const cropAdaptations = exploreAdaptData?.explore_crop_adaptions || [];

  return (
    <div className="explore_adapt">
      <div className="adapt_container">
        <h2>{t(exploreAdaptData.Title)}</h2>
        <p className="explore_p">{t(exploreAdaptData.Sub_title)}</p>

        <div className="d-flex explore_flex">
          {cropAdaptations.length > 0 ? (
            cropAdaptations.map((crop) => (
              // eslint-disable-next-line react/jsx-key
              <Link href={`/adaptations/${crop.slug}`} scroll={true}>
                <a key={crop.slug}>
              <div className="explore_card me-3">
                <Image
                  loader={({ src }) => src}
                  src={crop.card_image?.url}
                  alt={`${t(crop.name)} image`}
                  width={200}
                  height={200}
                />
                <div className="d-flex mt-4 justify-content-between align-items-center">
                  <h3>{t(crop.Title)}</h3>
                 
                    <div className="explore_link">Learn More</div>
                
                </div>
              </div>
              </a>
              </Link>
            ))
          ) : (
            <p>{t('No crops available')}</p> // Fallback message if no crops
          )}
        </div>
      </div>
    </div>
  );
};



export default ExploreAdapt;
