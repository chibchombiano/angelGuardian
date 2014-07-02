
var app = app || {};

app.ServicioExitoso = (function () {
    'use strict'

    var ServicioExitosoViewModel = (function () {       
        
        var $volverSolicitudServicioExitoso;
        
        var init = function () {
            
            $volverSolicitudServicioExitoso = $('#volverSolicitudServicioExitoso');
            
            $volverSolicitudServicioExitoso.click(function(){                
                app.mobileApp.navigate("#:back");
            });
        };
        
        var show = function () {
           
        };
        
       
        
        return {
            init: init,
            show: show                  
        };
        
    }());
    
    return ServicioExitosoViewModel;
    
}());
