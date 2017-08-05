
function preventDefault(target, key, descriptor) {
    var fn = descriptor.value;
    descriptor.value = function (ev, ...args) {
        ev.preventDefault();
        return fn.call(this, ev, ...args);
    };
    return descriptor;
}

function requireLocalStorage(target, key, descriptor) {
    if (!self.localStorage) {
        console.warn('Don\'t want to hit their API at will.');
        // TODO - messaging/functionality for browsers without storage support
        descriptor.value = () => {};
    }
    return descriptor;
}

export { preventDefault, requireLocalStorage };
