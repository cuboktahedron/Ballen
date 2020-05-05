import { useSelector } from "react-redux";
import useSave from "renderer/hooks/useSave";
import { LB_MULTIPLY, LB_NORMAL } from "stores/layerState";
import { InitialRootState, RootState } from "stores/rootState";

jest.mock("react-redux");
const useSelectorMock = useSelector as jest.Mock<RootState>;

describe("useSave", () => {
  beforeEach(() => {
    useSelectorMock.mockReturnValue({
      ...InitialRootState,
      layers: {
        layerIdSequence: 100,
        activeLayerId: 2,
        layers: [
          {
            id: 0,
            blend: LB_NORMAL,
            color: "010203",
            imageData: new ImageData(1, 1),
            name: "layer-0",
            opacity: 100,
            visible: true
          },
          {
            id: 1,
            blend: LB_MULTIPLY,
            color: "000000ff",
            imageData: new ImageData(1, 1),
            name: "layer-1",
            opacity: 50,
            visible: false
          }
        ],
        unsettledLayers: null,
        size: {
          x: 1,
          y: 1
        }
      }
    });
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("should make json", () => {
    const expected = {
      layers: {
        size: { x: 1, y: 1 },
        layers: [
          {
            blend: LB_NORMAL,
            color: "010203",
            imageDataBase64: btoa(String.fromCharCode(...new ImageData(1, 1).data)),
            name: "layer-0",
            opacity: 100
          },
          {
            blend: LB_MULTIPLY,
            color: "000000ff",
            imageDataBase64: btoa(String.fromCharCode(...new ImageData(1, 1).data)),
            name: "layer-1",
            opacity: 50
          }
        ]
      }
    };

    const actual: string = useSave();
    expect(actual).toBe(JSON.stringify(expected));
  });
});
