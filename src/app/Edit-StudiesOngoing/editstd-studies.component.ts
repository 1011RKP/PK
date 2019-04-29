import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AppService } from '../app.service';
import { OngoingStudies } from '../data';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

//'ng2-toastr/ng2-toastr';

@Component({
  selector: 'app-editstd-studies',
  templateUrl: './editstd-studies.component.html',
  styleUrls: ['./editstd-studies.component.css']
})
export class EditstdStudiesComponent implements OnInit {
  ongStudyNumber: string;
  ongStudyName: string;
  ongClinicalPKrep: string;
  ongClinicalPKreport: string;
  ongClinPharmRep: string;
  ongProtocol: string;
  itemid: string;
  type: string;
  ongItem: OngoingStudies;
  allCompound: Component;
  studiesobjLength: number;
  error: string;

  CompoundTitle: string;
  CompoundID: string;
  routeType: string;

  constructor(
    public toastr: ToastrService,
    vcr: ViewContainerRef,
    private router: Router,
    private _appService: AppService,
    private dynamicRoute: ActivatedRoute,
  ) {
    this.dynamicRoute.params.subscribe(params => {
      this.itemid = params['itemid'];
      this.type = params['type'];
      this.CompoundID = params['compoundID'];
      this.initializePage(this.itemid, this.type, this.CompoundID);
      this.routeType = "Edit";
    });
  }

  ngOnInit() {
  }

  cancel(): void {
    this.getCompound();
  }

  initializePage(itemid: string, type: string, compoundID: string) {
    if (type === "New") {
      this.getCompoundonload();
    } else {
      this.getOngoingStudiesData(itemid);
    }
  }

  getCompoundonload(): void {
    // this.dynamicRoute.params.subscribe(params => {
    //   this.compoundID = params['compoundID'];
    // });
    const select = '?$select=Id,Title';
    const filter = '&$filter=(Id eq ' + this.CompoundID + ')';
    const url = '/_api/web/lists/getbytitle(\'Compound\')/items' + select + filter;
    this._appService.getListItem(url)
      .subscribe(
        (compoundData) => {
          if (compoundData == null) {
            console.log('NO Data');
          } else {
            this.CompoundTitle = compoundData.d.results[0].Title;
          }
        },
        (error) => {
          this.error = 'Problem accessing the Service';
          console.log(this.error);
        });
  }

  getCompound(): void {
    // this.dynamicRoute.params.subscribe(params => {
    //   this.compoundID = params['compoundID'];
    // });
    const select = '?$select=Id,Title';
    const filter = '&$filter=(Id eq ' + this.CompoundID + ')';
    const url = '/_api/web/lists/getbytitle(\'Compound\')/items' + select + filter;
    this._appService.getListItem(url)
      .subscribe(
        (compoundData) => {
          if (compoundData == null) {
            console.log('NO Data');
          } else {
            this.CompoundTitle = compoundData.d.results[0].Title;
            this.router.navigate(['/displayClinicPKData', this.CompoundID, this.CompoundTitle, "studiesOngoing"]);
          }
        },
        (error) => {
          this.error = 'Problem accessing the Service';
          console.log(this.error);
        });
  }

  postDatatoOngoingStudies(form: NgForm): void {
    if (this.CompoundID !== '') {
      this._appService.getService().subscribe(
        (res) => {
          // console.log(res.length);
          // console.log(res);
          if (res.length !== 0) {
            // console.log('res' + res.d.GetContextWebInformation.FormDigestValue);
            // console.log('Inside Click');
            const url = '/_api/web/lists/getbytitle(\'OngoingStudies\')/items';
            this._appService.addDatatoList(url, {
              CompoundId: this.CompoundID,
              Title: this.ongStudyNumber,
              ongStudyName: this.ongStudyName,
              ongClinicalPKrep: this.ongClinicalPKrep,
              ongClinicalPKreport: this.ongClinicalPKreport,
              ongClinPharmRep: this.ongClinPharmRep,
              ongProtocol: this.ongProtocol
            }, res.d.GetContextWebInformation.FormDigestValue)
              .subscribe(
                (dataresponse) => {
                  // console.log(dataresponse.length);
                  if (dataresponse.length === 0) {
                    // this.toastr.error('Problem creating record. Please contact IT.');
                    //this.error = 'Problem creating record. Please contact IT.';
                    // this.message = '';
                  } else {
                    this.toastr.success('Record Added successfully');
                    console.log(dataresponse);
                    console.log(dataresponse);
                    this.getCompound();
                    //this.router.navigate(['/displayClinicPKData', this.id, this.CompoundTitle]);
                  }
                },
                (error) => {
                  this.toastr.error('Problem creating record. Please contact IT.');
                  this.error = 'Problem creating record. Please contact IT.';
                });
          } else {
            this.toastr.error('Problem creating record. Please contact IT.');
            this.error = 'Problem creating record. Please contact IT.';
          }
        },
        (error) => {
          this.toastr.error('Problem creating record. Please contact IT.');
          this.error = 'Problem creating record. Please contact IT.';
        });
    }
  }

  editongoingStudies(form: NgForm): void {
    if (this.itemid !== '') {
      this._appService.getService().subscribe(
        (res) => {
          if (res.length !== 0) {
            const url = '/_api/web/lists/getbytitle(\'OngoingStudies\')/items(' + this.itemid + ')';
            this._appService.editDatatoList(url, {
              Title: this.ongStudyNumber,
              ongStudyName: this.ongStudyName,
              ongClinicalPKrep: this.ongClinicalPKrep,
              ongClinicalPKreport: this.ongClinicalPKreport,
              ongClinPharmRep: this.ongClinPharmRep,
              ongProtocol: this.ongProtocol
            }, res.d.GetContextWebInformation.FormDigestValue)
              .subscribe(
                (dataresponse) => {
                  this.toastr.success('Record Updated successfully');
                  console.log(dataresponse);
                  this.getCompound();
                  //this.router.navigate(['/displayClinicPKData', this.id, this.CompoundTitle]);
                },
                (error) => {
                  this.toastr.error('Problem creating record. Please contact IT.');
                  this.error = 'Problem creating record. Please contact IT.';
                });
          } else {
            this.error = 'Problem creating record. Please contact IT.';
          }
        },
        (error) => {
          this.error = 'Problem creating record. Please contact IT.';
        });
    }
  }

  getOngoingStudiesData(id: string): void {
    const select = '?$select=Id,Title,ongStudyName,ongClinicalPKrep,ongClinicalPKreport,ongClinPharmRep,Created,ongProtocol,Editor/Title,Modified,Compound/Id,Compound/Title';
    const expand = '&$expand=Compound/Id,Editor/Title,Compound/Title';
    const filter = '&$filter=(Id eq ' + id + ')';
    const order = '&$orderby=Created desc';
    const url = '/_api/web/lists/getbytitle(\'OngoingStudies\')/items' + select + expand + filter + order;
    this._appService.getListItem(url)
      .subscribe(
        (ongItem) => {
          if (ongItem == null) {
          } else {
            console.log(ongItem);
            this.ongItem = ongItem.d.results;
            this.setFormData(this.ongItem);
            this.studiesobjLength = ongItem.d.results.length
          }
        },
        (error) => {
          this.error = 'Problem accessing the Service';
        });
  }

  setFormData(data: OngoingStudies): void {
    this.ongStudyNumber = data[0].Title;//.toString();
    this.ongStudyName = data[0].ongStudyName;//.toString();
    this.ongClinicalPKrep = data[0].ongClinicalPKrep;//.toString();
    this.ongClinicalPKreport = data[0].ongClinicalPKreport;//.toString();
    this.ongClinPharmRep = data[0].ongClinPharmRep;//.toString();
    this.ongProtocol = data[0].ongProtocol;//.toString();
    this.CompoundID = data[0].Compound.Id;//.toString();
    this.CompoundTitle = data[0].Compound.Title;//.toString();
  }


}
