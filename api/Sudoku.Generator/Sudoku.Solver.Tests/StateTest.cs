namespace Sudoku.Solver.Tests;

public class StateTest
{
    [Fact]
    public void TestSolve()
    {
        var arr = new int?[]
        {
            7, null, 3, 8, 4, 9, 5, 6, 1,
            1, 4, 8, 5, 7, null, 9, 2, 3,
            9, 5, 6, 3, 1, 2, 7, 4, 8,
            6, 3, 9, 4, 5, 7, 1, 8, 2,
            5, 7, 1, 6, 2, 8, 3, 9, 4,
            2, 8, 4, 9, null, 1, 6, 7, 5,
            3, 9, 7, 1, 8, 4, 2, 5, 6,
            8, 6, 5, 2, 9, 3, 4, null, 7,
            4, 1, null, 7, 6, 5, 8, 3, null
        };

        var expectedSolution = string.Join("", new int[]
        {
            7, 2, 3, 8, 4, 9, 5, 6, 1,
            1, 4, 8, 5, 7, 6, 9, 2, 3,
            9, 5, 6, 3, 1, 2, 7, 4, 8,
            6, 3, 9, 4, 5, 7, 1, 8, 2,
            5, 7, 1, 6, 2, 8, 3, 9, 4,
            2, 8, 4, 9, 3, 1, 6, 7, 5,
            3, 9, 7, 1, 8, 4, 2, 5, 6,
            8, 6, 5, 2, 9, 3, 4, 1, 7,
            4, 1, 2, 7, 6, 5, 8, 3, 9
        });

        var state = new State(arr);
        var result = state.Solve()?.ToString();

        Assert.Equal(expectedSolution, result);
    }
}