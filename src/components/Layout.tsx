import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { FC, PropsWithChildren } from "react";

const Layout: FC<PropsWithChildren<{}>> = ({ children }) => {
  return (
    <main>
      <Head>
        <title>Annie | Children Celebrations in London</title>
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
