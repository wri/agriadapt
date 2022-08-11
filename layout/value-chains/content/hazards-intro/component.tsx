import { useTranslation } from 'next-i18next';

const HazardsIntro = ({ crop }: { crop: 'coffee' | 'cotton' | 'rice' }) => {
  const { t } = useTranslation(crop);
  return (
    <div className="c-hazards-intro">
      <h2>{t('climate_hazard.title')}</h2>
      <p>{t('climate_hazard.description')}</p>
    </div>
  );
};

export default HazardsIntro;
