const menu = $('.aside-menu__wrapper');
const body = $('body');

$('.aside-menu__button--open').on('click', () => {
  body.addClass('hidden');
  menu.slideDown(300);
});

$('.aside-menu__button--close').on('click', () => {
  body.removeClass('hidden');
  menu.slideUp(300);
});
