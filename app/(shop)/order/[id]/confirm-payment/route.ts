import dbConnect from "@/libs/dbConnect";
import Order from "@/types/order";

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  await dbConnect();
  const order = await Order.findByIdAndUpdate(
    params.id,
    { deliveryStatus: true },
    { new: true }
  );
  if (!order)
    return new Response(JSON.stringify({ error: "Order not found" }), {
      status: 404,
    });

  return new Response(JSON.stringify({ ok: true, order }));
}
