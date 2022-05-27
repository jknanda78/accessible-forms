import React, { createContext, useContext, useEffect, useState } from "react";
import signInGql from "src/data-access/sign-in-gql";

const AuthContext = createContext(null);
const defaultAuthState = {
  isLoggedIn: false,
	profile: {
		email: "",
		firstName: "",
		lastName: ""
	}
};

export const useAuthContext = () => useContext(AuthContext);
export const AuthContextConsumer = AuthContext.Consumer;
export const AuthContextProvider = ({
	children,
	initialAuthState
}) => {
	const [authState, setAuthState] = useState(initialAuthState);
	const initiateOneTapSignIn = () => {
		if (navigator.credentials) {
			navigator.credentials.get({
				mediation: "required",
				password: true
			})
				.then((cred) => {
					console.log({cred});
					// Call the GraphQL Sign In API
          signInGql()
            .then((r) => {
              console.log("signInGql success:set auth state", Object.assign({}, defaultAuthState, { profile: r}));
              setAuthState(Object.assign({}, defaultAuthState, { profile: r, isLoggedIn: true }));
            })
            .catch((e) => {
              console.log("sign-in gql failed", e);
            })
				})
				.catch((e) => {
					console.log("cred not found", e);
				});
		}
	};

	return (
		<AuthContext.Provider
			value={{
				authState,
				initiateOneTapSignIn
			}}
		>
			{children}
		</AuthContext.Provider>
	)
};
