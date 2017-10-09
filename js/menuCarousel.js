// FUNCTION THAT CHANGES THE VERTICAL TO HORIZONTAL SCROLLING FOR THE DIV WITH THE FOOD PICTURES.
var menuFood = document.querySelector('.scrollmenu-pics');
var menuGroups = document.querySelector('.scrollmenu-categories');

var mouseWheelEvtPics = function (event) {
  if (menuFood.doScroll) {
    menuFood.doScroll(event.wheelDelta>0?"left":"right");
  } else if ((event.wheelDelta || event.detail) > 0) {
    menuFood.scrollLeft -= 20;
  } else {
    menuFood.scrollLeft += 20;
  }

  return false;
}

var mouseWheelEvtGroups = function (event) {
  if (menuGroups.doScroll) {
    menuGroups.doScroll(event.wheelDelta>0?"left":"right");
  } else if ((event.wheelDelta || event.detail) > 0) {
    menuGroups.scrollLeft -= 20;
  } else {
    menuGroups.scrollLeft += 20;
  }

  return false;
}

menuFood.addEventListener("mousewheel", mouseWheelEvtPics);
menuGroups.addEventListener("mousewheel", mouseWheelEvtGroups);

// MENU ITEMS CAROUSEL
var promotions = document.querySelector('#promotions');
var promotionsArr = ['#menu-pics-1', '#menu-pics-2', '#menu-pics-3'];
var chicken = document.querySelector('#chicken');
var chickenArr = ['#menu-pics-4', '#menu-pics-5', '#menu-pics-6', '#menu-pics-7', '#menu-pics-8', '#menu-pics-9'];
var sandwiches = document.querySelector('#sandwiches');
var sandwichesArr = ['#menu-pics-10'];
var meals = document.querySelector('#meals');
var mealsArr = ['#menu-pics-11', '#menu-pics-12', '#menu-pics-13', '#menu-pics-14', '#menu-pics-15'];
var fillUps = document.querySelector('#fill-ups');
var fillUpsArr = ['#menu-pics-16', '#menu-pics-17', '#menu-pics-18', '#menu-pics-19', '#menu-pics-20'];
var sides = document.querySelector('#sides');
var sidesArr = ['#menu-pics-21', '#menu-pics-22', '#menu-pics-23', '#menu-pics-24', '#menu-pics-25', '#menu-pics-26', '#menu-pics-27'];
var classics = document.querySelector('#classics');
var classicsArr = ['#menu-pics-28', '#menu-pics-29'];
var desserts = document.querySelector('#desserts');
var dessertsArr = ['#menu-pics-30', '#menu-pics-31'];
var drinks = document.querySelector('#drinks');
var drinksArr = ['#menu-pics-32', '#menu-pics-33', '#menu-pics-34'];
var sauces = document.querySelector('#sauces');
var saucesArr = ['#menu-pics-35'];
var previousCat = '#promotions';
var previousArr = promotionsArr;

function changeColorOver(event) {
  event.target.style.color = 'rgba(0, 0, 0, 1)';
}

function changeColorOverRed(event) {
  event.target.style.color = 'rgba(228, 0, 43, 1)';
}

function changeColorLeave(event) {
  event.target.style.color = 'rgba(0, 0, 0, .3)';
}

function changeOpacityOver(event) {
  event.target.style.opacity = '1';
}

function changeOpacityLeave(event) {
  event.target.style.opacity = '.5';
}

function highlightMenuPics(picsArr) {
  for (j = 0; j < picsArr.length; j++) {
    var current = document.querySelector(picsArr[j]);
    current.style.opacity = '1';
    current.removeEventListener("mouseleave", changeOpacityLeave);
    current.removeEventListener("mouseover", changeOpacityOver);
  }
  for (k = 0; k < previousArr.length; k++) {
    var previous = document.querySelector(previousArr[k]);
    previous.style.opacity = '.5';
    previous.addEventListener("mouseleave", changeOpacityLeave);
    previous.addEventListener("mouseover", changeOpacityOver);
  }
}

function highlightMenu(category, picsArr) {
  var currentCate = document.querySelector(category);
  var previousCate = document.querySelector(previousCat);

  if (category === previousCat) {
    previousCat = category;
    previousArr = picsArr;
  } else if (category === '#promotions') {
    previousCate.style.color = 'rgba(0, 0, 0, .3)';
    currentCate.style.color = 'rgba(228, 0, 43, 1)';
    currentCate.removeEventListener("mouseleave", changeColorLeave);
    currentCate.removeEventListener("mouseover", changeColorOver);
    previousCate.addEventListener("mouseleave", changeColorLeave);
    previousCate.addEventListener("mouseover", changeColorOver);

    highlightMenuPics(picsArr);

    previousCat = category;
    previousArr = picsArr;
  } else if (previousCat === '#promotions') {
    previousCate.style.color = 'rgba(0, 0, 0, .3)';
    currentCate.style.color = 'rgba(0, 0, 0, 1)';
    currentCate.removeEventListener("mouseleave", changeColorLeave);
    currentCate.removeEventListener("mouseover", changeColorOver);
    previousCate.addEventListener("mouseleave", changeColorLeave);
    previousCate.addEventListener("mouseover", changeColorOverRed);

    highlightMenuPics(picsArr);

    previousCat = category;
    previousArr = picsArr;
  } else {
    previousCate.style.color = 'rgba(0, 0, 0, .3)';
    currentCate.style.color = 'rgba(0, 0, 0, 1)';
    currentCate.removeEventListener("mouseleave", changeColorLeave);
    currentCate.removeEventListener("mouseover", changeColorOver);
    previousCate.addEventListener("mouseleave", changeColorLeave);
    previousCate.addEventListener("mouseover", changeColorOver);

    highlightMenuPics(picsArr);

    previousCat = category;
    previousArr = picsArr;
  }
}

function autoScrollTo(el, picsArr) {
  var container = document.querySelector('#horizontal-scroll');
  var current = document.getElementById(el);
  var halfWindowOdd = (window.innerWidth - 140) / 2;
  var halfWindowEven = (window.innerWidth - 280) / 2;

  if (!(picsArr.length%2)) {
    container.scrollLeft = current.offsetLeft - halfWindowEven;
  } else {
    container.scrollLeft = current.offsetLeft - halfWindowOdd;
  }
}

promotions.addEventListener("click", function() {
  highlightMenu('#promotions', promotionsArr);
  autoScrollTo('pic-div-2', promotionsArr);
});
chicken.addEventListener("click", function() {
  highlightMenu('#chicken', chickenArr);
  autoScrollTo('pic-div-6', chickenArr);
});
sandwiches.addEventListener("click", function() {
  highlightMenu('#sandwiches', sandwichesArr);
  autoScrollTo('pic-div-10', sandwichesArr);
});
meals.addEventListener("click", function() {
  highlightMenu('#meals', mealsArr);
  autoScrollTo('pic-div-13', mealsArr);
});
fillUps.addEventListener("click", function() {
  highlightMenu('#fill-ups', fillUpsArr);
  autoScrollTo('pic-div-18', fillUpsArr);
});
sides.addEventListener("click", function() {
  highlightMenu('#sides', sidesArr);
  autoScrollTo('pic-div-24', sidesArr);
});
classics.addEventListener("click", function() {
  highlightMenu('#classics', classicsArr);
  autoScrollTo('pic-div-28', classicsArr);
});
desserts.addEventListener("click", function() {
  highlightMenu('#desserts', dessertsArr);
  autoScrollTo('pic-div-30', dessertsArr);
});
drinks.addEventListener("click", function() {
  highlightMenu('#drinks', drinksArr);
  autoScrollTo('pic-div-33', drinksArr);
});
sauces.addEventListener("click", function() {
  highlightMenu('#sauces', saucesArr);
  autoScrollTo('pic-div-35', saucesArr);
});
