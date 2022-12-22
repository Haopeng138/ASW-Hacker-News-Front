import React from "react";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return(
    <p>
      <center>
        Page Not Found. Go to <Link to='/'>Home</Link>
      </center>
    </p>
  );
}

export default PageNotFound;