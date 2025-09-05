"use client";

import React from "react";
import { useAuthModal } from "../hooks/useAuthModal";
import { motion } from "framer-motion";

const AuthTest: React.FC = () => {
  const { openSignInModal, openSignUpModal } = useAuthModal();

  return (
    <div className="flex flex-col gap-4 p-6 bg-white/10 backdrop-blur-md rounded-lg border border-white/20">
      <h3 className="text-lg font-semibold text-white">Auth Modal Test</h3>
      <div className="flex gap-3">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          onClick={openSignInModal}
          className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md font-medium transition-colors"
        >
          Test Sign In Modal
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          onClick={openSignUpModal}
          className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-md font-medium transition-colors"
        >
          Test Sign Up Modal
        </motion.button>
      </div>
    </div>
  );
};

export default AuthTest;
