import React, { useState, useEffect } from "react";

import styled from "styled-components";
import TitleSection from "../common/TitleSection";
import TrendsAggregates from "../components/trends/TrendsAggregates";
import TrendsDetailBox from "../components/trends/TrendsDetailBox";
import BigGraphBox from "../components/trends/BigGraphBox";
import PieGraph from "../components/trends/PieGraph";
import StaffDetailRow from "../components/trends/StaffDetailRow";
import Loading from "../common/Loading";
import TicketStore from "../stores/ticketStore";
import ConfigStore from "../stores/configStore";
import AgreementStore from "../stores/agreementStore";

const Trends = ({
  generalTicketData,
  generalConfigData,
  generalAgreementData,
}) => {
  // stores
  const ticketStore = new TicketStore();
  const configStore = new ConfigStore();
  const agreementStore = new AgreementStore();

  // state
  const [aggregateObject, setAggregateObject] = useState({});
  const [staffData, setStaffData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentToggle, setCurrentToggle] = useState("Ticket");
  const [pieData, setPieData] = useState([]);
  const [barData, setBarData] = useState([]);
  const [barKeys, setBarKeys] = useState([]);
  const [barLegend, setBarLegend] = useState("");
  useEffect(() => {
    switch (currentToggle) {
      default:
      case "Ticket":
        const ticketStaffData =
          ticketStore.getTicketStaffData(generalTicketData);
        setStaffData(ticketStaffData);

        const ticketAggObject = ticketStore.getTicketTotals(generalTicketData);
        setAggregateObject(ticketAggObject);

        const pieTicketData = ticketStore.getTicketTypeData(generalTicketData);
        setPieData(pieTicketData);

        const barTicketData =
          ticketStore.getTicketBarGraphData(generalTicketData);
        setBarData(barTicketData);

        setBarKeys(["open", "closed"]);
        setBarLegend("Tickets");
        break;

      case "Config":
        const configStaffData =
          configStore.getConfigStaffData(generalConfigData);
        setStaffData(configStaffData);

        const configAggObject = configStore.getConfigTotals(generalConfigData);
        setAggregateObject(configAggObject);

        const pieConfigData = configStore.getConfigTypeData(generalConfigData);
        setPieData(pieConfigData);

        const barConfigData =
          configStore.getConfigBarGraphData(generalConfigData);
        setBarData(barConfigData);

        setBarKeys(["yearlyExpiring", "expired", "active"]);
        setBarLegend("Configs");
        break;

      case "Agreement":
        const agreementStaffData =
          agreementStore.getAgreementStaffData(generalAgreementData);
        setStaffData(agreementStaffData);

        const agreementAggObject =
          agreementStore.getAgreementsTotals(generalAgreementData);
        setAggregateObject(agreementAggObject);

        const pieAgreementData =
          agreementStore.getAgreementTypeData(generalAgreementData);
        setPieData(pieAgreementData);

        const barAgreementData =
          agreementStore.getAgreementBarGraphData(generalAgreementData);
        setBarData(barAgreementData);

        setBarKeys(["additions"]);
        setBarLegend("Agreements");
        break;
    }
    return () => {};
  }, [currentToggle]);

  if (isLoading) {
    return <Loading />;
  } else {
    return (
      <div>
        <TitleSection
          imgsrc="/images/chart-line-solid.svg"
          title="Trends"
          currentToggle={currentToggle}
          setCurrentToggle={setCurrentToggle}
        />

        <StyledAggregateDiv>
          {Object.entries(aggregateObject).map((t, k) => (
            <TrendsAggregates key={k} uppertext={t[0]} count={t[1]} />
          ))}
        </StyledAggregateDiv>
        <StyledBottomDiv>
          <TrendsDetailBox type="list" boxTitle={`Staff Active ${barLegend}`}>
            <DetailRowContainer>
              {staffData.map((staffItem) => (
                <StaffDetailRow
                  key={staffItem.id}
                  staffDetailData={staffItem}
                />
              ))}
            </DetailRowContainer>
          </TrendsDetailBox>
          <TrendsDetailBox
            type="pie"
            boxTitle={`${barLegend} Types`}
            children={<PieGraph pieData={pieData} />}
          />
          <BigGraphBox
            barData={barData}
            barKeys={barKeys}
            barLegend={barLegend}
          />
        </StyledBottomDiv>
      </div>
    );
  }
};

export default Trends;

const StyledAggregateDiv = styled.div`
  display: flex;
  justify-content: space-between;
`;
const StyledBottomDiv = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 30px;
`;
const DetailRowContainer = styled.div`
  overflow-y: scroll;
`;
