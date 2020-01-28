import { Component, OnInit, ViewChild } from '@angular/core';
import { PostmanCallService } from '../postman-call.service';
import {MatTableModule, MatTableDataSource} from '@angular/material/table';
import { Bug } from 'src/app/model/bug';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bugs-list',
  templateUrl: './bugs-list.component.html',
  styleUrls: ['./bugs-list.component.scss']
})
export class BugsListComponent implements OnInit {

  @ViewChild(MatSort, {static: false}) sort: MatSort;


  public bugsData: Bug[] = [];
  public dataSource = new MatTableDataSource<Bug>();
  public columns = ["title", "priority","reporter","dateCreated","status","edit"];

  constructor(public PostmanService: PostmanCallService,
    private router : Router) { }

  ngOnInit() {
    this.PostmanService.getBugsList().subscribe(data => {
      this.bugsData = data;
      this.dataSource.data = data;
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  editBug(id) {

    this.router.navigate(['/edit', id]);
  }

}
