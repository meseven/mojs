
/* istanbul ignore next */
var Swirl, Transit,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Transit = require('./transit');

Swirl = (function(_super) {
  __extends(Swirl, _super);

  function Swirl() {
    return Swirl.__super__.constructor.apply(this, arguments);
  }

  Swirl.prototype.skipPropsDelta = {
    x: 1,
    y: 1
  };

  Swirl.prototype.vars = function() {
    Swirl.__super__.vars.apply(this, arguments);
    return !this.o.isSwirlLess && this.generateSwirl();
  };

  Swirl.prototype.extendDefaults = function() {
    var ang, x, xDelta, y, yDelta, _base, _base1;
    Swirl.__super__.extendDefaults.apply(this, arguments);
    x = this.getPosValue('x');
    y = this.getPosValue('y');
    xDelta = Math.abs(x.delta);
    yDelta = Math.abs(y.delta);
    ang = yDelta === 0 || xDelta === 0 ? 1 : yDelta / xDelta;
    this.positionDelta = {
      radius: Math.sqrt(xDelta * xDelta + yDelta * yDelta),
      angle: 90 + Math.atan(ang) * (180 / Math.PI),
      x: x,
      y: y
    };
    this.props.x = "" + x.start + x.units;
    this.props.y = "" + y.start + y.units;
    if ((_base = this.o).angleShift == null) {
      _base.angleShift = 0;
    }
    if ((_base1 = this.o).radiusScale == null) {
      _base1.radiusScale = 1;
    }
    this.props.angleShift = this.h.parseIfRand(this.o.angleShift);
    return this.props.radiusScale = this.h.parseIfRand(this.o.radiusScale);
  };

  Swirl.prototype.getPosValue = function(name) {
    var optVal, val;
    optVal = this.o[name];
    if (optVal && typeof optVal === 'object') {
      val = this.h.parseDelta(name, optVal);
      return {
        start: val.start.value,
        end: val.end.value,
        delta: val.delta,
        units: val.end.unit
      };
    } else {
      val = parseFloat(optVal || this.defaults[name]);
      return {
        start: val,
        end: val,
        delta: 0,
        units: 'px'
      };
    }
  };

  Swirl.prototype.setProgress = function(progress) {
    var angle, point;
    angle = this.positionDelta.angle + this.props.angleShift;
    if (!this.o.isSwirlLess) {
      angle += this.getSwirl(progress);
    }
    point = this.h.getRadialPoint({
      angle: angle,
      radius: this.positionDelta.radius * progress * this.props.radiusScale,
      center: {
        x: this.positionDelta.x.start,
        y: this.positionDelta.y.start
      }
    });
    this.props.x = point.x.toFixed(4) + this.positionDelta.y.units;
    this.props.y = point.y.toFixed(4) + this.positionDelta.y.units;
    return Swirl.__super__.setProgress.apply(this, arguments);
  };

  Swirl.prototype.generateSwirl = function() {
    var _base, _base1;
    this.props.signRand = this.h.rand(0, 1) ? -1 : 1;
    if ((_base = this.o).swirlSize == null) {
      _base.swirlSize = 10;
    }
    if ((_base1 = this.o).swirlFrequency == null) {
      _base1.swirlFrequency = 3;
    }
    this.props.swirlSize = this.h.parseIfRand(this.o.swirlSize);
    return this.props.swirlFrequency = this.h.parseIfRand(this.o.swirlFrequency);
  };

  Swirl.prototype.getSwirl = function(progress) {
    return this.props.signRand * this.props.swirlSize * Math.sin(this.props.swirlFrequency * progress);
  };

  return Swirl;

})(Transit);


/* istanbul ignore next */

if ((typeof define === "function") && define.amd) {
  define("Swirl", [], function() {
    return Swirl;
  });
}

if ((typeof module === "object") && (typeof module.exports === "object")) {
  module.exports = Swirl;
}


/* istanbul ignore next */

if (typeof window !== "undefined" && window !== null) {
  if (window.mojs == null) {
    window.mojs = {};
  }
}

if (typeof window !== "undefined" && window !== null) {
  window.mojs.Swirl = Swirl;
}