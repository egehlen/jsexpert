const Fibonacci = require('./fibonacci')
const sinon = require('sinon')
const assert = require('assert')

;

(async() => {


    {
        // Arrange
        const fibonacci = new Fibonacci();
        const spy = sinon.spy(fibonacci, fibonacci.execute.name);
        const expectedCallCount = 4;

        // Act
        for await (const i of fibonacci.execute(3)) {}

        // Assert
        assert.deepStrictEqual(spy.callCount, expectedCallCount);
    }

    {
        const fibonacci = new Fibonacci();
        const spy = sinon.spy(fibonacci, fibonacci.execute.name);
        const [...results] = fibonacci.execute(5);

        /*  Execution order:
                Call 0: input = 5, current = 0, next = 1
                Call 1: input = 4, current = 1, next = 1
                Call 2: input = 3, current = 1, next = 2
                Call 3: input = 2, current = 2, next = 3
                Call 4: input = 1, current = 3, next = 5
                Call 5: input = 0 ==> STOP
        */

        const { args } = spy.getCall(2);
        const expectedResults = [0, 1, 1, 2, 3];
        const expectedArgs = Object.values({
            input: 3,
            current: 1,
            next: 2
        });

        assert.deepStrictEqual(args, expectedArgs);
        assert.deepStrictEqual(results, expectedResults);
    }

})();