class Target {
    constructor(x, y, s, buffer) {
        this.pos = createVector(x, y);
        this.size = s;
        this.arrows = [];
        this.totalScore = 0;
        this.buffer = buffer;
    }

    paint() {
        this.buffer.push();
        this.buffer.translate(this.pos.x, this.pos.y);

        this.buffer.rectMode(CENTER);

        let SF = this.size / 500;

        // drawing the target circles

        this.buffer.rect(0, 0, this.size, this.size);
        this.buffer.fill("lightblue");
        this.buffer.circle(0, 0, 490 * SF);
        this.buffer.fill("lightblue");
        this.buffer.circle(0, 0, 405 * SF);
        this.buffer.fill("red");
        this.buffer.circle(0, 0, 320 * SF);
        this.buffer.fill("red");
        this.buffer.circle(0, 0, 235 * SF);
        this.buffer.fill("gold");
        this.buffer.circle(0, 0, 150 * SF);
        this.buffer.fill("gold");
        this.buffer.circle(0, 0, 75 * SF);

        // drawing the target circle score text

        this.buffer.textAlign(CENTER, CENTER);

        this.buffer.fill(0);

        this.buffer.textSize(28);

        this.buffer.text("10", 20 * SF, 0);
        this.buffer.text("9", 60 * SF, 0);
        this.buffer.text("8", 100 * SF, 0);
        this.buffer.text("7", 138 * SF, 0);
        this.buffer.text("6", 175 * SF, 0);
        this.buffer.text("5", 215 * SF, 0);
        // text("1", 245 * SF, 0);
        this.buffer.pop();
    }

    calculateArrows(n) {
        let arrows = [];
        let SF = this.size / 500;
        let arrowRadius = 20 * SF;
        let totalScore = 0;
        for (let i = 0; i < n; i++) {
            let a = random(0, TWO_PI);
            let r = random(0, (450 / 2) * SF);

            let x = r * cos(a) + this.pos.x;
            let y = r * sin(a) + this.pos.y;

            // fill(255);

            // noFill();
            this.buffer.strokeWeight(1);
            this.buffer.circle(x, y, arrowRadius);

            let score;

            let tolerance = 3;

            // Calculating the score of the arrow using he diameter of the target circle + half of the radius of the arrow
            if (r < (75 * SF) / 2 + arrowRadius / 2 + tolerance) {
                score = 10;
            } else if (r < (150 * SF) / 2 + arrowRadius / 2 + tolerance) {
                score = 9;
            } else if (r < (235 * SF) / 2 + arrowRadius / 2 + tolerance) {
                score = 8;
            } else if (r < (320 * SF) / 2 + arrowRadius / 2 + tolerance) {
                score = 7;
            } else if (r < (405 * SF) / 2 + arrowRadius / 2 + tolerance) {
                score = 6;
            } else {
                score = 5;
            }

            arrows.push({ vec: createVector(x, y), score, a, r });

            console.log(score);

            totalScore += score;
        }

        this.totalScore = totalScore;

        // console.log("TOTAL SCORE:", totalScore);

        this.arrows = arrows;
    }

    paintArrows() {
        this.buffer.push();
        // translate(this.pos.x, this.pos.y);

        let SF = this.size / 500;
        let arrowRadius = 20 * SF;

        for (let i = 0; i < this.arrows.length; i++) {
            let x = this.arrows[i].vec.x;
            let y = this.arrows[i].vec.y;

            // let x = r * cos(a);
            // let y = r * sin(a);
            // noFill();
            this.buffer.fill(255);
            this.buffer.strokeWeight(1);
            this.buffer.noStroke();
            this.buffer.circle(x, y, arrowRadius);
        }

        this.buffer.pop();
    }
}