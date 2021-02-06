/*
 * Unary plus operator triggers the valueOf method of the Date object
 * This lives here as a helper in case we ever want to change how it operates.
 * Also it will be more readbale when used in other files
 */

function currentTimestamp() {
  return +new Date();
}

export { currentTimestamp };
