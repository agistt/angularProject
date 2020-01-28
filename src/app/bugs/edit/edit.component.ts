import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PostmanCallService } from '../postman-call.service';
import { Bug } from 'src/app/model/bug';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  public form: FormGroup;

  bug: any;
  title: string;
  priority: string;
  reporter: string;
  createdAt: string;
  status: string;
  description: string;

  constructor(private formBuilder: FormBuilder,
              private postmanService: PostmanCallService,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.postmanService.getBugById(this.activatedRoute.snapshot.params['id'])
    .subscribe(data => {
      this.bug = data,
      this.form = this.formBuilder.group({
        title: [this.bug.title, Validators.required],
        priority: [this.bug.priority, Validators.required],
        reporter: [this.bug.reporter, Validators.required],
        description: [this.bug.description, Validators.required],
        status: [this.bug.status, Validators.required],
      });
    });
     
  }

  ngAfterViewInit(): void {}

  onSubmit() {
    this.postmanService.updateBug(this.form.value).subscribe();
    if (this.form.invalid) {
        return;
    }
    else {
      this.postmanService.updateBug(this.form.value).subscribe();
    }
  }
  
}
