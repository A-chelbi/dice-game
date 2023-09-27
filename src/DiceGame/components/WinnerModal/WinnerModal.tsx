import { Fragment, useEffect, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { TPlayer } from "../../../types";
import confetti from "canvas-confetti";

interface IWinnerModalProps {
  open: boolean;
  setOpen: any;
  winners: TPlayer[];
}

const WinnerModal = ({
  open,
  setOpen,
  winners,
}: IWinnerModalProps): JSX.Element => {
  const cancelButtonRef = useRef(null);

  useEffect(() => {
    confetti();
  }, []);

  // Todo: make it prettier when there is multiple winners
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
                  <Dialog.Title
                    as="h4"
                    className="text-center font-semibold leading-6 text-gray-900"
                  >
                    Felicitation!
                  </Dialog.Title>

                  <div className="mt-4">
                    <ul>
                      {winners.map((item) => (
                        <li key={item.id}>
                          <b>{item.name}</b>
                          <br />A GAGNER AVEC UN SCORE TOTAL DE :{" "}
                          <b>{item.total}</b>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 sm:ml-3 sm:w-auto"
                    onClick={() => setOpen(false)}
                  >
                    Close
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

export default WinnerModal;
