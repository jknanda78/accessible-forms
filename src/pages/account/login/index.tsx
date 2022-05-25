import React, { useEffect, useRef, useState } from "react";
import Head from "next/head";
import Disclaimer from "@components/disclaimer";
import { useRouter } from 'next/router'
import jwt from "jsonwebtoken";
import { setCookie } from "tiny-cookie";

const LoginForm: React.FunctionComponent = () => {
  const emailField = useRef(null);
  const passField = useRef(null);
  const [email, updateEmail] = useState("");
  const [pass, updatePass] = useState("");
  const [emailErr, setEmailErr] = useState("");
  const [passErr, setPassErr] = useState("");
  const router = useRouter();
  const emailChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateEmail(e.currentTarget.value);
  };
  const passChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    updatePass(e.currentTarget.value);
  };
  const validate = () => {
    let valid = true;

    if (!email.length) {
      valid = false;
      setEmailErr("Please enter email address");
    } else {
      setEmailErr("");
    }

    if (!pass.length) {
      valid = false;
      setPassErr("Please enter your password");
    } else {
      setPassErr("");
    }

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(valid);
      }, 300);
    });
  };
  const submitHandler = (e: React.SyntheticEvent) => {
    e.preventDefault();
    console.log("email::", email, " Password::", pass);
    var token = jwt.sign({ email, pass }, "SECRET_SIGNATURE");
    const expires_in_2_mins = new Date();
    expires_in_2_mins.setTime(expires_in_2_mins.getTime() + 60 * 2 * 1000);
    setCookie("gc", token, { expires: expires_in_2_mins.toUTCString() });
    router.push("/account");
    /*validate()
      .then((valid) => {
        valid ? alert("form validation successful") : null;
      })
      .catch((e) => {
        console.log(e);
      });*/
  }

  useEffect(() => {
    if (emailErr) {
      emailField.current.focus();
    } else if (passErr) {
      passField.current.focus();
    }
  }, [emailErr, passErr]);

  return (
    <>
      <Head>
        <title>Sign in to your account</title>
      </Head>
      <header>
        <h1>Sign in to your account</h1>
      </header>
      <main>
        <form onSubmit={submitHandler} noValidate>
          <fieldset>
            <legend className="sr-only">sign in form</legend>
            <div>
              <label
                htmlFor="email_address"
                className={emailErr ? "field-error" : null}
              >
                Email address (required)
                {emailErr ? <span className="sr-only">{emailErr}</span> : null}
              </label>
              <input
                type="email"
                name="email"
                id="email_address"
                value={email}
                onChange={emailChangeHandler}
                ref={emailField}
              />
              {emailErr ? (
                <div id="emailErr" className="field-error">{emailErr}</div>
              ) : null}
            </div>
            <div>
              <label
                htmlFor="password"
                className={passErr ? "field-error" : null}
              >
                Password (required)
                {passErr ? <span className="sr-only">{passErr}</span> : null}
              </label>
              <input
                type="password"
                name="password"
                id="password"
                value={pass}
                onChange={passChangeHandler}
                ref={passField}
              />
              {passErr ? (
                <div className="field-error">{passErr}</div>
              ) : null}
            </div>
            <Disclaimer />
            <div>
              <button type="submit" name="submit" id="submit">Sign in</button>
            </div>
          </fieldset>
        </form>
      </main>
      <footer className="sticky">
        <ul>
          <li>
            <a href="/terms_of_use" onClick={() => { }}>Terms of Use</a>
          </li>
          <li>
            <a href="/privacy_policy" onClick={() => { }}>Privacy Policy</a>
          </li>
        </ul>
      </footer>
    </>
  );
};

export default LoginForm;
