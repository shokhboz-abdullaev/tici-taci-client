import { defaultPlaygroundState } from '../constants/Playground';
import { PlaygroundState } from '../typings/Playground/interfaces/index.interfaces';
import { ReducerAction } from '../typings/Playground/interfaces/reducer.interfaces';

export const playgroundReducer = (state: PlaygroundState, action: ReducerAction) => {
  switch (action.type) {
    case 'start':
      if (state.winner) {
        setTimeout(() => {
          (action.payload as any)?.socket?.emit('restart', {
            code: (action.payload as any).code,
          });
        });
        return defaultPlaygroundState;
      }
      return state;
    case 'force-start':
      return defaultPlaygroundState;
    case 'mark': {
      console.log('Mark start');

      if (
        !state.winner &&
        !state.cells[action.payload?.idx] &&
        state.canMove &&
        (action.payload as any).socket
      ) {
        const cells = [...state.cells];
        cells[action.payload?.idx] = action.payload?.localSign;
        console.log('Mark working');

        setTimeout(() => {
          (action.payload as any).socket?.emit('move', {
            code: (action.payload as any).code,
            idx: (action.payload as any).idx,
            cells,
            xIsNext: state.xIsNext,
          });
        });

        return {
          ...state,
          cells,
          canMove: action.payload?.canMove,
        };
      }
      return state;
    }
    case 'move': {
      console.log('move start');

      return {
        ...state,
        ...(action.payload as PlaygroundState),
      };
    }
    default:
      return state;
  }
};