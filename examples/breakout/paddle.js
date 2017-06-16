'use strict'

class Paddle extends Rectangle {
    constructor(x, y, width, height, minWidth, maxWidth) {
        super(x, y, width, height)

        //  Save initial position for resets.
        this.startX = x
        this.startY = y
        this.minWidth = minWidth
        this.maxWidth = maxWidth

        //  This vector points upwards, out of the top surface of the paddle.
        this.vector = new Vector(0, -1)
    }

    reset() {
        this.x = this.startX
        this.y = this.startY
    }

    moveLeft() {
        if(this.x > this.minWidth) {
            this.x -= 7
        }
    }

    moveRight() {
        if(this.x < this.maxWidth) {
            this.x += 7
        }
    }

    moveX(x) {
        if(this.x > this.minWidth && this.x + this.width < this.maxWidth) {
            this.x = x
        }
    }

    draw(g) {
        super.draw(g, 2, 'rgba(0, 255, 255, 1.0)', 'rgba(0, 255, 255, 0.5)')
    }

    detectCollision(ball) {
        if(circleTouchesRectangle(ball, this)) {
            let bounceVector = reflect(ball.vector, this.vector)
            ball.vector.updateVector(bounceVector)
            return true
        } else {
            return false
        }
    }

    toString() {
        return `paddle x: ${this.x}, y: ${this.y})`
    }
}

