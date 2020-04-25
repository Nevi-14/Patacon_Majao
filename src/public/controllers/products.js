
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

    var codigo = document.getElementById("Cod_Producto").value;
    var nombre = document.getElementById("Nombre_Producto").value;
    var precio = document.getElementById("Precio_Producto").value;
    var categoria = document.getElementById("Cod_Categoria").value;
    var descripcion = document.getElementById("Descripcion").value;


    if (codigo.trim() == '') {
        toastr["error"]("Codigo de producto es obligatorio", "Patacon Maja'o")
        $("#Cod_Producto").focus();
        return false;
    }
    if (codigo.length > 2) {
        toastr["error"]("El codigo de producto no puede exeder los 2 caracteres", "Patacon Maja'o")
        $('#Cod_Producto').val("");
        $("#Cod_Producto").focus();
        return false;
    }
    if (nombre.trim() == '') {
        toastr["error"]("El nombre es obligatorio", "Patacon Maja'o")
        $("#Nombre_Producto").focus();
        return false;
    }
    if (nombre.length > 30) {
        toastr["error"]("El nombre de producto  no puede  excederse a 30 caracteres", "Patacon Maja'o")
        $('#Nombre_Producto').val("");
        $("#Nombre_Producto").focus();
        return false;
    }

    if (precio.trim() == '') {
        toastr["error"]("El precio es  obligatorio", "Patacon Maja'o")
        $("#Precio_Producto").focus();
        return false;
    }
    if (isNaN(precio)) {
        toastr["error"]("El precio no puede tener letras", "Patacon Maja'o")
        $('#Precio_Producto').val("");
        $("#Precio_Producto").focus();
        return false;
    }

    if (categoria == "Categoria") {
        toastr["error"]("La categoria es obligatoria", "Patacon Maja'o")
        $("#Cod_Categoria").focus();
        return false;
    }
    if (descripcion.trim() == '') {
        toastr["error"]("La descripción es obligatoria", "Patacon Maja'o")
        $("#Descripcion").focus();
        return false;
    }


}

