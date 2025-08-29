import { NextRequest, NextResponse } from "next/server";

const ZIBAL_REQUEST_URL = "https://gateway.zibal.ir/v1/request";

export async function POST(req: NextRequest) {
  try {
    const { amountToman, orderId, description } = (await req.json()) as {
      amountToman: number;
      orderId: string;
      description?: string;
    };

    if (!amountToman || !orderId) {
      return NextResponse.json(
        { error: "amountToman و orderId الزامی است" },
        { status: 400 }
      );
    }

    const merchant = process.env.ZIBAL_MERCHANT || "zibal";
    const callbackUrl = `http://127.0.0.1:3004/payment/callback`;

    const amountRial = Math.round(amountToman * 10);

    const zibalRes = await fetch(ZIBAL_REQUEST_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        merchant,
        amount: amountRial,
        callbackUrl,
        orderId,
        description,
      }),
      cache: "no-store",
    });

    const data = await zibalRes.json();

    if (data?.result !== 100 || !data?.trackId) {
      return NextResponse.json(
        { error: data?.message || "خطا در ایجاد تراکنش زیبال", detail: data },
        { status: 400 }
      );
    }

    return NextResponse.json({ trackId: data.trackId });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "خطای اتصال به زیبال" }, { status: 500 });
  }
}
