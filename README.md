# Game Solver

Application which provides games and solutions to them. Currently contains only sudoku.

## Stack

Front end:
- HTML5
- Typescript
- React
- NextJS
- CSS3

Back end:
- C#
- Azure Functions

## How it works

### Sudoku

The app gives the false sense that sudoku tables are generated on the fly, but this is only a magician's trick. The way it works is the following:
- A C# console application generates a collection of sudoku solutions.
- The client side app stores them in a json file and includes it in the build.
- Each time a user starts a new game, a random solution is chosen and the appropriate number of digits are removed, depending on the chosen difficulty.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
