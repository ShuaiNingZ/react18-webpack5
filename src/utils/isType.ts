export const isType = (() => {
    const toString = Object.prototype.toString;
    return (val: unknown, type: string): boolean => {
        return toString.call(val) === `[object ${type}]`;
    };
})();

export const isString = (val: unknown): val is string => {
    return isType(val, 'String');
};

export const isNumber = (val: unknown): val is number => {
    return isType(val, 'Number');
};

export const isBoolean = (val: unknown): val is boolean => {
    return isType(val, 'Boolean');
};

export const isUndefined = (val: unknown): val is undefined => {
    return isType(val, 'Undefined');
};

export const isNull = (val: unknown): val is null => {
    return isType(val, 'Null');
};

export const isArray = (val: unknown): val is Array<unknown> => {
    return isType(val, 'Array');
};

export const isObject = (val: unknown): val is Object => {
    return isType(val, 'Object');
};

export const isFunction = (val: unknown): val is Function => {
    return isType(val, 'Function');
};

export const isDate = (val: unknown): val is Date => {
    return isType(val, 'Date');
};

export const isRegExp = (val: unknown): val is RegExp => {
    return isType(val, 'RegExp');
};

export const isMap = (val: unknown): val is Map<unknown, unknown> => {
    return isType(val, 'Map');
};

export const isSet = (val: unknown): val is Set<unknown> => {
    return isType(val, 'Set');
};

export const isPromise = (val: unknown): val is Promise<Function> => {
    return isType(val, 'Promise');
};

export function isEmpty<T = unknown>(val: T): boolean {
    if (isArray(val) || isString(val)) {
        return val.length === 0;
    }
    if (isMap(val) || isSet(val)) {
        return val.size === 0;
    }
    if (isObject(val)) {
        return Object.keys(val).length === 0;
    }
    return false;
}

// 对象的 val 值不存在 !!(val || val === '')

export const URLReg =
    /(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&amp;:/~\+#]*[\w\-\@?^=%&amp;/~\+#])?/;

export function isUrl(val: any) {
    return isString(val) && URLReg.test(val);
}
