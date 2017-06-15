'use strict'

class Mouse {
    constructor(offsetX=0, offsetY=0, x=0, y=0) {
        this.offsetX = offsetX
        this.offsetY = offsetY
        this.x = x
        this.y = y
    }

    draw(g, size=3, style='#f00') {
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

    registerEvents(element) {
        // element.style.cursor = 'none'
        //
        //  Handle mouse movement events.
        window.addEventListener('mousemove', e => {
            this.x = e.clientX - this.offsetX
            this.y = e.clientY - this.offsetY
        }, false)

        //  Handle window resize events.
        window.addEventListener('resize', () => {
            this.offsetX = element.offsetLeft
            this.offsetY = element.offsetTop
        }, false)
    }
}
