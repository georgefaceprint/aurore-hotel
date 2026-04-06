import { verifyOTP } from '@/lib/otp';

export async function POST(request) {
    const { phone, code } = await request.json();

    if (!phone || !code) {
        return Response.json({ error: 'Phone and code are required' }, { status: 400 });
    }

    const result = verifyOTP(phone, code);

    if (result.error) {
        return Response.json({ error: result.error }, { status: 400 });
    }

    return Response.json({ success: true });
}
