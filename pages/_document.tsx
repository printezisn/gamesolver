import { Head, Html, Main, NextScript } from 'next/document';

const MainDocument = () => (
  <Html lang="en">
    <Head>
      <link rel="manifest" href="/manifest.json" />
      <link rel="apple-touch-icon" href="/icon.png"></link>
      <meta name="theme-color" content="#157dac" />
    </Head>
    <body>
      <Main />
      <NextScript />
    </body>
  </Html>
);

export default MainDocument;