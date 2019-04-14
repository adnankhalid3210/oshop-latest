import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
import { AppUser } from './models/app-user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user: AngularFireList<any>;    // Reference to Student data list, its an Observable
  studentRef: AngularFireObject<any>;   // Reference to Student object, its an Observable too

  constructor(private db:AngularFireDatabase) {
    this.user = db.list('/users');

}
  save(user:firebase.User){
    this.db.object('/users'+ user.uid).update({
      name:user.displayName,
       email:user.email

    })
  }

  get(uid:string):AngularFireObject<AppUser>{
    return this.db.object('/users/' +uid);
  }
}
