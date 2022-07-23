export const ENTER_NEW_GAME_MODE = '[game] enter a new game';
export const ENTER_END_GAME_MODE = '[game] enter end game mode';
// export const HARD_RESET = '[game] hard reset game';
export const RESET_GAME = '[game] reset game';
export const FETCH_POKEMON = '[game] fetch 2 pokemons';
export const FETCH_POKEMON_SUCCESS = '[game] fetch pokemon success';
export const FETCH_POKEMON_FAILURE = '[game] fetch pokemon failure';
export const UPDATE_POKEMON_FOR = '[game] update pokemon for player';
export const ATTACK = '[game] launch an attack!';
export const UPDATE_IS_ATTACKING = '[game] update isAttacking';
export const UPDATE_HEALTH = '[game] update health of player';
export const UPDATE_ROUNDS_RESULT = `[game] update round's result`;
export const UPDATE_GAME_STATUS = `[game] update game's status`;
export const UPDATE_GAME_STATS = `[game] update game's stats`;
export const SHOW_SPINNER = '[game] show spinner';
export const HIDE_SPINNER = '[game] hide spinner';
export const REPORT_LOADING_ERROR = '[chatRoom] Report loading error';

//------ Sync Actions -------

export const enterNewGameMode = (data) => ({
  type: ENTER_NEW_GAME_MODE,
  payload: data,
});

export const enterEndGameMode = (data) => ({
  type: ENTER_END_GAME_MODE,
  payload: data,
});

export const resetGame = (data) => ({
  type: RESET_GAME,
  payload: data,
});

// export const hardReset = () => ({
//   type: HARD_RESET,
// });

export const fetchPokemons = (data) => ({
  type: FETCH_POKEMON,
  payload: data,
});

export const attack = () => ({
  type: ATTACK,
});

export const updateIsAttacking = (data) => ({
  type: UPDATE_IS_ATTACKING,
  payload: data,
});

export const updateHealthOf = (data) => ({
  type: UPDATE_HEALTH,
  payload: data,
});

export const updateRoundsResult = (data) => ({
  type: UPDATE_ROUNDS_RESULT,
  payload: data,
});

export const updateGameStatus = (data) => ({
  type: UPDATE_GAME_STATUS,
  payload: data,
});

export const updateoverallStats = (data) => ({
  type: UPDATE_GAME_STATS,
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
