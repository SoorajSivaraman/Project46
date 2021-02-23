var gameState = 0;
var wealthCount = 0;
var thief;
var thiefImg;
var bgrd1, bgrd2, bgrdImg, instructionsBGRD;
var gem, objectsArray;
var police1, police2;
var objectIndex = 0;
var lifeCount = 25;
var upperInvisible, lowerInvisible;
var playIcon, playIconImg, restartIcon, restartIconImg;
var naarangi1, naarangi2, beerangi1, beerangi2;
let gemCollectSound, policeSirenSound, naarangiComingSound, beerangiComingSound;
let explosionSound, gameOverMusic, gamePlayMusic;
var startSprite;
var startSpriteImg, endBGRDImg;
var startTime = null;
var latestTime = null;
var elapsedTime = null;
var velocityIncreaseTime = 0;
var velocityIncrease = 0;
var velIncDone = false;
var choruIntroSprite, naarangiIntroSprite, beerangiIntroSprite;
var naarangiImg, beerangiImg;

function preload()
{
  gemCollectSound = loadSound("SoundFiles/gemCollectSound.wav");
  policeSirenSound = loadSound("SoundFiles/policeSiren.wav");
  naarangiComingSound = loadSound("SoundFiles/naarangiComingSound.wav");
  beerangiComingSound = loadSound("SoundFiles/beerangiSound.mp3");
  explosionSound = loadSound("SoundFiles/explosion.wav");
  gameOverMusic = loadSound("SoundFiles/gameOverMusic.mpeg");
  gamePlayMusic = loadSound("SoundFiles/gamePlayMusic.wav");

  bgrdImg = loadImage("ImageFiles/background.jpg");
  instructionsBGRD = loadImage("ImageFiles/instructionsBGRD.jpg");
  playIconImg = loadImage("ImageFiles/playIcon.png");
  startSpriteImg = loadImage("ImageFiles/choruStartState.png");
  endBGRDImg = loadImage("ImageFiles/ChoruBehindBars.jpg");
  restartIconImg = loadImage("ImageFiles/restartIcon.png");
  naarangiImg = loadImage("ImageFiles/naarangi.png");
  beerangiImg = loadImage("ImageFiles/beerangi.png");
}
function setup()
{
  createCanvas(displayWidth, displayHeight);
  bgrd1 = createSprite(displayWidth/2, displayHeight/2, displayWidth, displayHeight);
  bgrd1.addImage(bgrdImg);
  bgrd1.scale = 2.2;
  bgrd1.visible = false;

  bgrd2 = createSprite(displayWidth + displayWidth/2, displayHeight/2, displayWidth, displayHeight);
  bgrd2.addImage(bgrdImg);
  bgrd2.scale = 2.2;
  bgrd2.visible = false;

  upperInvisible = createSprite(displayWidth/2, 35, displayWidth, 5);
  upperInvisible.visible = false;
  lowerInvisible = createSprite(displayWidth/2, displayHeight - 5, displayWidth, 5);
  lowerInvisible.visible = false;

  thief = new Thief(displayWidth/10, displayHeight/2 + 300);

  playIcon = createSprite(displayWidth/2 + 100, displayHeight - 185);
  playIcon.addImage(playIconImg);
  playIcon.scale = 0.3;

  startSprite = createSprite(displayWidth - 200, displayHeight - 150, 20, 20);
  startSprite.addImage(startSpriteImg);
  startSprite.scale = 0.4;

  restartIcon = createSprite(displayWidth/2, displayHeight/2, 20, 20);
  restartIcon.addImage(restartIconImg);
  restartIcon.scale = 0.2;
  restartIcon.visible = false;

  choruIntroSprite = createSprite(displayWidth/3.5 + 600, 90, 20, 20);
  choruIntroSprite.addAnimation("moving", thief.image);
  choruIntroSprite.scale = 1;
  choruIntroSprite.visible = false;

  naarangiIntroSprite = createSprite(displayWidth/3.5, displayHeight - 100, 20, 20);
  naarangiIntroSprite.addImage(naarangiImg);
  naarangiIntroSprite.scale = 0.1;
  naarangiIntroSprite.visible = false;

  beerangiIntroSprite = createSprite(displayWidth/3.5 + 200, displayHeight - 100, 20, 20);
  beerangiIntroSprite.addImage(beerangiImg);
  beerangiIntroSprite.scale = 0.2;
  beerangiIntroSprite.visible = false;

  objectsArray = new Array();
}

function draw()
{
  background(255);

  if(gameState === 0)
  {
    gameStart();
  }

  if(gameState === 1)
  {
    gamePlay("sprites");
  }

  if(gameState === 2)
  {
    gameEnd();
  }

  drawSprites(); 

  if(gameState === 1)
  {
    gamePlay("string");
  }
}

function destroyAllSprites()
{
  thief.sprite.destroy();
  for(var i = 0; i < objectsArray.length; i++)
  {
    if(objectsArray.sprite != null) objectsArray[i].sprite.destroy();
  }
}

function gameStart()
{
  background(instructionsBGRD);
  choruIntroSprite.visible = true;
  naarangiIntroSprite.visible = true;
  beerangiIntroSprite.visible = true;
  fill("white");
  textSize(30);
  textFont("Lucida Calligraphy");
  text("BHAAGH  CHORU  BHAAGH !!", displayWidth/3.5, 100);
  textSize(20);
  text("* You are a night-time Robinhood CHORU who robs wealth from the rich and gives it to the poor.", displayWidth/11, 200);
  text("* You need to accumulate as much wealth as possible without getting caught by the police.", displayWidth/11, 265);
  text("* You can use the UP and DOWN Arrow Keys to move CHORU.", displayWidth/11, 330);
  text("* CHORU can collect a variety of wealth like DIAMOND, GOLD, SILVER, BRONZE and CASH to become rich.", displayWidth/11, 395);
  text("* Choru has to be beware of the Twin Demons NAARANGI and BEERANGI who steal wealth from CHORU.", displayWidth/11, 460);
  text("* CHORU has 25 lives to escape from the cop.", displayWidth/11, 525);
  text("* Press the PLAY Button to help CHORU do a good deed.", displayWidth/11, 590);
  textFont("Matura MT Script Capitals");
  fill("black");
  textSize(32);
  text("Naarangi & Beerangi Brothers", displayWidth/3.5 - 75, displayHeight - 40);
  if(playIcon != null)
  {
    if(mousePressedOver(playIcon))
    {
      playIcon.destroy();
      startSprite.destroy();
      choruIntroSprite.destroy();
      naarangiIntroSprite.destroy();
      beerangiIntroSprite.destroy();
      gamePlayMusic.loop();
      gameState = 1;
      startTime = new Date();
    }
  }
}

function gamePlay(input)
{
  if(input === "sprites")
  {
    latestTime = new Date();
    elapsedTime = Math.round((latestTime - startTime)/1000);

    if(elapsedTime != 0 && elapsedTime % 30 === 0 && ! velIncDone)
    {
      velocityIncreaseTime = elapsedTime;
      velocityIncrease = velocityIncrease - 5;
      velIncDone = true;
    }

    if((elapsedTime - velocityIncreaseTime) >= 5)
    {
      velIncDone = false;
      velocityIncreaseTime = 0;
    }

  if(keyDown("up")) thief.sprite.velocityY = -10;

  if(keyDown("down")) thief.sprite.velocityY = 10;

  if(keyWentUp("up") || keyWentUp("down")) thief.sprite.velocityY = 0;
  bgrd1.visible = true;
  bgrd2.visible = true;
  
  bgrd1.velocityX = -2;
  bgrd2.velocityX = -2;

  thief.sprite.visible = true;
  thief.sprite.collide(upperInvisible);  
  thief.sprite.collide(lowerInvisible);

  if(bgrd2.x === displayWidth/2) bgrd1.x = displayWidth + displayWidth/2;
  if(bgrd1.x === displayWidth/2) bgrd2.x = displayWidth + displayWidth/2;
  if(frameCount % 20 === 0)
  {
    var r = Math.round(random(1, 8));
    if(r < 6)
    {
      gem = new Gems(displayWidth, random(displayHeight/10, displayHeight - 50), r, objectIndex);
      objectsArray[objectIndex] = gem;
      gem.display();
      objectIndex = objectIndex + 1;
    }

    if(r === 6)
    {
      police1 = new Police(displayWidth, random(displayHeight/10, displayHeight - 50), r, objectIndex);
      objectsArray[objectIndex] = police1;
      objectIndex = objectIndex + 1;
      police1.display();

      police2 = new Police(displayWidth, police1.y + 100, r, objectIndex);
      objectsArray[objectIndex] = police2;
      objectIndex = objectIndex + 1;
      police2.display();

      policeSirenSound.play();
    }

    if(r === 7)
    {
      naarangi1 = new Demons(displayWidth, random(displayHeight/10, displayHeight - 50), r, objectIndex);
      objectsArray[objectIndex] = naarangi1;
      naarangi1.display();
      objectIndex = objectIndex + 1;

      naarangi2 = new Demons(displayWidth, naarangi1.y + 100, r, objectIndex);
      objectsArray[objectIndex] = naarangi2;
      naarangi2.display();
      objectIndex = objectIndex + 1;

      naarangiComingSound.play();
    }

    if(r === 8)
    {
      beerangi1 = new Demons(displayWidth, random(displayHeight/10, displayHeight - 50), r, objectIndex);
      objectsArray[objectIndex] = beerangi1;
      beerangi1.display();
      objectIndex = objectIndex + 1;

      beerangi2 = new Demons(displayWidth, beerangi1.y + 100, r, objectIndex);
      objectsArray[objectIndex] = beerangi2;
      beerangi2.display();
      objectIndex = objectIndex + 1;

      beerangiComingSound.play();
    }
  }

  for(var i = 0; i < objectsArray.length; i++)
  {
    if(objectsArray[i].sprite.isTouching(thief.sprite))
    {
      if(objectsArray[i].objNum === 1)
      {
        gemCollectSound.play();
        wealthCount = wealthCount + 100;
      }

      else if(objectsArray[i].objNum === 2)
      {
        gemCollectSound.play();
        wealthCount = wealthCount + 200;
      }

      else if(objectsArray[i].objNum === 3)
      {
        gemCollectSound.play();
        wealthCount = wealthCount + 300;
      }

      else if(objectsArray[i].objNum === 4)
      {
        gemCollectSound.play();
        wealthCount = wealthCount + 400;
      }

      else if(objectsArray[i].objNum === 5)
      {
        gemCollectSound.play();
        wealthCount = wealthCount + 50;
      }

      else if(objectsArray[i].objNum === 6)
      {
        explosionSound.play();
        lifeCount = lifeCount - 1;
        if(lifeCount === 0)
        {
          gamePlayMusic.stop();
          gameOverMusic.play();
          destroyAllSprites();
          gameState = 2;
        }
        
      }

      else if(objectsArray[i].objNum === 7)
      {
        explosionSound.play();
        wealthCount = Math.round(wealthCount - (wealthCount/2));
      }

      else if(objectsArray[i].objNum === 8)
      {
        explosionSound.play();
        wealthCount = 0;
      }

      objectsArray[i].sprite.destroy();
    }
   }
  }

  else if(input === "string")
  {
    fill("white");
    textSize(15);
    textFont("Lucida Calligraphy");
    text("Wealth collected: Rs. " + wealthCount, displayWidth/2 - 50, displayHeight/10);
    text("Lives Left: " + lifeCount, displayWidth/2 + 400, displayHeight/10);
    if(elapsedTime === 1)
        text("Survival Time: " + elapsedTime + " second", displayWidth/2 - 500, displayHeight/10);
    else 
        text("Survival Time: " + elapsedTime + " seconds", displayWidth/2 - 500, displayHeight/10);
  }
}

function gameEnd()
{
  background(endBGRDImg);
  bgrd1.destroy();
  bgrd2.destroy();
  upperInvisible.destroy();
  lowerInvisible.destroy();
  restartIcon.visible = true;

  if(mousePressedOver(restartIcon))
  {
    restartIcon.destroy();
    gameOverMusic.stop();
    lifeCount = 25;
    wealthCount = 0;
    objectIndex = 0;
    velocityIncrease = 0;
    velIncDone = false;
    velocityIncreaseTime = 0;
    setup();
    gameState = 0;
  }

  fill("red");
  textSize(40);
  textFont("Matura MT Script Capitals");
  text("Game Over !! Choru has been Arrested.", displayWidth/2 - 450, displayHeight/7);
  text("Choru has robbed wealth worth " + wealthCount + " Rupees !!", displayWidth/2 - 450, displayHeight/7 + 50);
  text("Replay", displayWidth/2 - 70, displayHeight/2 - 50);
}