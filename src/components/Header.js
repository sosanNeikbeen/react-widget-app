import React from "react";
import Link from "./Link";

const Header = () => {
  return (
    <div className="ui secondary pointing menu">
      <Link href="/" classname="item">
        Accordion
      </Link>
      <Link href="/list" classname="item">
        Search
      </Link>
      <Link href="/dropdown" classname="item">
        Dropdown
      </Link>
      <Link href="/translate" classname="item">
        Translate
      </Link>
    </div>
  );
};

export default Header;
