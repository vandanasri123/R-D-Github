const express = require('express');
const bodyParser = require('body-parser');
const twilio = require('twilio');
const path = require('path');
const app = express();

const accountSid = 'your_twilio_account_sid';
const authToken = 'your_twilio_auth_token';
const client = new twilio(accountSid, authToken);

const otps = {}; // Store OTPs temporarily in memory

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.post('/send-otp', (req, res) => {
    const { phone } = req.body;
    const otp = Math.floor(100000 + Math.random() * 900000).toString(); // Generate 6 digit OTP
    otps[phone] = otp;

    client.messages.create({
        body: `Your OTP is ${otp}`,
        to: phone, // Text this number
        from: 'your_twilio_phone_number' // From a valid Twilio number
    }).then(message => {
        res.json({ message: 'OTP sent successfully' });
    }).catch(error => {
        res.json({ message: 'Failed to send OTP', error });
    });
});

app.post('/verify-otp', (req, res) => {
    const { phone, otp } = req.body;
    if (otps[phone] === otp) {
        delete otps[phone]; // Clear OTP after successful verification
        res.json({ message: 'OTP verified successfully' });
    } else {
        res.json({ message: 'Invalid OTP' });
    }
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});