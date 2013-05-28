describe("dom", function () {
  describe("query", function () {
    var element, result;

    beforeEach(function () {
      element = document.createElement("span");
      element.classList.add("an-element");
      fixtureElement().appendChild(element);

      result = domToolkit.query(".an-element");
    });

    it("returns a function", function () {
      expect(result).to.be.a("function");
    });

    it("the function resolves to the matching element", function () {
      expect(result()).to.equal(element);
    });

    it("invoking again executes the query again", function () {
      clearFixture();
      element = document.createElement("span")
      element.classList.add("an-element")
      fixtureElement().appendChild(element);

      expect(result()).to.equal(element);
    });

    describe("when the second parameter is true", function () {
      var returnFromMemoizeCall;

      beforeEach(function () {
        result = domToolkit.query(".an-element", true);
        result();

        clearFixture();
        var newElement = document.createElement("span")
        newElement.classList.add("an-element")
        fixtureElement().appendChild(newElement);
      });

      it("returns the original result on subsequent calls", function () {
        expect(result()).to.equal(element);
      });
    });
  });

  describe("addClass", function () {
    var element, query;

    beforeEach(function () {
      element = document.createElement("span");
      element.id = "the-element";
      fixtureElement().appendChild(element);
      query = domToolkit.query("#the-element");
    });

    it("adds the class to the elements class list", function () {
      domToolkit.addClass(query, "the-class");

      expect([].slice.call(element.classList, 0)).to.include("the-class");
    });

    it("works with raw domToolkit elements", function () {
      domToolkit.addClass(element, "the-class");

      expect([].slice.call(element.classList, 0)).to.include("the-class");
    });

    it("returns the original value fo the element parameter (regardless of if it is a value or function)", function () {
      expect(domToolkit.addClass(element, "the-class")).to.equal(element);
      expect(domToolkit.addClass(query, "the-class")).to.equal(query);
    });

    it("works when className is a function", function () {
      var className = function () {
        return "the-class";
      };

      domToolkit.addClass(query, className);
      expect([].slice.call(element.classList, 0)).to.include("the-class");
    });
  });

  var verifyAttributeSetFunction = function (funcToTest, opts) {
    var attributeName = opts.attributeName,
    valueToSet = opts.valueToSet,
    target, functionUnderTest;

    describe(funcToTest, function () {
      beforeEach(function () {
        target = {};
        functionUnderTest = domToolkit[funcToTest];
      });

      it("is an available function", function () {
        expect(functionUnderTest).to.be.a("function");
      });

      it("sets " + attributeName + " on the target to the right value", function () {
        functionUnderTest(target, valueToSet);
        expect(target[attributeName]).to.equal(valueToSet);
      });

      it("resolves the value when it is a function", function () {
        var value = function () { return valueToSet; };
        functionUnderTest(target, valueToSet);
        expect(target[attributeName]).to.equal(valueToSet);
      });

      it("resolves the target when it is a function", function () {
        var getTarget = function () { return target; };
        functionUnderTest(getTarget, valueToSet);
        expect(target[attributeName]).to.equal(valueToSet);
      });
    });
  };

  verifyAttributeSetFunction("setTextContent", {
    attributeName: "textContent",
    valueToSet: "Here is some text."
  });
});
