// global styles
import 'css/index.scss';
import type { AppProps } from 'next/app';
import MediaContextProvider from 'lib/media';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

function ClimateRiskApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <MediaContextProvider>
        <Component {...pageProps} />
      </MediaContextProvider>
    </QueryClientProvider>
  )
}

export default ClimateRiskApp
