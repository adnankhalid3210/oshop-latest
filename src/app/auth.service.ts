import { AngularFireAuth } from '@angular/fire/auth';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as firebase from 'firebase';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
@Injectable({
  providedIn: 'root'
})

export class AuthService {
user$:Observable<firebase.User>;
  constructor(private afAuth:AngularFireAuth, private route:ActivatedRoute,private Router:Router) {
    
    this.user$=afAuth.authState;
    
   }

  login(){
  let returnUrl=this.route.snapshot.queryParamMap.get('returnUrl')||'/';
  localStorage.setItem('returnUrl',returnUrl);


    this.afAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
    this.Router.navigate(['/'])
  }

  logOut() {
    this.afAuth.auth.signOut();
    this.Router.navigate(['/login'])
   
 }
 
  
}
