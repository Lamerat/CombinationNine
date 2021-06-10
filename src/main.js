import { Game } from './classes/game-class.js';

document.addEventListener('DOMContentLoaded', () => {
  document.addEventListener('click', (event) => {
    if (event.target.id === 'newGameButton') {
      if (game.result === 4) {
        game.newGame();
      } else {
        if (confirm('Are you sure?')) {
          game.newGame();
        }
      }
    }

    if (event.target.id === 'resetButton') {
      game.resetNumbers();
    }

    if (event.target.id === 'givUpButton') {
      if (confirm('Are you sure?')) {
        game.giveUp();
      }
    }
  });

  document.addEventListener('dragstart', (event) =>{
    if (event.target.classList.contains('numbers') && event.target.id !== 'fixCenter') {
      event.dataTransfer.setData('object', event.target.id);
      event.dataTransfer.setData('parent', event.target.parentElement.id);
    }
  });

  document.addEventListener('dragover', (event) => {    
    if (event.target.id === 'holder' || event.target.classList.contains('smallCircle') || event.target.classList.contains('numbers') && event.target.id !== 'fixCenter') {
      event.preventDefault();
    }
  });

  document.addEventListener('drop', (event) => {

    if (event.target.id === 'holder') {
      event.preventDefault();
      let data = event.dataTransfer.getData('object');
      event.target.appendChild(document.getElementById(data));
    }

    if (event.target.classList.contains('numbers')) {
      event.preventDefault();
      
      
      let data = event.dataTransfer.getData('object');
      let parent = event.target.parentElement;

      let currentData = event.target;
      let newParent = document.getElementById(event.dataTransfer.getData('parent'));
      
      newParent.appendChild(currentData);
      parent.appendChild(document.getElementById(data));
    }

    if (event.target.classList.contains('smallCircle')) {
      let data = event.dataTransfer.getData('object');
      event.target.appendChild(document.getElementById(data));
    }
    game.checkBoard();
  });



  const game = new Game;
  game.newGame();
});
