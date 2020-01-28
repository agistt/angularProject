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

  registerForm: FormGroup;

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

    this.registerForm = this.formBuilder.group({
      title: ['', Validators.required],
      priority: ['', Validators.required],
      reporter: ['', Validators.required],
      description: ['', Validators.required],
      status: ['', Validators.required],
  });

    this.postmanService.getBugById(this.activatedRoute.snapshot.params['id']).subscribe(data => {
      this.bug = data;
      this.registerForm.patchValue(this.bug);
    });



  }

}
