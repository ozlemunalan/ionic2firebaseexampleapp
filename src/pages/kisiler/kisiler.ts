import { Component } from '@angular/core';
import { NavController, NavParams,LoadingController } from 'ionic-angular';
import { MesajPage } from '../mesaj/mesaj';
import firebase from 'firebase';

/**
 * Generated class for the KisilerPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-kisiler',
  templateUrl: 'kisiler.html',
})
export class KisilerPage {

  kisiler:Array<{key: string, username: string}>;

  constructor(public navCtrl: NavController, public navParams: NavParams,public loadingCtrl: LoadingController) {
this.kisiler=[];
  this.presentLoadingDefault();
  }

  getUsers(){
	   firebase.database().ref('user').once('value').then( (kisi) =>{
	  kisi.forEach( (child) => {
      if(child.key!==firebase.auth().currentUser.uid){


      var uname=child.child('username').val();
      if(uname===null){
        uname=child.child('displayName').val();
      }
		  let kisi={key:child.key,
		  username:uname

		  };

		  this.kisiler.push(kisi);
        }
	  })
  }).catch( (error) => {

	  console.log(error);
  });
  }
presentLoadingDefault() {
  let loading = this.loadingCtrl.create({
    content: 'Kişiler Yükleniyor...'
  });

  loading.present().then( () => {
	  this.getUsers();
	  loading.dismiss();

  });


}

openMessagePage(uid,username)
{
this.navCtrl.push(MesajPage,{id:uid,uname:username});

}
  ionViewDidLoad() {
    console.log('ionViewDidLoad KisilerPage');
  }

}
