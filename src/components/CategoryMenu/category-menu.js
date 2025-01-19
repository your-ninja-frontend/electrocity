$('.category-menu__slider').slick({
  infinite: false,
  swipeToSlide: true,
  variableWidth: true,
  prevArrow: '.category-menu__slider-button--prev',
  nextArrow: '.category-menu__slider-button--next',
  responsive: [
    {
      breakpoint: 1920,
      settings: {
        arrows: true,
        slidesToShow: 8
      }
    },
    {
      breakpoint: 1919,
      settings: {
        arrows: false,
        slidesToShow: 5
      }
    },
    {
      breakpoint: 767,
      settings: {
        arrows: false,
        slidesToShow: 3
      }
    }
  ]
});
