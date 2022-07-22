export const gameStatuses = {
  ongoing: 'ongoing',
  lose: 'lose',
  win: 'win',
  tie: 'tie',
};
Object.freeze(gameStatuses);

export function roleDice() {
  return Math.floor(Math.random() * 6 + 1);
}

export function attack() {
  return { dmgOfPlayer1: roleDice(), dmgOfPlayer2: roleDice() };
}

export function changePokemon() {}
