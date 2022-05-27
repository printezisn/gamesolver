import type { NextPage } from 'next';
import Layout from '../components/layout';
import SudokuMenu from '../components/sudoku/menu';

const Home: NextPage = () => {
  return (
    <Layout pageTitle="Sudoku" pageDescription="Play and solve sudoku">
      <SudokuMenu />
    </Layout>
  );
};

export default Home;
