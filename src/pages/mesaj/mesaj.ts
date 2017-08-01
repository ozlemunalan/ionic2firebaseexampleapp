import { Component } from '@angular/core';
import { NavController, NavParams,App } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import firebase from 'firebase';
import { LoginPage} from '../login/login';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
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
  username:any;
  newmessage:any=null;
  messages:Array<{mesaj: string}>;
   public userProfile: any = null;
  constructor(public navCtrl: NavController, public navParams: NavParams,private storage:Storage,private app:App) {
this.userID=navParams.get('id');
this.username=navParams.get('uname');
this.storage.get('user').then( (val)=>{this.userProfile=val});
   this.messages=[];

  }

  doRefresh(refresher) {
   console.log('Begin async operation',this.getMessages());


   setTimeout(() => {
     console.log('Async operation has ended');
     refresher.complete();
   }, 2000);
 }
getMessages(){
this.messages=[];
  firebase.database().ref('user/'+this.userID+'/conversations/'+firebase.auth().currentUser.uid+'/messages/').once('value').then( (snapshot) =>{
    snapshot.forEach ((child)=>{
      let mesaj={mesaj:child.child("message").val()};
        this.messages.push(mesaj);
    })

  }).catch ( (error) =>{

    let nav=this.app.getRootNav();
    nav.setRoot(LoginPage);
  } );;
}
send(){
  if(this.newmessage!==null)
  {


  var ref:any;
  this.storage.get('user').then( (val)=>{
ref=firebase.database().ref('user/'+val.uid+'/conversations/'+this.userID+'/messages/');
ref.push({
sender_id:val.uid,
  message:this.newmessage

});
this.newmessage="";
  });
  }
}
  ionViewDidLoad() {
    console.log('ionViewDidLoad MesajPage');
    this.getMessages();
  }

}
