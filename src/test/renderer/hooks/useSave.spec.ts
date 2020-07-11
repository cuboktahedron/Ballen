import { SaveData } from "actions/fileAction";
import { useSelector } from "react-redux";
import useSave from "renderer/hooks/useSave";
import { InitialRootState, RootState } from "stores/rootState";
import { LFT_ID, LFT_OPACITY } from "types/filters";
import { LB_MULTIPLY, LB_NORMAL } from "types/layerBlend";

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
            filterIdSequence: 0,
            filters: [
              {
                id: 0,
                property: {
                  type: LFT_ID
                }
              }
            ],
            imageData: ((): ImageData => {
              const imageData = new ImageData(1, 1);
              const data = imageData.data;
              data[0] = 0;
              data[1] = 0;
              data[2] = 0;
              data[3] = 0xff;
              return imageData;
            })(),
            name: "layer-0",
            visible: true
          },
          {
            id: 1,
            blend: LB_MULTIPLY,
            color: "000000ff",
            filterIdSequence: 1,
            filters: [
              {
                id: 0,
                property: {
                  type: LFT_OPACITY,
                  option: {
                    opacity: 50
                  }
                }
              },
              {
                id: 1,
                property: {
                  type: LFT_ID
                }
              }
            ],
            imageData: new ImageData(1, 1),
            name: "layer-1",
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
    const expected: SaveData = {
      layers: {
        size: { x: 1, y: 1 },
        layers: [
          {
            blend: LB_NORMAL,
            color: "010203",
            filters: [
              {
                property: {
                  type: LFT_ID
                }
              }
            ],
            imageData: [0, 1],
            name: "layer-0"
          },
          {
            blend: LB_MULTIPLY,
            color: "000000ff",
            filters: [
              {
                property: {
                  type: LFT_OPACITY,
                  option: {
                    opacity: 50
                  }
                }
              },
              {
                property: {
                  type: LFT_ID
                }
              }
            ],
            imageData: [1],
            name: "layer-1"
          }
        ]
      }
    };

    const actual: string = useSave();
    expect(actual).toBe(JSON.stringify(expected));
  });
});
