import React from "react";
import styled from "styled-components";

const Tag = ({ label }) => {
  //This component expect to recieve a Ticket Object with attributes like title, description, employee name and employee icon

  if (label === "") {
    return "";
  } else {
    return <TagItem>{label}</TagItem>;
  }
};

const getBgColor = (label) => {
  let bgColor = "";
  switch (label.toLowerCase()) {
    case "open":
    case "active":
      bgColor = "#373B53";
      break;

    case "aging":
    case "high":
    case "inactive":
    case "cancelled":
      bgColor = "#F96157";
      break;

    case "closed":
      bgColor = "#8a2926";
      break;

    case "medium":
    case "in progress":
      bgColor = "#977b33";
      break;

    case "low":
      bgColor = "#6BBB7C";
      break;

    case "expired":
      bgColor = "#D4D4D4";
      break;

    default:
      bgColor = "#ffffff";
      break;
  }

  return bgColor;
};

const getFontColor = (label) => {
  const bgColor = getBgColor(label);
  return bgColor === "#ffffff" || bgColor === "#D4D4D4" ? "#000000" : "#ffffff";
};

const getBorder = (label) => {
  const bgColor = getBgColor(label);
  return bgColor === "#ffffff" ? "2px solid #000000" : "none";
};

const TagItem = styled.div`
  color: ${(props) => getFontColor(props.children)};
  font-size: 12px;
  line-height: 2;
  font-weight: bold;
  background-color: ${(props) => getBgColor(props.children)};
  padding: 0 15px;
  border-radius: 5px;
  margin-left: 10px;
  border: ${(props) => getBorder(props.children)};
  white-space: nowrap;
  width: fit-content;
`;

export default Tag;
