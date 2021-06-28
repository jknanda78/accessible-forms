import React, { useEffect, useRef, useState } from "react";
import Head from "next/head";

const LoginForm: React.FunctionComponent = () => {
  const emailField = useRef(null);
  const passField = useRef(null);
  const [email, updateEmail] = useState("");
  const [pass, updatePass] = useState("");
  const [emailErr, setEmailErr] = useState("");
  const [passErr, setPassErr] = useState("")
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

    validate()
      .then((valid) => {
        valid ? alert("form validation successful") : null;
      })
      .catch((e) => {
        console.log(e);
      });
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
            <p>
              <label
                htmlFor="email_address"
                className={emailErr ? "field-error" : null}
              >
                Email address (required)
                <span className="sr-only">{emailErr ? emailErr : ""}</span>
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
            </p>
            <p>
              <label
                htmlFor="password"
                className={passErr ? "field-error" : null}
              >
                Password (required)
                <span className="sr-only">{passErr ? passErr : ""}</span>
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
            </p>
            <p>
              <button type="submit" name="submit" id="submit">Sign in</button>
            </p>
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
