/*
 * Given a string we return it without the prefix supplied trimmed
*/

function ignoreStringPrefix(str, prefix) {
  return str.startsWith(prefix) ? str.split(prefix)[1].trim() : str;
}

export { ignoreStringPrefix };
