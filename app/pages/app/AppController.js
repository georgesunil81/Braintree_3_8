define([
    "jquery",
    "can",
    "app/pages/app/AppView.stache"   
], function($, can, AppView) {

    return can.Control.extend({
        defaults: {
            home: 'landingpage',            
        }
    }, {

        init: function(el, options) {
            var id;
            var self = this;
            var AppState = can.Map.extend({});
            var scope = this.scope = new AppState();

            self.main = el.find('#App__Main');
            el.html(can.view(AppView, scope));

            System.import('app/pages/braintreeForm/BraintreeFormController').then(function(controller) {                    
                var id;

                id = can.capitalize('braintreeForm') + '__Controller';
                $c = self.main.find('#' + id);                    

                if ($c.length === 0) {   
                    var div = $('<div>', { id: id, class: 'controller listener' });
                    $(document.body).append(div);
                    new controller(div, options);
                }
            });                             
        }     
    });
});