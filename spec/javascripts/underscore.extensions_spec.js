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
    describe('when the namespace is passed as a single parameter with period separator', function() {
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

    describe('when the namespace is passed as multiple parameters', function() {
      it('should create the namespace', function() {
        var result = {};
        baz = _(result).namespace('foo', 'bar', 'baz');
        baz.property = 'property';
        expect(result.foo.bar.baz).toBeDefined();
        expect(result.foo.bar.baz.property).toBeDefined();
      });

      it('should not overwrite existing namespaces', function() {
        var result = { foo: {a: 'b'}};
        baz = _(result).namespace('foo', 'bar', 'baz');
        expect(result.foo.bar.baz).toBeDefined();
        expect(result.foo.a).toEqual('b');
      });
    });

    describe('when the namespace is passed as an array', function() {
      it('should create the namespace', function() {
        var result = {};
        baz = _(result).namespace(['foo', 'bar', 'baz']);
        baz.property = 'property';
        expect(result.foo.bar.baz).toBeDefined();
        expect(result.foo.bar.baz.property).toBeDefined();
      });

      it('should not overwrite existing namespaces', function() {
        var result = { foo: {a: 'b'}};
        baz = _(result).namespace(['foo', 'bar', 'baz']);
        expect(result.foo.bar.baz).toBeDefined();
        expect(result.foo.a).toEqual('b');
      });
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
    it("should pluralize a model name", function() {
      expect(_('point').pluralize()).toEqual('points');
      expect(_('story').pluralize()).toEqual('stories');
    });

    it('should pass the skip option', function() {
      expect(_('foo').pluralize({skip: 'foo'})).toEqual('foo');
    });

    describe('when a number is provided', function() {
      it('should not pluralize when the number is 1', function() {
        expect(_('foo').pluralize(0)).toEqual('foos');
        expect(_('foo').pluralize(1)).toEqual('foo');
        expect(_('foo').pluralize(2)).toEqual('foos');
      });

      it('should pass the skip option', function() {
        expect(_('foo').pluralize(2, {skip: 'bar'})).toEqual('foos');
        expect(_('foo').pluralize(2, {skip: 'foo'})).toEqual('foo');
      });
    });
  });

  describe('#singularize', function() {
    it('should singularize a model name', function() {
      expect(_('octopi').singularize()).toEqual('octopus');
      expect(_('stories').singularize()).toEqual('story');
    });

    it('should pass the skip option', function() {
      expect(_('foos').singularize({skip: 'foos'})).toEqual('foos');
    });
  });
});
