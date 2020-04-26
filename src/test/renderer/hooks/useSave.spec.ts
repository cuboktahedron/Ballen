import { useSelector } from "react-redux";
import useSave from "renderer/hooks/useSave";
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
            color: "010203",
            id: 0,
            name: "layer-0",
            visible: true,
            imageData: new ImageData(1, 1)
          },
          {
            color: "000000ff",
            id: 1,
            name: "layer-1",
            visible: false,
            imageData: new ImageData(1, 1)
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
            color: "010203",
            imageDataBase64: btoa(String.fromCharCode(...new ImageData(1, 1).data)),
            name: "layer-0"
          },
          {
            color: "000000ff",
            imageDataBase64: btoa(String.fromCharCode(...new ImageData(1, 1).data)),
            name: "layer-1"
          }
        ]
      }
    };

    const actual: string = useSave();
    expect(actual).toBe(JSON.stringify(expected));
  });
});
