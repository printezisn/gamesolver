import type { NextPage } from 'next';
import Layout from '../components/layout';
import SudokuMenu from '../components/sudoku/menu';
import SudokuMessage from '../components/sudoku/message';
import SudokuTable from '../components/sudoku/table';
import { SudokuProvider } from '../reducers/sudoku/reducer';

const Home: NextPage = () => {
  return (
    <Layout pageTitle="Sudoku" pageDescription="Play and solve sudoku">
      <SudokuProvider>
        <SudokuMenu />
        <SudokuMessage />
        <SudokuTable />
      </SudokuProvider>
    </Layout>
  );
};

export default Home;
