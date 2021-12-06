import axios from "axios";
import techs from "../data/techs.json";
export class MemberStore {
  constructor() {}

  getGeneralMemberData = () => {
    let memberArray = [];
    techs.forEach((item) => {
      if (item.inactiveFlag === false) {
        const shortObject = {
          memberId: item.id,
          memberName: item.fullName,
          memberIdentifier: item.identifier,
        };
        memberArray.push(shortObject);
      }
    });
    return memberArray;
  };
}

export default MemberStore;
