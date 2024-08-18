import { AnimatePresence, motion } from "framer-motion";
import { Dispatch, SetStateAction, useState } from "react";
import { FiAlertCircle } from "react-icons/fi";

export const SpringModal = ({
  isOpen,
  setIsOpen,
  children,
  dialog,
  confirmText,
  dismissText,
  handleConfirm,
  handleDismiss
}: {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  children?: React.ReactNode;
  dialog? : string;
  confirmText?: string;
  dismissText?: string;
  handleConfirm?: () => void;
  handleDismiss?: () => void;

}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => {
            
            handleDismiss? handleDismiss() : setIsOpen(false);
          }}
          className="bg-slate-900/20 backdrop-blur p-8 fixed inset-0 z-50 grid place-items-center overflow-y-scroll cursor-pointer"
        >
          <motion.div
            initial={{ scale: 0, y: 100 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0, y: 100 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-blue-700 text-white p-6 rounded-lg w-full max-w-lg shadow-xl cursor-default relative overflow-hidden"
          >
            <div className="relative z-10">
              <div className="bg-white w-16 h-16 mb-2 rounded-full text-3xl text-blue-600 grid place-items-center mx-auto">
                <FiAlertCircle />
              </div>
              <h3 className="text-3xl font-bold text-center mb-2">
                {dialog || `You sure about that?`}
              </h3>
              <div className="text-center mb-6">
                {children || "This action is irreversible."}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    handleDismiss? handleDismiss() : setIsOpen(false);
                  }}
                  className="bg-transparent hover:bg-white/10 transition-colors text-white font-semibold w-full py-2 rounded"
                >
                  {dismissText || `Nah, nvm`}
                </button>
                <button
                  onClick={() => {
                    
                    handleConfirm? handleConfirm() : setIsOpen(false);
                  }}
                  className="bg-white hover:opacity-90 transition-opacity text-indigo-600 font-semibold w-full py-2 rounded"
                >
                  {confirmText || `Yeah, I'm sure`}
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};