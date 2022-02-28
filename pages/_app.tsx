// global styles
import 'css/index.scss';
import type { AppProps } from 'next/app';
import MediaContextProvider from 'lib/media';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <MediaContextProvider>
      <Component {...pageProps} />
    </MediaContextProvider>
  )
}

export default MyApp
