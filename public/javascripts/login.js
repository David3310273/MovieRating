$("#login").click(function() {
    email = $('#email').val()
    username = email
    password = $('#password').val()

    if (!isRequired(username)) {
        showAlert("The username is required!", 2)
        return
    }

    if (!isAllowedFormat(password)) {
        showAlert("Password must have at least 8 digits with lowercase letter, number and uppercase letter", 2)
        return
    }

    $.ajax({
        url: "/user/login",
        dataType: "json",
        data: {
            name: username,
            email: email,
            password: password,
            remember: $('#remember').is(":checked") ? 1 : 0
        },
        type: "post",
        success: function(data) {
            if (data.code == 0) {
                window.location.href = '/'
            } else {
                showAlert("The user doesn't exists, please check or register first!", 1); 
            }
        },
        error: function(err) {
            showAlert("Login failed, please try it later!", 1);
        }
    })
})