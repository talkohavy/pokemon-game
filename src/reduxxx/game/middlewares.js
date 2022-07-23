import {
  ENTER_NEW_GAME_MODE,
  ENTER_END_GAME_MODE,
  enterEndGameMode,
  fetchPokemons,
  FETCH_POKEMON,
  showSpinner,
  hideSpinner,
  FETCH_POKEMON_SUCCESS,
  FETCH_POKEMON_FAILURE,
  reportLoadingError,
  updatePokemonFor,
  ATTACK,
  updateIsAttacking,
  updateHealthOf,
  updateRoundsResult,
  updateGameStatus,
  updateoverallStats,
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
      dispatch(updateIsAttacking(true));
      const {
        curGame: { status: gameStatus },
        player1: { health: healthOfPlayer1 },
        player2: { health: healthOfPlayer2 },
      } = getState().game;
      if (gameStatus === gameStatuses.ongoing) {
        const result = attack();
        console.log('damages are:', result);
        console.log('healths before are:', {
          healthOfPlayer1,
          healthOfPlayer2,
        });
        const newHealth1 = Math.max(0, healthOfPlayer1 - result.dmgOfPlayer2);
        const newHealth2 = Math.max(0, healthOfPlayer2 - result.dmgOfPlayer1);
        console.log('healths after are:', { newHealth1, newHealth2 });
        dispatch(updateRoundsResult(result));
        dispatch(updateHealthOf({ of: 'player1', data: newHealth1 }));
        dispatch(updateHealthOf({ of: 'player2', data: newHealth2 }));
        if (newHealth1 <= 0 || newHealth2 <= 0) {
          dispatch(
            enterEndGameMode({ health1: newHealth1, health2: newHealth2 })
          );
        } else {
          setTimeout(() => {
            dispatch(updateIsAttacking(false));
          }, 200);
        }
      }
    }
  };

export const enterEndGameModeFlow =
  ({ dispatch, getState }) =>
  (next) =>
  (action) => {
    next(action);

    if (action.type === ENTER_END_GAME_MODE) {
      const { health1, health2 } = action.payload;
      const overallStats = getState().game.stats;
      let gameStatus;
      if (health1 <= 0 && health2 <= 0) {
        gameStatus = gameStatuses.tie;
        overallStats.ties++;
      } else if (health1 <= 0) {
        gameStatus = gameStatuses.lose;
        overallStats.loses++;
      } else {
        gameStatus = gameStatuses.win;
        overallStats.wins++;
      }
      dispatch(updateGameStatus(gameStatus));
      dispatch(updateoverallStats(overallStats));
      dispatch(openEndGame());
    }
  };

export const gameMdlwrs = [
  enterNewGameModeFlow,
  enterFetchPokemonFlow,
  processPokemon,
  attackFlow,
  enterEndGameModeFlow,
];
