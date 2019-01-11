import { Component } from '@angular/core';
import { NavController, ToastController,Nav,App } from 'ionic-angular';
import { SignupPage } from '../signup/signup';
import firebase, { app } from 'firebase';
import { FeedPage } from '../feed/feed';
import { TabsPage } from "../tabs/tabs";

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
email:string="";
password:string="";
 

  constructor(public navCtrl: NavController,public toastCtrl:ToastController,private app:App) {

  }

  login(){
    firebase.auth().signInWithEmailAndPassword(this.email,this.password).then((user)=>{
      console.log(user);
      this.toastCtrl.create({
        message:"Welcome, "+ user.user.displayName,
        duration:2000
      }).present();

      this.app.getRootNav().setRoot(TabsPage);

    }).catch((err)=>{
      console.log(err);
      this.toastCtrl.create({
        message: err.message,
        duration:3000
      }).present();
    })

  }

  gotoSignup(){
    this.navCtrl.push(SignupPage);
  }



}
