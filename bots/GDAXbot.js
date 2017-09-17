// libraries
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


const accountSid = 'AC3ec58f993cd36fabbc9b90cee66b316c'; // Your Account SID from www.twilio.com/console
const authToken = '643e32156e36e6ae37b0974ba3b91821';   // Your Auth Token from www.twilio.com/console

const twillioClient = new twilio(accountSid, authToken);


fs.writeFileSync(`./bots/${productID}.txt`, `${productID} price \n\n\n\n\n\n`);

function getEthereumPrice() {
    publicClient.getProductTicker((error, response, data) => {
        if (error) {
            // handle the error
        } else {
            // work with data
            fs.appendFile(`./bots/${productID}.txt`, JSON.stringify(data));
            twillioClient.messages.create({
                body: `The Ethereum Price is: ${data.price}`,
                to: '+18623048251',  // Text this number
                from: '+13026031251' // From a valid Twilio number
            })
                .then((message) => console.log(message.sid));

        }
    });
}

module.exports = {
    initBot: function () {
        setInterval(getEthereumPrice, TimeUnit.DAYS.toMillis(1));
        // console.log(TimeUnit.DAYS.toMillis(1));
    }

};