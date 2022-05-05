class Food {
  constructor(x, y) {
    this.x = x
    this.y = y
  }
  render() {
    fill(0, 100, 50)
    rect(this.x, this.y, 10, 10)
  }
}

var foods = []
var genomemult = [150, 150, 150, 10, 10, 10, 10]

const matrix = math.matrix([[7, 1], [-2, 3]])
class Matrix {
  constructor(width, height) {
    this.width = width
    this.height = height
    this.matrix = []
    for (var i=0;i<this.height;i++) {
      this.matrix.push()
      for (var i=0;i<this.width;i++) {
        
      }
    }
  }
  render() {
    fill(0, 100, 50)
    rect(this.x, this.y, 10, 10)
  }
}

for (var l=0;l<10;l++) {
  foods.push(new Food(Math.random() * 512, Math.random() * 512))
}

class Agent {
  constructor(x, y, genome) {
    this.x = x;
    this.y = y;
    this.genome = genome;
    this.energy = 100;
    this.age = 0;
  }
  
  render() {
    fill(this.genome[0], this.genome[1], this.genome[2])
    ellipse(this.x, this.y, 10, 10)
  }
  update() {
    this.energy -= 1//  + ( 0.1 * pow(this.genome[4], 2));
    this.age += 1;
    this.x += (Math.random() * this.genome[4] * 2) - this.genome[4]
    this.y += (Math.random() * this.genome[4] * 2) - this.genome[4]


      if (this.energy > 210) {
        try{
          this.spawn()
        } catch {
          0;
        }
        
        this.energy -= 40;
      }
      for(var p=0;p<foods.length;p++) {
        try {
        var vec = getvec(this.x, this.y, foods[p].x, foods[p].y)
      
        if (Math.abs(vec) < 50) {
          this.energy += 200;
          delete foods[p]
        }
        } catch {
          0;
        }
      }
  
  }
  spawn() {
    
    if (Math.random() > 0.9) {
    var newgenome = this.genome.map(function(e) {
     return e + ((Math.random() * genomemult[this.genome.indexof(e)]) - ((genomemult[this.genome.indexof(e)] * 2)))
   })
    } else {
      var newgenome = this.genome
    }

    agents.push(new Agent(
    this.x,
    this.y,
    newgenome
  ));
  }
}

var agents = []

for(i=0; i<10; i++) {
  agents.push(new Agent(
    Math.random() * 512,
    Math.random() * 512,
    [Math.random() * 255, Math.random() * 255, Math.random() * 255, 100, 10 * Math.random()]
  ));
}

function setup() {
  var width = 512;
  var height = 512;

  createCanvas(width, height)
  background(210, 210, 210); 
  fill(0, 0, 255)
}
var frame = 0;

function draw() {
  frame += 1;

  background(210, 210, 210);
  for (i=0;i<agents.length;i++){
    if (agents[i].energy > 0 || agents[i].x < 0 || agents[i].y < 0 || agents[i].x > 512 || agents[i].y > 512) {
      agents[i].update();
      agents[i].render();
    } else {
      if (Math.random() > 0) {
        foods.push(new Food(Math.random() * 512, Math.random() * 512))
      }
      agents.splice(i, 1);
      
    }
  }
  for (i=0;i<foods.length;i++){
    try{
    0;//foods[i].render();
    } catch {
      0;
    }
  }
  
}

function getvec(x, y, otherx, othery) {
  return Math.sqrt((Math.pow(x, 2) - Math.pow(otherx, 2)) + Math.pow(y, 2) - Math.pow(othery, 2))
}