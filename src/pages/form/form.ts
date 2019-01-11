import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { SelectSearchableComponent } from "ionic-select-searchable";


@Component({
  selector: 'page-form',
  templateUrl: 'form.html',
})
export class FormPage {
@ViewChild('mySelect')selectComponent:SelectSearchableComponent;
user=null;
userIds=[];
users=[
  {
    name:"josh",
    id:3232,
    otherS: "haha"

  },
  {
    name: "pepe",
    id: 2341,
    otherS: "haha"
  }

];
  constructor(public navCtrl: NavController, public navParams: NavParams,private toastCtrl:ToastController) {
  }
  userChanged(event:{component:SelectSearchableComponent,value:any}){
    //user selected
    console.log('event: ',event);
  }

  onClose(){
    let toast = this.toastCtrl.create({
      message:"Thanks",
      duration:2000
    });
    toast.present();
  }
  openFromCode(){
    this.selectComponent.open();
  }

}
