function getMovieItem(data) {
    var template = ""
    var integerPart = Math.round(data.rate)
    var decimalPart = data.rate - integerPart

    template += '<div class="col-md-3 col-sm-6 col-xs-12">';
    template += '<div class="info-box" style="cursor: pointer;" data-href="/movie/' + data._id + '" id=' + data._id + '>';
    template += '<span class="info-box-icon bg-aqua"><i class="fa fa-envelope-o"></i></span>';
    template += '<div class="info-box-content">'
    template += '<span class="info-box-text">' + data.name + '</span>'
    template += '<span class="info-box-text">' + data.genres + '</span>'
    for (var i = 0; i < 5; i++) {
        if (i < integerPart/2 && decimalPart <= 0) {
            template += '<i class="fa fa-fw fa-star"></i>'
        } else if (decimalPart > 0) {
            template += '<i class="fa fa-fw fa-star-half-o"></i>'
        } else {
            template += '<i class="fa fa-fw fa-star-o"></i>'
        }
    }
    template += '<span class="info-box-number">' + parseFloat(data.rate) + '</span>'
    template += '</div></div></div>';

    return template;
}

// ask if user has logged in before
$.ajax({
    url: "/user/info",
    dataType: "json",
    type: "post",
    success: function(data) {
        if (data.data.userId) {
            $(".nologin").css("display", "none")
            $("#login").css("display", "block")
            $(".username").text(data.data.name)
        } else {
            $(".stars").removeAttr('id')
        }
    },
    error: function(err) {
        showAlert("Internal error!")
    }
})

total = 0

// rating animation
$('.star').mouseover(function(e) {
    $('.star').each(function(elem) {
        if ($(e.target).attr("data-index") >= $(this).attr("data-index")) {
            if ($(this).hasClass("fa-star-o")) {
                $(this).removeClass("fa-star-o").addClass("fa-star")
                total += 2
            }
        } else {
            if ($(this).hasClass("fa-star")) {
                $(this).removeClass("fa-star").addClass("fa-star-o")
                total -= 2
            }
        }
    })
    $('#movierate').text(total)
})


if ($("#moviesInGenres").length > 0) {
    $.ajax({
        url: "/movies/listByGenres",
        dataType: "json",
        type: "post",
        data: {
            genres: $("#moviesInGenres").attr("data-genres")
        },
        success: function(data) {
            for (var i = 0; i < data.data.length; i++) {
                movie = getMovieItem(data.data[i])
                $("#moviesInGenres").append(movie)
            }
        },
        error: function(err) {
            showAlert("Internal error!", 1)
        }
    })
}

// rate system function
$(".stars").click(function(e) {
    // users already logged in can give rates
    movieId = $("div .info-box").attr('id')
    console.log(movieId)

    if ($(this).attr("id")) {
        $.ajax({
            url: "/movies/rate",
            dataType: "json",
            type: "post",
            data: {
                _id: movieId,
                rate: total
            },
            success: function(data) {
                showAlert("Rating success!")
            },
            error: function(err) {
                showAlert("Internal error!")
            }
        })
    } else {
        showAlert("Please login before giving rates to your liked movies!", 2)
    }
})

// click movie section
$.ajax({
    url: "/movies/list",
    dataType: "json",
    type: "post",
    success: function(data) {
        for (var i = 0; i < data.data.length; i++) {
            movie = getMovieItem(data.data[i])
            $("#specials").append(movie)
        }
    },
    error: function(err) {
        showAlert("Internal error!")
    }
})

if ($("#movies").length > 0) {
    $.ajax({
        url: "/movies/getSpecials",
        dataType: "json",
        type: "post",
        success: function(data) {
            for (var i = 0; i < data.data.length; i++) {
                movie = getMovieItem(data.data[i])
                $("#movies").append(movie)
            }
        },
        error: function(err) {
            showAlert("Internal error!")
        }
    })
}

$("#refresh").click(function(e) {
    $.ajax({
        url: "/movies/getSpecials",
        dataType: "json",
        type: "post",
        success: function(data) {
            $('#specials').empty();
            for (var i = 0; i < data.data.length; i++) {
                movie = getMovieItem(data.data[i])
                $("#specials").append(movie)
            }
        },
        error: function(err) {
            showAlert("Internal error!")
        }
    })
})

$("#genres").on("click", ".genres", function(e) {
    $.ajax({
        url: "/behaviors/genres",
        dataType: "json",
        type: "post",
        data: {
            genresId: $(this).attr("data-id")
        },
        success: function(data) {
            console.log("haha")
        },
        error: function(err) {
            showAlert("Internal error!")
        }
    })
})

$("#movies, #specials, #moviesInGenres").on("click", ".info-box", function(e) {
    var href = $(this).attr("data-href")
    if (href) {
       $.ajax({
            url: "/behaviors/movies",
            dataType: "json",
            type: "post",
            data: {
                movieId: $(this).attr("id")
            },
            success: function(data) {
                window.location.href = href;
                e.stopPropagation();
            },
            error: function(err) {
                showAlert("Internal error!")
            }
        }) 
    }
    
})

// movies found by genres
$(".info-box").click(function(e) {
    var href = $(this).attr("data-href")
    if (href) {
        $.ajax({
            url: "/behaviors/movies",
            dataType: "json",
            type: "post",
            data: {
                movieId: $(this).attr("id")
            },
            success: function(data) {
                window.location.href = href;
                e.stopPropagation();
            },
            error: function(err) {
                showAlert("Internal error!")
            }
        })
    }
})

$("#logout").click(function() {
    $.ajax({
        url: "/user/logout",
        dataType: "json",
        type: "post",
        success: function(data) {
            showAlert("Already logout!");
            window.location.href = "/login";
        }
    })
})