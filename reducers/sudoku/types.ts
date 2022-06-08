export interface State {
  initialized: boolean,
  initialTable: (number | null)[][],
  table: (number | null)[][],
  solution: (number | null)[][],
  invalidCells: any,
  completed: boolean,
  loadSolution: boolean,
}

export interface Action {
  type: string,
  payload?: any
}