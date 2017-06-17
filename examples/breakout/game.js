'use strict'

class Breakout extends Engine {
    constructor(canvas) {
        super(canvas)
        this.debug = false

        this.boundary = new Rectangle(0, 0, this.width, this.height)

        this.leftWall = new Wall(0, 40, 20, this.height)
        this.topWall = new Wall(0, 40, this.width, 20)
        this.rightWall = new Wall(this.width - 20, 40, this.width - 20, this.height)

        this.moveLeft = false
        this.moveRight = false

        this.lives = 3
        this.score = 0
        this.highScore = 0
        this.message = ''

        this.state = new State({
            'READY': ['RUNNING'],
            'PAUSED': ['RUNNING'],
            'RUNNING': ['PAUSED', 'WIN', 'GAME OVER'],
            'WIN': ['READY'],
            'GAME OVER': ['READY']
        }, 'READY')

        this.bricks = new Bricks()
        this.bricks.initialise()
        this.resetGame()
    }

    toggleDebugMode() {
        this.debug = !this.debug
        console.log('debug:' + {true: 'on', false: 'off'}[this.debug])
        if(!this.running) {
            this.drawFrame()
        }
    }

    togglePause() {
        if(this.running) {
            this.stop()
        } else {
            this.start()
        }
    }

    step() {
        //  Pause the game and move the game state forward one step.
        if(this.running) {
            this.stop()
        }
        this.updateState()
        this.drawFrame()
    }

    speedUp() {
        this.ball.speedUp()
        if(!this.running) {
            this.drawFrame()
        }
    }

    slowDown() {
        this.ball.slowDown()
        if(!this.running) {
            this.drawFrame()
        }
    }

    movePaddle(e) {
        this.paddle.moveX(e.movementX)
    }

    lockChange() {
        if (document.pointerLockElement === canvas ||
            document.mozPointerLockElement === canvas) {
            console.log('pointer lock: locked')
            this.canvas.addEventListener('mousemove', this.movePaddle.bind(this), false)
        } else {
            console.log('pointer lock: unlocked')
            this.canvas.removeEventListener('mousemove', this.movePaddle.bind(this), false)
        }
    }

    registerEvents() {
        // pointer lock event listener
        // Hook pointer lock state change events for different browsers
        document.addEventListener('pointerlockchange', this.lockChange.bind(this), false);
        document.addEventListener('mozpointerlockchange', this.lockChange.bind(this), false);

        this.canvas.onclick = () => {
            this.canvas.requestPointerLock = (
                this.canvas.requestPointerLock ||
                this.canvas.mozRequestPointerLock
            )
            this.canvas.requestPointerLock()
        }

        document.addEventListener('wheel', (e) => {
            console.log('preventing mouse wheel')
            e.preventDefault()
        })

        window.addEventListener('keydown', (e) => {
            //  Space bar.
            if (e.keyCode === 0 || e.keyCode === 32) {
                e.preventDefault()
                if(this.running) {
                    this.togglePause()
                } else {
                    if(this.state.current === 'GAME OVER') {
                        this.restartGame()
                    } else {
                        this.start()
                    }
                }
            }
        }, false)

        document.addEventListener('keyup', (e) => {
            if(e.key === 'ArrowLeft') {
                this.moveLeft = false
            }
            else if(e.key === 'ArrowRight') {
                this.moveRight = false
            }
        }, false)

        document.addEventListener('keydown', (e) => {
            if(e.key === 'ArrowLeft') {
                this.moveLeft = true
            }
            else if(e.key === 'ArrowRight') {
                this.moveRight = true
            }
            else if(e.key === 'ArrowUp') {
                this.speedUp()
            }
            else if(e.key === 'ArrowDown') {
                this.slowDown()
            }
            else if(e.key === 'r' || e.key === 'R') {
                this.restartGame()
            }
            else if(e.key === 'p' || e.key === 'P') {
                this.togglePause()
            }
            else if(e.key === 'd') {
                this.toggleDebugMode()
                if(!this.running) {
                    this.drawFrame()
                }
            }
            else if(e.key === 's') {
                this.step()
            }
            else if(e.key === 'Escape') {
                document.exitPointerLock = (
                    document.exitPointerLock ||
                    document.mozExitPointerLock
                )
                document.exitPointerLock()
            }
        }, false)
    }

    drawFrame() {
        this.clearScreen()

        this.topWall.draw(this.g)
        this.leftWall.draw(this.g)
        this.rightWall.draw(this.g)
        this.bricks.draw(this.g, this.debug)
        this.ball.draw(this.g)
        this.paddle.draw(this.g)

        if(this.debug) {
            //  Draw velocity vector for the ball.
            this.ball.vector.scale(this.ball.radius).draw(this.g, this.ball.x, this.ball.y, '#f00')
        }

        if(this.state.current === 'GAME OVER') {
            this.drawMessage(this.g)
        }

        this.drawScore(this.g)
        this.drawLives(this.g)
        this.drawMessageTop(this.g, this.state.current)
    }

    resetGame() {
        let paddleHeight = 20
        let paddleWidth = 100
        let paddleX = (this.width - paddleWidth) / 2
        let paddleY = (this.height - paddleHeight) - 4

        this.paddle = new Paddle(
            paddleX, paddleY,
            paddleWidth, paddleHeight,
            25, this.width - 25
        )

        let ballRadius = paddleHeight / 2
        this.ball = new Ball(
            new Point(this.width / 2, this.paddle.y - ballRadius - 2),
            new Vector(-3, -4),
            ballRadius
        )

        this.message = ''
        this.state.transition('READY')
        // this.start()
    }

    restartGame() {
        this.bricks.initialise()
        this.resetGame()
        this.lives = 3
        this.score = 0

        this.message = ''
        this.state.transition('READY')
    }

    drawScore(g){
        g.font = '28px Impact'
        g.fillStyle = 'rgba(0, 255, 255, 1.0'
        let leftPadding = 10
        let text = "SCORE: " + this.score + " HISCORE: " + this.highScore
        let height = 30
        g.fillText(text, leftPadding, height)
    }

    drawLives(g){
        g.font = '28px Impact'
        g.fillStyle = 'rgba(0, 255, 255, 1.0'
        let text = "LIVES: " + this.lives
        let textWidth = g.measureText(text).width
        let rightPadding = 10
        let height = 30
        g.fillText(text, this.width - textWidth - rightPadding, height)
    }

    drawMessageTop(g, text='', size=28) {
        g.font = size + 'px Impact'
        g.fillStyle = 'rgba(0, 255, 255, 1.0'
        let textWidth = g.measureText(text).width
        let height = 30
        g.fillText(text, (this.width / 2) - (textWidth / 2), height)
    }

    drawMessage(g) {
        let text = this.message
        let alpha = 1.0
        for(let size = 100; size > 80; size-=2) {
            g.font = size + 'px Impact'
            g.fillStyle = `rgba(255, 255, 0, ${alpha})`
            let textWidth = g.measureText(text).width
            g.fillText(text, (this.width / 2) - (textWidth / 2), this.height / 2)
            alpha = alpha / 2.0
        }
    }

    levelCompleted() {
        this.state.transition('READY')
        this.message = 'LEVEL COMPLETED'
        this.drawFrame()
        this.stop()
    }

    gameOver() {
        this.state.transition('GAME OVER')
        console.log('state: game over')
        this.message = 'GAME OVER'
        if(this.score > this.highScore) {
            this.highScore = this.score
        }
        this.drawFrame()
        this.stop()
    }

    updateState() {
        if(!this.boundary.contains(this.ball)) {
            this.lives--
            this.resetGame()
        }

        if(this.lives > 0) {
            //  Handle collisions.
            if(this.ball.hitWall(this.leftWall) || this.ball.hitWall(this.rightWall)) {
                this.ball.switchX()
            }
            else if(this.ball.hitWall(this.topWall)) {
                this.ball.switchY()
            }

            this.paddle.detectCollision(this.ball)

            if(this.bricks.detectCollision(this.ball)) {
                this.score++
                if(this.bricks.remaining < 1) {
                    this.levelCompleted()
                }
            }

            //  Move objects to their next position.
            if(this.moveLeft) {
                this.paddle.moveLeft()
            }
            else if(this.moveRight) {
                this.paddle.moveRight()
            }

            this.ball.move()
        } else {
            this.gameOver()
        }
    }

    start() {
        super.start()
        console.log('running')
        this.state.transition('RUNNING')
    }

    stop() {
        super.stop()
        console.log('paused')
        this.state.transition('PAUSED')
    }
}
