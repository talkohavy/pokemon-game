import {
  UPDATE_POKEMON_FOR,
  UPDATE_HEALTH,
  UPDATE_ROUNDS_RESULT,
  UPDATE_GAME_STATUS,
  UPDATE_GAME_STATS,
  UPDATE_IS_ATTACKING,
  SHOW_SPINNER,
  HIDE_SPINNER,
} from './actions';
import { gameStatuses } from '../../gameLogic';

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
  curGame: {
    isAttacking: false,
    rounds: [], // not implemented yet!
    status: gameStatuses.ongoing,
    curRound: {
      dmgOfPlayer1: null,
      dmgOfPlayer2: null,
    },
  },
  stats: {
    wins: 0,
    loses: 0,
    ties: 0,
  },
  isLoading: true,
  isLoadingFailed: false,
};

export default function gameReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case UPDATE_POKEMON_FOR:
      return {
        ...state,
        player1: {
          ...state.player1,
          pokemon:
            action.payload.for === 1
              ? action.payload.data
              : state.player1.pokemon,
        },
        player2: {
          ...state.player2,
          pokemon:
            action.payload.for === 2
              ? action.payload.data
              : state.player2.pokemon,
        },
      };
    case UPDATE_HEALTH:
      return {
        ...state,
        player1: {
          ...state.player1,
          health:
            action.payload.of === 1
              ? state.player1.health
              : action.payload.data,
        },
        player2: {
          ...state.player2,
          health:
            action.payload.of === 2
              ? action.payload.data
              : state.player1.health,
        },
      };
    case UPDATE_ROUNDS_RESULT:
      return {
        ...state,
        curGame: {
          ...state.curGame,
          curRound: action.payload,
        },
      };
    case UPDATE_GAME_STATUS:
      return {
        ...state,
        curGame: {
          ...state.curGame,
          status: action.payload,
        },
      };
    case UPDATE_GAME_STATS:
      return {
        ...state,
        stats: action.payload,
      };
    case UPDATE_IS_ATTACKING:
      return {
        ...state,
        curGame: {
          ...state.curGame,
          isAttacking: action.payload,
        },
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
