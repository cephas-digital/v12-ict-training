import ReactPlayer from "react-player";
import { PageHeader } from "../components/partials/header";
import WhiteBox, { ToolsKPIsData, WhiteBox2 } from "../components/partials/box";
import WebsiteIcon from "../assets/icons/website.svg";
import Mail from "../assets/icons/mail.svg";
import ProductTable from "../components/partials/tables";
import { MapDashboardComponent } from "./dashboard";
import { forwardRef, useEffect, useState } from "react";
import { apiCall } from "../data/useFetcher";
import { useRawdataStore } from "../data/stores/loggerStore";
import ChartIcon from "../assets/icons/chart.svg";
import Info from "../assets/icons/information.svg";

const PdfPrint = forwardRef<HTMLDivElement>((props, ref) => {
  // Current Tool mock data
  const [mapCountries, setMapCountries] = useState<any>(null);
  const [info, setInfo] = useState(null);
  const currentTool = {
    kpiSelection: "",
    toolSelection: [],
    image: {
      url: "/images/tool-icon.png",
    },
    toolName: "Digital Assessment Tool",
    description: `
      <div>
        <p>A comprehensive digital assessment platform designed to evaluate and track progress.</p>
        <p>Features include:</p>
        <ul>
          <li>Automated scoring</li>
          <li>Progress tracking</li>
          <li>Detailed analytics</li>
        </ul>
      </div>
    `,
    resources: [
      {
        material: "Getting Started Guide",
        name: "Getting Started Guide",
        link: "https://example.com/getting-started",
      },
      {
        material: "Technical Documentation",
        name: "Technical Documentation",
        link: "https://example.com/documentation",
      },
      {
        material: "Best Practices",
        name: "Best Practices",
        link: "https://example.com/best-practices",
      },
    ],
  };

  // Contact details mock data
  const contact = [
    { icon: WebsiteIcon, value: "https://www.example.com" },
    { icon: Mail, value: "paulkolapo8@gmail.com" },
  ];

  // Webinar links mock data
  const webinar = ["https://www.youtube.com/watch?v=abc123xyz"];

  // Start flag for conditional rendering
  const start = false;

  // Helper function for the dangerouslySetInnerHTML
  const createMarkup = (htmlContent) => {
      return { __html: htmlContent };
    },
    [countries, setCountries] = useState<any>(null);
  let { getDynamicLogger, getLogger, data } = useRawdataStore(),
    [formInfo, setFormInfo] = useState(null),
    { mapTools, kpidata, regionCountry }: any = useRawdataStore();
  useEffect(() => {
    if (currentTool) {
      let appLevel = currentTool?.toolSelection?.find(
        (it: any) => it?.category === "APPLICATION LEVEL"
      );
      if (appLevel) {
        apiCall({
          type: "get",
          url: `/api/v1/rawdata/manage-kpis?category=APPLICATION LEVEL&data=${appLevel?.data?.[0]}&pagination=not`,
          getter: (d: any) => getDynamicLogger(d, "kpidata"),
        });
      }
      let countriesLevel = currentTool?.toolSelection?.find(
        (it: any) => it?.category === "COUNTRY"
      );
      if (countriesLevel) {
        let newCount: any[] = [];
        for (let c = 0; c < countriesLevel?.data?.length; c++) {
          const element = countriesLevel?.data[c];

          let findCountry = countries?.find(
            (it) => it?.name?.common?.toLowerCase() === element?.toLowerCase()
          );
          let newEle: any = {
            country: element,
          };
          if (findCountry) {
            newEle.short =
              findCountry?.fifa ||
              findCountry?.cioc ||
              findCountry?.cca3 ||
              findCountry?.cca2;
          }
          if (!["all", "global"]?.includes(newEle?.country?.toLowerCase()))
            newCount?.push(newEle);
        }
        setMapCountries(newCount);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentTool]);
  const products = [
      { name: "Asset inventory", status: "good" },
      { name: "Asset (system) renewal/replacement", status: "good" },
      { name: "Sewerage system integrity", status: "bad" },
      { name: "Planned maintenance", status: "bad" },
      { name: "Sanitation Facilities Database", status: "bad" },
    ],
    optimization = [
      { name: "Resource Optimization", status: "good" },
      { name: "Performance Monitoring", status: "good" },
      { name: "Seewerage management efficiency", status: "bad" },
      { name: "Non Sewered Sanitation Service Management", status: "bad" },
    ],
    resiliency = [
      { name: "Recordable incidents of injury or illness", status: "good" },
      { name: "Risk assessment and response preparedness", status: "bad" },
      { name: "Ongoing operational resilliency", status: "good" },
    ];
  return (
    <div ref={ref}>
      <div className="w-full bg-[#F8FAFC]">
        <div className="">
          <WhiteBox2 className="w-full">
            <div className="flex gap-6 items-center">
              <img src={currentTool?.image?.url || ""} alt="" className="" />
              <h6 className="text-base font-medium text-da-blue-600">
                {currentTool?.toolName}
              </h6>
            </div>
            <div
              className="
                    text-sm font-normal text-da-blue-600 mt-4
                    "
              dangerouslySetInnerHTML={createMarkup(currentTool?.description)}
            />
          </WhiteBox2>
          <div className="mt-2 grid grid-cols-3 gap-8">
            <div className="col-span-2 flex flex-col">
              <WhiteBox className="h-full">
                <h4 className="text-base font-medium text-[#000929]">
                  Resources
                </h4>
                <div
                  style={{
                    border: "1px solid #E2E8F0",
                  }}
                  className="mt-5 h-10 w-full grid grid-cols-3"
                >
                  <div className="cols-span-1 border-r border-r-[#E2E8F0] flex justify-start items-center h-full w-full">
                    <h4 className="text-sm pl-4 font-medium text-da-blue-600">
                      Resource Title
                    </h4>
                  </div>
                  <div className="cols-span-2 h-full flex items-center pl-6">
                    <h4 className="text-sm font-medium text-da-blue-600">
                      Link
                    </h4>
                  </div>
                </div>
                {currentTool?.resources?.map((r: any, i: number) => (
                  <div
                    key={i}
                    style={{
                      border: "1px solid #E2E8F0",
                    }}
                    className="h-10 w-full grid grid-cols-3"
                  >
                    <div className="cols-span-1 border-r border-r-[#E2E8F0] flex items-center h-full w-full">
                      <ul className="list-disc ml-6 list-inside">
                        <li className="text-sm font-normal text-da-blue-600">
                          {r?.material || r?.name}
                        </li>
                      </ul>
                    </div>
                    <div className="cols-span-2 h-full flex items-center pl-6">
                      <a
                        href={r?.link}
                        target="_blank"
                        rel={"noreferrer"}
                        className="text-sm font-normal text-da-blue-100"
                      >
                        {r?.link}
                      </a>
                    </div>
                  </div>
                ))}
              </WhiteBox>
            </div>
            <div className="col-span-1 flex flex-col">
              <WhiteBox className="h-full">
                <h4 className="text-base font-medium text-[#000929]">
                  Contact Details
                </h4>
                <div className="mt-5 space-y-3">
                  {contact?.map((c) => (
                    <div className="flex items-center gap-2">
                      <img src={c?.icon} alt="" className="" />
                      {start && (
                        <a
                          href={c?.value}
                          target="_blank"
                          rel={"noreferrer"}
                          className="text-sm font-normal text-da-blue-100"
                        >
                          {c?.value}
                        </a>
                      )}
                    </div>
                  ))}
                </div>
                <div className="mt-5">
                  <h4 className="text-base font-medium text-[#000929]">
                    Webinar
                  </h4>
                  <div className="mt-5 space-y-3">
                    {webinar?.map((c) => (
                      <div className="flex items-center gap-2">
                        {start && (
                          <div className="w-full h-56">
                            <ReactPlayer
                              url={c}
                              width="100%"
                              height="100%"
                              style={{
                                borderRadius: "24px",
                              }}
                              controls
                            />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </WhiteBox>
            </div>
          </div>
        </div>
        <div className="w-full">
          <div className="w-full mt-3 grid grid-cols-3 gap-5 page-break">
            <div
              style={{
                boxShadow: "4px 4px 100px 0px #00000014",
              }}
              className="col-span-2 h-72 overflow-hidden bg-white rounded-lg p-5 page-break"
            >
              <h4 className="text-base font-medium text-[#000929]">
                Countries using sanitation data tools
              </h4>
              <div className="flex gap-5 pt-4">
                <div className="w-[70%]">
                  <MapDashboardComponent
                    mapCountries={mapCountries}
                    currentTool={currentTool}
                    start={start}
                  />

                  {/* <img src={Map} alt="" className="mt-4" /> */}
                </div>
                <div className="w-[30%]">
                  <h5 className="text-sm whitespace-nowrap font-medium text-[#000929]">
                    {mapCountries?.length}{" "}
                    {mapCountries?.length === 1 ? "Country" : "Countries"}{" "}
                    Available
                  </h5>
                  <ul className="list-disc h-64 overflow-y-scroll noscroll list-inside space-y-2 mt-3 text-xs font-normal text-da-blue-600">
                    {mapCountries?.map((it: any, i: number) => (
                      <li key={i} className="page-break">
                        {it?.country}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-span-1">
              <WhiteBox>
                <h4 className="text-base font-medium text-[#000929]">
                  Data Type Generated
                </h4>
                <div className="mt-5 space-y-3">
                  {!start && !currentTool && (
                    <>
                      <div className="flex items-center gap-2">
                        {start ? (
                          <img src={ChartIcon} alt="" className="" />
                        ) : (
                          <div className="h-3 rounded-tr-3xl w-12 bg-[#D2D7D4"></div>
                        )}
                        {start && (
                          <h6 className="text-sm font-normal text-da-blue-600">
                            Quality of Service KPIs
                          </h6>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        {start ? (
                          <img src={ChartIcon} alt="" className="" />
                        ) : (
                          <div className="h-3 rounded-tr-3xl w-12 bg-[#D2D7D4]"></div>
                        )}
                        {start && (
                          <h6 className="text-sm font-normal text-da-blue-600">
                            Quality of Service KPIs
                          </h6>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        {start ? (
                          <img src={ChartIcon} alt="" className="" />
                        ) : (
                          <div className="h-3 rounded-tr-3xl w-12 bg-[#D2D7D4]"></div>
                        )}
                        {start && (
                          <h6 className="text-sm font-normal text-da-blue-600">
                            Quality of Service KPIs
                          </h6>
                        )}
                      </div>
                    </>
                  )}
                  {currentTool &&
                    formInfo?.map((tool, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-2 page-break"
                      >
                        {start ? (
                          <img src={ChartIcon} alt="" className="" />
                        ) : (
                          <div className="h-3 rounded-tr-3xl w-12 bg-[#D2D7D4]"></div>
                        )}
                        {start && (
                          <h6 className="text-sm font-normal text-da-blue-600 capitalize">
                            {tool?.category?.toLowerCase()}
                          </h6>
                        )}
                      </div>
                    ))}
                </div>
              </WhiteBox>
            </div>
          </div>
          {currentTool && (
            <div className="mt-3 grid grid-cols-3 gap-5">
              <WhiteBox className="h-full">
                <div className="flex justify-between items-center">
                  <h5 className="text-base text-da-blue-600 font-medium">
                    Infrastructure and Stability
                  </h5>
                  <img
                    src={Info}
                    onClick={() =>
                      setInfo({
                        category: "Infrastructure and Stability",
                      })
                    }
                    alt=""
                    className="cursor-pointer"
                  />
                </div>
                <div className="mt-2">
                  <ProductTable start={false} products={products} />
                </div>
              </WhiteBox>
              <WhiteBox className="h-full">
                <div className="flex justify-between items-center">
                  <h5 className="text-base text-da-blue-600 font-medium">
                    Operational Optimization
                  </h5>
                  <img
                    src={Info}
                    alt=""
                    onClick={() =>
                      setInfo({
                        category: "Operational Optimization",
                      })
                    }
                    className="cursor-pointer"
                  />
                </div>
                <div className="mt-2">
                  <ProductTable start={false} products={optimization} />
                </div>
              </WhiteBox>
              <WhiteBox className="h-full">
                <div className="flex justify-between items-center">
                  <h5 className="text-base text-da-blue-600 font-medium">
                    Operational Resilency
                  </h5>
                  <img
                    src={Info}
                    alt=""
                    onClick={() =>
                      setInfo({
                        category: "Operational Resilency",
                      })
                    }
                    className=""
                  />
                </div>
                <div className="mt-2">
                  <ProductTable start={false} products={resiliency} />
                </div>
              </WhiteBox>
            </div>
          )}
          {currentTool && (
            <div className="mt-5 grid grid-cols-3 gap-5">
              {formInfo?.map((tool: any, i: number) => (
                <ToolsKPIsData
                  start
                  data={tool?.data}
                  title={tool?.category}
                  key={i}
                  prevData={currentTool?.kpiSelection}
                  setInfo={() => setInfo(tool)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
});

export default PdfPrint;
