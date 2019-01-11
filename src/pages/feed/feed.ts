import { Component, ViewChild } from '@angular/core';
import {  NavController, NavParams,LoadingController,ToastController,AlertController, PanGesture,App } from 'ionic-angular';
import firebase from 'firebase';
//import moment from 'moment';
import { LoginPage } from '../login/login';
import { TabsPage } from "../tabs/tabs";


import { Camera,CameraOptions } from "@ionic-native/camera";



@Component({
  selector: 'page-feed',
  templateUrl: 'feed.html',

})
export class FeedPage {
text: string="";
posts:any[]=[];
pageSize: number = 10;
cursor: any ;
infiniteEvent: any ;
image : string ;



  constructor(public navCtrl: NavController, public navParams: NavParams,
    private loadingCtrl:LoadingController,
    private toastCtrl:ToastController,
    private alertCtrl:AlertController,
    private camera : Camera,
    private app: App ) {
    this.getPosts();
    
  }

getPosts(){

  this.posts=[];

  let loading= this.loadingCtrl.create({
    content:"Loading..."
  });
  loading.present();
  
  let query = firebase.firestore().collection("posts").orderBy("created", "desc").limit(this.pageSize);
   
  query.onSnapshot((snapshot)=>{
    let changeDocs=snapshot.docChanges();
   
    changeDocs.forEach((change)=>{
      if(change.type=="added"){
        console.log("added");
      }
      if(change.type=="modified"){
        console.log("modified");
      }
      if(change.type=="removed"){
        console.log("removed");
      }
    })
  })
    
  query.get().
  then((docs)=>{
    docs.forEach((doc)=>{
      this.posts.push(doc);
    })
    console.log(this.posts);
    loading.dismiss();
    this.cursor= this.posts[this.posts.length-1];

  }).catch((err)=>{
    console.log(err);
  })
}  

loadMorePosts(event){
  
  firebase.firestore().collection("posts").orderBy("created", "desc").startAfter(this.cursor).limit(this.pageSize).get().then((docs) => {
    docs.forEach((doc) => {
      this.posts.push(doc);
    })
    console.log(this.posts);

    if(docs.size<this.pageSize){
      //all documents have been loaded
      event.enable(false);
      this.infiniteEvent = event;
    }
    else{
      event.complete();
        this.cursor=this.posts[this.posts.length-1];
      }
    

  }).catch((err) => {
    console.log(err);
  }) 
}

post(){
  
  firebase.firestore().collection("posts").add({
    text: this.text,
    created: firebase.firestore.FieldValue.serverTimestamp(),
    owner: firebase.auth().currentUser.uid,
    owner_name: firebase.auth().currentUser.displayName
  }).then((doc)=>{
    console.log(doc);
    this.text="";
    let toast=this.toastCtrl.create({
      message: "Post succesful!",
      duration: 2000
    }).present();
    this.getPosts();
  }).catch((err)=>{
    console.log(err);
  })

}

refresh(event){
  this.posts=[];
  this.getPosts();
  if(this.infiniteEvent){
    this.infiniteEvent.enable(true);
  }
  event.complete();
}

/* ago(time){
  let difference = moment(time).diff(moment());
  return moment.duration(difference).humanize();
} */

signout(){


  let alert = this.alertCtrl.create({
    title: "Sign Out",
    message: "Your want to sign out?",
    buttons: [
      {
        text: "Yes",
        handler: () => {
          //something
          firebase.auth().signOut().then(() => {

            this.toastCtrl.create({
              message: "You have been logged out successfully.",
              duration: 3000
            }).present();
            this.app.getRootNav().setRoot(LoginPage);
          }).catch((err)=>{
            console.log(err);
          });
        }
      },
      'No'

    ]
  });
  alert.present();
  }


  addPhoto(){
    this.launchCamera();
  }

  launchCamera(){
    let options: CameraOptions = {
      quality: 100,
      sourceType: this.camera.PictureSourceType.CAMERA,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.PNG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      targetHeight: 512,
      targetWidth: 512,
      allowEdit: true
    }
    this.camera.getPicture(options).then((base64Image) => {
      console.log(base64Image);
      this.image="data:image/png;base64,"+base64Image;
    }).catch((err) => {
      console.log(err);
    })
  }

  upload(name:string){
    let ref = firebase.storage().ref("postImages/"+name);
    let uploadTask=ref.putString(this.image.split(',')[1],"base64");

    uploadTask.on("state_changed",(taskSnapshot)=>{
      console.log(taskSnapshot);
    },
    (error)=>{
      console.log(error);
    },()=>{
      console.log("The upload is completed!");
      uploadTask.snapshot.ref.getDownloadURL().then((url)=>{
        console.log(url);
      })
    })

  }
}
