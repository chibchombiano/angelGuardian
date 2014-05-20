
var app = app || {};

app.AddServicio = (function () {
    'use strict'

    var addServicioViewModel = (function () {
        var position;
        var dataSource;
        var $newStatus;
        var validator;
        var $signUpForm;
        var $formFields;
        var $signupBtnWrp;
        var $buscarGps;      
       
        
        var init = function () {
            
            $signUpForm = $('#servicio');
            $formFields = $signUpForm.find('input, textarea, select');
            $signupBtnWrp = $('#servicioSolicitar');
            $buscarGps = $('#buscarGps');            
            
            validator = $signUpForm.kendoValidator({ validateOnBlur: false }).data('kendoValidator');
            
            $formFields.on('keyup keypress blur change input', function () {
                if (validator.validate()) {
                    $signupBtnWrp.removeClass('disabled');
                } else {
                    $signupBtnWrp.addClass('disabled');
                }
            });
        };
        
        
        
        var show = function () {
            
            navigator.geolocation.getCurrentPosition(
                onSuccessShowMap,
                onErrorShowMap
                );
            
            $buscarGps.click(geoDecode);          
        };
        
        function inicializarDataSource(){
            dataSource = kendo.observable({
                Marca: '',
                Color: '',
                Placa: '',
                Direccion_Partida: '',
                Direccion_Llegada: '',
                Numero_Paradas: '',
                Telefono_Confirmacion: ''          
            });
            kendo.bind($('#servicio'), dataSource, kendo.mobile.ui);
            
        }
        
        function onSuccessShowMap(data) { 
            position  = { latitude: data.coords.latitude, longitude : data.coords.longitude};
            inicializarDataSource();
        };
    
        function onErrorShowMap(error){
            app.showError(error);
            inicializarDataSource();
        };
        
        var geoDecode =  function (){
            
           var geocoder = new google.maps.Geocoder();
   		   var latLng = new google.maps.LatLng(position.latitude, position.longitude);

           if (geocoder) {
              geocoder.geocode({ 'latLng': latLng }, function (results, status) {
                 if (status == google.maps.GeocoderStatus.OK) {
                    var direccion = results[0].formatted_address;
                     dataSource.Direccion_Partida = direccion;
                     app.showConfirm('direccion encontrada ' + direccion, 'Direccion Gps',resultDialog)                     
                     dataSource.set('Direccion_Partida', direccion);
                     kendo.bind($('#servicio'), dataSource, kendo.mobile.ui);
                 }
                 else {
                    console.log("Geocoding failed: " + status);
                 }
              });
           }
    	};
        
        function resultDialog(result){
            
        }                          
      
                                
        var solicitarServicio = function () {
            
            // Validating of the required fields
            if (validator.validate()) {
                
                // Adding new activity to Activities model
                /*var servicios = app.Servicios.servicios;
                var servicio = servicios.add();
                
                activity.Text = $newStatus.val();
                activity.UserId = app.Users.currentUser.get('data').Id;
                
                activities.one('sync', function () {
                    app.mobileApp.navigate('#:back');
                });
                
                servicios.sync();*/
            }
        };
        
        return {
            init: init,
            show: show,
            me: app.Users.currentUser,
            solicitarServicio: solicitarServicio           
        };
        
    }());
    
    return addServicioViewModel;
    
}());
