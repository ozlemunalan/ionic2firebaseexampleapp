import { Component } from '@angular/core';
import { NavController, ToastController,NavParams ,Platform} from 'ionic-angular';
import { Facebook } from '@ionic-native/facebook';
import firebase from 'firebase';
import { HelloIonicPage } from '../hello-ionic/hello-ionic';
import { Storage } from '@ionic/storage';
/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
email:any;
password:any;
  constructor(public navCtrl: NavController,private facebook: Facebook,private storage: Storage,public tst:ToastController) {

  }
  userProfile: any = null;
  mesaj:any="asd";
     facebookLogin(){
       this.facebook.login(['email']).then( (response) => {
           const facebookCredential = firebase.auth.FacebookAuthProvider
               .credential(response.authResponse.accessToken);

           firebase.auth().signInWithCredential(facebookCredential)
           .then((success) => {
               console.log("Firebase success: " + JSON.stringify(success));
               this.storage.set('user',success);
               this.userProfile = success;
               this.navCtrl.push(HelloIonicPage);
               this.presentToast(firebase.auth().currentUser.uid);
           })
           .catch((error) => {
               console.log("Firebase failure: " + JSON.stringify(error));
           });

       }).catch((error) => { console.log(error) });
    }

    normalLogin(){

      firebase.auth().signInWithEmailAndPassword(
        'burakakyol0795@gmail.com',
        "burak1234"
      ).then((success)=>{
      this.presentToast(success.uid);

      }).catch((error)=>{

      this.presentToast(error);
      });




    }
    registerWithEmailAndPassword(){
      firebase.auth().createUserWithEmailAndPassword(
        this.email,
        this.password
      ).then((success)=>{
        firebase.database().ref('user/'+success.uid).set({

          email:success.email,
          joindate:new Date().getDate().toString()
        });
      this.presentToast(success.uid);

    }).catch((error)=>{

      this.presentToast(error);
    });


    }

    presentToast(msj){
  let toast=this.tst.create({
  message:msj,
  duration:3000
  });
  toast.present();


    }
  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

}
