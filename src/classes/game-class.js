export class Game {
  matrix;
  center;
  result;
  points = 0;

  clock;
  minutes = 0;
  seconds = 0;

  topLeft;
  topRight;
  bottomLeft;
  bottomRight;

  updateScore(value) {
    document.getElementById('points').innerHTML = value;
  }

  updateTimer() {
    this.seconds++;

    if (this.seconds === 60) {
      this.seconds = 0;
      this.minutes++
    }

    let formatMinutes;
    let formatSeconds;
    this.minutes < 10 ? formatMinutes = `0${this.minutes}` : formatMinutes = this.minutes;
    this.seconds < 10 ? formatSeconds = `0${this.seconds}` : formatSeconds = this.seconds;
    
    document.getElementById('timer').innerHTML = `${formatMinutes}:${formatSeconds}`;
  }

  newGame() {
    // Create random numbers
    let numbers = [];
    while (numbers.length < 9) {
      const getRandNum = Math.floor(Math.random() * 9) + 1;
      if (!numbers.includes(getRandNum)) {
        numbers.push(getRandNum);
      }
    }
    // Enable buttons
    document.getElementById('resetButton').disabled = false;
    document.getElementById('givUpButton').disabled = false;

    // Create matrix
    this.matrix = [numbers.slice(0, 3), numbers.slice(3, 6), numbers.slice(6)];
    
    // Set center
    this.center = this.matrix[1][1];    
    
    // Reset all numbers
    this.resetNumbers();

    // Set targets
    this.topLeft = this.matrix[0][0] + this.matrix[0][1] + this.matrix[1][0] + this.center;
    this.topRight = this.matrix[0][1] + this.matrix[0][2] + this.matrix[1][2] + this.center;
    this.bottomLeft = this.matrix[1][0] + this.matrix[2][0] + this.matrix[2][1] + this.center;
    this.bottomRight = this.matrix[2][1] + this.matrix[2][2] + this.matrix[1][2] + this.center;

    document.getElementById('topLeft').innerHTML = this.topLeft;
    document.getElementById('topRight').innerHTML = this.topRight;
    document.getElementById('bottomLeft').innerHTML = this.bottomLeft;
    document.getElementById('bottomRight').innerHTML = this.bottomRight;
    // console.log (this.matrix);

    // Start timer;
    this.minutes = 0;
    this.seconds = 0;
    clearInterval(this.clock);
    this.clock = setInterval(this.updateTimer.bind(this), 1000);
  }

  resetNumbers() {
    let numbers = document.querySelectorAll('.numbers:not(#fixCenter)');
    numbers.forEach(x => x.remove());

    document.getElementById('holder').innerHTML = `
    <img class="numbers" src="./img/n1.svg" id="1">
    <img class="numbers" src="./img/n2.svg" id="2">
    <img class="numbers" src="./img/n3.svg" id="3">
    <img class="numbers" src="./img/n4.svg" id="4">
    <img class="numbers" src="./img/n5.svg" id="5">
    <img class="numbers" src="./img/n6.svg" id="6">
    <img class="numbers" src="./img/n7.svg" id="7">
    <img class="numbers" src="./img/n8.svg" id="8">
    <img class="numbers" src="./img/n9.svg" id="9">
    `;
    document.getElementById(this.center).remove();
    document.getElementById('fixCenter').src = `./img/n${this.center}g.svg`;
    this.checkBoard();
  }

  giveUp() {
    this.resetNumbers();
    document.getElementById('leftTopCorner').append(document.getElementById(this.matrix[0][0]));
    document.getElementById('topCenter').append(document.getElementById(this.matrix[0][1]));
    document.getElementById('rightTopCorner').append(document.getElementById(this.matrix[0][2]));
    document.getElementById('leftCenterCorner').append(document.getElementById(this.matrix[1][0]));
    document.getElementById('rightCenterCorner').append(document.getElementById(this.matrix[1][2]));
    document.getElementById('bottomLeftCorner').append(document.getElementById(this.matrix[2][0]));
    document.getElementById('bottomCenter').append(document.getElementById(this.matrix[2][1]));
    document.getElementById('bottomRightCorner').append(document.getElementById(this.matrix[2][2]));

    this.checkBoard(false);
  }

  checkBoard(solved = true) {
    this.result = 0;

    // Check top left corner
    let a = document.getElementById('leftTopCorner').childNodes[0] ? document.getElementById('leftTopCorner').childNodes[0].getAttribute('id') : 0;
    let b = document.getElementById('topCenter').childNodes[0] ? document.getElementById('topCenter').childNodes[0].getAttribute('id') : 0;
    let c = document.getElementById('leftCenterCorner').childNodes[0] ? document.getElementById('leftCenterCorner').childNodes[0].getAttribute('id') : 0;
    let checkList = [a, b, c, this.center].map(Number);
    if (checkList.reduce((acc, el) => acc + el, 0) === this.topLeft && !checkList.includes(0)) {
      document.getElementById('topLeft').style.color = 'green';
      this.result++;
    } else {
      document.getElementById('topLeft').style.color = 'red';
    }

    // Check top right corner
    a = document.getElementById('rightTopCorner').childNodes[0] ? document.getElementById('rightTopCorner').childNodes[0].getAttribute('id') : 0;
    b = document.getElementById('topCenter').childNodes[0] ? document.getElementById('topCenter').childNodes[0].getAttribute('id') : 0;
    c = document.getElementById('rightCenterCorner').childNodes[0] ? document.getElementById('rightCenterCorner').childNodes[0].getAttribute('id') : 0;
    checkList = [a, b, c, this.center].map(Number);
    if (checkList.reduce((acc, el) => acc + el, 0) === this.topRight && !checkList.includes(0)) {
      document.getElementById('topRight').style.color = 'green';
      this.result++;
    } else {
      document.getElementById('topRight').style.color = 'red';
    }

    // Check bottom left corner
    a = document.getElementById('bottomLeftCorner').childNodes[0] ? document.getElementById('bottomLeftCorner').childNodes[0].getAttribute('id') : 0;
    b = document.getElementById('bottomCenter').childNodes[0] ? document.getElementById('bottomCenter').childNodes[0].getAttribute('id') : 0;
    c = document.getElementById('leftCenterCorner').childNodes[0] ? document.getElementById('leftCenterCorner').childNodes[0].getAttribute('id') : 0;
    checkList = [a, b, c, this.center].map(Number);
    if (checkList.reduce((acc, el) => acc + el, 0) === this.bottomLeft && !checkList.includes(0)) {
      document.getElementById('bottomLeft').style.color = 'green';
      this.result++;
    } else {
      document.getElementById('bottomLeft').style.color = 'red';
    }

    // Check bottom right corner
    a = document.getElementById('bottomRightCorner').childNodes[0] ? document.getElementById('bottomRightCorner').childNodes[0].getAttribute('id') : 0;
    b = document.getElementById('bottomCenter').childNodes[0] ? document.getElementById('bottomCenter').childNodes[0].getAttribute('id') : 0;
    c = document.getElementById('rightCenterCorner').childNodes[0] ? document.getElementById('rightCenterCorner').childNodes[0].getAttribute('id') : 0;
    checkList = [a, b, c, this.center].map(Number);
    if (checkList.reduce((acc, el) => acc + el, 0) === this.bottomRight && !checkList.includes(0)) {
      document.getElementById('bottomRight').style.color = 'green';
      this.result++;
    } else {
      document.getElementById('bottomRight').style.color = 'red';
    }
    
    if (this.result === 4) {
      clearInterval(this.clock);
      document.getElementById('resetButton').disabled = true;
      document.getElementById('givUpButton').disabled = true;
      if (solved) {
        this.points = this.points + 10;
        this.updateScore(this.points);
        this.showWin();
      }
    }
  }

  showWin() {
    document.getElementById('holder').innerHTML = 'YOU WIN';
  }
}