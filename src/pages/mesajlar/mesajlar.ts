import { Component } from '@angular/core';
import { NavController, NavParams,AlertController,ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import firebase from 'firebase';
import {HelloIonicPage} from '../hello-ionic/hello-ionic';
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
messages:Array<{key: string}>;
  constructor(public navCtrl: NavController, public navParams: NavParams,public alert:AlertController,private storage:Storage,private tst:ToastController) {

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
} );


 }

getUserName(){


  var ref = firebase.database().ref("user/d7SHyowhUvZasT2ppuyx3c0RAof1");
  ref.once("value")
    .then(function(snapshot) {
      var email = snapshot.child("email").val(); // {first:"Ada",last:"Lovelace"}


    });





}

  getMessages(){
    this.storage.get('user').then((val) => {
      var id=this.userProfile.uid;

          firebase.database().ref('user/'+id+'/conversations/').once('value').then( (mesaj) =>{
            mesaj.forEach ( (child) => {
              let mesaj={
                key:child.key
              };
              this.messages.push(mesaj);


          })

    }).catch ( (error) =>{
      this.presentToast(error);
    } );


  });
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
