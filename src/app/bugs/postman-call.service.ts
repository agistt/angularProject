import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
    return this.http.get<Bug[]>(this.getBugsUrl);
  }

  addBugToPostman(bug: any[]) {
    return this.http.post(this.getBugsUrl, bug);
  }

  getBugById(id: string) {
return this.http.get('https://bug-report-system-server.herokuapp.com/bugs/' + id);
  }


}
