'use strict';

var allProducts = [];
Product.uniqueArray = [];

var leftImageEl = document.getElementById('left');
var centerImageEl = document.getElementById('center');
var rightImageEl = document.getElementById('right');
var containerEl = document.getElementById('image_container');

Product.pics = [
  document.getElementById('left'),
  document.getElementById('center'),
  document.getElementById('right')
];
Product.totalClicks = 0;

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

/////////////////////////////////////////////////////////////////// keep array full of 6 unique values

function uniqueArrayGen() {
  while (Product.uniqueArray.length < 6) {
    var random = makeRandom();
    while (!Product.uniqueArray.includes(random)) {
      Product.uniqueArray.push(random);
    }
  }
}
function displayPics() {
  uniqueArrayGen();
  for (var i = 0; i < Product.uniqueArray.length; i++) {
    //value of the first index of the array is removed and set as the variable 'temp' and replaced at each iteration of the loop
    var temp = Product.uniqueArray.shift();
    console.log('The Temp is #: ', temp);
    //sets the id of the product at the current index
    Product.pics[i].src = allProducts[temp].path;
    //sets the id of the product at the current index
    Product.pics[i].id = allProducts[temp].name;
    allProducts[temp].views += 1;
  }
}
///////////////////////////////////////////////////Limits to 5 clicks

function handleClick(event) {
  var chosenImage = event.target.title;
  if (Product.totalClicks === 24) {
    containerEl.removeEventListener('click', handleClick);
    leftImageEl.setAttribute('hidden', true);
    centerImageEl.setAttribute('hidden', true);
    rightImageEl.setAttribute('hidden', true);
    localStorage.setItem('data', ('allProducts'));
    ////////////////////////////////////////////////////////////
    //stringify the data
    // var allProductsStringified = JSON.stringify(allProducts);
    //storing data into local storage
    localStorage.setItem('data', JSON.stringify(allProducts));
    chartMaker();
  }
  for (var i = 0; i < allProducts.length; i++) {
    if (allProducts[i].name === chosenImage) {
      allProducts[i].votes++;
    }
  }
  Product.totalClicks++;
  renderProducts();
  displayPics();
}

function renderProducts() {
  //create to hold unique index
  var uniquePicsArray = [];
  // assigning a random number to the picture arrays
  uniquePicsArray[0] = makeRandom();
  uniquePicsArray[1] = makeRandom();
  uniquePicsArray[2] = makeRandom();
  //make sure that there are no duplicates in the pictures shown.
  while (uniquePicsArray[0] === uniquePicsArray[1] || uniquePicsArray[1] === uniquePicsArray[2] || uniquePicsArray[0] === uniquePicsArray[2]) {
    // console.log('Duplicate found! Getting new image');
    uniquePicsArray[0] = makeRandom();
    uniquePicsArray[1] = makeRandom();
    uniquePicsArray[2] = makeRandom();
  }
  //VIEWS
  allProducts[uniquePicsArray[0]].views++;
  leftImageEl.src = allProducts[uniquePicsArray[0]].path;
  leftImageEl.title = allProducts[uniquePicsArray[0]].name;
  leftImageEl.name = allProducts[uniquePicsArray[0]].name;
  //VIEWS
  allProducts[uniquePicsArray[1]].views++;
  centerImageEl.src = allProducts[uniquePicsArray[1]].path;
  centerImageEl.title = allProducts[uniquePicsArray[1]].name;
  centerImageEl.name = allProducts[uniquePicsArray[1]].name;
  //VIEWS
  allProducts[uniquePicsArray[2]].views++;
  rightImageEl.src = allProducts[uniquePicsArray[2]].path;
  rightImageEl.title = allProducts[uniquePicsArray[2]].name;
  rightImageEl.name = allProducts[uniquePicsArray[2]].name;
}

if (localStorage.data) {
  //getting data from local storage
  var storageAllProducts = localStorage.getItem('data');
  //parsing storageAllProducts
  var parsedallProducts = JSON.parse(storageAllProducts);
  for (var i = 0; i < parsedallProducts.length; i++) {
    var newProduct = new Product(parsedallProducts[i].name);
    newProduct.views = parsedallProducts[i].views;
    newProduct.votes = parsedallProducts[i].votes;
  }
} else {
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
}



//renders a list function
// var renderTable = function () {
//   // chartMaker();
//   var ulElement = document.getElementById('tally');
//   ulElement.textContent = '';
//   for (var i = 0; i < allProducts.length; i++) {
//     var listElement = document.createElement('li');
//     listElement.textContent = `${allProducts[i].name} has ${allProducts[i].views} views and ${allProducts[i].votes} votes`;
//     ulElement.appendChild(listElement);
//   }
// };

//Create the chart here
Product.nameData = [];
Product.voteData = [];

var getChartData = function () {
  for (var i = 0; i < allProducts.length; i++) {
    Product.nameData.push(allProducts[i].name);
    Product.voteData.push(allProducts[i].votes);
  }
};

var chartMaker = function () {
  getChartData();
  var ctx = document.getElementById('myChart').getContext('2d');
  var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: Product.nameData,
      datasets: [{
        label: '# of Votes',
        data: Product.voteData,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });
};

containerEl.addEventListener('click', handleClick);
renderProducts();
displayPics();

///////////////////////////JSON Local Storage








