$("#register").click(function() {
    email = $('#email').val()
    username = $('#username').val()
    password = $('#password').val()
    retry = $('#retry').val()

    if (!isRequired(username)) {
        showAlert("The username is required!", 2)
        return
    }

    if (username.length < 8) {
        showAlert("The username is 8 digits at least!", 2)
        return
    }

    if (!isEmail(email)) {
        showAlert("Illeagal email format!", 2)
        return
    }

    if (!isAllowedFormat(password) || !isAllowedFormat(retry)) {
        showAlert("Password must have at least 8 digits with lowercase letter, number and uppercase letter", 2)
        return
    }

    if (password != retry) {
        showAlert("Two password are not consistent!", 2)
        return
    }

    $.ajax({
        url: "/user/register",
        dataType: "json",
        data: {
            name: username,
            email: email,
            password: password
        },
        type: "post",
        success: function(data) {
            if (data.code == 0) {
                showAlert("Register succeed, now turn to login site.");
                setTimeout(function() {
                    window.location.href = "/login";
                }, 1000)
            } else {
                showAlert("Register failed, please try it later!", 1);
            }
            
        },
        error: function(err) {
            showAlert("Register error, please try it later!", 1);
        }
    })
})