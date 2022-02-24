import wrapper from 'lib/store';
import 'styles/globals.css'
import { FC } from 'react';
import { AppProps } from 'next/app';
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query';

// global styles
import 'css/index.scss';
import MediaContextProvider from 'lib/media';
import {
  Provider as AuthenticationProvider,
} from 'next-auth/client';

const queryClient = new QueryClient();

const MyApp: FC<AppProps> = ({
  Component,
  pageProps
}: AppProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      <MediaContextProvider>
        <Hydrate state={pageProps.dehydratedState}>
          <AuthenticationProvider
            session={pageProps.session}
            options={{
              clientMaxAge: 5 * 60, // Re-fetch session if cache is older than 60 seconds
              keepAlive: 10 * 60, // Send keepAlive message every 10 minutes
            }}
          >
            <Component {...pageProps} />
          </AuthenticationProvider>
        </Hydrate>
      </MediaContextProvider>
    </QueryClientProvider>
  );
};

export default wrapper.withRedux(MyApp);