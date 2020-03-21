//hints style after submitting form
function getAlert(message, level) {
    type = "bg-green-active color-palette alert";
    if (level == 1) {
        type = "bg-red-active color-palette alert"
    } else if (level == 2) {
        type = "bg-yellow-active color-palette alert"
    }
    alert = '<div class="' + type + '" style="text-align: center;width: 100%;position: absolute;top: 0;height:40px;line-height: 0.5;font-size: 20px;z-index: 2345;">'
    alert += '<span style="color: white;">' + message + '</span>';
    alert += '</div>'

    return alert
}

function showAlert(message, level) {
    $("body").prepend(getAlert(message, level))
    $(".alert").fadeOut(3000, function() {
        $(this).remove()
    })
}