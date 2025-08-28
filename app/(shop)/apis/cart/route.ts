import { type NextRequest, NextResponse } from "next/server";

type CartItem = {
  productId: string;
  name: string;
  price: number;
  thumbnail?: string;
  quantity: number;
  meta?: Record<string, string | number>;
};

const memory: Record<string, CartItem[]> = {};

export async function GET(req: NextRequest) {
  const userId = req.nextUrl.searchParams.get("userId") || "";
  if (!userId)
    return NextResponse.json({ error: "userId required" }, { status: 400 });
  return NextResponse.json({ items: memory[userId] ?? [] });
}

export async function PUT(req: NextRequest) {
  const userId = req.nextUrl.searchParams.get("userId") || "";
  if (!userId)
    return NextResponse.json({ error: "userId required" }, { status: 400 });

  const body = (await req.json()) as { items: CartItem[] };
  memory[userId] = body.items ?? [];
  return NextResponse.json({ ok: true });
}

export async function PATCH(req: NextRequest) {
  const userId = req.nextUrl.searchParams.get("userId") || "";
  if (!userId)
    return NextResponse.json({ error: "userId required" }, { status: 400 });

  const { productId, quantity } = (await req.json()) as {
    productId: string;
    quantity: number;
  };

  const list = memory[userId] ?? [];
  const idx = list.findIndex((i) => i.productId === productId);
  if (idx === -1)
    return NextResponse.json({ error: "not found" }, { status: 404 });

  if (quantity <= 0) list.splice(idx, 1);
  else list[idx].quantity = quantity;

  memory[userId] = list;
  return NextResponse.json({ ok: true });
}

export async function DELETE(req: NextRequest) {
  const userId = req.nextUrl.searchParams.get("userId") || "";
  const productId = req.nextUrl.searchParams.get("productId") || "";
  if (!userId || !productId)
    return NextResponse.json(
      { error: "userId & productId required" },
      { status: 400 }
    );

  const list = memory[userId] ?? [];
  memory[userId] = list.filter((i) => i.productId !== productId);
  return NextResponse.json({ ok: true });
}
