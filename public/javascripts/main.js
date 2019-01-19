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