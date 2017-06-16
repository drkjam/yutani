'use strict'

function reflect(d, n, scalar=2) {
    // Returns a vector (r) that is the reflection of an incoming vector (d) relative to some other vector (n)
    //
    //  r = d − 2(d ⋅ n)n
    //
    // The vector n is usually some vector point outward from some surface.
    //
    // varying scalar will change angle of the reflection (0 = no reflection, 2 = 90 degree reflection)
    let u = n.unit()
    return d.subtract(u.scale(scalar * d.dot(u)))
}

class Reflection extends Engine {
    constructor(canvas) {
        super(canvas)
        this.mouse = new Mouse(canvas.offsetLeft, canvas.offsetTop, this.width, this.height)
        this.blockTop = new Point(this.width / 2, this.height / 2)
        let blockWidth = 100
        let blockHeight = 25
        this.block = new Rectangle(this.blockTop.x - (blockWidth / 2), this.blockTop.y, blockWidth, blockHeight)

        this.collisionPoint = this.blockTop
    }

    registerEvents() {
        this.mouse.registerEvents(this.canvas)

        document.addEventListener('keydown', (e) => {
            if(e.key === 'ArrowLeft') {
                this.collisionPoint.x -= 2
            }
            else if(e.key === 'ArrowRight') {
                this.collisionPoint.x += 2
            }
            else if(e.key === 'ArrowUp') {
            }
            else if(e.key === 'ArrowDown') {
            }
        }, false)

    }

    drawFrame() {
        this.clearScreen()
        this.mouse.draw(this.g)
        this.block.draw(this.g, 2, '#e0e0e0')

        let collisionPoint = this.collisionPoint

        //  This is the vector heading toward the collision surface at the collision point.
        let s1 = new Segment(this.mouse.x, this.mouse.y, collisionPoint.x, collisionPoint.y)
        let d = s1.toVector()
        d.draw(this.g, this.mouse.x, this.mouse.y, '#00f')


        //  This is the vector pointing in the direction away from the collision surface at 90 degrees.
        let s2 = new Segment(collisionPoint.x, collisionPoint.y, collisionPoint.x, collisionPoint.y - 20)
        let n = s2.toVector()
        n.draw(this.g, collisionPoint.x, collisionPoint.y, '#ff0')

        //  Calculate the reflection vector.
        let r = reflect(d, n)
        r.draw(this.g, collisionPoint.x, collisionPoint.y, '#f00')
    }
}
