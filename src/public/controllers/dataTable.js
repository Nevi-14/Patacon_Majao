$(document).ready(function(){
	$(".hamburger .fas").click(function(){
		$(".wrapper").addClass("active")
	})

	$(".wrapper .sidebar .close").click(function(){
		$(".wrapper").removeClass("active")
	})
})

$(document).ready(function(){

	$(".wrapper .sidebar .close-li").click(function(){
		$(".wrapper").removeClass("active")
	})
})


$('.mydatatable').DataTable({



	pagingType: 'full_numbers',
	lengthMenu: [[5,10,25,50,-1],[5,10,25,50,"All"]],
	info: false,
	responsive: true,
	displayLength: 5,
	language: {
	  "sProcessing":     "Procesando...",
				  "sLengthMenu":     "Registros _MENU_",
				  "sZeroRecords":    "No se encontraron resultados",
				  "sEmptyTable":     "Ningún dato disponible en esta tabla",
				  "sInfo":           "Registros del _START_ al _END_ de un total de _TOTAL_ registros",
				  "sInfoEmpty":      "Mostrando registros del 0 al 0 de un total de 0 registros",
				  "sInfoFiltered":   "(filtrado de un total de _MAX_ registros)",
				  "sInfoPostFix":    "",
				  "sSearch":         "Buscar:",
				  "sUrl":            "",
				  "sInfoThousands":  ",",
				  "sLoadingRecords": "Cargando...",
				  "oPaginate": {
					  "sFirst":    "Primero",
					  "sLast":     "Último",
					  "sNext":     "Siguiente",
					  "sPrevious": "Anterior"
				  },
				  "oAria": {
					  "sSortAscending":  ": Activar para ordenar la columna de manera ascendente",
					  "sSortDescending": ": Activar para ordenar la columna de manera descendente"
				  },
				  "buttons": {
					  "copy": "Copiar",
					  "colvis": "Visibilidad"
				  }
  }
  
  
  });
  
  

