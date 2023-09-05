let sums = {};

for (let item of data) {
  const key = `${item.price}-${item.option}`;
  
  if (sums[key]) {
    sums[key].quantity += item.quantity;
  } else {
    sums[key] = { price: item.price, quantity: item.quantity, option: item.option };
  }
}

let result = Object.values(sums);

console.log(result);

