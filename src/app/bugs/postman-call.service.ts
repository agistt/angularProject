import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Bug } from '../model/bug';


@Injectable({
  providedIn: 'root'
})
export class PostmanCallService {

  private readonly getBugsUrl = 'https://bug-report-system-server.herokuapp.com/bugs';
  // private readonly postBugsUrl= 'https://bug-report-system-server.herokuapp.com/bugs'

  constructor(private http: HttpClient) { }

  getBugsList(): Observable<Bug[]> {
    const params = new HttpParams()
       .set('size', '10');
    return this.http.get<Bug[]>(this.getBugsUrl,{params});
  }

  addBug(bug: any[]) {
    return this.http.post(this.getBugsUrl, bug);
  }

  getBugById(id: string) {
    return this.http.get('https://bug-report-system-server.herokuapp.com/bugs/' + id);
  }

  updateBug(bug: any[], id: string) {
    return this.http.put('https://bug-report-system-server.herokuapp.com/bugs/' + id , bug);
  }

  deleteBug(id: string) {
    return this.http.delete('https://bug-report-system-server.herokuapp.com/bugs/' + id);
  }

  getSorted(sortTitle: string, sortType: string) {
    const params = new HttpParams()
       .set('sort', sortTitle+","+sortType);
    return this.http.get<Bug[]>(this.getBugsUrl, {params});
  }

  getPaginate(page: number) {
    const params = new HttpParams()
       .set('page', page.toString());
    return this.http.get<Bug[]>(this.getBugsUrl, {params});
  }


}
