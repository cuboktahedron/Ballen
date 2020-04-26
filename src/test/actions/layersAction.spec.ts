import { loadLayers, LoadLayersAction, LOAD_LAYERS } from "actions/layersAction";

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
              "color":"010203",
              "imageDataBase64":"AAAAAA==",
              "name":"layer-0"
            },
            {
              "color":"000000ff",
              "imageDataBase64":"AAAAAA==",
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
              color: "010203",
              imageData: new ImageData(1, 1),
              name: "layer-0"
            },
            {
              color: "000000ff",
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
