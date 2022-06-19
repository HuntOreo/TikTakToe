import { Match } from './models/Match';

const boxes = document.querySelector('.board')!.children;
const tiles = document.querySelectorAll('.box');

const entreeOne = { name: 'Hunter', marker: 'X' };
const entreeTwo = { name: 'Braden', marker: 'O' };

const match = new Match([entreeOne, entreeTwo], boxes);

const onClick = (e: Event) => {
  const checked = match.play(e, onClick);
  const player = checked.winner;
  const alert = document.querySelector('.results') as HTMLElement;
  const text = alert.children[0].children[0] as HTMLElement;
  if (checked.result) {
    alert.classList.toggle('hide');
    alert.classList.toggle('show');
    text.innerText = `${player.name} wins!`;
  } else if (checked.result === false && player.name === 'draw') {
    alert.classList.toggle('hide');
    alert.classList.toggle('show');
    text.innerText = `Draw! No more moves.`;
  }
  const target = e.target as HTMLElement;
  target.parentNode?.removeEventListener('click', onClick);
};

const restart = (e: Event) => {
  match.restart();
  tiles.forEach((box) => {
    box.addEventListener('click', onClick);
  });
};

tiles.forEach((box) => {
  box.addEventListener('click', onClick);
});

document.querySelector('.restart')?.addEventListener('click', restart);
