import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { AuthService } from '@app/core/auth.service';
import { ItemfireService } from '@app/services/itemfire.service';

@Component({
  selector: 'app-member-area',
  templateUrl: './member-area.component.html',
  styleUrls: ['./member-area.component.css']
})
export class MemberAreaComponent implements OnInit, AfterViewInit {

  @ViewChild("messagesDiv") messagesView: ElementRef;

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
    this.itemService.getItemsOrderedBy('chat_messages', 'creationDate').subscribe(messages => {
      this.messages = messages;
      this.showConversation();
      this.showRecent();
    });
  }

  ngAfterViewInit() {
    var objDiv = this.messagesView.nativeElement;
    objDiv.scrollTop = objDiv.scrollHeight;
 }

  chooseMember(member) {
    this.selectedMember = member;
    this.showConversation();
  }

  showConversation() {
    this.conversationMessages = this.messages.filter(message => {
      var participants: string[] = message.participants;
      var currentParticipants = [this.currentUser.uid, this.selectedMember.uid]
      return currentParticipants.every(v => participants.includes(v))
    })
  }

  sendMessage() {
    let messageText = this.currentMessage;
    this.currentMessage = '';

    const message = {
      content: messageText,
      author: this.currentUser.uid,
      participants: [this.selectedMember.uid, this.currentUser.uid],
      creationDate: Date.now()
    };
    
    this.itemService.addItem(message, 'chat_messages')
    .catch(error => this.currentMessage = messageText);
  }

  getMemberPicture(messageAuthor) {
    return this.members.filter(m => m.uid == messageAuthor).map(m => m.photoURL);
  }

  getMemberName(messageAuthor) {
    return this.members.filter(m => m.uid == messageAuthor).map(m => m.displayName);
  }

  showRecent() {
    let recentConversations = [];

    for (let i=this.messages.length - 1; i != 0; i--) {
      const participants = this.messages[i].participants;
      console.log(this.searchForArray(participants, recentConversations))
      if (this.searchForArray(participants, recentConversations) == -1) {
        recentConversations.push(participants);
      }
    }
    console.log({recentConversations})
  }

  arrayCointains(arr1, arr2) {
    // let res = arr1.some(v=> {
    //   console.log({v})
    //   console.log({arr2})
    //   arr2.indexOf(v) !== -1
    // })
      console.log({arr2})
    console.log(this.searchForArray(arr2, arr1))
      return true;
  }

  searchForArray(haystack, needle){
    var i, j, current;
    for(i = 0; i < haystack.length; ++i){
      if(needle.length === haystack[i].length){
        current = haystack[i];
        for(j = 0; j < needle.length && needle[j] === current[j]; ++j);
        if(j === needle.length)
          return i;
      }
    }
    return -1;
  }

}

