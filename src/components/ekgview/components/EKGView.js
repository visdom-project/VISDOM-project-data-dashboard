import React from "react";
import "../stylesheets/EKGview.css";
// import EKGTab from "./EKGTab";
import EKGProjectTab from "./EKGProjectTab";
import "bootstrap/dist/css/bootstrap.min.css";

const EKGView = (props) => {
  return (
    <div className="EKG-view">
      {/* <EKGTab {...props}/> */}
      <EKGProjectTab />
    </div>
  );
};

export default EKGView;
