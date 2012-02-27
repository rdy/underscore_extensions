describe('_', function() {
  describe('#classify', function() {
    it('should return a string camelized with capital letters', function() {
      expect(_('the_quick_brown_fox').classify()).toEqual('TheQuickBrownFox');
    });
  });

  describe('#except', function() {
    it('should return the object without the keys specified', function() {
      expect(_({a: 'a', b: 'b', c: 'c'}).except('b', 'c')).toEqual({a: 'a'});
    });

    describe('when the keys are specified as an array', function() {
      it('should return the object without the keys specified', function() {
        expect(_({a: 'a', b: 'b', c: 'c'}).except(['b', 'c'])).toEqual({a: 'a'});
      });
    });
  });

  describe('#namespace', function() {
    it('should create the namespace', function() {
      var result = {};
      baz = _(result).namespace('foo.bar.baz');
      baz.property = 'property';
      expect(result.foo.bar.baz).toBeDefined();
      expect(result.foo.bar.baz.property).toBeDefined();
    });

    it('should not overwrite existing namespaces', function() {
      var result = { foo: {a: 'b'}};
      baz = _(result).namespace('foo.bar.baz');
      expect(result.foo.bar.baz).toBeDefined();
      expect(result.foo.a).toEqual('b');
    });
  });

  describe('#only', function() {
    it('should return an empty object if no keys are specified', function() {
      expect(_({a: 'a', b: 'b', c: 'c'}).only()).toEqual({});
    });

    it('should return the object only the keys specified', function() {
      expect(_({a: 'aa', b: 'bb', c: 'cc'}).only('a', 'c')).toEqual({a: 'aa', c: 'cc'});
    });

    describe('when the keys are specified as an array', function() {
      it('should return an empty object if no keys are specified', function() {
        expect(_({a: 'a', b: 'b', c: 'c'}).only([])).toEqual({});
      });

      it('should return the object only the keys specified', function() {
        expect(_({a: 'aa', b: 'bb', c: 'cc'}).only(['a', 'c'])).toEqual({a: 'aa', c: 'cc'});
      });
    });
  });

  describe('#pluralize', function() {
    it('should use a space when includeSpace is passed in the options', function() {
      expect(_('point').pluralize(2, {includeSpace: true})).toEqual('2 points');
    });

    it('should return a pluralized string based on the number', function() {
      expect(_('point').pluralize(0)).toEqual('0points');
      expect(_('point').pluralize(1)).toEqual('1point');
      expect(_('point').pluralize(2)).toEqual('2points');
    });
  });
});
