import { Injectable } from "@angular/core";
import { io, Socket } from "socket.io-client"
import { environment } from "src/environments/environment";
import {ServerToClientEvents, ClientToServerEvents} from "../models/socket";
import { ClientProtocol, ServerProtocol } from "../constants/protocols";

@Injectable({
    providedIn: 'root'
})
export class AppSocketService {
    socketMap: Map<string, Socket<ServerToClientEvents, ClientToServerEvents>>;
    url_prefix: string;
    socket_url_prefix: string;
    socket?: Socket<ServerToClientEvents, ClientToServerEvents>;
    constructor () {
        this.socketMap = new Map();
        if(environment.production){
            this.url_prefix = '';
            this.socket_url_prefix = 'wss://yoink-or-share.herokuapp.com:3000';
        }else{
            this.url_prefix = 'http://localhost:8080';
            this.socket_url_prefix = 'http://localhost:3000';
        }
    }

    createClient(namespace: string){
        if(this.socketMap.get(namespace)){
            throw Error("Socket with the url has already been established")
        }
        this.socketMap.set(namespace, io(this.socket_url_prefix + namespace)) 
    }

    closeConnection(namespace: string){
        this.socketMap.get(namespace)?.close()
        this.socketMap.delete(namespace)
    }

    sendToServer(namespace: string, protocol: ServerProtocol,  ...payload: any) {
        this.socketMap.get(namespace)?.emit(protocol, ...payload);
    }

    registerClientCallback(namespace: string, protocol: ClientProtocol, callback: (...args: any[]) => any) {
        this.socketMap.get(namespace)?.on(protocol, callback);
    }
}