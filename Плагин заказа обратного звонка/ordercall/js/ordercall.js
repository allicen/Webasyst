$(document).ready(function (e) {
    var widthM = window.screen.width;
    if (widthM < 600) {
        $("head").append("<meta name=\"viewport\" content=\"width=500, user-scalable=yes\">");
    } else if (widthM < 800) {
        $("head").append("<meta name=\"viewport\" content=\"width=600, user-scalable=yes\">");
    }
    $(".ordercallform .backgroundhide").hide();
    $(".ordercallform .errorbot").hide();

    /* Скрыть/показать форму*/
    $(".ordercallink").click(function () {
        $(".ordercallform .backgroundhide").fadeIn(50);
    });
    $(".ordercallform .box_shadow").click(function () {
        $(".ordercallform .backgroundhide").fadeOut(50);
    });
    $(".ordercallform .close").click(function () {
        $(".ordercallform .backgroundhide").fadeOut(50);
    });

    /* Проверить обязательные поля */
    $(".ordercallform .message").each(function () {
        $(this).prev().addClass("important empty");
    });

    /* Проверить согласие с политикой */
    if ($("div").is(".ordercallform .agreeblock")) {
        $(".ordercallform .agreeform").on("change", function () {
            if ($(".ordercallform .agreeform").prop("checked")) {
                $(".ordercallform input[type=submit]").attr("disabled", false);

            } else {
                $(".ordercallform input[type=submit]").attr("disabled", true);
            }
        });
    } else {
        $(".ordercallform input[type=submit]").attr("disabled", false);
    }

    /* Маска для телефона, проверка номера (работает, надо раскомментировать)*/
    //$(".ordercallform .phonemask").mask("+7 (999) 999-9999");

    //$(".ordercallform .phonemask").on("focus click", function() {
    //  $(this)[0].setSelectionRange(4, 4);
    //})

    /* Проверка номера без маски */
    var re = /^\d[\d\(\)\ -]{4,14}\d$/;

    function validPhone() {
        var re = new RegExp(/^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/);
        var phone = $(".ordercallform .namefield input[name=phone]").val();
        var valid = re.test(phone);
        if (valid) {
            return true;
        } else {
            return false;
        }
    }

    /* Скрыть/показать сообщения, что поле не заполнено */
    function checkInput() {
        $(".ordercallform input[type=text].important").each(function () {
            if ($(this).val() != "") {
                $(this).removeClass("empty");
                $(this).next().hide();
            } else {
                $(this).addClass("empty");
            }
        });
    }

    /* Обработка клика на кнопку отправки формы */
    $(".ordercallform input[type=submit]").click(function () {
        if ($(".ordercallform input[type=submit]").attr("disabled", true)) {
            $(".ordercallform input[type=submit]").removeAttr("disabled");
        }
        checkInput();
        validPhone();
        var empty = $(".ordercallform .empty").length;

        if (empty > 0 || validPhone() == false) {
            $(".ordercallform .empty").each(function () {
                /* Отмена отправки формы */
                $(".ordercallsent").submit(function (event) {
                    event.preventDefault();
                });
                $(this).next().show();
                $(this).next().text("Это поле обязательное");
            });
            if (validPhone() == false && $(".ordercallform .namefield input[name=phone]").val() != "") {
                $(".ordercallform .namefield input[name=phone]").next().show();
                $(".ordercallform .namefield input[name=phone]").next().text("Введен некорректный номер");
            }
        } else {
            $(".ordercallsent").submit(function () {
                var str = $(this).serialize();
                /* Отправка сообщения на ajax */
                $.ajax({
                    type: "POST",
                    url: "/ordercall/send/", // Поменять потом!!!
                    data: str,
                    dataType: "json",
                    success: function (msg) {
                        result = $.parseJSON(msg);
                        $(".ordercallform .hideform").hide();
                        $(".ordercallform .form").css({"margin-top": "100px"});
                        $(".ordercallform .headerinfo").html("Форма отправлена успешно");
                    },
                    error: function (msg) { // Данные не отправлены
                        //$(".ordercallform .headerinfo").html("Форма не отправлена ");
                        $(".ordercallform .errorbot").show();
                    }
                });
                return false;
            });
        }
    });

    /* Ползунок со временем */
    $(".ordercallform .polzunok").slider({
        animate: "slow",
        range: true,
        min: 12,
        step: 1,
        max: 21,
        values: [14, 19],
        slide: function (event, ui) {
            var one = ui.values[0];
            var two = ui.values[1];
            $(".ordercallform input[name=timefrom]").val(ui.values[0]);
            $(".ordercallform input[name=timeto]").val(ui.values[1]);
        }
    });

    $(".ordercallform input[name=timefrom]").val($(".ordercallform .polzunok").slider("values", 0));
    $(".ordercallform input[name=timeto]").val($(".ordercallform .polzunok").slider("values", 1));
    var timeprint = [12, 13, 14, 15, 16, 17, 18, 19, 20, 21];

    if ($("div").is("#resulttime")) {
        for (i = 0; i < timeprint.length; i++) {
            document.getElementById("resulttime").innerHTML += "<div>" + timeprint[i] + "</div>";
        }
    }

    /* Скрыть капчу (невидимую)*/
    if ($("div").is(".ordercallform .wa-captcha .g-recaptcha")) {
        if ($(".ordercallform .wa-captcha .g-recaptcha").attr("data-size") === "invisible") {
            $(".ordercallform .wa-captcha .g-recaptcha").css({"height": "0px"});
        }
    }
});