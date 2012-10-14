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

  function mergeSort(array, comparison) {
    function merge(left, right, comparison) {
      var result = [];
      while ((left.length > 0) && (right.length > 0)) {
        if (comparison(left[0], right[0]) <= 0) {
          result.push(left.shift());
        } else {
          result.push(right.shift());
        }
      }
      while (left.length > 0) {
        result.push(left.shift());
      }
      while (right.length > 0) {
        result.push(right.shift());
      }
      return result;
    }

    if (array.length < 2) {
      return array;
    }
    var middle = Math.ceil(array.length / 2);
    return merge(mergeSort(array.slice(0, middle), comparison), mergeSort(array.slice(middle), comparison), comparison);
  }

  _.mixin({
    classify: function(str) {
      var s = _(str).trim().replace(/(\-|_|\s)+(.)?/g, function(match, separator, chr) {
        return chr ? chr.toUpperCase() : '';
      });
      return s.charAt(0).toUpperCase() + s.substring(1);
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
    stableSortBy: function(obj, val, context) {
      var iterator = _.isFunction(val) ? val : function(obj) {
        return obj[val];
      };
      var toSort = _.map(obj, function(value, index, list) {
        return {
          value: value,
          criteria: iterator.call(context, value, index, list)
        };
      });
      var comparator = function(left, right) {
        var a = left.criteria, b = right.criteria;
        if (a === void 0) {
          return 1;
        }
        if (b === void 0) {
          return -1;
        }
        return a < b ? -1 : a > b ? 1 : 0;
      };

      toSort = mergeSort(toSort, comparator);
      return _.pluck(toSort, 'value');
    }
  });

  if (this.InflectionJS) {
    _.mixin({
      pluralize: function(obj, number, options) {
        if (!_(number).isNumber()) {
          options = number;
          number = 0;
        }
        options = options || {};
        if (number === 1) {
          options.skip = obj;
        }
        options.skip = options.skip || '';
        return InflectionJS.apply_rules(obj, InflectionJS.plural_rules, options.skip);
      },
      singularize: function(obj, options) {
        options = options || {};
        options.skip = options.skip || '';
        return InflectionJS.apply_rules(obj, InflectionJS.singular_rules, options.skip);
      }
    });
  }
})(_);
