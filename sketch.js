let images = [];
let currentImageIndex = 0;
let displayTime = 150; // 每张图片的显示时长
let timer = 0;
let starAlpha = 0; // 初始透明度为0
let starSize = 50; // 初始星星大小
let fadeAlpha = 0; // 用于图2的渐入透明度
let scaleAmount = 1; // 图2的缩放比例

function preload() {
  images[0] = loadImage('1.jpg');
  images[1] = loadImage('2.jpg');
  images[2] = loadImage('3.jpg');
  images[3] = loadImage('4.jpg');
  images[4] = loadImage('5.jpg');
  images[5] = loadImage('6.jpg');
  images[6] = loadImage('7.jpg');
  images[7] = loadImage('8.jpg');
  images[8] = loadImage('9.jpg');
  images[9] = loadImage('10.jpg');
  images[10] = loadImage('11.jpg');
  images[11] = loadImage('12.jpg');
  images[12] = loadImage('13.jpg');
}

function setup() {
  createCanvas(1179, 1179); // 画布大小设置为 1179x1179
  imageMode(CENTER);
}

function draw() {
  background(0);

  if (currentImageIndex === 0) {
    // 绘制图1并显示星星效果
    image(images[currentImageIndex], width / 2, height / 2, 1179, 1179);

    // 控制星星的透明度和大小
    if (starAlpha < 255) {
      starAlpha += 5;
      starSize += 15; // 星星增大
    }
    drawStar(955, 303, starSize, starAlpha); // 星星从指定位置放大
//
    // 检查星星是否完全覆盖画布
    if (starSize >= max(width, height) * 2) { // 确保星星足够大
      currentImageIndex++;
      starAlpha = 0;
      starSize = 50;
    }
  } else if (currentImageIndex === 1) {
    // 图2的渐入效果和缩放
    fadeAlpha = min(fadeAlpha + 5, 255);
    scaleAmount = min(scaleAmount + 0.01, 2);

    // 绘制图2
    push();
    translate(690, 920);
    scale(scaleAmount);
    tint(255, fadeAlpha); // 使用渐入透明度
    image(images[currentImageIndex], 0, 0, 1179, 1179);
    pop();

    // 检查图2是否完全显示
    if (fadeAlpha >= 255 && scaleAmount >= 2) {
      currentImageIndex++;
      fadeAlpha = 0;
      scaleAmount = 1;
    }
  } else {
    // 绘制其他图片
    image(images[currentImageIndex], width / 2, height / 2, 1179, 1179);
  }

  // 更新计时器
  timer++;
  if (timer > displayTime) {
    currentImageIndex++;
    timer = 0;
    if (currentImageIndex >= images.length) {
      currentImageIndex = 0;
    }
  }
}

function drawStar(x, y, size, alpha) {
  fill(255, 215, 0, alpha); // 浅黄色，带有透明度
  noStroke();
  // 上三角形
  triangle(x, y - size, x - size * 0.2, y, x + size * 0.2, y);
  // 下三角形
  triangle(x, y + size, x - size * 0.2, y, x + size * 0.2, y);
  // 左三角形
  triangle(x - size, y, x, y - size * 0.2, x, y + size * 0.2);
  // 右三角形
  triangle(x + size, y, x, y - size * 0.2, x, y + size * 0.2);
}