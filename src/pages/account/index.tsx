import React, { useEffect, useState } from "react";
import jwt from "jsonwebtoken";
import { getCookie } from "tiny-cookie";

export default () => {
  const [user, setUser] = useState({ email: "" });
  useEffect(() => {
    const gc = getCookie("gc");
    if (gc) {
      const user = jwt.verify(gc, "SECRET_SIGNATURE");
      setUser(user);
    }
  }, []);

  return <h2>Welcome { user.email }</h2>
};