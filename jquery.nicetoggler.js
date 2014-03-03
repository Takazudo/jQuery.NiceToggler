/*! jQuery.NiceToggler (https://github.com/Takazudo/jQuery.NiceToggle)
 * lastupdate: 2014-03-03
 * version: 0.1.0
 * author: 'Takazudo' Takeshi Takatsudo <takazudo@gmail.com>
 * License: MIT */
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  (function($) {
    var EveEve, ns;
    EveEve = window.EveEve;
    ns = {};
    ns.NiceToggler = (function(_super) {
      __extends(NiceToggler, _super);

      NiceToggler.defaults = {
        inner: null,
        duration_slideDown: 350,
        duration_slideUp: 350,
        duration_fadeIn: 400,
        easing_slideDown: 'swing',
        easing_slideUp: 'swing',
        delay_fadeIn: 50,
        cls_initiallyOpen: null,
        oninit: null
      };

      function NiceToggler($el, options) {
        var o;
        this.$el = $el;
        o = this.options = $.extend({}, ns.NiceToggler.defaults, options);
        this.visible = false;
        this._prepareEls();
        if (o.oninit) {
          o.oninit(this);
        }
        this._handleInitiallyVisible();
      }

      NiceToggler.prototype.toggle = function() {
        if (this.visible) {
          return this.hide();
        } else {
          return this.show();
        }
      };

      NiceToggler.prototype.show = function() {
        this.visible = true;
        this.trigger('beforeshow');
        this._doSlideDown();
        return this._doInnerFadeIn();
      };

      NiceToggler.prototype.hide = function() {
        this.visible = false;
        this.trigger('beforehide');
        return this._doSlideUp();
      };

      NiceToggler.prototype._prepareEls = function() {
        return this.$inner = $(this.options.inner, this.$el);
      };

      NiceToggler.prototype._calcInnerHeight = function() {
        var h;
        this.$el.stop().show();
        this.$inner.show().css('visibility', 'hidden');
        h = this.$inner.outerHeight();
        this.$inner.hide().css('visibility', 'visible');
        return h;
      };

      NiceToggler.prototype._doSlideDown = function() {
        var o, options, to;
        o = this.options;
        to = {
          height: this._calcInnerHeight()
        };
        options = {
          easing: o.easing_slideDown,
          duration: o.duration_slideDown,
          complete: (function(_this) {
            return function() {
              return _this.$el.height('auto');
            };
          })(this)
        };
        return this.$el.animate(to, options);
      };

      NiceToggler.prototype._doSlideUp = function() {
        var o, options, to;
        o = this.options;
        to = {
          height: 0
        };
        options = {
          duration: o.duration_slideUp,
          easing: o.easing_slideUp,
          complete: (function(_this) {
            return function() {
              _this.$el.hide();
              return _this.trigger('afterhide');
            };
          })(this)
        };
        return this.$el.stop().animate(to, options);
      };

      NiceToggler.prototype._doInnerFadeIn = function() {
        var o;
        o = this.options;
        return setTimeout((function(_this) {
          return function() {
            var initProps, options, to;
            if (!_this.visible) {
              return;
            }
            initProps = {
              opacity: 0,
              display: 'block'
            };
            to = {
              opacity: 1
            };
            options = {
              duration: o.duration_fadeIn,
              complete: function() {
                return _this.trigger('aftershow');
              }
            };
            return _this.$inner.css(initProps).animate(to, options);
          };
        })(this), o.delay_fadeIn);
      };

      NiceToggler.prototype._handleInitiallyVisible = function() {
        var cls;
        cls = this.options.cls_initiallyOpen;
        if (this.$el.hasClass(cls)) {
          return this.visible = true;
        }
      };

      return NiceToggler;

    })(EveEve);
    $.fn.niceToggle = function(options) {
      return this.each(function(i, el) {
        var $el, instance;
        $el = $(el);
        instance = $el.data('nicetoggler');
        if (!instance) {
          instance = new ns.NiceToggler($el, options);
          $el.data('nicetoggler', instance);
        }
        instance.toggle();
      });
    };
    $.NiceTogglerNs = ns;
    return $.NiceToggler = ns.NiceToggler;
  })(jQuery);

}).call(this);
