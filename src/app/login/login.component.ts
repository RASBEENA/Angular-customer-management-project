import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {


  username: string = '';
  password: string = '';

  @Output() login: EventEmitter<any> = new EventEmitter();


  onLogin() {
    // Perform login validation logic here
    if (this.username === 'admin' && this.password === 'password') {
      // Emit the login event
      this.login.emit();
    } else {
    
      console.log('Invalid credentials');
    }
  }

}
