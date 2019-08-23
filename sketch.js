const CANVAS_SIZE = 8
const TILE_SIZE = 50

const COLORS = {
  'WHITE': [230, 239, 243],
  'ORANGE': [164, 87, 39],
  'MAGENTA': [255, 0, 255],
  'LIGHT_BLUE': [0, 153, 255],
  'YELLOW': [184, 130, 33],
  'LIME': [191, 255, 0],
  'PINK': [255, 192, 203],
  'GRAY': [128, 128, 128],
  'SILVER': [192, 192, 192],
  'CYAN': [0, 255, 255],
  'PURPLE': [128, 0, 128],
  'BLUE': [0, 0, 255],
  'BROWN': [165, 42, 42],
  'GREEN': [0, 255, 0],
  'RED': [255, 0, 0],
  'BLACK': [0, 0, 0],

  'COBBLE': [128, 128, 128],
  'SPONGE': [184, 130, 33],
  'BRICK': [255, 0, 0],
  'LAPIS': [0, 0, 255],
  'DIAMOND': [0, 153, 255],
  'COAL': [5, 5, 5],
  'LEAVES': [0, 255, 0],
  'DIRT': [165, 42, 42],
}

var grid = [];
var selectedTile = [-1, -1]
var buttons = [];
var paintColor = 'BLACK'

for (var i = 0; i < CANVAS_SIZE * CANVAS_SIZE; i++) {
  grid.push('WHITE')
}

function setup() {
  createCanvas(CANVAS_SIZE * TILE_SIZE + 50, CANVAS_SIZE * TILE_SIZE + 50);

  console.log(Object.keys(COLORS))
  for (var i = 0; i < Object.keys(COLORS).length; i++) {
    var button = createButton(Object.keys(COLORS)[i]);

    var x = 80 * i;
    var y = 500;

    if (i > 6) {
      x = 80 * (i - 7)
      y += 50
    }

    if (i > 12) {
      x = 80 * (i - 13)
      y += 50
    }

    const newI = i;
    button.position(x, y);
    button.mousePressed(function () {
      console.log(newI)
      paintColor = Object.keys(COLORS)[newI]
    });
  }

  var printBTN = createButton("I'M DONEEEEE");
  printBTN.position(0, 600);
  printBTN.mousePressed(function () {
    var out = "{"
    for (var i = 0; i < grid.length; i++) {
      // if (i % 8 == 0 && i != 0) {
      //   out += '}'
      // }
      out += i % 8 == 0 ? "{" : " ";
      out += grid[i] + (i % 8 == 7 ? "}," : ", ")
    }
    out += '}'
    alert(out)
  });
}

function mouseClicked() {
  console.log(selectedTile)
  grid[selectedTile[0] + (selectedTile[1] * CANVAS_SIZE)] = paintColor;
}

function draw() {
  // background(0);
  fill(0);
  foundTile = false;
  for (var i = 0; i < CANVAS_SIZE; i++) {
    for (var j = 0; j < CANVAS_SIZE; j++) {
      colorRGB = COLORS[grid[i + (j * CANVAS_SIZE)]];
      fill(colorRGB[0], colorRGB[1], colorRGB[2])

      if (((TILE_SIZE + 2) * i) + TILE_SIZE > mouseX && mouseX > (TILE_SIZE + 2) * i) {
        if (((TILE_SIZE + 2) * j) + TILE_SIZE > mouseY && mouseY > (TILE_SIZE + 2) * j) {
          fill(155);
          selectedTile = [i, j]
          foundTile = true
        } else {
          fill(colorRGB[0], colorRGB[1], colorRGB[2])
        }
      } else {
        fill(colorRGB[0], colorRGB[1], colorRGB[2])
      }
      rect((TILE_SIZE + 2) * i, (TILE_SIZE + 2) * j, TILE_SIZE, TILE_SIZE);
    }
  }

  if (!foundTile)
    selectedTile = [-1, -1]

  // if (mouseIsPressed) {
  //   fill(0);
  // } else {
  //   fill(255);
  // }
  // ellipse(mouseX, mouseY, 80, 80);
}