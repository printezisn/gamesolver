export interface State {
  initialTable: (number | null)[][],
  table: (number | null)[][],
  solution: (number | null)[][],
  invalidCells: [number, number][],
}

export interface Action {
  type: string,
  payload?: any
}