import { useEffect } from "react";
import { ToolsTable } from "../../components/partials/tables";
import { PageHeader } from "../../components/partials/header";
import { useRawdataStore } from "../../data/stores/loggerStore";
import { apiCall } from "../../data/useFetcher";
import MobileAccessWarning from "../../components/mobileaccess";

const CompareTools = () => {
  const { getLogger, getDynamicLogger } = useRawdataStore();
  useEffect(() => {
    getDynamicLogger({}, "compareTools");
    apiCall({
      type: "get",
      url: `/api/v1/rawdata?pagination=not`,
      getter: (d: any) => getLogger(d),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div>
      <PageHeader />
      <MobileAccessWarning />
      <div className="w-11/12 mx-auto">
        <ToolsTable />
      </div>
    </div>
  );
};

export default CompareTools;
