import loader from "lib/imageLoader";
import Image from "next/image";
import mapImage from 'public/images/components/layout/landing/analysis-map.png';

const AnalysisCard = ({ title, button, image_alt }) => {
  return (
    <div className="c-analysis-card">
      <h3>{title}</h3>
      <button className="c-button -secondary">{button}</button>
      <div className="c-analysis-card-image">
        <Image loader={loader} unoptimized src={mapImage} alt={image_alt} />
      </div>
    </div>
  );
};

export default AnalysisCard;
