import axios from "axios";
import configs from "../data/configs.json";
export class ConfigStore {
  constructor() {}

  getGeneralConfigData = () => {
    // const configs = await this.configsPromise;
    const map = new Map();
    configs.forEach((item) => {
      const shortObject = {
        configId: item.id,
        configTitle: item.name,
        configTypeId: item.type.id,
        configType: item.type.name,
        activeFlag: item.activeFlag,
        companyName: item.company.name,
        dateEntered: item._info.dateEntered.toString().split("T")[0],
        contactId: item.contact === undefined ? 0 : item.contact.id,
        contactName: item.contact === undefined ? "" : item.contact.name,
        siteId: item.site.id,
        siteName: item.site.name,
        warrantyExpirationDate: item.warrantyExpirationDate,
        billFlag: item.billFlag,
        tech: item._info.enteredBy,
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

  getConfigsByCompanyId = (id, configs) => {
    for (let [key, value] of configs) {
      if (parseInt(key.split("*")[0]) === id) {
        const companyObject = {
          companyId: parseInt(key.split("*")[0]),
          companyName: key.split("*")[1],
          configs: value,
        };
        return companyObject;
      }
    }
  };

  getConfigTableData = (configs) => {
    const tableDataArray = [];
    for (let [key, value] of configs) {
      let activeConfigs = 0;
      let inActiveConfigs = 0;
      let quarterExpiring = 0;
      let yearlyExpiring = 0;
      let expiredConfigs = 0;
      let expiryDate;
      let todayDate;
      let tech;
      value.forEach((config) => {
        expiryDate = Date.parse(config.warrantyExpirationDate);
        todayDate = Date.parse(new Date());

        if (config.activeFlag === false) {
          inActiveConfigs++;
        } else {
          activeConfigs++;

          if (
            expiryDate - todayDate <= 7884008640 &&
            expiryDate - todayDate > 0
          ) {
            quarterExpiring++;
          }

          if (
            expiryDate - todayDate <= 31556952000 &&
            expiryDate - todayDate > 0
          ) {
            yearlyExpiring++;
          }

          if (expiryDate <= todayDate) {
            expiredConfigs++;
          }
        }
        tech = config.tech;
      });
      const companyObject = {
        companyId: parseInt(key.split("*")[0]),
        companyName: key.split("*")[1],
        activeConfigs: activeConfigs,
        quarterExpiring: quarterExpiring,
        yearlyExpiring: yearlyExpiring,
        expiredConfigs: expiredConfigs,
        tech: tech,
      };
      tableDataArray.push(companyObject);
    }
    return tableDataArray;
  };

  getConfigTotals = (configs) => {
    let active = 0;
    let quarterExpiring = 0;
    let yearlyExpiring = 0;
    let expired = 0;
    let todayDate;
    let expiryDate;

    for (let [key, value] of configs) {
      value.forEach((config) => {
        todayDate = Date.parse(new Date());
        expiryDate = Date.parse(config.warrantyExpirationDate);
        if (config.activeFlag === true) {
          active++;
          if (
            expiryDate - todayDate <= 7884008640 &&
            expiryDate - todayDate > 0
          ) {
            quarterExpiring++;
          }

          if (
            expiryDate - todayDate <= 31556952000 &&
            expiryDate - todayDate > 0
          ) {
            yearlyExpiring++;
          }

          if (expiryDate <= todayDate) {
            expired++;
          }
        }
      });
    }
    const configTotalObject = {
      Active: active,
      Quarter_Expiring: quarterExpiring,
      Yearly_Expiring: yearlyExpiring,
      Expired: expired,
    };
    return configTotalObject;
  };

  getActiveConfigs = (configs) => {
    let activeConfigArray = [];

    for (let [key, value] of configs) {
      value.forEach((config) => {
        if (config.activeFlag === true) {
          activeConfigArray.push(config);
        }
      });
    }
    return activeConfigArray;
  };

  getQuarterExpiringConfigs = (configs) => {
    let quarterExpiringConfigArray = [];
    let todayDate = Date.parse(new Date());
    for (let [key, value] of configs) {
      value.forEach((config) => {
        if (
          Date.parse(
            configs.warrantyExpirationDate - todayDate <= 7884008640 &&
              config.activeFlag === true
          )
        ) {
          quarterExpiringConfigArray.push(config);
        }
      });
    }

    return quarterExpiringConfigArray;
  };

  getYearlyExpiringConfigs = (configs) => {
    let yearlyExpiringConfigArray = [];
    let todayDate = Date.parse(new Date());
    for (let [key, value] of configs) {
      value.forEach((config) => {
        if (
          Date.parse(
            configs.warrantyExpirationDate - todayDate <= 31556952000 &&
              config.activeFlag === true
          )
        ) {
          yearlyExpiringConfigArray.push(config);
        }
      });
    }

    return yearlyExpiringConfigArray;
  };

  getExpiredConfigs = (configs) => {
    let expiredConfigArray = [];
    let todayDate = Date.parse(new Date());
    for (let [key, value] of configs) {
      value.forEach((config) => {
        if (
          Date.parse(config.warrantyExpirationDate) <= todayDate &&
          config.activeFlag === true
        ) {
          expiredConfigArray.push(config);
        }
      });
    }

    return expiredConfigArray;
  };

  getConfigTypeData = (configs) => {
    const map = new Map();
    for (let [key, value] of configs) {
      value.forEach((config) => {
        const key = config.configType;
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

  getConfigStaffData = (configs) => {
    const map = new Map();
    for (let [key, value] of configs) {
      value.forEach((config) => {
        const key = config.tech;
        if (config.activeFlag) {
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

  getPastTweleveMonths = () => {
    let d = new Date();
    let dateArray = [];
    d.setDate(1);
    for (let i = 0; i <= 11; i++) {
      const month =
        d.getMonth() === 0
          ? 12
          : d.getMonth() < 10
          ? `0${d.getMonth()}`
          : d.getMonth();
      const year =
        d.getMonth() === 0 ? d.getFullYear() - 11 : d.getFullYear() - 10;
      dateArray.push(month + "-" + year);
      d.setMonth(d.getMonth() - 1);
    }
    return dateArray;
  };

  getConfigBarGraphData = (configs) => {
    const map = new Map();
    let configBarGraphArray = [];
    for (let [key, value] of configs) {
      value.forEach((config) => {
        const dateEntered = new Date(config.dateEntered);
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
          map.set(key, [config]);
        } else {
          collection.push(config);
        }
      });
    }
    for (let [key, value] of map) {
      let yearlyExpiring = 0;
      let expired = 0;
      let active = 0;
      let todayDate = Date.parse(new Date());
      value.forEach((config) => {
        if (config.activeFlag === true) {
          active++;
        }
        if (
          Date.parse(
            configs.warrantyExpirationDate - todayDate <= 31556952000 &&
              config.activeFlag === true
          )
        ) {
          yearlyExpiring++;
        }
        if (
          Date.parse(config.warrantyExpirationDate) <= todayDate &&
          config.activeFlag === true
        ) {
          expired++;
        }
      });
      let validDate = key.split("-");
      let tempObject = {
        id: key,
        month: key,
        validDate: validDate[1] + "-" + validDate[0],
        yearlyExpiring: yearlyExpiring,
        expired: expired,
        active: active,
        yearlyExpiringColor: "#F96157",
        expiredColor: "#6BBB7C",
        activeColor: "#358ddf",
      };
      configBarGraphArray.push(tempObject);
    }
    const sortedArray = configBarGraphArray.sort(
      (a, b) => Date.parse(a.validDate) - Date.parse(b.validDate)
    );
    return sortedArray.slice(-12);
  };
}

export default ConfigStore;
