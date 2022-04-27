const cc = $global.cc

if (cc && (cc.Label || cc.LabelComponent)) {
  const gfx = cc.gfx;
  var Label = cc.Label || cc.LabelComponent;
  // var isDevTool = $global.__globalAdapter.isDevTool; // shared label canvas

  var _sharedLabelCanvas = $global.document.createElement('canvas');

  var _sharedLabelCanvasCtx = _sharedLabelCanvas.getContext('2d');

  var canvasData = {
    canvas: _sharedLabelCanvas,
    context: _sharedLabelCanvasCtx
  };

  if (cc.game && cc.game.EVENT_ENGINE_INITED) {
    cc.game.on(cc.game.EVENT_ENGINE_INITED, function () {
      Object.assign(Label._canvasPool, {
        get: function get() {
          return canvasData;
        },
        put: function put() {// do nothing
        }
      });
    });
  }

  const _originUpdateMaterial = Label.prototype._updateMaterialWebgl; // fix ttf font black border
  Object.assign(Label.prototype, {
    _updateMaterialWebgl: function _updateMaterialWebgl() {
      _originUpdateMaterial.call(this); // init blend factor

      var material = this._materials[0];

      if (!this._frame || !material) {
        return;
      }

      var dstBlendFactor = cc.macro.BlendFactor.ONE_MINUS_SRC_ALPHA;
      var srcBlendFactor;

      if (!($global.__globalAdapter.isDevTool || this.font instanceof cc.BitmapFont)) {
        // Premultiplied alpha on runtime
        srcBlendFactor = cc.macro.BlendFactor.ONE;
      } else {
        srcBlendFactor = cc.macro.BlendFactor.SRC_ALPHA;
      } // set blend func

      material.effect.setBlend(true, gfx.BLEND_FUNC_ADD, srcBlendFactor, dstBlendFactor, gfx.BLEND_FUNC_ADD, srcBlendFactor, dstBlendFactor);
    }
  });
}
