class Grid {
  int row, col, l, shapeID, colID;
  float x, y;

  Grid(int row_, int col_) {
    row = row_;
    col = col_;
    x = col * scl;
    y = row * scl;
    l = 60;
    shapeID = floor(random(6));
    colID = floor(random(6));
  }

  void show() {
    switch(colID) {
    case 0: 
      fill(palette[0]);
      break;
    case 1: 
      fill(palette[1]);
      break;
    case 2: 
      fill(palette[2]);
      break;
    case 3: 
      fill(palette[3]);
      break;
    case 4: 
      fill(palette[4]);
      break;
    case 5: 
      fill(palette[5]);
      break;
    }
    switch(shapeID) {
    case 0: 
      draw0();
      break;
    case 1: 
      draw1();
      break;
    case 2: 
      draw2();
      break;
    case 3: 
      draw3();
      break;
    case 4: 
      draw4();
      break;
    case 5: 
      draw5();
      break;
    }
  }

  void draw0() {
    beginShape();
    vertex(x, y);
    vertex(x + scl, y);
    vertex(x + scl/2, y + scl/2);
    endShape();
  }
  void draw1() {
    beginShape();
    vertex(x + scl, y);
    vertex(x + scl/2, y + scl/2);
    vertex(x + scl, y + scl/2);
    endShape();
  }
  void draw2() {
    beginShape();
    vertex(x + scl/2, y + scl/2);
    vertex(x + scl, y + scl/2);
    vertex(x + scl, y + scl);
    endShape();
  }
  void draw3() {
    beginShape();
    vertex(x + scl, y + scl);
    vertex(x, y + scl);
    vertex(x + scl/2, y + scl/2);
    endShape();
  }
  void draw4() {
    beginShape();
    vertex(x, y + scl);
    vertex(x + scl/2, y + scl/2);
    vertex(x, y + scl/2);
    endShape();
  }
  void draw5() {
    beginShape();
    vertex(x + scl/2, y + scl/2);
    vertex(x, y + scl/2);
    vertex(x, y);
    endShape();
  }
}
