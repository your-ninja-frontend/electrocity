const stickyMenu = $('.sticky-menu');
const mql = window.matchMedia('(max-width: 767px)');
let pageHeight, windowHeight, scrollPage;

function calcScrollPosition() {
  pageHeight = document.body.scrollHeight;
  windowHeight = window.innerHeight;
  scrollPage = window.scrollY;
  return pageHeight - (scrollPage + windowHeight) < 100;
}

function toggleMenu() {
  const show = calcScrollPosition();
  if (show) {
    stickyMenu.slideUp(300);
  } else {
    stickyMenu.slideDown(300);
  }
}

function trackScroll() {
  if (window.innerWidth < 768) {
    stickyMenu.slideDown(300);
    $(window).on('scroll', toggleMenu);
  } else {
    $(window).off('scroll', toggleMenu);
    stickyMenu.slideUp(0);
  }
}

mql.addEventListener('change', trackScroll);
trackScroll();
