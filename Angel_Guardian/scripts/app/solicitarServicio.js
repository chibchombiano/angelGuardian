
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
        var datosUsuario;
       	var serviceUrl = 'http://angelguardian.azurewebsites.net/api/solicitud'
        var $solicitarSalir;
        
        var init = function () {
            
            $signUpForm = $('#servicio');
            $formFields = $signUpForm.find('input, textarea, select');
            $signupBtnWrp = $('#servicioSolicitar');
            $buscarGps = $('#buscarGps');            
            $solicitarSalir = $('#solicitarSalir');
            
            validator = $signUpForm.kendoValidator({ validateOnBlur: false }).data('kendoValidator');
            
            $solicitarSalir.click(function(){
                localStorage.clear();
                app.mobileApp.navigate("#:back");
            });
            
            $formFields.on('keyup keypress blur change input', function () {
                if (validator.validate()) {
                    $signupBtnWrp.removeClass('disabled');
                } else {
                    $signupBtnWrp.addClass('disabled');
                }
            });
        };
        
        
        
        var show = function () {
            
            app.mobileApp.showLoading();
            $buscarGps.click(getAddress);  
            
            app.everlive.Users.currentUser().then(function(data){
                	app.mobileApp.hideLoading();
                	datosUsuario = data.result;
                	
                        navigator.geolocation.getCurrentPosition(
                        onSuccessShowMap,
                        onErrorShowMap
                	);
            
            		
                
            	}
            );
        };
        
        function inicializarDataSource(){
            dataSource = kendo.observable({
                /*Id: datosUsuario.Id,*/
                IdUsuario: datosUsuario.Id,
                Email: datosUsuario.Email,
                Telefono: '',
                Direccion: '',
                DireccionDestino: '',
                NoParadas: '',
                FechaServicio:  new Date(),
                Nombre: datosUsuario.Nombre,
                Apellidos: datosUsuario.Apellidos,
                Cedula: datosUsuario.Cedula,
                Ciudad:'',
                TieneCarro: datosUsuario.TieneCarro,
                Marca: '',
                Color: '',
                Placa: '',
                Aseguradora: '',
                Estado: 0,
                RecibeNotificaciones: 0,
                Hora : ''
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
                         dataSource.Direccion = direccion;
                         app.showConfirm('direccion encontrada ' + direccion, 'Direccion Gps',resultDialog)                     
                         dataSource.set('Direccion', direccion);
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
        
        function S4() {
            return (((1+Math.random())*0x10000)|0).toString(16).substring(1); 
        }
        
        function sendRequest(datos) { 
			app.mobileApp.showLoading();
            
            $.ajax({
                url : serviceUrl,
                type: "POST",
                data : datos,
                success: function(data, textStatus, jqXHR)
                {
                    app.mobileApp.hideLoading();
                },
                error: function (jqXHR, textStatus, errorThrown)
                {
             		app.mobileApp.hideLoading();
                }
            });
    	}
        
         
      
                                
        var solicitarServicio = function () {
            
            	var ciudadSeleccionada = $("#solicitudCiudad option:selected").text();
            
            	app.mobileApp.showLoading();
                // Adding new comment to Comments model
                var servicios = app.Servicios.servicios;
                var servicio = servicios.add();                
                
            	servicio.Id = (S4() + S4() + "-" + S4() + "-4" + S4().substr(0,3) + "-" + S4() + "-" + S4() + S4() + S4()).toLowerCase();
            	//servicio.Id = 2;
            	servicio.Apellidos = dataSource.Apellidos;
            	servicio.Aseguradora = dataSource.Aseguradora;
            	servicio.Cedula = dataSource.Cedula;
            	servicio.Ciudad = ciudadSeleccionada;
                servicio.Color = dataSource.Color;
            
                servicio.Direccion =  dataSource.Direccion;
                servicio.DireccionDestino = dataSource.DireccionDestino;
                servicio.Email = dataSource.Email;
            	servicio.Estado = dataSource.Estado;
            	servicio.FechaServicio = dataSource.FechaServicio;
            	servicio.IdUsuario = dataSource.IdUsuario;
            	servicio.Marca = dataSource.Marca;
                servicio.NoParadas = dataSource.NoParadas;
            	servicio.Nombre = dataSource.Nombre;            	
                servicio.Placa = dataSource.Placa;
            	servicio.RecibeNotificaciones = '';
                servicio.Telefono = dataSource.Telefono;
            	servicio.TieneCarro = dataSource.TieneCarro;
               
                
                servicios.one('sync', function () {
                    app.mobileApp.hideLoading();
                    app.mobileApp.navigate('views/servicioExitoso.html');
                });
            
            //var data = {
                //Id: servicio.Id, Apellidos:  servicio.Apellidos, Aseguradora : servicio.Aseguradora, Cedula: servicio.Cedula,
                //Ciudad: servicio.Ciudad, Color: servicio.Color, Direccion: servicio.Direccion, DireccionDestino: servicio.DireccionDestino,
                //Email: servicio.Email, Estado: servicio.Estado, FechaServicio: servicio.FechaServicio, IdUsuario : servicio.IdUsuario,
                //Marca : servicio.Marca, NoParadas : servicio.NoParadas, Nombre : servicio.Nombre, Placa: servicio.Placa, RecibeNotificaciones : servicio.RecibeNotificaciones,
              //  Telefono: servicio.Telefono, TieneCarro : servicio.TieneCarro
            //}
            
            	//sendRequest(data);
                
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
