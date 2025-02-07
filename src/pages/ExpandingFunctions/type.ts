type Square = { Location: number; Color: number };
type BlockType = 'T' | 'L' | 'J' | 'I' | 'O' | 'Z' | 'S' | 'X';
type Block = { Type: BlockType; Squares: Square[] };
type Action = 'Rotate' | 'Left' | 'Right' | 'Down';

export type { Square, BlockType, Block, Action };
