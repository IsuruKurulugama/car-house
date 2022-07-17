import { Component } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Logout } from './login/auth.actions';
import { AuthModel, AuthState } from './login/auth.state';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @Select(AuthState.loggedInUser)
  authToken$!: Observable<AuthModel>;
  
  constructor(private store: Store){}

  logout(){
      this.store.dispatch(new Logout());
  }
}
