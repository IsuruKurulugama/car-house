import { Injectable } from '@angular/core';
import { Navigate } from '@ngxs/router-plugin';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { tap } from 'rxjs/operators';

import { LoginService } from 'src/app/services/login.service';
import { Login, Logout } from './auth.actions';

export class AuthModel {
    loggedInUser: any;
    username: string | undefined;
    token: string | undefined;
}

@State<AuthModel>({
    name: 'auth',
    defaults: {
        loggedInUser: undefined,
        username: undefined,
        token: undefined,
    }
})

@Injectable()
export class AuthState {

    constructor(private loginService: LoginService) { }

    @Selector()
    static loggedInUser(state: AuthModel) {
        return state.loggedInUser;
    }

    @Selector()
    static isAuthenticated(state: AuthModel): boolean {
        return !!state.token;
    }

    @Selector()
    static token(state: AuthModel) {
      return state.token;
    }

    @Action(Login)
    login(ctx: StateContext<AuthModel>, action: Login) {
        const state = ctx.getState();
        return this.loginService.login(action.name, action.password).pipe(
            tap((result) => {
                ctx.setState({
                    ...state,
                    loggedInUser: result,
                    username: action.name,
                    token: result.Content,
                });
                ctx.dispatch(new Navigate(['/cars']))
            })
        )
    };

    @Action(Logout)
    logout(ctx: StateContext<AuthModel>) {
        const state = ctx.getState();
        ctx.setState({
            ...state,
            loggedInUser: undefined,
            username: '',
            token: ''
        });
        ctx.dispatch(new Navigate(['/login']))
    };

}


