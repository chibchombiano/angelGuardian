
var app = app || {};

app.Servicios = (function () {
    'use strict'

    var serviciosViewModel = (function () {
        
        var servicioModel = {
            id: 'Id',
            fields: {                
                CreatedAt: {
                    field: 'CreatedAt',
                    defaultValue: new Date()
                },                
                UserId: {
                    field: 'UserId',
                    defaultValue: null
                },
                Color: {
                    field: 'Color',
                    defaultValue: ''
                },
                Direccion_Llegada: {
                    field: 'Direccion_Llegada',
                    defaultValue: ''
                },
                Direccion_Partida: {
                    field: 'Direccion_Partida',
                    defaultValue: ''
                },
                Marca: {
                    field: 'Marca',
                    defaultValue: ''
                },
                Numero_Paradas: {
                    field: 'Numero_Paradas',
                    defaultValue: ''
                },
                Placa: {
                    field: 'Placa',
                    defaultValue: ''
                },
                Telefono_Confirmacion: {
                    field: 'Telefono_Confirmacion',
                    defaultValue: ''
                }
            },
            CreatedAtFormatted: function () {
                return app.helper.formatDate(this.get('CreatedAt'));
            },
            User: function () {

                var userId = this.get('UserId');

                var user = $.grep(app.Users.users(), function (e) {
                    return e.Id === userId;
                })[0];

                return user ? user.DisplayName : 'Anonymous';
            }
        };
        
        var serviciosDataSource = new kendo.data.DataSource({
            type: 'everlive',
            schema: {
                model: servicioModel
            },
            transport: {
                typeName: 'Solictud'
            },
            serverFiltering: true,
            sort: { field: 'CreatedAt', dir: 'desc' }
        });
        
        return {
            servicios: serviciosDataSource
        };
        
    }());
    
    return serviciosViewModel;

}());
