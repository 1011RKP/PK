import { Component, OnInit } from '@angular/core';
import { Compound, CompletedStudies, OngoingStudies, NCAPBCAPK, Constents } from './data';
import { Router, ActivatedRoute } from '@angular/router';
import { AppService } from './app.service';
//import { OrderByPipe } from './customPipe';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  selectedCompound: Compound;
  allCompound: Compound[];
  cacadedCompound: Compound[];
  error: string;
  pleaseSelectCompound: any = '-- Select Compound --';
  Compound: string;
  CompoundTitle: string;
  selectedData: Compound;
  CompoundLsitLink = "/sites/ClinPK/Lists/Compound/AllItems.aspx"
  isAdminTrue: boolean = false;

  constructor(
    private router: Router,
    private _appService: AppService,
    private dynamicRoute: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.getCompound();
    this.getClinkPKAdmin();
  }

  onprogramselectionChanged() {
    this.selectedCompound;
    if (this.selectedCompound != null && this.selectedCompound !== <any>'-- Select Compound --') {
      this.Compound = this.selectedCompound.Id;
      this.CompoundTitle = this.selectedCompound.Title;
      this.router.navigate(['/displayClinicPKData', this.Compound, this.CompoundTitle, "studiesOngoing"]);
    } else {
      this.router.navigateByUrl('/empty');
      this.Compound = null;
    }
  }


  getCompound(): void {
    this.selectedCompound = this.pleaseSelectCompound;
    const select = '?$select=Id,Title';
    const url = '/_api/web/lists/getbytitle(\'Compound\')/items' + select;
    this._appService.getListItem(url)
      .subscribe(
        (compoundData) => {
          if (compoundData == null) {
            console.log('NO Data');
          } else {
            this.allCompound = compoundData.d.results;
            this.cacadedCompound = this.allCompound;
          }
        },
        (error) => {
          this.error = 'Problem accessing the Service';
          console.log(this.error);
        });
  }

  getClinkPKAdmin() {
    const url = "/_api/web/currentUser/groups?$select=title,Id&$filter=title+eq+'Clink PK Admin'";
    this._appService.getListItem(url)
      .subscribe(
        (res) => {
          console.log(res);
          if (res) {
            let userLength = res.d.results.length;
            this.isAdminTrue = (userLength !== 0) ? true : false;
          }
        },
        (error) => {
          this.error = 'Problem accessing the Service';
        });
  }

}