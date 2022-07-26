import { capitalizeFirstLetter } from 'utils/utils';

const HazardsIntro = ({ crop }: { crop: 'coffee' | 'cotton' | 'rice' }) => {
  return (
    <div className="c-hazards-intro">
      <h2>{`How do Climate Hazards Affect the ${capitalizeFirstLetter(crop)} Value Chain?`}</h2>
      <p>
        The production of {capitalizeFirstLetter(crop)} is affected by different
        climate hazards along its value chain. Click on the buttons below to
        find out more about how these hazards affect the growth of{' '}
        {capitalizeFirstLetter(crop)} through our data:
      </p>
    </div>
  );
};

export default HazardsIntro;
