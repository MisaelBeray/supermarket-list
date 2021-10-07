import Head from "next/head";
import { useSession } from "next-auth/client";
import { NextPage } from "next";
import Footer from "../../components/footer";
import Nav from "../../components/nav";
const Cart: NextPage = () => {
  const [session] = useSession();

  return (
    <>
      {!session && <></>}
      {session && (
        <>
          <div className="flex flex-col items-center justify-center min-h-screen">
            <Head>
              <title>Supermarket List</title>
              <link rel="icon" href="/grocery.ico" />
            </Head>
            <div className="h-screen w-screen flex bg-gray-200">
              <Nav children="cart" />
              <div className="flex flex-col flex-1 w-full overflow-y-auto">
                <main className="relative z-0 flex-1 pb-8 px-6 bg-white">
                  <div className="grid pb-10  mt-4 "></div>
                </main>
                <Footer />
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Cart;
