'use strict'

class Vector {
    //  Represents a vector in R^2 (real coordinate space).
    constructor(x, y) {
        this.x = x
        this.y = y
    }

    draw(g, x, y, color='#00f') {
        let s = new Segment(x, y, this.x + x, this.y + y)
        let p = new Point(this.x + x, this.y + y)
        s.draw(g, 2, color)
        p.draw(g, 3, color)

    }

    update(x, y) {
        //  Update the x and y coordinates of this vector.
        this.x = x
        this.y = y
    }

    updateVector(v) {
        //  Update the x and y coordinates of this vector with the coordinates of another.
        this.x = v.x
        this.y = v.y
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

    unit() {
        //  Returns the unit vector for this vector.
        let magnitude = this.magnitude()
        return new Vector(this.x / magnitude, this.y / magnitude)
    }

    projection(v) {
        //  Returns a scalar that represents the magnitude of this vector projected onto another.
        return this.scale(v.dot(this) / this.dot(this))
    }

    toString() {
        return `Vector(x ${this.x} y: ${this.y})`
    }
}

function reflect(d, n, scalar=2) {
    // Returns a vector (r) that is the reflection of an incoming vector (d) relative to some other vector (n)
    //
    //  r = d − 2(d ⋅ n)n
    //
    // The vector n is usually some vector pointing outward from some surface.
    //
    // varying scalar will change angle of the reflection (0 = no reflection, 2 = 90 degree reflection)
    let u = n.unit()
    return d.subtract(u.scale(scalar * d.dot(u)))
}
