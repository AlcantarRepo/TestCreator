var lastId,
    topMenu = $("#ul_nawigacja"),
    topMenuHeight = topMenu.outerHeight() + 15,
    // Wszystkie elementy listy
    menuItems = topMenu.find("a"),
    // Kotwice do pozycji menu
    scrollItems = menuItems.map(function () {
        var item = $($(this).attr("href"));
        if (item.length) { return item; }
    });
$('body').prepend('<a href="#" class="back-to-top">Back to Top</a>');

var amountScrolled = 300;

var idUserValue = "";

var imagePathUserAvatar;

$('a.back-to-top').click(function () {
    $('html, body').animate({
        scrollTop: 0
    }, 900);
    return false;
});


menuItems.click(function (e) {
    var href = $(this).attr("href"),
        offsetTop = href === "#" ? 0 : $(href).offset().top - topMenuHeight + 1;
    $('html, body').stop().animate({
        scrollTop: offsetTop
    }, 1000);
    e.preventDefault();
});

$(window).scroll(function () {

    var fromTop = $(this).scrollTop() + topMenuHeight;


    var cur = scrollItems.map(function () {
        if ($(this).offset().top < fromTop)
            return this;
    });

    cur = cur[cur.length - 1];
    var id = cur && cur.length ? cur[0].id : "";

    if (lastId !== id) {
        lastId = id;

        menuItems
            .parent().removeClass("active")
            .end().filter("[href=#" + id + "]").parent().addClass("active");
    }

    if ($(window).scrollTop() > amountScrolled) {
        $('a.back-to-top').fadeIn('slow');
    } else {
        $('a.back-to-top').fadeOut('slow');
    }
});

$(document).ready(function () {

    // Przycisk rejestracji w menu
    //$("#regBtn").click(function () {
    //    document.getElementById("regiserForm").reset();
    //    $("#regModal").modal('show');
    //});

    $("#loginBtn").click(function () {
        document.getElementById("loginForm").reset();
        $("#logModal").modal('show');
    });
    // Przycisk rejestracji w modalu rejestracji

    //$("#regButton").click(function () {
    //    var data = $("#regiserForm").serialize();
    //    $("#loadingDiv").show();

    //    $.ajax({
    //        type: "POST",
    //        dataType: "json",
    //        url: "/Main/AddNewUser",
    //        data: data,
    //        success: function (response) {
    //            $("#loadingDiv").hide();
    //            $("#regModal").modal('hide');

    //            console.log(response.message);

    //            if (response.message) {
    //                bootbox.alert("Wykonano zapis");
    //            } else {
    //                bootbox.alert("Nie dokonano zapisu");
    //            }


    //        },
    //        error: function (res) {
    //            bootbox.alert("Nie dokonano zapisu");
    //        }

    //    });

    //});

    $('#loginButton').click(function () {

        var data = $("#loginForm").serialize();

        $.ajax({
            type: "POST",
            dataType: 'html',
            url: '/Main/LoginOperation',
            data: data,
            success: function (response) {
                $("#logModal").modal('hide');
                console.log(response);
                $('#viewport').html(response);

                if (response === "") {
                    bootbox.alert('Użytkownik nie istnieje');
                } else {
                    $('#viewport').html(response);
                }


            },
            error: function (error) {
                bootbox.alert("Napotkano problem");
            }
        });
    });

    
});