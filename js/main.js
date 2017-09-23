// SLIDESHOW / CAROUSEL
var i = 0;
var ranOnce = false;
var images = ['#carousel_1', '#carousel_2', '#carousel_3', '#carousel_4', '#carousel_5'];

function changeImg() {
  if (i === 0 && ranOnce === false) {
    var sliderDivCurrent = document.querySelector(images[i]);
    sliderDivCurrent.style.display = 'block';
    ranOnce = true;
  } else if (i === 0 && ranOnce === true) {
    var sliderDivCurrent = document.querySelector(images[i]);
    var sliderDivPrevious = document.querySelector(images[4]);

    sliderDivCurrent.style.display = 'block';
    sliderDivPrevious.style.display = 'none';
  } else {
    var sliderDivCurrent = document.querySelector(images[i]);
    var sliderDivPrevious = document.querySelector(images[i-1]);

    sliderDivCurrent.style.display = 'block';
    sliderDivPrevious.style.display = 'none';
  }

  if (i < images.length - 1) {
    i++;
  } else {
    i = 0;
  }

  setTimeout("changeImg()", 4000);
}

window.onload = changeImg;

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
var navClick = false;
var navContainer = document.querySelector('nav');
var navSlideDown = document.querySelector('.nav-dropdown-1');
var navSlideUp = document.querySelector('.nav-dropdown-2');
var navTint = document.querySelector('.tinted-background');
var navTopBar = document.querySelector('.top-bar');
var navMiddleBar = document.querySelector('.middle-bar');
var navBottomBar = document.querySelector('.bottom-bar');
var navTopMove = document.querySelector('.top-move');
var navMiddleOpacity = document.querySelector('.middle-opacity');
var navBottomMove = document.querySelector('.bottom-move');

navButton.addEventListener('click', function() {
  if (click === false) {
    click = true;
    navMiddleBar.style.width = '24px';
    navBottomBar.style.width = '24px';
    navMiddleOpacity.style.opacity = 0;
    navTopMove.style.transform = 'translateY(7px) rotateZ(-45deg)';
    navBottomMove.style.transform = 'translateY(-7px) rotateZ(45deg)';

    navContainer.style.zIndex = '9000';
    navSlideDown.style.transform = 'translateY(-60px)';
    navSlideUp.style.transform = 'translateY(-60px)';
    navTint.style.opacity = 1;
  } else {
    click = false;
    navMiddleBar.style.width = '12px';
    navBottomBar.style.width = '18px';
    navMiddleOpacity.style.opacity = 1;
    navTopMove.style.transform = 'translateY(0px) rotateZ(0deg)';
    navBottomMove.style.transform = 'translateY(0px) rotateZ(0deg)';

    navSlideDown.style.transform = 'translateY(-100vh)';
    navSlideUp.style.transform = 'translateY(100vh)';
    navTint.style.opacity = 0;
    navContainer.style.zIndex = '-1';
  }
});
