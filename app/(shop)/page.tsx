import Image from "next/image";

export default function HomePage() {
  return (
    <div className="bg-white">
      <Image src={"/images/hero.svg"} alt={"hero"} width={1490} height={700} />
    </div>
  );
}
