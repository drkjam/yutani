'use strict'

class Brick extends Rectangle {
    constructor(x, y, width, height, color, strength=1) {
        super(x, y, width, height)
        this.color = color

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
            super.draw(g, 1, this.color, this.color)
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
    constructor(rows=6, cols=9, width=60, height=30, padding=5, offsetTop=120, offsetLeft=30) {
        this.rows = rows
        this.cols = cols
        this.remaining = this.rows * this.cols
        this.bricks = []
        this.width = width
        this.height = height
        this.padding = padding
        this.offsetTop = offsetTop
        this.offsetLeft = offsetLeft

        this.brickTypes = [
            {color: '#808080', strength: 2},
            {color: '#ff0000', strength: 1},
            {color: '#ffff00', strength: 1},
            {color: '#0000ff', strength: 1},
            {color: '#ff00ff', strength: 1},
            {color: '#00ff00', strength: 1},
        ]
    }

    reset() {
        this.bricks = []

        for (let i=0; i < this.cols; i++) {
            this.bricks[i] = []
            for (let j=0; j < this.rows; j++) {
                let brickType = this.brickTypes[j]
                let x = (i * (this.width + this.padding)) + this.offsetLeft
                let y = (j * (this.height + this.padding)) + this.offsetTop
                this.bricks[i][j] = new Brick(x, y, this.width, this.height, brickType.color, brickType.strength)
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
