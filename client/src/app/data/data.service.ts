import { Injectable } from '@angular/core';

import { Http, Response, RequestOptions, URLSearchParams } from '@angular/http';

import { Observable } from 'rxjs/Rx';

import { environment } from '../../environments/environment';

@Injectable()
export class DataService {

  constructor(private http: Http) {
  }

  API_BASE_URL = environment['API_BASE_URL'];

  createUser(data) {
    return this.http.post(this.API_BASE_URL + 'user', data)
      .map(response => {
        const userObj = response.json();
        return userObj;
      })
      .catch(this.handleError);
  }


  listUser(queryParams) {
    const params: URLSearchParams = new URLSearchParams();
    params.set('limit', queryParams.limit);
    params.set('pageno', queryParams.pageno);
    if (queryParams.q) {
      params.set('q', queryParams.q);
    }

    const requestOptions = new RequestOptions();
    requestOptions.search = params;

    return this.http.get(this.API_BASE_URL + '/users', requestOptions)
      .map(response => {
        return (response.json());
      })
      .catch(this.handleError);
  }

  fetchUser(userId) {
    return this.http.get(this.API_BASE_URL + '/user/' + userId)
      .map(response => {
        return (response.json());
      })
      .catch(this.handleError);
  }

  updateUser(userId, userObj) {
    return this.http.patch(this.API_BASE_URL + '/user/' + userId, userObj)
      .map(response => {
        return (response.json());
      })
      .catch(this.handleError);
  }

  deleteUser(userId) {
    return this.http.delete(this.API_BASE_URL + '/user/' + userId)
      .map(response => {
        return (response.json());
      })
      .catch(this.handleError);
  }

  private handleError(error: Response | any): Observable<any> {
    return Observable.throw(error);
  }

}
