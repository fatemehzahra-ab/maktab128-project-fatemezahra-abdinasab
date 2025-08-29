import { NextRequest, NextResponse } from "next/server";

const ZIBAL_VERIFY_URL = "https://gateway.zibal.ir/v1/verify";

export async function POST(req: NextRequest) {
  try {
    const { trackId } = (await req.json()) as { trackId: string };
    if (!trackId)
      return NextResponse.json(
        { error: "trackId الزامی است" },
        { status: 400 }
      );

    const merchant = process.env.ZIBAL_MERCHANT || "zibal";
    const res = await fetch(ZIBAL_VERIFY_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ merchant, trackId }),
      cache: "no-store",
    });

    const data = await res.json();
    // data.result === 100 => پرداخت موفق
    return NextResponse.json(data);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "خطا در تایید پرداخت" }, { status: 500 });
  }
}
