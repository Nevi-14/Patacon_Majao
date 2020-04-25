

function validateForm() {
    toastr.options = {
        "closeButton": true,
        "debug": false,
        "newestOnTop": false,
        "progressBar": false,
        "positionClass": "toast-bottom-right",
        "preventDuplicates": false,
        "onclick": null,
        "showDuration": "200",
        "hideDuration": "500",
        "timeOut": "2500",
        "extendedTimeOut": "500",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
    };

    var name = document.getElementById("Nombre_Cliente").value;
    var number = document.getElementById("Telefono_Cliente").value;
    var email = document.getElementById("Correo_Cliente").value;
    var message = document.getElementById("Descripcion").value;

    if (name.trim() == '') {
        toastr["error"]("El nombre es obligatorio", "Patacon Maja'o")
        $("#Nombre_Cliente").focus();
        return false;
    }
    if (name.length > 60) {
        toastr["error"]("No puede excederse a 60 caracteres", "Patacon Maja'o")
        $("#Nombre_Cliente").val("");
        $("#Nombre_Cliente").focus();
        return false;
    }
    if (number.length > 9) {
        toastr["error"]("El numero no puede ser mayor a 9 digitos", "Patacon Maja'o")
        $('#Telefono_Cliente').val("");
        $("#Telefono_Cliente").focus();
        return false;
    } else if (number.length < 9) {
        toastr["error"]("El numero no puede ser menor a 9 digitos ", "Patacon Maja'o")
        $('#Telefono_Cliente').val("");
        $("#Telefono_Cliente").focus();
        return false;
    } else {
        true;
    }


    if (email.trim() == '') {
        toastr["error"]("El correo es obligatorio", "Patacon Maja'o")
        $("#Correo_Cliente").focus();
        return false;
    }
if(email.indexOf('@')<=0){
    toastr["error"]("Correo invalido", "Patacon Maja'o")
    $('#Correo_Cliente').val("");
    $("#Correo_Cliente").focus();
    return false;
}

    if (message.trim() == '') {
        toastr["error"]("Por favor ingresa un mensaje", "Patacon Maja'o")
        $("#Descripcion").focus();
        return false;
    }





}