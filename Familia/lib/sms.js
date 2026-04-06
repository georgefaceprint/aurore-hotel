const africastalking = require('africastalking');

const username = process.env.AT_USERNAME || 'sandbox';
const apiKey = process.env.AT_API_KEY;

const at = africastalking({
    username,
    apiKey
});

const sms = at.SMS;

export async function sendSMS(to, message) {
    if (!apiKey && username !== 'sandbox') {
        console.log(`[SMS MOCK] To: ${to} | Message: ${message}`);
        return { success: true, mock: true };
    }

    try {
        const result = await sms.send({
            to: [to],
            message: message,
            // from: process.env.AT_SENDER_ID // Optional
        });
        console.log('Africa\'s Talking SMS Result:', result);
        return { success: true, result };
    } catch (error) {
        console.error('Africa\'s Talking SMS Error:', error);
        return { success: false, error: error.message };
    }
}
