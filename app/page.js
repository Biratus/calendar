import Link from "next/link";

export default function Page() {
  return (
    <>
      <Link href="/planning">Planning</Link>
      <Link href="/ui-tests">UI Tests</Link>
      <Link href="/test" prefetch={false}>Tests</Link>
    </>
  );
}
