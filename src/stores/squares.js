import { create } from 'zustand'

const DEFAULT_SQUARES = Array(9).fill(null);

const useSquare = create((set) => ({
  squares: DEFAULT_SQUARES,
  setSquares: (squares) => set({ squares }),
  restart: () => set({ squares: DEFAULT_SQUARES }),
  isFilled: (index) => Boolean(useSquare.getState().squares[index])
}));

export default useSquare;
