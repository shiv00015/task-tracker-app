export function Log() {
    return function (
        target: any,
        propertyKey: string,
        descriptor: PropertyDescriptor
    ) {
        const original = descriptor.value;
        descriptor.value = function (...args: any[]) {
            const [req] = args;
            console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
            return original.apply(this, args);
        };
    };
}