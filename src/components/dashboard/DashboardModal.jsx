import React from "react";
import styled from "styled-components";
import TicketDetails from "../dashboard/TicketDetails";
import Loading from "../../common/Loading";
import TicketStore from "../../stores/ticketStore.js";
import ConfigStore from "../../stores/configStore.js";
import AgreementStore from "../../stores/agreementStore";
import { useEffect, useState } from "react/cjs/react.development";

const DashboardModal = ({
  modalOpen,
  setModalOpen,
  data,
  headersArray,
  generalTicketData,
  generalConfigData,
  generalAgreementData,
  setIsLoading,
}) => {
  // states
  const [currentSort, setCurrentSort] = useState("");
  const [modalData, setModalData] = useState([]);
  const [modalLoading, setModalLoading] = useState(true);
  const [modalHeader, setModalHeader] = useState("");
  const [sortedDataArray, setSortedDataArray] = useState([]);
  // function to close modal
  const handleCloseButton = () => {
    setModalOpen(false);
  };

  const handleSortByFunction = (e) => {
    let sortedArray = modalData;
    if (e.target.value === "earliest") {
      sortedArray = modalData.sort(
        (a, b) => Date.parse(a.dateEntered) - Date.parse(b.dateEntered)
      );
      setSortedDataArray(sortedArray);
      setCurrentSort("earliest");
    } else if (e.target.value === "latest") {
      sortedArray = modalData.sort(
        (a, b) => Date.parse(b.dateEntered) - Date.parse(a.dateEntered)
      );
      setSortedDataArray(sortedArray);
      setCurrentSort("latest");
    }
    return sortedArray;
  };

  useEffect(() => {
    setModalData(sortedDataArray);
    return () => {};
  }, [sortedDataArray]);

  useEffect(() => {
    let type = "";
    const ticketStore = new TicketStore();
    const configStore = new ConfigStore();
    const agreementStore = new AgreementStore();
    switch (data.menu) {
      default:
      case "Ticket":
        const companyTickets = ticketStore.getTicketsByCompanyId(
          data.id,
          generalTicketData
        );
        setModalData(companyTickets.tickets);
        type = " Tickets";
        break;
      case "Config":
        const companyConfigs = configStore.getConfigsByCompanyId(
          data.id,
          generalConfigData
        );
        setModalData(companyConfigs.configs);
        type = " Configs";
        break;
      case "Agreement":
        const companyAgreements = agreementStore.getAgreementsByCompanyId(
          data.id,
          generalAgreementData
        );
        setModalData(companyAgreements.agreements);
        type = " Agreements";
        break;
      case "Ticket_Open":
        const openTickets = ticketStore.getOpenTickets(generalTicketData);
        setModalData(openTickets);
        type = " Open Tickets";
        break;
      case "Ticket_Closed":
        const closedTickets = ticketStore.getClosedTickets(generalTicketData);
        setModalData(closedTickets);
        type = " Closed Tickets";
        break;
      case "Ticket_Recent":
        const recentTickets = ticketStore.getRecentTickets(generalTicketData);
        setModalData(recentTickets);
        type = " Recent Tickets";
        break;
      case "Ticket_Aging":
        const agingTickets = ticketStore.getAgingTickets(generalTicketData);
        setModalData(agingTickets);
        type = " Aging Tickets";
        break;
      case "Config_Active":
        const activeConfigs = configStore.getActiveConfigs(generalConfigData);
        setModalData(activeConfigs);
        type = " Active Configs";
        break;
      case "Config_Quarter_Expiring":
        const quarterExpiringConfigs =
          configStore.getQuarterExpiringConfigs(generalConfigData);
        setModalData(quarterExpiringConfigs);
        type = " Quarter Expiring Configs";
        break;
      case "Config_Yearly_Expiring":
        const yearlyExpiringConfigs =
          configStore.getYearlyExpiringConfigs(generalConfigData);
        setModalData(yearlyExpiringConfigs);
        type = " Yearly Expiring Configs";
        break;
      case "Config_Expired":
        const expiredConfigs = configStore.getExpiredConfigs(generalConfigData);
        setModalData(expiredConfigs);
        type = " Expired Configs";
        break;
      case "Agreement_Active":
        const activeAgreements =
          agreementStore.getActiveAgreements(generalAgreementData);
        setModalData(activeAgreements);
        type = " Active Agreements";
        break;
      case "Agreement_Additions":
        const additionsAgreements =
          agreementStore.getAdditionsAgreements(generalAgreementData);
        setModalData(additionsAgreements);
        type = " Agreement Additions";
        break;
      case "Agreement_Expiring_This_Year":
        const yearExpiringAgreements =
          agreementStore.getYearlyExpiringConfigs(generalAgreementData);
        setModalData(yearExpiringAgreements);
        type = " Agreements Expiring This Year";
        break;
      case "Agreement_Monthly_Revenue":
        const revenueAgreements =
          agreementStore.getRevenueAgreements(generalAgreementData);
        setModalData(revenueAgreements);
        type = " Agreements Expiring This Month";
        break;
    }
    setModalHeader(
      (data.companyName === undefined ? "All" : data.companyName) + type
    );
    setModalLoading(false);
    return () => {};
  }, [
    modalOpen,
    data.menu,
    data.companyName,
    data.id,
    generalAgreementData,
    generalConfigData,
    generalTicketData,
  ]);

  if (modalLoading) {
    return <Loading />;
  } else {
    if (modalData === undefined) {
      return (
        <StyledModalBox modalOpen={modalOpen}>
          <h2>No Data Available For Current Selection</h2>
          <button onClick={handleCloseButton} align="right">
            x
          </button>
        </StyledModalBox>
      );
    } else {
      return (
        <StyledModalBox modalOpen={modalOpen}>
          <StyledModalContent>
            <button onClick={handleCloseButton} align="right">
              x
            </button>
            <TopSideContainer>
              <h1>{modalHeader}</h1>
              {/* <h1>Apple</h1> */}
              <FiltersContainer>
                <DropdownItem>
                  <label htmlFor="filterSelect">Sort By: </label>
                  <select
                    name="filterSelect"
                    onChange={(e) => {
                      handleSortByFunction(e);
                    }}
                  >
                    <option value="">Select</option>
                    <option value="earliest">Earliest</option>
                    <option value="latest">Latest</option>
                  </select>
                </DropdownItem>
              </FiltersContainer>
            </TopSideContainer>
            <StyledContentDiv>
              {modalData.map((modalItem) => (
                <FlexItem>
                  <TicketDetails
                    key={modalItem.ticketId}
                    modalItem={modalItem}
                    menu={data.menu}
                  />
                </FlexItem>
              ))}
            </StyledContentDiv>
          </StyledModalContent>
        </StyledModalBox>
      );
    }
  }
};

export default DashboardModal;

const StyledModalBox = styled.div`
  display: ${(props) => (props.modalOpen === true ? "flex" : "none")};
  justify-content: center;
  align-items: center;
  position: fixed;
  height: 100vh;
  max-height: 100vh;

  width: 100vw;
  left: 0;
  top: 0;
  background-color: rgba(255, 255, 255, 0.4);
`;

const StyledModalContent = styled.div`
  position: relative;
  z-index: 1;
  height: 70%;
  width: 85vw;
  max-width: 1400px;
  overflow-y: scroll;
  background: #373b53;
  box-shadow: 4px 4px 16px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  padding: 50px 50px 20px;
  h1 {
    color: white;
    font-size: 30px;
    float: left;
  }
  button {
    color: white;
    float: right;
    margin: 10px 10px 0 0;
    background: none;
    border: none;
    font-size: 20px;
    position: absolute;
    top: 10px;
    right: 20px;
  }
`;

const StyledContentDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
`;

const TopSideContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-bottom: 40px;
`;

const FiltersContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: fit-content;
`;

const FlexItem = styled.div`
  width: 100%;
  margin-bottom: 30px;
  display: flex;

  @media (min-width: 900px) {
    width: 48%;
    margin-right: 2%;
    &:nth-child(2n + 2) {
      margin-right: 0;
    }
  }

  @media (min-width: 1400px) {
    width: 32%;
    &:nth-child(2n + 2) {
      margin-right: 2%;
    }
    &:nth-child(3n + 3) {
      margin-right: 0;
    }
  }
`;

const DropdownItem = styled.div`
  display: flex;
  margin-left: 40px;
  align-items: center;
  label {
    font-size: 14px;
    margin-right: 10px;
  }
  select {
    border-radius: 6px;
    border: none;
    height: 25px;
    padding: 4px 8px;
    font-family: inherit;
    font-weight: 400;
    width: 100px;
  }
`;
