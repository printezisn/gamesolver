export interface State {
  initialTable: (number | null)[][],
  table: (number | null)[][],
  solution: (number | null)[][]
}

export interface Action {
  type: string,
  payload: any
}