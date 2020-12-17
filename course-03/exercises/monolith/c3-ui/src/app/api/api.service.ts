import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

const API_HOST = environment.apiHost;

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json' })
  };

  token: string;

  constructor(private http: HttpClient) { }

  handleError(error: Error){
    alert(error.message);
  }

  setAuthToken(token) {
    this.httpOptions.headers = this.httpOptions.headers.append('Authorization', `jwt ${token}`);
    this.token = token;
  }

  async get(endpoint): Promise<any> {
    const url = `${API_HOST}${endpoint}`;
    const req = this.http.get(url, this.httpOptions).pipe(map(this.extractData));

    try {
      return req.toPromise();
    } catch (e) {
      this.handleError(e);
      throw e;
    }
  }

  async post(endpoint, data): Promise<any> {
    const url = `${API_HOST}${endpoint}`;
    try {
      return this.http.post<HttpEvent<any>>(url, data, this.httpOptions).toPromise();
    } catch (e) {
      this.handleError(e);
      throw e;
    }
  }

  private extractData(res: HttpEvent<any>) {
    const body = res;
    return body || { };
  }
}
