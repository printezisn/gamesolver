export interface State {
  initialized: boolean,
  initialTable: (number | null)[][],
  table: (number | null)[][],
  solution: (number | null)[][],
  invalidCells: [number, number][],
  completed: boolean,
}

export interface Action {
  type: string,
  payload?: any
}