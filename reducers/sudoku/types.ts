import { findInvalidCells } from '../../lib/sudoku';
import { getEmpty2DArray } from '../../lib/utils';

/**
 * The state of the sudoku puzzle
 */
export interface State {
  initialized: boolean;
  initialTable: (number | null)[][];
  table: (number | null)[][];
  solution: (number | null)[][];
  invalidCells: any;
  completed: boolean;
  loadSolution: boolean;
  loading: boolean;
  error: (string | null);
}

/**
 * Handles sudoku state information and changes
 */
export class StateHandler {
  private _initialized: boolean;

  private _initialTable: (number | null)[][];

  private _table: (number | null)[][];

  private _solution: (number | null)[][];

  private _invalidCells: any;

  private _completed: boolean;

  private _loadSolution: boolean;
  
  private _loading: boolean;

  private _error: (string | null);

  /**
   * Creates a new instance
   * 
   * @param params The parameters to initialize the state with
   * @param calculateStatus Indicates if the status of the state must be calculated or not
   *                        (this included invalid cells and indication if sudoku is completed)
   */
  constructor(params: any = {}, calculateStatus = true) {
    const emptyTable = getEmpty2DArray<number>(9, 9);

    this._initialized = Boolean(params.initialized);
    this._initialTable = params.initialTable || emptyTable;
    this._table = params.table || this._initialTable;
    this._solution = params.solution || emptyTable;
    this._loadSolution = Boolean(params.loadSolution);
    this._loading = Boolean(params.loading);
    this._error = params.error || null;
    this._invalidCells = params.invalidCells || {};
    this._completed = Boolean(params.completed);

    if (!calculateStatus) {
      return;
    }

    this._invalidCells = findInvalidCells(this._table);
    this._completed = Object.keys(this._invalidCells).length === 0 && this._table.flat().indexOf(null) < 0;
  }

  /**
   * Merges the current state with new parameters and returns the new state that comes out of it
   * 
   * @param params The new parameters to merge with
   * @returns The handler for the new state
   */
  public merge(params: any) {
    return new StateHandler({ ...this.getState(), ...params });
  }

  /**
   * Returns the current state
   * 
   * @returns The current state
   */
  public getState(): State {
    return {
      initialized: this._initialized,
      initialTable: this._initialTable,
      table: this._table,
      solution: this._solution,
      invalidCells: this._invalidCells,
      completed: this._completed,
      loadSolution: this._loadSolution,
      loading: this._loading,
      error: this._error,
    };
  }
}

/**
 * Represents an action towards the current sudoku state
 */
export interface Action {
  type: string,
  payload?: any
}