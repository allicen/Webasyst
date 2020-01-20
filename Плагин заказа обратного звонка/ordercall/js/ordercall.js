$(document).ready(function (e) {
    let widthM = window.screen.width;
    let div = $("div");
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
        $("html").css("overflow", "hidden");
    });
    $(".ordercallform .box_shadow").click(function () {
        $(".ordercallform .backgroundhide").fadeOut(50);
        $("html").css("overflow", "auto");
    });
    $(".ordercallform .close").click(function () {
        $(".ordercallform .backgroundhide").fadeOut(50);
        $("html").css("overflow", "auto");
    });

    /* Проверить обязательные поля */
    $(".ordercallform .message").each(function () {
        $(this).prev().addClass("important empty");
    });

    /* Проверить согласие с политикой */
    if (div.is(".ordercallform .agreeblock")) {
        $(".ordercallform .agreeform").on("change", function () {
            if ($(".ordercallform .agreeform").prop("checked")) {
                submit.attr("disabled", false);

            } else {
                submit.attr("disabled", true);
            }
        });
    } else {
        submit.attr("disabled", false);
    }

    /* Маска для телефона, проверка номера (работает, надо раскомментировать)*/
    //$(".ordercallform .phonemask").mask("+7 (999) 999-9999");

    //$(".ordercallform .phonemask").on("focus click", function() {
    //  $(this)[0].setSelectionRange(4, 4);
    //})

    /* Проверка номера без маски */
    let re = /^\d[\d() -]{4,14}\d$/;

    function validPhone() {
        let re = new RegExp(/^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/);
        let phone = $(".ordercallform .namefield input[name=phone]").val();
        return re.test(phone);
    }

    /* Скрыть/показать сообщения, что поле не заполнено */
    function checkInput() {
        $(".ordercallform input[type=text].important").each(function () {
            if ($(this).val() !== "") {
                $(this).removeClass("empty");
                $(this).next().hide();
            } else {
                $(this).addClass("empty");
            }
        });
    }

    /* Обработка клика на кнопку отправки формы */
    let submit = $(".ordercallform input[type=submit]");
    submit.click(function () {
        if (submit.attr("disabled", true)) {
            submit.removeAttr("disabled");
        }
        checkInput();
        validPhone();
        let empty = $(".ordercallform .empty");

        if (empty.length > 0 || validPhone() === false) {
            empty.each(function () {
                /* Отмена отправки формы */
                $(".ordercallsent").submit(function (event) {
                    event.preventDefault();
                });
                $(this).next().show();
                $(this).next().text("Это поле обязательное");
            });
            let validNumber = $(".ordercallform .namefield input[name=phone]");
            if (validPhone() === false && validNumber.val() !== "") {
                validNumber.next().show();
                validNumber.next().text("Введен некорректный номер");
            }
        } else {
            $(".ordercallsent").submit(function () {
                let str = $(this).serialize();
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
    let timeline = $(".ordercallform .polzunok");
    timeline.slider({
        animate: "slow",
        range: true,
        min: 12,
        step: 1,
        max: 21,
        values: [14, 19],
        slide: function (event, ui) {
            let one = ui.values[0];
            let two = ui.values[1];
            $(".ordercallform input[name=timefrom]").val(ui.values[0]);
            $(".ordercallform input[name=timeto]").val(ui.values[1]);
        }
    });

    $(".ordercallform input[name=timefrom]").val(timeline.slider("values", 0));
    $(".ordercallform input[name=timeto]").val(timeline.slider("values", 1));
    let timeprint = [12, 13, 14, 15, 16, 17, 18, 19, 20, 21];

    if (div.is("#resulttime")) {
        for (i = 0; i < timeprint.length; i++) {
            document.getElementById("resulttime").innerHTML += "<div>" + timeprint[i] + "</div>";
        }
    }

    /* Скрыть капчу (невидимую)*/
    let captcha = $(".ordercallform .wa-captcha .g-recaptcha");
    if (div.is(".ordercallform .wa-captcha .g-recaptcha")) {
        if (captcha.attr("data-size") === "invisible") {
            captcha.css({"height": "0px"});
        }
    }
});