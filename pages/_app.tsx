// global styles
import "css/index.scss";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "react-query";
import { appWithTranslation } from 'next-i18next';

//lib
import { wrapper } from 'lib/store';
import MediaContextProvider from "lib/media";

const queryClient = new QueryClient();

function AgriAdaptApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <MediaContextProvider>
        <Component {...pageProps} />
      </MediaContextProvider>
    </QueryClientProvider>
  );
}

export default wrapper.withRedux(appWithTranslation(AgriAdaptApp));
