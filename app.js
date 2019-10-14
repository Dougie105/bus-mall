'use strict';

var leftImageEl = document.getElementById('left');
var centerImageEl = document.getElementById('center');
var rightImageEl = document.getElementById('right');
var containerEl = document.getElementById('image_container');

var allProducts = [];

function Product(name) {
  this.name = name;
  this.path = `img/${name}.jpg`;
  this.views = 0;
  this.votes = 0;
  allProducts.push(this);
}
function makeRandom() {
  return Math.floor(Math.random() * allProducts.length);
}

function renderProducts() {

  //create to hold unique index
  var uniquePicsArray = [];

  uniquePicsArray[0] = makeRandom();
  uniquePicsArray[1] = makeRandom();
  uniquePicsArray[2] = makeRandom();

  while (uniquePicsArray[0] === uniquePicsArray[1] || uniquePicsArray[1] === uniquePicsArray[2] || uniquePicsArray[0] === uniquePicsArray[2]) {
    console.log('Duplicate found! Getting new image');
    uniquePicsArray[0] = makeRandom();
    uniquePicsArray[1] = makeRandom();
    uniquePicsArray[2] = makeRandom();
  }

  //VIEWS
  allProducts[uniquePicsArray[0]].views++ ;
  leftImageEl.src = allProducts[uniquePicsArray[0]].path;
  leftImageEl.title = allProducts[uniquePicsArray[0]].name;
  leftImageEl.name = allProducts[uniquePicsArray[0]].name;

  //VIEWS
  allProducts[uniquePicsArray[1]].views++ ;
  centerImageEl.src = allProducts[uniquePicsArray[1]].path;
  centerImageEl.title = allProducts[uniquePicsArray[1]].name;
  centerImageEl.name = allProducts[uniquePicsArray[1]].name;

  //VIEWS
  allProducts[uniquePicsArray[2]].views++ ;
  rightImageEl.src = allProducts[uniquePicsArray[2]].path;
  rightImageEl.title = allProducts[uniquePicsArray[2]].name;
  rightImageEl.name = allProducts[uniquePicsArray[2]].name;
}

new Product('bag');
new Product('boots');
new Product('banana');
new Product('bathroom');
new Product('breakfast');
new Product('bubblegum');
new Product('chair');
new Product('cthulhu');
new Product('dog-duck');
new Product('dragon');
new Product('pen');
new Product('pet-sweep');
new Product('scissors');
new Product('shark');
new Product('sweep');
new Product('tauntaun');
new Product('unicorn');
new Product('usb');
new Product('water-can');
new Product('wine-glass');

function handleClick() {
  var chosenImage = event.target.title;
  console.log('chosenImage: ', chosenImage);
  for( var i = 0; i < allProducts.length; i++ ) {
    if(allProducts[i].name === chosenImage) {
      allProducts[i].votes++;
    }
  }

  renderProducts();
}

containerEl.addEventListener('click', handleClick);

renderProducts();