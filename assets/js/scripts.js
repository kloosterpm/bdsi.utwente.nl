var body = document.querySelector('body')
var menuTrigger = document.querySelector('#toggle-main-menu-mobile');
var menuContainer = document.querySelector('#main-menu-mobile');

menuTrigger.onclick = function() {
    menuContainer.classList.toggle('open');
    menuTrigger.classList.toggle('is-active')
    body.classList.toggle('lock-scroll')
}

$(document).ready(function(){
  $("#partners-slider").slick({
    autoplay: true,
    dots: true,
    arrows: false
  });
  console.log("he!");
});

