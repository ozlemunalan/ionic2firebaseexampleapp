import { Component,NgZone } from '@angular/core';
import { NavController, NavParams,ToastController,App } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { LoginPage} from '../login/login';
import firebase from 'firebase';


/**
 * Generated class for the ProfilPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-profil',
  templateUrl: 'profil.html',
})
export class ProfilPage {
userProfile:any=null;

  constructor(private zone: NgZone,public navCtrl: NavController, public navParams: NavParams,private storage:Storage,public tst:ToastController,public app:App)
  {
	 this.getUserDetails();


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilPage');
  }


   presentToast(msj){
let toast=this.tst.create({
  message:msj,
  duration:1000,
  position:'bottom'
});
toast.present();


    }
	    Logout()
    {


    this.storage.remove('user');
    let nav=this.app.getRootNav();
    nav.setRoot(LoginPage);




    }
 getUserDetails(){

this.storage.get('user').then((val) => {

this.userProfile= firebase.auth().currentUser;

});
}

}
