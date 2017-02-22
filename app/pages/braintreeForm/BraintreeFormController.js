define([
    'jquery',
    'can', 
    "app/pages/braintreeForm/BraintreeFormView.stache",  
    'braintreeClient',
    'braintreeHostedFields',
    'bootstrap-sass'
], function($, can, BraintreeFormView) {
    
    return can.Control.extend({  

        init: function(el, options) {       

            var self = this;

            var braintreeAuthToken = 'sandbox_g42y39zw_348pk9cgf3bgyw2b';

            var scope = this.scope = new can.Map(options);

            //Start of Braintree payment processor integration
            braintree.client.create({
                authorization: braintreeAuthToken
            }, function(err, clientInstance) {                

                if (err) {
                    console.error("Error in creating braintree client:", err);
                    return;
                }

                braintree.hostedFields.create({
                    client: clientInstance,
                    styles: {
                        'input': {
                            'font-size': '14px',
                            'font-family': 'helvetica, tahoma, calibri, sans-serif',
                            'color': '#3a3a3a'
                        },
                        ':focus': {
                            'color': 'black'
                        }
                    },
                    fields: {
                        number: {
                            selector: '#card-number',
                            placeholder: '4111 1111 1111 1111'
                        },
                        cvv: {
                            selector: '#cvv',
                            placeholder: '123'
                        },
                        expirationDate: {
                            selector: '#expiration-date',
                            placeholder: 'MM/YY'
                        }
                    }
                }, function(err, hostedFieldsInstance) {                    

                    if (err) {
                        console.error("Error in creating braintree hosted fields: ", err);                   
                        return;
                    }

                    console.log('Braintree form integration successful');
                    alert('Braintree form integration successful');

                    //if the control reaches here, the hosted fields are rendered correctly and hostedFieldsInstance is available. Store it on scope to use during payment card validation in the "Continue" button click event.
                    scope.attr('hostedFieldsInstance', hostedFieldsInstance);

                    hostedFieldsInstance.on('validityChange', function(event) {
                        var field = event.fields[event.emittedBy];

                        if (field.isValid) {
                            if (event.emittedBy === 'expirationMonth' || event.emittedBy === 'expirationYear') {
                                if (!event.fields.expirationMonth.isValid || !event.fields.expirationYear.isValid) {
                                    return;
                                }
                            } 
                            else if (event.emittedBy === 'number') {
                                $('#card-number').next('span').text('');
                            }

                            // Apply styling for a valid field
                            $(field.container).parents('.form-group').addClass('has-success');
                        } 
                        else if (field.isPotentiallyValid) {
                            // Remove styling  from potentially valid fields
                            $(field.container).parents('.form-group').removeClass('has-warning');
                            $(field.container).parents('.form-group').removeClass('has-success');
                            if (event.emittedBy === 'number') {
                                $('#card-number').next('span').text('');
                            }
                        } 
                        else {
                            // Add styling to invalid fields
                            $(field.container).parents('.form-group').addClass('has-warning');
                            // Add helper text for an invalid card number
                            if (event.emittedBy === 'number') {
                                $('#card-number').next('span').text('Looks like this card number has an error.');
                            }
                        }
                    });     
                });
            });
            //End of Braintree payment processor integration

            el.html(can.view(BraintreeFormView), scope);
        },      
    });   
});