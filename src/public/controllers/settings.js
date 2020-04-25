function toastrProperties() {
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

}



function editPassword() {
    toastrProperties()

    var usuario = document.getElementById("Cod_Login").value;
    var contraseña = document.getElementById("Contrasena").value;

    if (usuario == "Empleado") {
        toastr["error"]("El empleado es obligatorio", "Patacon Maja'o")
        $("#Cod_Login").focus();
        return false;
    }
    if (contraseña.trim() == '') {
        toastr["error"]("Contraseña es obligatoria", "Patacon Maja'o")
        $("#Contrasena").focus();
        return false;
    }


}

function addRoles() {
    toastrProperties()

    var codigo = document.getElementById("Cod_Rol").value;
    var rol = document.getElementById("Tipo_Rol").value;

    if (codigo.trim() == '') {
        toastr["error"]("El codigo es obligatorio", "Patacon Maja'o")
        $("#Cod_Rol").focus();
        return false;
    }
    if (codigo.length > 2) {
        toastr["error"]("El codigo no puede exceder los 2 caracteres", "Patacon Maja'o")
        $("#Cod_Rol").val("");
        $("#Cod_Rol").focus();
        return false;
    }

    if (rol.trim() == '') {
        toastr["error"]("La descripcion es obligatoria", "Patacon Maja'o")
        $("#Tipo_Rol").focus();
        return false;
    }
    if (rol.length > 15) {
        toastr["error"]("La descripcion no puede exceder los 15 caracteres", "Patacon Maja'o")
        $("#Tipo_Rol").val("");
        $("#Tipo_Rol").focus();
        return false;
    }

}


function addCategory() {
    toastrProperties()

    var codigo = document.getElementById("Cod_Categoria").value;
    var nombre = document.getElementById("Nombre_Categoria").value;

    if (codigo.trim() == '') {
        toastr["error"]("El codigo es obligatorio", "Patacon Maja'o")
        $("#Cod_Categoria").focus();
        return false;
    }
    if (codigo.length > 2) {
        toastr["error"]("El codigo no puede exceder los 2 caracteres", "Patacon Maja'o")
        $("#Cod_Categoria").val("");
        $("#Cod_Categoria").focus();
        return false;
    }

    if (nombre.trim() == '') {
        toastr["error"]("La descripcion es obligatoria", "Patacon Maja'o")
        $("#Nombre_Categoria").focus();
        return false;
    }
    if (nombre.length > 20) {
        toastr["error"]("La descripcion no puede exceder los 20 caracteres", "Patacon Maja'o")
        $("#Nombre_Categoria").val("");
        $("#Nombre_Categoria").focus();
        return false;
    }

}


function addStatus() {
    toastrProperties()

    var codigo = document.getElementById("Cod_Estado").value;
    var nombre = document.getElementById("Nombre_Estado").value;

    if (codigo.trim() == '') {
        toastr["error"]("El codigo es obligatorio", "Patacon Maja'o")
        $("#Cod_Estado").focus();
        return false;
    }
    if (codigo.length > 2) {
        toastr["error"]("El codigo no puede exceder los 2 caracteres", "Patacon Maja'o")
        $("#Cod_Estado").val("");
        $("#Cod_Estado").focus();
        return false;
    }

    if (nombre.trim() == '') {
        toastr["error"]("La descripcion es obligatoria", "Patacon Maja'o")
        $("#Nombre_Estado").focus();
        return false;
    }
    if (nombre.length > 15) {
        toastr["error"]("La descripcion no puede exceder los 15 caracteres", "Patacon Maja'o")
        $("#Nombre_Estado").val("");
        $("#Nombre_Estado").focus();
        return false;
    }

}

function addEvent() {
    toastrProperties()

    var codigo = document.getElementById("Cod_Tipo_Evento").value;
    var nombre = document.getElementById("Nombre_Tipo_Evento").value;

    if (codigo.trim() == '') {
        toastr["error"]("El codigo es obligatorio", "Patacon Maja'o")
        $("#Cod_Tipo_Evento").focus();
        return false;
    }
    if (codigo.length > 2) {
        toastr["error"]("El codigo no puede exceder los 2 caracteres", "Patacon Maja'o")
        $("#Cod_Tipo_Evento").val("");
        $("#Cod_Tipo_Evento").focus();
        return false;
    }

    if (nombre.trim() == '') {
        toastr["error"]("La descripcion es obligatoria", "Patacon Maja'o")
        $("#Nombre_Tipo_Evento").focus();
        return false;
    }
    if (nombre.length > 20) {
        toastr["error"]("La descripcion no puede exceder los 20 caracteres", "Patacon Maja'o")
        $("#Nombre_Tipo_Evento").val("");
        $("#Nombre_Tipo_Evento").focus();
        return false;
    }

}



function signUP() {
    toastrProperties()

    var cedula = document.getElementById("Ced_Empleado").value;
    var codigoRol = document.getElementById("Cod_Rol").value;
    var usuario = document.getElementById("Usuario").value;
    var contrasena = document.getElementById("Contrasena").value;
   
    if (cedula == "Empleado") {
        toastr["error"]("El empleado obligatorio", "Patacon Maja'o")
        $("#Ced_Empleado").focus();
        return false;
    }

    if(codigoRol == "Tipo de usuario"){
        toastr["error"]("Tipo de usuario es obligatorio", "Patacon Maja'o")
        $("#Cod_Rol").focus();
        return false;
    }

    if (usuario == "") {
        toastr["error"]("El usuario obligatorio", "Patacon Maja'o")
        $("#Usuario").focus();
        return false;
    }

    if(usuario.length > 60){
        toastr["error"]("El usuario no puede exceder 60 caracteres", "Patacon Maja'o")
        $("#Usuario").val("");
        $("#Usuario").focus();
        return false;
    }

    if(contrasena ==""){
        toastr["error"]("La contraseña es obligatoria", "Patacon Maja'o")
        $("#Contrasena").focus();
        return false;

    }

    if(contrasena.length > 60){
        toastr["error"]("La contraseña no puede exceder 60 caracteres", "Patacon Maja'o")
        $("#Contrasena").val("");
        $("#Contrasena").focus();
        return false;
    }
  
}
