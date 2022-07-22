export const OPEN_END_GAME = '[modals] Open endgame modal';
export const CLOSE_END_GAME = '[modals] Close endgame modal';
export const TOGGLE_MODAL = '[modals] Toggle modal';

export const openEndGame = () => {
  return {
    type: OPEN_END_GAME,
  };
};

export const closeEndGame = () => {
  return {
    type: CLOSE_END_GAME,
  };
};
