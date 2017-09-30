// libraries
// constants
const config = require("../config/constans");
// core
const fs = require("fs");
// sms
const twilio = require('twilio');
// timeunit
const TimeUnit = require('time-unit');

// GDAX client
const Gdax = require('gdax');
const productID = "ETH-USD";
const publicClient = new Gdax.PublicClient(productID);


const accountSid = config.twilio.accountSid; // Your Account SID from www.twilio.com/console
const authToken = config.twilio.authToken;   // Your Auth Token from www.twilio.com/console

const twillioClient = new twilio(accountSid, authToken);


fs.writeFileSync(`./bots/${productID}.txt`, `${productID} price \n\n\n\n\n\n`);

function getEthereumPrice() {
    publicClient.getProductTicker((error, response, data) => {
        if (error) {
            // handle the error
            console.log(error);
        } else {
            // work with data
            fs.appendFile(`./bots/${productID}.txt`, JSON.stringify(data));
            twillioClient.messages.create({
                body: `The Ethereum Price is: ${data.price}`,
                to: config.twilio.to,  // Text this number
                from: config.twilio.from // From a valid Twilio number
            })
                .then((message) => console.log(message.sid));

        }
    });
}

module.exports = {
    initBot: function () {
        setInterval(getEthereumPrice, TimeUnit.DAYS.toMillis(1));
    }

};