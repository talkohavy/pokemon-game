export const gameStatuses = {
  ongoing: 'The fight is still on...',
  youlose: 'Game Over',
  youwin: 'You Win!',
  tie: `It's a tie!`,
};
Object.freeze(gameStatuses);

export function roleDice() {
  return Math.floor(Math.random() * 6 + 1);
}

export function attack() {
  return { dmgOfPlayer1: roleDice(), dmgOfPlayer2: roleDice() };
}

export function changePokemon() {}
