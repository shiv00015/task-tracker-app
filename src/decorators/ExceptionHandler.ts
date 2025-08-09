export function ExceptionHandler() {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const originalMethod = descriptor.value;

    descriptor.value = function (...args: any[]) {
      const [req, res, next] = args;

      // Wrap the method execution in a try/catch
      try {
        const result = originalMethod.apply(this, args);

        // If it's a Promise (async method), catch any async errors
        if (result instanceof Promise) {
          result.catch((err) => next(err)); // pass to Express error handler
        }

        return result;
      } catch (err) {
        next(err); // sync error
      }
    };
  };
}
