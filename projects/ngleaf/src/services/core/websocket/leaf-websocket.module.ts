import { NgModule } from "@angular/core";
import { LeafWebSocketService } from "./leaf-websocket.service";

@NgModule({
  providers: [
    LeafWebSocketService,
  ],
})
export class LeafWebSocketModule {}
