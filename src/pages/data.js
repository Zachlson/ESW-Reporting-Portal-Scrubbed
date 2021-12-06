import React, { useState, useEffect } from "react";
import styled from "styled-components";
import TitleSection from "../common/TitleSection";
import Table from "../components/dashboard/Table";
import FilterBox from "../components/dashboard/FilterBox";
import DashboardModal from "../components/dashboard/DashboardModal";
import TicketStore from "../stores/ticketStore";
import ConfigStore from "../stores/configStore";
import AgreementStore from "../stores/agreementStore";

const Data = ({
  categoryFilters,
  setCategoryFilters,
  generalTicketData,
  generalConfigData,
  generalAgreementData,
}) => {
  // stores
  const ticketStore = new TicketStore();
  const configStore = new ConfigStore();
  const agreementStore = new AgreementStore();
  // state
  const [tableData, setTableData] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState([]);
  const [currentToggle, setCurrentToggle] = useState("Ticket");
  const [headersArray, setHeadersArray] = useState([
    "Open",
    "Closed",
    "Recent",
    "Aging",
    "Primary Tech",
  ]);
  const [totals, setTotals] = useState({});

  useEffect(() => {
    switch (currentToggle) {
      default:
      case "Ticket":
        setHeadersArray(["Open", "Closed", "Recent", "Aging", "Primary Tech"]);
        const ticketTotals = ticketStore.getTicketTotals(generalTicketData);
        const ticketTableData =
          ticketStore.getTicketTableData(generalTicketData);
        setTotals(ticketTotals);
        setTableData(ticketTableData);
        break;
      case "Config":
        setHeadersArray([
          "Active",
          "Expiring next Quarter",
          "Expiring next Year",
          "Expired",
          "Primary Tech",
        ]);
        const configTotals = configStore.getConfigTotals(generalConfigData);
        const configTableData =
          configStore.getConfigTableData(generalConfigData);
        setTotals(configTotals);
        setTableData(configTableData);
        break;
      case "Agreement":
        setHeadersArray([
          "Active",
          "Additions",
          "Revenue",
          "Expiring (this month)",
          "Primary Tech",
        ]);
        const agreementTotals =
          agreementStore.getAgreementsTotals(generalAgreementData);
        const agreementTableData =
          agreementStore.getAgreementsTableData(generalAgreementData);
        setTotals(agreementTotals);
        setTableData(agreementTableData);
        break;
    }
    return () => {};
  }, [currentToggle]);

  if (modalOpen) {
    return (
      <DashboardModal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        data={modalData}
        headersArray={headersArray}
        generalTicketData={generalTicketData}
        generalConfigData={generalConfigData}
        generalAgreementData={generalAgreementData}
      />
    );
  } else {
    return (
      <div>
        <TitleSection
          imgsrc="/images/DashboardLogo.png"
          title="Dashboard"
          currentToggle={currentToggle}
          setCurrentToggle={setCurrentToggle}
        />
        <Table
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
          currentToggle={currentToggle}
          setModalData={setModalData}
          headersArray={headersArray}
          setHeadersArray={setHeadersArray}
          tableData={tableData}
          setTableData={setTableData}
          categoryFilters={categoryFilters}
          setCategoryFilters={setCategoryFilters}
        />
        <StyledFilterDiv>
          {Object.keys(totals).map((key, index) => (
            <FilterBox
              key={key}
              heading={key}
              number={totals[key]}
              modalData={modalData}
              setModalData={setModalData}
              currentToggle={currentToggle}
              setModalOpen={setModalOpen}
            />
          ))}
        </StyledFilterDiv>
      </div>
    );
  }
};

export default Data;

const StyledFilterDiv = styled.div`
  display: flex;
  justify-content: flex-start;
`;
