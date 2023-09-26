
class RandomClass {
    IntRange(max = 1, min = 0) {
        if (max == min) {
            return max;
        }
        else {
            if (max < min) {
                [min, max] = [max, min];
            }
            return min + Math.floor((max - min + 1) * Math.random());
        }
    }

    Select() {
        if (arguments.length >= 0) {
            let index = this.IntRange(0, arguments.length - 1);
            return arguments[index];
        }
        return null;
    }
}

class ArrayConstants {
    constructor(values) {
        for (var i = 0; i < values.length; ++i)
            this[values[i]] = i;
        this.Names = values;
        this.Count = values.length;

    }
}

const Enum =
{
    Define: function (name, values) {
        this[name] = new ArrayConstants(values);
    }

};

const Const = {};
const Random = new RandomClass();

function coroutine(f)
{
    var o = f();    // instantiate the coroutine
    o.next();       // execute until the first yield
    return function (x)
    {
        o.next(x);
    }
}