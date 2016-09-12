var total = {
  valueInternal: 0,
  valueListener: function(val) {},
  set value(val) {
    this.valueInternal = val;
    this.valueListener(val);
  },
  get value() {
    return this.valueInternal;
  },
  registerListener: function(listener) {
    this.valueListener = listener;
  }
}

function count() {
  total.value++;
}