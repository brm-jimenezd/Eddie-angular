$(document).ready(function(){
	resizeLoad();
});

$( window ).resize(function() { resizeLoad(); });
//ajusta los elementos en tamaños de pantallas precisos
function resizeLoad(){
	var W_Window = $( window ).width(); //ancho de la ventana
	var mainTopMenu = $(".main-top-menu"),//Menu principal superior
		classCenterMenu = "justify-content-center",
		classEndMenu = 'justify-content-end';
	
		if( W_Window <= 761 ){
			changeClass(mainTopMenu, classCenterMenu, classEndMenu);
			if ( W_Window <= 575 ){
				changeClass(mainTopMenu, "navbar-right", classCenterMenu);
				//Responsive para las notificaiones
				//notifyResponsive("mobil-notifications"); 
			}	
		}else if( W_Window > 761 ){
			changeClass(mainTopMenu, classEndMenu ,classCenterMenu );
			//Responsive para las notificaiones
			//notifyResponsive("desktop-notifications");
		}
};
//Esta clase cambia una clase a otra
function changeClass($mainel,$adClss, $rmClass ){
	if ( !$mainel.hasClass($adClss) ){
		$mainel.addClass($adClss).removeClass($rmClass);
	}
}
//Agregar y quitar las notificaciones
function notifyResponsive(el){
	var notificaciones  =  $("#user-notifications"),
		notificatyClone = notificaciones.clone();
		exitsNotify     = $("#"+el).find("#user-notifications");
		//remover
		if ( exitsNotify.length == 0){
			$("#user-notifications").remove();
			$("#"+el).append(notificatyClone);	
		} 
		
	}



	