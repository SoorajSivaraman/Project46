class Police
{
  constructor(x, y, objNum, objIndex)
  {
    this.x = x;
    this.y = y;
    this.objNum = objNum;
    this.objIndex = objIndex;
    this.sprite = null;
    this.image = loadImage("ImageFiles/policeCar.png");
  }

  display()
  {
    this.sprite = createSprite(this.x, this.y, 20, 20);
    this.sprite.addImage(this.image);
    this.sprite.scale = 0.3;
    this.sprite.velocityX = -25 + velocityIncrease;
    this.sprite.lifetime = 60;
  }
};