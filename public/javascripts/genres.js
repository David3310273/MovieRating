$.ajax({
    url: "/genres/list",
    dataType: "json",
    type: "get",
    success: function(data) {
        console.log(data)
        for (var i=0;i<data.data.length;i++){
            var genre="";
            genre += '<li>'
            genre += '<a href="#">'
            genre += '<i class="fa fa-th"></i> <span>' + data.data[i].name + '</span>'
            genre += '<span class="pull-right-container">'
            // TODO: add hot tags depend on time
            // genre += '<small class="label pull-right bg-green">Hot</small>'
            genre += '</span>'
            genre += '</a>'
            genre += '</li>'
            $('#genres').append(genre)
        }
    }
})