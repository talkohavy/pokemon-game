import {
  ENTER_NEW_GAME_MODE,
  fetchPokemons,
  FETCH_POKEMON,
  showSpinner,
  hideSpinner,
  FETCH_POKEMON_SUCCESS,
  FETCH_POKEMON_FAILURE,
  reportLoadingError,
} from './actions';
import { apiRequest } from '../api';

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
      const data = {
        method: 'GET',
        URL: `https://pokeapi.co/api/v2/pokemon/${action.payload.p1}/`,
        onSuccess: FETCH_POKEMON_SUCCESS,
        onFailure: FETCH_POKEMON_FAILURE,
      };
      dispatch(apiRequest(data));
      data.URL = `https://pokeapi.co/api/v2/pokemon/${action.payload.p2}/`;
      dispatch(apiRequest(data));
      // // Fake out long loading time of myUser
      // setTimeout(() => {
      // dispatch(apiRequest(data));
      // data.URL = `https://pokeapi.co/api/v2/pokemon/${action.payload.p2}/`;
      // dispatch(apiRequest(data));
      // }, 2000);
    }
  };

export const processPokemon =
  ({ dispatch, getState }) =>
  (next) =>
  (action) => {
    next(action);

    if (action.type === FETCH_POKEMON_SUCCESS) {
      console.log(action.payload);

      // C. hide spinner
      dispatch(hideSpinner());
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

export const gameMdlwrs = [
  enterNewGameModeFlow,
  enterFetchPokemonFlow,
  processPokemon,
];
