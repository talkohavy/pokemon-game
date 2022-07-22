export const gameStatuses = {
  ongoing: 'fight is still on...',
  youlose: 'Game Over',
  youwin: 'You Win!',
  tie: `It's a tie!`,
};

export function roleDice() {
  return Math.floor(Math.random() * 6 + 1);
}

export function attack() {
  return { dmgPlayer1: roleDice(), dmgPlayer2: roleDice() };
}

export function changePokemon() {}
