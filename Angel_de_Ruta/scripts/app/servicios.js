
var app = app || {};

app.Servicios = (function () {
    'use strict'

    var serviciosViewModel = (function () {
        
        var servicioModel = {
            id: 'Id',
            fields: {        
                Apellidos: {
                    field: 'Apellidos',
                    defaultValue: ''
                },
                 Aseguradora: {
                    field: 'Aseguradora',
                    defaultValue: ''
                },
                Cedula: {
                    field: 'Cedula',
                    defaultValue: ''
                },
                Ciudad: {
                    field: 'Ciudad',
                    defaultValue: ''
                },               
                Color: {
                    field: 'Color',
                    defaultValue: ''
                },
                Direccion: {
                    field: 'Direccion',
                    defaultValue: ''
                },
                DireccionDestino: {
                    field: 'DireccionDestino',
                    defaultValue: ''
                },
                Email: {
                    field: 'Email',
                    defaultValue: ''
                },
                Estado: {
                    field: 'Estado',
                    defaultValue: ''
                },
                FechaServicio: {
                    field: 'FechaServicio',
                    defaultValue: new Date()
                },
                IdUsuario: {
                    field: 'IdUsuario',
                    defaultValue: ''
                },
                Marca: {
                    field: 'Marca',
                    defaultValue: ''
                },               
                NoParadas: {
                    field: 'NoParadas',
                    defaultValue: ''
                },
                Nombre: {
                    field: 'Nombre',
                    defaultValue: ''
                },
                Placa: {
                    field: 'Placa',
                    defaultValue: ''
                },
                RecibeNotificaciones: {
                    field: 'RecibeNotificaciones',
                    defaultValue: ''
                },
                Telefono: {
                    field: 'Telefono',
                    defaultValue: ''
                },
                TieneCarro: {
                    field: 'TieneCarro',
                    defaultValue: ''
                },
                HoraServicio : {
                    field: 'HoraServicio',
                    defaultValue: ''
                }
            }  
        };
        
        var serviciosDataSource = new kendo.data.DataSource({
            type: 'everlive',
            schema: {
                model: servicioModel
            },
            transport: {
                typeName: 'TM_Solicitud'
            },
            serverFiltering: true,
            sort: { field: 'Nombre', dir: 'desc' }
        });
        
        return {
            servicios: serviciosDataSource
        };
        
    }());
    
    return serviciosViewModel;

}());
