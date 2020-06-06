import { List } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "stores/rootState";
import History from "./History";

const Histories: React.FC = () => {
  const histories = useSelector((state: RootState) => {
    return state.history;
  });

  const historyItems = [...histories.histories]
    .map((history, index) => {
      return (
        <History
          key={history.id}
          active={histories.no === index}
          no={index}
          {...history}
        ></History>
      );
    })
    .reverse();

  return (
    <div>
      <List
        style={{ maxHeight: "300px", minHeight: "150px", overflow: "auto" }}
      >
        {historyItems}
      </List>
    </div>
  );
};

export default Histories;
