$(document).ready(function () {
  $(".carousel__inner").slick({
    speed: 1200,
    adaptiveHeight: true,
    prevArrow: '<button type="button" class="slick-prev"><img src="../icons/left.png"></button>',
    nextArrow: '<button type="button" class="slick-next"><img src="../icons/right.png"></button>',
    responsive: [
      {
        breakpoint: 992,
        settings: {
          dots: true,
          arrows: false,
        },
      },
    ],
  });
  $("ul.catalog__tabs").on("click", "li:not(.catalog__tab_active)", function () {
    $(this)
      .addClass("catalog__tab_active")
      .siblings()
      .removeClass("catalog__tab_active")
      .closest("div.container")
      .find("div.catalog__content")
      .removeClass("catalog__content_active")
      .eq($(this).index())
      .addClass("catalog__content_active");
  });

  $(".catalog__link").each(function (i) {
    $(this).on("click", function (e) {
      e.preventDefault();
      $(".catalog__main").eq(i).toggleClass("catalog__main_active");
      $(".catalog__list").eq(i).toggleClass("catalog__list_active");
    });
  });

  $(".catalog__linkback").each(function (i) {
    $(this).on("click", function (e) {
      e.preventDefault();
      $(".catalog__main").eq(i).toggleClass("catalog__main_active");
      $(".catalog__list").eq(i).toggleClass("catalog__list_active");
    });
  });

  //modal

  $('[data-modal="consultation"]').on("click", function () {
    $(".overlay,#consultation").fadeIn("slow");
  });
  $(".modal__close").on("click", function () {
    $(".overlay, #consultation, #order, #thanks").fadeOut("slow");
  });
  $(".button_mini").each(function (i) {
    $(this).on("click", function () {
      $("#order .modal__descr").text($(".catalog__subtitle").eq(i).text());
      $(".overlay, #order").fadeIn("slow");
    });
  });

  //validation

  function valideForms(form) {
    $(form).validate({
      rules: {
        name: "required",
        phone: "required",
        email: {
          required: true,
          email: true,
        },
      },
      messages: {
        name: "Пожалуйста, введите свое имя",
        phone: "Пожалуйста,введите свой телефон",
        email: {
          required: "Пожалуйста, введите свою почту",
          email: "Неправильно введен адрес почты ",
        },
      },
    });
  }
  valideForms("#consultation-form");
  valideForms("#consultation form");
  valideForms("#order form");

  //mask for phone
  $("input[name=phone]").mask("+7 (999) 999-99-99");

  //form thanks

  $("form").submit(function (e) {
    e.preventDefault();

    if (!$(this).valid()) {
      return;
    }

    $.ajax({
      type: "POST",
      url: "mailer/smart.php",
      data: $(this).serialize(),
    }).done(function () {
      $(this).find("input").val("");
      $("#consultation, #order").fadeOut();
      $(".overlay, #thanks").fadeIn(slow);

      $("form").trigger("reset");
    });
    return false;
  });

  //smooth scroll and pageup
  $(window).scroll(function () {
    if ($(this).scrollTop() > 1600) {
      $(".pageup").fadeIn();
    } else {
      $(".pageup").fadeOut();
    }
  });

  $("a[href^='#up']").click(function () {
    const _href = $(this).attr("href");
    $("html, body").animate({ scrollTop: $(_href).offset().top + "px" });
    return false;
  });
});
