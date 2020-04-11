import { createStyles, ListItem, makeStyles, Theme } from "@material-ui/core";
import React from "react";
import { useDispatch } from "react-redux";
import { HistoryState } from "stores/historyState";
import { changeHistory } from "actions/historyAction";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    active: {
      background: theme.palette.grey[200]
    }
  })
);

type HistoryProps = HistoryState & {
  active: boolean;
  no: number;
};

const History: React.FC<HistoryProps> = props => {
  const dispatch = useDispatch();

  const selectHistoryHandler = (): void => {
    dispatch(changeHistory(props.no));
  };

  const classes = useStyles(props);

  return (
    <div>
      <ListItem
        className={props.active ? classes.active : ""}
        onClick={selectHistoryHandler}
      >
        {props.no}:{props.description}
      </ListItem>
    </div>
  );
};

export default History;
