import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { FC, PropsWithChildren } from "react";

const Layout: FC<PropsWithChildren<{}>> = ({ children }) => {
  const router = useRouter();

  return (
    <main>
      <Head>
        <title>Annie | Venues</title>
      </Head>
      <div className="flex justify-center my-6">
        <Link href="/">
          <Image src="/logo.png" alt="Logo" width={50} height={40} />
        </Link>
      </div>
      <div className="max-w-7xl mx-auto">{children}</div>
    </main>
  );
};

export default Layout;
