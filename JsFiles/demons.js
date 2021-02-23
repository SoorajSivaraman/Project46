class Demons
{
    constructor(x, y, objNum, objIndex)
    {
      this.x = x;
      this.y = y;
      this.objNum = objNum;
      this.objIndex = objIndex;
      this.sprite = null;
      if(objNum === 7) this.image = naarangiImg;
      else if(objNum === 8) this.image = beerangiImg;
    }
  
    display()
    {
      this.sprite = createSprite(this.x, this.y, 20, 20);
      this.sprite.addImage(this.image);
      if(this.objNum === 7) this.sprite.scale = 0.1;
      if(this.objNum === 8) this.sprite.scale = 0.2;
      this.sprite.velocityX = -25 + velocityIncrease;
      this.sprite.lifetime = 60;
    }
};