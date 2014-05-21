
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
            
            $buscarGps.click(getAddress);  
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
        
        var getAddress = function(){
             app.mobileApp.showLoading();
        
            getPosition().done(function(){            
                geoDecode().done(function(){
            		 app.mobileApp.hideLoading();    
            	});                
            });
        }
        
        var getPosition = function(){
            var deferred = Q.defer();
            
            navigator.geolocation.getCurrentPosition(
                function(data){
                    position  = { latitude: data.coords.latitude, longitude : data.coords.longitude};
                    deferred.resolve(position);
                },
                function(error){
            		deferred.reject("Geocoding failed: " + status);
                    app.mobileApp.hideLoading();
                }
                );
            
            return deferred.promise;
        }
        
        var geoDecode =  function (){
           
           var deferred = Q.defer();
           var geocoder = new google.maps.Geocoder();
   		   var latLng = new google.maps.LatLng(position.latitude, position.longitude);

           if (geocoder) {
              geocoder.geocode({ 'latLng': latLng }, function (results, status) {
                 if (status == google.maps.GeocoderStatus.OK) {
                     try
                     {
                        var direccion = results[0].formatted_address;
                         dataSource.Direccion_Partida = direccion;
                         app.showConfirm('direccion encontrada ' + direccion, 'Direccion Gps',resultDialog)                     
                         dataSource.set('Direccion_Partida', direccion);
                         kendo.bind($('#servicio'), dataSource, kendo.mobile.ui);
                         deferred.resolve(direccion);
                     }
                     catch (error){}
                 }
                 else {
                    console.log("Geocoding failed: " + status);
                    deferred.reject("Geocoding failed: " + status);
                    app.mobileApp.hideLoading();
                 }
              });
           }
            
            return deferred.promise;
    	};
        
        function resultDialog(result){
            
        }                          
      
                                
        var solicitarServicio = function () {
            
            	app.mobileApp.showLoading();
                // Adding new comment to Comments model
                var servicios = app.Servicios.servicios;
                var servicio = servicios.add();                
                
                servicio.Color = dataSource.Color;
                servicio.Direccion_Llegada =  dataSource.Direccion_Llegada;
                servicio.Direccion_Partida = dataSource.Direccion_Partida;
                servicio.Marca = dataSource.Marca;
                servicio.Numero_Paradas = dataSource.Numero_Paradas;
                servicio.Placa = dataSource.Placa;
                servicio.Telefono_Confirmacion = dataSource.Telefono_Confirmacion;
                servicio.UserId = app.Users.currentUser.get('data').Id;
                
                servicios.one('sync', function () {
                    app.mobileApp.hideLoading();
                    app.mobileApp.navigate('views/servicioExitoso.html');
                });
                
                servicios.sync();
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
