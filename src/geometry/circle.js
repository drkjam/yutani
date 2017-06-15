'use strict'

class Circle {
    //  Represents a circle in R^2 (real coordinate space).
    constructor(x, y, radius) {
        this.x = x
        this.y = y
        this.radius = radius
    }

    move(x, y) {
        this.x = x
        this.y = y
    }

    draw(g, size=2, strokeStyle='#000', fillStyle=null) {
        //  Draws this circle on canvas context (c).
        g.beginPath()
        g.arc(this.x, this.y, this.radius, 0, 2 * Math.PI)
        g.closePath()

        //  Draw circle outline.
        g.lineWidth = size
        g.strokeStyle = strokeStyle
        g.stroke()

        if (fillStyle !== null) {
            //  Fill circle color.
            g.fillStyle = fillStyle
            g.fill()
        }
    }

    contains(p) {
        //  Returns true if point falls within this circle, false otherwise.
        let s = new Segment(this.x, this.y, p.x, p.y)
        return s.length() <= this.radius
    }

    overlaps(c) {
        //  Returns true if circle overlaps this circle, false otherwise.
        let s = new Segment(this.x, this.y, c.x, c.y)
        return s.length() <= (this.radius + c.radius)
    }
}
