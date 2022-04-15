import { random, normalDistribution } from "./utils";

type Center = {
  x: number;
  y: number;
};

const Gravity = 1;
const Res = 0.03;
export default class Ball {
  center: Center;
  color: string;
  radius: number;
  stageWidth: any;
  stageHeight: any;
  floor: number;
  vx: number;
  vy: number;
  rIncreasement: number;
  idx: number;
  negative: number;
  radiusIncreasement: number;
  reductionRate: number;

  constructor(center: Center, idx: number) {
    this.idx = idx;
    this.center = center;
    this.color = "#eee";
    this.radius = random(5, 20, "int");
    this.floor = document.body.clientHeight - 150;
    this.negative = Math.random() > 0.5 ? 1 : -1;
    this.vy = normalDistribution(-6, 3);
    this.vx = normalDistribution(3, 2);
    this.vx *= this.negative;
    this.reductionRate = normalDistribution(0.002, 0.0013);
    this.radiusIncreasement = -(this.radius * this.reductionRate);
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.arc(this.center.x, this.center.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }
}
