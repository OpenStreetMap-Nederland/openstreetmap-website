"use client";

import { SessionProvider } from "next-auth/react";

type Props = {
  session: any;
  children?: React.ReactNode;
};

export const NextAuthProvider = ({ session, children }: Props) => {
  return <SessionProvider session={session}>{children}</SessionProvider>;
};
