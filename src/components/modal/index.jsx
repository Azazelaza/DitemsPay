import React from "react";
import { LoginModal } from "./auth/LoginModal";
import { RegisterModal } from "./auth/RegisterModal";

export default function ManagerModal() {
  return (
    <>
      <LoginModal />
      <RegisterModal />
    </>
  );
}
