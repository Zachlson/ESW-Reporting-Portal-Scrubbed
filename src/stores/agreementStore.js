import axios from "axios";
import agreements from "../data/agreements.json";
export class AgreementStore {
  constructor() {}

  getGeneralAgreementsData = () => {
    const map = new Map();
    agreements.forEach((item) => {
      const shortObject = {
        agreementId: item.id,
        agreementName: item.name,
        typeId: item.type.id,
        typeName: item.type.name,
        companyId: item.company.id,
        companyName: item.company.name,
        contactId: item.contact.id,
        contactName: item.contact.name,
        dateEntered: item.startDate,
        endDate: item.endDate,
        cancelledFlag: item.cancelledFlag,
        billAmount: item.billAmount,
        agreementStatus: item.agreementStatus,
        billStartDate: item.billStartDate,
        invoiceDescription: item.invoiceDescription,
        tech: item._info.updatedBy,
        additions: item.additions,
      };
      const key = item.company.id + "*" + item.company.name;
      const collection = map.get(key);
      if (!collection) {
        map.set(key, [shortObject]);
      } else {
        collection.push(shortObject);
      }
    });
    return map;
  };

  getAgreementsByCompanyId = async (id) => {
    const companies = await this.getGeneralAgreementsData();
    for (let [key, value] of companies) {
      if (parseInt(key.split("*")[0]) === id) {
        const companyObject = {
          companyId: parseInt(key.split("*")[0]),
          companyName: key.split("*")[1],
          agreements: value,
        };
        return companyObject;
      }
    }
  };

  getAgreementsTableData = (agreements) => {
    const tableDataArray = [];
    for (let [key, value] of agreements) {
      let activeAgreements = 0;
      let expriningAgreements = 0;
      let monthlyRevenue = 0;
      let additions = 0;
      let endDate;
      let todayDate;
      let tech;
      value.forEach((agreement) => {
        endDate = Date.parse(agreement.endDate);
        todayDate = Date.parse(new Date());
        if (
          agreement.agreementStatus !== "Expired" &&
          agreement.agreementStatus !== "Cancelled"
        ) {
          activeAgreements++;
          if (todayDate + 2592000000 >= endDate) {
            expriningAgreements++;
          }
          monthlyRevenue += agreement.billAmount;
          additions = agreement.additions.length;
        }
        tech = agreement.tech;
      });
      const companyObject = {
        companyId: parseInt(key.split("*")[0]),
        companyName: key.split("*")[1],
        activeAgreements: activeAgreements,
        monthlyRevenue: monthlyRevenue,
        expriningAgreements: expriningAgreements,
        additions: additions,
        tech: tech,
      };
      tableDataArray.push(companyObject);
    }
    return tableDataArray;
  };

  getAgreementsTotals = (agreements) => {
    let active = 0;
    let expiring = 0;
    let monthlyRevenue = 0;
    let additions = 0;
    let todayDate;
    let endDate;
    for (let [key, value] of agreements) {
      value.forEach((agreement) => {
        todayDate = Date.parse(new Date());
        endDate = Date.parse(agreement.endDate);

        if (
          agreement.agreementStatus !== "Expired" &&
          agreement.agreementStatus !== "Cancelled"
        ) {
          active++;
          additions += agreement.additions.length;
          monthlyRevenue += agreement.billAmount;
          if (todayDate + 2592000000 >= endDate) {
            expiring++;
          }
        }
      });
    }
    return {
      Active: active,
      Expiring: expiring,
      Revenue: monthlyRevenue,
      Additions: additions,
    };
  };

  getActiveAgreements = (agreements) => {
    let activeAgreementsArray = [];

    for (let [key, value] of agreements) {
      value.forEach((agreement) => {
        if (
          agreement.agreementStatus !== "Expired" &&
          agreement.agreementStatus !== "Cancelled"
        ) {
          activeAgreementsArray.push(agreement);
        }
      });
    }
    return activeAgreementsArray;
  };

  getRevenueAgreements = (agreements) => {
    let revenueAgreementsArray = [];
    for (let [key, value] of agreements) {
      value.forEach((agreement) => {
        if (
          agreement.agreementStatus !== "Expired" &&
          agreement.agreementStatus !== "Cancelled" &&
          agreement.monthlyRevenue > 0
        ) {
          revenueAgreementsArray.push(agreement);
        }
      });
    }
    return revenueAgreementsArray;
  };

  getExpiringAgreements = (agreements) => {
    let expiringAgreementsArray = [];
    let todayDate;
    let endDate;

    for (let [key, value] of agreements) {
      todayDate = Date.parse(new Date());
      value.forEach((agreement) => {
        endDate = agreement.endDate;
        if (
          agreement.agreementStatus !== "Expired" &&
          agreement.agreementStatus !== "Cancelled" &&
          todayDate + 2592000000 >= endDate
        ) {
          expiringAgreementsArray.push(agreement);
        }
      });
    }
    return expiringAgreementsArray;
  };

  getAdditionsAgreements = (agreements) => {
    let additionsAgreementsArray = [];

    for (let [key, value] of agreements) {
      value.forEach((agreement) => {
        if (
          agreement.agreementStatus !== "Expired" &&
          agreement.agreementStatus !== "Cancelled" &&
          agreement.additions.length > 0
        ) {
          additionsAgreementsArray.push(agreement);
        }
      });
    }
    return additionsAgreementsArray;
  };

  getAgreementTypeData = (agreements) => {
    let number = 0;
    const map = new Map();
    for (let [key, value] of agreements) {
      value.forEach((agreement) => {
        const key = agreement.typeName;
        const collection = map.get(key);
        if (!collection) {
          map.set(key, 1);
        } else {
          let tempCount = map.get(key);
          map.set(key, tempCount + 1);
        }
      });
    }
    let typeDataArray = [];
    for (let [key, value] of map) {
      let tempObject = {
        id: key,
        label: key,
        value: value,
      };
      typeDataArray.push(tempObject);
    }
    return typeDataArray;
  };

  getAgreementStaffData = (agreements) => {
    const map = new Map();
    let todayDate = Date.parse(new Date());
    for (let [key, value] of agreements) {
      value.forEach((agreement) => {
        const key = agreement.tech;
        if (Date.parse(agreement.endDate) > todayDate) {
          const collection = map.get(key);
          if (!collection) {
            map.set(key, 1);
          } else {
            let tempCount = map.get(key);
            map.set(key, tempCount + 1);
          }
        }
      });
    }
    let typeDataArray = [];
    for (let [key, value] of map) {
      let tempObject = {
        id: key,
        name: key,
        count: value,
      };
      typeDataArray.push(tempObject);
    }
    return typeDataArray;
  };

  getAgreementBarGraphData = (agreements) => {
    const map = new Map();
    let agreementBarGraphArray = [];
    for (let [key, value] of agreements) {
      value.forEach((agreement) => {
        if (agreement.additions.length > 0) {
          agreement.additions.forEach((addition) => {
            const dateEntered = new Date(addition.effectiveDate);
            const month =
              dateEntered.getMonth() === 0
                ? 12
                : dateEntered.getMonth() < 10
                ? "0" + dateEntered.getMonth()
                : dateEntered.getMonth();
            const year = dateEntered.getFullYear();
            const key = month + "-" + year;
            const collection = map.get(key);
            if (!collection) {
              map.set(key, [addition]);
            } else {
              collection.push(addition);
            }
          });
        }
      });
    }
    for (let [key, value] of map) {
      let validDate = key.split("-");
      let tempObject = {
        id: key,
        month: key,
        validDate: validDate[1] + "-" + validDate[0],
        additions: value.length,
        additionsColor: "#F96157",
      };
      agreementBarGraphArray.push(tempObject);
    }
    const sortedArray = agreementBarGraphArray.sort(
      (a, b) => Date.parse(a.validDate) - Date.parse(b.validDate)
    );
    return sortedArray.slice(-12);
  };
}

export default AgreementStore;
