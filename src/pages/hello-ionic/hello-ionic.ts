import { Component,ViewChild,NgZone } from '@angular/core';
import { NavController,ToastController,Platform,Content } from 'ionic-angular';
import { Facebook } from '@ionic-native/facebook';
import firebase from 'firebase';

import { LoginPage } from '../login/login';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'page-hello-ionic',
  templateUrl: 'hello-ionic.html'
})
export class HelloIonicPage {
@ViewChild(Content) content: Content;
  constructor(public navCtrl: NavController,private facebook: Facebook,public tst:ToastController, public zone: NgZone,private storage:Storage)
  {
this.getUserDetails();

  }
  userProfile: any = null;
getUserDetails(){
this.storage.get('user').then((val) => {
let username=val.displayName;
this.userProfile=val;
this.presentToast('Hoşgeldin  '+username);
  }).catch((error)=>{this.presentToast('Lütfen giriş yapınız')});

}

scrollTo() {
   // set the scrollLeft to 0px, and scrollTop to 500px
   // the scroll duration should take 200ms
   this.content.scrollTo(0, 500, 200);
 }

    presentToast(msj){
let toast=this.tst.create({
  message:msj,
  duration:3000,
  position:'top'
});
toast.present();


    }
    openLogin(){
      this.navCtrl.push(LoginPage)

    }
    Logout()
    {
      this.storage.remove('user');
      this.navCtrl.setRoot(this.navCtrl.getActive().component);
      this.presentToast('Çıkış Yapıldı.');
    }






}
