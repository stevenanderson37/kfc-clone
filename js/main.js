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
var navClick = false;

navButton.addEventListener('click', function() {
  if (click === false) {
    click = true;

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
  } else {
    click = false;

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
  }
});

// VIDEO 1 SHOW AND PLAY
var videoPlay1 = document.querySelector('#carousel_1');

videoPlay1.addEventListener('click', function() {
  var videoContainer1 = document.querySelector('#video-container-1');

  videoContainer1.style.transform = 'translateY(0)';
});

// VIDEO 1 HIDE
var closeBox_1 = document.querySelector('#close-box-1');

closeBox_1.addEventListener('click', function() {
  var videoContainer1 = document.querySelector('#video-container-1');

  videoContainer1.style.transform = 'translateY(100vh)';
});

// VIDEO 2 SHOW AND PLAY
var videoPlay2 = document.querySelector('#carousel_3');

videoPlay2.addEventListener('click', function() {
  var videoContainer2 = document.querySelector('#video-container-2');

  videoContainer2.style.transform = 'translateY(0)';
});

// VIDEO 2 HIDE
var closeBox_2 = document.querySelector('#close-box-2');

closeBox_2.addEventListener('click', function() {
  var videoContainer2 = document.querySelector('#video-container-2');

  videoContainer2.style.transform = 'translateY(100vh)';
});
