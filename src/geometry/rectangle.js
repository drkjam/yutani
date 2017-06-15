'use strict'

class Rectangle {
    //  Represents a rectangle in R^2 (real coordinate space).
    constructor(x, y, width, height) {
        this.x = x
        this.y = y
        this.width = width
        this.height = height
    }

    move(x, y) {
        this.x = x
        this.y = y
    }

    segments() {
        //  Returns a list of the individual segments associated with this rectangle.
        return [
            new Segment(this.x, this.y, this.x + this.width, this.y), // top
            new Segment(this.x + this.width, this.y, this.x + this.width, this.y + this.height), // right
            new Segment(this.x, this.y + this.height, this.x + this.width, this.y + this.height), //    bottom
            new Segment(this.x, this.y, this.x, this.y + this.height) // left
        ]
    }

    draw(g, size=2, strokeStyle='#000', fillStyle=null) {
        //  Draws this rectangle on canvas context (c).
        g.beginPath()
        g.rect(this.x, this.y, this.width, this.height)
        g.closePath()

        //  Draw rectangle outline.
        g.lineWidth = size
        g.strokeStyle = strokeStyle
        g.stroke()

        if (fillStyle !== null) {
            //  Fill rectangle color.
            g.fillStyle = fillStyle
            g.fill()
        }

    }

    contains(p) {
        //  Returns true if point lies within the boundary of this rectangle, false otherwise.
        if (p.x >= this.x && p.x <= this.y + this.width) {
            if (p.y >= this.y && p.y <= this.y + this.height) {
                return true
            }
        }
        return false
    }

    overlaps(r) {
        //  Returns true if rectangle's boundary overlaps this rectangle, false otherwise.
        return (this.x + this.width > r.x && r.x + r.width > this.x) && (this.y + this.height > r.y && r.y + r.height > this.y)
    }
}
