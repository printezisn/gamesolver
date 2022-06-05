using System.Text;

namespace Sudoku.Solver;
public class State
{
    public List<Cell> Cells { get; private set; } = new List<Cell>();

    public State()
    {
        InitializeCells();
    }

    public State(int?[] arr)
    {
        InitializeCells();
        SetInitialCellValues(arr);
    }

    public int?[,] ToArray()
    {
        var arr = new int?[9, 9];

        for (int i = 0; i < Cells.Count; i++)
        {
            arr[GetRow(i), GetCol(i)] = Cells[i].SelectedValue;
        }

        return arr;
    }

    public override string ToString()
    {
        return string.Join("", Cells.Select(c => c.SelectedValue ?? 0));
    }

    public State? Solve()
    {
        int cellIndex = GetCellWithMinAvailableValues();
        if (cellIndex < 0)
        {
            return this;
        }

        var availableValues = Cells[cellIndex].RandomlySortedAvailableValues();

        foreach (int value in availableValues)
        {
            var finalState = SelectValue(cellIndex, value)?.Solve();
            if (finalState != null)
            {
                return finalState;
            }
        }

        return null;
    }

    private void InitializeCells()
    {
        for (int i = 0; i < 81; i++)
        {
            Cells.Add(new Cell());
        }
    }

    private void SetInitialCellValues(int?[] arr)
    {
        for (int i = 0; i < 81; i++)
        {
            if (arr[i].HasValue)
            {
                Cells[i].AvailableValues.RemoveWhere(v => v != arr[i]);
            }
        }
    }

    private int GetCellWithMinAvailableValues()
    {
        int? min = null;
        int index = -1;

        for (int i = 0; i < Cells.Count; i++)
        {
            if (Cells[i].SelectedValue.HasValue)
            {
                continue;
            }

            if (!min.HasValue || Cells[i].AvailableValues.Count < min)
            {
                min = Cells[i].AvailableValues.Count;
                index = i;
            }
        }

        return index;
    }

    private int GetRow(int index)
    {
        return index / 9;
    }

    private int GetCol(int index)
    {
        return index % 9;
    }

    private int GetBoard(int index)
    {
        return GetRow(index) / 3 * 3 + GetCol(index) / 3;
    }

    private State? SelectValue(int index, int value)
    {
        var newState = new State();

        for (int i = 0; i < Cells.Count; i++)
        {
            if (i == index)
            {
                newState.Cells[i] = Cells[i].Select(value);
            }
            else if (GetRow(i) == GetRow(index) || GetCol(i) == GetCol(index) || GetBoard(i) == GetBoard(index))
            {
                var newCell = Cells[i].Remove(value);
                if (newCell == null)
                {
                    return null;
                }

                newState.Cells[i] = newCell;
            }
            else
            {
                newState.Cells[i] = Cells[i];
            }
        }

        return newState;
    }
}