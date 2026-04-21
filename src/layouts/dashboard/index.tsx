'use client'

import { PropsWithChildren } from "react";
import Header from "./components/Header";

export default function DashboardLayout({ children }: PropsWithChildren) {  

  return (
    <>
      <Header />
      {children}
    </>
  );
}