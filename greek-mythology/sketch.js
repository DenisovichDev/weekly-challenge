// By @Denisovich (Johnny Piss Face, according to Raph)
// Made for @sableRaph (Processing Community Main Man)
//
//
// Hi, I'm back.
//
// My girlfriend is a big Greek Mythology nerd,
// When I told her about this week's topic she got really excited 
// and told me that I have to make something.
// So I asked her for some stories, and she gave me this amazing
// story that I tried make something out of. So honks for her please.
//
// Theseus was the founder of Athens, who rescued the children 
// of Athens from King Minos after slaying the beast minotaur 
// in the labyrinth designed by Daedalus (father of Icarus)
// and then escaped onto a ship going to Delos. 
// Each year, the Athenians would commemorate this by taking the ship on a pilgrimage to Delos.
//
// Overtime they had to replace the planks because they would rot over time.
// This went on for centuries until the ship had none of the original parts left.
// 
// This gives us one of the most famous questions about identity:
// If each individual piece of the Ship of Theseus was replaced,
// one after the other, was it still the same ship?
//
// The Truchet is supposed to signify the labyrinth
//
// Each tile is a graphics object. This was actually pretty annoying to code.

let rows, cols, ulen;
const buffers = [];
const replaceBuffers = [];

const left = []; // list of indeces left to be replaced
let record = false
let counter = 0

function preload() {
    font = loadFont('FellEnglishSC.ttf');
}
function setup() {
    l = min(windowWidth, windowHeight);
    createCanvas(w = l, h = l);

    rows = cols = 20;
    ulen = l / rows;

    for (let idx = 0; idx < cols * rows; idx++) {
        buffers.push(new Buffer(idx, getPos(idx)));
        replaceBuffers.push(new Buffer(idx, null));
        left.push(idx);
    }

    shipBufferOriginal = createGraphics(w, h);
    shipBufferReplaced = createGraphics(w, h);
    createShip(shipBufferOriginal, true);
    createShip(shipBufferReplaced, false);
    

    for (let i = 0; i < buffers.length; i++) {
        let bf = buffers[i];
        let rbf = replaceBuffers[i];
        let pos = getPos(i);
        let tileBG1 = shipBufferOriginal.get(pos.x, pos.y, ulen, ulen);
        let tileBG2 = shipBufferReplaced.get(pos.x, pos.y, ulen, ulen);
        bf.gobj.image(tileBG1, 0, 0);
        rbf.gobj.image(tileBG2, 0, 0);
        drawTile(bf.gobj, random(tileObj));
        drawTile(rbf.gobj, random(tileObj));
    }


    // noLoop();

}

function draw() {
    background("#ffeac1");
    
    if (left.length != 0 && random() < 0.03) {
        replace(random(left));
    }


    // image(shipBufferOriginal, 0, 0);

    for (let i = 0; i < buffers.length; i++) {
        bf = buffers[i];
        rbf = replaceBuffers[i];
        bf.updateBuffer();
        rbf.updateBuffer();
        // Draw the ones that are not moving first,
        // to keep them in the bottom
        if (!bf.isMoving) {
            bf.drawBuffer();
        }
        if (!rbf.isMoving) {
            rbf.drawBuffer();
        }
    }
    // Then draw the moving buffers
    buffers.forEach(bf => {
        if (bf.isMoving) {
            bf.drawBuffer();
        }
    });
    
    replaceBuffers.forEach(rbf => {
        // console.log("WHAT");
        if (rbf.isMoving) {
            rbf.drawBuffer();
        }
    });

    if (record) {
        if (frameCount % 2 == 0 && counter < 1000) {
            save('greek-' + counter);
            counter++
        }
    }
    
}

function getPos(idx) {
    return { x: ulen * (idx % cols), y: ulen * Math.floor(idx / cols) }
}

function replace(idx) {
    bf1 = buffers[idx];
    bf2 = replaceBuffers[idx];

    bf2.move(getPos(idx));
    bf1.move(bf1.randomPosOutsideFrame());
}

function drawTile(buff, obj) {
    // buff.strokeWeight(3);
    // buff.rect(0, 0, buff.width, buff.height);
    buff.strokeWeight(buff.width / 11);
    buff.stroke(12, 3, 4, 150);
    for (let i = 0; i < 4; i++) {
        // Ends
        if (obj.ends[i]) {
            switch(i) {
                case 0:
                    buff.line(buff.width / 2, 0, buff.width / 2, buff.height / 10);
                    break
                case 1:
                    buff.line(buff.width, buff.height / 2, buff.width * 9 / 10, buff.height / 2);
                    break
                case 2:
                    buff.line(buff.width / 2, buff.height, buff.width / 2, buff.height * 9 / 10);
                    break
                case 3:
                    buff.line(0, buff.height / 2, buff.width / 10, buff.height / 2);
                    break
                default:
                    break;
            }
        }

        // lines
        if (obj.lines[i]) { // if index out of range, returns false
            switch(i) {
                case 0:
                    buff.line(buff.width / 2, 0, buff.width / 2, buff.height)
                    break
                case 1:
                    buff.line(0, buff.height / 2, buff.width, buff.height / 2)
                    break
                default:
                    break
                    
            }

        }

        // half lines
        if (obj.half[i]) {
            switch(i) {
                case 0:
                    buff.line(buff.width / 2, 0, buff.width / 2, buff.height / 2)
                    break
                case 1:
                    buff.line(buff.width, buff.height / 2, buff.width / 2, buff.height / 2)
                    break
                case 2:
                    buff.line(buff.width / 2, buff.height, buff.width / 2, buff.height / 2)
                    break
                case 3:
                    buff.line(0, buff.height / 2, buff.width / 2, buff.height / 2)
                    break
                default:
                    break
            }
        }

        // arcs
        // top-right, right-bottom, bottom-left, left-top
        if (obj.arc[i]) {
            buff.noFill();
            switch (i) {
                case 0:
                    buff.arc(buff.width, 0, buff.width, buff.width, HALF_PI, PI)
                    break
                case 1:
                    buff.arc(buff.width, buff.height, buff.width, buff.width, PI, 3 * PI / 2)
                    break
                case 2:
                    buff.arc(0, buff.height, buff.width, buff.width, 3 * PI / 2, TAU)
                    break
                case 3:
                    buff.arc(0, 0, buff.width, buff.width, 0, HALF_PI)
                    break
                default:
                    break
            }
        }
    }
}

const tileObj = [
    {
        ends: [0, 1, 0, 1], // top, right, bottom, left
        lines: [1, 0], // top-bottom, left-right
        half: [0, 0, 0, 0],
        arc: [0, 0, 0, 0] // top-right, right-bottom, bottom-left, left-top
    },
    {
        ends: [1, 0, 1, 0], // top, right, bottom, left
        lines: [0, 1], // top-bottom, left-right
        half: [0, 0, 0, 0],
        arc: [0, 0, 0, 0] // top-right, right-bottom, bottom-left, left-top
    },
    {
        ends: [0, 0, 1, 1], // top, right, bottom, left
        lines: [0, 0], // top-bottom, left-right
        half: [0, 0, 0, 0],
        arc: [1, 0, 0, 0] // top-right, right-bottom, bottom-left, left-top
    },
    {
        ends: [1, 1, 0, 0], // top, right, bottom, left
        lines: [0, 0], // top-bottom, left-right
        half: [0, 0, 0, 0],
        arc: [0, 0, 1, 0] // top-right, right-bottom, bottom-left, left-top
    },
    {
        ends: [1, 0, 0, 1], // top, right, bottom, left
        lines: [0, 0], // top-bottom, left-right
        half: [0, 0, 0, 0],
        arc: [0, 1, 0, 0] // top-right, right-bottom, bottom-left, left-top
    },
    {
        ends: [0, 1, 1, 0], // top, right, bottom, left
        lines: [0, 0], // top-bottom, left-right
        half: [0, 0, 0, 0],
        arc: [0, 0, 0, 1] // top-right, right-bottom, bottom-left, left-top
    },
    {
        ends: [0, 0, 0, 0], // top, right, bottom, left
        lines: [0, 0], // top-bottom, left-right
        half: [0, 0, 0, 0],
        arc: [1, 0, 1, 0] // top-right, right-bottom, bottom-left, left-top
    },
    {
        ends: [0, 0, 0, 0], // top, right, bottom, left
        lines: [0, 0], // top-bottom, left-right
        half: [0, 0, 0, 0],
        arc: [0, 1, 0, 1] // top-right, right-bottom, bottom-left, left-top
    },

    {
        ends: [0, 0, 0, 1], // top, right, bottom, left
        lines: [1, 0], // top-bottom, left-right
        half: [0, 1, 0, 0],
        arc: [0, 0, 0, 0] // top-right, right-bottom, bottom-left, left-top
    },
    {
        ends: [1, 0, 0, 0], // top, right, bottom, left
        lines: [0, 1], // top-bottom, left-right
        half: [0, 0, 1, 0],
        arc: [0, 0, 0, 0] // top-right, right-bottom, bottom-left, left-top
    },
    {
        ends: [0, 1, 0, 0], // top, right, bottom, left
        lines: [1, 0], // top-bottom, left-right
        half: [0, 0, 0, 1],
        arc: [0, 0, 0, 0] // top-right, right-bottom, bottom-left, left-top
    },
    {
        ends: [0, 0, 1, 0], // top, right, bottom, left
        lines: [0, 1], // top-bottom, left-right
        half: [1, 0, 0, 0],
        arc: [0, 0, 0, 0] // top-right, right-bottom, bottom-left, left-top
    },
    {
        ends: [0, 0, 0, 0], // top, right, bottom, left
        lines: [1, 1], // top-bottom, left-right
        half: [0, 0, 0, 0],
        arc: [0, 0, 0, 0] // top-right, right-bottom, bottom-left, left-top
    },
    {
        ends: [1, 1, 1, 1], // top, right, bottom, left
        lines: [0, 0], // top-bottom, left-right
        half: [0, 0, 0, 0],
        arc: [0, 0, 0, 0] // top-right, right-bottom, bottom-left, left-top
    }
]
