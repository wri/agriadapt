import loader from "lib/imageLoader";
import Image from "next/image";
import mapImage from 'public/images/components/layout/landing/analysis-map.png';
import { useRouter } from "next/router";

const AnalysisCard = ({ title, button, image_alt }) => {
  const router = useRouter();
  return (
    <div className="c-analysis-card">
      <h3>{title}</h3>
      <button
        className="c-button -secondary relative z-10"
        onClick={() => router.push(button.url)}
      >
        {button.label}
      </button>
      <div className="c-analysis-card-image">
        <Image loader={loader} unoptimized src={mapImage} alt={image_alt} />
      </div>
    </div>
  );
};

export default AnalysisCard;
