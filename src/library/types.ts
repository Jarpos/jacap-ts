import { Board } from "./board";

export type Color = `rgb(${number}, ${number}, ${number})` | `#${string}`;

export type NeighborFunction<CellType, NeighborType>
    = (board: Board<CellType>, x: number, y: number) => NeighborType;

export type UpdateFunction<CellType, NeighborType>
    = (current: CellType, neighbors: NeighborType) => CellType;

export type ColorFunction<CellType> = (cell: CellType) => Color;

export type InitializationFunction<CellType> = (x: number, y: number) => CellType;

export type OnClickFunction<CellType> = (value: CellType) => CellType;

export interface AutomatonFunctions<CellType, NeighborType> {
    NeighborFunction: NeighborFunction<CellType, NeighborType>;
    UpdateFunction: UpdateFunction<CellType, NeighborType>;
    ColorFunction: ColorFunction<CellType>;
}

export interface AutomatonDefinition<CellType, NeighborType> {
    AutomatonFunctions: AutomatonFunctions<CellType, NeighborType>;
    InitializationFunctions: {
        Name: string;
        Function: InitializationFunction<CellType>;
    }[];
}
