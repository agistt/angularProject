import { Component, OnInit } from "@angular/core";
import { Validators, FormBuilder, FormGroup } from "@angular/forms";
import { PostmanCallService } from '../../postman-call.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: "app-update",
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {
  public form: FormGroup;

  bug: any;
  title: string;
  priority: string[] = ['Minor', 'Major', 'Critical'];
  reporter: string[] = ['QA', 'PO', 'DEV'];
  status: string[] =  ['Ready for test ', 'Done', 'Rejeted'];;
  description: string;

  constructor(
    private formBuilder: FormBuilder,
    private service: PostmanCallService,
    private activatedRoute: ActivatedRoute,
    private router : Router
  ) {}

  ngOnInit() {
    if (this.activatedRoute.snapshot.params["id"] != null) {
      this.service
        .getBugById(this.activatedRoute.snapshot.params["id"])
        .subscribe(data => {
          (this.bug = data),
            (this.form = this.formBuilder.group({
              title: [this.bug.title, Validators.required],
              priority: [this.bug.priority, Validators.required],
              reporter: [this.bug.reporter, Validators.required],
              description: [this.bug.description, Validators.required],
              status: [this.bug.status, Validators.required]
            }));
        });
    } else {
      this.form = this.formBuilder.group({
        title: ["", Validators.required],
        priority: ["", Validators.required],
        reporter: ["", Validators.required],
        status: ["", Validators.required],
        description: ["", Validators.required]
      });
    }
  }

  onSubmit(id: string) {
    if (id == null) {
      if (this.form.invalid) {
        return;
      } else {
        this.service.addBug(this.form.value).subscribe();
      }
    } else {
      if (this.form.invalid) {
        return;
      } else {
        this.service.updateBug(this.form.value, id).subscribe();
      }
    }
    this.router.navigate(['/']);
  }

}
