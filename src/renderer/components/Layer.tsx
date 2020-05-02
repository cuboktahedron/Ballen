import {
  Box,
  Button,
  createStyles,
  FormControl,
  IconButton,
  ListItem,
  makeStyles,
  NativeSelect,
  TextField,
  Theme
} from "@material-ui/core";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import { changeBlend, changeName, toggleVisible } from "actions/layerAction";
import {
  beginMovingLayer,
  changeActiveLayer,
  completeMovingLayer,
  endMovingLayer,
  moveLayer
} from "actions/layersAction";
import React, { SyntheticEvent, useRef } from "react";
import {
  DragObjectWithType,
  DropTargetMonitor,
  useDrag,
  useDrop
} from "react-dnd";
import { useDispatch, useSelector } from "react-redux";
import { useActiveLayer } from "renderer/hooks/useActiveLayer";
import { DndItemTypes } from "renderer/lib/dndTypes";
import {
  LayerBlend,
  LayerState,
  LB_MULTIPLY,
  LB_NORMAL
} from "stores/layerState";
import { RootState } from "stores/rootState";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    active: {
      background: theme.palette.grey[200]
    },

    btnColor: (props: LayerProps) => ({
      background: props.color,
      borderColor: "#000",
      borderStyle: "solid",
      borderWidth: 1,
      height: 32,
      marginLeft: 4,
      marginRight: 4,
      minWidth: 32,
      width: 32
    })
  })
);

type LayerProps = LayerState & {
  active: boolean;
  index: number;
};

type DragItem = DragObjectWithType & {
  fromIndex: number;
  index: number;
  layerId: number;
};

const Layer: React.FC<LayerProps> = props => {
  const ref = useRef<HTMLDivElement>(null);
  const layers = useSelector((state: RootState) => state.layers);
  const activeLayer = useActiveLayer();
  const dispatch = useDispatch();

  const checkWhetherMoveOrNotMove = (
    item: DragItem,
    monitor: DropTargetMonitor
  ): boolean => {
    if (!ref.current) {
      return false;
    }

    const dragIndex = item.index;
    const hoverIndex = props.index;

    if (dragIndex === hoverIndex) {
      return false;
    }

    const hoverBoundingRect = ref.current.getBoundingClientRect();
    const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
    const clientOffset = monitor.getClientOffset();
    if (clientOffset === null) {
      return false;
    }

    const hoverClientY = clientOffset.y - hoverBoundingRect.top;
    if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
      return false;
    }
    if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
      return false;
    }

    return true;
  };

  const [, drop] = useDrop({
    accept: DndItemTypes.LAYER,
    drop(item: DragItem) {
      if (item.fromIndex === item.index) {
        return;
      }

      dispatch(completeMovingLayer(item.fromIndex, item.index, layers.layers));
    },

    hover(item: DragItem, monitor) {
      if (layers.unsettledLayers === null) {
        return;
      }

      if (!checkWhetherMoveOrNotMove(item, monitor)) {
        return;
      }

      const dragIndex = item.index;
      const hoverIndex = props.index;

      dispatch(moveLayer(dragIndex, hoverIndex, layers.unsettledLayers));

      item.index = hoverIndex;
    }
  });
  const [{ isDragging }, drag] = useDrag({
    item: {
      type: DndItemTypes.LAYER,
      fromIndex: props.index,
      index: props.index,
      layerId: props.id
    },
    begin: () => {
      dispatch(beginMovingLayer(layers.layers));
    },
    end: () => {
      dispatch(endMovingLayer());
    },
    collect: monitor => ({
      isDragging: !!monitor.isDragging()
    })
  });

  const dragStyle = {
    opacity: isDragging ? 0.5 : 1
  };

  const selectLayerHandler = (): void => {
    if (props.id === activeLayer.id) {
      return;
    }

    dispatch(changeActiveLayer(props.id));
  };

  const toggleVisibleHandler = (e: SyntheticEvent<HTMLElement>): void => {
    selectLayerHandler();
    dispatch(toggleVisible(props.id));

    e.stopPropagation();
  };

  const handleBlurName = (e: React.FocusEvent<HTMLInputElement>): void => {
    const value = e.currentTarget.value;

    if (props.name !== value) {
      dispatch(changeName(activeLayer.id, value));
    }
  };

  const handleChangeBlend = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    const value = e.currentTarget.value as LayerBlend;

    if (props.blend !== value) {
      dispatch(changeBlend(activeLayer.id, value));
    }
  };

  const classes = useStyles(props);

  let visibilityButton: JSX.Element;
  if (props.visible) {
    visibilityButton = (
      <IconButton onClick={toggleVisibleHandler}>
        <VisibilityIcon />
      </IconButton>
    );
  } else {
    visibilityButton = (
      <IconButton onClick={toggleVisibleHandler}>
        <VisibilityOffIcon />
      </IconButton>
    );
  }

  drag(drop(ref));

  return (
    <div ref={ref}>
      <ListItem
        className={props.active ? classes.active : ""}
        onClick={selectLayerHandler}
        style={dragStyle}
      >
        <Box>
          {visibilityButton}
          <Button className={classes.btnColor}>{""}</Button>
        </Box>
        <TextField
          defaultValue={props.name}
          inputProps={{ maxLength: 32 }}
          onBlur={handleBlurName}
        />
        <FormControl>
          <NativeSelect
            name="blend"
            value={props.blend}
            onChange={handleChangeBlend}
            style={{ marginLeft: "8px" }}
          >
            <option value={LB_NORMAL}>normal</option>
            <option value={LB_MULTIPLY}>multiply</option>
          </NativeSelect>
        </FormControl>
      </ListItem>
    </div>
  );
};

export default Layer;
