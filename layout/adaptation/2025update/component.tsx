import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import Image from 'next/image';
import axios from 'axios';

const update = ({ data, error }) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { t } = useTranslation(['adaptation']);

  if (error) {
    return <div>{t('Failed to load data')}</div>; // Show an error message if something went wrong
  }

  

  return (
    <div className="update2025">
      <div className="adapt_container">
        <h2>{t(data.Year_update.Title)}</h2>
           
            <p className="explore_p" dangerouslySetInnerHTML={{ __html: t(data.Year_update.Description).replace(/\n/g, '<br>') }}></p>


      </div>
    </div>
  );
};



export default update;
