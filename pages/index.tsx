import Head from "next/head";
import { signIn, useSession, SignInResponse } from "next-auth/client";
import { NextPage, NextComponentType } from "next";
import { LoginIcon } from "@heroicons/react/outline";
import useSWR from "swr";
import api from "../utils/api";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState, useEffect } from "react";
import axios from "axios";
import truncate from "../utils/truncate";

const ProgressPurchase: NextComponentType = ({ children }) => {
  interface Purchase {
    totalCart: number;
    budget: number;
  }

  const purchase = children as Purchase;

  const rest = purchase.budget - purchase.totalCart;
  const mult = rest * 100;
  const result = mult / purchase.budget;

  if (!result || result < 0) {
    return (
      <div className="w-12/12 h-full text-center text-xs text-white bg-green-400"></div>
    );
  }

  if (result >= 95) {
    return (
      <div className="w-1/12 h-full text-center text-xs text-white bg-green-400"></div>
    );
  } else if (result >= 90 && result < 95) {
    return (
      <div className="w-2/12 h-full text-center text-xs text-white bg-green-400"></div>
    );
  } else if (result >= 85 && result < 90) {
    return (
      <div className="w-3/12 h-full text-center text-xs text-white bg-green-400"></div>
    );
  } else if (result >= 80 && result < 85) {
    return (
      <div className="w-4/12 h-full text-center text-xs text-white bg-green-400"></div>
    );
  } else if (result >= 65 && result < 80) {
    return (
      <div className="w-5/12 h-full text-center text-xs text-white bg-green-400"></div>
    );
  } else if (result >= 50 && result < 65) {
    return (
      <div className="w-6/12 h-full text-center text-xs text-white bg-green-400"></div>
    );
  } else if (result >= 40 && result < 50) {
    return (
      <div className="w-7/12 h-full text-center text-xs text-white bg-green-400"></div>
    );
  } else if (result >= 20 && result < 40) {
    return (
      <div className="w-8/12 h-full text-center text-xs text-white bg-green-400"></div>
    );
  } else if (result >= 15 && result < 20) {
    return (
      <div className="w-9/12 h-full text-center text-xs text-white bg-green-400"></div>
    );
  } else if (result >= 10 && result < 15) {
    return (
      <div className="w-10/12 h-full text-center text-xs text-white bg-green-400"></div>
    );
  } else if (result >= 1 && result < 10) {
    return (
      <div className="w-11/12 h-full text-center text-xs text-white bg-green-400"></div>
    );
  } else if (result >= 0 && result < 1) {
    return (
      <div className="w-12/12 h-full text-center text-xs text-white bg-green-400"></div>
    );
  }
};

const Home: NextPage = () => {
  const [session, loading] = useSession();
  const [items, setItens] = useState([]);
  const [qty, setQty] = useState(null);
  const [price, setPrice] = useState(null);
  const [totalCart, setTotalCart] = useState(null);

  const { data } = useSWR(
    !loading ? `/api/cart/${session?.user.email}` : null,
    api
  );

  const [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const handleDelete = async (itemNumber) => {
    const data = {
      email: session?.user?.email,
      id: itemNumber,
    };

    const itemWillDelete = items.filter(item => item.id === data.id);
    setTotalCart(truncate(totalCart - itemWillDelete[0].totalPrice, 2));

    const newItems = items.filter(item => item.id !== data.id);
    setItens(newItems);

    const dataCart = {
      email: session?.user?.email,
      updatedAt: Date.now,
      itens: newItems,
      totalCart: Number(truncate(totalCart, 2)),
    };

    try {
      await axios.post(`${process.env.NEXT_PUBLIC_URL}/api/cart`, dataCart);
    } catch (err) {
      alert(
        err?.response?.dataCart?.error || "Houve um problema na adição do item"
      );
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    let newItems = [];
    newItems = items;

    const lastIdItem = items.slice(-1).pop();
    
    newItems.push({
      id: Number(((lastIdItem || {}).id || 0) + 1),
      unPrice: Number(price),
      qty: Number(qty),
      totalPrice: Number(qty) * Number(price),
    });

    setItens(newItems);

    const result = newItems.reduce(function (acc, obj) {
      return acc + obj.totalPrice;
    }, 0);

    setTotalCart(Number(truncate(result, 2)));

    const data = {
      email: session?.user?.email,
      updatedAt: Date.now,
      itens: items,
      totalCart: Number(truncate(result, 2)),
    };

    try {
      await axios.post(`${process.env.NEXT_PUBLIC_URL}/api/cart`, data);
    } catch (err) {
      alert(
        err?.response?.data?.error || "Houve um problema na adição do item"
      );
    }

    closeModal();
  
  };

  useEffect(() => {
    setItens(data?.data?.itens);

    if (data?.data?.itens.length) {
      const result = data?.data?.itens.reduce(function (acc, obj) {
        return acc + obj.totalPrice;
      }, 0);

      setTotalCart(Number(truncate(result, 2)));
    }
  }, [data?.data]);

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
      {session && (
        <>
          <div className="flex flex-col items-center justify-center min-h-screen">
            <Head>
              <title>Supermarket List</title>
              <link rel="icon" href="/grocery.ico" />
            </Head>

            <Transition appear show={isOpen} as={Fragment}>
              <Dialog
                as="div"
                className="fixed inset-0 z-10 overflow-y-auto"
                onClose={closeModal}
              >
                <div className="min-h-screen px-4 text-center">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <Dialog.Overlay className="fixed inset-0" />
                  </Transition.Child>

                  <span
                    className="inline-block h-screen align-middle"
                    aria-hidden="true"
                  >
                    &#8203;
                  </span>
                  <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                  >
                    <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-gray-100 shadow-xl rounded-2xl">
                      <Dialog.Title
                        as="h3"
                        className="text-lg font-medium leading-6 text-gray-900"
                      >
                        Adicionar Novo Item
                      </Dialog.Title>
                      <form onSubmit={handleSubmit}>
                        <div className="mt-2">
                          <div className="m-2">
                            <label className="block text-sm font-medium text-gray-700">
                              Un.
                            </label>
                            <div className="mt-2 relative rounded-md">
                              <input
                                type="text"
                                name="qty"
                                id="qty"
                                className="focus:ring-indigo-500 border border-gray-300 py-2 px-4 focus:border-indigo-500 block w-2/4 pr-12 sm:text-sm rounded-md"
                                placeholder="0"
                                onChange={(e) => setQty(e.target.value)}
                              />
                            </div>
                          </div>
                          <div className="m-2">
                            <label className="block text-sm font-medium text-gray-700">
                              Preço
                            </label>
                            <div className="mt-2 relative rounded-md">
                              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <span className="text-gray-500 sm:text-sm">
                                  R$
                                </span>
                              </div>
                              <input
                                type="text"
                                name="price"
                                id="price"
                                className="focus:ring-indigo-500 border border-gray-300 py-2 px-4 focus:border-indigo-500 block w-2/4 pl-9 pr-12 sm:text-sm rounded-md"
                                placeholder="0.00"
                                onChange={(e) => setPrice(e.target.value)}
                              />
                            </div>
                          </div>
                        </div>

                        <div className="mt-8  flex flex-col items-end justify-end ">
                          <button
                            type="submit"
                            className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-green-500 border border-transparent rounded-md hover:bg-green-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-green-800"
                          >
                            Adicionar
                          </button>
                        </div>
                      </form>
                    </div>
                  </Transition.Child>
                </div>
              </Dialog>
            </Transition>

            <div className="shadow-lg rounded-2xl p-4 bg-white dark:bg-gray-800">
              <div className="flex items-center">
                <span className="rounded-xl relative p-4 bg-purple-200">
                  <svg
                    width="40"
                    fill="currentColor"
                    height="40"
                    className="text-purple-500 h-4 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                    viewBox="0 0 1792 1792"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M1362 1185q0 153-99.5 263.5t-258.5 136.5v175q0 14-9 23t-23 9h-135q-13 0-22.5-9.5t-9.5-22.5v-175q-66-9-127.5-31t-101.5-44.5-74-48-46.5-37.5-17.5-18q-17-21-2-41l103-135q7-10 23-12 15-2 24 9l2 2q113 99 243 125 37 8 74 8 81 0 142.5-43t61.5-122q0-28-15-53t-33.5-42-58.5-37.5-66-32-80-32.5q-39-16-61.5-25t-61.5-26.5-62.5-31-56.5-35.5-53.5-42.5-43.5-49-35.5-58-21-66.5-8.5-78q0-138 98-242t255-134v-180q0-13 9.5-22.5t22.5-9.5h135q14 0 23 9t9 23v176q57 6 110.5 23t87 33.5 63.5 37.5 39 29 15 14q17 18 5 38l-81 146q-8 15-23 16-14 3-27-7-3-3-14.5-12t-39-26.5-58.5-32-74.5-26-85.5-11.5q-95 0-155 43t-60 111q0 26 8.5 48t29.5 41.5 39.5 33 56 31 60.5 27 70 27.5q53 20 81 31.5t76 35 75.5 42.5 62 50 53 63.5 31.5 76.5 13 94z"></path>
                  </svg>
                </span>
                <p className="text-md text-black dark:text-white ml-2">
                  Carrinho
                </p>
              </div>
              <div className="flex flex-col justify-start">
                <p className="text-gray-700 dark:text-gray-100 text-4xl text-left font-bold my-4">
                  {totalCart}
                  <span className="text-sm">R$</span>
                </p>
                <div className="flex items-center text-green-500 text-sm">
                  <svg
                    width="20"
                    height="20"
                    fill="currentColor"
                    viewBox="0 0 1792 1792"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M1408 1216q0 26-19 45t-45 19h-896q-26 0-45-19t-19-45 19-45l448-448q19-19 45-19t45 19l448 448q19 19 19 45z"></path>
                  </svg>
                  <span>5.5%</span>
                  <span className="text-gray-400 p-2">Última compra</span>
                </div>
              </div>
            </div>

            <div className="container  mx-auto px-4 sm:px-8 max-w-3xl">
              <div className="py-8">
                <div className="max-h-96 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto overflow-y-auto">
                  <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                    <table className="min-w-full leading-normal">
                      <thead>
                        <tr>
                          <th
                            scope="col"
                            className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                          >
                            Item
                          </th>
                          <th
                            scope="col"
                            className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                          >
                            Un.
                          </th>
                          <th
                            scope="col"
                            className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                          >
                            Preço
                          </th>
                          <th
                            scope="col"
                            className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                          >
                            Total
                          </th>
                          <th
                            scope="col"
                            className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                          ></th>
                        </tr>
                      </thead>
                      <tbody>
                        {items?.map((item) => {
                          return (
                            <>
                              <tr>
                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                  <div className="flex items-center">
                                    <div className="ml-3">
                                      <p className="text-gray-900 whitespace-no-wrap">
                                        {item.id}
                                      </p>
                                    </div>
                                  </div>
                                </td>
                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                  <div className="flex items-center">
                                    <div className="ml-3">
                                      <p className="text-gray-900 whitespace-no-wrap">
                                        {item.qty}
                                      </p>
                                    </div>
                                  </div>
                                </td>
                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                  <div className="flex items-center">
                                    <div className="ml-3">
                                      <p className="text-gray-900 whitespace-no-wrap">
                                        {item.unPrice}
                                      </p>
                                    </div>
                                  </div>
                                </td>
                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                  <div className="flex items-center">
                                    <div className="ml-3">
                                      <p className="text-gray-900 whitespace-no-wrap">
                                        {item.totalPrice}
                                      </p>
                                    </div>
                                  </div>
                                </td>
                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                  <div className="flex items-center">
                                    <div className="ml-3">
                                      <button
                                        type="button"
                                        className="flex justify-center items-center  bg-red-500 hover:bg-red-700 focus:ring-red-500 focus:ring-offset-red-200 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  w-8 h-8 rounded-lg "
                                        onClick={() => handleDelete(item.id)}
                                      >
                                        <svg
                                          width="20"
                                          height="20"
                                          fill="currentColor"
                                          viewBox="0 0 1792 1792"
                                          xmlns="http://www.w3.org/2000/svg"
                                        >
                                          <path d="M704 736v576q0 14-9 23t-23 9h-64q-14 0-23-9t-9-23v-576q0-14 9-23t23-9h64q14 0 23 9t9 23zm256 0v576q0 14-9 23t-23 9h-64q-14 0-23-9t-9-23v-576q0-14 9-23t23-9h64q14 0 23 9t9 23zm256 0v576q0 14-9 23t-23 9h-64q-14 0-23-9t-9-23v-576q0-14 9-23t23-9h64q14 0 23 9t9 23zm128 724v-948h-896v948q0 22 7 40.5t14.5 27 10.5 8.5h832q3 0 10.5-8.5t14.5-27 7-40.5zm-672-1076h448l-48-117q-7-9-17-11h-317q-10 2-17 11zm928 32v64q0 14-9 23t-23 9h-96v948q0 83-47 143.5t-113 60.5h-832q-66 0-113-58.5t-47-141.5v-952h-96q-14 0-23-9t-9-23v-64q0-14 9-23t23-9h309l70-167q15-37 54-63t79-26h320q40 0 79 26t54 63l70 167h309q14 0 23 9t9 23z"></path>
                                        </svg>
                                      </button>
                                    </div>
                                  </div>
                                </td>
                              </tr>
                            </>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex ">
              <button
                type="button"
                className="py-2 px-4 flex justify-center items-center  bg-green-500 hover:bg-green-700 focus:ring-green-500 focus:ring-offset-green-200 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  w-12 h-12 rounded-lg "
                onClick={openModal}
              >
                <svg
                  width="20"
                  height="20"
                  fill="currentColor"
                  viewBox="0 0 1792 1792"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M1344 960v-128q0-26-19-45t-45-19h-256v-256q0-26-19-45t-45-19h-128q-26 0-45 19t-19 45v256h-256q-26 0-45 19t-19 45v128q0 26 19 45t45 19h256v256q0 26 19 45t45 19h128q26 0 45-19t19-45v-256h256q26 0 45-19t19-45zm320-64q0 209-103 385.5t-279.5 279.5-385.5 103-385.5-103-279.5-279.5-103-385.5 103-385.5 279.5-279.5 385.5-103 385.5 103 279.5 279.5 103 385.5z"></path>
                </svg>
              </button>
            </div>

            <div className="shadow-lg w-full bg-white dark:bg-gray-700 relative overflow-hidden">
              <a href="#" className="w-full h-full block">
                <div className="flex items-center justify-between px-4 py-6 space-x-4">
                  <div className="flex items-center">
                    <span className="rounded-full relative p-5 bg-yellow-100">
                      <svg
                        width="40"
                        fill="currentColor"
                        height="40"
                        className="text-yellow-500 h-5 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                        viewBox="0 0 1792 1792"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M1362 1185q0 153-99.5 263.5t-258.5 136.5v175q0 14-9 23t-23 9h-135q-13 0-22.5-9.5t-9.5-22.5v-175q-66-9-127.5-31t-101.5-44.5-74-48-46.5-37.5-17.5-18q-17-21-2-41l103-135q7-10 23-12 15-2 24 9l2 2q113 99 243 125 37 8 74 8 81 0 142.5-43t61.5-122q0-28-15-53t-33.5-42-58.5-37.5-66-32-80-32.5q-39-16-61.5-25t-61.5-26.5-62.5-31-56.5-35.5-53.5-42.5-43.5-49-35.5-58-21-66.5-8.5-78q0-138 98-242t255-134v-180q0-13 9.5-22.5t22.5-9.5h135q14 0 23 9t9 23v176q57 6 110.5 23t87 33.5 63.5 37.5 39 29 15 14q17 18 5 38l-81 146q-8 15-23 16-14 3-27-7-3-3-14.5-12t-39-26.5-58.5-32-74.5-26-85.5-11.5q-95 0-155 43t-60 111q0 26 8.5 48t29.5 41.5 39.5 33 56 31 60.5 27 70 27.5q53 20 81 31.5t76 35 75.5 42.5 62 50 53 63.5 31.5 76.5 13 94z"></path>
                      </svg>
                    </span>
                    <p className="text-sm text-gray-700 dark:text-white ml-2 font-semibold border-b border-gray-200">
                      Orçamento
                    </p>
                  </div>
                  <div className="border-b border-gray-200 mt-6 md:mt-0 text-black dark:text-white font-bold text-xl">
                    R${totalCart}
                    <span className="text-xs text-gray-400">/R$450.00</span>
                  </div>
                </div>
                <div className="w-full h-3 bg-gray-100">
                  <ProgressPurchase
                    children={{ totalCart: totalCart, budget: 450 }}
                  />
                </div>
              </a>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Home;
