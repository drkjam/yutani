'use strict'

class Paddle extends Rectangle {
    constructor(x, y, width, height, minWidth, maxWidth) {
        super(x, y, width, height)

        //  Save initial position for resets.
        this.startX = x
        this.startY = y
        this.minWidth = minWidth
        this.maxWidth = maxWidth
    }

    reset() {
        this.x = this.startX
        this.y = this.startY
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
        let newX = this.x + x
        if(newX > this.minWidth && newX + this.width < this.maxWidth) {
            this.x = newX
        }
    }

    draw(g) {
        super.draw(g, 2, 'rgba(0, 255, 255, 1.0)', 'rgba(0, 255, 255, 0.5)')
    }

    detectCollision(ball) {
        if(circleTouchesRectangle(ball, this)) {
            //  Normalise the x coordinate of the ball between 0.0 (middle of paddle) and 1.0 (edge of paddle)
            let minX = this.x + (this.width / 2)
            let maxX = this.x + this.width
            let scalar = (ball.x - minX) / (maxX - minX)

            //  This vector points upwards from the top of the paddle.
            let normalVector = new Vector(scalar, -5)
            let bounceVector = reflect(ball.vector, normalVector)
            ball.vector.replaceWith(bounceVector)
            return true
        } else {
            return false
        }
    }

    toString() {
        return `paddle x: ${this.x}, y: ${this.y})`
    }
}

