color[] pallatte = {#592941,
                    #498467,
                    #52B788,
                    #B2D3A8,
                    #EDE5A6,
                    #DD9787}; 

int scl = 120;
ArrayList<Grid> grids;
int row = 1200 / scl;
int col = 1200 / scl;

void setup() {
  size(1200, 1200);
  background(255);
  grids = new ArrayList<Grid>();
  
  for (int i = 0; i < col; i ++) {
    for (int j = 0; j < row; j ++) {
      grids.add(new Grid(j, i));
    }
  }
}

void draw() {
  background(255);
  fill(0);
  noStroke();
  for (int i = 0; i < grids.size(); i++) {
    grids.get(i).show();
  }
}

void keyPressed() {
  saveFrame();
}
