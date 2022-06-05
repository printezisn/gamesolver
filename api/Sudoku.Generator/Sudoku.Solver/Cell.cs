namespace Sudoku.Solver;
public class Cell
{
    public HashSet<int> AvailableValues { get; private set; } = new HashSet<int>() { 1, 2, 3, 4, 5, 6, 7, 8, 9 };
    public int? SelectedValue { get; private set; }

    public Cell()
    {

    }

    public Cell(Cell other)
    {
        AvailableValues = new HashSet<int>(other.AvailableValues);
        SelectedValue = other.SelectedValue;
    }

    public Cell? Remove(int value)
    {
        if (!AvailableValues.Contains(value))
        {
            return this;
        }
        if (AvailableValues.Count == 1)
        {
            return null;
        }

        var newCell = new Cell(this);
        newCell.AvailableValues.Remove(value);

        return newCell;
    }

    public Cell Select(int? value)
    {
        var newCell = new Cell(this);
        newCell.SelectedValue = value;

        return newCell;
    }

    public IEnumerable<int> RandomlySortedAvailableValues()
    {
        return AvailableValues.OrderBy(v => new Random().Next());
    }
}
