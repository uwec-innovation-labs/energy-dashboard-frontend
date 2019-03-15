function bySolarHigh(a, b) {
    if (a.value > b.value) {
      return -1;
    } else if (b.value > a.value) {
      return 1;
    }
    return 0;
  }
  
  function bySolarLow(a, b) {
    if (a.value > b.value) {
      return 1;
    } else if (b.value > a.value) {
      return -1;
    }
    return 0;
  }

  module.exports = {
    "bySolarHigh": bySolarHigh,
    "bySolarLow": bySolarLow
  }