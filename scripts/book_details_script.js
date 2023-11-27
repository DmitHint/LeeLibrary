const urlParams = new URLSearchParams(window.location.search);

const param1 = urlParams.get('id');

console.log('Parameter 1:', param1);