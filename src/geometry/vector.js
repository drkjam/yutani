'use strict'

class Vector {
    //  Represents a vector in R^2 (real coordinate space).
    constructor(x, y) {
        this.x = x
        this.y = y
    }

    update(x, y) {
        //  Update the x and y coordinates of this vector.
        this.x = x
        this.y = y
    }

    add(v) {
        //  Returns a new vector representing the addition of this vector with another.
        return new Vector(this.x + v.x, this.y + v.y)
    }

    subtract(v) {
        //  Returns a new vector representing the subtraction of this vector from another.
        return new Vector(this.x - v.x, this.y - v.y)
    }

    scale(scalar) {
        //  Returns a new vector with its magnitude scaled by specified value.
        return new Vector(this.x * scalar, this.y * scalar)
    }

    magnitude() {
        //  Returns the length of this vector.
        return Math.sqrt(this.x * this.x + this.y * this.y)
    }

    dot(v) {
        //  Returns a scalar representing the dot product of this vector with another.
        return this.x * v.x + this.y * v.y
    }

    projection(v) {
        //  Returns a scalar that represents the magnitude of this vector projected onto another.
        return this.scale(v.dot(this) / this.dot(this))
    }

    toString() {
        return `Vector(x ${this.x} y: ${this.y})`
    }
}