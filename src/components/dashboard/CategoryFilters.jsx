import React, { useState, useEffect } from "react";
import styled from "styled-components";
import SearchBar from "../../common/SearchBar";

const CategoryFilters = ({
  setManagerFilters,
  setTechFilters,
  managerFilters,
  techFilters,
  categoryFilters,
}) => {
  // states
  const [selectedTab, setSelectedTab] = useState("tech");
  const [displayData, setDisplayData] = useState([]);
  const [searchString, setSearchString] = useState("");

  const handleSelectTab = (e) => {
    switch (e.target.getAttribute("name")) {
      default:
        setSelectedTab("tech");
        break;
      case "manager":
        setSelectedTab("manager");
        break;
    }
  };

  const handleToggleCategoryCheckbox = (e) => {
    switch (selectedTab) {
      default:
        if (e.target.checked) {
          setTechFilters((prevState) => [
            ...prevState,
            e.target.getAttribute("name"),
          ]);
        } else {
          if (Array.isArray(techFilters) && techFilters.length > 0) {
            setTechFilters(
              techFilters.filter(
                (filter) => filter !== e.target.getAttribute("name")
              )
            );
          } else {
            setTechFilters([]);
          }
        }
        break;
      case "manager":
        if (e.target.checked) {
          setManagerFilters((prevState) => [
            ...prevState,
            e.target.getAttribute("name"),
          ]);
        } else {
          if (Array.isArray(managerFilters) && managerFilters.length > 0) {
            setManagerFilters(
              managerFilters.filter(
                (filter) => filter !== e.target.getAttribute("name")
              )
            );
          } else {
            setManagerFilters([]);
          }
        }
        break;
    }
  };

  useEffect(() => {
    setDisplayData(categoryFilters);
    if (searchString.length > 0) {
      let newArray = [];
      categoryFilters.forEach((member) => {
        if (
          member.memberName.toLowerCase().includes(searchString.toLowerCase())
        ) {
          newArray.push(member);
        }
      });
      setDisplayData(newArray);
    } else {
      setDisplayData(categoryFilters);
    }
    return () => {};
  }, [selectedTab, categoryFilters, searchString]);

  return (
    <AvailableFiltersContainer>
      <TabsContainer>
        <FilterTabButton
          name="tech"
          selectedTab={selectedTab}
          onClick={handleSelectTab}
        >
          Primary Tech
        </FilterTabButton>
      </TabsContainer>
      <SearchBar setSearchString={setSearchString} />
      {displayData.map((category) => (
        <div key={category.memberIdentifier}>
          <FilterCheckBox
            name={category.memberIdentifier}
            type="checkbox"
            onChange={(e) => {
              handleToggleCategoryCheckbox(e);
            }}
          />
          <CategoryLabel> {category.memberName} </CategoryLabel>
        </div>
      ))}
    </AvailableFiltersContainer>
  );
};

export default CategoryFilters;

const TabsContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  border-bottom: 1px solid #6c6d70;
  margin-bottom: 10px;
`;

const AvailableFiltersContainer = styled.div`
  width: 363px;
  height: 463px;
  margin-left: 50px;
`;

const FilterTabButton = styled.div`
  min-width: 47%;
  height: auto;
  background: #0079c9;
  border-radius: 10px 10px 0px 0px;
  background-color: ${(props) =>
    props.selectedTab === props.name ? "#0079C9" : "#32364C"};
  &:hover {
    cursor: pointer;
    background-color: #0079c9;
  }
  text-align: center;
  padding: 2px 5px;
  box-shadow: 5px 0px rgba(0, 0, 0, 0.1);
  margin-left: 1px;
  font-size: 18px;
`;

const FilterCheckBox = styled.input`
  color: #51afff;
  width: 25px;
  height: 25px;
  border-radius: 5px;
  background-color: rgba(0, 0, 0, 0.1);
  margin: 5px;
`;

const CategoryLabel = styled.label`
  font-weight: 400;
  font-size: 20px;
  font-style: normal;
  margin-bottom: 5px;
`;
