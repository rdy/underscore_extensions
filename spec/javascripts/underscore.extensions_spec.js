describe('_', function() {
  describe('#namespace', function() {
    describe('when the namespace is passed as a single parameter with period separator', function() {
      it('should create the namespace', function() {
        var result = {};
        baz = _.namespace(result, 'foo.bar.baz');
        baz.property = 'property';
        expect(result.foo.bar.baz).toBeDefined();
        expect(result.foo.bar.baz.property).toBeDefined();
      });

      it('should not overwrite existing namespaces', function() {
        var result = { foo: {a: 'b'}};
        baz = _.namespace(result, 'foo.bar.baz');
        expect(result.foo.bar.baz).toBeDefined();
        expect(result.foo.a).toEqual('b');
      });
    });

    describe('when the namespace is passed as multiple parameters', function() {
      it('should create the namespace', function() {
        var result = {};
        baz = _.namespace(result, 'foo', 'bar', 'baz');
        baz.property = 'property';
        expect(result.foo.bar.baz).toBeDefined();
        expect(result.foo.bar.baz.property).toBeDefined();
      });

      it('should not overwrite existing namespaces', function() {
        var result = { foo: {a: 'b'}};
        baz = _.namespace(result, 'foo', 'bar', 'baz');
        expect(result.foo.bar.baz).toBeDefined();
        expect(result.foo.a).toEqual('b');
      });
    });

    describe('when the namespace is passed as an array', function() {
      it('should create the namespace', function() {
        var result = {};
        baz = _.namespace(result, ['foo', 'bar', 'baz']);
        baz.property = 'property';
        expect(result.foo.bar.baz).toBeDefined();
        expect(result.foo.bar.baz.property).toBeDefined();
      });

      it('should not overwrite existing namespaces', function() {
        var result = { foo: {a: 'b'}};
        baz = _.namespace(result, ['foo', 'bar', 'baz']);
        expect(result.foo.bar.baz).toBeDefined();
        expect(result.foo.a).toEqual('b');
      });
    });
  });

  describe('#has', function() {
    it('should check each property on the object', function() {
      var obj = {foo: {bar: {baz: true}}};
      expect(_.has(obj, 'foo', 'fizz')).toBe(false);
      expect(_.has(obj, 'foo', 'bar', 'baz')).toBe(true);
      expect(_.has(obj, 'foo', 'bar', 'baz', 'buzz')).toBe(false);
    });

    it('should check array arguments on the object', function() {
      var obj = {foo: {bar: {baz: true}}};
      expect(_.has(obj, ['foo', 'fizz'])).toBe(false);
      expect(_.has(obj, ['foo', 'bar', 'baz'])).toBe(true);
      expect(_.has(obj, ['foo', 'bar', 'baz', 'buzz'])).toBe(false);
    });
  });

  describe('#pluralize', function() {
    it("should pluralize a model name", function() {
      expect(_.pluralize('point')).toEqual('points');
      expect(_.pluralize('story')).toEqual('stories');
    });

    it('should pass the skip option', function() {
      expect(_.pluralize('foo', {skip: 'foo'})).toEqual('foo');
    });

    describe('when a number is provided', function() {
      it('should not pluralize when the number is 1', function() {
        expect(_.pluralize('foo', 0)).toEqual('foos');
        expect(_.pluralize('foo', 1)).toEqual('foo');
        expect(_.pluralize('foo', 2)).toEqual('foos');
      });

      it('should pass the skip option', function() {
        expect(_.pluralize('foo', 2, {skip: 'bar'})).toEqual('foos');
        expect(_.pluralize('foo', 2, {skip: 'foo'})).toEqual('foo');
      });
    });
  });

  describe('#singularize', function() {
    it('should singularize a model name', function() {
      expect(_.singularize('octopi')).toEqual('octopus');
      expect(_.singularize('stories')).toEqual('story');
    });

    it('should pass the skip option', function() {
      expect(_.singularize('foos', {skip: 'foos'})).toEqual('foos');
    });
  });
});
