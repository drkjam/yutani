class Breakout extends Engine {
    constructor(canvas, enableKeyboard=true, enableMouse=true) {
        super(canvas, enableKeyboard, enableMouse)
        this.debug = false

        this.boundary = new Rectangle(0, 0, this.width, this.height)

        this.leftWall = new Wall(0, 40, 20, this.height)
        this.topWall = new Wall(0, 40, this.width, 20)
        this.rightWall = new Wall(this.width - 20, 40, this.width - 20, this.height)

        this.bricks = new Bricks()

        let paddleHeight = 20
        let paddleWidth = 100
        let paddleX = (this.width - paddleWidth) / 2
        let paddleY = (this.height - paddleHeight) - 4

        this.paddle = new Paddle(
            paddleX, paddleY,
            paddleWidth, paddleHeight,
            28, this.width - paddleWidth - 28
        )

        let ballRadius = 15
        let ballX = this.width / 2
        let ballY = paddleY - ballRadius - 1
        this.ballVelocity = new Vector(2, -2)
        this.ball = new Ball(ballX, ballY, ballRadius, this.ballVelocity)

        this.moveLeft = false
        this.moveRight = false

        this.lives = 3
        this.score = 0
        this.message = ''

        this.state = new State({
            'READY': ['RUNNING'],
            'PAUSED': ['RUNNING'],
            'RUNNING': ['PAUSED', 'WIN', 'GAME OVER'],
            'WIN': ['READY'],
            'GAME OVER': ['READY']
        }, 'READY')
    }

    speedUp() {
        this.ball.vector = this.ball.vector.scale(1.1)
        if(!this.running) {
            this.drawFrame()
        }
    }

    slowDown() {
        this.ball.vector = this.ball.vector.scale(0.9)
        if(!this.running) {
            this.drawFrame()
        }
    }

    reverseDirection() {
        this.ball.vector = this.ball.vector.scale(-1.0)
        if(!this.running) {
            this.drawFrame()
        }
    }

    toggleDebugMode() {
        this.debug = !this.debug
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

    registerEvents() {
        this.canvas.style.cursor = 'none'
        document.addEventListener('mousemove', (e) => {
            e.preventDefault()
            let relativeX = e.clientX - this.canvas.offsetLeft
            if(relativeX > 95 && relativeX < 550){
                this.paddle.x = relativeX - this.paddle.width / 2
            }
        }, false)

        window.addEventListener('keydown', (e) => {
            //  Space bar.
            if (e.keyCode === 0 || e.keyCode === 32) {
                e.preventDefault()
                if(!this.running) {
                    this.resetGame()
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
            else if(e.key === 'r') {
                this.reverseDirection()
            }
            else if(e.key === 'x') {
                this.gameOver()
            }
            else if(e.key === 'd') {
                this.toggleDebugMode()
            }
            else if(e.key === 's') {
                this.step()
            }
            else if(e.key === 'Escape') {
                this.togglePause()
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
            let v = this.ball.vector
            let s = new Segment(this.ball.x, this.ball.y, this.ball.x + v.x, this.ball.y + v.y)
            let p = new Point(this.ball.x + v.x, this.ball.y + v.y)
            s.draw(this.g, 2, '#00f')
            p.draw(this.g, 3, '#00f')
        }

        if(this.state.current === 'GAME OVER') {
            this.drawMessage(this.g)
        }

        this.drawScore(this.g)
        this.drawLives(this.g)
        this.drawMessageTop(this.g, this.state.current)
    }

    resetGame() {
        this.state.transition('READY')
        this.ball.resetPosition()
        this.message = ''
        this.start()
    }

    drawScore(g){
        g.font = '28px Impact'
        g.fillStyle = 'rgba(0, 255, 255, 1.0'
        let leftPadding = 10
        let text = "SCORE: " + this.score
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
        this.message = 'GAME OVER'
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

            if(this.paddle.hitBall(this.ball)) {
                this.ball.switchY()
            }

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
        this.state.transition('RUNNING')
    }

    stop() {
        super.stop()
        this.state.transition('PAUSED')
    }
}
