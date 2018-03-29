import { Component, ViewChild } from '@angular/core';
import { AlertController } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';
//import { LoginPage } from '../login/login';
//import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';

//@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
    @ViewChild('chat') chat: any;
    chatMessage: string = '';
    message: any = [];

  constructor(public dataService: DataProvider, alertCtrl: AlertController ) {
    this.dataService.getDocuments().then((data) => {
      this.message = data;
      this.chat.scrollTo(0,9999,0);
    });
  }

  sendMessage(): void {
      let message = {
          '_id': new Date().toJSON(),
          'fbid': this.dataService.fbid,
          'username': this.dataService.username,
          'picture': this.dataService.picture,
          'messgae': this.chatMessage
      };

      this.message.push(message);
      this.chatMessage = '';
  }


}
