import { Component, OnInit } from "@angular/core";
import { Validators, FormBuilder, FormGroup, FormArray } from "@angular/forms";
import { PostmanCallService } from "../../postman-call.service";
import { ActivatedRoute, Router } from "@angular/router";
import { tap } from "rxjs/operators";
import { Bug } from "src/app/model/bug";

@Component({
  selector: "app-update",
  templateUrl: "./update.component.html",
  styleUrls: ["./update.component.css"]
})
export class UpdateComponent implements OnInit {
  public form: FormGroup;

  bug: any;
  title: string;
  priority: any[] = [
    { id: "1", name: "Minor" },
    { id: "2", name: "Major" },
    { id: "3", name: "Critical" }
  ];
  reporter: string[] = ["QA", "PO", "DEV"];
  status: string[] = ["Ready for test ", "Done", "Rejected"];
  description: string;

  constructor(
    private formBuilder: FormBuilder,
    private service: PostmanCallService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.buildForm();

    if (this.activatedRoute.snapshot.params["id"] != null) {
      this.service
        .getBugById(this.activatedRoute.snapshot.params["id"])
        .subscribe((data: any) => {
          this.form.patchValue(data);
          this.fillInComments(data);
          this.bug = data;
        });
    }
  }

  onSubmit(id: string) {
    if (this.form.invalid) {
      return;
    }

    const actionToInvoke = id
      ? this.service.updateBug(this.form.value, id)
      : this.service.addBug(this.form.value);

    actionToInvoke.pipe(tap(() => this.router.navigate([""]))).subscribe();
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      title: ["", Validators.required],
      priority: ["", Validators.required],
      reporter: ["", Validators.required],
      status: ["", Validators.required],
      description: ["", Validators.required],
      comments: this.formBuilder.array([this.commentArrayItem()])
    });
  }

  private commentArrayItem(comment?) {
    return this.formBuilder.group({
      reporter: [comment && comment.reporter],
      description: [comment && comment.description]
    });
  }

  private fillInComments(data: any) {
    if (data.comments) {
      (this.form.get("comments") as FormArray).removeAt(0);
      data.comments.forEach(comment => {
        const commentAsFormGroup = this.commentArrayItem(comment);
        (this.form.get("comments") as FormArray).push(commentAsFormGroup);
      });
    }
  }
 
}


