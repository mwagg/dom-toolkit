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

  describe("setAttribute", function () {
    var target;

    beforeEach(function () {
      target = {};
    });

    it("sets the attribute on the target to the right value", function () {
      domToolkit.setAttribute(target, "textContent", "Here is some text.");
      expect(target.textContent).to.equal("Here is some text.");
    });

    it("resolves the value when it is a function", function () {
      var value = function () {
        return "Here is some text from a function.";
      };
      domToolkit.setAttribute(target, "textContent", value);
      expect(target.textContent).to.equal("Here is some text from a function.");
    });

    it("resolves the target when it is a function", function () {
      var getTarget = function () {
        return target;
      };
      domToolkit.setAttribute(getTarget, "textContent", "Here is some text from a query function.");
      expect(target.textContent).to.equal("Here is some text from a query function.");
    });

    it("resolves the attribute name when it is a function", function () {
      var attribute = function () {
        return "textContent";
      };
      domToolkit.setAttribute(target, attribute, "Here is some text from an attribute function.");
      expect(target.textContent).to.equal("Here is some text from an attribute function.");
    });
  });
});
