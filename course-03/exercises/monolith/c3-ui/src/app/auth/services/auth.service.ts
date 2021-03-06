import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ApiService } from 'src/app/api/api.service';
import { User } from '../models/user.model';

const JWT_LOCALSTORE_KEY = 'jwt';
const USER_LOCALSTORE_KEY = 'user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
    currentUser$: BehaviorSubject<User> = new BehaviorSubject<User>(null);
    constructor(private api: ApiService) {
      this.initToken();
    }

    initToken() {
      const token = localStorage.getItem(JWT_LOCALSTORE_KEY);
      const user = JSON.parse(localStorage.getItem(USER_LOCALSTORE_KEY)) as User;
      if (token && user ) {
        this.setTokenAndUser(token, user);
      }
    }

    setTokenAndUser(token: string, user: User) {
      localStorage.setItem(JWT_LOCALSTORE_KEY, token);
      localStorage.setItem(USER_LOCALSTORE_KEY, JSON.stringify(user));
      this.api.setAuthToken(token);
      this.currentUser$.next(user);
    }

    async login(email: string, password: string): Promise<any> {
      return this.api.post('/usrs/auth/login', {
        email, password
      }).then((res) => {
        this.setTokenAndUser(res.token, res.user);
        return res;
      }).catch((e) => { throw email; });
    }

    logout(): boolean {
      this.setTokenAndUser(null, null);
      return true;
    }

    register(user: User, password: string): Promise<any> {
      return this.api.post('/users/auth', {
        email: user.email, password
      }).then((res) => {
        this.setTokenAndUser(res.token, res.user);
        return res;
      }).catch((e) => { throw e; });
    }
}
