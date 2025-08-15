import Image from "next/image";

export default function HomePage() {
  return (
    <>
      <Image src={"/images/hero.svg"} alt={"hero"} width={1490} height={700} />
    </>
  );
}
