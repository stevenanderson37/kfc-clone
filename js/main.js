// ANIMATIONS PERFORMED ONLOAD
function animateOnload() {
  var howdyText = document.querySelector('.howdy');
  var categories = document.querySelector('.menu-categories');
  var foodPics = document.querySelector('.menu-pics');

  howdyText.style.opacity = '0';
  categories.style.opacity = '1';
  foodPics.style.opacity = '1';
}

window.onload = animateOnload;

// SLIDESHOW / CAROUSEL
var i = 0;
var ranOnce = false;
var images = ['#carousel_1', '#carousel_2', '#carousel_3', '#carousel_4', '#carousel_5'];
var circles = ['#circle_1', '#circle_2', '#circle_3', '#circle_4', '#circle_5'];

function changeImg() {
  if (i === 0 && ranOnce === false) {
    var sliderDivCurrent = document.querySelector(images[i]);
    sliderDivCurrent.style.display = 'block';

    var circleCurrent = document.querySelector(circles[i]);
    circleCurrent.style.backgroundColor = '#e4002b';
    ranOnce = true;
  } else if (i === 0 && ranOnce === true) {
    var sliderDivCurrent = document.querySelector(images[i]);
    var sliderDivPrevious = document.querySelector(images[4]);
    sliderDivCurrent.style.display = 'block';
    sliderDivPrevious.style.display = 'none';

    var circleCurrent = document.querySelector(circles[i]);
    var circlePrevious = document.querySelector(circles[4]);
    circleCurrent.style.backgroundColor = '#e4002b';
    circlePrevious.style.backgroundColor = '#fff';
  } else {
    var sliderDivCurrent = document.querySelector(images[i]);
    var sliderDivPrevious = document.querySelector(images[i-1]);
    sliderDivCurrent.style.display = 'block';
    sliderDivPrevious.style.display = 'none';

    var circleCurrent = document.querySelector(circles[i]);
    var circlePrevious = document.querySelector(circles[i-1]);
    circleCurrent.style.backgroundColor = '#e4002b';
    circlePrevious.style.backgroundColor = '#fff';
  }

  if (i < images.length - 1) {
    i++;
  } else {
    i = 0;
  }

  setTimeout("changeImg()", 4000);
}

window.onload = changeImg;

// CHANGES CAROUSEL BY CLICKING BUTTONS
var carouselButton_1 = document.querySelector('#circle_1');
var carouselButton_2 = document.querySelector('#circle_2');
var carouselButton_3 = document.querySelector('#circle_3');
var carouselButton_4 = document.querySelector('#circle_4');
var carouselButton_5 = document.querySelector('#circle_5');

carouselButton_1.addEventListener('click', function() {
  var sliderDivPrevious = document.querySelector('#carousel_'+i);
  var circlePrevious = document.querySelector('#circle_'+i);
  var sliderDivCurrent = document.querySelector('#carousel_1');

  sliderDivCurrent.style.display = 'block';
  carouselButton_1.style.backgroundColor = '#e4002b';
  sliderDivPrevious.style.display = 'none';
  circlePrevious.style.backgroundColor = '#fff';

  return i = 0;
});

carouselButton_2.addEventListener('click', function() {
  var sliderDivPrevious = document.querySelector('#carousel_'+i);
  var circlePrevious = document.querySelector('#circle_'+i);
  var sliderDivCurrent = document.querySelector('#carousel_2');

  sliderDivPrevious.style.display = 'none';
  circlePrevious.style.backgroundColor = '#fff';
  sliderDivCurrent.style.display = 'block';
  carouselButton_2.style.backgroundColor = '#e4002b';

  return i = 1;
});

carouselButton_3.addEventListener('click', function() {
  var sliderDivPrevious = document.querySelector('#carousel_'+i);
  var circlePrevious = document.querySelector('#circle_'+i);
  var sliderDivCurrent = document.querySelector('#carousel_3');

  sliderDivCurrent.style.display = 'block';
  carouselButton_3.style.backgroundColor = '#e4002b';
  sliderDivPrevious.style.display = 'none';
  circlePrevious.style.backgroundColor = '#fff';

  return i = 2;
});

carouselButton_4.addEventListener('click', function() {
  var sliderDivPrevious = document.querySelector('#carousel_'+i);
  var circlePrevious = document.querySelector('#circle_'+i);
  var sliderDivCurrent = document.querySelector('#carousel_4');

  sliderDivCurrent.style.display = 'block';
  carouselButton_4.style.backgroundColor = '#e4002b';
  sliderDivPrevious.style.display = 'none';
  circlePrevious.style.backgroundColor = '#fff';

  return i = 3;
});

carouselButton_5.addEventListener('click', function() {
  var sliderDivPrevious = document.querySelector('#carousel_'+i);
  var circlePrevious = document.querySelector('#circle_'+i);
  var sliderDivCurrent = document.querySelector('#carousel_5');

  sliderDivCurrent.style.display = 'block';
  carouselButton_5.style.backgroundColor = '#e4002b';
  sliderDivPrevious.style.display = 'none';
  circlePrevious.style.backgroundColor = '#fff';

  return i = 4;
});

// SOCIAL MEDIA BUTTON CLICK FOR TRANSFORM
var socialMediaButton = document.querySelector('#social-media-button');
var click = false;

socialMediaButton.addEventListener('click', function() {
  var socialMediaSlideout = document.querySelector('.social-media-slideout');

  if (click === false) {
    click = true;
    socialMediaSlideout.style.transform = 'translateX(0px)';
  } else {
    click = false;
    socialMediaSlideout.style.transform = 'translateX(calc(100vw - 35px))';
  }
});

// NAV BUTTON ANIMATION AND REVEAL
var navButton = document.querySelector('#ham-button');
var navContainer = document.querySelector('nav');
var navSlideDown = document.querySelector('.nav-dropdown-1');
var navSlideUp = document.querySelector('.nav-dropdown-2');
var navTint = document.querySelector('.tinted-background');
var navTopBar = document.querySelector('.top-bar');
var navMiddleBar = document.querySelector('.middle-bar');
var navBottomBar = document.querySelector('.bottom-bar');
var storeFinder = document.querySelector('.store-locator-bar');
var navClick = false;

navButton.addEventListener('click', function() {
  if (navClick === false) {
    navClick = true;

    navTopBar.style.transition = 'top 200ms linear 200ms, transform 200ms ease 400ms';
    navMiddleBar.style.transition = 'width 200ms linear, opacity 200ms ease 200ms';
    navBottomBar.style.transition = 'width 200ms linear, bottom 200ms linear 200ms, transform 200ms ease 400ms';

    navMiddleBar.style.width = '24px';
    navBottomBar.style.width = '24px';
    navMiddleBar.style.opacity = 0;
    navTopBar.style.top = '7px';
    navTopBar.style.transform = 'rotateZ(-45deg)';
    navBottomBar.style.bottom = '7px';
    navBottomBar.style.transform = 'rotateZ(45deg)';

    navContainer.style.zIndex = '9000';
    navSlideDown.style.transform = 'translateY(-60px)';
    navSlideUp.style.transform = 'translateY(-60px)';
    navTint.style.opacity = 1;

    // if (window.innerWidth <= 1023) {
    //   storeFinder.style.width = '100vw';
    // }
  } else {
    navClick = false;

    navTopBar.style.transition = 'transform 200ms ease, top 200ms linear 200ms';
    navMiddleBar.style.transition = 'opacity 200ms ease 200ms, width 200ms linear 400ms';
    navBottomBar.style.transition = 'transform 200ms ease, bottom 200ms linear 200ms, width 200ms linear 400ms';

    navMiddleBar.style.width = '12px';
    navBottomBar.style.width = '18px';
    navMiddleBar.style.opacity = 1;
    navTopBar.style.top = '0px';
    navTopBar.style.transform = 'rotateZ(0deg)';
    navBottomBar.style.bottom = '0px';
    navBottomBar.style.transform = 'rotateZ(0deg)';

    navSlideDown.style.transform = 'translateY(-100vh)';
    navSlideUp.style.transform = 'translateY(100vh)';
    navTint.style.opacity = 0;
    navContainer.style.zIndex = '-1';

    // if (window.innerWidth <= 1023 && window.innerWidth > 767) {
    //   storeFinder.style.width = '50vw';
    // }
  }
});

// VIDEO 1 SHOW AND PLAY
var videoPlay1 = document.querySelector('#carousel_1');

videoPlay1.addEventListener('click', function() {
  var videoContainer1 = document.querySelector('#video-container-1');
  var videoContent = document.querySelector('iframe');
  var storeLocator = document.querySelector('.store-locator-bar');

  storeLocator.style.transform = 'translateY(60px)';
  videoContainer1.style.transform = 'translateY(0)';
  videoContent.src = "https://www.youtube.com/embed/bq6bYRUcf-A?autoplay=1";
});

// VIDEO 2 SHOW AND PLAY
var videoPlay2 = document.querySelector('#carousel_3');

videoPlay2.addEventListener('click', function() {
  var videoContainer1 = document.querySelector('#video-container-1');
  var videoContent = document.querySelector('iframe');
  var storeLocator = document.querySelector('.store-locator-bar');

  storeLocator.style.transform = 'translateY(60px)';
  videoContainer1.style.transform = 'translateY(0)';
  videoContent.src = "https://www.youtube.com/embed/Um_aUxoAcSE?autoplay=1";
});

// VIDEO HIDE AND RESET SOURCE
var closeBox_1 = document.querySelector('#close-box-1');

closeBox_1.addEventListener('click', function() {
  var videoContainer1 = document.querySelector('#video-container-1');
  var videoContent = document.querySelector('iframe');
  var storeLocator = document.querySelector('.store-locator-bar');

  videoContainer1.style.transform = 'translateY(100vh)';
  videoContent.src = "";
  storeLocator.style.transform = 'translateY(0px)';
});

// COLONEL'S CLUB SHOW
var joinIcon = document.querySelector('.mail-icon');
var joinDiv = document.querySelector('.join-email');
var joinNavDiv = document.querySelector('.nav-thirds-1');

function openColonelsClub() {
  var clubContainer = document.querySelector('.colonels-club');
  var storeLocator = document.querySelector('.store-locator-bar');

  storeLocator.style.transform = 'translateY(60px)';
  clubContainer.style.transform = 'translateY(0)';
}

joinIcon.addEventListener('click', openColonelsClub);
joinDiv.addEventListener('click', openColonelsClub);
joinNavDiv.addEventListener('click', function() {
  navClick = false;

  navTopBar.style.transition = 'transform 200ms ease, top 200ms linear 200ms';
  navMiddleBar.style.transition = 'opacity 200ms ease 200ms, width 200ms linear 400ms';
  navBottomBar.style.transition = 'transform 200ms ease, bottom 200ms linear 200ms, width 200ms linear 400ms';

  navMiddleBar.style.width = '12px';
  navBottomBar.style.width = '18px';
  navMiddleBar.style.opacity = 1;
  navTopBar.style.top = '0px';
  navTopBar.style.transform = 'rotateZ(0deg)';
  navBottomBar.style.bottom = '0px';
  navBottomBar.style.transform = 'rotateZ(0deg)';

  navSlideDown.style.transform = 'translateY(-100vh)';
  navSlideUp.style.transform = 'translateY(100vh)';
  navTint.style.opacity = 0;
  navContainer.style.zIndex = '-1';

  openColonelsClub();
});

// COLONEL'S CLUB HIDE
var closeBox_2 = document.querySelector('#close-box-2');

closeBox_2.addEventListener('click', function() {
  var clubContainer = document.querySelector('.colonels-club');
  var storeLocator = document.querySelector('.store-locator-bar');

  clubContainer.style.transform = 'translateY(100vh)';
  storeLocator.style.transform = 'translateY(0px)';
});

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
