(function(_) {
  if (_.str && _.str.exports) {
    _.mixin(_.str.exports());
  }

  function namespace(obj, ns) {
    return _(ns).inject(function(base, n) {
      var _baseN = _(base[n]);
      if (_baseN.isUndefined() || _baseN.isNull()) {
        base[n] = {};
      }
      return base[n];
    }, obj);
  }

  _.mixin({
    classify: function(str) {
      var s = _(str).trim().replace(/(\-|_|\s)+(.)?/g, function(match, separator, chr) {
        return chr ? chr.toUpperCase() : '';
      });
      return s.charAt(0).toUpperCase() + s.substring(1);
    },
    except: function(obj) {
      if (obj === null) { return obj; }
      var args;
      if (arguments.length === 2 && _(arguments[1]).isArray()) {
        args = arguments[1];
      } else {
        args = Array.prototype.slice.call(arguments, 1);
      }
      var result = _(obj).clone();
      _(args).each(function(arg) {
        delete result[arg];
      });
      return result;
    },
    namespace: function(obj, ns) {
      if (arguments.length === 2) {
        if (_(ns).isArray()) {
          return namespace(obj, ns);
        } else {
          return namespace(obj, ns.split('.'));
        }
      } else {
        return namespace(obj, Array.prototype.slice.call(arguments, 1));
      }
    },
    only: function(obj) {
      function only() {
        var args = _(arguments);
        return _(obj).inject(function(result, value, key) {
          if (args.include(key)) {
            result[key] = value;
          }
          return result;
        }, {});
      }
      if (arguments.length === 2 && _(arguments[1]).isArray()) {
        return only.apply(_, arguments[1]);
      } else {
        return only.apply(_, Array.prototype.slice.call(arguments, 1));
      }
    },
    pluralize: function(string, number, options) {
      options = options || {};
      var result = parseInt(number, 10);
      return result + (options.includeSpace ? ' ' : '') + string + (result === 1 ? '' : 's');
    }
  });
})(_);
