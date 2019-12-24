import { Component, OnInit } from '@angular/core';
import { AuthService } from '@app/core/auth.service';
import { ItemfireService } from '@app/services/itemfire.service';

@Component({
  selector: 'app-member-area',
  templateUrl: './member-area.component.html',
  styleUrls: ['./member-area.component.css']
})
export class MemberAreaComponent implements OnInit {

  members;
  selectedMember:any = {};

  messages;
  conversationMessages;

  currentMessage;
  currentUser;

  constructor(
    public authService: AuthService,
    private itemService: ItemfireService,
    ) { }

  ngOnInit() {
    this.authService.user$.subscribe(user => this.currentUser = user);
    this.itemService.getItems('users').subscribe(users => this.members = users);
    this.itemService.getItemsOrderedBy('chat_messages', 'creationDate').subscribe(messages => this.messages = messages);
  }

  chooseMember(member) {
    this.selectedMember = member;
    this.conversationMessages = this.messages.filter(message => {
      var participants: string[] = message.participants;
      return participants.includes(this.selectedMember.uid)
    })
  }

  sendMessage() {
    const message = {
      content: this.currentMessage,
      author: this.currentUser.uid,
      participants: [this.selectedMember.uid, this.currentUser.uid],
      creationDate: Date.now()
    };
    
    this.itemService.addItem(message, 'chat_messages');
  }

  getMemberPicture(messageAuthor) {
    return this.members.filter(m => m.uid == messageAuthor).map(m => m.photoURL);
  }

}

