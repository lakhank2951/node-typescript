import { Server } from "./server";

let server = new Server().app;

let PORT: number = 5000;

server.listen(PORT, () => {
    console.log(`Serving Running On Port ${PORT}`)
})