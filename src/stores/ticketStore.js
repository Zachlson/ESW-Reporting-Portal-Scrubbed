import axios from "axios";
import tickets from "../data/tickets.json";

export class TicketStore {
  constructor() {}

  getGeneralTicketData = () => {
    const map = new Map();
    tickets.forEach((item) => {
      const shortObject = {
        ticketId: item.id,
        summary: item.summary,
        approved: item.approved,
        closedFlag: item.closedFlag,
        closedDate: item.closedDate.split("T")[0],
        closedBy: item.closedBy,
        companyId: item.company.id,
        companyName: item.company.name,
        contactId: item.contact === undefined ? "" : item.contact.id,
        contactName: item.contact === undefined ? "" : item.contact.name,
        dateResolved: item.dateResolved.split("T")[0],
        departmentId: item.department.id,
        departmentName: item.department.name,
        impact: item.impact,
        priorityId: item.priority.id,
        priorityName: item.priority.name,
        resolveTime:
          (item.resolveMinutes / 60).toFixed(2).toString() + " hours",
        teamId: item.team.id,
        teamName: item.team.name,
        dateEntered: item._info.dateEntered.split("T")[0],
        tech: item._info.enteredBy,
        severity: item.severity,
        type: item.recordType,
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

  getTicketsByCompanyId = (id, tickets) => {
    for (let [key, value] of tickets) {
      if (parseInt(key.split("*")[0]) === id) {
        const companyObject = {
          companyId: parseInt(key.split("*")[0]),
          companyName: key.split("*")[1],
          tickets: value,
        };
        return companyObject;
      }
    }
  };

  getTicketTableData = (tickets) => {
    const tableDataArray = [];
    for (let [key, value] of tickets) {
      let openTickets = 0;
      let closedTickets = 0;
      let agingTickets = 0;
      let recentTickets = 0;
      let todayDate;
      let tech;
      value.forEach((ticket) => {
        todayDate = Date.parse(new Date());

        if (ticket.closedFlag === true) {
          closedTickets++;
        } else {
          openTickets++;

          if (todayDate - ticket.dateEntered > 1296000000) {
            agingTickets++;
          }

          if (todayDate <= ticket.dateEntered + 172800000) {
            recentTickets++;
          }
        }

        tech = ticket.tech;
      });
      const companyObject = {
        companyId: parseInt(key.split("*")[0]),
        companyName: key.split("*")[1],
        closedTickets: closedTickets,
        openTickets: openTickets,
        recentTickets: recentTickets,
        agingTickets: agingTickets,
        tech: tech,
      };
      tableDataArray.push(companyObject);
    }
    return tableDataArray;
  };

  getTicketTotals = (tickets) => {
    let open = 0;
    let recent = 0;
    let closed = 0;
    let aging = 0;
    let todayDate;
    for (let [key, value] of tickets) {
      value.forEach((ticket) => {
        todayDate = Date.parse(new Date());

        if (ticket.closedFlag === true) {
          closed++;
        } else {
          open++;
          if (todayDate - Date.parse(ticket.dateEntered) >= 1296000000) {
            aging++;
          } else if (todayDate - Date.parse(ticket.dateEntered) <= 172800000) {
            recent++;
          }
        }
      });
    }
    return {
      Open: open,
      Recent: recent,
      Aging: aging,
      Closed: closed,
    };
  };

  getOpenTickets = (tickets) => {
    let openTicketArray = [];

    for (let [key, value] of tickets) {
      value.forEach((ticket) => {
        if (!ticket.closedFlag) {
          openTicketArray.push(ticket);
        }
      });
    }
    return openTicketArray;
  };

  getRecentTickets = (tickets) => {
    let newTicketArray = [];
    let todayDate;

    for (let [key, value] of tickets) {
      todayDate = Date.parse(new Date());
      value.forEach((ticket) => {
        if (
          !ticket.closedFlag &&
          todayDate - Date.parse(ticket.dateEntered) <= 172800000
        ) {
          newTicketArray.push(ticket);
        }
      });
    }
    return newTicketArray;
  };

  getClosedTickets = (tickets) => {
    let closedTicketArray = [];
    for (let [key, value] of tickets) {
      value.forEach((ticket) => {
        if (ticket.closedFlag) {
          closedTicketArray.push(ticket);
        }
      });
    }
    return closedTicketArray;
  };

  getAgingTickets = (tickets) => {
    let agingTicketArray = [];
    let todayDate;

    for (let [key, value] of tickets) {
      todayDate = Date.parse(new Date());
      value.forEach((ticket) => {
        if (
          !ticket.closedFlag &&
          todayDate - Date.parse(ticket.dateEntered) >= 1296000000
        ) {
          agingTicketArray.push(ticket);
        }
      });
    }
    return agingTicketArray;
  };

  getTicketTypeData = (tickets) => {
    const map = new Map();
    for (let [key, value] of tickets) {
      value.forEach((ticket) => {
        const key = ticket.type;
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

  getTicketStaffData = (tickets) => {
    const map = new Map();
    for (let [key, value] of tickets) {
      value.forEach((ticket) => {
        const key = ticket.tech;
        if (!ticket.closedFlag) {
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

  getTicketBarGraphData = (tickets) => {
    const map = new Map();
    let ticketBarGraphArray = [];
    for (let [key, value] of tickets) {
      value.forEach((ticket) => {
        const dateEntered = new Date(ticket.dateEntered);
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
          map.set(key, [ticket]);
        } else {
          collection.push(ticket);
        }
      });
    }
    for (let [key, value] of map) {
      let open = 0;
      let closed = 0;
      value.forEach((ticket) => {
        if (ticket.closedFlag === true) {
          closed++;
        } else {
          open++;
        }
      });
      let validDate = key.split("-");
      let tempObject = {
        id: key,
        month: key,
        validDate: validDate[1] + "-" + validDate[0],
        open: open,
        closed: closed,
        openColor: "#F96157",
        closedColor: "#6BBB7C",
      };
      ticketBarGraphArray.push(tempObject);
    }
    const sortedArray = ticketBarGraphArray.sort(
      (a, b) => Date.parse(a.validDate) - Date.parse(b.validDate)
    );
    return sortedArray.slice(-12);
  };
}

export default TicketStore;
