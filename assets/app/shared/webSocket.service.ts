import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { SocketIo } from 'ng-io';
import { Injectable } from '@angular/core'
import 'rxjs/add/operator/map'; 


@Injectable()
export class WebSocketService {
    lastRecipeName = new Subject<string>();
    lastRecipe:string;
    constructor(private socket: SocketIo) { }

    sendMessage(msg: string) {
        this.socket.emit("message", msg);
    }
    getMessage() {
        return this.socket
            .fromEvent<any>("message")
            .map((data) =>{
                this.lastRecipeName.next(data.msg);
                this.lastRecipe = data.msg;
                return data.msg;
            });
    }
}
