import { Board } from "./board";

export type Color = `rgb(${number}, ${number}, ${number})` | `#${string}`;

export type NeighborFunction<CellType, NeighborType>
    = (board: Board<CellType>, x: number, y: number) => NeighborType;

export type UpdateFunction<CellType, NeighborType>
    = (current: CellType, neighbors: NeighborType) => CellType;

export type ColorFunction<CellType> = (cell: CellType) => Color;

export type InitializationFunction<CellType> = (x: number, y: number) => CellType;

export interface SimulatorSettings<CellType, NeighborType> {
    NeighborFunction: NeighborFunction<CellType, NeighborType>;
    UpdateFunction: UpdateFunction<CellType, NeighborType>;
    ColorFunction: ColorFunction<CellType>;
}

export interface AutomatonSettings<CellType, NeighborType> {
    SimulatorSettings: SimulatorSettings<CellType, NeighborType>;
    InitializationFunctions: {
        Name: string;
        Function: InitializationFunction<CellType>
    }[];
}
