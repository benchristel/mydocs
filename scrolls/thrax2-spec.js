"use strict";

describe('Thrax 2', function() {
    afterEach(function() {
       Thrax2.clearScreen(); 
    });
    
    it("exists", function() {
        expect(Thrax2).not.toBe(undefined);
    });
    
    describe(".given", function() {
        it("returns true when passed (1)", function() {
            expect(Thrax2.given(1)).toBe(true);
        });
        
        it("returns true when passed (null)", function() {
            expect(Thrax2.given(null)).toBe(true);
        });
        
        it("returns false when passed (undefined)", function() {
            expect(Thrax2.given(undefined)).toBe(false);
        });
    });
    
    describe(".missing", function() {
        it("returns false when passed (1)", function() {
            expect(Thrax2.missing(1)).toBe(false);
        });
        
        it("returns false when passed (null)", function() {
            expect(Thrax2.missing(null)).toBe(false);
        });
        
        it("returns true when passed (undefined)", function() {
            expect(Thrax2.missing(undefined)).toBe(true);
        });
    });
    
    describe(".init", function() {
        it("returns its first argument when it is defined", function() {
            var v = 0;
            v = Thrax2.init(v, 1);
            expect(v).toBe(0);
        });
        
        it("returns its second argument when the first is not defined", function() {
            var v;
            v = Thrax2.init(v, 1);
            expect(v).toBe(1);
        });
    });
    
    describe(".isFunction", function() {
        it("returns true when given a function", function() {
            expect(Thrax2.isFunction(function(){})).toBe(true);
        });
        
        it("returns false when given 1", function() {
            expect(Thrax2.isFunction(1)).toBe(false);
        });
    });
    
    describe(".isArray", function() {
        it("returns true when given an array", function() {
            expect(Thrax2.isArray([])).toBe(true);
        });
        
        it("returns false when given an object", function() {
            expect(Thrax2.isArray({})).toBe(false);
        });
    });
    
    describe(".isObject", function() {
        it("returns true when given an object", function() {
            expect(Thrax2.isObject({})).toBe(true);
        });
        
        it("returns true when given an array", function() {
            expect(Thrax2.isObject([])).toBe(true);
        });
        
        it("returns true when given a function", function() {
            expect(Thrax2.isObject(function(){})).toBe(true);
        });
        
        it("returns false when given a string", function() {
            expect(Thrax2.isObject("abc")).toBe(false);
        });
    });
    
    describe(".isNumber", function() {
        it("returns true when given a positive integer", function() {
            expect(Thrax2.isNumber(1)).toBe(true);
        });
        
        it("returns true when given a positive float", function() {
            expect(Thrax2.isNumber(2.4)).toBe(true);
        });
        
        it("returns true when given a negative integer", function() {
            expect(Thrax2.isNumber(-10)).toBe(true);
        });
        
        it("returns true when given a negative float", function() {
            expect(Thrax2.isNumber(-3.4)).toBe(true);
        });
        
        it("returns false when given NaN", function() {
            expect(Thrax2.isNumber(0/0)).toBe(false);
        });
        
        it("returns true when given +Infinity", function() {
            expect(Thrax2.isNumber(1/0)).toBe(true);
        });
        
        it("returns true when given -Infinity", function() {
            expect(Thrax2.isNumber(-1/0)).toBe(true);
        });
        
        it("returns false when given a numeric string", function() {
            expect(Thrax2.isNumber("12")).toBe(false);
        });
    });
    
    describe(".toNumericString", function() {
        it("returns '12' when given (12)", function() {
            expect(Thrax2.toNumericString(12)).toBe('12');
        });
        
        it("returns '-1.5' when given (-1.5)", function() {
            expect(Thrax2.toNumericString(-1.5)).toBe('-1.5');
        });
        
        it("returns '0' when given null", function() {
            expect(Thrax2.toNumericString(null)).toBe('0');
        });
        
        it("returns '0' when given (undefined)", function() {
            expect(Thrax2.toNumericString(undefined)).toBe('0');
        });
        
        it("returns '0' when given (false)", function() {
            expect(Thrax2.toNumericString(false)).toBe('0');
        });
        
        it("returns '1' when given (true)", function() {
            expect(Thrax2.toNumericString(true)).toBe('1');
        });
        
        it("normalizes numeric strings", function() {
            expect(Thrax2.toNumericString('-14.5')).toBe('-14.5');
        });
    });
    
    describe(".toCss", function() {
        it("returns CSS-formatted attr/value pairs when given an object", function() {
            expect(Thrax2.toCss(
                {one: 1, two: 2}
            )).toBe("one:1;two:2;")
        });
    });
    
    describe(".htmlEscape", function() {
        it("escapes angle brackets, ampersands, and quotes", function() {
            expect(Thrax2.htmlEscape(
                '<br>&amp;"hi"'
            )).toBe("&lt;br&gt;&amp;amp;&quot;hi&quot;");
        });
    });
    
    describe(".htmlUnescape", function() {
        it("unescapes angle brackets, ampersands, and quotes", function() {
            expect(Thrax2.htmlUnescape(
                "&lt;br&gt;&amp;amp;&quot;hi&quot;"
            )).toBe('<br>&amp;"hi"');
        });
    });
    
    describe(".cut", function() {
        it("returns two empty arrays given an empty array", function() {
            expect(Thrax2.cut([])).toEqual([[], []])
        });
        
        it("returns two arrays of lengths 2 and 3 given an array of length 5", function() {
            expect(Thrax2.cut([1,2,3,4,5])).toEqual([[1,2], [3,4,5]])
        });
        
        it("returns two arrays of length 2 given an array of length 4", function() {
            expect(Thrax2.cut([1,2,3,4])).toEqual([[1,2], [3,4]])
        });
    });
    
    describe(".copy", function() {
        it("copies arrays", function() {
            var a1 = [1,2,3];
            var a2 = Thrax2.copy(a1);
            a2.push(4);
            expect(a2).toEqual([1,2,3,4])
            expect(a2).not.toEqual(a1);
        });
        
        it("copies objects", function() {
            var o1 = {baz: 'quux'};
            var o2 = Thrax2.copy(o1);
            o2.foo = 'bar';
            expect(o2).toEqual({foo: 'bar', baz: 'quux'});
            expect(o2).not.toEqual(o1);
        });
    });
    
    describe(".merge", function() {
        it("merges the properties of two objects", function() {
            expect(
                Thrax2.merge({a: 1}, {b: 2})
            ).toEqual({a: 1, b: 2})
        });
        
        it("prefers values from the second object to those from the first", function() {
            expect(
                Thrax2.merge({a: 1}, {a: 2})
            ).toEqual({a: 2})
        });
        
        it("destructively modifies the first object", function() {
            var a = {a: 1}
            Thrax2.merge(a, {b: 2})
            expect(a).toEqual({a: 1, b: 2})
        });
    });
    
    describe(".merged", function() {
        it("merges the properties of two objects", function() {
            expect(
                Thrax2.merged({a: 1}, {b: 2})
            ).toEqual({a: 1, b: 2})
        });
        
        it("prefers values from the second object to those from the first", function() {
            expect(
                Thrax2.merged({a: 1}, {a: 2})
            ).toEqual({a: 2})
        });
        
        it("does not destructively modify either object", function() {
            var a = {a: 1}
            var b = {b: 2}
            Thrax2.merged(a, b)
            expect(a).toEqual({a: 1})
            expect(b).toEqual({b: 2})
        });
    });
    
    describe(".call", function() {
        it("calls the given function with the given arguments", function() {
            expect(Thrax2.call(
                function(x, y) { return x + y; },
                [1,2]
            )).toBe(3);
        });
        
        it("uses the third argument as the value of `this`", function() {
            expect(Thrax2.call(
                function() { return this.a },
                [],
                {a: 1}
            )).toBe(1);
        });
        
        it("returns undefined if the first argument is not a function", function() {
            expect(Thrax2.call(
                'foo'
            )).toBe(undefined);
        });
        
        it("calls the function with no arguments if no arguments array is given", function() {
            expect(Thrax2.call(
                function() { return 4; }
            )).toBe(4);
        });
    });
    
    describe(".addProperties", function() {
        it("adds the properties to the object, initializing their values", function() {
            var obj = {};
            Thrax2.addProperties(obj, {foo: null, bar: 5});
            expect(obj.foo).toBe(null);
            expect(obj.bar).toBe(5);
        });
        
        it("makes properties writable by default", function() {
            var obj = {};
            Thrax2.addProperties(obj, {foo: null, bar: 5});
            obj.foo = 1; obj.bar = 2;
            expect(obj.foo).toBe(1);
            expect(obj.bar).toBe(2);
        });
        
        describe("with {writable: false}", function() {
            it("makes attempts to write to the property fail with an error (in strict mode)", function() {
                var obj = {};
                Thrax2.addProperties(obj, {name: 'Uireb'}, {writable: false});
                expect(obj.name).toBe('Uireb');
                
                var caught = false;
                try {
                    obj.name = 'Daffy Duck';
                } catch(e) {
                    caught = true;
                }
                
                expect(caught).toBe(true);
                expect(obj.name).toBe('Uireb');
            });
        });
    });
    
    describe(".aliasProperties", function() {
        beforeEach(function() {
            this.obj = {color: 'red'};
            Thrax2.aliasProperties(this.obj, {colour: 'color'}) 
        });
        
        it("makes accessing the alias the same as accessing the property", function() {
            expect(this.obj.color).toBe('red');
            expect(this.obj.colour).toBe('red');
            this.obj.color = 'blue';
            expect(this.obj.colour).toBe('blue');
        });
        
        it("makes setting the alias the same as setting the property", function() {
            this.obj.colour = 'blue';
            expect(this.obj.color).toBe('blue');
            expect(this.obj.colour).toBe('blue');
        });
    });
    
    describe(".aliasProperties on a non-writable property", function() {
        beforeEach(function() {
            this.obj = {};
            Thrax2.addProperties(this.obj, {color: 'red'}, {writable: false});
            Thrax2.aliasProperties(this.obj, {colour: 'color'});
        });
        
        it("makes accessing the alias the same as accessing the property", function() {
            expect(this.obj.color).toBe('red');
            expect(this.obj.colour).toBe('red');
        });
        
        it("makes the alias non-writable", function() {
            var caught = false;
            try {
                this.obj.colour = 'blue';
            } catch(e) {
                caught = true;
            }
            expect(caught).toBe(true);
            expect(this.obj.color).toBe('red');
            expect(this.obj.colour).toBe('red');
        });
    });
    
    describe("A Thrax text display", function() {
        beforeEach(function() {
            this.elem = Thrax2.createTextDisplay();
            spyOn(this.elem, 'redraw');
        });
        
        it("has a settable text property", function() {
            expect(this.elem.text).not.toBe('it worked');
            this.elem.text = 'it worked';
            expect(this.elem.text).toBe('it worked');
        });
        
        it("calls its redraw method when its properties are changed", function() {
            expect(this.elem.redraw).not.toHaveBeenCalled();
            this.elem.text = 'it worked';
            expect(this.elem.redraw).toHaveBeenCalled();
        });
    });
});
