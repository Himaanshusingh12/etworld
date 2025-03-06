import React from "react";
import SubuserHeader from "../Components/SubuserHeader";
import SubuserSidepanel from "../Components/SubuserSidepanel";

function AddRole() {
  return (
    <>
      <SubuserHeader />
      <div className="d-flex">
        <SubuserSidepanel />
        <h1>This is Add Role page</h1>
      </div>
    </>
  );
}

export default AddRole;
