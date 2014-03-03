do ($ = jQuery) ->

  EveEve = window.EveEve

  ns = {}

  # ============================================================
  # NiceToggler

  class ns.NiceToggler extends EveEve
    
    @defaults =
      inner: null
      duration_slideDown: 350
      duration_slideUp: 350
      duration_fadeIn: 400
      easing_slideDown: 'swing'
      easing_slideUp: 'swing'
      delay_fadeIn: 50
      cls_initiallyOpen: null
      oninit: null
    
    constructor: (@$el, options) ->

      o = @options = $.extend {}, ns.NiceToggler.defaults, options
      @visible = false
      @_prepareEls()
      if o.oninit
        o.oninit this
      @_handleInitiallyVisible()

    toggle: ->

      if @visible
        @hide()
      else
        @show()

    show: ->

      @visible = true
      @trigger 'beforeshow'
      @_doSlideDown()
      @_doInnerFadeIn()

    hide: ->
      
      @visible = false
      @trigger 'beforehide'
      @_doSlideUp()

    # private

    _prepareEls: ->

      @$inner = $(@options.inner, @$el)
    
    _calcInnerHeight: ->

      @$el.stop().show()
      @$inner.show().css 'visibility', 'hidden'
      h = @$inner.outerHeight()
      @$inner.hide().css 'visibility', 'visible'
      return h

    _doSlideDown: ->

      o = @options
      to = height: @_calcInnerHeight()
      options =
        easing: o.easing_slideDown
        duration: o.duration_slideDown
        complete: =>
          @$el.height 'auto'
      @$el.animate to, options

    _doSlideUp: ->

      o = @options
      to =
        height: 0
      options =
        duration: o.duration_slideUp
        easing: o.easing_slideUp
        complete: =>
          @$el.hide()
          @trigger 'afterhide'
      @$el.stop().animate to, options
      

    _doInnerFadeIn: ->

      o = @options
      setTimeout =>
        return unless @visible
        initProps =
          opacity: 0
          display: 'block'
        to =
          opacity: 1
        options =
          duration: o.duration_fadeIn
          complete: =>
            @trigger 'aftershow'
        @$inner
          .css(initProps)
          .animate(to, options)
      , o.delay_fadeIn

    _handleInitiallyVisible: ->
      cls = @options.cls_initiallyOpen
      if @$el.hasClass cls
        @visible = true

  # ============================================================
  # bridge to plugin

  $.fn.niceToggle = (options) ->
    return @each (i, el) ->
      $el = $(el)
      instance = $el.data 'nicetoggler'
      unless instance
        instance = new ns.NiceToggler $el, options
        $el.data 'nicetoggler', instance
      instance.toggle()
      return

  # ============================================================
  # globalify

  $.NiceTogglerNs = ns
  $.NiceToggler = ns.NiceToggler

