import { setOTP, generateOTPHelper } from '@/lib/otp';
import { executeQuery } from '@/lib/neo4j';
import { sendSMS } from '@/lib/sms';

// POST /api/auth/phone — Check User & Send Verification if New or Reset Requested
export async function POST(request) {
    const { phone, forceOtp } = await request.json();

    if (!phone) {
        return Response.json({ error: 'Phone number is required' }, { status: 400 });
    }

    // 1. Check if user exists in the heritage vault
    const result = await executeQuery(
        `MATCH (p:Person) WHERE p.phone = $phone RETURN p.id as id, p.accessCodeHash as hash LIMIT 1`,
        { phone }
    );

    const exists = result && result.length > 0;
    const hasPin = exists && !!result[0].get('hash');

    let response = { success: true, exists: hasPin };

    // 2. If it's a NEW user (no PIN set) OR if OTP is FORCED (forgot passcode flow)
    if (!hasPin || forceOtp) {
        const otp = generateOTPHelper(5);
        setOTP(phone, otp, 10); // 10 minutes

        const message = `Your Watu.Network verification code: ${otp}.`;
        
        const smsResult = await sendSMS(phone, message);
        
        if (!smsResult.success) {
            console.warn('SMS delivery failed, falling back to local log');
            response.devOtp = otp; // For local dev if SMS fails
        }
        
        response.otpSent = true;
    }

    return Response.json(response);
}
