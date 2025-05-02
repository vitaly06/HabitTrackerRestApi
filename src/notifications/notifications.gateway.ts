import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway()
export class NotificationsGateway {
  @WebSocketServer()
  server: Server;

  sendReminder(userId: number, habitId: number, message: string) {
    this.server.emit('reminder', { userId, habitId, message });
  }
}
