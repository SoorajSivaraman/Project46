class Thief
{
  constructor(x, y)
  {
    this.x = x;
    this.y = y;
    this.sprite = null;
    this.image = loadAnimation("ImageFiles/thief1.png", "ImageFiles/thief2.png",
    "ImageFiles/thief3.png", "ImageFiles/thief4.png", "ImageFiles/thief5.png",
    "ImageFiles/thief6.png", "ImageFiles/thief7.png", "ImageFiles/thief8.png",
    "ImageFiles/thief9.png", "ImageFiles/thief10.png");
    this.sprite = createSprite(this.x, this.y, 20, 20);
    this.sprite.addAnimation("moving", this.image);
    this.sprite.scale = 1.2;
    this.sprite.visible = false;
  }
};