"use client";
import { Suspense } from "react";
import { RegisterPage } from "@/src/components/auth/RegisterForm";

const Page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RegisterPage />
    </Suspense>
  );
};

export default Page;
