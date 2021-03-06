import { loadLayers, LoadLayersAction, LOAD_LAYERS } from "actions/layersAction";
import { LFT_ID, LFT_OPACITY } from "types/filters";
import { LB_MULTIPLY, LB_NORMAL } from "types/layerBlend";

describe("layersAction", () => {
  describe("loadLayers", () => {
    it("should make 'LOAD_LAYERS' action", () => {
      const loadData = JSON.parse(`
        {"layers":
          {
            "size":{
              "x":1,
              "y":1
            },
            "layers":[
              {
                "blend":"normal",
                "color":"010203",
                "filters":[
                  {
                    "property": {
                      "type": "id"
                    }
                  }
                ],
                "imageData":[0,1],
                "name":"layer-0"
              },
              {
                "blend":"multiply",
                "color":"000000ff",
                "filters":[
                  {
                    "property": {
                      "type": "opacity",
                      "option": {
                        "opacity": 50
                      }
                    }
                  },
                  {
                    "property": {
                      "type": "id"
                    }
                  }
                ],
                "imageData":[1],
                "name":"layer-1"
              }
            ]
          }
        }`);

      const expected: LoadLayersAction = {
        type: LOAD_LAYERS,
        payload: {
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
              imageData: ((): ImageData => {
                const imageData = new ImageData(1, 1);
                const data = imageData.data;
                data[0] = 0;
                data[1] = 0;
                data[2] = 0;
                data[3] = 0xff;
                return imageData;
              })(),
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
              imageData: new ImageData(1, 1),
              name: "layer-1"
            }
          ],
          size: { x: 1, y: 1 }
        }
      };

      const actual = loadLayers(loadData.layers);
      expect(actual).toEqual(expected);
    });
  });
});
