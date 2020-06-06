import {
  Collapse,
  createStyles,
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  makeStyles,
  Theme
} from "@material-ui/core";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import React, { useState } from "react";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    header: {
      background: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
      paddingBottom: 0,
      paddingLeft: theme.spacing(2),
      paddingTop: 0
    },

    icon: {
      color: theme.palette.primary.contrastText
    }
  })
);

type ToolPanelProps = {
  title: string;
};

const ToolPanel: React.FC<ToolPanelProps> = props => {
  const classes = useStyles();
  const [panelOpen, setPanelOpen] = useState(true);

  const handlePanelOpenerClick = (): void => {
    setPanelOpen(!panelOpen);
  };

  return (
    <List component="div" disablePadding={true}>
      <ListItem className={classes.header} disableGutters={true}>
        {props.title}
        <ListItemSecondaryAction>
          <IconButton
            className={classes.icon}
            size="small"
            onClick={handlePanelOpenerClick}
          >
            {panelOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
      <Collapse in={panelOpen} timeout="auto">
        <List component="div" disablePadding>
          {props.children}
        </List>
      </Collapse>
    </List>
  );
};

export default ToolPanel;
