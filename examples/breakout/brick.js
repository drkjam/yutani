'use strict'

class Brick extends Rectangle {
    constructor(x, y, width, height, strength=2) {
        super(x, y, width, height)

        this.maxStrength = strength
        this.strength = strength

        this.top = new Segment(x, y, x + width, y)
        this.right = new Segment(x + width, y, x + width, y + height)
        this.bottom = new Segment(x, y + height, x + width, y + height)
        this.left = new Segment(x, y, x, y + height)

        this.top.show = false
        this.right.show = false
        this.bottom.show = false
        this.left.show = false
    }

    draw(g, showEdges=false) {
        if (this.strength > 0) {
            let fillAlpha = this.strength / this.maxStrength
            super.draw(g, 1, 'rgba(255, 0, 255, 1.0)', `rgba(255, 0, 255, ${fillAlpha})`)
            if(showEdges) {
                if(this.top.show) {
                    this.top.draw(g, 2, '#00f')
                    // this.top.show = false
                }
                if(this.right.show) {
                    this.right.draw(g, 2, '#00f')
                    // this.right.show = false
                }
                if(this.bottom.show) {
                    this.bottom.draw(g, 2, '#00f')
                    // this.bottom.show = false
                }
                if(this.left.show) {
                    this.left.draw(g, 2, '#00f')
                    // this.left.show = false
                }
            }
        }
    }

    detectCollision(ball) {
        if (this.strength > 0) {
            if(circleTouchesSegment(ball, this.bottom)) {
                this.strength--
                this.bottom.show = true
                ball.switchY()
                return true
            }
            else if(circleTouchesSegment(ball, this.right)) {
                this.strength--
                this.right.show = true
                ball.switchX()
                return true
            }
            else if(circleTouchesSegment(ball, this.top)) {
                this.strength--
                this.top.show = true
                ball.switchY()
                return true
            }
            else if(circleTouchesSegment(ball, this.left)) {
                this.strength--
                this.left.show = true
                ball.switchX()
                return true
            }
        }
        return false
    }
}


class Bricks {
    constructor(rows=5, cols=9, width=60, height=30, padding=5, offsetTop=120, offsetLeft=30) {
        let strength = 2
        this.rows = rows
        this.cols = cols
        this.remaining = this.rows * this.cols
        this.bricks = []
        for (let i=0; i < this.cols; i++) {
            this.bricks[i] = []
            for (let j=0; j < this.rows; j++) {
                let x = (i * (width + padding)) + offsetLeft
                let y = (j * (height + padding)) + offsetTop
                this.bricks[i][j] = new Brick(x, y, width, height, strength)
            }
        }
    }

    draw(g, showEdges=true) {
        for(let i=0; i < this.cols; i++) {
            for(let j=0; j < this.rows; j++) {
                this.bricks[i][j].draw(g, showEdges)
            }
        }
    }

    detectCollision(ball) {
        for(let i=0; i < this.cols; i++) {
            for(let j=0; j < this.rows; j++) {
                let brick = this.bricks[i][j]
                if(brick.detectCollision(ball)) {
                    if(brick.strength < 1) {
                        this.remaining--
                    }
                    return true
                }
            }
        }
        return false
    }
}
