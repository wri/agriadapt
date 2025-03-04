import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import axios from 'axios';
import { METHODOLOGY } from '../constants';

const MethodologyLayout = ({ data }) => {
  const { t } = useTranslation(['adaptation']);

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div className="methodology">
      <div className="adapt_container">
        <h2 className="mb-3">{t(data.Methodology.Main_title)}</h2>
        <p dangerouslySetInnerHTML={{ __html: t(data.Methodology.Description).replace(/\n/g, '<br>') }}></p>
        <div className="note_card">
          <h5 className="mb-1">{t(data.Methodology.Please_note_text)}</h5>
          <p>{t(data.Methodology.Note_text)}</p>
        </div>
        {/* <p>{t(data.Methodology.Description)}</p> */}

        {/* <div className="col-md-6 method_right_pad">
            <Image 
              loader={({ src }) => src} 
              src={`http://terra-web.irepo.in:5058${data.Methodology.Image?.url}`}
              alt={t(data.Methodology.Main_title)} 
              width={478} 
              height={315} 
            /> 
            <p className="method_p">{t(data.Methodology.Image_description)}</p>
          </div> */}
       
      </div>
    </div>
  );
};



export default MethodologyLayout;
