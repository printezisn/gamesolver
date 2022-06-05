using System.Text.Json;
using Sudoku.Solver;

var solutions = new HashSet<string>();

while (solutions.Count < 500)
{
    var state = new State().Solve();
    if (state == null)
    {
        continue;
    }

    solutions.Add(state.ToString());
}

File.WriteAllText("sudoku.json", JsonSerializer.Serialize(solutions));