import React, { useState, useEffect } from "react";
import styled from "styled-components";
import CategoryFilters from "./CategoryFilters";

const Table = ({
  modalOpen,
  setModalOpen,
  currentToggle,
  setModalData,
  headersArray,
  tableData,
  setTableData,
  categoryFilters,
  setCategoryFilters,
}) => {
  // stores
  const [managerFilters, setManagerFilters] = useState([]);
  const [techFilters, setTechFilters] = useState([]);
  const [filteredTableData, setFilteredTableData] = useState(tableData);

  const handleDrillDownClick = (e, companyName) => {
    let passDownModalData = {
      id: e,
      menu: currentToggle,
      companyName: companyName,
    };
    setModalData(passDownModalData);
    setModalOpen(true);
  };

  useEffect(() => {
    setFilteredTableData(tableData);
    if (techFilters.length > 0) {
      let newTableArray = [];
      tableData.forEach((item) => {
        techFilters.forEach((filter) => {
          if (item.tech.toLowerCase() === filter.toLowerCase()) {
            newTableArray.push(item);
          }
        });
      });
      setFilteredTableData(newTableArray);
    } else {
      setFilteredTableData(tableData);
    }
    return () => {};
  }, [currentToggle, tableData, techFilters]);

  return (
    <MainContainerDiv>
      <StyledContainer>
        <LeftSideContainer>
          <StyledTable>
            <tr>
              <StyledTableHeaders></StyledTableHeaders>
              {headersArray.map((header) => (
                <StyledTableHeaders key={header}>
                  {header.includes("Expiring") ? header.slice(0, 8) : header}{" "}
                  <br />
                  <StyledSpan>
                    {header.includes("Expiring") ? header.slice(8) : null}
                  </StyledSpan>
                </StyledTableHeaders>
              ))}
            </tr>
            <Scrollable modalOpen={modalOpen}>
              {
                // td's
                filteredTableData.map((row) => (
                  <StyledTR
                    key={row.companyId}
                    onClick={(e) =>
                      handleDrillDownClick(row.companyId, row.companyName)
                    }
                  >
                    <StyledTD id={row.companyId}>
                      <StyledP id={row.companyId}>{row.companyName}</StyledP>
                    </StyledTD>
                    <StyledTD id={row.companyId}>
                      {currentToggle === "Ticket"
                        ? row.openTickets
                        : currentToggle === "Agreement"
                        ? row.activeAgreements
                        : row.activeConfigs}
                    </StyledTD>
                    <StyledTD id={row.companyId}>
                      {currentToggle === "Ticket"
                        ? row.closedTickets
                        : currentToggle === "Agreement"
                        ? row.additions
                        : row.quarterExpiring}
                    </StyledTD>
                    <StyledTD id={row.companyId}>
                      {currentToggle === "Ticket"
                        ? row.recentTickets
                        : currentToggle === "Agreement"
                        ? row.monthlyRevenue
                        : row.yearlyExpiring}
                    </StyledTD>
                    <StyledTD id={row.companyId}>
                      {currentToggle === "Ticket"
                        ? row.agingTickets
                        : currentToggle === "Agreement"
                        ? row.expriningAgreements
                        : row.expiredConfigs}
                    </StyledTD>
                    <StyledTD id={row.companyId}>{row.tech}</StyledTD>
                  </StyledTR>
                ))
              }
            </Scrollable>
          </StyledTable>
        </LeftSideContainer>
        <CategoryFilters
          setTechFilters={setTechFilters}
          setManagerFilters={setManagerFilters}
          techFilters={techFilters}
          managerFilters={managerFilters}
          setTableData={setTableData}
          tableData={tableData}
          filteredTableData={filteredTableData}
          setFilteredTableData={setFilteredTableData}
          categoryFilters={categoryFilters}
          setCategoryFilters={setCategoryFilters}
        />
      </StyledContainer>
    </MainContainerDiv>
  );
};

export default Table;

const MainContainerDiv = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`;

const StyledContainer = styled.div`
  width: 1440px;
  height: 380px;
  background-color: rgba(55, 59, 83, 0.9);
  border-radius: 10px;
  display: flex;
  justify-content: flex-start;
  padding: 40px;
`;

// const PlaceholderContainer = styled.div`
//   display: flex;
//   justify-content: flex-start;
// `;

const LeftSideContainer = styled.div`
  display: inline-block;
`;

// const ClearFilterButton = styled.button`
//   border-radius: 15px;
//   background-color: #fff;
//   color: #f96157;
//   width: 120px;
//   height: 30px;
//   font-size: 18px;
//   line-height: 22px;
//   &:hover {
//     cursor: pointer;
//   }
// `;

const StyledTable = styled.table`
  border-right: 1px solid #fff;
  height: 380px;
  padding-right: 140px;
  margin-top: 15px;
  overflow: scroll;
  z-index: 2;
`;

const StyledTableHeaders = styled.th`
  width: 130px;
  height: 60px;
  font-weight: 900;
  font-size: 20px;
  text-align: center;
`;

const StyledTD = styled.td`
  min-width: 125px;
  padding: 10px 0px;
  margin-right: 10px;
  font-weight: normal;
  font-size: 18px;
  text-align: center;
  cursor: pointer;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const StyledTR = styled.tr`
  &:hover {
    cursor: pointer;
    background-color: #0079c9;
  }
  width: 790px;
`;

const StyledP = styled.p`
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 155px;
  overflow: hidden;
`;
const Scrollable = styled.div`
  overflow-y: scroll;
  max-height: 310px;
  position: absolute;
  padding-right: 90px;
  visibility: ${(props) => (props.modalOpen === true ? "hidden" : "visible")};
`;

const StyledSpan = styled.span`
  font-size: 15px;
`;
