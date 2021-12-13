import React from "react";
import styled from "styled-components";
import Tag from "./Tag";

const TicketDetails = ({ modalItem, menu }) => {
  //This component expect to recieve a Ticket Object with attributes like title, description, employee name and employee icon

  // const isTicket = menu.toLowerCase() === 'ticket' ? true : false;
  // const isConfig = menu.toLowerCase() === 'config' ? true : false;
  // const isAgreement = menu.toLowerCase() === 'agreement' ? true : false;

  const ticketAdapter = (rawData) => {
    return {
      title: `${rawData.ticketId} - ${rawData.summary}`,
      subtitle: rawData.companyName,
      priority: rawData.priorityName,

      tags: [
        rawData.closedFlag
          ? { label: "Closed", isTag: true }
          : { label: "Open", isTag: true },
        { label: "Aging" },
      ],

      description: [
        { label: "Type", content: rawData.type, isTag: false },
        { label: "Contact", content: rawData.contactName, isTag: false },
        { label: "Impact", content: rawData.impact, isTag: true },
        { label: "Severity", content: rawData.severity, isTag: true },
      ],

      employee: {
        name: rawData.tech,
        avatarUrl:
          "https://comotion.uw.edu/wp-content/uploads/2019/05/generic-profile.png",
      },
    };
  };

  const configAdapter = (rawData) => {
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    const formattedExpiryDate = new Date(
      rawData.warrantyExpirationDate
    ).toLocaleString("en-US", options);

    return {
      title: `${rawData.configId} - ${rawData.configTitle}`,
      subtitle: rawData.companyName,
      priority: "",

      tags: [
        rawData.activeFlag
          ? { label: "Active", isTag: true }
          : { label: "InActive", isTag: true },
        Date.parse(rawData.warrantyExpirationDate) <= Date.parse(new Date())
          ? { label: "Expired", isTag: true }
          : { label: "", isTag: false },
      ],

      description: [
        { label: "Expire Date", content: formattedExpiryDate, isTag: false },
        { label: "Type", content: rawData.configType, isTag: false },
        { label: "Contact", content: rawData.contactName, isTag: false },
        { label: "Site", content: rawData.siteName, isTag: false },
      ],

      employee: {
        name: rawData.tech,
        avatarUrl:
          "https://comotion.uw.edu/wp-content/uploads/2019/05/generic-profile.png",
      },
    };
  };

  const agreementAdapter = (rawData) => {
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    const formattedExpiryDate = new Date(rawData.endDate).toLocaleString(
      "en-US",
      options
    );
    return {
      title: `${rawData.agreementId} - ${rawData.agreementName}`,
      subtitle: rawData.companyName,
      priority: rawData.typeName,

      tags: [{ label: rawData.agreementStatus }],

      description: [
        { label: "Expire Date", content: formattedExpiryDate, isTag: false },
        { label: "Contact", content: rawData.contactName, isTag: false },
        { label: "Bill Amount", content: rawData.billAmount, isTag: false },
        { label: "Additions", content: rawData.additions.length, isTag: false },
      ],

      employee: {
        name: rawData.tech,
        avatarUrl:
          "https://comotion.uw.edu/wp-content/uploads/2019/05/generic-profile.png",
      },
    };
  };

  const NormalizeData = (modalItem, menu) => {
    if (!modalItem || !menu) {
      return { isEmpty: true };
    }

    let normalizedData = {};

    switch (menu.toLowerCase()) {
      case "ticket":
      case "ticket_closed":
      case "ticket_open":
      case "ticket_recent":
      case "ticket_aging":
        normalizedData = ticketAdapter(modalItem);
        break;
      case "config":
      case "config_active":
      case "config_quarter_expiring":
      case "config_yearly_expiring":
      case "config_expired":
        normalizedData = configAdapter(modalItem);
        break;
      case "agreement":
      case "agreement_active":
      case "agreement_expiring_this_year":
      case "agreement_monthly_revenue":
      case "agreement_additions":
        normalizedData = agreementAdapter(modalItem);
        break;
      default:
        normalizedData = { isEmpty: true };
        break;
    }

    return normalizedData;
  };

  const NormalizedData = NormalizeData(modalItem, menu);

  if (NormalizeData.isEmpty) {
    return <div></div>;
  } else {
    return (
      <TicketDetailContainer>
        <div className={"fullWidth"}>
          <TopSection>
            <FlexContainer>
              <ItemTitle>{NormalizedData.title}</ItemTitle>
              <TagsContainer>
                {NormalizedData.tags.map((tagInfo, key) => {
                  return <Tag label={tagInfo.label} key={key}></Tag>;
                })}
              </TagsContainer>
            </FlexContainer>

            <FlexContainer>
              <ItemSubTitle>Client: {NormalizedData.subtitle}</ItemSubTitle>
              <PriorityContainer>
                <Tag label={NormalizedData.priority}></Tag>
              </PriorityContainer>
            </FlexContainer>
          </TopSection>

          <ItemBody>
            <LeftColumn>
              {NormalizedData.description.map((attributeLine, key) => {
                if (attributeLine.isTag) {
                  return (
                    <AttributeLine key={key}>
                      <AttributeName>{attributeLine.label}</AttributeName>
                      <Tag label={attributeLine.content}></Tag>
                    </AttributeLine>
                  );
                }
                return (
                  <AttributeLine key={key}>
                    <AttributeName>{attributeLine.label}</AttributeName>
                    <Content>{attributeLine.content}</Content>
                  </AttributeLine>
                );
              })}
            </LeftColumn>

            <RightColumn>
              <EmployeeDetails>
                <ProfileImage
                  src={NormalizedData.employee.avatarUrl}
                  alt={"Profile Image"}
                />
                <EmployeeName>{NormalizedData.employee.name}</EmployeeName>
              </EmployeeDetails>
            </RightColumn>
          </ItemBody>
        </div>
      </TicketDetailContainer>
    );
  }
};

export default TicketDetails;

const TicketDetailContainer = styled.div`
  padding: 30px;
  background-color: #ffffff;
  display: flex;
  border-radius: 10px;
  box-shadow: 4px 4px 16px rgba(0, 0, 0, 0.5);
  justify-content: space-between;
  align-items: center;
  color: #05040f;
  font-family: "Lato", sans-serif;
  height: content-box;
  width: 100%;
  .fullWidth {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
  }
`;

const ProfileImage = styled.img`
  height: 50px;
  width: 50px;
  border-radius: 50%;
  margin-bottom: 10px;
`;

const ItemTitle = styled.h2`
  margin: 0;
  font-size: 20px;
  font-weight: bold;
  width: 100%;
  flex-grow: 5;
`;

const ItemSubTitle = styled.h2`
  margin: 0;
  font-size: 14px;
  color: #858585;
  font-weight: bold;
  width: 100%;
  flex-grow: 5;
`;

const ItemBody = styled.div`
  margin: 0;
  font-size: 12px;
  line-height: 1.5;
  display: flex;
  align-items: flex-end;
  font-weight: lighter;
  height: fit-content;
`;
const Content = styled.div`
  margin-left: 10px;
`;

const AttributeLine = styled.div`
  display: flex;
  margin-bottom: 5px;
`;

const AttributeName = styled.div`
  width: 80px;
`;

const LeftColumn = styled.div`
  width: 70%;
`;

const RightColumn = styled.div`
  width: 30%;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
`;

const EmployeeName = styled.div`
  margin: 0;
  font-family: "Lato", sans-serif;
  font-size: 16px;
  font-weight: bold;
  width: auto;
  max-width: 90px;
  text-align: center;
`;

const EmployeeDetails = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const FlexContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 10px;
`;

const PriorityContainer = styled.div`
  width: fit-content;
`;

const TagsContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  width: fit-content;
`;

const TopSection = styled.div`
  height: fit-content;
  margin-bottom: 20px;
`;
