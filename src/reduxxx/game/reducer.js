import { UPDATE_POKEMON_FOR, SHOW_SPINNER, HIDE_SPINNER } from './actions';

const INITIAL_STATE = {
  player1: {
    nickname: 'Player',
    health: 100,
    pokemon: null,
  },
  player2: {
    nickname: 'Opponent',
    health: 100,
    pokemon: null,
  },
  currentGame: {
    rounds: [],
    status: 'ongoing',
    currentRoundResults: {
      dmgOfPlayer1: null,
      dmgOfPlayer2: null,
    },
  },
  stats: {
    wins: 0,
    loses: 0,
  },
  isLoading: true,
  isLoadingFailed: false,
};

export default function gameReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case UPDATE_POKEMON_FOR:
      return {
        ...state,
        player1: action.payload.for == 1 ? action.payload.data : state.player1,
        player2: action.payload.for == 2 ? action.payload.data : state.player2,
      };
    case SHOW_SPINNER:
      return {
        ...state,
        isLoading: true,
      };
    case HIDE_SPINNER:
      return {
        ...state,
        isLoading: false,
      };
    default:
      return state;
  }
}
