import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PostmanCallService } from '../postman-call.service';

@Component({
  selector: 'app-add-component',
  templateUrl: './add-component.component.html',
  styleUrls: ['./add-component.component.css']
})
export class AddComponentComponent implements OnInit {

  public form: FormGroup;

  title: string;
  priority: string;
  reporter: string;
  createdAt: string;
  status: string;
  description: string;

  constructor(private formBuilder: FormBuilder,
              private service: PostmanCallService) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      title: ['', Validators.required],
      priority: ['', Validators.required],
      reporter: ['', Validators.required],
      createdAt: ['', Validators.required],
      status: ['', Validators.required],
      description: ['', Validators.required],
    });
  }
  onSubmit() {
    //this.service.addBug(this.form.value).subscribe();
    if (this.form.invalid) {
        return;
    }
    else {
      this.service.addBug(this.form.value).subscribe();
    }

}

}
