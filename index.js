/**
Author: Pragyan
Date: 10-08-2016
Details: This lambda function will be a sub scriber to API and accoring to that message ,it will send an Email

*/
// initializing variables
var aws = require('aws-sdk');
var result = {};
var Email = '';
exports.handler = function (event, context) {
	Email=event.emailid;
	
	//getting config.json file
    var request = require('request');
	 request.get('https://s3.amazonaws.com/sakura.data/Prathanai-config.json', function (error, response, body) {
		  if (!error && response.statusCode == 200) {
			//Getting value from configuration File  
			var config = JSON.parse(body);
            var region = config.region;
            var AccessKey = config.accessKeyId;
            var SecretAccessKey = config.secretAccessKey;
            var emailTOAddress = Email;
            var FromAddress = config.emailFromAddress;
            var Subject = config.emailSubject;
			
			 // AWS Authentication
			  aws.config.update({
                    accessKeyId: AccessKey,
                    secretAccessKey: SecretAccessKey,
                    region: region
                });
				
		     request.get('https://s3.amazonaws.com/sakura.data/Prathanai-email-template.html', function (err, res, body) {
              if (!err && res.statusCode == 200) 
                {
                       
                        //reading the HTML Template file
                        var templateBody = body.toString();
                        console.log("Template Body: " + templateBody);

                        var mark = require('markup-js');
                        var subject = mark.up(config.emailSubject, config);
						
                        //Initilazing emailObject
                        var emailObject = {};
                       
						//passing the body to template
                        emailObject.body= '';
						 var message = mark.up(templateBody, emailObject);

                        // initializing SES

                        var ses = new aws.SES({
                            apiVersion: '2010-12-01'
                        });

                        // Generating params to send Email
                        var params = {
                            Destination: {},
                            Message: {
                                Subject: {
                                    Data:Subject,
                                    Charset: 'UTF-8'
                                },
                                Body: {
                                    Html: {
                                        Data: message,
                                        Charset: 'UTF-8'
                                    }
                                }
                            }

                        };

                        params.Destination.ToAddresses = [emailTOAddress];
                        params.Source = FromAddress;

                        // calling send email function
                         ses.sendEmail(params, function (err, data) {
                            if (err) {//failure message
                                result.message = err, err.stack;
                                console.log(result);
                                context.fail(result);
                            } else {//Sucess
                                result.message = 'Email send successfully';
                                result.data = data;
                                console.log(result);
                                context.succeed(result);
                            }
                        });
                }

            else{
                 context.fail ('error while getting configuration file');
                  console.log('error while getting configuration file');
                }



             });
			
		  }
		  else 
		  {
               result.message = 'error while getting configuration file';
               console.log(result);
               context.fail(result);
           }
		 
		 });
	
	
}    
