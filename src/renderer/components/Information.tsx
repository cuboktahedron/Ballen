import { Box, createStyles, makeStyles } from "@material-ui/core";
import React, { ReactNode } from "react";
import { useSelector } from "react-redux";
import { RootState } from "stores/rootState";

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      minHeight: "40px",
      paddingLeft: "1rem"
    },

    info: {
      margin: 0
    }
  })
);

export const Information: React.FC = () => {
  const state = useSelector((state: RootState) => state);
  const tool = state.tools;

  const classes = useStyles();

  const messages = (): ReactNode => {
    const infos: ReactNode[] = [];
    if (tool.rect) {
      const [origin, to] = tool.rect;
      const diffX = Math.abs(origin.x - to.x);
      const diffY = Math.abs(origin.y - to.y);

      infos.push(
        <p
          key={1}
          className={classes.info}
        >{`${origin.x}, ${origin.y} ${to.x}, ${to.y} (${diffX} x ${diffY})`}</p>
      );
    } else if (tool.coords) {
      const { x, y } = tool.coords;
      infos.push(<p key={1} className={classes.info}>{`${x}, ${y}`}</p>);
    } else {
      infos.push(
        <p key={1} className={classes.info}>
          {""}
        </p>
      );
    }

    return infos;
  };

  return (
    <Box className={classes.root}>
      <Box>{messages}</Box>
    </Box>
  );
};
