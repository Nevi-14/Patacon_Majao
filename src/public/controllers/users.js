
function validateForm() {
    toastr.options = {
        "closeButton": true,
        "debug": false,
        "newestOnTop": false,
        "progressBar": false,
        "positionClass": "toast-top-right",
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

    var cedula = document.getElementById("Ced_Cliente").value;
    var nombre = document.getElementById("Nombre_Cliente").value;
    var apellido1 = document.getElementById("Primer_Apellido").value;
    var apellido2 = document.getElementById("Segundo_Apellido").value;
    var correo = document.getElementById("Correo_Cliente").value;
    var numero = document.getElementById("Telefono_Cliente").value;


    if (cedula.trim() == '') {
        toastr["error"]("La cedula  es obligatoria", "Patacon Maja'o")
        $("#Ced_Cliente").focus();
        return false;
    }
    if (cedula.length > 15) {
        toastr["error"]("La cedula no puede  excederse a 15 digitos", "Patacon Maja'o")
        $('#Ced_Cliente').val("");
        $("#Ced_Cliente").focus();
        return false;
    }
    if (nombre.trim() == '') {
        toastr["error"]("El nombre es obligatorio", "Patacon Maja'o")
        $("#Nombre_Cliente").focus();
        return false;
    }
 
    if (apellido1.trim() == '') {
        toastr["error"]("Primer apellido  obligatorio", "Patacon Maja'o")
        $("#Primer_Apellido").focus();
        return false;
    }
    if (apellido1.length > 20) {
        toastr["error"]("Primer apellido  no puede  excederse a 20 caracteres", "Patacon Maja'o")
        $('#Primer_Apellido').val("");
        $("#Primer_Apellido").focus();
        return false;
    }


    if (apellido2.trim() == '') {
        toastr["error"]("Segundo apellido  obligatorio", "Patacon Maja'o")
        $("#Segundo_Apellido").focus();
        return false;
    }
    if (apellido2.length > 20) {
        toastr["error"]("Segundo apellido  no puede  excederse a 20 caracteres", "Patacon Maja'o")
        $('#Segundo_Apellido').val("");
        $("#Segundo_Apellido").focus();
        return false;
    }


    if (correo == '') {
        toastr["error"]("Correo es  obligatorio", "Patacon Maja'o")
        $("#Correo_Cliente").focus();
        return false;
    }
    if(correo.indexOf('@')<=0){
        toastr["error"]("Correo invalido", "Patacon Maja'o")
        $('#Correo_Cliente').val("");
        $("#Correo_Cliente").focus();
        return false;
    }


    if (correo.length > 60) {
        toastr["error"]("El correo  no puede  excederse a 60  caracteres", "Patacon Maja'o")
        $('#Correo_Cliente').val("");
        $("#Correo_Cliente").focus();
        return false;
    }


    if (numero.length > 9) {
        toastr["error"]("El numero no puede ser mayor a 9 digitos", "Patacon Maja'o")
        $('#Telefono_Cliente').val("");
        $("#Telefono_Cliente").focus();
        return false;
    } else if (numero.length < 9) {
        toastr["error"]("El numero no puede ser menor a 9 digitos ", "Patacon Maja'o")
        $('#Telefono_Cliente').val("");
        $("#Telefono_Cliente").focus();
        return false;
    } else {

        true
    }



}

