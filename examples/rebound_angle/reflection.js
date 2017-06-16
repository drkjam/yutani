'use strict'

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
                if(this.collisionPoint.x > this.block.x) {
                    this.collisionPoint.x -= 2
                }
            }
            else if(e.key === 'ArrowRight') {
                if(this.collisionPoint.x < this.block.x + this.block.width) {
                    this.collisionPoint.x += 2
                }
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

        let cp = this.collisionPoint

        //  This is the vector heading toward the collision surface at the collision point.
        let s1 = new Segment(this.mouse.x, this.mouse.y, cp.x, cp.y)
        let d = s1.toVector()
        d.draw(this.g, this.mouse.x, this.mouse.y, '#e0e0e0')


        //  This is the vector pointing in the direction away from the collision surface at 90 degrees.
        let minX = this.block.x + (this.block.width / 2)
        let maxX = this.block.x + this.block.width

        let scalar = normalise(cp.x, minX, maxX)

        let s2 = new Segment(cp.x, cp.y, cp.x + (scalar * 10), cp.y - 100)
        let n = s2.toVector()
        n.draw(this.g, cp.x, cp.y, '#ff0')

        //  Calculate the reflection vector.
        //  Negative reflection ("shines through" the collision surface e.g. light striking water surface).
        // let r1 = reflect(d, n, -Math.PI)
        // let r2 = reflect(d, n, -2)
        // let r3 = reflect(d, n, -1)

        //  Positive reflection (e.g. one object bouncing off another).
        // let r4 = reflect(d, n, 0)   //  At 0, the vector passes straight through the collision point without deviating.
        let r5 = reflect(d, n, 1)   //  At 1 the vector rolls along the surface.
        let r6 = reflect(d, n, 2)   //  At 2, the vector reflects at an equal but opposite angle
        let r7 = reflect(d, n, Math.PI)

        // r1.draw(this.g, collisionPoint.x, collisionPoint.y, 'rgba(0, 0, 255, 0.25)')
        // r2.draw(this.g, collisionPoint.x, collisionPoint.y, 'rgba(0, 0, 255, 0.5)')
        // r3.draw(this.g, collisionPoint.x, collisionPoint.y, 'rgba(0, 0, 255, 0.75)')
        // r4.draw(this.g, collisionPoint.x, collisionPoint.y, 'rgba(0, 0, 255, 1.0)')
        r5.draw(this.g, cp.x, cp.y, 'rgba(0, 255, 0, 1.0)')
        r6.draw(this.g, cp.x, cp.y, 'rgba(255, 255, 0, 0.5)')
        r7.draw(this.g, cp.x, cp.y, 'rgba(255, 255, 0, 0.25)')
    }
}

function normalise(x, min_value, max_value){
    //  Normalises the value of x between 0.0 and 1.0.
    return (x - min_value) / (max_value - min_value)
}
