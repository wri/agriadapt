// global styles
import 'css/index.scss';
import type { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from 'react-query';
import { appWithTranslation } from 'next-i18next';

//lib
import { wrapper } from 'lib/store';
import MediaContextProvider from "lib/media";
// import MaintenancePage from './maintenance';

import DeprecationBanner from 'components/deprecation-banner/DeprecationBanner';

const queryClient = new QueryClient();

function AgriAdaptApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <MediaContextProvider>
        <DeprecationBanner>
          Thank you for visting Agriadapt. This site is no longer being updated and will be archived in the coming months.
          <br/>See <a href="https://www.wri.org/data/data-applications/" target="_blank" rel="noreferrer">WRI's Applications Portfolio</a> or visit the <a href="https://datasets.wri.org/" target="_blank" rel="noreferrer">Data Explorer</a> to browse WRI data.
        </DeprecationBanner>
        <Component {...pageProps} />
        {/* <MaintenancePage /> */}
      </MediaContextProvider>
    </QueryClientProvider>
  );
}

export default wrapper.withRedux(appWithTranslation(AgriAdaptApp));
