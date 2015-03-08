/*
 (c) 2014, Fedor Baart
 Leaflet.canvasdraw, a canvas draw layer
 https://github.com/SiggyF/Leaflet.canvasdraw
*/

L.CanvasDrawLayer = L.GridLayer.extend({
    _fabs: {},
    createTile: function (coords, done) {
        var id = "canvas_" + coords.x + "_" + coords.y + "_" + coords.z;
        var fab = new fabric.Canvas(id,{});

        var tile = fab.getElement().parentElement;
        tile.id = id;
        tile.dataset.x = coords.x;
        tile.dataset.y = coords.y;
        tile.dataset.z = coords.z;
        tile.onload = L.bind(this._tileOnLoad, this, done, tile);
        tile.onerror = L.bind(this._tileOnError, this, done, tile);
        this._fabs[tile.id] = fab;
        return tile;
    },
    _tileOnLoad: function (done, tile) {
        done(null, tile);
    },

    _tileOnError: function (done, tile, e) {
        done(e, tile);
    }
});


L.canvasDrawLayer = function (options) {
    return new L.CanvasDrawLayer(options);
};