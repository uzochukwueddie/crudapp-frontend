import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

const BASEURL = 'http://localhost:3000/api/crud'; // base url for RESTful backend

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  constructor(
    private http: HttpClient
  ) { }

  getData(sortField?, sortDir?): Observable<any> {
    const params = new HttpParams().set('sortField', sortField).set('sortDir', sortDir);
    return this.http.get(`${BASEURL}/get-data`, {params: params});
  }

  readData(): Observable<any> {
    return this.http.get(`${BASEURL}/read`);
  }

  filterData(body): Observable<any> {
    return this.http.post(`${BASEURL}/date-filter`, body);
  }

  getSingleItem(id): Observable<any> {
    return this.http.get(`${BASEURL}/item/${id}`);
  }

  updateSingleItem(id, body): Observable<any> {
    return this.http.put(`${BASEURL}/item/${id}`, body);
  }

  deleteSingleItem(id): Observable<any> {
    return this.http.delete(`${BASEURL}/delete-item/${id}`);
  }
}
