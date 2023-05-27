var socket = io();

var messages = document.getElementById('messages');
var form = document.getElementById('form');
var input = document.getElementById('input');

form.addEventListener('submit', function (e) {
  e.preventDefault();
  if (input.value) {
    socket.emit('chat message', input.value);
    input.value = '';
  }
});

socket.on('chat message', function (msg) {
  var item = document.createElement('li');
  item.textContent = msg;
  messages.appendChild(item);
  window.scrollTo(0, document.body.scrollHeight);
});

socket.on('intial', function (order) {
  const items = order.items;

  items.forEach((item) => {
    console.log(item.name);
    var liEl = document.createElement('li');
    liEl.textContent = `${item.name}`;
    messages.appendChild(liEl);
  });
});

// function joinTable() {
//   const tableId = document.getElementById('table-id').value;
//   socket.emit('joinTable', tableId);
// }

// function addItem() {
//   const itemName = document.getElementById('item-name').value;
//   const tableId = document.getElementById('table-id').value;
//   socket.emit('updateOrder', tableId, { name: itemName, quantity: 1 });
// }

// socket.on('orderData', (cart) => {
//   const orderDiv = document.getElementById('order');
// orderDiv.innerHTML = '';
// const items = order[0].items;

// console.log(cart);
// cart.forEach((item) => {
//   const itemDiv = document.createElement('div');
//   itemDiv.textContent = `${item.name}: ${item.quantity}`;
//   orderDiv.appendChild(itemDiv);
// });
// });
