'use strict'

class Engine {
    constructor(canvas, enableMouse=true) {
        //  Set up graphics context.
        this.running = false
        this.canvas = canvas
        this.width = canvas.width
        this.height = canvas.height
        this.g = canvas.getContext('2d')

        if(enableMouse) {
            this.mouse = new Mouse(canvas.offsetLeft, canvas.offsetTop, this.width, this.height)
            this.mouse.registerEvents(window, canvas)
        } else {
            console.log('mouse controls disabled')
        }
        this.frameId = null
    }

    clearScreen() {
        this.g.clearRect(0, 0, this.width, this.height)
    }

    drawFrame() {
        //  Override this method to implement all operation that draw a single frame.
        this.clearScreen()
    }

    updateState() {
        //  Override this method to implement all operations that update the engine state.
    }

    draw() {
        this.updateState()
        this.drawFrame()
        if(this.running) {
            this.frameId = requestAnimationFrame(this.draw.bind(this))
        }
    }

    stop() {
        this.running = false
    }

    start() {
        this.running = true
        this.draw()
    }
}
