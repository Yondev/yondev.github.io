const canvas = document.querySelector('#display');
const ctx = canvas.getContext('2d');

const frame_rate = 15;
const screen_size = 20;
canvas.width = canvas.height = 550;
const tile_size = canvas.width/screen_size;

let position,velocity,food,snake
function initialize(){
    position = {x: 10, y: 10};
    velocity = {x: 0, y: 0};
    snake = [
        {x: 10, y: 10},
    ]
    randomFood();
}
initialize();
function randomFood(){
    food = {
        x: Math.floor(Math.random() * tile_size),
        y: Math.floor(Math.random() * tile_size),
    }
    //Per ogni parte(cell) del serpente (snake) , controlla che il food non spawni nelle coordinate di snake, se è vero riprova
    for (let cell of snake) {
        if(cell.x === food.x && cell.y === food.y)
        return randomFood(); //riprova
    }
}
document.addEventListener('keydown', keydown);

function keydown(event){
    switch(event.keyCode) {
        case 37: {
            return velocity = {x: -1, y: 0}
        }
        case 38: {
            return velocity = {x: 0, y: -1}
        }
        case 39: {
            return velocity = {x: 1, y: 0}
        }
        case 40: {
            return velocity = {x: 0, y: 1}
        }
    }

}
//DA QUI IN POI DEVO STUDIARE IL CODICE E COMMENTARE

setInterval(() => {
    requestAnimationFrame(gameLoop);
  }, 1000 /frame_rate);
  
  function gameLoop(){
    ctx.fillStyle = '#a52a2a';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  
    ctx.fillStyle = '#ffffff';
    for (let cell of snake) {
      ctx.fillRect(cell.x*screen_size, cell.y*screen_size, screen_size,screen_size);
    }
  
    ctx.fillStyle = '#000000';
    ctx.fillRect(food.x*screen_size,food.y*screen_size,screen_size,screen_size);
  
    position.x += velocity.x;
    position.y += velocity.y;
    //Collisione con i bordi
    if (position.x < 0 || position.x > tile_size || position.y < 0 || position.y > tile_size) {
      initialize();
    }
  
    if (food.x === position.x && food.y === position.y) {
      snake.push({...position});
      position.x += velocity.x;
      position.y += velocity.y;
      randomFood();
    }
  
    if (velocity.x || velocity.y) {
      for (let cell of snake) {
        if (cell.x === position.x && cell.y === position.y) {
          return initialize();
        }
      }
      snake.push({...position});
      snake.shift();
    }
  }


