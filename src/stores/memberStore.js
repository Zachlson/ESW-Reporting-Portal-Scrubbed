import axios from "axios";

export class MemberStore {
  constructor() {
    this.membersPromise = axios.get(
      "https://serene-lake-35109.herokuapp.com/api/members"
    );
  }

  getGeneralMemberData = async () => {
    const members = await this.membersPromise;

    let memberArray = [];
    members.data.forEach((item) => {
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
