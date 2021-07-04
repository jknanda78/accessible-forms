import React, { useState } from "react";
import ClassNames from "classnames";

type Props = {};

const Disclaimer: React.FunctionComponent<Props> = () => {
  const [toggle, setToggle] = useState(false);
  const clickHandler = () => {
    setToggle(!toggle);
  };

  return (
    <div>
      <button
        type="button"
        name="disclaimer"
        onClick={clickHandler}
        aria-describedby="signin-disclaimer"
        value={toggle ? "Hide" : "More"}
      >
        {toggle ? "Hide" : "More"}
      </button>
      <div className="disclaimer" tabIndex={toggle ? 0 : null}>
        <div id="signin-disclaimer" className={ClassNames("font-disclaimer", "content", { hidden: !toggle })}>
          We'll keep you signed in on this device. You may be asked to enter your password when modifying sensitive account information.
        </div>
      </div>
    </div>
  );
};

export default Disclaimer;
