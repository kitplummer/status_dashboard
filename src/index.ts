import { init, Ditto, Document } from '@dittolive/ditto'
import { Express } from 'express'
import path from "path";

import { Server } from 'socket.io'
let ditto
let subscription
let liveQuery
let status: Document[] = []

import express from "express";
import http from "http";

// Socket Stuffs
// interface ServerToClientEvents {
//   noArg: () => void;
//   basicEmit: (a: number, b: string, c: Buffer) => void;
//   withAck: (d: string, callback: (e: number) => void) => void;
// }

// interface ClientToServerEvents {
//   hello: () => void;
// }

// interface InterServerEvents {
//   ping: () => void;
// }

// interface SocketData {
//   name: string;
//   age: number;
// }

const app:Express = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static('public'));
app.set("views", path.join(__dirname, "views" ));
app.set("view engine", "ejs");
app.get('/', (req, res) => {
  res.render( "index" );
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});

io.on('connection', (socket) => {
  console.log('connected');
});

async function main() {
	await init()

  ditto = new Ditto({ type: 'onlinePlayground', appID: '09fcd60d-69d2-414d-bc66-9c2475077258', token: '5b634c16-fdcc-41af-8b9a-894fbbbe61fe'})
  ditto.startSync()


  subscription = ditto.store.collection("status").findAll().subscribe()
  liveQuery = ditto.store.collection("status").findAll().observeLocal((docs, event) => {
    status = docs
    io.on('connection', (socket) => {
      console.log('emit status ', status.map((state) => state.value)[0]);
      io.emit("status", status.map((state) => state.value)[0] )
    });
    io.emit("status", status.map((state) => state.value)[0]  )
  })


  // ditto.store.collection("status").upsert({
  //   _id: 99,
  //   tail_number: "99",
  //   status: 0
  // })
}

main()

