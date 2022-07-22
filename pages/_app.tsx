// global styles
import "css/index.scss";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "react-query";

//lib
import { wrapper } from 'lib/store';
import MediaContextProvider from "lib/media";

const queryClient = new QueryClient();

function ClimateRiskApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <MediaContextProvider>
        <Component {...pageProps} />
      </MediaContextProvider>
    </QueryClientProvider>
  );
}

// export default ClimateRiskApp;
export default wrapper.withRedux(ClimateRiskApp);
