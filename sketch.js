var database, dog, happyDogImg, foodStock, dogImg, foods, fedTime, lastFed, foodObj, feed, addFood;

function preload(){
    dogImg = loadImage("images/Dog.png")
    happyDogImg= loadImage("images/happydog.png")
}
function setup(){
    database = firebase.database()
    console.log(database)
    createCanvas(500,500);
    dog = createSprite(250,250,10,10);
    dog.addImage("dog", dogImg)
    dog.scale=0.2
    foodStock= database.ref('food');
    foodStock.on("value",readStock)
    foodObj= new Food()
    feed=createButton("Press to Feed")
    feed.position(700,95)
    feed.mousePressed(feedDog)
    addFood=createButton("Add Food")
    addFood.position(800,95)
    addFood.mousePressed(addFoods)
}

function draw(){
    background(46, 139, 87);
    foodObj.display();
    fedTime=database.ref('feedTime')
    fedTime.on("value",function(data){
      lastFed=data.val()
    })
    fill(255,255,255)
    textSize(15);{
      if(lastFed>=12){
        text("Last Feed: "+lastFed%12 + " PM", 350,30)
      }else if(lastFed==0){
        text("Last Feed : 12 AM",350, 30);
      }else{
        text("Last Feed: "+lastFed+" AM",350,30)
      }
    }
    drawSprites();
}



function readStock(data){
    foods=data.val()
    foodObj.updateFoodStock(foods)
}
function feedDog(){
  dog.addImage(happyDogImg);
  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
}
function addFoods(){
  foods++
  database.ref('/').update({
    Food:foods
  })
}

