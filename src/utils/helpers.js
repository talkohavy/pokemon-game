import config from '../game.config';

export const gameStatuses = {
  ongoing: 'ongoing',
  lose: 'lose',
  win: 'win',
  tie: 'tie',
};
Object.freeze(gameStatuses);

export function roleDice() {
  return 1 + Math.floor(Math.random() * 6);
}

export function attack() {
  return {
    dmgOfPlayer1: config.dmgFunction(),
    dmgOfPlayer2: config.dmgFunction(),
  };
}

export function changePokemon() {}
