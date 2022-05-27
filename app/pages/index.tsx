import type { NextPage } from 'next';
import Layout from '../components/layout';
import SudokuMenu from '../components/sudoku/menu';
import SudokuTable from '../components/sudoku/table';

const Home: NextPage = () => {
  return (
    <Layout pageTitle="Sudoku" pageDescription="Play and solve sudoku">
      <SudokuMenu />
      <SudokuTable />
    </Layout>
  );
};

export default Home;
