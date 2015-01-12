h = require './h'

class Bit
  ns:                   'http://www.w3.org/2000/svg'
  type:                 'line'
  ratio:                1
  defaults:
    radius:             50
    radiusX:            null
    radiusY:            null
    stroke:             'hotpink'
    strokeWidth:        2
    strokeOpacity:      1
    fill:               'transparent'
    fillOpacity:        1
    strokeDasharray:    ''
    strokeDashoffset:   ''
    strokeLinecap:      ''
    x:                  0
    y:                  0
    deg:                0
  constructor:(@o={})-> @init()
  init:-> @vars(); @render(); @
  vars:->
    if @o.ctx and @o.ctx.tagName is 'svg' then @ctx = @o.ctx
    else throw Error 'You should pass a real context(ctx) to the bit'
    @extendDefaults()
    @calcTransform()
  calcTransform:->
    rotate    = "rotate(#{@props.deg}, #{@props.x}, #{@props.y})"
    @props.transform = "#{rotate}"
  extendDefaults:->
    @props ?= {}
    for key, value of @defaults
      @props[key] = @o[key] or value
  setAttr:(attr, value)->
    if typeof attr is 'object'
      for key, val of attr
        # handle camelCase
        key = key.split(/(?=[A-Z])/).join('-').toLowerCase()
        (value or @el).setAttribute key, val
    else @el.setAttribute attr, value
  setProp:(attr, value)->
    if typeof attr is 'object'
      for key, val of attr
        @props[key] = val
    else @props[attr] = value
  render:->
    @isRendered = true
    @el = document.createElementNS @ns, @type or 'line'
    !@o.isDrawLess and @draw()
    @ctx.appendChild @el
  draw:->
    @setAttr
      stroke:           @props.stroke
      strokeWidth:      @props.strokeWidth
      strokeOpacity:    @props.strokeOpacity
      strokeDasharray:  @props.strokeDasharray
      strokeDashoffset: @props.strokeDashoffset
      strokeLinecap:    @props.strokeLinecap
      fill:             @props.fill
      fillOpacity:      @props.fillOpacity
      transform:        @props.transform


### istanbul ignore next ###
if (typeof define is "function") and define.amd
  define "Bit", [], -> Bit
if (typeof module is "object") and (typeof module.exports is "object")
  module.exports = Bit
### istanbul ignore next ###
window?.mojs ?= {}
window?.mojs.Bit = Bit











