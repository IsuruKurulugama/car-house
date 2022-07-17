import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Store } from '@ngxs/store';
import { Login } from './auth.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private store: Store) { }

  form: FormGroup = new FormGroup({
    UserName: new FormControl(''),
    Password: new FormControl(''),
  });

  submit() {
    if (this.form.valid) {
      this.store.dispatch(new Login(this.form.value.UserName, this.form.value.Password));
    }
  }

}
