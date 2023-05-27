const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const mongoose = require('mongoose');
const { Order, Table } = require('./models');
const { sendFile } = require('express/lib/response');
const path = require('path');
const { disconnect } = require('process');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

mongoose
  .connect('mongodb+srv://First:tester123@hva.9zshyav.mongodb.net', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connectedto db!'));

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile('/index.html');
});

io.on('connection', async (socket) => {
  const order = await Order.findOne({ table: 1234 });

  io.to(socket.id).emit('intial', order);

  socket.on('chat message', async (msg) => {
    const order = await Order.findOne({ table: 1234 });
    order.items.push({ name: msg, quantity: 1 });
    order.save();
    io.emit('chat message', msg);
  });
});

// const cart = [];

// io.on('connection', (socket) => {
//   console.log(`user ${socket.id} connected`);
//   socket.on('joinTable', async (tableId) => {
//     socket.join(tableId);
//     console.log(`${socket.id} joined table: ${tableId}`);

// socket.emit('orderData', { name: 'appel', quantity: 1 });
// try {
//   const order = await Order.find({ table: tableId });
//   socket.emit('orderData', order);
// } catch (err) {
//   console.log(err);
// }
// });

// socket.on('updateOrder', async (tableId, orderData) => {
// cart.push(orderData);
// console.log(cart);
// socket.emit('orderData', orderData);
// try {
//   const order = await Order.findOne({ table: tableId });
//   // socket.emit('orderData', order);
//   console.log(order.items, orderData);
//   order.items.push(orderData);
//   order.save();
// } catch (err) {
//   console.log(err);
// }
// const table = await Table.findById(tableId);
// const order = await Order.findById(table.active_order);
// Validate and update order data here
// await order.save();
// io.to(tableId).emit('orderData', order);
// });

//   socket.on('disconnect', () => {
//     console.log(`user ${socket.id} disconnected`);
//   });
// });

server.listen(2333, () => {
  console.log('Server is running on port 3000');
});
