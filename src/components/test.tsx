"use client";
import { useAuthActions } from "@convex-dev/auth/react";

export function SignIn() {
  const { signIn } = useAuthActions();
  return (
    <button onClick={() => void signIn("google")}>Sign in with Google</button>
  );
}

export function SignOut() {
  const { signOut } = useAuthActions();
  return <button onClick={() => void signOut()}>Sign Out</button>;
}
