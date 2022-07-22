export const ENTER_NEW_GAME_MODE = '[game] enter a new game';
export const FETCH_POKEMON = '[game] fetch pokemon';
export const FETCH_POKEMON_SUCCESS = '[game] fetch pokemon success';
export const FETCH_POKEMON_FAILURE = '[game] fetch pokemon failure';
export const UPDATE_POKEMON_FOR = '[game] set pokemon for player';
export const SHOW_SPINNER = '[game] show spinner';
export const HIDE_SPINNER = '[game] hide spinner';
export const REPORT_LOADING_ERROR = '[chatRoom] Report loading error';

//------ Sync Actions -------

export const enterNewGameMode = (data) => ({
  type: ENTER_NEW_GAME_MODE,
  payload: data,
});

export const fetchPokemons = (data) => ({
  type: FETCH_POKEMON,
  payload: data,
});

export const showSpinner = () => ({
  type: SHOW_SPINNER,
});

export const hideSpinner = () => ({
  type: HIDE_SPINNER,
});

export const updatePokemonFor = (data) => ({
  type: UPDATE_POKEMON_FOR,
  payload: data,
});

export const reportLoadingError = () => ({
  type: REPORT_LOADING_ERROR,
});
