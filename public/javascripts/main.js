function getMovieItem(data) {
    var template = ""
    template += '<div class="col-md-3 col-sm-6 col-xs-12">';
    template += '<div class="info-box" style="cursor: pointer;" data-href="/movie/' + data._id + '" id=' + data._id + '>';
    template += '<span class="info-box-icon bg-aqua"><i class="fa fa-envelope-o"></i></span>';
    template += '<div class="info-box-content">'
    template += '<span class="info-box-text">' + data.name + '</span>'
    template += '<span class="info-box-number">' + data.rate + '</span>'
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
        }
    },
    error: function(err) {
        showAlert("Internal error!")
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
            $("#movies").append(movie)
        }
    },
    error: function(err) {
        showAlert("Internal error!")
    }
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

$("#movies").on("click", ".info-box", function(e) {
    var href = $(this).attr("data-href")
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
})

$(".info-box").click(function(e) {
    var href = $(this).attr("data-href")
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