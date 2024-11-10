import '../styles/globals.css';

import axios from 'axios';
import type { AppProps } from 'next/app';
import { useEffect, useState } from 'react';
import { Roboto, Roboto_Mono } from 'next/font/google';

// Подключаем шрифты с нужными параметрами
const roboto = Roboto({
  weight: ['100', '300', '400', '500', '700', '900'],
  variable: '--font-roboto',
  subsets: ['latin'],
});

const robotoMono = Roboto_Mono({
  weight: ['100', '200', '300', '400', '500', '600', '700'],
  variable: '--font-roboto-mono',
  subsets: ['latin'],
});

function MyApp({ Component, pageProps }: AppProps) {
  const [isHashValid, setIsHashValid] = useState(false);

  useEffect(() => {
    axios
      .post('/api/validate-hash', { hash: window.Telegram.WebApp.initData })
      .then((response) => setIsHashValid(response.status === 200));
  }, []);

  if (!isHashValid) {
    return null;
  }

  return (
    <main className={`${roboto.variable} ${robotoMono.variable}`}>
      <Component {...pageProps} />
    </main>
  );
}

export default MyApp;
