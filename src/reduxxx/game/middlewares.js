import {
  ENTER_NEW_GAME_MODE,
  fetchPokemons,
  FETCH_POKEMON,
  showSpinner,
  hideSpinner,
  FETCH_POKEMON_SUCCESS,
  FETCH_POKEMON_FAILURE,
  reportLoadingError,
  updatePokemonFor,
  ATTACK,
  updateHealthOf,
  updateRoundsResult,
  updateGameStatus,
  updateGameStats,
} from './actions';
import { openEndGame } from '../modals/actions';
import { apiRequest } from '../api';
import { attack, gameStatuses } from '../../gameLogic';

export const enterNewGameModeFlow =
  ({ dispatch }) =>
  (next) =>
  (action) => {
    next(action);

    if (action.type === ENTER_NEW_GAME_MODE) {
      // A. show spinner
      dispatch(showSpinner());
      // B. fetch whoRows
      dispatch(fetchPokemons(action.payload));
    }
  };

export const enterFetchPokemonFlow =
  ({ dispatch }) =>
  (next) =>
  (action) => {
    next(action);

    if (action.type === FETCH_POKEMON) {
      const { p1, p2 } = action.payload;
      const data = {
        method: 'GET',
        URL: `https://pokeapi.co/api/v2/pokemon/${p1}/`,
        config: { params: { player: 1, pid: p1 } },
        onSuccess: FETCH_POKEMON_SUCCESS,
        onFailure: FETCH_POKEMON_FAILURE,
      };
      dispatch(apiRequest(data));
      data.URL = `https://pokeapi.co/api/v2/pokemon/${p2}/`;
      data.config = { params: { player: 2, pid: p2 } };
      dispatch(apiRequest(data));
    }
  };

export const processPokemon =
  ({ dispatch, getState }) =>
  (next) =>
  (action) => {
    next(action);

    if (action.type === FETCH_POKEMON_SUCCESS) {
      // update pokemon:
      const { data, config } = action.payload;
      console.log(`pokemon of user ${config.params.player} is:`, data);
      dispatch(updatePokemonFor({ for: config.params.player, data }));

      // hide spinner condition:
      const {
        player1: { pokemon: p1 },
        player2: { pokemon: p2 },
      } = getState().game;
      if (p1 && p2) {
        dispatch(hideSpinner());
      }
    }

    if (action.type === FETCH_POKEMON_FAILURE) {
      const errorMsg = action.payload;
      console.warn(errorMsg);
      // A. Report loading error
      dispatch(reportLoadingError());
      // B. hide spinner
      dispatch(hideSpinner());
    }
  };

export const attackFlow =
  ({ dispatch, getState }) =>
  (next) =>
  (action) => {
    next(action);

    if (action.type === ATTACK) {
      // A. show spinner
      // dispatch(showRoundSpinner());
      // B.
      const {
        curGame: { status: gameStatus },
        player1: { health: healthOfPlayer1 },
        player2: { health: healthOfPlayer2 },
        stats: gameStats,
      } = getState().game;
      if (gameStatus === gameStatuses.ongoing) {
        const result = attack();
        console.log('result is:', result);
        const newHealth1 = healthOfPlayer1 - result.dmgOfPlayer2 * 4;
        const newHealth2 = healthOfPlayer2 - result.dmgOfPlayer1 * 4;
        dispatch(updateRoundsResult(result));
        dispatch(updateHealthOf({ of: 1, data: newHealth1 }));
        dispatch(updateHealthOf({ of: 2, data: newHealth2 }));

        if (newHealth1 <= 0 && newHealth2 <= 0) {
          dispatch(updateGameStatus(gameStatuses.tie));
          gameStats.ties++;
          dispatch(updateGameStats(gameStats));
          dispatch(openEndGame());
          console.log(gameStatuses.tie);
        }
        if (newHealth1 <= 0) {
          dispatch(updateGameStatus(gameStatuses.youlose));
          gameStats.loses++;
          dispatch(updateGameStats(gameStats));
          dispatch(openEndGame());
          console.log(gameStatuses.youlose);
        }
        if (newHealth2 <= 0) {
          dispatch(updateGameStatus(gameStatuses.youwin));
          gameStats.wins++;
          dispatch(updateGameStats(gameStats));
          dispatch(openEndGame());
          console.log(gameStatuses.youwin);
        }
      }
    }
  };

export const gameMdlwrs = [
  enterNewGameModeFlow,
  enterFetchPokemonFlow,
  processPokemon,
  attackFlow,
];
