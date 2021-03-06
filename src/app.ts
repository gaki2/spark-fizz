/* eslint-disable no-param-reassign */
import "../style.css";
import Ball from "./ball";
import { random } from "./utils";

const GRAVITY = 0.3;

class App {
  pixelRatio: number;
  stageWidth: number;
  stageHeight: number;
  ball: Ball;
  canvas: HTMLCanvasElement;
  reflectionCanvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D | null;
  reflectionCtx: CanvasRenderingContext2D | null;
  balls: {
    [index: number]: Ball;
  };
  ballIdx: number;
  center: { x: number; y: number };
  mouseX: number;
  mouseY: number;
  constructor() {
    this.canvas = document.createElement("canvas");
    this.reflectionCanvas = document.createElement("canvas");
    this.reflectionCanvas.style.filter = "blur(10px)";
    this.ctx = this.canvas.getContext("2d");
    this.reflectionCtx = this.reflectionCanvas.getContext("2d");
    document.getElementById("canvas_container1")!.appendChild(this.canvas);
    document
      .getElementById("canvas_container2")!
      .appendChild(this.reflectionCanvas);
    this.ballIdx = 0;
    this.pixelRatio = 1;

    this.balls = {};
    this.resize();
    this.mouseX = 400;
    this.mouseY = 300;
    const interval = setInterval(this.makeBall.bind(this), 10);
    window.addEventListener("resize", this.resize.bind(this));
    window.requestAnimationFrame(this.animate.bind(this));
    window.addEventListener("mousemove", this.mouseMove.bind(this));
  }

  mouseMove(e: MouseEvent) {
    this.mouseX = e.clientX;
    this.mouseY = e.clientY;
  }

  makeBall() {
    const newBall = new Ball({ x: this.mouseX, y: this.mouseY }, this.ballIdx);
    this.balls[this.ballIdx] = newBall;
    this.ballIdx += 1;
  }

  resize() {
    this.stageWidth = document.body.clientWidth;
    this.stageHeight = document.body.clientHeight;
    this.canvas.width = this.stageWidth;
    this.canvas.height = this.stageHeight * 0.8;
    this.reflectionCanvas.width = this.stageWidth;
    this.reflectionCanvas.height = this.stageHeight * 0.8;
  }

  floorCollide(ball: Ball) {
    if (ball.center.y + ball.radius > this.canvas.height) {
      ball.center.y = this.canvas.height - ball.radius;
      ball.vy /= -random(1, 2);
    }
  }

  gravity(ball: Ball) {
    ball.vy += GRAVITY;
    ball.vx *= 0.99;
    ball.center.x += ball.vx;
    ball.center.y += ball.vy;
    ball.radius += ball.radiusIncreasement;
    if (ball.radius <= 0) {
      delete this.balls[ball.idx];
    }
  }

  animate() {
    window.requestAnimationFrame(this.animate.bind(this));

    this.ctx!.clearRect(0, 0, this.stageWidth, this.stageHeight);
    this.reflectionCtx!.clearRect(0, 0, this.stageWidth, this.stageHeight);
    // eslint-disable-next-line no-restricted-syntax
    for (const key in this.balls) {
      if (Object.prototype.hasOwnProperty.call(this.balls, key)) {
        const nowBall = this.balls[key];
        this.gravity(nowBall);
        this.floorCollide(nowBall);
      }
    }
    // eslint-disable-next-line no-restricted-syntax
    for (const key in this.balls) {
      if (Object.prototype.hasOwnProperty.call(this.balls, key)) {
        const nowBall = this.balls[key];
        nowBall.draw(this.ctx!);
        nowBall.draw(this.reflectionCtx!);
      }
    }
  }
}

window.onload = () => {
  const app = new App();
};
