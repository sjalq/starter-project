(function(scope){
'use strict';

function F(arity, fun, wrapper) {
  wrapper.a = arity;
  wrapper.f = fun;
  return wrapper;
}

function F2(fun) {
  return F(2, fun, function(a) { return function(b) { return fun(a,b); }; })
}
function F3(fun) {
  return F(3, fun, function(a) {
    return function(b) { return function(c) { return fun(a, b, c); }; };
  });
}
function F4(fun) {
  return F(4, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return fun(a, b, c, d); }; }; };
  });
}
function F5(fun) {
  return F(5, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return fun(a, b, c, d, e); }; }; }; };
  });
}
function F6(fun) {
  return F(6, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return fun(a, b, c, d, e, f); }; }; }; }; };
  });
}
function F7(fun) {
  return F(7, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return fun(a, b, c, d, e, f, g); }; }; }; }; }; };
  });
}
function F8(fun) {
  return F(8, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return function(h) {
    return fun(a, b, c, d, e, f, g, h); }; }; }; }; }; }; };
  });
}
function F9(fun) {
  return F(9, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return function(h) { return function(i) {
    return fun(a, b, c, d, e, f, g, h, i); }; }; }; }; }; }; }; };
  });
}

function A2(fun, a, b) {
  return fun.a === 2 ? fun.f(a, b) : fun(a)(b);
}
function A3(fun, a, b, c) {
  return fun.a === 3 ? fun.f(a, b, c) : fun(a)(b)(c);
}
function A4(fun, a, b, c, d) {
  return fun.a === 4 ? fun.f(a, b, c, d) : fun(a)(b)(c)(d);
}
function A5(fun, a, b, c, d, e) {
  return fun.a === 5 ? fun.f(a, b, c, d, e) : fun(a)(b)(c)(d)(e);
}
function A6(fun, a, b, c, d, e, f) {
  return fun.a === 6 ? fun.f(a, b, c, d, e, f) : fun(a)(b)(c)(d)(e)(f);
}
function A7(fun, a, b, c, d, e, f, g) {
  return fun.a === 7 ? fun.f(a, b, c, d, e, f, g) : fun(a)(b)(c)(d)(e)(f)(g);
}
function A8(fun, a, b, c, d, e, f, g, h) {
  return fun.a === 8 ? fun.f(a, b, c, d, e, f, g, h) : fun(a)(b)(c)(d)(e)(f)(g)(h);
}
function A9(fun, a, b, c, d, e, f, g, h, i) {
  return fun.a === 9 ? fun.f(a, b, c, d, e, f, g, h, i) : fun(a)(b)(c)(d)(e)(f)(g)(h)(i);
}




var _JsArray_empty = [];

function _JsArray_singleton(value)
{
    return [value];
}

function _JsArray_length(array)
{
    return array.length;
}

var _JsArray_initialize = F3(function(size, offset, func)
{
    var result = new Array(size);

    for (var i = 0; i < size; i++)
    {
        result[i] = func(offset + i);
    }

    return result;
});

var _JsArray_initializeFromList = F2(function (max, ls)
{
    var result = new Array(max);

    for (var i = 0; i < max && ls.b; i++)
    {
        result[i] = ls.a;
        ls = ls.b;
    }

    result.length = i;
    return _Utils_Tuple2(result, ls);
});

var _JsArray_unsafeGet = F2(function(index, array)
{
    return array[index];
});

var _JsArray_unsafeSet = F3(function(index, value, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = array[i];
    }

    result[index] = value;
    return result;
});

var _JsArray_push = F2(function(value, array)
{
    var length = array.length;
    var result = new Array(length + 1);

    for (var i = 0; i < length; i++)
    {
        result[i] = array[i];
    }

    result[length] = value;
    return result;
});

var _JsArray_foldl = F3(function(func, acc, array)
{
    var length = array.length;

    for (var i = 0; i < length; i++)
    {
        acc = A2(func, array[i], acc);
    }

    return acc;
});

var _JsArray_foldr = F3(function(func, acc, array)
{
    for (var i = array.length - 1; i >= 0; i--)
    {
        acc = A2(func, array[i], acc);
    }

    return acc;
});

var _JsArray_map = F2(function(func, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = func(array[i]);
    }

    return result;
});

var _JsArray_indexedMap = F3(function(func, offset, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = A2(func, offset + i, array[i]);
    }

    return result;
});

var _JsArray_slice = F3(function(from, to, array)
{
    return array.slice(from, to);
});

var _JsArray_appendN = F3(function(n, dest, source)
{
    var destLen = dest.length;
    var itemsToCopy = n - destLen;

    if (itemsToCopy > source.length)
    {
        itemsToCopy = source.length;
    }

    var size = destLen + itemsToCopy;
    var result = new Array(size);

    for (var i = 0; i < destLen; i++)
    {
        result[i] = dest[i];
    }

    for (var i = 0; i < itemsToCopy; i++)
    {
        result[i + destLen] = source[i];
    }

    return result;
});



// LOG

var _Debug_log_UNUSED = F2(function(tag, value)
{
	return value;
});

var _Debug_log = F2(function(tag, value)
{
	console.log(tag + ': ' + _Debug_toString(value));
	return value;
});


// TODOS

function _Debug_todo(moduleName, region)
{
	return function(message) {
		_Debug_crash(8, moduleName, region, message);
	};
}

function _Debug_todoCase(moduleName, region, value)
{
	return function(message) {
		_Debug_crash(9, moduleName, region, value, message);
	};
}


// TO STRING

function _Debug_toString_UNUSED(value)
{
	return '<internals>';
}

function _Debug_toString(value)
{
	return _Debug_toAnsiString(false, value);
}

function _Debug_toAnsiString(ansi, value)
{
	if (typeof value === 'function')
	{
		return _Debug_internalColor(ansi, '<function>');
	}

	if (typeof value === 'boolean')
	{
		return _Debug_ctorColor(ansi, value ? 'True' : 'False');
	}

	if (typeof value === 'number')
	{
		return _Debug_numberColor(ansi, value + '');
	}

	if (value instanceof String)
	{
		return _Debug_charColor(ansi, "'" + _Debug_addSlashes(value, true) + "'");
	}

	if (typeof value === 'string')
	{
		return _Debug_stringColor(ansi, '"' + _Debug_addSlashes(value, false) + '"');
	}

	if (typeof value === 'object' && '$' in value)
	{
		var tag = value.$;

		if (typeof tag === 'number')
		{
			return _Debug_internalColor(ansi, '<internals>');
		}

		if (tag[0] === '#')
		{
			var output = [];
			for (var k in value)
			{
				if (k === '$') continue;
				output.push(_Debug_toAnsiString(ansi, value[k]));
			}
			return '(' + output.join(',') + ')';
		}

		if (tag === 'Set_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Set')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, $elm$core$Set$toList(value));
		}

		if (tag === 'RBNode_elm_builtin' || tag === 'RBEmpty_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Dict')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, $elm$core$Dict$toList(value));
		}

		if (tag === 'Array_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Array')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, $elm$core$Array$toList(value));
		}

		if (tag === '::' || tag === '[]')
		{
			var output = '[';

			value.b && (output += _Debug_toAnsiString(ansi, value.a), value = value.b)

			for (; value.b; value = value.b) // WHILE_CONS
			{
				output += ',' + _Debug_toAnsiString(ansi, value.a);
			}
			return output + ']';
		}

		var output = '';
		for (var i in value)
		{
			if (i === '$') continue;
			var str = _Debug_toAnsiString(ansi, value[i]);
			var c0 = str[0];
			var parenless = c0 === '{' || c0 === '(' || c0 === '[' || c0 === '<' || c0 === '"' || str.indexOf(' ') < 0;
			output += ' ' + (parenless ? str : '(' + str + ')');
		}
		return _Debug_ctorColor(ansi, tag) + output;
	}

	if (typeof DataView === 'function' && value instanceof DataView)
	{
		return _Debug_stringColor(ansi, '<' + value.byteLength + ' bytes>');
	}

	if (typeof File !== 'undefined' && value instanceof File)
	{
		return _Debug_internalColor(ansi, '<' + value.name + '>');
	}

	if (typeof value === 'object')
	{
		var output = [];
		for (var key in value)
		{
			var field = key[0] === '_' ? key.slice(1) : key;
			output.push(_Debug_fadeColor(ansi, field) + ' = ' + _Debug_toAnsiString(ansi, value[key]));
		}
		if (output.length === 0)
		{
			return '{}';
		}
		return '{ ' + output.join(', ') + ' }';
	}

	return _Debug_internalColor(ansi, '<internals>');
}

function _Debug_addSlashes(str, isChar)
{
	var s = str
		.replace(/\\/g, '\\\\')
		.replace(/\n/g, '\\n')
		.replace(/\t/g, '\\t')
		.replace(/\r/g, '\\r')
		.replace(/\v/g, '\\v')
		.replace(/\0/g, '\\0');

	if (isChar)
	{
		return s.replace(/\'/g, '\\\'');
	}
	else
	{
		return s.replace(/\"/g, '\\"');
	}
}

function _Debug_ctorColor(ansi, string)
{
	return ansi ? '\x1b[96m' + string + '\x1b[0m' : string;
}

function _Debug_numberColor(ansi, string)
{
	return ansi ? '\x1b[95m' + string + '\x1b[0m' : string;
}

function _Debug_stringColor(ansi, string)
{
	return ansi ? '\x1b[93m' + string + '\x1b[0m' : string;
}

function _Debug_charColor(ansi, string)
{
	return ansi ? '\x1b[92m' + string + '\x1b[0m' : string;
}

function _Debug_fadeColor(ansi, string)
{
	return ansi ? '\x1b[37m' + string + '\x1b[0m' : string;
}

function _Debug_internalColor(ansi, string)
{
	return ansi ? '\x1b[36m' + string + '\x1b[0m' : string;
}

function _Debug_toHexDigit(n)
{
	return String.fromCharCode(n < 10 ? 48 + n : 55 + n);
}


// CRASH


function _Debug_crash_UNUSED(identifier)
{
	throw new Error('https://github.com/elm/core/blob/1.0.0/hints/' + identifier + '.md');
}


function _Debug_crash(identifier, fact1, fact2, fact3, fact4)
{
	switch(identifier)
	{
		case 0:
			throw new Error('What node should I take over? In JavaScript I need something like:\n\n    Elm.Main.init({\n        node: document.getElementById("elm-node")\n    })\n\nYou need to do this with any Browser.sandbox or Browser.element program.');

		case 1:
			throw new Error('Browser.application programs cannot handle URLs like this:\n\n    ' + document.location.href + '\n\nWhat is the root? The root of your file system? Try looking at this program with `elm reactor` or some other server.');

		case 2:
			var jsonErrorString = fact1;
			throw new Error('Problem with the flags given to your Elm program on initialization.\n\n' + jsonErrorString);

		case 3:
			var portName = fact1;
			throw new Error('There can only be one port named `' + portName + '`, but your program has multiple.');

		case 4:
			var portName = fact1;
			var problem = fact2;
			throw new Error('Trying to send an unexpected type of value through port `' + portName + '`:\n' + problem);

		case 5:
			throw new Error('Trying to use `(==)` on functions.\nThere is no way to know if functions are "the same" in the Elm sense.\nRead more about this at https://package.elm-lang.org/packages/elm/core/latest/Basics#== which describes why it is this way and what the better version will look like.');

		case 6:
			var moduleName = fact1;
			throw new Error('Your page is loading multiple Elm scripts with a module named ' + moduleName + '. Maybe a duplicate script is getting loaded accidentally? If not, rename one of them so I know which is which!');

		case 8:
			var moduleName = fact1;
			var region = fact2;
			var message = fact3;
			throw new Error('TODO in module `' + moduleName + '` ' + _Debug_regionToString(region) + '\n\n' + message);

		case 9:
			var moduleName = fact1;
			var region = fact2;
			var value = fact3;
			var message = fact4;
			throw new Error(
				'TODO in module `' + moduleName + '` from the `case` expression '
				+ _Debug_regionToString(region) + '\n\nIt received the following value:\n\n    '
				+ _Debug_toString(value).replace('\n', '\n    ')
				+ '\n\nBut the branch that handles it says:\n\n    ' + message.replace('\n', '\n    ')
			);

		case 10:
			throw new Error('Bug in https://github.com/elm/virtual-dom/issues');

		case 11:
			throw new Error('Cannot perform mod 0. Division by zero error.');
	}
}

function _Debug_regionToString(region)
{
	if (region.start.line === region.end.line)
	{
		return 'on line ' + region.start.line;
	}
	return 'on lines ' + region.start.line + ' through ' + region.end.line;
}



// EQUALITY

function _Utils_eq(x, y)
{
	for (
		var pair, stack = [], isEqual = _Utils_eqHelp(x, y, 0, stack);
		isEqual && (pair = stack.pop());
		isEqual = _Utils_eqHelp(pair.a, pair.b, 0, stack)
		)
	{}

	return isEqual;
}

function _Utils_eqHelp(x, y, depth, stack)
{
	if (x === y)
	{
		return true;
	}

	if (typeof x !== 'object' || x === null || y === null)
	{
		typeof x === 'function' && _Debug_crash(5);
		return false;
	}

	if (depth > 100)
	{
		stack.push(_Utils_Tuple2(x,y));
		return true;
	}

	/**/
	if (x.$ === 'Set_elm_builtin')
	{
		x = $elm$core$Set$toList(x);
		y = $elm$core$Set$toList(y);
	}
	if (x.$ === 'RBNode_elm_builtin' || x.$ === 'RBEmpty_elm_builtin')
	{
		x = $elm$core$Dict$toList(x);
		y = $elm$core$Dict$toList(y);
	}
	//*/

	/**_UNUSED/
	if (x.$ < 0)
	{
		x = $elm$core$Dict$toList(x);
		y = $elm$core$Dict$toList(y);
	}
	//*/

	for (var key in x)
	{
		if (!_Utils_eqHelp(x[key], y[key], depth + 1, stack))
		{
			return false;
		}
	}
	return true;
}

var _Utils_equal = F2(_Utils_eq);
var _Utils_notEqual = F2(function(a, b) { return !_Utils_eq(a,b); });



// COMPARISONS

// Code in Generate/JavaScript.hs, Basics.js, and List.js depends on
// the particular integer values assigned to LT, EQ, and GT.

function _Utils_cmp(x, y, ord)
{
	if (typeof x !== 'object')
	{
		return x === y ? /*EQ*/ 0 : x < y ? /*LT*/ -1 : /*GT*/ 1;
	}

	/**/
	if (x instanceof String)
	{
		var a = x.valueOf();
		var b = y.valueOf();
		return a === b ? 0 : a < b ? -1 : 1;
	}
	//*/

	/**_UNUSED/
	if (typeof x.$ === 'undefined')
	//*/
	/**/
	if (x.$[0] === '#')
	//*/
	{
		return (ord = _Utils_cmp(x.a, y.a))
			? ord
			: (ord = _Utils_cmp(x.b, y.b))
				? ord
				: _Utils_cmp(x.c, y.c);
	}

	// traverse conses until end of a list or a mismatch
	for (; x.b && y.b && !(ord = _Utils_cmp(x.a, y.a)); x = x.b, y = y.b) {} // WHILE_CONSES
	return ord || (x.b ? /*GT*/ 1 : y.b ? /*LT*/ -1 : /*EQ*/ 0);
}

var _Utils_lt = F2(function(a, b) { return _Utils_cmp(a, b) < 0; });
var _Utils_le = F2(function(a, b) { return _Utils_cmp(a, b) < 1; });
var _Utils_gt = F2(function(a, b) { return _Utils_cmp(a, b) > 0; });
var _Utils_ge = F2(function(a, b) { return _Utils_cmp(a, b) >= 0; });

var _Utils_compare = F2(function(x, y)
{
	var n = _Utils_cmp(x, y);
	return n < 0 ? $elm$core$Basics$LT : n ? $elm$core$Basics$GT : $elm$core$Basics$EQ;
});


// COMMON VALUES

var _Utils_Tuple0_UNUSED = 0;
var _Utils_Tuple0 = { $: '#0' };

function _Utils_Tuple2_UNUSED(a, b) { return { a: a, b: b }; }
function _Utils_Tuple2(a, b) { return { $: '#2', a: a, b: b }; }

function _Utils_Tuple3_UNUSED(a, b, c) { return { a: a, b: b, c: c }; }
function _Utils_Tuple3(a, b, c) { return { $: '#3', a: a, b: b, c: c }; }

function _Utils_chr_UNUSED(c) { return c; }
function _Utils_chr(c) { return new String(c); }


// RECORDS

function _Utils_update(oldRecord, updatedFields)
{
	var newRecord = {};

	for (var key in oldRecord)
	{
		newRecord[key] = oldRecord[key];
	}

	for (var key in updatedFields)
	{
		newRecord[key] = updatedFields[key];
	}

	return newRecord;
}


// APPEND

var _Utils_append = F2(_Utils_ap);

function _Utils_ap(xs, ys)
{
	// append Strings
	if (typeof xs === 'string')
	{
		return xs + ys;
	}

	// append Lists
	if (!xs.b)
	{
		return ys;
	}
	var root = _List_Cons(xs.a, ys);
	xs = xs.b
	for (var curr = root; xs.b; xs = xs.b) // WHILE_CONS
	{
		curr = curr.b = _List_Cons(xs.a, ys);
	}
	return root;
}



var _List_Nil_UNUSED = { $: 0 };
var _List_Nil = { $: '[]' };

function _List_Cons_UNUSED(hd, tl) { return { $: 1, a: hd, b: tl }; }
function _List_Cons(hd, tl) { return { $: '::', a: hd, b: tl }; }


var _List_cons = F2(_List_Cons);

function _List_fromArray(arr)
{
	var out = _List_Nil;
	for (var i = arr.length; i--; )
	{
		out = _List_Cons(arr[i], out);
	}
	return out;
}

function _List_toArray(xs)
{
	for (var out = []; xs.b; xs = xs.b) // WHILE_CONS
	{
		out.push(xs.a);
	}
	return out;
}

var _List_map2 = F3(function(f, xs, ys)
{
	for (var arr = []; xs.b && ys.b; xs = xs.b, ys = ys.b) // WHILE_CONSES
	{
		arr.push(A2(f, xs.a, ys.a));
	}
	return _List_fromArray(arr);
});

var _List_map3 = F4(function(f, xs, ys, zs)
{
	for (var arr = []; xs.b && ys.b && zs.b; xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A3(f, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_map4 = F5(function(f, ws, xs, ys, zs)
{
	for (var arr = []; ws.b && xs.b && ys.b && zs.b; ws = ws.b, xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A4(f, ws.a, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_map5 = F6(function(f, vs, ws, xs, ys, zs)
{
	for (var arr = []; vs.b && ws.b && xs.b && ys.b && zs.b; vs = vs.b, ws = ws.b, xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A5(f, vs.a, ws.a, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_sortBy = F2(function(f, xs)
{
	return _List_fromArray(_List_toArray(xs).sort(function(a, b) {
		return _Utils_cmp(f(a), f(b));
	}));
});

var _List_sortWith = F2(function(f, xs)
{
	return _List_fromArray(_List_toArray(xs).sort(function(a, b) {
		var ord = A2(f, a, b);
		return ord === $elm$core$Basics$EQ ? 0 : ord === $elm$core$Basics$LT ? -1 : 1;
	}));
});



// MATH

var _Basics_add = F2(function(a, b) { return a + b; });
var _Basics_sub = F2(function(a, b) { return a - b; });
var _Basics_mul = F2(function(a, b) { return a * b; });
var _Basics_fdiv = F2(function(a, b) { return a / b; });
var _Basics_idiv = F2(function(a, b) { return (a / b) | 0; });
var _Basics_pow = F2(Math.pow);

var _Basics_remainderBy = F2(function(b, a) { return a % b; });

// https://www.microsoft.com/en-us/research/wp-content/uploads/2016/02/divmodnote-letter.pdf
var _Basics_modBy = F2(function(modulus, x)
{
	var answer = x % modulus;
	return modulus === 0
		? _Debug_crash(11)
		:
	((answer > 0 && modulus < 0) || (answer < 0 && modulus > 0))
		? answer + modulus
		: answer;
});


// TRIGONOMETRY

var _Basics_pi = Math.PI;
var _Basics_e = Math.E;
var _Basics_cos = Math.cos;
var _Basics_sin = Math.sin;
var _Basics_tan = Math.tan;
var _Basics_acos = Math.acos;
var _Basics_asin = Math.asin;
var _Basics_atan = Math.atan;
var _Basics_atan2 = F2(Math.atan2);


// MORE MATH

function _Basics_toFloat(x) { return x; }
function _Basics_truncate(n) { return n | 0; }
function _Basics_isInfinite(n) { return n === Infinity || n === -Infinity; }

var _Basics_ceiling = Math.ceil;
var _Basics_floor = Math.floor;
var _Basics_round = Math.round;
var _Basics_sqrt = Math.sqrt;
var _Basics_log = Math.log;
var _Basics_isNaN = isNaN;


// BOOLEANS

function _Basics_not(bool) { return !bool; }
var _Basics_and = F2(function(a, b) { return a && b; });
var _Basics_or  = F2(function(a, b) { return a || b; });
var _Basics_xor = F2(function(a, b) { return a !== b; });


var _JsArray2_empty = [];

var _JsArray2_singleton = function(val) {
    return [val];
};

var _JsArray2_length = function(arr) {
    return arr.length;
};

var _JsArray2_initialize = F3(function(size, offset, f) {
    var result = new Array(size);

    for (var i = 0; i < size; i++) {
        result[i] = f(offset + i);
    }

    return result;
});

var _JsArray2_initializeFromList = F2(function(max, ls) {
    var result = new Array(max);

    for (var i = 0; i < max && ls.ctor !== '[]'; i++) {
        result[i] = ls.a;
        ls = ls.b;
    }

    result.length = i;
    return _Utils_Tuple2(result, ls);
});

var _JsArray2_unsafeGet = F2(function(idx, arr) {
    return arr[idx];
});

var _JsArray2_unsafeSet = F3(function(idx, val, arr) {
    var length = arr.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++) {
        result[i] = arr[i];
    }

    result[idx] = val;
    return result;
});

var _JsArray2_unsafeInsert = F3(function(idx, val, arr) {
    var length = arr.length;
    var result = new Array(length + 1);

    for (var i = 0; i < idx; i++) {
	result[i] = arr[i];
    }

    result[idx] = val;

    for (var i = idx; i < length; i++) {
	result[i + 1] = arr[i];
    }

    return result;
});

var _JsArray2_removeIndex = F2(function(idx, arr) {
    var length = arr.length;
    var result = new Array(length - 1);

    for (var i = 0; i < idx; i++) {
	result[i] = arr[i];
    }

    for (var i = idx + 1; i < length; i++) {
	result[i - 1] = arr[i];
    }

    return result;
});

var _JsArray2_push = F2(function(val, arr) {
    var length = arr.length;
    var result = new Array(length + 1);

    for (var i = 0; i < length; i++) {
        result[i] = arr[i];
    }

    result[length] = val;
    return result;
});

var _JsArray2_foldl = F3(function(f, acc, arr) {
    var length = arr.length;

    for (var i = 0; i < length; i++) {
        acc = A2(f, arr[i], acc);
    }

    return acc;
});

var _JsArray2_foldr = F3(function(f, acc, arr) {
    for (var i = arr.length - 1; i >= 0; i--) {
        acc = A2(f, arr[i], acc);
    }

    return acc;
});

var _JsArray2_map = F2(function(f, arr) {
    var length = arr.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++) {
        result[i] = f(arr[i]);
    }

    return result;
});

var _JsArray2_indexedMap = F3(function(f, offset, arr) {
    var length = arr.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++) {
        result[i] = A2(f, offset + i, arr[i]);
    }

    return result;
});

var _JsArray2_slice = F3(function(from, to, arr) {
    return arr.slice(from, to);
});

var _JsArray2_appendN = F3(function(n, dest, source) {
    var destLen = dest.length;
    var itemsToCopy = n - destLen;

    if (itemsToCopy > source.length) {
        itemsToCopy = source.length;
    }

    var size = destLen + itemsToCopy;
    var result = new Array(size);

    for (var i = 0; i < destLen; i++) {
        result[i] = dest[i];
    }

    for (var i = 0; i < itemsToCopy; i++) {
        result[i + destLen] = source[i];
    }

    return result;
});



var _Bitwise_and = F2(function(a, b)
{
	return a & b;
});

var _Bitwise_or = F2(function(a, b)
{
	return a | b;
});

var _Bitwise_xor = F2(function(a, b)
{
	return a ^ b;
});

function _Bitwise_complement(a)
{
	return ~a;
};

var _Bitwise_shiftLeftBy = F2(function(offset, a)
{
	return a << offset;
});

var _Bitwise_shiftRightBy = F2(function(offset, a)
{
	return a >> offset;
});

var _Bitwise_shiftRightZfBy = F2(function(offset, a)
{
	return a >>> offset;
});



var _String_cons = F2(function(chr, str)
{
	return chr + str;
});

function _String_uncons(string)
{
	var word = string.charCodeAt(0);
	return !isNaN(word)
		? $elm$core$Maybe$Just(
			0xD800 <= word && word <= 0xDBFF
				? _Utils_Tuple2(_Utils_chr(string[0] + string[1]), string.slice(2))
				: _Utils_Tuple2(_Utils_chr(string[0]), string.slice(1))
		)
		: $elm$core$Maybe$Nothing;
}

var _String_append = F2(function(a, b)
{
	return a + b;
});

function _String_length(str)
{
	return str.length;
}

var _String_map = F2(function(func, string)
{
	var len = string.length;
	var array = new Array(len);
	var i = 0;
	while (i < len)
	{
		var word = string.charCodeAt(i);
		if (0xD800 <= word && word <= 0xDBFF)
		{
			array[i] = func(_Utils_chr(string[i] + string[i+1]));
			i += 2;
			continue;
		}
		array[i] = func(_Utils_chr(string[i]));
		i++;
	}
	return array.join('');
});

var _String_filter = F2(function(isGood, str)
{
	var arr = [];
	var len = str.length;
	var i = 0;
	while (i < len)
	{
		var char = str[i];
		var word = str.charCodeAt(i);
		i++;
		if (0xD800 <= word && word <= 0xDBFF)
		{
			char += str[i];
			i++;
		}

		if (isGood(_Utils_chr(char)))
		{
			arr.push(char);
		}
	}
	return arr.join('');
});

function _String_reverse(str)
{
	var len = str.length;
	var arr = new Array(len);
	var i = 0;
	while (i < len)
	{
		var word = str.charCodeAt(i);
		if (0xD800 <= word && word <= 0xDBFF)
		{
			arr[len - i] = str[i + 1];
			i++;
			arr[len - i] = str[i - 1];
			i++;
		}
		else
		{
			arr[len - i] = str[i];
			i++;
		}
	}
	return arr.join('');
}

var _String_foldl = F3(function(func, state, string)
{
	var len = string.length;
	var i = 0;
	while (i < len)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		i++;
		if (0xD800 <= word && word <= 0xDBFF)
		{
			char += string[i];
			i++;
		}
		state = A2(func, _Utils_chr(char), state);
	}
	return state;
});

var _String_foldr = F3(function(func, state, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		state = A2(func, _Utils_chr(char), state);
	}
	return state;
});

var _String_split = F2(function(sep, str)
{
	return str.split(sep);
});

var _String_join = F2(function(sep, strs)
{
	return strs.join(sep);
});

var _String_slice = F3(function(start, end, str) {
	return str.slice(start, end);
});

function _String_trim(str)
{
	return str.trim();
}

function _String_trimLeft(str)
{
	return str.replace(/^\s+/, '');
}

function _String_trimRight(str)
{
	return str.replace(/\s+$/, '');
}

function _String_words(str)
{
	return _List_fromArray(str.trim().split(/\s+/g));
}

function _String_lines(str)
{
	return _List_fromArray(str.split(/\r\n|\r|\n/g));
}

function _String_toUpper(str)
{
	return str.toUpperCase();
}

function _String_toLower(str)
{
	return str.toLowerCase();
}

var _String_any = F2(function(isGood, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		if (isGood(_Utils_chr(char)))
		{
			return true;
		}
	}
	return false;
});

var _String_all = F2(function(isGood, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		if (!isGood(_Utils_chr(char)))
		{
			return false;
		}
	}
	return true;
});

var _String_contains = F2(function(sub, str)
{
	return str.indexOf(sub) > -1;
});

var _String_startsWith = F2(function(sub, str)
{
	return str.indexOf(sub) === 0;
});

var _String_endsWith = F2(function(sub, str)
{
	return str.length >= sub.length &&
		str.lastIndexOf(sub) === str.length - sub.length;
});

var _String_indexes = F2(function(sub, str)
{
	var subLen = sub.length;

	if (subLen < 1)
	{
		return _List_Nil;
	}

	var i = 0;
	var is = [];

	while ((i = str.indexOf(sub, i)) > -1)
	{
		is.push(i);
		i = i + subLen;
	}

	return _List_fromArray(is);
});


// TO STRING

function _String_fromNumber(number)
{
	return number + '';
}


// INT CONVERSIONS

function _String_toInt(str)
{
	var total = 0;
	var code0 = str.charCodeAt(0);
	var start = code0 == 0x2B /* + */ || code0 == 0x2D /* - */ ? 1 : 0;

	for (var i = start; i < str.length; ++i)
	{
		var code = str.charCodeAt(i);
		if (code < 0x30 || 0x39 < code)
		{
			return $elm$core$Maybe$Nothing;
		}
		total = 10 * total + code - 0x30;
	}

	return i == start
		? $elm$core$Maybe$Nothing
		: $elm$core$Maybe$Just(code0 == 0x2D ? -total : total);
}


// FLOAT CONVERSIONS

function _String_toFloat(s)
{
	// check if it is a hex, octal, or binary number
	if (s.length === 0 || /[\sxbo]/.test(s))
	{
		return $elm$core$Maybe$Nothing;
	}
	var n = +s;
	// faster isNaN check
	return n === n ? $elm$core$Maybe$Just(n) : $elm$core$Maybe$Nothing;
}

function _String_fromList(chars)
{
	return _List_toArray(chars).join('');
}




function _Char_toCode(char)
{
	var code = char.charCodeAt(0);
	if (0xD800 <= code && code <= 0xDBFF)
	{
		return (code - 0xD800) * 0x400 + char.charCodeAt(1) - 0xDC00 + 0x10000
	}
	return code;
}

function _Char_fromCode(code)
{
	return _Utils_chr(
		(code < 0 || 0x10FFFF < code)
			? '\uFFFD'
			:
		(code <= 0xFFFF)
			? String.fromCharCode(code)
			:
		(code -= 0x10000,
			String.fromCharCode(Math.floor(code / 0x400) + 0xD800, code % 0x400 + 0xDC00)
		)
	);
}

function _Char_toUpper(char)
{
	return _Utils_chr(char.toUpperCase());
}

function _Char_toLower(char)
{
	return _Utils_chr(char.toLowerCase());
}

function _Char_toLocaleUpper(char)
{
	return _Utils_chr(char.toLocaleUpperCase());
}

function _Char_toLocaleLower(char)
{
	return _Utils_chr(char.toLocaleLowerCase());
}



/**/
function _Json_errorToString(error)
{
	return $elm$json$Json$Decode$errorToString(error);
}
//*/


// CORE DECODERS

function _Json_succeed(msg)
{
	return {
		$: 0,
		a: msg
	};
}

function _Json_fail(msg)
{
	return {
		$: 1,
		a: msg
	};
}

function _Json_decodePrim(decoder)
{
	return { $: 2, b: decoder };
}

var _Json_decodeInt = _Json_decodePrim(function(value) {
	return (typeof value !== 'number')
		? _Json_expecting('an INT', value)
		:
	(-2147483647 < value && value < 2147483647 && (value | 0) === value)
		? $elm$core$Result$Ok(value)
		:
	(isFinite(value) && !(value % 1))
		? $elm$core$Result$Ok(value)
		: _Json_expecting('an INT', value);
});

var _Json_decodeBool = _Json_decodePrim(function(value) {
	return (typeof value === 'boolean')
		? $elm$core$Result$Ok(value)
		: _Json_expecting('a BOOL', value);
});

var _Json_decodeFloat = _Json_decodePrim(function(value) {
	return (typeof value === 'number')
		? $elm$core$Result$Ok(value)
		: _Json_expecting('a FLOAT', value);
});

var _Json_decodeValue = _Json_decodePrim(function(value) {
	return $elm$core$Result$Ok(_Json_wrap(value));
});

var _Json_decodeString = _Json_decodePrim(function(value) {
	return (typeof value === 'string')
		? $elm$core$Result$Ok(value)
		: (value instanceof String)
			? $elm$core$Result$Ok(value + '')
			: _Json_expecting('a STRING', value);
});

function _Json_decodeList(decoder) { return { $: 3, b: decoder }; }
function _Json_decodeArray(decoder) { return { $: 4, b: decoder }; }

function _Json_decodeNull(value) { return { $: 5, c: value }; }

var _Json_decodeField = F2(function(field, decoder)
{
	return {
		$: 6,
		d: field,
		b: decoder
	};
});

var _Json_decodeIndex = F2(function(index, decoder)
{
	return {
		$: 7,
		e: index,
		b: decoder
	};
});

function _Json_decodeKeyValuePairs(decoder)
{
	return {
		$: 8,
		b: decoder
	};
}

function _Json_mapMany(f, decoders)
{
	return {
		$: 9,
		f: f,
		g: decoders
	};
}

var _Json_andThen = F2(function(callback, decoder)
{
	return {
		$: 10,
		b: decoder,
		h: callback
	};
});

function _Json_oneOf(decoders)
{
	return {
		$: 11,
		g: decoders
	};
}


// DECODING OBJECTS

var _Json_map1 = F2(function(f, d1)
{
	return _Json_mapMany(f, [d1]);
});

var _Json_map2 = F3(function(f, d1, d2)
{
	return _Json_mapMany(f, [d1, d2]);
});

var _Json_map3 = F4(function(f, d1, d2, d3)
{
	return _Json_mapMany(f, [d1, d2, d3]);
});

var _Json_map4 = F5(function(f, d1, d2, d3, d4)
{
	return _Json_mapMany(f, [d1, d2, d3, d4]);
});

var _Json_map5 = F6(function(f, d1, d2, d3, d4, d5)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5]);
});

var _Json_map6 = F7(function(f, d1, d2, d3, d4, d5, d6)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6]);
});

var _Json_map7 = F8(function(f, d1, d2, d3, d4, d5, d6, d7)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6, d7]);
});

var _Json_map8 = F9(function(f, d1, d2, d3, d4, d5, d6, d7, d8)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6, d7, d8]);
});


// DECODE

var _Json_runOnString = F2(function(decoder, string)
{
	try
	{
		var value = JSON.parse(string);
		return _Json_runHelp(decoder, value);
	}
	catch (e)
	{
		return $elm$core$Result$Err(A2($elm$json$Json$Decode$Failure, 'This is not valid JSON! ' + e.message, _Json_wrap(string)));
	}
});

var _Json_run = F2(function(decoder, value)
{
	return _Json_runHelp(decoder, _Json_unwrap(value));
});

function _Json_runHelp(decoder, value)
{
	switch (decoder.$)
	{
		case 2:
			return decoder.b(value);

		case 5:
			return (value === null)
				? $elm$core$Result$Ok(decoder.c)
				: _Json_expecting('null', value);

		case 3:
			if (!_Json_isArray(value))
			{
				return _Json_expecting('a LIST', value);
			}
			return _Json_runArrayDecoder(decoder.b, value, _List_fromArray);

		case 4:
			if (!_Json_isArray(value))
			{
				return _Json_expecting('an ARRAY', value);
			}
			return _Json_runArrayDecoder(decoder.b, value, _Json_toElmArray);

		case 6:
			var field = decoder.d;
			if (typeof value !== 'object' || value === null || !(field in value))
			{
				return _Json_expecting('an OBJECT with a field named `' + field + '`', value);
			}
			var result = _Json_runHelp(decoder.b, value[field]);
			return ($elm$core$Result$isOk(result)) ? result : $elm$core$Result$Err(A2($elm$json$Json$Decode$Field, field, result.a));

		case 7:
			var index = decoder.e;
			if (!_Json_isArray(value))
			{
				return _Json_expecting('an ARRAY', value);
			}
			if (index >= value.length)
			{
				return _Json_expecting('a LONGER array. Need index ' + index + ' but only see ' + value.length + ' entries', value);
			}
			var result = _Json_runHelp(decoder.b, value[index]);
			return ($elm$core$Result$isOk(result)) ? result : $elm$core$Result$Err(A2($elm$json$Json$Decode$Index, index, result.a));

		case 8:
			if (typeof value !== 'object' || value === null || _Json_isArray(value))
			{
				return _Json_expecting('an OBJECT', value);
			}

			var keyValuePairs = _List_Nil;
			// TODO test perf of Object.keys and switch when support is good enough
			for (var key in value)
			{
				if (value.hasOwnProperty(key))
				{
					var result = _Json_runHelp(decoder.b, value[key]);
					if (!$elm$core$Result$isOk(result))
					{
						return $elm$core$Result$Err(A2($elm$json$Json$Decode$Field, key, result.a));
					}
					keyValuePairs = _List_Cons(_Utils_Tuple2(key, result.a), keyValuePairs);
				}
			}
			return $elm$core$Result$Ok($elm$core$List$reverse(keyValuePairs));

		case 9:
			var answer = decoder.f;
			var decoders = decoder.g;
			for (var i = 0; i < decoders.length; i++)
			{
				var result = _Json_runHelp(decoders[i], value);
				if (!$elm$core$Result$isOk(result))
				{
					return result;
				}
				answer = answer(result.a);
			}
			return $elm$core$Result$Ok(answer);

		case 10:
			var result = _Json_runHelp(decoder.b, value);
			return (!$elm$core$Result$isOk(result))
				? result
				: _Json_runHelp(decoder.h(result.a), value);

		case 11:
			var errors = _List_Nil;
			for (var temp = decoder.g; temp.b; temp = temp.b) // WHILE_CONS
			{
				var result = _Json_runHelp(temp.a, value);
				if ($elm$core$Result$isOk(result))
				{
					return result;
				}
				errors = _List_Cons(result.a, errors);
			}
			return $elm$core$Result$Err($elm$json$Json$Decode$OneOf($elm$core$List$reverse(errors)));

		case 1:
			return $elm$core$Result$Err(A2($elm$json$Json$Decode$Failure, decoder.a, _Json_wrap(value)));

		case 0:
			return $elm$core$Result$Ok(decoder.a);
	}
}

function _Json_runArrayDecoder(decoder, value, toElmValue)
{
	var len = value.length;
	var array = new Array(len);
	for (var i = 0; i < len; i++)
	{
		var result = _Json_runHelp(decoder, value[i]);
		if (!$elm$core$Result$isOk(result))
		{
			return $elm$core$Result$Err(A2($elm$json$Json$Decode$Index, i, result.a));
		}
		array[i] = result.a;
	}
	return $elm$core$Result$Ok(toElmValue(array));
}

function _Json_isArray(value)
{
	return Array.isArray(value) || (typeof FileList !== 'undefined' && value instanceof FileList);
}

function _Json_toElmArray(array)
{
	return A2($elm$core$Array$initialize, array.length, function(i) { return array[i]; });
}

function _Json_expecting(type, value)
{
	return $elm$core$Result$Err(A2($elm$json$Json$Decode$Failure, 'Expecting ' + type, _Json_wrap(value)));
}


// EQUALITY

function _Json_equality(x, y)
{
	if (x === y)
	{
		return true;
	}

	if (x.$ !== y.$)
	{
		return false;
	}

	switch (x.$)
	{
		case 0:
		case 1:
			return x.a === y.a;

		case 2:
			return x.b === y.b;

		case 5:
			return x.c === y.c;

		case 3:
		case 4:
		case 8:
			return _Json_equality(x.b, y.b);

		case 6:
			return x.d === y.d && _Json_equality(x.b, y.b);

		case 7:
			return x.e === y.e && _Json_equality(x.b, y.b);

		case 9:
			return x.f === y.f && _Json_listEquality(x.g, y.g);

		case 10:
			return x.h === y.h && _Json_equality(x.b, y.b);

		case 11:
			return _Json_listEquality(x.g, y.g);
	}
}

function _Json_listEquality(aDecoders, bDecoders)
{
	var len = aDecoders.length;
	if (len !== bDecoders.length)
	{
		return false;
	}
	for (var i = 0; i < len; i++)
	{
		if (!_Json_equality(aDecoders[i], bDecoders[i]))
		{
			return false;
		}
	}
	return true;
}


// ENCODE

var _Json_encode = F2(function(indentLevel, value)
{
	return JSON.stringify(_Json_unwrap(value), null, indentLevel) + '';
});

function _Json_wrap(value) { return { $: 0, a: value }; }
function _Json_unwrap(value) { return value.a; }

function _Json_wrap_UNUSED(value) { return value; }
function _Json_unwrap_UNUSED(value) { return value; }

function _Json_emptyArray() { return []; }
function _Json_emptyObject() { return {}; }

var _Json_addField = F3(function(key, value, object)
{
	object[key] = _Json_unwrap(value);
	return object;
});

function _Json_addEntry(func)
{
	return F2(function(entry, array)
	{
		array.push(_Json_unwrap(func(entry)));
		return array;
	});
}

var _Json_encodeNull = _Json_wrap(null);



// TASKS

function _Scheduler_succeed(value)
{
	return {
		$: 0,
		a: value
	};
}

function _Scheduler_fail(error)
{
	return {
		$: 1,
		a: error
	};
}

function _Scheduler_binding(callback)
{
	return {
		$: 2,
		b: callback,
		c: null
	};
}

var _Scheduler_andThen = F2(function(callback, task)
{
	return {
		$: 3,
		b: callback,
		d: task
	};
});

var _Scheduler_onError = F2(function(callback, task)
{
	return {
		$: 4,
		b: callback,
		d: task
	};
});

function _Scheduler_receive(callback)
{
	return {
		$: 5,
		b: callback
	};
}


// PROCESSES

var _Scheduler_guid = 0;

function _Scheduler_rawSpawn(task)
{
	var proc = {
		$: 0,
		e: _Scheduler_guid++,
		f: task,
		g: null,
		h: []
	};

	_Scheduler_enqueue(proc);

	return proc;
}

function _Scheduler_spawn(task)
{
	return _Scheduler_binding(function(callback) {
		callback(_Scheduler_succeed(_Scheduler_rawSpawn(task)));
	});
}

function _Scheduler_rawSend(proc, msg)
{
	proc.h.push(msg);
	_Scheduler_enqueue(proc);
}

var _Scheduler_send = F2(function(proc, msg)
{
	return _Scheduler_binding(function(callback) {
		_Scheduler_rawSend(proc, msg);
		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
});

function _Scheduler_kill(proc)
{
	return _Scheduler_binding(function(callback) {
		var task = proc.f;
		if (task.$ === 2 && task.c)
		{
			task.c();
		}

		proc.f = null;

		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
}


/* STEP PROCESSES

type alias Process =
  { $ : tag
  , id : unique_id
  , root : Task
  , stack : null | { $: SUCCEED | FAIL, a: callback, b: stack }
  , mailbox : [msg]
  }

*/


var _Scheduler_working = false;
var _Scheduler_queue = [];


function _Scheduler_enqueue(proc)
{
	_Scheduler_queue.push(proc);
	if (_Scheduler_working)
	{
		return;
	}
	_Scheduler_working = true;
	while (proc = _Scheduler_queue.shift())
	{
		_Scheduler_step(proc);
	}
	_Scheduler_working = false;
}


function _Scheduler_step(proc)
{
	while (proc.f)
	{
		var rootTag = proc.f.$;
		if (rootTag === 0 || rootTag === 1)
		{
			while (proc.g && proc.g.$ !== rootTag)
			{
				proc.g = proc.g.i;
			}
			if (!proc.g)
			{
				return;
			}
			proc.f = proc.g.b(proc.f.a);
			proc.g = proc.g.i;
		}
		else if (rootTag === 2)
		{
			proc.f.c = proc.f.b(function(newRoot) {
				proc.f = newRoot;
				_Scheduler_enqueue(proc);
			});
			return;
		}
		else if (rootTag === 5)
		{
			if (proc.h.length === 0)
			{
				return;
			}
			proc.f = proc.f.b(proc.h.shift());
		}
		else // if (rootTag === 3 || rootTag === 4)
		{
			proc.g = {
				$: rootTag === 3 ? 0 : 1,
				b: proc.f.b,
				i: proc.g
			};
			proc.f = proc.f.d;
		}
	}
}



function _Process_sleep(time)
{
	return _Scheduler_binding(function(callback) {
		var id = setTimeout(function() {
			callback(_Scheduler_succeed(_Utils_Tuple0));
		}, time);

		return function() { clearTimeout(id); };
	});
}




// PROGRAMS


var _Platform_worker = F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.init,
		impl.update,
		impl.subscriptions,
		function() { return function() {} }
	);
});



// INITIALIZE A PROGRAM


function _Platform_initialize(flagDecoder, args, init, update, subscriptions, stepperBuilder)
{
	var result = A2(_Json_run, flagDecoder, _Json_wrap(args ? args['flags'] : undefined));
	$elm$core$Result$isOk(result) || _Debug_crash(2 /**/, _Json_errorToString(result.a) /**/);
	var managers = {};
	var initPair = init(result.a);
	var model = initPair.a;
	var stepper = stepperBuilder(sendToApp, model);
	var ports = _Platform_setupEffects(managers, sendToApp);

	function sendToApp(msg, viewMetadata)
	{
		var pair = A2(update, msg, model);
		stepper(model = pair.a, viewMetadata);
		_Platform_enqueueEffects(managers, pair.b, subscriptions(model));
	}

	_Platform_enqueueEffects(managers, initPair.b, subscriptions(model));

	return ports ? { ports: ports } : {};
}



// TRACK PRELOADS
//
// This is used by code in elm/browser and elm/http
// to register any HTTP requests that are triggered by init.
//


var _Platform_preload;


function _Platform_registerPreload(url)
{
	_Platform_preload.add(url);
}



// EFFECT MANAGERS


var _Platform_effectManagers = {};


function _Platform_setupEffects(managers, sendToApp)
{
	var ports;

	// setup all necessary effect managers
	for (var key in _Platform_effectManagers)
	{
		var manager = _Platform_effectManagers[key];

		if (manager.a)
		{
			ports = ports || {};
			ports[key] = manager.a(key, sendToApp);
		}

		managers[key] = _Platform_instantiateManager(manager, sendToApp);
	}

	return ports;
}


function _Platform_createManager(init, onEffects, onSelfMsg, cmdMap, subMap)
{
	return {
		b: init,
		c: onEffects,
		d: onSelfMsg,
		e: cmdMap,
		f: subMap
	};
}


function _Platform_instantiateManager(info, sendToApp)
{
	var router = {
		g: sendToApp,
		h: undefined
	};

	var onEffects = info.c;
	var onSelfMsg = info.d;
	var cmdMap = info.e;
	var subMap = info.f;

	function loop(state)
	{
		return A2(_Scheduler_andThen, loop, _Scheduler_receive(function(msg)
		{
			var value = msg.a;

			if (msg.$ === 0)
			{
				return A3(onSelfMsg, router, value, state);
			}

			return cmdMap && subMap
				? A4(onEffects, router, value.i, value.j, state)
				: A3(onEffects, router, cmdMap ? value.i : value.j, state);
		}));
	}

	return router.h = _Scheduler_rawSpawn(A2(_Scheduler_andThen, loop, info.b));
}



// ROUTING


var _Platform_sendToApp = F2(function(router, msg)
{
	return _Scheduler_binding(function(callback)
	{
		router.g(msg);
		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
});


var _Platform_sendToSelf = F2(function(router, msg)
{
	return A2(_Scheduler_send, router.h, {
		$: 0,
		a: msg
	});
});



// BAGS


function _Platform_leaf(home)
{
	return function(value)
	{
		return {
			$: 1,
			k: home,
			l: value
		};
	};
}


function _Platform_batch(list)
{
	return {
		$: 2,
		m: list
	};
}


var _Platform_map = F2(function(tagger, bag)
{
	return {
		$: 3,
		n: tagger,
		o: bag
	}
});



// PIPE BAGS INTO EFFECT MANAGERS
//
// Effects must be queued!
//
// Say your init contains a synchronous command, like Time.now or Time.here
//
//   - This will produce a batch of effects (FX_1)
//   - The synchronous task triggers the subsequent `update` call
//   - This will produce a batch of effects (FX_2)
//
// If we just start dispatching FX_2, subscriptions from FX_2 can be processed
// before subscriptions from FX_1. No good! Earlier versions of this code had
// this problem, leading to these reports:
//
//   https://github.com/elm/core/issues/980
//   https://github.com/elm/core/pull/981
//   https://github.com/elm/compiler/issues/1776
//
// The queue is necessary to avoid ordering issues for synchronous commands.


// Why use true/false here? Why not just check the length of the queue?
// The goal is to detect "are we currently dispatching effects?" If we
// are, we need to bail and let the ongoing while loop handle things.
//
// Now say the queue has 1 element. When we dequeue the final element,
// the queue will be empty, but we are still actively dispatching effects.
// So you could get queue jumping in a really tricky category of cases.
//
var _Platform_effectsQueue = [];
var _Platform_effectsActive = false;


function _Platform_enqueueEffects(managers, cmdBag, subBag)
{
	_Platform_effectsQueue.push({ p: managers, q: cmdBag, r: subBag });

	if (_Platform_effectsActive) return;

	_Platform_effectsActive = true;
	for (var fx; fx = _Platform_effectsQueue.shift(); )
	{
		_Platform_dispatchEffects(fx.p, fx.q, fx.r);
	}
	_Platform_effectsActive = false;
}


function _Platform_dispatchEffects(managers, cmdBag, subBag)
{
	var effectsDict = {};
	_Platform_gatherEffects(true, cmdBag, effectsDict, null);
	_Platform_gatherEffects(false, subBag, effectsDict, null);

	for (var home in managers)
	{
		_Scheduler_rawSend(managers[home], {
			$: 'fx',
			a: effectsDict[home] || { i: _List_Nil, j: _List_Nil }
		});
	}
}


function _Platform_gatherEffects(isCmd, bag, effectsDict, taggers)
{
	switch (bag.$)
	{
		case 1:
			var home = bag.k;
			var effect = _Platform_toEffect(isCmd, home, taggers, bag.l);
			effectsDict[home] = _Platform_insert(isCmd, effect, effectsDict[home]);
			return;

		case 2:
			for (var list = bag.m; list.b; list = list.b) // WHILE_CONS
			{
				_Platform_gatherEffects(isCmd, list.a, effectsDict, taggers);
			}
			return;

		case 3:
			_Platform_gatherEffects(isCmd, bag.o, effectsDict, {
				s: bag.n,
				t: taggers
			});
			return;
	}
}


function _Platform_toEffect(isCmd, home, taggers, value)
{
	function applyTaggers(x)
	{
		for (var temp = taggers; temp; temp = temp.t)
		{
			x = temp.s(x);
		}
		return x;
	}

	var map = isCmd
		? _Platform_effectManagers[home].e
		: _Platform_effectManagers[home].f;

	return A2(map, applyTaggers, value)
}


function _Platform_insert(isCmd, newEffect, effects)
{
	effects = effects || { i: _List_Nil, j: _List_Nil };

	isCmd
		? (effects.i = _List_Cons(newEffect, effects.i))
		: (effects.j = _List_Cons(newEffect, effects.j));

	return effects;
}



// PORTS


function _Platform_checkPortName(name)
{
	if (_Platform_effectManagers[name])
	{
		_Debug_crash(3, name)
	}
}



// OUTGOING PORTS


function _Platform_outgoingPort(name, converter)
{
	_Platform_checkPortName(name);
	_Platform_effectManagers[name] = {
		e: _Platform_outgoingPortMap,
		u: converter,
		a: _Platform_setupOutgoingPort
	};
	return _Platform_leaf(name);
}


var _Platform_outgoingPortMap = F2(function(tagger, value) { return value; });


function _Platform_setupOutgoingPort(name)
{
	var subs = [];
	var converter = _Platform_effectManagers[name].u;

	// CREATE MANAGER

	var init = _Process_sleep(0);

	_Platform_effectManagers[name].b = init;
	_Platform_effectManagers[name].c = F3(function(router, cmdList, state)
	{
		for ( ; cmdList.b; cmdList = cmdList.b) // WHILE_CONS
		{
			// grab a separate reference to subs in case unsubscribe is called
			var currentSubs = subs;
			var value = _Json_unwrap(converter(cmdList.a));
			for (var i = 0; i < currentSubs.length; i++)
			{
				currentSubs[i](value);
			}
		}
		return init;
	});

	// PUBLIC API

	function subscribe(callback)
	{
		subs.push(callback);
	}

	function unsubscribe(callback)
	{
		// copy subs into a new array in case unsubscribe is called within a
		// subscribed callback
		subs = subs.slice();
		var index = subs.indexOf(callback);
		if (index >= 0)
		{
			subs.splice(index, 1);
		}
	}

	return {
		subscribe: subscribe,
		unsubscribe: unsubscribe
	};
}



// INCOMING PORTS


function _Platform_incomingPort(name, converter)
{
	_Platform_checkPortName(name);
	_Platform_effectManagers[name] = {
		f: _Platform_incomingPortMap,
		u: converter,
		a: _Platform_setupIncomingPort
	};
	return _Platform_leaf(name);
}


var _Platform_incomingPortMap = F2(function(tagger, finalTagger)
{
	return function(value)
	{
		return tagger(finalTagger(value));
	};
});


function _Platform_setupIncomingPort(name, sendToApp)
{
	var subs = _List_Nil;
	var converter = _Platform_effectManagers[name].u;

	// CREATE MANAGER

	var init = _Scheduler_succeed(null);

	_Platform_effectManagers[name].b = init;
	_Platform_effectManagers[name].c = F3(function(router, subList, state)
	{
		subs = subList;
		return init;
	});

	// PUBLIC API

	function send(incomingValue)
	{
		var result = A2(_Json_run, converter, _Json_wrap(incomingValue));

		$elm$core$Result$isOk(result) || _Debug_crash(4, name, result.a);

		var value = result.a;
		for (var temp = subs; temp.b; temp = temp.b) // WHILE_CONS
		{
			sendToApp(temp.a(value));
		}
	}

	return { send: send };
}



// EXPORT ELM MODULES
//
// Have DEBUG and PROD versions so that we can (1) give nicer errors in
// debug mode and (2) not pay for the bits needed for that in prod mode.
//


function _Platform_export_UNUSED(exports)
{
	scope['Elm']
		? _Platform_mergeExportsProd(scope['Elm'], exports)
		: scope['Elm'] = exports;
}


function _Platform_mergeExportsProd(obj, exports)
{
	for (var name in exports)
	{
		(name in obj)
			? (name == 'init')
				? _Debug_crash(6)
				: _Platform_mergeExportsProd(obj[name], exports[name])
			: (obj[name] = exports[name]);
	}
}


function _Platform_export(exports)
{
	scope['Elm']
		? _Platform_mergeExportsDebug('Elm', scope['Elm'], exports)
		: scope['Elm'] = exports;
}


function _Platform_mergeExportsDebug(moduleName, obj, exports)
{
	for (var name in exports)
	{
		(name in obj)
			? (name == 'init')
				? _Debug_crash(6, moduleName)
				: _Platform_mergeExportsDebug(moduleName + '.' + name, obj[name], exports[name])
			: (obj[name] = exports[name]);
	}
}




// HELPERS


var _VirtualDom_divertHrefToApp;

var _VirtualDom_doc = typeof document !== 'undefined' ? document : {};


function _VirtualDom_appendChild(parent, child)
{
	parent.appendChild(child);
}

var _VirtualDom_init = F4(function(virtualNode, flagDecoder, debugMetadata, args)
{
	// NOTE: this function needs _Platform_export available to work

	/**_UNUSED/
	var node = args['node'];
	//*/
	/**/
	var node = args && args['node'] ? args['node'] : _Debug_crash(0);
	//*/

	node.parentNode.replaceChild(
		_VirtualDom_render(virtualNode, function() {}),
		node
	);

	return {};
});



// TEXT


function _VirtualDom_text(string)
{
	return {
		$: 0,
		a: string
	};
}



// NODE


var _VirtualDom_nodeNS = F2(function(namespace, tag)
{
	return F2(function(factList, kidList)
	{
		for (var kids = [], descendantsCount = 0; kidList.b; kidList = kidList.b) // WHILE_CONS
		{
			var kid = kidList.a;
			descendantsCount += (kid.b || 0);
			kids.push(kid);
		}
		descendantsCount += kids.length;

		return {
			$: 1,
			c: tag,
			d: _VirtualDom_organizeFacts(factList),
			e: kids,
			f: namespace,
			b: descendantsCount
		};
	});
});


var _VirtualDom_node = _VirtualDom_nodeNS(undefined);



// KEYED NODE


var _VirtualDom_keyedNodeNS = F2(function(namespace, tag)
{
	return F2(function(factList, kidList)
	{
		for (var kids = [], descendantsCount = 0; kidList.b; kidList = kidList.b) // WHILE_CONS
		{
			var kid = kidList.a;
			descendantsCount += (kid.b.b || 0);
			kids.push(kid);
		}
		descendantsCount += kids.length;

		return {
			$: 2,
			c: tag,
			d: _VirtualDom_organizeFacts(factList),
			e: kids,
			f: namespace,
			b: descendantsCount
		};
	});
});


var _VirtualDom_keyedNode = _VirtualDom_keyedNodeNS(undefined);



// CUSTOM


function _VirtualDom_custom(factList, model, render, diff)
{
	return {
		$: 3,
		d: _VirtualDom_organizeFacts(factList),
		g: model,
		h: render,
		i: diff
	};
}



// MAP


var _VirtualDom_map = F2(function(tagger, node)
{
	return {
		$: 4,
		j: tagger,
		k: node,
		b: 1 + (node.b || 0)
	};
});



// LAZY


function _VirtualDom_thunk(refs, thunk)
{
	return {
		$: 5,
		l: refs,
		m: thunk,
		k: undefined
	};
}

var _VirtualDom_lazy = F2(function(func, a)
{
	return _VirtualDom_thunk([func, a], function() {
		return func(a);
	});
});

var _VirtualDom_lazy2 = F3(function(func, a, b)
{
	return _VirtualDom_thunk([func, a, b], function() {
		return A2(func, a, b);
	});
});

var _VirtualDom_lazy3 = F4(function(func, a, b, c)
{
	return _VirtualDom_thunk([func, a, b, c], function() {
		return A3(func, a, b, c);
	});
});

var _VirtualDom_lazy4 = F5(function(func, a, b, c, d)
{
	return _VirtualDom_thunk([func, a, b, c, d], function() {
		return A4(func, a, b, c, d);
	});
});

var _VirtualDom_lazy5 = F6(function(func, a, b, c, d, e)
{
	return _VirtualDom_thunk([func, a, b, c, d, e], function() {
		return A5(func, a, b, c, d, e);
	});
});

var _VirtualDom_lazy6 = F7(function(func, a, b, c, d, e, f)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f], function() {
		return A6(func, a, b, c, d, e, f);
	});
});

var _VirtualDom_lazy7 = F8(function(func, a, b, c, d, e, f, g)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f, g], function() {
		return A7(func, a, b, c, d, e, f, g);
	});
});

var _VirtualDom_lazy8 = F9(function(func, a, b, c, d, e, f, g, h)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f, g, h], function() {
		return A8(func, a, b, c, d, e, f, g, h);
	});
});



// FACTS


var _VirtualDom_on = F2(function(key, handler)
{
	return {
		$: 'a0',
		n: key,
		o: handler
	};
});
var _VirtualDom_style = F2(function(key, value)
{
	return {
		$: 'a1',
		n: key,
		o: value
	};
});
var _VirtualDom_property = F2(function(key, value)
{
	return {
		$: 'a2',
		n: key,
		o: value
	};
});
var _VirtualDom_attribute = F2(function(key, value)
{
	return {
		$: 'a3',
		n: key,
		o: value
	};
});
var _VirtualDom_attributeNS = F3(function(namespace, key, value)
{
	return {
		$: 'a4',
		n: key,
		o: { f: namespace, o: value }
	};
});



// XSS ATTACK VECTOR CHECKS
//
// For some reason, tabs can appear in href protocols and it still works.
// So '\tjava\tSCRIPT:alert("!!!")' and 'javascript:alert("!!!")' are the same
// in practice. That is why _VirtualDom_RE_js and _VirtualDom_RE_js_html look
// so freaky.
//
// Pulling the regular expressions out to the top level gives a slight speed
// boost in small benchmarks (4-10%) but hoisting values to reduce allocation
// can be unpredictable in large programs where JIT may have a harder time with
// functions are not fully self-contained. The benefit is more that the js and
// js_html ones are so weird that I prefer to see them near each other.


var _VirtualDom_RE_script = /^script$/i;
var _VirtualDom_RE_on_formAction = /^(on|formAction$)/i;
var _VirtualDom_RE_js = /^\s*j\s*a\s*v\s*a\s*s\s*c\s*r\s*i\s*p\s*t\s*:/i;
var _VirtualDom_RE_js_html = /^\s*(j\s*a\s*v\s*a\s*s\s*c\s*r\s*i\s*p\s*t\s*:|d\s*a\s*t\s*a\s*:\s*t\s*e\s*x\s*t\s*\/\s*h\s*t\s*m\s*l\s*(,|;))/i;


function _VirtualDom_noScript(tag)
{
	return _VirtualDom_RE_script.test(tag) ? 'p' : tag;
}

function _VirtualDom_noOnOrFormAction(key)
{
	return _VirtualDom_RE_on_formAction.test(key) ? 'data-' + key : key;
}

function _VirtualDom_noInnerHtmlOrFormAction(key)
{
	return key == 'innerHTML' || key == 'formAction' ? 'data-' + key : key;
}

function _VirtualDom_noJavaScriptUri(value)
{
	return _VirtualDom_RE_js.test(value)
		? /**_UNUSED/''//*//**/'javascript:alert("This is an XSS vector. Please use ports or web components instead.")'//*/
		: value;
}

function _VirtualDom_noJavaScriptOrHtmlUri(value)
{
	return _VirtualDom_RE_js_html.test(value)
		? /**_UNUSED/''//*//**/'javascript:alert("This is an XSS vector. Please use ports or web components instead.")'//*/
		: value;
}

function _VirtualDom_noJavaScriptOrHtmlJson(value)
{
	return (typeof _Json_unwrap(value) === 'string' && _VirtualDom_RE_js_html.test(_Json_unwrap(value)))
		? _Json_wrap(
			/**_UNUSED/''//*//**/'javascript:alert("This is an XSS vector. Please use ports or web components instead.")'//*/
		) : value;
}



// MAP FACTS


var _VirtualDom_mapAttribute = F2(function(func, attr)
{
	return (attr.$ === 'a0')
		? A2(_VirtualDom_on, attr.n, _VirtualDom_mapHandler(func, attr.o))
		: attr;
});

function _VirtualDom_mapHandler(func, handler)
{
	var tag = $elm$virtual_dom$VirtualDom$toHandlerInt(handler);

	// 0 = Normal
	// 1 = MayStopPropagation
	// 2 = MayPreventDefault
	// 3 = Custom

	return {
		$: handler.$,
		a:
			!tag
				? A2($elm$json$Json$Decode$map, func, handler.a)
				:
			A3($elm$json$Json$Decode$map2,
				tag < 3
					? _VirtualDom_mapEventTuple
					: _VirtualDom_mapEventRecord,
				$elm$json$Json$Decode$succeed(func),
				handler.a
			)
	};
}

var _VirtualDom_mapEventTuple = F2(function(func, tuple)
{
	return _Utils_Tuple2(func(tuple.a), tuple.b);
});

var _VirtualDom_mapEventRecord = F2(function(func, record)
{
	return {
		message: func(record.message),
		stopPropagation: record.stopPropagation,
		preventDefault: record.preventDefault
	}
});



// ORGANIZE FACTS


function _VirtualDom_organizeFacts(factList)
{
	for (var facts = {}; factList.b; factList = factList.b) // WHILE_CONS
	{
		var entry = factList.a;

		var tag = entry.$;
		var key = entry.n;
		var value = entry.o;

		if (tag === 'a2')
		{
			(key === 'className')
				? _VirtualDom_addClass(facts, key, _Json_unwrap(value))
				: facts[key] = _Json_unwrap(value);

			continue;
		}

		var subFacts = facts[tag] || (facts[tag] = {});
		(tag === 'a3' && key === 'class')
			? _VirtualDom_addClass(subFacts, key, value)
			: subFacts[key] = value;
	}

	return facts;
}

function _VirtualDom_addClass(object, key, newClass)
{
	var classes = object[key];
	object[key] = classes ? classes + ' ' + newClass : newClass;
}



// RENDER


function _VirtualDom_render(vNode, eventNode)
{
	var tag = vNode.$;

	if (tag === 5)
	{
		return _VirtualDom_render(vNode.k || (vNode.k = vNode.m()), eventNode);
	}

	if (tag === 0)
	{
		return _VirtualDom_doc.createTextNode(vNode.a);
	}

	if (tag === 4)
	{
		var subNode = vNode.k;
		var tagger = vNode.j;

		while (subNode.$ === 4)
		{
			typeof tagger !== 'object'
				? tagger = [tagger, subNode.j]
				: tagger.push(subNode.j);

			subNode = subNode.k;
		}

		var subEventRoot = { j: tagger, p: eventNode };
		var domNode = _VirtualDom_render(subNode, subEventRoot);
		domNode.elm_event_node_ref = subEventRoot;
		return domNode;
	}

	if (tag === 3)
	{
		var domNode = vNode.h(vNode.g);
		_VirtualDom_applyFacts(domNode, eventNode, vNode.d);
		return domNode;
	}

	// at this point `tag` must be 1 or 2

	var domNode = vNode.f
		? _VirtualDom_doc.createElementNS(vNode.f, vNode.c)
		: _VirtualDom_doc.createElement(vNode.c);

	if (_VirtualDom_divertHrefToApp && vNode.c == 'a')
	{
		domNode.addEventListener('click', _VirtualDom_divertHrefToApp(domNode));
	}

	_VirtualDom_applyFacts(domNode, eventNode, vNode.d);

	for (var kids = vNode.e, i = 0; i < kids.length; i++)
	{
		_VirtualDom_appendChild(domNode, _VirtualDom_render(tag === 1 ? kids[i] : kids[i].b, eventNode));
	}

	return domNode;
}



// APPLY FACTS


function _VirtualDom_applyFacts(domNode, eventNode, facts)
{
	for (var key in facts)
	{
		var value = facts[key];

		key === 'a1'
			? _VirtualDom_applyStyles(domNode, value)
			:
		key === 'a0'
			? _VirtualDom_applyEvents(domNode, eventNode, value)
			:
		key === 'a3'
			? _VirtualDom_applyAttrs(domNode, value)
			:
		key === 'a4'
			? _VirtualDom_applyAttrsNS(domNode, value)
			:
		((key !== 'value' && key !== 'checked') || domNode[key] !== value) && (domNode[key] = value);
	}
}



// APPLY STYLES


function _VirtualDom_applyStyles(domNode, styles)
{
	var domNodeStyle = domNode.style;

	for (var key in styles)
	{
		domNodeStyle[key] = styles[key];
	}
}



// APPLY ATTRS


function _VirtualDom_applyAttrs(domNode, attrs)
{
	for (var key in attrs)
	{
		var value = attrs[key];
		typeof value !== 'undefined'
			? domNode.setAttribute(key, value)
			: domNode.removeAttribute(key);
	}
}



// APPLY NAMESPACED ATTRS


function _VirtualDom_applyAttrsNS(domNode, nsAttrs)
{
	for (var key in nsAttrs)
	{
		var pair = nsAttrs[key];
		var namespace = pair.f;
		var value = pair.o;

		typeof value !== 'undefined'
			? domNode.setAttributeNS(namespace, key, value)
			: domNode.removeAttributeNS(namespace, key);
	}
}



// APPLY EVENTS


function _VirtualDom_applyEvents(domNode, eventNode, events)
{
	var allCallbacks = domNode.elmFs || (domNode.elmFs = {});

	for (var key in events)
	{
		var newHandler = events[key];
		var oldCallback = allCallbacks[key];

		if (!newHandler)
		{
			domNode.removeEventListener(key, oldCallback);
			allCallbacks[key] = undefined;
			continue;
		}

		if (oldCallback)
		{
			var oldHandler = oldCallback.q;
			if (oldHandler.$ === newHandler.$)
			{
				oldCallback.q = newHandler;
				continue;
			}
			domNode.removeEventListener(key, oldCallback);
		}

		oldCallback = _VirtualDom_makeCallback(eventNode, newHandler);
		domNode.addEventListener(key, oldCallback,
			_VirtualDom_passiveSupported
			&& { passive: $elm$virtual_dom$VirtualDom$toHandlerInt(newHandler) < 2 }
		);
		allCallbacks[key] = oldCallback;
	}
}



// PASSIVE EVENTS


var _VirtualDom_passiveSupported;

try
{
	window.addEventListener('t', null, Object.defineProperty({}, 'passive', {
		get: function() { _VirtualDom_passiveSupported = true; }
	}));
}
catch(e) {}



// EVENT HANDLERS


function _VirtualDom_makeCallback(eventNode, initialHandler)
{
	function callback(event)
	{
		var handler = callback.q;
		var result = _Json_runHelp(handler.a, event);

		if (!$elm$core$Result$isOk(result))
		{
			return;
		}

		var tag = $elm$virtual_dom$VirtualDom$toHandlerInt(handler);

		// 0 = Normal
		// 1 = MayStopPropagation
		// 2 = MayPreventDefault
		// 3 = Custom

		var value = result.a;
		var message = !tag ? value : tag < 3 ? value.a : value.message;
		var stopPropagation = tag == 1 ? value.b : tag == 3 && value.stopPropagation;
		var currentEventNode = (
			stopPropagation && event.stopPropagation(),
			(tag == 2 ? value.b : tag == 3 && value.preventDefault) && event.preventDefault(),
			eventNode
		);
		var tagger;
		var i;
		while (tagger = currentEventNode.j)
		{
			if (typeof tagger == 'function')
			{
				message = tagger(message);
			}
			else
			{
				for (var i = tagger.length; i--; )
				{
					message = tagger[i](message);
				}
			}
			currentEventNode = currentEventNode.p;
		}
		currentEventNode(message, stopPropagation); // stopPropagation implies isSync
	}

	callback.q = initialHandler;

	return callback;
}

function _VirtualDom_equalEvents(x, y)
{
	return x.$ == y.$ && _Json_equality(x.a, y.a);
}



// DIFF


// TODO: Should we do patches like in iOS?
//
// type Patch
//   = At Int Patch
//   | Batch (List Patch)
//   | Change ...
//
// How could it not be better?
//
function _VirtualDom_diff(x, y)
{
	var patches = [];
	_VirtualDom_diffHelp(x, y, patches, 0);
	return patches;
}


function _VirtualDom_pushPatch(patches, type, index, data)
{
	var patch = {
		$: type,
		r: index,
		s: data,
		t: undefined,
		u: undefined
	};
	patches.push(patch);
	return patch;
}


function _VirtualDom_diffHelp(x, y, patches, index)
{
	if (x === y)
	{
		return;
	}

	var xType = x.$;
	var yType = y.$;

	// Bail if you run into different types of nodes. Implies that the
	// structure has changed significantly and it's not worth a diff.
	if (xType !== yType)
	{
		if (xType === 1 && yType === 2)
		{
			y = _VirtualDom_dekey(y);
			yType = 1;
		}
		else
		{
			_VirtualDom_pushPatch(patches, 0, index, y);
			return;
		}
	}

	// Now we know that both nodes are the same $.
	switch (yType)
	{
		case 5:
			var xRefs = x.l;
			var yRefs = y.l;
			var i = xRefs.length;
			var same = i === yRefs.length;
			while (same && i--)
			{
				same = xRefs[i] === yRefs[i];
			}
			if (same)
			{
				y.k = x.k;
				return;
			}
			y.k = y.m();
			var subPatches = [];
			_VirtualDom_diffHelp(x.k, y.k, subPatches, 0);
			subPatches.length > 0 && _VirtualDom_pushPatch(patches, 1, index, subPatches);
			return;

		case 4:
			// gather nested taggers
			var xTaggers = x.j;
			var yTaggers = y.j;
			var nesting = false;

			var xSubNode = x.k;
			while (xSubNode.$ === 4)
			{
				nesting = true;

				typeof xTaggers !== 'object'
					? xTaggers = [xTaggers, xSubNode.j]
					: xTaggers.push(xSubNode.j);

				xSubNode = xSubNode.k;
			}

			var ySubNode = y.k;
			while (ySubNode.$ === 4)
			{
				nesting = true;

				typeof yTaggers !== 'object'
					? yTaggers = [yTaggers, ySubNode.j]
					: yTaggers.push(ySubNode.j);

				ySubNode = ySubNode.k;
			}

			// Just bail if different numbers of taggers. This implies the
			// structure of the virtual DOM has changed.
			if (nesting && xTaggers.length !== yTaggers.length)
			{
				_VirtualDom_pushPatch(patches, 0, index, y);
				return;
			}

			// check if taggers are "the same"
			if (nesting ? !_VirtualDom_pairwiseRefEqual(xTaggers, yTaggers) : xTaggers !== yTaggers)
			{
				_VirtualDom_pushPatch(patches, 2, index, yTaggers);
			}

			// diff everything below the taggers
			_VirtualDom_diffHelp(xSubNode, ySubNode, patches, index + 1);
			return;

		case 0:
			if (x.a !== y.a)
			{
				_VirtualDom_pushPatch(patches, 3, index, y.a);
			}
			return;

		case 1:
			_VirtualDom_diffNodes(x, y, patches, index, _VirtualDom_diffKids);
			return;

		case 2:
			_VirtualDom_diffNodes(x, y, patches, index, _VirtualDom_diffKeyedKids);
			return;

		case 3:
			if (x.h !== y.h)
			{
				_VirtualDom_pushPatch(patches, 0, index, y);
				return;
			}

			var factsDiff = _VirtualDom_diffFacts(x.d, y.d);
			factsDiff && _VirtualDom_pushPatch(patches, 4, index, factsDiff);

			var patch = y.i(x.g, y.g);
			patch && _VirtualDom_pushPatch(patches, 5, index, patch);

			return;
	}
}

// assumes the incoming arrays are the same length
function _VirtualDom_pairwiseRefEqual(as, bs)
{
	for (var i = 0; i < as.length; i++)
	{
		if (as[i] !== bs[i])
		{
			return false;
		}
	}

	return true;
}

function _VirtualDom_diffNodes(x, y, patches, index, diffKids)
{
	// Bail if obvious indicators have changed. Implies more serious
	// structural changes such that it's not worth it to diff.
	if (x.c !== y.c || x.f !== y.f)
	{
		_VirtualDom_pushPatch(patches, 0, index, y);
		return;
	}

	var factsDiff = _VirtualDom_diffFacts(x.d, y.d);
	factsDiff && _VirtualDom_pushPatch(patches, 4, index, factsDiff);

	diffKids(x, y, patches, index);
}



// DIFF FACTS


// TODO Instead of creating a new diff object, it's possible to just test if
// there *is* a diff. During the actual patch, do the diff again and make the
// modifications directly. This way, there's no new allocations. Worth it?
function _VirtualDom_diffFacts(x, y, category)
{
	var diff;

	// look for changes and removals
	for (var xKey in x)
	{
		if (xKey === 'a1' || xKey === 'a0' || xKey === 'a3' || xKey === 'a4')
		{
			var subDiff = _VirtualDom_diffFacts(x[xKey], y[xKey] || {}, xKey);
			if (subDiff)
			{
				diff = diff || {};
				diff[xKey] = subDiff;
			}
			continue;
		}

		// remove if not in the new facts
		if (!(xKey in y))
		{
			diff = diff || {};
			diff[xKey] =
				!category
					? (typeof x[xKey] === 'string' ? '' : null)
					:
				(category === 'a1')
					? ''
					:
				(category === 'a0' || category === 'a3')
					? undefined
					:
				{ f: x[xKey].f, o: undefined };

			continue;
		}

		var xValue = x[xKey];
		var yValue = y[xKey];

		// reference equal, so don't worry about it
		if (xValue === yValue && xKey !== 'value' && xKey !== 'checked'
			|| category === 'a0' && _VirtualDom_equalEvents(xValue, yValue))
		{
			continue;
		}

		diff = diff || {};
		diff[xKey] = yValue;
	}

	// add new stuff
	for (var yKey in y)
	{
		if (!(yKey in x))
		{
			diff = diff || {};
			diff[yKey] = y[yKey];
		}
	}

	return diff;
}



// DIFF KIDS


function _VirtualDom_diffKids(xParent, yParent, patches, index)
{
	var xKids = xParent.e;
	var yKids = yParent.e;

	var xLen = xKids.length;
	var yLen = yKids.length;

	// FIGURE OUT IF THERE ARE INSERTS OR REMOVALS

	if (xLen > yLen)
	{
		_VirtualDom_pushPatch(patches, 6, index, {
			v: yLen,
			i: xLen - yLen
		});
	}
	else if (xLen < yLen)
	{
		_VirtualDom_pushPatch(patches, 7, index, {
			v: xLen,
			e: yKids
		});
	}

	// PAIRWISE DIFF EVERYTHING ELSE

	for (var minLen = xLen < yLen ? xLen : yLen, i = 0; i < minLen; i++)
	{
		var xKid = xKids[i];
		_VirtualDom_diffHelp(xKid, yKids[i], patches, ++index);
		index += xKid.b || 0;
	}
}



// KEYED DIFF


function _VirtualDom_diffKeyedKids(xParent, yParent, patches, rootIndex)
{
	var localPatches = [];

	var changes = {}; // Dict String Entry
	var inserts = []; // Array { index : Int, entry : Entry }
	// type Entry = { tag : String, vnode : VNode, index : Int, data : _ }

	var xKids = xParent.e;
	var yKids = yParent.e;
	var xLen = xKids.length;
	var yLen = yKids.length;
	var xIndex = 0;
	var yIndex = 0;

	var index = rootIndex;

	while (xIndex < xLen && yIndex < yLen)
	{
		var x = xKids[xIndex];
		var y = yKids[yIndex];

		var xKey = x.a;
		var yKey = y.a;
		var xNode = x.b;
		var yNode = y.b;

		var newMatch = undefined;
		var oldMatch = undefined;

		// check if keys match

		if (xKey === yKey)
		{
			index++;
			_VirtualDom_diffHelp(xNode, yNode, localPatches, index);
			index += xNode.b || 0;

			xIndex++;
			yIndex++;
			continue;
		}

		// look ahead 1 to detect insertions and removals.

		var xNext = xKids[xIndex + 1];
		var yNext = yKids[yIndex + 1];

		if (xNext)
		{
			var xNextKey = xNext.a;
			var xNextNode = xNext.b;
			oldMatch = yKey === xNextKey;
		}

		if (yNext)
		{
			var yNextKey = yNext.a;
			var yNextNode = yNext.b;
			newMatch = xKey === yNextKey;
		}


		// swap x and y
		if (newMatch && oldMatch)
		{
			index++;
			_VirtualDom_diffHelp(xNode, yNextNode, localPatches, index);
			_VirtualDom_insertNode(changes, localPatches, xKey, yNode, yIndex, inserts);
			index += xNode.b || 0;

			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNextNode, index);
			index += xNextNode.b || 0;

			xIndex += 2;
			yIndex += 2;
			continue;
		}

		// insert y
		if (newMatch)
		{
			index++;
			_VirtualDom_insertNode(changes, localPatches, yKey, yNode, yIndex, inserts);
			_VirtualDom_diffHelp(xNode, yNextNode, localPatches, index);
			index += xNode.b || 0;

			xIndex += 1;
			yIndex += 2;
			continue;
		}

		// remove x
		if (oldMatch)
		{
			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNode, index);
			index += xNode.b || 0;

			index++;
			_VirtualDom_diffHelp(xNextNode, yNode, localPatches, index);
			index += xNextNode.b || 0;

			xIndex += 2;
			yIndex += 1;
			continue;
		}

		// remove x, insert y
		if (xNext && xNextKey === yNextKey)
		{
			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNode, index);
			_VirtualDom_insertNode(changes, localPatches, yKey, yNode, yIndex, inserts);
			index += xNode.b || 0;

			index++;
			_VirtualDom_diffHelp(xNextNode, yNextNode, localPatches, index);
			index += xNextNode.b || 0;

			xIndex += 2;
			yIndex += 2;
			continue;
		}

		break;
	}

	// eat up any remaining nodes with removeNode and insertNode

	while (xIndex < xLen)
	{
		index++;
		var x = xKids[xIndex];
		var xNode = x.b;
		_VirtualDom_removeNode(changes, localPatches, x.a, xNode, index);
		index += xNode.b || 0;
		xIndex++;
	}

	while (yIndex < yLen)
	{
		var endInserts = endInserts || [];
		var y = yKids[yIndex];
		_VirtualDom_insertNode(changes, localPatches, y.a, y.b, undefined, endInserts);
		yIndex++;
	}

	if (localPatches.length > 0 || inserts.length > 0 || endInserts)
	{
		_VirtualDom_pushPatch(patches, 8, rootIndex, {
			w: localPatches,
			x: inserts,
			y: endInserts
		});
	}
}



// CHANGES FROM KEYED DIFF


var _VirtualDom_POSTFIX = '_elmW6BL';


function _VirtualDom_insertNode(changes, localPatches, key, vnode, yIndex, inserts)
{
	var entry = changes[key];

	// never seen this key before
	if (!entry)
	{
		entry = {
			c: 0,
			z: vnode,
			r: yIndex,
			s: undefined
		};

		inserts.push({ r: yIndex, A: entry });
		changes[key] = entry;

		return;
	}

	// this key was removed earlier, a match!
	if (entry.c === 1)
	{
		inserts.push({ r: yIndex, A: entry });

		entry.c = 2;
		var subPatches = [];
		_VirtualDom_diffHelp(entry.z, vnode, subPatches, entry.r);
		entry.r = yIndex;
		entry.s.s = {
			w: subPatches,
			A: entry
		};

		return;
	}

	// this key has already been inserted or moved, a duplicate!
	_VirtualDom_insertNode(changes, localPatches, key + _VirtualDom_POSTFIX, vnode, yIndex, inserts);
}


function _VirtualDom_removeNode(changes, localPatches, key, vnode, index)
{
	var entry = changes[key];

	// never seen this key before
	if (!entry)
	{
		var patch = _VirtualDom_pushPatch(localPatches, 9, index, undefined);

		changes[key] = {
			c: 1,
			z: vnode,
			r: index,
			s: patch
		};

		return;
	}

	// this key was inserted earlier, a match!
	if (entry.c === 0)
	{
		entry.c = 2;
		var subPatches = [];
		_VirtualDom_diffHelp(vnode, entry.z, subPatches, index);

		_VirtualDom_pushPatch(localPatches, 9, index, {
			w: subPatches,
			A: entry
		});

		return;
	}

	// this key has already been removed or moved, a duplicate!
	_VirtualDom_removeNode(changes, localPatches, key + _VirtualDom_POSTFIX, vnode, index);
}



// ADD DOM NODES
//
// Each DOM node has an "index" assigned in order of traversal. It is important
// to minimize our crawl over the actual DOM, so these indexes (along with the
// descendantsCount of virtual nodes) let us skip touching entire subtrees of
// the DOM if we know there are no patches there.


function _VirtualDom_addDomNodes(domNode, vNode, patches, eventNode)
{
	_VirtualDom_addDomNodesHelp(domNode, vNode, patches, 0, 0, vNode.b, eventNode);
}


// assumes `patches` is non-empty and indexes increase monotonically.
function _VirtualDom_addDomNodesHelp(domNode, vNode, patches, i, low, high, eventNode)
{
	var patch = patches[i];
	var index = patch.r;

	while (index === low)
	{
		var patchType = patch.$;

		if (patchType === 1)
		{
			_VirtualDom_addDomNodes(domNode, vNode.k, patch.s, eventNode);
		}
		else if (patchType === 8)
		{
			patch.t = domNode;
			patch.u = eventNode;

			var subPatches = patch.s.w;
			if (subPatches.length > 0)
			{
				_VirtualDom_addDomNodesHelp(domNode, vNode, subPatches, 0, low, high, eventNode);
			}
		}
		else if (patchType === 9)
		{
			patch.t = domNode;
			patch.u = eventNode;

			var data = patch.s;
			if (data)
			{
				data.A.s = domNode;
				var subPatches = data.w;
				if (subPatches.length > 0)
				{
					_VirtualDom_addDomNodesHelp(domNode, vNode, subPatches, 0, low, high, eventNode);
				}
			}
		}
		else
		{
			patch.t = domNode;
			patch.u = eventNode;
		}

		i++;

		if (!(patch = patches[i]) || (index = patch.r) > high)
		{
			return i;
		}
	}

	var tag = vNode.$;

	if (tag === 4)
	{
		var subNode = vNode.k;

		while (subNode.$ === 4)
		{
			subNode = subNode.k;
		}

		return _VirtualDom_addDomNodesHelp(domNode, subNode, patches, i, low + 1, high, domNode.elm_event_node_ref);
	}

	// tag must be 1 or 2 at this point

	var vKids = vNode.e;
	var childNodes = domNode.childNodes;
	for (var j = 0; j < vKids.length; j++)
	{
		low++;
		var vKid = tag === 1 ? vKids[j] : vKids[j].b;
		var nextLow = low + (vKid.b || 0);
		if (low <= index && index <= nextLow)
		{
			i = _VirtualDom_addDomNodesHelp(childNodes[j], vKid, patches, i, low, nextLow, eventNode);
			if (!(patch = patches[i]) || (index = patch.r) > high)
			{
				return i;
			}
		}
		low = nextLow;
	}
	return i;
}



// APPLY PATCHES


function _VirtualDom_applyPatches(rootDomNode, oldVirtualNode, patches, eventNode)
{
	if (patches.length === 0)
	{
		return rootDomNode;
	}

	_VirtualDom_addDomNodes(rootDomNode, oldVirtualNode, patches, eventNode);
	return _VirtualDom_applyPatchesHelp(rootDomNode, patches);
}

function _VirtualDom_applyPatchesHelp(rootDomNode, patches)
{
	for (var i = 0; i < patches.length; i++)
	{
		var patch = patches[i];
		var localDomNode = patch.t
		var newNode = _VirtualDom_applyPatch(localDomNode, patch);
		if (localDomNode === rootDomNode)
		{
			rootDomNode = newNode;
		}
	}
	return rootDomNode;
}

function _VirtualDom_applyPatch(domNode, patch)
{
	switch (patch.$)
	{
		case 0:
			return _VirtualDom_applyPatchRedraw(domNode, patch.s, patch.u);

		case 4:
			_VirtualDom_applyFacts(domNode, patch.u, patch.s);
			return domNode;

		case 3:
			domNode.replaceData(0, domNode.length, patch.s);
			return domNode;

		case 1:
			return _VirtualDom_applyPatchesHelp(domNode, patch.s);

		case 2:
			if (domNode.elm_event_node_ref)
			{
				domNode.elm_event_node_ref.j = patch.s;
			}
			else
			{
				domNode.elm_event_node_ref = { j: patch.s, p: patch.u };
			}
			return domNode;

		case 6:
			var data = patch.s;
			for (var i = 0; i < data.i; i++)
			{
				domNode.removeChild(domNode.childNodes[data.v]);
			}
			return domNode;

		case 7:
			var data = patch.s;
			var kids = data.e;
			var i = data.v;
			var theEnd = domNode.childNodes[i];
			for (; i < kids.length; i++)
			{
				domNode.insertBefore(_VirtualDom_render(kids[i], patch.u), theEnd);
			}
			return domNode;

		case 9:
			var data = patch.s;
			if (!data)
			{
				domNode.parentNode.removeChild(domNode);
				return domNode;
			}
			var entry = data.A;
			if (typeof entry.r !== 'undefined')
			{
				domNode.parentNode.removeChild(domNode);
			}
			entry.s = _VirtualDom_applyPatchesHelp(domNode, data.w);
			return domNode;

		case 8:
			return _VirtualDom_applyPatchReorder(domNode, patch);

		case 5:
			return patch.s(domNode);

		default:
			_Debug_crash(10); // 'Ran into an unknown patch!'
	}
}


function _VirtualDom_applyPatchRedraw(domNode, vNode, eventNode)
{
	var parentNode = domNode.parentNode;
	var newNode = _VirtualDom_render(vNode, eventNode);

	if (!newNode.elm_event_node_ref)
	{
		newNode.elm_event_node_ref = domNode.elm_event_node_ref;
	}

	if (parentNode && newNode !== domNode)
	{
		parentNode.replaceChild(newNode, domNode);
	}
	return newNode;
}


function _VirtualDom_applyPatchReorder(domNode, patch)
{
	var data = patch.s;

	// remove end inserts
	var frag = _VirtualDom_applyPatchReorderEndInsertsHelp(data.y, patch);

	// removals
	domNode = _VirtualDom_applyPatchesHelp(domNode, data.w);

	// inserts
	var inserts = data.x;
	for (var i = 0; i < inserts.length; i++)
	{
		var insert = inserts[i];
		var entry = insert.A;
		var node = entry.c === 2
			? entry.s
			: _VirtualDom_render(entry.z, patch.u);
		domNode.insertBefore(node, domNode.childNodes[insert.r]);
	}

	// add end inserts
	if (frag)
	{
		_VirtualDom_appendChild(domNode, frag);
	}

	return domNode;
}


function _VirtualDom_applyPatchReorderEndInsertsHelp(endInserts, patch)
{
	if (!endInserts)
	{
		return;
	}

	var frag = _VirtualDom_doc.createDocumentFragment();
	for (var i = 0; i < endInserts.length; i++)
	{
		var insert = endInserts[i];
		var entry = insert.A;
		_VirtualDom_appendChild(frag, entry.c === 2
			? entry.s
			: _VirtualDom_render(entry.z, patch.u)
		);
	}
	return frag;
}


function _VirtualDom_virtualize(node)
{
	// TEXT NODES

	if (node.nodeType === 3)
	{
		return _VirtualDom_text(node.textContent);
	}


	// WEIRD NODES

	if (node.nodeType !== 1)
	{
		return _VirtualDom_text('');
	}


	// ELEMENT NODES

	var attrList = _List_Nil;
	var attrs = node.attributes;
	for (var i = attrs.length; i--; )
	{
		var attr = attrs[i];
		var name = attr.name;
		var value = attr.value;
		attrList = _List_Cons( A2(_VirtualDom_attribute, name, value), attrList );
	}

	var tag = node.tagName.toLowerCase();
	var kidList = _List_Nil;
	var kids = node.childNodes;

	for (var i = kids.length; i--; )
	{
		kidList = _List_Cons(_VirtualDom_virtualize(kids[i]), kidList);
	}
	return A3(_VirtualDom_node, tag, attrList, kidList);
}

function _VirtualDom_dekey(keyedNode)
{
	var keyedKids = keyedNode.e;
	var len = keyedKids.length;
	var kids = new Array(len);
	for (var i = 0; i < len; i++)
	{
		kids[i] = keyedKids[i].b;
	}

	return {
		$: 1,
		c: keyedNode.c,
		d: keyedNode.d,
		e: kids,
		f: keyedNode.f,
		b: keyedNode.b
	};
}



// NOTE: this is duplicating constants also defined in Test.Internal.KernelConstants
//       so if you make any changes here, be sure to synchronize them there!
var virtualDomKernelConstants =
  {
    nodeTypeTagger: 4,
    nodeTypeThunk: 5,
    kids: "e",
    refs: "l",
    thunk: "m",
    node: "k",
    value: "a"
  }

function forceThunks(vNode) {
  if (typeof vNode !== "undefined" && vNode.$ === "#2") {
    // This is a tuple (the kids : List (String, Html) field of a Keyed node); recurse into the right side of the tuple
    vNode.b = forceThunks(vNode.b);
  }
  if (typeof vNode !== 'undefined' && vNode.$ === virtualDomKernelConstants.nodeTypeThunk && !vNode[virtualDomKernelConstants.node]) {
    // This is a lazy node; evaluate it
    var args = vNode[virtualDomKernelConstants.thunk];
    vNode[virtualDomKernelConstants.node] = vNode[virtualDomKernelConstants.thunk].apply(args);
    // And then recurse into the evaluated node
    vNode[virtualDomKernelConstants.node] = forceThunks(vNode[virtualDomKernelConstants.node]);
  }
  if (typeof vNode !== 'undefined' && vNode.$ === virtualDomKernelConstants.nodeTypeTagger) {
    // This is an Html.map; recurse into the node it is wrapping
    vNode[virtualDomKernelConstants.node] = forceThunks(vNode[virtualDomKernelConstants.node]);
  }
  if (typeof vNode !== 'undefined' && typeof vNode[virtualDomKernelConstants.kids] !== 'undefined') {
    // This is something with children (either a node with kids : List Html, or keyed with kids : List (String, Html));
    // recurse into the children
    vNode[virtualDomKernelConstants.kids] = vNode[virtualDomKernelConstants.kids].map(forceThunks);
  }
  return vNode;
}

function _HtmlAsJson_toJson(html)
{
  return _Json_wrap(forceThunks(html));
}

function _HtmlAsJson_eventHandler(event)
{
  return event[virtualDomKernelConstants.value];
}

function _HtmlAsJson_taggerFunction(tagger)
{
  return tagger.a;
}

function _HtmlAsJson_attributeToJson(attribute)
{
  return _Json_wrap(attribute);
}


var _FNV_prime = 16777619;
var _FNV_offset = 2166136261;

function _FNV_hash(object) {
    switch (typeof object) {
    case 'string': return _FNV_hashString(object);
    case 'number': return _FNV_hashNum(object);
    case 'boolean': return object ? _FNV_hashNum(1) : _FNV_hashNum(0);
    case 'object': return _FNV_hashObj(object);
    default: return 0;
    }
}

function _FNV_hashString(str) {
    var current = _FNV_offset;

    for (var i = 0, len = str.length; i < len; i++) {
	current = (current ^ str.charCodeAt(i)) * _FNV_prime;
    }

    return current >>> 0;
}

function _FNV_hashNum(num) {
    return ((_FNV_offset ^ num) * _FNV_prime) >>> 0;
}

function _FNV_hashObj(obj) {
    var current = _FNV_offset;

    /**/
    if (obj.$ === 'Set_elm_builtin')
    {
        obj = $elm$core$Set$toList(obj);
    }
    if (obj.$ === 'RBNode_elm_builtin' || obj.$ === 'RBEmpty_elm_builtin')
    {
        obj = $elm$core$Dict$toList(obj);
    }
    if (obj.$ === 'SeqDict_elm_builtin')
    {
      obj = $lamdera$containers$SeqDict$toList(obj);
    }
    if (obj.$ === 'SeqSet_elm_builtin')
    {
      obj = $lamdera$containers$SeqSet$toList(obj);
    }
    //*/

    /**_UNUSED/
    if (obj.$ < 0)
    {
        if (obj.$ < -10)
        {
            obj = $lamdera$containers$SeqDict$toList(obj);
        }
        else
        {
            obj = $elm$core$Dict$toList(obj);
        }
    }
    //*/

    for (var key in obj) {
	current = (current ^ _FNV_hash(obj[key])) * _FNV_prime;
    }

    return current >>> 0;
}



// BYTES

function _Bytes_width(bytes)
{
	return bytes.byteLength;
}

var _Bytes_getHostEndianness = F2(function(le, be)
{
	return _Scheduler_binding(function(callback)
	{
		callback(_Scheduler_succeed(new Uint8Array(new Uint32Array([1]))[0] === 1 ? le : be));
	});
});


// ENCODERS

function _Bytes_encode(encoder)
{
	var mutableBytes = new DataView(new ArrayBuffer($elm$bytes$Bytes$Encode$getWidth(encoder)));
	$elm$bytes$Bytes$Encode$write(encoder)(mutableBytes)(0);
	return mutableBytes;
}


// SIGNED INTEGERS

var _Bytes_write_i8  = F3(function(mb, i, n) { mb.setInt8(i, n); return i + 1; });
var _Bytes_write_i16 = F4(function(mb, i, n, isLE) { mb.setInt16(i, n, isLE); return i + 2; });
var _Bytes_write_i32 = F4(function(mb, i, n, isLE) { mb.setInt32(i, n, isLE); return i + 4; });


// UNSIGNED INTEGERS

var _Bytes_write_u8  = F3(function(mb, i, n) { mb.setUint8(i, n); return i + 1 ;});
var _Bytes_write_u16 = F4(function(mb, i, n, isLE) { mb.setUint16(i, n, isLE); return i + 2; });
var _Bytes_write_u32 = F4(function(mb, i, n, isLE) { mb.setUint32(i, n, isLE); return i + 4; });


// FLOATS

var _Bytes_write_f32 = F4(function(mb, i, n, isLE) { mb.setFloat32(i, n, isLE); return i + 4; });
var _Bytes_write_f64 = F4(function(mb, i, n, isLE) { mb.setFloat64(i, n, isLE); return i + 8; });


// BYTES

var _Bytes_write_bytes = F3(function(mb, offset, bytes)
{
	for (var i = 0, len = bytes.byteLength, limit = len - 4; i <= limit; i += 4)
	{
		mb.setUint32(offset + i, bytes.getUint32(i));
	}
	for (; i < len; i++)
	{
		mb.setUint8(offset + i, bytes.getUint8(i));
	}
	return offset + len;
});


// STRINGS

function _Bytes_getStringWidth(string)
{
	for (var width = 0, i = 0; i < string.length; i++)
	{
		var code = string.charCodeAt(i);
		width +=
			(code < 0x80) ? 1 :
			(code < 0x800) ? 2 :
			(code < 0xD800 || 0xDBFF < code) ? 3 : (i++, 4);
	}
	return width;
}

var _Bytes_write_string = F3(function(mb, offset, string)
{
	for (var i = 0; i < string.length; i++)
	{
		var code = string.charCodeAt(i);
		offset +=
			(code < 0x80)
				? (mb.setUint8(offset, code)
				, 1
				)
				:
			(code < 0x800)
				? (mb.setUint16(offset, 0xC080 /* 0b1100000010000000 */
					| (code >>> 6 & 0x1F /* 0b00011111 */) << 8
					| code & 0x3F /* 0b00111111 */)
				, 2
				)
				:
			(code < 0xD800 || 0xDBFF < code)
				? (mb.setUint16(offset, 0xE080 /* 0b1110000010000000 */
					| (code >>> 12 & 0xF /* 0b00001111 */) << 8
					| code >>> 6 & 0x3F /* 0b00111111 */)
				, mb.setUint8(offset + 2, 0x80 /* 0b10000000 */
					| code & 0x3F /* 0b00111111 */)
				, 3
				)
				:
			(code = (code - 0xD800) * 0x400 + string.charCodeAt(++i) - 0xDC00 + 0x10000
			, mb.setUint32(offset, 0xF0808080 /* 0b11110000100000001000000010000000 */
				| (code >>> 18 & 0x7 /* 0b00000111 */) << 24
				| (code >>> 12 & 0x3F /* 0b00111111 */) << 16
				| (code >>> 6 & 0x3F /* 0b00111111 */) << 8
				| code & 0x3F /* 0b00111111 */)
			, 4
			);
	}
	return offset;
});


// DECODER

var _Bytes_decode = F2(function(decoder, bytes)
{
	try {
		return $elm$core$Maybe$Just(A2(decoder, bytes, 0).b);
	} catch(e) {
		return $elm$core$Maybe$Nothing;
	}
});

var _Bytes_read_i8  = F2(function(      bytes, offset) { return _Utils_Tuple2(offset + 1, bytes.getInt8(offset)); });
var _Bytes_read_i16 = F3(function(isLE, bytes, offset) { return _Utils_Tuple2(offset + 2, bytes.getInt16(offset, isLE)); });
var _Bytes_read_i32 = F3(function(isLE, bytes, offset) { return _Utils_Tuple2(offset + 4, bytes.getInt32(offset, isLE)); });
var _Bytes_read_u8  = F2(function(      bytes, offset) { return _Utils_Tuple2(offset + 1, bytes.getUint8(offset)); });
var _Bytes_read_u16 = F3(function(isLE, bytes, offset) { return _Utils_Tuple2(offset + 2, bytes.getUint16(offset, isLE)); });
var _Bytes_read_u32 = F3(function(isLE, bytes, offset) { return _Utils_Tuple2(offset + 4, bytes.getUint32(offset, isLE)); });
var _Bytes_read_f32 = F3(function(isLE, bytes, offset) { return _Utils_Tuple2(offset + 4, bytes.getFloat32(offset, isLE)); });
var _Bytes_read_f64 = F3(function(isLE, bytes, offset) { return _Utils_Tuple2(offset + 8, bytes.getFloat64(offset, isLE)); });

var _Bytes_read_bytes = F3(function(len, bytes, offset)
{
	return _Utils_Tuple2(offset + len, new DataView(bytes.buffer, bytes.byteOffset + offset, len));
});

var _Bytes_read_string = F3(function(len, bytes, offset)
{
	var string = '';
	var end = offset + len;
	for (; offset < end;)
	{
		var byte = bytes.getUint8(offset++);
		string +=
			(byte < 128)
				? String.fromCharCode(byte)
				:
			((byte & 0xE0 /* 0b11100000 */) === 0xC0 /* 0b11000000 */)
				? String.fromCharCode((byte & 0x1F /* 0b00011111 */) << 6 | bytes.getUint8(offset++) & 0x3F /* 0b00111111 */)
				:
			((byte & 0xF0 /* 0b11110000 */) === 0xE0 /* 0b11100000 */)
				? String.fromCharCode(
					(byte & 0xF /* 0b00001111 */) << 12
					| (bytes.getUint8(offset++) & 0x3F /* 0b00111111 */) << 6
					| bytes.getUint8(offset++) & 0x3F /* 0b00111111 */
				)
				:
				(byte =
					((byte & 0x7 /* 0b00000111 */) << 18
						| (bytes.getUint8(offset++) & 0x3F /* 0b00111111 */) << 12
						| (bytes.getUint8(offset++) & 0x3F /* 0b00111111 */) << 6
						| bytes.getUint8(offset++) & 0x3F /* 0b00111111 */
					) - 0x10000
				, String.fromCharCode(Math.floor(byte / 0x400) + 0xD800, byte % 0x400 + 0xDC00)
				);
	}
	return _Utils_Tuple2(offset, string);
});

var _Bytes_decodeFailure = F2(function() { throw 0; });


/*
 * Copyright (c) 2010 Mozilla Corporation
 * Copyright (c) 2010 Vladimir Vukicevic
 * Copyright (c) 2013 John Mayer
 * Copyright (c) 2018 Andrey Kuzmin
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following
 * conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 */

// Vector2

var _MJS_v2 = F2(function(x, y) {
    return new Float64Array([x, y]);
});

var _MJS_v2getX = function(a) {
    return a[0];
};

var _MJS_v2getY = function(a) {
    return a[1];
};

var _MJS_v2setX = F2(function(x, a) {
    return new Float64Array([x, a[1]]);
});

var _MJS_v2setY = F2(function(y, a) {
    return new Float64Array([a[0], y]);
});

var _MJS_v2toRecord = function(a) {
    return { x: a[0], y: a[1] };
};

var _MJS_v2fromRecord = function(r) {
    return new Float64Array([r.x, r.y]);
};

var _MJS_v2add = F2(function(a, b) {
    var r = new Float64Array(2);
    r[0] = a[0] + b[0];
    r[1] = a[1] + b[1];
    return r;
});

var _MJS_v2sub = F2(function(a, b) {
    var r = new Float64Array(2);
    r[0] = a[0] - b[0];
    r[1] = a[1] - b[1];
    return r;
});

var _MJS_v2negate = function(a) {
    var r = new Float64Array(2);
    r[0] = -a[0];
    r[1] = -a[1];
    return r;
};

var _MJS_v2direction = F2(function(a, b) {
    var r = new Float64Array(2);
    r[0] = a[0] - b[0];
    r[1] = a[1] - b[1];
    var im = 1.0 / _MJS_v2lengthLocal(r);
    r[0] = r[0] * im;
    r[1] = r[1] * im;
    return r;
});

function _MJS_v2lengthLocal(a) {
    return Math.sqrt(a[0] * a[0] + a[1] * a[1]);
}
var _MJS_v2length = _MJS_v2lengthLocal;

var _MJS_v2lengthSquared = function(a) {
    return a[0] * a[0] + a[1] * a[1];
};

var _MJS_v2distance = F2(function(a, b) {
    var dx = a[0] - b[0];
    var dy = a[1] - b[1];
    return Math.sqrt(dx * dx + dy * dy);
});

var _MJS_v2distanceSquared = F2(function(a, b) {
    var dx = a[0] - b[0];
    var dy = a[1] - b[1];
    return dx * dx + dy * dy;
});

var _MJS_v2normalize = function(a) {
    var r = new Float64Array(2);
    var im = 1.0 / _MJS_v2lengthLocal(a);
    r[0] = a[0] * im;
    r[1] = a[1] * im;
    return r;
};

var _MJS_v2scale = F2(function(k, a) {
    var r = new Float64Array(2);
    r[0] = a[0] * k;
    r[1] = a[1] * k;
    return r;
});

var _MJS_v2dot = F2(function(a, b) {
    return a[0] * b[0] + a[1] * b[1];
});

// Vector3

var _MJS_v3temp1Local = new Float64Array(3);
var _MJS_v3temp2Local = new Float64Array(3);
var _MJS_v3temp3Local = new Float64Array(3);

var _MJS_v3 = F3(function(x, y, z) {
    return new Float64Array([x, y, z]);
});

var _MJS_v3getX = function(a) {
    return a[0];
};

var _MJS_v3getY = function(a) {
    return a[1];
};

var _MJS_v3getZ = function(a) {
    return a[2];
};

var _MJS_v3setX = F2(function(x, a) {
    return new Float64Array([x, a[1], a[2]]);
});

var _MJS_v3setY = F2(function(y, a) {
    return new Float64Array([a[0], y, a[2]]);
});

var _MJS_v3setZ = F2(function(z, a) {
    return new Float64Array([a[0], a[1], z]);
});

var _MJS_v3toRecord = function(a) {
    return { x: a[0], y: a[1], z: a[2] };
};

var _MJS_v3fromRecord = function(r) {
    return new Float64Array([r.x, r.y, r.z]);
};

var _MJS_v3add = F2(function(a, b) {
    var r = new Float64Array(3);
    r[0] = a[0] + b[0];
    r[1] = a[1] + b[1];
    r[2] = a[2] + b[2];
    return r;
});

function _MJS_v3subLocal(a, b, r) {
    if (r === undefined) {
        r = new Float64Array(3);
    }
    r[0] = a[0] - b[0];
    r[1] = a[1] - b[1];
    r[2] = a[2] - b[2];
    return r;
}
var _MJS_v3sub = F2(_MJS_v3subLocal);

var _MJS_v3negate = function(a) {
    var r = new Float64Array(3);
    r[0] = -a[0];
    r[1] = -a[1];
    r[2] = -a[2];
    return r;
};

function _MJS_v3directionLocal(a, b, r) {
    if (r === undefined) {
        r = new Float64Array(3);
    }
    return _MJS_v3normalizeLocal(_MJS_v3subLocal(a, b, r), r);
}
var _MJS_v3direction = F2(_MJS_v3directionLocal);

function _MJS_v3lengthLocal(a) {
    return Math.sqrt(a[0] * a[0] + a[1] * a[1] + a[2] * a[2]);
}
var _MJS_v3length = _MJS_v3lengthLocal;

var _MJS_v3lengthSquared = function(a) {
    return a[0] * a[0] + a[1] * a[1] + a[2] * a[2];
};

var _MJS_v3distance = F2(function(a, b) {
    var dx = a[0] - b[0];
    var dy = a[1] - b[1];
    var dz = a[2] - b[2];
    return Math.sqrt(dx * dx + dy * dy + dz * dz);
});

var _MJS_v3distanceSquared = F2(function(a, b) {
    var dx = a[0] - b[0];
    var dy = a[1] - b[1];
    var dz = a[2] - b[2];
    return dx * dx + dy * dy + dz * dz;
});

function _MJS_v3normalizeLocal(a, r) {
    if (r === undefined) {
        r = new Float64Array(3);
    }
    var im = 1.0 / _MJS_v3lengthLocal(a);
    r[0] = a[0] * im;
    r[1] = a[1] * im;
    r[2] = a[2] * im;
    return r;
}
var _MJS_v3normalize = _MJS_v3normalizeLocal;

var _MJS_v3scale = F2(function(k, a) {
    return new Float64Array([a[0] * k, a[1] * k, a[2] * k]);
});

var _MJS_v3dotLocal = function(a, b) {
    return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
};
var _MJS_v3dot = F2(_MJS_v3dotLocal);

function _MJS_v3crossLocal(a, b, r) {
    if (r === undefined) {
        r = new Float64Array(3);
    }
    r[0] = a[1] * b[2] - a[2] * b[1];
    r[1] = a[2] * b[0] - a[0] * b[2];
    r[2] = a[0] * b[1] - a[1] * b[0];
    return r;
}
var _MJS_v3cross = F2(_MJS_v3crossLocal);

var _MJS_v3mul4x4 = F2(function(m, v) {
    var w;
    var tmp = _MJS_v3temp1Local;
    var r = new Float64Array(3);

    tmp[0] = m[3];
    tmp[1] = m[7];
    tmp[2] = m[11];
    w = _MJS_v3dotLocal(v, tmp) + m[15];
    tmp[0] = m[0];
    tmp[1] = m[4];
    tmp[2] = m[8];
    r[0] = (_MJS_v3dotLocal(v, tmp) + m[12]) / w;
    tmp[0] = m[1];
    tmp[1] = m[5];
    tmp[2] = m[9];
    r[1] = (_MJS_v3dotLocal(v, tmp) + m[13]) / w;
    tmp[0] = m[2];
    tmp[1] = m[6];
    tmp[2] = m[10];
    r[2] = (_MJS_v3dotLocal(v, tmp) + m[14]) / w;
    return r;
});

// Vector4

var _MJS_v4 = F4(function(x, y, z, w) {
    return new Float64Array([x, y, z, w]);
});

var _MJS_v4getX = function(a) {
    return a[0];
};

var _MJS_v4getY = function(a) {
    return a[1];
};

var _MJS_v4getZ = function(a) {
    return a[2];
};

var _MJS_v4getW = function(a) {
    return a[3];
};

var _MJS_v4setX = F2(function(x, a) {
    return new Float64Array([x, a[1], a[2], a[3]]);
});

var _MJS_v4setY = F2(function(y, a) {
    return new Float64Array([a[0], y, a[2], a[3]]);
});

var _MJS_v4setZ = F2(function(z, a) {
    return new Float64Array([a[0], a[1], z, a[3]]);
});

var _MJS_v4setW = F2(function(w, a) {
    return new Float64Array([a[0], a[1], a[2], w]);
});

var _MJS_v4toRecord = function(a) {
    return { x: a[0], y: a[1], z: a[2], w: a[3] };
};

var _MJS_v4fromRecord = function(r) {
    return new Float64Array([r.x, r.y, r.z, r.w]);
};

var _MJS_v4add = F2(function(a, b) {
    var r = new Float64Array(4);
    r[0] = a[0] + b[0];
    r[1] = a[1] + b[1];
    r[2] = a[2] + b[2];
    r[3] = a[3] + b[3];
    return r;
});

var _MJS_v4sub = F2(function(a, b) {
    var r = new Float64Array(4);
    r[0] = a[0] - b[0];
    r[1] = a[1] - b[1];
    r[2] = a[2] - b[2];
    r[3] = a[3] - b[3];
    return r;
});

var _MJS_v4negate = function(a) {
    var r = new Float64Array(4);
    r[0] = -a[0];
    r[1] = -a[1];
    r[2] = -a[2];
    r[3] = -a[3];
    return r;
};

var _MJS_v4direction = F2(function(a, b) {
    var r = new Float64Array(4);
    r[0] = a[0] - b[0];
    r[1] = a[1] - b[1];
    r[2] = a[2] - b[2];
    r[3] = a[3] - b[3];
    var im = 1.0 / _MJS_v4lengthLocal(r);
    r[0] = r[0] * im;
    r[1] = r[1] * im;
    r[2] = r[2] * im;
    r[3] = r[3] * im;
    return r;
});

function _MJS_v4lengthLocal(a) {
    return Math.sqrt(a[0] * a[0] + a[1] * a[1] + a[2] * a[2] + a[3] * a[3]);
}
var _MJS_v4length = _MJS_v4lengthLocal;

var _MJS_v4lengthSquared = function(a) {
    return a[0] * a[0] + a[1] * a[1] + a[2] * a[2] + a[3] * a[3];
};

var _MJS_v4distance = F2(function(a, b) {
    var dx = a[0] - b[0];
    var dy = a[1] - b[1];
    var dz = a[2] - b[2];
    var dw = a[3] - b[3];
    return Math.sqrt(dx * dx + dy * dy + dz * dz + dw * dw);
});

var _MJS_v4distanceSquared = F2(function(a, b) {
    var dx = a[0] - b[0];
    var dy = a[1] - b[1];
    var dz = a[2] - b[2];
    var dw = a[3] - b[3];
    return dx * dx + dy * dy + dz * dz + dw * dw;
});

var _MJS_v4normalize = function(a) {
    var r = new Float64Array(4);
    var im = 1.0 / _MJS_v4lengthLocal(a);
    r[0] = a[0] * im;
    r[1] = a[1] * im;
    r[2] = a[2] * im;
    r[3] = a[3] * im;
    return r;
};

var _MJS_v4scale = F2(function(k, a) {
    var r = new Float64Array(4);
    r[0] = a[0] * k;
    r[1] = a[1] * k;
    r[2] = a[2] * k;
    r[3] = a[3] * k;
    return r;
});

var _MJS_v4dot = F2(function(a, b) {
    return a[0] * b[0] + a[1] * b[1] + a[2] * b[2] + a[3] * b[3];
});

// Matrix4

var _MJS_m4x4temp1Local = new Float64Array(16);
var _MJS_m4x4temp2Local = new Float64Array(16);

var _MJS_m4x4identity = new Float64Array([
    1.0, 0.0, 0.0, 0.0,
    0.0, 1.0, 0.0, 0.0,
    0.0, 0.0, 1.0, 0.0,
    0.0, 0.0, 0.0, 1.0
]);

var _MJS_m4x4fromRecord = function(r) {
    var m = new Float64Array(16);
    m[0] = r.m11;
    m[1] = r.m21;
    m[2] = r.m31;
    m[3] = r.m41;
    m[4] = r.m12;
    m[5] = r.m22;
    m[6] = r.m32;
    m[7] = r.m42;
    m[8] = r.m13;
    m[9] = r.m23;
    m[10] = r.m33;
    m[11] = r.m43;
    m[12] = r.m14;
    m[13] = r.m24;
    m[14] = r.m34;
    m[15] = r.m44;
    return m;
};

var _MJS_m4x4toRecord = function(m) {
    return {
        m11: m[0], m21: m[1], m31: m[2], m41: m[3],
        m12: m[4], m22: m[5], m32: m[6], m42: m[7],
        m13: m[8], m23: m[9], m33: m[10], m43: m[11],
        m14: m[12], m24: m[13], m34: m[14], m44: m[15]
    };
};

var _MJS_m4x4inverse = function(m) {
    var r = new Float64Array(16);

    r[0] = m[5] * m[10] * m[15] - m[5] * m[11] * m[14] - m[9] * m[6] * m[15] +
        m[9] * m[7] * m[14] + m[13] * m[6] * m[11] - m[13] * m[7] * m[10];
    r[4] = -m[4] * m[10] * m[15] + m[4] * m[11] * m[14] + m[8] * m[6] * m[15] -
        m[8] * m[7] * m[14] - m[12] * m[6] * m[11] + m[12] * m[7] * m[10];
    r[8] = m[4] * m[9] * m[15] - m[4] * m[11] * m[13] - m[8] * m[5] * m[15] +
        m[8] * m[7] * m[13] + m[12] * m[5] * m[11] - m[12] * m[7] * m[9];
    r[12] = -m[4] * m[9] * m[14] + m[4] * m[10] * m[13] + m[8] * m[5] * m[14] -
        m[8] * m[6] * m[13] - m[12] * m[5] * m[10] + m[12] * m[6] * m[9];
    r[1] = -m[1] * m[10] * m[15] + m[1] * m[11] * m[14] + m[9] * m[2] * m[15] -
        m[9] * m[3] * m[14] - m[13] * m[2] * m[11] + m[13] * m[3] * m[10];
    r[5] = m[0] * m[10] * m[15] - m[0] * m[11] * m[14] - m[8] * m[2] * m[15] +
        m[8] * m[3] * m[14] + m[12] * m[2] * m[11] - m[12] * m[3] * m[10];
    r[9] = -m[0] * m[9] * m[15] + m[0] * m[11] * m[13] + m[8] * m[1] * m[15] -
        m[8] * m[3] * m[13] - m[12] * m[1] * m[11] + m[12] * m[3] * m[9];
    r[13] = m[0] * m[9] * m[14] - m[0] * m[10] * m[13] - m[8] * m[1] * m[14] +
        m[8] * m[2] * m[13] + m[12] * m[1] * m[10] - m[12] * m[2] * m[9];
    r[2] = m[1] * m[6] * m[15] - m[1] * m[7] * m[14] - m[5] * m[2] * m[15] +
        m[5] * m[3] * m[14] + m[13] * m[2] * m[7] - m[13] * m[3] * m[6];
    r[6] = -m[0] * m[6] * m[15] + m[0] * m[7] * m[14] + m[4] * m[2] * m[15] -
        m[4] * m[3] * m[14] - m[12] * m[2] * m[7] + m[12] * m[3] * m[6];
    r[10] = m[0] * m[5] * m[15] - m[0] * m[7] * m[13] - m[4] * m[1] * m[15] +
        m[4] * m[3] * m[13] + m[12] * m[1] * m[7] - m[12] * m[3] * m[5];
    r[14] = -m[0] * m[5] * m[14] + m[0] * m[6] * m[13] + m[4] * m[1] * m[14] -
        m[4] * m[2] * m[13] - m[12] * m[1] * m[6] + m[12] * m[2] * m[5];
    r[3] = -m[1] * m[6] * m[11] + m[1] * m[7] * m[10] + m[5] * m[2] * m[11] -
        m[5] * m[3] * m[10] - m[9] * m[2] * m[7] + m[9] * m[3] * m[6];
    r[7] = m[0] * m[6] * m[11] - m[0] * m[7] * m[10] - m[4] * m[2] * m[11] +
        m[4] * m[3] * m[10] + m[8] * m[2] * m[7] - m[8] * m[3] * m[6];
    r[11] = -m[0] * m[5] * m[11] + m[0] * m[7] * m[9] + m[4] * m[1] * m[11] -
        m[4] * m[3] * m[9] - m[8] * m[1] * m[7] + m[8] * m[3] * m[5];
    r[15] = m[0] * m[5] * m[10] - m[0] * m[6] * m[9] - m[4] * m[1] * m[10] +
        m[4] * m[2] * m[9] + m[8] * m[1] * m[6] - m[8] * m[2] * m[5];

    var det = m[0] * r[0] + m[1] * r[4] + m[2] * r[8] + m[3] * r[12];

    if (det === 0) {
        return $elm$core$Maybe$Nothing;
    }

    det = 1.0 / det;

    for (var i = 0; i < 16; i = i + 1) {
        r[i] = r[i] * det;
    }

    return $elm$core$Maybe$Just(r);
};

var _MJS_m4x4inverseOrthonormal = function(m) {
    var r = _MJS_m4x4transposeLocal(m);
    var t = [m[12], m[13], m[14]];
    r[3] = r[7] = r[11] = 0;
    r[12] = -_MJS_v3dotLocal([r[0], r[4], r[8]], t);
    r[13] = -_MJS_v3dotLocal([r[1], r[5], r[9]], t);
    r[14] = -_MJS_v3dotLocal([r[2], r[6], r[10]], t);
    return r;
};

function _MJS_m4x4makeFrustumLocal(left, right, bottom, top, znear, zfar) {
    var r = new Float64Array(16);

    r[0] = 2 * znear / (right - left);
    r[1] = 0;
    r[2] = 0;
    r[3] = 0;
    r[4] = 0;
    r[5] = 2 * znear / (top - bottom);
    r[6] = 0;
    r[7] = 0;
    r[8] = (right + left) / (right - left);
    r[9] = (top + bottom) / (top - bottom);
    r[10] = -(zfar + znear) / (zfar - znear);
    r[11] = -1;
    r[12] = 0;
    r[13] = 0;
    r[14] = -2 * zfar * znear / (zfar - znear);
    r[15] = 0;

    return r;
}
var _MJS_m4x4makeFrustum = F6(_MJS_m4x4makeFrustumLocal);

var _MJS_m4x4makePerspective = F4(function(fovy, aspect, znear, zfar) {
    var ymax = znear * Math.tan(fovy * Math.PI / 360.0);
    var ymin = -ymax;
    var xmin = ymin * aspect;
    var xmax = ymax * aspect;

    return _MJS_m4x4makeFrustumLocal(xmin, xmax, ymin, ymax, znear, zfar);
});

function _MJS_m4x4makeOrthoLocal(left, right, bottom, top, znear, zfar) {
    var r = new Float64Array(16);

    r[0] = 2 / (right - left);
    r[1] = 0;
    r[2] = 0;
    r[3] = 0;
    r[4] = 0;
    r[5] = 2 / (top - bottom);
    r[6] = 0;
    r[7] = 0;
    r[8] = 0;
    r[9] = 0;
    r[10] = -2 / (zfar - znear);
    r[11] = 0;
    r[12] = -(right + left) / (right - left);
    r[13] = -(top + bottom) / (top - bottom);
    r[14] = -(zfar + znear) / (zfar - znear);
    r[15] = 1;

    return r;
}
var _MJS_m4x4makeOrtho = F6(_MJS_m4x4makeOrthoLocal);

var _MJS_m4x4makeOrtho2D = F4(function(left, right, bottom, top) {
    return _MJS_m4x4makeOrthoLocal(left, right, bottom, top, -1, 1);
});

function _MJS_m4x4mulLocal(a, b) {
    var r = new Float64Array(16);
    var a11 = a[0];
    var a21 = a[1];
    var a31 = a[2];
    var a41 = a[3];
    var a12 = a[4];
    var a22 = a[5];
    var a32 = a[6];
    var a42 = a[7];
    var a13 = a[8];
    var a23 = a[9];
    var a33 = a[10];
    var a43 = a[11];
    var a14 = a[12];
    var a24 = a[13];
    var a34 = a[14];
    var a44 = a[15];
    var b11 = b[0];
    var b21 = b[1];
    var b31 = b[2];
    var b41 = b[3];
    var b12 = b[4];
    var b22 = b[5];
    var b32 = b[6];
    var b42 = b[7];
    var b13 = b[8];
    var b23 = b[9];
    var b33 = b[10];
    var b43 = b[11];
    var b14 = b[12];
    var b24 = b[13];
    var b34 = b[14];
    var b44 = b[15];

    r[0] = a11 * b11 + a12 * b21 + a13 * b31 + a14 * b41;
    r[1] = a21 * b11 + a22 * b21 + a23 * b31 + a24 * b41;
    r[2] = a31 * b11 + a32 * b21 + a33 * b31 + a34 * b41;
    r[3] = a41 * b11 + a42 * b21 + a43 * b31 + a44 * b41;
    r[4] = a11 * b12 + a12 * b22 + a13 * b32 + a14 * b42;
    r[5] = a21 * b12 + a22 * b22 + a23 * b32 + a24 * b42;
    r[6] = a31 * b12 + a32 * b22 + a33 * b32 + a34 * b42;
    r[7] = a41 * b12 + a42 * b22 + a43 * b32 + a44 * b42;
    r[8] = a11 * b13 + a12 * b23 + a13 * b33 + a14 * b43;
    r[9] = a21 * b13 + a22 * b23 + a23 * b33 + a24 * b43;
    r[10] = a31 * b13 + a32 * b23 + a33 * b33 + a34 * b43;
    r[11] = a41 * b13 + a42 * b23 + a43 * b33 + a44 * b43;
    r[12] = a11 * b14 + a12 * b24 + a13 * b34 + a14 * b44;
    r[13] = a21 * b14 + a22 * b24 + a23 * b34 + a24 * b44;
    r[14] = a31 * b14 + a32 * b24 + a33 * b34 + a34 * b44;
    r[15] = a41 * b14 + a42 * b24 + a43 * b34 + a44 * b44;

    return r;
}
var _MJS_m4x4mul = F2(_MJS_m4x4mulLocal);

var _MJS_m4x4mulAffine = F2(function(a, b) {
    var r = new Float64Array(16);
    var a11 = a[0];
    var a21 = a[1];
    var a31 = a[2];
    var a12 = a[4];
    var a22 = a[5];
    var a32 = a[6];
    var a13 = a[8];
    var a23 = a[9];
    var a33 = a[10];
    var a14 = a[12];
    var a24 = a[13];
    var a34 = a[14];

    var b11 = b[0];
    var b21 = b[1];
    var b31 = b[2];
    var b12 = b[4];
    var b22 = b[5];
    var b32 = b[6];
    var b13 = b[8];
    var b23 = b[9];
    var b33 = b[10];
    var b14 = b[12];
    var b24 = b[13];
    var b34 = b[14];

    r[0] = a11 * b11 + a12 * b21 + a13 * b31;
    r[1] = a21 * b11 + a22 * b21 + a23 * b31;
    r[2] = a31 * b11 + a32 * b21 + a33 * b31;
    r[3] = 0;
    r[4] = a11 * b12 + a12 * b22 + a13 * b32;
    r[5] = a21 * b12 + a22 * b22 + a23 * b32;
    r[6] = a31 * b12 + a32 * b22 + a33 * b32;
    r[7] = 0;
    r[8] = a11 * b13 + a12 * b23 + a13 * b33;
    r[9] = a21 * b13 + a22 * b23 + a23 * b33;
    r[10] = a31 * b13 + a32 * b23 + a33 * b33;
    r[11] = 0;
    r[12] = a11 * b14 + a12 * b24 + a13 * b34 + a14;
    r[13] = a21 * b14 + a22 * b24 + a23 * b34 + a24;
    r[14] = a31 * b14 + a32 * b24 + a33 * b34 + a34;
    r[15] = 1;

    return r;
});

var _MJS_m4x4makeRotate = F2(function(angle, axis) {
    var r = new Float64Array(16);
    axis = _MJS_v3normalizeLocal(axis, _MJS_v3temp1Local);
    var x = axis[0];
    var y = axis[1];
    var z = axis[2];
    var c = Math.cos(angle);
    var c1 = 1 - c;
    var s = Math.sin(angle);

    r[0] = x * x * c1 + c;
    r[1] = y * x * c1 + z * s;
    r[2] = z * x * c1 - y * s;
    r[3] = 0;
    r[4] = x * y * c1 - z * s;
    r[5] = y * y * c1 + c;
    r[6] = y * z * c1 + x * s;
    r[7] = 0;
    r[8] = x * z * c1 + y * s;
    r[9] = y * z * c1 - x * s;
    r[10] = z * z * c1 + c;
    r[11] = 0;
    r[12] = 0;
    r[13] = 0;
    r[14] = 0;
    r[15] = 1;

    return r;
});

var _MJS_m4x4rotate = F3(function(angle, axis, m) {
    var r = new Float64Array(16);
    var im = 1.0 / _MJS_v3lengthLocal(axis);
    var x = axis[0] * im;
    var y = axis[1] * im;
    var z = axis[2] * im;
    var c = Math.cos(angle);
    var c1 = 1 - c;
    var s = Math.sin(angle);
    var xs = x * s;
    var ys = y * s;
    var zs = z * s;
    var xyc1 = x * y * c1;
    var xzc1 = x * z * c1;
    var yzc1 = y * z * c1;
    var t11 = x * x * c1 + c;
    var t21 = xyc1 + zs;
    var t31 = xzc1 - ys;
    var t12 = xyc1 - zs;
    var t22 = y * y * c1 + c;
    var t32 = yzc1 + xs;
    var t13 = xzc1 + ys;
    var t23 = yzc1 - xs;
    var t33 = z * z * c1 + c;
    var m11 = m[0], m21 = m[1], m31 = m[2], m41 = m[3];
    var m12 = m[4], m22 = m[5], m32 = m[6], m42 = m[7];
    var m13 = m[8], m23 = m[9], m33 = m[10], m43 = m[11];
    var m14 = m[12], m24 = m[13], m34 = m[14], m44 = m[15];

    r[0] = m11 * t11 + m12 * t21 + m13 * t31;
    r[1] = m21 * t11 + m22 * t21 + m23 * t31;
    r[2] = m31 * t11 + m32 * t21 + m33 * t31;
    r[3] = m41 * t11 + m42 * t21 + m43 * t31;
    r[4] = m11 * t12 + m12 * t22 + m13 * t32;
    r[5] = m21 * t12 + m22 * t22 + m23 * t32;
    r[6] = m31 * t12 + m32 * t22 + m33 * t32;
    r[7] = m41 * t12 + m42 * t22 + m43 * t32;
    r[8] = m11 * t13 + m12 * t23 + m13 * t33;
    r[9] = m21 * t13 + m22 * t23 + m23 * t33;
    r[10] = m31 * t13 + m32 * t23 + m33 * t33;
    r[11] = m41 * t13 + m42 * t23 + m43 * t33;
    r[12] = m14,
    r[13] = m24;
    r[14] = m34;
    r[15] = m44;

    return r;
});

function _MJS_m4x4makeScale3Local(x, y, z) {
    var r = new Float64Array(16);

    r[0] = x;
    r[1] = 0;
    r[2] = 0;
    r[3] = 0;
    r[4] = 0;
    r[5] = y;
    r[6] = 0;
    r[7] = 0;
    r[8] = 0;
    r[9] = 0;
    r[10] = z;
    r[11] = 0;
    r[12] = 0;
    r[13] = 0;
    r[14] = 0;
    r[15] = 1;

    return r;
}
var _MJS_m4x4makeScale3 = F3(_MJS_m4x4makeScale3Local);

var _MJS_m4x4makeScale = function(v) {
    return _MJS_m4x4makeScale3Local(v[0], v[1], v[2]);
};

var _MJS_m4x4scale3 = F4(function(x, y, z, m) {
    var r = new Float64Array(16);

    r[0] = m[0] * x;
    r[1] = m[1] * x;
    r[2] = m[2] * x;
    r[3] = m[3] * x;
    r[4] = m[4] * y;
    r[5] = m[5] * y;
    r[6] = m[6] * y;
    r[7] = m[7] * y;
    r[8] = m[8] * z;
    r[9] = m[9] * z;
    r[10] = m[10] * z;
    r[11] = m[11] * z;
    r[12] = m[12];
    r[13] = m[13];
    r[14] = m[14];
    r[15] = m[15];

    return r;
});

var _MJS_m4x4scale = F2(function(v, m) {
    var r = new Float64Array(16);
    var x = v[0];
    var y = v[1];
    var z = v[2];

    r[0] = m[0] * x;
    r[1] = m[1] * x;
    r[2] = m[2] * x;
    r[3] = m[3] * x;
    r[4] = m[4] * y;
    r[5] = m[5] * y;
    r[6] = m[6] * y;
    r[7] = m[7] * y;
    r[8] = m[8] * z;
    r[9] = m[9] * z;
    r[10] = m[10] * z;
    r[11] = m[11] * z;
    r[12] = m[12];
    r[13] = m[13];
    r[14] = m[14];
    r[15] = m[15];

    return r;
});

function _MJS_m4x4makeTranslate3Local(x, y, z) {
    var r = new Float64Array(16);

    r[0] = 1;
    r[1] = 0;
    r[2] = 0;
    r[3] = 0;
    r[4] = 0;
    r[5] = 1;
    r[6] = 0;
    r[7] = 0;
    r[8] = 0;
    r[9] = 0;
    r[10] = 1;
    r[11] = 0;
    r[12] = x;
    r[13] = y;
    r[14] = z;
    r[15] = 1;

    return r;
}
var _MJS_m4x4makeTranslate3 = F3(_MJS_m4x4makeTranslate3Local);

var _MJS_m4x4makeTranslate = function(v) {
    return _MJS_m4x4makeTranslate3Local(v[0], v[1], v[2]);
};

var _MJS_m4x4translate3 = F4(function(x, y, z, m) {
    var r = new Float64Array(16);
    var m11 = m[0];
    var m21 = m[1];
    var m31 = m[2];
    var m41 = m[3];
    var m12 = m[4];
    var m22 = m[5];
    var m32 = m[6];
    var m42 = m[7];
    var m13 = m[8];
    var m23 = m[9];
    var m33 = m[10];
    var m43 = m[11];

    r[0] = m11;
    r[1] = m21;
    r[2] = m31;
    r[3] = m41;
    r[4] = m12;
    r[5] = m22;
    r[6] = m32;
    r[7] = m42;
    r[8] = m13;
    r[9] = m23;
    r[10] = m33;
    r[11] = m43;
    r[12] = m11 * x + m12 * y + m13 * z + m[12];
    r[13] = m21 * x + m22 * y + m23 * z + m[13];
    r[14] = m31 * x + m32 * y + m33 * z + m[14];
    r[15] = m41 * x + m42 * y + m43 * z + m[15];

    return r;
});

var _MJS_m4x4translate = F2(function(v, m) {
    var r = new Float64Array(16);
    var x = v[0];
    var y = v[1];
    var z = v[2];
    var m11 = m[0];
    var m21 = m[1];
    var m31 = m[2];
    var m41 = m[3];
    var m12 = m[4];
    var m22 = m[5];
    var m32 = m[6];
    var m42 = m[7];
    var m13 = m[8];
    var m23 = m[9];
    var m33 = m[10];
    var m43 = m[11];

    r[0] = m11;
    r[1] = m21;
    r[2] = m31;
    r[3] = m41;
    r[4] = m12;
    r[5] = m22;
    r[6] = m32;
    r[7] = m42;
    r[8] = m13;
    r[9] = m23;
    r[10] = m33;
    r[11] = m43;
    r[12] = m11 * x + m12 * y + m13 * z + m[12];
    r[13] = m21 * x + m22 * y + m23 * z + m[13];
    r[14] = m31 * x + m32 * y + m33 * z + m[14];
    r[15] = m41 * x + m42 * y + m43 * z + m[15];

    return r;
});

var _MJS_m4x4makeLookAt = F3(function(eye, center, up) {
    var z = _MJS_v3directionLocal(eye, center, _MJS_v3temp1Local);
    var x = _MJS_v3normalizeLocal(_MJS_v3crossLocal(up, z, _MJS_v3temp2Local), _MJS_v3temp2Local);
    var y = _MJS_v3normalizeLocal(_MJS_v3crossLocal(z, x, _MJS_v3temp3Local), _MJS_v3temp3Local);
    var tm1 = _MJS_m4x4temp1Local;
    var tm2 = _MJS_m4x4temp2Local;

    tm1[0] = x[0];
    tm1[1] = y[0];
    tm1[2] = z[0];
    tm1[3] = 0;
    tm1[4] = x[1];
    tm1[5] = y[1];
    tm1[6] = z[1];
    tm1[7] = 0;
    tm1[8] = x[2];
    tm1[9] = y[2];
    tm1[10] = z[2];
    tm1[11] = 0;
    tm1[12] = 0;
    tm1[13] = 0;
    tm1[14] = 0;
    tm1[15] = 1;

    tm2[0] = 1; tm2[1] = 0; tm2[2] = 0; tm2[3] = 0;
    tm2[4] = 0; tm2[5] = 1; tm2[6] = 0; tm2[7] = 0;
    tm2[8] = 0; tm2[9] = 0; tm2[10] = 1; tm2[11] = 0;
    tm2[12] = -eye[0]; tm2[13] = -eye[1]; tm2[14] = -eye[2]; tm2[15] = 1;

    return _MJS_m4x4mulLocal(tm1, tm2);
});


function _MJS_m4x4transposeLocal(m) {
    var r = new Float64Array(16);

    r[0] = m[0]; r[1] = m[4]; r[2] = m[8]; r[3] = m[12];
    r[4] = m[1]; r[5] = m[5]; r[6] = m[9]; r[7] = m[13];
    r[8] = m[2]; r[9] = m[6]; r[10] = m[10]; r[11] = m[14];
    r[12] = m[3]; r[13] = m[7]; r[14] = m[11]; r[15] = m[15];

    return r;
}
var _MJS_m4x4transpose = _MJS_m4x4transposeLocal;

var _MJS_m4x4makeBasis = F3(function(vx, vy, vz) {
    var r = new Float64Array(16);

    r[0] = vx[0];
    r[1] = vx[1];
    r[2] = vx[2];
    r[3] = 0;
    r[4] = vy[0];
    r[5] = vy[1];
    r[6] = vy[2];
    r[7] = 0;
    r[8] = vz[0];
    r[9] = vz[1];
    r[10] = vz[2];
    r[11] = 0;
    r[12] = 0;
    r[13] = 0;
    r[14] = 0;
    r[15] = 1;

    return r;
});


// CREATE

var _Regex_never = /.^/;

var _Regex_fromStringWith = F2(function(options, string)
{
	var flags = 'g';
	if (options.multiline) { flags += 'm'; }
	if (options.caseInsensitive) { flags += 'i'; }

	try
	{
		return $elm$core$Maybe$Just(new RegExp(string, flags));
	}
	catch(error)
	{
		return $elm$core$Maybe$Nothing;
	}
});


// USE

var _Regex_contains = F2(function(re, string)
{
	return string.match(re) !== null;
});


var _Regex_findAtMost = F3(function(n, re, str)
{
	var out = [];
	var number = 0;
	var string = str;
	var lastIndex = re.lastIndex;
	var prevLastIndex = -1;
	var result;
	while (number++ < n && (result = re.exec(string)))
	{
		if (prevLastIndex == re.lastIndex) break;
		var i = result.length - 1;
		var subs = new Array(i);
		while (i > 0)
		{
			var submatch = result[i];
			subs[--i] = submatch
				? $elm$core$Maybe$Just(submatch)
				: $elm$core$Maybe$Nothing;
		}
		out.push(A4($elm$regex$Regex$Match, result[0], result.index, number, _List_fromArray(subs)));
		prevLastIndex = re.lastIndex;
	}
	re.lastIndex = lastIndex;
	return _List_fromArray(out);
});


var _Regex_replaceAtMost = F4(function(n, re, replacer, string)
{
	var count = 0;
	function jsReplacer(match)
	{
		if (count++ >= n)
		{
			return match;
		}
		var i = arguments.length - 3;
		var submatches = new Array(i);
		while (i > 0)
		{
			var submatch = arguments[i];
			submatches[--i] = submatch
				? $elm$core$Maybe$Just(submatch)
				: $elm$core$Maybe$Nothing;
		}
		return replacer(A4($elm$regex$Regex$Match, match, arguments[arguments.length - 2], count, _List_fromArray(submatches)));
	}
	return string.replace(re, jsReplacer);
});

var _Regex_splitAtMost = F3(function(n, re, str)
{
	var string = str;
	var out = [];
	var start = re.lastIndex;
	var restoreLastIndex = re.lastIndex;
	while (n--)
	{
		var result = re.exec(string);
		if (!result) break;
		out.push(string.slice(start, result.index));
		start = re.lastIndex;
	}
	out.push(string.slice(start));
	re.lastIndex = restoreLastIndex;
	return _List_fromArray(out);
});

var _Regex_infinity = Infinity;


function _Url_percentEncode(string)
{
	return encodeURIComponent(string);
}

function _Url_percentDecode(string)
{
	try
	{
		return $elm$core$Maybe$Just(decodeURIComponent(string));
	}
	catch (e)
	{
		return $elm$core$Maybe$Nothing;
	}
}



// ELEMENT


var _Debugger_element;

var _Browser_element = _Debugger_element || F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.init,
		impl.update,
		impl.subscriptions,
		function(sendToApp, initialModel) {
			var view = impl.view;
			/**_UNUSED/
			var domNode = args['node'];
			//*/
			/**/
			var domNode = args && args['node'] ? args['node'] : _Debug_crash(0);
			//*/
			var currNode = _VirtualDom_virtualize(domNode);

			return _Browser_makeAnimator(initialModel, function(model)
			{
				var nextNode = view(model);
				var patches = _VirtualDom_diff(currNode, nextNode);
				domNode = _VirtualDom_applyPatches(domNode, currNode, patches, sendToApp);
				currNode = nextNode;
			});
		}
	);
});



// DOCUMENT


var _Debugger_document;

var _Browser_document = _Debugger_document || F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.init,
		impl.update,
		impl.subscriptions,
		function(sendToApp, initialModel) {
			var divertHrefToApp = impl.setup && impl.setup(sendToApp)
			var view = impl.view;
			var title = _VirtualDom_doc.title;
			var bodyNode = _VirtualDom_doc.body;
			var currNode = _VirtualDom_virtualize(bodyNode);
			return _Browser_makeAnimator(initialModel, function(model)
			{
				_VirtualDom_divertHrefToApp = divertHrefToApp;
				var doc = view(model);
				var nextNode = _VirtualDom_node('body')(_List_Nil)(doc.body);
				var patches = _VirtualDom_diff(currNode, nextNode);
				bodyNode = _VirtualDom_applyPatches(bodyNode, currNode, patches, sendToApp);
				currNode = nextNode;
				_VirtualDom_divertHrefToApp = 0;
				(title !== doc.title) && (_VirtualDom_doc.title = title = doc.title);
			});
		}
	);
});



// ANIMATION


var _Browser_cancelAnimationFrame =
	typeof cancelAnimationFrame !== 'undefined'
		? cancelAnimationFrame
		: function(id) { clearTimeout(id); };

var _Browser_requestAnimationFrame =
	typeof requestAnimationFrame !== 'undefined'
		? requestAnimationFrame
		: function(callback) { return setTimeout(callback, 1000 / 60); };


function _Browser_makeAnimator(model, draw)
{
	draw(model);

	var state = 0;

	function updateIfNeeded()
	{
		state = state === 1
			? 0
			: ( _Browser_requestAnimationFrame(updateIfNeeded), draw(model), 1 );
	}

	return function(nextModel, isSync)
	{
		model = nextModel;

		isSync
			? ( draw(model),
				state === 2 && (state = 1)
				)
			: ( state === 0 && _Browser_requestAnimationFrame(updateIfNeeded),
				state = 2
				);
	};
}



// APPLICATION


function _Browser_application(impl)
{
	var onUrlChange = impl.onUrlChange;
	var onUrlRequest = impl.onUrlRequest;
	var key = function() { key.a(onUrlChange(_Browser_getUrl())); };

	return _Browser_document({
		setup: function(sendToApp)
		{
			key.a = sendToApp;
			_Browser_window.addEventListener('popstate', key);
			_Browser_window.navigator.userAgent.indexOf('Trident') < 0 || _Browser_window.addEventListener('hashchange', key);

			return F2(function(domNode, event)
			{
				if (!event.ctrlKey && !event.metaKey && !event.shiftKey && event.button < 1 && !domNode.target && !domNode.hasAttribute('download'))
				{
					event.preventDefault();
					var href = domNode.href;
					var curr = _Browser_getUrl();
					var next = $elm$url$Url$fromString(href).a;
					sendToApp(onUrlRequest(
						(next
							&& curr.protocol === next.protocol
							&& curr.host === next.host
							&& curr.port_.a === next.port_.a
						)
							? $elm$browser$Browser$Internal(next)
							: $elm$browser$Browser$External(href)
					));
				}
			});
		},
		init: function(flags)
		{
			return A3(impl.init, flags, _Browser_getUrl(), key);
		},
		view: impl.view,
		update: impl.update,
		subscriptions: impl.subscriptions
	});
}

function _Browser_getUrl()
{
	return $elm$url$Url$fromString(_VirtualDom_doc.location.href).a || _Debug_crash(1);
}

var _Browser_go = F2(function(key, n)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function() {
		n && history.go(n);
		key();
	}));
});

var _Browser_pushUrl = F2(function(key, url)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function() {
		history.pushState({}, '', url);
		key();
	}));
});

var _Browser_replaceUrl = F2(function(key, url)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function() {
		history.replaceState({}, '', url);
		key();
	}));
});



// GLOBAL EVENTS


var _Browser_fakeNode = { addEventListener: function() {}, removeEventListener: function() {} };
var _Browser_doc = typeof document !== 'undefined' ? document : _Browser_fakeNode;
var _Browser_window = typeof window !== 'undefined' ? window : _Browser_fakeNode;

var _Browser_on = F3(function(node, eventName, sendToSelf)
{
	return _Scheduler_spawn(_Scheduler_binding(function(callback)
	{
		function handler(event)	{ _Scheduler_rawSpawn(sendToSelf(event)); }
		node.addEventListener(eventName, handler, _VirtualDom_passiveSupported && { passive: true });
		return function() { node.removeEventListener(eventName, handler); };
	}));
});

var _Browser_decodeEvent = F2(function(decoder, event)
{
	var result = _Json_runHelp(decoder, event);
	return $elm$core$Result$isOk(result) ? $elm$core$Maybe$Just(result.a) : $elm$core$Maybe$Nothing;
});



// PAGE VISIBILITY


function _Browser_visibilityInfo()
{
	return (typeof _VirtualDom_doc.hidden !== 'undefined')
		? { hidden: 'hidden', change: 'visibilitychange' }
		:
	(typeof _VirtualDom_doc.mozHidden !== 'undefined')
		? { hidden: 'mozHidden', change: 'mozvisibilitychange' }
		:
	(typeof _VirtualDom_doc.msHidden !== 'undefined')
		? { hidden: 'msHidden', change: 'msvisibilitychange' }
		:
	(typeof _VirtualDom_doc.webkitHidden !== 'undefined')
		? { hidden: 'webkitHidden', change: 'webkitvisibilitychange' }
		: { hidden: 'hidden', change: 'visibilitychange' };
}



// ANIMATION FRAMES


function _Browser_rAF()
{
	return _Scheduler_binding(function(callback)
	{
		var id = _Browser_requestAnimationFrame(function() {
			callback(_Scheduler_succeed(Date.now()));
		});

		return function() {
			_Browser_cancelAnimationFrame(id);
		};
	});
}


function _Browser_now()
{
	return _Scheduler_binding(function(callback)
	{
		callback(_Scheduler_succeed(Date.now()));
	});
}



// DOM STUFF


function _Browser_withNode(id, doStuff)
{
	return _Scheduler_binding(function(callback)
	{
		_Browser_requestAnimationFrame(function() {
			var node = document.getElementById(id);
			callback(node
				? _Scheduler_succeed(doStuff(node))
				: _Scheduler_fail($elm$browser$Browser$Dom$NotFound(id))
			);
		});
	});
}


function _Browser_withWindow(doStuff)
{
	return _Scheduler_binding(function(callback)
	{
		_Browser_requestAnimationFrame(function() {
			callback(_Scheduler_succeed(doStuff()));
		});
	});
}


// FOCUS and BLUR


var _Browser_call = F2(function(functionName, id)
{
	return _Browser_withNode(id, function(node) {
		node[functionName]();
		return _Utils_Tuple0;
	});
});



// WINDOW VIEWPORT


function _Browser_getViewport()
{
	return {
		scene: _Browser_getScene(),
		viewport: {
			x: _Browser_window.pageXOffset,
			y: _Browser_window.pageYOffset,
			width: _Browser_doc.documentElement.clientWidth,
			height: _Browser_doc.documentElement.clientHeight
		}
	};
}

function _Browser_getScene()
{
	var body = _Browser_doc.body;
	var elem = _Browser_doc.documentElement;
	return {
		width: Math.max(body.scrollWidth, body.offsetWidth, elem.scrollWidth, elem.offsetWidth, elem.clientWidth),
		height: Math.max(body.scrollHeight, body.offsetHeight, elem.scrollHeight, elem.offsetHeight, elem.clientHeight)
	};
}

var _Browser_setViewport = F2(function(x, y)
{
	return _Browser_withWindow(function()
	{
		_Browser_window.scroll(x, y);
		return _Utils_Tuple0;
	});
});



// ELEMENT VIEWPORT


function _Browser_getViewportOf(id)
{
	return _Browser_withNode(id, function(node)
	{
		return {
			scene: {
				width: node.scrollWidth,
				height: node.scrollHeight
			},
			viewport: {
				x: node.scrollLeft,
				y: node.scrollTop,
				width: node.clientWidth,
				height: node.clientHeight
			}
		};
	});
}


var _Browser_setViewportOf = F3(function(id, x, y)
{
	return _Browser_withNode(id, function(node)
	{
		node.scrollLeft = x;
		node.scrollTop = y;
		return _Utils_Tuple0;
	});
});



// ELEMENT


function _Browser_getElement(id)
{
	return _Browser_withNode(id, function(node)
	{
		var rect = node.getBoundingClientRect();
		var x = _Browser_window.pageXOffset;
		var y = _Browser_window.pageYOffset;
		return {
			scene: _Browser_getScene(),
			viewport: {
				x: x,
				y: y,
				width: _Browser_doc.documentElement.clientWidth,
				height: _Browser_doc.documentElement.clientHeight
			},
			element: {
				x: x + rect.left,
				y: y + rect.top,
				width: rect.width,
				height: rect.height
			}
		};
	});
}



// LOAD and RELOAD


function _Browser_reload(skipCache)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function(callback)
	{
		_VirtualDom_doc.location.reload(skipCache);
	}));
}

function _Browser_load(url)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function(callback)
	{
		try
		{
			_Browser_window.location = url;
		}
		catch(err)
		{
			// Only Firefox can throw a NS_ERROR_MALFORMED_URI exception here.
			// Other browsers reload the page, so let's be consistent about that.
			_VirtualDom_doc.location.reload(false);
		}
	}));
}



function _Lamdera_unsafeCoerce(a)
{
	return a
}


var _Lamdera_debugS = F2(function(l, a)
{
	window.localStorage.setItem("lamdera-debug-" + l, JSON.stringify(a))
	return a
})


var _Lamdera_debugR = F2(function(l, oldRecord)
{
	var data = window.localStorage.getItem("lamdera-debug-" + l)

	if (data === null) {
		return $elm$core$Maybe$Nothing
	} else {
		var newRecord = {}
		var restoredFields = JSON.parse(data)
		for (var key in oldRecord) { newRecord[key] = oldRecord[key] }
		for (var key in restoredFields) { newRecord[key] = restoredFields[key] }
		return $elm$core$Maybe$Just(newRecord)
	}
})


var _Lamdera_debugD = function(l)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function() {
		localStorage.removeItem("lamdera-debug-" + l)
	}))
}

var _Lamdera_decoderBytes = _Json_decodePrim(function(value)
{
  try {
	if (typeof value === 'object' && value instanceof DataView) return $elm$core$Result$Ok(value)
	if (typeof value === 'object' && value instanceof Buffer) {
		// https://stackoverflow.com/a/31394257
		return $elm$core$Result$Ok(new DataView(value.buffer, value.byteOffset, value.byteLength))
	}
	return _Json_expecting('a DataView or Buffer', value);
  } catch (err) {
	return _Json_expecting('a DataView or Buffer, but got an exception', err.toString());
  }
});

var _Lamdera_log = F2(function (s, a) {
  console.log(`[log]`, s, a);
  return a
})



// SEND REQUEST

var _Http_toTask = F3(function(router, toTask, request)
{
	return _Scheduler_binding(function(callback)
	{
		function done(response) {
			callback(toTask(request.expect.a(response)));
		}

		var xhr = new XMLHttpRequest();
		xhr.addEventListener('error', function() { done($elm$http$Http$NetworkError_); });
		xhr.addEventListener('timeout', function() { done($elm$http$Http$Timeout_); });
		xhr.addEventListener('load', function() { done(_Http_toResponse(request.expect.b, xhr)); });
		$elm$core$Maybe$isJust(request.tracker) && _Http_track(router, xhr, request.tracker.a);

		try {
			xhr.open(request.method, request.url, true);
		} catch (e) {
			return done($elm$http$Http$BadUrl_(request.url));
		}

		_Http_configureRequest(xhr, request);

		request.body.a && xhr.setRequestHeader('Content-Type', request.body.a);
		xhr.send(request.body.b);

		return function() { xhr.c = true; xhr.abort(); };
	});
});


// CONFIGURE

function _Http_configureRequest(xhr, request)
{
	for (var headers = request.headers; headers.b; headers = headers.b) // WHILE_CONS
	{
		xhr.setRequestHeader(headers.a.a, headers.a.b);
	}
	xhr.timeout = request.timeout.a || 0;
	xhr.responseType = request.expect.d;
	xhr.withCredentials = request.allowCookiesFromOtherDomains;
}


// RESPONSES

function _Http_toResponse(toBody, xhr)
{
	return A2(
		200 <= xhr.status && xhr.status < 300 ? $elm$http$Http$GoodStatus_ : $elm$http$Http$BadStatus_,
		_Http_toMetadata(xhr),
		toBody(xhr.response)
	);
}


// METADATA

function _Http_toMetadata(xhr)
{
	return {
		url: xhr.responseURL,
		statusCode: xhr.status,
		statusText: xhr.statusText,
		headers: _Http_parseHeaders(xhr.getAllResponseHeaders())
	};
}


// HEADERS

function _Http_parseHeaders(rawHeaders)
{
	if (!rawHeaders)
	{
		return $elm$core$Dict$empty;
	}

	var headers = $elm$core$Dict$empty;
	var headerPairs = rawHeaders.split('\r\n');
	for (var i = headerPairs.length; i--; )
	{
		var headerPair = headerPairs[i];
		var index = headerPair.indexOf(': ');
		if (index > 0)
		{
			var key = headerPair.substring(0, index);
			var value = headerPair.substring(index + 2);

			headers = A3($elm$core$Dict$update, key, function(oldValue) {
				return $elm$core$Maybe$Just($elm$core$Maybe$isJust(oldValue)
					? value + ', ' + oldValue.a
					: value
				);
			}, headers);
		}
	}
	return headers;
}


// EXPECT

var _Http_expect = F3(function(type, toBody, toValue)
{
	return {
		$: 0,
		d: type,
		b: toBody,
		a: toValue
	};
});

var _Http_mapExpect = F2(function(func, expect)
{
	return {
		$: 0,
		d: expect.d,
		b: expect.b,
		a: function(x) { return func(expect.a(x)); }
	};
});

function _Http_toDataView(arrayBuffer)
{
	return new DataView(arrayBuffer);
}


// BODY and PARTS

var _Http_emptyBody = { $: 0 };
var _Http_pair = F2(function(a, b) { return { $: 0, a: a, b: b }; });

function _Http_toFormData(parts)
{
	for (var formData = new FormData(); parts.b; parts = parts.b) // WHILE_CONS
	{
		var part = parts.a;
		formData.append(part.a, part.b);
	}
	return formData;
}

var _Http_bytesToBlob = F2(function(mime, bytes)
{
	return new Blob([bytes], { type: mime });
});


// PROGRESS

function _Http_track(router, xhr, tracker)
{
	// TODO check out lengthComputable on loadstart event

	xhr.upload.addEventListener('progress', function(event) {
		if (xhr.c) { return; }
		_Scheduler_rawSpawn(A2($elm$core$Platform$sendToSelf, router, _Utils_Tuple2(tracker, $elm$http$Http$Sending({
			sent: event.loaded,
			size: event.total
		}))));
	});
	xhr.addEventListener('progress', function(event) {
		if (xhr.c) { return; }
		_Scheduler_rawSpawn(A2($elm$core$Platform$sendToSelf, router, _Utils_Tuple2(tracker, $elm$http$Http$Receiving({
			received: event.loaded,
			size: event.lengthComputable ? $elm$core$Maybe$Just(event.total) : $elm$core$Maybe$Nothing
		}))));
	});
}


function _Time_now(millisToPosix)
{
	return _Scheduler_binding(function(callback)
	{
		callback(_Scheduler_succeed(millisToPosix(Date.now())));
	});
}

var _Time_setInterval = F2(function(interval, task)
{
	return _Scheduler_binding(function(callback)
	{
		var id = setInterval(function() { _Scheduler_rawSpawn(task); }, interval);
		return function() { clearInterval(id); };
	});
});

function _Time_here()
{
	return _Scheduler_binding(function(callback)
	{
		callback(_Scheduler_succeed(
			A2($elm$time$Time$customZone, -(new Date().getTimezoneOffset()), _List_Nil)
		));
	});
}


function _Time_getZoneName()
{
	return _Scheduler_binding(function(callback)
	{
		try
		{
			var name = $elm$time$Time$Name(Intl.DateTimeFormat().resolvedOptions().timeZone);
		}
		catch (e)
		{
			var name = $elm$time$Time$Offset(new Date().getTimezoneOffset());
		}
		callback(_Scheduler_succeed(name));
	});
}


function _DebugParser_toString_UNUSED(value)
{
	return $lamdera$program_test$DebugParser$Plain($lamdera$program_test$DebugParser$ElmString(""));
}

function _DebugParser_toString(value)
{
	return _DebugParser_toAnsiString(value);
}

function _DebugParser_toAnsiString(value)
{
	if (typeof value === 'function')
	{
		return $lamdera$program_test$DebugParser$Plain($lamdera$program_test$DebugParser$ElmFunction);
	}

	if (typeof value === 'boolean')
	{
		return $lamdera$program_test$DebugParser$Plain($lamdera$program_test$DebugParser$ElmBool(value));
	}

	if (typeof value === 'number')
	{
		return $lamdera$program_test$DebugParser$Plain($lamdera$program_test$DebugParser$ElmNumber(value));
	}

	if (value instanceof String)
	{
		return $lamdera$program_test$DebugParser$Plain($lamdera$program_test$DebugParser$ElmChar(value));
	}

	if (typeof value === 'string')
	{
		return $lamdera$program_test$DebugParser$Plain($lamdera$program_test$DebugParser$ElmString(value));
	}

	if (typeof value === 'object' && '$' in value)
	{
		var tag = value.$;

		if (typeof tag === 'number')
		{
			return $lamdera$program_test$DebugParser$Plain($lamdera$program_test$DebugParser$ElmInternals);
		}

		if (tag[0] === '#')
		{
			var output = [];
			for (var k in value)
			{
				if (k === '$') continue;
				output.push(_DebugParser_toAnsiString(value[k]));
			}
			return $lamdera$program_test$DebugParser$Expandable(A2($lamdera$program_test$DebugParser$ElmSequence, $lamdera$program_test$DebugParser$SeqTuple, _List_fromArray(output)));
		}

        switch(tag) {
            case 'SeqSet_elm_builtin': {
                var value2 = $lamdera$containers$SeqSet$toList(value);
                var output = [];
                for (; value2.b; value2 = value2.b) // WHILE_CONS
                {
                    output.push(_DebugParser_toAnsiString(value2.a));
                }
                return $lamdera$program_test$DebugParser$Expandable(A2($lamdera$program_test$DebugParser$ElmSequence, $lamdera$program_test$DebugParser$SeqSet, _List_fromArray(output)));
            }
            case 'Set_elm_builtin': {
                var value2 = $elm$core$Set$toList(value);
                var output = [];
                for (; value2.b; value2 = value2.b) // WHILE_CONS
                {
                    output.push(_DebugParser_toAnsiString(value2.a));
                }
                return $lamdera$program_test$DebugParser$Expandable(A2($lamdera$program_test$DebugParser$ElmSequence, $lamdera$program_test$DebugParser$SeqSet, _List_fromArray(output)));
            }
            case 'SeqDict_elm_builtin':
            {
                var value2 = $lamdera$containers$SeqDict$toList(value);
                var output = [];
                for (; value2.b; value2 = value2.b) // WHILE_CONS
                {
                    output.push(_Utils_Tuple2(_DebugParser_toAnsiString(value2.a.a), _DebugParser_toAnsiString(value2.a.b)));
                }
                return $lamdera$program_test$DebugParser$Expandable($lamdera$program_test$DebugParser$ElmDict($lamdera$containers$SeqDict$fromList(_List_fromArray(output))));
            }
            case 'RBNode_elm_builtin':
            case 'RBEmpty_elm_builtin':
            {
                var value2 = $elm$core$Dict$toList(value);
                var output = [];
                for (; value2.b; value2 = value2.b) // WHILE_CONS
                {
                    output.push(_Utils_Tuple2(_DebugParser_toAnsiString(value2.a.a), _DebugParser_toAnsiString(value2.a.b)));
                }
                return $lamdera$program_test$DebugParser$Expandable($lamdera$program_test$DebugParser$ElmDict($lamdera$containers$SeqDict$fromList(_List_fromArray(output))));
            }
            case 'Array_elm_builtin':
            {
                var value2 = $elm$core$Array$toList(value);
                var output = [];
                for (; value2.b; value2 = value2.b) // WHILE_CONS
                {
                    output.push(_DebugParser_toAnsiString(value2.a));
                }
                return $lamdera$program_test$DebugParser$Expandable(A2($lamdera$program_test$DebugParser$ElmSequence, $lamdera$program_test$DebugParser$SeqArray, _List_fromArray(output)));
            }
            case '::':
            case '[]':
            {
                var output = [];
                for (; value.b; value = value.b) // WHILE_CONS
                {
                    output.push(_DebugParser_toAnsiString(value.a));
                }
                return $lamdera$program_test$DebugParser$Expandable(A2($lamdera$program_test$DebugParser$ElmSequence, $lamdera$program_test$DebugParser$SeqList, _List_fromArray(output)));
            }
        }

        var output = [];
        for (var i in value)
        {
            if (i === '$') continue;
            output.push(_DebugParser_toAnsiString(value[i]));
        }
		return $lamdera$program_test$DebugParser$Expandable(A2($lamdera$program_test$DebugParser$ElmType, tag, _List_fromArray(output)));
	}

	if (typeof DataView === 'function' && value instanceof DataView)
	{
		return $lamdera$program_test$DebugParser$Plain($lamdera$program_test$DebugParser$ElmBytes(value.byteLength));
	}

	if (typeof File !== 'undefined' && value instanceof File)
	{
		return $lamdera$program_test$DebugParser$Plain($lamdera$program_test$DebugParser$ElmFile(value.name));
	}

	if (typeof value === 'object')
	{
		var output = [];
		for (var key in value)
		{
			var field = key[0] === '_' ? key.slice(1) : key;
			output.push(_Utils_Tuple2(field, _DebugParser_toAnsiString(value[key])));
		}
		return $lamdera$program_test$DebugParser$Expandable($lamdera$program_test$DebugParser$ElmRecord(_List_fromArray(output)));
	}

	return $lamdera$program_test$DebugParser$Plain($lamdera$program_test$DebugParser$ElmInternals);
}

function _List_fromArray(arr)
{
	var out = _List_Nil;
	for (var i = arr.length; i--; )
	{
		out = _List_Cons(arr[i], out);
	}
	return out;
}

function _List_Cons(hd, tl) { return { $: '::', a: hd, b: tl }; }

var _List_Nil = { $: '[]' };var $elm$core$List$cons = _List_cons;
var $elm$core$Elm$JsArray$foldr = _JsArray_foldr;
var $elm$core$Array$foldr$ = function (func, baseCase, _v0) {
	var tree = _v0.c;
	var tail = _v0.d;
	var helper = F2(
		function (node, acc) {
			if (node.$ === 'SubTree') {
				var subTree = node.a;
				return A3($elm$core$Elm$JsArray$foldr, helper, acc, subTree);
			} else {
				var values = node.a;
				return A3($elm$core$Elm$JsArray$foldr, func, acc, values);
			}
		});
	return A3(
		$elm$core$Elm$JsArray$foldr,
		helper,
		A3($elm$core$Elm$JsArray$foldr, func, baseCase, tail),
		tree);
};
var $elm$core$Array$foldr = F3($elm$core$Array$foldr$);
var $elm$core$Array$toList = function (array) {
	return $elm$core$Array$foldr$($elm$core$List$cons, _List_Nil, array);
};
var $elm$core$Dict$foldr$ = function (func, acc, t) {
	foldr:
	while (true) {
		if (t.$ === 'RBEmpty_elm_builtin') {
			return acc;
		} else {
			var key = t.b;
			var value = t.c;
			var left = t.d;
			var right = t.e;
			var $temp$acc = A3(
				func,
				key,
				value,
				$elm$core$Dict$foldr$(func, acc, right)),
				$temp$t = left;
			acc = $temp$acc;
			t = $temp$t;
			continue foldr;
		}
	}
};
var $elm$core$Dict$foldr = F3($elm$core$Dict$foldr$);
var $elm$core$Dict$toList = function (dict) {
	return $elm$core$Dict$foldr$(
		F3(
			function (key, value, list) {
				return A2(
					$elm$core$List$cons,
					_Utils_Tuple2(key, value),
					list);
			}),
		_List_Nil,
		dict);
};
var $elm$core$Dict$keys = function (dict) {
	return $elm$core$Dict$foldr$(
		F3(
			function (key, value, keyList) {
				return A2($elm$core$List$cons, key, keyList);
			}),
		_List_Nil,
		dict);
};
var $elm$core$Set$toList = function (_v0) {
	var dict = _v0.a;
	return $elm$core$Dict$keys(dict);
};
var $elm$core$Basics$EQ = {$: 'EQ'};
var $elm$core$Basics$GT = {$: 'GT'};
var $elm$core$Basics$LT = {$: 'LT'};
var $elm$core$Basics$identity = function (x) {
	return x;
};
var $lamdera$program_test$Effect$Test$Action = function (a) {
	return {$: 'Action', a: a};
};
var $lamdera$program_test$Effect$Test$AndThen$ = function (a, b) {
	return {$: 'AndThen', a: a, b: b};
};
var $lamdera$program_test$Effect$Test$AndThen = F2($lamdera$program_test$Effect$Test$AndThen$);
var $lamdera$program_test$Effect$Test$FrontendInitEvent = function (a) {
	return {$: 'FrontendInitEvent', a: a};
};
var $lamdera$program_test$Effect$Test$InvalidFrontendConnectUrl = function (a) {
	return {$: 'InvalidFrontendConnectUrl', a: a};
};
var $elm$core$Maybe$Just = function (a) {
	return {$: 'Just', a: a};
};
var $lamdera$program_test$Effect$Internal$MockNavigationKey = {$: 'MockNavigationKey'};
var $elm$core$Maybe$Nothing = {$: 'Nothing'};
var $lamdera$program_test$Effect$Test$Start = function (a) {
	return {$: 'Start', a: a};
};
var $lamdera$program_test$Effect$Test$UserMouseDownEvent$ = function (a, b) {
	return {$: 'UserMouseDownEvent', a: a, b: b};
};
var $lamdera$program_test$Effect$Test$UserMouseDownEvent = F2($lamdera$program_test$Effect$Test$UserMouseDownEvent$);
var $lamdera$program_test$Effect$Test$UserMouseEnterEvent$ = function (a, b) {
	return {$: 'UserMouseEnterEvent', a: a, b: b};
};
var $lamdera$program_test$Effect$Test$UserMouseEnterEvent = F2($lamdera$program_test$Effect$Test$UserMouseEnterEvent$);
var $lamdera$program_test$Effect$Test$UserMouseLeaveEvent$ = function (a, b) {
	return {$: 'UserMouseLeaveEvent', a: a, b: b};
};
var $lamdera$program_test$Effect$Test$UserMouseLeaveEvent = F2($lamdera$program_test$Effect$Test$UserMouseLeaveEvent$);
var $lamdera$program_test$Effect$Test$UserMouseMoveEvent$ = function (a, b) {
	return {$: 'UserMouseMoveEvent', a: a, b: b};
};
var $lamdera$program_test$Effect$Test$UserMouseMoveEvent = F2($lamdera$program_test$Effect$Test$UserMouseMoveEvent$);
var $lamdera$program_test$Effect$Test$UserMouseOutEvent$ = function (a, b) {
	return {$: 'UserMouseOutEvent', a: a, b: b};
};
var $lamdera$program_test$Effect$Test$UserMouseOutEvent = F2($lamdera$program_test$Effect$Test$UserMouseOutEvent$);
var $lamdera$program_test$Effect$Test$UserMouseOverEvent$ = function (a, b) {
	return {$: 'UserMouseOverEvent', a: a, b: b};
};
var $lamdera$program_test$Effect$Test$UserMouseOverEvent = F2($lamdera$program_test$Effect$Test$UserMouseOverEvent$);
var $lamdera$program_test$Effect$Test$UserMouseUpEvent$ = function (a, b) {
	return {$: 'UserMouseUpEvent', a: a, b: b};
};
var $lamdera$program_test$Effect$Test$UserMouseUpEvent = F2($lamdera$program_test$Effect$Test$UserMouseUpEvent$);
var $lamdera$program_test$Effect$Test$UserPointerCancelEvent$ = function (a, b) {
	return {$: 'UserPointerCancelEvent', a: a, b: b};
};
var $lamdera$program_test$Effect$Test$UserPointerCancelEvent = F2($lamdera$program_test$Effect$Test$UserPointerCancelEvent$);
var $lamdera$program_test$Effect$Test$UserPointerDownEvent$ = function (a, b) {
	return {$: 'UserPointerDownEvent', a: a, b: b};
};
var $lamdera$program_test$Effect$Test$UserPointerDownEvent = F2($lamdera$program_test$Effect$Test$UserPointerDownEvent$);
var $lamdera$program_test$Effect$Test$UserPointerEnterEvent$ = function (a, b) {
	return {$: 'UserPointerEnterEvent', a: a, b: b};
};
var $lamdera$program_test$Effect$Test$UserPointerEnterEvent = F2($lamdera$program_test$Effect$Test$UserPointerEnterEvent$);
var $lamdera$program_test$Effect$Test$UserPointerLeaveEvent$ = function (a, b) {
	return {$: 'UserPointerLeaveEvent', a: a, b: b};
};
var $lamdera$program_test$Effect$Test$UserPointerLeaveEvent = F2($lamdera$program_test$Effect$Test$UserPointerLeaveEvent$);
var $lamdera$program_test$Effect$Test$UserPointerMoveEvent$ = function (a, b) {
	return {$: 'UserPointerMoveEvent', a: a, b: b};
};
var $lamdera$program_test$Effect$Test$UserPointerMoveEvent = F2($lamdera$program_test$Effect$Test$UserPointerMoveEvent$);
var $lamdera$program_test$Effect$Test$UserPointerOutEvent$ = function (a, b) {
	return {$: 'UserPointerOutEvent', a: a, b: b};
};
var $lamdera$program_test$Effect$Test$UserPointerOutEvent = F2($lamdera$program_test$Effect$Test$UserPointerOutEvent$);
var $lamdera$program_test$Effect$Test$UserPointerOverEvent$ = function (a, b) {
	return {$: 'UserPointerOverEvent', a: a, b: b};
};
var $lamdera$program_test$Effect$Test$UserPointerOverEvent = F2($lamdera$program_test$Effect$Test$UserPointerOverEvent$);
var $lamdera$program_test$Effect$Test$UserPointerUpEvent$ = function (a, b) {
	return {$: 'UserPointerUpEvent', a: a, b: b};
};
var $lamdera$program_test$Effect$Test$UserPointerUpEvent = F2($lamdera$program_test$Effect$Test$UserPointerUpEvent$);
var $lamdera$program_test$Effect$Test$UserTouchCancelEvent$ = function (a, b) {
	return {$: 'UserTouchCancelEvent', a: a, b: b};
};
var $lamdera$program_test$Effect$Test$UserTouchCancelEvent = F2($lamdera$program_test$Effect$Test$UserTouchCancelEvent$);
var $lamdera$program_test$Effect$Test$UserTouchEndEvent$ = function (a, b) {
	return {$: 'UserTouchEndEvent', a: a, b: b};
};
var $lamdera$program_test$Effect$Test$UserTouchEndEvent = F2($lamdera$program_test$Effect$Test$UserTouchEndEvent$);
var $lamdera$program_test$Effect$Test$UserTouchMoveEvent$ = function (a, b) {
	return {$: 'UserTouchMoveEvent', a: a, b: b};
};
var $lamdera$program_test$Effect$Test$UserTouchMoveEvent = F2($lamdera$program_test$Effect$Test$UserTouchMoveEvent$);
var $lamdera$program_test$Effect$Test$UserTouchStartEvent$ = function (a, b) {
	return {$: 'UserTouchStartEvent', a: a, b: b};
};
var $lamdera$program_test$Effect$Test$UserTouchStartEvent = F2($lamdera$program_test$Effect$Test$UserTouchStartEvent$);
var $elm$core$Basics$add = _Basics_add;
var $elm$core$Basics$append = _Utils_append;
var $elm$core$Basics$apR$ = function (x, f) {
	return f(x);
};
var $elm$core$Basics$apR = F2($elm$core$Basics$apR$);
var $ianmackenzie$elm_units$Duration$inSeconds = function (_v0) {
	var numSeconds = _v0.a;
	return numSeconds;
};
var $elm$core$Basics$mul = _Basics_mul;
var $ianmackenzie$elm_units$Duration$inMilliseconds = function (duration) {
	return $ianmackenzie$elm_units$Duration$inSeconds(duration) * 1000;
};
var $elm$core$Basics$round = _Basics_round;
var $lamdera$program_test$Effect$Test$elapsedTimeInMillis = function (state) {
	return $elm$core$Basics$round(
		$ianmackenzie$elm_units$Duration$inMilliseconds(state.elapsedTime));
};
var $elm$time$Time$Posix = function (a) {
	return {$: 'Posix', a: a};
};
var $elm$time$Time$millisToPosix = $elm$time$Time$Posix;
var $elm$time$Time$posixToMillis = function (_v0) {
	var millis = _v0.a;
	return millis;
};
var $lamdera$program_test$Effect$Test$currentTime = function (state) {
	return $elm$time$Time$millisToPosix(
		$elm$time$Time$posixToMillis(state.startTime) + $lamdera$program_test$Effect$Test$elapsedTimeInMillis(state));
};
var $lamdera$containers$SeqDict$Collision$ = function (a, b) {
	return {$: 'Collision', a: a, b: b};
};
var $lamdera$containers$SeqDict$Collision = F2($lamdera$containers$SeqDict$Collision$);
var $lamdera$containers$SeqDict$Leaf$ = function (a, b, c, d) {
	return {$: 'Leaf', a: a, b: b, c: c, d: d};
};
var $lamdera$containers$SeqDict$Leaf = F4($lamdera$containers$SeqDict$Leaf$);
var $lamdera$containers$SeqDict$SeqDict_elm_builtin$ = function (a, b, c) {
	return {$: 'SeqDict_elm_builtin', a: a, b: b, c: c};
};
var $lamdera$containers$SeqDict$SeqDict_elm_builtin = F3($lamdera$containers$SeqDict$SeqDict_elm_builtin$);
var $lamdera$containers$SeqDict$SubTree$ = function (a, b) {
	return {$: 'SubTree', a: a, b: b};
};
var $lamdera$containers$SeqDict$SubTree = F2($lamdera$containers$SeqDict$SubTree$);
var $elm$core$Basics$apL$ = function (f, x) {
	return f(x);
};
var $elm$core$Basics$apL = F2($elm$core$Basics$apL$);
var $elm$core$Array$Array_elm_builtin$ = function (a, b, c, d) {
	return {$: 'Array_elm_builtin', a: a, b: b, c: c, d: d};
};
var $elm$core$Array$Array_elm_builtin = F4($elm$core$Array$Array_elm_builtin$);
var $elm$core$Array$Leaf = function (a) {
	return {$: 'Leaf', a: a};
};
var $elm$core$Array$SubTree = function (a) {
	return {$: 'SubTree', a: a};
};
var $elm$core$Elm$JsArray$map = _JsArray_map;
var $elm$core$Array$map$ = function (func, _v0) {
	var len = _v0.a;
	var startShift = _v0.b;
	var tree = _v0.c;
	var tail = _v0.d;
	var helper = function (node) {
		if (node.$ === 'SubTree') {
			var subTree = node.a;
			return $elm$core$Array$SubTree(
				A2($elm$core$Elm$JsArray$map, helper, subTree));
		} else {
			var values = node.a;
			return $elm$core$Array$Leaf(
				A2($elm$core$Elm$JsArray$map, func, values));
		}
	};
	return $elm$core$Array$Array_elm_builtin$(
		len,
		startShift,
		A2($elm$core$Elm$JsArray$map, helper, tree),
		A2($elm$core$Elm$JsArray$map, func, tail));
};
var $elm$core$Array$map = F2($elm$core$Array$map$);
var $lamdera$containers$JsArray2$map = _JsArray2_map;
var $elm$core$List$foldl$ = function (func, acc, list) {
	foldl:
	while (true) {
		if (!list.b) {
			return acc;
		} else {
			var x = list.a;
			var xs = list.b;
			var $temp$acc = A2(func, x, acc),
				$temp$list = xs;
			acc = $temp$acc;
			list = $temp$list;
			continue foldl;
		}
	}
};
var $elm$core$List$foldl = F3($elm$core$List$foldl$);
var $elm$core$Basics$gt = _Utils_gt;
var $elm$core$List$reverse = function (list) {
	return $elm$core$List$foldl$($elm$core$List$cons, _List_Nil, list);
};
var $elm$core$List$foldrHelper$ = function (fn, acc, ctr, ls) {
	if (!ls.b) {
		return acc;
	} else {
		var a = ls.a;
		var r1 = ls.b;
		if (!r1.b) {
			return A2(fn, a, acc);
		} else {
			var b = r1.a;
			var r2 = r1.b;
			if (!r2.b) {
				return A2(
					fn,
					a,
					A2(fn, b, acc));
			} else {
				var c = r2.a;
				var r3 = r2.b;
				if (!r3.b) {
					return A2(
						fn,
						a,
						A2(
							fn,
							b,
							A2(fn, c, acc)));
				} else {
					var d = r3.a;
					var r4 = r3.b;
					var res = (ctr > 500) ? $elm$core$List$foldl$(
						fn,
						acc,
						$elm$core$List$reverse(r4)) : $elm$core$List$foldrHelper$(fn, acc, ctr + 1, r4);
					return A2(
						fn,
						a,
						A2(
							fn,
							b,
							A2(
								fn,
								c,
								A2(fn, d, res))));
				}
			}
		}
	}
};
var $elm$core$List$foldrHelper = F4($elm$core$List$foldrHelper$);
var $elm$core$List$foldr$ = function (fn, acc, ls) {
	return $elm$core$List$foldrHelper$(fn, acc, 0, ls);
};
var $elm$core$List$foldr = F3($elm$core$List$foldr$);
var $elm$core$List$map$ = function (f, xs) {
	return $elm$core$List$foldr$(
		F2(
			function (x, acc) {
				return A2(
					$elm$core$List$cons,
					f(x),
					acc);
			}),
		_List_Nil,
		xs);
};
var $elm$core$List$map = F2($elm$core$List$map$);
var $elm$core$Maybe$map$ = function (f, maybe) {
	if (maybe.$ === 'Just') {
		var value = maybe.a;
		return $elm$core$Maybe$Just(
			f(value));
	} else {
		return $elm$core$Maybe$Nothing;
	}
};
var $elm$core$Maybe$map = F2($elm$core$Maybe$map$);
var $lamdera$containers$SeqDict$map$ = function (fn, _v0) {
	var rootBitmap = _v0.a;
	var rootNodes = _v0.b;
	var rootTriplets = _v0.c;
	var valueHelper = function (_v2) {
		var i = _v2.a;
		var k = _v2.b;
		var v = _v2.c;
		return _Utils_Tuple3(
			i,
			k,
			A2(fn, k, v));
	};
	var dictHelper = function (node) {
		switch (node.$) {
			case 'Leaf':
				var idx = node.a;
				var h = node.b;
				var k = node.c;
				var v = node.d;
				return $lamdera$containers$SeqDict$Leaf$(
					idx,
					h,
					k,
					A2(fn, k, v));
			case 'SubTree':
				var bitmap = node.a;
				var nodes = node.b;
				return $lamdera$containers$SeqDict$SubTree$(
					bitmap,
					A2($lamdera$containers$JsArray2$map, dictHelper, nodes));
			default:
				var h = node.a;
				var triplets = node.b;
				return $lamdera$containers$SeqDict$Collision$(
					h,
					$elm$core$List$map$(valueHelper, triplets));
		}
	};
	return $lamdera$containers$SeqDict$SeqDict_elm_builtin$(
		rootBitmap,
		A2($lamdera$containers$JsArray2$map, dictHelper, rootNodes),
		{
			array: $elm$core$Array$map$(
				$elm$core$Maybe$map(valueHelper),
				rootTriplets.array),
			size: rootTriplets.size
		});
};
var $lamdera$containers$SeqDict$map = F2($lamdera$containers$SeqDict$map$);
var $lamdera$program_test$Effect$Test$maybeToList = function (maybe) {
	if (maybe.$ === 'Just') {
		var a = maybe.a;
		return _List_fromArray(
			[a]);
	} else {
		return _List_Nil;
	}
};
var $elm$core$Elm$JsArray$push = _JsArray_push;
var $elm$core$Array$branchFactor = 32;
var $elm$core$Elm$JsArray$empty = _JsArray_empty;
var $elm$core$Basics$eq = _Utils_equal;
var $elm$core$Bitwise$and = _Bitwise_and;
var $elm$core$Bitwise$shiftRightZfBy = _Bitwise_shiftRightZfBy;
var $elm$core$Basics$ceiling = _Basics_ceiling;
var $elm$core$Basics$fdiv = _Basics_fdiv;
var $elm$core$Basics$logBase$ = function (base, number) {
	return _Basics_log(number) / _Basics_log(base);
};
var $elm$core$Basics$logBase = F2($elm$core$Basics$logBase$);
var $elm$core$Basics$toFloat = _Basics_toFloat;
var $elm$core$Array$shiftStep = $elm$core$Basics$ceiling(
	$elm$core$Basics$logBase$(2, $elm$core$Array$branchFactor));
var $elm$core$Basics$sub = _Basics_sub;
var $elm$core$Array$bitMask = 4294967295 >>> (32 - $elm$core$Array$shiftStep);
var $elm$core$Basics$ge = _Utils_ge;
var $elm$core$Elm$JsArray$length = _JsArray_length;
var $elm$core$Elm$JsArray$singleton = _JsArray_singleton;
var $elm$core$Elm$JsArray$unsafeGet = _JsArray_unsafeGet;
var $elm$core$Elm$JsArray$unsafeSet = _JsArray_unsafeSet;
var $elm$core$Array$insertTailInTree$ = function (shift, index, tail, tree) {
	var pos = $elm$core$Array$bitMask & (index >>> shift);
	if (_Utils_cmp(
		pos,
		$elm$core$Elm$JsArray$length(tree)) > -1) {
		if (shift === 5) {
			return A2(
				$elm$core$Elm$JsArray$push,
				$elm$core$Array$Leaf(tail),
				tree);
		} else {
			var newSub = $elm$core$Array$SubTree(
				$elm$core$Array$insertTailInTree$(shift - $elm$core$Array$shiftStep, index, tail, $elm$core$Elm$JsArray$empty));
			return A2($elm$core$Elm$JsArray$push, newSub, tree);
		}
	} else {
		var value = A2($elm$core$Elm$JsArray$unsafeGet, pos, tree);
		if (value.$ === 'SubTree') {
			var subTree = value.a;
			var newSub = $elm$core$Array$SubTree(
				$elm$core$Array$insertTailInTree$(shift - $elm$core$Array$shiftStep, index, tail, subTree));
			return A3($elm$core$Elm$JsArray$unsafeSet, pos, newSub, tree);
		} else {
			var newSub = $elm$core$Array$SubTree(
				$elm$core$Array$insertTailInTree$(
					shift - $elm$core$Array$shiftStep,
					index,
					tail,
					$elm$core$Elm$JsArray$singleton(value)));
			return A3($elm$core$Elm$JsArray$unsafeSet, pos, newSub, tree);
		}
	}
};
var $elm$core$Array$insertTailInTree = F4($elm$core$Array$insertTailInTree$);
var $elm$core$Bitwise$shiftLeftBy = _Bitwise_shiftLeftBy;
var $elm$core$Array$unsafeReplaceTail$ = function (newTail, _v0) {
	var len = _v0.a;
	var startShift = _v0.b;
	var tree = _v0.c;
	var tail = _v0.d;
	var originalTailLen = $elm$core$Elm$JsArray$length(tail);
	var newTailLen = $elm$core$Elm$JsArray$length(newTail);
	var newArrayLen = len + (newTailLen - originalTailLen);
	if (_Utils_eq(newTailLen, $elm$core$Array$branchFactor)) {
		var overflow = _Utils_cmp(newArrayLen >>> $elm$core$Array$shiftStep, 1 << startShift) > 0;
		if (overflow) {
			var newShift = startShift + $elm$core$Array$shiftStep;
			var newTree = $elm$core$Array$insertTailInTree$(
				newShift,
				len,
				newTail,
				$elm$core$Elm$JsArray$singleton(
					$elm$core$Array$SubTree(tree)));
			return $elm$core$Array$Array_elm_builtin$(newArrayLen, newShift, newTree, $elm$core$Elm$JsArray$empty);
		} else {
			return $elm$core$Array$Array_elm_builtin$(
				newArrayLen,
				startShift,
				$elm$core$Array$insertTailInTree$(startShift, len, newTail, tree),
				$elm$core$Elm$JsArray$empty);
		}
	} else {
		return $elm$core$Array$Array_elm_builtin$(newArrayLen, startShift, tree, newTail);
	}
};
var $elm$core$Array$unsafeReplaceTail = F2($elm$core$Array$unsafeReplaceTail$);
var $elm$core$Array$push$ = function (a, array) {
	var tail = array.d;
	return $elm$core$Array$unsafeReplaceTail$(
		A2($elm$core$Elm$JsArray$push, a, tail),
		array);
};
var $elm$core$Array$push = F2($elm$core$Array$push$);
var $lamdera$program_test$Effect$Test$addEvent$ = function (eventType, maybeError, state) {
	return _Utils_update(
		state,
		{
			history: $elm$core$Array$push$(
				{
					backend: state.model,
					cachedElmValue: $elm$core$Maybe$Nothing,
					eventType: eventType,
					frontends: $lamdera$containers$SeqDict$map$(
						F2(
							function (_v0, a) {
								return {model: a.model, sessionId: a.sessionId, url: a.navigation.url, windowSize: a.windowSize};
							}),
						state.frontends),
					testErrors: $lamdera$program_test$Effect$Test$maybeToList(maybeError),
					time: $lamdera$program_test$Effect$Test$currentTime(state)
				},
				state.history),
			testErrors: _Utils_ap(
				state.testErrors,
				$lamdera$program_test$Effect$Test$maybeToList(maybeError))
		});
};
var $lamdera$program_test$Effect$Test$addEvent = F3($lamdera$program_test$Effect$Test$addEvent$);
var $lamdera$program_test$Effect$Test$UserBlurEvent = function (a) {
	return {$: 'UserBlurEvent', a: a};
};
var $elm$core$Result$Err = function (a) {
	return {$: 'Err', a: a};
};
var $elm$json$Json$Decode$Failure$ = function (a, b) {
	return {$: 'Failure', a: a, b: b};
};
var $elm$json$Json$Decode$Failure = F2($elm$json$Json$Decode$Failure$);
var $elm$json$Json$Decode$Field$ = function (a, b) {
	return {$: 'Field', a: a, b: b};
};
var $elm$json$Json$Decode$Field = F2($elm$json$Json$Decode$Field$);
var $elm$json$Json$Decode$Index$ = function (a, b) {
	return {$: 'Index', a: a, b: b};
};
var $elm$json$Json$Decode$Index = F2($elm$json$Json$Decode$Index$);
var $elm$core$Result$Ok = function (a) {
	return {$: 'Ok', a: a};
};
var $elm$json$Json$Decode$OneOf = function (a) {
	return {$: 'OneOf', a: a};
};
var $elm$core$Basics$False = {$: 'False'};
var $elm$core$String$all = _String_all;
var $elm$core$Basics$and = _Basics_and;
var $elm$json$Json$Encode$encode = _Json_encode;
var $elm$core$String$fromInt = _String_fromNumber;
var $elm$core$String$join$ = function (sep, chunks) {
	return A2(
		_String_join,
		sep,
		_List_toArray(chunks));
};
var $elm$core$String$join = F2($elm$core$String$join$);
var $elm$core$String$split$ = function (sep, string) {
	return _List_fromArray(
		A2(_String_split, sep, string));
};
var $elm$core$String$split = F2($elm$core$String$split$);
var $elm$json$Json$Decode$indent = function (str) {
	return $elm$core$String$join$(
		'\n    ',
		$elm$core$String$split$('\n', str));
};
var $elm$core$List$length = function (xs) {
	return $elm$core$List$foldl$(
		F2(
			function (_v0, i) {
				return i + 1;
			}),
		0,
		xs);
};
var $elm$core$List$map2 = _List_map2;
var $elm$core$Basics$le = _Utils_le;
var $elm$core$List$rangeHelp$ = function (lo, hi, list) {
	rangeHelp:
	while (true) {
		if (_Utils_cmp(lo, hi) < 1) {
			var $temp$hi = hi - 1,
				$temp$list = A2($elm$core$List$cons, hi, list);
			hi = $temp$hi;
			list = $temp$list;
			continue rangeHelp;
		} else {
			return list;
		}
	}
};
var $elm$core$List$rangeHelp = F3($elm$core$List$rangeHelp$);
var $elm$core$List$range$ = function (lo, hi) {
	return $elm$core$List$rangeHelp$(lo, hi, _List_Nil);
};
var $elm$core$List$range = F2($elm$core$List$range$);
var $elm$core$List$indexedMap$ = function (f, xs) {
	return A3(
		$elm$core$List$map2,
		f,
		$elm$core$List$range$(
			0,
			$elm$core$List$length(xs) - 1),
		xs);
};
var $elm$core$List$indexedMap = F2($elm$core$List$indexedMap$);
var $elm$core$Char$toCode = _Char_toCode;
var $elm$core$Char$isLower = function (_char) {
	var code = $elm$core$Char$toCode(_char);
	return (97 <= code) && (code <= 122);
};
var $elm$core$Char$isUpper = function (_char) {
	var code = $elm$core$Char$toCode(_char);
	return (code <= 90) && (65 <= code);
};
var $elm$core$Basics$or = _Basics_or;
var $elm$core$Char$isAlpha = function (_char) {
	return $elm$core$Char$isLower(_char) || $elm$core$Char$isUpper(_char);
};
var $elm$core$Char$isDigit = function (_char) {
	var code = $elm$core$Char$toCode(_char);
	return (code <= 57) && (48 <= code);
};
var $elm$core$Char$isAlphaNum = function (_char) {
	return $elm$core$Char$isLower(_char) || ($elm$core$Char$isUpper(_char) || $elm$core$Char$isDigit(_char));
};
var $elm$core$String$uncons = _String_uncons;
var $elm$json$Json$Decode$errorOneOf$ = function (i, error) {
	return '\n\n(' + ($elm$core$String$fromInt(i + 1) + (') ' + $elm$json$Json$Decode$indent(
		$elm$json$Json$Decode$errorToString(error))));
};
var $elm$json$Json$Decode$errorOneOf = F2($elm$json$Json$Decode$errorOneOf$);
var $elm$json$Json$Decode$errorToString = function (error) {
	return $elm$json$Json$Decode$errorToStringHelp$(error, _List_Nil);
};
var $elm$json$Json$Decode$errorToStringHelp$ = function (error, context) {
	errorToStringHelp:
	while (true) {
		switch (error.$) {
			case 'Field':
				var f = error.a;
				var err = error.b;
				var isSimple = function () {
					var _v1 = $elm$core$String$uncons(f);
					if (_v1.$ === 'Nothing') {
						return false;
					} else {
						var _v2 = _v1.a;
						var _char = _v2.a;
						var rest = _v2.b;
						return $elm$core$Char$isAlpha(_char) && A2($elm$core$String$all, $elm$core$Char$isAlphaNum, rest);
					}
				}();
				var fieldName = isSimple ? ('.' + f) : ('[\'' + (f + '\']'));
				var $temp$error = err,
					$temp$context = A2($elm$core$List$cons, fieldName, context);
				error = $temp$error;
				context = $temp$context;
				continue errorToStringHelp;
			case 'Index':
				var i = error.a;
				var err = error.b;
				var indexName = '[' + ($elm$core$String$fromInt(i) + ']');
				var $temp$error = err,
					$temp$context = A2($elm$core$List$cons, indexName, context);
				error = $temp$error;
				context = $temp$context;
				continue errorToStringHelp;
			case 'OneOf':
				var errors = error.a;
				if (!errors.b) {
					return 'Ran into a Json.Decode.oneOf with no possibilities' + function () {
						if (!context.b) {
							return '!';
						} else {
							return ' at json' + $elm$core$String$join$(
								'',
								$elm$core$List$reverse(context));
						}
					}();
				} else {
					if (!errors.b.b) {
						var err = errors.a;
						var $temp$error = err;
						error = $temp$error;
						continue errorToStringHelp;
					} else {
						var starter = function () {
							if (!context.b) {
								return 'Json.Decode.oneOf';
							} else {
								return 'The Json.Decode.oneOf at json' + $elm$core$String$join$(
									'',
									$elm$core$List$reverse(context));
							}
						}();
						var introduction = starter + (' failed in the following ' + ($elm$core$String$fromInt(
							$elm$core$List$length(errors)) + ' ways:'));
						return $elm$core$String$join$(
							'\n\n',
							A2(
								$elm$core$List$cons,
								introduction,
								$elm$core$List$indexedMap$($elm$json$Json$Decode$errorOneOf, errors)));
					}
				}
			default:
				var msg = error.a;
				var json = error.b;
				var introduction = function () {
					if (!context.b) {
						return 'Problem with the given value:\n\n';
					} else {
						return 'Problem with the value at json' + ($elm$core$String$join$(
							'',
							$elm$core$List$reverse(context)) + ':\n\n    ');
					}
				}();
				return introduction + ($elm$json$Json$Decode$indent(
					A2($elm$json$Json$Encode$encode, 4, json)) + ('\n\n' + msg));
		}
	}
};
var $elm$json$Json$Decode$errorToStringHelp = F2($elm$json$Json$Decode$errorToStringHelp$);
var $elm$core$Array$empty = $elm$core$Array$Array_elm_builtin$(0, $elm$core$Array$shiftStep, $elm$core$Elm$JsArray$empty, $elm$core$Elm$JsArray$empty);
var $elm$core$Elm$JsArray$initialize = _JsArray_initialize;
var $elm$core$Basics$floor = _Basics_floor;
var $elm$core$Basics$max$ = function (x, y) {
	return (_Utils_cmp(x, y) > 0) ? x : y;
};
var $elm$core$Basics$max = F2($elm$core$Basics$max$);
var $elm$core$Elm$JsArray$initializeFromList = _JsArray_initializeFromList;
var $elm$core$Array$compressNodes$ = function (nodes, acc) {
	compressNodes:
	while (true) {
		var _v0 = A2($elm$core$Elm$JsArray$initializeFromList, $elm$core$Array$branchFactor, nodes);
		var node = _v0.a;
		var remainingNodes = _v0.b;
		var newAcc = A2(
			$elm$core$List$cons,
			$elm$core$Array$SubTree(node),
			acc);
		if (!remainingNodes.b) {
			return $elm$core$List$reverse(newAcc);
		} else {
			var $temp$nodes = remainingNodes,
				$temp$acc = newAcc;
			nodes = $temp$nodes;
			acc = $temp$acc;
			continue compressNodes;
		}
	}
};
var $elm$core$Array$compressNodes = F2($elm$core$Array$compressNodes$);
var $elm$core$Tuple$first = function (_v0) {
	var x = _v0.a;
	return x;
};
var $elm$core$Array$treeFromBuilder$ = function (nodeList, nodeListSize) {
	treeFromBuilder:
	while (true) {
		var newNodeSize = $elm$core$Basics$ceiling(nodeListSize / $elm$core$Array$branchFactor);
		if (newNodeSize === 1) {
			return A2($elm$core$Elm$JsArray$initializeFromList, $elm$core$Array$branchFactor, nodeList).a;
		} else {
			var $temp$nodeList = $elm$core$Array$compressNodes$(nodeList, _List_Nil),
				$temp$nodeListSize = newNodeSize;
			nodeList = $temp$nodeList;
			nodeListSize = $temp$nodeListSize;
			continue treeFromBuilder;
		}
	}
};
var $elm$core$Array$treeFromBuilder = F2($elm$core$Array$treeFromBuilder$);
var $elm$core$Array$builderToArray$ = function (reverseNodeList, builder) {
	if (!builder.nodeListSize) {
		return $elm$core$Array$Array_elm_builtin$(
			$elm$core$Elm$JsArray$length(builder.tail),
			$elm$core$Array$shiftStep,
			$elm$core$Elm$JsArray$empty,
			builder.tail);
	} else {
		var treeLen = builder.nodeListSize * $elm$core$Array$branchFactor;
		var depth = $elm$core$Basics$floor(
			$elm$core$Basics$logBase$($elm$core$Array$branchFactor, treeLen - 1));
		var correctNodeList = reverseNodeList ? $elm$core$List$reverse(builder.nodeList) : builder.nodeList;
		var tree = $elm$core$Array$treeFromBuilder$(correctNodeList, builder.nodeListSize);
		return $elm$core$Array$Array_elm_builtin$(
			$elm$core$Elm$JsArray$length(builder.tail) + treeLen,
			$elm$core$Basics$max$(5, depth * $elm$core$Array$shiftStep),
			tree,
			builder.tail);
	}
};
var $elm$core$Array$builderToArray = F2($elm$core$Array$builderToArray$);
var $elm$core$Basics$idiv = _Basics_idiv;
var $elm$core$Basics$lt = _Utils_lt;
var $elm$core$Array$initializeHelp$ = function (fn, fromIndex, len, nodeList, tail) {
	initializeHelp:
	while (true) {
		if (fromIndex < 0) {
			return $elm$core$Array$builderToArray$(
				false,
				{nodeList: nodeList, nodeListSize: (len / $elm$core$Array$branchFactor) | 0, tail: tail});
		} else {
			var leaf = $elm$core$Array$Leaf(
				A3($elm$core$Elm$JsArray$initialize, $elm$core$Array$branchFactor, fromIndex, fn));
			var $temp$fromIndex = fromIndex - $elm$core$Array$branchFactor,
				$temp$nodeList = A2($elm$core$List$cons, leaf, nodeList);
			fromIndex = $temp$fromIndex;
			nodeList = $temp$nodeList;
			continue initializeHelp;
		}
	}
};
var $elm$core$Array$initializeHelp = F5($elm$core$Array$initializeHelp$);
var $elm$core$Basics$remainderBy = _Basics_remainderBy;
var $elm$core$Array$initialize$ = function (len, fn) {
	if (len <= 0) {
		return $elm$core$Array$empty;
	} else {
		var tailLen = len % $elm$core$Array$branchFactor;
		var tail = A3($elm$core$Elm$JsArray$initialize, tailLen, len - tailLen, fn);
		var initialFromIndex = (len - tailLen) - $elm$core$Array$branchFactor;
		return $elm$core$Array$initializeHelp$(fn, initialFromIndex, len, _List_Nil, tail);
	}
};
var $elm$core$Array$initialize = F2($elm$core$Array$initialize$);
var $elm$core$Basics$True = {$: 'True'};
var $elm$core$Result$isOk = function (result) {
	if (result.$ === 'Ok') {
		return true;
	} else {
		return false;
	}
};
var $elm$json$Json$Encode$object = function (pairs) {
	return _Json_wrap(
		$elm$core$List$foldl$(
			F2(
				function (_v0, obj) {
					var k = _v0.a;
					var v = _v0.b;
					return A3(_Json_addField, k, v, obj);
				}),
			_Json_emptyObject(_Utils_Tuple0),
			pairs));
};
var $elm_explorations$test$Test$Html$Event$emptyObject = $elm$json$Json$Encode$object(_List_Nil);
var $elm_explorations$test$Test$Html$Event$blur = _Utils_Tuple2('blur', $elm_explorations$test$Test$Html$Event$emptyObject);
var $lamdera$program_test$Effect$Test$ClientIdNotFound = function (a) {
	return {$: 'ClientIdNotFound', a: a};
};
var $lamdera$program_test$Effect$Test$NextStep$ = function (a, b) {
	return {$: 'NextStep', a: a, b: b};
};
var $lamdera$program_test$Effect$Test$NextStep = F2($lamdera$program_test$Effect$Test$NextStep$);
var $lamdera$program_test$Effect$Test$UserEventError$ = function (a, b) {
	return {$: 'UserEventError', a: a, b: b};
};
var $lamdera$program_test$Effect$Test$UserEventError = F2($lamdera$program_test$Effect$Test$UserEventError$);
var $lamdera$program_test$Effect$Test$UserInputEvent = function (a) {
	return {$: 'UserInputEvent', a: a};
};
var $elm$json$Json$Decode$map = _Json_map1;
var $elm$json$Json$Decode$map2 = _Json_map2;
var $elm$json$Json$Decode$succeed = _Json_succeed;
var $elm$virtual_dom$VirtualDom$toHandlerInt = function (handler) {
	switch (handler.$) {
		case 'Normal':
			return 0;
		case 'MayStopPropagation':
			return 1;
		case 'MayPreventDefault':
			return 2;
		default:
			return 3;
	}
};
var $elm$html$Html$div = _VirtualDom_node('div');
var $elm$core$String$length = _String_length;
var $elm$core$String$slice = _String_slice;
var $elm$core$String$dropLeft$ = function (n, string) {
	return (n < 1) ? string : A3(
		$elm$core$String$slice,
		n,
		$elm$core$String$length(string),
		string);
};
var $elm$core$String$dropLeft = F2($elm$core$String$dropLeft$);
var $elm_explorations$test$Test$Html$Query$Internal$Find = function (a) {
	return {$: 'Find', a: a};
};
var $elm_explorations$test$Test$Html$Query$Internal$Single$ = function (a, b) {
	return {$: 'Single', a: a, b: b};
};
var $elm_explorations$test$Test$Html$Query$Internal$Single = F2($elm_explorations$test$Test$Html$Query$Internal$Single$);
var $elm_explorations$test$Test$Html$Query$Internal$InternalError = function (a) {
	return {$: 'InternalError', a: a};
};
var $elm_explorations$test$Test$Html$Query$Internal$Query$ = function (a, b) {
	return {$: 'Query', a: a, b: b};
};
var $elm_explorations$test$Test$Html$Query$Internal$Query = F2($elm_explorations$test$Test$Html$Query$Internal$Query$);
var $elm_explorations$test$Test$Html$Query$Internal$prependSelector$ = function (query, selector) {
	if (query.$ === 'Query') {
		var node = query.a;
		var selectors = query.b;
		return $elm_explorations$test$Test$Html$Query$Internal$Query$(
			node,
			A2($elm$core$List$cons, selector, selectors));
	} else {
		var message = query.a;
		return $elm_explorations$test$Test$Html$Query$Internal$InternalError(message);
	}
};
var $elm_explorations$test$Test$Html$Query$Internal$prependSelector = F2($elm_explorations$test$Test$Html$Query$Internal$prependSelector$);
var $elm_explorations$test$Test$Html$Query$find$ = function (selectors, _v0) {
	var showTrace = _v0.a;
	var query = _v0.b;
	return $elm_explorations$test$Test$Html$Query$Internal$Single$(
		showTrace,
		$elm_explorations$test$Test$Html$Query$Internal$prependSelector$(
			query,
			$elm_explorations$test$Test$Html$Query$Internal$Find(selectors)));
};
var $elm_explorations$test$Test$Html$Query$find = F2($elm_explorations$test$Test$Html$Query$find$);
var $elm_explorations$test$Test$Html$Internal$Inert$Node = function (a) {
	return {$: 'Node', a: a};
};
var $elm_explorations$test$Test$Html$Internal$ElmHtml$InternalTypes$HtmlContext$ = function (a, b) {
	return {$: 'HtmlContext', a: a, b: b};
};
var $elm_explorations$test$Test$Html$Internal$ElmHtml$InternalTypes$HtmlContext = F2($elm_explorations$test$Test$Html$Internal$ElmHtml$InternalTypes$HtmlContext$);
var $elm_explorations$test$Test$Html$Internal$ElmHtml$InternalTypes$NodeEntry = function (a) {
	return {$: 'NodeEntry', a: a};
};
var $elm_explorations$test$Test$Html$Internal$ElmHtml$InternalTypes$NodeRecord$ = function (tag, children, facts, descendantsCount) {
	return {children: children, descendantsCount: descendantsCount, facts: facts, tag: tag};
};
var $elm_explorations$test$Test$Html$Internal$ElmHtml$InternalTypes$NodeRecord = F4($elm_explorations$test$Test$Html$Internal$ElmHtml$InternalTypes$NodeRecord$);
var $elm_explorations$test$Test$Html$Internal$ElmHtml$InternalTypes$TextTag = function (a) {
	return {$: 'TextTag', a: a};
};
var $elm$json$Json$Decode$andThen = _Json_andThen;
var $elm$json$Json$Decode$field = _Json_decodeField;
var $elm$json$Json$Decode$at$ = function (fields, decoder) {
	return $elm$core$List$foldr$($elm$json$Json$Decode$field, decoder, fields);
};
var $elm$json$Json$Decode$at = F2($elm$json$Json$Decode$at$);
var $elm_explorations$test$Test$Html$Internal$ElmHtml$InternalTypes$CustomNode = function (a) {
	return {$: 'CustomNode', a: a};
};
var $elm_explorations$test$Test$Html$Internal$ElmHtml$InternalTypes$MarkdownNode = function (a) {
	return {$: 'MarkdownNode', a: a};
};
var $elm_explorations$test$Test$Html$Internal$ElmHtml$InternalTypes$CustomNodeRecord$ = function (facts, model) {
	return {facts: facts, model: model};
};
var $elm_explorations$test$Test$Html$Internal$ElmHtml$InternalTypes$CustomNodeRecord = F2($elm_explorations$test$Test$Html$Internal$ElmHtml$InternalTypes$CustomNodeRecord$);
var $elm_explorations$test$Test$Html$Internal$ElmHtml$InternalTypes$Facts$ = function (styles, events, attributeNamespace, stringAttributes, boolAttributes) {
	return {attributeNamespace: attributeNamespace, boolAttributes: boolAttributes, events: events, stringAttributes: stringAttributes, styles: styles};
};
var $elm_explorations$test$Test$Html$Internal$ElmHtml$InternalTypes$Facts = F5($elm_explorations$test$Test$Html$Internal$ElmHtml$InternalTypes$Facts$);
var $elm_explorations$test$Test$Html$Internal$ElmHtml$Constants$attributeNamespaceKey = 'a4';
var $elm$json$Json$Decode$bool = _Json_decodeBool;
var $elm$core$Dict$RBEmpty_elm_builtin = {$: 'RBEmpty_elm_builtin'};
var $elm$core$Dict$empty = $elm$core$Dict$RBEmpty_elm_builtin;
var $elm$core$Dict$Black = {$: 'Black'};
var $elm$core$Dict$RBNode_elm_builtin$ = function (a, b, c, d, e) {
	return {$: 'RBNode_elm_builtin', a: a, b: b, c: c, d: d, e: e};
};
var $elm$core$Dict$RBNode_elm_builtin = F5($elm$core$Dict$RBNode_elm_builtin$);
var $elm$core$Dict$Red = {$: 'Red'};
var $elm$core$Dict$balance$ = function (color, key, value, left, right) {
	if ((right.$ === 'RBNode_elm_builtin') && (right.a.$ === 'Red')) {
		var _v1 = right.a;
		var rK = right.b;
		var rV = right.c;
		var rLeft = right.d;
		var rRight = right.e;
		if ((left.$ === 'RBNode_elm_builtin') && (left.a.$ === 'Red')) {
			var _v3 = left.a;
			var lK = left.b;
			var lV = left.c;
			var lLeft = left.d;
			var lRight = left.e;
			return $elm$core$Dict$RBNode_elm_builtin$(
				$elm$core$Dict$Red,
				key,
				value,
				$elm$core$Dict$RBNode_elm_builtin$($elm$core$Dict$Black, lK, lV, lLeft, lRight),
				$elm$core$Dict$RBNode_elm_builtin$($elm$core$Dict$Black, rK, rV, rLeft, rRight));
		} else {
			return $elm$core$Dict$RBNode_elm_builtin$(
				color,
				rK,
				rV,
				$elm$core$Dict$RBNode_elm_builtin$($elm$core$Dict$Red, key, value, left, rLeft),
				rRight);
		}
	} else {
		if ((((left.$ === 'RBNode_elm_builtin') && (left.a.$ === 'Red')) && (left.d.$ === 'RBNode_elm_builtin')) && (left.d.a.$ === 'Red')) {
			var _v5 = left.a;
			var lK = left.b;
			var lV = left.c;
			var _v6 = left.d;
			var _v7 = _v6.a;
			var llK = _v6.b;
			var llV = _v6.c;
			var llLeft = _v6.d;
			var llRight = _v6.e;
			var lRight = left.e;
			return $elm$core$Dict$RBNode_elm_builtin$(
				$elm$core$Dict$Red,
				lK,
				lV,
				$elm$core$Dict$RBNode_elm_builtin$($elm$core$Dict$Black, llK, llV, llLeft, llRight),
				$elm$core$Dict$RBNode_elm_builtin$($elm$core$Dict$Black, key, value, lRight, right));
		} else {
			return $elm$core$Dict$RBNode_elm_builtin$(color, key, value, left, right);
		}
	}
};
var $elm$core$Dict$balance = F5($elm$core$Dict$balance$);
var $elm$core$Basics$compare = _Utils_compare;
var $elm$core$Dict$insertHelp$ = function (key, value, dict) {
	if (dict.$ === 'RBEmpty_elm_builtin') {
		return $elm$core$Dict$RBNode_elm_builtin$($elm$core$Dict$Red, key, value, $elm$core$Dict$RBEmpty_elm_builtin, $elm$core$Dict$RBEmpty_elm_builtin);
	} else {
		var nColor = dict.a;
		var nKey = dict.b;
		var nValue = dict.c;
		var nLeft = dict.d;
		var nRight = dict.e;
		var _v1 = A2($elm$core$Basics$compare, key, nKey);
		switch (_v1.$) {
			case 'LT':
				return $elm$core$Dict$balance$(
					nColor,
					nKey,
					nValue,
					$elm$core$Dict$insertHelp$(key, value, nLeft),
					nRight);
			case 'EQ':
				return $elm$core$Dict$RBNode_elm_builtin$(nColor, nKey, value, nLeft, nRight);
			default:
				return $elm$core$Dict$balance$(
					nColor,
					nKey,
					nValue,
					nLeft,
					$elm$core$Dict$insertHelp$(key, value, nRight));
		}
	}
};
var $elm$core$Dict$insertHelp = F3($elm$core$Dict$insertHelp$);
var $elm$core$Dict$insert$ = function (key, value, dict) {
	var _v0 = $elm$core$Dict$insertHelp$(key, value, dict);
	if ((_v0.$ === 'RBNode_elm_builtin') && (_v0.a.$ === 'Red')) {
		var _v1 = _v0.a;
		var k = _v0.b;
		var v = _v0.c;
		var l = _v0.d;
		var r = _v0.e;
		return $elm$core$Dict$RBNode_elm_builtin$($elm$core$Dict$Black, k, v, l, r);
	} else {
		var x = _v0;
		return x;
	}
};
var $elm$core$Dict$insert = F3($elm$core$Dict$insert$);
var $elm$core$Dict$fromList = function (assocs) {
	return $elm$core$List$foldl$(
		F2(
			function (_v0, dict) {
				var key = _v0.a;
				var value = _v0.b;
				return $elm$core$Dict$insert$(key, value, dict);
			}),
		$elm$core$Dict$empty,
		assocs);
};
var $elm$json$Json$Decode$keyValuePairs = _Json_decodeKeyValuePairs;
var $elm$json$Json$Decode$dict = function (decoder) {
	return A2(
		$elm$json$Json$Decode$map,
		$elm$core$Dict$fromList,
		$elm$json$Json$Decode$keyValuePairs(decoder));
};
var $elm_explorations$test$Test$Html$Internal$ElmHtml$Constants$eventKey = 'a0';
var $elm$json$Json$Decode$oneOf = _Json_oneOf;
var $elm$json$Json$Decode$value = _Json_decodeValue;
var $elm_explorations$test$Test$Html$Internal$ElmHtml$InternalTypes$decodeEvents = function (taggedEventDecoder) {
	return $elm$json$Json$Decode$oneOf(
		_List_fromArray(
			[
				A2(
				$elm$json$Json$Decode$field,
				$elm_explorations$test$Test$Html$Internal$ElmHtml$Constants$eventKey,
				$elm$json$Json$Decode$dict(
					A2($elm$json$Json$Decode$map, taggedEventDecoder, $elm$json$Json$Decode$value))),
				$elm$json$Json$Decode$succeed($elm$core$Dict$empty)
			]));
};
var $elm$core$Basics$composeR$ = function (f, g, x) {
	return g(
		f(x));
};
var $elm$core$Basics$composeR = F3($elm$core$Basics$composeR$);
var $elm_explorations$test$Test$Html$Internal$ElmHtml$Constants$attributeKey = 'a3';
var $elm$json$Json$Decode$decodeValue = _Json_run;
var $elm$core$List$maybeCons$ = function (f, mx, xs) {
	var _v0 = f(mx);
	if (_v0.$ === 'Just') {
		var x = _v0.a;
		return A2($elm$core$List$cons, x, xs);
	} else {
		return xs;
	}
};
var $elm$core$List$maybeCons = F3($elm$core$List$maybeCons$);
var $elm$core$List$filterMap$ = function (f, xs) {
	return $elm$core$List$foldr$(
		$elm$core$List$maybeCons(f),
		_List_Nil,
		xs);
};
var $elm$core$List$filterMap = F2($elm$core$List$filterMap$);
var $elm_explorations$test$Test$Html$Internal$ElmHtml$InternalTypes$decodeDictFilterMap = function (decoder) {
	return A2(
		$elm$json$Json$Decode$map,
		A2(
			$elm$core$Basics$composeR,
			$elm$core$Dict$toList,
			A2(
				$elm$core$Basics$composeR,
				$elm$core$List$filterMap(
					function (_v0) {
						var key = _v0.a;
						var value = _v0.b;
						var _v1 = A2($elm$json$Json$Decode$decodeValue, decoder, value);
						if (_v1.$ === 'Err') {
							return $elm$core$Maybe$Nothing;
						} else {
							var v = _v1.a;
							return $elm$core$Maybe$Just(
								_Utils_Tuple2(key, v));
						}
					}),
				$elm$core$Dict$fromList)),
		$elm$json$Json$Decode$dict($elm$json$Json$Decode$value));
};
var $elm_explorations$test$Test$Html$Internal$ElmHtml$InternalTypes$decodeAttributes = function (decoder) {
	return $elm$json$Json$Decode$oneOf(
		_List_fromArray(
			[
				A2(
				$elm$json$Json$Decode$field,
				$elm_explorations$test$Test$Html$Internal$ElmHtml$Constants$attributeKey,
				$elm_explorations$test$Test$Html$Internal$ElmHtml$InternalTypes$decodeDictFilterMap(decoder)),
				$elm$json$Json$Decode$succeed($elm$core$Dict$empty)
			]));
};
var $elm$core$Dict$foldl$ = function (func, acc, dict) {
	foldl:
	while (true) {
		if (dict.$ === 'RBEmpty_elm_builtin') {
			return acc;
		} else {
			var key = dict.b;
			var value = dict.c;
			var left = dict.d;
			var right = dict.e;
			var $temp$acc = A3(
				func,
				key,
				value,
				$elm$core$Dict$foldl$(func, acc, left)),
				$temp$dict = right;
			acc = $temp$acc;
			dict = $temp$dict;
			continue foldl;
		}
	}
};
var $elm$core$Dict$foldl = F3($elm$core$Dict$foldl$);
var $elm$core$Dict$filter$ = function (isGood, dict) {
	return $elm$core$Dict$foldl$(
		F3(
			function (k, v, d) {
				return A2(isGood, k, v) ? $elm$core$Dict$insert$(k, v, d) : d;
			}),
		$elm$core$Dict$empty,
		dict);
};
var $elm$core$Dict$filter = F2($elm$core$Dict$filter$);
var $elm_explorations$test$Test$Html$Internal$ElmHtml$Constants$styleKey = 'a1';
var $elm_explorations$test$Test$Html$Internal$ElmHtml$Constants$knownKeys = _List_fromArray(
	[$elm_explorations$test$Test$Html$Internal$ElmHtml$Constants$styleKey, $elm_explorations$test$Test$Html$Internal$ElmHtml$Constants$eventKey, $elm_explorations$test$Test$Html$Internal$ElmHtml$Constants$attributeKey, $elm_explorations$test$Test$Html$Internal$ElmHtml$Constants$attributeNamespaceKey]);
var $elm$core$List$any$ = function (isOkay, list) {
	any:
	while (true) {
		if (!list.b) {
			return false;
		} else {
			var x = list.a;
			var xs = list.b;
			if (isOkay(x)) {
				return true;
			} else {
				var $temp$list = xs;
				list = $temp$list;
				continue any;
			}
		}
	}
};
var $elm$core$List$any = F2($elm$core$List$any$);
var $elm$core$List$member$ = function (x, xs) {
	return $elm$core$List$any$(
		function (a) {
			return _Utils_eq(a, x);
		},
		xs);
};
var $elm$core$List$member = F2($elm$core$List$member$);
var $elm$core$Basics$not = _Basics_not;
var $elm_explorations$test$Test$Html$Internal$ElmHtml$Helpers$filterKnownKeys = $elm$core$Dict$filter(
	F2(
		function (key, _v0) {
			return !$elm$core$List$member$(key, $elm_explorations$test$Test$Html$Internal$ElmHtml$Constants$knownKeys);
		}));
var $elm$core$Dict$union$ = function (t1, t2) {
	return $elm$core$Dict$foldl$($elm$core$Dict$insert, t2, t1);
};
var $elm$core$Dict$union = F2($elm$core$Dict$union$);
var $elm_explorations$test$Test$Html$Internal$ElmHtml$InternalTypes$decodeOthers = function (otherDecoder) {
	return A2(
		$elm$json$Json$Decode$andThen,
		function (attributes) {
			return A2(
				$elm$json$Json$Decode$map,
				A2(
					$elm$core$Basics$composeR,
					$elm_explorations$test$Test$Html$Internal$ElmHtml$Helpers$filterKnownKeys,
					$elm$core$Dict$union(attributes)),
				$elm_explorations$test$Test$Html$Internal$ElmHtml$InternalTypes$decodeDictFilterMap(otherDecoder));
		},
		$elm_explorations$test$Test$Html$Internal$ElmHtml$InternalTypes$decodeAttributes(otherDecoder));
};
var $elm$json$Json$Decode$string = _Json_decodeString;
var $elm_explorations$test$Test$Html$Internal$ElmHtml$InternalTypes$decodeStyles = $elm$json$Json$Decode$oneOf(
	_List_fromArray(
		[
			A2(
			$elm$json$Json$Decode$field,
			$elm_explorations$test$Test$Html$Internal$ElmHtml$Constants$styleKey,
			$elm$json$Json$Decode$dict($elm$json$Json$Decode$string)),
			$elm$json$Json$Decode$succeed($elm$core$Dict$empty)
		]));
var $elm$json$Json$Decode$map5 = _Json_map5;
var $elm$json$Json$Decode$maybe = function (decoder) {
	return $elm$json$Json$Decode$oneOf(
		_List_fromArray(
			[
				A2($elm$json$Json$Decode$map, $elm$core$Maybe$Just, decoder),
				$elm$json$Json$Decode$succeed($elm$core$Maybe$Nothing)
			]));
};
var $elm_explorations$test$Test$Html$Internal$ElmHtml$InternalTypes$decodeFacts = function (_v0) {
	var taggers = _v0.a;
	var eventDecoder = _v0.b;
	return A6(
		$elm$json$Json$Decode$map5,
		$elm_explorations$test$Test$Html$Internal$ElmHtml$InternalTypes$Facts,
		$elm_explorations$test$Test$Html$Internal$ElmHtml$InternalTypes$decodeStyles,
		$elm_explorations$test$Test$Html$Internal$ElmHtml$InternalTypes$decodeEvents(
			eventDecoder(taggers)),
		$elm$json$Json$Decode$maybe(
			A2($elm$json$Json$Decode$field, $elm_explorations$test$Test$Html$Internal$ElmHtml$Constants$attributeNamespaceKey, $elm$json$Json$Decode$value)),
		$elm_explorations$test$Test$Html$Internal$ElmHtml$InternalTypes$decodeOthers($elm$json$Json$Decode$string),
		$elm_explorations$test$Test$Html$Internal$ElmHtml$InternalTypes$decodeOthers($elm$json$Json$Decode$bool));
};
var $elm_explorations$test$Test$Internal$KernelConstants$kernelConstants = {
	markdown: {markdown: 'b', options: 'a'},
	virtualDom: {descendantsCount: 'b', facts: 'd', kids: 'e', model: 'g', node: 'k', nodeType: '$', nodeTypeCustom: 3, nodeTypeKeyedNode: 2, nodeTypeNode: 1, nodeTypeTagger: 4, nodeTypeText: 0, nodeTypeThunk: 5, refs: 'l', tag: 'c', tagger: 'j', text: 'a'}
};
var $elm_explorations$test$Test$Html$Internal$ElmHtml$InternalTypes$decodeCustomNodeRecord = function (context) {
	return A3(
		$elm$json$Json$Decode$map2,
		$elm_explorations$test$Test$Html$Internal$ElmHtml$InternalTypes$CustomNodeRecord,
		A2(
			$elm$json$Json$Decode$field,
			$elm_explorations$test$Test$Internal$KernelConstants$kernelConstants.virtualDom.facts,
			$elm_explorations$test$Test$Html$Internal$ElmHtml$InternalTypes$decodeFacts(context)),
		A2($elm$json$Json$Decode$field, $elm_explorations$test$Test$Internal$KernelConstants$kernelConstants.virtualDom.model, $elm$json$Json$Decode$value));
};
var $elm_explorations$test$Test$Html$Internal$ElmHtml$InternalTypes$MarkdownNodeRecord$ = function (facts, model) {
	return {facts: facts, model: model};
};
var $elm_explorations$test$Test$Html$Internal$ElmHtml$InternalTypes$MarkdownNodeRecord = F2($elm_explorations$test$Test$Html$Internal$ElmHtml$InternalTypes$MarkdownNodeRecord$);
var $elm_explorations$test$Test$Html$Internal$ElmHtml$Markdown$MarkdownModel$ = function (options, markdown) {
	return {markdown: markdown, options: options};
};
var $elm_explorations$test$Test$Html$Internal$ElmHtml$Markdown$MarkdownModel = F2($elm_explorations$test$Test$Html$Internal$ElmHtml$Markdown$MarkdownModel$);
var $elm_explorations$test$Test$Html$Internal$ElmHtml$Markdown$baseMarkdownModel = {
	markdown: '',
	options: {
		defaultHighlighting: $elm$core$Maybe$Nothing,
		githubFlavored: $elm$core$Maybe$Just(
			{breaks: false, tables: false}),
		sanitize: false,
		smartypants: false
	}
};
var $elm_explorations$test$Test$Html$Internal$ElmHtml$Markdown$decodeMarkdownModel = A2(
	$elm$json$Json$Decode$map,
	$elm_explorations$test$Test$Html$Internal$ElmHtml$Markdown$MarkdownModel($elm_explorations$test$Test$Html$Internal$ElmHtml$Markdown$baseMarkdownModel.options),
	A2($elm$json$Json$Decode$field, $elm_explorations$test$Test$Internal$KernelConstants$kernelConstants.markdown.markdown, $elm$json$Json$Decode$string));
var $elm_explorations$test$Test$Html$Internal$ElmHtml$InternalTypes$decodeMarkdownNodeRecord = function (context) {
	return A3(
		$elm$json$Json$Decode$map2,
		$elm_explorations$test$Test$Html$Internal$ElmHtml$InternalTypes$MarkdownNodeRecord,
		A2(
			$elm$json$Json$Decode$field,
			$elm_explorations$test$Test$Internal$KernelConstants$kernelConstants.virtualDom.facts,
			$elm_explorations$test$Test$Html$Internal$ElmHtml$InternalTypes$decodeFacts(context)),
		A2($elm$json$Json$Decode$field, $elm_explorations$test$Test$Internal$KernelConstants$kernelConstants.virtualDom.model, $elm_explorations$test$Test$Html$Internal$ElmHtml$Markdown$decodeMarkdownModel));
};
var $elm_explorations$test$Test$Html$Internal$ElmHtml$InternalTypes$decodeCustomNode = function (context) {
	return $elm$json$Json$Decode$oneOf(
		_List_fromArray(
			[
				A2(
				$elm$json$Json$Decode$map,
				$elm_explorations$test$Test$Html$Internal$ElmHtml$InternalTypes$MarkdownNode,
				$elm_explorations$test$Test$Html$Internal$ElmHtml$InternalTypes$decodeMarkdownNodeRecord(context)),
				A2(
				$elm$json$Json$Decode$map,
				$elm_explorations$test$Test$Html$Internal$ElmHtml$InternalTypes$CustomNode,
				$elm_explorations$test$Test$Html$Internal$ElmHtml$InternalTypes$decodeCustomNodeRecord(context))
			]));
};
var $elm_explorations$test$Test$Html$Internal$ElmHtml$InternalTypes$decodeTextTag = A2(
	$elm$json$Json$Decode$field,
	$elm_explorations$test$Test$Internal$KernelConstants$kernelConstants.virtualDom.text,
	A2(
		$elm$json$Json$Decode$andThen,
		function (text) {
			return $elm$json$Json$Decode$succeed(
				{text: text});
		},
		$elm$json$Json$Decode$string));
var $elm$json$Json$Decode$fail = _Json_fail;
var $elm$json$Json$Decode$int = _Json_decodeInt;
var $elm$json$Json$Decode$list = _Json_decodeList;
var $elm$json$Json$Decode$map4 = _Json_map4;
var $elm_explorations$test$Test$Html$Internal$ElmHtml$InternalTypes$contextDecodeElmHtml = function (context) {
	return A2(
		$elm$json$Json$Decode$andThen,
		function (nodeType) {
			return _Utils_eq(nodeType, $elm_explorations$test$Test$Internal$KernelConstants$kernelConstants.virtualDom.nodeTypeText) ? A2($elm$json$Json$Decode$map, $elm_explorations$test$Test$Html$Internal$ElmHtml$InternalTypes$TextTag, $elm_explorations$test$Test$Html$Internal$ElmHtml$InternalTypes$decodeTextTag) : (_Utils_eq(nodeType, $elm_explorations$test$Test$Internal$KernelConstants$kernelConstants.virtualDom.nodeTypeKeyedNode) ? A2(
				$elm$json$Json$Decode$map,
				$elm_explorations$test$Test$Html$Internal$ElmHtml$InternalTypes$NodeEntry,
				$elm_explorations$test$Test$Html$Internal$ElmHtml$InternalTypes$decodeKeyedNode(context)) : (_Utils_eq(nodeType, $elm_explorations$test$Test$Internal$KernelConstants$kernelConstants.virtualDom.nodeTypeNode) ? A2(
				$elm$json$Json$Decode$map,
				$elm_explorations$test$Test$Html$Internal$ElmHtml$InternalTypes$NodeEntry,
				$elm_explorations$test$Test$Html$Internal$ElmHtml$InternalTypes$decodeNode(context)) : (_Utils_eq(nodeType, $elm_explorations$test$Test$Internal$KernelConstants$kernelConstants.virtualDom.nodeTypeCustom) ? $elm_explorations$test$Test$Html$Internal$ElmHtml$InternalTypes$decodeCustomNode(context) : (_Utils_eq(nodeType, $elm_explorations$test$Test$Internal$KernelConstants$kernelConstants.virtualDom.nodeTypeTagger) ? $elm_explorations$test$Test$Html$Internal$ElmHtml$InternalTypes$decodeTagger(context) : (_Utils_eq(nodeType, $elm_explorations$test$Test$Internal$KernelConstants$kernelConstants.virtualDom.nodeTypeThunk) ? A2(
				$elm$json$Json$Decode$field,
				$elm_explorations$test$Test$Internal$KernelConstants$kernelConstants.virtualDom.node,
				$elm_explorations$test$Test$Html$Internal$ElmHtml$InternalTypes$contextDecodeElmHtml(context)) : $elm$json$Json$Decode$fail(
				'No such type as ' + $elm$core$String$fromInt(nodeType)))))));
		},
		A2($elm$json$Json$Decode$field, $elm_explorations$test$Test$Internal$KernelConstants$kernelConstants.virtualDom.nodeType, $elm$json$Json$Decode$int));
};
var $elm_explorations$test$Test$Html$Internal$ElmHtml$InternalTypes$decodeKeyedNode = function (context) {
	var decodeSecondNode = A2(
		$elm$json$Json$Decode$field,
		'b',
		$elm_explorations$test$Test$Html$Internal$ElmHtml$InternalTypes$contextDecodeElmHtml(context));
	return A5(
		$elm$json$Json$Decode$map4,
		$elm_explorations$test$Test$Html$Internal$ElmHtml$InternalTypes$NodeRecord,
		A2($elm$json$Json$Decode$field, $elm_explorations$test$Test$Internal$KernelConstants$kernelConstants.virtualDom.tag, $elm$json$Json$Decode$string),
		A2(
			$elm$json$Json$Decode$field,
			$elm_explorations$test$Test$Internal$KernelConstants$kernelConstants.virtualDom.kids,
			$elm$json$Json$Decode$list(decodeSecondNode)),
		A2(
			$elm$json$Json$Decode$field,
			$elm_explorations$test$Test$Internal$KernelConstants$kernelConstants.virtualDom.facts,
			$elm_explorations$test$Test$Html$Internal$ElmHtml$InternalTypes$decodeFacts(context)),
		A2($elm$json$Json$Decode$field, $elm_explorations$test$Test$Internal$KernelConstants$kernelConstants.virtualDom.descendantsCount, $elm$json$Json$Decode$int));
};
var $elm_explorations$test$Test$Html$Internal$ElmHtml$InternalTypes$decodeNode = function (context) {
	return A5(
		$elm$json$Json$Decode$map4,
		$elm_explorations$test$Test$Html$Internal$ElmHtml$InternalTypes$NodeRecord,
		A2($elm$json$Json$Decode$field, $elm_explorations$test$Test$Internal$KernelConstants$kernelConstants.virtualDom.tag, $elm$json$Json$Decode$string),
		A2(
			$elm$json$Json$Decode$field,
			$elm_explorations$test$Test$Internal$KernelConstants$kernelConstants.virtualDom.kids,
			$elm$json$Json$Decode$list(
				$elm_explorations$test$Test$Html$Internal$ElmHtml$InternalTypes$contextDecodeElmHtml(context))),
		A2(
			$elm$json$Json$Decode$field,
			$elm_explorations$test$Test$Internal$KernelConstants$kernelConstants.virtualDom.facts,
			$elm_explorations$test$Test$Html$Internal$ElmHtml$InternalTypes$decodeFacts(context)),
		A2($elm$json$Json$Decode$field, $elm_explorations$test$Test$Internal$KernelConstants$kernelConstants.virtualDom.descendantsCount, $elm$json$Json$Decode$int));
};
var $elm_explorations$test$Test$Html$Internal$ElmHtml$InternalTypes$decodeTagger = function (_v0) {
	var taggers = _v0.a;
	var eventDecoder = _v0.b;
	return A2(
		$elm$json$Json$Decode$andThen,
		function (tagger) {
			var nodeDecoder = $elm_explorations$test$Test$Html$Internal$ElmHtml$InternalTypes$contextDecodeElmHtml(
				$elm_explorations$test$Test$Html$Internal$ElmHtml$InternalTypes$HtmlContext$(
					_Utils_ap(
						taggers,
						_List_fromArray(
							[tagger])),
					eventDecoder));
			return $elm$json$Json$Decode$at$(
				_List_fromArray(
					[$elm_explorations$test$Test$Internal$KernelConstants$kernelConstants.virtualDom.node]),
				nodeDecoder);
		},
		A2($elm$json$Json$Decode$field, $elm_explorations$test$Test$Internal$KernelConstants$kernelConstants.virtualDom.tagger, $elm$json$Json$Decode$value));
};
var $elm_explorations$test$Test$Html$Internal$ElmHtml$InternalTypes$decodeElmHtml = function (eventDecoder) {
	return $elm_explorations$test$Test$Html$Internal$ElmHtml$InternalTypes$contextDecodeElmHtml(
		$elm_explorations$test$Test$Html$Internal$ElmHtml$InternalTypes$HtmlContext$(_List_Nil, eventDecoder));
};
var $elm_explorations$test$Test$Html$Internal$Inert$eventDecoder = function (eventHandler) {
	return _HtmlAsJson_eventHandler(eventHandler);
};
var $elm$virtual_dom$VirtualDom$Custom = function (a) {
	return {$: 'Custom', a: a};
};
var $elm$virtual_dom$VirtualDom$MayPreventDefault = function (a) {
	return {$: 'MayPreventDefault', a: a};
};
var $elm$virtual_dom$VirtualDom$MayStopPropagation = function (a) {
	return {$: 'MayStopPropagation', a: a};
};
var $elm$virtual_dom$VirtualDom$Normal = function (a) {
	return {$: 'Normal', a: a};
};
var $elm$core$Tuple$mapFirst$ = function (func, _v0) {
	var x = _v0.a;
	var y = _v0.b;
	return _Utils_Tuple2(
		func(x),
		y);
};
var $elm$core$Tuple$mapFirst = F2($elm$core$Tuple$mapFirst$);
var $elm_explorations$test$Test$Html$Internal$Inert$mapHandler$ = function (f, handler) {
	switch (handler.$) {
		case 'Normal':
			var decoder = handler.a;
			return $elm$virtual_dom$VirtualDom$Normal(
				A2($elm$json$Json$Decode$map, f, decoder));
		case 'MayStopPropagation':
			var decoder = handler.a;
			return $elm$virtual_dom$VirtualDom$MayStopPropagation(
				A2(
					$elm$json$Json$Decode$map,
					$elm$core$Tuple$mapFirst(f),
					decoder));
		case 'MayPreventDefault':
			var decoder = handler.a;
			return $elm$virtual_dom$VirtualDom$MayPreventDefault(
				A2(
					$elm$json$Json$Decode$map,
					$elm$core$Tuple$mapFirst(f),
					decoder));
		default:
			var decoder = handler.a;
			return $elm$virtual_dom$VirtualDom$Custom(
				A2(
					$elm$json$Json$Decode$map,
					function (value) {
						return {
							message: f(value.message),
							preventDefault: value.preventDefault,
							stopPropagation: value.stopPropagation
						};
					},
					decoder));
	}
};
var $elm_explorations$test$Test$Html$Internal$Inert$mapHandler = F2($elm_explorations$test$Test$Html$Internal$Inert$mapHandler$);
var $elm_explorations$test$Test$Html$Internal$Inert$taggerFunction = function (tagger) {
	return _HtmlAsJson_taggerFunction(tagger);
};
var $elm_explorations$test$Test$Html$Internal$Inert$taggedEventDecoder$ = function (taggers, eventHandler) {
	if (!taggers.b) {
		return $elm_explorations$test$Test$Html$Internal$Inert$eventDecoder(eventHandler);
	} else {
		if (!taggers.b.b) {
			var tagger = taggers.a;
			return $elm_explorations$test$Test$Html$Internal$Inert$mapHandler$(
				$elm_explorations$test$Test$Html$Internal$Inert$taggerFunction(tagger),
				$elm_explorations$test$Test$Html$Internal$Inert$eventDecoder(eventHandler));
		} else {
			var tagger = taggers.a;
			var rest = taggers.b;
			return $elm_explorations$test$Test$Html$Internal$Inert$mapHandler$(
				$elm_explorations$test$Test$Html$Internal$Inert$taggerFunction(tagger),
				$elm_explorations$test$Test$Html$Internal$Inert$taggedEventDecoder$(rest, eventHandler));
		}
	}
};
var $elm_explorations$test$Test$Html$Internal$Inert$taggedEventDecoder = F2($elm_explorations$test$Test$Html$Internal$Inert$taggedEventDecoder$);
var $elm_explorations$test$Test$Html$Internal$Inert$toJson = function (node) {
	return _HtmlAsJson_toJson(node);
};
var $elm_explorations$test$Test$Html$Internal$Inert$fromHtml = function (html) {
	var _v0 = A2(
		$elm$json$Json$Decode$decodeValue,
		$elm_explorations$test$Test$Html$Internal$ElmHtml$InternalTypes$decodeElmHtml($elm_explorations$test$Test$Html$Internal$Inert$taggedEventDecoder),
		$elm_explorations$test$Test$Html$Internal$Inert$toJson(html));
	if (_v0.$ === 'Ok') {
		var elmHtml = _v0.a;
		return $elm$core$Result$Ok(
			$elm_explorations$test$Test$Html$Internal$Inert$Node(elmHtml));
	} else {
		var jsonError = _v0.a;
		return $elm$core$Result$Err(
			$elm$json$Json$Decode$errorToString(jsonError));
	}
};
var $elm_explorations$test$Test$Html$Query$fromHtml = function (html) {
	return $elm_explorations$test$Test$Html$Query$Internal$Single$(
		true,
		function () {
			var _v0 = $elm_explorations$test$Test$Html$Internal$Inert$fromHtml(html);
			if (_v0.$ === 'Ok') {
				var node = _v0.a;
				return $elm_explorations$test$Test$Html$Query$Internal$Query$(node, _List_Nil);
			} else {
				var message = _v0.a;
				return $elm_explorations$test$Test$Html$Query$Internal$InternalError(message);
			}
		}());
};
var $lamdera$containers$SeqDict$shiftStep = 5;
var $lamdera$containers$SeqDict$bitMask = 4294967295 >>> (32 - $lamdera$containers$SeqDict$shiftStep);
var $lamdera$containers$SeqDict$compressedIndex$ = function (index, bitmap) {
	var relevantBits = (bitmap << (31 - index)) << 1;
	var b1 = relevantBits - ((relevantBits >>> 1) & 1431655765);
	var b2 = (b1 & 858993459) + ((b1 >>> 2) & 858993459);
	return (((b2 + (b2 >>> 4)) & 252645135) * 16843009) >>> 24;
};
var $lamdera$containers$SeqDict$compressedIndex = F2($lamdera$containers$SeqDict$compressedIndex$);
var $lamdera$containers$SeqDict$listFind$ = function (predicate, list) {
	listFind:
	while (true) {
		if (!list.b) {
			return $elm$core$Maybe$Nothing;
		} else {
			var first = list.a;
			var rest = list.b;
			if (predicate(first)) {
				return $elm$core$Maybe$Just(first);
			} else {
				var $temp$list = rest;
				list = $temp$list;
				continue listFind;
			}
		}
	}
};
var $lamdera$containers$SeqDict$listFind = F2($lamdera$containers$SeqDict$listFind$);
var $lamdera$containers$JsArray2$unsafeGet = _JsArray2_unsafeGet;
var $lamdera$containers$SeqDict$getHelp$ = function (shift, hash, key, bitmap, nodes) {
	getHelp:
	while (true) {
		var index = $lamdera$containers$SeqDict$bitMask & (hash >>> shift);
		var mask = 1 << index;
		if (_Utils_eq(bitmap & mask, mask)) {
			var _v0 = A2(
				$lamdera$containers$JsArray2$unsafeGet,
				$lamdera$containers$SeqDict$compressedIndex$(index, bitmap),
				nodes);
			switch (_v0.$) {
				case 'Leaf':
					var eIdx = _v0.b;
					var eKey = _v0.c;
					var eVal = _v0.d;
					return _Utils_eq(key, eKey) ? $elm$core$Maybe$Just(eVal) : $elm$core$Maybe$Nothing;
				case 'SubTree':
					var subBitmap = _v0.a;
					var subNodes = _v0.b;
					var $temp$shift = shift + $lamdera$containers$SeqDict$shiftStep,
						$temp$bitmap = subBitmap,
						$temp$nodes = subNodes;
					shift = $temp$shift;
					bitmap = $temp$bitmap;
					nodes = $temp$nodes;
					continue getHelp;
				default:
					var vals = _v0.b;
					var _v1 = $lamdera$containers$SeqDict$listFind$(
						function (_v2) {
							var k = _v2.b;
							return _Utils_eq(k, key);
						},
						vals);
					if (_v1.$ === 'Just') {
						var _v3 = _v1.a;
						var val = _v3.c;
						return $elm$core$Maybe$Just(val);
					} else {
						return $elm$core$Maybe$Nothing;
					}
			}
		} else {
			return $elm$core$Maybe$Nothing;
		}
	}
};
var $lamdera$containers$SeqDict$getHelp = F5($lamdera$containers$SeqDict$getHelp$);
var $lamdera$containers$SeqDict$intDictFoldr$ = function (func, baseCase, dict) {
	return $elm$core$Array$foldr$(
		F2(
			function (maybe, acc) {
				if (maybe.$ === 'Just') {
					var a = maybe.a;
					return A2(func, a, acc);
				} else {
					return acc;
				}
			}),
		baseCase,
		dict.array);
};
var $lamdera$containers$SeqDict$intDictFoldr = F3($lamdera$containers$SeqDict$intDictFoldr$);
var $lamdera$containers$SeqDict$toList = function (_v0) {
	var triplets = _v0.c;
	var helper = F2(
		function (_v1, acc) {
			var key = _v1.b;
			var value = _v1.c;
			return A2(
				$elm$core$List$cons,
				_Utils_Tuple2(key, value),
				acc);
		});
	return $lamdera$containers$SeqDict$intDictFoldr$(helper, _List_Nil, triplets);
};
var $lamdera$containers$SeqDict$keys = function (_v0) {
	var triplets = _v0.c;
	var helper = F2(
		function (_v1, acc) {
			var key = _v1.b;
			return A2($elm$core$List$cons, key, acc);
		});
	return $lamdera$containers$SeqDict$intDictFoldr$(helper, _List_Nil, triplets);
};
var $lamdera$containers$SeqSet$toList = function (_v0) {
	var dict = _v0.a;
	return $lamdera$containers$SeqDict$keys(dict);
};
var $lamdera$containers$FNV$hash = _FNV_hash;
var $lamdera$containers$SeqDict$get$ = function (key, _v0) {
	var bitmap = _v0.a;
	var nodes = _v0.b;
	return $lamdera$containers$SeqDict$getHelp$(
		0,
		$lamdera$containers$FNV$hash(key),
		key,
		bitmap,
		nodes);
};
var $lamdera$containers$SeqDict$get = F2($lamdera$containers$SeqDict$get$);
var $lamdera$program_test$Effect$Test$FrontendUpdateEvent$ = function (a, b, c) {
	return {$: 'FrontendUpdateEvent', a: a, b: b, c: c};
};
var $lamdera$program_test$Effect$Test$FrontendUpdateEvent = F3($lamdera$program_test$Effect$Test$FrontendUpdateEvent$);
var $ianmackenzie$elm_units$Quantity$Quantity = function (a) {
	return {$: 'Quantity', a: a};
};
var $ianmackenzie$elm_units$Duration$seconds = function (numSeconds) {
	return $ianmackenzie$elm_units$Quantity$Quantity(numSeconds);
};
var $lamdera$program_test$Effect$Test$animationFrame = $ianmackenzie$elm_units$Duration$seconds(1 / 60);
var $mgold$elm_nonempty_list$List$Nonempty$Nonempty$ = function (a, b) {
	return {$: 'Nonempty', a: a, b: b};
};
var $mgold$elm_nonempty_list$List$Nonempty$Nonempty = F2($mgold$elm_nonempty_list$List$Nonempty$Nonempty$);
var $mgold$elm_nonempty_list$List$Nonempty$append$ = function (_v0, _v1) {
	var x = _v0.a;
	var xs = _v0.b;
	var y = _v1.a;
	var ys = _v1.b;
	return $mgold$elm_nonempty_list$List$Nonempty$Nonempty$(
		x,
		_Utils_ap(
			xs,
			A2($elm$core$List$cons, y, ys)));
};
var $mgold$elm_nonempty_list$List$Nonempty$append = F2($mgold$elm_nonempty_list$List$Nonempty$append$);
var $lamdera$containers$JsArray2$empty = _JsArray2_empty;
var $lamdera$containers$SeqDict$intDictEmpty = {array: $elm$core$Array$empty, size: 0};
var $lamdera$containers$SeqDict$empty = $lamdera$containers$SeqDict$SeqDict_elm_builtin$(0, $lamdera$containers$JsArray2$empty, $lamdera$containers$SeqDict$intDictEmpty);
var $elm$core$Elm$JsArray$foldl = _JsArray_foldl;
var $elm$core$Array$foldl$ = function (func, baseCase, _v0) {
	var tree = _v0.c;
	var tail = _v0.d;
	var helper = F2(
		function (node, acc) {
			if (node.$ === 'SubTree') {
				var subTree = node.a;
				return A3($elm$core$Elm$JsArray$foldl, helper, acc, subTree);
			} else {
				var values = node.a;
				return A3($elm$core$Elm$JsArray$foldl, func, acc, values);
			}
		});
	return A3(
		$elm$core$Elm$JsArray$foldl,
		func,
		A3($elm$core$Elm$JsArray$foldl, helper, baseCase, tree),
		tail);
};
var $elm$core$Array$foldl = F3($elm$core$Array$foldl$);
var $lamdera$containers$SeqDict$intDictFoldl$ = function (func, baseCase, dict) {
	return $elm$core$Array$foldl$(
		F2(
			function (maybe, acc) {
				if (maybe.$ === 'Just') {
					var a = maybe.a;
					return A2(func, a, acc);
				} else {
					return acc;
				}
			}),
		baseCase,
		dict.array);
};
var $lamdera$containers$SeqDict$intDictFoldl = F3($lamdera$containers$SeqDict$intDictFoldl$);
var $lamdera$containers$SeqDict$foldl$ = function (fn, acc, _v0) {
	var triplets = _v0.c;
	var helper = F2(
		function (_v1, acc2) {
			var key = _v1.b;
			var value = _v1.c;
			return A3(fn, key, value, acc2);
		});
	return $lamdera$containers$SeqDict$intDictFoldl$(helper, acc, triplets);
};
var $lamdera$containers$SeqDict$foldl = F3($lamdera$containers$SeqDict$foldl$);
var $mgold$elm_nonempty_list$List$Nonempty$singleton = function (x) {
	return $mgold$elm_nonempty_list$List$Nonempty$Nonempty$(x, _List_Nil);
};
var $elm$core$List$filter$ = function (isGood, list) {
	return $elm$core$List$foldr$(
		F2(
			function (x, xs) {
				return isGood(x) ? A2($elm$core$List$cons, x, xs) : xs;
			}),
		_List_Nil,
		list);
};
var $elm$core$List$filter = F2($elm$core$List$filter$);
var $lamdera$containers$SeqDict$intDictPush$ = function (hash, key, value, dict) {
	return {
		array: $elm$core$Array$push$(
			$elm$core$Maybe$Just(
				_Utils_Tuple3(hash, key, value)),
			dict.array),
		size: dict.size + 1
	};
};
var $lamdera$containers$SeqDict$intDictPush = F4($lamdera$containers$SeqDict$intDictPush$);
var $elm$core$Array$setHelp$ = function (shift, index, value, tree) {
	var pos = $elm$core$Array$bitMask & (index >>> shift);
	var _v0 = A2($elm$core$Elm$JsArray$unsafeGet, pos, tree);
	if (_v0.$ === 'SubTree') {
		var subTree = _v0.a;
		var newSub = $elm$core$Array$setHelp$(shift - $elm$core$Array$shiftStep, index, value, subTree);
		return A3(
			$elm$core$Elm$JsArray$unsafeSet,
			pos,
			$elm$core$Array$SubTree(newSub),
			tree);
	} else {
		var values = _v0.a;
		var newLeaf = A3($elm$core$Elm$JsArray$unsafeSet, $elm$core$Array$bitMask & index, value, values);
		return A3(
			$elm$core$Elm$JsArray$unsafeSet,
			pos,
			$elm$core$Array$Leaf(newLeaf),
			tree);
	}
};
var $elm$core$Array$setHelp = F4($elm$core$Array$setHelp$);
var $elm$core$Array$tailIndex = function (len) {
	return (len >>> 5) << 5;
};
var $elm$core$Array$set$ = function (index, value, array) {
	var len = array.a;
	var startShift = array.b;
	var tree = array.c;
	var tail = array.d;
	return ((index < 0) || (_Utils_cmp(index, len) > -1)) ? array : ((_Utils_cmp(
		index,
		$elm$core$Array$tailIndex(len)) > -1) ? $elm$core$Array$Array_elm_builtin$(
		len,
		startShift,
		tree,
		A3($elm$core$Elm$JsArray$unsafeSet, $elm$core$Array$bitMask & index, value, tail)) : $elm$core$Array$Array_elm_builtin$(
		len,
		startShift,
		$elm$core$Array$setHelp$(startShift, index, value, tree),
		tail));
};
var $elm$core$Array$set = F3($elm$core$Array$set$);
var $lamdera$containers$SeqDict$intDictSet$ = function (index, hash, key, value, dict) {
	return {
		array: $elm$core$Array$set$(
			index,
			$elm$core$Maybe$Just(
				_Utils_Tuple3(hash, key, value)),
			dict.array),
		size: dict.size
	};
};
var $lamdera$containers$SeqDict$intDictSet = F5($lamdera$containers$SeqDict$intDictSet$);
var $elm$core$Array$length = function (_v0) {
	var len = _v0.a;
	return len;
};
var $elm$core$Bitwise$or = _Bitwise_or;
var $lamdera$containers$JsArray2$singleton = _JsArray2_singleton;
var $lamdera$containers$JsArray2$unsafeInsert = _JsArray2_unsafeInsert;
var $lamdera$containers$JsArray2$unsafeSet = _JsArray2_unsafeSet;
var $lamdera$containers$SeqDict$insertHelp$ = function (shift, hash, key, value, bitmap, nodes, triplets) {
	var uncompressedIdx = $lamdera$containers$SeqDict$bitMask & (hash >>> shift);
	var newShift = shift + $lamdera$containers$SeqDict$shiftStep;
	var mask = 1 << uncompressedIdx;
	var hasValue = _Utils_eq(bitmap & mask, mask);
	var comIdx = $lamdera$containers$SeqDict$compressedIndex$(uncompressedIdx, bitmap);
	if (hasValue) {
		var _v0 = A2($lamdera$containers$JsArray2$unsafeGet, comIdx, nodes);
		switch (_v0.$) {
			case 'Leaf':
				var node = _v0;
				var xHash = node.a;
				var xIdx = node.b;
				var xKey = node.c;
				var xVal = node.d;
				if (_Utils_eq(xHash, hash)) {
					if (_Utils_eq(xKey, key)) {
						return $lamdera$containers$SeqDict$SeqDict_elm_builtin$(
							bitmap,
							A3(
								$lamdera$containers$JsArray2$unsafeSet,
								comIdx,
								$lamdera$containers$SeqDict$Leaf$(xHash, xIdx, xKey, value),
								nodes),
							$lamdera$containers$SeqDict$intDictSet$(xIdx, hash, key, value, triplets));
					} else {
						var element = $lamdera$containers$SeqDict$Collision$(
							hash,
							_List_fromArray(
								[
									_Utils_Tuple3(
									$elm$core$Array$length(triplets.array),
									key,
									value),
									_Utils_Tuple3(xIdx, xKey, xVal)
								]));
						return $lamdera$containers$SeqDict$SeqDict_elm_builtin$(
							bitmap,
							A3($lamdera$containers$JsArray2$unsafeSet, comIdx, element, nodes),
							$lamdera$containers$SeqDict$intDictPush$(hash, key, value, triplets));
					}
				} else {
					var subIdx = $lamdera$containers$SeqDict$bitMask & (xHash >>> newShift);
					var _v1 = $lamdera$containers$SeqDict$insertHelp$(
						newShift,
						hash,
						key,
						value,
						1 << subIdx,
						$lamdera$containers$JsArray2$singleton(node),
						triplets);
					var secondBitmap = _v1.a;
					var secondNodes = _v1.b;
					var newTriplets = _v1.c;
					var subTree = $lamdera$containers$SeqDict$SubTree$(secondBitmap, secondNodes);
					return $lamdera$containers$SeqDict$SeqDict_elm_builtin$(
						bitmap,
						A3($lamdera$containers$JsArray2$unsafeSet, comIdx, subTree, nodes),
						newTriplets);
				}
			case 'SubTree':
				var subBitmap = _v0.a;
				var subNodes = _v0.b;
				var _v2 = $lamdera$containers$SeqDict$insertHelp$(newShift, hash, key, value, subBitmap, subNodes, triplets);
				var newSubBitmap = _v2.a;
				var newSubNodes = _v2.b;
				var newTriplets = _v2.c;
				var newSub = $lamdera$containers$SeqDict$SubTree$(newSubBitmap, newSubNodes);
				return $lamdera$containers$SeqDict$SeqDict_elm_builtin$(
					bitmap,
					A3($lamdera$containers$JsArray2$unsafeSet, comIdx, newSub, nodes),
					newTriplets);
			default:
				var currValue = _v0;
				var xHash = currValue.a;
				var pairs = currValue.b;
				if (_Utils_eq(xHash, hash)) {
					var keyFinder = function (_v5) {
						var k = _v5.b;
						return _Utils_eq(k, key);
					};
					var _v3 = $lamdera$containers$SeqDict$listFind$(keyFinder, pairs);
					if (_v3.$ === 'Just') {
						var _v4 = _v3.a;
						var existingIdx = _v4.a;
						var whenRemoved = $elm$core$List$filter$(keyFinder, pairs);
						var updated = A2(
							$elm$core$List$cons,
							_Utils_Tuple3(existingIdx, key, value),
							whenRemoved);
						return $lamdera$containers$SeqDict$SeqDict_elm_builtin$(
							bitmap,
							A3(
								$lamdera$containers$JsArray2$unsafeSet,
								comIdx,
								$lamdera$containers$SeqDict$Collision$(xHash, updated),
								nodes),
							$lamdera$containers$SeqDict$intDictSet$(existingIdx, hash, key, value, triplets));
					} else {
						var updated = A2(
							$elm$core$List$cons,
							_Utils_Tuple3(
								$elm$core$Array$length(triplets.array),
								key,
								value),
							pairs);
						return $lamdera$containers$SeqDict$SeqDict_elm_builtin$(
							bitmap,
							A3(
								$lamdera$containers$JsArray2$unsafeSet,
								comIdx,
								$lamdera$containers$SeqDict$Collision$(xHash, updated),
								nodes),
							$lamdera$containers$SeqDict$intDictPush$(hash, key, value, triplets));
					}
				} else {
					var subIdx = $lamdera$containers$SeqDict$bitMask & (xHash >>> newShift);
					var _v6 = $lamdera$containers$SeqDict$insertHelp$(
						newShift,
						hash,
						key,
						value,
						1 << subIdx,
						$lamdera$containers$JsArray2$singleton(currValue),
						triplets);
					var secondBitmap = _v6.a;
					var secondNodes = _v6.b;
					var newTriplets = _v6.c;
					var subTree = $lamdera$containers$SeqDict$SubTree$(secondBitmap, secondNodes);
					return $lamdera$containers$SeqDict$SeqDict_elm_builtin$(
						bitmap,
						A3($lamdera$containers$JsArray2$unsafeSet, comIdx, subTree, nodes),
						newTriplets);
				}
		}
	} else {
		return $lamdera$containers$SeqDict$SeqDict_elm_builtin$(
			bitmap | mask,
			A3(
				$lamdera$containers$JsArray2$unsafeInsert,
				comIdx,
				$lamdera$containers$SeqDict$Leaf$(
					hash,
					$elm$core$Array$length(triplets.array),
					key,
					value),
				nodes),
			$lamdera$containers$SeqDict$intDictPush$(hash, key, value, triplets));
	}
};
var $lamdera$containers$SeqDict$insertHelp = F7($lamdera$containers$SeqDict$insertHelp$);
var $lamdera$containers$SeqDict$insert$ = function (key, value, _v0) {
	var bitmap = _v0.a;
	var nodes = _v0.b;
	var triplets = _v0.c;
	return $lamdera$containers$SeqDict$insertHelp$(
		0,
		$lamdera$containers$FNV$hash(key),
		key,
		value,
		bitmap,
		nodes,
		triplets);
};
var $lamdera$containers$SeqDict$insert = F3($lamdera$containers$SeqDict$insert$);
var $lamdera$containers$SeqDict$singleton$ = function (key, val) {
	return $lamdera$containers$SeqDict$insert$(key, val, $lamdera$containers$SeqDict$empty);
};
var $lamdera$containers$SeqDict$singleton = F2($lamdera$containers$SeqDict$singleton$);
var $lamdera$containers$SeqDict$rebuildOnOverflow = function (dict) {
	var rootTriplets = dict.c;
	if ((rootTriplets.size / $elm$core$Array$length(rootTriplets.array)) < 0.8) {
		var helper = F2(
			function (_v0, _v1) {
				var hash = _v0.a;
				var key = _v0.b;
				var value = _v0.c;
				var bitmap = _v1.a;
				var nodes = _v1.b;
				var triplets = _v1.c;
				return $lamdera$containers$SeqDict$insertHelp$(0, hash, key, value, bitmap, nodes, triplets);
			});
		return $lamdera$containers$SeqDict$intDictFoldl$(helper, $lamdera$containers$SeqDict$empty, rootTriplets);
	} else {
		return dict;
	}
};
var $lamdera$containers$SeqDict$intDictRemove$ = function (index, dict) {
	return {
		array: $elm$core$Array$set$(index, $elm$core$Maybe$Nothing, dict.array),
		size: dict.size - 1
	};
};
var $lamdera$containers$SeqDict$intDictRemove = F2($lamdera$containers$SeqDict$intDictRemove$);
var $elm$core$Basics$neq = _Utils_notEqual;
var $lamdera$containers$JsArray2$removeIndex = _JsArray2_removeIndex;
var $elm$core$Bitwise$xor = _Bitwise_xor;
var $lamdera$containers$SeqDict$removeHelp$ = function (shift, hash, key, bitmap, nodes, triplets) {
	var uncompIdx = $lamdera$containers$SeqDict$bitMask & (hash >>> shift);
	var mask = 1 << uncompIdx;
	var hasValue = _Utils_eq(bitmap & mask, mask);
	var compIdx = $lamdera$containers$SeqDict$compressedIndex$(uncompIdx, bitmap);
	if (hasValue) {
		var _v0 = A2($lamdera$containers$JsArray2$unsafeGet, compIdx, nodes);
		switch (_v0.$) {
			case 'Leaf':
				var eIdx = _v0.b;
				var eKey = _v0.c;
				var eVal = _v0.d;
				return _Utils_eq(eKey, key) ? $lamdera$containers$SeqDict$SeqDict_elm_builtin$(
					bitmap ^ mask,
					A2($lamdera$containers$JsArray2$removeIndex, compIdx, nodes),
					$lamdera$containers$SeqDict$intDictRemove$(eIdx, triplets)) : $lamdera$containers$SeqDict$SeqDict_elm_builtin$(bitmap, nodes, triplets);
			case 'SubTree':
				var subBitmap = _v0.a;
				var subNodes = _v0.b;
				var _v1 = $lamdera$containers$SeqDict$removeHelp$(shift + $lamdera$containers$SeqDict$shiftStep, hash, key, subBitmap, subNodes, triplets);
				var newSubBitmap = _v1.a;
				var newSubNodes = _v1.b;
				var newTriplets = _v1.c;
				return (!newSubBitmap) ? $lamdera$containers$SeqDict$SeqDict_elm_builtin$(
					bitmap ^ mask,
					A2($lamdera$containers$JsArray2$removeIndex, compIdx, nodes),
					newTriplets) : $lamdera$containers$SeqDict$SeqDict_elm_builtin$(
					bitmap,
					A3(
						$lamdera$containers$JsArray2$unsafeSet,
						compIdx,
						$lamdera$containers$SeqDict$SubTree$(newSubBitmap, newSubNodes),
						nodes),
					newTriplets);
			default:
				var vals = _v0.b;
				var maybeIdx = $elm$core$Maybe$map$(
					function (_v8) {
						var idx = _v8.a;
						return idx;
					},
					$lamdera$containers$SeqDict$listFind$(
						function (_v7) {
							var k = _v7.b;
							return _Utils_eq(k, key);
						},
						vals));
				var newCollision = function () {
					if (maybeIdx.$ === 'Just') {
						var removeIdx = maybeIdx.a;
						return $elm$core$List$filter$(
							function (_v6) {
								var k = _v6.b;
								return !_Utils_eq(k, key);
							},
							vals);
					} else {
						return vals;
					}
				}();
				var newTriplets = function () {
					if (maybeIdx.$ === 'Just') {
						var removeIdx = maybeIdx.a;
						return $lamdera$containers$SeqDict$intDictRemove$(removeIdx, triplets);
					} else {
						return triplets;
					}
				}();
				if (!newCollision.b) {
					return $lamdera$containers$SeqDict$SeqDict_elm_builtin$(
						bitmap ^ mask,
						A2($lamdera$containers$JsArray2$removeIndex, compIdx, nodes),
						newTriplets);
				} else {
					if (!newCollision.b.b) {
						var _v3 = newCollision.a;
						var eIdx = _v3.a;
						var eKey = _v3.b;
						var eVal = _v3.c;
						return $lamdera$containers$SeqDict$SeqDict_elm_builtin$(
							bitmap,
							A3(
								$lamdera$containers$JsArray2$unsafeSet,
								compIdx,
								$lamdera$containers$SeqDict$Leaf$(hash, eIdx, eKey, eVal),
								nodes),
							newTriplets);
					} else {
						return $lamdera$containers$SeqDict$SeqDict_elm_builtin$(
							bitmap,
							A3(
								$lamdera$containers$JsArray2$unsafeSet,
								compIdx,
								$lamdera$containers$SeqDict$Collision$(hash, newCollision),
								nodes),
							newTriplets);
					}
				}
		}
	} else {
		return $lamdera$containers$SeqDict$SeqDict_elm_builtin$(bitmap, nodes, triplets);
	}
};
var $lamdera$containers$SeqDict$removeHelp = F6($lamdera$containers$SeqDict$removeHelp$);
var $lamdera$containers$SeqDict$update$ = function (key, fn, dict) {
	var bitmap = dict.a;
	var nodes = dict.b;
	var triplets = dict.c;
	var hash = $lamdera$containers$FNV$hash(key);
	var _v0 = fn(
		$lamdera$containers$SeqDict$getHelp$(0, hash, key, bitmap, nodes));
	if (_v0.$ === 'Nothing') {
		var _v1 = $lamdera$containers$SeqDict$rebuildOnOverflow(dict);
		var bitmap2 = _v1.a;
		var nodes2 = _v1.b;
		var triplets2 = _v1.c;
		return $lamdera$containers$SeqDict$removeHelp$(0, hash, key, bitmap2, nodes2, triplets2);
	} else {
		var value = _v0.a;
		return $lamdera$containers$SeqDict$insertHelp$(0, hash, key, value, bitmap, nodes, triplets);
	}
};
var $lamdera$containers$SeqDict$update = F3($lamdera$containers$SeqDict$update$);
var $lamdera$program_test$Effect$Test$getTimers = function (backendSub) {
	switch (backendSub.$) {
		case 'SubBatch':
			var batch = backendSub.a;
			return $elm$core$List$foldl$(
				F2(
					function (sub, dict) {
						return $lamdera$containers$SeqDict$foldl$(
							F3(
								function (duration, value, dict2) {
									return $lamdera$containers$SeqDict$update$(
										duration,
										function (maybe) {
											return $elm$core$Maybe$Just(
												function () {
													if (maybe.$ === 'Just') {
														var data = maybe.a;
														return {
															msg: $mgold$elm_nonempty_list$List$Nonempty$append$(value.msg, data.msg)
														};
													} else {
														return value;
													}
												}());
										},
										dict2);
								}),
							dict,
							$lamdera$program_test$Effect$Test$getTimers(sub));
					}),
				$lamdera$containers$SeqDict$empty,
				batch);
		case 'TimeEvery':
			var duration = backendSub.a;
			var msg = backendSub.b;
			return $lamdera$containers$SeqDict$singleton$(
				duration,
				{
					msg: $mgold$elm_nonempty_list$List$Nonempty$singleton(msg)
				});
		case 'OnAnimationFrame':
			var msg = backendSub.a;
			return $lamdera$containers$SeqDict$singleton$(
				$lamdera$program_test$Effect$Test$animationFrame,
				{
					msg: $mgold$elm_nonempty_list$List$Nonempty$singleton(msg)
				});
		case 'OnAnimationFrameDelta':
			var msg = backendSub.a;
			return $lamdera$containers$SeqDict$singleton$(
				$lamdera$program_test$Effect$Test$animationFrame,
				{
					msg: $mgold$elm_nonempty_list$List$Nonempty$singleton(
						function (_v2) {
							return msg($lamdera$program_test$Effect$Test$animationFrame);
						})
				});
		default:
			return $lamdera$containers$SeqDict$empty;
	}
};
var $lamdera$containers$SeqDict$merge$ = function (leftStep, bothStep, rightStep, _v0, rightDict, initialResult) {
	var leftIntDict = _v0.c;
	var helper2 = F2(
		function (_v6, acc) {
			var key = _v6.b;
			var value = _v6.c;
			return A3(rightStep, key, value, acc);
		});
	var helper = F2(
		function (_v4, _v5) {
			var hash = _v4.a;
			var key = _v4.b;
			var value = _v4.c;
			var acc = _v5.a;
			var rightDict2 = _v5.b;
			var rightBitmap = rightDict2.a;
			var rightNodeArray = rightDict2.b;
			var rightIntDict = rightDict2.c;
			var _v3 = $lamdera$containers$SeqDict$getHelp$(0, hash, key, rightBitmap, rightNodeArray);
			if (_v3.$ === 'Just') {
				var value2 = _v3.a;
				return _Utils_Tuple2(
					A4(bothStep, key, value, value2, acc),
					$lamdera$containers$SeqDict$removeHelp$(0, hash, key, rightBitmap, rightNodeArray, rightIntDict));
			} else {
				return _Utils_Tuple2(
					A3(leftStep, key, value, acc),
					rightDict2);
			}
		});
	var _v1 = $lamdera$containers$SeqDict$intDictFoldl$(
		helper,
		_Utils_Tuple2(initialResult, rightDict),
		leftIntDict);
	var acc2 = _v1.a;
	var _v2 = _v1.b;
	var rightIntDict2 = _v2.c;
	return $lamdera$containers$SeqDict$intDictFoldl$(helper2, acc2, rightIntDict2);
};
var $lamdera$containers$SeqDict$merge = F6($lamdera$containers$SeqDict$merge$);
var $lamdera$containers$SeqDict$remove$ = function (key, dict) {
	var _v0 = $lamdera$containers$SeqDict$rebuildOnOverflow(dict);
	var bitmap = _v0.a;
	var nodes = _v0.b;
	var triplets = _v0.c;
	return $lamdera$containers$SeqDict$removeHelp$(
		0,
		$lamdera$containers$FNV$hash(key),
		key,
		bitmap,
		nodes,
		triplets);
};
var $lamdera$containers$SeqDict$remove = F2($lamdera$containers$SeqDict$remove$);
var $lamdera$program_test$Effect$Test$handleFrontendUpdate$ = function (clientId, currentTime2, msg, state) {
	var _v0 = $lamdera$containers$SeqDict$get$(clientId, state.frontends);
	if (_v0.$ === 'Just') {
		var frontend = _v0.a;
		var _v1 = A2(state.frontendApp.update, msg, frontend.model);
		var newModel = _v1.a;
		var cmd = _v1.b;
		var subscriptions = state.frontendApp.subscriptions(newModel);
		var newTimers = $lamdera$program_test$Effect$Test$getTimers(subscriptions);
		return $lamdera$program_test$Effect$Test$addEvent$(
			$lamdera$program_test$Effect$Test$FrontendUpdateEvent$(clientId, msg, cmd),
			$elm$core$Maybe$Nothing,
			_Utils_update(
				state,
				{
					frontends: $lamdera$containers$SeqDict$insert$(
						clientId,
						_Utils_update(
							frontend,
							{
								model: newModel,
								pendingEffects: $elm$core$Array$push$(
									{
										cmds: cmd,
										stepIndex: $elm$core$Array$length(state.history)
									},
									frontend.pendingEffects),
								timers: $lamdera$containers$SeqDict$merge$(
									F3(
										function (duration, _v2, dict) {
											return $lamdera$containers$SeqDict$insert$(
												duration,
												{startTime: currentTime2},
												dict);
										}),
									F4(
										function (_v3, _v4, _v5, dict) {
											return dict;
										}),
									F3(
										function (duration, _v6, dict) {
											return $lamdera$containers$SeqDict$remove$(duration, dict);
										}),
									newTimers,
									frontend.timers,
									frontend.timers)
							}),
						state.frontends)
				}));
	} else {
		return state;
	}
};
var $lamdera$program_test$Effect$Test$handleFrontendUpdate = F4($lamdera$program_test$Effect$Test$handleFrontendUpdate$);
var $elm_explorations$test$Test$Html$Selector$Internal$Attribute = function (a) {
	return {$: 'Attribute', a: a};
};
var $elm_explorations$test$Test$Html$Selector$Internal$namedAttr$ = function (name, value) {
	return $elm_explorations$test$Test$Html$Selector$Internal$Attribute(
		{name: name, value: value});
};
var $elm_explorations$test$Test$Html$Selector$Internal$namedAttr = F2($elm_explorations$test$Test$Html$Selector$Internal$namedAttr$);
var $elm_explorations$test$Test$Html$Selector$id = $elm_explorations$test$Test$Html$Selector$Internal$namedAttr('id');
var $lamdera$program_test$Effect$Browser$Dom$idToString = function (_v0) {
	var htmlId = _v0.a;
	return htmlId;
};
var $ianmackenzie$elm_units$Duration$milliseconds = function (numMilliseconds) {
	return $ianmackenzie$elm_units$Duration$seconds(0.001 * numMilliseconds);
};
var $elm_explorations$test$Test$Html$Event$Event$ = function (a, b) {
	return {$: 'Event', a: a, b: b};
};
var $elm_explorations$test$Test$Html$Event$Event = F2($elm_explorations$test$Test$Html$Event$Event$);
var $elm_explorations$test$Test$Html$Event$simulate = $elm_explorations$test$Test$Html$Event$Event;
var $elm$core$String$startsWith = _String_startsWith;
var $elm$core$String$toInt = _String_toInt;
var $elm$core$Result$andThen$ = function (callback, result) {
	if (result.$ === 'Ok') {
		var value = result.a;
		return callback(value);
	} else {
		var msg = result.a;
		return $elm$core$Result$Err(msg);
	}
};
var $elm$core$Result$andThen = F2($elm$core$Result$andThen$);
var $elm_explorations$test$Test$Html$Event$eventPayload = function (_v0) {
	var _v1 = _v0.a;
	var payload = _v1.b;
	return payload;
};
var $elm_explorations$test$Test$Html$Event$Handling$ = function (message, stopPropagation, preventDefault) {
	return {message: message, preventDefault: preventDefault, stopPropagation: stopPropagation};
};
var $elm_explorations$test$Test$Html$Event$Handling = F3($elm_explorations$test$Test$Html$Event$Handling$);
var $elm$core$Result$fromMaybe$ = function (err, maybe) {
	if (maybe.$ === 'Just') {
		var v = maybe.a;
		return $elm$core$Result$Ok(v);
	} else {
		return $elm$core$Result$Err(err);
	}
};
var $elm$core$Result$fromMaybe = F2($elm$core$Result$fromMaybe$);
var $elm$core$Dict$get$ = function (targetKey, dict) {
	get:
	while (true) {
		if (dict.$ === 'RBEmpty_elm_builtin') {
			return $elm$core$Maybe$Nothing;
		} else {
			var key = dict.b;
			var value = dict.c;
			var left = dict.d;
			var right = dict.e;
			var _v1 = A2($elm$core$Basics$compare, targetKey, key);
			switch (_v1.$) {
				case 'LT':
					var $temp$dict = left;
					dict = $temp$dict;
					continue get;
				case 'EQ':
					return $elm$core$Maybe$Just(value);
				default:
					var $temp$dict = right;
					dict = $temp$dict;
					continue get;
			}
		}
	}
};
var $elm$core$Dict$get = F2($elm$core$Dict$get$);
var $elm$core$List$append$ = function (xs, ys) {
	if (!ys.b) {
		return xs;
	} else {
		return $elm$core$List$foldr$($elm$core$List$cons, ys, xs);
	}
};
var $elm$core$List$append = F2($elm$core$List$append$);
var $elm$core$List$concat = function (lists) {
	return $elm$core$List$foldr$($elm$core$List$append, _List_Nil, lists);
};
var $elm$core$Bitwise$shiftRightBy = _Bitwise_shiftRightBy;
var $elm$core$String$repeatHelp$ = function (n, chunk, result) {
	return (n <= 0) ? result : $elm$core$String$repeatHelp$(
		n >> 1,
		_Utils_ap(chunk, chunk),
		(!(n & 1)) ? result : _Utils_ap(result, chunk));
};
var $elm$core$String$repeatHelp = F3($elm$core$String$repeatHelp$);
var $elm$core$String$repeat$ = function (n, chunk) {
	return $elm$core$String$repeatHelp$(n, chunk, '');
};
var $elm$core$String$repeat = F2($elm$core$String$repeat$);
var $elm_explorations$test$Test$Html$Internal$ElmHtml$InternalTypes$EscapableRawTextElements = {$: 'EscapableRawTextElements'};
var $elm_explorations$test$Test$Html$Internal$ElmHtml$InternalTypes$NormalElements = {$: 'NormalElements'};
var $elm_explorations$test$Test$Html$Internal$ElmHtml$InternalTypes$RawTextElements = {$: 'RawTextElements'};
var $elm_explorations$test$Test$Html$Internal$ElmHtml$InternalTypes$VoidElements = {$: 'VoidElements'};
var $elm_explorations$test$Test$Html$Internal$ElmHtml$InternalTypes$escapableRawTextElements = _List_fromArray(
	['textarea', 'title']);
var $elm_explorations$test$Test$Html$Internal$ElmHtml$InternalTypes$rawTextElements = _List_fromArray(
	['script', 'style']);
var $elm_explorations$test$Test$Html$Internal$ElmHtml$InternalTypes$voidElements = _List_fromArray(
	['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'param', 'source', 'track', 'wbr']);
var $elm_explorations$test$Test$Html$Internal$ElmHtml$InternalTypes$toElementKind = function (element) {
	return $elm$core$List$member$(element, $elm_explorations$test$Test$Html$Internal$ElmHtml$InternalTypes$voidElements) ? $elm_explorations$test$Test$Html$Internal$ElmHtml$InternalTypes$VoidElements : ($elm$core$List$member$(element, $elm_explorations$test$Test$Html$Internal$ElmHtml$InternalTypes$rawTextElements) ? $elm_explorations$test$Test$Html$Internal$ElmHtml$InternalTypes$RawTextElements : ($elm$core$List$member$(element, $elm_explorations$test$Test$Html$Internal$ElmHtml$InternalTypes$escapableRawTextElements) ? $elm_explorations$test$Test$Html$Internal$ElmHtml$InternalTypes$EscapableRawTextElements : $elm_explorations$test$Test$Html$Internal$ElmHtml$InternalTypes$NormalElements));
};
var $elm$core$String$trim = _String_trim;
var $elm_explorations$test$Test$Html$Internal$ElmHtml$ToString$nodeRecordToString$ = function (options, _v1) {
	var facts = _v1.facts;
	var children = _v1.children;
	var tag = _v1.tag;
	var styles = function () {
		var _v7 = $elm$core$Dict$toList(facts.styles);
		if (!_v7.b) {
			return $elm$core$Maybe$Nothing;
		} else {
			var styleValues = _v7;
			return $elm$core$Maybe$Just(
				function (styleString) {
					return 'style=\"' + (styleString + '\"');
				}(
					$elm$core$String$join$(
						'',
						$elm$core$List$map$(
							function (_v8) {
								var key = _v8.a;
								var value = _v8.b;
								return key + (':' + (value + ';'));
							},
							styleValues))));
		}
	}();
	var stringAttributes = $elm$core$Maybe$Just(
		$elm$core$String$join$(
			' ',
			$elm$core$List$map$(
				function (_v6) {
					var k = _v6.a;
					var v = _v6.b;
					return k + ('=\"' + (v + '\"'));
				},
				$elm$core$Dict$toList(
					$elm$core$Dict$filter$(
						F2(
							function (k, _v5) {
								return k !== 'className';
							}),
						facts.stringAttributes)))));
	var openTag = function (extras) {
		var trimmedExtras = $elm$core$List$filter$(
			$elm$core$Basics$neq(''),
			$elm$core$List$map$(
				$elm$core$String$trim,
				$elm$core$List$filterMap$(
					function (x) {
						return x;
					},
					extras)));
		var filling = function () {
			if (!trimmedExtras.b) {
				return '';
			} else {
				var more = trimmedExtras;
				return ' ' + $elm$core$String$join$(' ', more);
			}
		}();
		return '<' + (tag + (filling + '>'));
	};
	var closeTag = '</' + (tag + '>');
	var classes = $elm$core$Maybe$map$(
		function (name) {
			return 'class=\"' + (name + '\"');
		},
		$elm$core$Dict$get$('className', facts.stringAttributes));
	var childrenStrings = $elm$core$List$map$(
		$elm$core$Basics$append(
			$elm$core$String$repeat$(options.indent, ' ')),
		$elm$core$List$concat(
			$elm$core$List$map$(
				$elm_explorations$test$Test$Html$Internal$ElmHtml$ToString$nodeToLines(options),
				children)));
	var boolAttributes = $elm$core$Maybe$Just(
		$elm$core$String$join$(
			' ',
			$elm$core$List$filterMap$(
				function (_v3) {
					var k = _v3.a;
					var v = _v3.b;
					return v ? $elm$core$Maybe$Just(k) : $elm$core$Maybe$Nothing;
				},
				$elm$core$Dict$toList(facts.boolAttributes))));
	var _v2 = $elm_explorations$test$Test$Html$Internal$ElmHtml$InternalTypes$toElementKind(tag);
	if (_v2.$ === 'VoidElements') {
		return _List_fromArray(
			[
				openTag(
				_List_fromArray(
					[classes, styles, stringAttributes, boolAttributes]))
			]);
	} else {
		return _Utils_ap(
			_List_fromArray(
				[
					openTag(
					_List_fromArray(
						[classes, styles, stringAttributes, boolAttributes]))
				]),
			_Utils_ap(
				childrenStrings,
				_List_fromArray(
					[closeTag])));
	}
};
var $elm_explorations$test$Test$Html$Internal$ElmHtml$ToString$nodeRecordToString = F2($elm_explorations$test$Test$Html$Internal$ElmHtml$ToString$nodeRecordToString$);
var $elm_explorations$test$Test$Html$Internal$ElmHtml$ToString$nodeToLines$ = function (options, nodeType) {
	switch (nodeType.$) {
		case 'TextTag':
			var text = nodeType.a.text;
			return _List_fromArray(
				[text]);
		case 'NodeEntry':
			var record = nodeType.a;
			return $elm_explorations$test$Test$Html$Internal$ElmHtml$ToString$nodeRecordToString$(options, record);
		case 'CustomNode':
			return _List_Nil;
		default:
			var record = nodeType.a;
			return _List_fromArray(
				[record.model.markdown]);
	}
};
var $elm_explorations$test$Test$Html$Internal$ElmHtml$ToString$nodeToLines = F2($elm_explorations$test$Test$Html$Internal$ElmHtml$ToString$nodeToLines$);
var $elm_explorations$test$Test$Html$Internal$ElmHtml$ToString$nodeToStringWithOptions = function (options) {
	return A2(
		$elm$core$Basics$composeR,
		$elm_explorations$test$Test$Html$Internal$ElmHtml$ToString$nodeToLines(options),
		$elm$core$String$join(
			options.newLines ? '\n' : ''));
};
var $elm_explorations$test$Test$Html$Query$Internal$prettyPrint = $elm_explorations$test$Test$Html$Internal$ElmHtml$ToString$nodeToStringWithOptions(
	{indent: 4, newLines: true});
var $elm_explorations$test$Test$Html$Event$findEvent$ = function (eventName, element) {
	var handlerToDecoder = function (handler) {
		switch (handler.$) {
			case 'Normal':
				var decoder = handler.a;
				return A2(
					$elm$json$Json$Decode$map,
					function (msg) {
						return $elm_explorations$test$Test$Html$Event$Handling$(msg, false, false);
					},
					decoder);
			case 'MayStopPropagation':
				var decoder = handler.a;
				return A2(
					$elm$json$Json$Decode$map,
					function (_v2) {
						var msg = _v2.a;
						var sp = _v2.b;
						return $elm_explorations$test$Test$Html$Event$Handling$(msg, sp, false);
					},
					decoder);
			case 'MayPreventDefault':
				var decoder = handler.a;
				return A2(
					$elm$json$Json$Decode$map,
					function (_v3) {
						var msg = _v3.a;
						var pd = _v3.b;
						return $elm_explorations$test$Test$Html$Event$Handling$(msg, false, pd);
					},
					decoder);
			default:
				var decoder = handler.a;
				return decoder;
		}
	};
	var elementOutput = $elm_explorations$test$Test$Html$Query$Internal$prettyPrint(element);
	var eventDecoder = function (node) {
		return $elm$core$Result$fromMaybe$(
			'Event.expectEvent: I found a node, but it does not listen for \"' + (eventName + ('\" events like I expected it would.\n\n' + elementOutput)),
			$elm$core$Maybe$map$(
				handlerToDecoder,
				$elm$core$Dict$get$(eventName, node.facts.events)));
	};
	switch (element.$) {
		case 'TextTag':
			return $elm$core$Result$Err('I found a text node instead of an element. Text nodes do not receive events, so it would be impossible to simulate \"' + (eventName + ('\" events on it. The text in the node was: \"' + (elementOutput + '\"'))));
		case 'NodeEntry':
			var node = element.a;
			return eventDecoder(node);
		case 'CustomNode':
			var node = element.a;
			return eventDecoder(node);
		default:
			var node = element.a;
			return eventDecoder(node);
	}
};
var $elm_explorations$test$Test$Html$Event$findEvent = F2($elm_explorations$test$Test$Html$Event$findEvent$);
var $elm$core$Result$mapError$ = function (f, result) {
	if (result.$ === 'Ok') {
		var v = result.a;
		return $elm$core$Result$Ok(v);
	} else {
		var e = result.a;
		return $elm$core$Result$Err(
			f(e));
	}
};
var $elm$core$Result$mapError = F2($elm$core$Result$mapError$);
var $elm_explorations$test$Test$Html$Query$Internal$queryErrorToString = function (error) {
	switch (error.$) {
		case 'NoResultsForSingle':
			var queryName = error.a;
			return queryName + ' always expects to find 1 element, but it found 0 instead.';
		case 'MultipleResultsForSingle':
			var queryName = error.a;
			var resultCount = error.b;
			return queryName + (' always expects to find 1 element, but it found ' + ($elm$core$String$fromInt(resultCount) + (' instead.\n\n\nHINT: If you actually expected ' + ($elm$core$String$fromInt(resultCount) + ' elements, use Query.findAll instead of Query.find.'))));
		default:
			var message = error.a;
			return 'Internal Error: failed to decode the virtual dom.  Please report this at <https://github.com/elm-explorations/test/issues>.  ' + message;
	}
};
var $elm_explorations$test$Test$Html$Query$Internal$OtherInternalError = function (a) {
	return {$: 'OtherInternalError', a: a};
};
var $elm_explorations$test$Test$Html$Internal$Inert$toElmHtml = function (_v0) {
	var elmHtml = _v0.a;
	return elmHtml;
};
var $elm_explorations$test$Test$Html$Query$Internal$NoResultsForSingle = function (a) {
	return {$: 'NoResultsForSingle', a: a};
};
var $elm$core$List$concatMap$ = function (f, list) {
	return $elm$core$List$concat(
		$elm$core$List$map$(f, list));
};
var $elm$core$List$concatMap = F2($elm$core$List$concatMap$);
var $elm_explorations$test$Test$Html$Query$Internal$getChildren = function (elmHtml) {
	if (elmHtml.$ === 'NodeEntry') {
		var children = elmHtml.a.children;
		return children;
	} else {
		return _List_Nil;
	}
};
var $elm$core$Basics$negate = function (n) {
	return -n;
};
var $elm$core$Basics$abs = function (n) {
	return (n < 0) ? (-n) : n;
};
var $elm_explorations$test$Test$Html$Query$Internal$getElementAtHelp$ = function (index, list) {
	getElementAtHelp:
	while (true) {
		if (!list.b) {
			return _List_Nil;
		} else {
			var first = list.a;
			var rest = list.b;
			if (!index) {
				return _List_fromArray(
					[first]);
			} else {
				var $temp$index = index - 1,
					$temp$list = rest;
				index = $temp$index;
				list = $temp$list;
				continue getElementAtHelp;
			}
		}
	}
};
var $elm_explorations$test$Test$Html$Query$Internal$getElementAtHelp = F2($elm_explorations$test$Test$Html$Query$Internal$getElementAtHelp$);
var $elm$core$Basics$modBy = _Basics_modBy;
var $elm_explorations$test$Test$Html$Query$Internal$getElementAt$ = function (index, list) {
	var length = $elm$core$List$length(list);
	return ((!length) || ((_Utils_cmp(index, length) > -1) || ((index < 0) && (_Utils_cmp(
		$elm$core$Basics$abs(index),
		length) > 0)))) ? _List_Nil : $elm_explorations$test$Test$Html$Query$Internal$getElementAtHelp$(
		A2($elm$core$Basics$modBy, length, index),
		list);
};
var $elm_explorations$test$Test$Html$Query$Internal$getElementAt = F2($elm_explorations$test$Test$Html$Query$Internal$getElementAt$);
var $elm$core$List$head = function (list) {
	if (list.b) {
		var x = list.a;
		var xs = list.b;
		return $elm$core$Maybe$Just(x);
	} else {
		return $elm$core$Maybe$Nothing;
	}
};
var $elm$core$Result$map$ = function (func, ra) {
	if (ra.$ === 'Ok') {
		var a = ra.a;
		return $elm$core$Result$Ok(
			func(a));
	} else {
		var e = ra.a;
		return $elm$core$Result$Err(e);
	}
};
var $elm$core$Result$map = F2($elm$core$Result$map$);
var $elm$core$String$contains = _String_contains;
var $elm$core$Basics$composeL$ = function (g, f, x) {
	return g(
		f(x));
};
var $elm$core$Basics$composeL = F3($elm$core$Basics$composeL$);
var $elm$core$List$all$ = function (isOkay, list) {
	return !$elm$core$List$any$(
		A2($elm$core$Basics$composeL, $elm$core$Basics$not, isOkay),
		list);
};
var $elm$core$List$all = F2($elm$core$List$all$);
var $elm$core$Basics$always$ = function (a, _v0) {
	return a;
};
var $elm$core$Basics$always = F2($elm$core$Basics$always$);
var $elm_explorations$test$Test$Html$Internal$ElmHtml$Query$hasAttribute$ = function (attribute, queryString, facts) {
	var _v0 = $elm$core$Dict$get$(attribute, facts.stringAttributes);
	if (_v0.$ === 'Just') {
		var id = _v0.a;
		return _Utils_eq(id, queryString);
	} else {
		return false;
	}
};
var $elm_explorations$test$Test$Html$Internal$ElmHtml$Query$hasAttribute = F3($elm_explorations$test$Test$Html$Internal$ElmHtml$Query$hasAttribute$);
var $elm_explorations$test$Test$Html$Internal$ElmHtml$Query$hasBoolAttribute$ = function (attribute, value, facts) {
	var _v0 = $elm$core$Dict$get$(attribute, facts.boolAttributes);
	if (_v0.$ === 'Just') {
		var id = _v0.a;
		return _Utils_eq(id, value);
	} else {
		return false;
	}
};
var $elm_explorations$test$Test$Html$Internal$ElmHtml$Query$hasBoolAttribute = F3($elm_explorations$test$Test$Html$Internal$ElmHtml$Query$hasBoolAttribute$);
var $elm$core$Maybe$withDefault$ = function (_default, maybe) {
	if (maybe.$ === 'Just') {
		var value = maybe.a;
		return value;
	} else {
		return _default;
	}
};
var $elm$core$Maybe$withDefault = F2($elm$core$Maybe$withDefault$);
var $elm_explorations$test$Test$Html$Internal$ElmHtml$Query$classnames = function (facts) {
	return $elm$core$String$split$(
		' ',
		$elm$core$Maybe$withDefault$(
			'',
			$elm$core$Dict$get$('className', facts.stringAttributes)));
};
var $elm_explorations$test$Test$Html$Internal$ElmHtml$Query$hasClass$ = function (queryString, facts) {
	return $elm$core$List$member$(
		queryString,
		$elm_explorations$test$Test$Html$Internal$ElmHtml$Query$classnames(facts));
};
var $elm_explorations$test$Test$Html$Internal$ElmHtml$Query$hasClass = F2($elm_explorations$test$Test$Html$Internal$ElmHtml$Query$hasClass$);
var $elm$core$List$isEmpty = function (xs) {
	if (!xs.b) {
		return true;
	} else {
		return false;
	}
};
var $elm_explorations$test$Test$Html$Internal$ElmHtml$Query$containsAll$ = function (a, b) {
	return $elm$core$List$isEmpty(
		$elm$core$List$foldl$(
			F2(
				function (i, acc) {
					return $elm$core$List$filter$(
						$elm$core$Basics$neq(i),
						acc);
				}),
			a,
			b));
};
var $elm_explorations$test$Test$Html$Internal$ElmHtml$Query$containsAll = F2($elm_explorations$test$Test$Html$Internal$ElmHtml$Query$containsAll$);
var $elm_explorations$test$Test$Html$Internal$ElmHtml$Query$hasClasses$ = function (classList, facts) {
	return $elm_explorations$test$Test$Html$Internal$ElmHtml$Query$containsAll$(
		classList,
		$elm_explorations$test$Test$Html$Internal$ElmHtml$Query$classnames(facts));
};
var $elm_explorations$test$Test$Html$Internal$ElmHtml$Query$hasClasses = F2($elm_explorations$test$Test$Html$Internal$ElmHtml$Query$hasClasses$);
var $elm_explorations$test$Test$Html$Internal$ElmHtml$Query$hasStyle$ = function (style, facts) {
	return _Utils_eq(
		$elm$core$Dict$get$(style.key, facts.styles),
		$elm$core$Maybe$Just(style.value));
};
var $elm_explorations$test$Test$Html$Internal$ElmHtml$Query$hasStyle = F2($elm_explorations$test$Test$Html$Internal$ElmHtml$Query$hasStyle$);
var $elm_explorations$test$Test$Html$Internal$ElmHtml$Query$hasAllSelectors$ = function (selectors, record) {
	return $elm$core$List$all$(
		$elm$core$Basics$identity,
		$elm$core$List$map$(
			function (selector) {
				return selector(record);
			},
			$elm$core$List$map$($elm_explorations$test$Test$Html$Internal$ElmHtml$Query$predicateFromSelector, selectors)));
};
var $elm_explorations$test$Test$Html$Internal$ElmHtml$Query$hasAllSelectors = F2($elm_explorations$test$Test$Html$Internal$ElmHtml$Query$hasAllSelectors$);
var $elm_explorations$test$Test$Html$Internal$ElmHtml$Query$markdownPredicate = function (selector) {
	switch (selector.$) {
		case 'Id':
			var id = selector.a;
			return A2(
				$elm$core$Basics$composeR,
				function ($) {
					return $.facts;
				},
				A2($elm_explorations$test$Test$Html$Internal$ElmHtml$Query$hasAttribute, 'id', id));
		case 'ClassName':
			var classname = selector.a;
			return A2(
				$elm$core$Basics$composeR,
				function ($) {
					return $.facts;
				},
				$elm_explorations$test$Test$Html$Internal$ElmHtml$Query$hasClass(classname));
		case 'ClassList':
			var classList = selector.a;
			return A2(
				$elm$core$Basics$composeR,
				function ($) {
					return $.facts;
				},
				$elm_explorations$test$Test$Html$Internal$ElmHtml$Query$hasClasses(classList));
		case 'Tag':
			return $elm$core$Basics$always(false);
		case 'Attribute':
			var key = selector.a;
			var value = selector.b;
			return A2(
				$elm$core$Basics$composeR,
				function ($) {
					return $.facts;
				},
				A2($elm_explorations$test$Test$Html$Internal$ElmHtml$Query$hasAttribute, key, value));
		case 'BoolAttribute':
			var key = selector.a;
			var value = selector.b;
			return A2(
				$elm$core$Basics$composeR,
				function ($) {
					return $.facts;
				},
				A2($elm_explorations$test$Test$Html$Internal$ElmHtml$Query$hasBoolAttribute, key, value));
		case 'Style':
			var style = selector.a;
			return A2(
				$elm$core$Basics$composeR,
				function ($) {
					return $.facts;
				},
				$elm_explorations$test$Test$Html$Internal$ElmHtml$Query$hasStyle(style));
		case 'ContainsText':
			var text = selector.a;
			return A2(
				$elm$core$Basics$composeR,
				function ($) {
					return $.model;
				},
				A2(
					$elm$core$Basics$composeR,
					function ($) {
						return $.markdown;
					},
					$elm$core$String$contains(text)));
		case 'ContainsExactText':
			var text = selector.a;
			return A2(
				$elm$core$Basics$composeR,
				function ($) {
					return $.model;
				},
				A2(
					$elm$core$Basics$composeR,
					function ($) {
						return $.markdown;
					},
					$elm$core$Basics$eq(text)));
		default:
			var selectors = selector.a;
			return A2(
				$elm$core$Basics$composeR,
				$elm_explorations$test$Test$Html$Internal$ElmHtml$InternalTypes$MarkdownNode,
				$elm_explorations$test$Test$Html$Internal$ElmHtml$Query$hasAllSelectors(selectors));
	}
};
var $elm_explorations$test$Test$Html$Internal$ElmHtml$Query$nodeRecordPredicate = function (selector) {
	switch (selector.$) {
		case 'Id':
			var id = selector.a;
			return A2(
				$elm$core$Basics$composeR,
				function ($) {
					return $.facts;
				},
				A2($elm_explorations$test$Test$Html$Internal$ElmHtml$Query$hasAttribute, 'id', id));
		case 'ClassName':
			var classname = selector.a;
			return A2(
				$elm$core$Basics$composeR,
				function ($) {
					return $.facts;
				},
				$elm_explorations$test$Test$Html$Internal$ElmHtml$Query$hasClass(classname));
		case 'ClassList':
			var classList = selector.a;
			return A2(
				$elm$core$Basics$composeR,
				function ($) {
					return $.facts;
				},
				$elm_explorations$test$Test$Html$Internal$ElmHtml$Query$hasClasses(classList));
		case 'Tag':
			var tag = selector.a;
			return A2(
				$elm$core$Basics$composeR,
				function ($) {
					return $.tag;
				},
				$elm$core$Basics$eq(tag));
		case 'Attribute':
			var key = selector.a;
			var value = selector.b;
			return A2(
				$elm$core$Basics$composeR,
				function ($) {
					return $.facts;
				},
				A2($elm_explorations$test$Test$Html$Internal$ElmHtml$Query$hasAttribute, key, value));
		case 'BoolAttribute':
			var key = selector.a;
			var value = selector.b;
			return A2(
				$elm$core$Basics$composeR,
				function ($) {
					return $.facts;
				},
				A2($elm_explorations$test$Test$Html$Internal$ElmHtml$Query$hasBoolAttribute, key, value));
		case 'Style':
			var style = selector.a;
			return A2(
				$elm$core$Basics$composeR,
				function ($) {
					return $.facts;
				},
				$elm_explorations$test$Test$Html$Internal$ElmHtml$Query$hasStyle(style));
		case 'ContainsText':
			return $elm$core$Basics$always(false);
		case 'ContainsExactText':
			return $elm$core$Basics$always(false);
		default:
			var selectors = selector.a;
			return A2(
				$elm$core$Basics$composeR,
				$elm_explorations$test$Test$Html$Internal$ElmHtml$InternalTypes$NodeEntry,
				$elm_explorations$test$Test$Html$Internal$ElmHtml$Query$hasAllSelectors(selectors));
	}
};
var $elm_explorations$test$Test$Html$Internal$ElmHtml$Query$predicateFromSelector$ = function (selector, html) {
	switch (html.$) {
		case 'NodeEntry':
			var record = html.a;
			return A2($elm_explorations$test$Test$Html$Internal$ElmHtml$Query$nodeRecordPredicate, selector, record);
		case 'MarkdownNode':
			var markdownModel = html.a;
			return A2($elm_explorations$test$Test$Html$Internal$ElmHtml$Query$markdownPredicate, selector, markdownModel);
		default:
			return false;
	}
};
var $elm_explorations$test$Test$Html$Internal$ElmHtml$Query$predicateFromSelector = F2($elm_explorations$test$Test$Html$Internal$ElmHtml$Query$predicateFromSelector$);
var $elm_explorations$test$Test$Html$Internal$ElmHtml$Query$descendInQuery$ = function (maxDescendantDepth, selector, children) {
	if (maxDescendantDepth.$ === 'Nothing') {
		return $elm$core$List$concatMap$(
			A2($elm_explorations$test$Test$Html$Internal$ElmHtml$Query$queryInNodeHelp, $elm$core$Maybe$Nothing, selector),
			children);
	} else {
		var depth = maxDescendantDepth.a;
		return (depth > 0) ? $elm$core$List$concatMap$(
			A2(
				$elm_explorations$test$Test$Html$Internal$ElmHtml$Query$queryInNodeHelp,
				$elm$core$Maybe$Just(depth - 1),
				selector),
			children) : _List_Nil;
	}
};
var $elm_explorations$test$Test$Html$Internal$ElmHtml$Query$descendInQuery = F3($elm_explorations$test$Test$Html$Internal$ElmHtml$Query$descendInQuery$);
var $elm_explorations$test$Test$Html$Internal$ElmHtml$Query$queryInNodeHelp$ = function (maxDescendantDepth, selector, node) {
	switch (node.$) {
		case 'NodeEntry':
			var record = node.a;
			var childEntries = $elm_explorations$test$Test$Html$Internal$ElmHtml$Query$descendInQuery$(maxDescendantDepth, selector, record.children);
			return $elm_explorations$test$Test$Html$Internal$ElmHtml$Query$predicateFromSelector$(selector, node) ? A2($elm$core$List$cons, node, childEntries) : childEntries;
		case 'TextTag':
			var text = node.a.text;
			switch (selector.$) {
				case 'ContainsText':
					var innerText = selector.a;
					return A2($elm$core$String$contains, innerText, text) ? _List_fromArray(
						[node]) : _List_Nil;
				case 'ContainsExactText':
					var innerText = selector.a;
					return _Utils_eq(innerText, text) ? _List_fromArray(
						[node]) : _List_Nil;
				default:
					return _List_Nil;
			}
		case 'MarkdownNode':
			return $elm_explorations$test$Test$Html$Internal$ElmHtml$Query$predicateFromSelector$(selector, node) ? _List_fromArray(
				[node]) : _List_Nil;
		default:
			return _List_Nil;
	}
};
var $elm_explorations$test$Test$Html$Internal$ElmHtml$Query$queryInNodeHelp = F3($elm_explorations$test$Test$Html$Internal$ElmHtml$Query$queryInNodeHelp$);
var $elm_explorations$test$Test$Html$Internal$ElmHtml$Query$queryInNode = $elm_explorations$test$Test$Html$Internal$ElmHtml$Query$queryInNodeHelp($elm$core$Maybe$Nothing);
var $elm_explorations$test$Test$Html$Internal$ElmHtml$Query$query = function (selector) {
	return $elm_explorations$test$Test$Html$Internal$ElmHtml$Query$queryInNode(selector);
};
var $elm_explorations$test$Test$Html$Selector$Internal$All = function (a) {
	return {$: 'All', a: a};
};
var $elm_explorations$test$Test$Html$Internal$ElmHtml$Query$Attribute$ = function (a, b) {
	return {$: 'Attribute', a: a, b: b};
};
var $elm_explorations$test$Test$Html$Internal$ElmHtml$Query$Attribute = F2($elm_explorations$test$Test$Html$Internal$ElmHtml$Query$Attribute$);
var $elm_explorations$test$Test$Html$Internal$ElmHtml$Query$BoolAttribute$ = function (a, b) {
	return {$: 'BoolAttribute', a: a, b: b};
};
var $elm_explorations$test$Test$Html$Internal$ElmHtml$Query$BoolAttribute = F2($elm_explorations$test$Test$Html$Internal$ElmHtml$Query$BoolAttribute$);
var $elm_explorations$test$Test$Html$Internal$ElmHtml$Query$ClassList = function (a) {
	return {$: 'ClassList', a: a};
};
var $elm_explorations$test$Test$Html$Internal$ElmHtml$Query$ContainsExactText = function (a) {
	return {$: 'ContainsExactText', a: a};
};
var $elm_explorations$test$Test$Html$Internal$ElmHtml$Query$ContainsText = function (a) {
	return {$: 'ContainsText', a: a};
};
var $elm_explorations$test$Test$Html$Internal$ElmHtml$Query$Style = function (a) {
	return {$: 'Style', a: a};
};
var $elm_explorations$test$Test$Html$Internal$ElmHtml$Query$Tag = function (a) {
	return {$: 'Tag', a: a};
};
var $elm_explorations$test$Test$Html$Internal$ElmHtml$Query$getChildren = function (elmHtml) {
	if (elmHtml.$ === 'NodeEntry') {
		var children = elmHtml.a.children;
		return children;
	} else {
		return _List_Nil;
	}
};
var $elm_explorations$test$Test$Html$Selector$Internal$query$ = function (fn, fnAll, selector, list) {
	if (!list.b) {
		return list;
	} else {
		var elems = list;
		switch (selector.$) {
			case 'All':
				var selectors = selector.a;
				return A2(fnAll, selectors, elems);
			case 'Classes':
				var classes = selector.a;
				return $elm$core$List$concatMap$(
					fn(
						$elm_explorations$test$Test$Html$Internal$ElmHtml$Query$ClassList(classes)),
					elems);
			case 'Class':
				var _class = selector.a;
				return $elm$core$List$concatMap$(
					fn(
						$elm_explorations$test$Test$Html$Internal$ElmHtml$Query$ClassList(
							_List_fromArray(
								[_class]))),
					elems);
			case 'Attribute':
				var value = selector.a.value;
				var name = selector.a.name;
				return $elm$core$List$concatMap$(
					fn(
						$elm_explorations$test$Test$Html$Internal$ElmHtml$Query$Attribute$(name, value)),
					elems);
			case 'BoolAttribute':
				var value = selector.a.value;
				var name = selector.a.name;
				return $elm$core$List$concatMap$(
					fn(
						$elm_explorations$test$Test$Html$Internal$ElmHtml$Query$BoolAttribute$(name, value)),
					elems);
			case 'Style':
				var style = selector.a;
				return $elm$core$List$concatMap$(
					fn(
						$elm_explorations$test$Test$Html$Internal$ElmHtml$Query$Style(style)),
					elems);
			case 'Tag':
				var name = selector.a;
				return $elm$core$List$concatMap$(
					fn(
						$elm_explorations$test$Test$Html$Internal$ElmHtml$Query$Tag(name)),
					elems);
			case 'Text':
				var text = selector.a;
				return $elm$core$List$concatMap$(
					fn(
						$elm_explorations$test$Test$Html$Internal$ElmHtml$Query$ContainsText(text)),
					elems);
			case 'ExactText':
				var text = selector.a;
				return $elm$core$List$concatMap$(
					fn(
						$elm_explorations$test$Test$Html$Internal$ElmHtml$Query$ContainsExactText(text)),
					elems);
			case 'Containing':
				var selectors = selector.a;
				var anyDescendantsMatch = function (elem) {
					var _v2 = $elm_explorations$test$Test$Html$Internal$ElmHtml$Query$getChildren(elem);
					if (!_v2.b) {
						return false;
					} else {
						var children = _v2;
						var _v3 = $elm_explorations$test$Test$Html$Selector$Internal$query$(
							fn,
							fnAll,
							$elm_explorations$test$Test$Html$Selector$Internal$All(selectors),
							children);
						if (!_v3.b) {
							return $elm$core$List$any$(anyDescendantsMatch, children);
						} else {
							return true;
						}
					}
				};
				return $elm$core$List$filter$(anyDescendantsMatch, elems);
			default:
				return _List_Nil;
		}
	}
};
var $elm_explorations$test$Test$Html$Selector$Internal$query = F4($elm_explorations$test$Test$Html$Selector$Internal$query$);
var $elm_explorations$test$Test$Html$Selector$Internal$queryAll$ = function (selectors, list) {
	if (!selectors.b) {
		return list;
	} else {
		var selector = selectors.a;
		var rest = selectors.b;
		return $elm_explorations$test$Test$Html$Selector$Internal$queryAll$(
			rest,
			$elm_explorations$test$Test$Html$Selector$Internal$query$($elm_explorations$test$Test$Html$Internal$ElmHtml$Query$query, $elm_explorations$test$Test$Html$Selector$Internal$queryAll, selector, list));
	}
};
var $elm_explorations$test$Test$Html$Selector$Internal$queryAll = F2($elm_explorations$test$Test$Html$Selector$Internal$queryAll$);
var $elm_explorations$test$Test$Html$Internal$ElmHtml$Query$queryChildren = $elm_explorations$test$Test$Html$Internal$ElmHtml$Query$queryInNodeHelp(
	$elm$core$Maybe$Just(1));
var $elm_explorations$test$Test$Html$Selector$Internal$queryAllChildren$ = function (selectors, list) {
	if (!selectors.b) {
		return list;
	} else {
		var selector = selectors.a;
		var rest = selectors.b;
		return $elm_explorations$test$Test$Html$Selector$Internal$queryAllChildren$(
			rest,
			$elm_explorations$test$Test$Html$Selector$Internal$query$($elm_explorations$test$Test$Html$Internal$ElmHtml$Query$queryChildren, $elm_explorations$test$Test$Html$Selector$Internal$queryAllChildren, selector, list));
	}
};
var $elm_explorations$test$Test$Html$Selector$Internal$queryAllChildren = F2($elm_explorations$test$Test$Html$Selector$Internal$queryAllChildren$);
var $elm_explorations$test$Test$Html$Query$Internal$MultipleResultsForSingle$ = function (a, b) {
	return {$: 'MultipleResultsForSingle', a: a, b: b};
};
var $elm_explorations$test$Test$Html$Query$Internal$MultipleResultsForSingle = F2($elm_explorations$test$Test$Html$Query$Internal$MultipleResultsForSingle$);
var $elm_explorations$test$Test$Html$Query$Internal$verifySingle$ = function (queryName, list) {
	if (!list.b) {
		return $elm$core$Result$Err(
			$elm_explorations$test$Test$Html$Query$Internal$NoResultsForSingle(queryName));
	} else {
		if (!list.b.b) {
			var singleton = list.a;
			return $elm$core$Result$Ok(singleton);
		} else {
			var multiples = list;
			return $elm$core$Result$Err(
				$elm_explorations$test$Test$Html$Query$Internal$MultipleResultsForSingle$(
					queryName,
					$elm$core$List$length(multiples)));
		}
	}
};
var $elm_explorations$test$Test$Html$Query$Internal$verifySingle = F2($elm_explorations$test$Test$Html$Query$Internal$verifySingle$);
var $elm_explorations$test$Test$Html$Query$Internal$traverseSelector$ = function (selectorQuery, elmHtmlList) {
	switch (selectorQuery.$) {
		case 'Find':
			var selectors = selectorQuery.a;
			return $elm$core$Result$map$(
				function (elem) {
					return _List_fromArray(
						[elem]);
				},
				$elm_explorations$test$Test$Html$Query$Internal$verifySingle$(
					'Query.find',
					$elm_explorations$test$Test$Html$Selector$Internal$queryAll$(
						selectors,
						$elm$core$List$concatMap$($elm_explorations$test$Test$Html$Query$Internal$getChildren, elmHtmlList))));
		case 'FindAll':
			var selectors = selectorQuery.a;
			return $elm$core$Result$Ok(
				$elm_explorations$test$Test$Html$Selector$Internal$queryAll$(
					selectors,
					$elm$core$List$concatMap$($elm_explorations$test$Test$Html$Query$Internal$getChildren, elmHtmlList)));
		case 'Children':
			var selectors = selectorQuery.a;
			return $elm$core$Result$Ok(
				$elm_explorations$test$Test$Html$Selector$Internal$queryAllChildren$(
					selectors,
					$elm$core$List$concatMap$($elm_explorations$test$Test$Html$Query$Internal$getChildren, elmHtmlList)));
		case 'First':
			return $elm$core$Maybe$withDefault$(
				$elm$core$Result$Err(
					$elm_explorations$test$Test$Html$Query$Internal$NoResultsForSingle('Query.first')),
				$elm$core$Maybe$map$(
					function (elem) {
						return $elm$core$Result$Ok(
							_List_fromArray(
								[elem]));
					},
					$elm$core$List$head(elmHtmlList)));
		default:
			var index = selectorQuery.a;
			var elements = $elm_explorations$test$Test$Html$Query$Internal$getElementAt$(index, elmHtmlList);
			return ($elm$core$List$length(elements) === 1) ? $elm$core$Result$Ok(elements) : $elm$core$Result$Err(
				$elm_explorations$test$Test$Html$Query$Internal$NoResultsForSingle(
					'Query.index ' + $elm$core$String$fromInt(index)));
	}
};
var $elm_explorations$test$Test$Html$Query$Internal$traverseSelector = F2($elm_explorations$test$Test$Html$Query$Internal$traverseSelector$);
var $elm_explorations$test$Test$Html$Query$Internal$traverseSelectors$ = function (selectorQueries, elmHtmlList) {
	return $elm$core$List$foldr$(
		A2($elm$core$Basics$composeR, $elm_explorations$test$Test$Html$Query$Internal$traverseSelector, $elm$core$Result$andThen),
		$elm$core$Result$Ok(elmHtmlList),
		selectorQueries);
};
var $elm_explorations$test$Test$Html$Query$Internal$traverseSelectors = F2($elm_explorations$test$Test$Html$Query$Internal$traverseSelectors$);
var $elm_explorations$test$Test$Html$Query$Internal$traverse = function (query) {
	if (query.$ === 'Query') {
		var node = query.a;
		var selectorQueries = query.b;
		return $elm_explorations$test$Test$Html$Query$Internal$traverseSelectors$(
			selectorQueries,
			_List_fromArray(
				[
					$elm_explorations$test$Test$Html$Internal$Inert$toElmHtml(node)
				]));
	} else {
		var message = query.a;
		return $elm$core$Result$Err(
			$elm_explorations$test$Test$Html$Query$Internal$OtherInternalError(message));
	}
};
var $elm_explorations$test$Test$Html$Event$findHandler = function (_v0) {
	var _v1 = _v0.a;
	var eventName = _v1.a;
	var _v2 = _v0.b;
	var query = _v2.b;
	return $elm$core$Result$andThen$(
		$elm_explorations$test$Test$Html$Event$findEvent(eventName),
		$elm$core$Result$mapError$(
			$elm_explorations$test$Test$Html$Query$Internal$queryErrorToString,
			$elm$core$Result$andThen$(
				$elm_explorations$test$Test$Html$Query$Internal$verifySingle(eventName),
				$elm_explorations$test$Test$Html$Query$Internal$traverse(query))));
};
var $elm_explorations$test$Test$Html$Event$toResult = function (event) {
	return $elm$core$Result$andThen$(
		function (handler) {
			return $elm$core$Result$mapError$(
				$elm$json$Json$Decode$errorToString,
				A2(
					$elm$json$Json$Decode$decodeValue,
					handler,
					$elm_explorations$test$Test$Html$Event$eventPayload(event)));
		},
		$elm$core$Result$map$(
			$elm$json$Json$Decode$map(
				function ($) {
					return $.message;
				}),
			$elm_explorations$test$Test$Html$Event$findHandler(event)));
};
var $ianmackenzie$elm_units$Duration$from$ = function (startTime, endTime) {
	var numMilliseconds = $elm$time$Time$posixToMillis(endTime) - $elm$time$Time$posixToMillis(startTime);
	return $ianmackenzie$elm_units$Duration$milliseconds(numMilliseconds);
};
var $ianmackenzie$elm_units$Duration$from = F2($ianmackenzie$elm_units$Duration$from$);
var $lamdera$containers$SeqDict$filter$ = function (predicate, _v0) {
	var rootTriplets = _v0.c;
	var helper = F2(
		function (_v1, dict) {
			var hash = _v1.a;
			var key = _v1.b;
			var value = _v1.c;
			var bitmap = dict.a;
			var nodes = dict.b;
			var triplets = dict.c;
			return A2(predicate, key, value) ? $lamdera$containers$SeqDict$insertHelp$(0, hash, key, value, bitmap, nodes, triplets) : dict;
		});
	return $lamdera$containers$SeqDict$intDictFoldl$(helper, $lamdera$containers$SeqDict$empty, rootTriplets);
};
var $lamdera$containers$SeqDict$filter = F2($lamdera$containers$SeqDict$filter$);
var $ianmackenzie$elm_units$Duration$addTo$ = function (time, duration) {
	return $elm$time$Time$millisToPosix(
		$elm$time$Time$posixToMillis(time) + $elm$core$Basics$round(
			$ianmackenzie$elm_units$Duration$inMilliseconds(duration)));
};
var $ianmackenzie$elm_units$Duration$addTo = F2($ianmackenzie$elm_units$Duration$addTo$);
var $lamdera$program_test$Effect$Test$timerEndTimes = function (dict) {
	return $elm$core$List$map$(
		function (_v0) {
			var duration = _v0.a;
			var a = _v0.b;
			return {
				duration: duration,
				endTime: $ianmackenzie$elm_units$Duration$addTo$(a.startTime, duration)
			};
		},
		$lamdera$containers$SeqDict$toList(dict));
};
var $mgold$elm_nonempty_list$List$Nonempty$toList = function (_v0) {
	var x = _v0.a;
	var xs = _v0.b;
	return A2($elm$core$List$cons, x, xs);
};
var $lamdera$containers$SeqDict$values = function (_v0) {
	var triplets = _v0.c;
	var helper = F2(
		function (_v1, acc) {
			var value = _v1.c;
			return A2($elm$core$List$cons, value, acc);
		});
	return $lamdera$containers$SeqDict$intDictFoldr$(helper, _List_Nil, triplets);
};
var $lamdera$program_test$Effect$Test$getTriggersTimerMsgs$ = function (subscriptionsFunc, state, endTime) {
	var completedDurations = $elm$core$List$filterMap$(
		function (b) {
			return (_Utils_cmp(
				$elm$time$Time$posixToMillis(b.endTime),
				$elm$time$Time$posixToMillis(endTime)) < 1) ? $elm$core$Maybe$Just(b.duration) : $elm$core$Maybe$Nothing;
		},
		$lamdera$program_test$Effect$Test$timerEndTimes(state.timers));
	return {
		completedDurations: completedDurations,
		triggeredMsgs: $elm$core$List$map$(
			function (msg) {
				return msg(endTime);
			},
			$elm$core$List$concatMap$(
				function (value) {
					return $mgold$elm_nonempty_list$List$Nonempty$toList(value.msg);
				},
				$lamdera$containers$SeqDict$values(
					$lamdera$containers$SeqDict$filter$(
						F2(
							function (duration, _v0) {
								return $elm$core$List$member$(duration, completedDurations);
							}),
						$lamdera$program_test$Effect$Test$getTimers(
							subscriptionsFunc(state.model))))))
	};
};
var $lamdera$program_test$Effect$Test$getTriggersTimerMsgs = F3($lamdera$program_test$Effect$Test$getTriggersTimerMsgs$);
var $ianmackenzie$elm_units$Quantity$greaterThan$ = function (_v0, _v1) {
	var y = _v0.a;
	var x = _v1.a;
	return _Utils_cmp(x, y) > 0;
};
var $ianmackenzie$elm_units$Quantity$greaterThan = F2($ianmackenzie$elm_units$Quantity$greaterThan$);
var $ianmackenzie$elm_units$Quantity$greaterThanOrEqualTo$ = function (_v0, _v1) {
	var y = _v0.a;
	var x = _v1.a;
	return _Utils_cmp(x, y) > -1;
};
var $ianmackenzie$elm_units$Quantity$greaterThanOrEqualTo = F2($ianmackenzie$elm_units$Quantity$greaterThanOrEqualTo$);
var $lamdera$program_test$Effect$Test$BackendUpdateEvent$ = function (a, b) {
	return {$: 'BackendUpdateEvent', a: a, b: b};
};
var $lamdera$program_test$Effect$Test$BackendUpdateEvent = F2($lamdera$program_test$Effect$Test$BackendUpdateEvent$);
var $lamdera$program_test$Effect$Test$handleBackendUpdate$ = function (currentTime2, app, msg, state) {
	var _v0 = A2(app.update, msg, state.model);
	var newModel = _v0.a;
	var cmd = _v0.b;
	var subscriptions = app.subscriptions(newModel);
	var newTimers = $lamdera$program_test$Effect$Test$getTimers(subscriptions);
	return $lamdera$program_test$Effect$Test$addEvent$(
		$lamdera$program_test$Effect$Test$BackendUpdateEvent$(msg, cmd),
		$elm$core$Maybe$Nothing,
		_Utils_update(
			state,
			{
				model: newModel,
				pendingEffects: $elm$core$Array$push$(
					{
						cmds: cmd,
						stepIndex: $elm$core$Array$length(state.history)
					},
					state.pendingEffects),
				timers: $lamdera$containers$SeqDict$merge$(
					F3(
						function (duration, _v1, dict) {
							return $lamdera$containers$SeqDict$insert$(
								duration,
								{startTime: currentTime2},
								dict);
						}),
					F4(
						function (_v2, _v3, _v4, dict) {
							return dict;
						}),
					F3(
						function (duration, _v5, dict) {
							return $lamdera$containers$SeqDict$remove$(duration, dict);
						}),
					newTimers,
					state.timers,
					state.timers)
			}));
};
var $lamdera$program_test$Effect$Test$handleBackendUpdate = F4($lamdera$program_test$Effect$Test$handleBackendUpdate$);
var $lamdera$program_test$Effect$Test$flattenEffects = function (effect) {
	switch (effect.$) {
		case 'Batch':
			var effects = effect.a;
			return $elm$core$List$concatMap$($lamdera$program_test$Effect$Test$flattenEffects, effects);
		case 'None':
			return _List_Nil;
		default:
			return _List_fromArray(
				[effect]);
	}
};
var $lamdera$program_test$Effect$Test$hasPendingEffects = function (state) {
	var hasEffectsHelper = function (pendingEffects) {
		return $elm$core$Array$foldl$(
			F2(
				function (_v0, hasEffects) {
					var cmds = _v0.cmds;
					return hasEffects || (!$elm$core$List$isEmpty(
						$lamdera$program_test$Effect$Test$flattenEffects(cmds)));
				}),
			false,
			pendingEffects);
	};
	return hasEffectsHelper(state.pendingEffects) || $elm$core$List$any$(
		function (a) {
			return hasEffectsHelper(a.pendingEffects);
		},
		$lamdera$containers$SeqDict$values(state.frontends));
};
var $ianmackenzie$elm_units$Quantity$lessThanOrEqualTo$ = function (_v0, _v1) {
	var y = _v0.a;
	var x = _v1.a;
	return _Utils_cmp(x, y) < 1;
};
var $ianmackenzie$elm_units$Quantity$lessThanOrEqualTo = F2($ianmackenzie$elm_units$Quantity$lessThanOrEqualTo$);
var $lamdera$program_test$Effect$Test$minimumBy$ = function (f, ls) {
	var minBy = F2(
		function (x, _v1) {
			var y = _v1.a;
			var fy = _v1.b;
			var fx = f(x);
			return (_Utils_cmp(fx, fy) < 0) ? _Utils_Tuple2(x, fx) : _Utils_Tuple2(y, fy);
		});
	if (ls.b) {
		if (!ls.b.b) {
			var l_ = ls.a;
			return $elm$core$Maybe$Just(l_);
		} else {
			var l_ = ls.a;
			var ls_ = ls.b;
			return $elm$core$Maybe$Just(
				$elm$core$List$foldl$(
					minBy,
					_Utils_Tuple2(
						l_,
						f(l_)),
					ls_).a);
		}
	} else {
		return $elm$core$Maybe$Nothing;
	}
};
var $lamdera$program_test$Effect$Test$minimumBy = F2($lamdera$program_test$Effect$Test$minimumBy$);
var $ianmackenzie$elm_units$Quantity$minus$ = function (_v0, _v1) {
	var y = _v0.a;
	var x = _v1.a;
	return $ianmackenzie$elm_units$Quantity$Quantity(x - y);
};
var $ianmackenzie$elm_units$Quantity$minus = F2($ianmackenzie$elm_units$Quantity$minus$);
var $ianmackenzie$elm_units$Quantity$plus$ = function (_v0, _v1) {
	var y = _v0.a;
	var x = _v1.a;
	return $ianmackenzie$elm_units$Quantity$Quantity(x + y);
};
var $ianmackenzie$elm_units$Quantity$plus = F2($ianmackenzie$elm_units$Quantity$plus$);
var $lamdera$program_test$Effect$Test$clearBackendEffects = function (state) {
	return _Utils_update(
		state,
		{pendingEffects: $elm$core$Array$empty});
};
var $lamdera$containers$SeqDict$updateIfExists$ = function (key, fn, dict) {
	var bitmap = dict.a;
	var nodes = dict.b;
	var triplets = dict.c;
	var hash = $lamdera$containers$FNV$hash(key);
	var _v0 = $lamdera$containers$SeqDict$getHelp$(0, hash, key, bitmap, nodes);
	if (_v0.$ === 'Nothing') {
		return dict;
	} else {
		var value = _v0.a;
		return $lamdera$containers$SeqDict$insertHelp$(
			0,
			hash,
			key,
			fn(value),
			bitmap,
			nodes,
			triplets);
	}
};
var $lamdera$containers$SeqDict$updateIfExists = F3($lamdera$containers$SeqDict$updateIfExists$);
var $lamdera$program_test$Effect$Test$clearFrontendEffects$ = function (clientId, state) {
	return _Utils_update(
		state,
		{
			frontends: $lamdera$containers$SeqDict$updateIfExists$(
				clientId,
				function (frontend) {
					return _Utils_update(
						frontend,
						{pendingEffects: $elm$core$Array$empty});
				},
				state.frontends)
		});
};
var $lamdera$program_test$Effect$Test$clearFrontendEffects = F2($lamdera$program_test$Effect$Test$clearFrontendEffects$);
var $lamdera$program_test$Effect$Lamdera$ClientId = function (a) {
	return {$: 'ClientId', a: a};
};
var $lamdera$program_test$Effect$Lamdera$clientIdFromString = $lamdera$program_test$Effect$Lamdera$ClientId;
var $elm$http$Http$BadStatus_$ = function (a, b) {
	return {$: 'BadStatus_', a: a, b: b};
};
var $elm$http$Http$BadStatus_ = F2($elm$http$Http$BadStatus_$);
var $elm$http$Http$BadUrl_ = function (a) {
	return {$: 'BadUrl_', a: a};
};
var $lamdera$program_test$Effect$Internal$BrowserDomNotFound = function (a) {
	return {$: 'BrowserDomNotFound', a: a};
};
var $lamdera$program_test$Websocket$Connection$ = function (a, b) {
	return {$: 'Connection', a: a, b: b};
};
var $lamdera$program_test$Websocket$Connection = F2($lamdera$program_test$Websocket$Connection$);
var $lamdera$program_test$Effect$Test$EffectFailedEvent$ = function (a, b) {
	return {$: 'EffectFailedEvent', a: a, b: b};
};
var $lamdera$program_test$Effect$Test$EffectFailedEvent = F2($lamdera$program_test$Effect$Test$EffectFailedEvent$);
var $lamdera$program_test$Effect$Test$EmptyBody = {$: 'EmptyBody'};
var $elm$http$Http$GoodStatus_$ = function (a, b) {
	return {$: 'GoodStatus_', a: a, b: b};
};
var $elm$http$Http$GoodStatus_ = F2($elm$http$Http$GoodStatus_$);
var $lamdera$program_test$Effect$Test$HttpRequestFailed = {$: 'HttpRequestFailed'};
var $lamdera$program_test$Effect$Test$HttpRequestNotHandled = function (a) {
	return {$: 'HttpRequestNotHandled', a: a};
};
var $lamdera$program_test$Effect$Test$HttpResponseCantConvertTextureToString = function (a) {
	return {$: 'HttpResponseCantConvertTextureToString', a: a};
};
var $lamdera$program_test$Effect$Test$HttpResponseContainsBytesThatCantConvertToString = function (a) {
	return {$: 'HttpResponseContainsBytesThatCantConvertToString', a: a};
};
var $lamdera$program_test$WebGLFix$Texture$LoadError = {$: 'LoadError'};
var $elm$http$Http$NetworkError_ = {$: 'NetworkError_'};
var $lamdera$program_test$Effect$Internal$NotSupported = {$: 'NotSupported'};
var $elm$time$Time$Offset = function (a) {
	return {$: 'Offset', a: a};
};
var $lamdera$program_test$Effect$Test$RequestedByBackend = {$: 'RequestedByBackend'};
var $lamdera$program_test$Effect$Test$RequestedByFrontend = function (a) {
	return {$: 'RequestedByFrontend', a: a};
};
var $elm$http$Http$Timeout_ = {$: 'Timeout_'};
var $elm$core$Maybe$andThen$ = function (callback, maybeValue) {
	if (maybeValue.$ === 'Just') {
		var value = maybeValue.a;
		return callback(value);
	} else {
		return $elm$core$Maybe$Nothing;
	}
};
var $elm$core$Maybe$andThen = F2($elm$core$Maybe$andThen$);
var $elm$bytes$Bytes$Encode$getWidth = function (builder) {
	switch (builder.$) {
		case 'I8':
			return 1;
		case 'I16':
			return 2;
		case 'I32':
			return 4;
		case 'U8':
			return 1;
		case 'U16':
			return 2;
		case 'U32':
			return 4;
		case 'F32':
			return 4;
		case 'F64':
			return 8;
		case 'Seq':
			var w = builder.a;
			return w;
		case 'Utf8':
			var w = builder.a;
			return w;
		default:
			var bs = builder.a;
			return _Bytes_width(bs);
	}
};
var $elm$bytes$Bytes$LE = {$: 'LE'};
var $elm$bytes$Bytes$Encode$write$ = function (builder, mb, offset) {
	switch (builder.$) {
		case 'I8':
			var n = builder.a;
			return A3(_Bytes_write_i8, mb, offset, n);
		case 'I16':
			var e = builder.a;
			var n = builder.b;
			return A4(
				_Bytes_write_i16,
				mb,
				offset,
				n,
				_Utils_eq(e, $elm$bytes$Bytes$LE));
		case 'I32':
			var e = builder.a;
			var n = builder.b;
			return A4(
				_Bytes_write_i32,
				mb,
				offset,
				n,
				_Utils_eq(e, $elm$bytes$Bytes$LE));
		case 'U8':
			var n = builder.a;
			return A3(_Bytes_write_u8, mb, offset, n);
		case 'U16':
			var e = builder.a;
			var n = builder.b;
			return A4(
				_Bytes_write_u16,
				mb,
				offset,
				n,
				_Utils_eq(e, $elm$bytes$Bytes$LE));
		case 'U32':
			var e = builder.a;
			var n = builder.b;
			return A4(
				_Bytes_write_u32,
				mb,
				offset,
				n,
				_Utils_eq(e, $elm$bytes$Bytes$LE));
		case 'F32':
			var e = builder.a;
			var n = builder.b;
			return A4(
				_Bytes_write_f32,
				mb,
				offset,
				n,
				_Utils_eq(e, $elm$bytes$Bytes$LE));
		case 'F64':
			var e = builder.a;
			var n = builder.b;
			return A4(
				_Bytes_write_f64,
				mb,
				offset,
				n,
				_Utils_eq(e, $elm$bytes$Bytes$LE));
		case 'Seq':
			var bs = builder.b;
			return $elm$bytes$Bytes$Encode$writeSequence$(bs, mb, offset);
		case 'Utf8':
			var s = builder.b;
			return A3(_Bytes_write_string, mb, offset, s);
		default:
			var bs = builder.a;
			return A3(_Bytes_write_bytes, mb, offset, bs);
	}
};
var $elm$bytes$Bytes$Encode$write = F3($elm$bytes$Bytes$Encode$write$);
var $elm$bytes$Bytes$Encode$writeSequence$ = function (builders, mb, offset) {
	writeSequence:
	while (true) {
		if (!builders.b) {
			return offset;
		} else {
			var b = builders.a;
			var bs = builders.b;
			var $temp$builders = bs,
				$temp$offset = $elm$bytes$Bytes$Encode$write$(b, mb, offset);
			builders = $temp$builders;
			offset = $temp$offset;
			continue writeSequence;
		}
	}
};
var $elm$bytes$Bytes$Encode$writeSequence = F3($elm$bytes$Bytes$Encode$writeSequence$);
var $elm$bytes$Bytes$Decode$decode$ = function (_v0, bs) {
	var decoder = _v0.a;
	return A2(_Bytes_decode, decoder, bs);
};
var $elm$bytes$Bytes$Decode$decode = F2($elm$bytes$Bytes$Decode$decode$);
var $elm$bytes$Bytes$Encode$encode = _Bytes_encode;
var $elm$bytes$Bytes$Decode$Decoder = function (a) {
	return {$: 'Decoder', a: a};
};
var $elm$bytes$Bytes$Decode$loopHelp$ = function (state, callback, bites, offset) {
	loopHelp:
	while (true) {
		var _v0 = callback(state);
		var decoder = _v0.a;
		var _v1 = A2(decoder, bites, offset);
		var newOffset = _v1.a;
		var step = _v1.b;
		if (step.$ === 'Loop') {
			var newState = step.a;
			var $temp$state = newState,
				$temp$offset = newOffset;
			state = $temp$state;
			offset = $temp$offset;
			continue loopHelp;
		} else {
			var result = step.a;
			return _Utils_Tuple2(newOffset, result);
		}
	}
};
var $elm$bytes$Bytes$Decode$loopHelp = F4($elm$bytes$Bytes$Decode$loopHelp$);
var $elm$bytes$Bytes$Decode$loop$ = function (state, callback) {
	return $elm$bytes$Bytes$Decode$Decoder(
		A2($elm$bytes$Bytes$Decode$loopHelp, state, callback));
};
var $elm$bytes$Bytes$Decode$loop = F2($elm$bytes$Bytes$Decode$loop$);
var $elm$bytes$Bytes$Decode$Done = function (a) {
	return {$: 'Done', a: a};
};
var $elm$bytes$Bytes$Decode$Loop = function (a) {
	return {$: 'Loop', a: a};
};
var $elm$core$String$cons = _String_cons;
var $elm$core$String$fromChar = function (_char) {
	return A2($elm$core$String$cons, _char, '');
};
var $danfishgold$base64_bytes$Decode$lowest6BitsMask = 63;
var $elm$core$Char$fromCode = _Char_fromCode;
var $danfishgold$base64_bytes$Decode$unsafeToChar = function (n) {
	if (n <= 25) {
		return $elm$core$Char$fromCode(65 + n);
	} else {
		if (n <= 51) {
			return $elm$core$Char$fromCode(97 + (n - 26));
		} else {
			if (n <= 61) {
				return $elm$core$Char$fromCode(48 + (n - 52));
			} else {
				switch (n) {
					case 62:
						return _Utils_chr('+');
					case 63:
						return _Utils_chr('/');
					default:
						return _Utils_chr('\u0000');
				}
			}
		}
	}
};
var $danfishgold$base64_bytes$Decode$bitsToChars$ = function (bits, missing) {
	var s = $danfishgold$base64_bytes$Decode$unsafeToChar(bits & $danfishgold$base64_bytes$Decode$lowest6BitsMask);
	var r = $danfishgold$base64_bytes$Decode$unsafeToChar((bits >>> 6) & $danfishgold$base64_bytes$Decode$lowest6BitsMask);
	var q = $danfishgold$base64_bytes$Decode$unsafeToChar((bits >>> 12) & $danfishgold$base64_bytes$Decode$lowest6BitsMask);
	var p = $danfishgold$base64_bytes$Decode$unsafeToChar(bits >>> 18);
	switch (missing) {
		case 0:
			return A2(
				$elm$core$String$cons,
				p,
				A2(
					$elm$core$String$cons,
					q,
					A2(
						$elm$core$String$cons,
						r,
						$elm$core$String$fromChar(s))));
		case 1:
			return A2(
				$elm$core$String$cons,
				p,
				A2(
					$elm$core$String$cons,
					q,
					A2($elm$core$String$cons, r, '=')));
		case 2:
			return A2(
				$elm$core$String$cons,
				p,
				A2($elm$core$String$cons, q, '=='));
		default:
			return '';
	}
};
var $danfishgold$base64_bytes$Decode$bitsToChars = F2($danfishgold$base64_bytes$Decode$bitsToChars$);
var $danfishgold$base64_bytes$Decode$bitsToCharSpecialized$ = function (bits1, bits2, bits3, accum) {
	var z = $danfishgold$base64_bytes$Decode$unsafeToChar((bits3 >>> 6) & $danfishgold$base64_bytes$Decode$lowest6BitsMask);
	var y = $danfishgold$base64_bytes$Decode$unsafeToChar((bits3 >>> 12) & $danfishgold$base64_bytes$Decode$lowest6BitsMask);
	var x = $danfishgold$base64_bytes$Decode$unsafeToChar(bits3 >>> 18);
	var w = $danfishgold$base64_bytes$Decode$unsafeToChar(bits3 & $danfishgold$base64_bytes$Decode$lowest6BitsMask);
	var s = $danfishgold$base64_bytes$Decode$unsafeToChar(bits1 & $danfishgold$base64_bytes$Decode$lowest6BitsMask);
	var r = $danfishgold$base64_bytes$Decode$unsafeToChar((bits1 >>> 6) & $danfishgold$base64_bytes$Decode$lowest6BitsMask);
	var q = $danfishgold$base64_bytes$Decode$unsafeToChar((bits1 >>> 12) & $danfishgold$base64_bytes$Decode$lowest6BitsMask);
	var p = $danfishgold$base64_bytes$Decode$unsafeToChar(bits1 >>> 18);
	var d = $danfishgold$base64_bytes$Decode$unsafeToChar(bits2 & $danfishgold$base64_bytes$Decode$lowest6BitsMask);
	var c = $danfishgold$base64_bytes$Decode$unsafeToChar((bits2 >>> 6) & $danfishgold$base64_bytes$Decode$lowest6BitsMask);
	var b = $danfishgold$base64_bytes$Decode$unsafeToChar((bits2 >>> 12) & $danfishgold$base64_bytes$Decode$lowest6BitsMask);
	var a = $danfishgold$base64_bytes$Decode$unsafeToChar(bits2 >>> 18);
	return A2(
		$elm$core$String$cons,
		x,
		A2(
			$elm$core$String$cons,
			y,
			A2(
				$elm$core$String$cons,
				z,
				A2(
					$elm$core$String$cons,
					w,
					A2(
						$elm$core$String$cons,
						a,
						A2(
							$elm$core$String$cons,
							b,
							A2(
								$elm$core$String$cons,
								c,
								A2(
									$elm$core$String$cons,
									d,
									A2(
										$elm$core$String$cons,
										p,
										A2(
											$elm$core$String$cons,
											q,
											A2(
												$elm$core$String$cons,
												r,
												A2($elm$core$String$cons, s, accum))))))))))));
};
var $danfishgold$base64_bytes$Decode$bitsToCharSpecialized = F4($danfishgold$base64_bytes$Decode$bitsToCharSpecialized$);
var $danfishgold$base64_bytes$Decode$decode18Help$ = function (a, b, c, d, e) {
	var combined6 = ((255 & d) << 16) | e;
	var combined5 = d >>> 8;
	var combined4 = 16777215 & c;
	var combined3 = ((65535 & b) << 8) | (c >>> 24);
	var combined2 = ((255 & a) << 16) | (b >>> 16);
	var combined1 = a >>> 8;
	return $danfishgold$base64_bytes$Decode$bitsToCharSpecialized$(
		combined3,
		combined2,
		combined1,
		$danfishgold$base64_bytes$Decode$bitsToCharSpecialized$(combined6, combined5, combined4, ''));
};
var $danfishgold$base64_bytes$Decode$decode18Help = F5($danfishgold$base64_bytes$Decode$decode18Help$);
var $elm$bytes$Bytes$Decode$map5$ = function (func, _v0, _v1, _v2, _v3, _v4) {
	var decodeA = _v0.a;
	var decodeB = _v1.a;
	var decodeC = _v2.a;
	var decodeD = _v3.a;
	var decodeE = _v4.a;
	return $elm$bytes$Bytes$Decode$Decoder(
		F2(
			function (bites, offset) {
				var _v5 = A2(decodeA, bites, offset);
				var aOffset = _v5.a;
				var a = _v5.b;
				var _v6 = A2(decodeB, bites, aOffset);
				var bOffset = _v6.a;
				var b = _v6.b;
				var _v7 = A2(decodeC, bites, bOffset);
				var cOffset = _v7.a;
				var c = _v7.b;
				var _v8 = A2(decodeD, bites, cOffset);
				var dOffset = _v8.a;
				var d = _v8.b;
				var _v9 = A2(decodeE, bites, dOffset);
				var eOffset = _v9.a;
				var e = _v9.b;
				return _Utils_Tuple2(
					eOffset,
					A5(func, a, b, c, d, e));
			}));
};
var $elm$bytes$Bytes$Decode$map5 = F6($elm$bytes$Bytes$Decode$map5$);
var $elm$bytes$Bytes$BE = {$: 'BE'};
var $elm$bytes$Bytes$Decode$unsignedInt16 = function (endianness) {
	return $elm$bytes$Bytes$Decode$Decoder(
		_Bytes_read_u16(
			_Utils_eq(endianness, $elm$bytes$Bytes$LE)));
};
var $danfishgold$base64_bytes$Decode$u16BE = $elm$bytes$Bytes$Decode$unsignedInt16($elm$bytes$Bytes$BE);
var $elm$bytes$Bytes$Decode$unsignedInt32 = function (endianness) {
	return $elm$bytes$Bytes$Decode$Decoder(
		_Bytes_read_u32(
			_Utils_eq(endianness, $elm$bytes$Bytes$LE)));
};
var $danfishgold$base64_bytes$Decode$u32BE = $elm$bytes$Bytes$Decode$unsignedInt32($elm$bytes$Bytes$BE);
var $danfishgold$base64_bytes$Decode$decode18Bytes = $elm$bytes$Bytes$Decode$map5$($danfishgold$base64_bytes$Decode$decode18Help, $danfishgold$base64_bytes$Decode$u32BE, $danfishgold$base64_bytes$Decode$u32BE, $danfishgold$base64_bytes$Decode$u32BE, $danfishgold$base64_bytes$Decode$u32BE, $danfishgold$base64_bytes$Decode$u16BE);
var $elm$bytes$Bytes$Decode$map$ = function (func, _v0) {
	var decodeA = _v0.a;
	return $elm$bytes$Bytes$Decode$Decoder(
		F2(
			function (bites, offset) {
				var _v1 = A2(decodeA, bites, offset);
				var aOffset = _v1.a;
				var a = _v1.b;
				return _Utils_Tuple2(
					aOffset,
					func(a));
			}));
};
var $elm$bytes$Bytes$Decode$map = F2($elm$bytes$Bytes$Decode$map$);
var $elm$bytes$Bytes$Decode$map2$ = function (func, _v0, _v1) {
	var decodeA = _v0.a;
	var decodeB = _v1.a;
	return $elm$bytes$Bytes$Decode$Decoder(
		F2(
			function (bites, offset) {
				var _v2 = A2(decodeA, bites, offset);
				var aOffset = _v2.a;
				var a = _v2.b;
				var _v3 = A2(decodeB, bites, aOffset);
				var bOffset = _v3.a;
				var b = _v3.b;
				return _Utils_Tuple2(
					bOffset,
					A2(func, a, b));
			}));
};
var $elm$bytes$Bytes$Decode$map2 = F3($elm$bytes$Bytes$Decode$map2$);
var $elm$bytes$Bytes$Decode$map3$ = function (func, _v0, _v1, _v2) {
	var decodeA = _v0.a;
	var decodeB = _v1.a;
	var decodeC = _v2.a;
	return $elm$bytes$Bytes$Decode$Decoder(
		F2(
			function (bites, offset) {
				var _v3 = A2(decodeA, bites, offset);
				var aOffset = _v3.a;
				var a = _v3.b;
				var _v4 = A2(decodeB, bites, aOffset);
				var bOffset = _v4.a;
				var b = _v4.b;
				var _v5 = A2(decodeC, bites, bOffset);
				var cOffset = _v5.a;
				var c = _v5.b;
				return _Utils_Tuple2(
					cOffset,
					A3(func, a, b, c));
			}));
};
var $elm$bytes$Bytes$Decode$map3 = F4($elm$bytes$Bytes$Decode$map3$);
var $elm$bytes$Bytes$Decode$succeed = function (a) {
	return $elm$bytes$Bytes$Decode$Decoder(
		F2(
			function (_v0, offset) {
				return _Utils_Tuple2(offset, a);
			}));
};
var $elm$bytes$Bytes$Decode$unsignedInt8 = $elm$bytes$Bytes$Decode$Decoder(_Bytes_read_u8);
var $danfishgold$base64_bytes$Decode$loopHelp = function (_v0) {
	var string = _v0.string;
	var remaining = _v0.remaining;
	if (remaining >= 18) {
		return $elm$bytes$Bytes$Decode$map$(
			function (result) {
				return $elm$bytes$Bytes$Decode$Loop(
					{
						remaining: remaining - 18,
						string: _Utils_ap(string, result)
					});
			},
			$danfishgold$base64_bytes$Decode$decode18Bytes);
	} else {
		if (remaining >= 3) {
			var helper = F3(
				function (a, b, c) {
					var combined = ((a << 16) | (b << 8)) | c;
					return $elm$bytes$Bytes$Decode$Loop(
						{
							remaining: remaining - 3,
							string: _Utils_ap(
								string,
								$danfishgold$base64_bytes$Decode$bitsToChars$(combined, 0))
						});
				});
			return $elm$bytes$Bytes$Decode$map3$(helper, $elm$bytes$Bytes$Decode$unsignedInt8, $elm$bytes$Bytes$Decode$unsignedInt8, $elm$bytes$Bytes$Decode$unsignedInt8);
		} else {
			if (!remaining) {
				return $elm$bytes$Bytes$Decode$succeed(
					$elm$bytes$Bytes$Decode$Done(string));
			} else {
				if (remaining === 2) {
					var helper = F2(
						function (a, b) {
							var combined = (a << 16) | (b << 8);
							return $elm$bytes$Bytes$Decode$Done(
								_Utils_ap(
									string,
									$danfishgold$base64_bytes$Decode$bitsToChars$(combined, 1)));
						});
					return $elm$bytes$Bytes$Decode$map2$(helper, $elm$bytes$Bytes$Decode$unsignedInt8, $elm$bytes$Bytes$Decode$unsignedInt8);
				} else {
					return $elm$bytes$Bytes$Decode$map$(
						function (a) {
							return $elm$bytes$Bytes$Decode$Done(
								_Utils_ap(
									string,
									$danfishgold$base64_bytes$Decode$bitsToChars$(a << 16, 2)));
						},
						$elm$bytes$Bytes$Decode$unsignedInt8);
				}
			}
		}
	}
};
var $danfishgold$base64_bytes$Decode$decoder = function (width) {
	return $elm$bytes$Bytes$Decode$loop$(
		{remaining: width, string: ''},
		$danfishgold$base64_bytes$Decode$loopHelp);
};
var $elm$bytes$Bytes$width = _Bytes_width;
var $danfishgold$base64_bytes$Decode$fromBytes = function (bytes) {
	return $elm$bytes$Bytes$Decode$decode$(
		$danfishgold$base64_bytes$Decode$decoder(
			$elm$bytes$Bytes$width(bytes)),
		bytes);
};
var $danfishgold$base64_bytes$Base64$fromBytes = $danfishgold$base64_bytes$Decode$fromBytes;
var $elm$bytes$Bytes$Encode$Utf8$ = function (a, b) {
	return {$: 'Utf8', a: a, b: b};
};
var $elm$bytes$Bytes$Encode$Utf8 = F2($elm$bytes$Bytes$Encode$Utf8$);
var $elm$bytes$Bytes$Encode$string = function (str) {
	return $elm$bytes$Bytes$Encode$Utf8$(
		_Bytes_getStringWidth(str),
		str);
};
var $danfishgold$base64_bytes$Base64$fromString = function (string) {
	return $danfishgold$base64_bytes$Base64$fromBytes(
		$elm$bytes$Bytes$Encode$encode(
			$elm$bytes$Bytes$Encode$string(string)));
};
var $elm_explorations$test$Test$Runner$getFailureReason = function (expectation) {
	if (expectation.$ === 'Pass') {
		return $elm$core$Maybe$Nothing;
	} else {
		var record = expectation.a;
		return $elm$core$Maybe$Just(
			{description: record.description, given: record.given, reason: record.reason});
	}
};
var $elm_explorations$test$Test$Html$Query$Internal$baseIndentation = '    ';
var $elm_explorations$test$Test$Html$Query$Internal$prefixOutputLine = $elm$core$Basics$append('▼ ');
var $elm_explorations$test$Test$Html$Query$Internal$toOutputLine = function (query) {
	if (query.$ === 'Query') {
		var node = query.a;
		return $elm_explorations$test$Test$Html$Query$Internal$prettyPrint(
			$elm_explorations$test$Test$Html$Internal$Inert$toElmHtml(node));
	} else {
		var message = query.a;
		return 'Internal Error: failed to decode the virtual dom.  Please report this at <https://github.com/elm-explorations/test/issues>.  ' + message;
	}
};
var $elm_explorations$test$Test$Html$Query$Internal$addQueryFromHtmlLine = function (query) {
	return $elm$core$String$join$(
		'\n\n',
		_List_fromArray(
			[
				$elm_explorations$test$Test$Html$Query$Internal$prefixOutputLine('Query.fromHtml'),
				$elm$core$String$join$(
				'\n',
				$elm$core$List$map$(
					$elm$core$Basics$append($elm_explorations$test$Test$Html$Query$Internal$baseIndentation),
					$elm$core$String$split$(
						'\n',
						$elm_explorations$test$Test$Html$Query$Internal$toOutputLine(query))))
			]));
};
var $elm_explorations$test$Test$Runner$Failure$Custom = {$: 'Custom'};
var $elm_explorations$test$Test$Expectation$Fail = function (a) {
	return {$: 'Fail', a: a};
};
var $elm_explorations$test$Test$Distribution$NoDistribution = {$: 'NoDistribution'};
var $elm_explorations$test$Test$Expectation$fail = function (_v0) {
	var reason = _v0.reason;
	var description = _v0.description;
	return $elm_explorations$test$Test$Expectation$Fail(
		{description: description, distributionReport: $elm_explorations$test$Test$Distribution$NoDistribution, given: $elm$core$Maybe$Nothing, reason: reason});
};
var $elm_explorations$test$Expect$fail = function (str) {
	return $elm_explorations$test$Test$Expectation$fail(
		{description: str, reason: $elm_explorations$test$Test$Runner$Failure$Custom});
};
var $elm$core$String$append = _String_append;
var $elm$core$String$padRight$ = function (n, _char, string) {
	return _Utils_ap(
		string,
		$elm$core$String$repeat$(
			n - $elm$core$String$length(string),
			$elm$core$String$fromChar(_char)));
};
var $elm$core$String$padRight = F3($elm$core$String$padRight$);
var $elm_explorations$test$Test$Html$Query$Internal$printIndented$ = function (maxDigits, index, elmHtml) {
	var caption = A2(
		$elm$core$String$append,
		$elm_explorations$test$Test$Html$Query$Internal$baseIndentation,
		$elm$core$String$padRight$(
			maxDigits + 3,
			_Utils_chr(' '),
			$elm$core$String$fromInt(index + 1) + ')'));
	var indentation = $elm$core$String$repeat$(
		$elm$core$String$length(caption),
		' ');
	var _v0 = $elm$core$String$split$(
		'\n',
		$elm_explorations$test$Test$Html$Query$Internal$prettyPrint(elmHtml));
	if (!_v0.b) {
		return '';
	} else {
		var first = _v0.a;
		var rest = _v0.b;
		return $elm$core$String$join$(
			'\n',
			A2(
				$elm$core$List$cons,
				_Utils_ap(caption, first),
				$elm$core$List$map$(
					$elm$core$String$append(indentation),
					rest)));
	}
};
var $elm_explorations$test$Test$Html$Query$Internal$printIndented = F3($elm_explorations$test$Test$Html$Query$Internal$printIndented$);
var $elm_explorations$test$Test$Html$Query$Internal$getHtmlContext = function (elmHtmlList) {
	if ($elm$core$List$isEmpty(elmHtmlList)) {
		return '0 matches found for this query.';
	} else {
		var maxDigits = $elm$core$String$length(
			$elm$core$String$fromInt(
				$elm$core$List$length(elmHtmlList)));
		return $elm$core$String$join$(
			'\n\n',
			$elm$core$List$indexedMap$(
				$elm_explorations$test$Test$Html$Query$Internal$printIndented(maxDigits),
				elmHtmlList));
	}
};
var $elm_explorations$test$Test$Html$Query$Internal$joinAsList$ = function (toStr, list) {
	return $elm$core$List$isEmpty(list) ? '[]' : ('[ ' + ($elm$core$String$join$(
		', ',
		$elm$core$List$map$(toStr, list)) + ' ]'));
};
var $elm_explorations$test$Test$Html$Query$Internal$joinAsList = F2($elm_explorations$test$Test$Html$Query$Internal$joinAsList$);
var $elm_explorations$test$Test$Html$Selector$Internal$styleToString = function (_v0) {
	var value = _v0.value;
	var key = _v0.key;
	return key + (':' + value);
};
var $elm_explorations$test$Test$Html$Selector$Internal$selectorToString = function (criteria) {
	var quoteString = function (s) {
		return '\"' + (s + '\"');
	};
	var boolToString = function (b) {
		if (b) {
			return 'True';
		} else {
			return 'False';
		}
	};
	switch (criteria.$) {
		case 'All':
			var list = criteria.a;
			return $elm$core$String$join$(
				' ',
				$elm$core$List$map$($elm_explorations$test$Test$Html$Selector$Internal$selectorToString, list));
		case 'Classes':
			var list = criteria.a;
			return 'classes ' + quoteString(
				$elm$core$String$join$(' ', list));
		case 'Class':
			var _class = criteria.a;
			return 'class ' + quoteString(_class);
		case 'Attribute':
			var value = criteria.a.value;
			var name = criteria.a.name;
			return 'attribute ' + (quoteString(name) + (' ' + quoteString(value)));
		case 'BoolAttribute':
			var value = criteria.a.value;
			var name = criteria.a.name;
			return 'attribute ' + (quoteString(name) + (' ' + boolToString(value)));
		case 'Style':
			var style = criteria.a;
			return 'styles ' + $elm_explorations$test$Test$Html$Selector$Internal$styleToString(style);
		case 'Tag':
			var name = criteria.a;
			return 'tag ' + quoteString(name);
		case 'Text':
			var text = criteria.a;
			return 'text ' + quoteString(text);
		case 'ExactText':
			var text = criteria.a;
			return 'exact text ' + quoteString(text);
		case 'Containing':
			var list = criteria.a;
			var selectors = $elm$core$String$join$(
				', ',
				$elm$core$List$map$($elm_explorations$test$Test$Html$Selector$Internal$selectorToString, list));
			return 'containing [ ' + (selectors + ' ] ');
		default:
			return 'invalid';
	}
};
var $elm_explorations$test$Test$Html$Query$Internal$withHtmlContext$ = function (htmlStr, str) {
	return $elm$core$String$join$(
		'\n\n',
		_List_fromArray(
			[str, htmlStr]));
};
var $elm_explorations$test$Test$Html$Query$Internal$withHtmlContext = F2($elm_explorations$test$Test$Html$Query$Internal$withHtmlContext$);
var $elm_explorations$test$Test$Html$Query$Internal$toLinesHelp$ = function (expectationFailure, elmHtmlList, selectorQueries, queryName, results) {
	var recurse = F3(
		function (newElmHtmlList, rest, result) {
			return $elm_explorations$test$Test$Html$Query$Internal$toLinesHelp$(
				expectationFailure,
				newElmHtmlList,
				rest,
				queryName,
				A2($elm$core$List$cons, result, results));
		});
	var bailOut = function (result) {
		return A2(
			$elm$core$List$cons,
			$elm$core$String$join$(
				'\n\n\n✗ ',
				_List_fromArray(
					[result, expectationFailure])),
			results);
	};
	if (!selectorQueries.b) {
		return A2(
			$elm$core$List$cons,
			$elm$core$String$join$(
				'\n\n',
				_List_fromArray(
					[queryName, expectationFailure])),
			results);
	} else {
		var selectorQuery = selectorQueries.a;
		var rest = selectorQueries.b;
		switch (selectorQuery.$) {
			case 'FindAll':
				var selectors = selectorQuery.a;
				var elements = $elm_explorations$test$Test$Html$Selector$Internal$queryAll$(
					selectors,
					$elm$core$List$concatMap$($elm_explorations$test$Test$Html$Query$Internal$getChildren, elmHtmlList));
				return A3(
					recurse,
					elements,
					rest,
					$elm_explorations$test$Test$Html$Query$Internal$withHtmlContext$(
						$elm_explorations$test$Test$Html$Query$Internal$getHtmlContext(elements),
						'Query.findAll ' + $elm_explorations$test$Test$Html$Query$Internal$joinAsList$($elm_explorations$test$Test$Html$Selector$Internal$selectorToString, selectors)));
			case 'Find':
				var selectors = selectorQuery.a;
				var elements = $elm_explorations$test$Test$Html$Selector$Internal$queryAll$(
					selectors,
					$elm$core$List$concatMap$($elm_explorations$test$Test$Html$Query$Internal$getChildren, elmHtmlList));
				var result = $elm_explorations$test$Test$Html$Query$Internal$withHtmlContext$(
					$elm_explorations$test$Test$Html$Query$Internal$getHtmlContext(elements),
					'Query.find ' + $elm_explorations$test$Test$Html$Query$Internal$joinAsList$($elm_explorations$test$Test$Html$Selector$Internal$selectorToString, selectors));
				return ($elm$core$List$length(elements) === 1) ? A3(recurse, elements, rest, result) : bailOut(result);
			case 'Children':
				var selectors = selectorQuery.a;
				var elements = $elm_explorations$test$Test$Html$Selector$Internal$queryAllChildren$(
					selectors,
					$elm$core$List$concatMap$($elm_explorations$test$Test$Html$Query$Internal$getChildren, elmHtmlList));
				return A3(
					recurse,
					elements,
					rest,
					$elm_explorations$test$Test$Html$Query$Internal$withHtmlContext$(
						$elm_explorations$test$Test$Html$Query$Internal$getHtmlContext(elements),
						'Query.children ' + $elm_explorations$test$Test$Html$Query$Internal$joinAsList$($elm_explorations$test$Test$Html$Selector$Internal$selectorToString, selectors)));
			case 'First':
				var elements = $elm$core$Maybe$withDefault$(
					_List_Nil,
					$elm$core$Maybe$map$(
						function (elem) {
							return _List_fromArray(
								[elem]);
						},
						$elm$core$List$head(elmHtmlList)));
				var result = $elm_explorations$test$Test$Html$Query$Internal$withHtmlContext$(
					$elm_explorations$test$Test$Html$Query$Internal$getHtmlContext(elements),
					'Query.first');
				return ($elm$core$List$length(elements) === 1) ? A3(recurse, elements, rest, result) : bailOut(result);
			default:
				var index = selectorQuery.a;
				var elements = $elm_explorations$test$Test$Html$Query$Internal$getElementAt$(index, elmHtmlList);
				var result = $elm_explorations$test$Test$Html$Query$Internal$withHtmlContext$(
					$elm_explorations$test$Test$Html$Query$Internal$getHtmlContext(elements),
					'Query.index ' + $elm$core$String$fromInt(index));
				return ($elm$core$List$length(elements) === 1) ? A3(recurse, elements, rest, result) : bailOut(result);
		}
	}
};
var $elm_explorations$test$Test$Html$Query$Internal$toLinesHelp = F5($elm_explorations$test$Test$Html$Query$Internal$toLinesHelp$);
var $elm_explorations$test$Test$Html$Query$Internal$toLines$ = function (expectationFailure, query, queryName) {
	if (query.$ === 'Query') {
		var node = query.a;
		var selectors = query.b;
		return $elm$core$List$reverse(
			$elm_explorations$test$Test$Html$Query$Internal$toLinesHelp$(
				expectationFailure,
				_List_fromArray(
					[
						$elm_explorations$test$Test$Html$Internal$Inert$toElmHtml(node)
					]),
				$elm$core$List$reverse(selectors),
				queryName,
				_List_Nil));
	} else {
		var message = query.a;
		return _List_fromArray(
			['Internal Error: failed to decode the virtual dom.  Please report this at <https://github.com/elm-explorations/test/issues>', message]);
	}
};
var $elm_explorations$test$Test$Html$Query$Internal$toLines = F3($elm_explorations$test$Test$Html$Query$Internal$toLines$);
var $elm_explorations$test$Test$Html$Query$Internal$failWithQuery$ = function (showTrace, queryName, query, expectation) {
	var _v0 = $elm_explorations$test$Test$Runner$getFailureReason(expectation);
	if (_v0.$ === 'Just') {
		var description = _v0.a.description;
		var lines = $elm$core$List$map$(
			$elm_explorations$test$Test$Html$Query$Internal$prefixOutputLine,
			$elm_explorations$test$Test$Html$Query$Internal$toLines$(description, query, queryName));
		var tracedLines = showTrace ? A2(
			$elm$core$List$cons,
			$elm_explorations$test$Test$Html$Query$Internal$addQueryFromHtmlLine(query),
			lines) : lines;
		return $elm_explorations$test$Expect$fail(
			$elm$core$String$join$('\n\n\n', tracedLines));
	} else {
		return expectation;
	}
};
var $elm_explorations$test$Test$Html$Query$Internal$failWithQuery = F4($elm_explorations$test$Test$Html$Query$Internal$failWithQuery$);
var $elm_explorations$test$Test$Html$Selector$Internal$hasAll$ = function (selectors, elems) {
	hasAll:
	while (true) {
		if (!selectors.b) {
			return true;
		} else {
			var selector = selectors.a;
			var rest = selectors.b;
			if ($elm$core$List$isEmpty(
				$elm_explorations$test$Test$Html$Selector$Internal$queryAll$(
					_List_fromArray(
						[selector]),
					elems))) {
				return false;
			} else {
				var $temp$selectors = rest;
				selectors = $temp$selectors;
				continue hasAll;
			}
		}
	}
};
var $elm_explorations$test$Test$Html$Selector$Internal$hasAll = F2($elm_explorations$test$Test$Html$Selector$Internal$hasAll$);
var $elm_explorations$test$Test$Expectation$Pass = function (a) {
	return {$: 'Pass', a: a};
};
var $elm_explorations$test$Expect$pass = $elm_explorations$test$Test$Expectation$Pass(
	{distributionReport: $elm_explorations$test$Test$Distribution$NoDistribution});
var $elm_explorations$test$Test$Html$Query$Internal$showSelectorOutcome$ = function (elmHtmlList, selector) {
	var outcome = function () {
		var _v0 = $elm_explorations$test$Test$Html$Selector$Internal$queryAll$(
			_List_fromArray(
				[selector]),
			elmHtmlList);
		if (!_v0.b) {
			return '✗';
		} else {
			return '✓';
		}
	}();
	return $elm$core$String$join$(
		' ',
		_List_fromArray(
			[
				outcome,
				'has',
				$elm_explorations$test$Test$Html$Selector$Internal$selectorToString(selector)
			]));
};
var $elm_explorations$test$Test$Html$Query$Internal$showSelectorOutcome = F2($elm_explorations$test$Test$Html$Query$Internal$showSelectorOutcome$);
var $elm_explorations$test$Test$Html$Query$Internal$has$ = function (selectors, query) {
	var _v0 = $elm_explorations$test$Test$Html$Query$Internal$traverse(query);
	if (_v0.$ === 'Ok') {
		var elmHtmlList = _v0.a;
		return $elm_explorations$test$Test$Html$Selector$Internal$hasAll$(selectors, elmHtmlList) ? $elm_explorations$test$Expect$pass : $elm_explorations$test$Expect$fail(
			$elm$core$String$join$(
				'\n',
				$elm$core$List$map$(
					$elm_explorations$test$Test$Html$Query$Internal$showSelectorOutcome(elmHtmlList),
					selectors)));
	} else {
		var error = _v0.a;
		return $elm_explorations$test$Expect$fail(
			$elm_explorations$test$Test$Html$Query$Internal$queryErrorToString(error));
	}
};
var $elm_explorations$test$Test$Html$Query$Internal$has = F2($elm_explorations$test$Test$Html$Query$Internal$has$);
var $elm_explorations$test$Test$Html$Query$has$ = function (selectors, _v0) {
	var showTrace = _v0.a;
	var query = _v0.b;
	return $elm_explorations$test$Test$Html$Query$Internal$failWithQuery$(
		showTrace,
		'Query.has ' + $elm_explorations$test$Test$Html$Query$Internal$joinAsList$($elm_explorations$test$Test$Html$Selector$Internal$selectorToString, selectors),
		query,
		$elm_explorations$test$Test$Html$Query$Internal$has$(selectors, query));
};
var $elm_explorations$test$Test$Html$Query$has = F2($elm_explorations$test$Test$Html$Query$has$);
var $lamdera$program_test$Effect$Test$BytesBody$ = function (a, b) {
	return {$: 'BytesBody', a: a, b: b};
};
var $lamdera$program_test$Effect$Test$BytesBody = F2($lamdera$program_test$Effect$Test$BytesBody$);
var $lamdera$program_test$Effect$Test$FileBody = function (a) {
	return {$: 'FileBody', a: a};
};
var $lamdera$program_test$Effect$Test$JsonBody = function (a) {
	return {$: 'JsonBody', a: a};
};
var $lamdera$program_test$Effect$Test$MultipartBody = function (a) {
	return {$: 'MultipartBody', a: a};
};
var $lamdera$program_test$Effect$Test$StringBody = function (a) {
	return {$: 'StringBody', a: a};
};
var $lamdera$program_test$Effect$Test$BytesPart = function (a) {
	return {$: 'BytesPart', a: a};
};
var $lamdera$program_test$Effect$Test$FilePart$ = function (a, b) {
	return {$: 'FilePart', a: a, b: b};
};
var $lamdera$program_test$Effect$Test$FilePart = F2($lamdera$program_test$Effect$Test$FilePart$);
var $lamdera$program_test$Effect$Test$StringPart$ = function (a, b) {
	return {$: 'StringPart', a: a, b: b};
};
var $lamdera$program_test$Effect$Test$StringPart = F2($lamdera$program_test$Effect$Test$StringPart$);
var $lamdera$program_test$Effect$Test$httpPartFromInternal = function (part) {
	switch (part.$) {
		case 'StringPart':
			var a = part.a;
			var b = part.b;
			return $lamdera$program_test$Effect$Test$StringPart$(a, b);
		case 'FilePart':
			var string = part.a;
			var file = part.b;
			return $lamdera$program_test$Effect$Test$FilePart$(string, file);
		default:
			var key = part.a;
			var mimeType = part.b;
			var bytes = part.c;
			return $lamdera$program_test$Effect$Test$BytesPart(
				{content: bytes, key: key, mimeType: mimeType});
	}
};
var $lamdera$program_test$Effect$Test$httpBodyFromInternal = function (body) {
	switch (body.$) {
		case 'EmptyBody':
			return $lamdera$program_test$Effect$Test$EmptyBody;
		case 'StringBody':
			var record = body.a;
			return $lamdera$program_test$Effect$Test$StringBody(record);
		case 'JsonBody':
			var value = body.a;
			return $lamdera$program_test$Effect$Test$JsonBody(value);
		case 'MultipartBody':
			var httpParts = body.a;
			return $lamdera$program_test$Effect$Test$MultipartBody(
				$elm$core$List$map$($lamdera$program_test$Effect$Test$httpPartFromInternal, httpParts));
		case 'BytesBody':
			var string = body.a;
			var bytes = body.b;
			return $lamdera$program_test$Effect$Test$BytesBody$(string, bytes);
		default:
			var file = body.a;
			return $lamdera$program_test$Effect$Test$FileBody(file);
	}
};
var $elm_explorations$linear_algebra$Math$Matrix4$identity = _MJS_m4x4identity;
var $elm$bytes$Bytes$Encode$Seq$ = function (a, b) {
	return {$: 'Seq', a: a, b: b};
};
var $elm$bytes$Bytes$Encode$Seq = F2($elm$bytes$Bytes$Encode$Seq$);
var $elm$bytes$Bytes$Encode$getWidths$ = function (width, builders) {
	getWidths:
	while (true) {
		if (!builders.b) {
			return width;
		} else {
			var b = builders.a;
			var bs = builders.b;
			var $temp$width = width + $elm$bytes$Bytes$Encode$getWidth(b),
				$temp$builders = bs;
			width = $temp$width;
			builders = $temp$builders;
			continue getWidths;
		}
	}
};
var $elm$bytes$Bytes$Encode$getWidths = F2($elm$bytes$Bytes$Encode$getWidths$);
var $elm$bytes$Bytes$Encode$sequence = function (builders) {
	return $elm$bytes$Bytes$Encode$Seq$(
		$elm$bytes$Bytes$Encode$getWidths$(0, builders),
		builders);
};
var $lamdera$program_test$Effect$Test$stateToData = function (state) {
	return {
		backend: state.model,
		downloads: state.downloads,
		fileUploads: state.fileUploads,
		frontends: $lamdera$containers$SeqDict$map$(
			F2(
				function (_v0, frontend) {
					return frontend.model;
				}),
			state.frontends),
		httpRequests: state.httpRequests,
		multipleFileUploads: state.multipleFileUploads,
		portRequests: state.portRequests,
		time: $lamdera$program_test$Effect$Test$currentTime(state)
	};
};
var $elm$bytes$Bytes$Decode$string = function (n) {
	return $elm$bytes$Bytes$Decode$Decoder(
		_Bytes_read_string(n));
};
var $elm$time$Time$Zone$ = function (a, b) {
	return {$: 'Zone', a: a, b: b};
};
var $elm$time$Time$Zone = F2($elm$time$Time$Zone$);
var $elm$time$Time$utc = $elm$time$Time$Zone$(0, _List_Nil);
var $lamdera$program_test$Effect$Test$getDomTask$ = function (maybeClientId, state, htmlId, _function, value) {
	return $lamdera$program_test$Effect$Test$runTask$(
		maybeClientId,
		state,
		_function(
			function () {
				var _v16 = $elm$core$Maybe$andThen$(
					function (clientId) {
						return $lamdera$containers$SeqDict$get$(clientId, state.frontends);
					},
					maybeClientId);
				if (_v16.$ === 'Just') {
					var frontend = _v16.a;
					return function (a) {
						return _Utils_eq(a, $elm$core$Maybe$Nothing) ? $elm$core$Result$Err(
							$lamdera$program_test$Effect$Internal$BrowserDomNotFound(htmlId)) : $elm$core$Result$Ok(value);
					}(
						$elm_explorations$test$Test$Runner$getFailureReason(
							$elm_explorations$test$Test$Html$Query$has$(
								_List_fromArray(
									[
										$elm_explorations$test$Test$Html$Selector$id(htmlId)
									]),
								$elm_explorations$test$Test$Html$Query$fromHtml(
									A2(
										$elm$html$Html$div,
										_List_Nil,
										state.frontendApp.view(frontend.model).body)))));
				} else {
					return $elm$core$Result$Err(
						$lamdera$program_test$Effect$Internal$BrowserDomNotFound(htmlId));
				}
			}()));
};
var $lamdera$program_test$Effect$Test$getDomTask = F5($lamdera$program_test$Effect$Test$getDomTask$);
var $lamdera$program_test$Effect$Test$handleHttpResponseWithTestError$ = function (maybeClientId, request, httpRequest, error, state) {
	return $lamdera$program_test$Effect$Test$runTask$(
		maybeClientId,
		$lamdera$program_test$Effect$Test$addEvent$(
			$lamdera$program_test$Effect$Test$EffectFailedEvent$(maybeClientId, $lamdera$program_test$Effect$Test$HttpRequestFailed),
			$elm$core$Maybe$Just(
				error(request)),
			_Utils_update(
				state,
				{
					httpRequests: A2($elm$core$List$cons, request, state.httpRequests)
				})),
		httpRequest.onRequestComplete($elm$http$Http$NetworkError_));
};
var $lamdera$program_test$Effect$Test$handleHttpResponseWithTestError = F5($lamdera$program_test$Effect$Test$handleHttpResponseWithTestError$);
var $lamdera$program_test$Effect$Test$runTask$ = function (maybeClientId, state, task) {
	runTask:
	while (true) {
		switch (task.$) {
			case 'Succeed':
				var value = task.a;
				return _Utils_Tuple2(state, value);
			case 'Fail':
				var value = task.a;
				return _Utils_Tuple2(state, value);
			case 'HttpStringTask':
				var httpRequest = task.a;
				var request = {
					body: $lamdera$program_test$Effect$Test$httpBodyFromInternal(httpRequest.body),
					headers: httpRequest.headers,
					method: httpRequest.method,
					requestedBy: function () {
						if (maybeClientId.$ === 'Just') {
							var clientId = maybeClientId.a;
							return $lamdera$program_test$Effect$Test$RequestedByFrontend(clientId);
						} else {
							return $lamdera$program_test$Effect$Test$RequestedByBackend;
						}
					}(),
					sentAt: $lamdera$program_test$Effect$Test$currentTime(state),
					url: httpRequest.url
				};
				var handleResponse = function (a) {
					return $lamdera$program_test$Effect$Test$runTask$(
						maybeClientId,
						_Utils_update(
							state,
							{
								httpRequests: A2($elm$core$List$cons, request, state.httpRequests)
							}),
						httpRequest.onRequestComplete(a));
				};
				var _v1 = state.handleHttpRequest(
					{
						currentRequest: request,
						data: $lamdera$program_test$Effect$Test$stateToData(state)
					});
				switch (_v1.$) {
					case 'BadUrlResponse':
						var url = _v1.a;
						return handleResponse(
							$elm$http$Http$BadUrl_(url));
					case 'TimeoutResponse':
						return handleResponse($elm$http$Http$Timeout_);
					case 'NetworkErrorResponse':
						return handleResponse($elm$http$Http$NetworkError_);
					case 'BadStatusResponse':
						var metadata = _v1.a;
						var text2 = _v1.b;
						return handleResponse(
							$elm$http$Http$BadStatus_$(metadata, text2));
					case 'BytesHttpResponse':
						var metadata = _v1.a;
						var body = _v1.b;
						var _v2 = $elm$bytes$Bytes$Decode$decode$(
							$elm$bytes$Bytes$Decode$string(
								$elm$bytes$Bytes$width(body)),
							body);
						if (_v2.$ === 'Just') {
							var text2 = _v2.a;
							return handleResponse(
								$elm$http$Http$GoodStatus_$(metadata, text2));
						} else {
							return $lamdera$program_test$Effect$Test$handleHttpResponseWithTestError$(maybeClientId, request, httpRequest, $lamdera$program_test$Effect$Test$HttpResponseContainsBytesThatCantConvertToString, state);
						}
					case 'StringHttpResponse':
						var metadata = _v1.a;
						var text2 = _v1.b;
						return handleResponse(
							$elm$http$Http$GoodStatus_$(metadata, text2));
					case 'JsonHttpResponse':
						var metadata = _v1.a;
						var body = _v1.b;
						return handleResponse(
							$elm$http$Http$GoodStatus_$(
								metadata,
								A2($elm$json$Json$Encode$encode, 0, body)));
					case 'TextureHttpResponse':
						return $lamdera$program_test$Effect$Test$handleHttpResponseWithTestError$(maybeClientId, request, httpRequest, $lamdera$program_test$Effect$Test$HttpResponseCantConvertTextureToString, state);
					default:
						return $lamdera$program_test$Effect$Test$handleHttpResponseWithTestError$(maybeClientId, request, httpRequest, $lamdera$program_test$Effect$Test$HttpRequestNotHandled, state);
				}
			case 'HttpBytesTask':
				var httpRequest = task.a;
				var request = {
					body: $lamdera$program_test$Effect$Test$httpBodyFromInternal(httpRequest.body),
					headers: httpRequest.headers,
					method: httpRequest.method,
					requestedBy: function () {
						if (maybeClientId.$ === 'Just') {
							var clientId = maybeClientId.a;
							return $lamdera$program_test$Effect$Test$RequestedByFrontend(clientId);
						} else {
							return $lamdera$program_test$Effect$Test$RequestedByBackend;
						}
					}(),
					sentAt: $lamdera$program_test$Effect$Test$currentTime(state),
					url: httpRequest.url
				};
				var handleResponse = function (a) {
					return $lamdera$program_test$Effect$Test$runTask$(
						maybeClientId,
						_Utils_update(
							state,
							{
								httpRequests: A2($elm$core$List$cons, request, state.httpRequests)
							}),
						httpRequest.onRequestComplete(a));
				};
				var _v4 = state.handleHttpRequest(
					{
						currentRequest: request,
						data: $lamdera$program_test$Effect$Test$stateToData(state)
					});
				switch (_v4.$) {
					case 'BadUrlResponse':
						var url = _v4.a;
						return handleResponse(
							$elm$http$Http$BadUrl_(url));
					case 'TimeoutResponse':
						return handleResponse($elm$http$Http$Timeout_);
					case 'NetworkErrorResponse':
						return handleResponse($elm$http$Http$NetworkError_);
					case 'BadStatusResponse':
						var metadata = _v4.a;
						var text2 = _v4.b;
						return handleResponse(
							$elm$http$Http$BadStatus_$(
								metadata,
								$elm$bytes$Bytes$Encode$encode(
									$elm$bytes$Bytes$Encode$string(text2))));
					case 'BytesHttpResponse':
						var metadata = _v4.a;
						var body = _v4.b;
						return handleResponse(
							$elm$http$Http$GoodStatus_$(metadata, body));
					case 'StringHttpResponse':
						var metadata = _v4.a;
						var text2 = _v4.b;
						return handleResponse(
							$elm$http$Http$GoodStatus_$(
								metadata,
								$elm$bytes$Bytes$Encode$encode(
									$elm$bytes$Bytes$Encode$string(text2))));
					case 'JsonHttpResponse':
						var metadata = _v4.a;
						var body = _v4.b;
						return handleResponse(
							$elm$http$Http$GoodStatus_$(
								metadata,
								$elm$bytes$Bytes$Encode$encode(
									$elm$bytes$Bytes$Encode$string(
										A2($elm$json$Json$Encode$encode, 0, body)))));
					case 'TextureHttpResponse':
						return $lamdera$program_test$Effect$Test$handleHttpResponseWithTestError$(maybeClientId, request, httpRequest, $lamdera$program_test$Effect$Test$HttpResponseCantConvertTextureToString, state);
					default:
						return $lamdera$program_test$Effect$Test$handleHttpResponseWithTestError$(maybeClientId, request, httpRequest, $lamdera$program_test$Effect$Test$HttpRequestNotHandled, state);
				}
			case 'SleepTask':
				var _function = task.b;
				var $temp$task = _function(_Utils_Tuple0);
				task = $temp$task;
				continue runTask;
			case 'TimeNow':
				var gotTime = task.a;
				return $lamdera$program_test$Effect$Test$runTask$(
					maybeClientId,
					state,
					gotTime(
						$lamdera$program_test$Effect$Test$currentTime(state)));
			case 'TimeHere':
				var gotTimeZone = task.a;
				return $lamdera$program_test$Effect$Test$runTask$(
					maybeClientId,
					state,
					gotTimeZone($elm$time$Time$utc));
			case 'TimeGetZoneName':
				var getTimeZoneName = task.a;
				return $lamdera$program_test$Effect$Test$runTask$(
					maybeClientId,
					state,
					getTimeZoneName(
						$elm$time$Time$Offset(0)));
			case 'GetViewport':
				var _function = task.a;
				return $lamdera$program_test$Effect$Test$runTask$(
					maybeClientId,
					state,
					function () {
						if (maybeClientId.$ === 'Just') {
							var clientId = maybeClientId.a;
							var _v7 = $lamdera$containers$SeqDict$get$(clientId, state.frontends);
							if (_v7.$ === 'Just') {
								var frontend = _v7.a;
								return _function(
									{
										scene: {height: frontend.windowSize.height, width: frontend.windowSize.width},
										viewport: {height: frontend.windowSize.height, width: frontend.windowSize.width, x: 0, y: 0}
									});
							} else {
								return _function(
									{
										scene: {height: 1080, width: 1920},
										viewport: {height: 1080, width: 1920, x: 0, y: 0}
									});
							}
						} else {
							return _function(
								{
									scene: {height: 1080, width: 1920},
									viewport: {height: 1080, width: 1920, x: 0, y: 0}
								});
						}
					}());
			case 'SetViewport':
				var _function = task.c;
				return $lamdera$program_test$Effect$Test$runTask$(
					maybeClientId,
					state,
					_function(_Utils_Tuple0));
			case 'GetElement':
				var htmlId = task.a;
				var _function = task.b;
				return $lamdera$program_test$Effect$Test$getDomTask$(
					maybeClientId,
					state,
					htmlId,
					_function,
					{
						element: {height: 100, width: 100, x: 0, y: 0},
						scene: {height: 100, width: 100},
						viewport: {height: 100, width: 100, x: 0, y: 0}
					});
			case 'FileToString':
				var file = task.a;
				var _function = task.b;
				if (file.$ === 'RealFile') {
					return $lamdera$program_test$Effect$Test$runTask$(
						maybeClientId,
						state,
						_function(''));
				} else {
					var content = file.a.content;
					return $lamdera$program_test$Effect$Test$runTask$(
						maybeClientId,
						state,
						_function(
							function () {
								if (content.$ === 'StringFile') {
									var a = content.a;
									return a;
								} else {
									var a = content.a;
									return $elm$core$Maybe$withDefault$(
										'',
										$elm$bytes$Bytes$Decode$decode$(
											$elm$bytes$Bytes$Decode$string(
												$elm$bytes$Bytes$width(a)),
											a));
								}
							}()));
				}
			case 'FileToBytes':
				var file = task.a;
				var _function = task.b;
				if (file.$ === 'RealFile') {
					return $lamdera$program_test$Effect$Test$runTask$(
						maybeClientId,
						state,
						_function(
							$elm$bytes$Bytes$Encode$encode(
								$elm$bytes$Bytes$Encode$sequence(_List_Nil))));
				} else {
					var content = file.a.content;
					return $lamdera$program_test$Effect$Test$runTask$(
						maybeClientId,
						state,
						_function(
							function () {
								if (content.$ === 'StringFile') {
									var a = content.a;
									return $elm$bytes$Bytes$Encode$encode(
										$elm$bytes$Bytes$Encode$string(a));
								} else {
									var a = content.a;
									return a;
								}
							}()));
				}
			case 'FileToUrl':
				var file = task.a;
				var _function = task.b;
				if (file.$ === 'RealFile') {
					return $lamdera$program_test$Effect$Test$runTask$(
						maybeClientId,
						state,
						_function(''));
				} else {
					var content = file.a.content;
					return $lamdera$program_test$Effect$Test$runTask$(
						maybeClientId,
						state,
						_function(
							function () {
								if (content.$ === 'StringFile') {
									var a = content.a;
									return 'data:*/*;base64,' + $elm$core$Maybe$withDefault$(
										'',
										$danfishgold$base64_bytes$Base64$fromString(a));
								} else {
									var a = content.a;
									return 'data:*/*;base64,' + $elm$core$Maybe$withDefault$(
										'',
										$danfishgold$base64_bytes$Base64$fromBytes(a));
								}
							}()));
				}
			case 'Focus':
				var htmlId = task.a;
				var _function = task.b;
				return $lamdera$program_test$Effect$Test$getDomTask$(maybeClientId, state, htmlId, _function, _Utils_Tuple0);
			case 'Blur':
				var htmlId = task.a;
				var _function = task.b;
				return $lamdera$program_test$Effect$Test$getDomTask$(maybeClientId, state, htmlId, _function, _Utils_Tuple0);
			case 'GetViewportOf':
				var htmlId = task.a;
				var _function = task.b;
				return $lamdera$program_test$Effect$Test$getDomTask$(
					maybeClientId,
					state,
					htmlId,
					_function,
					{
						scene: {height: 100, width: 100},
						viewport: {height: 100, width: 100, x: 0, y: 0}
					});
			case 'SetViewportOf':
				var htmlId = task.a;
				var _function = task.d;
				return $lamdera$program_test$Effect$Test$getDomTask$(maybeClientId, state, htmlId, _function, _Utils_Tuple0);
			case 'LoadTexture':
				var url = task.b;
				var _function = task.c;
				var response = state.handleHttpRequest(
					{
						currentRequest: {
							body: $lamdera$program_test$Effect$Test$EmptyBody,
							headers: _List_Nil,
							method: 'GET',
							requestedBy: function () {
								if (maybeClientId.$ === 'Just') {
									var clientId = maybeClientId.a;
									return $lamdera$program_test$Effect$Test$RequestedByFrontend(clientId);
								} else {
									return $lamdera$program_test$Effect$Test$RequestedByBackend;
								}
							}(),
							sentAt: $lamdera$program_test$Effect$Test$currentTime(state),
							url: url
						},
						data: $lamdera$program_test$Effect$Test$stateToData(state)
					});
				return $lamdera$program_test$Effect$Test$runTask$(
					maybeClientId,
					state,
					_function(
						function () {
							if (response.$ === 'TextureHttpResponse') {
								var texture = response.b;
								return $elm$core$Result$Ok(texture);
							} else {
								return $elm$core$Result$Err($lamdera$program_test$WebGLFix$Texture$LoadError);
							}
						}()));
			case 'RequestXrStart':
				var _function = task.b;
				return $lamdera$program_test$Effect$Test$runTask$(
					maybeClientId,
					state,
					_function(
						$elm$core$Result$Err($lamdera$program_test$Effect$Internal$NotSupported)));
			case 'RenderXrFrame':
				var _function = task.b;
				return $lamdera$program_test$Effect$Test$runTask$(
					maybeClientId,
					state,
					_function(
						$elm$core$Result$Ok(
							{
								boundary: $elm$core$Maybe$Nothing,
								inputs: _List_Nil,
								time: $elm$time$Time$posixToMillis(
									$lamdera$program_test$Effect$Test$currentTime(state)),
								transform: $elm_explorations$linear_algebra$Math$Matrix4$identity,
								views: _List_Nil
							})));
			case 'EndXrSession':
				var _function = task.a;
				return $lamdera$program_test$Effect$Test$runTask$(
					maybeClientId,
					state,
					_function(_Utils_Tuple0));
			case 'WebsocketCreateHandle':
				var url = task.a;
				var _function = task.b;
				return $lamdera$program_test$Effect$Test$runTask$(
					maybeClientId,
					state,
					_function(
						$lamdera$program_test$Websocket$Connection$('', url)));
			case 'WebsocketSendString':
				var _function = task.c;
				return $lamdera$program_test$Effect$Test$runTask$(
					maybeClientId,
					state,
					_function(
						$elm$core$Result$Ok(_Utils_Tuple0)));
			default:
				var _function = task.b;
				return $lamdera$program_test$Effect$Test$runTask$(
					maybeClientId,
					state,
					_function(_Utils_Tuple0));
		}
	}
};
var $lamdera$program_test$Effect$Test$runTask = F3($lamdera$program_test$Effect$Test$runTask$);
var $lamdera$program_test$Effect$Lamdera$SessionId = function (a) {
	return {$: 'SessionId', a: a};
};
var $lamdera$program_test$Effect$Lamdera$sessionIdFromString = $lamdera$program_test$Effect$Lamdera$SessionId;
var $lamdera$program_test$Effect$Test$runBackendEffects$ = function (stepIndex, effect, state) {
	switch (effect.$) {
		case 'Batch':
			var effects = effect.a;
			return $elm$core$List$foldl$(
				$lamdera$program_test$Effect$Test$runBackendEffects(stepIndex),
				state,
				effects);
		case 'SendToFrontend':
			var clientId = effect.a.a;
			var toFrontend = effect.b;
			return _Utils_update(
				state,
				{
					frontends: $lamdera$containers$SeqDict$updateIfExists$(
						$lamdera$program_test$Effect$Lamdera$clientIdFromString(clientId),
						function (frontend) {
							return _Utils_update(
								frontend,
								{
									toFrontend: _Utils_ap(
										frontend.toFrontend,
										_List_fromArray(
											[
												{stepIndex: stepIndex, toFrontend: toFrontend}
											]))
								});
						},
						state.frontends)
				});
		case 'SendToFrontends':
			var sessionId = effect.a.a;
			var toFrontend = effect.b;
			var sessionId_ = $lamdera$program_test$Effect$Lamdera$sessionIdFromString(sessionId);
			return _Utils_update(
				state,
				{
					frontends: $lamdera$containers$SeqDict$map$(
						F2(
							function (_v1, frontend) {
								return _Utils_eq(frontend.sessionId, sessionId_) ? _Utils_update(
									frontend,
									{
										toFrontend: _Utils_ap(
											frontend.toFrontend,
											_List_fromArray(
												[
													{stepIndex: stepIndex, toFrontend: toFrontend}
												]))
									}) : frontend;
							}),
						state.frontends)
				});
		case 'None':
			return state;
		case 'Task':
			var task = effect.a;
			var _v2 = $lamdera$program_test$Effect$Test$runTask$($elm$core$Maybe$Nothing, state, task);
			var state2 = _v2.a;
			var msg = _v2.b;
			return $lamdera$program_test$Effect$Test$handleBackendUpdate$(
				$lamdera$program_test$Effect$Test$currentTime(state2),
				state2.backendApp,
				msg,
				state2);
		case 'SendToBackend':
			return state;
		case 'NavigationPushUrl':
			return state;
		case 'NavigationReplaceUrl':
			return state;
		case 'NavigationLoad':
			return state;
		case 'NavigationBack':
			return state;
		case 'NavigationForward':
			return state;
		case 'NavigationReload':
			return state;
		case 'NavigationReloadAndSkipCache':
			return state;
		case 'Port':
			return state;
		case 'FileDownloadUrl':
			return state;
		case 'FileDownloadString':
			return state;
		case 'FileDownloadBytes':
			return state;
		case 'FileSelectFile':
			return state;
		case 'FileSelectFiles':
			return state;
		case 'Broadcast':
			var toFrontend = effect.a;
			return _Utils_update(
				state,
				{
					frontends: $lamdera$containers$SeqDict$map$(
						F2(
							function (_v3, frontend) {
								return _Utils_update(
									frontend,
									{
										toFrontend: _Utils_ap(
											frontend.toFrontend,
											_List_fromArray(
												[
													{stepIndex: stepIndex, toFrontend: toFrontend}
												]))
									});
							}),
						state.frontends)
				});
		case 'HttpCancel':
			return state;
		default:
			return state;
	}
};
var $lamdera$program_test$Effect$Test$runBackendEffects = F3($lamdera$program_test$Effect$Test$runBackendEffects$);
var $lamdera$program_test$Effect$Test$BytesFile = function (a) {
	return {$: 'BytesFile', a: a};
};
var $lamdera$program_test$Effect$Test$FileSelectFailed = {$: 'FileSelectFailed'};
var $lamdera$program_test$Effect$Test$FileUploadNotHandled = {$: 'FileUploadNotHandled'};
var $lamdera$program_test$Effect$Test$InvalidBrowserNavigationUrl = function (a) {
	return {$: 'InvalidBrowserNavigationUrl', a: a};
};
var $lamdera$program_test$Effect$Internal$MockFile = function (a) {
	return {$: 'MockFile', a: a};
};
var $lamdera$program_test$Effect$Test$MultipleFilesUploadNotHandled = {$: 'MultipleFilesUploadNotHandled'};
var $lamdera$program_test$Effect$Test$PushUrlFailed = {$: 'PushUrlFailed'};
var $lamdera$program_test$Effect$Test$ReplaceUrlFailed = {$: 'ReplaceUrlFailed'};
var $lamdera$program_test$Effect$Test$StringFile = function (a) {
	return {$: 'StringFile', a: a};
};
var $lamdera$program_test$Effect$Test$getPortSubscriptions = function (subscription) {
	switch (subscription.$) {
		case 'SubBatch':
			var subscriptions = subscription.a;
			return $elm$core$List$concatMap$($lamdera$program_test$Effect$Test$getPortSubscriptions, subscriptions);
		case 'SubPort':
			var portName = subscription.a;
			var msg = subscription.c;
			return _List_fromArray(
				[
					{msg: msg, portName: portName}
				]);
		default:
			return _List_Nil;
	}
};
var $lamdera$program_test$Effect$Test$navigateBack$ = function (steps, navigation) {
	navigateBack:
	while (true) {
		if (steps > 0) {
			var _v0 = navigation.backUrls;
			if (_v0.b) {
				var head = _v0.a;
				var rest = _v0.b;
				var $temp$steps = steps - 1,
					$temp$navigation = _Utils_update(
					navigation,
					{
						backUrls: rest,
						forwardUrls: A2($elm$core$List$cons, head, navigation.forwardUrls),
						url: head
					});
				steps = $temp$steps;
				navigation = $temp$navigation;
				continue navigateBack;
			} else {
				return navigation;
			}
		} else {
			return navigation;
		}
	}
};
var $lamdera$program_test$Effect$Test$navigateBack = F2($lamdera$program_test$Effect$Test$navigateBack$);
var $lamdera$program_test$Effect$Test$navigateForward$ = function (steps, navigation) {
	navigateForward:
	while (true) {
		if (steps > 0) {
			var _v0 = navigation.forwardUrls;
			if (_v0.b) {
				var head = _v0.a;
				var rest = _v0.b;
				var $temp$steps = steps - 1,
					$temp$navigation = _Utils_update(
					navigation,
					{
						backUrls: A2($elm$core$List$cons, head, navigation.backUrls),
						forwardUrls: rest,
						url: head
					});
				steps = $temp$steps;
				navigation = $temp$navigation;
				continue navigateForward;
			} else {
				return navigation;
			}
		} else {
			return navigation;
		}
	}
};
var $lamdera$program_test$Effect$Test$navigateForward = F2($lamdera$program_test$Effect$Test$navigateForward$);
var $elm$core$String$dropRight$ = function (n, string) {
	return (n < 1) ? string : A3($elm$core$String$slice, 0, -n, string);
};
var $elm$core$String$dropRight = F2($elm$core$String$dropRight$);
var $elm$core$String$endsWith = _String_endsWith;
var $elm$url$Url$Http = {$: 'Http'};
var $elm$url$Url$Https = {$: 'Https'};
var $elm$url$Url$Url$ = function (protocol, host, port_, path, query, fragment) {
	return {fragment: fragment, host: host, path: path, port_: port_, protocol: protocol, query: query};
};
var $elm$url$Url$Url = F6($elm$url$Url$Url$);
var $elm$core$String$indexes = _String_indexes;
var $elm$core$String$isEmpty = function (string) {
	return string === '';
};
var $elm$core$String$left$ = function (n, string) {
	return (n < 1) ? '' : A3($elm$core$String$slice, 0, n, string);
};
var $elm$core$String$left = F2($elm$core$String$left$);
var $elm$url$Url$chompBeforePath$ = function (protocol, path, params, frag, str) {
	if ($elm$core$String$isEmpty(str) || A2($elm$core$String$contains, '@', str)) {
		return $elm$core$Maybe$Nothing;
	} else {
		var _v0 = A2($elm$core$String$indexes, ':', str);
		if (!_v0.b) {
			return $elm$core$Maybe$Just(
				$elm$url$Url$Url$(protocol, str, $elm$core$Maybe$Nothing, path, params, frag));
		} else {
			if (!_v0.b.b) {
				var i = _v0.a;
				var _v1 = $elm$core$String$toInt(
					$elm$core$String$dropLeft$(i + 1, str));
				if (_v1.$ === 'Nothing') {
					return $elm$core$Maybe$Nothing;
				} else {
					var port_ = _v1;
					return $elm$core$Maybe$Just(
						$elm$url$Url$Url$(
							protocol,
							$elm$core$String$left$(i, str),
							port_,
							path,
							params,
							frag));
				}
			} else {
				return $elm$core$Maybe$Nothing;
			}
		}
	}
};
var $elm$url$Url$chompBeforePath = F5($elm$url$Url$chompBeforePath$);
var $elm$url$Url$chompBeforeQuery$ = function (protocol, params, frag, str) {
	if ($elm$core$String$isEmpty(str)) {
		return $elm$core$Maybe$Nothing;
	} else {
		var _v0 = A2($elm$core$String$indexes, '/', str);
		if (!_v0.b) {
			return $elm$url$Url$chompBeforePath$(protocol, '/', params, frag, str);
		} else {
			var i = _v0.a;
			return $elm$url$Url$chompBeforePath$(
				protocol,
				$elm$core$String$dropLeft$(i, str),
				params,
				frag,
				$elm$core$String$left$(i, str));
		}
	}
};
var $elm$url$Url$chompBeforeQuery = F4($elm$url$Url$chompBeforeQuery$);
var $elm$url$Url$chompBeforeFragment$ = function (protocol, frag, str) {
	if ($elm$core$String$isEmpty(str)) {
		return $elm$core$Maybe$Nothing;
	} else {
		var _v0 = A2($elm$core$String$indexes, '?', str);
		if (!_v0.b) {
			return $elm$url$Url$chompBeforeQuery$(protocol, $elm$core$Maybe$Nothing, frag, str);
		} else {
			var i = _v0.a;
			return $elm$url$Url$chompBeforeQuery$(
				protocol,
				$elm$core$Maybe$Just(
					$elm$core$String$dropLeft$(i + 1, str)),
				frag,
				$elm$core$String$left$(i, str));
		}
	}
};
var $elm$url$Url$chompBeforeFragment = F3($elm$url$Url$chompBeforeFragment$);
var $elm$url$Url$chompAfterProtocol$ = function (protocol, str) {
	if ($elm$core$String$isEmpty(str)) {
		return $elm$core$Maybe$Nothing;
	} else {
		var _v0 = A2($elm$core$String$indexes, '#', str);
		if (!_v0.b) {
			return $elm$url$Url$chompBeforeFragment$(protocol, $elm$core$Maybe$Nothing, str);
		} else {
			var i = _v0.a;
			return $elm$url$Url$chompBeforeFragment$(
				protocol,
				$elm$core$Maybe$Just(
					$elm$core$String$dropLeft$(i + 1, str)),
				$elm$core$String$left$(i, str));
		}
	}
};
var $elm$url$Url$chompAfterProtocol = F2($elm$url$Url$chompAfterProtocol$);
var $elm$url$Url$fromString = function (str) {
	return A2($elm$core$String$startsWith, 'http://', str) ? $elm$url$Url$chompAfterProtocol$(
		$elm$url$Url$Http,
		$elm$core$String$dropLeft$(7, str)) : (A2($elm$core$String$startsWith, 'https://', str) ? $elm$url$Url$chompAfterProtocol$(
		$elm$url$Url$Https,
		$elm$core$String$dropLeft$(8, str)) : $elm$core$Maybe$Nothing);
};
var $elm$url$Url$addPort$ = function (maybePort, starter) {
	if (maybePort.$ === 'Nothing') {
		return starter;
	} else {
		var port_ = maybePort.a;
		return starter + (':' + $elm$core$String$fromInt(port_));
	}
};
var $elm$url$Url$addPort = F2($elm$url$Url$addPort$);
var $elm$url$Url$addPrefixed$ = function (prefix, maybeSegment, starter) {
	if (maybeSegment.$ === 'Nothing') {
		return starter;
	} else {
		var segment = maybeSegment.a;
		return _Utils_ap(
			starter,
			_Utils_ap(prefix, segment));
	}
};
var $elm$url$Url$addPrefixed = F3($elm$url$Url$addPrefixed$);
var $elm$url$Url$toString = function (url) {
	var http = function () {
		var _v0 = url.protocol;
		if (_v0.$ === 'Http') {
			return 'http://';
		} else {
			return 'https://';
		}
	}();
	return $elm$url$Url$addPrefixed$(
		'#',
		url.fragment,
		$elm$url$Url$addPrefixed$(
			'?',
			url.query,
			_Utils_ap(
				$elm$url$Url$addPort$(
					url.port_,
					_Utils_ap(http, url.host)),
				url.path)));
};
var $lamdera$program_test$Effect$Test$normalizeUrl$ = function (domainUrl, path) {
	var domain = $elm$url$Url$toString(domainUrl);
	return A2($elm$core$String$startsWith, '/', path) ? $elm$url$Url$fromString(
		A2($elm$core$String$endsWith, '/', domain) ? _Utils_ap(
			$elm$core$String$dropRight$(1, domain),
			path) : _Utils_ap(domain, path)) : $elm$core$Maybe$Nothing;
};
var $lamdera$program_test$Effect$Test$normalizeUrl = F2($lamdera$program_test$Effect$Test$normalizeUrl$);
var $lamdera$program_test$Effect$Test$runFrontendEffects$ = function (sessionId, clientId, stepIndex, effectsToPerform, state) {
	switch (effectsToPerform.$) {
		case 'Batch':
			var nestedEffectsToPerform = effectsToPerform.a;
			return $elm$core$List$foldl$(
				A3($lamdera$program_test$Effect$Test$runFrontendEffects, sessionId, clientId, stepIndex),
				state,
				nestedEffectsToPerform);
		case 'SendToBackend':
			var toBackend = effectsToPerform.a;
			return _Utils_update(
				state,
				{
					toBackend: _Utils_ap(
						state.toBackend,
						_List_fromArray(
							[
								{clientId: clientId, sessionId: sessionId, stepIndex: stepIndex, toBackend: toBackend}
							]))
				});
		case 'NavigationPushUrl':
			var urlText = effectsToPerform.b;
			var _v1 = $lamdera$program_test$Effect$Test$normalizeUrl$(state.domain, urlText);
			if (_v1.$ === 'Just') {
				var url = _v1.a;
				var state2 = $lamdera$program_test$Effect$Test$handleFrontendUpdate$(
					clientId,
					$lamdera$program_test$Effect$Test$currentTime(state),
					state.frontendApp.onUrlChange(url),
					state);
				return _Utils_update(
					state2,
					{
						frontends: $lamdera$containers$SeqDict$updateIfExists$(
							clientId,
							function (frontend) {
								var navigation = frontend.navigation;
								return _Utils_update(
									frontend,
									{
										navigation: _Utils_update(
											navigation,
											{
												backUrls: A2($elm$core$List$cons, navigation.url, navigation.backUrls),
												url: url
											})
									});
							},
							state2.frontends)
					});
			} else {
				return $lamdera$program_test$Effect$Test$addEvent$(
					$lamdera$program_test$Effect$Test$EffectFailedEvent$(
						$elm$core$Maybe$Just(clientId),
						$lamdera$program_test$Effect$Test$PushUrlFailed),
					$elm$core$Maybe$Just(
						$lamdera$program_test$Effect$Test$InvalidBrowserNavigationUrl(urlText)),
					state);
			}
		case 'NavigationReplaceUrl':
			var urlText = effectsToPerform.b;
			var _v2 = $lamdera$program_test$Effect$Test$normalizeUrl$(state.domain, urlText);
			if (_v2.$ === 'Just') {
				var url = _v2.a;
				var state2 = $lamdera$program_test$Effect$Test$handleFrontendUpdate$(
					clientId,
					$lamdera$program_test$Effect$Test$currentTime(state),
					state.frontendApp.onUrlChange(url),
					state);
				return _Utils_update(
					state2,
					{
						frontends: $lamdera$containers$SeqDict$updateIfExists$(
							clientId,
							function (frontend) {
								var navigation = frontend.navigation;
								return _Utils_update(
									frontend,
									{
										navigation: _Utils_update(
											navigation,
											{url: url})
									});
							},
							state2.frontends)
					});
			} else {
				return $lamdera$program_test$Effect$Test$addEvent$(
					$lamdera$program_test$Effect$Test$EffectFailedEvent$(
						$elm$core$Maybe$Just(clientId),
						$lamdera$program_test$Effect$Test$ReplaceUrlFailed),
					$elm$core$Maybe$Just(
						$lamdera$program_test$Effect$Test$InvalidBrowserNavigationUrl(urlText)),
					state);
			}
		case 'NavigationLoad':
			return state;
		case 'NavigationBack':
			var steps = effectsToPerform.b;
			var _v3 = $lamdera$containers$SeqDict$get$(clientId, state.frontends);
			if (_v3.$ === 'Just') {
				var frontend = _v3.a;
				var navigation = $lamdera$program_test$Effect$Test$navigateBack$(steps, frontend.navigation);
				var state2 = $lamdera$program_test$Effect$Test$handleFrontendUpdate$(
					clientId,
					$lamdera$program_test$Effect$Test$currentTime(state),
					state.frontendApp.onUrlChange(navigation.url),
					state);
				return _Utils_update(
					state2,
					{
						frontends: $lamdera$containers$SeqDict$updateIfExists$(
							clientId,
							function (frontend2) {
								return _Utils_update(
									frontend2,
									{navigation: navigation});
							},
							state2.frontends)
					});
			} else {
				return state;
			}
		case 'NavigationForward':
			var steps = effectsToPerform.b;
			var _v4 = $lamdera$containers$SeqDict$get$(clientId, state.frontends);
			if (_v4.$ === 'Just') {
				var frontend = _v4.a;
				var navigation = $lamdera$program_test$Effect$Test$navigateForward$(steps, frontend.navigation);
				var state2 = $lamdera$program_test$Effect$Test$handleFrontendUpdate$(
					clientId,
					$lamdera$program_test$Effect$Test$currentTime(state),
					state.frontendApp.onUrlChange(navigation.url),
					state);
				return _Utils_update(
					state2,
					{
						frontends: $lamdera$containers$SeqDict$updateIfExists$(
							clientId,
							function (frontend2) {
								return _Utils_update(
									frontend2,
									{navigation: navigation});
							},
							state2.frontends)
					});
			} else {
				return state;
			}
		case 'NavigationReload':
			return state;
		case 'NavigationReloadAndSkipCache':
			return state;
		case 'None':
			return state;
		case 'Task':
			var task = effectsToPerform.a;
			var _v5 = $lamdera$program_test$Effect$Test$runTask$(
				$elm$core$Maybe$Just(clientId),
				state,
				task);
			var newState = _v5.a;
			var msg = _v5.b;
			return $lamdera$program_test$Effect$Test$handleFrontendUpdate$(
				clientId,
				$lamdera$program_test$Effect$Test$currentTime(newState),
				msg,
				newState);
		case 'Port':
			var portName = effectsToPerform.a;
			var value = effectsToPerform.c;
			var portRequest = {clientId: clientId, portName: portName, value: value};
			var newState = _Utils_update(
				state,
				{
					portRequests: A2($elm$core$List$cons, portRequest, state.portRequests)
				});
			var _v6 = newState.handlePortToJs(
				{
					currentRequest: portRequest,
					data: $lamdera$program_test$Effect$Test$stateToData(state)
				});
			if (_v6.$ === 'Just') {
				var _v7 = _v6.a;
				var responsePortName = _v7.a;
				var responseValue = _v7.b;
				var _v8 = $lamdera$containers$SeqDict$get$(clientId, state.frontends);
				if (_v8.$ === 'Just') {
					var frontend = _v8.a;
					var msgs = $elm$core$List$filterMap$(
						function (sub) {
							return _Utils_eq(sub.portName, responsePortName) ? $elm$core$Maybe$Just(
								sub.msg(responseValue)) : $elm$core$Maybe$Nothing;
						},
						$lamdera$program_test$Effect$Test$getPortSubscriptions(
							state.frontendApp.subscriptions(frontend.model)));
					return $elm$core$List$foldl$(
						A2(
							$lamdera$program_test$Effect$Test$handleFrontendUpdate,
							clientId,
							$lamdera$program_test$Effect$Test$currentTime(state)),
						newState,
						msgs);
				} else {
					return newState;
				}
			} else {
				return newState;
			}
		case 'SendToFrontend':
			return state;
		case 'SendToFrontends':
			return state;
		case 'FileDownloadUrl':
			return state;
		case 'FileDownloadString':
			var data = effectsToPerform.a;
			return _Utils_update(
				state,
				{
					downloads: A2(
						$elm$core$List$cons,
						{
							content: $lamdera$program_test$Effect$Test$StringFile(data.content),
							downloadedAt: $lamdera$program_test$Effect$Test$currentTime(state),
							filename: data.name,
							mimeType: data.mimeType
						},
						state.downloads)
				});
		case 'FileDownloadBytes':
			var data = effectsToPerform.a;
			return _Utils_update(
				state,
				{
					downloads: A2(
						$elm$core$List$cons,
						{
							content: $lamdera$program_test$Effect$Test$BytesFile(data.content),
							downloadedAt: $lamdera$program_test$Effect$Test$currentTime(state),
							filename: data.name,
							mimeType: data.mimeType
						},
						state.downloads)
				});
		case 'FileSelectFile':
			var mimeTypes = effectsToPerform.a;
			var msg = effectsToPerform.b;
			var time = $lamdera$program_test$Effect$Test$currentTime(state);
			var fileUpload = state.handleFileUpload(
				{
					data: $lamdera$program_test$Effect$Test$stateToData(state),
					mimeTypes: mimeTypes
				});
			var state2 = _Utils_update(
				state,
				{
					fileUploads: A2(
						$elm$core$List$cons,
						{upload: fileUpload, uploadedAt: time, uploadedBy: clientId},
						state.fileUploads)
				});
			if (fileUpload.$ === 'UploadFile') {
				var file = fileUpload.a.a;
				return $lamdera$program_test$Effect$Test$handleFrontendUpdate$(
					clientId,
					time,
					msg(
						$lamdera$program_test$Effect$Internal$MockFile(file)),
					state2);
			} else {
				return $lamdera$program_test$Effect$Test$addEvent$(
					$lamdera$program_test$Effect$Test$EffectFailedEvent$(
						$elm$core$Maybe$Just(clientId),
						$lamdera$program_test$Effect$Test$FileSelectFailed),
					$elm$core$Maybe$Just($lamdera$program_test$Effect$Test$FileUploadNotHandled),
					state2);
			}
		case 'FileSelectFiles':
			var mimeTypes = effectsToPerform.a;
			var msg = effectsToPerform.b;
			var time = $lamdera$program_test$Effect$Test$currentTime(state);
			var fileUpload = state.handleMultipleFilesUpload(
				{
					data: $lamdera$program_test$Effect$Test$stateToData(state),
					mimeTypes: mimeTypes
				});
			var state2 = _Utils_update(
				state,
				{
					multipleFileUploads: A2(
						$elm$core$List$cons,
						{upload: fileUpload, uploadedAt: time, uploadedBy: clientId},
						state.multipleFileUploads)
				});
			if (fileUpload.$ === 'UploadMultipleFiles') {
				var file = fileUpload.a.a;
				var files = fileUpload.b;
				return $lamdera$program_test$Effect$Test$handleFrontendUpdate$(
					clientId,
					time,
					A2(
						msg,
						$lamdera$program_test$Effect$Internal$MockFile(file),
						$elm$core$List$map$(
							function (_v11) {
								var a = _v11.a;
								return $lamdera$program_test$Effect$Internal$MockFile(a);
							},
							files)),
					state2);
			} else {
				return $lamdera$program_test$Effect$Test$addEvent$(
					$lamdera$program_test$Effect$Test$EffectFailedEvent$(
						$elm$core$Maybe$Just(clientId),
						$lamdera$program_test$Effect$Test$FileSelectFailed),
					$elm$core$Maybe$Just($lamdera$program_test$Effect$Test$MultipleFilesUploadNotHandled),
					state2);
			}
		case 'Broadcast':
			return state;
		case 'HttpCancel':
			return state;
		default:
			return state;
	}
};
var $lamdera$program_test$Effect$Test$runFrontendEffects = F5($lamdera$program_test$Effect$Test$runFrontendEffects$);
var $lamdera$program_test$Effect$Test$UpdateFromBackendEvent = function (a) {
	return {$: 'UpdateFromBackendEvent', a: a};
};
var $lamdera$program_test$Effect$Test$handleUpdateFromBackend$ = function (clientId, currentTime2, _v0, state) {
	var stepIndex = _v0.stepIndex;
	var toFrontend = _v0.toFrontend;
	var _v1 = $lamdera$containers$SeqDict$get$(clientId, state.frontends);
	if (_v1.$ === 'Just') {
		var frontendState = _v1.a;
		var _v2 = A2(state.frontendApp.updateFromBackend, toFrontend, frontendState.model);
		var newModel = _v2.a;
		var cmd = _v2.b;
		var subscriptions = state.frontendApp.subscriptions(newModel);
		var newTimers = $lamdera$program_test$Effect$Test$getTimers(subscriptions);
		return $lamdera$program_test$Effect$Test$addEvent$(
			$lamdera$program_test$Effect$Test$UpdateFromBackendEvent(
				{clientId: clientId, cmds: cmd, stepIndex: stepIndex, toFrontend: toFrontend}),
			$elm$core$Maybe$Nothing,
			_Utils_update(
				state,
				{
					frontends: $lamdera$containers$SeqDict$insert$(
						clientId,
						_Utils_update(
							frontendState,
							{
								model: newModel,
								pendingEffects: $elm$core$Array$push$(
									{
										cmds: cmd,
										stepIndex: $elm$core$Array$length(state.history)
									},
									frontendState.pendingEffects),
								timers: $lamdera$containers$SeqDict$merge$(
									F3(
										function (duration, _v3, dict) {
											return $lamdera$containers$SeqDict$insert$(
												duration,
												{startTime: currentTime2},
												dict);
										}),
									F4(
										function (_v4, _v5, _v6, dict) {
											return dict;
										}),
									F3(
										function (duration, _v7, dict) {
											return $lamdera$containers$SeqDict$remove$(duration, dict);
										}),
									newTimers,
									frontendState.timers,
									frontendState.timers)
							}),
						state.frontends)
				}));
	} else {
		return state;
	}
};
var $lamdera$program_test$Effect$Test$handleUpdateFromBackend = F4($lamdera$program_test$Effect$Test$handleUpdateFromBackend$);
var $lamdera$program_test$Effect$Test$UpdateFromFrontendEvent = function (a) {
	return {$: 'UpdateFromFrontendEvent', a: a};
};
var $lamdera$program_test$Effect$Test$handleUpdateFromFrontend$ = function (_v0, state) {
	var stepIndex = _v0.stepIndex;
	var toBackend = _v0.toBackend;
	var clientId = _v0.clientId;
	var sessionId = _v0.sessionId;
	var _v1 = A4(state.backendApp.updateFromFrontend, sessionId, clientId, toBackend, state.model);
	var newModel = _v1.a;
	var cmd = _v1.b;
	var subscriptions = state.backendApp.subscriptions(newModel);
	var newTimers = $lamdera$program_test$Effect$Test$getTimers(subscriptions);
	return $lamdera$program_test$Effect$Test$addEvent$(
		$lamdera$program_test$Effect$Test$UpdateFromFrontendEvent(
			{clientId: clientId, cmds: cmd, stepIndex: stepIndex, toBackend: toBackend}),
		$elm$core$Maybe$Nothing,
		_Utils_update(
			state,
			{
				model: newModel,
				pendingEffects: $elm$core$Array$push$(
					{
						cmds: cmd,
						stepIndex: $elm$core$Array$length(state.history)
					},
					state.pendingEffects),
				timers: $lamdera$containers$SeqDict$merge$(
					F3(
						function (duration, _v2, dict) {
							return $lamdera$containers$SeqDict$insert$(
								duration,
								{
									startTime: $lamdera$program_test$Effect$Test$currentTime(state)
								},
								dict);
						}),
					F4(
						function (_v3, _v4, _v5, dict) {
							return dict;
						}),
					F3(
						function (duration, _v6, dict) {
							return $lamdera$containers$SeqDict$remove$(duration, dict);
						}),
					newTimers,
					state.timers,
					state.timers)
			}));
};
var $lamdera$program_test$Effect$Test$handleUpdateFromFrontend = F2($lamdera$program_test$Effect$Test$handleUpdateFromFrontend$);
var $lamdera$program_test$Effect$Test$runNetwork = function (state) {
	var state2 = $elm$core$List$foldl$($lamdera$program_test$Effect$Test$handleUpdateFromFrontend, state, state.toBackend);
	return $lamdera$containers$SeqDict$foldl$(
		F3(
			function (clientId, frontend, state4) {
				return $elm$core$List$foldl$(
					A2(
						$lamdera$program_test$Effect$Test$handleUpdateFromBackend,
						clientId,
						$lamdera$program_test$Effect$Test$currentTime(state4)),
					_Utils_update(
						state4,
						{
							frontends: $lamdera$containers$SeqDict$insert$(
								clientId,
								_Utils_update(
									frontend,
									{toFrontend: _List_Nil}),
								state4.frontends)
						}),
					frontend.toFrontend);
			}),
		_Utils_update(
			state2,
			{toBackend: _List_Nil}),
		state2.frontends);
};
var $lamdera$program_test$Effect$Test$runEffects = function (state) {
	var state2 = $elm$core$Array$foldl$(
		F2(
			function (a, state6) {
				return $lamdera$program_test$Effect$Test$runBackendEffects$(a.stepIndex, a.cmds, state6);
			}),
		$lamdera$program_test$Effect$Test$clearBackendEffects(state),
		state.pendingEffects);
	return $lamdera$program_test$Effect$Test$runNetwork(
		$lamdera$containers$SeqDict$foldl$(
			F3(
				function (clientId, _v0, state3) {
					var pendingEffects = _v0.pendingEffects;
					var sessionId = _v0.sessionId;
					return $elm$core$Array$foldl$(
						F2(
							function (a, state6) {
								return $lamdera$program_test$Effect$Test$runFrontendEffects$(sessionId, clientId, a.stepIndex, a.cmds, state6);
							}),
						$lamdera$program_test$Effect$Test$clearFrontendEffects$(clientId, state3),
						pendingEffects);
				}),
			state2,
			state2.frontends));
};
var $lamdera$program_test$Effect$Test$simulateStep$ = function (timeLeft, state) {
	simulateStep:
	while (true) {
		var _v0 = $lamdera$program_test$Effect$Test$minimumBy$(
			function (a) {
				return $elm$time$Time$posixToMillis(a.endTime);
			},
			_Utils_ap(
				$lamdera$program_test$Effect$Test$timerEndTimes(state.timers),
				$elm$core$List$concatMap$(
					function (_v1) {
						var frontend = _v1.b;
						return $lamdera$program_test$Effect$Test$timerEndTimes(frontend.timers);
					},
					$lamdera$containers$SeqDict$toList(state.frontends))));
		if (_v0.$ === 'Just') {
			var nextTimerEnd = _v0.a;
			var delta = $ianmackenzie$elm_units$Duration$from$(
				$lamdera$program_test$Effect$Test$currentTime(state),
				nextTimerEnd.endTime);
			if ($lamdera$program_test$Effect$Test$hasPendingEffects(state) && ($ianmackenzie$elm_units$Quantity$greaterThanOrEqualTo$($lamdera$program_test$Effect$Test$animationFrame, timeLeft) && $ianmackenzie$elm_units$Quantity$greaterThan$($lamdera$program_test$Effect$Test$animationFrame, delta))) {
				var $temp$timeLeft = $ianmackenzie$elm_units$Quantity$minus$($lamdera$program_test$Effect$Test$animationFrame, timeLeft),
					$temp$state = $lamdera$program_test$Effect$Test$runEffects(
					_Utils_update(
						state,
						{
							elapsedTime: $ianmackenzie$elm_units$Quantity$plus$($lamdera$program_test$Effect$Test$animationFrame, state.elapsedTime)
						}));
				timeLeft = $temp$timeLeft;
				state = $temp$state;
				continue simulateStep;
			} else {
				if ($ianmackenzie$elm_units$Quantity$lessThanOrEqualTo$(timeLeft, delta)) {
					var state2 = function () {
						var _v3 = $lamdera$program_test$Effect$Test$getTriggersTimerMsgs$(state.backendApp.subscriptions, state, nextTimerEnd.endTime);
						var completedDurations = _v3.completedDurations;
						var triggeredMsgs = _v3.triggeredMsgs;
						return $elm$core$List$foldl$(
							A2($lamdera$program_test$Effect$Test$handleBackendUpdate, nextTimerEnd.endTime, state.backendApp),
							_Utils_update(
								state,
								{
									timers: $elm$core$List$foldl$($lamdera$containers$SeqDict$remove, state.timers, completedDurations)
								}),
							triggeredMsgs);
					}();
					var state3 = $lamdera$containers$SeqDict$foldl$(
						F3(
							function (clientId, frontend, state4) {
								var _v2 = $lamdera$program_test$Effect$Test$getTriggersTimerMsgs$(state4.frontendApp.subscriptions, frontend, nextTimerEnd.endTime);
								var completedDurations = _v2.completedDurations;
								var triggeredMsgs = _v2.triggeredMsgs;
								return $elm$core$List$foldl$(
									A2($lamdera$program_test$Effect$Test$handleFrontendUpdate, clientId, nextTimerEnd.endTime),
									_Utils_update(
										state4,
										{
											frontends: $lamdera$containers$SeqDict$insert$(
												clientId,
												_Utils_update(
													frontend,
													{
														timers: $elm$core$List$foldl$($lamdera$containers$SeqDict$remove, frontend.timers, completedDurations)
													}),
												state4.frontends)
										}),
									triggeredMsgs);
							}),
						state2,
						state2.frontends);
					var $temp$timeLeft = $ianmackenzie$elm_units$Quantity$minus$(delta, timeLeft),
						$temp$state = $lamdera$program_test$Effect$Test$runEffects(
						_Utils_update(
							state3,
							{
								elapsedTime: $ianmackenzie$elm_units$Duration$from$(state3.startTime, nextTimerEnd.endTime)
							}));
					timeLeft = $temp$timeLeft;
					state = $temp$state;
					continue simulateStep;
				} else {
					return _Utils_update(
						state,
						{
							elapsedTime: $ianmackenzie$elm_units$Quantity$plus$(state.elapsedTime, timeLeft)
						});
				}
			}
		} else {
			if ($lamdera$program_test$Effect$Test$hasPendingEffects(state) && $ianmackenzie$elm_units$Quantity$greaterThanOrEqualTo$($lamdera$program_test$Effect$Test$animationFrame, timeLeft)) {
				var $temp$timeLeft = $ianmackenzie$elm_units$Quantity$minus$($lamdera$program_test$Effect$Test$animationFrame, timeLeft),
					$temp$state = $lamdera$program_test$Effect$Test$runEffects(
					_Utils_update(
						state,
						{
							elapsedTime: $ianmackenzie$elm_units$Quantity$plus$($lamdera$program_test$Effect$Test$animationFrame, state.elapsedTime)
						}));
				timeLeft = $temp$timeLeft;
				state = $temp$state;
				continue simulateStep;
			} else {
				return _Utils_update(
					state,
					{
						elapsedTime: $ianmackenzie$elm_units$Quantity$plus$(state.elapsedTime, timeLeft)
					});
			}
		}
	}
};
var $lamdera$program_test$Effect$Test$simulateStep = F2($lamdera$program_test$Effect$Test$simulateStep$);
var $lamdera$program_test$Effect$Test$wait = function (duration) {
	return $lamdera$program_test$Effect$Test$NextStep(
		$lamdera$program_test$Effect$Test$simulateStep(duration));
};
var $lamdera$program_test$Effect$Test$userEvent$ = function (delay, userInputType, clientId, htmlId, event) {
	return $lamdera$program_test$Effect$Test$Action(
		function (instructions) {
			var htmlIdString = $lamdera$program_test$Effect$Browser$Dom$idToString(htmlId);
			var eventType = $lamdera$program_test$Effect$Test$UserInputEvent(
				{clientId: clientId, inputType: userInputType});
			return $lamdera$program_test$Effect$Test$NextStep$(
				function (state) {
					var _v0 = $lamdera$containers$SeqDict$get$(clientId, state.frontends);
					if (_v0.$ === 'Just') {
						var frontend = _v0.a;
						var query = $elm_explorations$test$Test$Html$Query$find$(
							_List_fromArray(
								[
									$elm_explorations$test$Test$Html$Selector$id(htmlIdString)
								]),
							$elm_explorations$test$Test$Html$Query$fromHtml(
								A2(
									$elm$html$Html$div,
									_List_Nil,
									state.frontendApp.view(frontend.model).body)));
						var _v1 = $elm_explorations$test$Test$Html$Event$toResult(
							A2($elm_explorations$test$Test$Html$Event$simulate, event, query));
						if (_v1.$ === 'Ok') {
							var msg = _v1.a;
							return $lamdera$program_test$Effect$Test$handleFrontendUpdate$(
								clientId,
								$lamdera$program_test$Effect$Test$currentTime(state),
								msg,
								$lamdera$program_test$Effect$Test$addEvent$(eventType, $elm$core$Maybe$Nothing, state));
						} else {
							var error = _v1.a;
							var wrongNumberOfNodes = 'Query.find always expects to find 1 element, but it found ';
							var foundNodeEventMissing = 'Event.expectEvent: I found a node, but it does not listen for \"' + (event.a + '\"');
							var decodeError = 'Problem with the given value:';
							var error2 = function () {
								if (A2($elm$core$String$startsWith, decodeError, error)) {
									return 'I found the node with the correct ID and it has the event listener I\'m looking for. But the value passed into it gave the following Json.Decode error:' + $elm$core$String$dropLeft$(
										$elm$core$String$length(decodeError),
										error);
								} else {
									if (A2($elm$core$String$startsWith, wrongNumberOfNodes, error)) {
										var _v2 = $elm$core$String$split$(
											' ',
											$elm$core$String$dropLeft$(
												$elm$core$String$length(wrongNumberOfNodes),
												error));
										if (_v2.b) {
											var head = _v2.a;
											var _v3 = $elm$core$String$toInt(head);
											if (_v3.$ === 'Just') {
												if (!_v3.a) {
													return 'I couldn\'t find a node with that ID. Make sure you have have Html.Attributes.id \"' + (htmlIdString + '\" in the input node\'s attributes (or whatever function in your chosen UI package produces this attribute).');
												} else {
													return 'I found ' + (head + (' nodes with Html.Attributes.id \"' + (htmlIdString + '\". I don\'t know which one to use! Make sure IDs are unique.')));
												}
											} else {
												return error;
											}
										} else {
											return error;
										}
									} else {
										if (A2($elm$core$String$startsWith, foundNodeEventMissing, error)) {
											return 'A node with that ID was found but it\'s missing an event listener for \"' + (event.a + '\"');
										} else {
											return error;
										}
									}
								}
							}();
							return $lamdera$program_test$Effect$Test$addEvent$(
								eventType,
								$elm$core$Maybe$Just(
									$lamdera$program_test$Effect$Test$UserEventError$(htmlId, error2)),
								state);
						}
					} else {
						return $lamdera$program_test$Effect$Test$addEvent$(
							eventType,
							$elm$core$Maybe$Just(
								$lamdera$program_test$Effect$Test$ClientIdNotFound(clientId)),
							state);
					}
				},
				A2(
					$lamdera$program_test$Effect$Test$wait,
					$ianmackenzie$elm_units$Duration$milliseconds(delay),
					instructions));
		});
};
var $lamdera$program_test$Effect$Test$userEvent = F5($lamdera$program_test$Effect$Test$userEvent$);
var $lamdera$program_test$Effect$Test$blurEvent$ = function (clientId, delay, htmlId) {
	return $lamdera$program_test$Effect$Test$userEvent$(
		delay,
		$lamdera$program_test$Effect$Test$UserBlurEvent(htmlId),
		clientId,
		htmlId,
		$elm_explorations$test$Test$Html$Event$blur);
};
var $lamdera$program_test$Effect$Test$blurEvent = F3($lamdera$program_test$Effect$Test$blurEvent$);
var $lamdera$program_test$Effect$Test$CheckFrontendState = function (a) {
	return {$: 'CheckFrontendState', a: a};
};
var $lamdera$program_test$Effect$Test$CheckStateEvent = function (a) {
	return {$: 'CheckStateEvent', a: a};
};
var $lamdera$program_test$Effect$Test$CustomError = function (a) {
	return {$: 'CustomError', a: a};
};
var $lamdera$program_test$Effect$Test$checkFrontend$ = function (clientId, delay, checkFunc) {
	return $lamdera$program_test$Effect$Test$Action(
		function (instructions) {
			return $lamdera$program_test$Effect$Test$NextStep$(
				function (state) {
					var _v0 = $lamdera$containers$SeqDict$get$(clientId, state.frontends);
					if (_v0.$ === 'Just') {
						var frontend = _v0.a;
						var _v1 = checkFunc(frontend.model);
						if (_v1.$ === 'Ok') {
							return $lamdera$program_test$Effect$Test$addEvent$(
								$lamdera$program_test$Effect$Test$CheckStateEvent(
									{
										checkType: $lamdera$program_test$Effect$Test$CheckFrontendState(clientId)
									}),
								$elm$core$Maybe$Nothing,
								state);
						} else {
							var error = _v1.a;
							return $lamdera$program_test$Effect$Test$addEvent$(
								$lamdera$program_test$Effect$Test$CheckStateEvent(
									{
										checkType: $lamdera$program_test$Effect$Test$CheckFrontendState(clientId)
									}),
								$elm$core$Maybe$Just(
									$lamdera$program_test$Effect$Test$CustomError(error)),
								state);
						}
					} else {
						return $lamdera$program_test$Effect$Test$addEvent$(
							$lamdera$program_test$Effect$Test$CheckStateEvent(
								{
									checkType: $lamdera$program_test$Effect$Test$CheckFrontendState(clientId)
								}),
							$elm$core$Maybe$Just(
								$lamdera$program_test$Effect$Test$ClientIdNotFound(clientId)),
							state);
					}
				},
				A2(
					$lamdera$program_test$Effect$Test$wait,
					$ianmackenzie$elm_units$Duration$milliseconds(delay),
					instructions));
		});
};
var $lamdera$program_test$Effect$Test$checkFrontend = F3($lamdera$program_test$Effect$Test$checkFrontend$);
var $lamdera$program_test$Effect$Test$CheckFrontendView = function (a) {
	return {$: 'CheckFrontendView', a: a};
};
var $lamdera$program_test$Effect$Test$ViewTestError = function (a) {
	return {$: 'ViewTestError', a: a};
};
var $lamdera$program_test$Effect$Test$checkView$ = function (clientId, delay, query) {
	return $lamdera$program_test$Effect$Test$Action(
		function (instructions) {
			return $lamdera$program_test$Effect$Test$NextStep$(
				function (state) {
					var _v0 = $lamdera$containers$SeqDict$get$(clientId, state.frontends);
					if (_v0.$ === 'Just') {
						var frontend = _v0.a;
						var _v1 = $elm_explorations$test$Test$Runner$getFailureReason(
							query(
								$elm_explorations$test$Test$Html$Query$fromHtml(
									A2(
										$elm$html$Html$div,
										_List_Nil,
										state.frontendApp.view(frontend.model).body))));
						if (_v1.$ === 'Just') {
							var description = _v1.a.description;
							return $lamdera$program_test$Effect$Test$addEvent$(
								$lamdera$program_test$Effect$Test$CheckStateEvent(
									{
										checkType: $lamdera$program_test$Effect$Test$CheckFrontendView(clientId)
									}),
								$elm$core$Maybe$Just(
									$lamdera$program_test$Effect$Test$ViewTestError(
										function () {
											var _v2 = $elm$core$List$head(
												$elm$core$List$reverse(
													$elm$core$String$split$('▼ ', description)));
											if (_v2.$ === 'Just') {
												var error = _v2.a;
												return 'The following view check failed: ' + error;
											} else {
												return '';
											}
										}())),
								state);
						} else {
							return $lamdera$program_test$Effect$Test$addEvent$(
								$lamdera$program_test$Effect$Test$CheckStateEvent(
									{
										checkType: $lamdera$program_test$Effect$Test$CheckFrontendView(clientId)
									}),
								$elm$core$Maybe$Nothing,
								state);
						}
					} else {
						return $lamdera$program_test$Effect$Test$addEvent$(
							$lamdera$program_test$Effect$Test$CheckStateEvent(
								{
									checkType: $lamdera$program_test$Effect$Test$CheckFrontendView(clientId)
								}),
							$elm$core$Maybe$Just(
								$lamdera$program_test$Effect$Test$ClientIdNotFound(clientId)),
							state);
					}
				},
				A2(
					$lamdera$program_test$Effect$Test$wait,
					$ianmackenzie$elm_units$Duration$milliseconds(delay),
					instructions));
		});
};
var $lamdera$program_test$Effect$Test$checkView = F3($lamdera$program_test$Effect$Test$checkView$);
var $lamdera$program_test$Effect$Test$UserClicksButton = function (a) {
	return {$: 'UserClicksButton', a: a};
};
var $elm_explorations$test$Test$Html$Event$click = _Utils_Tuple2('click', $elm_explorations$test$Test$Html$Event$emptyObject);
var $lamdera$program_test$Effect$Test$click$ = function (clientId, delay, htmlId) {
	return $lamdera$program_test$Effect$Test$userEvent$(
		delay,
		$lamdera$program_test$Effect$Test$UserClicksButton(htmlId),
		clientId,
		htmlId,
		$elm_explorations$test$Test$Html$Event$click);
};
var $lamdera$program_test$Effect$Test$click = F3($lamdera$program_test$Effect$Test$click$);
var $elm$browser$Browser$Internal = function (a) {
	return {$: 'Internal', a: a};
};
var $lamdera$program_test$Effect$Test$InvalidLinkUrl = function (a) {
	return {$: 'InvalidLinkUrl', a: a};
};
var $lamdera$program_test$Effect$Test$UserClicksLink = function (a) {
	return {$: 'UserClicksLink', a: a};
};
var $elm_explorations$test$Test$Html$Selector$Internal$Classes = function (a) {
	return {$: 'Classes', a: a};
};
var $elm_explorations$test$Test$Html$Selector$Internal$Invalid = {$: 'Invalid'};
var $elm_explorations$test$Test$Html$Selector$Internal$Style = function (a) {
	return {$: 'Style', a: a};
};
var $elm_explorations$test$Test$Html$Selector$Internal$BoolAttribute = function (a) {
	return {$: 'BoolAttribute', a: a};
};
var $elm_explorations$test$Test$Html$Selector$Internal$namedBoolAttr$ = function (name, value) {
	return $elm_explorations$test$Test$Html$Selector$Internal$BoolAttribute(
		{name: name, value: value});
};
var $elm_explorations$test$Test$Html$Selector$Internal$namedBoolAttr = F2($elm_explorations$test$Test$Html$Selector$Internal$namedBoolAttr$);
var $elm_explorations$test$Test$Html$Selector$orElseLazy$ = function (fma, mb) {
	if (mb.$ === 'Err') {
		return fma(_Utils_Tuple0);
	} else {
		return mb;
	}
};
var $elm_explorations$test$Test$Html$Selector$orElseLazy = F2($elm_explorations$test$Test$Html$Selector$orElseLazy$);
var $elm_explorations$test$Test$Html$Internal$Inert$attributeToJson = function (attribute) {
	return _HtmlAsJson_attributeToJson(attribute);
};
var $elm_explorations$test$Test$Html$Internal$ElmHtml$InternalTypes$Attribute = function (a) {
	return {$: 'Attribute', a: a};
};
var $elm_explorations$test$Test$Html$Internal$ElmHtml$InternalTypes$AttributeRecord$ = function (key, value) {
	return {key: key, value: value};
};
var $elm_explorations$test$Test$Html$Internal$ElmHtml$InternalTypes$AttributeRecord = F2($elm_explorations$test$Test$Html$Internal$ElmHtml$InternalTypes$AttributeRecord$);
var $elm_explorations$test$Test$Html$Internal$ElmHtml$InternalTypes$NamespacedAttribute = function (a) {
	return {$: 'NamespacedAttribute', a: a};
};
var $elm_explorations$test$Test$Html$Internal$ElmHtml$InternalTypes$NamespacedAttributeRecord$ = function (key, value, namespace) {
	return {key: key, namespace: namespace, value: value};
};
var $elm_explorations$test$Test$Html$Internal$ElmHtml$InternalTypes$NamespacedAttributeRecord = F3($elm_explorations$test$Test$Html$Internal$ElmHtml$InternalTypes$NamespacedAttributeRecord$);
var $elm_explorations$test$Test$Html$Internal$ElmHtml$InternalTypes$Property = function (a) {
	return {$: 'Property', a: a};
};
var $elm_explorations$test$Test$Html$Internal$ElmHtml$InternalTypes$PropertyRecord$ = function (key, value) {
	return {key: key, value: value};
};
var $elm_explorations$test$Test$Html$Internal$ElmHtml$InternalTypes$PropertyRecord = F2($elm_explorations$test$Test$Html$Internal$ElmHtml$InternalTypes$PropertyRecord$);
var $elm_explorations$test$Test$Html$Internal$ElmHtml$InternalTypes$Style = function (a) {
	return {$: 'Style', a: a};
};
var $elm$json$Json$Decode$map3 = _Json_map3;
var $elm_explorations$test$Test$Html$Internal$ElmHtml$Constants$propKey = 'a2';
var $elm_explorations$test$Test$Html$Internal$ElmHtml$InternalTypes$decodeAttribute = A2(
	$elm$json$Json$Decode$andThen,
	function (tag) {
		return _Utils_eq(tag, $elm_explorations$test$Test$Html$Internal$ElmHtml$Constants$attributeKey) ? A3(
			$elm$json$Json$Decode$map2,
			F2(
				function (key, val) {
					return $elm_explorations$test$Test$Html$Internal$ElmHtml$InternalTypes$Attribute(
						$elm_explorations$test$Test$Html$Internal$ElmHtml$InternalTypes$AttributeRecord$(key, val));
				}),
			A2($elm$json$Json$Decode$field, 'n', $elm$json$Json$Decode$string),
			A2($elm$json$Json$Decode$field, 'o', $elm$json$Json$Decode$string)) : (_Utils_eq(tag, $elm_explorations$test$Test$Html$Internal$ElmHtml$Constants$attributeNamespaceKey) ? A2(
			$elm$json$Json$Decode$map,
			$elm_explorations$test$Test$Html$Internal$ElmHtml$InternalTypes$NamespacedAttribute,
			A4(
				$elm$json$Json$Decode$map3,
				$elm_explorations$test$Test$Html$Internal$ElmHtml$InternalTypes$NamespacedAttributeRecord,
				A2($elm$json$Json$Decode$field, 'n', $elm$json$Json$Decode$string),
				$elm$json$Json$Decode$at$(
					_List_fromArray(
						['o', 'o']),
					$elm$json$Json$Decode$string),
				$elm$json$Json$Decode$at$(
					_List_fromArray(
						['o', 'f']),
					$elm$json$Json$Decode$string))) : (_Utils_eq(tag, $elm_explorations$test$Test$Html$Internal$ElmHtml$Constants$styleKey) ? A3(
			$elm$json$Json$Decode$map2,
			F2(
				function (key, val) {
					return $elm_explorations$test$Test$Html$Internal$ElmHtml$InternalTypes$Style(
						{key: key, value: val});
				}),
			A2($elm$json$Json$Decode$field, 'n', $elm$json$Json$Decode$string),
			A2($elm$json$Json$Decode$field, 'o', $elm$json$Json$Decode$string)) : (_Utils_eq(tag, $elm_explorations$test$Test$Html$Internal$ElmHtml$Constants$propKey) ? A3(
			$elm$json$Json$Decode$map2,
			F2(
				function (key, val) {
					return $elm_explorations$test$Test$Html$Internal$ElmHtml$InternalTypes$Property(
						$elm_explorations$test$Test$Html$Internal$ElmHtml$InternalTypes$PropertyRecord$(key, val));
				}),
			A2($elm$json$Json$Decode$field, 'n', $elm$json$Json$Decode$string),
			$elm$json$Json$Decode$at$(
				_List_fromArray(
					['o', 'a']),
				$elm$json$Json$Decode$value)) : $elm$json$Json$Decode$fail('Unexpected Html.Attribute tag: ' + tag))));
	},
	A2($elm$json$Json$Decode$field, '$', $elm$json$Json$Decode$string));
var $elm_explorations$test$Test$Html$Internal$Inert$parseAttribute = function (attr) {
	var _v0 = A2(
		$elm$json$Json$Decode$decodeValue,
		$elm_explorations$test$Test$Html$Internal$ElmHtml$InternalTypes$decodeAttribute,
		$elm_explorations$test$Test$Html$Internal$Inert$attributeToJson(attr));
	if (_v0.$ === 'Ok') {
		var parsedAttribute = _v0.a;
		return $elm$core$Result$Ok(parsedAttribute);
	} else {
		var jsonError = _v0.a;
		return $elm$core$Result$Err(
			'Error internally processing Attribute for testing - please report this error message as a bug: ' + $elm$json$Json$Decode$errorToString(jsonError));
	}
};
var $elm$core$String$toLower = _String_toLower;
var $elm$core$Result$withDefault$ = function (def, result) {
	if (result.$ === 'Ok') {
		var a = result.a;
		return a;
	} else {
		return def;
	}
};
var $elm$core$Result$withDefault = F2($elm$core$Result$withDefault$);
var $elm_explorations$test$Test$Html$Selector$attribute = function (attr) {
	var _v0 = $elm_explorations$test$Test$Html$Internal$Inert$parseAttribute(attr);
	_v0$3:
	while (true) {
		if (_v0.$ === 'Ok') {
			switch (_v0.a.$) {
				case 'Attribute':
					var value = _v0.a.a.value;
					var key = _v0.a.a.key;
					return ($elm$core$String$toLower(key) === 'class') ? $elm_explorations$test$Test$Html$Selector$Internal$Classes(
						$elm$core$String$split$(' ', value)) : $elm_explorations$test$Test$Html$Selector$Internal$namedAttr$(key, value);
				case 'Property':
					var value = _v0.a.a.value;
					var key = _v0.a.a.key;
					return (key === 'className') ? $elm_explorations$test$Test$Html$Selector$Internal$Classes(
						$elm$core$Result$withDefault$(
							_List_Nil,
							$elm$core$Result$map$(
								$elm$core$String$split(' '),
								A2($elm$json$Json$Decode$decodeValue, $elm$json$Json$Decode$string, value)))) : $elm$core$Result$withDefault$(
						$elm_explorations$test$Test$Html$Selector$Internal$Invalid,
						$elm_explorations$test$Test$Html$Selector$orElseLazy$(
							function (_v1) {
								return $elm$core$Result$map$(
									$elm_explorations$test$Test$Html$Selector$Internal$namedBoolAttr(key),
									A2($elm$json$Json$Decode$decodeValue, $elm$json$Json$Decode$bool, value));
							},
							$elm$core$Result$map$(
								$elm_explorations$test$Test$Html$Selector$Internal$namedAttr(key),
								A2($elm$json$Json$Decode$decodeValue, $elm$json$Json$Decode$string, value))));
				case 'Style':
					var value = _v0.a.a.value;
					var key = _v0.a.a.key;
					return $elm_explorations$test$Test$Html$Selector$Internal$Style(
						{key: key, value: value});
				default:
					break _v0$3;
			}
		} else {
			break _v0$3;
		}
	}
	return $elm_explorations$test$Test$Html$Selector$Internal$Invalid;
};
var $elm_explorations$test$Test$Html$Query$Internal$multipleToExpectation$ = function (_v0, check) {
	var query = _v0.b;
	var _v1 = $elm_explorations$test$Test$Html$Query$Internal$traverse(query);
	if (_v1.$ === 'Ok') {
		var list = _v1.a;
		return check(list);
	} else {
		var error = _v1.a;
		return $elm_explorations$test$Expect$fail(
			$elm_explorations$test$Test$Html$Query$Internal$queryErrorToString(error));
	}
};
var $elm_explorations$test$Test$Html$Query$Internal$multipleToExpectation = F2($elm_explorations$test$Test$Html$Query$Internal$multipleToExpectation$);
var $elm_explorations$test$Test$Html$Query$count$ = function (expect, multiple) {
	var showTrace = multiple.a;
	var query = multiple.b;
	return $elm_explorations$test$Test$Html$Query$Internal$multipleToExpectation$(
		multiple,
		A2(
			$elm$core$Basics$composeR,
			$elm$core$List$length,
			A2(
				$elm$core$Basics$composeR,
				expect,
				A3($elm_explorations$test$Test$Html$Query$Internal$failWithQuery, showTrace, 'Query.count', query))));
};
var $elm_explorations$test$Test$Html$Query$count = F2($elm_explorations$test$Test$Html$Query$count$);
var $elm_explorations$test$Test$Html$Query$Internal$FindAll = function (a) {
	return {$: 'FindAll', a: a};
};
var $elm_explorations$test$Test$Html$Query$Internal$Multiple$ = function (a, b) {
	return {$: 'Multiple', a: a, b: b};
};
var $elm_explorations$test$Test$Html$Query$Internal$Multiple = F2($elm_explorations$test$Test$Html$Query$Internal$Multiple$);
var $elm_explorations$test$Test$Html$Query$findAll$ = function (selectors, _v0) {
	var showTrace = _v0.a;
	var query = _v0.b;
	return $elm_explorations$test$Test$Html$Query$Internal$Multiple$(
		showTrace,
		$elm_explorations$test$Test$Html$Query$Internal$prependSelector$(
			query,
			$elm_explorations$test$Test$Html$Query$Internal$FindAll(selectors)));
};
var $elm_explorations$test$Test$Html$Query$findAll = F2($elm_explorations$test$Test$Html$Query$findAll$);
var $elm$json$Json$Encode$string = _Json_wrap;
var $elm$html$Html$Attributes$stringProperty$ = function (key, string) {
	return A2(
		_VirtualDom_property,
		key,
		$elm$json$Json$Encode$string(string));
};
var $elm$html$Html$Attributes$stringProperty = F2($elm$html$Html$Attributes$stringProperty$);
var $elm$html$Html$Attributes$href = function (url) {
	return $elm$html$Html$Attributes$stringProperty$(
		'href',
		_VirtualDom_noJavaScriptUri(url));
};
var $lamdera$program_test$Effect$Test$clickLink$ = function (clientId, delay, data) {
	return $lamdera$program_test$Effect$Test$Action(
		function (instructions) {
			var event = $lamdera$program_test$Effect$Test$UserInputEvent(
				{
					clientId: clientId,
					inputType: $lamdera$program_test$Effect$Test$UserClicksLink(data)
				});
			return $lamdera$program_test$Effect$Test$NextStep$(
				function (state) {
					var _v0 = $lamdera$containers$SeqDict$get$(clientId, state.frontends);
					if (_v0.$ === 'Just') {
						var frontend = _v0.a;
						if (A2($elm$core$String$startsWith, 'http://', data) || A2($elm$core$String$startsWith, 'https://', data)) {
							return $lamdera$program_test$Effect$Test$addEvent$(
								event,
								$elm$core$Maybe$Just(
									$lamdera$program_test$Effect$Test$CustomError('This event is for internal links like /home or /user/?a=0. Simulating the user clicking on links that lead to another website is not supported.')),
								state);
						} else {
							var _v1 = $elm_explorations$test$Test$Runner$getFailureReason(
								$elm_explorations$test$Test$Html$Query$count$(
									function (count) {
										return (count > 0) ? $elm_explorations$test$Expect$pass : $elm_explorations$test$Expect$fail('Expected at least one link pointing to ' + data);
									},
									$elm_explorations$test$Test$Html$Query$findAll$(
										_List_fromArray(
											[
												$elm_explorations$test$Test$Html$Selector$attribute(
												$elm$html$Html$Attributes$href(data))
											]),
										$elm_explorations$test$Test$Html$Query$fromHtml(
											A2(
												$elm$html$Html$div,
												_List_Nil,
												state.frontendApp.view(frontend.model).body)))));
							if (_v1.$ === 'Nothing') {
								var _v2 = $lamdera$program_test$Effect$Test$normalizeUrl$(state.domain, data);
								if (_v2.$ === 'Just') {
									var url = _v2.a;
									return $lamdera$program_test$Effect$Test$handleFrontendUpdate$(
										clientId,
										$lamdera$program_test$Effect$Test$currentTime(state),
										state.frontendApp.onUrlRequest(
											$elm$browser$Browser$Internal(url)),
										$lamdera$program_test$Effect$Test$addEvent$(event, $elm$core$Maybe$Nothing, state));
								} else {
									return $lamdera$program_test$Effect$Test$addEvent$(
										event,
										$elm$core$Maybe$Just(
											$lamdera$program_test$Effect$Test$InvalidLinkUrl(data)),
										state);
								}
							} else {
								return $lamdera$program_test$Effect$Test$addEvent$(
									event,
									$elm$core$Maybe$Just(
										$lamdera$program_test$Effect$Test$CustomError('Couldn\'t find a link pointing to \"' + (data + '\"'))),
									state);
							}
						}
					} else {
						return $lamdera$program_test$Effect$Test$addEvent$(
							event,
							$elm$core$Maybe$Just(
								$lamdera$program_test$Effect$Test$ClientIdNotFound(clientId)),
							state);
					}
				},
				A2(
					$lamdera$program_test$Effect$Test$wait,
					$ianmackenzie$elm_units$Duration$milliseconds(delay),
					instructions));
		});
};
var $lamdera$program_test$Effect$Test$clickLink = F3($lamdera$program_test$Effect$Test$clickLink$);
var $lamdera$program_test$Effect$Test$UserCustomEvent$ = function (a, b) {
	return {$: 'UserCustomEvent', a: a, b: b};
};
var $lamdera$program_test$Effect$Test$UserCustomEvent = F2($lamdera$program_test$Effect$Test$UserCustomEvent$);
var $lamdera$program_test$Effect$Test$custom$ = function (clientId, delay, htmlId, eventName, value) {
	return $lamdera$program_test$Effect$Test$userEvent$(
		delay,
		$lamdera$program_test$Effect$Test$UserCustomEvent$(htmlId, value),
		clientId,
		htmlId,
		_Utils_Tuple2(eventName, value));
};
var $lamdera$program_test$Effect$Test$custom = F5($lamdera$program_test$Effect$Test$custom$);
var $lamdera$program_test$Effect$Internal$ClientId = function (a) {
	return {$: 'ClientId', a: a};
};
var $lamdera$program_test$Effect$Internal$SessionId = function (a) {
	return {$: 'SessionId', a: a};
};
var $lamdera$program_test$Effect$Lamdera$clientIdToString = function (_v0) {
	var clientId = _v0.a;
	return clientId;
};
var $lamdera$program_test$Effect$Lamdera$sessionIdToString = function (_v0) {
	var sessionId = _v0.a;
	return sessionId;
};
var $lamdera$program_test$Effect$Test$getClientDisconnectSubs = function (backendSub) {
	switch (backendSub.$) {
		case 'SubBatch':
			var batch = backendSub.a;
			return $elm$core$List$foldl$(
				F2(
					function (sub, list) {
						return _Utils_ap(
							$lamdera$program_test$Effect$Test$getClientDisconnectSubs(sub),
							list);
					}),
				_List_Nil,
				batch);
		case 'OnDisconnect':
			var msg = backendSub.a;
			return _List_fromArray(
				[
					F2(
					function (sessionId, clientId) {
						return A2(
							msg,
							$lamdera$program_test$Effect$Internal$SessionId(
								$lamdera$program_test$Effect$Lamdera$sessionIdToString(sessionId)),
							$lamdera$program_test$Effect$Internal$ClientId(
								$lamdera$program_test$Effect$Lamdera$clientIdToString(clientId)));
					})
				]);
		default:
			return _List_Nil;
	}
};
var $lamdera$program_test$Effect$Test$disconnectFrontend$ = function (clientId, instructions) {
	return $lamdera$program_test$Effect$Test$AndThen$(
		function (state) {
			var _v0 = $lamdera$containers$SeqDict$get$(clientId, state.frontends);
			if (_v0.$ === 'Just') {
				var frontend = _v0.a;
				var state2 = $elm$core$List$foldl$(
					F2(
						function (msg, state3) {
							return $lamdera$program_test$Effect$Test$handleBackendUpdate$(
								$lamdera$program_test$Effect$Test$currentTime(state3),
								state3.backendApp,
								A2(msg, frontend.sessionId, clientId),
								state3);
						}),
					state,
					$lamdera$program_test$Effect$Test$getClientDisconnectSubs(
						state.backendApp.subscriptions(state.model)));
				return $lamdera$program_test$Effect$Test$Start(
					_Utils_update(
						state2,
						{
							frontends: $lamdera$containers$SeqDict$remove$(clientId, state2.frontends)
						}));
			} else {
				return $lamdera$program_test$Effect$Test$Start(state);
			}
		},
		A2(
			$lamdera$program_test$Effect$Test$wait,
			$ianmackenzie$elm_units$Duration$milliseconds(100),
			instructions));
};
var $lamdera$program_test$Effect$Test$disconnectFrontend = F2($lamdera$program_test$Effect$Test$disconnectFrontend$);
var $lamdera$program_test$Effect$Test$UserFocusEvent = function (a) {
	return {$: 'UserFocusEvent', a: a};
};
var $elm_explorations$test$Test$Html$Event$focus = _Utils_Tuple2('focus', $elm_explorations$test$Test$Html$Event$emptyObject);
var $lamdera$program_test$Effect$Test$focusEvent$ = function (clientId, delay, htmlId) {
	return $lamdera$program_test$Effect$Test$userEvent$(
		delay,
		$lamdera$program_test$Effect$Test$UserFocusEvent(htmlId),
		clientId,
		htmlId,
		$elm_explorations$test$Test$Html$Event$focus);
};
var $lamdera$program_test$Effect$Test$focusEvent = F3($lamdera$program_test$Effect$Test$focusEvent$);
var $lamdera$program_test$Effect$Test$foldList$ = function (list, a) {
	return $elm$core$List$foldl$(
		F2(
			function (item, state) {
				return item(state);
			}),
		a,
		list);
};
var $lamdera$program_test$Effect$Test$foldList = F2($lamdera$program_test$Effect$Test$foldList$);
var $lamdera$program_test$Effect$Browser$Navigation$MockNavigationKey = {$: 'MockNavigationKey'};
var $lamdera$program_test$Effect$Browser$Navigation$RealNavigationKey = function (a) {
	return {$: 'RealNavigationKey', a: a};
};
var $lamdera$program_test$Effect$Browser$Navigation$fromInternalKey = function (key) {
	if (key.$ === 'RealNavigationKey') {
		var key_ = key.a;
		return $lamdera$program_test$Effect$Browser$Navigation$RealNavigationKey(key_);
	} else {
		return $lamdera$program_test$Effect$Browser$Navigation$MockNavigationKey;
	}
};
var $elm$core$Array$fromListHelp$ = function (list, nodeList, nodeListSize) {
	fromListHelp:
	while (true) {
		var _v0 = A2($elm$core$Elm$JsArray$initializeFromList, $elm$core$Array$branchFactor, list);
		var jsArray = _v0.a;
		var remainingItems = _v0.b;
		if (_Utils_cmp(
			$elm$core$Elm$JsArray$length(jsArray),
			$elm$core$Array$branchFactor) < 0) {
			return $elm$core$Array$builderToArray$(
				true,
				{nodeList: nodeList, nodeListSize: nodeListSize, tail: jsArray});
		} else {
			var $temp$list = remainingItems,
				$temp$nodeList = A2(
				$elm$core$List$cons,
				$elm$core$Array$Leaf(jsArray),
				nodeList),
				$temp$nodeListSize = nodeListSize + 1;
			list = $temp$list;
			nodeList = $temp$nodeList;
			nodeListSize = $temp$nodeListSize;
			continue fromListHelp;
		}
	}
};
var $elm$core$Array$fromListHelp = F3($elm$core$Array$fromListHelp$);
var $elm$core$Array$fromList = function (list) {
	if (!list.b) {
		return $elm$core$Array$empty;
	} else {
		return $elm$core$Array$fromListHelp$(list, _List_Nil, 0);
	}
};
var $lamdera$program_test$Effect$Test$TestEvent$ = function (a, b) {
	return {$: 'TestEvent', a: a, b: b};
};
var $lamdera$program_test$Effect$Test$TestEvent = F2($lamdera$program_test$Effect$Test$TestEvent$);
var $lamdera$containers$SeqDict$member$ = function (key, _v0) {
	var bitmap = _v0.a;
	var nodes = _v0.b;
	var _v1 = $lamdera$containers$SeqDict$getHelp$(
		0,
		$lamdera$containers$FNV$hash(key),
		key,
		bitmap,
		nodes);
	if (_v1.$ === 'Just') {
		return true;
	} else {
		return false;
	}
};
var $lamdera$containers$SeqDict$member = F2($lamdera$containers$SeqDict$member$);
var $elm$core$Debug$toString = _Debug_toString;
var $lamdera$program_test$Effect$Test$frontendUpdate$ = function (clientId, delay, msg) {
	return $lamdera$program_test$Effect$Test$Action(
		function (instructions) {
			var event = $lamdera$program_test$Effect$Test$TestEvent$(
				$elm$core$Maybe$Just(clientId),
				'Trigger frontend update: ' + $elm$core$Debug$toString(msg));
			return $lamdera$program_test$Effect$Test$NextStep$(
				function (state) {
					return $lamdera$containers$SeqDict$member$(clientId, state.frontends) ? $lamdera$program_test$Effect$Test$handleFrontendUpdate$(
						clientId,
						$lamdera$program_test$Effect$Test$currentTime(state),
						msg,
						$lamdera$program_test$Effect$Test$addEvent$(event, $elm$core$Maybe$Nothing, state)) : $lamdera$program_test$Effect$Test$addEvent$(
						event,
						$elm$core$Maybe$Just(
							$lamdera$program_test$Effect$Test$ClientIdNotFound(clientId)),
						state);
				},
				A2(
					$lamdera$program_test$Effect$Test$wait,
					$ianmackenzie$elm_units$Duration$milliseconds(delay),
					instructions));
		});
};
var $lamdera$program_test$Effect$Test$frontendUpdate = F3($lamdera$program_test$Effect$Test$frontendUpdate$);
var $lamdera$program_test$Effect$Test$getClientConnectSubs = function (backendSub) {
	switch (backendSub.$) {
		case 'SubBatch':
			var batch = backendSub.a;
			return $elm$core$List$foldl$(
				F2(
					function (sub, list) {
						return _Utils_ap(
							$lamdera$program_test$Effect$Test$getClientConnectSubs(sub),
							list);
					}),
				_List_Nil,
				batch);
		case 'OnConnect':
			var msg = backendSub.a;
			return _List_fromArray(
				[
					F2(
					function (sessionId, clientId) {
						return A2(
							msg,
							$lamdera$program_test$Effect$Internal$SessionId(
								$lamdera$program_test$Effect$Lamdera$sessionIdToString(sessionId)),
							$lamdera$program_test$Effect$Internal$ClientId(
								$lamdera$program_test$Effect$Lamdera$clientIdToString(clientId)));
					})
				]);
		default:
			return _List_Nil;
	}
};
var $lamdera$program_test$Effect$Test$UserInputsText$ = function (a, b) {
	return {$: 'UserInputsText', a: a, b: b};
};
var $lamdera$program_test$Effect$Test$UserInputsText = F2($lamdera$program_test$Effect$Test$UserInputsText$);
var $elm_explorations$test$Test$Html$Event$input = function (value) {
	return _Utils_Tuple2(
		'input',
		$elm$json$Json$Encode$object(
			_List_fromArray(
				[
					_Utils_Tuple2(
					'target',
					$elm$json$Json$Encode$object(
						_List_fromArray(
							[
								_Utils_Tuple2(
								'value',
								$elm$json$Json$Encode$string(value))
							])))
				])));
};
var $lamdera$program_test$Effect$Test$input$ = function (clientId, delay, htmlId, text_) {
	return $lamdera$program_test$Effect$Test$userEvent$(
		delay,
		$lamdera$program_test$Effect$Test$UserInputsText$(htmlId, text_),
		clientId,
		htmlId,
		$elm_explorations$test$Test$Html$Event$input(text_));
};
var $lamdera$program_test$Effect$Test$input = F4($lamdera$program_test$Effect$Test$input$);
var $lamdera$program_test$Effect$Test$UserPressesKey$ = function (a, b, c) {
	return {$: 'UserPressesKey', a: a, b: b, c: c};
};
var $lamdera$program_test$Effect$Test$UserPressesKey = F3($lamdera$program_test$Effect$Test$UserPressesKey$);
var $elm$json$Json$Encode$bool = _Json_wrap;
var $lamdera$program_test$Effect$Test$keyDown$ = function (clientId, delay, htmlId, key, options) {
	var event2 = $elm$core$List$foldl$(
		F2(
			function (option, state) {
				switch (option.$) {
					case 'Key_ShiftHeld':
						return _Utils_update(
							state,
							{shiftKey: true});
					case 'Key_CtrlHeld':
						return _Utils_update(
							state,
							{ctrlKey: true});
					case 'Key_MetaHeld':
						return _Utils_update(
							state,
							{metaKey: true});
					default:
						return _Utils_update(
							state,
							{altKey: true});
				}
			}),
		{altKey: false, ctrlKey: false, metaKey: false, shiftKey: false},
		options);
	return $lamdera$program_test$Effect$Test$userEvent$(
		delay,
		$lamdera$program_test$Effect$Test$UserPressesKey$(htmlId, key, options),
		clientId,
		htmlId,
		_Utils_Tuple2(
			'keydown',
			$elm$json$Json$Encode$object(
				_List_fromArray(
					[
						_Utils_Tuple2(
						'key',
						$elm$json$Json$Encode$string(key)),
						_Utils_Tuple2(
						'altKey',
						$elm$json$Json$Encode$bool(event2.altKey)),
						_Utils_Tuple2(
						'ctrlKey',
						$elm$json$Json$Encode$bool(event2.ctrlKey)),
						_Utils_Tuple2(
						'metaKey',
						$elm$json$Json$Encode$bool(event2.metaKey)),
						_Utils_Tuple2(
						'shiftKey',
						$elm$json$Json$Encode$bool(event2.shiftKey))
					]))));
};
var $lamdera$program_test$Effect$Test$keyDown = F5($lamdera$program_test$Effect$Test$keyDown$);
var $lamdera$program_test$Effect$Test$keyUp$ = function (clientId, delay, htmlId, key, options) {
	var event2 = $elm$core$List$foldl$(
		F2(
			function (option, state) {
				switch (option.$) {
					case 'Key_ShiftHeld':
						return _Utils_update(
							state,
							{shiftKey: true});
					case 'Key_CtrlHeld':
						return _Utils_update(
							state,
							{ctrlKey: true});
					case 'Key_MetaHeld':
						return _Utils_update(
							state,
							{metaKey: true});
					default:
						return _Utils_update(
							state,
							{altKey: true});
				}
			}),
		{altKey: false, ctrlKey: false, metaKey: false, shiftKey: false},
		options);
	return $lamdera$program_test$Effect$Test$userEvent$(
		delay,
		$lamdera$program_test$Effect$Test$UserPressesKey$(htmlId, key, options),
		clientId,
		htmlId,
		_Utils_Tuple2(
			'keyup',
			$elm$json$Json$Encode$object(
				_List_fromArray(
					[
						_Utils_Tuple2(
						'key',
						$elm$json$Json$Encode$string(key)),
						_Utils_Tuple2(
						'altKey',
						$elm$json$Json$Encode$bool(event2.altKey)),
						_Utils_Tuple2(
						'ctrlKey',
						$elm$json$Json$Encode$bool(event2.ctrlKey)),
						_Utils_Tuple2(
						'metaKey',
						$elm$json$Json$Encode$bool(event2.metaKey)),
						_Utils_Tuple2(
						'shiftKey',
						$elm$json$Json$Encode$bool(event2.shiftKey))
					]))));
};
var $lamdera$program_test$Effect$Test$keyUp = F5($lamdera$program_test$Effect$Test$keyUp$);
var $lamdera$program_test$Effect$Test$NavigateBack = function (a) {
	return {$: 'NavigateBack', a: a};
};
var $lamdera$program_test$Effect$Test$navigateBackAction$ = function (clientId, delay) {
	return $lamdera$program_test$Effect$Test$Action(
		function (instructions) {
			return $lamdera$program_test$Effect$Test$NextStep$(
				function (state) {
					var _v0 = $lamdera$containers$SeqDict$get$(clientId, state.frontends);
					if (_v0.$ === 'Just') {
						var frontend = _v0.a;
						var navigation = $lamdera$program_test$Effect$Test$navigateBack$(1, frontend.navigation);
						return $lamdera$program_test$Effect$Test$handleFrontendUpdate$(
							clientId,
							$lamdera$program_test$Effect$Test$currentTime(state),
							state.frontendApp.onUrlChange(navigation.url),
							$lamdera$program_test$Effect$Test$addEvent$(
								$lamdera$program_test$Effect$Test$NavigateBack(clientId),
								$elm$core$Maybe$Nothing,
								_Utils_update(
									state,
									{
										frontends: $lamdera$containers$SeqDict$insert$(
											clientId,
											_Utils_update(
												frontend,
												{navigation: navigation}),
											state.frontends)
									})));
					} else {
						return $lamdera$program_test$Effect$Test$addEvent$(
							$lamdera$program_test$Effect$Test$NavigateBack(clientId),
							$elm$core$Maybe$Just(
								$lamdera$program_test$Effect$Test$ClientIdNotFound(clientId)),
							state);
					}
				},
				A2(
					$lamdera$program_test$Effect$Test$wait,
					$ianmackenzie$elm_units$Duration$milliseconds(delay),
					instructions));
		});
};
var $lamdera$program_test$Effect$Test$navigateBackAction = F2($lamdera$program_test$Effect$Test$navigateBackAction$);
var $lamdera$program_test$Effect$Test$NavigateForward = function (a) {
	return {$: 'NavigateForward', a: a};
};
var $lamdera$program_test$Effect$Test$navigateForwardAction$ = function (clientId, delay) {
	return $lamdera$program_test$Effect$Test$Action(
		function (instructions) {
			return $lamdera$program_test$Effect$Test$NextStep$(
				function (state) {
					var _v0 = $lamdera$containers$SeqDict$get$(clientId, state.frontends);
					if (_v0.$ === 'Just') {
						var frontend = _v0.a;
						var navigation = $lamdera$program_test$Effect$Test$navigateForward$(1, frontend.navigation);
						return $lamdera$program_test$Effect$Test$handleFrontendUpdate$(
							clientId,
							$lamdera$program_test$Effect$Test$currentTime(state),
							state.frontendApp.onUrlChange(navigation.url),
							$lamdera$program_test$Effect$Test$addEvent$(
								$lamdera$program_test$Effect$Test$NavigateForward(clientId),
								$elm$core$Maybe$Nothing,
								_Utils_update(
									state,
									{
										frontends: $lamdera$containers$SeqDict$insert$(
											clientId,
											_Utils_update(
												frontend,
												{navigation: navigation}),
											state.frontends)
									})));
					} else {
						return $lamdera$program_test$Effect$Test$addEvent$(
							$lamdera$program_test$Effect$Test$NavigateForward(clientId),
							$elm$core$Maybe$Just(
								$lamdera$program_test$Effect$Test$ClientIdNotFound(clientId)),
							state);
					}
				},
				A2(
					$lamdera$program_test$Effect$Test$wait,
					$ianmackenzie$elm_units$Duration$milliseconds(delay),
					instructions));
		});
};
var $lamdera$program_test$Effect$Test$navigateForwardAction = F2($lamdera$program_test$Effect$Test$navigateForwardAction$);
var $lamdera$program_test$Effect$Test$ManuallySendPortEvent = function (a) {
	return {$: 'ManuallySendPortEvent', a: a};
};
var $lamdera$program_test$Effect$Test$PortEventNotHandled = function (a) {
	return {$: 'PortEventNotHandled', a: a};
};
var $lamdera$program_test$Effect$Test$portEvent$ = function (clientId, delay, portName, value) {
	return $lamdera$program_test$Effect$Test$Action(
		function (instructions) {
			return $lamdera$program_test$Effect$Test$NextStep$(
				function (state) {
					var _v0 = $lamdera$containers$SeqDict$get$(clientId, state.frontends);
					if (_v0.$ === 'Just') {
						var frontend = _v0.a;
						var msgs = $elm$core$List$filterMap$(
							function (a) {
								return _Utils_eq(a.portName, portName) ? $elm$core$Maybe$Just(
									a.msg(value)) : $elm$core$Maybe$Nothing;
							},
							$lamdera$program_test$Effect$Test$getPortSubscriptions(
								state.frontendApp.subscriptions(frontend.model)));
						return $elm$core$List$isEmpty(msgs) ? $lamdera$program_test$Effect$Test$addEvent$(
							$lamdera$program_test$Effect$Test$ManuallySendPortEvent(
								{clientId: clientId, portName: portName, value: value}),
							$elm$core$Maybe$Just(
								$lamdera$program_test$Effect$Test$PortEventNotHandled(portName)),
							state) : $elm$core$List$foldl$(
							A2(
								$lamdera$program_test$Effect$Test$handleFrontendUpdate,
								clientId,
								$lamdera$program_test$Effect$Test$currentTime(state)),
							$lamdera$program_test$Effect$Test$addEvent$(
								$lamdera$program_test$Effect$Test$ManuallySendPortEvent(
									{clientId: clientId, portName: portName, value: value}),
								$elm$core$Maybe$Nothing,
								state),
							msgs);
					} else {
						return $lamdera$program_test$Effect$Test$addEvent$(
							$lamdera$program_test$Effect$Test$ManuallySendPortEvent(
								{clientId: clientId, portName: portName, value: value}),
							$elm$core$Maybe$Just(
								$lamdera$program_test$Effect$Test$ClientIdNotFound(clientId)),
							state);
					}
				},
				A2(
					$lamdera$program_test$Effect$Test$wait,
					$ianmackenzie$elm_units$Duration$milliseconds(delay),
					instructions));
		});
};
var $lamdera$program_test$Effect$Test$portEvent = F4($lamdera$program_test$Effect$Test$portEvent$);
var $lamdera$program_test$Effect$Test$UserResizesWindow = function (a) {
	return {$: 'UserResizesWindow', a: a};
};
var $lamdera$program_test$Effect$Test$getWindowResizeSubscriptions = function (subscription) {
	switch (subscription.$) {
		case 'SubBatch':
			var subscriptions = subscription.a;
			return $elm$core$List$concatMap$($lamdera$program_test$Effect$Test$getWindowResizeSubscriptions, subscriptions);
		case 'OnResize':
			var msg = subscription.a;
			return _List_fromArray(
				[
					{msg: msg}
				]);
		default:
			return _List_Nil;
	}
};
var $lamdera$program_test$Effect$Test$resizeWindow$ = function (clientId, delay, windowSize) {
	return $lamdera$program_test$Effect$Test$Action(
		function (instructions) {
			var event = $lamdera$program_test$Effect$Test$UserInputEvent(
				{
					clientId: clientId,
					inputType: $lamdera$program_test$Effect$Test$UserResizesWindow(windowSize)
				});
			return $lamdera$program_test$Effect$Test$NextStep$(
				function (state) {
					var _v0 = $lamdera$containers$SeqDict$get$(clientId, state.frontends);
					if (_v0.$ === 'Just') {
						var frontend = _v0.a;
						var msgs = $elm$core$List$map$(
							function (_v1) {
								var msg = _v1.msg;
								return A2(msg, windowSize.width, windowSize.height);
							},
							$lamdera$program_test$Effect$Test$getWindowResizeSubscriptions(
								state.frontendApp.subscriptions(frontend.model)));
						return $elm$core$List$foldl$(
							A2(
								$lamdera$program_test$Effect$Test$handleFrontendUpdate,
								clientId,
								$lamdera$program_test$Effect$Test$currentTime(state)),
							$lamdera$program_test$Effect$Test$addEvent$(
								event,
								$elm$core$Maybe$Nothing,
								_Utils_update(
									state,
									{
										frontends: $lamdera$containers$SeqDict$insert$(
											clientId,
											_Utils_update(
												frontend,
												{windowSize: windowSize}),
											state.frontends)
									})),
							msgs);
					} else {
						return $lamdera$program_test$Effect$Test$addEvent$(
							event,
							$elm$core$Maybe$Just(
								$lamdera$program_test$Effect$Test$ClientIdNotFound(clientId)),
							state);
					}
				},
				A2(
					$lamdera$program_test$Effect$Test$wait,
					$ianmackenzie$elm_units$Duration$milliseconds(delay),
					instructions));
		});
};
var $lamdera$program_test$Effect$Test$resizeWindow = F3($lamdera$program_test$Effect$Test$resizeWindow$);
var $lamdera$program_test$Effect$Test$ManuallySendToBackend = function (a) {
	return {$: 'ManuallySendToBackend', a: a};
};
var $lamdera$program_test$Effect$Test$sendToBackend$ = function (clientId, delay, toBackend) {
	return $lamdera$program_test$Effect$Test$Action(
		function (instructions) {
			return $lamdera$program_test$Effect$Test$NextStep$(
				function (state) {
					var _v0 = $lamdera$containers$SeqDict$get$(clientId, state.frontends);
					if (_v0.$ === 'Just') {
						var frontend = _v0.a;
						return $lamdera$program_test$Effect$Test$handleUpdateFromFrontend$(
							{
								clientId: clientId,
								sessionId: frontend.sessionId,
								stepIndex: $elm$core$Array$length(state.history),
								toBackend: toBackend
							},
							$lamdera$program_test$Effect$Test$addEvent$(
								$lamdera$program_test$Effect$Test$ManuallySendToBackend(
									{clientId: clientId, toBackend: toBackend}),
								$elm$core$Maybe$Nothing,
								state));
					} else {
						return $lamdera$program_test$Effect$Test$addEvent$(
							$lamdera$program_test$Effect$Test$ManuallySendToBackend(
								{clientId: clientId, toBackend: toBackend}),
							$elm$core$Maybe$Just(
								$lamdera$program_test$Effect$Test$ClientIdNotFound(clientId)),
							state);
					}
				},
				A2(
					$lamdera$program_test$Effect$Test$wait,
					$ianmackenzie$elm_units$Duration$milliseconds(delay),
					instructions));
		});
};
var $lamdera$program_test$Effect$Test$sendToBackend = F3($lamdera$program_test$Effect$Test$sendToBackend$);
var $lamdera$program_test$Effect$Test$SnapshotEvent = function (a) {
	return {$: 'SnapshotEvent', a: a};
};
var $lamdera$program_test$Effect$Test$snapshotView$ = function (clientId, delay, data) {
	return $lamdera$program_test$Effect$Test$Action(
		function (instructions) {
			return $lamdera$program_test$Effect$Test$NextStep$(
				function (state) {
					var _v0 = $lamdera$containers$SeqDict$get$(clientId, state.frontends);
					if (_v0.$ === 'Just') {
						var frontend = _v0.a;
						return $lamdera$program_test$Effect$Test$addEvent$(
							$lamdera$program_test$Effect$Test$SnapshotEvent(
								{clientId: clientId, name: data.name}),
							$elm$core$Maybe$Nothing,
							_Utils_update(
								state,
								{
									snapshots: A2(
										$elm$core$List$cons,
										{
											body: state.frontendApp.view(frontend.model).body,
											height: frontend.windowSize.height,
											name: data.name,
											width: frontend.windowSize.width
										},
										state.snapshots)
								}));
					} else {
						return $lamdera$program_test$Effect$Test$addEvent$(
							$lamdera$program_test$Effect$Test$SnapshotEvent(
								{clientId: clientId, name: data.name}),
							$elm$core$Maybe$Just(
								$lamdera$program_test$Effect$Test$ClientIdNotFound(clientId)),
							state);
					}
				},
				A2(
					$lamdera$program_test$Effect$Test$wait,
					$ianmackenzie$elm_units$Duration$milliseconds(delay),
					instructions));
		});
};
var $lamdera$program_test$Effect$Test$snapshotView = F3($lamdera$program_test$Effect$Test$snapshotView$);
var $elm$json$Json$Encode$float = _Json_wrap;
var $elm$json$Json$Encode$int = _Json_wrap;
var $lamdera$program_test$Effect$Test$MainButton = {$: 'MainButton'};
var $elm$core$Tuple$second = function (_v0) {
	var y = _v0.b;
	return y;
};
var $lamdera$program_test$Effect$Test$projectPointerEventOptions$ = function (offsetPos, options) {
	return $elm$core$List$foldl$(
		F2(
			function (option, state) {
				switch (option.$) {
					case 'PointerType':
						var a = option.a;
						return _Utils_update(
							state,
							{pointerType: a});
					case 'PointerId':
						var _int = option.a;
						return _Utils_update(
							state,
							{pointerId: _int});
					case 'ScreenXY':
						var x = option.a;
						var y = option.b;
						return _Utils_update(
							state,
							{screenX: x, screenY: y});
					case 'PageXY':
						var x = option.a;
						var y = option.b;
						return _Utils_update(
							state,
							{pageX: x, pageY: y});
					case 'ClientXY':
						var x = option.a;
						var y = option.b;
						return _Utils_update(
							state,
							{clientX: x, clientY: y});
					case 'ShiftHeld':
						return _Utils_update(
							state,
							{shiftKey: true});
					case 'CtrlHeld':
						return _Utils_update(
							state,
							{ctrlKey: true});
					case 'MetaHeld':
						return _Utils_update(
							state,
							{metaKey: true});
					case 'AltHeld':
						return _Utils_update(
							state,
							{altKey: true});
					case 'IsNotPrimary':
						return _Utils_update(
							state,
							{isPrimary: false});
					case 'PointerWidth':
						var _float = option.a;
						return _Utils_update(
							state,
							{width: _float});
					case 'PointerHeight':
						var _float = option.a;
						return _Utils_update(
							state,
							{height: _float});
					case 'PointerPressure':
						var _float = option.a;
						return _Utils_update(
							state,
							{pressure: _float});
					case 'PointerTilt':
						var x = option.a;
						var y = option.b;
						return _Utils_update(
							state,
							{tiltX: x, tiltY: y});
					default:
						var button2 = option.a;
						return _Utils_update(
							state,
							{button: button2});
				}
			}),
		{altKey: false, button: $lamdera$program_test$Effect$Test$MainButton, clientX: offsetPos.a, clientY: offsetPos.b, ctrlKey: false, height: 1, isPrimary: true, metaKey: false, pageX: offsetPos.a, pageY: offsetPos.b, pointerId: 0, pointerType: '', pressure: 1, screenX: offsetPos.a, screenY: offsetPos.b, shiftKey: false, tiltX: 0, tiltY: 0, width: 1},
		options);
};
var $lamdera$program_test$Effect$Test$projectPointerEventOptions = F2($lamdera$program_test$Effect$Test$projectPointerEventOptions$);
var $lamdera$program_test$Effect$Test$userMouseEvent$ = function (eventName, userEventFunc, clientId, delay, htmlId, event, options) {
	var eventOptions = $lamdera$program_test$Effect$Test$projectPointerEventOptions$(event, options);
	return $lamdera$program_test$Effect$Test$userEvent$(
		delay,
		A2(userEventFunc, htmlId, event),
		clientId,
		htmlId,
		_Utils_Tuple2(
			eventName,
			$elm$json$Json$Encode$object(
				_List_fromArray(
					[
						_Utils_Tuple2(
						'ctrlKey',
						$elm$json$Json$Encode$bool(eventOptions.ctrlKey)),
						_Utils_Tuple2(
						'shiftKey',
						$elm$json$Json$Encode$bool(eventOptions.shiftKey)),
						_Utils_Tuple2(
						'metaKey',
						$elm$json$Json$Encode$bool(eventOptions.metaKey)),
						_Utils_Tuple2(
						'altKey',
						$elm$json$Json$Encode$bool(eventOptions.altKey)),
						_Utils_Tuple2(
						'clientX',
						$elm$json$Json$Encode$float(eventOptions.clientX)),
						_Utils_Tuple2(
						'clientY',
						$elm$json$Json$Encode$float(eventOptions.clientY)),
						_Utils_Tuple2(
						'x',
						$elm$json$Json$Encode$float(eventOptions.clientX)),
						_Utils_Tuple2(
						'y',
						$elm$json$Json$Encode$float(eventOptions.clientY)),
						_Utils_Tuple2(
						'offsetX',
						$elm$json$Json$Encode$float(event.a)),
						_Utils_Tuple2(
						'offsetY',
						$elm$json$Json$Encode$float(event.b)),
						_Utils_Tuple2(
						'pageX',
						$elm$json$Json$Encode$float(eventOptions.pageX)),
						_Utils_Tuple2(
						'pageY',
						$elm$json$Json$Encode$float(eventOptions.pageY)),
						_Utils_Tuple2(
						'screenX',
						$elm$json$Json$Encode$float(eventOptions.screenX)),
						_Utils_Tuple2(
						'screenY',
						$elm$json$Json$Encode$float(eventOptions.screenY)),
						_Utils_Tuple2(
						'button',
						$elm$json$Json$Encode$int(
							function () {
								var _v0 = eventOptions.button;
								switch (_v0.$) {
									case 'MainButton':
										return 0;
									case 'MiddleButton':
										return 1;
									case 'SecondButton':
										return 2;
									case 'BackButton':
										return 3;
									default:
										return 4;
								}
							}()))
					]))));
};
var $lamdera$program_test$Effect$Test$userMouseEvent = F7($lamdera$program_test$Effect$Test$userMouseEvent$);
var $lamdera$program_test$Effect$Test$userPointerEvent$ = function (eventName, userEventFunc, clientId, delay, htmlId, event, options) {
	var eventOptions = $lamdera$program_test$Effect$Test$projectPointerEventOptions$(event, options);
	return $lamdera$program_test$Effect$Test$userEvent$(
		delay,
		A2(userEventFunc, htmlId, event),
		clientId,
		htmlId,
		_Utils_Tuple2(
			eventName,
			$elm$json$Json$Encode$object(
				_List_fromArray(
					[
						_Utils_Tuple2(
						'ctrlKey',
						$elm$json$Json$Encode$bool(eventOptions.ctrlKey)),
						_Utils_Tuple2(
						'shiftKey',
						$elm$json$Json$Encode$bool(eventOptions.shiftKey)),
						_Utils_Tuple2(
						'metaKey',
						$elm$json$Json$Encode$bool(eventOptions.metaKey)),
						_Utils_Tuple2(
						'altKey',
						$elm$json$Json$Encode$bool(eventOptions.altKey)),
						_Utils_Tuple2(
						'clientX',
						$elm$json$Json$Encode$float(eventOptions.clientX)),
						_Utils_Tuple2(
						'clientY',
						$elm$json$Json$Encode$float(eventOptions.clientY)),
						_Utils_Tuple2(
						'x',
						$elm$json$Json$Encode$float(eventOptions.clientX)),
						_Utils_Tuple2(
						'y',
						$elm$json$Json$Encode$float(eventOptions.clientY)),
						_Utils_Tuple2(
						'offsetX',
						$elm$json$Json$Encode$float(event.a)),
						_Utils_Tuple2(
						'offsetY',
						$elm$json$Json$Encode$float(event.b)),
						_Utils_Tuple2(
						'pageX',
						$elm$json$Json$Encode$float(eventOptions.pageX)),
						_Utils_Tuple2(
						'pageY',
						$elm$json$Json$Encode$float(eventOptions.pageY)),
						_Utils_Tuple2(
						'screenX',
						$elm$json$Json$Encode$float(eventOptions.screenX)),
						_Utils_Tuple2(
						'screenY',
						$elm$json$Json$Encode$float(eventOptions.screenY)),
						_Utils_Tuple2(
						'button',
						$elm$json$Json$Encode$int(
							function () {
								var _v0 = eventOptions.button;
								switch (_v0.$) {
									case 'MainButton':
										return 0;
									case 'MiddleButton':
										return 1;
									case 'SecondButton':
										return 2;
									case 'BackButton':
										return 3;
									default:
										return 4;
								}
							}())),
						_Utils_Tuple2(
						'pointerType',
						$elm$json$Json$Encode$string(eventOptions.pointerType)),
						_Utils_Tuple2(
						'pointerId',
						$elm$json$Json$Encode$int(eventOptions.pointerId)),
						_Utils_Tuple2(
						'isPrimary',
						$elm$json$Json$Encode$bool(eventOptions.isPrimary)),
						_Utils_Tuple2(
						'width',
						$elm$json$Json$Encode$float(eventOptions.width)),
						_Utils_Tuple2(
						'height',
						$elm$json$Json$Encode$float(eventOptions.height)),
						_Utils_Tuple2(
						'pressure',
						$elm$json$Json$Encode$float(eventOptions.pressure)),
						_Utils_Tuple2(
						'tiltX',
						$elm$json$Json$Encode$float(eventOptions.tiltX)),
						_Utils_Tuple2(
						'tiltY',
						$elm$json$Json$Encode$float(eventOptions.tiltY))
					]))));
};
var $lamdera$program_test$Effect$Test$userPointerEvent = F7($lamdera$program_test$Effect$Test$userPointerEvent$);
var $lamdera$containers$SeqDict$fromList = function (list) {
	return $elm$core$List$foldl$(
		F2(
			function (_v0, acc) {
				var key = _v0.a;
				var value = _v0.b;
				return $lamdera$containers$SeqDict$insert$(key, value, acc);
			}),
		$lamdera$containers$SeqDict$empty,
		list);
};
var $elm$json$Json$Encode$list$ = function (func, entries) {
	return _Json_wrap(
		$elm$core$List$foldl$(
			_Json_addEntry(func),
			_Json_emptyArray(_Utils_Tuple0),
			entries));
};
var $elm$json$Json$Encode$list = F2($elm$json$Json$Encode$list$);
var $lamdera$program_test$Effect$Test$userTouchEvent$ = function (eventName, userEventFunc, clientId, delay, htmlId, event) {
	var touchJson = function (event2) {
		return $elm$json$Json$Encode$object(
			_List_fromArray(
				[
					_Utils_Tuple2(
					'identifier',
					$elm$json$Json$Encode$int(event2.id)),
					_Utils_Tuple2(
					'clientX',
					$elm$json$Json$Encode$float(event2.clientPos.a)),
					_Utils_Tuple2(
					'clientY',
					$elm$json$Json$Encode$float(event2.clientPos.b)),
					_Utils_Tuple2(
					'pageX',
					$elm$json$Json$Encode$float(event2.pagePos.a)),
					_Utils_Tuple2(
					'pageY',
					$elm$json$Json$Encode$float(event2.pagePos.b)),
					_Utils_Tuple2(
					'screenX',
					$elm$json$Json$Encode$float(event2.screenPos.a)),
					_Utils_Tuple2(
					'screenY',
					$elm$json$Json$Encode$float(event2.screenPos.b))
				]));
	};
	return $lamdera$program_test$Effect$Test$userEvent$(
		delay,
		A2(userEventFunc, htmlId, event),
		clientId,
		htmlId,
		_Utils_Tuple2(
			eventName,
			$elm$json$Json$Encode$object(
				_List_fromArray(
					[
						_Utils_Tuple2(
						'ctrlKey',
						$elm$json$Json$Encode$bool(false)),
						_Utils_Tuple2(
						'shiftKey',
						$elm$json$Json$Encode$bool(false)),
						_Utils_Tuple2(
						'metaKey',
						$elm$json$Json$Encode$bool(false)),
						_Utils_Tuple2(
						'altKey',
						$elm$json$Json$Encode$bool(false)),
						_Utils_Tuple2(
						'changedTouches',
						$elm$json$Json$Encode$list$(touchJson, event.changedTouches)),
						_Utils_Tuple2(
						'targetTouches',
						$elm$json$Json$Encode$list$(touchJson, event.targetTouches)),
						_Utils_Tuple2(
						'touches',
						$elm$json$Json$Encode$list$(
							touchJson,
							$lamdera$containers$SeqDict$values(
								$lamdera$containers$SeqDict$fromList(
									$elm$core$List$map$(
										function (a) {
											return _Utils_Tuple2(a.id, a);
										},
										_Utils_ap(event.changedTouches, event.targetTouches))))))
					]))));
};
var $lamdera$program_test$Effect$Test$userTouchEvent = F6($lamdera$program_test$Effect$Test$userTouchEvent$);
var $lamdera$program_test$Effect$Test$UserWheelEvent = function (a) {
	return {$: 'UserWheelEvent', a: a};
};
var $lamdera$program_test$Effect$Test$userWheelEvent$ = function (clientId, delay, htmlId, deltaY, offsetPos, wheelOptions, options) {
	var eventOptions = $lamdera$program_test$Effect$Test$projectPointerEventOptions$(offsetPos, options);
	var event3 = $elm$core$List$foldl$(
		F2(
			function (option, state) {
				switch (option.$) {
					case 'DeltaX':
						var a = option.a;
						return _Utils_update(
							state,
							{deltaX: a});
					case 'DeltaZ':
						var a = option.a;
						return _Utils_update(
							state,
							{deltaZ: a});
					default:
						var deltaMode = option.a;
						return _Utils_update(
							state,
							{
								deltaMode: function () {
									if (deltaMode.$ === 'DeltaLines') {
										return 1;
									} else {
										return 2;
									}
								}()
							});
				}
			}),
		{deltaMode: 0, deltaX: 0, deltaZ: 0},
		wheelOptions);
	return $lamdera$program_test$Effect$Test$userEvent$(
		delay,
		$lamdera$program_test$Effect$Test$UserWheelEvent(htmlId),
		clientId,
		htmlId,
		_Utils_Tuple2(
			'wheel',
			$elm$json$Json$Encode$object(
				_List_fromArray(
					[
						_Utils_Tuple2(
						'deltaX',
						$elm$json$Json$Encode$float(event3.deltaX)),
						_Utils_Tuple2(
						'deltaY',
						$elm$json$Json$Encode$float(deltaY)),
						_Utils_Tuple2(
						'deltaZ',
						$elm$json$Json$Encode$float(event3.deltaZ)),
						_Utils_Tuple2(
						'deltaMode',
						$elm$json$Json$Encode$float(event3.deltaMode)),
						_Utils_Tuple2(
						'ctrlKey',
						$elm$json$Json$Encode$bool(eventOptions.ctrlKey)),
						_Utils_Tuple2(
						'shiftKey',
						$elm$json$Json$Encode$bool(eventOptions.shiftKey)),
						_Utils_Tuple2(
						'metaKey',
						$elm$json$Json$Encode$bool(eventOptions.metaKey)),
						_Utils_Tuple2(
						'altKey',
						$elm$json$Json$Encode$bool(eventOptions.altKey)),
						_Utils_Tuple2(
						'clientX',
						$elm$json$Json$Encode$float(eventOptions.clientX)),
						_Utils_Tuple2(
						'clientY',
						$elm$json$Json$Encode$float(eventOptions.clientY)),
						_Utils_Tuple2(
						'x',
						$elm$json$Json$Encode$float(eventOptions.clientX)),
						_Utils_Tuple2(
						'y',
						$elm$json$Json$Encode$float(eventOptions.clientY)),
						_Utils_Tuple2(
						'offsetX',
						$elm$json$Json$Encode$float(offsetPos.a)),
						_Utils_Tuple2(
						'offsetY',
						$elm$json$Json$Encode$float(offsetPos.b)),
						_Utils_Tuple2(
						'pageX',
						$elm$json$Json$Encode$float(eventOptions.pageX)),
						_Utils_Tuple2(
						'pageY',
						$elm$json$Json$Encode$float(eventOptions.pageY)),
						_Utils_Tuple2(
						'screenX',
						$elm$json$Json$Encode$float(eventOptions.screenX)),
						_Utils_Tuple2(
						'screenY',
						$elm$json$Json$Encode$float(eventOptions.screenY)),
						_Utils_Tuple2(
						'button',
						$elm$json$Json$Encode$int(
							function () {
								var _v0 = eventOptions.button;
								switch (_v0.$) {
									case 'MainButton':
										return 0;
									case 'MiddleButton':
										return 1;
									case 'SecondButton':
										return 2;
									case 'BackButton':
										return 3;
									default:
										return 4;
								}
							}()))
					]))));
};
var $lamdera$program_test$Effect$Test$userWheelEvent = F7($lamdera$program_test$Effect$Test$userWheelEvent$);
var $lamdera$program_test$Effect$Test$connectFrontend$ = function (delay, sessionId, url, windowSize, andThenFunc) {
	return $lamdera$program_test$Effect$Test$Action(
		function (instructions) {
			return $lamdera$program_test$Effect$Test$AndThen$(
				function (state) {
					var maybeUrl = $lamdera$program_test$Effect$Test$normalizeUrl$(state.domain, url);
					var clientId = $lamdera$program_test$Effect$Lamdera$clientIdFromString(
						'clientId ' + $elm$core$String$fromInt(state.counter));
					var list = andThenFunc(
						{
							blur: $lamdera$program_test$Effect$Test$blurEvent(clientId),
							checkModel: $lamdera$program_test$Effect$Test$checkFrontend(clientId),
							checkView: $lamdera$program_test$Effect$Test$checkView(clientId),
							click: $lamdera$program_test$Effect$Test$click(clientId),
							clickLink: $lamdera$program_test$Effect$Test$clickLink(clientId),
							clientId: clientId,
							custom: $lamdera$program_test$Effect$Test$custom(clientId),
							focus: $lamdera$program_test$Effect$Test$focusEvent(clientId),
							input: $lamdera$program_test$Effect$Test$input(clientId),
							keyDown: $lamdera$program_test$Effect$Test$keyDown(clientId),
							keyUp: $lamdera$program_test$Effect$Test$keyUp(clientId),
							mouseDown: A3($lamdera$program_test$Effect$Test$userMouseEvent, 'mousedown', $lamdera$program_test$Effect$Test$UserMouseDownEvent, clientId),
							mouseEnter: A3($lamdera$program_test$Effect$Test$userMouseEvent, 'mouseenter', $lamdera$program_test$Effect$Test$UserMouseEnterEvent, clientId),
							mouseLeave: A3($lamdera$program_test$Effect$Test$userMouseEvent, 'mouseleave', $lamdera$program_test$Effect$Test$UserMouseLeaveEvent, clientId),
							mouseMove: A3($lamdera$program_test$Effect$Test$userMouseEvent, 'mousemove', $lamdera$program_test$Effect$Test$UserMouseMoveEvent, clientId),
							mouseOut: A3($lamdera$program_test$Effect$Test$userMouseEvent, 'mouseout', $lamdera$program_test$Effect$Test$UserMouseOutEvent, clientId),
							mouseOver: A3($lamdera$program_test$Effect$Test$userMouseEvent, 'mouseover', $lamdera$program_test$Effect$Test$UserMouseOverEvent, clientId),
							mouseUp: A3($lamdera$program_test$Effect$Test$userMouseEvent, 'mouseup', $lamdera$program_test$Effect$Test$UserMouseUpEvent, clientId),
							navigateBack: $lamdera$program_test$Effect$Test$navigateBackAction(clientId),
							navigateForward: $lamdera$program_test$Effect$Test$navigateForwardAction(clientId),
							pointerCancel: A3($lamdera$program_test$Effect$Test$userPointerEvent, 'pointercancel', $lamdera$program_test$Effect$Test$UserPointerCancelEvent, clientId),
							pointerDown: A3($lamdera$program_test$Effect$Test$userPointerEvent, 'pointerdown', $lamdera$program_test$Effect$Test$UserPointerDownEvent, clientId),
							pointerEnter: A3($lamdera$program_test$Effect$Test$userPointerEvent, 'pointerenter', $lamdera$program_test$Effect$Test$UserPointerEnterEvent, clientId),
							pointerLeave: A3($lamdera$program_test$Effect$Test$userPointerEvent, 'pointerleave', $lamdera$program_test$Effect$Test$UserPointerLeaveEvent, clientId),
							pointerMove: A3($lamdera$program_test$Effect$Test$userPointerEvent, 'pointermove', $lamdera$program_test$Effect$Test$UserPointerMoveEvent, clientId),
							pointerOut: A3($lamdera$program_test$Effect$Test$userPointerEvent, 'pointerout', $lamdera$program_test$Effect$Test$UserPointerOutEvent, clientId),
							pointerOver: A3($lamdera$program_test$Effect$Test$userPointerEvent, 'pointerover', $lamdera$program_test$Effect$Test$UserPointerOverEvent, clientId),
							pointerUp: A3($lamdera$program_test$Effect$Test$userPointerEvent, 'pointerup', $lamdera$program_test$Effect$Test$UserPointerUpEvent, clientId),
							portEvent: $lamdera$program_test$Effect$Test$portEvent(clientId),
							resizeWindow: $lamdera$program_test$Effect$Test$resizeWindow(clientId),
							sendToBackend: $lamdera$program_test$Effect$Test$sendToBackend(clientId),
							snapshotView: $lamdera$program_test$Effect$Test$snapshotView(clientId),
							touchCancel: A3($lamdera$program_test$Effect$Test$userTouchEvent, 'touchcancel', $lamdera$program_test$Effect$Test$UserTouchCancelEvent, clientId),
							touchEnd: A3($lamdera$program_test$Effect$Test$userTouchEvent, 'touchend', $lamdera$program_test$Effect$Test$UserTouchEndEvent, clientId),
							touchMove: A3($lamdera$program_test$Effect$Test$userTouchEvent, 'touchmove', $lamdera$program_test$Effect$Test$UserTouchMoveEvent, clientId),
							touchStart: A3($lamdera$program_test$Effect$Test$userTouchEvent, 'touchstart', $lamdera$program_test$Effect$Test$UserTouchStartEvent, clientId),
							update: $lamdera$program_test$Effect$Test$frontendUpdate(clientId),
							wheel: $lamdera$program_test$Effect$Test$userWheelEvent(clientId)
						});
					var _v0 = A2(
						state.frontendApp.init,
						$elm$core$Maybe$withDefault$(state.domain, maybeUrl),
						$lamdera$program_test$Effect$Browser$Navigation$fromInternalKey($lamdera$program_test$Effect$Internal$MockNavigationKey));
					var frontend = _v0.a;
					var cmd = _v0.b;
					var subscriptions = state.frontendApp.subscriptions(frontend);
					var state2 = $lamdera$program_test$Effect$Test$addEvent$(
						$lamdera$program_test$Effect$Test$FrontendInitEvent(
							{clientId: clientId, cmds: cmd}),
						function () {
							if (maybeUrl.$ === 'Just') {
								return $elm$core$Maybe$Nothing;
							} else {
								return $elm$core$Maybe$Just(
									$lamdera$program_test$Effect$Test$InvalidFrontendConnectUrl(url));
							}
						}(),
						_Utils_update(
							state,
							{
								counter: state.counter + 1,
								frontends: $lamdera$containers$SeqDict$insert$(
									clientId,
									{
										model: frontend,
										navigation: {
											backUrls: _List_Nil,
											forwardUrls: _List_Nil,
											url: $elm$core$Maybe$withDefault$(state.domain, maybeUrl)
										},
										pendingEffects: $elm$core$Array$fromList(
											_List_fromArray(
												[
													{
													cmds: cmd,
													stepIndex: $elm$core$Array$length(state.history)
												}
												])),
										sessionId: sessionId,
										timers: $lamdera$containers$SeqDict$map$(
											F2(
												function (_v2, _v3) {
													return {
														startTime: $lamdera$program_test$Effect$Test$currentTime(state)
													};
												}),
											$lamdera$program_test$Effect$Test$getTimers(subscriptions)),
										toFrontend: _List_Nil,
										windowSize: windowSize
									},
									state.frontends)
							}));
					return $lamdera$program_test$Effect$Test$disconnectFrontend$(
						clientId,
						$lamdera$program_test$Effect$Test$foldList$(
							$elm$core$List$map$(
								function (_v1) {
									var a = _v1.a;
									return a;
								},
								list),
							$lamdera$program_test$Effect$Test$Start(
								$elm$core$List$foldl$(
									F2(
										function (msg, state3) {
											return $lamdera$program_test$Effect$Test$handleBackendUpdate$(
												$lamdera$program_test$Effect$Test$currentTime(state3),
												state3.backendApp,
												A2(msg, sessionId, clientId),
												state3);
										}),
									state2,
									$lamdera$program_test$Effect$Test$getClientConnectSubs(
										state2.backendApp.subscriptions(state2.model))))));
				},
				A2(
					$lamdera$program_test$Effect$Test$wait,
					$ianmackenzie$elm_units$Duration$milliseconds(delay),
					instructions));
		});
};
var $lamdera$program_test$Effect$Test$connectFrontend = F5($lamdera$program_test$Effect$Test$connectFrontend$);
var $lamdera$program_test$Effect$Test$NetworkErrorResponse = {$: 'NetworkErrorResponse'};
var $lamdera$program_test$Effect$Test$UnhandledFileUpload = {$: 'UnhandledFileUpload'};
var $lamdera$program_test$Effect$Test$UnhandledMultiFileUpload = {$: 'UnhandledMultiFileUpload'};
var $author$project$Logger$init = function (maxEntries) {
	return {
		entries: _List_Nil,
		maxEntries: $elm$core$Basics$max$(1, maxEntries),
		nextIndex: 0
	};
};
var $ktonon$elm_crypto$Crypto$SHA$Alg$SHA256 = {$: 'SHA256'};
var $ktonon$elm_crypto$Crypto$SHA$Types$WorkingVars$ = function (a, b, c, d, e, f, g, h) {
	return {a: a, b: b, c: c, d: d, e: e, f: f, g: g, h: h};
};
var $ktonon$elm_crypto$Crypto$SHA$Types$WorkingVars = F8($ktonon$elm_crypto$Crypto$SHA$Types$WorkingVars$);
var $ktonon$elm_word$Word$D$ = function (a, b) {
	return {$: 'D', a: a, b: b};
};
var $ktonon$elm_word$Word$D = F2($ktonon$elm_word$Word$D$);
var $ktonon$elm_word$Word$Mismatch = {$: 'Mismatch'};
var $ktonon$elm_word$Word$W = function (a) {
	return {$: 'W', a: a};
};
var $ktonon$elm_word$Word$low31mask = 2147483647;
var $ktonon$elm_word$Word$carry32$ = function (x, y) {
	var _v0 = (x >>> 31) + (y >>> 31);
	switch (_v0) {
		case 0:
			return 0;
		case 2:
			return 1;
		default:
			return (1 === ((($ktonon$elm_word$Word$low31mask & x) + ($ktonon$elm_word$Word$low31mask & y)) >>> 31)) ? 1 : 0;
	}
};
var $ktonon$elm_word$Word$carry32 = F2($ktonon$elm_word$Word$carry32$);
var $elm$core$Basics$pow = _Basics_pow;
var $ktonon$elm_word$Word$mod32 = function (val) {
	return A2(
		$elm$core$Basics$modBy,
		A2($elm$core$Basics$pow, 2, 32),
		val);
};
var $ktonon$elm_word$Word$add$ = function (wx, wy) {
	var _v0 = _Utils_Tuple2(wx, wy);
	_v0$2:
	while (true) {
		switch (_v0.a.$) {
			case 'W':
				if (_v0.b.$ === 'W') {
					var x = _v0.a.a;
					var y = _v0.b.a;
					return $ktonon$elm_word$Word$W(
						$ktonon$elm_word$Word$mod32(x + y));
				} else {
					break _v0$2;
				}
			case 'D':
				if (_v0.b.$ === 'D') {
					var _v1 = _v0.a;
					var xh = _v1.a;
					var xl = _v1.b;
					var _v2 = _v0.b;
					var yh = _v2.a;
					var yl = _v2.b;
					var zl = xl + yl;
					var zh = (xh + yh) + $ktonon$elm_word$Word$carry32$(xl, yl);
					return $ktonon$elm_word$Word$D$(
						$ktonon$elm_word$Word$mod32(zh),
						$ktonon$elm_word$Word$mod32(zl));
				} else {
					break _v0$2;
				}
			default:
				break _v0$2;
		}
	}
	return $ktonon$elm_word$Word$Mismatch;
};
var $ktonon$elm_word$Word$add = F2($ktonon$elm_word$Word$add$);
var $ktonon$elm_crypto$Crypto$SHA$Types$addWorkingVars$ = function (x, y) {
	return $ktonon$elm_crypto$Crypto$SHA$Types$WorkingVars$(
		$ktonon$elm_word$Word$add$(x.a, y.a),
		$ktonon$elm_word$Word$add$(x.b, y.b),
		$ktonon$elm_word$Word$add$(x.c, y.c),
		$ktonon$elm_word$Word$add$(x.d, y.d),
		$ktonon$elm_word$Word$add$(x.e, y.e),
		$ktonon$elm_word$Word$add$(x.f, y.f),
		$ktonon$elm_word$Word$add$(x.g, y.g),
		$ktonon$elm_word$Word$add$(x.h, y.h));
};
var $ktonon$elm_crypto$Crypto$SHA$Types$addWorkingVars = F2($ktonon$elm_crypto$Crypto$SHA$Types$addWorkingVars$);
var $ktonon$elm_word$Word$and$ = function (wx, wy) {
	var _v0 = _Utils_Tuple2(wx, wy);
	_v0$2:
	while (true) {
		switch (_v0.a.$) {
			case 'W':
				if (_v0.b.$ === 'W') {
					var x = _v0.a.a;
					var y = _v0.b.a;
					return $ktonon$elm_word$Word$W(x & y);
				} else {
					break _v0$2;
				}
			case 'D':
				if (_v0.b.$ === 'D') {
					var _v1 = _v0.a;
					var xh = _v1.a;
					var xl = _v1.b;
					var _v2 = _v0.b;
					var yh = _v2.a;
					var yl = _v2.b;
					return $ktonon$elm_word$Word$D$(xh & yh, xl & yl);
				} else {
					break _v0$2;
				}
			default:
				break _v0$2;
		}
	}
	return $ktonon$elm_word$Word$Mismatch;
};
var $ktonon$elm_word$Word$and = F2($ktonon$elm_word$Word$and$);
var $elm$core$Bitwise$complement = _Bitwise_complement;
var $ktonon$elm_word$Word$complement = function (word) {
	switch (word.$) {
		case 'W':
			var x = word.a;
			return $ktonon$elm_word$Word$W(~x);
		case 'D':
			var xh = word.a;
			var xl = word.b;
			return $ktonon$elm_word$Word$D$(~xh, ~xl);
		default:
			return $ktonon$elm_word$Word$Mismatch;
	}
};
var $ktonon$elm_crypto$Crypto$SHA$Alg$SHA512 = {$: 'SHA512'};
var $ktonon$elm_word$Word$Helpers$lowMask = function (n) {
	switch (n) {
		case 0:
			return 0;
		case 1:
			return 1;
		case 2:
			return 3;
		case 3:
			return 7;
		case 4:
			return 15;
		case 5:
			return 31;
		case 6:
			return 63;
		case 7:
			return 127;
		case 8:
			return 255;
		case 9:
			return 511;
		case 10:
			return 1023;
		case 11:
			return 2047;
		case 12:
			return 4095;
		case 13:
			return 8191;
		case 14:
			return 16383;
		case 15:
			return 32767;
		case 16:
			return 65535;
		case 17:
			return 131071;
		case 18:
			return 262143;
		case 19:
			return 524287;
		case 20:
			return 1048575;
		case 21:
			return 2097151;
		case 22:
			return 4194303;
		case 23:
			return 8388607;
		case 24:
			return 16777215;
		case 25:
			return 33554431;
		case 26:
			return 67108863;
		case 27:
			return 134217727;
		case 28:
			return 268435455;
		case 29:
			return 536870911;
		case 30:
			return 1073741823;
		case 31:
			return 2147483647;
		default:
			return 4294967295;
	}
};
var $ktonon$elm_word$Word$Helpers$safeShiftRightZfBy$ = function (n, val) {
	return (n >= 32) ? 0 : (val >>> n);
};
var $ktonon$elm_word$Word$Helpers$safeShiftRightZfBy = F2($ktonon$elm_word$Word$Helpers$safeShiftRightZfBy$);
var $ktonon$elm_word$Word$dShiftRightZfBy$ = function (n, _v0) {
	var xh = _v0.a;
	var xl = _v0.b;
	return (n > 32) ? _Utils_Tuple2(
		0,
		$ktonon$elm_word$Word$Helpers$safeShiftRightZfBy$(n - 32, xh)) : _Utils_Tuple2(
		$ktonon$elm_word$Word$Helpers$safeShiftRightZfBy$(n, xh),
		$ktonon$elm_word$Word$Helpers$safeShiftRightZfBy$(n, xl) + (($ktonon$elm_word$Word$Helpers$lowMask(n) & xh) << (32 - n)));
};
var $ktonon$elm_word$Word$dShiftRightZfBy = F2($ktonon$elm_word$Word$dShiftRightZfBy$);
var $ktonon$elm_word$Word$Helpers$rotatedLowBits$ = function (n, val) {
	return $elm$core$Basics$add(
		($ktonon$elm_word$Word$Helpers$lowMask(n) & val) << (32 - n));
};
var $ktonon$elm_word$Word$Helpers$rotatedLowBits = F2($ktonon$elm_word$Word$Helpers$rotatedLowBits$);
var $ktonon$elm_word$Word$rotateRightBy$ = function (unboundN, word) {
	switch (word.$) {
		case 'W':
			var x = word.a;
			var n = A2($elm$core$Basics$modBy, 32, unboundN);
			return $ktonon$elm_word$Word$W(
				A3(
					$ktonon$elm_word$Word$Helpers$rotatedLowBits,
					n,
					x,
					$ktonon$elm_word$Word$Helpers$safeShiftRightZfBy$(n, x)));
		case 'D':
			var xh = word.a;
			var xl = word.b;
			var n = A2($elm$core$Basics$modBy, 64, unboundN);
			if (n > 32) {
				var n_ = n - 32;
				var _v1 = $ktonon$elm_word$Word$dShiftRightZfBy$(
					n_,
					_Utils_Tuple2(xl, xh));
				var zh = _v1.a;
				var zl = _v1.b;
				return $ktonon$elm_word$Word$D$(
					A3($ktonon$elm_word$Word$Helpers$rotatedLowBits, n_, xh, zh),
					zl);
			} else {
				var _v2 = $ktonon$elm_word$Word$dShiftRightZfBy$(
					n,
					_Utils_Tuple2(xh, xl));
				var zh = _v2.a;
				var zl = _v2.b;
				return $ktonon$elm_word$Word$D$(
					A3($ktonon$elm_word$Word$Helpers$rotatedLowBits, n, xl, zh),
					zl);
			}
		default:
			return $ktonon$elm_word$Word$Mismatch;
	}
};
var $ktonon$elm_word$Word$rotateRightBy = F2($ktonon$elm_word$Word$rotateRightBy$);
var $ktonon$elm_word$Word$xor$ = function (wx, wy) {
	var _v0 = _Utils_Tuple2(wx, wy);
	_v0$2:
	while (true) {
		switch (_v0.a.$) {
			case 'W':
				if (_v0.b.$ === 'W') {
					var x = _v0.a.a;
					var y = _v0.b.a;
					return $ktonon$elm_word$Word$W(x ^ y);
				} else {
					break _v0$2;
				}
			case 'D':
				if (_v0.b.$ === 'D') {
					var _v1 = _v0.a;
					var xh = _v1.a;
					var xl = _v1.b;
					var _v2 = _v0.b;
					var yh = _v2.a;
					var yl = _v2.b;
					return $ktonon$elm_word$Word$D$(xh ^ yh, xl ^ yl);
				} else {
					break _v0$2;
				}
			default:
				break _v0$2;
		}
	}
	return $ktonon$elm_word$Word$Mismatch;
};
var $ktonon$elm_word$Word$xor = F2($ktonon$elm_word$Word$xor$);
var $ktonon$elm_crypto$Crypto$SHA$Process$sum0$ = function (alg, word) {
	sum0:
	while (true) {
		switch (alg.$) {
			case 'SHA224':
				var $temp$alg = $ktonon$elm_crypto$Crypto$SHA$Alg$SHA256;
				alg = $temp$alg;
				continue sum0;
			case 'SHA384':
				var $temp$alg = $ktonon$elm_crypto$Crypto$SHA$Alg$SHA512;
				alg = $temp$alg;
				continue sum0;
			case 'SHA256':
				return $ktonon$elm_word$Word$xor$(
					$ktonon$elm_word$Word$rotateRightBy$(22, word),
					$ktonon$elm_word$Word$xor$(
						$ktonon$elm_word$Word$rotateRightBy$(13, word),
						$ktonon$elm_word$Word$rotateRightBy$(2, word)));
			case 'SHA512':
				return $ktonon$elm_word$Word$xor$(
					$ktonon$elm_word$Word$rotateRightBy$(39, word),
					$ktonon$elm_word$Word$xor$(
						$ktonon$elm_word$Word$rotateRightBy$(34, word),
						$ktonon$elm_word$Word$rotateRightBy$(28, word)));
			case 'SHA512_224':
				var $temp$alg = $ktonon$elm_crypto$Crypto$SHA$Alg$SHA512;
				alg = $temp$alg;
				continue sum0;
			default:
				var $temp$alg = $ktonon$elm_crypto$Crypto$SHA$Alg$SHA512;
				alg = $temp$alg;
				continue sum0;
		}
	}
};
var $ktonon$elm_crypto$Crypto$SHA$Process$sum0 = F2($ktonon$elm_crypto$Crypto$SHA$Process$sum0$);
var $ktonon$elm_crypto$Crypto$SHA$Process$sum1$ = function (alg, word) {
	sum1:
	while (true) {
		switch (alg.$) {
			case 'SHA224':
				var $temp$alg = $ktonon$elm_crypto$Crypto$SHA$Alg$SHA256;
				alg = $temp$alg;
				continue sum1;
			case 'SHA384':
				var $temp$alg = $ktonon$elm_crypto$Crypto$SHA$Alg$SHA512;
				alg = $temp$alg;
				continue sum1;
			case 'SHA256':
				return $ktonon$elm_word$Word$xor$(
					$ktonon$elm_word$Word$rotateRightBy$(25, word),
					$ktonon$elm_word$Word$xor$(
						$ktonon$elm_word$Word$rotateRightBy$(11, word),
						$ktonon$elm_word$Word$rotateRightBy$(6, word)));
			case 'SHA512':
				return $ktonon$elm_word$Word$xor$(
					$ktonon$elm_word$Word$rotateRightBy$(41, word),
					$ktonon$elm_word$Word$xor$(
						$ktonon$elm_word$Word$rotateRightBy$(18, word),
						$ktonon$elm_word$Word$rotateRightBy$(14, word)));
			case 'SHA512_224':
				var $temp$alg = $ktonon$elm_crypto$Crypto$SHA$Alg$SHA512;
				alg = $temp$alg;
				continue sum1;
			default:
				var $temp$alg = $ktonon$elm_crypto$Crypto$SHA$Alg$SHA512;
				alg = $temp$alg;
				continue sum1;
		}
	}
};
var $ktonon$elm_crypto$Crypto$SHA$Process$sum1 = F2($ktonon$elm_crypto$Crypto$SHA$Process$sum1$);
var $ktonon$elm_crypto$Crypto$SHA$Process$compress$ = function (alg, _v0, _v1) {
	var k = _v0.a;
	var w = _v0.b;
	var h = _v1.h;
	var g = _v1.g;
	var f = _v1.f;
	var e = _v1.e;
	var d = _v1.d;
	var c = _v1.c;
	var b = _v1.b;
	var a = _v1.a;
	var s1 = $ktonon$elm_crypto$Crypto$SHA$Process$sum1$(alg, e);
	var s0 = $ktonon$elm_crypto$Crypto$SHA$Process$sum0$(alg, a);
	var maj = $ktonon$elm_word$Word$xor$(
		$ktonon$elm_word$Word$and$(b, c),
		$ktonon$elm_word$Word$xor$(
			$ktonon$elm_word$Word$and$(a, c),
			$ktonon$elm_word$Word$and$(a, b)));
	var temp2 = $ktonon$elm_word$Word$add$(s0, maj);
	var ch = $ktonon$elm_word$Word$xor$(
		$ktonon$elm_word$Word$and$(
			g,
			$ktonon$elm_word$Word$complement(e)),
		$ktonon$elm_word$Word$and$(e, f));
	var temp1 = $ktonon$elm_word$Word$add$(
		w,
		$ktonon$elm_word$Word$add$(
			k,
			$ktonon$elm_word$Word$add$(
				ch,
				$ktonon$elm_word$Word$add$(s1, h))));
	return $ktonon$elm_crypto$Crypto$SHA$Types$WorkingVars$(
		$ktonon$elm_word$Word$add$(temp1, temp2),
		a,
		b,
		c,
		$ktonon$elm_word$Word$add$(d, temp1),
		e,
		f,
		g);
};
var $ktonon$elm_crypto$Crypto$SHA$Process$compress = F3($ktonon$elm_crypto$Crypto$SHA$Process$compress$);
var $ktonon$elm_crypto$Crypto$SHA$Constants$roundConstants = function (alg) {
	roundConstants:
	while (true) {
		switch (alg.$) {
			case 'SHA224':
				var $temp$alg = $ktonon$elm_crypto$Crypto$SHA$Alg$SHA256;
				alg = $temp$alg;
				continue roundConstants;
			case 'SHA256':
				return _List_fromArray(
					[
						$ktonon$elm_word$Word$W(1116352408),
						$ktonon$elm_word$Word$W(1899447441),
						$ktonon$elm_word$Word$W(3049323471),
						$ktonon$elm_word$Word$W(3921009573),
						$ktonon$elm_word$Word$W(961987163),
						$ktonon$elm_word$Word$W(1508970993),
						$ktonon$elm_word$Word$W(2453635748),
						$ktonon$elm_word$Word$W(2870763221),
						$ktonon$elm_word$Word$W(3624381080),
						$ktonon$elm_word$Word$W(310598401),
						$ktonon$elm_word$Word$W(607225278),
						$ktonon$elm_word$Word$W(1426881987),
						$ktonon$elm_word$Word$W(1925078388),
						$ktonon$elm_word$Word$W(2162078206),
						$ktonon$elm_word$Word$W(2614888103),
						$ktonon$elm_word$Word$W(3248222580),
						$ktonon$elm_word$Word$W(3835390401),
						$ktonon$elm_word$Word$W(4022224774),
						$ktonon$elm_word$Word$W(264347078),
						$ktonon$elm_word$Word$W(604807628),
						$ktonon$elm_word$Word$W(770255983),
						$ktonon$elm_word$Word$W(1249150122),
						$ktonon$elm_word$Word$W(1555081692),
						$ktonon$elm_word$Word$W(1996064986),
						$ktonon$elm_word$Word$W(2554220882),
						$ktonon$elm_word$Word$W(2821834349),
						$ktonon$elm_word$Word$W(2952996808),
						$ktonon$elm_word$Word$W(3210313671),
						$ktonon$elm_word$Word$W(3336571891),
						$ktonon$elm_word$Word$W(3584528711),
						$ktonon$elm_word$Word$W(113926993),
						$ktonon$elm_word$Word$W(338241895),
						$ktonon$elm_word$Word$W(666307205),
						$ktonon$elm_word$Word$W(773529912),
						$ktonon$elm_word$Word$W(1294757372),
						$ktonon$elm_word$Word$W(1396182291),
						$ktonon$elm_word$Word$W(1695183700),
						$ktonon$elm_word$Word$W(1986661051),
						$ktonon$elm_word$Word$W(2177026350),
						$ktonon$elm_word$Word$W(2456956037),
						$ktonon$elm_word$Word$W(2730485921),
						$ktonon$elm_word$Word$W(2820302411),
						$ktonon$elm_word$Word$W(3259730800),
						$ktonon$elm_word$Word$W(3345764771),
						$ktonon$elm_word$Word$W(3516065817),
						$ktonon$elm_word$Word$W(3600352804),
						$ktonon$elm_word$Word$W(4094571909),
						$ktonon$elm_word$Word$W(275423344),
						$ktonon$elm_word$Word$W(430227734),
						$ktonon$elm_word$Word$W(506948616),
						$ktonon$elm_word$Word$W(659060556),
						$ktonon$elm_word$Word$W(883997877),
						$ktonon$elm_word$Word$W(958139571),
						$ktonon$elm_word$Word$W(1322822218),
						$ktonon$elm_word$Word$W(1537002063),
						$ktonon$elm_word$Word$W(1747873779),
						$ktonon$elm_word$Word$W(1955562222),
						$ktonon$elm_word$Word$W(2024104815),
						$ktonon$elm_word$Word$W(2227730452),
						$ktonon$elm_word$Word$W(2361852424),
						$ktonon$elm_word$Word$W(2428436474),
						$ktonon$elm_word$Word$W(2756734187),
						$ktonon$elm_word$Word$W(3204031479),
						$ktonon$elm_word$Word$W(3329325298)
					]);
			case 'SHA384':
				var $temp$alg = $ktonon$elm_crypto$Crypto$SHA$Alg$SHA512;
				alg = $temp$alg;
				continue roundConstants;
			case 'SHA512':
				return _List_fromArray(
					[
						$ktonon$elm_word$Word$D$(1116352408, 3609767458),
						$ktonon$elm_word$Word$D$(1899447441, 602891725),
						$ktonon$elm_word$Word$D$(3049323471, 3964484399),
						$ktonon$elm_word$Word$D$(3921009573, 2173295548),
						$ktonon$elm_word$Word$D$(961987163, 4081628472),
						$ktonon$elm_word$Word$D$(1508970993, 3053834265),
						$ktonon$elm_word$Word$D$(2453635748, 2937671579),
						$ktonon$elm_word$Word$D$(2870763221, 3664609560),
						$ktonon$elm_word$Word$D$(3624381080, 2734883394),
						$ktonon$elm_word$Word$D$(310598401, 1164996542),
						$ktonon$elm_word$Word$D$(607225278, 1323610764),
						$ktonon$elm_word$Word$D$(1426881987, 3590304994),
						$ktonon$elm_word$Word$D$(1925078388, 4068182383),
						$ktonon$elm_word$Word$D$(2162078206, 991336113),
						$ktonon$elm_word$Word$D$(2614888103, 633803317),
						$ktonon$elm_word$Word$D$(3248222580, 3479774868),
						$ktonon$elm_word$Word$D$(3835390401, 2666613458),
						$ktonon$elm_word$Word$D$(4022224774, 944711139),
						$ktonon$elm_word$Word$D$(264347078, 2341262773),
						$ktonon$elm_word$Word$D$(604807628, 2007800933),
						$ktonon$elm_word$Word$D$(770255983, 1495990901),
						$ktonon$elm_word$Word$D$(1249150122, 1856431235),
						$ktonon$elm_word$Word$D$(1555081692, 3175218132),
						$ktonon$elm_word$Word$D$(1996064986, 2198950837),
						$ktonon$elm_word$Word$D$(2554220882, 3999719339),
						$ktonon$elm_word$Word$D$(2821834349, 766784016),
						$ktonon$elm_word$Word$D$(2952996808, 2566594879),
						$ktonon$elm_word$Word$D$(3210313671, 3203337956),
						$ktonon$elm_word$Word$D$(3336571891, 1034457026),
						$ktonon$elm_word$Word$D$(3584528711, 2466948901),
						$ktonon$elm_word$Word$D$(113926993, 3758326383),
						$ktonon$elm_word$Word$D$(338241895, 168717936),
						$ktonon$elm_word$Word$D$(666307205, 1188179964),
						$ktonon$elm_word$Word$D$(773529912, 1546045734),
						$ktonon$elm_word$Word$D$(1294757372, 1522805485),
						$ktonon$elm_word$Word$D$(1396182291, 2643833823),
						$ktonon$elm_word$Word$D$(1695183700, 2343527390),
						$ktonon$elm_word$Word$D$(1986661051, 1014477480),
						$ktonon$elm_word$Word$D$(2177026350, 1206759142),
						$ktonon$elm_word$Word$D$(2456956037, 344077627),
						$ktonon$elm_word$Word$D$(2730485921, 1290863460),
						$ktonon$elm_word$Word$D$(2820302411, 3158454273),
						$ktonon$elm_word$Word$D$(3259730800, 3505952657),
						$ktonon$elm_word$Word$D$(3345764771, 106217008),
						$ktonon$elm_word$Word$D$(3516065817, 3606008344),
						$ktonon$elm_word$Word$D$(3600352804, 1432725776),
						$ktonon$elm_word$Word$D$(4094571909, 1467031594),
						$ktonon$elm_word$Word$D$(275423344, 851169720),
						$ktonon$elm_word$Word$D$(430227734, 3100823752),
						$ktonon$elm_word$Word$D$(506948616, 1363258195),
						$ktonon$elm_word$Word$D$(659060556, 3750685593),
						$ktonon$elm_word$Word$D$(883997877, 3785050280),
						$ktonon$elm_word$Word$D$(958139571, 3318307427),
						$ktonon$elm_word$Word$D$(1322822218, 3812723403),
						$ktonon$elm_word$Word$D$(1537002063, 2003034995),
						$ktonon$elm_word$Word$D$(1747873779, 3602036899),
						$ktonon$elm_word$Word$D$(1955562222, 1575990012),
						$ktonon$elm_word$Word$D$(2024104815, 1125592928),
						$ktonon$elm_word$Word$D$(2227730452, 2716904306),
						$ktonon$elm_word$Word$D$(2361852424, 442776044),
						$ktonon$elm_word$Word$D$(2428436474, 593698344),
						$ktonon$elm_word$Word$D$(2756734187, 3733110249),
						$ktonon$elm_word$Word$D$(3204031479, 2999351573),
						$ktonon$elm_word$Word$D$(3329325298, 3815920427),
						$ktonon$elm_word$Word$D$(3391569614, 3928383900),
						$ktonon$elm_word$Word$D$(3515267271, 566280711),
						$ktonon$elm_word$Word$D$(3940187606, 3454069534),
						$ktonon$elm_word$Word$D$(4118630271, 4000239992),
						$ktonon$elm_word$Word$D$(116418474, 1914138554),
						$ktonon$elm_word$Word$D$(174292421, 2731055270),
						$ktonon$elm_word$Word$D$(289380356, 3203993006),
						$ktonon$elm_word$Word$D$(460393269, 320620315),
						$ktonon$elm_word$Word$D$(685471733, 587496836),
						$ktonon$elm_word$Word$D$(852142971, 1086792851),
						$ktonon$elm_word$Word$D$(1017036298, 365543100),
						$ktonon$elm_word$Word$D$(1126000580, 2618297676),
						$ktonon$elm_word$Word$D$(1288033470, 3409855158),
						$ktonon$elm_word$Word$D$(1501505948, 4234509866),
						$ktonon$elm_word$Word$D$(1607167915, 987167468),
						$ktonon$elm_word$Word$D$(1816402316, 1246189591)
					]);
			case 'SHA512_224':
				var $temp$alg = $ktonon$elm_crypto$Crypto$SHA$Alg$SHA512;
				alg = $temp$alg;
				continue roundConstants;
			default:
				var $temp$alg = $ktonon$elm_crypto$Crypto$SHA$Alg$SHA512;
				alg = $temp$alg;
				continue roundConstants;
		}
	}
};
var $ktonon$elm_crypto$Crypto$SHA$Process$compressLoop$ = function (alg, workingVars, messageSchedule) {
	return $elm$core$List$foldl$(
		$ktonon$elm_crypto$Crypto$SHA$Process$compress(alg),
		workingVars,
		A3(
			$elm$core$List$map2,
			F2(
				function (a, b) {
					return _Utils_Tuple2(a, b);
				}),
			$ktonon$elm_crypto$Crypto$SHA$Constants$roundConstants(alg),
			$elm$core$Array$toList(messageSchedule)));
};
var $ktonon$elm_crypto$Crypto$SHA$Process$compressLoop = F3($ktonon$elm_crypto$Crypto$SHA$Process$compressLoop$);
var $elm$core$Elm$JsArray$appendN = _JsArray_appendN;
var $elm$core$Elm$JsArray$slice = _JsArray_slice;
var $elm$core$Array$appendHelpBuilder$ = function (tail, builder) {
	var tailLen = $elm$core$Elm$JsArray$length(tail);
	var notAppended = ($elm$core$Array$branchFactor - $elm$core$Elm$JsArray$length(builder.tail)) - tailLen;
	var appended = A3($elm$core$Elm$JsArray$appendN, $elm$core$Array$branchFactor, builder.tail, tail);
	return (notAppended < 0) ? {
		nodeList: A2(
			$elm$core$List$cons,
			$elm$core$Array$Leaf(appended),
			builder.nodeList),
		nodeListSize: builder.nodeListSize + 1,
		tail: A3($elm$core$Elm$JsArray$slice, notAppended, tailLen, tail)
	} : ((!notAppended) ? {
		nodeList: A2(
			$elm$core$List$cons,
			$elm$core$Array$Leaf(appended),
			builder.nodeList),
		nodeListSize: builder.nodeListSize + 1,
		tail: $elm$core$Elm$JsArray$empty
	} : {nodeList: builder.nodeList, nodeListSize: builder.nodeListSize, tail: appended});
};
var $elm$core$Array$appendHelpBuilder = F2($elm$core$Array$appendHelpBuilder$);
var $elm$core$Array$appendHelpTree$ = function (toAppend, array) {
	var len = array.a;
	var tree = array.c;
	var tail = array.d;
	var itemsToAppend = $elm$core$Elm$JsArray$length(toAppend);
	var notAppended = ($elm$core$Array$branchFactor - $elm$core$Elm$JsArray$length(tail)) - itemsToAppend;
	var appended = A3($elm$core$Elm$JsArray$appendN, $elm$core$Array$branchFactor, tail, toAppend);
	var newArray = $elm$core$Array$unsafeReplaceTail$(appended, array);
	if (notAppended < 0) {
		var nextTail = A3($elm$core$Elm$JsArray$slice, notAppended, itemsToAppend, toAppend);
		return $elm$core$Array$unsafeReplaceTail$(nextTail, newArray);
	} else {
		return newArray;
	}
};
var $elm$core$Array$appendHelpTree = F2($elm$core$Array$appendHelpTree$);
var $elm$core$Array$builderFromArray = function (_v0) {
	var len = _v0.a;
	var tree = _v0.c;
	var tail = _v0.d;
	var helper = F2(
		function (node, acc) {
			if (node.$ === 'SubTree') {
				var subTree = node.a;
				return A3($elm$core$Elm$JsArray$foldl, helper, acc, subTree);
			} else {
				return A2($elm$core$List$cons, node, acc);
			}
		});
	return {
		nodeList: A3($elm$core$Elm$JsArray$foldl, helper, _List_Nil, tree),
		nodeListSize: (len / $elm$core$Array$branchFactor) | 0,
		tail: tail
	};
};
var $elm$core$Array$append$ = function (a, _v0) {
	var aTail = a.d;
	var bLen = _v0.a;
	var bTree = _v0.c;
	var bTail = _v0.d;
	if (_Utils_cmp(bLen, $elm$core$Array$branchFactor * 4) < 1) {
		var foldHelper = F2(
			function (node, array) {
				if (node.$ === 'SubTree') {
					var tree = node.a;
					return A3($elm$core$Elm$JsArray$foldl, foldHelper, array, tree);
				} else {
					var leaf = node.a;
					return $elm$core$Array$appendHelpTree$(leaf, array);
				}
			});
		return $elm$core$Array$appendHelpTree$(
			bTail,
			A3($elm$core$Elm$JsArray$foldl, foldHelper, a, bTree));
	} else {
		var foldHelper = F2(
			function (node, builder) {
				if (node.$ === 'SubTree') {
					var tree = node.a;
					return A3($elm$core$Elm$JsArray$foldl, foldHelper, builder, tree);
				} else {
					var leaf = node.a;
					return $elm$core$Array$appendHelpBuilder$(leaf, builder);
				}
			});
		return $elm$core$Array$builderToArray$(
			true,
			$elm$core$Array$appendHelpBuilder$(
				bTail,
				A3(
					$elm$core$Elm$JsArray$foldl,
					foldHelper,
					$elm$core$Array$builderFromArray(a),
					bTree)));
	}
};
var $elm$core$Array$append = F2($elm$core$Array$append$);
var $elm$core$Array$getHelp$ = function (shift, index, tree) {
	getHelp:
	while (true) {
		var pos = $elm$core$Array$bitMask & (index >>> shift);
		var _v0 = A2($elm$core$Elm$JsArray$unsafeGet, pos, tree);
		if (_v0.$ === 'SubTree') {
			var subTree = _v0.a;
			var $temp$shift = shift - $elm$core$Array$shiftStep,
				$temp$tree = subTree;
			shift = $temp$shift;
			tree = $temp$tree;
			continue getHelp;
		} else {
			var values = _v0.a;
			return A2($elm$core$Elm$JsArray$unsafeGet, $elm$core$Array$bitMask & index, values);
		}
	}
};
var $elm$core$Array$getHelp = F3($elm$core$Array$getHelp$);
var $elm$core$Array$get$ = function (index, _v0) {
	var len = _v0.a;
	var startShift = _v0.b;
	var tree = _v0.c;
	var tail = _v0.d;
	return ((index < 0) || (_Utils_cmp(index, len) > -1)) ? $elm$core$Maybe$Nothing : ((_Utils_cmp(
		index,
		$elm$core$Array$tailIndex(len)) > -1) ? $elm$core$Maybe$Just(
		A2($elm$core$Elm$JsArray$unsafeGet, $elm$core$Array$bitMask & index, tail)) : $elm$core$Maybe$Just(
		$elm$core$Array$getHelp$(startShift, index, tree)));
};
var $elm$core$Array$get = F2($elm$core$Array$get$);
var $ktonon$elm_crypto$Crypto$SHA$MessageSchedule$at = function (i) {
	return A2(
		$elm$core$Basics$composeR,
		$elm$core$Array$get(i),
		$elm$core$Maybe$withDefault($ktonon$elm_word$Word$Mismatch));
};
var $ktonon$elm_word$Word$shiftRightZfBy$ = function (n, word) {
	switch (word.$) {
		case 'W':
			var x = word.a;
			return $ktonon$elm_word$Word$W(
				$ktonon$elm_word$Word$Helpers$safeShiftRightZfBy$(n, x));
		case 'D':
			var xh = word.a;
			var xl = word.b;
			var _v1 = $ktonon$elm_word$Word$dShiftRightZfBy$(
				n,
				_Utils_Tuple2(xh, xl));
			var zh = _v1.a;
			var zl = _v1.b;
			return $ktonon$elm_word$Word$D$(zh, zl);
		default:
			return $ktonon$elm_word$Word$Mismatch;
	}
};
var $ktonon$elm_word$Word$shiftRightZfBy = F2($ktonon$elm_word$Word$shiftRightZfBy$);
var $ktonon$elm_crypto$Crypto$SHA$MessageSchedule$sigma0$ = function (alg, word) {
	sigma0:
	while (true) {
		switch (alg.$) {
			case 'SHA224':
				var $temp$alg = $ktonon$elm_crypto$Crypto$SHA$Alg$SHA256;
				alg = $temp$alg;
				continue sigma0;
			case 'SHA384':
				var $temp$alg = $ktonon$elm_crypto$Crypto$SHA$Alg$SHA512;
				alg = $temp$alg;
				continue sigma0;
			case 'SHA256':
				return $ktonon$elm_word$Word$xor$(
					$ktonon$elm_word$Word$shiftRightZfBy$(3, word),
					$ktonon$elm_word$Word$xor$(
						$ktonon$elm_word$Word$rotateRightBy$(18, word),
						$ktonon$elm_word$Word$rotateRightBy$(7, word)));
			case 'SHA512':
				return $ktonon$elm_word$Word$xor$(
					$ktonon$elm_word$Word$shiftRightZfBy$(7, word),
					$ktonon$elm_word$Word$xor$(
						$ktonon$elm_word$Word$rotateRightBy$(8, word),
						$ktonon$elm_word$Word$rotateRightBy$(1, word)));
			case 'SHA512_224':
				var $temp$alg = $ktonon$elm_crypto$Crypto$SHA$Alg$SHA512;
				alg = $temp$alg;
				continue sigma0;
			default:
				var $temp$alg = $ktonon$elm_crypto$Crypto$SHA$Alg$SHA512;
				alg = $temp$alg;
				continue sigma0;
		}
	}
};
var $ktonon$elm_crypto$Crypto$SHA$MessageSchedule$sigma0 = F2($ktonon$elm_crypto$Crypto$SHA$MessageSchedule$sigma0$);
var $ktonon$elm_crypto$Crypto$SHA$MessageSchedule$sigma1$ = function (alg, word) {
	sigma1:
	while (true) {
		switch (alg.$) {
			case 'SHA224':
				var $temp$alg = $ktonon$elm_crypto$Crypto$SHA$Alg$SHA256;
				alg = $temp$alg;
				continue sigma1;
			case 'SHA384':
				var $temp$alg = $ktonon$elm_crypto$Crypto$SHA$Alg$SHA512;
				alg = $temp$alg;
				continue sigma1;
			case 'SHA256':
				return $ktonon$elm_word$Word$xor$(
					$ktonon$elm_word$Word$shiftRightZfBy$(10, word),
					$ktonon$elm_word$Word$xor$(
						$ktonon$elm_word$Word$rotateRightBy$(19, word),
						$ktonon$elm_word$Word$rotateRightBy$(17, word)));
			case 'SHA512':
				return $ktonon$elm_word$Word$xor$(
					$ktonon$elm_word$Word$shiftRightZfBy$(6, word),
					$ktonon$elm_word$Word$xor$(
						$ktonon$elm_word$Word$rotateRightBy$(61, word),
						$ktonon$elm_word$Word$rotateRightBy$(19, word)));
			case 'SHA512_224':
				var $temp$alg = $ktonon$elm_crypto$Crypto$SHA$Alg$SHA512;
				alg = $temp$alg;
				continue sigma1;
			default:
				var $temp$alg = $ktonon$elm_crypto$Crypto$SHA$Alg$SHA512;
				alg = $temp$alg;
				continue sigma1;
		}
	}
};
var $ktonon$elm_crypto$Crypto$SHA$MessageSchedule$sigma1 = F2($ktonon$elm_crypto$Crypto$SHA$MessageSchedule$sigma1$);
var $ktonon$elm_crypto$Crypto$SHA$MessageSchedule$nextPart$ = function (alg, i, w) {
	var i2 = A2($ktonon$elm_crypto$Crypto$SHA$MessageSchedule$at, i - 2, w);
	var s1 = $ktonon$elm_crypto$Crypto$SHA$MessageSchedule$sigma1$(alg, i2);
	var i15 = A2($ktonon$elm_crypto$Crypto$SHA$MessageSchedule$at, i - 15, w);
	var s0 = $ktonon$elm_crypto$Crypto$SHA$MessageSchedule$sigma0$(alg, i15);
	return $elm$core$Array$append$(
		w,
		$elm$core$Array$fromList(
			_List_fromArray(
				[
					$ktonon$elm_word$Word$add$(
					s1,
					$ktonon$elm_word$Word$add$(
						A2($ktonon$elm_crypto$Crypto$SHA$MessageSchedule$at, i - 7, w),
						$ktonon$elm_word$Word$add$(
							s0,
							A2($ktonon$elm_crypto$Crypto$SHA$MessageSchedule$at, i - 16, w))))
				])));
};
var $ktonon$elm_crypto$Crypto$SHA$MessageSchedule$nextPart = F3($ktonon$elm_crypto$Crypto$SHA$MessageSchedule$nextPart$);
var $ktonon$elm_crypto$Crypto$SHA$MessageSchedule$fromChunk$ = function (alg, chunk) {
	var n = $elm$core$List$length(
		$ktonon$elm_crypto$Crypto$SHA$Constants$roundConstants(alg));
	return $elm$core$List$foldl$(
		$ktonon$elm_crypto$Crypto$SHA$MessageSchedule$nextPart(alg),
		$elm$core$Array$fromList(chunk),
		$elm$core$List$range$(16, n - 1));
};
var $ktonon$elm_crypto$Crypto$SHA$MessageSchedule$fromChunk = F2($ktonon$elm_crypto$Crypto$SHA$MessageSchedule$fromChunk$);
var $elm$core$List$drop$ = function (n, list) {
	drop:
	while (true) {
		if (n <= 0) {
			return list;
		} else {
			if (!list.b) {
				return list;
			} else {
				var x = list.a;
				var xs = list.b;
				var $temp$n = n - 1,
					$temp$list = xs;
				n = $temp$n;
				list = $temp$list;
				continue drop;
			}
		}
	}
};
var $elm$core$List$drop = F2($elm$core$List$drop$);
var $ktonon$elm_crypto$Crypto$SHA$Chunk$sizeInBytes = function (alg) {
	sizeInBytes:
	while (true) {
		switch (alg.$) {
			case 'SHA224':
				var $temp$alg = $ktonon$elm_crypto$Crypto$SHA$Alg$SHA256;
				alg = $temp$alg;
				continue sizeInBytes;
			case 'SHA256':
				return 64;
			case 'SHA384':
				var $temp$alg = $ktonon$elm_crypto$Crypto$SHA$Alg$SHA512;
				alg = $temp$alg;
				continue sizeInBytes;
			case 'SHA512':
				return 128;
			case 'SHA512_224':
				var $temp$alg = $ktonon$elm_crypto$Crypto$SHA$Alg$SHA512;
				alg = $temp$alg;
				continue sizeInBytes;
			default:
				var $temp$alg = $ktonon$elm_crypto$Crypto$SHA$Alg$SHA512;
				alg = $temp$alg;
				continue sizeInBytes;
		}
	}
};
var $ktonon$elm_word$Word$sizeInBytes = function (s) {
	if (s.$ === 'Bit32') {
		return 4;
	} else {
		return 8;
	}
};
var $ktonon$elm_word$Word$Bit32 = {$: 'Bit32'};
var $ktonon$elm_word$Word$Bit64 = {$: 'Bit64'};
var $ktonon$elm_crypto$Crypto$SHA$Alg$wordSize = function (alg) {
	wordSize:
	while (true) {
		switch (alg.$) {
			case 'SHA224':
				var $temp$alg = $ktonon$elm_crypto$Crypto$SHA$Alg$SHA256;
				alg = $temp$alg;
				continue wordSize;
			case 'SHA256':
				return $ktonon$elm_word$Word$Bit32;
			case 'SHA384':
				var $temp$alg = $ktonon$elm_crypto$Crypto$SHA$Alg$SHA512;
				alg = $temp$alg;
				continue wordSize;
			case 'SHA512':
				return $ktonon$elm_word$Word$Bit64;
			case 'SHA512_224':
				var $temp$alg = $ktonon$elm_crypto$Crypto$SHA$Alg$SHA512;
				alg = $temp$alg;
				continue wordSize;
			default:
				var $temp$alg = $ktonon$elm_crypto$Crypto$SHA$Alg$SHA512;
				alg = $temp$alg;
				continue wordSize;
		}
	}
};
var $ktonon$elm_crypto$Crypto$SHA$Chunk$sizeInWords = function (alg) {
	return ($ktonon$elm_crypto$Crypto$SHA$Chunk$sizeInBytes(alg) / $ktonon$elm_word$Word$sizeInBytes(
		$ktonon$elm_crypto$Crypto$SHA$Alg$wordSize(alg))) | 0;
};
var $elm$core$List$takeReverse$ = function (n, list, kept) {
	takeReverse:
	while (true) {
		if (n <= 0) {
			return kept;
		} else {
			if (!list.b) {
				return kept;
			} else {
				var x = list.a;
				var xs = list.b;
				var $temp$n = n - 1,
					$temp$list = xs,
					$temp$kept = A2($elm$core$List$cons, x, kept);
				n = $temp$n;
				list = $temp$list;
				kept = $temp$kept;
				continue takeReverse;
			}
		}
	}
};
var $elm$core$List$takeReverse = F3($elm$core$List$takeReverse$);
var $elm$core$List$takeTailRec$ = function (n, list) {
	return $elm$core$List$reverse(
		$elm$core$List$takeReverse$(n, list, _List_Nil));
};
var $elm$core$List$takeTailRec = F2($elm$core$List$takeTailRec$);
var $elm$core$List$takeFast$ = function (ctr, n, list) {
	if (n <= 0) {
		return _List_Nil;
	} else {
		var _v0 = _Utils_Tuple2(n, list);
		_v0$1:
		while (true) {
			_v0$5:
			while (true) {
				if (!_v0.b.b) {
					return list;
				} else {
					if (_v0.b.b.b) {
						switch (_v0.a) {
							case 1:
								break _v0$1;
							case 2:
								var _v2 = _v0.b;
								var x = _v2.a;
								var _v3 = _v2.b;
								var y = _v3.a;
								return _List_fromArray(
									[x, y]);
							case 3:
								if (_v0.b.b.b.b) {
									var _v4 = _v0.b;
									var x = _v4.a;
									var _v5 = _v4.b;
									var y = _v5.a;
									var _v6 = _v5.b;
									var z = _v6.a;
									return _List_fromArray(
										[x, y, z]);
								} else {
									break _v0$5;
								}
							default:
								if (_v0.b.b.b.b && _v0.b.b.b.b.b) {
									var _v7 = _v0.b;
									var x = _v7.a;
									var _v8 = _v7.b;
									var y = _v8.a;
									var _v9 = _v8.b;
									var z = _v9.a;
									var _v10 = _v9.b;
									var w = _v10.a;
									var tl = _v10.b;
									return (ctr > 1000) ? A2(
										$elm$core$List$cons,
										x,
										A2(
											$elm$core$List$cons,
											y,
											A2(
												$elm$core$List$cons,
												z,
												A2(
													$elm$core$List$cons,
													w,
													$elm$core$List$takeTailRec$(n - 4, tl))))) : A2(
										$elm$core$List$cons,
										x,
										A2(
											$elm$core$List$cons,
											y,
											A2(
												$elm$core$List$cons,
												z,
												A2(
													$elm$core$List$cons,
													w,
													$elm$core$List$takeFast$(ctr + 1, n - 4, tl)))));
								} else {
									break _v0$5;
								}
						}
					} else {
						if (_v0.a === 1) {
							break _v0$1;
						} else {
							break _v0$5;
						}
					}
				}
			}
			return list;
		}
		var _v1 = _v0.b;
		var x = _v1.a;
		return _List_fromArray(
			[x]);
	}
};
var $elm$core$List$takeFast = F3($elm$core$List$takeFast$);
var $elm$core$List$take$ = function (n, list) {
	return $elm$core$List$takeFast$(0, n, list);
};
var $elm$core$List$take = F2($elm$core$List$take$);
var $ktonon$elm_crypto$Crypto$SHA$Chunk$next$ = function (alg, words) {
	var n = $ktonon$elm_crypto$Crypto$SHA$Chunk$sizeInWords(alg);
	var chunk = $elm$core$List$take$(n, words);
	return _Utils_Tuple2(
		$elm$core$List$isEmpty(chunk) ? $elm$core$Maybe$Nothing : $elm$core$Maybe$Just(chunk),
		$elm$core$List$drop$(n, words));
};
var $ktonon$elm_crypto$Crypto$SHA$Chunk$next = F2($ktonon$elm_crypto$Crypto$SHA$Chunk$next$);
var $ktonon$elm_crypto$Crypto$SHA$Process$chunks_$ = function (alg, words, currentHash) {
	chunks_:
	while (true) {
		var _v0 = $ktonon$elm_crypto$Crypto$SHA$Chunk$next$(alg, words);
		if (_v0.a.$ === 'Nothing') {
			var _v1 = _v0.a;
			return currentHash;
		} else {
			var chunk = _v0.a.a;
			var rest = _v0.b;
			var vars = $ktonon$elm_crypto$Crypto$SHA$Types$addWorkingVars$(
				currentHash,
				$ktonon$elm_crypto$Crypto$SHA$Process$compressLoop$(
					alg,
					currentHash,
					$ktonon$elm_crypto$Crypto$SHA$MessageSchedule$fromChunk$(alg, chunk)));
			var $temp$words = rest,
				$temp$currentHash = vars;
			words = $temp$words;
			currentHash = $temp$currentHash;
			continue chunks_;
		}
	}
};
var $ktonon$elm_crypto$Crypto$SHA$Process$chunks_ = F3($ktonon$elm_crypto$Crypto$SHA$Process$chunks_$);
var $ktonon$elm_crypto$Crypto$SHA$Constants$initialHashValues = function (alg) {
	switch (alg.$) {
		case 'SHA224':
			return $ktonon$elm_crypto$Crypto$SHA$Types$WorkingVars$(
				$ktonon$elm_word$Word$W(3238371032),
				$ktonon$elm_word$Word$W(914150663),
				$ktonon$elm_word$Word$W(812702999),
				$ktonon$elm_word$Word$W(4144912697),
				$ktonon$elm_word$Word$W(4290775857),
				$ktonon$elm_word$Word$W(1750603025),
				$ktonon$elm_word$Word$W(1694076839),
				$ktonon$elm_word$Word$W(3204075428));
		case 'SHA256':
			return $ktonon$elm_crypto$Crypto$SHA$Types$WorkingVars$(
				$ktonon$elm_word$Word$W(1779033703),
				$ktonon$elm_word$Word$W(3144134277),
				$ktonon$elm_word$Word$W(1013904242),
				$ktonon$elm_word$Word$W(2773480762),
				$ktonon$elm_word$Word$W(1359893119),
				$ktonon$elm_word$Word$W(2600822924),
				$ktonon$elm_word$Word$W(528734635),
				$ktonon$elm_word$Word$W(1541459225));
		case 'SHA384':
			return $ktonon$elm_crypto$Crypto$SHA$Types$WorkingVars$(
				$ktonon$elm_word$Word$D$(3418070365, 3238371032),
				$ktonon$elm_word$Word$D$(1654270250, 914150663),
				$ktonon$elm_word$Word$D$(2438529370, 812702999),
				$ktonon$elm_word$Word$D$(355462360, 4144912697),
				$ktonon$elm_word$Word$D$(1731405415, 4290775857),
				$ktonon$elm_word$Word$D$(2394180231, 1750603025),
				$ktonon$elm_word$Word$D$(3675008525, 1694076839),
				$ktonon$elm_word$Word$D$(1203062813, 3204075428));
		case 'SHA512':
			return $ktonon$elm_crypto$Crypto$SHA$Types$WorkingVars$(
				$ktonon$elm_word$Word$D$(1779033703, 4089235720),
				$ktonon$elm_word$Word$D$(3144134277, 2227873595),
				$ktonon$elm_word$Word$D$(1013904242, 4271175723),
				$ktonon$elm_word$Word$D$(2773480762, 1595750129),
				$ktonon$elm_word$Word$D$(1359893119, 2917565137),
				$ktonon$elm_word$Word$D$(2600822924, 725511199),
				$ktonon$elm_word$Word$D$(528734635, 4215389547),
				$ktonon$elm_word$Word$D$(1541459225, 327033209));
		case 'SHA512_224':
			return $ktonon$elm_crypto$Crypto$SHA$Types$WorkingVars$(
				$ktonon$elm_word$Word$D$(2352822216, 424955298),
				$ktonon$elm_word$Word$D$(1944164710, 2312950998),
				$ktonon$elm_word$Word$D$(502970286, 855612546),
				$ktonon$elm_word$Word$D$(1738396948, 1479516111),
				$ktonon$elm_word$Word$D$(258812777, 2077511080),
				$ktonon$elm_word$Word$D$(2011393907, 79989058),
				$ktonon$elm_word$Word$D$(1067287976, 1780299464),
				$ktonon$elm_word$Word$D$(286451373, 2446758561));
		default:
			return $ktonon$elm_crypto$Crypto$SHA$Types$WorkingVars$(
				$ktonon$elm_word$Word$D$(573645204, 4230739756),
				$ktonon$elm_word$Word$D$(2673172387, 3360449730),
				$ktonon$elm_word$Word$D$(596883563, 1867755857),
				$ktonon$elm_word$Word$D$(2520282905, 1497426621),
				$ktonon$elm_word$Word$D$(2519219938, 2827943907),
				$ktonon$elm_word$Word$D$(3193839141, 1401305490),
				$ktonon$elm_word$Word$D$(721525244, 746961066),
				$ktonon$elm_word$Word$D$(246885852, 2177182882));
	}
};
var $ktonon$elm_crypto$Crypto$SHA$Types$toSingleWord = function (word) {
	if (word.$ === 'D') {
		var xh = word.a;
		var xl = word.b;
		return _List_fromArray(
			[
				$ktonon$elm_word$Word$W(xh),
				$ktonon$elm_word$Word$W(xl)
			]);
	} else {
		return _List_fromArray(
			[word]);
	}
};
var $ktonon$elm_crypto$Crypto$SHA$Types$workingVarsToWords$ = function (alg, _v0) {
	var h = _v0.h;
	var g = _v0.g;
	var f = _v0.f;
	var e = _v0.e;
	var d = _v0.d;
	var c = _v0.c;
	var b = _v0.b;
	var a = _v0.a;
	switch (alg.$) {
		case 'SHA224':
			return $elm$core$Array$fromList(
				_List_fromArray(
					[a, b, c, d, e, f, g]));
		case 'SHA256':
			return $elm$core$Array$fromList(
				_List_fromArray(
					[a, b, c, d, e, f, g, h]));
		case 'SHA384':
			return $elm$core$Array$fromList(
				_List_fromArray(
					[a, b, c, d, e, f]));
		case 'SHA512':
			return $elm$core$Array$fromList(
				_List_fromArray(
					[a, b, c, d, e, f, g, h]));
		case 'SHA512_224':
			return $elm$core$Array$fromList(
				$elm$core$List$take$(
					7,
					$elm$core$List$concatMap$(
						$ktonon$elm_crypto$Crypto$SHA$Types$toSingleWord,
						_List_fromArray(
							[a, b, c, d]))));
		default:
			return $elm$core$Array$fromList(
				_List_fromArray(
					[a, b, c, d]));
	}
};
var $ktonon$elm_crypto$Crypto$SHA$Types$workingVarsToWords = F2($ktonon$elm_crypto$Crypto$SHA$Types$workingVarsToWords$);
var $ktonon$elm_crypto$Crypto$SHA$Process$chunks$ = function (alg, words) {
	return $ktonon$elm_crypto$Crypto$SHA$Types$workingVarsToWords$(
		alg,
		$ktonon$elm_crypto$Crypto$SHA$Process$chunks_$(
			alg,
			$elm$core$Array$toList(words),
			$ktonon$elm_crypto$Crypto$SHA$Constants$initialHashValues(alg)));
};
var $ktonon$elm_crypto$Crypto$SHA$Process$chunks = F2($ktonon$elm_crypto$Crypto$SHA$Process$chunks$);
var $ktonon$elm_word$Word$FourBytes$ = function (a, b, c, d) {
	return {$: 'FourBytes', a: a, b: b, c: c, d: d};
};
var $ktonon$elm_word$Word$FourBytes = F4($ktonon$elm_word$Word$FourBytes$);
var $ktonon$elm_word$Word$int32FromBytes = function (_v0) {
	var x3 = _v0.a;
	var x2 = _v0.b;
	var x1 = _v0.c;
	var x0 = _v0.d;
	return ((x0 + (x1 * A2($elm$core$Basics$pow, 2, 8))) + (x2 * A2($elm$core$Basics$pow, 2, 16))) + (x3 * A2($elm$core$Basics$pow, 2, 24));
};
var $ktonon$elm_word$Word$pad4 = function (bytes) {
	_v0$4:
	while (true) {
		if (bytes.b) {
			if (bytes.b.b) {
				if (bytes.b.b.b) {
					if (bytes.b.b.b.b) {
						if (!bytes.b.b.b.b.b) {
							var x3 = bytes.a;
							var _v1 = bytes.b;
							var x2 = _v1.a;
							var _v2 = _v1.b;
							var x1 = _v2.a;
							var _v3 = _v2.b;
							var x0 = _v3.a;
							return $ktonon$elm_word$Word$FourBytes$(x3, x2, x1, x0);
						} else {
							break _v0$4;
						}
					} else {
						var x3 = bytes.a;
						var _v4 = bytes.b;
						var x2 = _v4.a;
						var _v5 = _v4.b;
						var x1 = _v5.a;
						return $ktonon$elm_word$Word$FourBytes$(x3, x2, x1, 0);
					}
				} else {
					var x3 = bytes.a;
					var _v6 = bytes.b;
					var x2 = _v6.a;
					return $ktonon$elm_word$Word$FourBytes$(x3, x2, 0, 0);
				}
			} else {
				var x3 = bytes.a;
				return $ktonon$elm_word$Word$FourBytes$(x3, 0, 0, 0);
			}
		} else {
			break _v0$4;
		}
	}
	return $ktonon$elm_word$Word$FourBytes$(0, 0, 0, 0);
};
var $ktonon$elm_word$Word$accWords$ = function (wordSize, bytes, acc) {
	accWords:
	while (true) {
		var _v0 = _Utils_Tuple2(wordSize, bytes);
		_v0$2:
		while (true) {
			if (_v0.a.$ === 'Bit32') {
				if (_v0.b.b) {
					if ((_v0.b.b.b && _v0.b.b.b.b) && _v0.b.b.b.b.b) {
						var _v1 = _v0.a;
						var _v2 = _v0.b;
						var x3 = _v2.a;
						var _v3 = _v2.b;
						var x2 = _v3.a;
						var _v4 = _v3.b;
						var x1 = _v4.a;
						var _v5 = _v4.b;
						var x0 = _v5.a;
						var rest = _v5.b;
						var acc2 = $elm$core$Array$push$(
							$ktonon$elm_word$Word$W(
								$ktonon$elm_word$Word$int32FromBytes(
									$ktonon$elm_word$Word$FourBytes$(x3, x2, x1, x0))),
							acc);
						var $temp$bytes = rest,
							$temp$acc = acc2;
						bytes = $temp$bytes;
						acc = $temp$acc;
						continue accWords;
					} else {
						var _v15 = _v0.a;
						var rest = _v0.b;
						return $elm$core$Array$push$(
							$ktonon$elm_word$Word$W(
								$ktonon$elm_word$Word$int32FromBytes(
									$ktonon$elm_word$Word$pad4(rest))),
							acc);
					}
				} else {
					break _v0$2;
				}
			} else {
				if (_v0.b.b) {
					if ((((((_v0.b.b.b && _v0.b.b.b.b) && _v0.b.b.b.b.b) && _v0.b.b.b.b.b.b) && _v0.b.b.b.b.b.b.b) && _v0.b.b.b.b.b.b.b.b) && _v0.b.b.b.b.b.b.b.b.b) {
						var _v6 = _v0.a;
						var _v7 = _v0.b;
						var x7 = _v7.a;
						var _v8 = _v7.b;
						var x6 = _v8.a;
						var _v9 = _v8.b;
						var x5 = _v9.a;
						var _v10 = _v9.b;
						var x4 = _v10.a;
						var _v11 = _v10.b;
						var x3 = _v11.a;
						var _v12 = _v11.b;
						var x2 = _v12.a;
						var _v13 = _v12.b;
						var x1 = _v13.a;
						var _v14 = _v13.b;
						var x0 = _v14.a;
						var rest = _v14.b;
						var acc2 = $elm$core$Array$push$(
							$ktonon$elm_word$Word$D$(
								$ktonon$elm_word$Word$int32FromBytes(
									$ktonon$elm_word$Word$FourBytes$(x7, x6, x5, x4)),
								$ktonon$elm_word$Word$int32FromBytes(
									$ktonon$elm_word$Word$FourBytes$(x3, x2, x1, x0))),
							acc);
						var $temp$bytes = rest,
							$temp$acc = acc2;
						bytes = $temp$bytes;
						acc = $temp$acc;
						continue accWords;
					} else {
						var _v16 = _v0.a;
						var rest = _v0.b;
						return $elm$core$Array$push$(
							$ktonon$elm_word$Word$D$(
								$ktonon$elm_word$Word$int32FromBytes(
									$ktonon$elm_word$Word$pad4(
										$elm$core$List$take$(4, rest))),
								$ktonon$elm_word$Word$int32FromBytes(
									$ktonon$elm_word$Word$pad4(
										$elm$core$List$drop$(4, rest)))),
							acc);
					}
				} else {
					break _v0$2;
				}
			}
		}
		return acc;
	}
};
var $ktonon$elm_word$Word$accWords = F3($ktonon$elm_word$Word$accWords$);
var $ktonon$elm_word$Word$fromBytes$ = function (wordSize, bytes) {
	return $ktonon$elm_word$Word$accWords$(wordSize, bytes, $elm$core$Array$empty);
};
var $ktonon$elm_word$Word$fromBytes = F2($ktonon$elm_word$Word$fromBytes$);
var $ktonon$elm_crypto$Crypto$SHA$Preprocess$messageSizeBytes = function (alg) {
	messageSizeBytes:
	while (true) {
		switch (alg.$) {
			case 'SHA224':
				var $temp$alg = $ktonon$elm_crypto$Crypto$SHA$Alg$SHA256;
				alg = $temp$alg;
				continue messageSizeBytes;
			case 'SHA256':
				return 8;
			case 'SHA384':
				var $temp$alg = $ktonon$elm_crypto$Crypto$SHA$Alg$SHA512;
				alg = $temp$alg;
				continue messageSizeBytes;
			case 'SHA512':
				return 16;
			case 'SHA512_224':
				var $temp$alg = $ktonon$elm_crypto$Crypto$SHA$Alg$SHA512;
				alg = $temp$alg;
				continue messageSizeBytes;
			default:
				var $temp$alg = $ktonon$elm_crypto$Crypto$SHA$Alg$SHA512;
				alg = $temp$alg;
				continue messageSizeBytes;
		}
	}
};
var $ktonon$elm_crypto$Crypto$SHA$Chunk$sizeInBits = A2(
	$elm$core$Basics$composeR,
	$ktonon$elm_crypto$Crypto$SHA$Chunk$sizeInBytes,
	$elm$core$Basics$mul(8));
var $ktonon$elm_crypto$Crypto$SHA$Preprocess$calculateK$ = function (alg, l) {
	var c = $ktonon$elm_crypto$Crypto$SHA$Chunk$sizeInBits(alg);
	return A2(
		$elm$core$Basics$modBy,
		c,
		((c - 1) - (8 * $ktonon$elm_crypto$Crypto$SHA$Preprocess$messageSizeBytes(alg))) - A2($elm$core$Basics$modBy, c, l));
};
var $ktonon$elm_crypto$Crypto$SHA$Preprocess$calculateK = F2($ktonon$elm_crypto$Crypto$SHA$Preprocess$calculateK$);
var $ktonon$elm_word$Word$Bytes$fromInt$ = function (byteCount, value) {
	return (byteCount > 4) ? $elm$core$List$append$(
		$ktonon$elm_word$Word$Bytes$fromInt$(
			byteCount - 4,
			(value / A2($elm$core$Basics$pow, 2, 32)) | 0),
		$ktonon$elm_word$Word$Bytes$fromInt$(4, 4294967295 & value)) : $elm$core$List$map$(
		function (i) {
			return 255 & (value >>> ((byteCount - i) * A2($elm$core$Basics$pow, 2, 3)));
		},
		$elm$core$List$range$(1, byteCount));
};
var $ktonon$elm_word$Word$Bytes$fromInt = F2($ktonon$elm_word$Word$Bytes$fromInt$);
var $elm$core$List$repeatHelp$ = function (result, n, value) {
	repeatHelp:
	while (true) {
		if (n <= 0) {
			return result;
		} else {
			var $temp$result = A2($elm$core$List$cons, value, result),
				$temp$n = n - 1;
			result = $temp$result;
			n = $temp$n;
			continue repeatHelp;
		}
	}
};
var $elm$core$List$repeatHelp = F3($elm$core$List$repeatHelp$);
var $elm$core$List$repeat$ = function (n, value) {
	return $elm$core$List$repeatHelp$(_List_Nil, n, value);
};
var $elm$core$List$repeat = F2($elm$core$List$repeat$);
var $ktonon$elm_crypto$Crypto$SHA$Preprocess$postfix$ = function (alg, messageSize) {
	return $elm$core$List$concat(
		_List_fromArray(
			[
				_List_fromArray(
				[128]),
				$elm$core$List$repeat$(
				(($ktonon$elm_crypto$Crypto$SHA$Preprocess$calculateK$(alg, messageSize) - 7) / 8) | 0,
				0),
				$ktonon$elm_word$Word$Bytes$fromInt$(
				$ktonon$elm_crypto$Crypto$SHA$Preprocess$messageSizeBytes(alg),
				messageSize)
			]));
};
var $ktonon$elm_crypto$Crypto$SHA$Preprocess$postfix = F2($ktonon$elm_crypto$Crypto$SHA$Preprocess$postfix$);
var $ktonon$elm_crypto$Crypto$SHA$Preprocess$preprocess$ = function (alg, message) {
	return $elm$core$List$append$(
		message,
		$ktonon$elm_crypto$Crypto$SHA$Preprocess$postfix$(
			alg,
			8 * $elm$core$List$length(message)));
};
var $ktonon$elm_crypto$Crypto$SHA$Preprocess$preprocess = F2($ktonon$elm_crypto$Crypto$SHA$Preprocess$preprocess$);
var $ktonon$elm_crypto$Crypto$SHA$digest = function (alg) {
	return A2(
		$elm$core$Basics$composeR,
		$ktonon$elm_crypto$Crypto$SHA$Preprocess$preprocess(alg),
		A2(
			$elm$core$Basics$composeR,
			$ktonon$elm_word$Word$fromBytes(
				$ktonon$elm_crypto$Crypto$SHA$Alg$wordSize(alg)),
			$ktonon$elm_crypto$Crypto$SHA$Process$chunks(alg)));
};
var $ktonon$elm_word$Word$Bytes$splitUtf8 = function (x) {
	return (x < 128) ? _List_fromArray(
		[x]) : ((x < 2048) ? _List_fromArray(
		[192 | ((1984 & x) >>> 6), 128 | (63 & x)]) : _List_fromArray(
		[224 | ((61440 & x) >>> 12), 128 | ((4032 & x) >>> 6), 128 | (63 & x)]));
};
var $elm$core$String$foldr = _String_foldr;
var $elm$core$String$toList = function (string) {
	return A3($elm$core$String$foldr, $elm$core$List$cons, _List_Nil, string);
};
var $ktonon$elm_word$Word$Bytes$fromUTF8 = A2(
	$elm$core$Basics$composeR,
	$elm$core$String$toList,
	A2(
		$elm$core$List$foldl,
		F2(
			function (_char, acc) {
				return $elm$core$List$append$(
					acc,
					$ktonon$elm_word$Word$Bytes$splitUtf8(
						$elm$core$Char$toCode(_char)));
			}),
		_List_Nil));
var $ktonon$elm_word$Word$Hex$fromArray = function (toHex) {
	return A2(
		$elm$core$Array$foldl,
		F2(
			function (val, acc) {
				return _Utils_ap(
					acc,
					toHex(val));
			}),
		'');
};
var $ktonon$elm_word$Word$Hex$fromIntAccumulator = function (x) {
	return $elm$core$String$cons(
		$elm$core$Char$fromCode(
			(x < 10) ? (x + 48) : ((x + 97) - 10)));
};
var $ktonon$elm_word$Word$Hex$fromInt$ = function (charCount, value) {
	return $elm$core$List$foldl$(
		function (i) {
			return $ktonon$elm_word$Word$Hex$fromIntAccumulator(
				15 & (value >>> (i * A2($elm$core$Basics$pow, 2, 2))));
		},
		'',
		$elm$core$List$range$(0, charCount - 1));
};
var $ktonon$elm_word$Word$Hex$fromInt = F2($ktonon$elm_word$Word$Hex$fromInt$);
var $ktonon$elm_word$Word$Hex$fromWord = function (word) {
	switch (word.$) {
		case 'W':
			var x = word.a;
			return $ktonon$elm_word$Word$Hex$fromInt$(8, x);
		case 'D':
			var h = word.a;
			var l = word.b;
			return _Utils_ap(
				$ktonon$elm_word$Word$Hex$fromInt$(8, h),
				$ktonon$elm_word$Word$Hex$fromInt$(8, l));
		default:
			return 'M';
	}
};
var $ktonon$elm_word$Word$Hex$fromWordArray = $ktonon$elm_word$Word$Hex$fromArray($ktonon$elm_word$Word$Hex$fromWord);
var $ktonon$elm_crypto$Crypto$Hash$sha256 = function (message) {
	return $ktonon$elm_word$Word$Hex$fromWordArray(
		A2(
			$ktonon$elm_crypto$Crypto$SHA$digest,
			$ktonon$elm_crypto$Crypto$SHA$Alg$SHA256,
			$ktonon$elm_word$Word$Bytes$fromUTF8(message)));
};
var $author$project$Auth$PasswordHash$hashPassword$ = function (salt, password) {
	var combined = _Utils_ap(salt, password);
	var hash = $ktonon$elm_crypto$Crypto$Hash$sha256(combined);
	return {hash: hash, salt: salt};
};
var $author$project$Auth$PasswordHash$hashPassword = F2($author$project$Auth$PasswordHash$hashPassword$);
var $author$project$TestData$defaultEmailPasswordCredentials = function () {
	var adminHash = $author$project$Auth$PasswordHash$hashPassword$('salt123', 'admin');
	return $elm$core$Dict$fromList(
		_List_fromArray(
			[
				_Utils_Tuple2(
				'sys@admin.com',
				{createdAt: 0, email: 'sys@admin.com', passwordHash: adminHash.hash, passwordSalt: 'salt123'})
			]));
}();
var $author$project$TestData$defaultSessions = $elm$core$Dict$empty;
var $author$project$TestData$defaultUsers = $elm$core$Dict$fromList(
	_List_fromArray(
		[
			_Utils_Tuple2(
			'sys@admin.com',
			{
				email: 'sys@admin.com',
				name: $elm$core$Maybe$Just('System Administrator'),
				preferences: {darkMode: true}
			})
		]));
var $author$project$TestData$initializeTestData = function (model) {
	return _Utils_update(
		model,
		{
			emailPasswordCredentials: $elm$core$Dict$union$($author$project$TestData$defaultEmailPasswordCredentials, model.emailPasswordCredentials),
			sessions: $elm$core$Dict$union$($author$project$TestData$defaultSessions, model.sessions),
			users: $elm$core$Dict$union$($author$project$TestData$defaultUsers, model.users)
		});
};
var $author$project$Env$logSize = '2000';
var $lamdera$program_test$Effect$Internal$None = {$: 'None'};
var $lamdera$program_test$Effect$Command$none = $lamdera$program_test$Effect$Internal$None;
var $author$project$Backend$init = function () {
	var logSize = $elm$core$Maybe$withDefault$(
		2000,
		$elm$core$String$toInt($author$project$Env$logSize));
	var initialModel = {
		emailPasswordCredentials: $elm$core$Dict$empty,
		logState: $author$project$Logger$init(logSize),
		pendingAuths: $elm$core$Dict$empty,
		pollingJobs: $elm$core$Dict$empty,
		sessions: $elm$core$Dict$empty,
		users: $elm$core$Dict$empty
	};
	var modelWithTestData = $author$project$TestData$initializeTestData(initialModel);
	return _Utils_Tuple2(modelWithTestData, $lamdera$program_test$Effect$Command$none);
}();
var $lamdera$program_test$Effect$Internal$SubNone = {$: 'SubNone'};
var $lamdera$program_test$Effect$Subscription$none = $lamdera$program_test$Effect$Internal$SubNone;
var $author$project$Backend$subscriptions = function (_v0) {
	return $lamdera$program_test$Effect$Subscription$none;
};
var $author$project$Types$BusyWithTime = function (a) {
	return {$: 'BusyWithTime', a: a};
};
var $author$project$Types$GotLogTime = function (a) {
	return {$: 'GotLogTime', a: a};
};
var $author$project$Types$Ready = function (a) {
	return {$: 'Ready', a: a};
};
var $author$project$Types$AuthBackendMsg = function (a) {
	return {$: 'AuthBackendMsg', a: a};
};
var $author$project$Types$AuthToFrontend = function (a) {
	return {$: 'AuthToFrontend', a: a};
};
var $author$project$Types$AuthToBackend = function (a) {
	return {$: 'AuthToBackend', a: a};
};
var $author$project$Env$auth0AppClientId = 'qqkzut4gKyC6Y2lB3nlPsOBwnLmTQxfx';
var $author$project$Env$auth0AppClientSecret = '-2bRUV-1JXwO9sqCuTdKziBYG1Rn83bfRvB9LPBqsp5yFcVClx19G-6dI0XtDmEU';
var $author$project$Env$auth0AppTenant = 'dev-ioeftjgqbnfyd4lp.us.auth0.com';
var $author$project$Auth$Common$ProtocolOAuth = function (a) {
	return {$: 'ProtocolOAuth', a: a};
};
var $author$project$Auth$Common$Tenant = function (a) {
	return {$: 'Tenant', a: a};
};
var $author$project$Auth$Common$defaultHttpsUrl = {fragment: $elm$core$Maybe$Nothing, host: '', path: '', port_: $elm$core$Maybe$Nothing, protocol: $elm$url$Url$Https, query: $elm$core$Maybe$Nothing};
var $elm$http$Http$BadBody = function (a) {
	return {$: 'BadBody', a: a};
};
var $author$project$Auth$Common$ErrAuthString = function (a) {
	return {$: 'ErrAuthString', a: a};
};
var $elm$core$Task$fail = _Scheduler_fail;
var $author$project$JWT$JWS = function (a) {
	return {$: 'JWS', a: a};
};
var $author$project$JWT$JWSError = function (a) {
	return {$: 'JWSError', a: a};
};
var $author$project$JWT$TokenTypeUnknown = {$: 'TokenTypeUnknown'};
var $author$project$JWT$JWS$Base64DecodeError = {$: 'Base64DecodeError'};
var $author$project$JWT$JWS$MalformedSignature = {$: 'MalformedSignature'};
var $chelovek0v$bbase64$Base64$Decode$Decoder = function (a) {
	return {$: 'Decoder', a: a};
};
var $chelovek0v$bbase64$Base64$Decode$encodeBytes = function (encoders) {
	return $elm$bytes$Bytes$Encode$encode(
		$elm$bytes$Bytes$Encode$sequence(
			$elm$core$List$reverse(encoders)));
};
var $chelovek0v$bbase64$Base64$Table$charToCodeMap = $elm$core$Dict$fromList(
	_List_fromArray(
		[
			_Utils_Tuple2('A', 0),
			_Utils_Tuple2('B', 1),
			_Utils_Tuple2('C', 2),
			_Utils_Tuple2('D', 3),
			_Utils_Tuple2('E', 4),
			_Utils_Tuple2('F', 5),
			_Utils_Tuple2('G', 6),
			_Utils_Tuple2('H', 7),
			_Utils_Tuple2('I', 8),
			_Utils_Tuple2('J', 9),
			_Utils_Tuple2('K', 10),
			_Utils_Tuple2('L', 11),
			_Utils_Tuple2('M', 12),
			_Utils_Tuple2('N', 13),
			_Utils_Tuple2('O', 14),
			_Utils_Tuple2('P', 15),
			_Utils_Tuple2('Q', 16),
			_Utils_Tuple2('R', 17),
			_Utils_Tuple2('S', 18),
			_Utils_Tuple2('T', 19),
			_Utils_Tuple2('U', 20),
			_Utils_Tuple2('V', 21),
			_Utils_Tuple2('W', 22),
			_Utils_Tuple2('X', 23),
			_Utils_Tuple2('Y', 24),
			_Utils_Tuple2('Z', 25),
			_Utils_Tuple2('a', 26),
			_Utils_Tuple2('b', 27),
			_Utils_Tuple2('c', 28),
			_Utils_Tuple2('d', 29),
			_Utils_Tuple2('e', 30),
			_Utils_Tuple2('f', 31),
			_Utils_Tuple2('g', 32),
			_Utils_Tuple2('h', 33),
			_Utils_Tuple2('i', 34),
			_Utils_Tuple2('j', 35),
			_Utils_Tuple2('k', 36),
			_Utils_Tuple2('l', 37),
			_Utils_Tuple2('m', 38),
			_Utils_Tuple2('n', 39),
			_Utils_Tuple2('o', 40),
			_Utils_Tuple2('p', 41),
			_Utils_Tuple2('q', 42),
			_Utils_Tuple2('r', 43),
			_Utils_Tuple2('s', 44),
			_Utils_Tuple2('t', 45),
			_Utils_Tuple2('u', 46),
			_Utils_Tuple2('v', 47),
			_Utils_Tuple2('w', 48),
			_Utils_Tuple2('x', 49),
			_Utils_Tuple2('y', 50),
			_Utils_Tuple2('z', 51),
			_Utils_Tuple2('0', 52),
			_Utils_Tuple2('1', 53),
			_Utils_Tuple2('2', 54),
			_Utils_Tuple2('3', 55),
			_Utils_Tuple2('4', 56),
			_Utils_Tuple2('5', 57),
			_Utils_Tuple2('6', 58),
			_Utils_Tuple2('7', 59),
			_Utils_Tuple2('8', 60),
			_Utils_Tuple2('9', 61),
			_Utils_Tuple2('+', 62),
			_Utils_Tuple2('/', 63)
		]));
var $chelovek0v$bbase64$Base64$Table$decode = function (_char) {
	return $elm$core$Dict$get$(
		$elm$core$String$fromChar(_char),
		$chelovek0v$bbase64$Base64$Table$charToCodeMap);
};
var $chelovek0v$bbase64$Base64$Shift$Shift2 = {$: 'Shift2'};
var $chelovek0v$bbase64$Base64$Shift$Shift4 = {$: 'Shift4'};
var $chelovek0v$bbase64$Base64$Shift$Shift6 = {$: 'Shift6'};
var $chelovek0v$bbase64$Base64$Shift$Shift0 = {$: 'Shift0'};
var $chelovek0v$bbase64$Base64$Shift$decodeNext = function (shift) {
	switch (shift.$) {
		case 'Shift0':
			return $chelovek0v$bbase64$Base64$Shift$Shift2;
		case 'Shift2':
			return $chelovek0v$bbase64$Base64$Shift$Shift4;
		case 'Shift4':
			return $chelovek0v$bbase64$Base64$Shift$Shift6;
		default:
			return $chelovek0v$bbase64$Base64$Shift$Shift0;
	}
};
var $chelovek0v$bbase64$Base64$Shift$toInt = function (shift) {
	switch (shift.$) {
		case 'Shift0':
			return 0;
		case 'Shift2':
			return 2;
		case 'Shift4':
			return 4;
		default:
			return 6;
	}
};
var $chelovek0v$bbase64$Base64$Shift$shiftRightZfBy$ = function (shift, value) {
	return value >>> $chelovek0v$bbase64$Base64$Shift$toInt(shift);
};
var $chelovek0v$bbase64$Base64$Shift$shiftRightZfBy = F2($chelovek0v$bbase64$Base64$Shift$shiftRightZfBy$);
var $chelovek0v$bbase64$Base64$Decode$finishPartialByte$ = function (shift, sextet, partialByte) {
	return partialByte | $chelovek0v$bbase64$Base64$Shift$shiftRightZfBy$(shift, sextet);
};
var $chelovek0v$bbase64$Base64$Decode$finishPartialByte = F3($chelovek0v$bbase64$Base64$Decode$finishPartialByte$);
var $chelovek0v$bbase64$Base64$Shift$shiftLeftBy$ = function (shift, value) {
	return value << $chelovek0v$bbase64$Base64$Shift$toInt(shift);
};
var $chelovek0v$bbase64$Base64$Shift$shiftLeftBy = F2($chelovek0v$bbase64$Base64$Shift$shiftLeftBy$);
var $elm$bytes$Bytes$Encode$U8 = function (a) {
	return {$: 'U8', a: a};
};
var $elm$bytes$Bytes$Encode$unsignedInt8 = $elm$bytes$Bytes$Encode$U8;
var $chelovek0v$bbase64$Base64$Decode$decodeStep$ = function (sextet, _v0) {
	var shift = _v0.a;
	var partialByte = _v0.b;
	var deferredEncoders = _v0.c;
	var nextBlankByte = function () {
		switch (shift.$) {
			case 'Shift0':
				return $chelovek0v$bbase64$Base64$Shift$shiftLeftBy$($chelovek0v$bbase64$Base64$Shift$Shift2, sextet);
			case 'Shift2':
				return $chelovek0v$bbase64$Base64$Shift$shiftLeftBy$($chelovek0v$bbase64$Base64$Shift$Shift4, sextet);
			case 'Shift4':
				return $chelovek0v$bbase64$Base64$Shift$shiftLeftBy$($chelovek0v$bbase64$Base64$Shift$Shift6, sextet);
			default:
				return 0;
		}
	}();
	var finishedByte = function () {
		switch (shift.$) {
			case 'Shift0':
				return $elm$core$Maybe$Nothing;
			case 'Shift2':
				return $elm$core$Maybe$Just(
					$chelovek0v$bbase64$Base64$Decode$finishPartialByte$($chelovek0v$bbase64$Base64$Shift$Shift4, sextet, partialByte));
			case 'Shift4':
				return $elm$core$Maybe$Just(
					$chelovek0v$bbase64$Base64$Decode$finishPartialByte$($chelovek0v$bbase64$Base64$Shift$Shift2, sextet, partialByte));
			default:
				return $elm$core$Maybe$Just(partialByte | sextet);
		}
	}();
	var nextDeferredDecoders = function () {
		if (finishedByte.$ === 'Just') {
			var byte_ = finishedByte.a;
			return A2(
				$elm$core$List$cons,
				$elm$bytes$Bytes$Encode$unsignedInt8(byte_),
				deferredEncoders);
		} else {
			return deferredEncoders;
		}
	}();
	return _Utils_Tuple3(
		$chelovek0v$bbase64$Base64$Shift$decodeNext(shift),
		nextBlankByte,
		nextDeferredDecoders);
};
var $chelovek0v$bbase64$Base64$Decode$decodeStep = F2($chelovek0v$bbase64$Base64$Decode$decodeStep$);
var $elm$core$String$foldl = _String_foldl;
var $chelovek0v$bbase64$Base64$Decode$initialState = _Utils_Tuple3($chelovek0v$bbase64$Base64$Shift$Shift0, 0, _List_Nil);
var $chelovek0v$bbase64$Base64$Decode$strip = function (input) {
	return A2($elm$core$String$endsWith, '==', input) ? $elm$core$Result$Ok(
		$elm$core$String$dropRight$(2, input)) : (A2($elm$core$String$endsWith, '=', input) ? $elm$core$Result$Ok(
		$elm$core$String$dropRight$(1, input)) : $elm$core$Result$Ok(input));
};
var $chelovek0v$bbase64$Base64$Decode$ValidationError = {$: 'ValidationError'};
var $elm$regex$Regex$Match$ = function (match, index, number, submatches) {
	return {index: index, match: match, number: number, submatches: submatches};
};
var $elm$regex$Regex$Match = F4($elm$regex$Regex$Match$);
var $elm$regex$Regex$contains = _Regex_contains;
var $elm$regex$Regex$fromStringWith = _Regex_fromStringWith;
var $elm$regex$Regex$fromString = function (string) {
	return A2(
		$elm$regex$Regex$fromStringWith,
		{caseInsensitive: false, multiline: false},
		string);
};
var $elm$regex$Regex$never = _Regex_never;
var $chelovek0v$bbase64$Base64$Decode$validate = function (input) {
	var regex = $elm$core$Maybe$withDefault$(
		$elm$regex$Regex$never,
		$elm$regex$Regex$fromString('^[A-Za-z0-9\\/+]*$'));
	return A2($elm$regex$Regex$contains, regex, input) ? $elm$core$Result$Ok(input) : $elm$core$Result$Err($chelovek0v$bbase64$Base64$Decode$ValidationError);
};
var $chelovek0v$bbase64$Base64$Decode$tryDecode = function (input) {
	return $elm$core$Result$map$(
		A2(
			$elm$core$String$foldl,
			F2(
				function (_char, state) {
					return $elm$core$Maybe$withDefault$(
						state,
						$elm$core$Maybe$map$(
							function (sextet) {
								return $chelovek0v$bbase64$Base64$Decode$decodeStep$(sextet, state);
							},
							$chelovek0v$bbase64$Base64$Table$decode(_char)));
				}),
			$chelovek0v$bbase64$Base64$Decode$initialState),
		$elm$core$Result$andThen$(
			$chelovek0v$bbase64$Base64$Decode$validate,
			$chelovek0v$bbase64$Base64$Decode$strip(input)));
};
var $chelovek0v$bbase64$Base64$Decode$bytes = $chelovek0v$bbase64$Base64$Decode$Decoder(
	function (input) {
		var _v0 = $chelovek0v$bbase64$Base64$Decode$tryDecode(input);
		if (_v0.$ === 'Ok') {
			var _v1 = _v0.a;
			var deferredEncoders = _v1.c;
			return $elm$core$Result$Ok(
				$chelovek0v$bbase64$Base64$Decode$encodeBytes(deferredEncoders));
		} else {
			var e = _v0.a;
			return $elm$core$Result$Err(e);
		}
	});
var $chelovek0v$bbase64$Base64$Decode$decode$ = function (_v0, input) {
	var decoder = _v0.a;
	return decoder(input);
};
var $chelovek0v$bbase64$Base64$Decode$decode = F2($chelovek0v$bbase64$Base64$Decode$decode$);
var $author$project$JWT$JWS$InvalidClaims = function (a) {
	return {$: 'InvalidClaims', a: a};
};
var $author$project$JWT$JWS$InvalidHeader = function (a) {
	return {$: 'InvalidHeader', a: a};
};
var $author$project$JWT$JWS$JWS$ = function (signature, header, claims) {
	return {claims: claims, header: header, signature: signature};
};
var $author$project$JWT$JWS$JWS = F3($author$project$JWT$JWS$JWS$);
var $elm$json$Json$Decode$decodeString = _Json_runOnString;
var $author$project$JWT$ClaimSet$ClaimSet$ = function (iss, sub, aud, exp, nbf, iat, jti, metadata) {
	return {aud: aud, exp: exp, iat: iat, iss: iss, jti: jti, metadata: metadata, nbf: nbf, sub: sub};
};
var $author$project$JWT$ClaimSet$ClaimSet = F8($author$project$JWT$ClaimSet$ClaimSet$);
var $NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$custom = $elm$json$Json$Decode$map2($elm$core$Basics$apR);
var $elm$json$Json$Decode$null = _Json_decodeNull;
var $NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$optionalDecoder$ = function (path, valDecoder, fallback) {
	var nullOr = function (decoder) {
		return $elm$json$Json$Decode$oneOf(
			_List_fromArray(
				[
					decoder,
					$elm$json$Json$Decode$null(fallback)
				]));
	};
	var handleResult = function (input) {
		var _v0 = A2(
			$elm$json$Json$Decode$decodeValue,
			$elm$json$Json$Decode$at$(path, $elm$json$Json$Decode$value),
			input);
		if (_v0.$ === 'Ok') {
			var rawValue = _v0.a;
			var _v1 = A2(
				$elm$json$Json$Decode$decodeValue,
				nullOr(valDecoder),
				rawValue);
			if (_v1.$ === 'Ok') {
				var finalResult = _v1.a;
				return $elm$json$Json$Decode$succeed(finalResult);
			} else {
				return $elm$json$Json$Decode$at$(
					path,
					nullOr(valDecoder));
			}
		} else {
			return $elm$json$Json$Decode$succeed(fallback);
		}
	};
	return A2($elm$json$Json$Decode$andThen, handleResult, $elm$json$Json$Decode$value);
};
var $NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$optionalDecoder = F3($NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$optionalDecoder$);
var $NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$optional$ = function (key, valDecoder, fallback, decoder) {
	return A2(
		$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$custom,
		$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$optionalDecoder$(
			_List_fromArray(
				[key]),
			valDecoder,
			fallback),
		decoder);
};
var $NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$optional = F4($NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$optional$);
var $author$project$JWT$ClaimSet$decoder = A2(
	$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$custom,
	$elm$json$Json$Decode$dict($elm$json$Json$Decode$value),
	$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$optional$(
		'jti',
		$elm$json$Json$Decode$maybe($elm$json$Json$Decode$string),
		$elm$core$Maybe$Nothing,
		$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$optional$(
			'iat',
			$elm$json$Json$Decode$maybe($elm$json$Json$Decode$int),
			$elm$core$Maybe$Nothing,
			$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$optional$(
				'nbf',
				$elm$json$Json$Decode$maybe($elm$json$Json$Decode$int),
				$elm$core$Maybe$Nothing,
				$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$optional$(
					'exp',
					$elm$json$Json$Decode$maybe($elm$json$Json$Decode$int),
					$elm$core$Maybe$Nothing,
					$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$optional$(
						'aud',
						$elm$json$Json$Decode$maybe($elm$json$Json$Decode$string),
						$elm$core$Maybe$Nothing,
						$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$optional$(
							'sub',
							$elm$json$Json$Decode$maybe($elm$json$Json$Decode$string),
							$elm$core$Maybe$Nothing,
							$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$optional$(
								'iss',
								$elm$json$Json$Decode$maybe($elm$json$Json$Decode$string),
								$elm$core$Maybe$Nothing,
								$elm$json$Json$Decode$succeed($author$project$JWT$ClaimSet$ClaimSet)))))))));
var $author$project$JWT$JWS$Header$ = function (alg, jku, jwk, kid, x5u, x5c, x5t, x5t_S256, typ, cty, crit) {
	return {alg: alg, crit: crit, cty: cty, jku: jku, jwk: jwk, kid: kid, typ: typ, x5c: x5c, x5t: x5t, x5t_S256: x5t_S256, x5u: x5u};
};
var $author$project$JWT$JWS$Header = function (alg) {
	return function (jku) {
		return function (jwk) {
			return function (kid) {
				return function (x5u) {
					return function (x5c) {
						return function (x5t) {
							return function (x5t_S256) {
								return function (typ) {
									return function (cty) {
										return function (crit) {
											return $author$project$JWT$JWS$Header$(alg, jku, jwk, kid, x5u, x5c, x5t, x5t_S256, typ, cty, crit);
										};
									};
								};
							};
						};
					};
				};
			};
		};
	};
};
var $author$project$JWT$JWK$JWK$ = function (kty, use, key_ops, alg, kid, x5u, x5c, x5t, x5t_S256) {
	return {alg: alg, key_ops: key_ops, kid: kid, kty: kty, use: use, x5c: x5c, x5t: x5t, x5t_S256: x5t_S256, x5u: x5u};
};
var $author$project$JWT$JWK$JWK = F9($author$project$JWT$JWK$JWK$);
var $NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required$ = function (key, valDecoder, decoder) {
	return A2(
		$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$custom,
		A2($elm$json$Json$Decode$field, key, valDecoder),
		decoder);
};
var $NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required = F3($NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required$);
var $author$project$JWT$JWK$decoder = $NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$optional$(
	'x5t#S256',
	$elm$json$Json$Decode$maybe($elm$json$Json$Decode$string),
	$elm$core$Maybe$Nothing,
	$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$optional$(
		'x5t',
		$elm$json$Json$Decode$maybe($elm$json$Json$Decode$string),
		$elm$core$Maybe$Nothing,
		$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$optional$(
			'x5c',
			$elm$json$Json$Decode$maybe(
				$elm$json$Json$Decode$list($elm$json$Json$Decode$string)),
			$elm$core$Maybe$Nothing,
			$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$optional$(
				'x5u',
				$elm$json$Json$Decode$maybe($elm$json$Json$Decode$string),
				$elm$core$Maybe$Nothing,
				$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$optional$(
					'kid',
					$elm$json$Json$Decode$maybe($elm$json$Json$Decode$string),
					$elm$core$Maybe$Nothing,
					$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$optional$(
						'alg',
						$elm$json$Json$Decode$maybe($elm$json$Json$Decode$string),
						$elm$core$Maybe$Nothing,
						$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$optional$(
							'key_ops',
							$elm$json$Json$Decode$maybe(
								$elm$json$Json$Decode$list($elm$json$Json$Decode$string)),
							$elm$core$Maybe$Nothing,
							$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$optional$(
								'use',
								$elm$json$Json$Decode$maybe($elm$json$Json$Decode$string),
								$elm$core$Maybe$Nothing,
								$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required$(
									'kty',
									$elm$json$Json$Decode$string,
									$elm$json$Json$Decode$succeed($author$project$JWT$JWK$JWK))))))))));
var $author$project$JWT$JWS$headerDecoder = $NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$optional$(
	'crit',
	$elm$json$Json$Decode$maybe(
		$elm$json$Json$Decode$list($elm$json$Json$Decode$string)),
	$elm$core$Maybe$Nothing,
	$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$optional$(
		'cty',
		$elm$json$Json$Decode$maybe($elm$json$Json$Decode$string),
		$elm$core$Maybe$Nothing,
		$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$optional$(
			'typ',
			$elm$json$Json$Decode$maybe($elm$json$Json$Decode$string),
			$elm$core$Maybe$Nothing,
			$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$optional$(
				'x5t#S256',
				$elm$json$Json$Decode$maybe($elm$json$Json$Decode$string),
				$elm$core$Maybe$Nothing,
				$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$optional$(
					'x5t',
					$elm$json$Json$Decode$maybe($elm$json$Json$Decode$string),
					$elm$core$Maybe$Nothing,
					$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$optional$(
						'x5c',
						$elm$json$Json$Decode$maybe(
							$elm$json$Json$Decode$list($elm$json$Json$Decode$string)),
						$elm$core$Maybe$Nothing,
						$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$optional$(
							'x5u',
							$elm$json$Json$Decode$maybe($elm$json$Json$Decode$string),
							$elm$core$Maybe$Nothing,
							$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$optional$(
								'kid',
								$elm$json$Json$Decode$maybe($elm$json$Json$Decode$string),
								$elm$core$Maybe$Nothing,
								$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$optional$(
									'jwk',
									$elm$json$Json$Decode$maybe($author$project$JWT$JWK$decoder),
									$elm$core$Maybe$Nothing,
									$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$optional$(
										'jku',
										$elm$json$Json$Decode$maybe($elm$json$Json$Decode$string),
										$elm$core$Maybe$Nothing,
										$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required$(
											'alg',
											$elm$json$Json$Decode$string,
											$elm$json$Json$Decode$succeed($author$project$JWT$JWS$Header))))))))))));
var $author$project$JWT$JWS$decode$ = function (header, claims, signature) {
	return $elm$core$Result$andThen$(
		function (header_) {
			return $elm$core$Result$map$(
				A2($author$project$JWT$JWS$JWS, signature, header_),
				$elm$core$Result$mapError$(
					$author$project$JWT$JWS$InvalidClaims,
					A2($elm$json$Json$Decode$decodeString, $author$project$JWT$ClaimSet$decoder, claims)));
		},
		$elm$core$Result$mapError$(
			$author$project$JWT$JWS$InvalidHeader,
			A2($elm$json$Json$Decode$decodeString, $author$project$JWT$JWS$headerDecoder, header)));
};
var $author$project$JWT$JWS$decode = F3($author$project$JWT$JWS$decode$);
var $elm$regex$Regex$replace = _Regex_replaceAtMost(_Regex_infinity);
var $author$project$JWT$UrlBase64$replaceFromUrl = $elm$core$Maybe$withDefault$(
	$elm$regex$Regex$never,
	$elm$regex$Regex$fromString('[-_]'));
var $author$project$JWT$UrlBase64$decode$ = function (dec, e) {
	var strlen = $elm$core$String$length(e);
	var replaceChar = function (rematch) {
		var _v0 = rematch.match;
		if (_v0 === '-') {
			return '+';
		} else {
			return '/';
		}
	};
	var hanging = A2($elm$core$Basics$modBy, strlen, 4);
	var ilen = (!hanging) ? 0 : (4 - hanging);
	return dec(
		A3(
			$elm$regex$Regex$replace,
			$author$project$JWT$UrlBase64$replaceFromUrl,
			replaceChar,
			_Utils_ap(
				e,
				$elm$core$String$repeat$(ilen, '='))));
};
var $author$project$JWT$UrlBase64$decode = F2($author$project$JWT$UrlBase64$decode$);
var $chelovek0v$bbase64$Base64$Decode$InvalidByteSequence = {$: 'InvalidByteSequence'};
var $chelovek0v$bbase64$Base64$Decode$tryToString = function (input) {
	var _v0 = $elm$bytes$Bytes$Decode$decode$(
		$elm$bytes$Bytes$Decode$string(
			$elm$bytes$Bytes$width(input)),
		input);
	if (_v0.$ === 'Just') {
		var str = _v0.a;
		return $elm$core$Result$Ok(str);
	} else {
		return $elm$core$Result$Err($chelovek0v$bbase64$Base64$Decode$InvalidByteSequence);
	}
};
var $chelovek0v$bbase64$Base64$Decode$string = $chelovek0v$bbase64$Base64$Decode$Decoder(
	function (input) {
		var _v0 = $chelovek0v$bbase64$Base64$Decode$tryDecode(input);
		if (_v0.$ === 'Ok') {
			var _v1 = _v0.a;
			var deferredEncoders = _v1.c;
			return $chelovek0v$bbase64$Base64$Decode$tryToString(
				$chelovek0v$bbase64$Base64$Decode$encodeBytes(deferredEncoders));
		} else {
			var e = _v0.a;
			return $elm$core$Result$Err(e);
		}
	});
var $author$project$JWT$JWS$fromParts$ = function (header, claims, signature) {
	var decode_ = F2(
		function (d, part) {
			return $author$project$JWT$UrlBase64$decode$(
				$chelovek0v$bbase64$Base64$Decode$decode(d),
				part);
		});
	var bytesDecoder = function (len) {
		return $elm$bytes$Bytes$Decode$loop$(
			_Utils_Tuple2(len, _List_Nil),
			function (_v2) {
				var n = _v2.a;
				var xs = _v2.b;
				return (n <= 0) ? $elm$bytes$Bytes$Decode$succeed(
					$elm$bytes$Bytes$Decode$Done(xs)) : $elm$bytes$Bytes$Decode$map$(
					function (x) {
						return $elm$bytes$Bytes$Decode$Loop(
							_Utils_Tuple2(
								n - 1,
								A2($elm$core$List$cons, x, xs)));
					},
					$elm$bytes$Bytes$Decode$unsignedInt8);
			});
	};
	var decodeBytes = function (bytes) {
		return $elm$core$Maybe$map$(
			$elm$core$List$reverse,
			$elm$bytes$Bytes$Decode$decode$(
				bytesDecoder(
					$elm$bytes$Bytes$width(bytes)),
				bytes));
	};
	var _v0 = _Utils_Tuple3(
		A2(decode_, $chelovek0v$bbase64$Base64$Decode$string, header),
		A2(decode_, $chelovek0v$bbase64$Base64$Decode$string, claims),
		A2(decode_, $chelovek0v$bbase64$Base64$Decode$bytes, signature));
	if (((_v0.a.$ === 'Ok') && (_v0.b.$ === 'Ok')) && (_v0.c.$ === 'Ok')) {
		var header_ = _v0.a.a;
		var claims_ = _v0.b.a;
		var signature_ = _v0.c.a;
		var _v1 = decodeBytes(signature_);
		if (_v1.$ === 'Just') {
			var sig = _v1.a;
			return $author$project$JWT$JWS$decode$(header_, claims_, sig);
		} else {
			return $elm$core$Result$Err($author$project$JWT$JWS$MalformedSignature);
		}
	} else {
		return $elm$core$Result$Err($author$project$JWT$JWS$Base64DecodeError);
	}
};
var $author$project$JWT$JWS$fromParts = F3($author$project$JWT$JWS$fromParts$);
var $author$project$JWT$fromString = function (string) {
	var _v0 = $elm$core$String$split$('.', string);
	if (((_v0.b && _v0.b.b) && _v0.b.b.b) && (!_v0.b.b.b.b)) {
		var header = _v0.a;
		var _v1 = _v0.b;
		var claims = _v1.a;
		var _v2 = _v1.b;
		var signature = _v2.a;
		return $elm$core$Result$map$(
			$author$project$JWT$JWS,
			$elm$core$Result$mapError$(
				$author$project$JWT$JWSError,
				$author$project$JWT$JWS$fromParts$(header, claims, signature)));
	} else {
		return $elm$core$Result$Err($author$project$JWT$TokenTypeUnknown);
	}
};
var $author$project$Auth$HttpHelpers$httpErrorToString = function (err) {
	switch (err.$) {
		case 'BadUrl':
			var url = err.a;
			return 'HTTP malformed url: ' + url;
		case 'Timeout':
			return 'HTTP timeout exceeded';
		case 'NetworkError':
			return 'HTTP network error';
		case 'BadStatus':
			var code = err.a;
			return 'Unexpected HTTP response code: ' + $elm$core$String$fromInt(code);
		default:
			var text = err.a;
			return 'HTTP error: ' + text;
	}
};
var $author$project$Auth$Method$OAuthAuth0$jwtErrorToString = function (err) {
	if (err.$ === 'TokenTypeUnknown') {
		return 'Unsupported auth token type.';
	} else {
		var decodeError = err.a;
		switch (decodeError.$) {
			case 'Base64DecodeError':
				return 'Base64DecodeError';
			case 'MalformedSignature':
				return 'MalformedSignature';
			case 'InvalidHeader':
				var jsonError = decodeError.a;
				return 'InvalidHeader: ' + $elm$json$Json$Decode$errorToString(jsonError);
			default:
				var jsonError = decodeError.a;
				return 'InvalidClaims: ' + $elm$json$Json$Decode$errorToString(jsonError);
		}
	}
};
var $elm$core$Result$map5$ = function (func, ra, rb, rc, rd, re) {
	if (ra.$ === 'Err') {
		var x = ra.a;
		return $elm$core$Result$Err(x);
	} else {
		var a = ra.a;
		if (rb.$ === 'Err') {
			var x = rb.a;
			return $elm$core$Result$Err(x);
		} else {
			var b = rb.a;
			if (rc.$ === 'Err') {
				var x = rc.a;
				return $elm$core$Result$Err(x);
			} else {
				var c = rc.a;
				if (rd.$ === 'Err') {
					var x = rd.a;
					return $elm$core$Result$Err(x);
				} else {
					var d = rd.a;
					if (re.$ === 'Err') {
						var x = re.a;
						return $elm$core$Result$Err(x);
					} else {
						var e = re.a;
						return $elm$core$Result$Ok(
							A5(func, a, b, c, d, e));
					}
				}
			}
		}
	}
};
var $elm$core$Result$map5 = F6($elm$core$Result$map5$);
var $elm$core$Task$onError = _Scheduler_onError;
var $elm$core$Task$mapError$ = function (convert, task) {
	return A2(
		$elm$core$Task$onError,
		A2($elm$core$Basics$composeL, $elm$core$Task$fail, convert),
		task);
};
var $elm$core$Task$mapError = F2($elm$core$Task$mapError$);
var $author$project$Auth$Common$nothingIfEmpty = function (s) {
	var trimmed = $elm$core$String$trim(s);
	return (trimmed === '') ? $elm$core$Maybe$Nothing : $elm$core$Maybe$Just(trimmed);
};
var $elm$json$Json$Decode$nullable = function (decoder) {
	return $elm$json$Json$Decode$oneOf(
		_List_fromArray(
			[
				$elm$json$Json$Decode$null($elm$core$Maybe$Nothing),
				A2($elm$json$Json$Decode$map, $elm$core$Maybe$Just, decoder)
			]));
};
var $elm$core$Task$succeed = _Scheduler_succeed;
var $author$project$Auth$Method$OAuthAuth0$getUserInfo = function (authenticationSuccess) {
	var tokenR = function () {
		var _v1 = authenticationSuccess.idJwt;
		if (_v1.$ === 'Nothing') {
			return $elm$core$Result$Err('Identity JWT missing in authentication response. Please report this issue.');
		} else {
			var idJwt = _v1.a;
			var _v2 = $author$project$JWT$fromString(idJwt);
			if (_v2.$ === 'Ok') {
				var t = _v2.a.a;
				return $elm$core$Result$Ok(t);
			} else {
				var err = _v2.a;
				return $elm$core$Result$Err(
					$author$project$Auth$Method$OAuthAuth0$jwtErrorToString(err));
			}
		}
	}();
	var extractOptional = F4(
		function (_default, k, d, v) {
			return $elm$core$Maybe$withDefault$(
				$elm$core$Result$Ok(_default),
				$elm$core$Maybe$map$(
					function (v_) {
						return $elm$core$Result$mapError$(
							$elm$json$Json$Decode$errorToString,
							A2($elm$json$Json$Decode$decodeValue, d, v_));
					},
					$elm$core$Dict$get$(k, v)));
		});
	var extract = F3(
		function (k, d, v) {
			return $elm$core$Maybe$withDefault$(
				$elm$core$Result$Err('Key ' + (k + ' not found')),
				$elm$core$Maybe$map$(
					function (v_) {
						return $elm$core$Result$mapError$(
							$elm$json$Json$Decode$errorToString,
							A2($elm$json$Json$Decode$decodeValue, d, v_));
					},
					$elm$core$Dict$get$(k, v)));
		});
	var stuff = $elm$core$Result$andThen$(
		function (token) {
			var meta = token.claims.metadata;
			return $elm$core$Result$map5$(
				F5(
					function (email, email_verified, given_name, family_name, picture) {
						return {email: email, email_verified: email_verified, family_name: family_name, given_name: given_name, picture: picture};
					}),
				A3(extract, 'email', $elm$json$Json$Decode$string, meta),
				A3(extract, 'email_verified', $elm$json$Json$Decode$bool, meta),
				A4(
					extractOptional,
					$elm$core$Maybe$Nothing,
					'given_name',
					$elm$json$Json$Decode$nullable($elm$json$Json$Decode$string),
					meta),
				A4(
					extractOptional,
					$elm$core$Maybe$Nothing,
					'family_name',
					$elm$json$Json$Decode$nullable($elm$json$Json$Decode$string),
					meta),
				A4(
					extractOptional,
					$elm$core$Maybe$Nothing,
					'picture',
					$elm$json$Json$Decode$nullable($elm$json$Json$Decode$string),
					meta));
		},
		tokenR);
	return $elm$core$Task$mapError$(
		A2($elm$core$Basics$composeL, $author$project$Auth$Common$ErrAuthString, $author$project$Auth$HttpHelpers$httpErrorToString),
		function () {
			if (stuff.$ === 'Ok') {
				var result = stuff.a;
				return $elm$core$Task$succeed(
					{
						email: result.email,
						name: $author$project$Auth$Common$nothingIfEmpty(
							$elm$core$String$join$(
								' ',
								_List_fromArray(
									[
										$elm$core$Maybe$withDefault$('', result.given_name),
										$elm$core$Maybe$withDefault$('', result.family_name)
									]))),
						picture: result.picture,
						username: $elm$core$Maybe$Nothing
					});
			} else {
				var err = stuff.a;
				return $elm$core$Task$fail(
					$elm$http$Http$BadBody(err));
			}
		}());
};
var $author$project$Auth$Common$Authorized$ = function (a, b) {
	return {$: 'Authorized', a: a, b: b};
};
var $author$project$Auth$Common$Authorized = F2($author$project$Auth$Common$Authorized$);
var $author$project$Auth$Common$ErrAuthorization = function (a) {
	return {$: 'ErrAuthorization', a: a};
};
var $author$project$Auth$Common$Errored = function (a) {
	return {$: 'Errored', a: a};
};
var $author$project$Auth$Common$Idle = {$: 'Idle'};
var $author$project$Auth$Common$AuthCallbackReceived$ = function (a, b, c, d) {
	return {$: 'AuthCallbackReceived', a: a, b: b, c: c, d: d};
};
var $author$project$Auth$Common$AuthCallbackReceived = F4($author$project$Auth$Common$AuthCallbackReceived$);
var $author$project$Auth$Protocol$OAuth$accessTokenRequested$ = function (model, methodId, code, state) {
	return _Utils_Tuple2(
		_Utils_update(
			model,
			{
				authFlow: $author$project$Auth$Common$Authorized$(code, state)
			}),
		$author$project$Auth$Common$AuthCallbackReceived$(methodId, model.authRedirectBaseUrl, code, state));
};
var $author$project$Auth$Protocol$OAuth$accessTokenRequested = F4($author$project$Auth$Protocol$OAuth$accessTokenRequested$);
var $elm$core$Platform$Cmd$batch = _Platform_batch;
var $elm$core$Platform$Cmd$none = $elm$core$Platform$Cmd$batch(_List_Nil);
var $author$project$OAuth$Internal$AuthorizationError$ = function (error, errorDescription, errorUri, state) {
	return {error: error, errorDescription: errorDescription, errorUri: errorUri, state: state};
};
var $author$project$OAuth$Internal$AuthorizationError = F4($author$project$OAuth$Internal$AuthorizationError$);
var $elm$url$Url$Parser$Internal$Parser = function (a) {
	return {$: 'Parser', a: a};
};
var $elm$url$Url$Parser$Query$custom$ = function (key, func) {
	return $elm$url$Url$Parser$Internal$Parser(
		function (dict) {
			return func(
				$elm$core$Maybe$withDefault$(
					_List_Nil,
					$elm$core$Dict$get$(key, dict)));
		});
};
var $elm$url$Url$Parser$Query$custom = F2($elm$url$Url$Parser$Query$custom$);
var $elm$url$Url$Parser$Query$string = function (key) {
	return $elm$url$Url$Parser$Query$custom$(
		key,
		function (stringList) {
			if (stringList.b && (!stringList.b.b)) {
				var str = stringList.a;
				return $elm$core$Maybe$Just(str);
			} else {
				return $elm$core$Maybe$Nothing;
			}
		});
};
var $author$project$OAuth$Internal$errorDescriptionParser = $elm$url$Url$Parser$Query$string('error_description');
var $author$project$OAuth$Internal$errorUriParser = $elm$url$Url$Parser$Query$string('error_uri');
var $elm$url$Url$Parser$Query$map3$ = function (func, _v0, _v1, _v2) {
	var a = _v0.a;
	var b = _v1.a;
	var c = _v2.a;
	return $elm$url$Url$Parser$Internal$Parser(
		function (dict) {
			return A3(
				func,
				a(dict),
				b(dict),
				c(dict));
		});
};
var $elm$url$Url$Parser$Query$map3 = F4($elm$url$Url$Parser$Query$map3$);
var $author$project$OAuth$Internal$stateParser = $elm$url$Url$Parser$Query$string('state');
var $author$project$OAuth$Internal$authorizationErrorParser = function (errorCode) {
	return $elm$url$Url$Parser$Query$map3$(
		$author$project$OAuth$Internal$AuthorizationError(errorCode),
		$author$project$OAuth$Internal$errorDescriptionParser,
		$author$project$OAuth$Internal$errorUriParser,
		$author$project$OAuth$Internal$stateParser);
};
var $author$project$OAuth$AuthorizationCode$defaultAuthorizationErrorParser = $author$project$OAuth$Internal$authorizationErrorParser;
var $author$project$OAuth$AuthorizationCode$AuthorizationSuccess$ = function (code, state) {
	return {code: code, state: state};
};
var $author$project$OAuth$AuthorizationCode$AuthorizationSuccess = F2($author$project$OAuth$AuthorizationCode$AuthorizationSuccess$);
var $elm$url$Url$Parser$Query$map$ = function (func, _v0) {
	var a = _v0.a;
	return $elm$url$Url$Parser$Internal$Parser(
		function (dict) {
			return func(
				a(dict));
		});
};
var $elm$url$Url$Parser$Query$map = F2($elm$url$Url$Parser$Query$map$);
var $author$project$OAuth$AuthorizationCode$defaultAuthorizationSuccessParser = function (code) {
	return $elm$url$Url$Parser$Query$map$(
		$author$project$OAuth$AuthorizationCode$AuthorizationSuccess(code),
		$author$project$OAuth$Internal$stateParser);
};
var $author$project$OAuth$AuthorizationCode$defaultCodeParser = $elm$url$Url$Parser$Query$string('code');
var $author$project$OAuth$AccessDenied = {$: 'AccessDenied'};
var $author$project$OAuth$Custom = function (a) {
	return {$: 'Custom', a: a};
};
var $author$project$OAuth$InvalidRequest = {$: 'InvalidRequest'};
var $author$project$OAuth$InvalidScope = {$: 'InvalidScope'};
var $author$project$OAuth$ServerError = {$: 'ServerError'};
var $author$project$OAuth$TemporarilyUnavailable = {$: 'TemporarilyUnavailable'};
var $author$project$OAuth$UnauthorizedClient = {$: 'UnauthorizedClient'};
var $author$project$OAuth$UnsupportedResponseType = {$: 'UnsupportedResponseType'};
var $author$project$OAuth$errorCodeFromString = function (str) {
	switch (str) {
		case 'invalid_request':
			return $author$project$OAuth$InvalidRequest;
		case 'unauthorized_client':
			return $author$project$OAuth$UnauthorizedClient;
		case 'access_denied':
			return $author$project$OAuth$AccessDenied;
		case 'unsupported_response_type':
			return $author$project$OAuth$UnsupportedResponseType;
		case 'invalid_scope':
			return $author$project$OAuth$InvalidScope;
		case 'server_error':
			return $author$project$OAuth$ServerError;
		case 'temporarily_unavailable':
			return $author$project$OAuth$TemporarilyUnavailable;
		default:
			return $author$project$OAuth$Custom(str);
	}
};
var $author$project$OAuth$Internal$errorParser = function (errorCodeFromString) {
	return $elm$url$Url$Parser$Query$map$(
		$elm$core$Maybe$map(errorCodeFromString),
		$elm$url$Url$Parser$Query$string('error'));
};
var $author$project$OAuth$AuthorizationCode$defaultErrorParser = $author$project$OAuth$Internal$errorParser($author$project$OAuth$errorCodeFromString);
var $author$project$OAuth$AuthorizationCode$defaultParsers = {authorizationErrorParser: $author$project$OAuth$AuthorizationCode$defaultAuthorizationErrorParser, authorizationSuccessParser: $author$project$OAuth$AuthorizationCode$defaultAuthorizationSuccessParser, codeParser: $author$project$OAuth$AuthorizationCode$defaultCodeParser, errorParser: $author$project$OAuth$AuthorizationCode$defaultErrorParser};
var $author$project$OAuth$AuthorizationCode$Empty = {$: 'Empty'};
var $author$project$OAuth$AuthorizationCode$Error = function (a) {
	return {$: 'Error', a: a};
};
var $author$project$OAuth$AuthorizationCode$Success = function (a) {
	return {$: 'Success', a: a};
};
var $elm$url$Url$Parser$Query$map2$ = function (func, _v0, _v1) {
	var a = _v0.a;
	var b = _v1.a;
	return $elm$url$Url$Parser$Internal$Parser(
		function (dict) {
			return A2(
				func,
				a(dict),
				b(dict));
		});
};
var $elm$url$Url$Parser$Query$map2 = F3($elm$url$Url$Parser$Query$map2$);
var $elm$core$Tuple$pair$ = function (a, b) {
	return _Utils_Tuple2(a, b);
};
var $elm$core$Tuple$pair = F2($elm$core$Tuple$pair$);
var $elm$url$Url$Parser$State$ = function (visited, unvisited, params, frag, value) {
	return {frag: frag, params: params, unvisited: unvisited, value: value, visited: visited};
};
var $elm$url$Url$Parser$State = F5($elm$url$Url$Parser$State$);
var $elm$url$Url$Parser$getFirstMatch = function (states) {
	getFirstMatch:
	while (true) {
		if (!states.b) {
			return $elm$core$Maybe$Nothing;
		} else {
			var state = states.a;
			var rest = states.b;
			var _v1 = state.unvisited;
			if (!_v1.b) {
				return $elm$core$Maybe$Just(state.value);
			} else {
				if ((_v1.a === '') && (!_v1.b.b)) {
					return $elm$core$Maybe$Just(state.value);
				} else {
					var $temp$states = rest;
					states = $temp$states;
					continue getFirstMatch;
				}
			}
		}
	}
};
var $elm$url$Url$Parser$removeFinalEmpty = function (segments) {
	if (!segments.b) {
		return _List_Nil;
	} else {
		if ((segments.a === '') && (!segments.b.b)) {
			return _List_Nil;
		} else {
			var segment = segments.a;
			var rest = segments.b;
			return A2(
				$elm$core$List$cons,
				segment,
				$elm$url$Url$Parser$removeFinalEmpty(rest));
		}
	}
};
var $elm$url$Url$Parser$preparePath = function (path) {
	var _v0 = $elm$core$String$split$('/', path);
	if (_v0.b && (_v0.a === '')) {
		var segments = _v0.b;
		return $elm$url$Url$Parser$removeFinalEmpty(segments);
	} else {
		var segments = _v0;
		return $elm$url$Url$Parser$removeFinalEmpty(segments);
	}
};
var $elm$url$Url$Parser$addToParametersHelp$ = function (value, maybeList) {
	if (maybeList.$ === 'Nothing') {
		return $elm$core$Maybe$Just(
			_List_fromArray(
				[value]));
	} else {
		var list = maybeList.a;
		return $elm$core$Maybe$Just(
			A2($elm$core$List$cons, value, list));
	}
};
var $elm$url$Url$Parser$addToParametersHelp = F2($elm$url$Url$Parser$addToParametersHelp$);
var $elm$url$Url$percentDecode = _Url_percentDecode;
var $elm$core$Dict$getMin = function (dict) {
	getMin:
	while (true) {
		if ((dict.$ === 'RBNode_elm_builtin') && (dict.d.$ === 'RBNode_elm_builtin')) {
			var left = dict.d;
			var $temp$dict = left;
			dict = $temp$dict;
			continue getMin;
		} else {
			return dict;
		}
	}
};
var $elm$core$Dict$moveRedLeft = function (dict) {
	if (((dict.$ === 'RBNode_elm_builtin') && (dict.d.$ === 'RBNode_elm_builtin')) && (dict.e.$ === 'RBNode_elm_builtin')) {
		if ((dict.e.d.$ === 'RBNode_elm_builtin') && (dict.e.d.a.$ === 'Red')) {
			var clr = dict.a;
			var k = dict.b;
			var v = dict.c;
			var _v1 = dict.d;
			var lClr = _v1.a;
			var lK = _v1.b;
			var lV = _v1.c;
			var lLeft = _v1.d;
			var lRight = _v1.e;
			var _v2 = dict.e;
			var rClr = _v2.a;
			var rK = _v2.b;
			var rV = _v2.c;
			var rLeft = _v2.d;
			var _v3 = rLeft.a;
			var rlK = rLeft.b;
			var rlV = rLeft.c;
			var rlL = rLeft.d;
			var rlR = rLeft.e;
			var rRight = _v2.e;
			return $elm$core$Dict$RBNode_elm_builtin$(
				$elm$core$Dict$Red,
				rlK,
				rlV,
				$elm$core$Dict$RBNode_elm_builtin$(
					$elm$core$Dict$Black,
					k,
					v,
					$elm$core$Dict$RBNode_elm_builtin$($elm$core$Dict$Red, lK, lV, lLeft, lRight),
					rlL),
				$elm$core$Dict$RBNode_elm_builtin$($elm$core$Dict$Black, rK, rV, rlR, rRight));
		} else {
			var clr = dict.a;
			var k = dict.b;
			var v = dict.c;
			var _v4 = dict.d;
			var lClr = _v4.a;
			var lK = _v4.b;
			var lV = _v4.c;
			var lLeft = _v4.d;
			var lRight = _v4.e;
			var _v5 = dict.e;
			var rClr = _v5.a;
			var rK = _v5.b;
			var rV = _v5.c;
			var rLeft = _v5.d;
			var rRight = _v5.e;
			if (clr.$ === 'Black') {
				return $elm$core$Dict$RBNode_elm_builtin$(
					$elm$core$Dict$Black,
					k,
					v,
					$elm$core$Dict$RBNode_elm_builtin$($elm$core$Dict$Red, lK, lV, lLeft, lRight),
					$elm$core$Dict$RBNode_elm_builtin$($elm$core$Dict$Red, rK, rV, rLeft, rRight));
			} else {
				return $elm$core$Dict$RBNode_elm_builtin$(
					$elm$core$Dict$Black,
					k,
					v,
					$elm$core$Dict$RBNode_elm_builtin$($elm$core$Dict$Red, lK, lV, lLeft, lRight),
					$elm$core$Dict$RBNode_elm_builtin$($elm$core$Dict$Red, rK, rV, rLeft, rRight));
			}
		}
	} else {
		return dict;
	}
};
var $elm$core$Dict$moveRedRight = function (dict) {
	if (((dict.$ === 'RBNode_elm_builtin') && (dict.d.$ === 'RBNode_elm_builtin')) && (dict.e.$ === 'RBNode_elm_builtin')) {
		if ((dict.d.d.$ === 'RBNode_elm_builtin') && (dict.d.d.a.$ === 'Red')) {
			var clr = dict.a;
			var k = dict.b;
			var v = dict.c;
			var _v1 = dict.d;
			var lClr = _v1.a;
			var lK = _v1.b;
			var lV = _v1.c;
			var _v2 = _v1.d;
			var _v3 = _v2.a;
			var llK = _v2.b;
			var llV = _v2.c;
			var llLeft = _v2.d;
			var llRight = _v2.e;
			var lRight = _v1.e;
			var _v4 = dict.e;
			var rClr = _v4.a;
			var rK = _v4.b;
			var rV = _v4.c;
			var rLeft = _v4.d;
			var rRight = _v4.e;
			return $elm$core$Dict$RBNode_elm_builtin$(
				$elm$core$Dict$Red,
				lK,
				lV,
				$elm$core$Dict$RBNode_elm_builtin$($elm$core$Dict$Black, llK, llV, llLeft, llRight),
				$elm$core$Dict$RBNode_elm_builtin$(
					$elm$core$Dict$Black,
					k,
					v,
					lRight,
					$elm$core$Dict$RBNode_elm_builtin$($elm$core$Dict$Red, rK, rV, rLeft, rRight)));
		} else {
			var clr = dict.a;
			var k = dict.b;
			var v = dict.c;
			var _v5 = dict.d;
			var lClr = _v5.a;
			var lK = _v5.b;
			var lV = _v5.c;
			var lLeft = _v5.d;
			var lRight = _v5.e;
			var _v6 = dict.e;
			var rClr = _v6.a;
			var rK = _v6.b;
			var rV = _v6.c;
			var rLeft = _v6.d;
			var rRight = _v6.e;
			if (clr.$ === 'Black') {
				return $elm$core$Dict$RBNode_elm_builtin$(
					$elm$core$Dict$Black,
					k,
					v,
					$elm$core$Dict$RBNode_elm_builtin$($elm$core$Dict$Red, lK, lV, lLeft, lRight),
					$elm$core$Dict$RBNode_elm_builtin$($elm$core$Dict$Red, rK, rV, rLeft, rRight));
			} else {
				return $elm$core$Dict$RBNode_elm_builtin$(
					$elm$core$Dict$Black,
					k,
					v,
					$elm$core$Dict$RBNode_elm_builtin$($elm$core$Dict$Red, lK, lV, lLeft, lRight),
					$elm$core$Dict$RBNode_elm_builtin$($elm$core$Dict$Red, rK, rV, rLeft, rRight));
			}
		}
	} else {
		return dict;
	}
};
var $elm$core$Dict$removeHelpPrepEQGT$ = function (targetKey, dict, color, key, value, left, right) {
	if ((left.$ === 'RBNode_elm_builtin') && (left.a.$ === 'Red')) {
		var _v1 = left.a;
		var lK = left.b;
		var lV = left.c;
		var lLeft = left.d;
		var lRight = left.e;
		return $elm$core$Dict$RBNode_elm_builtin$(
			color,
			lK,
			lV,
			lLeft,
			$elm$core$Dict$RBNode_elm_builtin$($elm$core$Dict$Red, key, value, lRight, right));
	} else {
		_v2$2:
		while (true) {
			if ((right.$ === 'RBNode_elm_builtin') && (right.a.$ === 'Black')) {
				if (right.d.$ === 'RBNode_elm_builtin') {
					if (right.d.a.$ === 'Black') {
						var _v3 = right.a;
						var _v4 = right.d;
						var _v5 = _v4.a;
						return $elm$core$Dict$moveRedRight(dict);
					} else {
						break _v2$2;
					}
				} else {
					var _v6 = right.a;
					var _v7 = right.d;
					return $elm$core$Dict$moveRedRight(dict);
				}
			} else {
				break _v2$2;
			}
		}
		return dict;
	}
};
var $elm$core$Dict$removeHelpPrepEQGT = F7($elm$core$Dict$removeHelpPrepEQGT$);
var $elm$core$Dict$removeMin = function (dict) {
	if ((dict.$ === 'RBNode_elm_builtin') && (dict.d.$ === 'RBNode_elm_builtin')) {
		var color = dict.a;
		var key = dict.b;
		var value = dict.c;
		var left = dict.d;
		var lColor = left.a;
		var lLeft = left.d;
		var right = dict.e;
		if (lColor.$ === 'Black') {
			if ((lLeft.$ === 'RBNode_elm_builtin') && (lLeft.a.$ === 'Red')) {
				var _v3 = lLeft.a;
				return $elm$core$Dict$RBNode_elm_builtin$(
					color,
					key,
					value,
					$elm$core$Dict$removeMin(left),
					right);
			} else {
				var _v4 = $elm$core$Dict$moveRedLeft(dict);
				if (_v4.$ === 'RBNode_elm_builtin') {
					var nColor = _v4.a;
					var nKey = _v4.b;
					var nValue = _v4.c;
					var nLeft = _v4.d;
					var nRight = _v4.e;
					return $elm$core$Dict$balance$(
						nColor,
						nKey,
						nValue,
						$elm$core$Dict$removeMin(nLeft),
						nRight);
				} else {
					return $elm$core$Dict$RBEmpty_elm_builtin;
				}
			}
		} else {
			return $elm$core$Dict$RBNode_elm_builtin$(
				color,
				key,
				value,
				$elm$core$Dict$removeMin(left),
				right);
		}
	} else {
		return $elm$core$Dict$RBEmpty_elm_builtin;
	}
};
var $elm$core$Dict$removeHelp$ = function (targetKey, dict) {
	if (dict.$ === 'RBEmpty_elm_builtin') {
		return $elm$core$Dict$RBEmpty_elm_builtin;
	} else {
		var color = dict.a;
		var key = dict.b;
		var value = dict.c;
		var left = dict.d;
		var right = dict.e;
		if (_Utils_cmp(targetKey, key) < 0) {
			if ((left.$ === 'RBNode_elm_builtin') && (left.a.$ === 'Black')) {
				var _v4 = left.a;
				var lLeft = left.d;
				if ((lLeft.$ === 'RBNode_elm_builtin') && (lLeft.a.$ === 'Red')) {
					var _v6 = lLeft.a;
					return $elm$core$Dict$RBNode_elm_builtin$(
						color,
						key,
						value,
						$elm$core$Dict$removeHelp$(targetKey, left),
						right);
				} else {
					var _v7 = $elm$core$Dict$moveRedLeft(dict);
					if (_v7.$ === 'RBNode_elm_builtin') {
						var nColor = _v7.a;
						var nKey = _v7.b;
						var nValue = _v7.c;
						var nLeft = _v7.d;
						var nRight = _v7.e;
						return $elm$core$Dict$balance$(
							nColor,
							nKey,
							nValue,
							$elm$core$Dict$removeHelp$(targetKey, nLeft),
							nRight);
					} else {
						return $elm$core$Dict$RBEmpty_elm_builtin;
					}
				}
			} else {
				return $elm$core$Dict$RBNode_elm_builtin$(
					color,
					key,
					value,
					$elm$core$Dict$removeHelp$(targetKey, left),
					right);
			}
		} else {
			return $elm$core$Dict$removeHelpEQGT$(
				targetKey,
				$elm$core$Dict$removeHelpPrepEQGT$(targetKey, dict, color, key, value, left, right));
		}
	}
};
var $elm$core$Dict$removeHelp = F2($elm$core$Dict$removeHelp$);
var $elm$core$Dict$removeHelpEQGT$ = function (targetKey, dict) {
	if (dict.$ === 'RBNode_elm_builtin') {
		var color = dict.a;
		var key = dict.b;
		var value = dict.c;
		var left = dict.d;
		var right = dict.e;
		if (_Utils_eq(targetKey, key)) {
			var _v1 = $elm$core$Dict$getMin(right);
			if (_v1.$ === 'RBNode_elm_builtin') {
				var minKey = _v1.b;
				var minValue = _v1.c;
				return $elm$core$Dict$balance$(
					color,
					minKey,
					minValue,
					left,
					$elm$core$Dict$removeMin(right));
			} else {
				return $elm$core$Dict$RBEmpty_elm_builtin;
			}
		} else {
			return $elm$core$Dict$balance$(
				color,
				key,
				value,
				left,
				$elm$core$Dict$removeHelp$(targetKey, right));
		}
	} else {
		return $elm$core$Dict$RBEmpty_elm_builtin;
	}
};
var $elm$core$Dict$removeHelpEQGT = F2($elm$core$Dict$removeHelpEQGT$);
var $elm$core$Dict$remove$ = function (key, dict) {
	var _v0 = $elm$core$Dict$removeHelp$(key, dict);
	if ((_v0.$ === 'RBNode_elm_builtin') && (_v0.a.$ === 'Red')) {
		var _v1 = _v0.a;
		var k = _v0.b;
		var v = _v0.c;
		var l = _v0.d;
		var r = _v0.e;
		return $elm$core$Dict$RBNode_elm_builtin$($elm$core$Dict$Black, k, v, l, r);
	} else {
		var x = _v0;
		return x;
	}
};
var $elm$core$Dict$remove = F2($elm$core$Dict$remove$);
var $elm$core$Dict$update$ = function (targetKey, alter, dictionary) {
	var _v0 = alter(
		$elm$core$Dict$get$(targetKey, dictionary));
	if (_v0.$ === 'Just') {
		var value = _v0.a;
		return $elm$core$Dict$insert$(targetKey, value, dictionary);
	} else {
		return $elm$core$Dict$remove$(targetKey, dictionary);
	}
};
var $elm$core$Dict$update = F3($elm$core$Dict$update$);
var $elm$url$Url$Parser$addParam$ = function (segment, dict) {
	var _v0 = $elm$core$String$split$('=', segment);
	if ((_v0.b && _v0.b.b) && (!_v0.b.b.b)) {
		var rawKey = _v0.a;
		var _v1 = _v0.b;
		var rawValue = _v1.a;
		var _v2 = $elm$url$Url$percentDecode(rawKey);
		if (_v2.$ === 'Nothing') {
			return dict;
		} else {
			var key = _v2.a;
			var _v3 = $elm$url$Url$percentDecode(rawValue);
			if (_v3.$ === 'Nothing') {
				return dict;
			} else {
				var value = _v3.a;
				return $elm$core$Dict$update$(
					key,
					$elm$url$Url$Parser$addToParametersHelp(value),
					dict);
			}
		}
	} else {
		return dict;
	}
};
var $elm$url$Url$Parser$addParam = F2($elm$url$Url$Parser$addParam$);
var $elm$url$Url$Parser$prepareQuery = function (maybeQuery) {
	if (maybeQuery.$ === 'Nothing') {
		return $elm$core$Dict$empty;
	} else {
		var qry = maybeQuery.a;
		return $elm$core$List$foldr$(
			$elm$url$Url$Parser$addParam,
			$elm$core$Dict$empty,
			$elm$core$String$split$('&', qry));
	}
};
var $elm$url$Url$Parser$parse$ = function (_v0, url) {
	var parser = _v0.a;
	return $elm$url$Url$Parser$getFirstMatch(
		parser(
			$elm$url$Url$Parser$State$(
				_List_Nil,
				$elm$url$Url$Parser$preparePath(url.path),
				$elm$url$Url$Parser$prepareQuery(url.query),
				url.fragment,
				$elm$core$Basics$identity)));
};
var $elm$url$Url$Parser$parse = F2($elm$url$Url$Parser$parse$);
var $elm$url$Url$Parser$Parser = function (a) {
	return {$: 'Parser', a: a};
};
var $elm$url$Url$Parser$query = function (_v0) {
	var queryParser = _v0.a;
	return $elm$url$Url$Parser$Parser(
		function (_v1) {
			var value = _v1.value;
			var frag = _v1.frag;
			var params = _v1.params;
			var unvisited = _v1.unvisited;
			var visited = _v1.visited;
			return _List_fromArray(
				[
					$elm$url$Url$Parser$State$(
					visited,
					unvisited,
					params,
					frag,
					value(
						queryParser(params)))
				]);
		});
};
var $author$project$OAuth$Internal$parseUrlQuery$ = function (url, def, parser) {
	return $elm$core$Maybe$withDefault$(
		def,
		$elm$url$Url$Parser$parse$(
			$elm$url$Url$Parser$query(parser),
			url));
};
var $author$project$OAuth$Internal$parseUrlQuery = F3($author$project$OAuth$Internal$parseUrlQuery$);
var $elm$url$Url$Parser$slash$ = function (_v0, _v1) {
	var parseBefore = _v0.a;
	var parseAfter = _v1.a;
	return $elm$url$Url$Parser$Parser(
		function (state) {
			return $elm$core$List$concatMap$(
				parseAfter,
				parseBefore(state));
		});
};
var $elm$url$Url$Parser$slash = F2($elm$url$Url$Parser$slash$);
var $elm$url$Url$Parser$questionMark$ = function (parser, queryParser) {
	return $elm$url$Url$Parser$slash$(
		parser,
		$elm$url$Url$Parser$query(queryParser));
};
var $elm$url$Url$Parser$questionMark = F2($elm$url$Url$Parser$questionMark$);
var $elm$url$Url$Parser$top = $elm$url$Url$Parser$Parser(
	function (state) {
		return _List_fromArray(
			[state]);
	});
var $author$project$OAuth$AuthorizationCode$parseCodeWith$ = function (_v0, url_) {
	var authorizationErrorParser = _v0.authorizationErrorParser;
	var authorizationSuccessParser = _v0.authorizationSuccessParser;
	var errorParser = _v0.errorParser;
	var codeParser = _v0.codeParser;
	var url = _Utils_update(
		url_,
		{path: '/'});
	var _v1 = $elm$url$Url$Parser$parse$(
		$elm$url$Url$Parser$questionMark$(
			$elm$url$Url$Parser$top,
			$elm$url$Url$Parser$Query$map2$($elm$core$Tuple$pair, codeParser, errorParser)),
		url);
	_v1$2:
	while (true) {
		if (_v1.$ === 'Just') {
			if (_v1.a.a.$ === 'Just') {
				var _v2 = _v1.a;
				var code = _v2.a.a;
				return $author$project$OAuth$Internal$parseUrlQuery$(
					url,
					$author$project$OAuth$AuthorizationCode$Empty,
					$elm$url$Url$Parser$Query$map$(
						$author$project$OAuth$AuthorizationCode$Success,
						authorizationSuccessParser(code)));
			} else {
				if (_v1.a.b.$ === 'Just') {
					var _v3 = _v1.a;
					var error = _v3.b.a;
					return $author$project$OAuth$Internal$parseUrlQuery$(
						url,
						$author$project$OAuth$AuthorizationCode$Empty,
						$elm$url$Url$Parser$Query$map$(
							$author$project$OAuth$AuthorizationCode$Error,
							authorizationErrorParser(error)));
				} else {
					break _v1$2;
				}
			}
		} else {
			break _v1$2;
		}
	}
	return $author$project$OAuth$AuthorizationCode$Empty;
};
var $author$project$OAuth$AuthorizationCode$parseCodeWith = F2($author$project$OAuth$AuthorizationCode$parseCodeWith$);
var $author$project$OAuth$AuthorizationCode$parseCode = $author$project$OAuth$AuthorizationCode$parseCodeWith($author$project$OAuth$AuthorizationCode$defaultParsers);
var $elm$browser$Browser$External = function (a) {
	return {$: 'External', a: a};
};
var $elm$browser$Browser$Dom$NotFound = function (a) {
	return {$: 'NotFound', a: a};
};
var $elm$core$Basics$never = function (_v0) {
	never:
	while (true) {
		var nvr = _v0.a;
		var $temp$_v0 = nvr;
		_v0 = $temp$_v0;
		continue never;
	}
};
var $elm$core$Task$Perform = function (a) {
	return {$: 'Perform', a: a};
};
var $elm$core$Task$init = $elm$core$Task$succeed(_Utils_Tuple0);
var $elm$core$Task$andThen = _Scheduler_andThen;
var $elm$core$Task$map$ = function (func, taskA) {
	return A2(
		$elm$core$Task$andThen,
		function (a) {
			return $elm$core$Task$succeed(
				func(a));
		},
		taskA);
};
var $elm$core$Task$map = F2($elm$core$Task$map$);
var $elm$core$Task$map2$ = function (func, taskA, taskB) {
	return A2(
		$elm$core$Task$andThen,
		function (a) {
			return A2(
				$elm$core$Task$andThen,
				function (b) {
					return $elm$core$Task$succeed(
						A2(func, a, b));
				},
				taskB);
		},
		taskA);
};
var $elm$core$Task$map2 = F3($elm$core$Task$map2$);
var $elm$core$Task$sequence = function (tasks) {
	return $elm$core$List$foldr$(
		$elm$core$Task$map2($elm$core$List$cons),
		$elm$core$Task$succeed(_List_Nil),
		tasks);
};
var $elm$core$Platform$sendToApp = _Platform_sendToApp;
var $elm$core$Task$spawnCmd$ = function (router, _v0) {
	var task = _v0.a;
	return _Scheduler_spawn(
		A2(
			$elm$core$Task$andThen,
			$elm$core$Platform$sendToApp(router),
			task));
};
var $elm$core$Task$spawnCmd = F2($elm$core$Task$spawnCmd$);
var $elm$core$Task$onEffects$ = function (router, commands, state) {
	return $elm$core$Task$map$(
		function (_v0) {
			return _Utils_Tuple0;
		},
		$elm$core$Task$sequence(
			$elm$core$List$map$(
				$elm$core$Task$spawnCmd(router),
				commands)));
};
var $elm$core$Task$onEffects = F3($elm$core$Task$onEffects$);
var $elm$core$Task$onSelfMsg$ = function (_v0, _v1, _v2) {
	return $elm$core$Task$succeed(_Utils_Tuple0);
};
var $elm$core$Task$onSelfMsg = F3($elm$core$Task$onSelfMsg$);
var $elm$core$Task$cmdMap$ = function (tagger, _v0) {
	var task = _v0.a;
	return $elm$core$Task$Perform(
		$elm$core$Task$map$(tagger, task));
};
var $elm$core$Task$cmdMap = F2($elm$core$Task$cmdMap$);
_Platform_effectManagers['Task'] = _Platform_createManager($elm$core$Task$init, $elm$core$Task$onEffects, $elm$core$Task$onSelfMsg, $elm$core$Task$cmdMap);
var $elm$core$Task$command = _Platform_leaf('Task');
var $elm$core$Task$perform$ = function (toMessage, task) {
	return $elm$core$Task$command(
		$elm$core$Task$Perform(
			$elm$core$Task$map$(toMessage, task)));
};
var $elm$core$Task$perform = F2($elm$core$Task$perform$);
var $elm$browser$Browser$Navigation$replaceUrl = _Browser_replaceUrl;
var $author$project$Auth$Protocol$OAuth$onFrontendCallbackInit$ = function (model, methodId, origin, navigationKey, toBackendFn) {
	var redirectUri = _Utils_update(
		origin,
		{fragment: $elm$core$Maybe$Nothing, query: $elm$core$Maybe$Nothing});
	var clearUrl = A2(
		$elm$browser$Browser$Navigation$replaceUrl,
		navigationKey,
		$elm$url$Url$toString(model.authRedirectBaseUrl));
	var _v0 = $author$project$OAuth$AuthorizationCode$parseCode(origin);
	switch (_v0.$) {
		case 'Empty':
			return _Utils_Tuple2(
				_Utils_update(
					model,
					{authFlow: $author$project$Auth$Common$Idle}),
				$elm$core$Platform$Cmd$none);
		case 'Success':
			var state = _v0.a.state;
			var code = _v0.a.code;
			var state_ = $elm$core$Maybe$withDefault$('', state);
			var model_ = _Utils_update(
				model,
				{
					authFlow: $author$project$Auth$Common$Authorized$(code, state_)
				});
			var _v1 = $author$project$Auth$Protocol$OAuth$accessTokenRequested$(model_, methodId, code, state_);
			var newModel = _v1.a;
			var newCmds = _v1.b;
			return _Utils_Tuple2(
				newModel,
				$elm$core$Platform$Cmd$batch(
					_List_fromArray(
						[
							toBackendFn(newCmds),
							clearUrl
						])));
		default:
			var error = _v0.a;
			return _Utils_Tuple2(
				_Utils_update(
					model,
					{
						authFlow: $author$project$Auth$Common$Errored(
							$author$project$Auth$Common$ErrAuthorization(error))
					}),
				clearUrl);
	}
};
var $author$project$Auth$Protocol$OAuth$onFrontendCallbackInit = F5($author$project$Auth$Protocol$OAuth$onFrontendCallbackInit$);
var $author$project$Auth$Method$OAuthAuth0$configuration$ = function (clientId, clientSecret, appTenant) {
	return $author$project$Auth$Common$ProtocolOAuth(
		{
			allowLoginQueryParameters: true,
			authorizationEndpoint: _Utils_update(
				$author$project$Auth$Common$defaultHttpsUrl,
				{host: appTenant, path: '/authorize'}),
			clientId: clientId,
			clientSecret: clientSecret,
			getUserInfo: $author$project$Auth$Method$OAuthAuth0$getUserInfo,
			id: 'OAuthAuth0',
			logoutEndpoint: $author$project$Auth$Common$Tenant(
				{
					returnPath: '/logout/OAuthAuth0/callback',
					url: _Utils_update(
						$author$project$Auth$Common$defaultHttpsUrl,
						{
							host: appTenant,
							path: '/v2/logout',
							query: $elm$core$Maybe$Just('client_id=' + (clientId + '&returnTo='))
						})
				}),
			onFrontendCallbackInit: $author$project$Auth$Protocol$OAuth$onFrontendCallbackInit,
			placeholder: function (x) {
				return _Utils_Tuple0;
			},
			scope: _List_fromArray(
				['openid email profile']),
			tokenEndpoint: _Utils_update(
				$author$project$Auth$Common$defaultHttpsUrl,
				{host: appTenant, path: '/oauth/token'})
		});
};
var $author$project$Auth$Method$OAuthAuth0$configuration = F3($author$project$Auth$Method$OAuthAuth0$configuration$);
var $author$project$Rights$Auth0$customizeAuth0Method = function (method) {
	if (method.$ === 'ProtocolOAuth') {
		var oauthConfig = method.a;
		var authEndpoint = oauthConfig.authorizationEndpoint;
		var updatedEndpoint = _Utils_update(
			authEndpoint,
			{
				query: $elm$core$Maybe$Just('connection=google-oauth2&prompt=select_account&auth0Client=eyJuYW1lIjoiR2VuZXJhbCIsInZlcnNpb24iOiIxLjAuMCJ9')
			});
		return $author$project$Auth$Common$ProtocolOAuth(
			_Utils_update(
				oauthConfig,
				{authorizationEndpoint: updatedEndpoint}));
	} else {
		return method;
	}
};
var $author$project$Rights$Auth0$renewSession$ = function (_v0, _v1, model) {
	return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
};
var $author$project$Rights$Auth0$renewSession = F3($author$project$Rights$Auth0$renewSession$);
var $lamdera$core$Lamdera$Effect$SendToBackend = function (a) {
	return {$: 'SendToBackend', a: a};
};
var $lamdera$core$Lamdera$Effect$init = $elm$core$Task$succeed(_Utils_Tuple0);
var $lamdera$core$Lamdera$Effect$BEtoFE$ = function (a, b) {
	return {$: 'BEtoFE', a: a, b: b};
};
var $lamdera$core$Lamdera$Effect$BEtoFE = F2($lamdera$core$Lamdera$Effect$BEtoFE$);
var $lamdera$core$Lamdera$Effect$FEtoBE = function (a) {
	return {$: 'FEtoBE', a: a};
};
var $lamdera$core$Lamdera$Effect$unsafeCoerce = _Lamdera_unsafeCoerce;
var $lamdera$core$Lamdera$Effect$onEffects$ = function (router, cmds, subs, state) {
	if (!cmds.b) {
		return $elm$core$Task$succeed(state);
	} else {
		switch (cmds.a.$) {
			case 'SendToBackend':
				var toBackend = cmds.a.a;
				var cmdsRest = cmds.b;
				return A2(
					$elm$core$Task$andThen,
					function (_v1) {
						return $lamdera$core$Lamdera$Effect$onEffects$(router, cmdsRest, subs, state);
					},
					A2(
						$elm$core$Platform$sendToApp,
						router,
						$lamdera$core$Lamdera$Effect$unsafeCoerce(
							$lamdera$core$Lamdera$Effect$FEtoBE(
								$lamdera$core$Lamdera$Effect$unsafeCoerce(toBackend)))));
			case 'SendToFrontend':
				var _v2 = cmds.a;
				var clientId = _v2.a;
				var toFrontend = _v2.b;
				var cmdsRest = cmds.b;
				return A2(
					$elm$core$Task$andThen,
					function (_v3) {
						return $lamdera$core$Lamdera$Effect$onEffects$(router, cmdsRest, subs, state);
					},
					A2(
						$elm$core$Platform$sendToApp,
						router,
						$lamdera$core$Lamdera$Effect$unsafeCoerce(
							$lamdera$core$Lamdera$Effect$BEtoFE$(
								clientId,
								$lamdera$core$Lamdera$Effect$unsafeCoerce(toFrontend)))));
			case 'ClientConnected_':
				var _v4 = cmds.a;
				var sessionId = _v4.a;
				var clientId = _v4.b;
				var cmdsRest = cmds.b;
				var sends = $elm$core$List$map$(
					function (sub) {
						if (sub.$ === 'ClientConnected') {
							var tagger = sub.a;
							return A2(
								$elm$core$Task$andThen,
								function (_v7) {
									return $elm$core$Task$succeed(state);
								},
								A2(
									$elm$core$Platform$sendToApp,
									router,
									A2(tagger, sessionId, clientId)));
						} else {
							var tagger = sub.a;
							return $elm$core$Task$succeed(state);
						}
					},
					subs);
				return A2(
					$elm$core$Task$andThen,
					function (_v5) {
						return $lamdera$core$Lamdera$Effect$onEffects$(router, cmdsRest, subs, state);
					},
					$elm$core$Task$sequence(sends));
			default:
				var _v8 = cmds.a;
				var sessionId = _v8.a;
				var clientId = _v8.b;
				var cmdsRest = cmds.b;
				var sends = $elm$core$List$map$(
					function (sub) {
						if (sub.$ === 'ClientConnected') {
							var tagger = sub.a;
							return $elm$core$Task$succeed(state);
						} else {
							var tagger = sub.a;
							return A2(
								$elm$core$Task$andThen,
								function (_v11) {
									return $elm$core$Task$succeed(state);
								},
								A2(
									$elm$core$Platform$sendToApp,
									router,
									A2(tagger, sessionId, clientId)));
						}
					},
					subs);
				return A2(
					$elm$core$Task$andThen,
					function (_v9) {
						return $lamdera$core$Lamdera$Effect$onEffects$(router, cmdsRest, subs, state);
					},
					$elm$core$Task$sequence(sends));
		}
	}
};
var $lamdera$core$Lamdera$Effect$onEffects = F4($lamdera$core$Lamdera$Effect$onEffects$);
var $lamdera$core$Lamdera$Effect$onSelfMsg$ = function (_v0, _v1, state) {
	return $elm$core$Task$succeed(state);
};
var $lamdera$core$Lamdera$Effect$onSelfMsg = F3($lamdera$core$Lamdera$Effect$onSelfMsg$);
var $lamdera$core$Lamdera$Effect$ClientConnected_$ = function (a, b) {
	return {$: 'ClientConnected_', a: a, b: b};
};
var $lamdera$core$Lamdera$Effect$ClientConnected_ = F2($lamdera$core$Lamdera$Effect$ClientConnected_$);
var $lamdera$core$Lamdera$Effect$ClientDisconnected_$ = function (a, b) {
	return {$: 'ClientDisconnected_', a: a, b: b};
};
var $lamdera$core$Lamdera$Effect$ClientDisconnected_ = F2($lamdera$core$Lamdera$Effect$ClientDisconnected_$);
var $lamdera$core$Lamdera$Effect$SendToFrontend$ = function (a, b) {
	return {$: 'SendToFrontend', a: a, b: b};
};
var $lamdera$core$Lamdera$Effect$SendToFrontend = F2($lamdera$core$Lamdera$Effect$SendToFrontend$);
var $lamdera$core$Lamdera$Effect$cmdMap$ = function (f, cmd) {
	switch (cmd.$) {
		case 'SendToBackend':
			var toBackend = cmd.a;
			return $lamdera$core$Lamdera$Effect$SendToBackend(
				$lamdera$core$Lamdera$Effect$unsafeCoerce(toBackend));
		case 'SendToFrontend':
			var clientId = cmd.a;
			var toFrontend = cmd.b;
			return $lamdera$core$Lamdera$Effect$SendToFrontend$(
				clientId,
				$lamdera$core$Lamdera$Effect$unsafeCoerce(toFrontend));
		case 'ClientConnected_':
			var sessionId = cmd.a;
			var clientId = cmd.b;
			return $lamdera$core$Lamdera$Effect$ClientConnected_$(sessionId, clientId);
		default:
			var sessionId = cmd.a;
			var clientId = cmd.b;
			return $lamdera$core$Lamdera$Effect$ClientDisconnected_$(sessionId, clientId);
	}
};
var $lamdera$core$Lamdera$Effect$cmdMap = F2($lamdera$core$Lamdera$Effect$cmdMap$);
var $lamdera$core$Lamdera$Effect$ClientConnected = function (a) {
	return {$: 'ClientConnected', a: a};
};
var $lamdera$core$Lamdera$Effect$ClientDisconnected = function (a) {
	return {$: 'ClientDisconnected', a: a};
};
var $lamdera$core$Lamdera$Effect$subMap$ = function (func, sub) {
	if (sub.$ === 'ClientConnected') {
		var tagger = sub.a;
		return $lamdera$core$Lamdera$Effect$ClientConnected(
			F2(
				function (s, c) {
					return func(
						A2(tagger, s, c));
				}));
	} else {
		var tagger = sub.a;
		return $lamdera$core$Lamdera$Effect$ClientDisconnected(
			F2(
				function (s, c) {
					return func(
						A2(tagger, s, c));
				}));
	}
};
var $lamdera$core$Lamdera$Effect$subMap = F2($lamdera$core$Lamdera$Effect$subMap$);
_Platform_effectManagers['Lamdera.Effect'] = _Platform_createManager($lamdera$core$Lamdera$Effect$init, $lamdera$core$Lamdera$Effect$onEffects, $lamdera$core$Lamdera$Effect$onSelfMsg, $lamdera$core$Lamdera$Effect$cmdMap, $lamdera$core$Lamdera$Effect$subMap);
var $lamdera$core$Lamdera$Effect$command = _Platform_leaf('Lamdera.Effect');
var $lamdera$core$Lamdera$Effect$subscription = _Platform_leaf('Lamdera.Effect');
var $lamdera$core$Lamdera$Effect$sendToBackend = function (toBackend) {
	return $lamdera$core$Lamdera$Effect$command(
		$lamdera$core$Lamdera$Effect$SendToBackend(
			$lamdera$core$Lamdera$Effect$unsafeCoerce(toBackend)));
};
var $lamdera$core$Lamdera$sendToBackend = function (msg) {
	return $lamdera$core$Lamdera$Effect$sendToBackend(msg);
};
var $lamdera$core$Lamdera$Effect$sendToFrontend$ = function (clientId, toFrontend) {
	return $lamdera$core$Lamdera$Effect$command(
		$lamdera$core$Lamdera$Effect$SendToFrontend$(
			clientId,
			$lamdera$core$Lamdera$Effect$unsafeCoerce(toFrontend)));
};
var $lamdera$core$Lamdera$Effect$sendToFrontend = F2($lamdera$core$Lamdera$Effect$sendToFrontend$);
var $lamdera$core$Lamdera$sendToFrontend$ = function (clientId, msg) {
	return $lamdera$core$Lamdera$Effect$sendToFrontend$(clientId, msg);
};
var $lamdera$core$Lamdera$sendToFrontend = F2($lamdera$core$Lamdera$sendToFrontend$);
var $author$project$Rights$Auth0$config = {
	backendMsg: $author$project$Types$AuthBackendMsg,
	methods: _List_fromArray(
		[
			$author$project$Rights$Auth0$customizeAuth0Method(
			$author$project$Auth$Method$OAuthAuth0$configuration$($author$project$Env$auth0AppClientId, $author$project$Env$auth0AppClientSecret, $author$project$Env$auth0AppTenant))
		]),
	renewSession: $author$project$Rights$Auth0$renewSession,
	sendToBackend: $lamdera$core$Lamdera$sendToBackend,
	sendToFrontend: $lamdera$core$Lamdera$sendToFrontend,
	toBackend: $author$project$Types$AuthToBackend,
	toFrontend: $author$project$Types$AuthToFrontend
};
var $author$project$Types$AuthSuccess = function (a) {
	return {$: 'AuthSuccess', a: a};
};
var $author$project$Rights$Auth0$handleAuthSuccess$ = function (backendModel, sessionId, clientId, userInfo, _v0, _v1, _v2) {
	var sessionsWithOutThisOne = $elm$core$Dict$filter$(
		F2(
			function (_v3, _v4) {
				var email = _v4.email;
				return !_Utils_eq(email, userInfo.email);
			}),
		backendModel.sessions);
	var response = $author$project$Types$AuthSuccess(userInfo);
	var newSessions = $elm$core$Dict$insert$(sessionId, userInfo, sessionsWithOutThisOne);
	return _Utils_Tuple2(
		_Utils_update(
			backendModel,
			{sessions: newSessions}),
		$lamdera$core$Lamdera$sendToFrontend$(clientId, response));
};
var $author$project$Rights$Auth0$handleAuthSuccess = F7($author$project$Rights$Auth0$handleAuthSuccess$);
var $author$project$Rights$Auth0$logout$ = function (sessionId, _v0, model) {
	return _Utils_Tuple2(
		_Utils_update(
			model,
			{
				sessions: $elm$core$Dict$remove$(sessionId, model.sessions)
			}),
		$elm$core$Platform$Cmd$none);
};
var $author$project$Rights$Auth0$logout = F3($author$project$Rights$Auth0$logout$);
var $elmcraft$core_extra$List$Extra$find$ = function (predicate, list) {
	find:
	while (true) {
		if (!list.b) {
			return $elm$core$Maybe$Nothing;
		} else {
			var first = list.a;
			var rest = list.b;
			if (predicate(first)) {
				return $elm$core$Maybe$Just(first);
			} else {
				var $temp$list = rest;
				list = $temp$list;
				continue find;
			}
		}
	}
};
var $elmcraft$core_extra$List$Extra$find = F2($elmcraft$core_extra$List$Extra$find$);
var $author$project$Auth$Flow$methodLoader$ = function (methods, methodId) {
	return $elmcraft$core_extra$List$Extra$find$(
		function (config) {
			if (config.$ === 'ProtocolEmailMagicLink') {
				var method = config.a;
				return _Utils_eq(method.id, methodId);
			} else {
				var method = config.a;
				return _Utils_eq(method.id, methodId);
			}
		},
		methods);
};
var $author$project$Auth$Flow$methodLoader = F2($author$project$Auth$Flow$methodLoader$);
var $author$project$Rights$Auth0$backendConfig = function (model) {
	return {
		asBackendMsg: $author$project$Types$AuthBackendMsg,
		asToFrontend: $author$project$Types$AuthToFrontend,
		backendModel: model,
		handleAuthSuccess: $author$project$Rights$Auth0$handleAuthSuccess(model),
		isDev: true,
		loadMethod: $author$project$Auth$Flow$methodLoader($author$project$Rights$Auth0$config.methods),
		logout: $author$project$Rights$Auth0$logout,
		renewSession: $author$project$Rights$Auth0$renewSession,
		sendToFrontend: $lamdera$core$Lamdera$sendToFrontend
	};
};
var $author$project$Auth$Common$AuthError = function (a) {
	return {$: 'AuthError', a: a};
};
var $author$project$Auth$Common$AuthInitiateSignin = function (a) {
	return {$: 'AuthInitiateSignin', a: a};
};
var $author$project$Auth$Common$AuthSigninInitiatedDelayed_$ = function (a, b) {
	return {$: 'AuthSigninInitiatedDelayed_', a: a, b: b};
};
var $author$project$Auth$Common$AuthSigninInitiatedDelayed_ = F2($author$project$Auth$Common$AuthSigninInitiatedDelayed_$);
var $TSFoster$elm_sha1$SHA1$loopHelp$ = function (step, _v0) {
	var n = _v0.a;
	var state = _v0.b;
	return (n > 0) ? $elm$bytes$Bytes$Decode$map$(
		function (_new) {
			return $elm$bytes$Bytes$Decode$Loop(
				_Utils_Tuple2(n - 1, _new));
		},
		step(state)) : $elm$bytes$Bytes$Decode$succeed(
		$elm$bytes$Bytes$Decode$Done(state));
};
var $TSFoster$elm_sha1$SHA1$loopHelp = F2($TSFoster$elm_sha1$SHA1$loopHelp$);
var $TSFoster$elm_sha1$SHA1$iterate$ = function (n, step, initial) {
	return $elm$bytes$Bytes$Decode$loop$(
		_Utils_Tuple2(n, initial),
		$TSFoster$elm_sha1$SHA1$loopHelp(step));
};
var $TSFoster$elm_sha1$SHA1$iterate = F3($TSFoster$elm_sha1$SHA1$iterate$);
var $elm$bytes$Bytes$Encode$Bytes = function (a) {
	return {$: 'Bytes', a: a};
};
var $elm$bytes$Bytes$Encode$bytes = $elm$bytes$Bytes$Encode$Bytes;
var $elm$bytes$Bytes$Encode$U32$ = function (a, b) {
	return {$: 'U32', a: a, b: b};
};
var $elm$bytes$Bytes$Encode$U32 = F2($elm$bytes$Bytes$Encode$U32$);
var $elm$bytes$Bytes$Encode$unsignedInt32 = $elm$bytes$Bytes$Encode$U32;
var $TSFoster$elm_sha1$SHA1$padBuffer = function (bytes) {
	var byteCount = $elm$bytes$Bytes$width(bytes);
	var paddingSize = 4 + A2(
		$elm$core$Basics$modBy,
		64,
		56 - A2($elm$core$Basics$modBy, 64, byteCount + 1));
	var message = $elm$bytes$Bytes$Encode$encode(
		$elm$bytes$Bytes$Encode$sequence(
			_List_fromArray(
				[
					$elm$bytes$Bytes$Encode$bytes(bytes),
					$elm$bytes$Bytes$Encode$unsignedInt8(128),
					$elm$bytes$Bytes$Encode$sequence(
					$elm$core$List$repeat$(
						paddingSize,
						$elm$bytes$Bytes$Encode$unsignedInt8(0))),
					A2($elm$bytes$Bytes$Encode$unsignedInt32, $elm$bytes$Bytes$BE, byteCount << 3)
				])));
	return message;
};
var $elm$bytes$Bytes$Decode$map4$ = function (func, _v0, _v1, _v2, _v3) {
	var decodeA = _v0.a;
	var decodeB = _v1.a;
	var decodeC = _v2.a;
	var decodeD = _v3.a;
	return $elm$bytes$Bytes$Decode$Decoder(
		F2(
			function (bites, offset) {
				var _v4 = A2(decodeA, bites, offset);
				var aOffset = _v4.a;
				var a = _v4.b;
				var _v5 = A2(decodeB, bites, aOffset);
				var bOffset = _v5.a;
				var b = _v5.b;
				var _v6 = A2(decodeC, bites, bOffset);
				var cOffset = _v6.a;
				var c = _v6.b;
				var _v7 = A2(decodeD, bites, cOffset);
				var dOffset = _v7.a;
				var d = _v7.b;
				return _Utils_Tuple2(
					dOffset,
					A4(func, a, b, c, d));
			}));
};
var $elm$bytes$Bytes$Decode$map4 = F5($elm$bytes$Bytes$Decode$map4$);
var $TSFoster$elm_sha1$SHA1$map16$ = function (f, b1, b2, b3, b4, b5, b6, b7, b8, b9, b10, b11, b12, b13, b14, b15, b16) {
	var d1 = $elm$bytes$Bytes$Decode$map4$(
		F4(
			function (a, b, c, d) {
				return A4(f, a, b, c, d);
			}),
		b1,
		b2,
		b3,
		b4);
	var d2 = $elm$bytes$Bytes$Decode$map5$(
		F5(
			function (h, a, b, c, d) {
				return A4(h, a, b, c, d);
			}),
		d1,
		b5,
		b6,
		b7,
		b8);
	var d3 = $elm$bytes$Bytes$Decode$map5$(
		F5(
			function (h, a, b, c, d) {
				return A4(h, a, b, c, d);
			}),
		d2,
		b9,
		b10,
		b11,
		b12);
	var d4 = $elm$bytes$Bytes$Decode$map5$(
		F5(
			function (h, a, b, c, d) {
				return A4(h, a, b, c, d);
			}),
		d3,
		b13,
		b14,
		b15,
		b16);
	return d4;
};
var $TSFoster$elm_sha1$SHA1$map16 = function (f) {
	return function (b1) {
		return function (b2) {
			return function (b3) {
				return function (b4) {
					return function (b5) {
						return function (b6) {
							return function (b7) {
								return function (b8) {
									return function (b9) {
										return function (b10) {
											return function (b11) {
												return function (b12) {
													return function (b13) {
														return function (b14) {
															return function (b15) {
																return function (b16) {
																	return $TSFoster$elm_sha1$SHA1$map16$(f, b1, b2, b3, b4, b5, b6, b7, b8, b9, b10, b11, b12, b13, b14, b15, b16);
																};
															};
														};
													};
												};
											};
										};
									};
								};
							};
						};
					};
				};
			};
		};
	};
};
var $TSFoster$elm_sha1$SHA1$DeltaState = function (a) {
	return {$: 'DeltaState', a: a};
};
var $TSFoster$elm_sha1$SHA1$State = function (a) {
	return {$: 'State', a: a};
};
var $TSFoster$elm_sha1$SHA1$rotateLeftBy$ = function (amount, i) {
	return ((i >>> (32 - amount)) | (i << amount)) >>> 0;
};
var $TSFoster$elm_sha1$SHA1$rotateLeftBy = F2($TSFoster$elm_sha1$SHA1$rotateLeftBy$);
var $TSFoster$elm_sha1$SHA1$calculateDigestDeltasChunk$ = function (index, _int, _v0) {
	var e = _v0.a.e;
	var d = _v0.a.d;
	var c = _v0.a.c;
	var b = _v0.a.b;
	var a = _v0.a.a;
	var shiftedA = (a >>> (32 - 5)) | (a << 5);
	var f = function () {
		var _v1 = (index / 20) | 0;
		switch (_v1) {
			case 0:
				return ((b & c) | ((~b) & d)) + 1518500249;
			case 1:
				return (b ^ (c ^ d)) + 1859775393;
			case 2:
				return ((b & (c | d)) | (c & d)) + 2400959708;
			default:
				return (b ^ (c ^ d)) + 3395469782;
		}
	}();
	var newA = (((shiftedA + f) + e) + _int) >>> 0;
	return $TSFoster$elm_sha1$SHA1$DeltaState(
		{
			a: newA,
			b: a,
			c: $TSFoster$elm_sha1$SHA1$rotateLeftBy$(30, b),
			d: c,
			e: d
		});
};
var $TSFoster$elm_sha1$SHA1$calculateDigestDeltasChunk = F3($TSFoster$elm_sha1$SHA1$calculateDigestDeltasChunk$);
var $TSFoster$elm_sha1$SHA1$calculateDigestDeltas$ = function (remaining, index, a, b, c, d, e, v1, v2, v3, v4, v5, v6, v7, v8) {
	calculateDigestDeltas:
	while (true) {
		if (!remaining) {
			return $TSFoster$elm_sha1$SHA1$DeltaState(
				{a: a, b: b, c: c, d: d, e: e});
		} else {
			var shiftedA = (a >>> (32 - 5)) | (a << 5);
			var _int = v1;
			var f = function () {
				var _v0 = (index / 20) | 0;
				switch (_v0) {
					case 0:
						return ((b & c) | ((~b) & d)) + 1518500249;
					case 1:
						return (b ^ (c ^ d)) + 1859775393;
					case 2:
						return ((b & (c | d)) | (c & d)) + 2400959708;
					default:
						return (b ^ (c ^ d)) + 3395469782;
				}
			}();
			var newA = (((shiftedA + f) + e) + _int) >>> 0;
			var $temp$remaining = remaining - 1,
				$temp$index = index + 1,
				$temp$a = newA,
				$temp$b = a,
				$temp$c = $TSFoster$elm_sha1$SHA1$rotateLeftBy$(30, b),
				$temp$d = c,
				$temp$e = d,
				$temp$v1 = v2,
				$temp$v2 = v3,
				$temp$v3 = v4,
				$temp$v4 = v5,
				$temp$v5 = v6,
				$temp$v6 = v7,
				$temp$v7 = v8,
				$temp$v8 = 0;
			remaining = $temp$remaining;
			index = $temp$index;
			a = $temp$a;
			b = $temp$b;
			c = $temp$c;
			d = $temp$d;
			e = $temp$e;
			v1 = $temp$v1;
			v2 = $temp$v2;
			v3 = $temp$v3;
			v4 = $temp$v4;
			v5 = $temp$v5;
			v6 = $temp$v6;
			v7 = $temp$v7;
			v8 = $temp$v8;
			continue calculateDigestDeltas;
		}
	}
};
var $TSFoster$elm_sha1$SHA1$calculateDigestDeltas = function (remaining) {
	return function (index) {
		return function (a) {
			return function (b) {
				return function (c) {
					return function (d) {
						return function (e) {
							return function (v1) {
								return function (v2) {
									return function (v3) {
										return function (v4) {
											return function (v5) {
												return function (v6) {
													return function (v7) {
														return function (v8) {
															return $TSFoster$elm_sha1$SHA1$calculateDigestDeltas$(remaining, index, a, b, c, d, e, v1, v2, v3, v4, v5, v6, v7, v8);
														};
													};
												};
											};
										};
									};
								};
							};
						};
					};
				};
			};
		};
	};
};
var $TSFoster$elm_sha1$SHA1$rotateLeftBy1 = function (i) {
	return (i >>> 31) | (i << 1);
};
var $TSFoster$elm_sha1$SHA1$reduceWords$ = function (i, deltaState, b16, b15, b14, b13, b12, b11, b10, b9, b8, b7, b6, b5, b4, b3, b2, b1) {
	reduceWords:
	while (true) {
		var e = deltaState.a.e;
		var d = deltaState.a.d;
		var c = deltaState.a.c;
		var b = deltaState.a.b;
		var a = deltaState.a.a;
		if (i !== 64) {
			var value3 = $TSFoster$elm_sha1$SHA1$rotateLeftBy1(b14 ^ (b12 ^ (b6 ^ b1)));
			var value6 = $TSFoster$elm_sha1$SHA1$rotateLeftBy1(b11 ^ (b9 ^ (b3 ^ value3)));
			var value2 = $TSFoster$elm_sha1$SHA1$rotateLeftBy1(b15 ^ (b13 ^ (b7 ^ b2)));
			var value5 = $TSFoster$elm_sha1$SHA1$rotateLeftBy1(b12 ^ (b10 ^ (b4 ^ value2)));
			var value8 = $TSFoster$elm_sha1$SHA1$rotateLeftBy1(b9 ^ (b7 ^ (b1 ^ value5)));
			var value1 = $TSFoster$elm_sha1$SHA1$rotateLeftBy1(b16 ^ (b14 ^ (b8 ^ b3)));
			var value4 = $TSFoster$elm_sha1$SHA1$rotateLeftBy1(b13 ^ (b11 ^ (b5 ^ value1)));
			var value7 = $TSFoster$elm_sha1$SHA1$rotateLeftBy1(b10 ^ (b8 ^ (b2 ^ value4)));
			var newState = $TSFoster$elm_sha1$SHA1$calculateDigestDeltas$(8, i + 16, a, b, c, d, e, value1, value2, value3, value4, value5, value6, value7, value8);
			var $temp$i = i + 8,
				$temp$deltaState = newState,
				$temp$b16 = b8,
				$temp$b15 = b7,
				$temp$b14 = b6,
				$temp$b13 = b5,
				$temp$b12 = b4,
				$temp$b11 = b3,
				$temp$b10 = b2,
				$temp$b9 = b1,
				$temp$b8 = value1,
				$temp$b7 = value2,
				$temp$b6 = value3,
				$temp$b5 = value4,
				$temp$b4 = value5,
				$temp$b3 = value6,
				$temp$b2 = value7,
				$temp$b1 = value8;
			i = $temp$i;
			deltaState = $temp$deltaState;
			b16 = $temp$b16;
			b15 = $temp$b15;
			b14 = $temp$b14;
			b13 = $temp$b13;
			b12 = $temp$b12;
			b11 = $temp$b11;
			b10 = $temp$b10;
			b9 = $temp$b9;
			b8 = $temp$b8;
			b7 = $temp$b7;
			b6 = $temp$b6;
			b5 = $temp$b5;
			b4 = $temp$b4;
			b3 = $temp$b3;
			b2 = $temp$b2;
			b1 = $temp$b1;
			continue reduceWords;
		} else {
			return deltaState;
		}
	}
};
var $TSFoster$elm_sha1$SHA1$reduceWords = function (i) {
	return function (deltaState) {
		return function (b16) {
			return function (b15) {
				return function (b14) {
					return function (b13) {
						return function (b12) {
							return function (b11) {
								return function (b10) {
									return function (b9) {
										return function (b8) {
											return function (b7) {
												return function (b6) {
													return function (b5) {
														return function (b4) {
															return function (b3) {
																return function (b2) {
																	return function (b1) {
																		return $TSFoster$elm_sha1$SHA1$reduceWords$(i, deltaState, b16, b15, b14, b13, b12, b11, b10, b9, b8, b7, b6, b5, b4, b3, b2, b1);
																	};
																};
															};
														};
													};
												};
											};
										};
									};
								};
							};
						};
					};
				};
			};
		};
	};
};
var $TSFoster$elm_sha1$SHA1$reduceChunkHelp$ = function (_v0, b1, b2, b3, b4, b5, b6, b7, b8, b9, b10, b11, b12, b13, b14, b15, b16) {
	var initial = _v0.a;
	var initialDeltaState = $TSFoster$elm_sha1$SHA1$calculateDigestDeltasChunk$(
		15,
		b16,
		$TSFoster$elm_sha1$SHA1$calculateDigestDeltasChunk$(
			14,
			b15,
			$TSFoster$elm_sha1$SHA1$calculateDigestDeltasChunk$(
				13,
				b14,
				$TSFoster$elm_sha1$SHA1$calculateDigestDeltasChunk$(
					12,
					b13,
					$TSFoster$elm_sha1$SHA1$calculateDigestDeltasChunk$(
						11,
						b12,
						$TSFoster$elm_sha1$SHA1$calculateDigestDeltasChunk$(
							10,
							b11,
							$TSFoster$elm_sha1$SHA1$calculateDigestDeltasChunk$(
								9,
								b10,
								$TSFoster$elm_sha1$SHA1$calculateDigestDeltasChunk$(
									8,
									b9,
									$TSFoster$elm_sha1$SHA1$calculateDigestDeltasChunk$(
										7,
										b8,
										$TSFoster$elm_sha1$SHA1$calculateDigestDeltasChunk$(
											6,
											b7,
											$TSFoster$elm_sha1$SHA1$calculateDigestDeltasChunk$(
												5,
												b6,
												$TSFoster$elm_sha1$SHA1$calculateDigestDeltasChunk$(
													4,
													b5,
													$TSFoster$elm_sha1$SHA1$calculateDigestDeltasChunk$(
														3,
														b4,
														$TSFoster$elm_sha1$SHA1$calculateDigestDeltasChunk$(
															2,
															b3,
															$TSFoster$elm_sha1$SHA1$calculateDigestDeltasChunk$(
																1,
																b2,
																$TSFoster$elm_sha1$SHA1$calculateDigestDeltasChunk$(
																	0,
																	b1,
																	$TSFoster$elm_sha1$SHA1$DeltaState(initial)))))))))))))))));
	var _v1 = $TSFoster$elm_sha1$SHA1$reduceWords$(0, initialDeltaState, b1, b2, b3, b4, b5, b6, b7, b8, b9, b10, b11, b12, b13, b14, b15, b16);
	var e = _v1.a.e;
	var d = _v1.a.d;
	var c = _v1.a.c;
	var b = _v1.a.b;
	var a = _v1.a.a;
	return $TSFoster$elm_sha1$SHA1$State(
		{a: initial.a + a, b: initial.b + b, c: initial.c + c, d: initial.d + d, e: initial.e + e});
};
var $TSFoster$elm_sha1$SHA1$reduceChunkHelp = function (_v0) {
	return function (b1) {
		return function (b2) {
			return function (b3) {
				return function (b4) {
					return function (b5) {
						return function (b6) {
							return function (b7) {
								return function (b8) {
									return function (b9) {
										return function (b10) {
											return function (b11) {
												return function (b12) {
													return function (b13) {
														return function (b14) {
															return function (b15) {
																return function (b16) {
																	return $TSFoster$elm_sha1$SHA1$reduceChunkHelp$(_v0, b1, b2, b3, b4, b5, b6, b7, b8, b9, b10, b11, b12, b13, b14, b15, b16);
																};
															};
														};
													};
												};
											};
										};
									};
								};
							};
						};
					};
				};
			};
		};
	};
};
var $TSFoster$elm_sha1$SHA1$u32 = $elm$bytes$Bytes$Decode$unsignedInt32($elm$bytes$Bytes$BE);
var $TSFoster$elm_sha1$SHA1$reduceChunk = function (state) {
	return $TSFoster$elm_sha1$SHA1$map16$(
		$TSFoster$elm_sha1$SHA1$reduceChunkHelp(state),
		$TSFoster$elm_sha1$SHA1$u32,
		$TSFoster$elm_sha1$SHA1$u32,
		$TSFoster$elm_sha1$SHA1$u32,
		$TSFoster$elm_sha1$SHA1$u32,
		$TSFoster$elm_sha1$SHA1$u32,
		$TSFoster$elm_sha1$SHA1$u32,
		$TSFoster$elm_sha1$SHA1$u32,
		$TSFoster$elm_sha1$SHA1$u32,
		$TSFoster$elm_sha1$SHA1$u32,
		$TSFoster$elm_sha1$SHA1$u32,
		$TSFoster$elm_sha1$SHA1$u32,
		$TSFoster$elm_sha1$SHA1$u32,
		$TSFoster$elm_sha1$SHA1$u32,
		$TSFoster$elm_sha1$SHA1$u32,
		$TSFoster$elm_sha1$SHA1$u32,
		$TSFoster$elm_sha1$SHA1$u32);
};
var $TSFoster$elm_sha1$SHA1$Digest = function (a) {
	return {$: 'Digest', a: a};
};
var $TSFoster$elm_sha1$SHA1$stateToDigest = function (_v0) {
	var e = _v0.a.e;
	var d = _v0.a.d;
	var c = _v0.a.c;
	var b = _v0.a.b;
	var a = _v0.a.a;
	return $TSFoster$elm_sha1$SHA1$Digest(
		{a: a >>> 0, b: b >>> 0, c: c >>> 0, d: d >>> 0, e: e >>> 0});
};
var $TSFoster$elm_sha1$SHA1$hashBytes$ = function (state, bytes) {
	var message = $TSFoster$elm_sha1$SHA1$padBuffer(bytes);
	var numberOfChunks = ($elm$bytes$Bytes$width(message) / 64) | 0;
	var hashState = $TSFoster$elm_sha1$SHA1$iterate$(numberOfChunks, $TSFoster$elm_sha1$SHA1$reduceChunk, state);
	return $TSFoster$elm_sha1$SHA1$stateToDigest(
		$elm$core$Maybe$withDefault$(
			state,
			$elm$bytes$Bytes$Decode$decode$(hashState, message)));
};
var $TSFoster$elm_sha1$SHA1$hashBytes = F2($TSFoster$elm_sha1$SHA1$hashBytes$);
var $TSFoster$elm_sha1$SHA1$Tuple5$ = function (a, b, c, d, e) {
	return {a: a, b: b, c: c, d: d, e: e};
};
var $TSFoster$elm_sha1$SHA1$Tuple5 = F5($TSFoster$elm_sha1$SHA1$Tuple5$);
var $TSFoster$elm_sha1$SHA1$initialState = $TSFoster$elm_sha1$SHA1$State(
	$TSFoster$elm_sha1$SHA1$Tuple5$(1732584193, 4023233417, 2562383102, 271733878, 3285377520));
var $TSFoster$elm_sha1$SHA1$fromString = A2(
	$elm$core$Basics$composeL,
	A2(
		$elm$core$Basics$composeL,
		$TSFoster$elm_sha1$SHA1$hashBytes($TSFoster$elm_sha1$SHA1$initialState),
		$elm$bytes$Bytes$Encode$encode),
	$elm$bytes$Bytes$Encode$string);
var $author$project$OAuth$Code = {$: 'Code'};
var $elm$core$String$concat = function (strings) {
	return $elm$core$String$join$('', strings);
};
var $author$project$OAuth$Internal$protocolToString = function (protocol) {
	if (protocol.$ === 'Http') {
		return 'http';
	} else {
		return 'https';
	}
};
var $author$project$OAuth$Internal$makeRedirectUri = function (url) {
	return $elm$core$String$concat(
		_List_fromArray(
			[
				$author$project$OAuth$Internal$protocolToString(url.protocol),
				'://',
				url.host,
				$elm$core$Maybe$withDefault$(
				'',
				$elm$core$Maybe$map$(
					function (i) {
						return ':' + $elm$core$String$fromInt(i);
					},
					url.port_)),
				url.path,
				$elm$core$Maybe$withDefault$(
				'',
				$elm$core$Maybe$map$(
					function (q) {
						return '?' + q;
					},
					url.query))
			]));
};
var $author$project$OAuth$responseTypeToString = function (r) {
	switch (r.$) {
		case 'Code':
			return 'code';
		case 'Token':
			return 'token';
		default:
			var str = r.a;
			return str;
	}
};
var $elm$url$Url$Builder$QueryParameter$ = function (a, b) {
	return {$: 'QueryParameter', a: a, b: b};
};
var $elm$url$Url$Builder$QueryParameter = F2($elm$url$Url$Builder$QueryParameter$);
var $elm$url$Url$percentEncode = _Url_percentEncode;
var $elm$url$Url$Builder$string$ = function (key, value) {
	return $elm$url$Url$Builder$QueryParameter$(
		$elm$url$Url$percentEncode(key),
		$elm$url$Url$percentEncode(value));
};
var $elm$url$Url$Builder$string = F2($elm$url$Url$Builder$string$);
var $elm$url$Url$Builder$toQueryPair = function (_v0) {
	var key = _v0.a;
	var value = _v0.b;
	return key + ('=' + value);
};
var $elm$url$Url$Builder$toQuery = function (parameters) {
	if (!parameters.b) {
		return '';
	} else {
		return '?' + $elm$core$String$join$(
			'&',
			$elm$core$List$map$($elm$url$Url$Builder$toQueryPair, parameters));
	}
};
var $author$project$OAuth$Internal$urlAddExtraFields$ = function (extraFields, zero) {
	return $elm$core$Dict$foldr$(
		F3(
			function (k, v, qs) {
				return A2(
					$elm$core$List$cons,
					$elm$url$Url$Builder$string$(k, v),
					qs);
			}),
		zero,
		extraFields);
};
var $author$project$OAuth$Internal$urlAddExtraFields = F2($author$project$OAuth$Internal$urlAddExtraFields$);
var $author$project$OAuth$Internal$urlAddList$ = function (param, xs, qs) {
	return _Utils_ap(
		qs,
		function () {
			if (!xs.b) {
				return _List_Nil;
			} else {
				return _List_fromArray(
					[
						$elm$url$Url$Builder$string$(
						param,
						$elm$core$String$join$(' ', xs))
					]);
			}
		}());
};
var $author$project$OAuth$Internal$urlAddList = F3($author$project$OAuth$Internal$urlAddList$);
var $author$project$OAuth$Internal$urlAddMaybe$ = function (param, ms, qs) {
	return _Utils_ap(
		qs,
		function () {
			if (ms.$ === 'Nothing') {
				return _List_Nil;
			} else {
				var s = ms.a;
				return _List_fromArray(
					[
						$elm$url$Url$Builder$string$(param, s)
					]);
			}
		}());
};
var $author$project$OAuth$Internal$urlAddMaybe = F3($author$project$OAuth$Internal$urlAddMaybe$);
var $author$project$OAuth$Internal$makeAuthorizationUrl$ = function (responseType, extraFields, _v0) {
	var state = _v0.state;
	var scope = _v0.scope;
	var redirectUri = _v0.redirectUri;
	var url = _v0.url;
	var clientId = _v0.clientId;
	var query = $elm$core$String$dropLeft$(
		1,
		$elm$url$Url$Builder$toQuery(
			$author$project$OAuth$Internal$urlAddExtraFields$(
				extraFields,
				$author$project$OAuth$Internal$urlAddMaybe$(
					'state',
					state,
					$author$project$OAuth$Internal$urlAddList$(
						'scope',
						scope,
						_List_fromArray(
							[
								$elm$url$Url$Builder$string$('client_id', clientId),
								$elm$url$Url$Builder$string$(
								'redirect_uri',
								$author$project$OAuth$Internal$makeRedirectUri(redirectUri)),
								$elm$url$Url$Builder$string$(
								'response_type',
								$author$project$OAuth$responseTypeToString(responseType))
							]))))));
	var _v1 = url.query;
	if (_v1.$ === 'Nothing') {
		return _Utils_update(
			url,
			{
				query: $elm$core$Maybe$Just(query)
			});
	} else {
		var baseQuery = _v1.a;
		return _Utils_update(
			url,
			{
				query: $elm$core$Maybe$Just(baseQuery + ('&' + query))
			});
	}
};
var $author$project$OAuth$Internal$makeAuthorizationUrl = F3($author$project$OAuth$Internal$makeAuthorizationUrl$);
var $author$project$OAuth$AuthorizationCode$makeAuthorizationUrlWith$ = function (responseType, extraFields, _v0) {
	var state = _v0.state;
	var scope = _v0.scope;
	var redirectUri = _v0.redirectUri;
	var url = _v0.url;
	var clientId = _v0.clientId;
	return $author$project$OAuth$Internal$makeAuthorizationUrl$(
		responseType,
		extraFields,
		{clientId: clientId, redirectUri: redirectUri, scope: scope, state: state, url: url});
};
var $author$project$OAuth$AuthorizationCode$makeAuthorizationUrlWith = F3($author$project$OAuth$AuthorizationCode$makeAuthorizationUrlWith$);
var $author$project$OAuth$AuthorizationCode$makeAuthorizationUrl = A2($author$project$OAuth$AuthorizationCode$makeAuthorizationUrlWith, $author$project$OAuth$Code, $elm$core$Dict$empty);
var $author$project$Auth$Protocol$OAuth$generateSigninUrl$ = function (baseUrl, state, configuration) {
	var queryAdjustedUrl = configuration.allowLoginQueryParameters ? baseUrl : _Utils_update(
		baseUrl,
		{query: $elm$core$Maybe$Nothing});
	var authorization = {
		clientId: configuration.clientId,
		redirectUri: _Utils_update(
			queryAdjustedUrl,
			{path: '/login/' + (configuration.id + '/callback')}),
		scope: configuration.scope,
		state: $elm$core$Maybe$Just(state),
		url: configuration.authorizationEndpoint
	};
	return $author$project$OAuth$AuthorizationCode$makeAuthorizationUrl(authorization);
};
var $author$project$Auth$Protocol$OAuth$generateSigninUrl = F3($author$project$Auth$Protocol$OAuth$generateSigninUrl$);
var $elm$core$Process$sleep = _Process_sleep;
var $author$project$Auth$Common$sleepTask$ = function (isDev, msg) {
	return $elm$core$Task$perform$(
		$elm$core$Basics$always(msg),
		isDev ? $elm$core$Process$sleep(3000) : $elm$core$Process$sleep(0));
};
var $author$project$Auth$Common$sleepTask = F2($author$project$Auth$Common$sleepTask$);
var $TSFoster$elm_sha1$SHA1$toEncoder = function (_v0) {
	var e = _v0.a.e;
	var d = _v0.a.d;
	var c = _v0.a.c;
	var b = _v0.a.b;
	var a = _v0.a.a;
	return $elm$bytes$Bytes$Encode$sequence(
		_List_fromArray(
			[
				A2($elm$bytes$Bytes$Encode$unsignedInt32, $elm$bytes$Bytes$BE, a),
				A2($elm$bytes$Bytes$Encode$unsignedInt32, $elm$bytes$Bytes$BE, b),
				A2($elm$bytes$Bytes$Encode$unsignedInt32, $elm$bytes$Bytes$BE, c),
				A2($elm$bytes$Bytes$Encode$unsignedInt32, $elm$bytes$Bytes$BE, d),
				A2($elm$bytes$Bytes$Encode$unsignedInt32, $elm$bytes$Bytes$BE, e)
			]));
};
var $TSFoster$elm_sha1$SHA1$toBase64 = function (digest) {
	return $elm$core$Maybe$withDefault$(
		'',
		$danfishgold$base64_bytes$Base64$fromBytes(
			$elm$bytes$Bytes$Encode$encode(
				$TSFoster$elm_sha1$SHA1$toEncoder(digest))));
};
var $author$project$Auth$Protocol$OAuth$initiateSignin$ = function (isDev, sessionId, baseUrl, config, asBackendMsg, now, backendModel) {
	var signedState = $TSFoster$elm_sha1$SHA1$toBase64(
		$TSFoster$elm_sha1$SHA1$fromString(
			$elm$core$String$fromInt(
				$elm$time$Time$posixToMillis(now)) + ('0x3vd7a' + sessionId)));
	var url = $author$project$Auth$Protocol$OAuth$generateSigninUrl$(baseUrl, signedState, config);
	var newPendingAuth = {created: now, sessionId: sessionId, state: signedState};
	return _Utils_Tuple2(
		_Utils_update(
			backendModel,
			{
				pendingAuths: $elm$core$Dict$insert$(sessionId, newPendingAuth, backendModel.pendingAuths)
			}),
		$author$project$Auth$Common$sleepTask$(
			isDev,
			asBackendMsg(
				$author$project$Auth$Common$AuthSigninInitiatedDelayed_$(
					sessionId,
					$author$project$Auth$Common$AuthInitiateSignin(url)))));
};
var $author$project$Auth$Protocol$OAuth$initiateSignin = F7($author$project$Auth$Protocol$OAuth$initiateSignin$);
var $author$project$Auth$Common$AuthSuccess$ = function (a, b, c, d, e) {
	return {$: 'AuthSuccess', a: a, b: b, c: c, d: d, e: e};
};
var $author$project$Auth$Common$AuthSuccess = F5($author$project$Auth$Common$AuthSuccess$);
var $elm$core$Task$attempt$ = function (resultToMessage, task) {
	return $elm$core$Task$command(
		$elm$core$Task$Perform(
			A2(
				$elm$core$Task$onError,
				A2(
					$elm$core$Basics$composeL,
					A2($elm$core$Basics$composeL, $elm$core$Task$succeed, resultToMessage),
					$elm$core$Result$Err),
				A2(
					$elm$core$Task$andThen,
					A2(
						$elm$core$Basics$composeL,
						A2($elm$core$Basics$composeL, $elm$core$Task$succeed, resultToMessage),
						$elm$core$Result$Ok),
					task))));
};
var $elm$core$Task$attempt = F2($elm$core$Task$attempt$);
var $author$project$Auth$Protocol$OAuth$makeToken$ = function (methodId, authenticationSuccess, now) {
	return {
		created: now,
		expires: $elm$time$Time$millisToPosix(
			$elm$time$Time$posixToMillis(now) + ($elm$core$Maybe$withDefault$(0, authenticationSuccess.expiresIn) * 1000)),
		methodId: methodId,
		token: authenticationSuccess.token
	};
};
var $author$project$Auth$Protocol$OAuth$makeToken = F3($author$project$Auth$Protocol$OAuth$makeToken$);
var $author$project$OAuth$Internal$AuthenticationSuccess$ = function (token, refreshToken, expiresIn, scope, idJwt) {
	return {expiresIn: expiresIn, idJwt: idJwt, refreshToken: refreshToken, scope: scope, token: token};
};
var $author$project$OAuth$Internal$AuthenticationSuccess = F5($author$project$OAuth$Internal$AuthenticationSuccess$);
var $author$project$OAuth$Internal$expiresInDecoder = $elm$json$Json$Decode$maybe(
	A2($elm$json$Json$Decode$field, 'expires_in', $elm$json$Json$Decode$int));
var $author$project$OAuth$Internal$idJwtDecoder = $elm$json$Json$Decode$maybe(
	A2($elm$json$Json$Decode$field, 'id_token', $elm$json$Json$Decode$string));
var $author$project$OAuth$Internal$decoderFromJust = function (msg) {
	return A2(
		$elm$core$Basics$composeR,
		$elm$core$Maybe$map($elm$json$Json$Decode$succeed),
		$elm$core$Maybe$withDefault(
			$elm$json$Json$Decode$fail(msg)));
};
var $elm$core$Maybe$map2$ = function (func, ma, mb) {
	if (ma.$ === 'Nothing') {
		return $elm$core$Maybe$Nothing;
	} else {
		var a = ma.a;
		if (mb.$ === 'Nothing') {
			return $elm$core$Maybe$Nothing;
		} else {
			var b = mb.a;
			return $elm$core$Maybe$Just(
				A2(func, a, b));
		}
	}
};
var $elm$core$Maybe$map2 = F3($elm$core$Maybe$map2$);
var $author$project$Extra$Maybe$andThen2$ = function (fn, ma, mb) {
	return $elm$core$Maybe$andThen$(
		$elm$core$Basics$identity,
		$elm$core$Maybe$map2$(fn, ma, mb));
};
var $author$project$Extra$Maybe$andThen2 = F3($author$project$Extra$Maybe$andThen2$);
var $author$project$OAuth$Bearer = function (a) {
	return {$: 'Bearer', a: a};
};
var $author$project$OAuth$tryMakeToken$ = function (tokenType, token) {
	var _v0 = $elm$core$String$toLower(tokenType);
	if (_v0 === 'bearer') {
		return $elm$core$Maybe$Just(
			$author$project$OAuth$Bearer(token));
	} else {
		return $elm$core$Maybe$Nothing;
	}
};
var $author$project$OAuth$tryMakeToken = F2($author$project$OAuth$tryMakeToken$);
var $author$project$OAuth$makeRefreshToken$ = function (tokenType, mToken) {
	var _v0 = _Utils_Tuple2(
		mToken,
		$author$project$Extra$Maybe$andThen2$(
			$author$project$OAuth$tryMakeToken,
			$elm$core$Maybe$Just(tokenType),
			mToken));
	if (_v0.a.$ === 'Nothing') {
		var _v1 = _v0.a;
		return $elm$core$Maybe$Just($elm$core$Maybe$Nothing);
	} else {
		if (_v0.b.$ === 'Just') {
			var token = _v0.b.a;
			return $elm$core$Maybe$Just(
				$elm$core$Maybe$Just(token));
		} else {
			return $elm$core$Maybe$Nothing;
		}
	}
};
var $author$project$OAuth$makeRefreshToken = F2($author$project$OAuth$makeRefreshToken$);
var $author$project$OAuth$Internal$refreshTokenDecoder = A2(
	$elm$json$Json$Decode$andThen,
	$author$project$OAuth$Internal$decoderFromJust('missing or invalid \'refresh_token\' / \'token_type\''),
	A3(
		$elm$json$Json$Decode$map2,
		$author$project$OAuth$makeRefreshToken,
		A2($elm$json$Json$Decode$field, 'token_type', $elm$json$Json$Decode$string),
		$elm$json$Json$Decode$maybe(
			A2($elm$json$Json$Decode$field, 'refresh_token', $elm$json$Json$Decode$string))));
var $author$project$OAuth$Internal$scopeDecoder = A2(
	$elm$json$Json$Decode$map,
	$elm$core$Maybe$withDefault(_List_Nil),
	$elm$json$Json$Decode$maybe(
		A2(
			$elm$json$Json$Decode$field,
			'scope',
			$elm$json$Json$Decode$list($elm$json$Json$Decode$string))));
var $author$project$OAuth$makeToken = $author$project$Extra$Maybe$andThen2($author$project$OAuth$tryMakeToken);
var $author$project$OAuth$Internal$tokenDecoder = A2(
	$elm$json$Json$Decode$andThen,
	$author$project$OAuth$Internal$decoderFromJust('missing or invalid \'access_token\' / \'token_type\''),
	A3(
		$elm$json$Json$Decode$map2,
		$author$project$OAuth$makeToken,
		A2(
			$elm$json$Json$Decode$map,
			$elm$core$Maybe$Just,
			A2($elm$json$Json$Decode$field, 'token_type', $elm$json$Json$Decode$string)),
		A2(
			$elm$json$Json$Decode$map,
			$elm$core$Maybe$Just,
			A2($elm$json$Json$Decode$field, 'access_token', $elm$json$Json$Decode$string))));
var $author$project$OAuth$Internal$authenticationSuccessDecoder = A6($elm$json$Json$Decode$map5, $author$project$OAuth$Internal$AuthenticationSuccess, $author$project$OAuth$Internal$tokenDecoder, $author$project$OAuth$Internal$refreshTokenDecoder, $author$project$OAuth$Internal$expiresInDecoder, $author$project$OAuth$Internal$scopeDecoder, $author$project$OAuth$Internal$idJwtDecoder);
var $author$project$OAuth$AuthorizationCode$defaultAuthenticationSuccessDecoder = $author$project$OAuth$Internal$authenticationSuccessDecoder;
var $elm$http$Http$Header$ = function (a, b) {
	return {$: 'Header', a: a, b: b};
};
var $elm$http$Http$Header = F2($elm$http$Http$Header$);
var $elm$http$Http$header = $elm$http$Http$Header;
var $elm$http$Http$BadUrl = function (a) {
	return {$: 'BadUrl', a: a};
};
var $elm$http$Http$NetworkError = {$: 'NetworkError'};
var $elm$http$Http$Timeout = {$: 'Timeout'};
var $elm$http$Http$Receiving = function (a) {
	return {$: 'Receiving', a: a};
};
var $elm$http$Http$Sending = function (a) {
	return {$: 'Sending', a: a};
};
var $elm$core$Maybe$isJust = function (maybe) {
	if (maybe.$ === 'Just') {
		return true;
	} else {
		return false;
	}
};
var $elm$core$Platform$sendToSelf = _Platform_sendToSelf;
var $elm$http$Http$stringResolver = A2(_Http_expect, '', $elm$core$Basics$identity);
var $author$project$Auth$HttpHelpers$jsonResolver = function (decoder) {
	return $elm$http$Http$stringResolver(
		function (response) {
			switch (response.$) {
				case 'GoodStatus_':
					var body = response.b;
					return $elm$core$Result$mapError$(
						$elm$http$Http$BadBody,
						$elm$core$Result$mapError$(
							$elm$json$Json$Decode$errorToString,
							A2($elm$json$Json$Decode$decodeString, decoder, body)));
				case 'BadUrl_':
					var message = response.a;
					return $elm$core$Result$Err(
						$elm$http$Http$BadUrl(message));
				case 'Timeout_':
					return $elm$core$Result$Err($elm$http$Http$Timeout);
				case 'NetworkError_':
					return $elm$core$Result$Err($elm$http$Http$NetworkError);
				default:
					var metadata = response.a;
					var body = response.b;
					return $elm$core$Result$Err(
						$elm$http$Http$BadBody(
							$elm$core$String$fromInt(metadata.statusCode) + (': ' + body)));
			}
		});
};
var $author$project$OAuth$AuthorizationCode = {$: 'AuthorizationCode'};
var $author$project$OAuth$grantTypeToString = function (g) {
	switch (g.$) {
		case 'AuthorizationCode':
			return 'authorization_code';
		case 'Password':
			return 'password';
		case 'ClientCredentials':
			return 'client_credentials';
		case 'RefreshToken':
			return 'refresh_token';
		default:
			var str = g.a;
			return str;
	}
};
var $chelovek0v$bbase64$Base64$Shift$and$ = function (shift, value) {
	switch (shift.$) {
		case 'Shift0':
			return value;
		case 'Shift2':
			return 3 & value;
		case 'Shift4':
			return 15 & value;
		default:
			return 63 & value;
	}
};
var $chelovek0v$bbase64$Base64$Shift$and = F2($chelovek0v$bbase64$Base64$Shift$and$);
var $chelovek0v$bbase64$Base64$Table$codeToCharMap = $elm$core$Dict$fromList(
	_List_fromArray(
		[
			_Utils_Tuple2(0, 'A'),
			_Utils_Tuple2(1, 'B'),
			_Utils_Tuple2(2, 'C'),
			_Utils_Tuple2(3, 'D'),
			_Utils_Tuple2(4, 'E'),
			_Utils_Tuple2(5, 'F'),
			_Utils_Tuple2(6, 'G'),
			_Utils_Tuple2(7, 'H'),
			_Utils_Tuple2(8, 'I'),
			_Utils_Tuple2(9, 'J'),
			_Utils_Tuple2(10, 'K'),
			_Utils_Tuple2(11, 'L'),
			_Utils_Tuple2(12, 'M'),
			_Utils_Tuple2(13, 'N'),
			_Utils_Tuple2(14, 'O'),
			_Utils_Tuple2(15, 'P'),
			_Utils_Tuple2(16, 'Q'),
			_Utils_Tuple2(17, 'R'),
			_Utils_Tuple2(18, 'S'),
			_Utils_Tuple2(19, 'T'),
			_Utils_Tuple2(20, 'U'),
			_Utils_Tuple2(21, 'V'),
			_Utils_Tuple2(22, 'W'),
			_Utils_Tuple2(23, 'X'),
			_Utils_Tuple2(24, 'Y'),
			_Utils_Tuple2(25, 'Z'),
			_Utils_Tuple2(26, 'a'),
			_Utils_Tuple2(27, 'b'),
			_Utils_Tuple2(28, 'c'),
			_Utils_Tuple2(29, 'd'),
			_Utils_Tuple2(30, 'e'),
			_Utils_Tuple2(31, 'f'),
			_Utils_Tuple2(32, 'g'),
			_Utils_Tuple2(33, 'h'),
			_Utils_Tuple2(34, 'i'),
			_Utils_Tuple2(35, 'j'),
			_Utils_Tuple2(36, 'k'),
			_Utils_Tuple2(37, 'l'),
			_Utils_Tuple2(38, 'm'),
			_Utils_Tuple2(39, 'n'),
			_Utils_Tuple2(40, 'o'),
			_Utils_Tuple2(41, 'p'),
			_Utils_Tuple2(42, 'q'),
			_Utils_Tuple2(43, 'r'),
			_Utils_Tuple2(44, 's'),
			_Utils_Tuple2(45, 't'),
			_Utils_Tuple2(46, 'u'),
			_Utils_Tuple2(47, 'v'),
			_Utils_Tuple2(48, 'w'),
			_Utils_Tuple2(49, 'x'),
			_Utils_Tuple2(50, 'y'),
			_Utils_Tuple2(51, 'z'),
			_Utils_Tuple2(52, '0'),
			_Utils_Tuple2(53, '1'),
			_Utils_Tuple2(54, '2'),
			_Utils_Tuple2(55, '3'),
			_Utils_Tuple2(56, '4'),
			_Utils_Tuple2(57, '5'),
			_Utils_Tuple2(58, '6'),
			_Utils_Tuple2(59, '7'),
			_Utils_Tuple2(60, '8'),
			_Utils_Tuple2(61, '9'),
			_Utils_Tuple2(62, '+'),
			_Utils_Tuple2(63, '/')
		]));
var $chelovek0v$bbase64$Base64$Table$encode = function (code) {
	var _v0 = $elm$core$Dict$get$(code, $chelovek0v$bbase64$Base64$Table$codeToCharMap);
	if (_v0.$ === 'Just') {
		var char_ = _v0.a;
		return char_;
	} else {
		return '';
	}
};
var $chelovek0v$bbase64$Base64$Shift$next = function (shift) {
	switch (shift.$) {
		case 'Shift0':
			return $chelovek0v$bbase64$Base64$Shift$Shift2;
		case 'Shift2':
			return $chelovek0v$bbase64$Base64$Shift$Shift4;
		case 'Shift4':
			return $chelovek0v$bbase64$Base64$Shift$Shift6;
		default:
			return $chelovek0v$bbase64$Base64$Shift$Shift2;
	}
};
var $chelovek0v$bbase64$Base64$Encode$sixtet$ = function (octet, _v0) {
	var shift = _v0.a;
	var sixtet_ = _v0.b;
	var strAcc = _v0.c;
	switch (shift.$) {
		case 'Shift0':
			return $chelovek0v$bbase64$Base64$Shift$shiftRightZfBy$($chelovek0v$bbase64$Base64$Shift$Shift2, octet);
		case 'Shift2':
			return $chelovek0v$bbase64$Base64$Shift$shiftLeftBy$($chelovek0v$bbase64$Base64$Shift$Shift4, sixtet_) | $chelovek0v$bbase64$Base64$Shift$shiftRightZfBy$($chelovek0v$bbase64$Base64$Shift$Shift4, octet);
		case 'Shift4':
			return $chelovek0v$bbase64$Base64$Shift$shiftLeftBy$($chelovek0v$bbase64$Base64$Shift$Shift2, sixtet_) | $chelovek0v$bbase64$Base64$Shift$shiftRightZfBy$($chelovek0v$bbase64$Base64$Shift$Shift6, octet);
		default:
			return sixtet_;
	}
};
var $chelovek0v$bbase64$Base64$Encode$sixtet = F2($chelovek0v$bbase64$Base64$Encode$sixtet$);
var $chelovek0v$bbase64$Base64$Encode$encodeStep$ = function (octet, encodeState) {
	var shift = encodeState.a;
	var strAcc = encodeState.c;
	var nextSixtet = function () {
		switch (shift.$) {
			case 'Shift0':
				return $chelovek0v$bbase64$Base64$Shift$and$($chelovek0v$bbase64$Base64$Shift$Shift2, octet);
			case 'Shift2':
				return $chelovek0v$bbase64$Base64$Shift$and$($chelovek0v$bbase64$Base64$Shift$Shift4, octet);
			case 'Shift4':
				return $chelovek0v$bbase64$Base64$Shift$and$($chelovek0v$bbase64$Base64$Shift$Shift6, octet);
			default:
				return $chelovek0v$bbase64$Base64$Shift$and$($chelovek0v$bbase64$Base64$Shift$Shift2, octet);
		}
	}();
	var currentSixtet = $chelovek0v$bbase64$Base64$Encode$sixtet$(octet, encodeState);
	var base64Char = function () {
		if (shift.$ === 'Shift6') {
			return _Utils_ap(
				$chelovek0v$bbase64$Base64$Table$encode(currentSixtet),
				$chelovek0v$bbase64$Base64$Table$encode(
					$chelovek0v$bbase64$Base64$Shift$shiftRightZfBy$($chelovek0v$bbase64$Base64$Shift$Shift2, octet)));
		} else {
			return $chelovek0v$bbase64$Base64$Table$encode(currentSixtet);
		}
	}();
	return _Utils_Tuple3(
		$chelovek0v$bbase64$Base64$Shift$next(shift),
		nextSixtet,
		_Utils_ap(strAcc, base64Char));
};
var $chelovek0v$bbase64$Base64$Encode$encodeStep = F2($chelovek0v$bbase64$Base64$Encode$encodeStep$);
var $chelovek0v$bbase64$Base64$Encode$decodeStep$ = function (octetDecoder, _v0) {
	var n = _v0.a;
	var encodeState = _v0.b;
	return (n <= 0) ? $elm$bytes$Bytes$Decode$succeed(
		$elm$bytes$Bytes$Decode$Done(encodeState)) : $elm$bytes$Bytes$Decode$map$(
		function (octet) {
			return $elm$bytes$Bytes$Decode$Loop(
				_Utils_Tuple2(
					n - 1,
					$chelovek0v$bbase64$Base64$Encode$encodeStep$(octet, encodeState)));
		},
		octetDecoder);
};
var $chelovek0v$bbase64$Base64$Encode$decodeStep = F2($chelovek0v$bbase64$Base64$Encode$decodeStep$);
var $chelovek0v$bbase64$Base64$Encode$finalize = function (_v0) {
	var shift = _v0.a;
	var sixtet_ = _v0.b;
	var strAcc = _v0.c;
	switch (shift.$) {
		case 'Shift6':
			return _Utils_ap(
				strAcc,
				$chelovek0v$bbase64$Base64$Table$encode(sixtet_));
		case 'Shift4':
			return strAcc + ($chelovek0v$bbase64$Base64$Table$encode(
				$chelovek0v$bbase64$Base64$Shift$shiftLeftBy$($chelovek0v$bbase64$Base64$Shift$Shift2, sixtet_)) + '=');
		case 'Shift2':
			return strAcc + ($chelovek0v$bbase64$Base64$Table$encode(
				$chelovek0v$bbase64$Base64$Shift$shiftLeftBy$($chelovek0v$bbase64$Base64$Shift$Shift4, sixtet_)) + '==');
		default:
			return strAcc;
	}
};
var $chelovek0v$bbase64$Base64$Encode$initialEncodeState = _Utils_Tuple3($chelovek0v$bbase64$Base64$Shift$Shift0, 0, '');
var $chelovek0v$bbase64$Base64$Encode$tryEncode = function (input) {
	var decoderInitialState = _Utils_Tuple2(
		$elm$bytes$Bytes$width(input),
		$chelovek0v$bbase64$Base64$Encode$initialEncodeState);
	var base64Decoder = $elm$bytes$Bytes$Decode$loop$(
		decoderInitialState,
		$chelovek0v$bbase64$Base64$Encode$decodeStep($elm$bytes$Bytes$Decode$unsignedInt8));
	return $elm$core$Maybe$map$(
		$chelovek0v$bbase64$Base64$Encode$finalize,
		$elm$bytes$Bytes$Decode$decode$(base64Decoder, input));
};
var $chelovek0v$bbase64$Base64$Encode$encode = function (encoder) {
	if (encoder.$ === 'StringEncoder') {
		var input = encoder.a;
		return $elm$core$Maybe$withDefault$(
			'',
			$chelovek0v$bbase64$Base64$Encode$tryEncode(
				$elm$bytes$Bytes$Encode$encode(
					$elm$bytes$Bytes$Encode$string(input))));
	} else {
		var input = encoder.a;
		return $elm$core$Maybe$withDefault$(
			'',
			$chelovek0v$bbase64$Base64$Encode$tryEncode(input));
	}
};
var $chelovek0v$bbase64$Base64$Encode$StringEncoder = function (a) {
	return {$: 'StringEncoder', a: a};
};
var $chelovek0v$bbase64$Base64$Encode$string = function (input) {
	return $chelovek0v$bbase64$Base64$Encode$StringEncoder(input);
};
var $author$project$OAuth$Internal$makeHeaders = function (credentials) {
	return $elm$core$Maybe$withDefault$(
		_List_Nil,
		$elm$core$Maybe$map$(
			function (s) {
				return _List_fromArray(
					[
						A2($elm$http$Http$header, 'Authorization', 'Basic ' + s)
					]);
			},
			$elm$core$Maybe$map$(
				function (_v0) {
					var secret = _v0.secret;
					var clientId = _v0.clientId;
					return $chelovek0v$bbase64$Base64$Encode$encode(
						$chelovek0v$bbase64$Base64$Encode$string(clientId + (':' + secret)));
				},
				credentials)));
};
var $elm$http$Http$expectStringResponse$ = function (toMsg, toResult) {
	return A3(
		_Http_expect,
		'',
		$elm$core$Basics$identity,
		A2($elm$core$Basics$composeR, toResult, toMsg));
};
var $elm$http$Http$expectStringResponse = F2($elm$http$Http$expectStringResponse$);
var $elm$http$Http$BadStatus = function (a) {
	return {$: 'BadStatus', a: a};
};
var $elm$http$Http$resolve$ = function (toResult, response) {
	switch (response.$) {
		case 'BadUrl_':
			var url = response.a;
			return $elm$core$Result$Err(
				$elm$http$Http$BadUrl(url));
		case 'Timeout_':
			return $elm$core$Result$Err($elm$http$Http$Timeout);
		case 'NetworkError_':
			return $elm$core$Result$Err($elm$http$Http$NetworkError);
		case 'BadStatus_':
			var metadata = response.a;
			return $elm$core$Result$Err(
				$elm$http$Http$BadStatus(metadata.statusCode));
		default:
			var body = response.b;
			return $elm$core$Result$mapError$(
				$elm$http$Http$BadBody,
				toResult(body));
	}
};
var $elm$http$Http$resolve = F2($elm$http$Http$resolve$);
var $elm$http$Http$expectJson$ = function (toMsg, decoder) {
	return $elm$http$Http$expectStringResponse$(
		toMsg,
		$elm$http$Http$resolve(
			function (string) {
				return $elm$core$Result$mapError$(
					$elm$json$Json$Decode$errorToString,
					A2($elm$json$Json$Decode$decodeString, decoder, string));
			}));
};
var $elm$http$Http$expectJson = F2($elm$http$Http$expectJson$);
var $elm$http$Http$stringBody = _Http_pair;
var $author$project$OAuth$Internal$makeRequest$ = function (decoder, toMsg, url, headers, body) {
	return {
		body: A2($elm$http$Http$stringBody, 'application/x-www-form-urlencoded', body),
		expect: $elm$http$Http$expectJson$(toMsg, decoder),
		headers: headers,
		method: 'POST',
		timeout: $elm$core$Maybe$Nothing,
		tracker: $elm$core$Maybe$Nothing,
		url: $elm$url$Url$toString(url)
	};
};
var $author$project$OAuth$Internal$makeRequest = F5($author$project$OAuth$Internal$makeRequest$);
var $author$project$OAuth$AuthorizationCode$makeTokenRequestWith$ = function (grantType, decoder, extraFields, toMsg, _v0) {
	var redirectUri = _v0.redirectUri;
	var url = _v0.url;
	var code = _v0.code;
	var credentials = _v0.credentials;
	var headers = $author$project$OAuth$Internal$makeHeaders(
		function () {
			var _v1 = credentials.secret;
			if (_v1.$ === 'Nothing') {
				return $elm$core$Maybe$Nothing;
			} else {
				var secret = _v1.a;
				return $elm$core$Maybe$Just(
					{clientId: credentials.clientId, secret: secret});
			}
		}());
	var body = $elm$core$String$dropLeft$(
		1,
		$elm$url$Url$Builder$toQuery(
			$author$project$OAuth$Internal$urlAddExtraFields$(
				extraFields,
				_List_fromArray(
					[
						$elm$url$Url$Builder$string$(
						'grant_type',
						$author$project$OAuth$grantTypeToString(grantType)),
						$elm$url$Url$Builder$string$('client_id', credentials.clientId),
						$elm$url$Url$Builder$string$(
						'client_id_secret',
						$elm$core$Maybe$withDefault$('', credentials.secret)),
						$elm$url$Url$Builder$string$(
						'redirect_uri',
						$author$project$OAuth$Internal$makeRedirectUri(redirectUri)),
						$elm$url$Url$Builder$string$('code', code)
					]))));
	return $author$project$OAuth$Internal$makeRequest$(decoder, toMsg, url, headers, body);
};
var $author$project$OAuth$AuthorizationCode$makeTokenRequestWith = F5($author$project$OAuth$AuthorizationCode$makeTokenRequestWith$);
var $author$project$OAuth$AuthorizationCode$makeTokenRequest = A3($author$project$OAuth$AuthorizationCode$makeTokenRequestWith, $author$project$OAuth$AuthorizationCode, $author$project$OAuth$AuthorizationCode$defaultAuthenticationSuccessDecoder, $elm$core$Dict$empty);
var $author$project$Auth$Common$ErrAuthentication = function (a) {
	return {$: 'ErrAuthentication', a: a};
};
var $author$project$Auth$Common$ErrHTTPGetAccessToken = {$: 'ErrHTTPGetAccessToken'};
var $author$project$OAuth$Internal$AuthenticationError$ = function (error, errorDescription, errorUri) {
	return {error: error, errorDescription: errorDescription, errorUri: errorUri};
};
var $author$project$OAuth$Internal$AuthenticationError = F3($author$project$OAuth$Internal$AuthenticationError$);
var $author$project$OAuth$Internal$errorDescriptionDecoder = $elm$json$Json$Decode$maybe(
	A2($elm$json$Json$Decode$field, 'error_description', $elm$json$Json$Decode$string));
var $author$project$OAuth$Internal$errorUriDecoder = $elm$json$Json$Decode$maybe(
	A2($elm$json$Json$Decode$field, 'error_uri', $elm$json$Json$Decode$string));
var $author$project$OAuth$Internal$authenticationErrorDecoder = function (errorCodeDecoder) {
	return A4($elm$json$Json$Decode$map3, $author$project$OAuth$Internal$AuthenticationError, errorCodeDecoder, $author$project$OAuth$Internal$errorDescriptionDecoder, $author$project$OAuth$Internal$errorUriDecoder);
};
var $author$project$OAuth$Internal$errorDecoder = function (errorCodeFromString) {
	return A2(
		$elm$json$Json$Decode$map,
		errorCodeFromString,
		A2($elm$json$Json$Decode$field, 'error', $elm$json$Json$Decode$string));
};
var $author$project$OAuth$AuthorizationCode$defaultErrorDecoder = $author$project$OAuth$Internal$errorDecoder($author$project$OAuth$errorCodeFromString);
var $author$project$OAuth$AuthorizationCode$defaultAuthenticationErrorDecoder = $author$project$OAuth$Internal$authenticationErrorDecoder($author$project$OAuth$AuthorizationCode$defaultErrorDecoder);
var $author$project$Auth$Protocol$OAuth$parseAuthenticationResponseError = function (httpErr) {
	if (httpErr.$ === 'BadBody') {
		var body = httpErr.a;
		var _v1 = A2($elm$json$Json$Decode$decodeString, $author$project$OAuth$AuthorizationCode$defaultAuthenticationErrorDecoder, body);
		if (_v1.$ === 'Ok') {
			var error = _v1.a;
			return $author$project$Auth$Common$ErrAuthentication(error);
		} else {
			return $author$project$Auth$Common$ErrHTTPGetAccessToken;
		}
	} else {
		return $author$project$Auth$Common$ErrHTTPGetAccessToken;
	}
};
var $elm$http$Http$resultToTask = function (result) {
	if (result.$ === 'Ok') {
		var a = result.a;
		return $elm$core$Task$succeed(a);
	} else {
		var x = result.a;
		return $elm$core$Task$fail(x);
	}
};
var $elm$http$Http$task = function (r) {
	return A3(
		_Http_toTask,
		_Utils_Tuple0,
		$elm$http$Http$resultToTask,
		{allowCookiesFromOtherDomains: false, body: r.body, expect: r.resolver, headers: r.headers, method: r.method, timeout: r.timeout, tracker: $elm$core$Maybe$Nothing, url: r.url});
};
var $author$project$Auth$Protocol$OAuth$validateCallbackToken$ = function (clientId, clientSecret, tokenEndpoint, redirectUri, code) {
	var req = A2(
		$author$project$OAuth$AuthorizationCode$makeTokenRequest,
		$elm$core$Basics$always(_Utils_Tuple0),
		{
			code: code,
			credentials: {
				clientId: clientId,
				secret: $elm$core$Maybe$Just(clientSecret)
			},
			redirectUri: _Utils_update(
				redirectUri,
				{fragment: $elm$core$Maybe$Nothing, query: $elm$core$Maybe$Nothing}),
			url: tokenEndpoint
		});
	return $elm$core$Task$mapError$(
		$author$project$Auth$Protocol$OAuth$parseAuthenticationResponseError,
		$elm$http$Http$task(
			{
				body: req.body,
				headers: _Utils_ap(
					req.headers,
					_List_fromArray(
						[
							A2($elm$http$Http$header, 'Accept', 'application/json')
						])),
				method: req.method,
				resolver: $author$project$Auth$HttpHelpers$jsonResolver($author$project$OAuth$AuthorizationCode$defaultAuthenticationSuccessDecoder),
				timeout: req.timeout,
				url: req.url
			}));
};
var $author$project$Auth$Protocol$OAuth$validateCallbackToken = F5($author$project$Auth$Protocol$OAuth$validateCallbackToken$);
var $author$project$Auth$Protocol$OAuth$onAuthCallbackReceived$ = function (sessionId, clientId, method, receivedUrl, code, state, now, asBackendMsg, backendModel) {
	return _Utils_Tuple2(
		backendModel,
		$elm$core$Task$attempt$(
			A2(
				$elm$core$Basics$composeR,
				A4($author$project$Auth$Common$AuthSuccess, sessionId, clientId, method.id, now),
				asBackendMsg),
			A2(
				$elm$core$Task$andThen,
				function (authenticationResponse) {
					var _v0 = $elm$core$Dict$get$(sessionId, backendModel.pendingAuths);
					if (_v0.$ === 'Just') {
						var pendingAuth = _v0.a;
						var authToken = $elm$core$Maybe$Just(
							$author$project$Auth$Protocol$OAuth$makeToken$(method.id, authenticationResponse, now));
						return _Utils_eq(pendingAuth.state, state) ? $elm$core$Task$map$(
							function (userInfo) {
								return _Utils_Tuple2(userInfo, authToken);
							},
							method.getUserInfo(authenticationResponse)) : $elm$core$Task$fail(
							$author$project$Auth$Common$ErrAuthString('Invalid auth state. Please log in again or report this issue.'));
					} else {
						return $elm$core$Task$fail(
							$author$project$Auth$Common$ErrAuthString('Couldn\'t validate auth, please login again.'));
					}
				},
				$author$project$Auth$Protocol$OAuth$validateCallbackToken$(method.clientId, method.clientSecret, method.tokenEndpoint, receivedUrl, code))));
};
var $author$project$Auth$Protocol$OAuth$onAuthCallbackReceived = F9($author$project$Auth$Protocol$OAuth$onAuthCallbackReceived$);
var $author$project$Auth$Flow$backendUpdate$ = function (_v0, authBackendMsg) {
	var isDev = _v0.isDev;
	var logout = _v0.logout;
	var renewSession = _v0.renewSession;
	var handleAuthSuccess = _v0.handleAuthSuccess;
	var loadMethod = _v0.loadMethod;
	var backendModel = _v0.backendModel;
	var sendToFrontend = _v0.sendToFrontend;
	var asBackendMsg = _v0.asBackendMsg;
	var asToFrontend = _v0.asToFrontend;
	var authError = function (str) {
		return asToFrontend(
			$author$project$Auth$Common$AuthError(
				$author$project$Auth$Common$ErrAuthString(str)));
	};
	var withMethod = F3(
		function (methodId, clientId, fn) {
			var _v6 = loadMethod(methodId);
			if (_v6.$ === 'Nothing') {
				return _Utils_Tuple2(
					backendModel,
					A2(
						sendToFrontend,
						clientId,
						authError('Unsupported auth method: ' + methodId)));
			} else {
				var method = _v6.a;
				return fn(method);
			}
		});
	switch (authBackendMsg.$) {
		case 'AuthSigninInitiated_':
			var username = authBackendMsg.a.username;
			var now = authBackendMsg.a.now;
			var baseUrl = authBackendMsg.a.baseUrl;
			var methodId = authBackendMsg.a.methodId;
			var clientId = authBackendMsg.a.clientId;
			var sessionId = authBackendMsg.a.sessionId;
			return A3(
				withMethod,
				methodId,
				clientId,
				function (method) {
					if (method.$ === 'ProtocolEmailMagicLink') {
						var config = method.a;
						return A5(
							config.initiateSignin,
							sessionId,
							clientId,
							backendModel,
							{username: username},
							now);
					} else {
						var config = method.a;
						return $author$project$Auth$Protocol$OAuth$initiateSignin$(isDev, sessionId, baseUrl, config, asBackendMsg, now, backendModel);
					}
				});
		case 'AuthSigninInitiatedDelayed_':
			var sessionId = authBackendMsg.a;
			var initiateMsg = authBackendMsg.b;
			return _Utils_Tuple2(
				backendModel,
				A2(
					sendToFrontend,
					sessionId,
					asToFrontend(initiateMsg)));
		case 'AuthCallbackReceived_':
			var sessionId = authBackendMsg.a;
			var clientId = authBackendMsg.b;
			var methodId = authBackendMsg.c;
			var receivedUrl = authBackendMsg.d;
			var code = authBackendMsg.e;
			var state = authBackendMsg.f;
			var now = authBackendMsg.g;
			return A3(
				withMethod,
				methodId,
				clientId,
				function (method) {
					if (method.$ === 'ProtocolEmailMagicLink') {
						var config = method.a;
						return A8(config.onAuthCallbackReceived, sessionId, clientId, receivedUrl, code, state, now, asBackendMsg, backendModel);
					} else {
						var config = method.a;
						return $author$project$Auth$Protocol$OAuth$onAuthCallbackReceived$(sessionId, clientId, config, receivedUrl, code, state, now, asBackendMsg, backendModel);
					}
				});
		case 'AuthSuccess':
			var sessionId = authBackendMsg.a;
			var clientId = authBackendMsg.b;
			var methodId = authBackendMsg.c;
			var now = authBackendMsg.d;
			var res = authBackendMsg.e;
			var removeSession = function (backendModel_) {
				return _Utils_update(
					backendModel_,
					{
						pendingAuths: $elm$core$Dict$remove$(sessionId, backendModel_.pendingAuths)
					});
			};
			return A3(
				withMethod,
				methodId,
				clientId,
				function (method) {
					if (res.$ === 'Ok') {
						var _v5 = res.a;
						var userInfo = _v5.a;
						var authToken = _v5.b;
						return $elm$core$Tuple$mapFirst$(
							removeSession,
							A6(handleAuthSuccess, sessionId, clientId, userInfo, methodId, authToken, now));
					} else {
						var err = res.a;
						return _Utils_Tuple2(
							backendModel,
							A2(
								sendToFrontend,
								sessionId,
								asToFrontend(
									$author$project$Auth$Common$AuthError(err))));
					}
				});
		case 'AuthRenewSession':
			var sessionId = authBackendMsg.a;
			var clientId = authBackendMsg.b;
			return A3(renewSession, sessionId, clientId, backendModel);
		default:
			var sessionId = authBackendMsg.a;
			var clientId = authBackendMsg.b;
			return A3(logout, sessionId, clientId, backendModel);
	}
};
var $author$project$Auth$Flow$backendUpdate = F2($author$project$Auth$Flow$backendUpdate$);
var $author$project$Auth$EmailPasswordAuth$completeSignup$ = function (browserCookie, connectionId, email, _v0, maybeName, salt, hash, model) {
	var userInfo = {email: email, name: maybeName, picture: $elm$core$Maybe$Nothing, username: $elm$core$Maybe$Nothing};
	var newCredentials = {createdAt: 0, email: email, passwordHash: hash, passwordSalt: salt};
	var initialPreferences = {darkMode: true};
	var user = {email: email, name: maybeName, preferences: initialPreferences};
	var updatedModel = _Utils_update(
		model,
		{
			emailPasswordCredentials: $elm$core$Dict$insert$(email, newCredentials, model.emailPasswordCredentials),
			sessions: $elm$core$Dict$insert$(browserCookie, userInfo, model.sessions),
			users: $elm$core$Dict$insert$(email, user, model.users)
		});
	return _Utils_Tuple2(
		updatedModel,
		$lamdera$core$Lamdera$sendToFrontend$(
			connectionId,
			$author$project$Types$AuthSuccess(userInfo)));
};
var $author$project$Auth$EmailPasswordAuth$completeSignup = F8($author$project$Auth$EmailPasswordAuth$completeSignup$);
var $lamdera$program_test$Effect$Internal$Passthrough = function (a) {
	return {$: 'Passthrough', a: a};
};
var $lamdera$program_test$Effect$Command$fromCmd$ = function (reason, cmd) {
	return $lamdera$program_test$Effect$Internal$Passthrough(cmd);
};
var $lamdera$program_test$Effect$Command$fromCmd = F2($lamdera$program_test$Effect$Command$fromCmd$);
var $author$project$Logger$updateTimestamp$ = function (index, timestamp, state) {
	return _Utils_update(
		state,
		{
			entries: $elm$core$List$map$(
				function (entry) {
					return _Utils_eq(entry.index, index) ? _Utils_update(
						entry,
						{timestamp: timestamp}) : entry;
				},
				state.entries)
		});
};
var $author$project$Logger$updateTimestamp = F3($author$project$Logger$updateTimestamp$);
var $author$project$Logger$handleMsg$ = function (msg, state) {
	var index = msg.a;
	var timestamp = msg.b;
	return $author$project$Logger$updateTimestamp$(index, timestamp, state);
};
var $author$project$Logger$handleMsg = F2($author$project$Logger$handleMsg$);
var $author$project$Supplemental$httpErrorToString = function (error) {
	switch (error.$) {
		case 'BadUrl':
			var url = error.a;
			return 'Bad URL: ' + url;
		case 'Timeout':
			return 'Request timed out';
		case 'NetworkError':
			return 'Network error';
		case 'BadStatus':
			var statusCode = error.a;
			return 'Bad status: ' + $elm$core$String$fromInt(statusCode);
		default:
			var message = error.a;
			return 'Bad body: ' + message;
	}
};
var $author$project$Logger$Debug = {$: 'Debug'};
var $author$project$Logger$GotTimestamp$ = function (a, b) {
	return {$: 'GotTimestamp', a: a, b: b};
};
var $author$project$Logger$GotTimestamp = F2($author$project$Logger$GotTimestamp$);
var $author$project$Logger$addLogWithTime$ = function (level, message, timestamp, state) {
	var entry = {index: state.nextIndex, level: level, message: message, timestamp: timestamp};
	var newEntries = $elm$core$List$take$(
		state.maxEntries,
		A2($elm$core$List$cons, entry, state.entries));
	return _Utils_Tuple2(
		entry,
		_Utils_update(
			state,
			{entries: newEntries, nextIndex: state.nextIndex + 1}));
};
var $author$project$Logger$addLogWithTime = F4($author$project$Logger$addLogWithTime$);
var $author$project$Logger$addLog$ = function (level, message, state) {
	return $author$project$Logger$addLogWithTime$(level, message, 0, state);
};
var $author$project$Logger$addLog = F3($author$project$Logger$addLog$);
var $author$project$Logger$levelToString = function (level) {
	switch (level.$) {
		case 'Debug':
			return 'DEBUG';
		case 'Info':
			return 'INFO';
		case 'Warn':
			return 'WARN';
		default:
			return 'ERROR';
	}
};
var $elm$core$Debug$log = _Debug_log;
var $elm$time$Time$Name = function (a) {
	return {$: 'Name', a: a};
};
var $elm$time$Time$customZone = $elm$time$Time$Zone;
var $elm$time$Time$now = _Time_now($elm$time$Time$millisToPosix);
var $author$project$Logger$log$ = function (level, message, toMsg, _v0) {
	var model = _v0.a;
	var cmd = _v0.b;
	var _v1 = $author$project$Logger$addLog$(level, message, model.logState);
	var entry = _v1.a;
	var newLogState = _v1.b;
	var timestampCmd = $elm$core$Task$perform$(
		function (time) {
			return toMsg(
				$author$project$Logger$GotTimestamp$(
					entry.index,
					$elm$time$Time$posixToMillis(time)));
		},
		$elm$time$Time$now);
	var _v2 = A2(
		$elm$core$Debug$log,
		$author$project$Logger$levelToString(level),
		message);
	return _Utils_Tuple2(
		_Utils_update(
			model,
			{logState: newLogState}),
		$elm$core$Platform$Cmd$batch(
			_List_fromArray(
				[cmd, timestampCmd])));
};
var $author$project$Logger$log = F4($author$project$Logger$log$);
var $author$project$Logger$logDebug = $author$project$Logger$log($author$project$Logger$Debug);
var $author$project$Logger$Error = {$: 'Error'};
var $author$project$Logger$logError = $author$project$Logger$log($author$project$Logger$Error);
var $author$project$Logger$Info = {$: 'Info'};
var $author$project$Logger$logInfo = $author$project$Logger$log($author$project$Logger$Info);
var $elm$core$Tuple$mapSecond$ = function (func, _v0) {
	var x = _v0.a;
	var y = _v0.b;
	return _Utils_Tuple2(
		x,
		func(y));
};
var $elm$core$Tuple$mapSecond = F2($elm$core$Tuple$mapSecond$);
var $author$project$Backend$wrapLogCmd = function (_v0) {
	var m = _v0.a;
	var cmd = _v0.b;
	return _Utils_Tuple2(
		m,
		$lamdera$program_test$Effect$Command$fromCmd$('logger', cmd));
};
var $author$project$Backend$update$ = function (msg, model) {
	switch (msg.$) {
		case 'NoOpBackendMsg':
			return _Utils_Tuple2(model, $lamdera$program_test$Effect$Command$none);
		case 'GotLogTime':
			var loggerMsg = msg.a;
			return _Utils_Tuple2(
				_Utils_update(
					model,
					{
						logState: $author$project$Logger$handleMsg$(loggerMsg, model.logState)
					}),
				$lamdera$program_test$Effect$Command$none);
		case 'GotRemoteModel':
			var result = msg.a;
			if (result.$ === 'Ok') {
				var model_ = result.a;
				return $author$project$Backend$wrapLogCmd(
					A3(
						$author$project$Logger$logInfo,
						'GotRemoteModel Ok',
						$author$project$Types$GotLogTime,
						_Utils_Tuple2(model_, $elm$core$Platform$Cmd$none)));
			} else {
				var err = result.a;
				return $author$project$Backend$wrapLogCmd(
					A3(
						$author$project$Logger$logError,
						'GotRemoteModel Err: ' + $author$project$Supplemental$httpErrorToString(err),
						$author$project$Types$GotLogTime,
						_Utils_Tuple2(model, $elm$core$Platform$Cmd$none)));
			}
		case 'AuthBackendMsg':
			var authMsg = msg.a;
			return $elm$core$Tuple$mapSecond$(
				$lamdera$program_test$Effect$Command$fromCmd('AuthBackendMsg'),
				$author$project$Auth$Flow$backendUpdate$(
					$author$project$Rights$Auth0$backendConfig(model),
					authMsg));
		case 'EmailPasswordAuthResult':
			var result = msg.a;
			var browserCookie = result.a;
			var connectionId = result.b;
			var email = result.c;
			var password = result.d;
			var maybeName = result.e;
			var salt = result.f;
			var hash = result.g;
			return $elm$core$Tuple$mapSecond$(
				$lamdera$program_test$Effect$Command$fromCmd('EmailPasswordAuth'),
				$author$project$Auth$EmailPasswordAuth$completeSignup$(browserCookie, connectionId, email, password, maybeName, salt, hash, model));
		case 'GotCryptoPriceResult':
			var token = msg.a;
			var result = msg.b;
			if (result.$ === 'Ok') {
				var priceStr = result.a;
				var updatedPollingJobs = $elm$core$Dict$insert$(
					token,
					$author$project$Types$Ready(
						$elm$core$Result$Ok(priceStr)),
					model.pollingJobs);
				return $author$project$Backend$wrapLogCmd(
					A3(
						$author$project$Logger$logInfo,
						'Crypto price calculated: ' + priceStr,
						$author$project$Types$GotLogTime,
						_Utils_Tuple2(
							_Utils_update(
								model,
								{pollingJobs: updatedPollingJobs}),
							$elm$core$Platform$Cmd$none)));
			} else {
				var err = result.a;
				var updatedPollingJobs = $elm$core$Dict$insert$(
					token,
					$author$project$Types$Ready(
						$elm$core$Result$Err(
							$author$project$Supplemental$httpErrorToString(err))),
					model.pollingJobs);
				return $author$project$Backend$wrapLogCmd(
					A3(
						$author$project$Logger$logError,
						'Failed to calculate crypto price: ' + $author$project$Supplemental$httpErrorToString(err),
						$author$project$Types$GotLogTime,
						_Utils_Tuple2(
							_Utils_update(
								model,
								{pollingJobs: updatedPollingJobs}),
							$elm$core$Platform$Cmd$none)));
			}
		case 'StoreTaskResult':
			var token = msg.a;
			var result = msg.b;
			var updatedPollingJobs = $elm$core$Dict$insert$(
				token,
				$author$project$Types$Ready(result),
				model.pollingJobs);
			if (result.$ === 'Ok') {
				return $author$project$Backend$wrapLogCmd(
					A3(
						$author$project$Logger$logInfo,
						'Task completed successfully: ' + token,
						$author$project$Types$GotLogTime,
						_Utils_Tuple2(
							_Utils_update(
								model,
								{pollingJobs: updatedPollingJobs}),
							$elm$core$Platform$Cmd$none)));
			} else {
				var err = result.a;
				return $author$project$Backend$wrapLogCmd(
					A3(
						$author$project$Logger$logError,
						'Task failed: ' + (token + (' - ' + err)),
						$author$project$Types$GotLogTime,
						_Utils_Tuple2(
							_Utils_update(
								model,
								{pollingJobs: updatedPollingJobs}),
							$elm$core$Platform$Cmd$none)));
			}
		default:
			var token = msg.a;
			var timestamp = msg.b;
			var updatedPollingJobs = $elm$core$Dict$insert$(
				token,
				$author$project$Types$BusyWithTime(timestamp),
				model.pollingJobs);
			return $author$project$Backend$wrapLogCmd(
				A3(
					$author$project$Logger$logDebug,
					'Updated job ' + (token + (' with timestamp: ' + $elm$core$String$fromInt(timestamp))),
					$author$project$Types$GotLogTime,
					_Utils_Tuple2(
						_Utils_update(
							model,
							{pollingJobs: updatedPollingJobs}),
						$elm$core$Platform$Cmd$none)));
	}
};
var $author$project$Backend$update = F2($author$project$Backend$update$);
var $author$project$Types$PermissionDenied = function (a) {
	return {$: 'PermissionDenied', a: a};
};
var $lamdera$program_test$Effect$Internal$SendToFrontend$ = function (a, b) {
	return {$: 'SendToFrontend', a: a, b: b};
};
var $lamdera$program_test$Effect$Internal$SendToFrontend = F2($lamdera$program_test$Effect$Internal$SendToFrontend$);
var $lamdera$program_test$Effect$Lamdera$sendToFrontend$ = function (client, toFrontend) {
	return $lamdera$program_test$Effect$Internal$SendToFrontend$(
		$lamdera$program_test$Effect$Internal$ClientId(
			$lamdera$program_test$Effect$Lamdera$clientIdToString(client)),
		toFrontend);
};
var $lamdera$program_test$Effect$Lamdera$sendToFrontend = F2($lamdera$program_test$Effect$Lamdera$sendToFrontend$);
var $author$project$Types$Anonymous = {$: 'Anonymous'};
var $author$project$Types$SysAdmin = {$: 'SysAdmin'};
var $author$project$Rights$Permissions$actionRoleMap = function (msg) {
	switch (msg.$) {
		case 'NoOpToBackend':
			return $author$project$Types$Anonymous;
		case 'Admin_FetchLogs':
			return $author$project$Types$SysAdmin;
		case 'Admin_ClearLogs':
			return $author$project$Types$SysAdmin;
		case 'Admin_FetchRemoteModel':
			return $author$project$Types$SysAdmin;
		case 'AuthToBackend':
			return $author$project$Types$Anonymous;
		case 'EmailPasswordAuthToBackend':
			return $author$project$Types$Anonymous;
		case 'GetUserToBackend':
			return $author$project$Types$Anonymous;
		case 'LoggedOut':
			return $author$project$Types$Anonymous;
		case 'SetDarkModePreference':
			return $author$project$Types$Anonymous;
		default:
			return $author$project$Types$Anonymous;
	}
};
var $author$project$Types$UserRole = {$: 'UserRole'};
var $author$project$Env$sysAdminEmail = 'sys@admin.com';
var $author$project$Rights$User$isSysAdmin = function (user) {
	return _Utils_eq(user.email, $author$project$Env$sysAdminEmail);
};
var $author$project$Rights$User$getUserRole = function (user) {
	return $author$project$Rights$User$isSysAdmin(user) ? $author$project$Types$SysAdmin : $author$project$Types$UserRole;
};
var $author$project$Rights$Role$roleHasAccess$ = function (userRole, requiredRole) {
	var _v0 = _Utils_Tuple2(userRole, requiredRole);
	_v0$4:
	while (true) {
		switch (_v0.a.$) {
			case 'SysAdmin':
				var _v1 = _v0.a;
				return true;
			case 'UserRole':
				switch (_v0.b.$) {
					case 'UserRole':
						var _v2 = _v0.a;
						var _v3 = _v0.b;
						return true;
					case 'Anonymous':
						var _v4 = _v0.a;
						var _v5 = _v0.b;
						return true;
					default:
						break _v0$4;
				}
			default:
				if (_v0.b.$ === 'Anonymous') {
					var _v6 = _v0.a;
					var _v7 = _v0.b;
					return true;
				} else {
					break _v0$4;
				}
		}
	}
	return false;
};
var $author$project$Rights$Role$roleHasAccess = F2($author$project$Rights$Role$roleHasAccess$);
var $author$project$Rights$Permissions$canPerformAction$ = function (user, action) {
	var userRole = $author$project$Rights$User$getUserRole(user);
	var requiredRole = $author$project$Rights$Permissions$actionRoleMap(action);
	return $author$project$Rights$Role$roleHasAccess$(userRole, requiredRole);
};
var $author$project$Rights$Permissions$canPerformAction = F2($author$project$Rights$Permissions$canPerformAction$);
var $author$project$Rights$Permissions$sessionCanPerformAction$ = function (model, browserCookie, action) {
	var _v0 = $elm$core$Dict$get$(browserCookie, model.sessions);
	if (_v0.$ === 'Just') {
		var userInfo = _v0.a;
		var _v1 = $elm$core$Dict$get$(userInfo.email, model.users);
		if (_v1.$ === 'Just') {
			var user = _v1.a;
			return $author$project$Rights$Permissions$canPerformAction$(user, action);
		} else {
			return false;
		}
	} else {
		return _Utils_eq(
			$author$project$Rights$Permissions$actionRoleMap(action),
			$author$project$Types$Anonymous);
	}
};
var $author$project$Rights$Permissions$sessionCanPerformAction = F3($author$project$Rights$Permissions$sessionCanPerformAction$);
var $author$project$Types$A0 = function (a) {
	return {$: 'A0', a: a};
};
var $author$project$Types$Admin_Logs_ToFrontend = function (a) {
	return {$: 'Admin_Logs_ToFrontend', a: a};
};
var $author$project$Types$UserDataToFrontend = function (a) {
	return {$: 'UserDataToFrontend', a: a};
};
var $author$project$Types$UserInfoMsg = function (a) {
	return {$: 'UserInfoMsg', a: a};
};
var $lamdera$program_test$Effect$Internal$Batch = function (a) {
	return {$: 'Batch', a: a};
};
var $lamdera$program_test$Effect$Command$batch = $lamdera$program_test$Effect$Internal$Batch;
var $author$project$Rights$User$createUser$ = function (userInfo, initialPreferences) {
	return {email: userInfo.email, name: userInfo.name, preferences: initialPreferences};
};
var $author$project$Rights$User$createUser = F2($author$project$Rights$User$createUser$);
var $author$project$Backend$getUserFromCookie$ = function (browserCookie, model) {
	return $elm$core$Maybe$andThen$(
		function (userInfo) {
			return $elm$core$Dict$get$(userInfo.email, model.users);
		},
		$elm$core$Dict$get$(browserCookie, model.sessions));
};
var $author$project$Backend$getUserFromCookie = F2($author$project$Backend$getUserFromCookie$);
var $author$project$Auth$PasswordHash$verifyPassword$ = function (plainPassword, hashedPassword) {
	var combined = _Utils_ap(hashedPassword.salt, plainPassword);
	var computedHash = $ktonon$elm_crypto$Crypto$Hash$sha256(combined);
	return _Utils_eq(computedHash, hashedPassword.hash);
};
var $author$project$Auth$PasswordHash$verifyPassword = F2($author$project$Auth$PasswordHash$verifyPassword$);
var $author$project$Auth$EmailPasswordAuth$handleLogin$ = function (browserCookie, connectionId, email, password, model) {
	var _v0 = $elm$core$Dict$get$(email, model.emailPasswordCredentials);
	if (_v0.$ === 'Just') {
		var creds = _v0.a;
		var hashedPassword = {hash: creds.passwordHash, salt: creds.passwordSalt};
		if ($author$project$Auth$PasswordHash$verifyPassword$(password, hashedPassword)) {
			var userName = function () {
				var _v1 = $elm$core$Dict$get$(email, model.users);
				if (_v1.$ === 'Just') {
					var user = _v1.a;
					return user.name;
				} else {
					return $elm$core$Maybe$Nothing;
				}
			}();
			var userInfo = {email: email, name: userName, picture: $elm$core$Maybe$Nothing, username: $elm$core$Maybe$Nothing};
			var newSessions = $elm$core$Dict$insert$(browserCookie, userInfo, model.sessions);
			return _Utils_Tuple2(
				_Utils_update(
					model,
					{sessions: newSessions}),
				$lamdera$core$Lamdera$sendToFrontend$(
					connectionId,
					$author$project$Types$AuthSuccess(userInfo)));
		} else {
			return _Utils_Tuple2(
				model,
				$lamdera$core$Lamdera$sendToFrontend$(
					connectionId,
					$author$project$Types$AuthToFrontend(
						$author$project$Auth$Common$AuthError(
							$author$project$Auth$Common$ErrAuthString('Invalid email or password')))));
		}
	} else {
		return _Utils_Tuple2(
			model,
			$lamdera$core$Lamdera$sendToFrontend$(
				connectionId,
				$author$project$Types$AuthToFrontend(
					$author$project$Auth$Common$AuthError(
						$author$project$Auth$Common$ErrAuthString('Invalid email or password')))));
	}
};
var $author$project$Auth$EmailPasswordAuth$handleLogin = F5($author$project$Auth$EmailPasswordAuth$handleLogin$);
var $author$project$Types$EmailPasswordAuthResult = function (a) {
	return {$: 'EmailPasswordAuthResult', a: a};
};
var $author$project$Types$EmailPasswordSignupWithHash$ = function (a, b, c, d, e, f, g) {
	return {$: 'EmailPasswordSignupWithHash', a: a, b: b, c: c, d: d, e: e, f: f, g: g};
};
var $author$project$Types$EmailPasswordSignupWithHash = F7($author$project$Types$EmailPasswordSignupWithHash$);
var $elm$random$Random$Generate = function (a) {
	return {$: 'Generate', a: a};
};
var $elm$random$Random$Seed$ = function (a, b) {
	return {$: 'Seed', a: a, b: b};
};
var $elm$random$Random$Seed = F2($elm$random$Random$Seed$);
var $elm$random$Random$next = function (_v0) {
	var state0 = _v0.a;
	var incr = _v0.b;
	return $elm$random$Random$Seed$(((state0 * 1664525) + incr) >>> 0, incr);
};
var $elm$random$Random$initialSeed = function (x) {
	var _v0 = $elm$random$Random$next(
		$elm$random$Random$Seed$(0, 1013904223));
	var state1 = _v0.a;
	var incr = _v0.b;
	var state2 = (state1 + x) >>> 0;
	return $elm$random$Random$next(
		$elm$random$Random$Seed$(state2, incr));
};
var $elm$random$Random$init = A2(
	$elm$core$Task$andThen,
	function (time) {
		return $elm$core$Task$succeed(
			$elm$random$Random$initialSeed(
				$elm$time$Time$posixToMillis(time)));
	},
	$elm$time$Time$now);
var $elm$random$Random$step$ = function (_v0, seed) {
	var generator = _v0.a;
	return generator(seed);
};
var $elm$random$Random$step = F2($elm$random$Random$step$);
var $elm$random$Random$onEffects$ = function (router, commands, seed) {
	if (!commands.b) {
		return $elm$core$Task$succeed(seed);
	} else {
		var generator = commands.a.a;
		var rest = commands.b;
		var _v1 = $elm$random$Random$step$(generator, seed);
		var value = _v1.a;
		var newSeed = _v1.b;
		return A2(
			$elm$core$Task$andThen,
			function (_v2) {
				return $elm$random$Random$onEffects$(router, rest, newSeed);
			},
			A2($elm$core$Platform$sendToApp, router, value));
	}
};
var $elm$random$Random$onEffects = F3($elm$random$Random$onEffects$);
var $elm$random$Random$onSelfMsg$ = function (_v0, _v1, seed) {
	return $elm$core$Task$succeed(seed);
};
var $elm$random$Random$onSelfMsg = F3($elm$random$Random$onSelfMsg$);
var $elm$random$Random$Generator = function (a) {
	return {$: 'Generator', a: a};
};
var $elm$random$Random$map$ = function (func, _v0) {
	var genA = _v0.a;
	return $elm$random$Random$Generator(
		function (seed0) {
			var _v1 = genA(seed0);
			var a = _v1.a;
			var seed1 = _v1.b;
			return _Utils_Tuple2(
				func(a),
				seed1);
		});
};
var $elm$random$Random$map = F2($elm$random$Random$map$);
var $elm$random$Random$cmdMap$ = function (func, _v0) {
	var generator = _v0.a;
	return $elm$random$Random$Generate(
		$elm$random$Random$map$(func, generator));
};
var $elm$random$Random$cmdMap = F2($elm$random$Random$cmdMap$);
_Platform_effectManagers['Random'] = _Platform_createManager($elm$random$Random$init, $elm$random$Random$onEffects, $elm$random$Random$onSelfMsg, $elm$random$Random$cmdMap);
var $elm$random$Random$command = _Platform_leaf('Random');
var $elm$random$Random$generate$ = function (tagger, generator) {
	return $elm$random$Random$command(
		$elm$random$Random$Generate(
			$elm$random$Random$map$(tagger, generator)));
};
var $elm$random$Random$generate = F2($elm$random$Random$generate$);
var $elm$random$Random$peel = function (_v0) {
	var state = _v0.a;
	var word = (state ^ (state >>> ((state >>> 28) + 4))) * 277803737;
	return ((word >>> 22) ^ word) >>> 0;
};
var $elm$random$Random$int$ = function (a, b) {
	return $elm$random$Random$Generator(
		function (seed0) {
			var _v0 = (_Utils_cmp(a, b) < 0) ? _Utils_Tuple2(a, b) : _Utils_Tuple2(b, a);
			var lo = _v0.a;
			var hi = _v0.b;
			var range = (hi - lo) + 1;
			if (!((range - 1) & range)) {
				return _Utils_Tuple2(
					(((range - 1) & $elm$random$Random$peel(seed0)) >>> 0) + lo,
					$elm$random$Random$next(seed0));
			} else {
				var threshhold = (((-range) >>> 0) % range) >>> 0;
				var accountForBias = function (seed) {
					accountForBias:
					while (true) {
						var x = $elm$random$Random$peel(seed);
						var seedN = $elm$random$Random$next(seed);
						if (_Utils_cmp(x, threshhold) < 0) {
							var $temp$seed = seedN;
							seed = $temp$seed;
							continue accountForBias;
						} else {
							return _Utils_Tuple2((x % range) + lo, seedN);
						}
					}
				};
				return accountForBias(seed0);
			}
		});
};
var $elm$random$Random$int = F2($elm$random$Random$int$);
var $author$project$Auth$EmailPasswordAuth$handleSignup$ = function (browserCookie, connectionId, email, password, maybeName, model) {
	var _v0 = $elm$core$Dict$get$(email, model.emailPasswordCredentials);
	if (_v0.$ === 'Just') {
		return _Utils_Tuple2(
			model,
			$lamdera$core$Lamdera$sendToFrontend$(
				connectionId,
				$author$project$Types$AuthToFrontend(
					$author$project$Auth$Common$AuthError(
						$author$project$Auth$Common$ErrAuthString('User already exists')))));
	} else {
		var saltGenerator = $elm$random$Random$map$(
			$elm$core$String$fromInt,
			$elm$random$Random$int$(100000000, 999999999));
		var cmd = $elm$random$Random$generate$(
			function (salt) {
				return $author$project$Types$EmailPasswordAuthResult(
					$author$project$Types$EmailPasswordSignupWithHash$(
						browserCookie,
						connectionId,
						email,
						password,
						maybeName,
						salt,
						$author$project$Auth$PasswordHash$hashPassword$(salt, password).hash));
			},
			saltGenerator);
		return _Utils_Tuple2(model, cmd);
	}
};
var $author$project$Auth$EmailPasswordAuth$handleSignup = F6($author$project$Auth$EmailPasswordAuth$handleSignup$);
var $author$project$Backend$handleEmailPasswordAuth$ = function (browserCookie, connectionId, authMsg, model) {
	if (authMsg.$ === 'EmailPasswordLoginToBackend') {
		var email = authMsg.a;
		var password = authMsg.b;
		return $author$project$Auth$EmailPasswordAuth$handleLogin$(browserCookie, connectionId, email, password, model);
	} else {
		var email = authMsg.a;
		var password = authMsg.b;
		var maybeName = authMsg.c;
		return $author$project$Auth$EmailPasswordAuth$handleSignup$(browserCookie, connectionId, email, password, maybeName, model);
	}
};
var $author$project$Backend$handleEmailPasswordAuth = F4($author$project$Backend$handleEmailPasswordAuth$);
var $author$project$Rights$User$insertUser$ = function (email, newUser, model) {
	return _Utils_update(
		model,
		{
			users: $elm$core$Dict$insert$(email, newUser, model.users)
		});
};
var $author$project$Rights$User$insertUser = F3($author$project$Rights$User$insertUser$);
var $author$project$Logger$Warn = {$: 'Warn'};
var $author$project$Logger$logWarn = $author$project$Logger$log($author$project$Logger$Warn);
var $author$project$Logger$toList = function (state) {
	return $elm$core$List$reverse(state.entries);
};
var $author$project$Auth$Common$AuthCallbackReceived_$ = function (a, b, c, d, e, f, g) {
	return {$: 'AuthCallbackReceived_', a: a, b: b, c: c, d: d, e: e, f: f, g: g};
};
var $author$project$Auth$Common$AuthCallbackReceived_ = F7($author$project$Auth$Common$AuthCallbackReceived_$);
var $author$project$Auth$Common$AuthLogout$ = function (a, b) {
	return {$: 'AuthLogout', a: a, b: b};
};
var $author$project$Auth$Common$AuthLogout = F2($author$project$Auth$Common$AuthLogout$);
var $author$project$Auth$Common$AuthRenewSession$ = function (a, b) {
	return {$: 'AuthRenewSession', a: a, b: b};
};
var $author$project$Auth$Common$AuthRenewSession = F2($author$project$Auth$Common$AuthRenewSession$);
var $author$project$Auth$Common$AuthSigninInitiated_ = function (a) {
	return {$: 'AuthSigninInitiated_', a: a};
};
var $author$project$Auth$Flow$withCurrentTime = function (fn) {
	return $elm$core$Task$perform$(fn, $elm$time$Time$now);
};
var $author$project$Auth$Flow$updateFromFrontend$ = function (_v0, clientId, sessionId, authToBackend, model) {
	var asBackendMsg = _v0.asBackendMsg;
	switch (authToBackend.$) {
		case 'AuthSigninInitiated':
			var params = authToBackend.a;
			return _Utils_Tuple2(
				model,
				$author$project$Auth$Flow$withCurrentTime(
					function (now) {
						return asBackendMsg(
							$author$project$Auth$Common$AuthSigninInitiated_(
								{baseUrl: params.baseUrl, clientId: clientId, methodId: params.methodId, now: now, sessionId: sessionId, username: params.username}));
					}));
		case 'AuthCallbackReceived':
			var methodId = authToBackend.a;
			var receivedUrl = authToBackend.b;
			var code = authToBackend.c;
			var state = authToBackend.d;
			return _Utils_Tuple2(
				model,
				$elm$core$Task$perform$(
					function (now) {
						return asBackendMsg(
							$author$project$Auth$Common$AuthCallbackReceived_$(sessionId, clientId, methodId, receivedUrl, code, state, now));
					},
					$elm$time$Time$now));
		case 'AuthRenewSessionRequested':
			return _Utils_Tuple2(
				model,
				$elm$core$Task$perform$(
					function (t) {
						return asBackendMsg(
							$author$project$Auth$Common$AuthRenewSession$(sessionId, clientId));
					},
					$elm$time$Time$now));
		default:
			return _Utils_Tuple2(
				model,
				$elm$core$Task$perform$(
					function (t) {
						return asBackendMsg(
							$author$project$Auth$Common$AuthLogout$(sessionId, clientId));
					},
					$elm$time$Time$now));
	}
};
var $author$project$Auth$Flow$updateFromFrontend = F5($author$project$Auth$Flow$updateFromFrontend$);
var $author$project$Rights$Role$roleToString = function (role) {
	switch (role.$) {
		case 'SysAdmin':
			return 'SysAdmin';
		case 'UserRole':
			return 'User';
		default:
			return 'Anonymous';
	}
};
var $author$project$Backend$userToFrontend = function (user) {
	return {
		email: user.email,
		isSysAdmin: $author$project$Rights$User$isSysAdmin(user),
		preferences: user.preferences,
		role: $author$project$Rights$Role$roleToString(
			$author$project$Rights$User$getUserRole(user))
	};
};
var $author$project$Backend$updateFromFrontend$ = function (sessionId, clientId, msg, model) {
	var connectionId = $lamdera$program_test$Effect$Lamdera$clientIdToString(clientId);
	var browserCookie = $lamdera$program_test$Effect$Lamdera$sessionIdToString(sessionId);
	switch (msg.$) {
		case 'NoOpToBackend':
			return _Utils_Tuple2(model, $lamdera$program_test$Effect$Command$none);
		case 'Admin_FetchLogs':
			var searchQuery = msg.a;
			var allLogs = $author$project$Logger$toList(model.logState);
			var filteredLogs = $elm$core$String$isEmpty(searchQuery) ? allLogs : $elm$core$List$filter$(
				function (logEntry) {
					return A2(
						$elm$core$String$contains,
						$elm$core$String$toLower(searchQuery),
						$elm$core$String$toLower(logEntry.message));
				},
				allLogs);
			return _Utils_Tuple2(
				model,
				$lamdera$program_test$Effect$Lamdera$sendToFrontend$(
					clientId,
					$author$project$Types$Admin_Logs_ToFrontend(filteredLogs)));
		case 'Admin_ClearLogs':
			var logSize = $elm$core$Maybe$withDefault$(
				2000,
				$elm$core$String$toInt($author$project$Env$logSize));
			var newModel = _Utils_update(
				model,
				{
					logState: $author$project$Logger$init(logSize)
				});
			return _Utils_Tuple2(
				newModel,
				$lamdera$program_test$Effect$Lamdera$sendToFrontend$(
					clientId,
					$author$project$Types$Admin_Logs_ToFrontend(_List_Nil)));
		case 'Admin_FetchRemoteModel':
			return _Utils_Tuple2(model, $lamdera$program_test$Effect$Command$none);
		case 'AuthToBackend':
			var authToBackend = msg.a;
			return $elm$core$Tuple$mapSecond$(
				$lamdera$program_test$Effect$Command$fromCmd('AuthToBackend'),
				$author$project$Auth$Flow$updateFromFrontend$(
					$author$project$Rights$Auth0$backendConfig(model),
					connectionId,
					browserCookie,
					authToBackend,
					model));
		case 'EmailPasswordAuthToBackend':
			var authMsg = msg.a;
			return $elm$core$Tuple$mapSecond$(
				$lamdera$program_test$Effect$Command$fromCmd('EmailPasswordAuth'),
				$author$project$Backend$handleEmailPasswordAuth$(browserCookie, connectionId, authMsg, model));
		case 'GetUserToBackend':
			var _v1 = $elm$core$Dict$get$(browserCookie, model.sessions);
			if (_v1.$ === 'Just') {
				var userInfo = _v1.a;
				var _v2 = $author$project$Backend$getUserFromCookie$(browserCookie, model);
				if (_v2.$ === 'Just') {
					var user = _v2.a;
					return _Utils_Tuple2(
						model,
						$lamdera$program_test$Effect$Command$batch(
							_List_fromArray(
								[
									$lamdera$program_test$Effect$Lamdera$sendToFrontend$(
									clientId,
									$author$project$Types$UserInfoMsg(
										$elm$core$Maybe$Just(userInfo))),
									$lamdera$program_test$Effect$Lamdera$sendToFrontend$(
									clientId,
									$author$project$Types$UserDataToFrontend(
										$author$project$Backend$userToFrontend(user)))
								])));
				} else {
					var initialPreferences = {darkMode: true};
					var user = $author$project$Rights$User$createUser$(userInfo, initialPreferences);
					var newModel = $author$project$Rights$User$insertUser$(userInfo.email, user, model);
					return _Utils_Tuple2(
						newModel,
						$lamdera$program_test$Effect$Command$batch(
							_List_fromArray(
								[
									$lamdera$program_test$Effect$Lamdera$sendToFrontend$(
									clientId,
									$author$project$Types$UserInfoMsg(
										$elm$core$Maybe$Just(userInfo))),
									$lamdera$program_test$Effect$Lamdera$sendToFrontend$(
									clientId,
									$author$project$Types$UserDataToFrontend(
										$author$project$Backend$userToFrontend(user)))
								])));
				}
			} else {
				return _Utils_Tuple2(
					model,
					$lamdera$program_test$Effect$Lamdera$sendToFrontend$(
						clientId,
						$author$project$Types$UserInfoMsg($elm$core$Maybe$Nothing)));
			}
		case 'LoggedOut':
			return _Utils_Tuple2(
				_Utils_update(
					model,
					{
						sessions: $elm$core$Dict$remove$(browserCookie, model.sessions)
					}),
				$lamdera$program_test$Effect$Command$none);
		case 'SetDarkModePreference':
			var preference = msg.a;
			var _v3 = $author$project$Backend$getUserFromCookie$(browserCookie, model);
			if (_v3.$ === 'Just') {
				var user = _v3.a;
				var currentPreferences = user.preferences;
				var updatedUserPreferences = _Utils_update(
					currentPreferences,
					{darkMode: preference});
				var updatedUser = _Utils_update(
					user,
					{preferences: updatedUserPreferences});
				var updatedUsers = $elm$core$Dict$insert$(user.email, updatedUser, model.users);
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{users: updatedUsers}),
					$lamdera$program_test$Effect$Command$none);
			} else {
				return $author$project$Backend$wrapLogCmd(
					A3(
						$author$project$Logger$logWarn,
						'User or session not found for SetDarkModePreference',
						$author$project$Types$GotLogTime,
						_Utils_Tuple2(model, $elm$core$Platform$Cmd$none)));
			}
		default:
			var message = msg.a;
			return _Utils_Tuple2(
				model,
				$lamdera$program_test$Effect$Lamdera$sendToFrontend$(
					clientId,
					$author$project$Types$A0('Echo: ' + message)));
	}
};
var $author$project$Backend$updateFromFrontend = F4($author$project$Backend$updateFromFrontend$);
var $author$project$Backend$updateFromFrontendCheckingRights$ = function (sessionId, clientId, msg, model) {
	var browserCookie = $lamdera$program_test$Effect$Lamdera$sessionIdToString(sessionId);
	return function () {
		switch (msg.$) {
			case 'NoOpToBackend':
				return true;
			case 'LoggedOut':
				return true;
			case 'AuthToBackend':
				return true;
			case 'EmailPasswordAuthToBackend':
				return true;
			case 'GetUserToBackend':
				return true;
			case 'SetDarkModePreference':
				return true;
			default:
				return $author$project$Rights$Permissions$sessionCanPerformAction$(model, browserCookie, msg);
		}
	}() ? $author$project$Backend$updateFromFrontend$(sessionId, clientId, msg, model) : _Utils_Tuple2(
		model,
		$lamdera$program_test$Effect$Lamdera$sendToFrontend$(
			clientId,
			$author$project$Types$PermissionDenied(msg)));
};
var $author$project$Backend$updateFromFrontendCheckingRights = F4($author$project$Backend$updateFromFrontendCheckingRights$);
var $author$project$Helpers$Simulation$backendApp = {init: $author$project$Backend$init, subscriptions: $author$project$Backend$subscriptions, update: $author$project$Backend$update, updateFromFrontend: $author$project$Backend$updateFromFrontendCheckingRights};
var $author$project$Helpers$Simulation$defaultDomain = {
	fragment: $elm$core$Maybe$Nothing,
	host: 'localhost',
	path: '/',
	port_: $elm$core$Maybe$Just(8000),
	protocol: $elm$url$Url$Http,
	query: $elm$core$Maybe$Nothing
};
var $author$project$Types$UrlChanged = function (a) {
	return {$: 'UrlChanged', a: a};
};
var $author$project$Types$UrlClicked = function (a) {
	return {$: 'UrlClicked', a: a};
};
var $author$project$Types$GetUserToBackend = {$: 'GetUserToBackend'};
var $author$project$Auth$Common$Pending = {$: 'Pending'};
var $elm$url$Url$Parser$s = function (str) {
	return $elm$url$Url$Parser$Parser(
		function (_v0) {
			var value = _v0.value;
			var frag = _v0.frag;
			var params = _v0.params;
			var unvisited = _v0.unvisited;
			var visited = _v0.visited;
			if (!unvisited.b) {
				return _List_Nil;
			} else {
				var next = unvisited.a;
				var rest = unvisited.b;
				return _Utils_eq(next, str) ? _List_fromArray(
					[
						$elm$url$Url$Parser$State$(
						A2($elm$core$List$cons, next, visited),
						rest,
						params,
						frag,
						value)
					]) : _List_Nil;
			}
		});
};
var $author$project$Auth$Method$EmailMagicLink$callbackUrl = function (methodId) {
	return $elm$url$Url$Parser$slash$(
		$elm$url$Url$Parser$s('login'),
		$elm$url$Url$Parser$slash$(
			$elm$url$Url$Parser$s(methodId),
			$elm$url$Url$Parser$s('callback')));
};
var $author$project$Auth$Method$EmailMagicLink$queryParams = $elm$url$Url$Parser$Query$map2$(
	$elm$core$Tuple$pair,
	$elm$url$Url$Parser$Query$string('token'),
	$elm$url$Url$Parser$Query$string('email'));
var $author$project$Auth$Method$EmailMagicLink$onFrontendCallbackInit$ = function (frontendModel, methodId, origin, key, toBackend) {
	var _v0 = $elm$url$Url$Parser$parse$(
		$elm$url$Url$Parser$questionMark$(
			$author$project$Auth$Method$EmailMagicLink$callbackUrl(methodId),
			$author$project$Auth$Method$EmailMagicLink$queryParams),
		origin);
	if (((_v0.$ === 'Just') && (_v0.a.a.$ === 'Just')) && (_v0.a.b.$ === 'Just')) {
		var _v1 = _v0.a;
		var token = _v1.a.a;
		var email = _v1.b.a;
		return _Utils_Tuple2(
			_Utils_update(
				frontendModel,
				{authFlow: $author$project$Auth$Common$Pending}),
			toBackend(
				$author$project$Auth$Common$AuthCallbackReceived$(methodId, origin, token, email)));
	} else {
		return _Utils_Tuple2(
			_Utils_update(
				frontendModel,
				{
					authFlow: $author$project$Auth$Common$Errored(
						$author$project$Auth$Common$ErrAuthString('Missing token and/or email parameters. Please try again.'))
				}),
			$elm$core$Platform$Cmd$none);
	}
};
var $author$project$Auth$Method$EmailMagicLink$onFrontendCallbackInit = F5($author$project$Auth$Method$EmailMagicLink$onFrontendCallbackInit$);
var $author$project$Auth$Flow$init$ = function (model, methodId, origin, navigationKey, toBackendFn) {
	switch (methodId) {
		case 'EmailMagicLink':
			return $author$project$Auth$Method$EmailMagicLink$onFrontendCallbackInit$(model, methodId, origin, navigationKey, toBackendFn);
		case 'OAuthGithub':
			return $author$project$Auth$Protocol$OAuth$onFrontendCallbackInit$(model, methodId, origin, navigationKey, toBackendFn);
		case 'OAuthGoogle':
			return $author$project$Auth$Protocol$OAuth$onFrontendCallbackInit$(model, methodId, origin, navigationKey, toBackendFn);
		case 'OAuthAuth0':
			return $author$project$Auth$Protocol$OAuth$onFrontendCallbackInit$(model, methodId, origin, navigationKey, toBackendFn);
		default:
			var clearUrl = A2(
				$elm$browser$Browser$Navigation$replaceUrl,
				navigationKey,
				$elm$url$Url$toString(model.authRedirectBaseUrl));
			return _Utils_Tuple2(
				_Utils_update(
					model,
					{
						authFlow: $author$project$Auth$Common$Errored(
							$author$project$Auth$Common$ErrAuthString('Unsupported auth method: ' + methodId))
					}),
				clearUrl);
	}
};
var $author$project$Auth$Flow$init = F5($author$project$Auth$Flow$init$);
var $lamdera$program_test$Effect$Browser$Navigation$causeStackOverflow = function (value) {
	return $lamdera$program_test$Effect$Browser$Navigation$causeStackOverflow(value) + 1;
};
var $lamdera$program_test$Effect$Browser$Navigation$crash = function (_v0) {
	crash:
	while (true) {
		var _v1 = $lamdera$program_test$Effect$Browser$Navigation$causeStackOverflow(0);
		var $temp$_v0 = _Utils_Tuple0;
		_v0 = $temp$_v0;
		continue crash;
	}
};
var $lamdera$program_test$Effect$Browser$Navigation$withRealKey = function (k) {
	if (k.$ === 'RealNavigationKey') {
		var key = k.a;
		return key;
	} else {
		return $lamdera$program_test$Effect$Browser$Navigation$crash(_Utils_Tuple0);
	}
};
var $author$project$Frontend$callbackForAuth0Auth$ = function (model, url, key) {
	return $author$project$Auth$Flow$init$(
		model,
		'OAuthAuth0',
		url,
		$lamdera$program_test$Effect$Browser$Navigation$withRealKey(key),
		function (msg) {
			return $lamdera$core$Lamdera$sendToBackend(
				$author$project$Types$AuthToBackend(msg));
		});
};
var $author$project$Frontend$callbackForAuth0Auth = F3($author$project$Frontend$callbackForAuth0Auth$);
var $author$project$Frontend$callbackForGoogleAuth$ = function (model, url, key) {
	return $author$project$Auth$Flow$init$(
		model,
		'OAuthGoogle',
		url,
		$lamdera$program_test$Effect$Browser$Navigation$withRealKey(key),
		function (msg) {
			return $lamdera$core$Lamdera$sendToBackend(
				$author$project$Types$AuthToBackend(msg));
		});
};
var $author$project$Frontend$callbackForGoogleAuth = F3($author$project$Frontend$callbackForGoogleAuth$);
var $author$project$Frontend$authCallbackCmd$ = function (model, url, key) {
	var _v0 = url;
	var path = _v0.path;
	switch (path) {
		case '/login/OAuthGoogle/callback':
			return $author$project$Frontend$callbackForGoogleAuth$(model, url, key);
		case '/login/OAuthAuth0/callback':
			return $author$project$Frontend$callbackForAuth0Auth$(model, url, key);
		default:
			return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
	}
};
var $author$project$Frontend$authCallbackCmd = F3($author$project$Frontend$authCallbackCmd$);
var $author$project$Types$NotLogged = function (a) {
	return {$: 'NotLogged', a: a};
};
var $author$project$Types$NotFound = {$: 'NotFound'};
var $author$project$Types$Admin = function (a) {
	return {$: 'Admin', a: a};
};
var $author$project$Types$AdminDefault = {$: 'AdminDefault'};
var $author$project$Types$AdminFetchModel = {$: 'AdminFetchModel'};
var $author$project$Types$AdminLogs = function (a) {
	return {$: 'AdminLogs', a: a};
};
var $author$project$Types$Default = {$: 'Default'};
var $author$project$Types$Examples = {$: 'Examples'};
var $author$project$Types$AdminLogsUrlParams$ = function (page, pageSize, search) {
	return {page: page, pageSize: pageSize, search: search};
};
var $author$project$Types$AdminLogsUrlParams = F3($author$project$Types$AdminLogsUrlParams$);
var $elm$url$Url$Parser$Query$int = function (key) {
	return $elm$url$Url$Parser$Query$custom$(
		key,
		function (stringList) {
			if (stringList.b && (!stringList.b.b)) {
				var str = stringList.a;
				return $elm$core$String$toInt(str);
			} else {
				return $elm$core$Maybe$Nothing;
			}
		});
};
var $author$project$Route$logsQueryParser = $elm$url$Url$Parser$Query$map3$(
	$author$project$Types$AdminLogsUrlParams,
	$elm$url$Url$Parser$Query$map$(
		$elm$core$Maybe$withDefault(0),
		$elm$url$Url$Parser$Query$int('page')),
	$elm$url$Url$Parser$Query$map$(
		$elm$core$Maybe$withDefault(100),
		$elm$url$Url$Parser$Query$int('size')),
	$elm$url$Url$Parser$Query$map$(
		$elm$core$Maybe$withDefault(''),
		$elm$url$Url$Parser$Query$string('q')));
var $elm$url$Url$Parser$mapState$ = function (func, _v0) {
	var value = _v0.value;
	var frag = _v0.frag;
	var params = _v0.params;
	var unvisited = _v0.unvisited;
	var visited = _v0.visited;
	return $elm$url$Url$Parser$State$(
		visited,
		unvisited,
		params,
		frag,
		func(value));
};
var $elm$url$Url$Parser$mapState = F2($elm$url$Url$Parser$mapState$);
var $elm$url$Url$Parser$map$ = function (subValue, _v0) {
	var parseArg = _v0.a;
	return $elm$url$Url$Parser$Parser(
		function (_v1) {
			var value = _v1.value;
			var frag = _v1.frag;
			var params = _v1.params;
			var unvisited = _v1.unvisited;
			var visited = _v1.visited;
			return $elm$core$List$map$(
				$elm$url$Url$Parser$mapState(value),
				parseArg(
					$elm$url$Url$Parser$State$(visited, unvisited, params, frag, subValue)));
		});
};
var $elm$url$Url$Parser$map = F2($elm$url$Url$Parser$map$);
var $elm$url$Url$Parser$oneOf = function (parsers) {
	return $elm$url$Url$Parser$Parser(
		function (state) {
			return $elm$core$List$concatMap$(
				function (_v0) {
					var parser = _v0.a;
					return parser(state);
				},
				parsers);
		});
};
var $author$project$Route$parser = $elm$url$Url$Parser$oneOf(
	_List_fromArray(
		[
			$elm$url$Url$Parser$map$($author$project$Types$Default, $elm$url$Url$Parser$top),
			$elm$url$Url$Parser$map$(
			$author$project$Types$Admin($author$project$Types$AdminDefault),
			$elm$url$Url$Parser$s('admin')),
			$elm$url$Url$Parser$map$(
			function (params) {
				return $author$project$Types$Admin(
					$author$project$Types$AdminLogs(params));
			},
			$elm$url$Url$Parser$slash$(
				$elm$url$Url$Parser$s('admin'),
				$elm$url$Url$Parser$questionMark$(
					$elm$url$Url$Parser$s('logs'),
					$author$project$Route$logsQueryParser))),
			$elm$url$Url$Parser$map$(
			$author$project$Types$Admin($author$project$Types$AdminFetchModel),
			$elm$url$Url$Parser$slash$(
				$elm$url$Url$Parser$s('admin'),
				$elm$url$Url$Parser$s('fetch-model'))),
			$elm$url$Url$Parser$map$(
			$author$project$Types$Examples,
			$elm$url$Url$Parser$s('examples'))
		]));
var $author$project$Route$fromUrl = function (url) {
	return $elm$core$Maybe$withDefault$(
		$author$project$Types$NotFound,
		$elm$url$Url$Parser$parse$($author$project$Route$parser, url));
};
var $author$project$Types$Admin_FetchLogs = function (a) {
	return {$: 'Admin_FetchLogs', a: a};
};
var $author$project$Pages$Admin$init$ = function (model, adminRoute) {
	var _v0 = model.currentUser;
	if (_v0.$ === 'Just') {
		var user = _v0.a;
		if (user.isSysAdmin) {
			if (adminRoute.$ === 'AdminLogs') {
				var params = adminRoute.a;
				return _Utils_Tuple2(
					model,
					$lamdera$core$Lamdera$sendToBackend(
						$author$project$Types$Admin_FetchLogs(params.search)));
			} else {
				return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
			}
		} else {
			return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
		}
	} else {
		return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
	}
};
var $author$project$Pages$Admin$init = F2($author$project$Pages$Admin$init$);
var $author$project$Pages$Default$init = function (model) {
	return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
};
var $author$project$Pages$Examples$init = function (model) {
	return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
};
var $author$project$Frontend$inits$ = function (model, route) {
	switch (route.$) {
		case 'Admin':
			var adminRoute = route.a;
			return $elm$core$Tuple$mapSecond$(
				$lamdera$program_test$Effect$Command$fromCmd('Admin.init'),
				$author$project$Pages$Admin$init$(model, adminRoute));
		case 'Default':
			return $elm$core$Tuple$mapSecond$(
				$lamdera$program_test$Effect$Command$fromCmd('Default.init'),
				$author$project$Pages$Default$init(model));
		case 'Examples':
			return $elm$core$Tuple$mapSecond$(
				$lamdera$program_test$Effect$Command$fromCmd('Examples.init'),
				$author$project$Pages$Examples$init(model));
		default:
			return _Utils_Tuple2(model, $lamdera$program_test$Effect$Command$none);
	}
};
var $author$project$Frontend$inits = F2($author$project$Frontend$inits$);
var $author$project$Frontend$init$ = function (url, key) {
	var route = $author$project$Route$fromUrl(url);
	var initialPreferences = {darkMode: true};
	var model = {
		adminPage: {isAuthenticated: false, logs: _List_Nil, remoteUrl: ''},
		authFlow: $author$project$Auth$Common$Idle,
		authRedirectBaseUrl: _Utils_update(
			url,
			{fragment: $elm$core$Maybe$Nothing, query: $elm$core$Maybe$Nothing}),
		currentRoute: route,
		currentUser: $elm$core$Maybe$Nothing,
		emailPasswordForm: {confirmPassword: '', email: '', error: $elm$core$Maybe$Nothing, isSignupMode: false, name: '', password: ''},
		key: key,
		login: $author$project$Types$NotLogged(false),
		loginModalOpen: false,
		pendingAuth: false,
		preferences: initialPreferences,
		profileDropdownOpen: false
	};
	return $author$project$Frontend$inits$(model, route);
};
var $author$project$Frontend$init = F2($author$project$Frontend$init$);
var $lamdera$program_test$Effect$Internal$SendToBackend = function (a) {
	return {$: 'SendToBackend', a: a};
};
var $lamdera$program_test$Effect$Lamdera$sendToBackend = $lamdera$program_test$Effect$Internal$SendToBackend;
var $author$project$Frontend$initWithAuth$ = function (url, key) {
	var _v0 = $author$project$Frontend$init$(url, key);
	var model = _v0.a;
	var initCmds = _v0.b;
	var _v1 = $author$project$Frontend$authCallbackCmd$(model, url, key);
	var authModel = _v1.a;
	var authCmd = _v1.b;
	return _Utils_Tuple2(
		authModel,
		$lamdera$program_test$Effect$Command$batch(
			_List_fromArray(
				[
					initCmds,
					$lamdera$program_test$Effect$Command$fromCmd$('authCallback', authCmd),
					$lamdera$program_test$Effect$Lamdera$sendToBackend($author$project$Types$GetUserToBackend)
				])));
};
var $author$project$Frontend$initWithAuth = F2($author$project$Frontend$initWithAuth$);
var $author$project$Types$LoggedOut = {$: 'LoggedOut'};
var $author$project$Types$SetDarkModePreference = function (a) {
	return {$: 'SetDarkModePreference', a: a};
};
var $author$project$Ports$Clipboard$clipboard_to_js = _Platform_outgoingPort('clipboard_to_js', $elm$core$Basics$identity);
var $author$project$Ports$Clipboard$copyToClipboard = function (text) {
	return $author$project$Ports$Clipboard$clipboard_to_js(
		$elm$json$Json$Encode$string(text));
};
var $lamdera$program_test$Effect$Internal$NavigationLoad = function (a) {
	return {$: 'NavigationLoad', a: a};
};
var $lamdera$program_test$Effect$Browser$Navigation$load = $lamdera$program_test$Effect$Internal$NavigationLoad;
var $author$project$Ports$ConsoleLogger$console_logger_to_js = _Platform_outgoingPort('console_logger_to_js', $elm$core$Basics$identity);
var $author$project$Ports$ConsoleLogger$log = function (message) {
	return $author$project$Ports$ConsoleLogger$console_logger_to_js(
		$elm$json$Json$Encode$string(message));
};
var $lamdera$program_test$Effect$Internal$NavigationPushUrl$ = function (a, b) {
	return {$: 'NavigationPushUrl', a: a, b: b};
};
var $lamdera$program_test$Effect$Internal$NavigationPushUrl = F2($lamdera$program_test$Effect$Internal$NavigationPushUrl$);
var $lamdera$program_test$Effect$Internal$RealNavigationKey = function (a) {
	return {$: 'RealNavigationKey', a: a};
};
var $lamdera$program_test$Effect$Browser$Navigation$toInternalKey = function (key) {
	if (key.$ === 'RealNavigationKey') {
		var key_ = key.a;
		return $lamdera$program_test$Effect$Internal$RealNavigationKey(key_);
	} else {
		return $lamdera$program_test$Effect$Internal$MockNavigationKey;
	}
};
var $lamdera$program_test$Effect$Browser$Navigation$pushUrl$ = function (key, url) {
	return $lamdera$program_test$Effect$Internal$NavigationPushUrl$(
		$lamdera$program_test$Effect$Browser$Navigation$toInternalKey(key),
		url);
};
var $lamdera$program_test$Effect$Browser$Navigation$pushUrl = F2($lamdera$program_test$Effect$Browser$Navigation$pushUrl$);
var $author$project$Auth$Common$AuthSigninInitiated = function (a) {
	return {$: 'AuthSigninInitiated', a: a};
};
var $author$project$Auth$Common$Requested = function (a) {
	return {$: 'Requested', a: a};
};
var $author$project$Auth$Flow$signInRequested$ = function (methodId, model, username) {
	return _Utils_Tuple2(
		_Utils_update(
			model,
			{
				authFlow: $author$project$Auth$Common$Requested(methodId)
			}),
		$author$project$Auth$Common$AuthSigninInitiated(
			{baseUrl: model.authRedirectBaseUrl, methodId: methodId, username: username}));
};
var $author$project$Auth$Flow$signInRequested = F3($author$project$Auth$Flow$signInRequested$);
var $author$project$Route$logsParamsToQuery = function (params) {
	var queryParts = $elm$core$List$filterMap$(
		$elm$core$Basics$identity,
		_List_fromArray(
			[
				(params.page > 0) ? $elm$core$Maybe$Just(
				'page=' + $elm$core$String$fromInt(params.page)) : $elm$core$Maybe$Nothing,
				(params.pageSize !== 100) ? $elm$core$Maybe$Just(
				'size=' + $elm$core$String$fromInt(params.pageSize)) : $elm$core$Maybe$Nothing,
				(!$elm$core$String$isEmpty(params.search)) ? $elm$core$Maybe$Just(
				'q=' + $elm$url$Url$percentEncode(params.search)) : $elm$core$Maybe$Nothing
			]));
	return $elm$core$List$isEmpty(queryParts) ? '' : ('?' + $elm$core$String$join$('&', queryParts));
};
var $author$project$Route$toString = function (route) {
	switch (route.$) {
		case 'Default':
			return '/';
		case 'Admin':
			switch (route.a.$) {
				case 'AdminDefault':
					var _v1 = route.a;
					return '/admin';
				case 'AdminLogs':
					var params = route.a.a;
					return '/admin/logs' + $author$project$Route$logsParamsToQuery(params);
				default:
					var _v2 = route.a;
					return '/admin/fetch-model';
			}
		case 'Examples':
			return '/examples';
		default:
			return '/not-found';
	}
};
var $author$project$Types$EmailPasswordAuthToBackend = function (a) {
	return {$: 'EmailPasswordAuthToBackend', a: a};
};
var $author$project$Types$EmailPasswordFormSubmit = {$: 'EmailPasswordFormSubmit'};
var $author$project$Types$EmailPasswordLoginToBackend$ = function (a, b) {
	return {$: 'EmailPasswordLoginToBackend', a: a, b: b};
};
var $author$project$Types$EmailPasswordLoginToBackend = F2($author$project$Types$EmailPasswordLoginToBackend$);
var $author$project$Types$EmailPasswordSignupToBackend$ = function (a, b, c) {
	return {$: 'EmailPasswordSignupToBackend', a: a, b: b, c: c};
};
var $author$project$Types$EmailPasswordSignupToBackend = F3($author$project$Types$EmailPasswordSignupToBackend$);
var $author$project$Frontend$updateEmailPasswordForm$ = function (msg, model) {
	switch (msg.$) {
		case 'EmailPasswordFormEmailChanged':
			var email = msg.a;
			return _Utils_update(
				model,
				{email: email, error: $elm$core$Maybe$Nothing});
		case 'EmailPasswordFormPasswordChanged':
			var password = msg.a;
			return _Utils_update(
				model,
				{error: $elm$core$Maybe$Nothing, password: password});
		case 'EmailPasswordFormConfirmPasswordChanged':
			var confirmPassword = msg.a;
			return _Utils_update(
				model,
				{confirmPassword: confirmPassword, error: $elm$core$Maybe$Nothing});
		case 'EmailPasswordFormNameChanged':
			var name = msg.a;
			return _Utils_update(
				model,
				{error: $elm$core$Maybe$Nothing, name: name});
		case 'EmailPasswordFormToggleMode':
			return _Utils_update(
				model,
				{error: $elm$core$Maybe$Nothing, isSignupMode: !model.isSignupMode});
		default:
			return ($elm$core$String$isEmpty(
				$elm$core$String$trim(model.email)) || $elm$core$String$isEmpty(
				$elm$core$String$trim(model.password))) ? _Utils_update(
				model,
				{
					error: $elm$core$Maybe$Just('Please fill in all required fields')
				}) : ((model.isSignupMode && (!_Utils_eq(model.password, model.confirmPassword))) ? _Utils_update(
				model,
				{
					error: $elm$core$Maybe$Just('Passwords do not match')
				}) : model);
	}
};
var $author$project$Frontend$updateEmailPasswordForm = F2($author$project$Frontend$updateEmailPasswordForm$);
var $author$project$Frontend$updateEmailPasswordAuth$ = function (authMsg, model) {
	switch (authMsg.$) {
		case 'EmailPasswordFormMsg':
			var formMsg = authMsg.a;
			var newForm = $author$project$Frontend$updateEmailPasswordForm$(formMsg, model.emailPasswordForm);
			var newModel = (_Utils_eq(formMsg, $author$project$Types$EmailPasswordFormSubmit) && _Utils_eq(newForm.error, $elm$core$Maybe$Nothing)) ? _Utils_update(
				model,
				{
					emailPasswordForm: newForm,
					login: $author$project$Types$NotLogged(true),
					pendingAuth: true
				}) : _Utils_update(
				model,
				{emailPasswordForm: newForm});
			var cmd = function () {
				if (formMsg.$ === 'EmailPasswordFormSubmit') {
					if (_Utils_eq(newForm.error, $elm$core$Maybe$Nothing)) {
						var backendMsg = newForm.isSignupMode ? $author$project$Types$EmailPasswordSignupToBackend$(
							newForm.email,
							newForm.password,
							$elm$core$String$isEmpty(
								$elm$core$String$trim(newForm.name)) ? $elm$core$Maybe$Nothing : $elm$core$Maybe$Just(newForm.name)) : $author$project$Types$EmailPasswordLoginToBackend$(newForm.email, newForm.password);
						return $lamdera$core$Lamdera$sendToBackend(
							$author$project$Types$EmailPasswordAuthToBackend(backendMsg));
					} else {
						return $elm$core$Platform$Cmd$none;
					}
				} else {
					return $elm$core$Platform$Cmd$none;
				}
			}();
			return _Utils_Tuple2(newModel, cmd);
		case 'EmailPasswordLoginRequested':
			var email = authMsg.a;
			var password = authMsg.b;
			return _Utils_Tuple2(
				_Utils_update(
					model,
					{
						login: $author$project$Types$NotLogged(true),
						pendingAuth: true
					}),
				$lamdera$core$Lamdera$sendToBackend(
					$author$project$Types$EmailPasswordAuthToBackend(
						$author$project$Types$EmailPasswordLoginToBackend$(email, password))));
		default:
			var email = authMsg.a;
			var password = authMsg.b;
			var maybeName = authMsg.c;
			return _Utils_Tuple2(
				_Utils_update(
					model,
					{
						login: $author$project$Types$NotLogged(true),
						pendingAuth: true
					}),
				$lamdera$core$Lamdera$sendToBackend(
					$author$project$Types$EmailPasswordAuthToBackend(
						$author$project$Types$EmailPasswordSignupToBackend$(email, password, maybeName))));
	}
};
var $author$project$Frontend$updateEmailPasswordAuth = F2($author$project$Frontend$updateEmailPasswordAuth$);
var $author$project$Frontend$update$ = function (msg, model) {
	switch (msg.$) {
		case 'NoOpFrontendMsg':
			return _Utils_Tuple2(model, $lamdera$program_test$Effect$Command$none);
		case 'UrlRequested':
			var urlRequest = msg.a;
			if (urlRequest.$ === 'Internal') {
				var url = urlRequest.a;
				return _Utils_Tuple2(
					model,
					$lamdera$program_test$Effect$Browser$Navigation$pushUrl$(
						model.key,
						$elm$url$Url$toString(url)));
			} else {
				var url = urlRequest.a;
				return _Utils_Tuple2(
					model,
					$lamdera$program_test$Effect$Browser$Navigation$load(url));
			}
		case 'UrlClicked':
			var urlRequest = msg.a;
			if (urlRequest.$ === 'Internal') {
				var url = urlRequest.a;
				return _Utils_Tuple2(
					model,
					$lamdera$program_test$Effect$Browser$Navigation$pushUrl$(
						model.key,
						$elm$url$Url$toString(url)));
			} else {
				var url = urlRequest.a;
				return _Utils_Tuple2(
					model,
					$lamdera$program_test$Effect$Browser$Navigation$load(url));
			}
		case 'UrlChanged':
			var url = msg.a;
			var newModel = _Utils_update(
				model,
				{
					currentRoute: $author$project$Route$fromUrl(url)
				});
			return $author$project$Frontend$inits$(newModel, newModel.currentRoute);
		case 'DirectToBackend':
			var msg_ = msg.a;
			return _Utils_Tuple2(
				model,
				$lamdera$program_test$Effect$Lamdera$sendToBackend(msg_));
		case 'Admin_RemoteUrlChanged':
			var url = msg.a;
			var oldAdminPage = model.adminPage;
			return _Utils_Tuple2(
				_Utils_update(
					model,
					{
						adminPage: _Utils_update(
							oldAdminPage,
							{remoteUrl: url})
					}),
				$lamdera$program_test$Effect$Command$none);
		case 'Admin_LogsNavigate':
			var params = msg.a;
			return _Utils_Tuple2(
				model,
				$lamdera$program_test$Effect$Browser$Navigation$pushUrl$(
					model.key,
					$author$project$Route$toString(
						$author$project$Types$Admin(
							$author$project$Types$AdminLogs(params)))));
		case 'Logout':
			var cleanForm = {confirmPassword: '', email: '', error: $elm$core$Maybe$Nothing, isSignupMode: false, name: '', password: ''};
			return _Utils_Tuple2(
				_Utils_update(
					model,
					{
						emailPasswordForm: cleanForm,
						login: $author$project$Types$NotLogged(false),
						pendingAuth: false,
						preferences: {darkMode: true}
					}),
				$lamdera$program_test$Effect$Lamdera$sendToBackend($author$project$Types$LoggedOut));
		case 'Auth0SigninRequested':
			return $elm$core$Tuple$mapSecond$(
				A2(
					$elm$core$Basics$composeR,
					$author$project$Types$AuthToBackend,
					A2(
						$elm$core$Basics$composeR,
						$lamdera$core$Lamdera$sendToBackend,
						$lamdera$program_test$Effect$Command$fromCmd('Auth0Signin'))),
				$author$project$Auth$Flow$signInRequested$(
					'OAuthAuth0',
					_Utils_update(
						model,
						{
							login: $author$project$Types$NotLogged(true),
							pendingAuth: true
						}),
					$elm$core$Maybe$Nothing));
		case 'EmailPasswordAuthMsg':
			var authMsg = msg.a;
			return $elm$core$Tuple$mapSecond$(
				$lamdera$program_test$Effect$Command$fromCmd('EmailPasswordAuth'),
				$author$project$Frontend$updateEmailPasswordAuth$(authMsg, model));
		case 'ToggleDarkMode':
			var newDarkModeState = !model.preferences.darkMode;
			var currentFrontendPreferences = model.preferences;
			var updatedFrontendPreferences = _Utils_update(
				currentFrontendPreferences,
				{darkMode: newDarkModeState});
			return _Utils_Tuple2(
				_Utils_update(
					model,
					{preferences: updatedFrontendPreferences}),
				$lamdera$program_test$Effect$Lamdera$sendToBackend(
					$author$project$Types$SetDarkModePreference(newDarkModeState)));
		case 'ToggleProfileDropdown':
			return _Utils_Tuple2(
				_Utils_update(
					model,
					{profileDropdownOpen: !model.profileDropdownOpen}),
				$lamdera$program_test$Effect$Command$none);
		case 'ToggleLoginModal':
			return _Utils_Tuple2(
				_Utils_update(
					model,
					{loginModalOpen: !model.loginModalOpen}),
				$lamdera$program_test$Effect$Command$none);
		case 'CloseLoginModal':
			return _Utils_Tuple2(
				_Utils_update(
					model,
					{loginModalOpen: false}),
				$lamdera$program_test$Effect$Command$none);
		case 'EmailPasswordAuthError':
			var errorMsg = msg.a;
			var updatedForm = function (form) {
				return _Utils_update(
					form,
					{
						error: $elm$core$Maybe$Just(errorMsg)
					});
			}(model.emailPasswordForm);
			return _Utils_Tuple2(
				_Utils_update(
					model,
					{emailPasswordForm: updatedForm, loginModalOpen: true}),
				$lamdera$program_test$Effect$Command$none);
		case 'ConsoleLogClicked':
			return _Utils_Tuple2(
				model,
				$lamdera$program_test$Effect$Command$fromCmd$(
					'ConsoleLog',
					$author$project$Ports$ConsoleLogger$log('Hello from Elm!')));
		case 'ConsoleLogReceived':
			var message = msg.a;
			return _Utils_Tuple2(model, $lamdera$program_test$Effect$Command$none);
		case 'CopyToClipboard':
			var text = msg.a;
			return _Utils_Tuple2(
				model,
				$lamdera$program_test$Effect$Command$fromCmd$(
					'Clipboard',
					$author$project$Ports$Clipboard$copyToClipboard(text)));
		default:
			var result = msg.a;
			return _Utils_Tuple2(model, $lamdera$program_test$Effect$Command$none);
	}
};
var $author$project$Frontend$update = F2($author$project$Frontend$update$);
var $author$project$Types$LoggedIn = function (a) {
	return {$: 'LoggedIn', a: a};
};
var $author$project$Types$EmailPasswordAuthError = function (a) {
	return {$: 'EmailPasswordAuthError', a: a};
};
var $author$project$Types$LoginTokenSent = {$: 'LoginTokenSent'};
var $author$project$Auth$Flow$setAuthFlow$ = function (model, flow) {
	return _Utils_Tuple2(
		_Utils_update(
			model,
			{authFlow: flow}),
		$elm$core$Platform$Cmd$none);
};
var $author$project$Auth$Flow$setAuthFlow = F2($author$project$Auth$Flow$setAuthFlow$);
var $author$project$Auth$Flow$setError$ = function (model, err) {
	return $author$project$Auth$Flow$setAuthFlow$(
		model,
		$author$project$Auth$Common$Errored(err));
};
var $author$project$Auth$Flow$setError = F2($author$project$Auth$Flow$setError$);
var $elm$browser$Browser$Navigation$load = _Browser_load;
var $author$project$Auth$Flow$startProviderSignin$ = function (url, model) {
	return _Utils_Tuple2(
		_Utils_update(
			model,
			{authFlow: $author$project$Auth$Common$Pending}),
		$elm$browser$Browser$Navigation$load(
			$elm$url$Url$toString(url)));
};
var $author$project$Auth$Flow$startProviderSignin = F2($author$project$Auth$Flow$startProviderSignin$);
var $author$project$Frontend$authUpdateFromBackend$ = function (authToFrontendMsg, model) {
	switch (authToFrontendMsg.$) {
		case 'AuthInitiateSignin':
			var url = authToFrontendMsg.a;
			if (model.pendingAuth) {
				var _v1 = $author$project$Auth$Flow$startProviderSignin$(url, model);
				var newModel = _v1.a;
				var cmd = _v1.b;
				return _Utils_Tuple2(
					_Utils_update(
						newModel,
						{login: $author$project$Types$LoginTokenSent, pendingAuth: false}),
					cmd);
			} else {
				return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
			}
		case 'AuthError':
			var err = authToFrontendMsg.a;
			var errorMsg = function () {
				if (err.$ === 'ErrAuthString') {
					var msg = err.a;
					return msg;
				} else {
					return 'Authentication failed';
				}
			}();
			var errorCmd = $elm$core$Task$perform$(
				$elm$core$Basics$identity,
				$elm$core$Task$succeed(
					$author$project$Types$EmailPasswordAuthError(errorMsg)));
			var _v2 = $author$project$Auth$Flow$setError$(model, err);
			var newModel = _v2.a;
			var cmd = _v2.b;
			return _Utils_Tuple2(
				_Utils_update(
					newModel,
					{
						login: $author$project$Types$NotLogged(false),
						pendingAuth: false
					}),
				$elm$core$Platform$Cmd$batch(
					_List_fromArray(
						[cmd, errorCmd])));
		default:
			return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
	}
};
var $author$project$Frontend$authUpdateFromBackend = F2($author$project$Frontend$authUpdateFromBackend$);
var $author$project$Frontend$updateFromBackend$ = function (msg, model) {
	switch (msg.$) {
		case 'NoOpToFrontend':
			return _Utils_Tuple2(model, $lamdera$program_test$Effect$Command$none);
		case 'Admin_Logs_ToFrontend':
			var logs = msg.a;
			var oldAdminPage = model.adminPage;
			return _Utils_Tuple2(
				_Utils_update(
					model,
					{
						adminPage: _Utils_update(
							oldAdminPage,
							{logs: logs})
					}),
				$lamdera$program_test$Effect$Command$none);
		case 'AuthToFrontend':
			var authToFrontendMsg = msg.a;
			return $elm$core$Tuple$mapSecond$(
				$lamdera$program_test$Effect$Command$fromCmd('AuthToFrontend'),
				$author$project$Frontend$authUpdateFromBackend$(authToFrontendMsg, model));
		case 'AuthSuccess':
			var userInfo = msg.a;
			return _Utils_Tuple2(
				_Utils_update(
					model,
					{
						login: $author$project$Types$LoggedIn(userInfo),
						loginModalOpen: false,
						pendingAuth: false
					}),
				$lamdera$program_test$Effect$Command$batch(
					_List_fromArray(
						[
							$lamdera$program_test$Effect$Lamdera$sendToBackend($author$project$Types$GetUserToBackend),
							$lamdera$program_test$Effect$Browser$Navigation$pushUrl$(model.key, '/')
						])));
		case 'UserInfoMsg':
			var mUserinfo = msg.a;
			if (mUserinfo.$ === 'Just') {
				var userInfo = mUserinfo.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							login: $author$project$Types$LoggedIn(userInfo),
							pendingAuth: false
						}),
					$lamdera$program_test$Effect$Command$none);
			} else {
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							login: $author$project$Types$NotLogged(false),
							pendingAuth: false,
							preferences: {darkMode: true}
						}),
					$lamdera$program_test$Effect$Command$none);
			}
		case 'UserDataToFrontend':
			var currentUser = msg.a;
			return _Utils_Tuple2(
				_Utils_update(
					model,
					{
						currentUser: $elm$core$Maybe$Just(currentUser),
						preferences: currentUser.preferences
					}),
				$lamdera$program_test$Effect$Command$none);
		case 'PermissionDenied':
			return _Utils_Tuple2(model, $lamdera$program_test$Effect$Command$none);
		default:
			var message = msg.a;
			return _Utils_Tuple2(model, $lamdera$program_test$Effect$Command$none);
	}
};
var $author$project$Frontend$updateFromBackend = F2($author$project$Frontend$updateFromBackend$);
var $author$project$Types$Auth0SigninRequested = {$: 'Auth0SigninRequested'};
var $author$project$Types$CloseLoginModal = {$: 'CloseLoginModal'};
var $author$project$Types$EmailPasswordAuthMsg = function (a) {
	return {$: 'EmailPasswordAuthMsg', a: a};
};
var $author$project$Types$NoOpFrontendMsg = {$: 'NoOpFrontendMsg'};
var $elm$html$Html$Attributes$class = $elm$html$Html$Attributes$stringProperty('className');
var $author$project$Theme$darkColors = {accent: '#E8D5BB', activeTabText: '#E8D5BB', border: 'rgba(207, 183, 147, 0.3)', buttonBg: '#CFB793', buttonHoverBg: '#E8D5BB', buttonText: '#1A1F26', dangerBg: '#E57373', dangerHoverBg: '#EF5350', dangerText: '#E57373', headerBg: '#263745', headerBorder: '#2F3D4D', headerText: '#F2ECE4', inactiveTabText: '#8B9AAB', primaryBg: '#1A1F26', primaryText: '#F2ECE4', secondaryBg: '#263745', secondaryText: '#CFB793', successBg: '#4CAF50'};
var $author$project$Theme$lightColors = {accent: '#CFB793', activeTabText: '#CFB793', border: 'rgba(0, 0, 0, 0.15)', buttonBg: '#CFB793', buttonHoverBg: '#BEA682', buttonText: '#263745', dangerBg: '#FF0000', dangerHoverBg: '#CC0000', dangerText: '#FF0000', headerBg: '#FFFFFF', headerBorder: '#D9D9D9', headerText: '#263745', inactiveTabText: '#B3B3B3', primaryBg: '#F2ECE4', primaryText: '#263745', secondaryBg: '#FFFFFF', secondaryText: '#4A5568', successBg: '#48bb78'};
var $author$project$Theme$getColors = function (isDarkMode) {
	return isDarkMode ? $author$project$Theme$darkColors : $author$project$Theme$lightColors;
};
var $elm$virtual_dom$VirtualDom$style = _VirtualDom_style;
var $elm$html$Html$Attributes$style = $elm$virtual_dom$VirtualDom$style;
var $author$project$Theme$primaryBg = function (isDarkMode) {
	return A2(
		$elm$html$Html$Attributes$style,
		'background-color',
		$author$project$Theme$getColors(isDarkMode).primaryBg);
};
var $author$project$Theme$primaryText = function (isDarkMode) {
	return A2(
		$elm$html$Html$Attributes$style,
		'color',
		$author$project$Theme$getColors(isDarkMode).primaryText);
};
var $author$project$Types$EmailPasswordFormConfirmPasswordChanged = function (a) {
	return {$: 'EmailPasswordFormConfirmPasswordChanged', a: a};
};
var $author$project$Types$EmailPasswordFormEmailChanged = function (a) {
	return {$: 'EmailPasswordFormEmailChanged', a: a};
};
var $author$project$Types$EmailPasswordFormMsg = function (a) {
	return {$: 'EmailPasswordFormMsg', a: a};
};
var $author$project$Types$EmailPasswordFormNameChanged = function (a) {
	return {$: 'EmailPasswordFormNameChanged', a: a};
};
var $author$project$Types$EmailPasswordFormPasswordChanged = function (a) {
	return {$: 'EmailPasswordFormPasswordChanged', a: a};
};
var $author$project$Types$EmailPasswordFormToggleMode = {$: 'EmailPasswordFormToggleMode'};
var $elm$html$Html$button = _VirtualDom_node('button');
var $elm$html$Html$h2 = _VirtualDom_node('h2');
var $elm$html$Html$hr = _VirtualDom_node('hr');
var $elm$html$Html$Attributes$alt = $elm$html$Html$Attributes$stringProperty('alt');
var $elm$html$Html$Attributes$boolProperty$ = function (key, bool) {
	return A2(
		_VirtualDom_property,
		key,
		$elm$json$Json$Encode$bool(bool));
};
var $elm$html$Html$Attributes$boolProperty = F2($elm$html$Html$Attributes$boolProperty$);
var $elm$html$Html$Attributes$disabled = $elm$html$Html$Attributes$boolProperty('disabled');
var $elm$html$Html$img = _VirtualDom_node('img');
var $elm$virtual_dom$VirtualDom$on = _VirtualDom_on;
var $elm$html$Html$Events$on$ = function (event, decoder) {
	return A2(
		$elm$virtual_dom$VirtualDom$on,
		event,
		$elm$virtual_dom$VirtualDom$Normal(decoder));
};
var $elm$html$Html$Events$on = F2($elm$html$Html$Events$on$);
var $elm$html$Html$Events$onClick = function (msg) {
	return $elm$html$Html$Events$on$(
		'click',
		$elm$json$Json$Decode$succeed(msg));
};
var $elm$html$Html$Attributes$src = function (url) {
	return $elm$html$Html$Attributes$stringProperty$(
		'src',
		_VirtualDom_noJavaScriptOrHtmlUri(url));
};
var $elm$virtual_dom$VirtualDom$text = _VirtualDom_text;
var $elm$html$Html$text = $elm$virtual_dom$VirtualDom$text;
var $author$project$Components$LoginModal$oauthButtonWithIcon$ = function (config, label, onClickMsg, backgroundColor, iconSrc) {
	var textColor = config.colors.primaryText;
	var opacity = config.isAuthenticating ? '0.7' : '1';
	var cursor = config.isAuthenticating ? 'not-allowed' : 'pointer';
	var buttonText = config.isAuthenticating ? 'Authenticating...' : label;
	var borderStyle = '1px solid ' + config.colors.border;
	return A2(
		$elm$html$Html$button,
		_List_fromArray(
			[
				$elm$html$Html$Events$onClick(
				config.isAuthenticating ? config.onNoOp : onClickMsg),
				$elm$html$Html$Attributes$class('w-full flex items-center justify-center px-4 py-3 rounded-lg transition-all font-medium'),
				A2($elm$html$Html$Attributes$style, 'background-color', backgroundColor),
				A2($elm$html$Html$Attributes$style, 'color', textColor),
				A2($elm$html$Html$Attributes$style, 'border', borderStyle),
				A2($elm$html$Html$Attributes$style, 'cursor', cursor),
				A2($elm$html$Html$Attributes$style, 'opacity', opacity),
				A2($elm$html$Html$Attributes$style, 'hover:opacity', '0.95'),
				$elm$html$Html$Attributes$disabled(config.isAuthenticating)
			]),
		_List_fromArray(
			[
				A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('flex items-center justify-center space-x-2')
					]),
				_List_fromArray(
					[
						(!config.isAuthenticating) ? A2(
						$elm$html$Html$img,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$src(iconSrc),
								A2($elm$html$Html$Attributes$style, 'width', '18px'),
								A2($elm$html$Html$Attributes$style, 'height', '18px'),
								$elm$html$Html$Attributes$alt('Google logo')
							]),
						_List_Nil) : $elm$html$Html$text(''),
						$elm$html$Html$text(buttonText)
					]))
			]));
};
var $author$project$Components$LoginModal$oauthButtonWithIcon = F5($author$project$Components$LoginModal$oauthButtonWithIcon$);
var $elm$html$Html$p = _VirtualDom_node('p');
var $elm$html$Html$Events$stopPropagationOn$ = function (event, decoder) {
	return A2(
		$elm$virtual_dom$VirtualDom$on,
		event,
		$elm$virtual_dom$VirtualDom$MayStopPropagation(decoder));
};
var $elm$html$Html$Events$stopPropagationOn = F2($elm$html$Html$Events$stopPropagationOn$);
var $elm$html$Html$form = _VirtualDom_node('form');
var $elm$html$Html$h3 = _VirtualDom_node('h3');
var $elm$html$Html$input = _VirtualDom_node('input');
var $author$project$Components$EmailPasswordForm$inputStyles = function (colors) {
	return _List_fromArray(
		[
			A2($elm$html$Html$Attributes$style, 'padding', '0.75rem'),
			A2($elm$html$Html$Attributes$style, 'border', '1px solid ' + colors.border),
			A2($elm$html$Html$Attributes$style, 'border-radius', '4px'),
			A2($elm$html$Html$Attributes$style, 'background-color', colors.primaryBg),
			A2($elm$html$Html$Attributes$style, 'color', colors.primaryText),
			A2($elm$html$Html$Attributes$style, 'width', '100%')
		]);
};
var $elm$html$Html$Events$alwaysStop = function (x) {
	return _Utils_Tuple2(x, true);
};
var $elm$html$Html$Events$targetValue = $elm$json$Json$Decode$at$(
	_List_fromArray(
		['target', 'value']),
	$elm$json$Json$Decode$string);
var $elm$html$Html$Events$onInput = function (tagger) {
	return $elm$html$Html$Events$stopPropagationOn$(
		'input',
		A2(
			$elm$json$Json$Decode$map,
			$elm$html$Html$Events$alwaysStop,
			A2($elm$json$Json$Decode$map, tagger, $elm$html$Html$Events$targetValue)));
};
var $elm$html$Html$Attributes$placeholder = $elm$html$Html$Attributes$stringProperty('placeholder');
var $elm$html$Html$Events$preventDefaultOn$ = function (event, decoder) {
	return A2(
		$elm$virtual_dom$VirtualDom$on,
		event,
		$elm$virtual_dom$VirtualDom$MayPreventDefault(decoder));
};
var $elm$html$Html$Events$preventDefaultOn = F2($elm$html$Html$Events$preventDefaultOn$);
var $elm$html$Html$Attributes$required = $elm$html$Html$Attributes$boolProperty('required');
var $elm$html$Html$Attributes$type_ = $elm$html$Html$Attributes$stringProperty('type');
var $elm$html$Html$Attributes$value = $elm$html$Html$Attributes$stringProperty('value');
var $author$project$Components$EmailPasswordForm$view = function (config) {
	return A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				A2($elm$html$Html$Attributes$style, 'width', '100%')
			]),
		_List_fromArray(
			[
				A2(
				$elm$html$Html$h3,
				_List_fromArray(
					[
						A2($elm$html$Html$Attributes$style, 'text-align', 'center'),
						A2($elm$html$Html$Attributes$style, 'color', config.colors.primaryText),
						A2($elm$html$Html$Attributes$style, 'margin-bottom', '1rem'),
						A2($elm$html$Html$Attributes$style, 'margin-top', '0'),
						A2($elm$html$Html$Attributes$style, 'font-size', '1.25rem'),
						A2($elm$html$Html$Attributes$style, 'font-weight', '600')
					]),
				_List_fromArray(
					[
						$elm$html$Html$text(
						config.formModel.isSignupMode ? 'Create Account' : 'Sign In')
					])),
				A2(
				$elm$html$Html$form,
				_List_fromArray(
					[
						$elm$html$Html$Events$preventDefaultOn$(
						'submit',
						$elm$json$Json$Decode$succeed(
							_Utils_Tuple2(config.onSubmit, true))),
						A2($elm$html$Html$Attributes$style, 'display', 'flex'),
						A2($elm$html$Html$Attributes$style, 'flex-direction', 'column'),
						A2($elm$html$Html$Attributes$style, 'gap', '1rem')
					]),
				_List_fromArray(
					[
						config.formModel.isSignupMode ? A2(
						$elm$html$Html$input,
						_Utils_ap(
							_List_fromArray(
								[
									$elm$html$Html$Attributes$type_('text'),
									$elm$html$Html$Attributes$placeholder('Full Name (optional)'),
									$elm$html$Html$Attributes$value(config.formModel.name),
									$elm$html$Html$Events$onInput(config.onNameChange)
								]),
							$author$project$Components$EmailPasswordForm$inputStyles(config.colors)),
						_List_Nil) : $elm$html$Html$text(''),
						A2(
						$elm$html$Html$input,
						_Utils_ap(
							_List_fromArray(
								[
									$elm$html$Html$Attributes$type_('email'),
									$elm$html$Html$Attributes$placeholder('Email'),
									$elm$html$Html$Attributes$value(config.formModel.email),
									$elm$html$Html$Events$onInput(config.onEmailChange),
									$elm$html$Html$Attributes$required(true)
								]),
							$author$project$Components$EmailPasswordForm$inputStyles(config.colors)),
						_List_Nil),
						A2(
						$elm$html$Html$input,
						_Utils_ap(
							_List_fromArray(
								[
									$elm$html$Html$Attributes$type_('password'),
									$elm$html$Html$Attributes$placeholder('Password'),
									$elm$html$Html$Attributes$value(config.formModel.password),
									$elm$html$Html$Events$onInput(config.onPasswordChange),
									$elm$html$Html$Attributes$required(true)
								]),
							$author$project$Components$EmailPasswordForm$inputStyles(config.colors)),
						_List_Nil),
						config.formModel.isSignupMode ? A2(
						$elm$html$Html$input,
						_Utils_ap(
							_List_fromArray(
								[
									$elm$html$Html$Attributes$type_('password'),
									$elm$html$Html$Attributes$placeholder('Confirm Password'),
									$elm$html$Html$Attributes$value(config.formModel.confirmPassword),
									$elm$html$Html$Events$onInput(config.onConfirmPasswordChange),
									$elm$html$Html$Attributes$required(true)
								]),
							$author$project$Components$EmailPasswordForm$inputStyles(config.colors)),
						_List_Nil) : $elm$html$Html$text(''),
						function () {
						var _v0 = config.formModel.error;
						if (_v0.$ === 'Just') {
							var errorMsg = _v0.a;
							return A2(
								$elm$html$Html$p,
								_List_fromArray(
									[
										A2($elm$html$Html$Attributes$style, 'color', config.colors.dangerBg),
										A2($elm$html$Html$Attributes$style, 'font-size', '0.875rem'),
										A2($elm$html$Html$Attributes$style, 'margin', '0'),
										A2($elm$html$Html$Attributes$style, 'text-align', 'center')
									]),
								_List_fromArray(
									[
										$elm$html$Html$text(errorMsg)
									]));
						} else {
							return $elm$html$Html$text('');
						}
					}(),
						A2(
						$elm$html$Html$button,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$type_('submit'),
								A2($elm$html$Html$Attributes$style, 'padding', '0.75rem'),
								A2($elm$html$Html$Attributes$style, 'background-color', '#38a169'),
								A2($elm$html$Html$Attributes$style, 'color', '#ffffff'),
								A2($elm$html$Html$Attributes$style, 'border', 'none'),
								A2($elm$html$Html$Attributes$style, 'border-radius', '4px'),
								A2($elm$html$Html$Attributes$style, 'cursor', 'pointer')
							]),
						_List_fromArray(
							[
								$elm$html$Html$text(
								config.formModel.isSignupMode ? 'Sign Up' : 'Login')
							]))
					])),
				A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						A2($elm$html$Html$Attributes$style, 'text-align', 'center'),
						A2($elm$html$Html$Attributes$style, 'margin-top', '1rem')
					]),
				_List_fromArray(
					[
						A2(
						$elm$html$Html$p,
						_List_fromArray(
							[
								A2($elm$html$Html$Attributes$style, 'color', config.colors.secondaryText)
							]),
						_List_fromArray(
							[
								$elm$html$Html$text(
								config.formModel.isSignupMode ? 'Already have an account?' : 'Don\'t have an account?'),
								$elm$html$Html$text(' '),
								A2(
								$elm$html$Html$button,
								_List_fromArray(
									[
										$elm$html$Html$Events$onClick(config.onToggleMode),
										$elm$html$Html$Attributes$type_('button'),
										A2($elm$html$Html$Attributes$style, 'color', '#38a169'),
										A2($elm$html$Html$Attributes$style, 'cursor', 'pointer'),
										A2($elm$html$Html$Attributes$style, 'text-decoration', 'underline'),
										A2($elm$html$Html$Attributes$style, 'background', 'none'),
										A2($elm$html$Html$Attributes$style, 'border', 'none'),
										A2($elm$html$Html$Attributes$style, 'padding', '0'),
										A2($elm$html$Html$Attributes$style, 'font', 'inherit')
									]),
								_List_fromArray(
									[
										$elm$html$Html$text(
										config.formModel.isSignupMode ? 'Login' : 'Sign Up')
									]))
							]))
					]))
			]));
};
var $author$project$Components$LoginModal$view = function (config) {
	return config.isOpen ? A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$class('fixed inset-0 z-50 flex items-center justify-center'),
				A2($elm$html$Html$Attributes$style, 'background-color', 'rgba(0, 0, 0, 0.5)'),
				$elm$html$Html$Events$onClick(config.onClose)
			]),
		_List_fromArray(
			[
				A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('relative max-w-md w-full mx-4'),
						A2($elm$html$Html$Attributes$style, 'background-color', config.colors.primaryBg),
						A2($elm$html$Html$Attributes$style, 'border-radius', '12px'),
						A2($elm$html$Html$Attributes$style, 'border', '1px solid ' + config.colors.border),
						A2($elm$html$Html$Attributes$style, 'box-shadow', '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'),
						A2($elm$html$Html$Attributes$style, 'max-height', '90vh'),
						A2($elm$html$Html$Attributes$style, 'overflow-y', 'auto'),
						$elm$html$Html$Events$stopPropagationOn$(
						'click',
						$elm$json$Json$Decode$succeed(
							_Utils_Tuple2(config.onNoOp, true)))
					]),
				_List_fromArray(
					[
						A2(
						$elm$html$Html$div,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('p-6 pb-4')
							]),
						_List_fromArray(
							[
								A2(
								$elm$html$Html$div,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$class('flex items-center justify-between')
									]),
								_List_fromArray(
									[
										A2(
										$elm$html$Html$h2,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$class('text-xl font-semibold'),
												A2($elm$html$Html$Attributes$style, 'color', config.colors.primaryText)
											]),
										_List_fromArray(
											[
												$elm$html$Html$text('Sign In')
											])),
										A2(
										$elm$html$Html$button,
										_List_fromArray(
											[
												$elm$html$Html$Events$onClick(config.onClose),
												$elm$html$Html$Attributes$class('text-gray-400 hover:text-gray-600 transition-colors'),
												A2($elm$html$Html$Attributes$style, 'font-size', '24px'),
												A2($elm$html$Html$Attributes$style, 'line-height', '1'),
												A2($elm$html$Html$Attributes$style, 'background', 'none'),
												A2($elm$html$Html$Attributes$style, 'border', 'none'),
												A2($elm$html$Html$Attributes$style, 'cursor', 'pointer')
											]),
										_List_fromArray(
											[
												$elm$html$Html$text('×')
											]))
									]))
							])),
						A2(
						$elm$html$Html$div,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('px-6 pb-4')
							]),
						_List_fromArray(
							[
								$author$project$Components$EmailPasswordForm$view(
								{
									colors: config.colors,
									formModel: config.emailPasswordForm,
									onConfirmPasswordChange: A2(
										$elm$core$Basics$composeR,
										$author$project$Types$EmailPasswordFormConfirmPasswordChanged,
										A2($elm$core$Basics$composeR, $author$project$Types$EmailPasswordFormMsg, config.onEmailPasswordMsg)),
									onEmailChange: A2(
										$elm$core$Basics$composeR,
										$author$project$Types$EmailPasswordFormEmailChanged,
										A2($elm$core$Basics$composeR, $author$project$Types$EmailPasswordFormMsg, config.onEmailPasswordMsg)),
									onNameChange: A2(
										$elm$core$Basics$composeR,
										$author$project$Types$EmailPasswordFormNameChanged,
										A2($elm$core$Basics$composeR, $author$project$Types$EmailPasswordFormMsg, config.onEmailPasswordMsg)),
									onPasswordChange: A2(
										$elm$core$Basics$composeR,
										$author$project$Types$EmailPasswordFormPasswordChanged,
										A2($elm$core$Basics$composeR, $author$project$Types$EmailPasswordFormMsg, config.onEmailPasswordMsg)),
									onSubmit: config.onEmailPasswordMsg(
										$author$project$Types$EmailPasswordFormMsg($author$project$Types$EmailPasswordFormSubmit)),
									onToggleMode: config.onEmailPasswordMsg(
										$author$project$Types$EmailPasswordFormMsg($author$project$Types$EmailPasswordFormToggleMode))
								})
							])),
						A2(
						$elm$html$Html$div,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('px-6 py-4')
							]),
						_List_fromArray(
							[
								A2(
								$elm$html$Html$div,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$class('relative')
									]),
								_List_fromArray(
									[
										A2(
										$elm$html$Html$hr,
										_List_fromArray(
											[
												A2($elm$html$Html$Attributes$style, 'border-color', config.colors.border)
											]),
										_List_Nil),
										A2(
										$elm$html$Html$div,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$class('absolute inset-0 flex justify-center'),
												A2($elm$html$Html$Attributes$style, 'top', '-10px')
											]),
										_List_fromArray(
											[
												A2(
												$elm$html$Html$div,
												_List_fromArray(
													[
														$elm$html$Html$Attributes$class('px-3 text-sm'),
														A2($elm$html$Html$Attributes$style, 'background-color', config.colors.primaryBg),
														A2($elm$html$Html$Attributes$style, 'color', config.colors.secondaryText)
													]),
												_List_fromArray(
													[
														$elm$html$Html$text('or')
													]))
											]))
									]))
							])),
						A2(
						$elm$html$Html$div,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('px-6 pb-6')
							]),
						_List_fromArray(
							[
								A2(
								$elm$html$Html$p,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$class('text-sm mb-4'),
										A2($elm$html$Html$Attributes$style, 'color', config.colors.secondaryText)
									]),
								_List_fromArray(
									[
										$elm$html$Html$text('Sign in with your social account')
									])),
								A2(
								$elm$html$Html$div,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$class('space-y-3')
									]),
								_List_fromArray(
									[
										$author$project$Components$LoginModal$oauthButtonWithIcon$(config, 'Continue with Google', config.onAuth0Login, config.colors.secondaryBg, '/google-logo.svg')
									]))
							]))
					]))
			])) : $elm$html$Html$text('');
};
var $elm$html$Html$h1 = _VirtualDom_node('h1');
var $elm$html$Html$a = _VirtualDom_node('a');
var $author$project$Pages$Admin$viewLogin$ = function (_v0, colors) {
	return A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$class('min-h-screen flex items-center justify-center'),
				A2($elm$html$Html$Attributes$style, 'background-color', colors.primaryBg)
			]),
		_List_fromArray(
			[
				A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('p-8 rounded-lg shadow-md w-96'),
						A2($elm$html$Html$Attributes$style, 'background-color', colors.secondaryBg)
					]),
				_List_fromArray(
					[
						A2(
						$elm$html$Html$h2,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('text-2xl font-bold mb-4'),
								A2($elm$html$Html$Attributes$style, 'color', colors.primaryText)
							]),
						_List_fromArray(
							[
								$elm$html$Html$text('Admin Login Required')
							])),
						A2(
						$elm$html$Html$p,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('mb-4'),
								A2($elm$html$Html$Attributes$style, 'color', colors.secondaryText)
							]),
						_List_fromArray(
							[
								$elm$html$Html$text('Please log in to access the admin area.')
							])),
						A2(
						$elm$html$Html$button,
						_List_fromArray(
							[
								$elm$html$Html$Events$onClick($author$project$Types$Auth0SigninRequested),
								$elm$html$Html$Attributes$class('w-full py-2 px-4 rounded mb-2'),
								A2($elm$html$Html$Attributes$style, 'background-color', colors.buttonBg),
								A2($elm$html$Html$Attributes$style, 'color', colors.buttonText)
							]),
						_List_fromArray(
							[
								$elm$html$Html$text('Login')
							])),
						A2(
						$elm$html$Html$a,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$href('/'),
								$elm$html$Html$Attributes$class('block text-center hover:underline'),
								A2($elm$html$Html$Attributes$style, 'color', colors.accent)
							]),
						_List_fromArray(
							[
								$elm$html$Html$text('Return to Home')
							]))
					]))
			]));
};
var $author$project$Pages$Admin$viewLogin = F2($author$project$Pages$Admin$viewLogin$);
var $author$project$Types$Logout = {$: 'Logout'};
var $author$project$Pages$Admin$viewNoAccess$ = function (_v0, colors) {
	return A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$class('min-h-screen flex items-center justify-center'),
				A2($elm$html$Html$Attributes$style, 'background-color', colors.primaryBg)
			]),
		_List_fromArray(
			[
				A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('p-8 rounded-lg shadow-md w-96'),
						A2($elm$html$Html$Attributes$style, 'background-color', colors.secondaryBg)
					]),
				_List_fromArray(
					[
						A2(
						$elm$html$Html$h2,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('text-2xl font-bold mb-4'),
								A2($elm$html$Html$Attributes$style, 'color', colors.primaryText)
							]),
						_List_fromArray(
							[
								$elm$html$Html$text('Access Denied')
							])),
						A2(
						$elm$html$Html$p,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('mb-4'),
								A2($elm$html$Html$Attributes$style, 'color', colors.dangerBg)
							]),
						_List_fromArray(
							[
								$elm$html$Html$text('Your account does not have administrative privileges.')
							])),
						A2(
						$elm$html$Html$button,
						_List_fromArray(
							[
								$elm$html$Html$Events$onClick($author$project$Types$Logout),
								$elm$html$Html$Attributes$class('w-full py-2 px-4 rounded mb-2'),
								A2($elm$html$Html$Attributes$style, 'background-color', colors.buttonBg),
								A2($elm$html$Html$Attributes$style, 'color', colors.buttonText)
							]),
						_List_fromArray(
							[
								$elm$html$Html$text('Logout')
							])),
						A2(
						$elm$html$Html$a,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$href('/'),
								$elm$html$Html$Attributes$class('block text-center hover:underline'),
								A2($elm$html$Html$Attributes$style, 'color', colors.accent)
							]),
						_List_fromArray(
							[
								$elm$html$Html$text('Return to Home')
							]))
					]))
			]));
};
var $author$project$Pages$Admin$viewNoAccess = F2($author$project$Pages$Admin$viewNoAccess$);
var $author$project$Pages$Admin$viewDefaultTab$ = function (_v0, colors) {
	return A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$class('p-4 rounded-lg shadow'),
				A2($elm$html$Html$Attributes$style, 'background-color', colors.secondaryBg)
			]),
		_List_fromArray(
			[
				A2(
				$elm$html$Html$h2,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('text-xl font-bold mb-4'),
						A2($elm$html$Html$Attributes$style, 'color', colors.primaryText)
					]),
				_List_fromArray(
					[
						$elm$html$Html$text('Default Admin')
					])),
				A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						A2($elm$html$Html$Attributes$style, 'color', colors.primaryText)
					]),
				_List_fromArray(
					[
						$elm$html$Html$text('Default admin content')
					]))
			]));
};
var $author$project$Pages$Admin$viewDefaultTab = F2($author$project$Pages$Admin$viewDefaultTab$);
var $author$project$Types$Admin_FetchRemoteModel = function (a) {
	return {$: 'Admin_FetchRemoteModel', a: a};
};
var $author$project$Types$Admin_RemoteUrlChanged = function (a) {
	return {$: 'Admin_RemoteUrlChanged', a: a};
};
var $author$project$Types$DirectToBackend = function (a) {
	return {$: 'DirectToBackend', a: a};
};
var $elm$html$Html$label = _VirtualDom_node('label');
var $author$project$Pages$Admin$viewFetchModelTab$ = function (model, colors) {
	return A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$class('p-4 rounded-lg shadow'),
				A2($elm$html$Html$Attributes$style, 'background-color', colors.secondaryBg)
			]),
		_List_fromArray(
			[
				A2(
				$elm$html$Html$h2,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('text-xl font-bold mb-4'),
						A2($elm$html$Html$Attributes$style, 'color', colors.primaryText)
					]),
				_List_fromArray(
					[
						$elm$html$Html$text('Fetch Model')
					])),
				A2(
				$elm$html$Html$div,
				_List_Nil,
				_List_fromArray(
					[
						A2(
						$elm$html$Html$div,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('mb-4')
							]),
						_List_fromArray(
							[
								A2(
								$elm$html$Html$label,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$class('block text-sm font-bold mb-2'),
										A2($elm$html$Html$Attributes$style, 'color', colors.primaryText)
									]),
								_List_fromArray(
									[
										$elm$html$Html$text('Remote URL')
									])),
								A2(
								$elm$html$Html$input,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$type_('text'),
										$elm$html$Html$Attributes$placeholder('Enter remote URL'),
										$elm$html$Html$Attributes$value(model.adminPage.remoteUrl),
										$elm$html$Html$Events$onInput($author$project$Types$Admin_RemoteUrlChanged),
										$elm$html$Html$Attributes$class('shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline'),
										A2($elm$html$Html$Attributes$style, 'color', colors.primaryText),
										A2($elm$html$Html$Attributes$style, 'background-color', colors.primaryBg),
										A2($elm$html$Html$Attributes$style, 'border-color', colors.border)
									]),
								_List_Nil)
							])),
						A2(
						$elm$html$Html$button,
						_List_fromArray(
							[
								$elm$html$Html$Events$onClick(
								$author$project$Types$DirectToBackend(
									$author$project$Types$Admin_FetchRemoteModel(model.adminPage.remoteUrl))),
								$elm$html$Html$Attributes$class('font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'),
								A2($elm$html$Html$Attributes$style, 'background-color', colors.buttonBg),
								A2($elm$html$Html$Attributes$style, 'color', colors.buttonText)
							]),
						_List_fromArray(
							[
								$elm$html$Html$text('Fetch Model')
							]))
					]))
			]));
};
var $author$project$Pages$Admin$viewFetchModelTab = F2($author$project$Pages$Admin$viewFetchModelTab$);
var $author$project$Types$Admin_ClearLogs = {$: 'Admin_ClearLogs'};
var $author$project$Types$Admin_LogsNavigate = function (a) {
	return {$: 'Admin_LogsNavigate', a: a};
};
var $elm$core$Basics$min$ = function (x, y) {
	return (_Utils_cmp(x, y) < 0) ? x : y;
};
var $elm$core$Basics$min = F2($elm$core$Basics$min$);
var $elm$html$Html$option = _VirtualDom_node('option');
var $elm$html$Html$select = _VirtualDom_node('select');
var $elm$html$Html$Attributes$selected = $elm$html$Html$Attributes$boolProperty('selected');
var $elm$html$Html$span = _VirtualDom_node('span');
var $elm$core$String$padLeft$ = function (n, _char, string) {
	return _Utils_ap(
		$elm$core$String$repeat$(
			n - $elm$core$String$length(string),
			$elm$core$String$fromChar(_char)),
		string);
};
var $elm$core$String$padLeft = F3($elm$core$String$padLeft$);
var $elm$time$Time$flooredDiv$ = function (numerator, denominator) {
	return $elm$core$Basics$floor(numerator / denominator);
};
var $elm$time$Time$flooredDiv = F2($elm$time$Time$flooredDiv$);
var $elm$time$Time$toAdjustedMinutesHelp$ = function (defaultOffset, posixMinutes, eras) {
	toAdjustedMinutesHelp:
	while (true) {
		if (!eras.b) {
			return posixMinutes + defaultOffset;
		} else {
			var era = eras.a;
			var olderEras = eras.b;
			if (_Utils_cmp(era.start, posixMinutes) < 0) {
				return posixMinutes + era.offset;
			} else {
				var $temp$eras = olderEras;
				eras = $temp$eras;
				continue toAdjustedMinutesHelp;
			}
		}
	}
};
var $elm$time$Time$toAdjustedMinutesHelp = F3($elm$time$Time$toAdjustedMinutesHelp$);
var $elm$time$Time$toAdjustedMinutes$ = function (_v0, time) {
	var defaultOffset = _v0.a;
	var eras = _v0.b;
	return $elm$time$Time$toAdjustedMinutesHelp$(
		defaultOffset,
		$elm$time$Time$flooredDiv$(
			$elm$time$Time$posixToMillis(time),
			60000),
		eras);
};
var $elm$time$Time$toAdjustedMinutes = F2($elm$time$Time$toAdjustedMinutes$);
var $elm$time$Time$toHour$ = function (zone, time) {
	return A2(
		$elm$core$Basics$modBy,
		24,
		$elm$time$Time$flooredDiv$(
			$elm$time$Time$toAdjustedMinutes$(zone, time),
			60));
};
var $elm$time$Time$toHour = F2($elm$time$Time$toHour$);
var $elm$time$Time$toMinute$ = function (zone, time) {
	return A2(
		$elm$core$Basics$modBy,
		60,
		$elm$time$Time$toAdjustedMinutes$(zone, time));
};
var $elm$time$Time$toMinute = F2($elm$time$Time$toMinute$);
var $elm$time$Time$toSecond$ = function (_v0, time) {
	return A2(
		$elm$core$Basics$modBy,
		60,
		$elm$time$Time$flooredDiv$(
			$elm$time$Time$posixToMillis(time),
			1000));
};
var $elm$time$Time$toSecond = F2($elm$time$Time$toSecond$);
var $author$project$Pages$Admin$formatTimestamp = function (millis) {
	var posix = $elm$time$Time$millisToPosix(millis);
	var seconds = $elm$core$String$padLeft$(
		2,
		_Utils_chr('0'),
		$elm$core$String$fromInt(
			$elm$time$Time$toSecond$($elm$time$Time$utc, posix)));
	var minutes = $elm$core$String$padLeft$(
		2,
		_Utils_chr('0'),
		$elm$core$String$fromInt(
			$elm$time$Time$toMinute$($elm$time$Time$utc, posix)));
	var hours = $elm$core$String$padLeft$(
		2,
		_Utils_chr('0'),
		$elm$core$String$fromInt(
			$elm$time$Time$toHour$($elm$time$Time$utc, posix)));
	return hours + (':' + (minutes + (':' + seconds)));
};
var $author$project$Pages$Admin$viewLogEntry = function (entry) {
	var timestamp = (entry.timestamp > 0) ? $author$project$Pages$Admin$formatTimestamp(entry.timestamp) : '...';
	var levelText = $author$project$Logger$levelToString(entry.level);
	var levelColor = function () {
		var _v0 = entry.level;
		switch (_v0.$) {
			case 'Debug':
				return '#718096';
			case 'Info':
				return '#4299e1';
			case 'Warn':
				return '#ecc94b';
			default:
				return '#fc8181';
		}
	}();
	return A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$class('flex gap-2 py-0.5')
			]),
		_List_fromArray(
			[
				A2(
				$elm$html$Html$span,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('text-gray-600 w-12 text-right shrink-0')
					]),
				_List_fromArray(
					[
						$elm$html$Html$text(
						$elm$core$String$fromInt(entry.index))
					])),
				A2(
				$elm$html$Html$span,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('text-gray-500 w-20 shrink-0')
					]),
				_List_fromArray(
					[
						$elm$html$Html$text(timestamp)
					])),
				A2(
				$elm$html$Html$span,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('w-14 shrink-0 font-semibold'),
						A2($elm$html$Html$Attributes$style, 'color', levelColor)
					]),
				_List_fromArray(
					[
						$elm$html$Html$text(levelText)
					])),
				A2(
				$elm$html$Html$span,
				_List_fromArray(
					[
						A2($elm$html$Html$Attributes$style, 'color', '#e2e8f0')
					]),
				_List_fromArray(
					[
						$elm$html$Html$text(entry.message)
					]))
			]));
};
var $author$project$Pages$Admin$viewPagination$ = function (colors, params, totalPages, navigateTo) {
	var currentPage = params.page;
	var pageButton = F3(
		function (page, label_, isDisabled) {
			return A2(
				$elm$html$Html$button,
				_List_fromArray(
					[
						$elm$html$Html$Events$onClick(
						navigateTo(
							_Utils_update(
								params,
								{page: page}))),
						$elm$html$Html$Attributes$disabled(isDisabled),
						$elm$html$Html$Attributes$class('px-3 py-1 rounded mx-1'),
						A2(
						$elm$html$Html$Attributes$style,
						'background-color',
						_Utils_eq(page, currentPage) ? colors.accent : (isDisabled ? colors.border : colors.buttonBg)),
						A2(
						$elm$html$Html$Attributes$style,
						'color',
						isDisabled ? colors.secondaryText : colors.buttonText),
						A2(
						$elm$html$Html$Attributes$style,
						'cursor',
						isDisabled ? 'not-allowed' : 'pointer')
					]),
				_List_fromArray(
					[
						$elm$html$Html$text(label_)
					]));
		});
	return A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$class('flex items-center')
			]),
		_List_fromArray(
			[
				A3(pageButton, 0, '<<', !currentPage),
				A3(
				pageButton,
				$elm$core$Basics$max$(0, currentPage - 1),
				'<',
				!currentPage),
				A2(
				$elm$html$Html$span,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('px-3'),
						A2($elm$html$Html$Attributes$style, 'color', colors.primaryText)
					]),
				_List_fromArray(
					[
						$elm$html$Html$text(
						$elm$core$String$fromInt(currentPage + 1) + (' / ' + $elm$core$String$fromInt(
							$elm$core$Basics$max$(1, totalPages))))
					])),
				A3(
				pageButton,
				$elm$core$Basics$min$(totalPages - 1, currentPage + 1),
				'>',
				_Utils_cmp(currentPage, totalPages - 1) > -1),
				A3(
				pageButton,
				totalPages - 1,
				'>>',
				_Utils_cmp(currentPage, totalPages - 1) > -1)
			]));
};
var $author$project$Pages$Admin$viewPagination = F4($author$project$Pages$Admin$viewPagination$);
var $author$project$Pages$Admin$viewLogsTab$ = function (model, colors, params) {
	var startIndex = params.page * params.pageSize;
	var navigateTo = function (newParams) {
		return $author$project$Types$Admin_LogsNavigate(newParams);
	};
	var logs = model.adminPage.logs;
	var paginatedLogs = $elm$core$List$take$(
		params.pageSize,
		$elm$core$List$drop$(startIndex, logs));
	var totalLogs = $elm$core$List$length(logs);
	var totalPages = $elm$core$Basics$ceiling(totalLogs / params.pageSize);
	return A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$class('p-4 rounded-lg shadow'),
				A2($elm$html$Html$Attributes$style, 'background-color', colors.secondaryBg)
			]),
		_List_fromArray(
			[
				A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('flex justify-between items-center mb-4')
					]),
				_List_fromArray(
					[
						A2(
						$elm$html$Html$h2,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('text-xl font-bold'),
								A2($elm$html$Html$Attributes$style, 'color', colors.primaryText)
							]),
						_List_fromArray(
							[
								$elm$html$Html$text('System Logs')
							])),
						A2(
						$elm$html$Html$div,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('flex items-center gap-4')
							]),
						_List_fromArray(
							[
								A2(
								$elm$html$Html$div,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$class('flex items-center gap-2')
									]),
								_List_fromArray(
									[
										A2(
										$elm$html$Html$label,
										_List_fromArray(
											[
												A2($elm$html$Html$Attributes$style, 'color', colors.primaryText)
											]),
										_List_fromArray(
											[
												$elm$html$Html$text('Per page:')
											])),
										A2(
										$elm$html$Html$select,
										_List_fromArray(
											[
												$elm$html$Html$Events$onInput(
												function (v) {
													return navigateTo(
														_Utils_update(
															params,
															{
																page: 0,
																pageSize: $elm$core$Maybe$withDefault$(
																	100,
																	$elm$core$String$toInt(v))
															}));
												}),
												$elm$html$Html$Attributes$class('px-2 py-1 rounded border'),
												A2($elm$html$Html$Attributes$style, 'background-color', colors.primaryBg),
												A2($elm$html$Html$Attributes$style, 'color', colors.primaryText),
												A2($elm$html$Html$Attributes$style, 'border-color', colors.border)
											]),
										_List_fromArray(
											[
												A2(
												$elm$html$Html$option,
												_List_fromArray(
													[
														$elm$html$Html$Attributes$value('50'),
														$elm$html$Html$Attributes$selected(params.pageSize === 50)
													]),
												_List_fromArray(
													[
														$elm$html$Html$text('50')
													])),
												A2(
												$elm$html$Html$option,
												_List_fromArray(
													[
														$elm$html$Html$Attributes$value('100'),
														$elm$html$Html$Attributes$selected(params.pageSize === 100)
													]),
												_List_fromArray(
													[
														$elm$html$Html$text('100')
													])),
												A2(
												$elm$html$Html$option,
												_List_fromArray(
													[
														$elm$html$Html$Attributes$value('250'),
														$elm$html$Html$Attributes$selected(params.pageSize === 250)
													]),
												_List_fromArray(
													[
														$elm$html$Html$text('250')
													])),
												A2(
												$elm$html$Html$option,
												_List_fromArray(
													[
														$elm$html$Html$Attributes$value('500'),
														$elm$html$Html$Attributes$selected(params.pageSize === 500)
													]),
												_List_fromArray(
													[
														$elm$html$Html$text('500')
													]))
											]))
									])),
								A2(
								$elm$html$Html$button,
								_List_fromArray(
									[
										$elm$html$Html$Events$onClick(
										$author$project$Types$DirectToBackend($author$project$Types$Admin_ClearLogs)),
										$elm$html$Html$Attributes$class('px-3 py-1 rounded'),
										A2($elm$html$Html$Attributes$style, 'background-color', colors.dangerBg),
										A2($elm$html$Html$Attributes$style, 'color', colors.buttonText)
									]),
								_List_fromArray(
									[
										$elm$html$Html$text('Clear Logs')
									]))
							]))
					])),
				A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('mb-4')
					]),
				_List_fromArray(
					[
						A2(
						$elm$html$Html$input,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$type_('text'),
								$elm$html$Html$Attributes$placeholder('Search logs...'),
								$elm$html$Html$Attributes$value(params.search),
								$elm$html$Html$Events$onInput(
								function (v) {
									return navigateTo(
										_Utils_update(
											params,
											{page: 0, search: v}));
								}),
								$elm$html$Html$Attributes$class('w-full px-3 py-2 rounded border'),
								A2($elm$html$Html$Attributes$style, 'background-color', colors.primaryBg),
								A2($elm$html$Html$Attributes$style, 'color', colors.primaryText),
								A2($elm$html$Html$Attributes$style, 'border-color', colors.border)
							]),
						_List_Nil)
					])),
				A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('flex justify-between items-center mb-2'),
						A2($elm$html$Html$Attributes$style, 'color', colors.secondaryText)
					]),
				_List_fromArray(
					[
						A2(
						$elm$html$Html$span,
						_List_Nil,
						_List_fromArray(
							[
								$elm$html$Html$text(
								'Showing ' + ($elm$core$String$fromInt(startIndex + 1) + ('-' + ($elm$core$String$fromInt(
									$elm$core$Basics$min$(startIndex + params.pageSize, totalLogs)) + (' of ' + $elm$core$String$fromInt(totalLogs))))))
							])),
						$author$project$Pages$Admin$viewPagination$(colors, params, totalPages, navigateTo)
					])),
				A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('bg-black text-gray-200 font-mono p-4 rounded space-y-1 text-sm overflow-x-auto'),
						A2($elm$html$Html$Attributes$style, 'color', '#e2e8f0')
					]),
				$elm$core$List$map$($author$project$Pages$Admin$viewLogEntry, paginatedLogs)),
				(totalPages > 1) ? A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('flex justify-center mt-4')
					]),
				_List_fromArray(
					[
						$author$project$Pages$Admin$viewPagination$(colors, params, totalPages, navigateTo)
					])) : $elm$html$Html$text('')
			]));
};
var $author$project$Pages$Admin$viewLogsTab = F3($author$project$Pages$Admin$viewLogsTab$);
var $author$project$Pages$Admin$viewTabContent$ = function (model, colors) {
	var _v0 = model.currentRoute;
	if (_v0.$ === 'Admin') {
		switch (_v0.a.$) {
			case 'AdminDefault':
				var _v1 = _v0.a;
				return $author$project$Pages$Admin$viewDefaultTab$(model, colors);
			case 'AdminLogs':
				var params = _v0.a.a;
				return $author$project$Pages$Admin$viewLogsTab$(model, colors, params);
			default:
				var _v2 = _v0.a;
				return $author$project$Pages$Admin$viewFetchModelTab$(model, colors);
		}
	} else {
		return $elm$html$Html$text('Not found');
	}
};
var $author$project$Pages$Admin$viewTabContent = F2($author$project$Pages$Admin$viewTabContent$);
var $author$project$Route$defaultLogsParams = {page: 0, pageSize: 100, search: ''};
var $author$project$Pages$Admin$viewTab$ = function (tab, model, colors, label) {
	var route = $author$project$Route$toString(
		$author$project$Types$Admin(tab));
	var isActive = function () {
		var _v0 = _Utils_Tuple2(tab, model.currentRoute);
		_v0$3:
		while (true) {
			if (_v0.b.$ === 'Admin') {
				switch (_v0.a.$) {
					case 'AdminDefault':
						if (_v0.b.a.$ === 'AdminDefault') {
							var _v1 = _v0.a;
							var _v2 = _v0.b.a;
							return true;
						} else {
							break _v0$3;
						}
					case 'AdminLogs':
						if (_v0.b.a.$ === 'AdminLogs') {
							return true;
						} else {
							break _v0$3;
						}
					default:
						if (_v0.b.a.$ === 'AdminFetchModel') {
							var _v3 = _v0.a;
							var _v4 = _v0.b.a;
							return true;
						} else {
							break _v0$3;
						}
				}
			} else {
				break _v0$3;
			}
		}
		return false;
	}();
	var textColorStyle = isActive ? A2($elm$html$Html$Attributes$style, 'color', colors.accent) : A2($elm$html$Html$Attributes$style, 'color', colors.secondaryText);
	var activeClasses = isActive ? 'border-b-2' : '';
	var activeBorderStyle = isActive ? A2($elm$html$Html$Attributes$style, 'border-color', colors.accent) : A2($elm$html$Html$Attributes$style, 'border-color', 'transparent');
	return A2(
		$elm$html$Html$a,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$href(route),
				$elm$html$Html$Attributes$class('py-2 px-4 ' + activeClasses),
				activeBorderStyle,
				textColorStyle
			]),
		_List_fromArray(
			[
				$elm$html$Html$text(label)
			]));
};
var $author$project$Pages$Admin$viewTab = F4($author$project$Pages$Admin$viewTab$);
var $author$project$Pages$Admin$viewTabs$ = function (model, colors) {
	return A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$class('flex border-b mb-4'),
				A2($elm$html$Html$Attributes$style, 'border-color', colors.border)
			]),
		_List_fromArray(
			[
				$author$project$Pages$Admin$viewTab$($author$project$Types$AdminDefault, model, colors, 'Default'),
				$author$project$Pages$Admin$viewTab$(
				$author$project$Types$AdminLogs($author$project$Route$defaultLogsParams),
				model,
				colors,
				'Logs'),
				$author$project$Pages$Admin$viewTab$($author$project$Types$AdminFetchModel, model, colors, 'Fetch Model')
			]));
};
var $author$project$Pages$Admin$viewTabs = F2($author$project$Pages$Admin$viewTabs$);
var $author$project$Pages$Admin$view$ = function (model, colors) {
	var _v0 = model.currentUser;
	if (_v0.$ === 'Just') {
		var user = _v0.a;
		return user.isSysAdmin ? A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					A2($elm$html$Html$Attributes$style, 'background-color', colors.primaryBg),
					$elm$html$Html$Attributes$class('min-h-screen')
				]),
			_List_fromArray(
				[
					A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('container mx-auto px-4 py-8')
						]),
					_List_fromArray(
						[
							A2(
							$elm$html$Html$h1,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('text-3xl font-bold mb-4'),
									A2($elm$html$Html$Attributes$style, 'color', colors.primaryText)
								]),
							_List_fromArray(
								[
									$elm$html$Html$text('Admin Page')
								])),
							$author$project$Pages$Admin$viewTabs$(model, colors),
							$author$project$Pages$Admin$viewTabContent$(model, colors)
						]))
				])) : $author$project$Pages$Admin$viewNoAccess$(model, colors);
	} else {
		return $author$project$Pages$Admin$viewLogin$(model, colors);
	}
};
var $author$project$Pages$Admin$view = F2($author$project$Pages$Admin$view$);
var $author$project$Components$Header$Large = {$: 'Large'};
var $author$project$Components$Header$view = function (config) {
	var titleClasses = function () {
		var _v2 = config.size;
		switch (_v2.$) {
			case 'Large':
				return 'text-2xl md:text-4xl font-bold mb-2 md:mb-2';
			case 'Medium':
				return 'text-xl md:text-3xl font-bold mb-3 md:mb-4';
			default:
				return 'text-lg md:text-xl font-semibold mb-2';
		}
	}();
	var titleElement = A2(
		$elm$html$Html$h1,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$class(titleClasses),
				A2($elm$html$Html$Attributes$style, 'color', config.colors.accent)
			]),
		_List_fromArray(
			[
				$elm$html$Html$text(config.title)
			]));
	var subtitleElement = function () {
		var _v0 = config.subtitle;
		if (_v0.$ === 'Just') {
			var subtitle = _v0.a;
			var subtitleClasses = function () {
				var _v1 = config.size;
				switch (_v1.$) {
					case 'Large':
						return 'mb-6 md:mb-8 text-sm md:text-base';
					case 'Medium':
						return 'mb-3 md:mb-4 text-sm md:text-base';
					default:
						return 'mb-2 text-sm';
				}
			}();
			return _List_fromArray(
				[
					A2(
					$elm$html$Html$p,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class(subtitleClasses),
							A2($elm$html$Html$Attributes$style, 'color', config.colors.primaryText)
						]),
					_List_fromArray(
						[
							$elm$html$Html$text(subtitle)
						]))
				]);
		} else {
			return _List_Nil;
		}
	}();
	return A2(
		$elm$html$Html$div,
		_List_Nil,
		A2($elm$core$List$cons, titleElement, subtitleElement));
};
var $author$project$Components$Header$pageHeader$ = function (colors, title, subtitle) {
	return $author$project$Components$Header$view(
		{colors: colors, size: $author$project$Components$Header$Large, subtitle: subtitle, title: title});
};
var $author$project$Components$Header$pageHeader = F3($author$project$Components$Header$pageHeader$);
var $author$project$Components$Button$Medium = {$: 'Medium'};
var $author$project$Components$Button$Primary = {$: 'Primary'};
var $author$project$Components$Button$view$ = function (config, label) {
	var variantStyles = function () {
		var _v2 = config.variant;
		switch (_v2.$) {
			case 'Primary':
				return _List_fromArray(
					[
						A2($elm$html$Html$Attributes$style, 'background-color', config.colors.buttonBg),
						A2($elm$html$Html$Attributes$style, 'color', config.colors.buttonText)
					]);
			case 'Secondary':
				return _List_fromArray(
					[
						A2($elm$html$Html$Attributes$style, 'background-color', config.colors.secondaryBg),
						A2($elm$html$Html$Attributes$style, 'color', config.colors.primaryText),
						A2($elm$html$Html$Attributes$style, 'border', '1px solid ' + config.colors.border)
					]);
			case 'Danger':
				return _List_fromArray(
					[
						A2($elm$html$Html$Attributes$style, 'background-color', config.colors.dangerBg),
						A2($elm$html$Html$Attributes$style, 'color', '#ffffff')
					]);
			case 'Success':
				return _List_fromArray(
					[
						A2($elm$html$Html$Attributes$style, 'background-color', '#38a169'),
						A2($elm$html$Html$Attributes$style, 'color', '#ffffff')
					]);
			default:
				return _List_fromArray(
					[
						A2($elm$html$Html$Attributes$style, 'background-color', config.colors.secondaryBg),
						A2($elm$html$Html$Attributes$style, 'color', config.colors.primaryText),
						A2($elm$html$Html$Attributes$style, 'opacity', '0.7')
					]);
		}
	}();
	var sizeClasses = function () {
		var _v1 = config.size;
		switch (_v1.$) {
			case 'Small':
				return 'px-4 py-3 text-sm md:px-3 md:py-2 min-h-[44px] md:min-h-[36px]';
			case 'Medium':
				return 'px-6 py-3 text-base md:px-4 md:py-2 min-h-[48px] md:min-h-[40px]';
			default:
				return 'px-8 py-4 text-lg md:px-6 md:py-3 min-h-[52px] md:min-h-[44px]';
		}
	}();
	var eventHandlers = function () {
		var _v0 = config.onClick;
		if (_v0.$ === 'Just') {
			var handler = _v0.a;
			return config.disabled ? _List_Nil : _List_fromArray(
				[
					$elm$html$Html$Events$onClick(handler)
				]);
		} else {
			return _List_Nil;
		}
	}();
	var disabledStyles = config.disabled ? _List_fromArray(
		[
			$elm$html$Html$Attributes$disabled(true),
			A2($elm$html$Html$Attributes$style, 'cursor', 'not-allowed'),
			A2($elm$html$Html$Attributes$style, 'opacity', '0.5')
		]) : _List_Nil;
	var baseClasses = 'font-medium rounded transition-colors duration-200 cursor-pointer touch-manipulation';
	var allAttributes = A2(
		$elm$core$List$cons,
		$elm$html$Html$Attributes$class(baseClasses + (' ' + sizeClasses)),
		_Utils_ap(
			variantStyles,
			_Utils_ap(disabledStyles, eventHandlers)));
	return A2(
		$elm$html$Html$button,
		allAttributes,
		_List_fromArray(
			[
				$elm$html$Html$text(label)
			]));
};
var $author$project$Components$Button$view = F2($author$project$Components$Button$view$);
var $author$project$Components$Button$primary$ = function (colors, onClick, label) {
	return $author$project$Components$Button$view$(
		{colors: colors, disabled: false, onClick: onClick, size: $author$project$Components$Button$Medium, variant: $author$project$Components$Button$Primary},
		label);
};
var $author$project$Components$Button$primary = F3($author$project$Components$Button$primary$);
var $author$project$Pages$Default$view$ = function (model, colors) {
	return A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				A2($elm$html$Html$Attributes$style, 'background-color', colors.primaryBg),
				$elm$html$Html$Attributes$class('min-h-screen')
			]),
		_List_fromArray(
			[
				A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('container mx-auto px-4 md:px-6 py-4 md:py-8')
					]),
				_List_fromArray(
					[
						$author$project$Components$Header$pageHeader$(
						colors,
						'Welcome to the Starter Project',
						$elm$core$Maybe$Just('This is the default home page.')),
						A2(
						$elm$html$Html$div,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('mt-6 md:mt-8 text-center md:text-left')
							]),
						_List_fromArray(
							[
								A2(
								$elm$html$Html$a,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$href('/examples'),
										$elm$html$Html$Attributes$class('inline-block w-full sm:w-auto')
									]),
								_List_fromArray(
									[
										$author$project$Components$Button$primary$(colors, $elm$core$Maybe$Nothing, 'View Examples →')
									]))
							]))
					]))
			]));
};
var $author$project$Pages$Default$view = F2($author$project$Pages$Default$view$);
var $author$project$Types$ConsoleLogClicked = {$: 'ConsoleLogClicked'};
var $author$project$Types$CopyToClipboard = function (a) {
	return {$: 'CopyToClipboard', a: a};
};
var $elm$html$Html$li = _VirtualDom_node('li');
var $author$project$Components$Header$Medium = {$: 'Medium'};
var $author$project$Components$Header$sectionHeader$ = function (colors, title) {
	return $author$project$Components$Header$view(
		{colors: colors, size: $author$project$Components$Header$Medium, subtitle: $elm$core$Maybe$Nothing, title: title});
};
var $author$project$Components$Header$sectionHeader = F2($author$project$Components$Header$sectionHeader$);
var $author$project$Components$Button$Success = {$: 'Success'};
var $author$project$Components$Button$success$ = function (colors, onClick, label) {
	return $author$project$Components$Button$view$(
		{colors: colors, disabled: false, onClick: onClick, size: $author$project$Components$Button$Medium, variant: $author$project$Components$Button$Success},
		label);
};
var $author$project$Components$Button$success = F3($author$project$Components$Button$success$);
var $elm$html$Html$ul = _VirtualDom_node('ul');
var $author$project$Components$Card$getPaddingClass = function (padding) {
	switch (padding) {
		case '4':
			return 'p-4 md:p-4';
		case '6':
			return 'p-4 md:p-6';
		case '8':
			return 'p-6 md:p-8';
		default:
			return 'p-4 md:p-6';
	}
};
var $author$project$Components$Card$view$ = function (config, children) {
	var roundedClass = config.rounded ? 'rounded-lg' : '';
	var paddingClass = $author$project$Components$Card$getPaddingClass(config.padding);
	var cardContent = function () {
		var _v0 = config.title;
		if (_v0.$ === 'Just') {
			var title = _v0.a;
			return A2(
				$elm$core$List$cons,
				A2(
					$elm$html$Html$h2,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('text-lg md:text-xl font-semibold mb-3 md:mb-4'),
							A2($elm$html$Html$Attributes$style, 'color', config.colors.primaryText)
						]),
					_List_fromArray(
						[
							$elm$html$Html$text(title)
						])),
				children);
		} else {
			return children;
		}
	}();
	var baseClasses = 'bg-gray-100 dark:bg-gray-800';
	return A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$class(baseClasses + (' ' + (paddingClass + (' ' + roundedClass)))),
				A2($elm$html$Html$Attributes$style, 'background-color', config.colors.secondaryBg)
			]),
		cardContent);
};
var $author$project$Components$Card$view = F2($author$project$Components$Card$view$);
var $author$project$Components$Card$withTitle$ = function (colors, title, children) {
	return $author$project$Components$Card$view$(
		{
			colors: colors,
			padding: '6',
			rounded: true,
			title: $elm$core$Maybe$Just(title)
		},
		children);
};
var $author$project$Components$Card$withTitle = F3($author$project$Components$Card$withTitle$);
var $author$project$Pages$Examples$view$ = function (model, colors) {
	return A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				A2($elm$html$Html$Attributes$style, 'background-color', colors.primaryBg),
				$elm$html$Html$Attributes$class('min-h-screen')
			]),
		_List_fromArray(
			[
				A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('container mx-auto px-4 md:px-6 py-4 md:py-8')
					]),
				_List_fromArray(
					[
						$author$project$Components$Header$sectionHeader$(colors, 'Examples'),
						A2(
						$elm$html$Html$div,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('space-y-6 md:space-y-8')
							]),
						_List_fromArray(
							[
								$author$project$Components$Card$withTitle$(
								colors,
								'Console Logger Example',
								_List_fromArray(
									[
										A2(
										$elm$html$Html$p,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$class('mb-4 text-sm md:text-base'),
												A2($elm$html$Html$Attributes$style, 'color', colors.primaryText)
											]),
										_List_fromArray(
											[
												$elm$html$Html$text('Click the button below to send a message to the browser console:')
											])),
										A2(
										$elm$html$Html$div,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$class('w-full sm:w-auto')
											]),
										_List_fromArray(
											[
												$author$project$Components$Button$primary$(
												colors,
												$elm$core$Maybe$Just($author$project$Types$ConsoleLogClicked),
												'Log to Console')
											])),
										A2(
										$elm$html$Html$p,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$class('mt-4 text-xs md:text-sm text-gray-600 dark:text-gray-400')
											]),
										_List_fromArray(
											[
												$elm$html$Html$text('Check your browser\'s developer console to see the message!')
											]))
									])),
								$author$project$Components$Card$withTitle$(
								colors,
								'Clipboard Example',
								_List_fromArray(
									[
										A2(
										$elm$html$Html$p,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$class('mb-4 text-sm md:text-base'),
												A2($elm$html$Html$Attributes$style, 'color', colors.primaryText)
											]),
										_List_fromArray(
											[
												$elm$html$Html$text('Click the buttons below to copy different text to your clipboard:')
											])),
										A2(
										$elm$html$Html$div,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$class('flex flex-col sm:flex-row gap-3 sm:gap-2')
											]),
										_List_fromArray(
											[
												$author$project$Components$Button$success$(
												colors,
												$elm$core$Maybe$Just(
													$author$project$Types$CopyToClipboard('Hello from Elm!')),
												'Copy \"Hello from Elm!\"'),
												$author$project$Components$Button$success$(
												colors,
												$elm$core$Maybe$Just(
													$author$project$Types$CopyToClipboard('Elm ports are awesome!')),
												'Copy \"Elm ports are awesome!\"'),
												$author$project$Components$Button$success$(
												colors,
												$elm$core$Maybe$Just(
													$author$project$Types$CopyToClipboard('https://lamdera.com')),
												'Copy Lamdera URL')
											])),
										A2(
										$elm$html$Html$p,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$class('mt-4 text-xs md:text-sm text-gray-600 dark:text-gray-400')
											]),
										_List_fromArray(
											[
												$elm$html$Html$text('Try pasting (Ctrl+V or Cmd+V) somewhere to see the copied text!')
											]))
									])),
								$author$project$Components$Card$withTitle$(
								colors,
								'How It Works',
								_List_fromArray(
									[
										A2(
										$elm$html$Html$p,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$class('mb-4 text-sm md:text-base'),
												A2($elm$html$Html$Attributes$style, 'color', colors.primaryText)
											]),
										_List_fromArray(
											[
												$elm$html$Html$text('This example demonstrates the elm-pkg-js standard for Lamdera:')
											])),
										A2(
										$elm$html$Html$ul,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$class('list-disc list-inside space-y-2 text-sm md:text-base'),
												A2($elm$html$Html$Attributes$style, 'color', colors.primaryText)
											]),
										_List_fromArray(
											[
												A2(
												$elm$html$Html$li,
												_List_Nil,
												_List_fromArray(
													[
														$elm$html$Html$text('Port modules are defined in src/Ports/')
													])),
												A2(
												$elm$html$Html$li,
												_List_Nil,
												_List_fromArray(
													[
														$elm$html$Html$text('JavaScript handlers are in elm-pkg-js/')
													])),
												A2(
												$elm$html$Html$li,
												_List_Nil,
												_List_fromArray(
													[
														$elm$html$Html$text('elm-pkg-js-includes.js wires everything together')
													])),
												A2(
												$elm$html$Html$li,
												_List_Nil,
												_List_fromArray(
													[
														$elm$html$Html$text('Lamdera automatically initializes the ports')
													]))
											]))
									]))
							]))
					]))
			]));
};
var $author$project$Pages$Examples$view = F2($author$project$Pages$Examples$view$);
var $author$project$Pages$PageFrame$viewNotFoundPage = function (colors) {
	return A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$class('text-center p-4'),
				A2($elm$html$Html$Attributes$style, 'color', colors.primaryText)
			]),
		_List_fromArray(
			[
				A2(
				$elm$html$Html$h1,
				_List_Nil,
				_List_fromArray(
					[
						$elm$html$Html$text('404 - Page Not Found')
					]))
			]));
};
var $author$project$Pages$PageFrame$viewCurrentPage = function (model) {
	var isDark = model.preferences.darkMode;
	var colors = $author$project$Theme$getColors(isDark);
	return A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$class('px-4 md:px-6 pt-4 md:pt-8 pb-4'),
				A2($elm$html$Html$Attributes$style, 'min-height', 'calc(100vh - 160px)'),
				A2($elm$html$Html$Attributes$style, 'background-color', colors.primaryBg)
			]),
		_List_fromArray(
			[
				function () {
				var _v0 = model.currentRoute;
				switch (_v0.$) {
					case 'Default':
						return $author$project$Pages$Default$view$(model, colors);
					case 'Admin':
						return $author$project$Pages$Admin$view$(model, colors);
					case 'Examples':
						return $author$project$Pages$Examples$view$(model, colors);
					default:
						return $author$project$Pages$PageFrame$viewNotFoundPage(colors);
				}
			}()
			]));
};
var $author$project$Theme$headerBg = function (isDarkMode) {
	return A2(
		$elm$html$Html$Attributes$style,
		'background-color',
		$author$project$Theme$getColors(isDarkMode).headerBg);
};
var $author$project$Components$Tab$view = function (config) {
	return A2(
		$elm$html$Html$a,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$href(config.href),
				$elm$html$Html$Attributes$class('px-4 py-3 md:px-3 md:py-2 text-base md:text-lg font-medium transition-colors duration-200 touch-manipulation min-h-[44px] md:min-h-[36px] flex items-center'),
				A2(
				$elm$html$Html$Attributes$style,
				'color',
				config.isActive ? config.colors.activeTabText : config.colors.inactiveTabText),
				A2(
				$elm$html$Html$Attributes$style,
				'border-bottom',
				config.isActive ? ('2px solid ' + config.colors.activeTabText) : 'none'),
				A2($elm$html$Html$Attributes$style, 'text-decoration', 'none')
			]),
		_List_fromArray(
			[
				$elm$html$Html$text(config.label)
			]));
};
var $author$project$Components$Tab$tabBar$ = function (colors, tabs) {
	return A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$class('flex flex-wrap justify-center gap-2 md:gap-8 mt-4 px-2 md:px-0')
			]),
		$elm$core$List$map$($author$project$Components$Tab$view, tabs));
};
var $author$project$Components$Tab$tabBar = F2($author$project$Components$Tab$tabBar$);
var $author$project$Types$ToggleDarkMode = {$: 'ToggleDarkMode'};
var $author$project$Types$ToggleLoginModal = {$: 'ToggleLoginModal'};
var $author$project$Types$ToggleProfileDropdown = {$: 'ToggleProfileDropdown'};
var $author$project$Components$AuthControls$loginButton = function (config) {
	var baseButtonStyles = _List_fromArray(
		[
			$elm$html$Html$Attributes$class('px-4 py-2 rounded-lg transition-all text-sm font-medium')
		]);
	var loadingStyles = _Utils_ap(
		baseButtonStyles,
		_List_fromArray(
			[
				A2($elm$html$Html$Attributes$style, 'background-color', config.colors.secondaryBg),
				A2($elm$html$Html$Attributes$style, 'color', config.colors.primaryText),
				A2($elm$html$Html$Attributes$style, 'opacity', '0.7'),
				A2($elm$html$Html$Attributes$style, 'cursor', 'wait')
			]));
	var loginButtonStyles = _Utils_ap(
		baseButtonStyles,
		_List_fromArray(
			[
				A2($elm$html$Html$Attributes$style, 'background-color', config.colors.buttonBg),
				A2($elm$html$Html$Attributes$style, 'color', config.colors.buttonText),
				A2($elm$html$Html$Attributes$style, 'hover:opacity', '0.9')
			]));
	var _v0 = config.login;
	switch (_v0.$) {
		case 'LoginTokenSent':
			return A2(
				$elm$html$Html$button,
				_Utils_ap(
					loadingStyles,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$disabled(true),
							$elm$html$Html$Attributes$class('animate-pulse')
						])),
				_List_fromArray(
					[
						$elm$html$Html$text('Authenticating...')
					]));
		case 'NotLogged':
			var pendingAuth = _v0.a;
			return pendingAuth ? A2(
				$elm$html$Html$button,
				_Utils_ap(
					loadingStyles,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$disabled(true)
						])),
				_List_fromArray(
					[
						$elm$html$Html$text('Authenticating...')
					])) : A2(
				$elm$html$Html$button,
				_Utils_ap(
					loginButtonStyles,
					_List_fromArray(
						[
							$elm$html$Html$Events$onClick(config.onLogin)
						])),
				_List_fromArray(
					[
						$elm$html$Html$text('Login')
					]));
		case 'JustArrived':
			return A2(
				$elm$html$Html$button,
				_Utils_ap(
					loginButtonStyles,
					_List_fromArray(
						[
							$elm$html$Html$Events$onClick(config.onLogin)
						])),
				_List_fromArray(
					[
						$elm$html$Html$text('Login')
					]));
		default:
			return $elm$html$Html$text('');
	}
};
var $elm$virtual_dom$VirtualDom$attribute$ = function (key, value) {
	return A2(
		_VirtualDom_attribute,
		_VirtualDom_noOnOrFormAction(key),
		_VirtualDom_noJavaScriptOrHtmlUri(value));
};
var $elm$virtual_dom$VirtualDom$attribute = F2($elm$virtual_dom$VirtualDom$attribute$);
var $elm$html$Html$Attributes$attribute = $elm$virtual_dom$VirtualDom$attribute;
var $elm$core$String$toUpper = _String_toUpper;
var $elm$core$String$words = _String_words;
var $author$project$Components$AuthControls$getInitials = function (userInfo) {
	var _v0 = userInfo.name;
	if (_v0.$ === 'Just') {
		var name = _v0.a;
		return $elm$core$String$toUpper(
			$elm$core$String$concat(
				$elm$core$List$take$(
					2,
					$elm$core$List$map$(
						$elm$core$String$left(1),
						$elm$core$String$words(name)))));
	} else {
		return $elm$core$String$toUpper(
			$elm$core$String$left$(1, userInfo.email));
	}
};
var $author$project$Components$AuthControls$profileDropdown = function (config) {
	return A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$class('relative')
			]),
		_List_fromArray(
			[
				A2(
				$elm$html$Html$button,
				_List_fromArray(
					[
						$elm$html$Html$Events$onClick(config.onToggleDropdown),
						$elm$html$Html$Attributes$class('rounded-lg transition-all'),
						A2($elm$html$Html$Attributes$style, 'background-color', 'transparent'),
						A2($elm$html$Html$Attributes$style, 'hover:opacity', '0.8')
					]),
				_List_fromArray(
					[
						A2(
						$elm$html$Html$div,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('w-12 h-12 rounded-full flex items-center justify-center text-sm font-medium overflow-hidden relative'),
								A2($elm$html$Html$Attributes$style, 'background-color', config.colors.accent),
								A2($elm$html$Html$Attributes$style, 'color', '#ffffff')
							]),
						_List_fromArray(
							[
								A2(
								$elm$html$Html$div,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$class('absolute inset-0 flex items-center justify-center')
									]),
								_List_fromArray(
									[
										$elm$html$Html$text(
										$author$project$Components$AuthControls$getInitials(config.userInfo))
									])),
								function () {
								var _v0 = config.userInfo.picture;
								if (_v0.$ === 'Just') {
									var pictureUrl = _v0.a;
									return A2(
										$elm$html$Html$img,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$src(pictureUrl),
												$elm$html$Html$Attributes$class('absolute inset-0 w-full h-full object-cover'),
												$elm$html$Html$Attributes$alt('Profile'),
												A2($elm$html$Html$Attributes$style, 'background-color', config.colors.accent),
												A2($elm$html$Html$Attributes$attribute, 'referrerpolicy', 'no-referrer'),
												A2($elm$html$Html$Attributes$attribute, 'crossorigin', 'anonymous')
											]),
										_List_Nil);
								} else {
									return $elm$html$Html$text('');
								}
							}()
							]))
					])),
				config.isOpen ? A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('absolute top-full left-1/2 transform -translate-x-1/2 md:left-auto md:right-0 md:transform-none rounded-lg shadow-lg overflow-hidden z-50 mt-2'),
						A2($elm$html$Html$Attributes$style, 'background-color', config.colors.primaryBg),
						A2($elm$html$Html$Attributes$style, 'border', '1px solid ' + config.colors.border),
						A2($elm$html$Html$Attributes$style, 'min-width', '280px')
					]),
				_List_fromArray(
					[
						A2(
						$elm$html$Html$div,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('px-4 py-3'),
								A2($elm$html$Html$Attributes$style, 'border-bottom', '1px solid ' + config.colors.border)
							]),
						_List_fromArray(
							[
								A2(
								$elm$html$Html$div,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$class('font-medium'),
										A2($elm$html$Html$Attributes$style, 'color', config.colors.primaryText)
									]),
								_List_fromArray(
									[
										$elm$html$Html$text(
										$elm$core$Maybe$withDefault$(config.userInfo.email, config.userInfo.name))
									])),
								A2(
								$elm$html$Html$div,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$class('text-sm mt-1'),
										A2($elm$html$Html$Attributes$style, 'color', config.colors.secondaryText)
									]),
								_List_fromArray(
									[
										$elm$html$Html$text(config.userInfo.email)
									]))
							])),
						A2(
						$elm$html$Html$button,
						_List_fromArray(
							[
								$elm$html$Html$Events$onClick(config.onToggleDarkMode),
								$elm$html$Html$Attributes$class('w-full px-4 py-3 flex items-center justify-between hover:opacity-80 transition-opacity'),
								A2($elm$html$Html$Attributes$style, 'background-color', 'transparent'),
								A2($elm$html$Html$Attributes$style, 'color', config.colors.primaryText),
								A2($elm$html$Html$Attributes$style, 'border-bottom', '1px solid ' + config.colors.border)
							]),
						_List_fromArray(
							[
								A2(
								$elm$html$Html$span,
								_List_Nil,
								_List_fromArray(
									[
										$elm$html$Html$text('Theme')
									])),
								A2(
								$elm$html$Html$span,
								_List_Nil,
								_List_fromArray(
									[
										$elm$html$Html$text(
										config.isDarkMode ? '🌙 Dark' : '☀️ Light')
									]))
							])),
						A2(
						$elm$html$Html$button,
						_List_fromArray(
							[
								$elm$html$Html$Events$onClick(config.onLogout),
								$elm$html$Html$Attributes$class('w-full px-4 py-3 flex items-center hover:opacity-80 transition-opacity'),
								A2($elm$html$Html$Attributes$style, 'background-color', 'transparent'),
								A2($elm$html$Html$Attributes$style, 'color', config.colors.dangerText)
							]),
						_List_fromArray(
							[
								$elm$html$Html$text('Logout')
							]))
					])) : $elm$html$Html$text('')
			]));
};
var $author$project$Components$AuthControls$view = function (config) {
	var _v0 = config.login;
	if (_v0.$ === 'LoggedIn') {
		var userInfo = _v0.a;
		return $author$project$Components$AuthControls$profileDropdown(
			{colors: config.colors, isDarkMode: config.isDarkMode, isOpen: config.isDropdownOpen, onLogout: config.onLogout, onToggleDarkMode: config.onToggleDarkMode, onToggleDropdown: config.onToggleDropdown, userInfo: userInfo});
	} else {
		return $author$project$Components$AuthControls$loginButton(config);
	}
};
var $author$project$Pages$PageFrame$viewAccountControls = function (model) {
	var isDark = model.preferences.darkMode;
	var colors = $author$project$Theme$getColors(isDark);
	return A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$class('flex flex-col items-center lg:items-end lg:justify-start')
			]),
		_List_fromArray(
			[
				$author$project$Components$AuthControls$view(
				{colors: colors, isDarkMode: isDark, isDropdownOpen: model.profileDropdownOpen, login: model.login, onLogin: $author$project$Types$ToggleLoginModal, onLogout: $author$project$Types$Logout, onToggleDarkMode: $author$project$Types$ToggleDarkMode, onToggleDropdown: $author$project$Types$ToggleProfileDropdown})
			]));
};
var $author$project$Pages$PageFrame$viewTabs = function (model) {
	var isDark = model.preferences.darkMode;
	var colors = $author$project$Theme$getColors(isDark);
	var baseTabs = _List_fromArray(
		[
			{
			colors: colors,
			href: $author$project$Route$toString($author$project$Types$Default),
			isActive: _Utils_eq(model.currentRoute, $author$project$Types$Default),
			label: 'Home'
		},
			{
			colors: colors,
			href: $author$project$Route$toString($author$project$Types$Examples),
			isActive: _Utils_eq(model.currentRoute, $author$project$Types$Examples),
			label: 'Examples'
		}
		]);
	var adminTabs = function () {
		var _v0 = model.currentUser;
		if (_v0.$ === 'Just') {
			var user = _v0.a;
			return user.isSysAdmin ? _List_fromArray(
				[
					{
					colors: colors,
					href: $author$project$Route$toString(
						$author$project$Types$Admin($author$project$Types$AdminDefault)),
					isActive: _Utils_eq(
						model.currentRoute,
						$author$project$Types$Admin($author$project$Types$AdminDefault)),
					label: 'Admin'
				}
				]) : _List_Nil;
		} else {
			return _List_Nil;
		}
	}();
	var allTabs = _Utils_ap(baseTabs, adminTabs);
	return A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$class('relative py-4 md:py-8 px-4 border-b'),
				$author$project$Theme$headerBg(isDark),
				A2($elm$html$Html$Attributes$style, 'border-color', colors.headerBorder)
			]),
		_List_fromArray(
			[
				A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('container mx-auto')
					]),
				_List_fromArray(
					[
						A2(
						$elm$html$Html$div,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('flex flex-col lg:flex-row lg:items-start lg:justify-between')
							]),
						_List_fromArray(
							[
								A2(
								$elm$html$Html$div,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$class('text-center lg:text-left mb-4 lg:mb-0')
									]),
								_List_fromArray(
									[
										$author$project$Components$Header$view(
										{
											colors: colors,
											size: $author$project$Components$Header$Large,
											subtitle: $elm$core$Maybe$Just('Your starting point'),
											title: 'Starter Project Dashboard'
										})
									])),
								$author$project$Pages$PageFrame$viewAccountControls(model)
							])),
						A2(
						$elm$html$Html$div,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('text-center')
							]),
						_List_fromArray(
							[
								$author$project$Components$Tab$tabBar$(colors, allTabs)
							]))
					]))
			]));
};
var $author$project$Frontend$view = function (model) {
	var colors = $author$project$Theme$getColors(model.preferences.darkMode);
	return {
		body: _List_fromArray(
			[
				A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						$author$project$Theme$primaryBg(model.preferences.darkMode),
						$author$project$Theme$primaryText(model.preferences.darkMode),
						A2($elm$html$Html$Attributes$style, 'min-height', '100vh'),
						$elm$html$Html$Attributes$class('p-4')
					]),
				_List_fromArray(
					[
						$author$project$Pages$PageFrame$viewTabs(model),
						$author$project$Pages$PageFrame$viewCurrentPage(model)
					])),
				$author$project$Components$LoginModal$view(
				{colors: colors, emailPasswordForm: model.emailPasswordForm, isAuthenticating: model.pendingAuth, isOpen: model.loginModalOpen, onAuth0Login: $author$project$Types$Auth0SigninRequested, onClose: $author$project$Types$CloseLoginModal, onEmailPasswordMsg: $author$project$Types$EmailPasswordAuthMsg, onNoOp: $author$project$Types$NoOpFrontendMsg})
			]),
		title: 'Dashboard'
	};
};
var $author$project$Helpers$Simulation$frontendApp = {
	init: $author$project$Frontend$initWithAuth,
	onUrlChange: $author$project$Types$UrlChanged,
	onUrlRequest: $author$project$Types$UrlClicked,
	subscriptions: function (_v0) {
		return $lamdera$program_test$Effect$Subscription$none;
	},
	update: $author$project$Frontend$update,
	updateFromBackend: $author$project$Frontend$updateFromBackend,
	view: $author$project$Frontend$view
};
var $author$project$Helpers$Simulation$config = {
	backendApp: $author$project$Helpers$Simulation$backendApp,
	domain: $author$project$Helpers$Simulation$defaultDomain,
	frontendApp: $author$project$Helpers$Simulation$frontendApp,
	handleFileUpload: function (_v0) {
		return $lamdera$program_test$Effect$Test$UnhandledFileUpload;
	},
	handleHttpRequest: function (_v1) {
		return $lamdera$program_test$Effect$Test$NetworkErrorResponse;
	},
	handleMultipleFilesUpload: function (_v2) {
		return $lamdera$program_test$Effect$Test$UnhandledMultiFileUpload;
	},
	handlePortToJs: function (_v3) {
		return $elm$core$Maybe$Nothing;
	}
};
var $lamdera$program_test$Effect$Test$BackendInitEvent = function (a) {
	return {$: 'BackendInitEvent', a: a};
};
var $ianmackenzie$elm_units$Quantity$zero = $ianmackenzie$elm_units$Quantity$Quantity(0);
var $lamdera$program_test$Effect$Test$start$ = function (testName, startTime2, config, actions) {
	var _v0 = config.backendApp.init;
	var backend = _v0.a;
	var cmd = _v0.b;
	var state = $lamdera$program_test$Effect$Test$addEvent$(
		$lamdera$program_test$Effect$Test$BackendInitEvent(cmd),
		$elm$core$Maybe$Nothing,
		{
			backendApp: config.backendApp,
			counter: 0,
			domain: config.domain,
			downloads: _List_Nil,
			elapsedTime: $ianmackenzie$elm_units$Quantity$zero,
			fileUploads: _List_Nil,
			frontendApp: config.frontendApp,
			frontends: $lamdera$containers$SeqDict$empty,
			handleFileUpload: config.handleFileUpload,
			handleHttpRequest: config.handleHttpRequest,
			handleMultipleFilesUpload: config.handleMultipleFilesUpload,
			handlePortToJs: config.handlePortToJs,
			history: $elm$core$Array$empty,
			httpRequests: _List_Nil,
			model: backend,
			multipleFileUploads: _List_Nil,
			pendingEffects: $elm$core$Array$fromList(
				_List_fromArray(
					[
						{cmds: cmd, stepIndex: 0}
					])),
			portRequests: _List_Nil,
			snapshots: _List_Nil,
			startTime: startTime2,
			testErrors: _List_Nil,
			testName: testName,
			timers: $lamdera$containers$SeqDict$map$(
				F2(
					function (_v2, _v3) {
						return {startTime: startTime2};
					}),
				$lamdera$program_test$Effect$Test$getTimers(
					config.backendApp.subscriptions(backend))),
			toBackend: _List_Nil
		});
	return $lamdera$program_test$Effect$Test$foldList$(
		$elm$core$List$map$(
			function (_v1) {
				var a = _v1.a;
				return a;
			},
			actions),
		$lamdera$program_test$Effect$Test$Start(state));
};
var $lamdera$program_test$Effect$Test$start = F4($lamdera$program_test$Effect$Test$start$);
var $author$project$Helpers$Simulation$start$ = function (testName, actions) {
	return $lamdera$program_test$Effect$Test$start$(
		testName,
		$elm$time$Time$millisToPosix(0),
		$author$project$Helpers$Simulation$config,
		actions);
};
var $author$project$Helpers$Simulation$start = F2($author$project$Helpers$Simulation$start$);
var $author$project$TestViewer$adminPageRendersTest = $author$project$Helpers$Simulation$start$(
	'Admin Page Renders',
	_List_fromArray(
		[
			$lamdera$program_test$Effect$Test$connectFrontend$(
			0,
			$lamdera$program_test$Effect$Lamdera$sessionIdFromString('session-admin'),
			'/admin',
			{height: 1080, width: 1920},
			function (frontend) {
				return _List_fromArray(
					[
						A2(
						frontend.snapshotView,
						100,
						{name: 'Admin Page'})
					]);
			})
		]));
var $author$project$TestViewer$examplesPageRendersTest = $author$project$Helpers$Simulation$start$(
	'Examples Page Renders',
	_List_fromArray(
		[
			$lamdera$program_test$Effect$Test$connectFrontend$(
			0,
			$lamdera$program_test$Effect$Lamdera$sessionIdFromString('session-examples'),
			'/examples',
			{height: 1080, width: 1920},
			function (frontend) {
				return _List_fromArray(
					[
						A2(
						frontend.snapshotView,
						100,
						{name: 'Examples Page'})
					]);
			})
		]));
var $author$project$TestViewer$homePageRendersTest = $author$project$Helpers$Simulation$start$(
	'Home Page Renders',
	_List_fromArray(
		[
			$lamdera$program_test$Effect$Test$connectFrontend$(
			0,
			$lamdera$program_test$Effect$Lamdera$sessionIdFromString('session-home'),
			'/',
			{height: 1080, width: 1920},
			function (frontend) {
				return _List_fromArray(
					[
						A2(
						frontend.snapshotView,
						100,
						{name: 'Home Page Initial'})
					]);
			})
		]));
var $lamdera$program_test$Effect$Test$CheckState = {$: 'CheckState'};
var $lamdera$program_test$Effect$Test$checkState$ = function (delay, checkFunc) {
	return $lamdera$program_test$Effect$Test$Action(
		function (instructions) {
			return $lamdera$program_test$Effect$Test$NextStep$(
				function (state) {
					var _v0 = checkFunc(
						$lamdera$program_test$Effect$Test$stateToData(state));
					if (_v0.$ === 'Ok') {
						return $lamdera$program_test$Effect$Test$addEvent$(
							$lamdera$program_test$Effect$Test$CheckStateEvent(
								{checkType: $lamdera$program_test$Effect$Test$CheckState}),
							$elm$core$Maybe$Nothing,
							state);
					} else {
						var error = _v0.a;
						return $lamdera$program_test$Effect$Test$addEvent$(
							$lamdera$program_test$Effect$Test$CheckStateEvent(
								{checkType: $lamdera$program_test$Effect$Test$CheckState}),
							$elm$core$Maybe$Just(
								$lamdera$program_test$Effect$Test$CustomError(error)),
							state);
					}
				},
				A2(
					$lamdera$program_test$Effect$Test$wait,
					$ianmackenzie$elm_units$Duration$milliseconds(delay),
					instructions));
		});
};
var $lamdera$program_test$Effect$Test$checkState = F2($lamdera$program_test$Effect$Test$checkState$);
var $author$project$TestViewer$navigationTests = $author$project$Helpers$Simulation$start$(
	'Navigation: route changes',
	_List_fromArray(
		[
			$lamdera$program_test$Effect$Test$connectFrontend$(
			0,
			$lamdera$program_test$Effect$Lamdera$sessionIdFromString('session1'),
			'/',
			{height: 1080, width: 1920},
			function (frontend) {
				return _List_fromArray(
					[
						A2(
						frontend.snapshotView,
						100,
						{name: 'Initial Home'}),
						$lamdera$program_test$Effect$Test$checkState$(
						0,
						function (data) {
							var _v0 = $lamdera$containers$SeqDict$get$(frontend.clientId, data.frontends);
							if (_v0.$ === 'Just') {
								var model = _v0.a;
								return _Utils_eq(model.currentRoute, $author$project$Types$Default) ? $elm$core$Result$Ok(_Utils_Tuple0) : $elm$core$Result$Err('Expected Default route');
							} else {
								return $elm$core$Result$Err('Frontend not found');
							}
						})
					]);
			})
		]));
var $author$project$TestViewer$allTests = _List_fromArray(
	[$author$project$TestViewer$homePageRendersTest, $author$project$TestViewer$adminPageRendersTest, $author$project$TestViewer$examplesPageRendersTest, $author$project$TestViewer$navigationTests]);
var $lamdera$program_test$Effect$Test$UrlChanged = function (a) {
	return {$: 'UrlChanged', a: a};
};
var $lamdera$program_test$Effect$Test$UrlClicked = function (a) {
	return {$: 'UrlClicked', a: a};
};
var $elm$browser$Browser$application = _Browser_application;
var $lamdera$program_test$Effect$Test$GotWindowSize$ = function (a, b) {
	return {$: 'GotWindowSize', a: a, b: b};
};
var $lamdera$program_test$Effect$Test$GotWindowSize = F2($lamdera$program_test$Effect$Test$GotWindowSize$);
var $lamdera$program_test$Effect$Test$Model = function (a) {
	return {$: 'Model', a: a};
};
var $lamdera$program_test$Effect$Test$ShortPauseFinished = {$: 'ShortPauseFinished'};
var $elm$browser$Browser$Dom$getViewport = _Browser_withWindow(_Browser_getViewport);
var $lamdera$program_test$Effect$Test$init$ = function (_v0, _v1, navigationKey) {
	return _Utils_Tuple2(
		$lamdera$program_test$Effect$Test$Model(
			{
				currentTest: $elm$core$Maybe$Nothing,
				navigationKey: navigationKey,
				testResults: _List_Nil,
				tests: $elm$core$Maybe$Nothing,
				windowSize: _Utils_Tuple2(1920, 1080)
			}),
		$elm$core$Platform$Cmd$batch(
			_List_fromArray(
				[
					$elm$core$Task$perform$(
					function (_v2) {
						return $lamdera$program_test$Effect$Test$ShortPauseFinished;
					},
					$elm$core$Process$sleep(0)),
					$elm$core$Task$perform$(
					function (_v3) {
						var viewport = _v3.viewport;
						return $lamdera$program_test$Effect$Test$GotWindowSize$(
							$elm$core$Basics$round(viewport.width),
							$elm$core$Basics$round(viewport.height));
					},
					$elm$browser$Browser$Dom$getViewport)
				])));
};
var $lamdera$program_test$Effect$Test$init = F3($lamdera$program_test$Effect$Test$init$);
var $lamdera$program_test$Effect$Test$Bottom = {$: 'Bottom'};
var $lamdera$program_test$Effect$TreeView$FieldIsCollapsed = {$: 'FieldIsCollapsed'};
var $lamdera$program_test$Effect$TreeView$FieldIsExpanded = {$: 'FieldIsExpanded'};
var $lamdera$program_test$Effect$Test$GotFilesForTests = function (a) {
	return {$: 'GotFilesForTests', a: a};
};
var $lamdera$program_test$Effect$Test$Top = {$: 'Top'};
var $lamdera$program_test$Effect$Test$arrayFindIndex$ = function (itemA, array) {
	return function (_v1) {
		var index = _v1.a;
		var found = _v1.b;
		return found ? $elm$core$Maybe$Just(index) : $elm$core$Maybe$Nothing;
	}(
		$elm$core$Array$foldl$(
			F2(
				function (itemB, _v0) {
					var index = _v0.a;
					var found = _v0.b;
					return found ? _Utils_Tuple2(index, found) : (_Utils_eq(itemB, itemA) ? _Utils_Tuple2(index, true) : _Utils_Tuple2(index + 1, false));
				}),
			_Utils_Tuple2(0, false),
			array));
};
var $lamdera$program_test$Effect$Test$arrayFindIndex = F2($lamdera$program_test$Effect$Test$arrayFindIndex$);
var $lamdera$program_test$DebugParser$ElmBool = function (a) {
	return {$: 'ElmBool', a: a};
};
var $lamdera$program_test$DebugParser$ElmBytes = function (a) {
	return {$: 'ElmBytes', a: a};
};
var $lamdera$program_test$DebugParser$ElmChar = function (a) {
	return {$: 'ElmChar', a: a};
};
var $lamdera$program_test$DebugParser$ElmDict = function (a) {
	return {$: 'ElmDict', a: a};
};
var $lamdera$program_test$DebugParser$ElmFile = function (a) {
	return {$: 'ElmFile', a: a};
};
var $lamdera$program_test$DebugParser$ElmFunction = {$: 'ElmFunction'};
var $lamdera$program_test$DebugParser$ElmInternals = {$: 'ElmInternals'};
var $lamdera$program_test$DebugParser$ElmNumber = function (a) {
	return {$: 'ElmNumber', a: a};
};
var $lamdera$program_test$DebugParser$ElmRecord = function (a) {
	return {$: 'ElmRecord', a: a};
};
var $lamdera$program_test$DebugParser$ElmSequence$ = function (a, b) {
	return {$: 'ElmSequence', a: a, b: b};
};
var $lamdera$program_test$DebugParser$ElmSequence = F2($lamdera$program_test$DebugParser$ElmSequence$);
var $lamdera$program_test$DebugParser$ElmString = function (a) {
	return {$: 'ElmString', a: a};
};
var $lamdera$program_test$DebugParser$ElmType$ = function (a, b) {
	return {$: 'ElmType', a: a, b: b};
};
var $lamdera$program_test$DebugParser$ElmType = F2($lamdera$program_test$DebugParser$ElmType$);
var $lamdera$program_test$DebugParser$Expandable = function (a) {
	return {$: 'Expandable', a: a};
};
var $lamdera$program_test$DebugParser$Plain = function (a) {
	return {$: 'Plain', a: a};
};
var $lamdera$program_test$DebugParser$SeqArray = {$: 'SeqArray'};
var $lamdera$program_test$DebugParser$SeqList = {$: 'SeqList'};
var $lamdera$program_test$DebugParser$SeqSet = {$: 'SeqSet'};
var $lamdera$program_test$DebugParser$SeqTuple = {$: 'SeqTuple'};
var $lamdera$program_test$DebugParser$valueToElmValue = function (a) {
	return _DebugParser_toString(a);
};
var $lamdera$program_test$Effect$Test$checkCachedElmValueHelper$ = function (event, state) {
	return _Utils_update(
		event,
		{
			cachedElmValue: function () {
				var _v0 = event.eventType;
				switch (_v0.$) {
					case 'BackendUpdateEvent':
						var msg = _v0.a;
						var cmd3 = _v0.b;
						return $elm$core$Maybe$Just(
							{
								diff: $lamdera$program_test$DebugParser$valueToElmValue(
									{
										newModel: event.backend,
										newSubscriptions: state.backendApp.subscriptions(event.backend)
									}),
								noDiff: $lamdera$program_test$DebugParser$valueToElmValue(
									{backendMsg: msg, cmds: cmd3})
							});
					case 'UpdateFromFrontendEvent':
						var cmds = _v0.a.cmds;
						var toBackend = _v0.a.toBackend;
						return $elm$core$Maybe$Just(
							{
								diff: $lamdera$program_test$DebugParser$valueToElmValue(
									{
										newModel: event.backend,
										newSubscriptions: state.backendApp.subscriptions(event.backend)
									}),
								noDiff: $lamdera$program_test$DebugParser$valueToElmValue(
									{cmds: cmds, toBackend: toBackend})
							});
					case 'UpdateFromBackendEvent':
						var cmds = _v0.a.cmds;
						var toFrontend = _v0.a.toFrontend;
						var clientId = _v0.a.clientId;
						var _v1 = $lamdera$containers$SeqDict$get$(clientId, event.frontends);
						if (_v1.$ === 'Just') {
							var frontend = _v1.a;
							return $elm$core$Maybe$Just(
								{
									diff: $lamdera$program_test$DebugParser$valueToElmValue(
										{
											newModel: frontend.model,
											newSubscriptions: state.frontendApp.subscriptions(frontend.model)
										}),
									noDiff: $lamdera$program_test$DebugParser$valueToElmValue(
										{cmds: cmds, toFrontend: toFrontend})
								});
						} else {
							return $elm$core$Maybe$Nothing;
						}
					case 'FrontendUpdateEvent':
						var clientId = _v0.a;
						var frontendMsg = _v0.b;
						var cmd3 = _v0.c;
						var _v2 = $lamdera$containers$SeqDict$get$(clientId, event.frontends);
						if (_v2.$ === 'Just') {
							var frontend = _v2.a;
							return $elm$core$Maybe$Just(
								{
									diff: $lamdera$program_test$DebugParser$valueToElmValue(
										{
											newModel: frontend.model,
											newSubscriptions: state.frontendApp.subscriptions(frontend.model)
										}),
									noDiff: $lamdera$program_test$DebugParser$valueToElmValue(
										{cmds: cmd3, frontendMsg: frontendMsg})
								});
						} else {
							return $elm$core$Maybe$Nothing;
						}
					case 'BackendInitEvent':
						var cmd3 = _v0.a;
						return $elm$core$Maybe$Just(
							{
								diff: $lamdera$program_test$DebugParser$valueToElmValue(
									{
										newModel: event.backend,
										newSubscriptions: state.backendApp.subscriptions(event.backend)
									}),
								noDiff: $lamdera$program_test$DebugParser$valueToElmValue(
									{cmds: cmd3})
							});
					case 'FrontendInitEvent':
						var data = _v0.a;
						var _v3 = $lamdera$containers$SeqDict$get$(data.clientId, event.frontends);
						if (_v3.$ === 'Just') {
							var frontend = _v3.a;
							return $elm$core$Maybe$Just(
								{
									diff: $lamdera$program_test$DebugParser$valueToElmValue(
										{
											newModel: frontend.model,
											newSubscriptions: state.frontendApp.subscriptions(frontend.model)
										}),
									noDiff: $lamdera$program_test$DebugParser$valueToElmValue(
										{cmds: data.cmds})
								});
						} else {
							return $elm$core$Maybe$Nothing;
						}
					case 'TestEvent':
						return $elm$core$Maybe$Nothing;
					case 'CheckStateEvent':
						return $elm$core$Maybe$Nothing;
					case 'UserInputEvent':
						return $elm$core$Maybe$Nothing;
					case 'SnapshotEvent':
						return $elm$core$Maybe$Nothing;
					case 'ManuallySendToBackend':
						return $elm$core$Maybe$Nothing;
					case 'ManuallySendPortEvent':
						return $elm$core$Maybe$Nothing;
					case 'EffectFailedEvent':
						return $elm$core$Maybe$Nothing;
					case 'NavigateBack':
						return $elm$core$Maybe$Nothing;
					default:
						return $elm$core$Maybe$Nothing;
				}
			}()
		});
};
var $lamdera$program_test$Effect$Test$checkCachedElmValueHelper = F2($lamdera$program_test$Effect$Test$checkCachedElmValueHelper$);
var $lamdera$program_test$Effect$Test$BackendTimeline = {$: 'BackendTimeline'};
var $lamdera$program_test$Effect$Test$currentTimeline = function (currentTest) {
	return $elm$core$Maybe$withDefault$(
		$lamdera$program_test$Effect$Test$BackendTimeline,
		$elm$core$Array$get$(currentTest.timelineIndex, currentTest.timelines));
};
var $lamdera$program_test$Effect$Test$Continue = function (a) {
	return {$: 'Continue', a: a};
};
var $lamdera$program_test$Effect$Test$Done = function (a) {
	return {$: 'Done', a: a};
};
var $lamdera$program_test$Effect$Test$FrontendTimeline = function (a) {
	return {$: 'FrontendTimeline', a: a};
};
var $lamdera$program_test$Effect$Test$eventTypeToTimelineType = function (eventType) {
	switch (eventType.$) {
		case 'UpdateFromFrontendEvent':
			return $lamdera$program_test$Effect$Test$BackendTimeline;
		case 'UpdateFromBackendEvent':
			var clientId = eventType.a.clientId;
			return $lamdera$program_test$Effect$Test$FrontendTimeline(clientId);
		case 'BackendUpdateEvent':
			return $lamdera$program_test$Effect$Test$BackendTimeline;
		case 'FrontendUpdateEvent':
			var clientId = eventType.a;
			return $lamdera$program_test$Effect$Test$FrontendTimeline(clientId);
		case 'TestEvent':
			var maybeClientId = eventType.a;
			if (maybeClientId.$ === 'Just') {
				var clientId = maybeClientId.a;
				return $lamdera$program_test$Effect$Test$FrontendTimeline(clientId);
			} else {
				return $lamdera$program_test$Effect$Test$BackendTimeline;
			}
		case 'BackendInitEvent':
			return $lamdera$program_test$Effect$Test$BackendTimeline;
		case 'FrontendInitEvent':
			var clientId = eventType.a.clientId;
			return $lamdera$program_test$Effect$Test$FrontendTimeline(clientId);
		case 'CheckStateEvent':
			var checkType = eventType.a.checkType;
			switch (checkType.$) {
				case 'CheckFrontendView':
					var clientId = checkType.a;
					return $lamdera$program_test$Effect$Test$FrontendTimeline(clientId);
				case 'CheckFrontendState':
					var clientId = checkType.a;
					return $lamdera$program_test$Effect$Test$FrontendTimeline(clientId);
				case 'CheckState':
					return $lamdera$program_test$Effect$Test$BackendTimeline;
				default:
					return $lamdera$program_test$Effect$Test$BackendTimeline;
			}
		case 'UserInputEvent':
			var data = eventType.a;
			return $lamdera$program_test$Effect$Test$FrontendTimeline(data.clientId);
		case 'SnapshotEvent':
			var data = eventType.a;
			return $lamdera$program_test$Effect$Test$FrontendTimeline(data.clientId);
		case 'ManuallySendToBackend':
			var data = eventType.a;
			return $lamdera$program_test$Effect$Test$FrontendTimeline(data.clientId);
		case 'ManuallySendPortEvent':
			var data = eventType.a;
			return $lamdera$program_test$Effect$Test$FrontendTimeline(data.clientId);
		case 'EffectFailedEvent':
			var maybeClientId = eventType.a;
			if (maybeClientId.$ === 'Just') {
				var clientId = maybeClientId.a;
				return $lamdera$program_test$Effect$Test$FrontendTimeline(clientId);
			} else {
				return $lamdera$program_test$Effect$Test$BackendTimeline;
			}
		case 'NavigateBack':
			var clientId = eventType.a;
			return $lamdera$program_test$Effect$Test$FrontendTimeline(clientId);
		default:
			var clientId = eventType.a;
			return $lamdera$program_test$Effect$Test$FrontendTimeline(clientId);
	}
};
var $lamdera$program_test$Effect$Test$isSkippable = function (eventType) {
	switch (eventType.$) {
		case 'TestEvent':
			return true;
		case 'UserInputEvent':
			return true;
		case 'CheckStateEvent':
			return true;
		case 'UpdateFromFrontendEvent':
			return false;
		case 'UpdateFromBackendEvent':
			return false;
		case 'BackendUpdateEvent':
			return false;
		case 'FrontendUpdateEvent':
			return false;
		case 'BackendInitEvent':
			return false;
		case 'FrontendInitEvent':
			return false;
		case 'SnapshotEvent':
			return true;
		case 'ManuallySendToBackend':
			return true;
		case 'ManuallySendPortEvent':
			return true;
		case 'EffectFailedEvent':
			return true;
		case 'NavigateBack':
			return true;
		default:
			return true;
	}
};
var $elm$core$Array$sliceLeft$ = function (from, array) {
	var len = array.a;
	var tree = array.c;
	var tail = array.d;
	if (!from) {
		return array;
	} else {
		if (_Utils_cmp(
			from,
			$elm$core$Array$tailIndex(len)) > -1) {
			return $elm$core$Array$Array_elm_builtin$(
				len - from,
				$elm$core$Array$shiftStep,
				$elm$core$Elm$JsArray$empty,
				A3(
					$elm$core$Elm$JsArray$slice,
					from - $elm$core$Array$tailIndex(len),
					$elm$core$Elm$JsArray$length(tail),
					tail));
		} else {
			var skipNodes = (from / $elm$core$Array$branchFactor) | 0;
			var helper = F2(
				function (node, acc) {
					if (node.$ === 'SubTree') {
						var subTree = node.a;
						return A3($elm$core$Elm$JsArray$foldr, helper, acc, subTree);
					} else {
						var leaf = node.a;
						return A2($elm$core$List$cons, leaf, acc);
					}
				});
			var leafNodes = A3(
				$elm$core$Elm$JsArray$foldr,
				helper,
				_List_fromArray(
					[tail]),
				tree);
			var nodesToInsert = $elm$core$List$drop$(skipNodes, leafNodes);
			if (!nodesToInsert.b) {
				return $elm$core$Array$empty;
			} else {
				var head = nodesToInsert.a;
				var rest = nodesToInsert.b;
				var firstSlice = from - (skipNodes * $elm$core$Array$branchFactor);
				var initialBuilder = {
					nodeList: _List_Nil,
					nodeListSize: 0,
					tail: A3(
						$elm$core$Elm$JsArray$slice,
						firstSlice,
						$elm$core$Elm$JsArray$length(head),
						head)
				};
				return $elm$core$Array$builderToArray$(
					true,
					$elm$core$List$foldl$($elm$core$Array$appendHelpBuilder, initialBuilder, rest));
			}
		}
	}
};
var $elm$core$Array$sliceLeft = F2($elm$core$Array$sliceLeft$);
var $elm$core$Array$fetchNewTail$ = function (shift, end, treeEnd, tree) {
	fetchNewTail:
	while (true) {
		var pos = $elm$core$Array$bitMask & (treeEnd >>> shift);
		var _v0 = A2($elm$core$Elm$JsArray$unsafeGet, pos, tree);
		if (_v0.$ === 'SubTree') {
			var sub = _v0.a;
			var $temp$shift = shift - $elm$core$Array$shiftStep,
				$temp$tree = sub;
			shift = $temp$shift;
			tree = $temp$tree;
			continue fetchNewTail;
		} else {
			var values = _v0.a;
			return A3($elm$core$Elm$JsArray$slice, 0, $elm$core$Array$bitMask & end, values);
		}
	}
};
var $elm$core$Array$fetchNewTail = F4($elm$core$Array$fetchNewTail$);
var $elm$core$Array$hoistTree$ = function (oldShift, newShift, tree) {
	hoistTree:
	while (true) {
		if ((_Utils_cmp(oldShift, newShift) < 1) || (!$elm$core$Elm$JsArray$length(tree))) {
			return tree;
		} else {
			var _v0 = A2($elm$core$Elm$JsArray$unsafeGet, 0, tree);
			if (_v0.$ === 'SubTree') {
				var sub = _v0.a;
				var $temp$oldShift = oldShift - $elm$core$Array$shiftStep,
					$temp$tree = sub;
				oldShift = $temp$oldShift;
				tree = $temp$tree;
				continue hoistTree;
			} else {
				return tree;
			}
		}
	}
};
var $elm$core$Array$hoistTree = F3($elm$core$Array$hoistTree$);
var $elm$core$Array$sliceTree$ = function (shift, endIdx, tree) {
	var lastPos = $elm$core$Array$bitMask & (endIdx >>> shift);
	var _v0 = A2($elm$core$Elm$JsArray$unsafeGet, lastPos, tree);
	if (_v0.$ === 'SubTree') {
		var sub = _v0.a;
		var newSub = $elm$core$Array$sliceTree$(shift - $elm$core$Array$shiftStep, endIdx, sub);
		return (!$elm$core$Elm$JsArray$length(newSub)) ? A3($elm$core$Elm$JsArray$slice, 0, lastPos, tree) : A3(
			$elm$core$Elm$JsArray$unsafeSet,
			lastPos,
			$elm$core$Array$SubTree(newSub),
			A3($elm$core$Elm$JsArray$slice, 0, lastPos + 1, tree));
	} else {
		return A3($elm$core$Elm$JsArray$slice, 0, lastPos, tree);
	}
};
var $elm$core$Array$sliceTree = F3($elm$core$Array$sliceTree$);
var $elm$core$Array$sliceRight$ = function (end, array) {
	var len = array.a;
	var startShift = array.b;
	var tree = array.c;
	var tail = array.d;
	if (_Utils_eq(end, len)) {
		return array;
	} else {
		if (_Utils_cmp(
			end,
			$elm$core$Array$tailIndex(len)) > -1) {
			return $elm$core$Array$Array_elm_builtin$(
				end,
				startShift,
				tree,
				A3($elm$core$Elm$JsArray$slice, 0, $elm$core$Array$bitMask & end, tail));
		} else {
			var endIdx = $elm$core$Array$tailIndex(end);
			var depth = $elm$core$Basics$floor(
				$elm$core$Basics$logBase$(
					$elm$core$Array$branchFactor,
					$elm$core$Basics$max$(1, endIdx - 1)));
			var newShift = $elm$core$Basics$max$(5, depth * $elm$core$Array$shiftStep);
			return $elm$core$Array$Array_elm_builtin$(
				end,
				newShift,
				$elm$core$Array$hoistTree$(
					startShift,
					newShift,
					$elm$core$Array$sliceTree$(startShift, endIdx, tree)),
				$elm$core$Array$fetchNewTail$(startShift, end, endIdx, tree));
		}
	}
};
var $elm$core$Array$sliceRight = F2($elm$core$Array$sliceRight$);
var $elm$core$Array$translateIndex$ = function (index, _v0) {
	var len = _v0.a;
	var posIndex = (index < 0) ? (len + index) : index;
	return (posIndex < 0) ? 0 : ((_Utils_cmp(posIndex, len) > 0) ? len : posIndex);
};
var $elm$core$Array$translateIndex = F2($elm$core$Array$translateIndex$);
var $elm$core$Array$slice$ = function (from, to, array) {
	var correctTo = $elm$core$Array$translateIndex$(to, array);
	var correctFrom = $elm$core$Array$translateIndex$(from, array);
	return (_Utils_cmp(correctFrom, correctTo) > 0) ? $elm$core$Array$empty : $elm$core$Array$sliceLeft$(
		correctFrom,
		$elm$core$Array$sliceRight$(correctTo, array));
};
var $elm$core$Array$slice = F3($elm$core$Array$slice$);
var $lamdera$program_test$Effect$Test$previousTimelineStep$ = function (skipTestEvents, stepIndex, timeline, test) {
	return (stepIndex <= 0) ? $elm$core$Maybe$Nothing : function (a) {
		if (a.$ === 'Continue') {
			return $elm$core$Maybe$Nothing;
		} else {
			var b = a.a;
			return $elm$core$Maybe$Just(b);
		}
	}(
		$elm$core$Array$foldr$(
			F2(
				function (step, state) {
					if (state.$ === 'Done') {
						return state;
					} else {
						var index = state.a;
						return (skipTestEvents && $lamdera$program_test$Effect$Test$isSkippable(step.eventType)) ? $lamdera$program_test$Effect$Test$Continue(index - 1) : (_Utils_eq(
							$lamdera$program_test$Effect$Test$eventTypeToTimelineType(step.eventType),
							timeline) ? $lamdera$program_test$Effect$Test$Done(
							_Utils_Tuple2(index, step)) : $lamdera$program_test$Effect$Test$Continue(index - 1));
					}
				}),
			$lamdera$program_test$Effect$Test$Continue(stepIndex - 1),
			$elm$core$Array$slice$(0, stepIndex, test.steps)));
};
var $lamdera$program_test$Effect$Test$previousTimelineStep = F4($lamdera$program_test$Effect$Test$previousTimelineStep$);
var $lamdera$program_test$Effect$Test$currentAndPreviousStepIndex = function (testView_) {
	var _v0 = $lamdera$program_test$Effect$Test$previousTimelineStep$(
		true,
		testView_.stepIndex + 1,
		$lamdera$program_test$Effect$Test$currentTimeline(testView_),
		testView_);
	if (_v0.$ === 'Just') {
		var _v1 = _v0.a;
		var currentIndex = _v1.a;
		return {
			currentStep: $elm$core$Maybe$Just(currentIndex),
			previousStep: $elm$core$Maybe$map$(
				$elm$core$Tuple$first,
				$lamdera$program_test$Effect$Test$previousTimelineStep$(
					true,
					currentIndex,
					$lamdera$program_test$Effect$Test$currentTimeline(testView_),
					testView_))
		};
	} else {
		return {currentStep: $elm$core$Maybe$Nothing, previousStep: $elm$core$Maybe$Nothing};
	}
};
var $lamdera$program_test$Effect$Test$getAt$ = function (index, list) {
	return $elm$core$List$head(
		$elm$core$List$drop$(index, list));
};
var $lamdera$program_test$Effect$Test$getAt = F2($lamdera$program_test$Effect$Test$getAt$);
var $lamdera$program_test$Effect$Test$getState = function (instructions) {
	getState:
	while (true) {
		switch (instructions.$) {
			case 'NextStep':
				var instructions_ = instructions.b;
				var $temp$instructions = instructions_;
				instructions = $temp$instructions;
				continue getState;
			case 'AndThen':
				var instructions_ = instructions.b;
				var $temp$instructions = instructions_;
				instructions = $temp$instructions;
				continue getState;
			default:
				var state = instructions.a;
				return state;
		}
	}
};
var $lamdera$program_test$Effect$Test$updateAt$ = function (index, mapFunc, array) {
	var _v0 = $elm$core$Array$get$(index, array);
	if (_v0.$ === 'Just') {
		var item = _v0.a;
		return $elm$core$Array$set$(
			index,
			mapFunc(item),
			array);
	} else {
		return array;
	}
};
var $lamdera$program_test$Effect$Test$updateAt = F3($lamdera$program_test$Effect$Test$updateAt$);
var $lamdera$program_test$Effect$Test$updateCurrentTest$ = function (func, _v0) {
	var model = _v0.a;
	var _v1 = model.currentTest;
	if (_v1.$ === 'Just') {
		var currentTest = _v1.a;
		var _v2 = func(currentTest);
		var currentTest2 = _v2.a;
		var cmd = _v2.b;
		return _Utils_Tuple2(
			$lamdera$program_test$Effect$Test$Model(
				_Utils_update(
					model,
					{
						currentTest: $elm$core$Maybe$Just(currentTest2)
					})),
			cmd);
	} else {
		return _Utils_Tuple2(
			$lamdera$program_test$Effect$Test$Model(model),
			$elm$core$Platform$Cmd$none);
	}
};
var $lamdera$program_test$Effect$Test$updateCurrentTest = F2($lamdera$program_test$Effect$Test$updateCurrentTest$);
var $lamdera$program_test$Effect$Test$checkCachedElmValue = function (_v0) {
	var model = _v0.a.a;
	var cmdA = _v0.b;
	var _v1 = $lamdera$program_test$Effect$Test$updateCurrentTest$(
		function (currentTest) {
			return _Utils_Tuple2(
				function () {
					var _v2 = _Utils_Tuple2(currentTest.showModel, model.tests);
					if ((_v2.a && (_v2.b.$ === 'Just')) && (_v2.b.a.$ === 'Ok')) {
						var tests = _v2.b.a.a;
						var _v3 = $lamdera$program_test$Effect$Test$getAt$(currentTest.index, tests);
						if (_v3.$ === 'Just') {
							var test = _v3.a;
							var state = $lamdera$program_test$Effect$Test$getState(test);
							var currentAndPreviousStep = $lamdera$program_test$Effect$Test$currentAndPreviousStepIndex(currentTest);
							var steps2 = function () {
								var _v6 = currentAndPreviousStep.currentStep;
								if (_v6.$ === 'Just') {
									var currentIndex = _v6.a;
									return $lamdera$program_test$Effect$Test$updateAt$(
										currentIndex,
										function (event) {
											var _v7 = event.cachedElmValue;
											if (_v7.$ === 'Just') {
												return event;
											} else {
												return $lamdera$program_test$Effect$Test$checkCachedElmValueHelper$(event, state);
											}
										},
										currentTest.steps);
								} else {
									return currentTest.steps;
								}
							}();
							return _Utils_update(
								currentTest,
								{
									steps: function () {
										var _v4 = currentAndPreviousStep.previousStep;
										if (_v4.$ === 'Just') {
											var previousIndex = _v4.a;
											return $lamdera$program_test$Effect$Test$updateAt$(
												previousIndex,
												function (event) {
													var _v5 = event.cachedElmValue;
													if (_v5.$ === 'Just') {
														return event;
													} else {
														return $lamdera$program_test$Effect$Test$checkCachedElmValueHelper$(event, state);
													}
												},
												steps2);
										} else {
											return steps2;
										}
									}()
								});
						} else {
							return currentTest;
						}
					} else {
						return currentTest;
					}
				}(),
				$elm$core$Platform$Cmd$none);
		},
		$lamdera$program_test$Effect$Test$Model(model));
	var model2 = _v1.a;
	var cmdB = _v1.b;
	return _Utils_Tuple2(
		model2,
		$elm$core$Platform$Cmd$batch(
			_List_fromArray(
				[cmdA, cmdB])));
};
var $lamdera$program_test$Effect$Test$currentTestLocalStorage = 'current-test';
var $lamdera$core$Lamdera$Debug$debugD = function (l) {
	return _Lamdera_debugD(l);
};
var $lamdera$core$Lamdera$Debug$debugR$ = function (l, a) {
	return A2(_Lamdera_debugR, l, a);
};
var $lamdera$core$Lamdera$Debug$debugR = F2($lamdera$core$Lamdera$Debug$debugR$);
var $lamdera$program_test$Effect$Test$GotButtonPosition$ = function (a, b) {
	return {$: 'GotButtonPosition', a: a, b: b};
};
var $lamdera$program_test$Effect$Test$GotButtonPosition = F2($lamdera$program_test$Effect$Test$GotButtonPosition$);
var $elm$browser$Browser$Dom$getElement = _Browser_getElement;
var $lamdera$program_test$Effect$Test$getButtonPosition = function (step) {
	var _v0 = step.eventType;
	if (_v0.$ === 'UserInputEvent') {
		var inputType = _v0.a.inputType;
		var shouldGetButtonPosition = function () {
			switch (inputType.$) {
				case 'UserClicksButton':
					var htmlId = inputType.a;
					return $elm$core$Maybe$Just(htmlId);
				case 'UserPointerDownEvent':
					var htmlId = inputType.a;
					return $elm$core$Maybe$Just(htmlId);
				case 'UserPointerUpEvent':
					var htmlId = inputType.a;
					return $elm$core$Maybe$Just(htmlId);
				case 'UserPointerEnterEvent':
					var htmlId = inputType.a;
					return $elm$core$Maybe$Just(htmlId);
				case 'UserPointerLeaveEvent':
					var htmlId = inputType.a;
					return $elm$core$Maybe$Just(htmlId);
				case 'UserPointerOutEvent':
					var htmlId = inputType.a;
					return $elm$core$Maybe$Just(htmlId);
				case 'UserPointerMoveEvent':
					var htmlId = inputType.a;
					return $elm$core$Maybe$Just(htmlId);
				case 'UserPointerOverEvent':
					var htmlId = inputType.a;
					return $elm$core$Maybe$Just(htmlId);
				case 'UserPointerCancelEvent':
					var htmlId = inputType.a;
					return $elm$core$Maybe$Just(htmlId);
				case 'UserMouseEnterEvent':
					var htmlId = inputType.a;
					return $elm$core$Maybe$Just(htmlId);
				case 'UserMouseLeaveEvent':
					var htmlId = inputType.a;
					return $elm$core$Maybe$Just(htmlId);
				case 'UserMouseOutEvent':
					var htmlId = inputType.a;
					return $elm$core$Maybe$Just(htmlId);
				case 'UserMouseMoveEvent':
					var htmlId = inputType.a;
					return $elm$core$Maybe$Just(htmlId);
				case 'UserMouseOverEvent':
					var htmlId = inputType.a;
					return $elm$core$Maybe$Just(htmlId);
				case 'UserMouseUpEvent':
					var htmlId = inputType.a;
					return $elm$core$Maybe$Just(htmlId);
				case 'UserMouseDownEvent':
					var htmlId = inputType.a;
					return $elm$core$Maybe$Just(htmlId);
				default:
					return $elm$core$Maybe$Nothing;
			}
		}();
		if (shouldGetButtonPosition.$ === 'Just') {
			var htmlId = shouldGetButtonPosition.a;
			return $elm$core$Task$attempt$(
				$lamdera$program_test$Effect$Test$GotButtonPosition(htmlId),
				$elm$browser$Browser$Dom$getElement(
					$lamdera$program_test$Effect$Browser$Dom$idToString(htmlId)));
		} else {
			return $elm$core$Platform$Cmd$none;
		}
	} else {
		return $elm$core$Platform$Cmd$none;
	}
};
var $lamdera$program_test$Effect$Test$getTestName = function (instructions) {
	getTestName:
	while (true) {
		switch (instructions.$) {
			case 'NextStep':
				var instructions_ = instructions.b;
				var $temp$instructions = instructions_;
				instructions = $temp$instructions;
				continue getTestName;
			case 'AndThen':
				var instructions_ = instructions.b;
				var $temp$instructions = instructions_;
				instructions = $temp$instructions;
				continue getTestName;
			default:
				var state = instructions.a;
				return state.testName;
		}
	}
};
var $lamdera$program_test$Effect$Test$nextTimelineStep$ = function (skipTestEvents, stepIndex, timeline, test) {
	return (_Utils_cmp(
		stepIndex,
		$elm$core$Array$length(test.steps)) > -1) ? $elm$core$Maybe$Nothing : function (a) {
		if (a.$ === 'Continue') {
			return $elm$core$Maybe$Nothing;
		} else {
			var b = a.a;
			return $elm$core$Maybe$Just(b);
		}
	}(
		$elm$core$Array$foldl$(
			F2(
				function (step, state) {
					if (state.$ === 'Done') {
						return state;
					} else {
						var index = state.a;
						return (skipTestEvents && $lamdera$program_test$Effect$Test$isSkippable(step.eventType)) ? $lamdera$program_test$Effect$Test$Continue(index + 1) : (_Utils_eq(
							$lamdera$program_test$Effect$Test$eventTypeToTimelineType(step.eventType),
							timeline) ? $lamdera$program_test$Effect$Test$Done(
							_Utils_Tuple2(index, step)) : $lamdera$program_test$Effect$Test$Continue(index + 1));
					}
				}),
			$lamdera$program_test$Effect$Test$Continue(stepIndex + 1),
			$elm$core$Array$slice$(
				stepIndex + 1,
				$elm$core$Array$length(test.steps),
				test.steps)));
};
var $lamdera$program_test$Effect$Test$nextTimelineStep = F4($lamdera$program_test$Effect$Test$nextTimelineStep$);
var $lamdera$program_test$Effect$Test$instructionsToState = function (inProgress) {
	switch (inProgress.$) {
		case 'NextStep':
			var stateFunc = inProgress.a;
			var inProgress_ = inProgress.b;
			return stateFunc(
				$lamdera$program_test$Effect$Test$instructionsToState(inProgress_));
		case 'AndThen':
			var stateFunc = inProgress.a;
			var inProgress_ = inProgress.b;
			return $lamdera$program_test$Effect$Test$instructionsToState(
				stateFunc(
					$lamdera$program_test$Effect$Test$instructionsToState(inProgress_)));
		default:
			var state = inProgress.a;
			return state;
	}
};
var $lamdera$program_test$Effect$Test$runTests$ = function (tests, _v0) {
	var model = _v0.a;
	var _v1 = $lamdera$program_test$Effect$Test$getAt$(
		$elm$core$List$length(model.testResults),
		tests);
	if (_v1.$ === 'Just') {
		var test = _v1.a;
		return _Utils_Tuple2(
			$lamdera$program_test$Effect$Test$Model(
				_Utils_update(
					model,
					{
						testResults: _Utils_ap(
							model.testResults,
							_List_fromArray(
								[
									function () {
									var _v2 = $lamdera$program_test$Effect$Test$instructionsToState(test).testErrors;
									if (_v2.b) {
										var firstError = _v2.a;
										return $elm$core$Result$Err(firstError);
									} else {
										return $elm$core$Result$Ok(_Utils_Tuple0);
									}
								}()
								])),
						tests: $elm$core$Maybe$Just(
							$elm$core$Result$Ok(tests))
					})),
			$elm$core$Task$perform$(
				function (_v3) {
					return $lamdera$program_test$Effect$Test$GotFilesForTests(
						$elm$core$Result$Ok(tests));
				},
				$elm$core$Process$sleep(0)));
	} else {
		return _Utils_Tuple2(
			$lamdera$program_test$Effect$Test$Model(
				_Utils_update(
					model,
					{
						tests: $elm$core$Maybe$Just(
							$elm$core$Result$Ok(tests))
					})),
			$elm$core$Platform$Cmd$none);
	}
};
var $lamdera$program_test$Effect$Test$runTests = F2($lamdera$program_test$Effect$Test$runTests$);
var $lamdera$program_test$Effect$Test$NoOp = {$: 'NoOp'};
var $elm$browser$Browser$Dom$setViewportOf = _Browser_setViewportOf;
var $lamdera$program_test$Effect$Test$timelineColumnWidth = 14;
var $lamdera$program_test$Effect$Test$timelineContainerId = 'timelineContainer123';
var $lamdera$core$Lamdera$Debug$debugS$ = function (l, a) {
	return A2(_Lamdera_debugS, l, a);
};
var $lamdera$core$Lamdera$Debug$debugS = F2($lamdera$core$Lamdera$Debug$debugS$);
var $lamdera$program_test$Effect$Test$writeLocalStorage$ = function (testName, stepIndex, timelineIndex, position) {
	return $lamdera$core$Lamdera$Debug$debugS$(
		$lamdera$program_test$Effect$Test$currentTestLocalStorage,
		{
			isTopPosition: function () {
				if (position.$ === 'Top') {
					return true;
				} else {
					return false;
				}
			}(),
			name: testName,
			stepIndex: stepIndex,
			timelineIndex: timelineIndex
		});
};
var $lamdera$program_test$Effect$Test$writeLocalStorage = F4($lamdera$program_test$Effect$Test$writeLocalStorage$);
var $lamdera$program_test$Effect$Test$stepTo$ = function (stepIndex, currentTest) {
	var _v0 = $elm$core$Array$get$(stepIndex, currentTest.steps);
	if (_v0.$ === 'Just') {
		var step = _v0.a;
		var newTimeline = $lamdera$program_test$Effect$Test$eventTypeToTimelineType(step.eventType);
		var timelineIndex = $elm$core$Maybe$withDefault$(
			currentTest.timelineIndex,
			$lamdera$program_test$Effect$Test$arrayFindIndex$(newTimeline, currentTest.timelines));
		var _v1 = $lamdera$program_test$Effect$Test$writeLocalStorage$(currentTest.testName, stepIndex, timelineIndex, currentTest.overlayPosition);
		return _Utils_Tuple2(
			_Utils_update(
				currentTest,
				{stepIndex: stepIndex, timelineIndex: timelineIndex}),
			$elm$core$Platform$Cmd$batch(
				_List_fromArray(
					[
						$elm$core$Task$attempt$(
						function (_v2) {
							return $lamdera$program_test$Effect$Test$NoOp;
						},
						A2(
							$elm$core$Task$andThen,
							function (container) {
								return A3($elm$browser$Browser$Dom$setViewportOf, $lamdera$program_test$Effect$Test$timelineContainerId, (stepIndex * $lamdera$program_test$Effect$Test$timelineColumnWidth) - (container.element.width / 2), 0);
							},
							$elm$browser$Browser$Dom$getElement($lamdera$program_test$Effect$Test$timelineContainerId))),
						$lamdera$program_test$Effect$Test$getButtonPosition(step)
					])));
	} else {
		return _Utils_Tuple2(currentTest, $elm$core$Platform$Cmd$none);
	}
};
var $lamdera$program_test$Effect$Test$stepTo = F2($lamdera$program_test$Effect$Test$stepTo$);
var $elm$core$Basics$clamp$ = function (low, high, number) {
	return (_Utils_cmp(number, low) < 0) ? low : ((_Utils_cmp(number, high) > 0) ? high : number);
};
var $elm$core$Basics$clamp = F3($elm$core$Basics$clamp$);
var $lamdera$containers$SeqDict$size = function (_v0) {
	var triplets = _v0.c;
	return triplets.size;
};
var $elm$core$List$sortBy = _List_sortBy;
var $lamdera$program_test$Effect$Test$getTimelines2 = function (steps) {
	return $elm$core$Array$fromList(
		$elm$core$List$map$(
			$elm$core$Tuple$first,
			A2(
				$elm$core$List$sortBy,
				$elm$core$Tuple$second,
				$lamdera$containers$SeqDict$toList(
					$elm$core$Array$foldl$(
						F2(
							function (event, dict) {
								return $lamdera$containers$SeqDict$update$(
									$lamdera$program_test$Effect$Test$eventTypeToTimelineType(event.eventType),
									function (maybe) {
										if (maybe.$ === 'Just') {
											return maybe;
										} else {
											return $elm$core$Maybe$Just(
												$lamdera$containers$SeqDict$size(dict));
										}
									},
									dict);
							}),
						$lamdera$containers$SeqDict$empty,
						steps)))));
};
var $elm$browser$Browser$Dom$getViewportOf = _Browser_getViewportOf;
var $lamdera$program_test$Effect$Test$viewTest$ = function (test, index, stepIndex, timelineIndex, position, _v0) {
	var model = _v0.a;
	var state = $lamdera$program_test$Effect$Test$instructionsToState(test);
	var stepIndex2 = $elm$core$Basics$clamp$(
		0,
		$elm$core$Array$length(state.history) - 1,
		stepIndex);
	var timelines = $lamdera$program_test$Effect$Test$getTimelines2(state.history);
	return _Utils_Tuple2(
		$lamdera$program_test$Effect$Test$Model(
			_Utils_update(
				model,
				{
					currentTest: $elm$core$Maybe$Just(
						{
							buttonCursor: $elm$core$Maybe$Nothing,
							collapsedFields: $lamdera$containers$SeqDict$empty,
							index: index,
							overlayPosition: position,
							showModel: false,
							stepIndex: stepIndex2,
							steps: state.history,
							testName: state.testName,
							timelineIndex: $elm$core$Basics$clamp$(
								0,
								$elm$core$Array$length(timelines) - 1,
								timelineIndex),
							timelines: timelines
						})
				})),
		$elm$core$Platform$Cmd$batch(
			_List_fromArray(
				[
					$elm$core$Task$attempt$(
					function (_v2) {
						return $lamdera$program_test$Effect$Test$NoOp;
					},
					A2(
						$elm$core$Task$andThen,
						function (_v1) {
							var viewport = _v1.viewport;
							return A3($elm$browser$Browser$Dom$setViewportOf, $lamdera$program_test$Effect$Test$timelineContainerId, (stepIndex2 * $lamdera$program_test$Effect$Test$timelineColumnWidth) + (viewport.width / (-2)), 0);
						},
						$elm$browser$Browser$Dom$getViewportOf($lamdera$program_test$Effect$Test$timelineContainerId))),
					function () {
					var _v3 = $elm$core$Array$get$(stepIndex2, state.history);
					if (_v3.$ === 'Just') {
						var step = _v3.a;
						return $lamdera$program_test$Effect$Test$getButtonPosition(step);
					} else {
						return $elm$core$Platform$Cmd$none;
					}
				}()
				])));
};
var $lamdera$program_test$Effect$Test$viewTest = F6($lamdera$program_test$Effect$Test$viewTest$);
var $lamdera$program_test$Effect$Test$update$ = function (config, msg, _v0) {
	var model = _v0.a;
	return $lamdera$program_test$Effect$Test$checkCachedElmValue(
		function () {
			switch (msg.$) {
				case 'UrlClicked':
					var urlRequest = msg.a;
					if (urlRequest.$ === 'Internal') {
						return _Utils_Tuple2(
							$lamdera$program_test$Effect$Test$Model(model),
							$elm$core$Platform$Cmd$none);
					} else {
						var url = urlRequest.a;
						return _Utils_Tuple2(
							$lamdera$program_test$Effect$Test$Model(model),
							$elm$browser$Browser$Navigation$load(url));
					}
				case 'UrlChanged':
					return _Utils_Tuple2(
						$lamdera$program_test$Effect$Test$Model(model),
						$elm$core$Platform$Cmd$none);
				case 'PressedViewTest':
					var index = msg.a;
					var _v3 = model.tests;
					if (_v3.$ === 'Just') {
						if (_v3.a.$ === 'Err') {
							return _Utils_Tuple2(
								$lamdera$program_test$Effect$Test$Model(model),
								$elm$core$Platform$Cmd$none);
						} else {
							var tests = _v3.a.a;
							var _v4 = $lamdera$program_test$Effect$Test$getAt$(index, tests);
							if (_v4.$ === 'Just') {
								var test = _v4.a;
								var _v5 = $lamdera$program_test$Effect$Test$writeLocalStorage$(
									$lamdera$program_test$Effect$Test$getTestName(test),
									0,
									0,
									$lamdera$program_test$Effect$Test$Bottom);
								return $lamdera$program_test$Effect$Test$viewTest$(
									test,
									index,
									0,
									0,
									$lamdera$program_test$Effect$Test$Bottom,
									$lamdera$program_test$Effect$Test$Model(model));
							} else {
								return _Utils_Tuple2(
									$lamdera$program_test$Effect$Test$Model(model),
									$elm$core$Platform$Cmd$none);
							}
						}
					} else {
						return _Utils_Tuple2(
							$lamdera$program_test$Effect$Test$Model(model),
							$elm$core$Platform$Cmd$none);
					}
				case 'NoOp':
					return _Utils_Tuple2(
						$lamdera$program_test$Effect$Test$Model(model),
						$elm$core$Platform$Cmd$none);
				case 'PressedBackToOverview':
					var model2 = _Utils_update(
						model,
						{currentTest: $elm$core$Maybe$Nothing});
					var _v6 = model2.tests;
					if ((_v6.$ === 'Just') && (_v6.a.$ === 'Ok')) {
						var tests = _v6.a.a;
						return $elm$core$Tuple$mapSecond$(
							function (cmd) {
								return $elm$core$Platform$Cmd$batch(
									_List_fromArray(
										[
											$lamdera$core$Lamdera$Debug$debugD($lamdera$program_test$Effect$Test$currentTestLocalStorage),
											cmd
										]));
							},
							$lamdera$program_test$Effect$Test$runTests$(
								tests,
								$lamdera$program_test$Effect$Test$Model(model2)));
					} else {
						return _Utils_Tuple2(
							$lamdera$program_test$Effect$Test$Model(model2),
							$lamdera$core$Lamdera$Debug$debugD($lamdera$program_test$Effect$Test$currentTestLocalStorage));
					}
				case 'ShortPauseFinished':
					return _Utils_Tuple2(
						$lamdera$program_test$Effect$Test$Model(model),
						$elm$core$Task$attempt$($lamdera$program_test$Effect$Test$GotFilesForTests, config.cmds));
				case 'GotFilesForTests':
					var result = msg.a;
					if (result.$ === 'Ok') {
						var tests = result.a;
						var maybeModelAndCmd = function () {
							var _v10 = $lamdera$core$Lamdera$Debug$debugR$(
								$lamdera$program_test$Effect$Test$currentTestLocalStorage,
								{index: 0, isTopPosition: false, name: '', stepIndex: 0, timelineIndex: 0});
							if (_v10.$ === 'Just') {
								var isTopPosition = _v10.a.isTopPosition;
								var timelineIndex = _v10.a.timelineIndex;
								var stepIndex = _v10.a.stepIndex;
								var name = _v10.a.name;
								return $elm$core$List$head(
									$elm$core$List$filterMap$(
										$elm$core$Basics$identity,
										$elm$core$List$indexedMap$(
											F2(
												function (testIndex, test) {
													return _Utils_eq(
														name,
														$lamdera$program_test$Effect$Test$getTestName(test)) ? $elm$core$Maybe$Just(
														$lamdera$program_test$Effect$Test$viewTest$(
															test,
															testIndex,
															stepIndex,
															timelineIndex,
															isTopPosition ? $lamdera$program_test$Effect$Test$Top : $lamdera$program_test$Effect$Test$Bottom,
															$lamdera$program_test$Effect$Test$Model(model))) : $elm$core$Maybe$Nothing;
												}),
											tests)));
							} else {
								return $elm$core$Maybe$Nothing;
							}
						}();
						if (maybeModelAndCmd.$ === 'Just') {
							var _v9 = maybeModelAndCmd.a;
							var model2 = _v9.a.a;
							var cmd = _v9.b;
							return _Utils_Tuple2(
								$lamdera$program_test$Effect$Test$Model(
									_Utils_update(
										model2,
										{
											tests: $elm$core$Maybe$Just(
												$elm$core$Result$Ok(tests))
										})),
								cmd);
						} else {
							return $lamdera$program_test$Effect$Test$runTests$(
								tests,
								$lamdera$program_test$Effect$Test$Model(model));
						}
					} else {
						var error = result.a;
						return _Utils_Tuple2(
							$lamdera$program_test$Effect$Test$Model(
								_Utils_update(
									model,
									{
										tests: $elm$core$Maybe$Just(
											$elm$core$Result$Err(error))
									})),
							$elm$core$Platform$Cmd$none);
					}
				case 'PressedToggleOverlayPosition':
					return $lamdera$program_test$Effect$Test$updateCurrentTest$(
						function (currentTest) {
							var newPosition = function () {
								var _v12 = currentTest.overlayPosition;
								if (_v12.$ === 'Top') {
									return $lamdera$program_test$Effect$Test$Bottom;
								} else {
									return $lamdera$program_test$Effect$Test$Top;
								}
							}();
							var _v11 = $lamdera$program_test$Effect$Test$writeLocalStorage$(currentTest.testName, currentTest.stepIndex, currentTest.timelineIndex, newPosition);
							return _Utils_Tuple2(
								_Utils_update(
									currentTest,
									{overlayPosition: newPosition}),
								$elm$core$Platform$Cmd$none);
						},
						$lamdera$program_test$Effect$Test$Model(model));
				case 'PressedShowModel':
					return $lamdera$program_test$Effect$Test$updateCurrentTest$(
						function (currentTest) {
							return _Utils_Tuple2(
								_Utils_update(
									currentTest,
									{showModel: true}),
								$elm$core$Platform$Cmd$none);
						},
						$lamdera$program_test$Effect$Test$Model(model));
				case 'PressedHideModel':
					return $lamdera$program_test$Effect$Test$updateCurrentTest$(
						function (currentTest) {
							return _Utils_Tuple2(
								_Utils_update(
									currentTest,
									{showModel: false}),
								function () {
									var _v13 = $elm$core$Array$get$(currentTest.stepIndex, currentTest.steps);
									if (_v13.$ === 'Just') {
										var step = _v13.a;
										return $lamdera$program_test$Effect$Test$getButtonPosition(step);
									} else {
										return $elm$core$Platform$Cmd$none;
									}
								}());
						},
						$lamdera$program_test$Effect$Test$Model(model));
				case 'PressedExpandField':
					var pathNodes = msg.a;
					return $lamdera$program_test$Effect$Test$updateCurrentTest$(
						function (currentTest) {
							return _Utils_Tuple2(
								_Utils_update(
									currentTest,
									{
										collapsedFields: $lamdera$containers$SeqDict$insert$(pathNodes, $lamdera$program_test$Effect$TreeView$FieldIsExpanded, currentTest.collapsedFields)
									}),
								$elm$core$Platform$Cmd$none);
						},
						$lamdera$program_test$Effect$Test$Model(model));
				case 'PressedCollapseField':
					var pathNodes = msg.a;
					return $lamdera$program_test$Effect$Test$updateCurrentTest$(
						function (currentTest) {
							return _Utils_Tuple2(
								_Utils_update(
									currentTest,
									{
										collapsedFields: $lamdera$containers$SeqDict$insert$(pathNodes, $lamdera$program_test$Effect$TreeView$FieldIsCollapsed, currentTest.collapsedFields)
									}),
								$elm$core$Platform$Cmd$none);
						},
						$lamdera$program_test$Effect$Test$Model(model));
				case 'PressedArrowKey':
					var arrowKey = msg.a;
					return $lamdera$program_test$Effect$Test$updateCurrentTest$(
						function (currentTest) {
							switch (arrowKey.$) {
								case 'ArrowRight':
									var _v15 = $lamdera$program_test$Effect$Test$nextTimelineStep$(
										false,
										currentTest.stepIndex,
										$lamdera$program_test$Effect$Test$currentTimeline(currentTest),
										currentTest);
									if (_v15.$ === 'Just') {
										var _v16 = _v15.a;
										var nextIndex = _v16.a;
										return $lamdera$program_test$Effect$Test$stepTo$(nextIndex, currentTest);
									} else {
										return _Utils_Tuple2(currentTest, $elm$core$Platform$Cmd$none);
									}
								case 'ArrowLeft':
									var _v17 = $lamdera$program_test$Effect$Test$previousTimelineStep$(
										false,
										currentTest.stepIndex,
										$lamdera$program_test$Effect$Test$currentTimeline(currentTest),
										currentTest);
									if (_v17.$ === 'Just') {
										var _v18 = _v17.a;
										var previousIndex = _v18.a;
										return $lamdera$program_test$Effect$Test$stepTo$(previousIndex, currentTest);
									} else {
										return _Utils_Tuple2(currentTest, $elm$core$Platform$Cmd$none);
									}
								case 'ArrowUp':
									var timelineIndex = $elm$core$Basics$max$(0, currentTest.timelineIndex - 1);
									var _v19 = $lamdera$program_test$Effect$Test$writeLocalStorage$(currentTest.testName, currentTest.stepIndex, timelineIndex, currentTest.overlayPosition);
									return _Utils_Tuple2(
										_Utils_update(
											currentTest,
											{timelineIndex: timelineIndex}),
										$elm$core$Platform$Cmd$none);
								default:
									var timelineIndex = $elm$core$Basics$min$(
										$elm$core$Array$length(currentTest.timelines) - 1,
										currentTest.timelineIndex + 1);
									var _v20 = $lamdera$program_test$Effect$Test$writeLocalStorage$(currentTest.testName, currentTest.stepIndex, timelineIndex, currentTest.overlayPosition);
									return _Utils_Tuple2(
										_Utils_update(
											currentTest,
											{timelineIndex: timelineIndex}),
										$elm$core$Platform$Cmd$none);
							}
						},
						$lamdera$program_test$Effect$Test$Model(model));
				case 'GotWindowSize':
					var width = msg.a;
					var height = msg.b;
					return _Utils_Tuple2(
						$lamdera$program_test$Effect$Test$Model(
							_Utils_update(
								model,
								{
									windowSize: _Utils_Tuple2(width, height)
								})),
						function () {
							var _v21 = model.currentTest;
							if (_v21.$ === 'Just') {
								var currentTest = _v21.a;
								var _v22 = $elm$core$Array$get$(currentTest.stepIndex, currentTest.steps);
								if (_v22.$ === 'Just') {
									var step = _v22.a;
									return $lamdera$program_test$Effect$Test$getButtonPosition(step);
								} else {
									return $elm$core$Platform$Cmd$none;
								}
							} else {
								return $elm$core$Platform$Cmd$none;
							}
						}());
				case 'PressedTimelineEvent':
					var stepIndex = msg.a;
					return $lamdera$program_test$Effect$Test$updateCurrentTest$(
						$lamdera$program_test$Effect$Test$stepTo(stepIndex),
						$lamdera$program_test$Effect$Test$Model(model));
				case 'PressedTimeline':
					var timelineType = msg.a;
					return $lamdera$program_test$Effect$Test$updateCurrentTest$(
						function (currentTest) {
							var _v23 = $lamdera$program_test$Effect$Test$arrayFindIndex$(timelineType, currentTest.timelines);
							if (_v23.$ === 'Just') {
								var timelineIndex = _v23.a;
								return _Utils_Tuple2(
									_Utils_update(
										currentTest,
										{timelineIndex: timelineIndex}),
									$elm$core$Platform$Cmd$none);
							} else {
								return _Utils_Tuple2(currentTest, $elm$core$Platform$Cmd$none);
							}
						},
						$lamdera$program_test$Effect$Test$Model(model));
				default:
					var htmlId = msg.a;
					var result = msg.b;
					return $lamdera$program_test$Effect$Test$updateCurrentTest$(
						function (currentTest) {
							return _Utils_Tuple2(
								_Utils_update(
									currentTest,
									{
										buttonCursor: function () {
											if (result.$ === 'Ok') {
												var element = result.a.element;
												return $elm$core$Maybe$Just(
													{height: element.height, htmlId: htmlId, width: element.width, x: element.x, y: element.y});
											} else {
												return $elm$core$Maybe$Nothing;
											}
										}()
									}),
								$elm$core$Platform$Cmd$none);
						},
						$lamdera$program_test$Effect$Test$Model(model));
			}
		}());
};
var $lamdera$program_test$Effect$Test$update = F3($lamdera$program_test$Effect$Test$update$);
var $elm$html$Html$b = _VirtualDom_node('b');
var $lamdera$program_test$Effect$Test$defaultFontColor = A2($elm$html$Html$Attributes$style, 'color', 'rgb(240,240,240)');
var $lamdera$program_test$Effect$Test$errorColor = 'rgb(250, 100, 110)';
var $lamdera$program_test$Effect$Test$fileLoadErrorToString = function (error) {
	return 'Failed to load \"' + (error.name + ('\" ' + function () {
		var _v0 = error.error;
		if (_v0.$ === 'HttpError') {
			switch (_v0.a.$) {
				case 'NetworkError':
					var _v1 = _v0.a;
					return 'due to a network error';
				case 'BadUrl':
					return 'because the path is invalid';
				case 'Timeout':
					var _v2 = _v0.a;
					return 'due to a network timeout';
				case 'BadStatus':
					var code = _v0.a.a;
					return 'and instead got a ' + ($elm$core$String$fromInt(code) + ' error');
				default:
					return 'due to a bad response body';
			}
		} else {
			if (_v0.a.$ === 'LoadError') {
				var _v3 = _v0.a;
				return 'due to the file not being found or a network error';
			} else {
				var _v4 = _v0.a;
				var w = _v4.a;
				var h = _v4.b;
				return 'due to the texture being an invalid size (width: ' + ($elm$core$String$fromInt(w) + (', height: ' + ($elm$core$String$fromInt(h) + ')')));
			}
		}
	}()));
};
var $lamdera$program_test$Effect$Test$PressedViewTest = function (a) {
	return {$: 'PressedViewTest', a: a};
};
var $lamdera$program_test$Effect$Test$button$ = function (onPress, text_) {
	return A2(
		$elm$html$Html$button,
		_List_fromArray(
			[
				$elm$html$Html$Events$onClick(onPress),
				A2($elm$html$Html$Attributes$style, 'padding', '8px'),
				A2($elm$html$Html$Attributes$style, 'color', 'rgb(10,10,10)'),
				A2($elm$html$Html$Attributes$style, 'background-color', 'rgb(240,240,240)'),
				A2($elm$html$Html$Attributes$style, 'border-width', '0px'),
				A2($elm$html$Html$Attributes$style, 'border-radius', '4px')
			]),
		_List_fromArray(
			[
				$elm$html$Html$text(text_)
			]));
};
var $lamdera$program_test$Effect$Test$button = F2($lamdera$program_test$Effect$Test$button$);
var $lamdera$program_test$Effect$Test$darkBackground = A2($elm$html$Html$Attributes$style, 'background-color', 'rgba(0,0,0,0.9)');
var $lamdera$program_test$Effect$Test$titleText = function (text_) {
	return A2(
		$elm$html$Html$h1,
		_List_fromArray(
			[
				A2($elm$html$Html$Attributes$style, 'font-size', '20px'),
				$lamdera$program_test$Effect$Test$defaultFontColor
			]),
		_List_fromArray(
			[
				$elm$html$Html$text(text_)
			]));
};
var $lamdera$program_test$Effect$Test$overviewContainer = function (body) {
	return A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				A2($elm$html$Html$Attributes$style, 'padding', '8px'),
				A2($elm$html$Html$Attributes$style, 'font-family', 'arial'),
				A2($elm$html$Html$Attributes$style, 'font-size', '16px'),
				$lamdera$program_test$Effect$Test$darkBackground,
				A2($elm$html$Html$Attributes$style, 'height', '100vh')
			]),
		A2(
			$elm$core$List$cons,
			$lamdera$program_test$Effect$Test$titleText('End-to-end test viewer'),
			body));
};
var $lamdera$program_test$Effect$Test$testErrorToString = function (error) {
	switch (error.$) {
		case 'CustomError':
			var text_ = error.a;
			return text_;
		case 'UserEventError':
			var htmlId = error.a;
			var text_ = error.b;
			return 'User input event for \"' + ($lamdera$program_test$Effect$Browser$Dom$idToString(htmlId) + ('\" failed. ' + text_));
		case 'ClientIdNotFound':
			var clientId = error.a;
			return 'Client Id ' + ($lamdera$program_test$Effect$Lamdera$clientIdToString(clientId) + ' not found');
		case 'ViewTestError':
			var string = error.a;
			return string;
		case 'InvalidLinkUrl':
			var url = error.a;
			return url + ' is not an absolute path. Make sure it looks like \"/\" or \"/homepage\" and not \"https://domain.com/homepage\" or \"homepage\".';
		case 'InvalidFrontendConnectUrl':
			var url = error.a;
			return url + ' is not an absolute path. Make sure it looks like \"/\" or \"/homepage\" and not \"https://domain.com/homepage\" or \"homepage\".';
		case 'InvalidBrowserNavigationUrl':
			var url = error.a;
			return url + ' is not an absolute path. Make sure it looks like \"/\" or \"/homepage\" and not \"https://domain.com/homepage\" or \"homepage\".';
		case 'FileUploadNotHandled':
			return 'A client tried uploading a file but it wasn\'t handled by Config.handleFileUpload';
		case 'MultipleFilesUploadNotHandled':
			return 'A client tried uploading multiple files but it wasn\'t handled by Config.multipleFilesUpload';
		case 'HttpResponseContainsBytesThatCantConvertToString':
			var httpRequest = error.a;
			return 'Config.handleHttpRequest returned Bytes to ' + (httpRequest.url + ' but a String was expected and the Bytes couldn\'t be converted into a valid UTF-8 string');
		case 'HttpResponseCantConvertTextureToString':
			var httpRequest = error.a;
			return 'Config.handleHttpRequest returned a Texture to ' + (httpRequest.url + ' but a String was expected');
		case 'HttpRequestNotHandled':
			var httpRequest = error.a;
			return 'A client tried making an http request to ' + (httpRequest.url + ' but it wasn\'t handled by Config.handleHttpRequest');
		default:
			var portName = error.a;
			return 'Data was sent to the frontend through a port named \"' + (portName + '\" but there was no subscription for it');
	}
};
var $lamdera$program_test$Effect$Test$overview$ = function (tests, testResults_) {
	var overviewBody = function () {
		if (!tests.b) {
			return _List_fromArray(
				[
					A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							$lamdera$program_test$Effect$Test$defaultFontColor,
							A2($elm$html$Html$Attributes$style, 'padding', '4px')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text('You don\'t have any tests written yet!')
						]))
				]);
		} else {
			return $elm$core$List$reverse(
				$elm$core$List$foldl$(
					F2(
						function (test, _v1) {
							var elements = _v1.elements;
							var testResults = _v1.testResults;
							var index = _v1.index;
							return {
								elements: A2(
									$elm$core$List$cons,
									A2(
										$elm$html$Html$div,
										_List_fromArray(
											[
												A2($elm$html$Html$Attributes$style, 'padding-bottom', '4px')
											]),
										_List_fromArray(
											[
												$lamdera$program_test$Effect$Test$button$(
												$lamdera$program_test$Effect$Test$PressedViewTest(index),
												$lamdera$program_test$Effect$Test$getTestName(test)),
												function () {
												if (testResults.b) {
													if (testResults.a.$ === 'Ok') {
														return A2(
															$elm$html$Html$span,
															_List_fromArray(
																[
																	A2($elm$html$Html$Attributes$style, 'color', 'rgb(0, 200, 0)'),
																	A2($elm$html$Html$Attributes$style, 'padding', '4px')
																]),
															_List_fromArray(
																[
																	$elm$html$Html$text('Passed')
																]));
													} else {
														var head = testResults.a.a;
														var error = $lamdera$program_test$Effect$Test$testErrorToString(head);
														return A2(
															$elm$html$Html$b,
															_List_fromArray(
																[
																	A2($elm$html$Html$Attributes$style, 'color', $lamdera$program_test$Effect$Test$errorColor),
																	A2($elm$html$Html$Attributes$style, 'padding', '4px'),
																	A2($elm$html$Html$Attributes$style, 'white-space', 'pre-wrap')
																]),
															_List_fromArray(
																[
																	$elm$html$Html$text(error)
																]));
													}
												} else {
													return $elm$html$Html$text('');
												}
											}()
											])),
									elements),
								index: index + 1,
								testResults: $elm$core$List$drop$(1, testResults)
							};
						}),
					{elements: _List_Nil, index: 0, testResults: testResults_},
					tests).elements);
		}
	}();
	return $lamdera$program_test$Effect$Test$overviewContainer(overviewBody);
};
var $lamdera$program_test$Effect$Test$overview = F2($lamdera$program_test$Effect$Test$overview$);
var $lamdera$program_test$Effect$Test$centeredText = function (text2) {
	return A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				A2($elm$html$Html$Attributes$style, 'position', 'absolute'),
				A2($elm$html$Html$Attributes$style, 'text-align', 'center'),
				A2($elm$html$Html$Attributes$style, 'top', '400px'),
				A2($elm$html$Html$Attributes$style, 'font-size', '20px'),
				A2($elm$html$Html$Attributes$style, 'font-family', 'sans-serif'),
				A2($elm$html$Html$Attributes$style, 'width', '100%'),
				A2($elm$html$Html$Attributes$style, 'color', 'rgb(40, 40, 40)')
			]),
		_List_fromArray(
			[
				$elm$html$Html$text(text2)
			]));
};
var $elm$svg$Svg$Attributes$d = _VirtualDom_attribute('d');
var $elm$svg$Svg$Attributes$fill = _VirtualDom_attribute('fill');
var $elm$core$String$fromFloat = _String_fromNumber;
var $elm$svg$Svg$trustedNode = _VirtualDom_nodeNS('http://www.w3.org/2000/svg');
var $elm$svg$Svg$path = $elm$svg$Svg$trustedNode('path');
var $elm$svg$Svg$Attributes$stroke = _VirtualDom_attribute('stroke');
var $elm$svg$Svg$Attributes$strokeWidth = _VirtualDom_attribute('stroke-width');
var $elm$svg$Svg$svg = $elm$svg$Svg$trustedNode('svg');
var $elm$svg$Svg$Attributes$viewBox = _VirtualDom_attribute('viewBox');
var $elm$svg$Svg$Attributes$width = _VirtualDom_attribute('width');
var $lamdera$program_test$Effect$Test$drawCursor = function (_v0) {
	var x = _v0.a;
	var y = _v0.b;
	return A2(
		$elm$svg$Svg$svg,
		_List_fromArray(
			[
				$elm$svg$Svg$Attributes$width(
				$elm$core$String$fromInt(20)),
				A2(
				$elm$html$Html$Attributes$style,
				'left',
				$elm$core$String$fromFloat(x) + 'px'),
				A2(
				$elm$html$Html$Attributes$style,
				'top',
				$elm$core$String$fromFloat(y) + 'px'),
				A2($elm$html$Html$Attributes$style, 'position', 'absolute'),
				$elm$svg$Svg$Attributes$viewBox('10 10 240 260'),
				A2($elm$html$Html$Attributes$style, 'pointer-events', 'none')
			]),
		_List_fromArray(
			[
				A2(
				$elm$svg$Svg$path,
				_List_fromArray(
					[
						$elm$svg$Svg$Attributes$fill('black'),
						$elm$svg$Svg$Attributes$stroke('black'),
						$elm$svg$Svg$Attributes$strokeWidth('30'),
						$elm$svg$Svg$Attributes$d('M224.15,179.17l-46.83-46.82,37.93-13.51.76-.3a20,20,0,0,0-1.76-37.27L54.16,29A20,20,0,0,0,29,54.16L81.27,214.24A20,20,0,0,0,118.54,216c.11-.25.21-.5.3-.76l13.51-37.92,46.83,46.82a20,20,0,0,0,28.28,0l16.69-16.68A20,20,0,0,0,224.15,179.17Zm-30.83,25.17-48.48-48.48A20,20,0,0,0,130.7,150a20.66,20.66,0,0,0-3.74.35A20,20,0,0,0,112.35,162c-.11.25-.21.5-.3.76L100.4,195.5,54.29,54.29l141.21,46.1-32.71,11.66c-.26.09-.51.19-.76.3a20,20,0,0,0-6.17,32.48h0l48.49,48.48Z')
					]),
				_List_Nil),
				A2(
				$elm$svg$Svg$path,
				_List_fromArray(
					[
						$elm$svg$Svg$Attributes$fill('white'),
						$elm$svg$Svg$Attributes$d('M224.15,179.17l-46.83-46.82,37.93-13.51.76-.3a20,20,0,0,0-1.76-37.27L54.16,29A20,20,0,0,0,29,54.16L81.27,214.24A20,20,0,0,0,118.54,216c.11-.25.21-.5.3-.76l13.51-37.92,46.83,46.82a20,20,0,0,0,28.28,0l16.69-16.68A20,20,0,0,0,224.15,179.17Zm-30.83,25.17-48.48-48.48A20,20,0,0,0,130.7,150a20.66,20.66,0,0,0-3.74.35A20,20,0,0,0,112.35,162c-.11.25-.21.5-.3.76L100.4,195.5,54.29,54.29l141.21,46.1-32.71,11.66c-.26.09-.51.19-.76.3a20,20,0,0,0-6.17,32.48h0l48.49,48.48Z')
					]),
				_List_Nil)
			]));
};
var $elm$virtual_dom$VirtualDom$lazy2 = _VirtualDom_lazy2;
var $elm$html$Html$Lazy$lazy2 = $elm$virtual_dom$VirtualDom$lazy2;
var $elm$virtual_dom$VirtualDom$lazy3 = _VirtualDom_lazy3;
var $elm$html$Html$Lazy$lazy3 = $elm$virtual_dom$VirtualDom$lazy3;
var $elm$virtual_dom$VirtualDom$map = _VirtualDom_map;
var $elm$html$Html$map = $elm$virtual_dom$VirtualDom$map;
var $lamdera$program_test$Effect$TreeView$DictKeyNode = function (a) {
	return {$: 'DictKeyNode', a: a};
};
var $lamdera$program_test$Effect$TreeView$DictNode = function (a) {
	return {$: 'DictNode', a: a};
};
var $lamdera$program_test$Effect$TreeView$FieldNode = function (a) {
	return {$: 'FieldNode', a: a};
};
var $lamdera$program_test$Effect$TreeView$SequenceNode = function (a) {
	return {$: 'SequenceNode', a: a};
};
var $lamdera$program_test$Effect$TreeView$VariantNode = function (a) {
	return {$: 'VariantNode', a: a};
};
var $lamdera$program_test$Effect$TreeView$alignTop = A2($elm$html$Html$Attributes$style, 'top', '0px');
var $lamdera$program_test$Effect$TreeView$borderColor = function (color) {
	return A2($elm$html$Html$Attributes$style, 'border-color', color);
};
var $lamdera$program_test$Effect$TreeView$centerY = _List_fromArray(
	[
		A2($elm$html$Html$Attributes$style, 'top', 'auto'),
		A2($elm$html$Html$Attributes$style, 'bottom', 'auto')
	]);
var $lamdera$program_test$Effect$TreeView$fontColor = function (color) {
	return A2($elm$html$Html$Attributes$style, 'color', color);
};
var $lamdera$program_test$Effect$TreeView$htmlEl$ = function (attributes, child) {
	return A2(
		$elm$html$Html$div,
		attributes,
		_List_fromArray(
			[child]));
};
var $lamdera$program_test$Effect$TreeView$htmlEl = F2($lamdera$program_test$Effect$TreeView$htmlEl$);
var $lamdera$program_test$Effect$TreeView$htmlText = function (text) {
	return $elm$html$Html$text(text);
};
var $lamdera$program_test$Effect$TreeView$items = function (count) {
	return (count === 1) ? '1 item>' : ($elm$core$String$fromInt(count) + ' items>');
};
var $lamdera$program_test$Effect$TreeView$rgb$ = function (r, g, b) {
	var a = function (color) {
		return $elm$core$String$fromInt(
			$elm$core$Basics$round(color * 255));
	};
	return 'rgb(' + (a(r) + (',' + (a(g) + (',' + (a(b) + ')')))));
};
var $lamdera$program_test$Effect$TreeView$rgb = F3($lamdera$program_test$Effect$TreeView$rgb$);
var $lamdera$program_test$Effect$TreeView$collapsedValue = function (value) {
	return $lamdera$program_test$Effect$TreeView$htmlEl$(
		_List_fromArray(
			[
				$lamdera$program_test$Effect$TreeView$fontColor(
				$lamdera$program_test$Effect$TreeView$rgb$(0.5, 0.5, 0.5))
			]),
		$lamdera$program_test$Effect$TreeView$htmlText(
			function () {
				if (value.$ === 'Plain') {
					return '<primitive>';
				} else {
					var expandableValue = value.a;
					switch (expandableValue.$) {
						case 'ElmSequence':
							var sequenceType = expandableValue.a;
							var elmValues = expandableValue.b;
							switch (sequenceType.$) {
								case 'SeqSet':
									return '<set, ' + $lamdera$program_test$Effect$TreeView$items(
										$elm$core$List$length(elmValues));
								case 'SeqList':
									return '<list, ' + $lamdera$program_test$Effect$TreeView$items(
										$elm$core$List$length(elmValues));
								case 'SeqArray':
									return '<array, ' + $lamdera$program_test$Effect$TreeView$items(
										$elm$core$List$length(elmValues));
								default:
									return '<tuple ' + ($elm$core$String$fromInt(
										$elm$core$List$length(elmValues)) + '>');
							}
						case 'ElmType':
							var variant = expandableValue.a;
							return '<' + (variant + '>');
						case 'ElmRecord':
							return '<record>';
						default:
							var list = expandableValue.a;
							return '<dict, ' + $lamdera$program_test$Effect$TreeView$items(
								$lamdera$containers$SeqDict$size(list));
					}
				}
			}()));
};
var $lamdera$program_test$Effect$TreeView$emptyDict = $lamdera$program_test$Effect$TreeView$htmlEl$(
	_List_fromArray(
		[
			$lamdera$program_test$Effect$TreeView$fontColor(
			$lamdera$program_test$Effect$TreeView$rgb$(0.5, 0.5, 0.5))
		]),
	$lamdera$program_test$Effect$TreeView$htmlText('<empty dict>'));
var $lamdera$program_test$Effect$TreeView$heightFill = A2($elm$html$Html$Attributes$style, 'height', '100%');
var $lamdera$program_test$Effect$TreeView$htmlColumn$ = function (attributes, children) {
	return A2($elm$html$Html$div, attributes, children);
};
var $lamdera$program_test$Effect$TreeView$htmlColumn = F2($lamdera$program_test$Effect$TreeView$htmlColumn$);
var $lamdera$program_test$Effect$TreeView$htmlRow$ = function (attributes, children) {
	return A2(
		$elm$html$Html$div,
		attributes,
		$elm$core$List$map$(
			function (item) {
				return A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							A2($elm$html$Html$Attributes$style, 'display', 'inline-block'),
							A2($elm$html$Html$Attributes$style, 'vertical-align', 'top')
						]),
					_List_fromArray(
						[item]));
			},
			children));
};
var $lamdera$program_test$Effect$TreeView$htmlRow = F2($lamdera$program_test$Effect$TreeView$htmlRow$);
var $lamdera$program_test$Effect$TreeView$inputButton$ = function (attributes, _v0) {
	var label = _v0.label;
	var onPress = _v0.onPress;
	return A2(
		$elm$html$Html$button,
		A2(
			$elm$core$List$cons,
			A2($elm$html$Html$Attributes$style, 'border-width', '0'),
			A2(
				$elm$core$List$cons,
				A2($elm$html$Html$Attributes$style, 'background-color', 'transparent'),
				A2(
					$elm$core$List$cons,
					A2($elm$html$Html$Attributes$style, 'color', 'inherit'),
					A2(
						$elm$core$List$cons,
						A2($elm$html$Html$Attributes$style, 'font-size', 'inherit'),
						A2(
							$elm$core$List$cons,
							A2($elm$html$Html$Attributes$style, 'font-family', 'inherit'),
							A2(
								$elm$core$List$cons,
								A2($elm$html$Html$Attributes$style, 'font-weight', 'inherit'),
								A2(
									$elm$core$List$cons,
									A2($elm$html$Html$Attributes$style, 'padding', '0'),
									A2(
										$elm$core$List$cons,
										A2($elm$html$Html$Attributes$style, 'margin', '0'),
										A2(
											$elm$core$List$cons,
											$elm$html$Html$Events$onClick(onPress),
											attributes))))))))),
		_List_fromArray(
			[label]));
};
var $lamdera$program_test$Effect$TreeView$inputButton = F2($lamdera$program_test$Effect$TreeView$inputButton$);
var $lamdera$program_test$Effect$TreeView$isCollapsed$ = function (depth, elmValue, nextPath, collapsedFields) {
	var _v0 = $lamdera$containers$SeqDict$get$(nextPath, collapsedFields);
	if (_v0.$ === 'Just') {
		if (_v0.a.$ === 'FieldIsCollapsed') {
			var _v1 = _v0.a;
			return true;
		} else {
			var _v2 = _v0.a;
			return false;
		}
	} else {
		if (depth > 5) {
			return true;
		} else {
			if (elmValue.$ === 'Plain') {
				return false;
			} else {
				var value2 = elmValue.a;
				switch (value2.$) {
					case 'ElmSequence':
						var list = value2.b;
						return $elm$core$List$length(list) > 5;
					case 'ElmType':
						var list = value2.b;
						return $elm$core$List$length(list) > 5;
					case 'ElmRecord':
						var list = value2.a;
						return $elm$core$List$length(list) > 5;
					default:
						var list = value2.a;
						return $lamdera$containers$SeqDict$size(list) > 5;
				}
			}
		}
	}
};
var $lamdera$program_test$Effect$TreeView$isCollapsed = F4($lamdera$program_test$Effect$TreeView$isCollapsed$);
var $lamdera$containers$SeqDict$isEmpty = function (_v0) {
	var bitmap = _v0.a;
	return !bitmap;
};
var $lamdera$program_test$Effect$TreeView$isSingleLine = function (elmValue) {
	if (elmValue.$ === 'Plain') {
		return true;
	} else {
		var expandable = elmValue.a;
		switch (expandable.$) {
			case 'ElmSequence':
				var elmValues = expandable.b;
				return $elm$core$List$isEmpty(elmValues);
			case 'ElmType':
				var elmValues = expandable.b;
				return $elm$core$List$isEmpty(elmValues);
			case 'ElmRecord':
				return false;
			default:
				var dict = expandable.a;
				return $lamdera$containers$SeqDict$isEmpty(dict);
		}
	}
};
var $lamdera$program_test$Effect$TreeView$charText = function (_char) {
	return $lamdera$program_test$Effect$TreeView$htmlEl$(
		_List_fromArray(
			[
				$lamdera$program_test$Effect$TreeView$fontColor(
				$lamdera$program_test$Effect$TreeView$rgb$(0.3, 0.5, 0.3))
			]),
		$lamdera$program_test$Effect$TreeView$htmlText(
			'\'' + ($elm$core$String$fromChar(_char) + '\'')));
};
var $lamdera$program_test$Effect$TreeView$numberText = function (number) {
	return $lamdera$program_test$Effect$TreeView$htmlEl$(
		_List_fromArray(
			[
				$lamdera$program_test$Effect$TreeView$fontColor(
				$lamdera$program_test$Effect$TreeView$rgb$(0.7, 0.4, 0.5))
			]),
		$lamdera$program_test$Effect$TreeView$htmlText(
			$elm$core$String$fromFloat(number)));
};
var $lamdera$program_test$Effect$TreeView$stringText = function (text) {
	return $lamdera$program_test$Effect$TreeView$htmlEl$(
		_List_fromArray(
			[
				$lamdera$program_test$Effect$TreeView$fontColor(
				$lamdera$program_test$Effect$TreeView$rgb$(0.3, 0.6, 0.3))
			]),
		$lamdera$program_test$Effect$TreeView$htmlText('\"' + (text + '\"')));
};
var $lamdera$program_test$Effect$TreeView$plainValueToString = function (value) {
	switch (value.$) {
		case 'ElmString':
			var string = value.a;
			return $lamdera$program_test$Effect$TreeView$stringText(string);
		case 'ElmChar':
			var _char = value.a;
			return $lamdera$program_test$Effect$TreeView$charText(_char);
		case 'ElmNumber':
			var _float = value.a;
			return $lamdera$program_test$Effect$TreeView$numberText(_float);
		case 'ElmBool':
			var bool = value.a;
			return bool ? $lamdera$program_test$Effect$TreeView$htmlText('True') : $lamdera$program_test$Effect$TreeView$htmlText('False');
		case 'ElmFunction':
			return $lamdera$program_test$Effect$TreeView$htmlText('<function>');
		case 'ElmInternals':
			return $lamdera$program_test$Effect$TreeView$htmlText('<internal>');
		case 'ElmUnit':
			return $lamdera$program_test$Effect$TreeView$htmlText('()');
		case 'ElmFile':
			var string = value.a;
			return $lamdera$program_test$Effect$TreeView$htmlText('<file named ' + (string + '>'));
		default:
			var _int = value.a;
			return $lamdera$program_test$Effect$TreeView$htmlText(
				'<' + ($elm$core$String$fromInt(_int) + ' bytes>'));
	}
};
var $lamdera$program_test$Effect$TreeView$sequenceStartEnd = function (sequenceType) {
	switch (sequenceType.$) {
		case 'SeqSet':
			return _Utils_Tuple2('{|', '|}');
		case 'SeqList':
			return _Utils_Tuple2('[', ']');
		case 'SeqArray':
			return _Utils_Tuple2('[|', '|]');
		default:
			return _Utils_Tuple2('(', ')');
	}
};
var $lamdera$program_test$Effect$TreeView$tabAmount = A2($elm$html$Html$Attributes$style, 'padding-left', '24px');
var $lamdera$program_test$Effect$TreeView$variantText = function (variant) {
	return $lamdera$program_test$Effect$TreeView$htmlEl$(
		_List_fromArray(
			[
				$lamdera$program_test$Effect$TreeView$fontColor(
				$lamdera$program_test$Effect$TreeView$rgb$(0.5, 0.4, 0.9))
			]),
		$lamdera$program_test$Effect$TreeView$htmlText(variant));
};
var $lamdera$program_test$Effect$TreeView$widthEach = function (widths) {
	return A2(
		$elm$html$Html$Attributes$style,
		'border-width',
		$elm$core$String$fromInt(widths.left) + ('px ' + ($elm$core$String$fromInt(widths.top) + ('px ' + ($elm$core$String$fromInt(widths.right) + ('px ' + ($elm$core$String$fromInt(widths.bottom) + 'px')))))));
};
var $lamdera$program_test$Effect$TreeView$dictKey$ = function (msgConfig, depth, currentPath, collapsedFields, elmValue) {
	var row = function (_v11) {
		return $lamdera$program_test$Effect$TreeView$htmlRow$(
			_List_Nil,
			_List_fromArray(
				[
					$lamdera$program_test$Effect$TreeView$treeView$(
					msgConfig,
					depth + 1,
					A2(
						$elm$core$List$cons,
						$lamdera$program_test$Effect$TreeView$DictKeyNode(elmValue),
						currentPath),
					collapsedFields,
					elmValue),
					$lamdera$program_test$Effect$TreeView$htmlText(': ')
				]));
	};
	var column = function (_v10) {
		return $lamdera$program_test$Effect$TreeView$htmlRow$(
			_List_Nil,
			_List_fromArray(
				[
					$lamdera$program_test$Effect$TreeView$treeView$(
					msgConfig,
					depth + 1,
					A2(
						$elm$core$List$cons,
						$lamdera$program_test$Effect$TreeView$DictKeyNode(elmValue),
						currentPath),
					collapsedFields,
					elmValue),
					$elm$html$Html$text(' '),
					$lamdera$program_test$Effect$TreeView$htmlEl$(
					_List_fromArray(
						[
							$lamdera$program_test$Effect$TreeView$widthEach(
							{bottom: 0, left: 2, right: 0, top: 0}),
							$lamdera$program_test$Effect$TreeView$heightFill,
							$lamdera$program_test$Effect$TreeView$borderColor(
							$lamdera$program_test$Effect$TreeView$rgb$(0.5, 0.5, 0.5)),
							$lamdera$program_test$Effect$TreeView$fontColor(
							$lamdera$program_test$Effect$TreeView$rgb$(0.5, 0.5, 0.5))
						]),
					$lamdera$program_test$Effect$TreeView$htmlEl$(
						$lamdera$program_test$Effect$TreeView$centerY,
						$lamdera$program_test$Effect$TreeView$htmlText('(key)')))
				]));
	};
	if (elmValue.$ === 'Plain') {
		return row(_Utils_Tuple0);
	} else {
		var expandable = elmValue.a;
		switch (expandable.$) {
			case 'ElmSequence':
				return column(_Utils_Tuple0);
			case 'ElmType':
				var elmValues = expandable.b;
				if (!elmValues.b) {
					return row(_Utils_Tuple0);
				} else {
					if ((elmValues.a.$ === 'Plain') && (!elmValues.b.b)) {
						return row(_Utils_Tuple0);
					} else {
						return column(_Utils_Tuple0);
					}
				}
			case 'ElmRecord':
				return column(_Utils_Tuple0);
			default:
				return column(_Utils_Tuple0);
		}
	}
};
var $lamdera$program_test$Effect$TreeView$dictKey = F5($lamdera$program_test$Effect$TreeView$dictKey$);
var $lamdera$program_test$Effect$TreeView$treeView$ = function (msgConfig, depth, currentPath, collapsedFields, value) {
	if (value.$ === 'Plain') {
		var plainValue = value.a;
		return $lamdera$program_test$Effect$TreeView$plainValueToString(plainValue);
	} else {
		var expandableValue = value.a;
		switch (expandableValue.$) {
			case 'ElmSequence':
				var sequenceType = expandableValue.a;
				var elmValues = expandableValue.b;
				if ($elm$core$List$isEmpty(elmValues)) {
					var _v2 = $lamdera$program_test$Effect$TreeView$sequenceStartEnd(sequenceType);
					var startChar = _v2.a;
					var endChar = _v2.b;
					return $lamdera$program_test$Effect$TreeView$htmlText(
						_Utils_ap(startChar, endChar));
				} else {
					var _v3 = $lamdera$program_test$Effect$TreeView$sequenceStartEnd(sequenceType);
					var startChar = _v3.a;
					var endChar = _v3.b;
					return $lamdera$program_test$Effect$TreeView$htmlColumn$(
						_List_Nil,
						_Utils_ap(
							$elm$core$List$indexedMap$(
								F2(
									function (index, _new) {
										return (!index) ? $lamdera$program_test$Effect$TreeView$htmlRow$(
											_List_Nil,
											_List_fromArray(
												[
													$lamdera$program_test$Effect$TreeView$htmlEl$(
													_List_fromArray(
														[$lamdera$program_test$Effect$TreeView$alignTop]),
													$lamdera$program_test$Effect$TreeView$htmlText(
														$elm$core$String$padRight$(
															2,
															_Utils_chr(' '),
															startChar))),
													$lamdera$program_test$Effect$TreeView$treeView$(
													msgConfig,
													depth + 1,
													A2(
														$elm$core$List$cons,
														$lamdera$program_test$Effect$TreeView$SequenceNode(index),
														currentPath),
													collapsedFields,
													_new)
												])) : $lamdera$program_test$Effect$TreeView$htmlRow$(
											_List_Nil,
											_List_fromArray(
												[
													$lamdera$program_test$Effect$TreeView$htmlEl$(
													_List_fromArray(
														[$lamdera$program_test$Effect$TreeView$alignTop]),
													$lamdera$program_test$Effect$TreeView$htmlText(', ')),
													$lamdera$program_test$Effect$TreeView$treeView$(
													msgConfig,
													depth + 1,
													A2(
														$elm$core$List$cons,
														$lamdera$program_test$Effect$TreeView$SequenceNode(index),
														currentPath),
													collapsedFields,
													_new)
												]));
									}),
								elmValues),
							_List_fromArray(
								[
									$lamdera$program_test$Effect$TreeView$htmlText(endChar)
								])));
				}
			case 'ElmType':
				var variant = expandableValue.a;
				var elmValues = expandableValue.b;
				if (elmValues.b && (!elmValues.b.b)) {
					var single = elmValues.a;
					return $lamdera$program_test$Effect$TreeView$isSingleLine(single) ? $lamdera$program_test$Effect$TreeView$htmlRow$(
						_List_Nil,
						_List_fromArray(
							[
								$lamdera$program_test$Effect$TreeView$htmlEl$(
								_List_fromArray(
									[$lamdera$program_test$Effect$TreeView$alignTop]),
								$lamdera$program_test$Effect$TreeView$variantText(variant)),
								$lamdera$program_test$Effect$TreeView$htmlText(' '),
								$lamdera$program_test$Effect$TreeView$treeView$(
								msgConfig,
								depth + 1,
								A2(
									$elm$core$List$cons,
									$lamdera$program_test$Effect$TreeView$VariantNode(variant),
									currentPath),
								collapsedFields,
								single)
							])) : $lamdera$program_test$Effect$TreeView$htmlColumn$(
						_List_Nil,
						_List_fromArray(
							[
								$lamdera$program_test$Effect$TreeView$variantText(variant),
								$lamdera$program_test$Effect$TreeView$htmlColumn$(
								_List_fromArray(
									[$lamdera$program_test$Effect$TreeView$tabAmount]),
								$elm$core$List$map$(
									A4(
										$lamdera$program_test$Effect$TreeView$treeView,
										msgConfig,
										depth + 1,
										A2(
											$elm$core$List$cons,
											$lamdera$program_test$Effect$TreeView$VariantNode(variant),
											currentPath),
										collapsedFields),
									elmValues))
							]));
				} else {
					return $lamdera$program_test$Effect$TreeView$htmlColumn$(
						_List_Nil,
						_List_fromArray(
							[
								$lamdera$program_test$Effect$TreeView$variantText(variant),
								$lamdera$program_test$Effect$TreeView$htmlColumn$(
								_List_fromArray(
									[$lamdera$program_test$Effect$TreeView$tabAmount]),
								$elm$core$List$map$(
									A4(
										$lamdera$program_test$Effect$TreeView$treeView,
										msgConfig,
										depth + 1,
										A2(
											$elm$core$List$cons,
											$lamdera$program_test$Effect$TreeView$VariantNode(variant),
											currentPath),
										collapsedFields),
									elmValues))
							]));
				}
			case 'ElmRecord':
				var fields = expandableValue.a;
				return $lamdera$program_test$Effect$TreeView$htmlColumn$(
					_List_Nil,
					$elm$core$List$map$(
						function (_v5) {
							var fieldName = _v5.a;
							var elmValue = _v5.b;
							var nextPath = A2(
								$elm$core$List$cons,
								$lamdera$program_test$Effect$TreeView$FieldNode(fieldName),
								currentPath);
							return $lamdera$program_test$Effect$TreeView$isSingleLine(elmValue) ? $lamdera$program_test$Effect$TreeView$htmlRow$(
								_List_Nil,
								_List_fromArray(
									[
										$lamdera$program_test$Effect$TreeView$htmlEl$(
										_List_fromArray(
											[$lamdera$program_test$Effect$TreeView$alignTop]),
										$lamdera$program_test$Effect$TreeView$htmlText(fieldName + ': ')),
										$lamdera$program_test$Effect$TreeView$treeView$(msgConfig, depth + 1, nextPath, collapsedFields, elmValue)
									])) : ($lamdera$program_test$Effect$TreeView$isCollapsed$(depth, elmValue, nextPath, collapsedFields) ? $lamdera$program_test$Effect$TreeView$htmlRow$(
								_List_Nil,
								_List_fromArray(
									[
										$lamdera$program_test$Effect$TreeView$inputButton$(
										_List_fromArray(
											[$lamdera$program_test$Effect$TreeView$alignTop]),
										{
											label: $lamdera$program_test$Effect$TreeView$htmlText(fieldName + ': '),
											onPress: msgConfig.pressedExpandField(nextPath)
										}),
										$lamdera$program_test$Effect$TreeView$collapsedValue(elmValue)
									])) : $lamdera$program_test$Effect$TreeView$htmlColumn$(
								_List_Nil,
								_List_fromArray(
									[
										$lamdera$program_test$Effect$TreeView$inputButton$(
										_List_Nil,
										{
											label: $lamdera$program_test$Effect$TreeView$htmlText(fieldName + ': '),
											onPress: msgConfig.pressedCollapseField(nextPath)
										}),
										$lamdera$program_test$Effect$TreeView$htmlEl$(
										_List_fromArray(
											[$lamdera$program_test$Effect$TreeView$tabAmount]),
										$lamdera$program_test$Effect$TreeView$treeView$(msgConfig, depth + 1, nextPath, collapsedFields, elmValue))
									])));
						},
						fields));
			default:
				var dict = expandableValue.a;
				return $lamdera$containers$SeqDict$isEmpty(dict) ? $lamdera$program_test$Effect$TreeView$emptyDict : $lamdera$program_test$Effect$TreeView$htmlColumn$(
					_List_Nil,
					$elm$core$List$map$(
						function (_v6) {
							var key = _v6.a;
							var value2 = _v6.b;
							return $lamdera$program_test$Effect$TreeView$htmlColumn$(
								_List_Nil,
								_List_fromArray(
									[
										$lamdera$program_test$Effect$TreeView$dictKey$(msgConfig, depth, currentPath, collapsedFields, key),
										$lamdera$program_test$Effect$TreeView$htmlEl$(
										_List_fromArray(
											[$lamdera$program_test$Effect$TreeView$tabAmount]),
										$lamdera$program_test$Effect$TreeView$treeView$(
											msgConfig,
											depth + 1,
											A2(
												$elm$core$List$cons,
												$lamdera$program_test$Effect$TreeView$DictNode(key),
												currentPath),
											collapsedFields,
											value2))
									]));
						},
						$lamdera$containers$SeqDict$toList(dict)));
		}
	}
};
var $lamdera$program_test$Effect$TreeView$treeView = F5($lamdera$program_test$Effect$TreeView$treeView$);
var $lamdera$program_test$Effect$Test$PressedCollapseField = function (a) {
	return {$: 'PressedCollapseField', a: a};
};
var $lamdera$program_test$Effect$Test$PressedExpandField = function (a) {
	return {$: 'PressedExpandField', a: a};
};
var $lamdera$program_test$Effect$Test$treeViewConfig = {pressedCollapseField: $lamdera$program_test$Effect$Test$PressedCollapseField, pressedExpandField: $lamdera$program_test$Effect$Test$PressedExpandField};
var $lamdera$program_test$Effect$TreeView$backgroundColor = function (color) {
	return A2($elm$html$Html$Attributes$style, 'background-color', color);
};
var $lamdera$program_test$Effect$TreeView$newColor = $lamdera$program_test$Effect$TreeView$backgroundColor(
	$lamdera$program_test$Effect$TreeView$rgb$(0.15, 0.35, 0.15));
var $lamdera$program_test$Effect$TreeView$collapsedValueDiff$ = function (oldValue, newValue) {
	return _Utils_eq(oldValue, newValue) ? $lamdera$program_test$Effect$TreeView$collapsedValue(newValue) : $lamdera$program_test$Effect$TreeView$htmlEl$(
		_List_fromArray(
			[$lamdera$program_test$Effect$TreeView$newColor]),
		$lamdera$program_test$Effect$TreeView$collapsedValue(newValue));
};
var $lamdera$program_test$Effect$TreeView$collapsedValueDiff = F2($lamdera$program_test$Effect$TreeView$collapsedValueDiff$);
var $lamdera$program_test$Effect$TreeView$indexedMap2$ = function (func, listA, listB) {
	return $elm$core$List$indexedMap$(
		F2(
			function (index, _v0) {
				var a = _v0.a;
				var b = _v0.b;
				return A3(func, index, a, b);
			}),
		A3($elm$core$List$map2, $elm$core$Tuple$pair, listA, listB));
};
var $lamdera$program_test$Effect$TreeView$indexedMap2 = F3($lamdera$program_test$Effect$TreeView$indexedMap2$);
var $lamdera$program_test$Effect$TreeView$oldColor = $lamdera$program_test$Effect$TreeView$backgroundColor(
	$lamdera$program_test$Effect$TreeView$rgb$(0.35, 0.17, 0.17));
var $lamdera$program_test$Effect$TreeView$treeViewDiff$ = function (msgConfig, depth, currentPath, collapsedFields, oldValue, value) {
	var _v0 = _Utils_Tuple2(oldValue, value);
	_v0$2:
	while (true) {
		if (_v0.a.$ === 'Plain') {
			if (_v0.b.$ === 'Plain') {
				var oldPlainValue = _v0.a.a;
				var plainValue = _v0.b.a;
				return _Utils_eq(plainValue, oldPlainValue) ? $lamdera$program_test$Effect$TreeView$plainValueToString(plainValue) : $lamdera$program_test$Effect$TreeView$htmlColumn$(
					_List_Nil,
					_List_fromArray(
						[
							$lamdera$program_test$Effect$TreeView$htmlEl$(
							_List_fromArray(
								[$lamdera$program_test$Effect$TreeView$oldColor]),
							$lamdera$program_test$Effect$TreeView$plainValueToString(oldPlainValue)),
							$lamdera$program_test$Effect$TreeView$htmlEl$(
							_List_fromArray(
								[$lamdera$program_test$Effect$TreeView$newColor]),
							$lamdera$program_test$Effect$TreeView$plainValueToString(plainValue))
						]));
			} else {
				break _v0$2;
			}
		} else {
			if (_v0.b.$ === 'Expandable') {
				var oldExpandableValue = _v0.a.a;
				var expandableValue = _v0.b.a;
				var _v1 = _Utils_Tuple2(oldExpandableValue, expandableValue);
				_v1$4:
				while (true) {
					switch (_v1.a.$) {
						case 'ElmSequence':
							if (_v1.b.$ === 'ElmSequence') {
								var _v2 = _v1.a;
								var oldElmValues = _v2.b;
								var _v3 = _v1.b;
								var sequenceType = _v3.a;
								var elmValues = _v3.b;
								if ($elm$core$List$isEmpty(oldElmValues) && $elm$core$List$isEmpty(elmValues)) {
									var _v4 = $lamdera$program_test$Effect$TreeView$sequenceStartEnd(sequenceType);
									var startChar = _v4.a;
									var endChar = _v4.b;
									return $lamdera$program_test$Effect$TreeView$htmlText(
										_Utils_ap(startChar, endChar));
								} else {
									var pairedItems = $lamdera$program_test$Effect$TreeView$indexedMap2$(
										F3(
											function (index, old, _new) {
												return $lamdera$program_test$Effect$TreeView$treeViewDiff$(
													msgConfig,
													depth + 1,
													A2(
														$elm$core$List$cons,
														$lamdera$program_test$Effect$TreeView$SequenceNode(index),
														currentPath),
													collapsedFields,
													old,
													_new);
											}),
										oldElmValues,
										elmValues);
									var lengthDiff = $elm$core$List$length(elmValues) - $elm$core$List$length(oldElmValues);
									var newItems = (lengthDiff > 0) ? $elm$core$List$indexedMap$(
										F2(
											function (index, a) {
												return $lamdera$program_test$Effect$TreeView$htmlEl$(
													_List_fromArray(
														[$lamdera$program_test$Effect$TreeView$newColor]),
													$lamdera$program_test$Effect$TreeView$treeView$(
														msgConfig,
														depth + 1,
														A2(
															$elm$core$List$cons,
															$lamdera$program_test$Effect$TreeView$SequenceNode(index),
															currentPath),
														collapsedFields,
														a));
											}),
										$elm$core$List$reverse(
											$elm$core$List$take$(
												lengthDiff,
												$elm$core$List$reverse(elmValues)))) : $elm$core$List$indexedMap$(
										F2(
											function (index, a) {
												return $lamdera$program_test$Effect$TreeView$htmlEl$(
													_List_fromArray(
														[$lamdera$program_test$Effect$TreeView$oldColor]),
													$lamdera$program_test$Effect$TreeView$treeView$(
														msgConfig,
														depth + 1,
														A2(
															$elm$core$List$cons,
															$lamdera$program_test$Effect$TreeView$SequenceNode(index),
															currentPath),
														collapsedFields,
														a));
											}),
										$elm$core$List$reverse(
											$elm$core$List$take$(
												-lengthDiff,
												$elm$core$List$reverse(oldElmValues))));
									var _v5 = $lamdera$program_test$Effect$TreeView$sequenceStartEnd(sequenceType);
									var startChar = _v5.a;
									var endChar = _v5.b;
									return $lamdera$program_test$Effect$TreeView$htmlColumn$(
										_List_Nil,
										_Utils_ap(
											$elm$core$List$indexedMap$(
												F2(
													function (index, a) {
														return (!index) ? $lamdera$program_test$Effect$TreeView$htmlRow$(
															_List_Nil,
															_List_fromArray(
																[
																	$lamdera$program_test$Effect$TreeView$htmlEl$(
																	_List_fromArray(
																		[$lamdera$program_test$Effect$TreeView$alignTop]),
																	$lamdera$program_test$Effect$TreeView$htmlText(
																		$elm$core$String$padRight$(
																			2,
																			_Utils_chr(' '),
																			startChar))),
																	a
																])) : $lamdera$program_test$Effect$TreeView$htmlRow$(
															_List_Nil,
															_List_fromArray(
																[
																	$lamdera$program_test$Effect$TreeView$htmlEl$(
																	_List_fromArray(
																		[$lamdera$program_test$Effect$TreeView$alignTop]),
																	$lamdera$program_test$Effect$TreeView$htmlText(', ')),
																	a
																]));
													}),
												_Utils_ap(pairedItems, newItems)),
											_List_fromArray(
												[
													$lamdera$program_test$Effect$TreeView$htmlText(endChar)
												])));
								}
							} else {
								break _v1$4;
							}
						case 'ElmType':
							if (_v1.b.$ === 'ElmType') {
								var _v6 = _v1.a;
								var oldVariant = _v6.a;
								var oldElmValues = _v6.b;
								var _v7 = _v1.b;
								var variant = _v7.a;
								var elmValues = _v7.b;
								if (_Utils_eq(oldVariant, variant)) {
									var _v8 = _Utils_Tuple2(oldElmValues, elmValues);
									if (((_v8.a.b && (!_v8.a.b.b)) && _v8.b.b) && (!_v8.b.b.b)) {
										var _v9 = _v8.a;
										var oldSingle = _v9.a;
										var _v10 = _v8.b;
										var single = _v10.a;
										return $lamdera$program_test$Effect$TreeView$isSingleLine(single) ? $lamdera$program_test$Effect$TreeView$htmlRow$(
											_List_Nil,
											_List_fromArray(
												[
													$lamdera$program_test$Effect$TreeView$htmlEl$(
													_List_fromArray(
														[$lamdera$program_test$Effect$TreeView$alignTop]),
													$lamdera$program_test$Effect$TreeView$variantText(variant)),
													$lamdera$program_test$Effect$TreeView$htmlText(' '),
													$lamdera$program_test$Effect$TreeView$treeViewDiff$(
													msgConfig,
													depth + 1,
													A2(
														$elm$core$List$cons,
														$lamdera$program_test$Effect$TreeView$VariantNode(variant),
														currentPath),
													collapsedFields,
													oldSingle,
													single)
												])) : $lamdera$program_test$Effect$TreeView$htmlColumn$(
											_List_Nil,
											_List_fromArray(
												[
													$lamdera$program_test$Effect$TreeView$variantText(variant),
													$lamdera$program_test$Effect$TreeView$htmlEl$(
													_List_fromArray(
														[$lamdera$program_test$Effect$TreeView$tabAmount]),
													$lamdera$program_test$Effect$TreeView$treeViewDiff$(
														msgConfig,
														depth + 1,
														A2(
															$elm$core$List$cons,
															$lamdera$program_test$Effect$TreeView$VariantNode(variant),
															currentPath),
														collapsedFields,
														oldSingle,
														single))
												]));
									} else {
										return $lamdera$program_test$Effect$TreeView$htmlColumn$(
											_List_Nil,
											_List_fromArray(
												[
													$lamdera$program_test$Effect$TreeView$variantText(variant),
													$lamdera$program_test$Effect$TreeView$htmlColumn$(
													_List_fromArray(
														[$lamdera$program_test$Effect$TreeView$tabAmount]),
													A3(
														$elm$core$List$map2,
														A4(
															$lamdera$program_test$Effect$TreeView$treeViewDiff,
															msgConfig,
															depth + 1,
															A2(
																$elm$core$List$cons,
																$lamdera$program_test$Effect$TreeView$VariantNode(variant),
																currentPath),
															collapsedFields),
														oldElmValues,
														elmValues))
												]));
									}
								} else {
									return $lamdera$program_test$Effect$TreeView$htmlColumn$(
										_List_Nil,
										_List_fromArray(
											[
												$lamdera$program_test$Effect$TreeView$htmlEl$(
												_List_fromArray(
													[$lamdera$program_test$Effect$TreeView$oldColor]),
												$lamdera$program_test$Effect$TreeView$treeView$(
													msgConfig,
													depth + 1,
													A2(
														$elm$core$List$cons,
														$lamdera$program_test$Effect$TreeView$VariantNode(oldVariant),
														currentPath),
													collapsedFields,
													oldValue)),
												$lamdera$program_test$Effect$TreeView$htmlEl$(
												_List_fromArray(
													[$lamdera$program_test$Effect$TreeView$newColor]),
												$lamdera$program_test$Effect$TreeView$treeView$(
													msgConfig,
													depth + 1,
													A2(
														$elm$core$List$cons,
														$lamdera$program_test$Effect$TreeView$VariantNode(variant),
														currentPath),
													collapsedFields,
													value))
											]));
								}
							} else {
								break _v1$4;
							}
						case 'ElmRecord':
							if (_v1.b.$ === 'ElmRecord') {
								var oldRecord = _v1.a.a;
								var record = _v1.b.a;
								return $lamdera$program_test$Effect$TreeView$htmlColumn$(
									_List_Nil,
									A3(
										$elm$core$List$map2,
										F2(
											function (_v11, _v12) {
												var oldElmValue = _v11.b;
												var fieldName = _v12.a;
												var elmValue = _v12.b;
												var nextPath = A2(
													$elm$core$List$cons,
													$lamdera$program_test$Effect$TreeView$FieldNode(fieldName),
													currentPath);
												return $lamdera$program_test$Effect$TreeView$isSingleLine(elmValue) ? $lamdera$program_test$Effect$TreeView$htmlRow$(
													_List_Nil,
													_List_fromArray(
														[
															$lamdera$program_test$Effect$TreeView$htmlEl$(
															_List_fromArray(
																[$lamdera$program_test$Effect$TreeView$alignTop]),
															$lamdera$program_test$Effect$TreeView$htmlText(fieldName + ': ')),
															$lamdera$program_test$Effect$TreeView$treeViewDiff$(msgConfig, depth + 1, nextPath, collapsedFields, oldElmValue, elmValue)
														])) : ($lamdera$program_test$Effect$TreeView$isCollapsed$(depth, elmValue, nextPath, collapsedFields) ? $lamdera$program_test$Effect$TreeView$htmlRow$(
													_List_Nil,
													_List_fromArray(
														[
															$lamdera$program_test$Effect$TreeView$inputButton$(
															_List_fromArray(
																[$lamdera$program_test$Effect$TreeView$alignTop]),
															{
																label: $lamdera$program_test$Effect$TreeView$htmlText(fieldName + ': '),
																onPress: msgConfig.pressedExpandField(nextPath)
															}),
															$lamdera$program_test$Effect$TreeView$htmlEl$(
															_List_fromArray(
																[
																	$elm$html$Html$Events$onClick(
																	msgConfig.pressedExpandField(nextPath)),
																	A2($elm$html$Html$Attributes$style, 'cursor', 'pointer')
																]),
															A3($elm$html$Html$Lazy$lazy2, $lamdera$program_test$Effect$TreeView$collapsedValueDiff, oldElmValue, elmValue))
														])) : $lamdera$program_test$Effect$TreeView$htmlColumn$(
													_List_Nil,
													_List_fromArray(
														[
															$lamdera$program_test$Effect$TreeView$inputButton$(
															_List_Nil,
															{
																label: $lamdera$program_test$Effect$TreeView$htmlText(fieldName + ': '),
																onPress: msgConfig.pressedCollapseField(nextPath)
															}),
															$lamdera$program_test$Effect$TreeView$htmlEl$(
															_List_fromArray(
																[$lamdera$program_test$Effect$TreeView$tabAmount]),
															$lamdera$program_test$Effect$TreeView$treeViewDiff$(msgConfig, depth + 1, nextPath, collapsedFields, oldElmValue, elmValue))
														])));
											}),
										oldRecord,
										record));
							} else {
								break _v1$4;
							}
						default:
							if (_v1.b.$ === 'ElmDict') {
								var oldDict = _v1.a.a;
								var dict = _v1.b.a;
								return ($lamdera$containers$SeqDict$isEmpty(oldDict) && $lamdera$containers$SeqDict$isEmpty(dict)) ? $lamdera$program_test$Effect$TreeView$emptyDict : $lamdera$program_test$Effect$TreeView$htmlColumn$(
									_List_Nil,
									$lamdera$containers$SeqDict$merge$(
										F3(
											function (key, old, state) {
												return A2(
													$elm$core$List$cons,
													$lamdera$program_test$Effect$TreeView$htmlColumn$(
														_List_fromArray(
															[$lamdera$program_test$Effect$TreeView$oldColor]),
														_List_fromArray(
															[
																$lamdera$program_test$Effect$TreeView$dictKey$(msgConfig, depth, currentPath, collapsedFields, key),
																$lamdera$program_test$Effect$TreeView$htmlEl$(
																_List_fromArray(
																	[$lamdera$program_test$Effect$TreeView$tabAmount]),
																$lamdera$program_test$Effect$TreeView$treeView$(
																	msgConfig,
																	depth + 1,
																	A2(
																		$elm$core$List$cons,
																		$lamdera$program_test$Effect$TreeView$DictNode(key),
																		currentPath),
																	collapsedFields,
																	old))
															])),
													state);
											}),
										F4(
											function (key, old, _new, state) {
												return A2(
													$elm$core$List$cons,
													$lamdera$program_test$Effect$TreeView$htmlColumn$(
														_List_Nil,
														_List_fromArray(
															[
																$lamdera$program_test$Effect$TreeView$dictKey$(msgConfig, depth, currentPath, collapsedFields, key),
																$lamdera$program_test$Effect$TreeView$htmlEl$(
																_List_fromArray(
																	[$lamdera$program_test$Effect$TreeView$tabAmount]),
																$lamdera$program_test$Effect$TreeView$treeViewDiff$(
																	msgConfig,
																	depth + 1,
																	A2(
																		$elm$core$List$cons,
																		$lamdera$program_test$Effect$TreeView$DictNode(key),
																		currentPath),
																	collapsedFields,
																	old,
																	_new))
															])),
													state);
											}),
										F3(
											function (key, _new, state) {
												return A2(
													$elm$core$List$cons,
													$lamdera$program_test$Effect$TreeView$htmlColumn$(
														_List_fromArray(
															[$lamdera$program_test$Effect$TreeView$newColor]),
														_List_fromArray(
															[
																$lamdera$program_test$Effect$TreeView$dictKey$(msgConfig, depth, currentPath, collapsedFields, key),
																$lamdera$program_test$Effect$TreeView$htmlEl$(
																_List_fromArray(
																	[$lamdera$program_test$Effect$TreeView$tabAmount]),
																$lamdera$program_test$Effect$TreeView$treeView$(
																	msgConfig,
																	depth + 1,
																	A2(
																		$elm$core$List$cons,
																		$lamdera$program_test$Effect$TreeView$DictNode(key),
																		currentPath),
																	collapsedFields,
																	_new))
															])),
													state);
											}),
										oldDict,
										dict,
										_List_Nil));
							} else {
								break _v1$4;
							}
					}
				}
				return $lamdera$program_test$Effect$TreeView$htmlText('Error, old and new types don\'t match');
			} else {
				break _v0$2;
			}
		}
	}
	return $lamdera$program_test$Effect$TreeView$htmlText('Error, old and new types don\'t match');
};
var $lamdera$program_test$Effect$TreeView$treeViewDiff = F6($lamdera$program_test$Effect$TreeView$treeViewDiff$);
var $lamdera$program_test$Effect$Test$modelDiffView$ = function (collapsedFields, step, previousStep) {
	var _v0 = _Utils_Tuple2(step.cachedElmValue, previousStep.cachedElmValue);
	if ((_v0.a.$ === 'Just') && (_v0.b.$ === 'Just')) {
		var ok = _v0.a.a;
		var previous = _v0.b.a;
		return A2(
			$elm$html$Html$div,
			_List_Nil,
			_List_fromArray(
				[
					$lamdera$program_test$Effect$TreeView$treeViewDiff$($lamdera$program_test$Effect$Test$treeViewConfig, 0, _List_Nil, collapsedFields, previous.diff, ok.diff),
					$lamdera$program_test$Effect$TreeView$treeView$($lamdera$program_test$Effect$Test$treeViewConfig, 0, _List_Nil, collapsedFields, ok.noDiff)
				]));
	} else {
		return $elm$html$Html$text('Failed to show frontend model');
	}
};
var $lamdera$program_test$Effect$Test$modelDiffView = F3($lamdera$program_test$Effect$Test$modelDiffView$);
var $lamdera$program_test$Effect$Test$modelView$ = function (collapsedFields, event) {
	var _v0 = event.cachedElmValue;
	if (_v0.$ === 'Just') {
		var elmValue = _v0.a;
		return A2(
			$elm$html$Html$div,
			_List_Nil,
			_List_fromArray(
				[
					$lamdera$program_test$Effect$TreeView$treeView$($lamdera$program_test$Effect$Test$treeViewConfig, 0, _List_Nil, collapsedFields, elmValue.diff),
					$lamdera$program_test$Effect$TreeView$treeView$($lamdera$program_test$Effect$Test$treeViewConfig, 0, _List_Nil, collapsedFields, elmValue.noDiff)
				]));
	} else {
		return $elm$html$Html$text('Failed to show model');
	}
};
var $lamdera$program_test$Effect$Test$modelView = F2($lamdera$program_test$Effect$Test$modelView$);
var $lamdera$program_test$Effect$Test$px = function (value) {
	return $elm$core$String$fromInt(value) + 'px';
};
var $lamdera$program_test$Effect$Test$PressedBackToOverview = {$: 'PressedBackToOverview'};
var $lamdera$program_test$Effect$Test$PressedHideModel = {$: 'PressedHideModel'};
var $lamdera$program_test$Effect$Test$PressedShowModel = {$: 'PressedShowModel'};
var $lamdera$program_test$Effect$Test$PressedToggleOverlayPosition = {$: 'PressedToggleOverlayPosition'};
var $lamdera$program_test$Effect$Test$Key_AltHeld = {$: 'Key_AltHeld'};
var $lamdera$program_test$Effect$Test$Key_CtrlHeld = {$: 'Key_CtrlHeld'};
var $lamdera$program_test$Effect$Test$Key_MetaHeld = {$: 'Key_MetaHeld'};
var $lamdera$program_test$Effect$Test$Key_ShiftHeld = {$: 'Key_ShiftHeld'};
var $lamdera$program_test$Effect$Test$ellipsis2$ = function (maxChars, text2) {
	return (_Utils_cmp(
		$elm$core$String$length(text2),
		maxChars) > 0) ? ($elm$core$String$left$(maxChars - 3, text2) + '...') : text2;
};
var $lamdera$program_test$Effect$Test$ellipsis2 = F2($lamdera$program_test$Effect$Test$ellipsis2$);
var $elm$html$Html$Attributes$title = $elm$html$Html$Attributes$stringProperty('title');
var $lamdera$program_test$Effect$Test$currentStepText$ = function (currentStep, testView_) {
	var fullMsg = function () {
		var _v0 = currentStep.eventType;
		switch (_v0.$) {
			case 'TestEvent':
				var name = _v0.b;
				return name;
			case 'UpdateFromFrontendEvent':
				var toBackend = _v0.a.toBackend;
				return 'UpdateFromFrontend: ' + $elm$core$Debug$toString(toBackend);
			case 'UpdateFromBackendEvent':
				var toFrontend = _v0.a.toFrontend;
				return 'UpdateFromBackend: ' + $elm$core$Debug$toString(toFrontend);
			case 'BackendUpdateEvent':
				var backendMsg = _v0.a;
				return 'BackendUpdate: ' + $elm$core$Debug$toString(backendMsg);
			case 'FrontendUpdateEvent':
				var frontendMsg = _v0.b;
				return 'FrontendUpdate: ' + $elm$core$Debug$toString(frontendMsg);
			case 'BackendInitEvent':
				return 'BackendInit';
			case 'FrontendInitEvent':
				var clientId = _v0.a.clientId;
				return 'FrontendInitEvent: ' + $lamdera$program_test$Effect$Lamdera$clientIdToString(clientId);
			case 'CheckStateEvent':
				var checkType = _v0.a.checkType;
				switch (checkType.$) {
					case 'CheckFrontendView':
						return 'Check frontend view';
					case 'CheckFrontendState':
						return 'Check frontend state';
					case 'CheckState':
						return 'Check global state';
					default:
						return 'Check backend';
				}
			case 'UserInputEvent':
				var data = _v0.a;
				var _v2 = data.inputType;
				switch (_v2.$) {
					case 'UserClicksButton':
						var htmlId = _v2.a;
						return 'Click \"' + ($lamdera$program_test$Effect$Browser$Dom$idToString(htmlId) + '\" button');
					case 'UserInputsText':
						var htmlId = _v2.a;
						var text2 = _v2.b;
						return 'Type \"' + (text2 + ('\" into \"' + ($lamdera$program_test$Effect$Browser$Dom$idToString(htmlId) + '\" input')));
					case 'UserPressesKey':
						var htmlId = _v2.a;
						var key = _v2.b;
						var options = _v2.c;
						return 'Press ' + ($elm$core$String$join$(
							' + ',
							$elm$core$List$filterMap$(
								function (_v3) {
									var text2 = _v3.a;
									var bool = _v3.b;
									return bool ? $elm$core$Maybe$Just(text2) : $elm$core$Maybe$Nothing;
								},
								_List_fromArray(
									[
										_Utils_Tuple2(
										'Shift',
										$elm$core$List$member$($lamdera$program_test$Effect$Test$Key_ShiftHeld, options)),
										_Utils_Tuple2(
										'Ctrl',
										$elm$core$List$member$($lamdera$program_test$Effect$Test$Key_CtrlHeld, options)),
										_Utils_Tuple2(
										'Meta',
										$elm$core$List$member$($lamdera$program_test$Effect$Test$Key_MetaHeld, options)),
										_Utils_Tuple2(
										'Alt',
										$elm$core$List$member$($lamdera$program_test$Effect$Test$Key_AltHeld, options)),
										_Utils_Tuple2(key, true)
									]))) + (' key into \"' + ($lamdera$program_test$Effect$Browser$Dom$idToString(htmlId) + '\" input')));
					case 'UserClicksLink':
						var href = _v2.a;
						return 'Press link leading to ' + href;
					case 'UserResizesWindow':
						var height = _v2.a.height;
						var width = _v2.a.width;
						return 'Resize window { width = ' + ($elm$core$String$fromInt(width) + (', height = ' + ($elm$core$String$fromInt(height) + '}')));
					case 'UserPointerDownEvent':
						var htmlId = _v2.a;
						return 'Pointer down on ' + $lamdera$program_test$Effect$Browser$Dom$idToString(htmlId);
					case 'UserPointerUpEvent':
						var htmlId = _v2.a;
						return 'Pointer up on ' + $lamdera$program_test$Effect$Browser$Dom$idToString(htmlId);
					case 'UserPointerEnterEvent':
						var htmlId = _v2.a;
						return 'Pointer entered ' + $lamdera$program_test$Effect$Browser$Dom$idToString(htmlId);
					case 'UserPointerLeaveEvent':
						var htmlId = _v2.a;
						return 'Pointer left ' + $lamdera$program_test$Effect$Browser$Dom$idToString(htmlId);
					case 'UserPointerOutEvent':
						var htmlId = _v2.a;
						return 'Pointer out on ' + $lamdera$program_test$Effect$Browser$Dom$idToString(htmlId);
					case 'UserPointerMoveEvent':
						var htmlId = _v2.a;
						return 'Pointer moved over ' + $lamdera$program_test$Effect$Browser$Dom$idToString(htmlId);
					case 'UserPointerOverEvent':
						var htmlId = _v2.a;
						return 'Pointer over ' + $lamdera$program_test$Effect$Browser$Dom$idToString(htmlId);
					case 'UserPointerCancelEvent':
						var htmlId = _v2.a;
						return 'Pointer cancelled on ' + $lamdera$program_test$Effect$Browser$Dom$idToString(htmlId);
					case 'UserTouchCancelEvent':
						var htmlId = _v2.a;
						return 'Touch cancelled on ' + $lamdera$program_test$Effect$Browser$Dom$idToString(htmlId);
					case 'UserTouchStartEvent':
						var htmlId = _v2.a;
						return 'Touch started on ' + $lamdera$program_test$Effect$Browser$Dom$idToString(htmlId);
					case 'UserTouchEndEvent':
						var htmlId = _v2.a;
						return 'Touch ended on ' + $lamdera$program_test$Effect$Browser$Dom$idToString(htmlId);
					case 'UserTouchMoveEvent':
						var htmlId = _v2.a;
						return 'Touch moved on ' + $lamdera$program_test$Effect$Browser$Dom$idToString(htmlId);
					case 'UserMouseDownEvent':
						var htmlId = _v2.a;
						return 'Mouse down on ' + $lamdera$program_test$Effect$Browser$Dom$idToString(htmlId);
					case 'UserMouseUpEvent':
						var htmlId = _v2.a;
						return 'Mouse up on ' + $lamdera$program_test$Effect$Browser$Dom$idToString(htmlId);
					case 'UserMouseEnterEvent':
						var htmlId = _v2.a;
						return 'Mouse entered ' + $lamdera$program_test$Effect$Browser$Dom$idToString(htmlId);
					case 'UserMouseLeaveEvent':
						var htmlId = _v2.a;
						return 'Mouse left ' + $lamdera$program_test$Effect$Browser$Dom$idToString(htmlId);
					case 'UserMouseOutEvent':
						var htmlId = _v2.a;
						return 'Mouse out on ' + $lamdera$program_test$Effect$Browser$Dom$idToString(htmlId);
					case 'UserMouseMoveEvent':
						var htmlId = _v2.a;
						return 'Mouse moved over ' + $lamdera$program_test$Effect$Browser$Dom$idToString(htmlId);
					case 'UserMouseOverEvent':
						var htmlId = _v2.a;
						return 'Mouse over ' + $lamdera$program_test$Effect$Browser$Dom$idToString(htmlId);
					case 'UserFocusEvent':
						var htmlId = _v2.a;
						return 'Focus set on ' + $lamdera$program_test$Effect$Browser$Dom$idToString(htmlId);
					case 'UserBlurEvent':
						var htmlId = _v2.a;
						return 'Blur (lost focus) on ' + $lamdera$program_test$Effect$Browser$Dom$idToString(htmlId);
					case 'UserWheelEvent':
						var htmlId = _v2.a;
						return 'Scrolled mouse wheel on ' + $lamdera$program_test$Effect$Browser$Dom$idToString(htmlId);
					default:
						var htmlId = _v2.a;
						var value = _v2.b;
						return 'Custom event on ' + ($lamdera$program_test$Effect$Browser$Dom$idToString(htmlId) + (' with ' + A2($elm$json$Json$Encode$encode, 0, value)));
				}
			case 'SnapshotEvent':
				var data = _v0.a;
				return 'Snapshot view with name ' + data.name;
			case 'ManuallySendToBackend':
				var data = _v0.a;
				return 'Manually created ToBackend: ' + $elm$core$Debug$toString(data.toBackend);
			case 'ManuallySendPortEvent':
				var data = _v0.a;
				return 'Manually triggered \"' + (data.portName + ('\" port: ' + A2($elm$json$Json$Encode$encode, 0, data.value)));
			case 'EffectFailedEvent':
				var effect = _v0.b;
				switch (effect.$) {
					case 'PushUrlFailed':
						return 'Browser.Navigation.pushUrl error';
					case 'ReplaceUrlFailed':
						return 'Browser.Navigation.replaceUrl error';
					case 'HttpRequestFailed':
						return 'Http request error';
					case 'FileSelectFailed':
						return 'File.Select.file error';
					default:
						return 'File.Select.files error';
				}
			case 'NavigateBack':
				return 'Pressed browser navigate forward button';
			default:
				return 'Pressed browser navigate backward button';
		}
	}();
	return A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				A2($elm$html$Html$Attributes$style, 'padding', '4px'),
				$elm$html$Html$Attributes$title(fullMsg)
			]),
		_List_fromArray(
			[
				$elm$html$Html$text(
				' ' + ($elm$core$String$fromInt(testView_.stepIndex + 1) + ('/' + ($elm$core$String$fromInt(
					$elm$core$Array$length(testView_.steps)) + (' ' + $lamdera$program_test$Effect$Test$ellipsis2$(100, fullMsg))))))
			]));
};
var $lamdera$program_test$Effect$Test$currentStepText = F2($lamdera$program_test$Effect$Test$currentStepText$);
var $lamdera$program_test$Effect$Test$overlayButton$ = function (onPress, text_) {
	return A2(
		$elm$html$Html$button,
		_List_fromArray(
			[
				$elm$html$Html$Events$onClick(onPress),
				A2($elm$html$Html$Attributes$style, 'padding', '2px'),
				A2($elm$html$Html$Attributes$style, 'margin', '0px'),
				A2($elm$html$Html$Attributes$style, 'color', 'rgb(10,10,10)'),
				A2($elm$html$Html$Attributes$style, 'background-color', 'rgb(240,240,240)'),
				A2($elm$html$Html$Attributes$style, 'border-color', 'rgb(250,250,250)'),
				A2($elm$html$Html$Attributes$style, 'border-width', '1px'),
				A2($elm$html$Html$Attributes$style, 'border-radius', '4px'),
				A2($elm$html$Html$Attributes$style, 'border-style', 'solid'),
				A2($elm$html$Html$Attributes$style, 'font-family', 'arial'),
				A2($elm$html$Html$Attributes$style, 'font-size', '14px'),
				A2($elm$html$Html$Attributes$style, 'font-weight', 'regular'),
				A2($elm$html$Html$Attributes$style, 'line-height', '1')
			]),
		_List_fromArray(
			[
				$elm$html$Html$text(text_)
			]));
};
var $lamdera$program_test$Effect$Test$overlayButton = F2($lamdera$program_test$Effect$Test$overlayButton$);
var $lamdera$program_test$Effect$Test$text = function (text_) {
	return A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				A2($elm$html$Html$Attributes$style, 'padding', '4px')
			]),
		_List_fromArray(
			[
				$elm$html$Html$text(text_)
			]));
};
var $lamdera$program_test$Effect$Test$PressedTimeline = function (a) {
	return {$: 'PressedTimeline', a: a};
};
var $elm$svg$Svg$Attributes$height = _VirtualDom_attribute('height');
var $elm$svg$Svg$line = $elm$svg$Svg$trustedNode('line');
var $elm$svg$Svg$Attributes$points = _VirtualDom_attribute('points');
var $elm$svg$Svg$polygon = $elm$svg$Svg$trustedNode('polygon');
var $elm$core$Basics$sqrt = _Basics_sqrt;
var $elm$svg$Svg$Attributes$x1 = _VirtualDom_attribute('x1');
var $elm$svg$Svg$Attributes$x2 = _VirtualDom_attribute('x2');
var $elm$svg$Svg$Attributes$y1 = _VirtualDom_attribute('y1');
var $elm$svg$Svg$Attributes$y2 = _VirtualDom_attribute('y2');
var $lamdera$program_test$Effect$Test$arrowSvg$ = function (color, xA, yA, xB, yB) {
	var maxY = $elm$core$Basics$max$(yA, yB) + 10;
	var maxX = $elm$core$Basics$max$(xA, xB) + 10;
	var length = $elm$core$Basics$sqrt(
		A2($elm$core$Basics$pow, xB - xA, 2) + A2($elm$core$Basics$pow, yB - yA, 2));
	var offset = (length - 6) / length;
	var xC = (offset * (xB - xA)) + xA;
	var yC = (offset * (yB - yA)) + yA;
	var arrowWidthScalar = 0.666;
	var xD = ((-(yB - yC)) * arrowWidthScalar) + xC;
	var xF = ((yB - yC) * arrowWidthScalar) + xC;
	var yD = ((xB - xC) * arrowWidthScalar) + yC;
	var yF = ((-(xB - xC)) * arrowWidthScalar) + yC;
	return A2(
		$elm$svg$Svg$svg,
		_List_fromArray(
			[
				$elm$svg$Svg$Attributes$width(
				$elm$core$String$fromFloat(maxX)),
				$elm$svg$Svg$Attributes$height(
				$elm$core$String$fromFloat(maxY)),
				$elm$svg$Svg$Attributes$viewBox(
				'0 0 ' + ($elm$core$String$fromFloat(maxX) + (' ' + $elm$core$String$fromFloat(maxY)))),
				A2($elm$html$Html$Attributes$style, 'position', 'absolute'),
				A2($elm$html$Html$Attributes$style, 'top', '0'),
				A2($elm$html$Html$Attributes$style, 'pointer-events', 'none')
			]),
		_List_fromArray(
			[
				A2(
				$elm$svg$Svg$line,
				_List_fromArray(
					[
						$elm$svg$Svg$Attributes$x1(
						$elm$core$String$fromFloat(xA)),
						$elm$svg$Svg$Attributes$y1(
						$elm$core$String$fromFloat(yA)),
						$elm$svg$Svg$Attributes$x2(
						$elm$core$String$fromFloat(xC)),
						$elm$svg$Svg$Attributes$y2(
						$elm$core$String$fromFloat(yC)),
						$elm$svg$Svg$Attributes$width('20'),
						A2($elm$html$Html$Attributes$style, 'stroke', color),
						A2($elm$html$Html$Attributes$style, 'stroke-width', '2')
					]),
				_List_Nil),
				A2(
				$elm$svg$Svg$polygon,
				_List_fromArray(
					[
						A2($elm$html$Html$Attributes$style, 'fill', color),
						$elm$svg$Svg$Attributes$points(
						($elm$core$String$fromFloat(xD) + (',' + $elm$core$String$fromFloat(yD))) + (' ' + (($elm$core$String$fromFloat(xB) + (',' + $elm$core$String$fromFloat(yB))) + (' ' + ($elm$core$String$fromFloat(xF) + (',' + $elm$core$String$fromFloat(yF)))))))
					]),
				_List_Nil)
			]));
};
var $lamdera$program_test$Effect$Test$arrowSvg = F5($lamdera$program_test$Effect$Test$arrowSvg$);
var $lamdera$program_test$Effect$Test$cameraSvg$ = function (color, left, top) {
	return A2(
		$elm$svg$Svg$svg,
		_List_fromArray(
			[
				$elm$svg$Svg$Attributes$width(
				$elm$core$String$fromInt($lamdera$program_test$Effect$Test$timelineColumnWidth)),
				A2(
				$elm$html$Html$Attributes$style,
				'left',
				$lamdera$program_test$Effect$Test$px(left)),
				A2(
				$elm$html$Html$Attributes$style,
				'top',
				$lamdera$program_test$Effect$Test$px(top)),
				A2($elm$html$Html$Attributes$style, 'position', 'absolute'),
				$elm$svg$Svg$Attributes$viewBox('0 -10 250 400'),
				A2($elm$html$Html$Attributes$style, 'pointer-events', 'none')
			]),
		_List_fromArray(
			[
				A2(
				$elm$svg$Svg$path,
				_List_fromArray(
					[
						$elm$svg$Svg$Attributes$fill('none'),
						$elm$svg$Svg$Attributes$stroke('black'),
						$elm$svg$Svg$Attributes$strokeWidth('60'),
						$elm$svg$Svg$Attributes$d('M208,52H182.42L170,33.34A12,12,0,0,0,160,28H96a12,12,0,0,0-10,5.34L73.57,52H48A28,28,0,0,0,20,80V192a28,28,0,0,0,28,28H208a28,28,0,0,0,28-28V80A28,28,0,0,0,208,52Zm4,140a4,4,0,0,1-4,4H48a4,4,0,0,1-4-4V80a4,4,0,0,1,4-4H80a12,12,0,0,0,10-5.34L102.42,52h51.15L166,70.66A12,12,0,0,0,176,76h32a4,4,0,0,1,4,4ZM128,84a48,48,0,1,0,48,48A48.05,48.05,0,0,0,128,84Zm0,72a24,24,0,1,1,24-24A24,24,0,0,1,128,156Z')
					]),
				_List_Nil),
				A2(
				$elm$svg$Svg$path,
				_List_fromArray(
					[
						$elm$svg$Svg$Attributes$fill(color),
						$elm$svg$Svg$Attributes$d('M208,52H182.42L170,33.34A12,12,0,0,0,160,28H96a12,12,0,0,0-10,5.34L73.57,52H48A28,28,0,0,0,20,80V192a28,28,0,0,0,28,28H208a28,28,0,0,0,28-28V80A28,28,0,0,0,208,52Zm4,140a4,4,0,0,1-4,4H48a4,4,0,0,1-4-4V80a4,4,0,0,1,4-4H80a12,12,0,0,0,10-5.34L102.42,52h51.15L166,70.66A12,12,0,0,0,176,76h32a4,4,0,0,1,4,4ZM128,84a48,48,0,1,0,48,48A48.05,48.05,0,0,0,128,84Zm0,72a24,24,0,1,1,24-24A24,24,0,0,1,128,156Z')
					]),
				_List_Nil)
			]));
};
var $lamdera$program_test$Effect$Test$cameraSvg = F3($lamdera$program_test$Effect$Test$cameraSvg$);
var $lamdera$program_test$Effect$Test$cursorSvg$ = function (color, left, top, width) {
	return A2(
		$elm$svg$Svg$svg,
		_List_fromArray(
			[
				$elm$svg$Svg$Attributes$width(
				$elm$core$String$fromInt(width)),
				A2(
				$elm$html$Html$Attributes$style,
				'left',
				$lamdera$program_test$Effect$Test$px(left)),
				A2(
				$elm$html$Html$Attributes$style,
				'top',
				$lamdera$program_test$Effect$Test$px(top)),
				A2($elm$html$Html$Attributes$style, 'position', 'absolute'),
				$elm$svg$Svg$Attributes$viewBox('10 0 240 400'),
				A2($elm$html$Html$Attributes$style, 'pointer-events', 'none')
			]),
		_List_fromArray(
			[
				A2(
				$elm$svg$Svg$path,
				_List_fromArray(
					[
						$elm$svg$Svg$Attributes$fill('none'),
						$elm$svg$Svg$Attributes$stroke('black'),
						$elm$svg$Svg$Attributes$strokeWidth('60'),
						$elm$svg$Svg$Attributes$d('M224.15,179.17l-46.83-46.82,37.93-13.51.76-.3a20,20,0,0,0-1.76-37.27L54.16,29A20,20,0,0,0,29,54.16L81.27,214.24A20,20,0,0,0,118.54,216c.11-.25.21-.5.3-.76l13.51-37.92,46.83,46.82a20,20,0,0,0,28.28,0l16.69-16.68A20,20,0,0,0,224.15,179.17Zm-30.83,25.17-48.48-48.48A20,20,0,0,0,130.7,150a20.66,20.66,0,0,0-3.74.35A20,20,0,0,0,112.35,162c-.11.25-.21.5-.3.76L100.4,195.5,54.29,54.29l141.21,46.1-32.71,11.66c-.26.09-.51.19-.76.3a20,20,0,0,0-6.17,32.48h0l48.49,48.48Z')
					]),
				_List_Nil),
				A2(
				$elm$svg$Svg$path,
				_List_fromArray(
					[
						$elm$svg$Svg$Attributes$fill(color),
						$elm$svg$Svg$Attributes$d('M224.15,179.17l-46.83-46.82,37.93-13.51.76-.3a20,20,0,0,0-1.76-37.27L54.16,29A20,20,0,0,0,29,54.16L81.27,214.24A20,20,0,0,0,118.54,216c.11-.25.21-.5.3-.76l13.51-37.92,46.83,46.82a20,20,0,0,0,28.28,0l16.69-16.68A20,20,0,0,0,224.15,179.17Zm-30.83,25.17-48.48-48.48A20,20,0,0,0,130.7,150a20.66,20.66,0,0,0-3.74.35A20,20,0,0,0,112.35,162c-.11.25-.21.5-.3.76L100.4,195.5,54.29,54.29l141.21,46.1-32.71,11.66c-.26.09-.51.19-.76.3a20,20,0,0,0-6.17,32.48h0l48.49,48.48Z')
					]),
				_List_Nil)
			]));
};
var $lamdera$program_test$Effect$Test$cursorSvg = F4($lamdera$program_test$Effect$Test$cursorSvg$);
var $lamdera$program_test$Effect$Test$cursorTextSvg$ = function (color, left, top) {
	return A2(
		$elm$svg$Svg$svg,
		_List_fromArray(
			[
				$elm$svg$Svg$Attributes$width(
				$elm$core$String$fromInt($lamdera$program_test$Effect$Test$timelineColumnWidth)),
				A2(
				$elm$html$Html$Attributes$style,
				'left',
				$lamdera$program_test$Effect$Test$px(left)),
				A2(
				$elm$html$Html$Attributes$style,
				'top',
				$lamdera$program_test$Effect$Test$px(top)),
				A2($elm$html$Html$Attributes$style, 'position', 'absolute'),
				$elm$svg$Svg$Attributes$viewBox('10 -10 240 400'),
				A2($elm$html$Html$Attributes$style, 'pointer-events', 'none')
			]),
		_List_fromArray(
			[
				A2(
				$elm$svg$Svg$path,
				_List_fromArray(
					[
						$elm$svg$Svg$Attributes$fill('none'),
						$elm$svg$Svg$Attributes$stroke('black'),
						$elm$svg$Svg$Attributes$strokeWidth('60'),
						$elm$svg$Svg$Attributes$d('M188,208a12,12,0,0,1-12,12H160a43.86,43.86,0,0,1-32-13.85A43.86,43.86,0,0,1,96,220H80a12,12,0,0,1,0-24H96a20,20,0,0,0,20-20V140H104a12,12,0,0,1,0-24h12V80A20,20,0,0,0,96,60H80a12,12,0,0,1,0-24H96a43.86,43.86,0,0,1,32,13.85A43.86,43.86,0,0,1,160,36h16a12,12,0,0,1,0,24H160a20,20,0,0,0-20,20v36h12a12,12,0,0,1,0,24H140v36a20,20,0,0,0,20,20h16A12,12,0,0,1,188,208Z')
					]),
				_List_Nil),
				A2(
				$elm$svg$Svg$path,
				_List_fromArray(
					[
						$elm$svg$Svg$Attributes$fill(color),
						$elm$svg$Svg$Attributes$d('M188,208a12,12,0,0,1-12,12H160a43.86,43.86,0,0,1-32-13.85A43.86,43.86,0,0,1,96,220H80a12,12,0,0,1,0-24H96a20,20,0,0,0,20-20V140H104a12,12,0,0,1,0-24h12V80A20,20,0,0,0,96,60H80a12,12,0,0,1,0-24H96a43.86,43.86,0,0,1,32,13.85A43.86,43.86,0,0,1,160,36h16a12,12,0,0,1,0,24H160a20,20,0,0,0-20,20v36h12a12,12,0,0,1,0,24H140v36a20,20,0,0,0,20,20h16A12,12,0,0,1,188,208Z')
					]),
				_List_Nil)
			]));
};
var $lamdera$program_test$Effect$Test$cursorTextSvg = F3($lamdera$program_test$Effect$Test$cursorTextSvg$);
var $elm$svg$Svg$Attributes$strokeLinecap = _VirtualDom_attribute('stroke-linecap');
var $lamdera$program_test$Effect$Test$magnifyingGlassSvg$ = function (color, left, top) {
	return A2(
		$elm$svg$Svg$svg,
		_List_fromArray(
			[
				$elm$svg$Svg$Attributes$width(
				$elm$core$String$fromInt($lamdera$program_test$Effect$Test$timelineColumnWidth)),
				A2(
				$elm$html$Html$Attributes$style,
				'left',
				$lamdera$program_test$Effect$Test$px(left)),
				A2(
				$elm$html$Html$Attributes$style,
				'top',
				$lamdera$program_test$Effect$Test$px(top)),
				A2($elm$html$Html$Attributes$style, 'position', 'absolute'),
				$elm$svg$Svg$Attributes$viewBox('-60 -60 600 700'),
				A2($elm$html$Html$Attributes$style, 'pointer-events', 'none')
			]),
		_List_fromArray(
			[
				A2(
				$elm$svg$Svg$path,
				_List_fromArray(
					[
						$elm$svg$Svg$Attributes$fill('none'),
						$elm$svg$Svg$Attributes$stroke('black'),
						$elm$svg$Svg$Attributes$strokeWidth('200'),
						$elm$svg$Svg$Attributes$strokeLinecap('round'),
						$elm$svg$Svg$Attributes$d('m280,278a153,153 0 1,0-2,2l170,170m-91-117 110,110-26,26-110-110')
					]),
				_List_Nil),
				A2(
				$elm$svg$Svg$path,
				_List_fromArray(
					[
						$elm$svg$Svg$Attributes$fill('none'),
						$elm$svg$Svg$Attributes$stroke(color),
						$elm$svg$Svg$Attributes$strokeWidth('80'),
						$elm$svg$Svg$Attributes$strokeLinecap('round'),
						$elm$svg$Svg$Attributes$d('m280,278a153,153 0 1,0-2,2l170,170m-91-117 110,110-26,26-110-110')
					]),
				_List_Nil)
			]));
};
var $lamdera$program_test$Effect$Test$magnifyingGlassSvg = F3($lamdera$program_test$Effect$Test$magnifyingGlassSvg$);
var $lamdera$program_test$Effect$Test$simpleLinkSvg$ = function (color, left, top) {
	return A2(
		$elm$svg$Svg$svg,
		_List_fromArray(
			[
				$elm$svg$Svg$Attributes$width(
				$elm$core$String$fromInt($lamdera$program_test$Effect$Test$timelineColumnWidth)),
				A2(
				$elm$html$Html$Attributes$style,
				'left',
				$lamdera$program_test$Effect$Test$px(left)),
				A2(
				$elm$html$Html$Attributes$style,
				'top',
				$lamdera$program_test$Effect$Test$px(top)),
				A2($elm$html$Html$Attributes$style, 'position', 'absolute'),
				$elm$svg$Svg$Attributes$viewBox('10 0 240 400'),
				A2($elm$html$Html$Attributes$style, 'pointer-events', 'none'),
				A2($elm$html$Html$Attributes$style, 'transform', 'scale(-1, 1)')
			]),
		_List_fromArray(
			[
				A2(
				$elm$svg$Svg$path,
				_List_fromArray(
					[
						$elm$svg$Svg$Attributes$fill('none'),
						$elm$svg$Svg$Attributes$stroke('black'),
						$elm$svg$Svg$Attributes$strokeWidth('60'),
						$elm$svg$Svg$Attributes$d('M87.5,151.52l64-64a12,12,0,0,1,17,17l-64,64a12,12,0,0,1-17-17Zm131-114a60.08,60.08,0,0,0-84.87,0L103.51,67.61a12,12,0,0,0,17,17l30.07-30.06a36,36,0,0,1,50.93,50.92L171.4,135.52a12,12,0,1,0,17,17l30.08-30.06A60.09,60.09,0,0,0,218.45,37.55ZM135.52,171.4l-30.07,30.08a36,36,0,0,1-50.92-50.93l30.06-30.07a12,12,0,0,0-17-17L37.55,133.58a60,60,0,0,0,84.88,84.87l30.06-30.07a12,12,0,0,0-17-17Z')
					]),
				_List_Nil),
				A2(
				$elm$svg$Svg$path,
				_List_fromArray(
					[
						$elm$svg$Svg$Attributes$fill(color),
						$elm$svg$Svg$Attributes$d('M87.5,151.52l64-64a12,12,0,0,1,17,17l-64,64a12,12,0,0,1-17-17Zm131-114a60.08,60.08,0,0,0-84.87,0L103.51,67.61a12,12,0,0,0,17,17l30.07-30.06a36,36,0,0,1,50.93,50.92L171.4,135.52a12,12,0,1,0,17,17l30.08-30.06A60.09,60.09,0,0,0,218.45,37.55ZM135.52,171.4l-30.07,30.08a36,36,0,0,1-50.92-50.93l30.06-30.07a12,12,0,0,0-17-17L37.55,133.58a60,60,0,0,0,84.88,84.87l30.06-30.07a12,12,0,0,0-17-17Z')
					]),
				_List_Nil)
			]));
};
var $lamdera$program_test$Effect$Test$simpleLinkSvg = F3($lamdera$program_test$Effect$Test$simpleLinkSvg$);
var $lamdera$program_test$Effect$Test$timelineRowHeight = 32;
var $lamdera$program_test$Effect$Test$xSvg$ = function (color, left, top) {
	return A2(
		$elm$svg$Svg$svg,
		_List_fromArray(
			[
				$elm$svg$Svg$Attributes$width(
				$elm$core$String$fromInt($lamdera$program_test$Effect$Test$timelineColumnWidth)),
				A2(
				$elm$html$Html$Attributes$style,
				'left',
				$lamdera$program_test$Effect$Test$px(left)),
				A2(
				$elm$html$Html$Attributes$style,
				'top',
				$lamdera$program_test$Effect$Test$px(top)),
				A2($elm$html$Html$Attributes$style, 'position', 'absolute'),
				$elm$svg$Svg$Attributes$viewBox('-70 10 300 300'),
				A2($elm$html$Html$Attributes$style, 'pointer-events', 'none')
			]),
		_List_fromArray(
			[
				A2(
				$elm$svg$Svg$path,
				_List_fromArray(
					[
						$elm$svg$Svg$Attributes$stroke(color),
						$elm$svg$Svg$Attributes$strokeWidth('30'),
						$elm$svg$Svg$Attributes$d('M208.49,191.51a12,12,0,0,1-17,17L128,145,64.49,208.49a12,12,0,0,1-17-17L111,128,47.51,64.49a12,12,0,0,1,17-17L128,111l63.51-63.52a12,12,0,0,1,17,17L145,128Z')
					]),
				_List_Nil)
			]));
};
var $lamdera$program_test$Effect$Test$xSvg = F3($lamdera$program_test$Effect$Test$xSvg$);
var $lamdera$program_test$Effect$Test$eventIcon$ = function (color, event, columnIndex, rowIndex) {
	var noErrors = $elm$core$List$isEmpty(event.testErrors);
	var circleHelper = function (_class) {
		return A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					A2($elm$html$Html$Attributes$style, 'background-color', color),
					A2(
					$elm$html$Html$Attributes$style,
					'left',
					$lamdera$program_test$Effect$Test$px(columnIndex * $lamdera$program_test$Effect$Test$timelineColumnWidth)),
					A2(
					$elm$html$Html$Attributes$style,
					'top',
					$lamdera$program_test$Effect$Test$px((rowIndex * $lamdera$program_test$Effect$Test$timelineRowHeight) + 1)),
					$elm$html$Html$Attributes$class(_class)
				]),
			_List_Nil);
	};
	return _Utils_ap(
		function () {
			var _v0 = event.eventType;
			switch (_v0.$) {
				case 'FrontendUpdateEvent':
					return _List_fromArray(
						[
							circleHelper('circle')
						]);
				case 'UpdateFromFrontendEvent':
					return _List_fromArray(
						[
							circleHelper('circle')
						]);
				case 'UpdateFromBackendEvent':
					return _List_fromArray(
						[
							circleHelper('circle')
						]);
				case 'BackendUpdateEvent':
					return _List_fromArray(
						[
							circleHelper('circle')
						]);
				case 'TestEvent':
					return _List_fromArray(
						[
							circleHelper('big-circle')
						]);
				case 'BackendInitEvent':
					return _List_fromArray(
						[
							circleHelper('circle')
						]);
				case 'FrontendInitEvent':
					return _List_fromArray(
						[
							circleHelper('circle')
						]);
				case 'CheckStateEvent':
					return _List_fromArray(
						[
							$lamdera$program_test$Effect$Test$magnifyingGlassSvg$(color, columnIndex * $lamdera$program_test$Effect$Test$timelineColumnWidth, rowIndex * $lamdera$program_test$Effect$Test$timelineRowHeight)
						]);
				case 'UserInputEvent':
					var data = _v0.a;
					var _v1 = data.inputType;
					switch (_v1.$) {
						case 'UserClicksButton':
							return _List_fromArray(
								[
									$lamdera$program_test$Effect$Test$cursorSvg$(color, columnIndex * $lamdera$program_test$Effect$Test$timelineColumnWidth, rowIndex * $lamdera$program_test$Effect$Test$timelineRowHeight, $lamdera$program_test$Effect$Test$timelineColumnWidth)
								]);
						case 'UserInputsText':
							return _List_fromArray(
								[
									$lamdera$program_test$Effect$Test$cursorTextSvg$(color, columnIndex * $lamdera$program_test$Effect$Test$timelineColumnWidth, rowIndex * $lamdera$program_test$Effect$Test$timelineRowHeight)
								]);
						case 'UserPressesKey':
							return _List_fromArray(
								[
									circleHelper('big-circle')
								]);
						case 'UserClicksLink':
							return _List_fromArray(
								[
									$lamdera$program_test$Effect$Test$simpleLinkSvg$(color, columnIndex * $lamdera$program_test$Effect$Test$timelineColumnWidth, rowIndex * $lamdera$program_test$Effect$Test$timelineRowHeight)
								]);
						case 'UserResizesWindow':
							return _List_fromArray(
								[
									circleHelper('big-circle')
								]);
						case 'UserPointerDownEvent':
							return _List_fromArray(
								[
									$lamdera$program_test$Effect$Test$cursorSvg$(color, columnIndex * $lamdera$program_test$Effect$Test$timelineColumnWidth, rowIndex * $lamdera$program_test$Effect$Test$timelineRowHeight, $lamdera$program_test$Effect$Test$timelineColumnWidth)
								]);
						case 'UserPointerUpEvent':
							return _List_fromArray(
								[
									$lamdera$program_test$Effect$Test$cursorSvg$(color, columnIndex * $lamdera$program_test$Effect$Test$timelineColumnWidth, rowIndex * $lamdera$program_test$Effect$Test$timelineRowHeight, $lamdera$program_test$Effect$Test$timelineColumnWidth)
								]);
						case 'UserPointerEnterEvent':
							return _List_fromArray(
								[
									$lamdera$program_test$Effect$Test$cursorSvg$(color, columnIndex * $lamdera$program_test$Effect$Test$timelineColumnWidth, rowIndex * $lamdera$program_test$Effect$Test$timelineRowHeight, $lamdera$program_test$Effect$Test$timelineColumnWidth)
								]);
						case 'UserPointerLeaveEvent':
							return _List_fromArray(
								[
									$lamdera$program_test$Effect$Test$cursorSvg$(color, columnIndex * $lamdera$program_test$Effect$Test$timelineColumnWidth, rowIndex * $lamdera$program_test$Effect$Test$timelineRowHeight, $lamdera$program_test$Effect$Test$timelineColumnWidth)
								]);
						case 'UserPointerOutEvent':
							return _List_fromArray(
								[
									$lamdera$program_test$Effect$Test$cursorSvg$(color, columnIndex * $lamdera$program_test$Effect$Test$timelineColumnWidth, rowIndex * $lamdera$program_test$Effect$Test$timelineRowHeight, $lamdera$program_test$Effect$Test$timelineColumnWidth)
								]);
						case 'UserPointerMoveEvent':
							return _List_fromArray(
								[
									$lamdera$program_test$Effect$Test$cursorSvg$(color, columnIndex * $lamdera$program_test$Effect$Test$timelineColumnWidth, rowIndex * $lamdera$program_test$Effect$Test$timelineRowHeight, $lamdera$program_test$Effect$Test$timelineColumnWidth)
								]);
						case 'UserPointerOverEvent':
							return _List_fromArray(
								[
									$lamdera$program_test$Effect$Test$cursorSvg$(color, columnIndex * $lamdera$program_test$Effect$Test$timelineColumnWidth, rowIndex * $lamdera$program_test$Effect$Test$timelineRowHeight, $lamdera$program_test$Effect$Test$timelineColumnWidth)
								]);
						case 'UserPointerCancelEvent':
							return _List_fromArray(
								[
									$lamdera$program_test$Effect$Test$cursorSvg$(color, columnIndex * $lamdera$program_test$Effect$Test$timelineColumnWidth, rowIndex * $lamdera$program_test$Effect$Test$timelineRowHeight, $lamdera$program_test$Effect$Test$timelineColumnWidth)
								]);
						case 'UserTouchCancelEvent':
							return _List_fromArray(
								[
									circleHelper('big-circle')
								]);
						case 'UserTouchStartEvent':
							return _List_fromArray(
								[
									circleHelper('big-circle')
								]);
						case 'UserTouchEndEvent':
							return _List_fromArray(
								[
									circleHelper('big-circle')
								]);
						case 'UserTouchMoveEvent':
							return _List_fromArray(
								[
									circleHelper('big-circle')
								]);
						case 'UserMouseEnterEvent':
							return _List_fromArray(
								[
									$lamdera$program_test$Effect$Test$cursorSvg$(color, columnIndex * $lamdera$program_test$Effect$Test$timelineColumnWidth, rowIndex * $lamdera$program_test$Effect$Test$timelineRowHeight, $lamdera$program_test$Effect$Test$timelineColumnWidth)
								]);
						case 'UserMouseLeaveEvent':
							return _List_fromArray(
								[
									$lamdera$program_test$Effect$Test$cursorSvg$(color, columnIndex * $lamdera$program_test$Effect$Test$timelineColumnWidth, rowIndex * $lamdera$program_test$Effect$Test$timelineRowHeight, $lamdera$program_test$Effect$Test$timelineColumnWidth)
								]);
						case 'UserMouseOutEvent':
							return _List_fromArray(
								[
									$lamdera$program_test$Effect$Test$cursorSvg$(color, columnIndex * $lamdera$program_test$Effect$Test$timelineColumnWidth, rowIndex * $lamdera$program_test$Effect$Test$timelineRowHeight, $lamdera$program_test$Effect$Test$timelineColumnWidth)
								]);
						case 'UserMouseMoveEvent':
							return _List_fromArray(
								[
									$lamdera$program_test$Effect$Test$cursorSvg$(color, columnIndex * $lamdera$program_test$Effect$Test$timelineColumnWidth, rowIndex * $lamdera$program_test$Effect$Test$timelineRowHeight, $lamdera$program_test$Effect$Test$timelineColumnWidth)
								]);
						case 'UserMouseOverEvent':
							return _List_fromArray(
								[
									$lamdera$program_test$Effect$Test$cursorSvg$(color, columnIndex * $lamdera$program_test$Effect$Test$timelineColumnWidth, rowIndex * $lamdera$program_test$Effect$Test$timelineRowHeight, $lamdera$program_test$Effect$Test$timelineColumnWidth)
								]);
						case 'UserMouseUpEvent':
							return _List_fromArray(
								[
									$lamdera$program_test$Effect$Test$cursorSvg$(color, columnIndex * $lamdera$program_test$Effect$Test$timelineColumnWidth, rowIndex * $lamdera$program_test$Effect$Test$timelineRowHeight, $lamdera$program_test$Effect$Test$timelineColumnWidth)
								]);
						case 'UserMouseDownEvent':
							return _List_fromArray(
								[
									$lamdera$program_test$Effect$Test$cursorSvg$(color, columnIndex * $lamdera$program_test$Effect$Test$timelineColumnWidth, rowIndex * $lamdera$program_test$Effect$Test$timelineRowHeight, $lamdera$program_test$Effect$Test$timelineColumnWidth)
								]);
						case 'UserFocusEvent':
							return _List_fromArray(
								[
									circleHelper('big-circle')
								]);
						case 'UserBlurEvent':
							return _List_fromArray(
								[
									circleHelper('big-circle')
								]);
						case 'UserWheelEvent':
							return _List_fromArray(
								[
									circleHelper('big-circle')
								]);
						default:
							return _List_fromArray(
								[
									circleHelper('big-circle')
								]);
					}
				case 'SnapshotEvent':
					return _List_fromArray(
						[
							$lamdera$program_test$Effect$Test$cameraSvg$(color, columnIndex * $lamdera$program_test$Effect$Test$timelineColumnWidth, rowIndex * $lamdera$program_test$Effect$Test$timelineRowHeight)
						]);
				case 'ManuallySendToBackend':
					return _List_fromArray(
						[
							circleHelper('big-circle')
						]);
				case 'ManuallySendPortEvent':
					return _List_fromArray(
						[
							circleHelper('big-circle')
						]);
				case 'EffectFailedEvent':
					return _List_fromArray(
						[
							circleHelper('circle')
						]);
				case 'NavigateBack':
					return _List_fromArray(
						[
							circleHelper('big-circle')
						]);
				default:
					return _List_fromArray(
						[
							circleHelper('big-circle')
						]);
			}
		}(),
		noErrors ? _List_Nil : _List_fromArray(
			[
				$lamdera$program_test$Effect$Test$xSvg$('red', columnIndex * $lamdera$program_test$Effect$Test$timelineColumnWidth, rowIndex * $lamdera$program_test$Effect$Test$timelineRowHeight)
			]));
};
var $lamdera$program_test$Effect$Test$eventIcon = F4($lamdera$program_test$Effect$Test$eventIcon$);
var $lamdera$program_test$Effect$Test$unselectedTimelineColor = '#626262';
var $lamdera$program_test$Effect$Test$addTimelineEvent$ = function (currentTimelineIndex, _v0, event, state) {
	var currentStep = _v0.currentStep;
	var previousStep = _v0.previousStep;
	var arrowHelper = F3(
		function (rowIndexStart, rowIndexEnd, stepIndex) {
			var yB = (rowIndexEnd * $lamdera$program_test$Effect$Test$timelineRowHeight) + (($lamdera$program_test$Effect$Test$timelineRowHeight / 4) | 0);
			var yA = (rowIndexStart * $lamdera$program_test$Effect$Test$timelineRowHeight) + (($lamdera$program_test$Effect$Test$timelineRowHeight / 4) | 0);
			var xB = (state.columnIndex * $lamdera$program_test$Effect$Test$timelineColumnWidth) + (($lamdera$program_test$Effect$Test$timelineColumnWidth / 2) | 0);
			var xA = (stepIndex * $lamdera$program_test$Effect$Test$timelineColumnWidth) + (($lamdera$program_test$Effect$Test$timelineColumnWidth / 2) | 0);
			var length = $elm$core$Basics$sqrt(
				A2($elm$core$Basics$pow, xB - xA, 2) + A2($elm$core$Basics$pow, yB - yA, 2));
			var length2 = (length - 4) / length;
			var color2 = (_Utils_eq(currentTimelineIndex, rowIndexStart) || _Utils_eq(currentTimelineIndex, rowIndexEnd)) ? 'white' : $lamdera$program_test$Effect$Test$unselectedTimelineColor;
			return _List_fromArray(
				[
					$lamdera$program_test$Effect$Test$arrowSvg$(color2, xA, yA, (length2 * (xB - xA)) + xA, (length2 * (yB - yA)) + yA)
				]);
		});
	var arrows = function (rowIndex) {
		var _v2 = event.eventType;
		switch (_v2.$) {
			case 'FrontendUpdateEvent':
				return _List_Nil;
			case 'UpdateFromBackendEvent':
				var data = _v2.a;
				return A3(arrowHelper, 0, rowIndex, data.stepIndex);
			case 'UpdateFromFrontendEvent':
				var data = _v2.a;
				var _v3 = $lamdera$containers$SeqDict$get$(
					$lamdera$program_test$Effect$Test$FrontendTimeline(data.clientId),
					state.dict);
				if (_v3.$ === 'Just') {
					var timeline = _v3.a;
					return A3(arrowHelper, timeline.rowIndex, rowIndex, data.stepIndex);
				} else {
					return _List_Nil;
				}
			case 'BackendUpdateEvent':
				return _List_Nil;
			case 'TestEvent':
				return _List_Nil;
			case 'BackendInitEvent':
				return _List_Nil;
			case 'FrontendInitEvent':
				return _List_Nil;
			case 'CheckStateEvent':
				return _List_Nil;
			case 'UserInputEvent':
				return _List_Nil;
			case 'SnapshotEvent':
				return _List_Nil;
			case 'ManuallySendToBackend':
				return _List_Nil;
			case 'ManuallySendPortEvent':
				return _List_Nil;
			case 'EffectFailedEvent':
				return _List_Nil;
			case 'NavigateBack':
				return _List_Nil;
			default:
				return _List_Nil;
		}
	};
	return {
		columnIndex: state.columnIndex + 1,
		dict: $lamdera$containers$SeqDict$update$(
			$lamdera$program_test$Effect$Test$eventTypeToTimelineType(event.eventType),
			function (maybeTimeline) {
				var color = function (rowIndex) {
					return (!_Utils_eq(currentTimelineIndex, rowIndex)) ? $lamdera$program_test$Effect$Test$unselectedTimelineColor : (_Utils_eq(
						previousStep,
						$elm$core$Maybe$Just(state.columnIndex)) ? 'red' : (_Utils_eq(
						currentStep,
						$elm$core$Maybe$Just(state.columnIndex)) ? 'green' : 'white'));
				};
				return $elm$core$Maybe$Just(
					function () {
						if (maybeTimeline.$ === 'Just') {
							var timeline = maybeTimeline.a;
							return {
								columnEnd: state.columnIndex,
								columnStart: timeline.columnStart,
								events: _Utils_ap(
									arrows(timeline.rowIndex),
									_Utils_ap(
										$lamdera$program_test$Effect$Test$eventIcon$(
											color(timeline.rowIndex),
											event,
											state.columnIndex,
											timeline.rowIndex),
										timeline.events)),
								rowIndex: timeline.rowIndex
							};
						} else {
							var rowIndex = $lamdera$containers$SeqDict$size(state.dict);
							return {
								columnEnd: state.columnIndex,
								columnStart: state.columnIndex,
								events: _Utils_ap(
									arrows(rowIndex),
									$lamdera$program_test$Effect$Test$eventIcon$(
										color(rowIndex),
										event,
										state.columnIndex,
										rowIndex)),
								rowIndex: rowIndex
							};
						}
					}());
			},
			state.dict)
	};
};
var $lamdera$program_test$Effect$Test$addTimelineEvent = F4($lamdera$program_test$Effect$Test$addTimelineEvent$);
var $lamdera$program_test$Effect$Test$getTimelines$ = function (timelineIndex, testView_) {
	var currentAndPreviousStepIndex2 = $lamdera$program_test$Effect$Test$currentAndPreviousStepIndex(testView_);
	return $lamdera$containers$SeqDict$toList(
		$elm$core$Array$foldl$(
			A2(
				$lamdera$program_test$Effect$Test$addTimelineEvent,
				timelineIndex,
				_Utils_update(
					currentAndPreviousStepIndex2,
					{
						previousStep: testView_.showModel ? currentAndPreviousStepIndex2.previousStep : $elm$core$Maybe$Nothing
					})),
			{
				columnIndex: 0,
				dict: $lamdera$containers$SeqDict$singleton$(
					$lamdera$program_test$Effect$Test$BackendTimeline,
					{columnEnd: 0, columnStart: 0, events: _List_Nil, rowIndex: 0})
			},
			testView_.steps).dict);
};
var $lamdera$program_test$Effect$Test$getTimelines = F2($lamdera$program_test$Effect$Test$getTimelines$);
var $lamdera$program_test$Effect$Test$PressedTimelineEvent = function (a) {
	return {$: 'PressedTimelineEvent', a: a};
};
var $lamdera$program_test$Effect$Test$ArrowDown = {$: 'ArrowDown'};
var $lamdera$program_test$Effect$Test$ArrowLeft = {$: 'ArrowLeft'};
var $lamdera$program_test$Effect$Test$ArrowRight = {$: 'ArrowRight'};
var $lamdera$program_test$Effect$Test$ArrowUp = {$: 'ArrowUp'};
var $lamdera$program_test$Effect$Test$PressedArrowKey = function (a) {
	return {$: 'PressedArrowKey', a: a};
};
var $lamdera$program_test$Effect$Test$decodeArrows = A2(
	$elm$json$Json$Decode$andThen,
	function (key) {
		return (key === 'ArrowLeft') ? $elm$json$Json$Decode$succeed(
			$lamdera$program_test$Effect$Test$PressedArrowKey($lamdera$program_test$Effect$Test$ArrowLeft)) : ((key === 'ArrowRight') ? $elm$json$Json$Decode$succeed(
			$lamdera$program_test$Effect$Test$PressedArrowKey($lamdera$program_test$Effect$Test$ArrowRight)) : ((key === 'ArrowUp') ? $elm$json$Json$Decode$succeed(
			$lamdera$program_test$Effect$Test$PressedArrowKey($lamdera$program_test$Effect$Test$ArrowUp)) : ((key === 'ArrowDown') ? $elm$json$Json$Decode$succeed(
			$lamdera$program_test$Effect$Test$PressedArrowKey($lamdera$program_test$Effect$Test$ArrowDown)) : $elm$json$Json$Decode$fail(''))));
	},
	A2($elm$json$Json$Decode$field, 'key', $elm$json$Json$Decode$string));
var $elm$html$Html$Attributes$id = $elm$html$Html$Attributes$stringProperty('id');
var $elm$core$List$maximum = function (list) {
	if (list.b) {
		var x = list.a;
		var xs = list.b;
		return $elm$core$Maybe$Just(
			$elm$core$List$foldl$($elm$core$Basics$max, x, xs));
	} else {
		return $elm$core$Maybe$Nothing;
	}
};
var $elm$html$Html$Attributes$tabindex = function (n) {
	return A2(
		_VirtualDom_attribute,
		'tabIndex',
		$elm$core$String$fromInt(n));
};
var $elm$virtual_dom$VirtualDom$node = function (tag) {
	return _VirtualDom_node(
		_VirtualDom_noScript(tag));
};
var $elm$html$Html$node = $elm$virtual_dom$VirtualDom$node;
var $lamdera$program_test$Effect$Test$timelineCss = A3(
	$elm$html$Html$node,
	'style',
	_List_Nil,
	_List_fromArray(
		[
			$elm$html$Html$text('\n.circle {\n    width: 8px;\n    height: 8px;\n    margin: 3px;\n    border-radius: 8px;\n    pointer-events: none;\n    position: absolute;\n}\n.big-circle {\n    width: 12px;\n    height: 12px;\n    margin: 1px;\n    border-radius: 8px;\n    pointer-events: none;\n    position: absolute;\n}\n    ')
		]));
var $lamdera$program_test$Effect$Test$timelineEventId = 'currentEvent123';
var $lamdera$program_test$Effect$Test$timelineViewHelper$ = function (width, testView_, timelines) {
	var maxColumnEnd = $elm$core$Maybe$withDefault$(
		0,
		$elm$core$List$maximum(
			$elm$core$List$map$(
				function (_v3) {
					var timeline = _v3.b;
					return timeline.columnEnd;
				},
				timelines)));
	return A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				A2(
				$elm$html$Html$Attributes$style,
				'width',
				$lamdera$program_test$Effect$Test$px(width)),
				A2(
				$elm$html$Html$Attributes$style,
				'height',
				$lamdera$program_test$Effect$Test$px(
					$elm$core$List$length(timelines) * $lamdera$program_test$Effect$Test$timelineRowHeight)),
				A2($elm$html$Html$Attributes$style, 'position', 'relative'),
				A2($elm$html$Html$Attributes$style, 'overflow-x', 'auto'),
				A2($elm$html$Html$Attributes$style, 'overflow-y', 'clip'),
				$elm$html$Html$Events$preventDefaultOn$(
				'keydown',
				A2(
					$elm$json$Json$Decode$map,
					function (_v2) {
						return _Utils_Tuple2($lamdera$program_test$Effect$Test$NoOp, true);
					},
					$lamdera$program_test$Effect$Test$decodeArrows)),
				$elm$html$Html$Attributes$tabindex(-1),
				A2($elm$html$Html$Attributes$style, 'display', 'inline-block'),
				$elm$html$Html$Attributes$id($lamdera$program_test$Effect$Test$timelineContainerId)
			]),
		function (a) {
			return A2(
				$elm$core$List$cons,
				$lamdera$program_test$Effect$Test$timelineCss,
				_Utils_ap(
					$elm$core$List$map$(
						function (index) {
							return A2(
								$elm$html$Html$div,
								_Utils_ap(
									_List_fromArray(
										[
											A2(
											$elm$html$Html$Attributes$style,
											'left',
											$lamdera$program_test$Effect$Test$px(index * $lamdera$program_test$Effect$Test$timelineColumnWidth)),
											A2(
											$elm$html$Html$Attributes$style,
											'width',
											$lamdera$program_test$Effect$Test$px($lamdera$program_test$Effect$Test$timelineColumnWidth)),
											A2(
											$elm$html$Html$Attributes$style,
											'height',
											$lamdera$program_test$Effect$Test$px(
												$elm$core$List$length(timelines) * $lamdera$program_test$Effect$Test$timelineRowHeight)),
											A2($elm$html$Html$Attributes$style, 'position', 'absolute'),
											$elm$html$Html$Events$onClick(
											$lamdera$program_test$Effect$Test$PressedTimelineEvent(index))
										]),
									_Utils_eq(index, testView_.stepIndex) ? _List_fromArray(
										[
											$elm$html$Html$Attributes$id($lamdera$program_test$Effect$Test$timelineEventId),
											A2($elm$html$Html$Attributes$style, 'background-color', 'rgba(255,255,255,0.4)')
										]) : _List_Nil),
								_List_Nil);
						},
						$elm$core$List$range$(
							0,
							$elm$core$Array$length(testView_.steps) - 1)),
					a));
		}(
			$elm$core$List$concatMap$(
				function (_v0) {
					var timelineType = _v0.a;
					var timeline = _v0.b;
					return A2(
						$elm$core$List$cons,
						A2(
							$elm$html$Html$div,
							_List_fromArray(
								[
									A2($elm$html$Html$Attributes$style, 'position', 'absolute'),
									A2(
									$elm$html$Html$Attributes$style,
									'left',
									$lamdera$program_test$Effect$Test$px((timeline.columnStart * $lamdera$program_test$Effect$Test$timelineColumnWidth) + (($lamdera$program_test$Effect$Test$timelineColumnWidth / 2) | 0))),
									A2(
									$elm$html$Html$Attributes$style,
									'top',
									$lamdera$program_test$Effect$Test$px((timeline.rowIndex * $lamdera$program_test$Effect$Test$timelineRowHeight) + 7)),
									A2($elm$html$Html$Attributes$style, 'height', '2px'),
									A2($elm$html$Html$Attributes$style, 'pointer-events', 'none'),
									A2(
									$elm$html$Html$Attributes$style,
									'width',
									function () {
										if (timelineType.$ === 'FrontendTimeline') {
											return $lamdera$program_test$Effect$Test$px(((timeline.columnEnd - timeline.columnStart) * $lamdera$program_test$Effect$Test$timelineColumnWidth) + (($lamdera$program_test$Effect$Test$timelineColumnWidth / 4) | 0));
										} else {
											return $lamdera$program_test$Effect$Test$px(((maxColumnEnd - timeline.columnStart) * $lamdera$program_test$Effect$Test$timelineColumnWidth) + (($lamdera$program_test$Effect$Test$timelineColumnWidth / 4) | 0));
										}
									}()),
									A2(
									$elm$html$Html$Attributes$style,
									'background-color',
									_Utils_eq(testView_.timelineIndex, timeline.rowIndex) ? 'white' : $lamdera$program_test$Effect$Test$unselectedTimelineColor)
								]),
							_List_Nil),
						timeline.events);
				},
				timelines)));
};
var $lamdera$program_test$Effect$Test$timelineViewHelper = F3($lamdera$program_test$Effect$Test$timelineViewHelper$);
var $lamdera$program_test$Effect$Test$timelineView$ = function (windowWidth, testView_) {
	var timelines = $lamdera$program_test$Effect$Test$getTimelines$(testView_.timelineIndex, testView_);
	var sideBarWidth = 64;
	var leftPadding = 4;
	var currentTimeline_ = $lamdera$program_test$Effect$Test$currentTimeline(testView_);
	return A2(
		$elm$html$Html$div,
		_List_Nil,
		_List_fromArray(
			[
				A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						A2($elm$html$Html$Attributes$style, 'display', 'inline-block'),
						A2($elm$html$Html$Attributes$style, 'position', 'relative'),
						A2(
						$elm$html$Html$Attributes$style,
						'width',
						$lamdera$program_test$Effect$Test$px(sideBarWidth - leftPadding)),
						A2(
						$elm$html$Html$Attributes$style,
						'height',
						$lamdera$program_test$Effect$Test$px(
							$elm$core$List$length(timelines) * $lamdera$program_test$Effect$Test$timelineRowHeight)),
						A2(
						$elm$html$Html$Attributes$style,
						'padding-left',
						$lamdera$program_test$Effect$Test$px(leftPadding)),
						A2($elm$html$Html$Attributes$style, 'font-size', '14px'),
						A2($elm$html$Html$Attributes$style, 'box-sizing', 'unset')
					]),
				$elm$core$List$map$(
					function (_v0) {
						var timelineType = _v0.a;
						var timeline = _v0.b;
						return A2(
							$elm$html$Html$button,
							_List_fromArray(
								[
									A2($elm$html$Html$Attributes$style, 'position', 'absolute'),
									A2(
									$elm$html$Html$Attributes$style,
									'top',
									$lamdera$program_test$Effect$Test$px((timeline.rowIndex * $lamdera$program_test$Effect$Test$timelineRowHeight) - 4)),
									A2(
									$elm$html$Html$Attributes$style,
									'color',
									_Utils_eq(currentTimeline_, timelineType) ? 'white' : $lamdera$program_test$Effect$Test$unselectedTimelineColor),
									$lamdera$program_test$Effect$Test$darkBackground,
									A2($elm$html$Html$Attributes$style, 'border-width', '0'),
									A2($elm$html$Html$Attributes$style, 'margin', '0'),
									A2($elm$html$Html$Attributes$style, 'padding', '4px 0 4px 0'),
									$elm$html$Html$Events$onClick(
									$lamdera$program_test$Effect$Test$PressedTimeline(timelineType))
								]),
							_List_fromArray(
								[
									$elm$html$Html$text(
									function () {
										if (timelineType.$ === 'BackendTimeline') {
											return 'Backend';
										} else {
											var clientId = timelineType.a;
											return $lamdera$program_test$Effect$Lamdera$clientIdToString(clientId);
										}
									}())
								]));
					},
					timelines)),
				$lamdera$program_test$Effect$Test$timelineViewHelper$((windowWidth - sideBarWidth) - 1, testView_, timelines)
			]));
};
var $lamdera$program_test$Effect$Test$timelineView = F2($lamdera$program_test$Effect$Test$timelineView$);
var $elm$time$Time$toCivil = function (minutes) {
	var rawDay = $elm$time$Time$flooredDiv$(minutes, 60 * 24) + 719468;
	var era = (((rawDay >= 0) ? rawDay : (rawDay - 146096)) / 146097) | 0;
	var dayOfEra = rawDay - (era * 146097);
	var yearOfEra = ((((dayOfEra - ((dayOfEra / 1460) | 0)) + ((dayOfEra / 36524) | 0)) - ((dayOfEra / 146096) | 0)) / 365) | 0;
	var dayOfYear = dayOfEra - (((365 * yearOfEra) + ((yearOfEra / 4) | 0)) - ((yearOfEra / 100) | 0));
	var mp = (((5 * dayOfYear) + 2) / 153) | 0;
	var month = mp + ((mp < 10) ? 3 : (-9));
	var year = yearOfEra + (era * 400);
	return {
		day: (dayOfYear - ((((153 * mp) + 2) / 5) | 0)) + 1,
		month: month,
		year: year + ((month <= 2) ? 1 : 0)
	};
};
var $elm$time$Time$toDay$ = function (zone, time) {
	return $elm$time$Time$toCivil(
		$elm$time$Time$toAdjustedMinutes$(zone, time)).day;
};
var $elm$time$Time$toDay = F2($elm$time$Time$toDay$);
var $elm$time$Time$Apr = {$: 'Apr'};
var $elm$time$Time$Aug = {$: 'Aug'};
var $elm$time$Time$Dec = {$: 'Dec'};
var $elm$time$Time$Feb = {$: 'Feb'};
var $elm$time$Time$Jan = {$: 'Jan'};
var $elm$time$Time$Jul = {$: 'Jul'};
var $elm$time$Time$Jun = {$: 'Jun'};
var $elm$time$Time$Mar = {$: 'Mar'};
var $elm$time$Time$May = {$: 'May'};
var $elm$time$Time$Nov = {$: 'Nov'};
var $elm$time$Time$Oct = {$: 'Oct'};
var $elm$time$Time$Sep = {$: 'Sep'};
var $elm$time$Time$toMonth$ = function (zone, time) {
	var _v0 = $elm$time$Time$toCivil(
		$elm$time$Time$toAdjustedMinutes$(zone, time)).month;
	switch (_v0) {
		case 1:
			return $elm$time$Time$Jan;
		case 2:
			return $elm$time$Time$Feb;
		case 3:
			return $elm$time$Time$Mar;
		case 4:
			return $elm$time$Time$Apr;
		case 5:
			return $elm$time$Time$May;
		case 6:
			return $elm$time$Time$Jun;
		case 7:
			return $elm$time$Time$Jul;
		case 8:
			return $elm$time$Time$Aug;
		case 9:
			return $elm$time$Time$Sep;
		case 10:
			return $elm$time$Time$Oct;
		case 11:
			return $elm$time$Time$Nov;
		default:
			return $elm$time$Time$Dec;
	}
};
var $elm$time$Time$toMonth = F2($elm$time$Time$toMonth$);
var $elm$time$Time$toYear$ = function (zone, time) {
	return $elm$time$Time$toCivil(
		$elm$time$Time$toAdjustedMinutes$(zone, time)).year;
};
var $elm$time$Time$toYear = F2($elm$time$Time$toYear$);
var $lamdera$program_test$Effect$Test$testOverlay$ = function (windowWidth, testView_, currentStep) {
	return A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				A2($elm$html$Html$Attributes$style, 'font-family', 'arial'),
				A2($elm$html$Html$Attributes$style, 'font-size', '14px'),
				$lamdera$program_test$Effect$Test$defaultFontColor,
				A2($elm$html$Html$Attributes$style, 'position', 'fixed'),
				$lamdera$program_test$Effect$Test$darkBackground,
				A2($elm$html$Html$Attributes$style, 'z-index', '9999'),
				A2($elm$html$Html$Attributes$style, 'width', '100vw'),
				function () {
				var _v0 = testView_.overlayPosition;
				if (_v0.$ === 'Top') {
					return A2($elm$html$Html$Attributes$style, 'top', '0');
				} else {
					return A2($elm$html$Html$Attributes$style, 'bottom', '0');
				}
			}()
			]),
		_List_fromArray(
			[
				A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						A2($elm$html$Html$Attributes$style, 'padding', '4px'),
						A2($elm$html$Html$Attributes$style, 'display', 'flex')
					]),
				_List_fromArray(
					[
						$lamdera$program_test$Effect$Test$overlayButton$($lamdera$program_test$Effect$Test$PressedBackToOverview, 'Close Test'),
						A2(
						$elm$html$Html$div,
						_List_fromArray(
							[
								A2($elm$html$Html$Attributes$style, 'display', 'inline-block'),
								A2($elm$html$Html$Attributes$style, 'padding', '4px')
							]),
						_List_Nil),
						$lamdera$program_test$Effect$Test$overlayButton$($lamdera$program_test$Effect$Test$PressedToggleOverlayPosition, 'Move'),
						A2(
						$elm$html$Html$div,
						_List_fromArray(
							[
								A2($elm$html$Html$Attributes$style, 'display', 'inline-block'),
								A2($elm$html$Html$Attributes$style, 'padding', '4px')
							]),
						_List_Nil),
						testView_.showModel ? $lamdera$program_test$Effect$Test$overlayButton$($lamdera$program_test$Effect$Test$PressedHideModel, 'Hide model') : $lamdera$program_test$Effect$Test$overlayButton$($lamdera$program_test$Effect$Test$PressedShowModel, 'Show model'),
						A2(
						$elm$html$Html$div,
						_List_fromArray(
							[
								A2($elm$html$Html$Attributes$style, 'display', 'inline-block'),
								A2($elm$html$Html$Attributes$style, 'padding', '4px')
							]),
						_List_fromArray(
							[
								$elm$html$Html$text(testView_.testName)
							])),
						A2(
						$elm$html$Html$div,
						_List_fromArray(
							[
								A2($elm$html$Html$Attributes$style, 'display', 'inline-block'),
								A2($elm$html$Html$Attributes$style, 'padding', '4px'),
								A2($elm$html$Html$Attributes$style, 'margin-left', 'auto')
							]),
						_List_fromArray(
							[
								function () {
								var _v1 = $elm$core$Array$get$(0, testView_.steps);
								if (_v1.$ === 'Just') {
									var startEvent = _v1.a;
									var startText = function () {
										var _v2 = $elm$time$Time$toMonth$($elm$time$Time$utc, startEvent.time);
										switch (_v2.$) {
											case 'Jan':
												return 'Jan';
											case 'Feb':
												return 'Feb';
											case 'Mar':
												return 'Mar';
											case 'Apr':
												return 'Apr';
											case 'May':
												return 'May';
											case 'Jun':
												return 'Jun';
											case 'Jul':
												return 'Jul';
											case 'Aug':
												return 'Aug';
											case 'Sep':
												return 'Sep';
											case 'Oct':
												return 'Oct';
											case 'Nov':
												return 'Nov';
											default:
												return 'Dec';
										}
									}() + (' ' + ($elm$core$String$fromInt(
										$elm$time$Time$toDay$($elm$time$Time$utc, startEvent.time)) + (', ' + ($elm$core$String$fromInt(
										$elm$time$Time$toYear$($elm$time$Time$utc, startEvent.time)) + (' ' + ($elm$core$String$padLeft$(
										2,
										_Utils_chr('0'),
										$elm$core$String$fromInt(
											$elm$time$Time$toHour$($elm$time$Time$utc, startEvent.time))) + (':' + $elm$core$String$padLeft$(
										2,
										_Utils_chr('0'),
										$elm$core$String$fromInt(
											$elm$time$Time$toMinute$($elm$time$Time$utc, startEvent.time))))))))));
									var elapsed = $elm$time$Time$posixToMillis(currentStep.time) - $elm$time$Time$posixToMillis(startEvent.time);
									var hours = (elapsed / ((1000 * 60) * 60)) | 0;
									var elapsedMinusHours = elapsed - (((1000 * 60) * 60) * hours);
									var minutes = (elapsedMinusHours / (1000 * 60)) | 0;
									var elapsedMinusMinutes = elapsedMinusHours - ((1000 * 60) * minutes);
									var seconds = (elapsedMinusMinutes / 1000) | 0;
									var milliseconds = elapsedMinusMinutes - (1000 * seconds);
									return $elm$html$Html$text(
										startText + (' + ' + ($elm$core$String$fromInt(hours) + (':' + ($elm$core$String$padLeft$(
											2,
											_Utils_chr('0'),
											$elm$core$String$fromInt(minutes)) + (':' + ($elm$core$String$padLeft$(
											2,
											_Utils_chr('0'),
											$elm$core$String$fromInt(seconds)) + ('.' + $elm$core$String$padLeft$(
											4,
											_Utils_chr('0'),
											$elm$core$String$fromInt(milliseconds))))))))));
								} else {
									return $elm$html$Html$text('');
								}
							}()
							]))
					])),
				$lamdera$program_test$Effect$Test$timelineView$(windowWidth, testView_),
				$lamdera$program_test$Effect$Test$currentStepText$(currentStep, testView_),
				A2(
				$elm$html$Html$b,
				_List_fromArray(
					[
						A2($elm$html$Html$Attributes$style, 'color', $lamdera$program_test$Effect$Test$errorColor),
						A2($elm$html$Html$Attributes$style, 'padding', '4px'),
						A2($elm$html$Html$Attributes$style, 'white-space', 'pre-wrap')
					]),
				$elm$core$List$map$(
					function (a) {
						return $lamdera$program_test$Effect$Test$text(
							$lamdera$program_test$Effect$Test$testErrorToString(a));
					},
					currentStep.testErrors))
			]));
};
var $lamdera$program_test$Effect$Test$testOverlay = F3($lamdera$program_test$Effect$Test$testOverlay$);
var $lamdera$program_test$Effect$Test$testView$ = function (windowWidth, instructions, testView_) {
	var _v0 = $elm$core$Array$get$(testView_.stepIndex, testView_.steps);
	if (_v0.$ === 'Just') {
		var currentStep = _v0.a;
		var currentAndPreviousStep = $lamdera$program_test$Effect$Test$currentAndPreviousStepIndex(testView_);
		if (testView_.showModel) {
			var overlayHeight = 90 + ($elm$core$Array$length(testView_.timelines) * $lamdera$program_test$Effect$Test$timelineRowHeight);
			return _List_fromArray(
				[
					$lamdera$program_test$Effect$Test$testOverlay$(windowWidth, testView_, currentStep),
					A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							A2($elm$html$Html$Attributes$style, 'font-size', '14px'),
							A2(
							$elm$html$Html$Attributes$style,
							'padding',
							function () {
								var _v1 = testView_.overlayPosition;
								if (_v1.$ === 'Top') {
									return $lamdera$program_test$Effect$Test$px(overlayHeight) + ' 4px 4px 4px';
								} else {
									return '4px 4px ' + ($lamdera$program_test$Effect$Test$px(overlayHeight) + ' 4px');
								}
							}()),
							$lamdera$program_test$Effect$Test$darkBackground,
							$lamdera$program_test$Effect$Test$defaultFontColor,
							A2($elm$html$Html$Attributes$style, 'font-family', 'arial'),
							A2($elm$html$Html$Attributes$style, 'white-space', 'pre'),
							A2($elm$html$Html$Attributes$style, 'min-height', '100vh')
						]),
					_List_fromArray(
						[
							function () {
							var _v2 = _Utils_Tuple2(
								$elm$core$Maybe$andThen$(
									function (a) {
										return $elm$core$Array$get$(a, testView_.steps);
									},
									currentAndPreviousStep.currentStep),
								$elm$core$Maybe$andThen$(
									function (a) {
										return $elm$core$Array$get$(a, testView_.steps);
									},
									currentAndPreviousStep.previousStep));
							if (_v2.a.$ === 'Just') {
								if (_v2.b.$ === 'Just') {
									var currentStep2 = _v2.a.a;
									var previousStep = _v2.b.a;
									return A4($elm$html$Html$Lazy$lazy3, $lamdera$program_test$Effect$Test$modelDiffView, testView_.collapsedFields, currentStep2, previousStep);
								} else {
									var currentStep2 = _v2.a.a;
									var _v3 = _v2.b;
									return A3($elm$html$Html$Lazy$lazy2, $lamdera$program_test$Effect$Test$modelView, testView_.collapsedFields, currentStep2);
								}
							} else {
								return $lamdera$program_test$Effect$Test$centeredText('No model to show');
							}
						}()
						]))
				]);
		} else {
			return A2(
				$elm$core$List$cons,
				$lamdera$program_test$Effect$Test$testOverlay$(windowWidth, testView_, currentStep),
				_Utils_ap(
					function () {
						var _v4 = $lamdera$program_test$Effect$Test$currentTimeline(testView_);
						if (_v4.$ === 'FrontendTimeline') {
							var clientId = _v4.a;
							var _v5 = $elm$core$Maybe$andThen$(
								function (a) {
									return $elm$core$Array$get$(a, testView_.steps);
								},
								currentAndPreviousStep.currentStep);
							if (_v5.$ === 'Just') {
								var currentStep2 = _v5.a;
								var _v6 = $lamdera$containers$SeqDict$get$(clientId, currentStep2.frontends);
								if (_v6.$ === 'Just') {
									var frontend = _v6.a;
									var state = $lamdera$program_test$Effect$Test$getState(instructions);
									return $elm$core$List$map$(
										$elm$html$Html$map(
											function (_v7) {
												return $lamdera$program_test$Effect$Test$NoOp;
											}),
										state.frontendApp.view(frontend.model).body);
								} else {
									return _List_Nil;
								}
							} else {
								return _List_fromArray(
									[
										$lamdera$program_test$Effect$Test$centeredText('Frontend not connected')
									]);
							}
						} else {
							return _List_fromArray(
								[
									$lamdera$program_test$Effect$Test$centeredText('There is no view to display for the backend')
								]);
						}
					}(),
					function () {
						var _v8 = currentStep.eventType;
						if (_v8.$ === 'UserInputEvent') {
							var inputType = _v8.a.inputType;
							var drawCursorWithOffset = F2(
								function (htmlId, _v12) {
									var offsetX = _v12.a;
									var offsetY = _v12.b;
									var _v11 = testView_.buttonCursor;
									if (_v11.$ === 'Just') {
										var buttonCursor = _v11.a;
										return _Utils_eq(buttonCursor.htmlId, htmlId) ? _List_fromArray(
											[
												$lamdera$program_test$Effect$Test$drawCursor(
												_Utils_Tuple2(buttonCursor.x + offsetX, buttonCursor.y + offsetY))
											]) : _List_Nil;
									} else {
										return _List_Nil;
									}
								});
							switch (inputType.$) {
								case 'UserPointerDownEvent':
									var htmlId = inputType.a;
									var offset = inputType.b;
									return A2(drawCursorWithOffset, htmlId, offset);
								case 'UserClicksButton':
									var htmlId = inputType.a;
									var _v10 = testView_.buttonCursor;
									if (_v10.$ === 'Just') {
										var buttonCursor = _v10.a;
										return _Utils_eq(buttonCursor.htmlId, htmlId) ? _List_fromArray(
											[
												$lamdera$program_test$Effect$Test$drawCursor(
												_Utils_Tuple2(buttonCursor.x + (buttonCursor.width / 2), buttonCursor.y + (buttonCursor.height / 2)))
											]) : _List_Nil;
									} else {
										return _List_Nil;
									}
								case 'UserInputsText':
									return _List_Nil;
								case 'UserPressesKey':
									return _List_Nil;
								case 'UserClicksLink':
									return _List_Nil;
								case 'UserResizesWindow':
									return _List_Nil;
								case 'UserPointerUpEvent':
									var htmlId = inputType.a;
									var offset = inputType.b;
									return A2(drawCursorWithOffset, htmlId, offset);
								case 'UserPointerEnterEvent':
									var htmlId = inputType.a;
									var offset = inputType.b;
									return A2(drawCursorWithOffset, htmlId, offset);
								case 'UserPointerLeaveEvent':
									var htmlId = inputType.a;
									var offset = inputType.b;
									return A2(drawCursorWithOffset, htmlId, offset);
								case 'UserPointerOutEvent':
									var htmlId = inputType.a;
									var offset = inputType.b;
									return A2(drawCursorWithOffset, htmlId, offset);
								case 'UserPointerMoveEvent':
									var htmlId = inputType.a;
									var offset = inputType.b;
									return A2(drawCursorWithOffset, htmlId, offset);
								case 'UserPointerOverEvent':
									var htmlId = inputType.a;
									var offset = inputType.b;
									return A2(drawCursorWithOffset, htmlId, offset);
								case 'UserPointerCancelEvent':
									var htmlId = inputType.a;
									var offset = inputType.b;
									return A2(drawCursorWithOffset, htmlId, offset);
								case 'UserTouchCancelEvent':
									return _List_Nil;
								case 'UserTouchStartEvent':
									return _List_Nil;
								case 'UserTouchEndEvent':
									return _List_Nil;
								case 'UserTouchMoveEvent':
									return _List_Nil;
								case 'UserMouseEnterEvent':
									var htmlId = inputType.a;
									var offset = inputType.b;
									return A2(drawCursorWithOffset, htmlId, offset);
								case 'UserMouseLeaveEvent':
									var htmlId = inputType.a;
									var offset = inputType.b;
									return A2(drawCursorWithOffset, htmlId, offset);
								case 'UserMouseOutEvent':
									var htmlId = inputType.a;
									var offset = inputType.b;
									return A2(drawCursorWithOffset, htmlId, offset);
								case 'UserMouseMoveEvent':
									var htmlId = inputType.a;
									var offset = inputType.b;
									return A2(drawCursorWithOffset, htmlId, offset);
								case 'UserMouseOverEvent':
									var htmlId = inputType.a;
									var offset = inputType.b;
									return A2(drawCursorWithOffset, htmlId, offset);
								case 'UserMouseUpEvent':
									var htmlId = inputType.a;
									var offset = inputType.b;
									return A2(drawCursorWithOffset, htmlId, offset);
								case 'UserMouseDownEvent':
									var htmlId = inputType.a;
									var offset = inputType.b;
									return A2(drawCursorWithOffset, htmlId, offset);
								case 'UserFocusEvent':
									return _List_Nil;
								case 'UserBlurEvent':
									return _List_Nil;
								case 'UserWheelEvent':
									return _List_Nil;
								default:
									return _List_Nil;
							}
						} else {
							return _List_Nil;
						}
					}()));
		}
	} else {
		return _List_Nil;
	}
};
var $lamdera$program_test$Effect$Test$testView = F3($lamdera$program_test$Effect$Test$testView$);
var $lamdera$program_test$Effect$Test$view = function (_v0) {
	var model = _v0.a;
	return {
		body: function () {
			var _v1 = model.tests;
			if (_v1.$ === 'Just') {
				if (_v1.a.$ === 'Ok') {
					var tests = _v1.a.a;
					var _v2 = model.currentTest;
					if (_v2.$ === 'Just') {
						var testView_ = _v2.a;
						var _v3 = $lamdera$program_test$Effect$Test$getAt$(testView_.index, tests);
						if (_v3.$ === 'Just') {
							var instructions = _v3.a;
							return $lamdera$program_test$Effect$Test$testView$(model.windowSize.a, instructions, testView_);
						} else {
							return _List_fromArray(
								[
									$lamdera$program_test$Effect$Test$overviewContainer(
									_List_fromArray(
										[
											A2(
											$elm$html$Html$b,
											_List_fromArray(
												[
													A2($elm$html$Html$Attributes$style, 'color', $lamdera$program_test$Effect$Test$errorColor),
													A2($elm$html$Html$Attributes$style, 'padding', '4px')
												]),
											_List_fromArray(
												[
													$elm$html$Html$text('Invalid index for tests')
												]))
										]))
								]);
						}
					} else {
						return _List_fromArray(
							[
								$lamdera$program_test$Effect$Test$overview$(tests, model.testResults)
							]);
					}
				} else {
					var error = _v1.a.a;
					return _List_fromArray(
						[
							$lamdera$program_test$Effect$Test$overviewContainer(
							_List_fromArray(
								[
									A2(
									$elm$html$Html$b,
									_List_fromArray(
										[
											A2($elm$html$Html$Attributes$style, 'color', $lamdera$program_test$Effect$Test$errorColor),
											A2($elm$html$Html$Attributes$style, 'padding', '4px')
										]),
									_List_fromArray(
										[
											$elm$html$Html$text(
											$lamdera$program_test$Effect$Test$fileLoadErrorToString(error))
										]))
								]))
						]);
				}
			} else {
				return _List_fromArray(
					[
						$lamdera$program_test$Effect$Test$overviewContainer(
						_List_fromArray(
							[
								A2(
								$elm$html$Html$div,
								_List_fromArray(
									[$lamdera$program_test$Effect$Test$defaultFontColor]),
								_List_fromArray(
									[
										$lamdera$program_test$Effect$Test$text('Loading files for tests...')
									]))
							]))
					]);
			}
		}(),
		title: 'Test viewer'
	};
};
var $elm$core$Platform$Sub$batch = _Platform_batch;
var $elm$browser$Browser$Events$Document = {$: 'Document'};
var $elm$browser$Browser$Events$MySub$ = function (a, b, c) {
	return {$: 'MySub', a: a, b: b, c: c};
};
var $elm$browser$Browser$Events$MySub = F3($elm$browser$Browser$Events$MySub$);
var $elm$browser$Browser$Events$State$ = function (subs, pids) {
	return {pids: pids, subs: subs};
};
var $elm$browser$Browser$Events$State = F2($elm$browser$Browser$Events$State$);
var $elm$browser$Browser$Events$init = $elm$core$Task$succeed(
	$elm$browser$Browser$Events$State$(_List_Nil, $elm$core$Dict$empty));
var $elm$browser$Browser$Events$nodeToKey = function (node) {
	if (node.$ === 'Document') {
		return 'd_';
	} else {
		return 'w_';
	}
};
var $elm$browser$Browser$Events$addKey = function (sub) {
	var node = sub.a;
	var name = sub.b;
	return _Utils_Tuple2(
		_Utils_ap(
			$elm$browser$Browser$Events$nodeToKey(node),
			name),
		sub);
};
var $elm$core$Process$kill = _Scheduler_kill;
var $elm$core$Dict$merge$ = function (leftStep, bothStep, rightStep, leftDict, rightDict, initialResult) {
	var stepState = F3(
		function (rKey, rValue, _v0) {
			stepState:
			while (true) {
				var list = _v0.a;
				var result = _v0.b;
				if (!list.b) {
					return _Utils_Tuple2(
						list,
						A3(rightStep, rKey, rValue, result));
				} else {
					var _v2 = list.a;
					var lKey = _v2.a;
					var lValue = _v2.b;
					var rest = list.b;
					if (_Utils_cmp(lKey, rKey) < 0) {
						var $temp$_v0 = _Utils_Tuple2(
							rest,
							A3(leftStep, lKey, lValue, result));
						_v0 = $temp$_v0;
						continue stepState;
					} else {
						if (_Utils_cmp(lKey, rKey) > 0) {
							return _Utils_Tuple2(
								list,
								A3(rightStep, rKey, rValue, result));
						} else {
							return _Utils_Tuple2(
								rest,
								A4(bothStep, lKey, lValue, rValue, result));
						}
					}
				}
			}
		});
	var _v3 = $elm$core$Dict$foldl$(
		stepState,
		_Utils_Tuple2(
			$elm$core$Dict$toList(leftDict),
			initialResult),
		rightDict);
	var leftovers = _v3.a;
	var intermediateResult = _v3.b;
	return $elm$core$List$foldl$(
		F2(
			function (_v4, result) {
				var k = _v4.a;
				var v = _v4.b;
				return A3(leftStep, k, v, result);
			}),
		intermediateResult,
		leftovers);
};
var $elm$core$Dict$merge = F6($elm$core$Dict$merge$);
var $elm$browser$Browser$Events$Event$ = function (key, event) {
	return {event: event, key: key};
};
var $elm$browser$Browser$Events$Event = F2($elm$browser$Browser$Events$Event$);
var $elm$browser$Browser$Events$spawn$ = function (router, key, _v0) {
	var node = _v0.a;
	var name = _v0.b;
	var actualNode = function () {
		if (node.$ === 'Document') {
			return _Browser_doc;
		} else {
			return _Browser_window;
		}
	}();
	return $elm$core$Task$map$(
		function (value) {
			return _Utils_Tuple2(key, value);
		},
		A3(
			_Browser_on,
			actualNode,
			name,
			function (event) {
				return A2(
					$elm$core$Platform$sendToSelf,
					router,
					$elm$browser$Browser$Events$Event$(key, event));
			}));
};
var $elm$browser$Browser$Events$spawn = F3($elm$browser$Browser$Events$spawn$);
var $elm$browser$Browser$Events$onEffects$ = function (router, subs, state) {
	var stepRight = F3(
		function (key, sub, _v6) {
			var deads = _v6.a;
			var lives = _v6.b;
			var news = _v6.c;
			return _Utils_Tuple3(
				deads,
				lives,
				A2(
					$elm$core$List$cons,
					$elm$browser$Browser$Events$spawn$(router, key, sub),
					news));
		});
	var stepLeft = F3(
		function (_v4, pid, _v5) {
			var deads = _v5.a;
			var lives = _v5.b;
			var news = _v5.c;
			return _Utils_Tuple3(
				A2($elm$core$List$cons, pid, deads),
				lives,
				news);
		});
	var stepBoth = F4(
		function (key, pid, _v2, _v3) {
			var deads = _v3.a;
			var lives = _v3.b;
			var news = _v3.c;
			return _Utils_Tuple3(
				deads,
				$elm$core$Dict$insert$(key, pid, lives),
				news);
		});
	var newSubs = $elm$core$List$map$($elm$browser$Browser$Events$addKey, subs);
	var _v0 = $elm$core$Dict$merge$(
		stepLeft,
		stepBoth,
		stepRight,
		state.pids,
		$elm$core$Dict$fromList(newSubs),
		_Utils_Tuple3(_List_Nil, $elm$core$Dict$empty, _List_Nil));
	var deadPids = _v0.a;
	var livePids = _v0.b;
	var makeNewPids = _v0.c;
	return A2(
		$elm$core$Task$andThen,
		function (pids) {
			return $elm$core$Task$succeed(
				$elm$browser$Browser$Events$State$(
					newSubs,
					$elm$core$Dict$union$(
						livePids,
						$elm$core$Dict$fromList(pids))));
		},
		A2(
			$elm$core$Task$andThen,
			function (_v1) {
				return $elm$core$Task$sequence(makeNewPids);
			},
			$elm$core$Task$sequence(
				$elm$core$List$map$($elm$core$Process$kill, deadPids))));
};
var $elm$browser$Browser$Events$onEffects = F3($elm$browser$Browser$Events$onEffects$);
var $elm$browser$Browser$Events$onSelfMsg$ = function (router, _v0, state) {
	var event = _v0.event;
	var key = _v0.key;
	var toMessage = function (_v2) {
		var subKey = _v2.a;
		var _v3 = _v2.b;
		var node = _v3.a;
		var name = _v3.b;
		var decoder = _v3.c;
		return _Utils_eq(subKey, key) ? A2(_Browser_decodeEvent, decoder, event) : $elm$core$Maybe$Nothing;
	};
	var messages = $elm$core$List$filterMap$(toMessage, state.subs);
	return A2(
		$elm$core$Task$andThen,
		function (_v1) {
			return $elm$core$Task$succeed(state);
		},
		$elm$core$Task$sequence(
			$elm$core$List$map$(
				$elm$core$Platform$sendToApp(router),
				messages)));
};
var $elm$browser$Browser$Events$onSelfMsg = F3($elm$browser$Browser$Events$onSelfMsg$);
var $elm$browser$Browser$Events$subMap$ = function (func, _v0) {
	var node = _v0.a;
	var name = _v0.b;
	var decoder = _v0.c;
	return $elm$browser$Browser$Events$MySub$(
		node,
		name,
		A2($elm$json$Json$Decode$map, func, decoder));
};
var $elm$browser$Browser$Events$subMap = F2($elm$browser$Browser$Events$subMap$);
_Platform_effectManagers['Browser.Events'] = _Platform_createManager($elm$browser$Browser$Events$init, $elm$browser$Browser$Events$onEffects, $elm$browser$Browser$Events$onSelfMsg, 0, $elm$browser$Browser$Events$subMap);
var $elm$browser$Browser$Events$subscription = _Platform_leaf('Browser.Events');
var $elm$browser$Browser$Events$on$ = function (node, name, decoder) {
	return $elm$browser$Browser$Events$subscription(
		$elm$browser$Browser$Events$MySub$(node, name, decoder));
};
var $elm$browser$Browser$Events$on = F3($elm$browser$Browser$Events$on$);
var $elm$browser$Browser$Events$onKeyDown = A2($elm$browser$Browser$Events$on, $elm$browser$Browser$Events$Document, 'keydown');
var $elm$browser$Browser$Events$Window = {$: 'Window'};
var $elm$browser$Browser$Events$onResize = function (func) {
	return $elm$browser$Browser$Events$on$(
		$elm$browser$Browser$Events$Window,
		'resize',
		A2(
			$elm$json$Json$Decode$field,
			'target',
			A3(
				$elm$json$Json$Decode$map2,
				func,
				A2($elm$json$Json$Decode$field, 'innerWidth', $elm$json$Json$Decode$int),
				A2($elm$json$Json$Decode$field, 'innerHeight', $elm$json$Json$Decode$int))));
};
var $lamdera$program_test$Effect$Test$viewerSubscriptions = function (_v0) {
	return $elm$core$Platform$Sub$batch(
		_List_fromArray(
			[
				$elm$browser$Browser$Events$onKeyDown($lamdera$program_test$Effect$Test$decodeArrows),
				$elm$browser$Browser$Events$onResize($lamdera$program_test$Effect$Test$GotWindowSize)
			]));
};
var $lamdera$program_test$Effect$Test$viewer = function (tests) {
	return $elm$browser$Browser$application(
		{
			init: $lamdera$program_test$Effect$Test$init,
			onUrlChange: $lamdera$program_test$Effect$Test$UrlChanged,
			onUrlRequest: $lamdera$program_test$Effect$Test$UrlClicked,
			subscriptions: $lamdera$program_test$Effect$Test$viewerSubscriptions,
			update: $lamdera$program_test$Effect$Test$update(
				{
					cmds: $elm$core$Task$succeed(tests)
				}),
			view: $lamdera$program_test$Effect$Test$view
		});
};
var $author$project$TestViewer$main = $lamdera$program_test$Effect$Test$viewer($author$project$TestViewer$allTests);
_Platform_export({'TestViewer':{'init':$author$project$TestViewer$main(
	$elm$json$Json$Decode$succeed(_Utils_Tuple0))(0)}});function _Debug_toAnsiString(ansi, value)
{
  if (typeof value === 'function')
  {
    return _Debug_internalColor(ansi, '<function>');
  }

  if (typeof value === 'boolean')
  {
    return _Debug_ctorColor(ansi, value ? 'True' : 'False');
  }

  if (typeof value === 'number')
  {
    return _Debug_numberColor(ansi, value + '');
  }

  if (value instanceof String)
  {
    return _Debug_charColor(ansi, "'" + _Debug_addSlashes(value, true) + "'");
  }

  if (typeof value === 'string')
  {
    return _Debug_stringColor(ansi, '"' + _Debug_addSlashes(value, false) + '"');
  }

  if (typeof value === 'object' && '$' in value)
  {
    var tag = value.$;

    if (typeof tag === 'number')
    {
      return _Debug_internalColor(ansi, '<internals>');
    }

    if (tag[0] === '#')
    {
      var output = [];
      for (var k in value)
      {
        if (k === '$') continue;
        output.push(_Debug_toAnsiString(ansi, value[k]));
      }
      return '(' + output.join(',') + ')';
    }

    if (tag === 'Set_elm_builtin')
    {
      return _Debug_ctorColor(ansi, 'Set')
        + _Debug_fadeColor(ansi, '.fromList') + ' '
        + _Debug_toAnsiString(ansi, $elm$core$Set$toList(value));
    }

    if (tag === 'RBNode_elm_builtin' || tag === 'RBEmpty_elm_builtin')
    {
      return _Debug_ctorColor(ansi, 'Dict')
        + _Debug_fadeColor(ansi, '.fromList') + ' '
        + _Debug_toAnsiString(ansi, $elm$core$Dict$toList(value));
    }

    if (tag === 'SeqSet_elm_builtin')
    {
      return _Debug_ctorColor(ansi, 'SeqSet')
        + _Debug_fadeColor(ansi, '.fromList') + ' '
        + _Debug_toAnsiString(ansi, $lamdera$containers$SeqSet$toList(value));
    }

    if (tag === 'SeqDict_elm_builtin')
    {
      return _Debug_ctorColor(ansi, 'SeqDict')
        + _Debug_fadeColor(ansi, '.fromList') + ' '
        + _Debug_toAnsiString(ansi, $lamdera$containers$SeqDict$toList(value));
    }

    if (tag === 'Array_elm_builtin')
    {
      return _Debug_ctorColor(ansi, 'Array')
        + _Debug_fadeColor(ansi, '.fromList') + ' '
        + _Debug_toAnsiString(ansi, $elm$core$Array$toList(value));
    }

    if (tag === '::' || tag === '[]')
    {
      var output = '[';

      value.b && (output += _Debug_toAnsiString(ansi, value.a), value = value.b)

      for (; value.b; value = value.b) // WHILE_CONS
      {
        output += ',' + _Debug_toAnsiString(ansi, value.a);
      }
      return output + ']';
    }

    var output = '';
    for (var i in value)
    {
      if (i === '$') continue;
      var str = _Debug_toAnsiString(ansi, value[i]);
      var c0 = str[0];
      var parenless = c0 === '{' || c0 === '(' || c0 === '[' || c0 === '<' || c0 === '"' || str.indexOf(' ') < 0;
      output += ' ' + (parenless ? str : '(' + str + ')');
    }
    return _Debug_ctorColor(ansi, tag) + output;
  }

  if (typeof DataView === 'function' && value instanceof DataView)
  {
    return _Debug_stringColor(ansi, '<' + value.byteLength + ' bytes>');
  }

  if (typeof File !== 'undefined' && value instanceof File)
  {
    return _Debug_internalColor(ansi, '<' + value.name + '>');
  }

  if (typeof value === 'object')
  {
    var output = [];
    for (var key in value)
    {
      var field = key[0] === '_' ? key.slice(1) : key;
      output.push(_Debug_fadeColor(ansi, field) + ' = ' + _Debug_toAnsiString(ansi, value[key]));
    }
    if (output.length === 0)
    {
      return '{}';
    }
    return '{ ' + output.join(', ') + ' }';
  }

  return _Debug_internalColor(ansi, '<internals>');
}

function _Debug_addSlashes(str, isChar)
{
  var s = str
    .replace(/\\/g, '\\\\')
    .replace(/\n/g, '\\n')
    .replace(/\t/g, '\\t')
    .replace(/\r/g, '\\r')
    .replace(/\v/g, '\\v')
    .replace(/\0/g, '\\0');

  if (isChar)
  {
    return s.replace(/\'/g, '\\\'');
  }
  else
  {
    return s.replace(/\"/g, '\\"');
  }
}

function _Utils_eqHelp(x, y, depth, stack)
{
  if (x === y)
  {
    return true;
  }

  if (typeof x !== 'object' || x === null || y === null)
  {
    typeof x === 'function' && $elm$core$Debug$crash(5);
    return false;
  }

  if (depth > 100)
  {
    stack.push(_Utils_Tuple2(x,y));
    return true;
  }

  if (x.$ === 'Set_elm_builtin')
{
  x = $elm$core$Set$toList(x);
  y = $elm$core$Set$toList(y);
}
if (x.$ === 'RBNode_elm_builtin' || x.$ === 'RBEmpty_elm_builtin')
{
  x = $elm$core$Dict$toList(x);
  y = $elm$core$Dict$toList(y);
}
if (x.$ === 'SeqDict_elm_builtin')
{
  x = $lamdera$containers$SeqDict$toList(x);
  y = $lamdera$containers$SeqDict$toList(y);
}
if (x.$ === 'SeqSet_elm_builtin')
{
  x = $lamdera$containers$SeqSet$toList(x);
  y = $lamdera$containers$SeqSet$toList(y);
}

  for (var key in x)
  {
    if (!_Utils_eqHelp(x[key], y[key], depth + 1, stack))
    {
      return false;
    }
  }
  return true;
}

function _Platform_initialize(flagDecoder, args, init, update, subscriptions, stepperBuilder)
  {
    var result = A2(_Json_run, flagDecoder, _Json_wrap(args ? args['flags'] : undefined));

    // @TODO need to figure out how to get this to automatically escape by mode?
    //$elm$core$Result$isOk(result) || _Debug_crash(2 /**/, _Json_errorToString(result.a) /**/);
    $elm$core$Result$isOk(result) || _Debug_crash(2 /**_UNUSED/, _Json_errorToString(result.a) /**/);

    var managers = {};
    var initPair = init(result.a);
    var model = (args && args['model']) || initPair.a;

    var stepper = stepperBuilder(sendToApp, model);
    var ports = _Platform_setupEffects(managers, sendToApp);

    var upgradeMode = false;

    var errorHandler = args && args['errorHandler'];

    function sendToApp(msg, viewMetadata)
    {
      if (upgradeMode) {
        // No more messages should run in upgrade mode
        _Platform_enqueueEffects(managers, $elm$core$Platform$Cmd$none, $elm$core$Platform$Sub$none);
        return;
      }

      try {
        var pair = A2(update, msg, model);
        stepper(model = pair.a, viewMetadata);
        _Platform_enqueueEffects(managers, pair.b, subscriptions(model));
      } catch (e) {
        if (errorHandler !== undefined) { errorHandler(e) } else { throw e }
      }
    }

    if ((args && args['model']) === undefined) {
      _Platform_enqueueEffects(managers, initPair.b, subscriptions(model));
    }

    const die = function() {
      // Stop all subscriptions.
      // This must be done before clearing the stuff below.
      _Platform_enqueueEffects(managers, _Platform_batch(_List_Nil), _Platform_batch(_List_Nil));

      managers = null;
      model = null;
      stepper = null;
      ports = null;
      _Platform_effectsQueue = [];
    }

    return ports ? {
      ports: ports,
      gm: function() { return model },
      eum: function() { upgradeMode = true },
      die: die,
      fns: {}
    } : {};
  }}(this));
const pkgExports = {
'console-logger.js': function(exports){
/* elm-pkg-js
import Json.Encode
port console_logger_to_js : Json.Encode.Value -> Cmd msg
port console_logger_from_js : (Json.Encode.Value -> msg) -> Sub msg
*/

exports.init = async function (app) {
    // Subscribe to messages from Elm
    if (app.ports.console_logger_to_js) {
        app.ports.console_logger_to_js.subscribe(function(message) {
            // Log the message to the console
            console.log("[Elm Console Logger]:", message);
            
            // Send a confirmation back to Elm
            if (app.ports.console_logger_from_js) {
                app.ports.console_logger_from_js.send("Logged: " + message);
            }
        });
    }
}
return exports;},
'clipboard.js': function(exports){
/* elm-pkg-js
import Json.Encode
port clipboard_to_js : Json.Encode.Value -> Cmd msg
port clipboard_from_js : (Json.Encode.Value -> msg) -> Sub msg
*/

exports.init = async function (app) {
    // Subscribe to copy-to-clipboard requests from Elm
    if (app.ports.clipboard_to_js) {
        app.ports.clipboard_to_js.subscribe(async function(text) {
            try {
                // Use the modern Clipboard API
                await navigator.clipboard.writeText(text);
                
                // Send success message back to Elm
                if (app.ports.clipboard_from_js) {
                    app.ports.clipboard_from_js.send("Copied to clipboard!");
                }
            } catch (err) {
                console.error('Failed to copy to clipboard:', err);
                
                // Send error message back to Elm
                if (app.ports.clipboard_from_js) {
                    app.ports.clipboard_from_js.send("Failed to copy: " + err.message);
                }
            }
        });
    }
}
return exports;},

}
if (typeof window !== 'undefined') {  window.elmPkgJsIncludes = {    init: async function(app) {      for (var pkgId in pkgExports) {        if (pkgExports.hasOwnProperty(pkgId)) {          pkgExports[pkgId]({}).init(app)        }      }    }  }}
