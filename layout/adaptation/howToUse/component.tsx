import { useTranslation } from 'next-i18next';
import {HOW} from '../constants';
import axios from 'axios';


const HowToUseLayout = ({ data }) => {
  const { t } = useTranslation(['adaptation']);

  return (
    <div className='how_to_use'>
      <div className='adapt_container'>
        <div>
          <h2 className='mb-3'>{t(data.How_to_use.Heading)}</h2> 
          <p className='learn_p'>{t(data.How_to_use.Sub_heading)}</p>  
        </div>

        <div className='use_steps'>
          {data.How_to_use.Steps.map((step, index) => (
            <div key={index} className='steps'>
              <h4>{t(step.Step_count)}</h4>
              <p>{t(step.Title)}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};



export default HowToUseLayout;
