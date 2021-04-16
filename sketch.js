var foodRemaining
var database
var dog;
var hungryDog;
var happyDog;
var foodStock;

function preload(){
	hungryDog = loadImage("images/dogImg.png")
  happyDog = loadImage("images/dogImg1.png")
}

function setup() {
	createCanvas(500, 500);
  dog = createSprite(400,400, 20, 20)
  dog.addImage("hungry", hungryDog)
  dog.addImage("happy", happyDog)
  database= firebase.database()
  foodStock = database.ref('Food')
  foodStock.on("value", readStock)
  dog.scale = 0.3
  buttonElement = createButton("loadFood")
}

function draw() {  
background(46,139,87)
fill("black")
buttonElement.mousePressed(()=>{
  database.ref("/").update({
    Food : 20
  })
})
text("Food Remaing : " + foodRemaining, 100,100)
if(keyWentDown("space") && foodRemaining>0){
dog.changeImage("happy", happyDog)
reduceStock();
}
if(keyWentUp("space")){
  dog.changeImage("hungry", hungryDog)
}
drawSprites();
}
function readStock(data){
foodRemaining = data.val()
}
function reduceStock(){
  database.ref("/").update({
    Food : foodRemaining - 1
  })
}