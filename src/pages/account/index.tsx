import React, { useEffect, useState } from "react";
import { getCookie } from "tiny-cookie";
import jscrypto from "jscrypto";
import { AuthContextProvider, useAuthContext } from "@components/auth-context-provider";

export default () => {
  const [user, setUser] = useState({ email: "" });
  useEffect(() => {
    const gc = getCookie("gc");

    if (gc) {
      const user = jscrypto.AES.decrypt(gc, "SECRET_SIGNATURE").toString(jscrypto.Utf8);
      setUser(JSON.parse(user));
    }
  }, []);

  return (
    <AuthContextProvider
      allowSignInVariations // Approach 2
      initialAuthState={null}
    >
      <WelcomePage />
    </AuthContextProvider>
  );
};

const WelcomePage = () => {
  const { initiateOneTapSignIn, authState } = useAuthContext() || {};

  /* Approach 1
  useEffect(() => {
    initiateOneTapSignIn();
  }, []);
  */

  return (
    <h2>Welcome { authState?.profile.email }</h2>
  )
};
