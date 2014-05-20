
var app = app || {};

app.AddServicio = (function () {
    'use strict'

    var addServicioViewModel = (function () {
        
        var dataSource;
        var $newStatus;
        var validator;
        var $signUpForm;
        var $formFields;
        var $signupBtnWrp;
        
        var init = function () {
            
            $signUpForm = $('#servicio');
            $formFields = $signUpForm.find('input, textarea, select');
            $signupBtnWrp = $('#servicioSolicitar');
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
        };
        
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
