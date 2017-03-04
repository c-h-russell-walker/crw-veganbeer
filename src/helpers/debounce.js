/* Returns a function, that, as long as it continues to be invoked, will not
 * be triggered. The function will be called after it stops being called for
 * N milliseconds (defaults to 500). If `immediate` is passed, trigger the function
 * on the leading edge, instead of the trailing.
*/

// Taken and altered from here: https://davidwalsh.name/function-debounce

function debounce(func, wait=500, immediate=false) {
  var timeout;
  return () => {
    var context = this, args = arguments;
    var later = () => {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
};

export { debounce };