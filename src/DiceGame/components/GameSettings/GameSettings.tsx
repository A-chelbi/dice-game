import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import {
  ArrowPathRoundedSquareIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import { UseFormRegister } from "react-hook-form";
import { IFormInput } from "../../../types";

interface IGameSettingsProps {
  register: UseFormRegister<IFormInput>;
}

const GameSettings = ({ register }: IGameSettingsProps): JSX.Element => {
  const [open, setOpen] = useState(true);

  const cancelButtonRef = useRef(null);

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={setOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                      <Dialog.Title
                        as="h4"
                        className="text-center font-semibold leading-6 text-gray-900"
                      >
                        Configurez votre jeu
                      </Dialog.Title>

                      <div className="mt-4">
                        <div className="mx-auto flex items-center gap-2 mb-4">
                          <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-amber-100 sm:mx-0 sm:h-10 sm:w-10">
                            <UserGroupIcon
                              className="h-6 w-6 text-amber-300"
                              aria-hidden="true"
                            />
                          </div>
                          <h3 className="font-semibold">Nombre de joueurs</h3>
                        </div>

                        <ul className="items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex">
                          <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r ">
                            <div className="flex items-center pl-3">
                              <input
                                id="horizontal-list-radio-license"
                                type="radio"
                                value="2"
                                defaultChecked
                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300"
                                {...register("numbOfUsers")}
                              />
                              <label
                                htmlFor="horizontal-list-radio-license"
                                className="w-full py-3 ml-2 text-sm font-medium text-gray-900"
                              >
                                2 joueurs
                              </label>
                            </div>
                          </li>

                          <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r">
                            <div className="flex items-center pl-3">
                              <input
                                id="horizontal-list-radio-id"
                                type="radio"
                                value="3"
                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500  focus:ring-2"
                                {...register("numbOfUsers")}
                              />
                              <label
                                htmlFor="horizontal-list-radio-id"
                                className="w-full py-3 ml-2 text-sm font-medium text-gray-900 "
                              >
                                3 joueurs
                              </label>
                            </div>
                          </li>

                          <li className="w-full border-b border-gray-200 sm:border-b-0">
                            <div className="flex items-center pl-3">
                              <input
                                id="horizontal-list-radio-millitary"
                                type="radio"
                                value="4"
                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2"
                                {...register("numbOfUsers")}
                              />
                              <label
                                htmlFor="horizontal-list-radio-millitary"
                                className="w-full py-3 ml-2 text-sm font-medium text-gray-900 "
                              >
                                4 joueurs
                              </label>
                            </div>
                          </li>
                        </ul>

                        <div className="mx-auto flex items-center gap-2 mt-4">
                          <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-teal-100 sm:mx-0 sm:h-10 sm:w-10">
                            <ArrowPathRoundedSquareIcon
                              className="h-6 w-6 text-teal-500"
                              aria-hidden="true"
                            />
                          </div>
                          <h3 className="font-semibold">Nombre de Tours</h3>
                          <input
                            className="block rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            type="number"
                            id="numbOfRounds"
                            min="1"
                            max="5"
                            {...register("numbOfRounds")}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 sm:ml-3 sm:w-auto"
                    onClick={() => setOpen(false)}
                  >
                    Démarrer le jeu
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default GameSettings;
