describe("core", function () {
  describe("isFunction", function () {
    it("is true if the parameter is a function", function () {
      expect(domToolkit.isFunction(function () {})).to.be.true;
    });

    it("is false if the parameter is not a function", function () {
      expect(domToolkit.isFunction({})).to.be.false;
    });
  });

  describe("resolve", function () {
    it("invokes and returns the result if given a function", function () {
      expect(domToolkit.resolve(1234)).to.equal(1234);
    });

    it("returns the parameter if given a non function", function () {
      var f = function() { return 1234; };
      expect(domToolkit.resolve(f)).to.equal(1234);
    });
  });
});
