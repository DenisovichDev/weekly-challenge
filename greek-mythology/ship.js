function createShip(bf, isOriginal) {
    let bg = isOriginal ? "#e3a864" : "#cc8648";
    let fg = isOriginal ? "#64230d" : "#301106";
    let gr = isOriginal ? "#7b7b81" : "#57575b";
    let w = bf.width;
    let h = bf.height;
    bf.push();
    // bf.rect(bf.width / 2, bf.height / 2, 100, 100);

    bf.background(bg);
    
    // BUG REPORT: p5js quadraticVertex doesn't work with bezierVertex
    bf.translate(0, w * 0.1);


    // stick thing whatever it is called
    bf.strokeWeight(0.00635 * w);
    bf.stroke("#170803");
    bf.line(w * 0.61, h * 0.5, w * 0.61, h * 0.15)

    bf.noStroke();
    // the thing that does the wind thing
    // bf.noStroke();
    // bf.stroke(0)
    bf.fill("#fff4cf");
    bf.beginShape();
    bf.vertex(w * 0.46, h * 0.2);
    bf.vertex(w * 0.76, h * 0.2);
    bf.quadraticVertex(w * 0.7, h * 0.3, w * 0.76, h * 0.4);
    bf.vertex(w * 0.46, h * 0.4);
    bf.quadraticVertex(w * 0.4, h * 0.3, w * 0.46, h * 0.2);
    bf.endShape(CLOSE);
    
    bf.strokeWeight(0.00635 * w);
    bf.stroke("#170803");
    bf.line(w * 0.46, h * 0.2, w * 0.76, h * 0.2);
    bf.line(w * 0.76, h * 0.4, w * 0.46, h * 0.4);

    // back knife thing
    bf.noStroke();
    bf.fill("#fff4cf");
    bf.beginShape();
    bf.vertex(w * 0.8, h * 0.45);
    bf.quadraticVertex(w * 0.88, h * 0.36, w * 0.85, h * 0.3);
    bf.quadraticVertex(w * 0.93, h * 0.36, w * 0.8, h * 0.5);
    bf.endShape(CLOSE);
    bf.circle(w * 0.835, h * 0.3205, w * 0.05);

    bf.fill(gr);
    bf.beginShape();
    bf.vertex(w * 0.8, h * 0.45);
    bf.quadraticVertex(w * 0.855, h * 0.41, w * 0.865, h * 0.37);
    bf.quadraticVertex(w * 0.86, h * 0.42, w * 0.8, h * 0.47);
    bf.endShape(CLOSE);

    // ship body
    bf.fill(fg);
    bf.beginShape();
    bf.vertex(w * 0.1, h * 0.4);
    bf.bezierVertex(w * 0.1, h * 0.42, w * 0.11, h * 0.45, w * 0.15, h * 0.45);
    bf.vertex(w * 0.8, h * 0.45);
    bf.vertex(w * 0.81, h * 0.45);
    bf.vertex(w * 0.8, h * 0.455);
    bf.vertex(w * 0.8, h * 0.55);
    bf.bezierVertex(w * 0.77, h * 0.55, w * 0.77, h * 0.59, w * 0.8, h * 0.59);
    bf.vertex(w * 0.85, h * 0.59);
    bf.vertex(w * 0.85, h * 0.6);
    bf.vertex(w * 0.2, h * 0.6);
    bf.bezierVertex(w * 0.02, h * 0.59, w * 0.06, h * 0.4, w * 0.1, h * 0.4);
    bf.endShape(CLOSE);

    // shields
    bf.fill("#fff7df");
    bf.circle(w * 0.245, h * 0.478, w * 0.05);
    bf.circle(w * 0.3, h * 0.478, w * 0.05);
    bf.circle(w * 0.4, h * 0.478, w * 0.05);
    bf.circle(w * 0.455, h * 0.478, w * 0.05);
    bf.circle(w * 0.51, h * 0.478, w * 0.05);
    bf.circle(w * 0.61, h * 0.478, w * 0.05);
    bf.circle(w * 0.665, h * 0.478, w * 0.05);

    // The text
    let txt = "If all of your pieces have been replaced over time";
    bf.textAlign(CENTER);
    bf.textFont(font);
    bf.fill(255);
    bf.textSize(w * 0.034);
    bf.text(txt, w * 0.245, h * 0.54, w * 0.42, h * 0.1);
    bf.textSize(w * 0.045);
    bf.fill(0);
    bf.text("Is it still you?", w * 0.245, h * 0.7, w * 0.42, h * 0.2)

    bf.pop();
}
