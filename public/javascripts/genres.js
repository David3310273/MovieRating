$.ajax({
    url: "/genres/list",
    dataType: "json",
    type: "get",
    success: function(data) {
        for (var i=0;i<data.data.length;i++){
            var genre="";
            genre += '<li class="genres" data-name=' + data.data[i].name + ' data-id=' + data.data[i]._id + '>'
            genre += '<a href="/genre/' + data.data[i]._id + '">'
            genre += '<i class="fa fa-th"></i> <span>' + data.data[i].name + '</span>'
            genre += '<span class="pull-right-container">'
            // TODO: add hot tags depend on real statistics
            if (i < 3) {
                genre += '<small class="label pull-right bg-orange">Hot</small>'
            }
            genre += '</span>'
            genre += '</a>'
            genre += '</li>'
            $('#genres').append(genre)
        }
    }
})