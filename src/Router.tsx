import React, { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";

import PageRender from "./PageRender";
// import Home from "./screens/dashboard";
import { ToastContainer, Zoom } from "react-toastify";
import { IoMdClose } from "react-icons/io";
import useErrorStore from "./data/stores/errorStore";
import { ModalContainer } from "./components/modals/modalcontainer";
import Home from "./screens/home";
// import Home from "./screens/home";

const Routers = () => {
  const { clearErrors, error } = useErrorStore();
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div>
      <ToastContainer position="top-right" theme="colored" transition={Zoom} />{" "}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:page" element={<PageRender />} />
        <Route path="/:page/:id" element={<PageRender />} />
        <Route path="/:page/:id/:step" element={<PageRender />} />
      </Routes>
      {error?.length > 0 && (
        <ModalContainer handleClose={() => clearErrors()}>
          <div>
            <div className="flex justify-between">
              <div>
                <h3 className="text-xl font-bold text-black">Error</h3>
              </div>
              <IoMdClose
                size={20}
                onClick={() => clearErrors()}
                className="cursor-pointer"
                color="#A6A6A6"
              />
            </div>

            <div className="">
              {error?.map((item: any, i: number) => (
                <p key={i} className="fw-bold inter w-100">
                  <span className="fontInherit me-2">
                    {error?.length !== 1 && <>{i + 1}.</>}
                  </span>{" "}
                  {item?.message || item || null}{" "}
                  {item?.path?.includes("[") ? (
                    <>
                      (
                      {Number(
                        item?.path
                          ?.substring(item?.path.indexOf("[") + 1)
                          ?.split("]")?.[0]
                      ) + 1}
                      )
                    </>
                  ) : null}
                </p>
              ))}
            </div>

            <button
              onClick={() => clearErrors()}
              className="mt-8 bg-[#3787FF] text-[#F2FBFF] h-12 w-full rounded-lg text-base font-medium"
            >
              Close
            </button>
          </div>
        </ModalContainer>
      )}
    </div>
  );
};

export default Routers;
