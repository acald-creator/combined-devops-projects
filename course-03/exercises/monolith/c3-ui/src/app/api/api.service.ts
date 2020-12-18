import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpHeaders, HttpRequest } from '@angular/common/http';
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

  async upload(endpoint: string, file: File, payload: any): Promise<any> {
    const signedUrl = (await this.get(`${endpoint}/signedUrl/${file.name}`)).url;

    const headers = new HttpHeaders({'Content-Type': file.type });
    const req = new HttpRequest('PUT', signedUrl, file, {
      headers,
      reportProgress: true
    });
    return new Promise(resolve => {
      this.http.request(req).subscribe((resp) => {
        if (resp && (resp as any).status && (resp as any).status === 200) {
          resolve(this.post(endpoint, payload));
        }
      });
    });
  }

  private extractData(res: HttpEvent<any>) {
    const body = res;
    return body || { };
  }
}
