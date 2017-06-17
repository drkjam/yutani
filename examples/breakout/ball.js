'use strict'

class Ball extends Circle {
    constructor(p, v, radius) {
        super(p.x, p.y, radius)
        this.vector = v
    }

    draw(g) {
        super.draw(g, 2, 'rgba(0, 255, 255, 1.0)', 'rgba(0, 255, 255, 0.25)')
    }

    reset(p, v) {
        this.x = p.x
        this.y = p.y
        this.vector.x = v.x
        this.vector.y = v.y
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

    speedUp() {
        this.vector = this.vector.scale(1.1)
    }

    slowDown() {
        this.vector = this.vector.scale(0.9)
    }

    reverseDirection() {
        this.vector = this.vector.scale(-1.0)
    }
}
