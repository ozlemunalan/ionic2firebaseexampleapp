import { Component, ViewChild } from '@angular/core';

import { Platform, MenuController, Nav,AlertController } from 'ionic-angular';

import { HelloIonicPage } from '../pages/hello-ionic/hello-ionic';
import { ListPage } from '../pages/list/list';
import {LoginPage} from '../pages/login/login';
import {RegisterPage} from '../pages/register/register';
import firebase from 'firebase';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
//New push actions

import { DetailsPage } from '../pages/details/details';
import { Push, PushObject, PushOptions } from '@ionic-native/push';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  // make HelloIonicPage the root (or first) page
  rootPage = HelloIonicPage;
  pages: Array<{title: string, component: any}>;

  constructor(
    public platform: Platform,
    public menu: MenuController,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
     public alertCtrl: AlertController,
     public push:Push
  ) {
    firebase.initializeApp({
      apiKey: "AIzaSyBcfpUOQVLo6HlHlZPcbf_uxVE1J5GpI3Q",
        authDomain: "https://internprj1.firebaseapp.com/",
        databaseURL: "https://internprj1.firebaseio.com/",
        storageBucket: "gs://internprj1.appspot.com",
       messagingSenderId: "690234000881"
    });

    this.initializeApp();

    // set our app's pages
    this.pages = [
      { title: 'Hello Ionic', component: HelloIonicPage },
       //{ title: 'My First List', component: ListPage },
       {title: 'Login',component:LoginPage},
 		  {title:'Register',component:RegisterPage}
    ];
  }
 initPushNotification() {
   if (!this.platform.is('cordova')) {
     console.warn('Push notifications not initialized. Cordova is not available - Run in physical device');
     return;
   }

   const options: PushOptions = {
    android: {
      senderID: '690234000881'
    },
    ios: {
      alert: 'true',
      badge: false,
      sound: 'true'
    },
    windows: {}
  };

  const pushObject: PushObject = this.push.init(options);

   pushObject.on('registration').subscribe((data: any) => {
     console.log('device token -> ' + data.registrationId);
     //TODO - send device token to server
   });

   pushObject.on('notification').subscribe((data: any) => {
    console.log('message -> ' + data.message);
    //if user using app and push notification comes
    if (data.additionalData.foreground) {
      // if application open, show popup
      let confirmAlert = this.alertCtrl.create({
        title: 'New Notification',
        message: data.message,
        buttons: [{
          text: 'Ignore',
          role: 'cancel'
        }, {
          text: 'View',
          handler: () => {
            //TODO: Your logic here
            this.nav.push(DetailsPage, { message: data.message });
          }
        }]
      });
      confirmAlert.present();
    } else {
      //if user NOT using app and push notification comes
      //TODO: Your logic on click of push notification directly
      this.nav.push(DetailsPage, { message: data.message });
      console.log('Push notification clicked');
    }
  });

  pushObject.on('error').subscribe(error => console.error('Error with Push plugin' + error));
}
  initializeApp() {
    this.platform.ready().then(() => {

      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
       this.initPushNotification();



    });



  }





  openPage(page) {
    // close the menu when clicking a link from the menu
    this.menu.close();
    // navigate to the new page if it is not the current page
    this.nav.setRoot(page.component);
  }
}
