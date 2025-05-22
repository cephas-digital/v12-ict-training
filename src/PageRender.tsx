import { createElement } from "react";
import { useParams, useNavigate } from "react-router-dom";

const GeneratePage = (pageName: string, folder: string) => {
  const component = () => require(`./${folder}/${pageName}`).default;
  let navigate = useNavigate();
  try {
    return createElement(component());
  } catch (e) {
    console.log(e);
    navigate("/");
  }
};

const PageRender = () => {
  const { page, id, step } = useParams();
  const escape2 = [
    "analytics",
    "schedules",
    "history",
    "departments",
    "levels",
    "principal-officer",
    "about",
    "our-courses",
    "contact-us",
    "enroll-now",
  ];

  let pageName = "";
  if (step) {
    pageName = `${page}/${id}/${"[id]"}`;
  } else if (id) {
    if (
      (page === "payroll" && escape2.includes(id)) ||
      (page === "about" && escape2?.includes(id))
    ) {
      pageName = `${page}/${id}`;
    } else {
      pageName = `${page}/${"[id]"}`;
    }
  } else {
    pageName = `${page}`;
  }

  return GeneratePage(pageName, "screens");
};

export default PageRender;
