import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { LoginPage } from '../pages/login/login';
import { SignupPage} from '../pages/signup/signup';
import { FeedPage} from '../pages/feed/feed';
import { FormPage} from '../pages/form/form';
import { NotificationsPage } from "../pages/notifications/notifications";
import { SearchPage } from "../pages/search/search";
import { TabsPage } from "../pages/tabs/tabs";

import { Camera } from "@ionic-native/camera";
import {SelectSearchableModule} from 'ionic-select-searchable'

import firebase from 'firebase';
var config = {
  apiKey: "AIzaSyAlSGvofVwY345VzVOhiPkqWicdAP3DLGg",
  authDomain: "filmconpra.firebaseapp.com",
  databaseURL: "https://filmconpra.firebaseio.com",
  projectId: "filmconpra",
  storageBucket: "filmconpra.appspot.com",
  messagingSenderId: "11718023847"
};
firebase.initializeApp(config);
firebase.firestore().settings({
  timestampsInSnapshots:true
})

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    SignupPage,
    FeedPage,
    FormPage,
    SearchPage,
    NotificationsPage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    SelectSearchableModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    SignupPage,
    FeedPage,
    FormPage,
    SearchPage,
    NotificationsPage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
