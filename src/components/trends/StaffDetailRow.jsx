import React from "react";
import styled from "styled-components";

const StaffDetailRow = ({ staffDetailData }) => {
  return (
    <StaffRow key={staffDetailData.id}>
      <div>
        <Staff_P>
          <img src="./images/icon_person.png" alt="icon-person" />
          {staffDetailData.name}
        </Staff_P>
      </div>
      <Staff_Count>{staffDetailData.count}</Staff_Count>
    </StaffRow>
  );
};

export default StaffDetailRow;

// const Title = styled.h3`
//   width: 300px;
//   height: 24px;
//   font-weight: 400;

//   font-size: 24px;
//   color: #fff;
//   margin: 16px 8px;
//   padding: 0 0 8px 0;

//   letter-spacing: 0.01em;

//   border-bottom: 1px solid #fff;
// `;

const StaffRow = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  height: 40px;
  img {
    height: 18px;
  }
`;

const Staff_P = styled.p`
  color: ${(props) =>
    props.status === "down"
      ? "red"
      : props.status === "up"
      ? "green"
      : props.status === "old"
      ? "#6B689F"
      : "white"};
  img {
    margin-right: 10px;
  }
`;

const Staff_Count = styled.p`
  margin-right: 20px;
  margin-top: 2px;
`;
