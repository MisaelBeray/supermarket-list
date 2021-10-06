import Head from "next/head";
import { signIn, signOut, useSession, SignInResponse } from "next-auth/client";
import { NextPage } from "next";
import { LoginIcon } from "@heroicons/react/outline";

const Home: NextPage = () => {
  const [session] = useSession();

  return (
    <>
      {!session && (
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
      {session && (
        <>
          <div className="flex flex-col items-center justify-center min-h-screen">
            <Head>
              <title>Create Next App</title>
              <link rel="icon" href="/favicon.ico" />
            </Head>
            <button onClick={(): Promise<void> => signOut()}>Sign out</button>
            <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
              <h1 className="text-6xl font-bold">
                Welcome to{" "}
                <a className="text-blue-600" href="https://nextjs.org">
                  Next.js!
                </a>
              </h1>

              <p className="mt-3 text-2xl">
                Get started by editing{" "}
                <code className="p-3 font-mono text-lg bg-gray-100 rounded-md">
                  pages/index.js
                </code>
              </p>

              <div className="flex flex-wrap items-center justify-around max-w-4xl mt-6 sm:w-full">
                <a
                  href="https://nextjs.org/docs"
                  className="p-6 mt-6 text-left border w-96 rounded-xl hover:text-blue-600 focus:text-blue-600"
                >
                  <h3 className="text-2xl font-bold">Documentation &rarr;</h3>
                  <p className="mt-4 text-xl">
                    Find in-depth information about Next.js features and API.
                  </p>
                </a>

                <a
                  href="https://nextjs.org/learn"
                  className="p-6 mt-6 text-left border w-96 rounded-xl hover:text-blue-600 focus:text-blue-600"
                >
                  <h3 className="text-2xl font-bold">Learn &rarr;</h3>
                  <p className="mt-4 text-xl">
                    Learn about Next.js in an interactive course with quizzes!
                  </p>
                </a>

                <a
                  href="https://github.com/vercel/next.js/tree/master/examples"
                  className="p-6 mt-6 text-left border w-96 rounded-xl hover:text-blue-600 focus:text-blue-600"
                >
                  <h3 className="text-2xl font-bold">Examples &rarr;</h3>
                  <p className="mt-4 text-xl">
                    Discover and deploy boilerplate example Next.js projects.
                  </p>
                </a>

                <a
                  href="https://vercel.com/import?filter=next.js&utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
                  className="p-6 mt-6 text-left border w-96 rounded-xl hover:text-blue-600 focus:text-blue-600"
                >
                  <h3 className="text-2xl font-bold">Deploy &rarr;</h3>
                  <p className="mt-4 text-xl">
                    Instantly deploy your Next.js site to a public URL with
                    Vercel.
                  </p>
                </a>
              </div>
            </main>

            <footer className="flex items-center justify-center w-full h-24 border-t">
              <a
                className="flex items-center justify-center"
                href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
                target="_blank"
                rel="noopener noreferrer"
              >
                Powered by{" "}
                <img src="/vercel.svg" alt="Vercel Logo" className="h-4 ml-2" />
              </a>
            </footer>
          </div>
        </>
      )}
    </>
  );
};

export default Home;
