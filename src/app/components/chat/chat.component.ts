import { Component, HostBinding, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SEND_CHAT_PROTOCOL } from 'src/app/constants/protocols';
import { AppSocketService } from 'src/app/service/app-socket.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit, OnDestroy {
  @HostBinding('class') class = 'app-chat-component';
  chatHistory: string = '';
  namespace: string = '/chat';
  chatFormGroup: FormGroup;
  constructor(private fb: FormBuilder, private socketService: AppSocketService) {
    this.chatFormGroup = this.fb.group({
      chatinput: this.fb.control('', [Validators.required, Validators.minLength(1)]),
    });
    this.socketService.createClient(this.namespace);
  }

  ngOnInit(): void {
    this.socketService.registerClientCallback(this.namespace, SEND_CHAT_PROTOCOL, this.handleChatRecieved.bind(this));
  }

  handleChatRecieved(message: string) {
    this.chatHistory += message + '\n';
    console.log(this.chatHistory);
    console.log(`Recieved message from server: ${message}`);
  }

  sendChatMessage() {
    const message = this.chatFormGroup.get('chatinput')?.value.trim();
    this.chatFormGroup.reset();
    this.socketService.sendToServer(this.namespace, SEND_CHAT_PROTOCOL, message || '');
  }

  ngOnDestroy(): void {
    this.socketService.closeConnection(this.namespace);
  }
}
