import { TOGGLE_MODAL } from './actions';

const INITIAL_STATE = {
  endgame: true,
};

export default function modalsReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case TOGGLE_MODAL:
      const { of, flag } = action.payload;
      return {
        ...state,
        [of]: flag,
      };
    default:
      return state;
  }
}
