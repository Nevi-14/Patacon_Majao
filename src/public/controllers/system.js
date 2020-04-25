function toastr() {
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



function editPassword(){
    toastr();
    
    var usuario = document.getElementById("Usuario").value;
    var contraseña = document.getElementById("Contrasena").value;


    if (contraseña.trim() == '') {
        toastr["error"]("Contraseña es obligatoria", "Patacon Maja'o")
        $("#Contrasena").focus();
        return false;
    }


}

