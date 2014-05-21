/**
 * Login view model
 */

var app = app || {};

app.Login = (function () {
    'use strict';

    var loginViewModel = (function () {

        var isInMistSimulator = (location.host.indexOf('icenium.com') > -1);

        var $loginUsername;
        var $loginPassword;

        var init = function () {

            if (!app.isKeySet(appSettings.everlive.apiKey)) {
                app.mobileApp.navigate('views/noApiKey.html', 'fade');
            }

            $loginUsername = $('#loginUsername');
            $loginPassword = $('#loginPassword');            
        };

        var show = function () {
            $loginUsername.val('');
            $loginPassword.val('');
            
            var username = localStorage.getItem("username");
            var password = localStorage.getItem("password");
            
            if(username !== null && password != null){
			// Authenticate using the username and password
            app.everlive.Users.login(username, password)
            .then(function () {
                return app.Users.load();
            })
            .then(function () {
                localStorage.setItem("username",username);
                localStorage.setItem("password",password);
                app.mobileApp.navigate('views/solicitarServicio.html');
            })
            .then(null,
                  function (err) {
                      app.showError(err.message);
                  }
            );
            }
            
        };

        // Authenticate to use Backend Services as a particular user
        var login = function () {

            var username = $loginUsername.val();
            var password = $loginPassword.val();

            // Authenticate using the username and password
            app.everlive.Users.login(username, password)
            .then(function () {
                return app.Users.load();
            })
            .then(function () {
                localStorage.setItem("username",username);
                localStorage.setItem("password",password);
                app.mobileApp.navigate('views/solicitarServicio.html');
            })
            .then(null,
                  function (err) {
                      app.showError(err.message);
                  }
            );
        };    
        
        var showMistAlert = function () {
            alert(appSettings.messages.mistSimulatorAlert);
        };

        return {
            init: init,
            show: show,
            getYear: app.getYear,
            login: login
        };

    }());

    return loginViewModel;

}());
