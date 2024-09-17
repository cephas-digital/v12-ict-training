import React from "react";
import { ToolsTable } from "../../components/partials/tables";
import { PageHeader } from "../../components/partials/header";

const CompareTools = () => {
  return (
    <div>
      <PageHeader />
      <div className="w-11/12 mx-auto">
        <ToolsTable />
      </div>
    </div>
  );
};

export default CompareTools;
