import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Component } from '@angular/core';
import { UserService } from './user.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'oshopsite';
  constructor(private userService:UserService,private auth:AuthService,router:Router){
    auth.user$.subscribe(user=>{
      if(user){
        userService.save(user);
        
        let returnUrl=localStorage.getItem('returnUrl');
        router.navigateByUrl(returnUrl);
      }
    });
  }
}
