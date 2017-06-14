'use strict'

class Point extends Vector {
    //  Represents a point in R^2 (real coordinate space).
    constructor(x, y) {
        super(x, y)
    }

    move(x, y) {
        this.x = x
        this.y = y
    }

    draw(g, size=3, style='#000') {
        //  Draw this point on canvas context (c).
        let radius = size
        g.beginPath()
        g.arc(this.x, this.y, radius, 0, 2 * Math.PI)
        g.closePath()

        //  Draw point outline.
        g.lineWidth = size
        g.strokeStyle = style
        g.stroke()

        //  Fill point color.
        g.fillStyle = style
        g.fill()
    }
}
