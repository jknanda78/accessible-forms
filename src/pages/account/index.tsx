import React, { useEffect, useState } from "react";
// import jwt from "jsonwebtoken";
import { getCookie } from "tiny-cookie";
import jscrypto from "jscrypto";

export default () => {
  const [user, setUser] = useState({ email: "" });
  useEffect(() => {
    // const gc = getCookie("gc");
    const gc2 = getCookie("gc2");
    // if (gc) {
    //   const user = jwt.verify(gc, "SECRET_SIGNATURE");
    //   setUser(user);
    // }

    if (gc2) {
      const user = jscrypto.AES.decrypt(gc2, "SECRET_SIGNATURE").toString(jscrypto.Utf8);
      setUser(JSON.parse(user));
    }
  }, []);

  return <h2>Welcome { user.email }</h2>
};