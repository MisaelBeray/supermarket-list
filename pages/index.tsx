import Head from "next/head";
import { signIn, useSession, SignInResponse } from "next-auth/client";
import { NextPage } from "next";
import { LoginIcon } from "@heroicons/react/outline";
import Footer from "../components/footer";
import Nav from "../components/nav";
const Home: NextPage = () => {
  const [session, loading] = useSession();
 
  return (
    <>
      {!session && !loading && (
        <>
          <div className="flex flex-col items-center justify-center min-h-screen p-2 bg-green-200">
            <div className="max-w-md py-4 px-8 bg-white shadow-lg rounded-lg my-20">
              <div className="flex justify-center md:justify-end -mt-16">
                <img className="w-20 h-20 object-cover" src="/grocery.png" />
              </div>
              <div>
                <h2 className="text-gray-800 text-3xl font-semibold">
                  Supermarket List
                </h2>
                <p className="mt-2 text-gray-600">
                  Supermarket List é um substituto para a velha e famosa
                  calculadora de supermercado, com essa ferramenta você
                  adicionará os seus produtos e acompanhará o total da sua
                  compra de um jeito muito mais simples e rápido.
                </p>
              </div>
              <div className="flex justify-end mt-4">
                <button
                  type="button"
                  className="focus:outline-none text-white text-lg py-2.5 px-5 rounded-md bg-green-500 hover:bg-green-600 hover:shadow-lg flex items-center"
                  onClick={(): Promise<SignInResponse> => signIn("auth0")}
                >
                  <LoginIcon className="h-5 w-5 text-white-500 m-1.5" />
                  Entrar
                </button>
              </div>
            </div>
          </div>
        </>
      )}
      {session &&(
        <>
          <div className="flex flex-col items-center justify-center min-h-screen">
            <Head>
              <title>Supermarket List</title>
              <link rel="icon" href="/grocery.ico" />
            </Head>
            <div className="h-screen w-screen flex bg-gray-200">
            <Nav children="home" />
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

export default Home;
