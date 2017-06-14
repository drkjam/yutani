'use strict'

class Wall extends Rectangle {
    constructor(x, y, width, height) {
        super(x, y, width, height)
    }

    draw(g) {
        super.draw(g, 2, 'rgba(0, 255, 255, 1.0)', 'rgba(0, 255, 255, 0.5)')
    }
}

