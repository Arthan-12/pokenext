import '../styles/globals.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';

import type { AppProps } from 'next/app';
import { SSRProvider } from 'react-bootstrap';

config.autoAddCss = false;

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SSRProvider>
      <Component {...pageProps} />
    </SSRProvider>
  );
}
