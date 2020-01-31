import { Component, OnInit, ViewChild } from '@angular/core';
import { PostmanCallService } from '../postman-call.service';
import {MatTableModule, MatTableDataSource} from '@angular/material/table';
import { Bug } from 'src/app/model/bug';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-bugs-list',
  templateUrl: './bugs-list.component.html',
  styleUrls: ['./bugs-list.component.scss']
})
export class BugsListComponent implements OnInit {

  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;

  public sortType = 'asc';
  public page: number = 0;
  public bugsData: Bug[] = [];
  public dummyData = new MatTableDataSource<Bug>();
  public columns = ["title", "priority","reporter","dateCreated","status","edit","delete"];

  constructor(public PostmanService: PostmanCallService,
    private router : Router) { }

  ngOnInit() {
    this.PostmanService.getBugsList().subscribe(data => {
      this.bugsData = data;
      this.dummyData.data = data;
      this.dummyData.paginator = this.paginator;
    });
  }

  ngAfterViewInit(): void {
    this.dummyData.sort = this.sort;
    // this.dummyData.paginator = this.paginator;
  }

  editBug(id) {
    this.router.navigate(['/edit', id]);
  }
  deleteBug(id: string): void {
    const actionToInvoke = this.PostmanService.deleteBug(id);
  actionToInvoke.pipe(tap(() => this.ngOnInit())).subscribe();

  }

  sortList(sortType: string, sortTitle: string) {
    this.sortType = sortType === 'asc' ? 'desc' : 'asc';

    this.PostmanService.getSorted(sortTitle, this.sortType).subscribe(
      data => {this.bugsData = data,
        this.dummyData.data = data}
    );
  }

  paginateNext() {
    if (this.page < 5){
    this.page ++;
    this.PostmanService.getPaginate(this.page).subscribe(
      data => {this.bugsData = data,
        this.dummyData.data = data}
    );
      }
  }
  paginatePrev() {
    if (this.page > 0){
    this.page --;
    this.PostmanService.getPaginate(this.page).subscribe(
      data => {this.bugsData = data,
        this.dummyData.data = data}
    );
      }
  }

}
