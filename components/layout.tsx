import Head from 'next/head';
import { FC, ReactNode } from 'react';

interface Props {
  pageTitle: string,
  pageDescription: string,
  children?: ReactNode
}

const Layout: FC<Props> = ({ pageTitle, pageDescription, children }) => (
  <>
    <Head>
      <title>{pageTitle} | Game Solver</title>
      <meta name="description" content={pageDescription} />
      <link rel="icon" href="/favicon.png" />
    </Head>
    <header>
      <h1 className="sr-only">{pageTitle}</h1>
    </header>
    <main>
      <div className="container">
        {children}
      </div>
    </main>
    <footer>
      <p className="container">
        Crafted by{' '}
        <a href="https://github.com/printezisn/" target="_blank" rel="noreferrer">printezisn</a>
      </p>
      <br />
      <p>
        <a href="https://github.com/printezisn/gamesolver" className="full-button" target="_blank" rel="noreferrer">
          <i className="fab fa-github-square" />
          &nbsp;
          GitHub
        </a>
      </p>
    </footer>
  </>
);

export default Layout;