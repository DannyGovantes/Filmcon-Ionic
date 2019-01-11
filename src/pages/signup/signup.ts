import { Component } from '@angular/core';
import {  NavController, NavParams,ToastController,AlertController,App } from 'ionic-angular';
import firebase from 'firebase';
import { FeedPage } from '../feed/feed';
import { TabsPage } from "../tabs/tabs";


@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
name: string="";
email: string="";
password: string="";
  constructor(public navCtrl: NavController, public navParams: NavParams,public toastCtrl:ToastController,public alertCtrl:AlertController,private app:App) {
  }

  signup(){
    firebase.auth().createUserWithEmailAndPassword(this.email,this.password).then((data)=>{
      console.log(data);
      let newUser:firebase.User=data.user;
      newUser.updateProfile({
        displayName:this.name,
        photoURL:""
      }).then((res)=>{
        console.log(res);
        this.alertCtrl.create({
          title: "Account Created",
          message: "Your acount has been created succesfully.",
          buttons:[
            {
              text:"Ok",
              handler: ()=>{
                //something
                this.app.getRootNav().setRoot(TabsPage);
              }
            }
          ]
        }).present();

      }).catch((err)=>{
        console.log(err);
      })

   
    }).catch((err)=>{
      console.log(err);
      this.toastCtrl.create({
        message: err.message,
        duration: 2000
      }).present();
    })

  }

  gotoLogin(){
    this.navCtrl.pop();
  }

}
