import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import firebase from 'firebase';
/**
 * Generated class for the MesajPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-mesaj',
  templateUrl: 'mesaj.html',
})
export class MesajPage {
  userID:any;
  newmessage:any;
   public userProfile: any = null;
  constructor(public navCtrl: NavController, public navParams: NavParams,private storage:Storage) {
this.userID=navParams.get('id');
this.storage.get('user').then( (val)=>{this.userProfile=val});

  }

send(){
  var ref:any;
  this.storage.get('user').then( (val)=>{
ref=firebase.database().ref('user/'+val.uid+'/conversations/'+this.userID+'/messages/');
ref.push({
sender_id:val.uid,
  message:this.newmessage

});

  });

}
  ionViewDidLoad() {
    console.log('ionViewDidLoad MesajPage');
  }

}
