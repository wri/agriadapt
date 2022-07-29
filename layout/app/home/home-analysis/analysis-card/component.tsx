import loader from 'lib/imageLoader';
import Image from 'next/image';
import mapImage from 'public/images/components/layout/landing/analysis-map.png';
import Link from 'next/link';

const AnalysisCard = ({ title, button, image_alt }) => {
  return (
    <div className="c-analysis-card">
      <h3>{title}</h3>
      <Link href={button.url}>
        <a className="c-button -secondary relative z-10">{button.label}</a>
      </Link>
      <div className="c-analysis-card-image">
        <Image loader={loader} unoptimized src={mapImage} alt={image_alt} />
      </div>
    </div>
  );
};

export default AnalysisCard;
