import { Component } from '@angular/core';
import { NavController, NavParams,AlertController,ToastController,App } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import firebase from 'firebase';
import {HelloIonicPage} from '../hello-ionic/hello-ionic';
import { LoginPage} from '../login/login';
/**
 * Generated class for the MesajlarPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-mesajlar',
  templateUrl: 'mesajlar.html',
})
export class MesajlarPage {

public userProfile:any=null;
messages:Array<{key: string,username:string}>;
  constructor(public navCtrl: NavController, public navParams: NavParams,public alert:AlertController,private storage:Storage,private tst:ToastController,private app:App) {

this.getUserDetails();
   this.messages=[];

this.getMessages();
  }

  ionViewDidLoad() {

  	//reading data from firebase

  }
  presentToast(msj){
let toast=this.tst.create({
message:msj,
duration:2000,
position:'bottom'
});
toast.present();


 }
  getUserDetails(){
this.storage.get('user').then((val) => {

  this.userProfile=val;

}).catch ( (error) =>{
this.presentToast(error);
  let nav=this.app.getRootNav();
  nav.setRoot(LoginPage);
} );
 }

getUserName(uid,obj){



firebase.database().ref('user/'+uid).once('value').then((snapshot)=>{
      obj.username=snapshot.child("username").val();
      if(obj.username===null){
        obj.username=firebase.auth().currentUser.displayName;
      }

    }).catch ( (error) =>{
      this.presentToast("HATA");
      let nav=this.app.getRootNav();
      nav.setRoot(LoginPage);
    } );;


}

getLastMessage(id,rid,obj)
{
firebase.database().ref('user/'+id+'/conversations/'+rid+'/messages/').once('value').then( (snapshot) =>{
  snapshot.forEach ((child)=>{
      obj.lastmessage=child.child("message").val();
  })

}).catch ( (error) =>{
  this.presentToast("HATA");
  let nav=this.app.getRootNav();
  nav.setRoot(LoginPage);
} );;

}

  getMessages(){
    this.storage.get('user').then((val) => {
      var id=this.userProfile.uid;

          firebase.database().ref('user/'+id+'/conversations/').once('value').then( (mesaj) =>{
            mesaj.forEach ( (child) => {

              let mesaj={
                key:child.key,
                username:"",
                lastmessage:""
              };
              this.getUserName(child.key,mesaj);
              this.getLastMessage(id,child.key,mesaj);

              this.messages.push(mesaj);


          })

    }).catch ( (error) =>{
      this.presentToast("HATA");
      let nav=this.app.getRootNav();
      nav.setRoot(LoginPage);
    } );


  }).catch((error)=>{console.log(error);});
}
/*  send(){
  	// add new data to firebase
  	this.ref.push({
  		name: this.name.username,
  		message: this.newmessage
  	});

console.log('ionViewDidLoad MesajlarPage');
  }
  mesaj:any;
*/
}
