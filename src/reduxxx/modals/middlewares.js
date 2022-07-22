import { OPEN_END_GAME, CLOSE_END_GAME, TOGGLE_MODAL } from './actions';

export const modalsFlow =
  ({ dispatch }) =>
  (next) =>
  (action) => {
    next(action);

    if (/\[modals\]/.test(action.type)) {
      // Eng Game:
      if (action.type === OPEN_END_GAME) {
        dispatch({
          type: TOGGLE_MODAL,
          payload: { of: 'endgame', flag: true },
        });
      }
      if (action.type === CLOSE_END_GAME) {
        dispatch({
          type: TOGGLE_MODAL,
          payload: { of: 'endgame', flag: false },
        });
      }
    }
  };

export const modalsMdlwrs = [modalsFlow];
