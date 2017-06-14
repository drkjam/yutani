'use strict'

class Ball extends Circle {
    constructor(x, y, radius, vector) {
        super(x, y, radius)
        this.vector = vector
        this.startX = x
        this.startY = y
        this.startDX = vector.x
        this.startDY = vector.y
    }

    draw(g) {
        super.draw(g, 2, 'rgba(0, 255, 255, 1.0)', 'rgba(0, 255, 255, 1.0)')
    }

    resetPosition() {
        this.x = this.startX
        this.y = this.startY
        this.vector.update(this.startDX, this.startDY)
    }

    switchX() {
        this.vector.x = -this.vector.x
    }

    switchY() {
        this.vector.y = -this.vector.y
    }

    move() {
        this.x += this.vector.x
        this.y += this.vector.y
    }

    hitWall(wall) {
        return circleTouchesRectangle(this, wall)
    }

    toString() {
        return `ball x: ${this.x}, y: ${this.y})`
    }
}
