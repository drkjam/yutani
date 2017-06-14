'use strict'

class Segment {
    //  Represents a line between two points in R^2 (real coordinate space).
    constructor(x1, y1, x2, y2) {
        this.x1 = x1
        this.y1 = y1
        this.x2 = x2
        this.y2 = y2
    }

    start() {
        //  Returns the start point of this segment.
        return new Point(this.x1, this.y1)
    }

    end() {
        //  Returns the end point of this segment.
        return new Point(this.x2, this.y2)
    }

    toVector() {
        //  Returns the vector for this segment. Assumes that start point is the origin.
        return new Vector(this.x2 - this.x1, this.y2 - this.y1)
    }

    length() {
        //  Returns the magnitude of the vector associated with this segment.
        return this.toVector().magnitude()
    }

    draw(c, size=2, strokeStyle='#000') {
        //  Draw this segment on canvas context (c).
        c.beginPath()
        c.moveTo(this.x1, this.y1)
        c.lineTo(this.x2, this.y2)
        c.closePath()
        c.lineWidth = size
        c.strokeStyle = strokeStyle
        c.stroke()
    }

    intersect(s) {
        //  Returns an object describing the intersection of this segment with another.
        let denominator = ((s.y2 - s.y1) * (this.x2 - this.x1)) - ((s.x2 - s.x1) * (this.y2 - this.y1))

        if (denominator === 0) {
            return {
                point: new Point(0, 0), parallel: true,
                a: false, b: false, both: false
            }
        }

        let a = this.y1 - s.y1
        let b = this.x1 - s.x1

        let numerator1 = ((s.x2 - s.x1) * a) - ((s.y2 - s.y1) * b)
        let numerator2 = ((this.x2 - this.x1) * a) - ((this.y2 - this.y1) * b)

        let c = numerator1 / denominator
        let d = numerator2 / denominator

        //  Calculate intersection point.
        let x = this.x1 + (c * (this.x2 - this.x1))
        let y = this.y1 + (c * (this.y2 - this.y1))

        return {
            point: new Point(x, y),
            parallel: false,
            a: (c > 0 && c < 1),
            b: (d > 0 && d < 1),
            both: (c > 0 && c < 1) && (d > 0 && d < 1)
        }
    }
}
