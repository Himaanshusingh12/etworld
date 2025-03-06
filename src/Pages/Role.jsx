import React from "react";
import SubuserHeader from "../Components/SubuserHeader";
import SubuserSidepanel from "../Components/SubuserSidepanel";

function Role() {
  return (
    <>
      <SubuserHeader />
      <div className="d-flex">
        <SubuserSidepanel />
        <div className="flex-grow-1 p-4">
          <h2>Role Management</h2>
          <p>Manage user roles here.</p>
        </div>
      </div>
    </>
  );
}

export default Role;
