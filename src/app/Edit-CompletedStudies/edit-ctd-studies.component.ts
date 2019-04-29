import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AppService } from '../app.service';
import { CompletedStudies } from '../data';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-edit-ctd-studies',
  templateUrl: './edit-ctd-studies.component.html',
  styleUrls: ['./edit-ctd-studies.component.css']
})
export class EditCtdStudiesComponent implements OnInit {

  ctdStudyNumber: string;
  ctdStudyName: string;
  ctdStudyConclusion: string;
  ctdClinicalPKrep: string;
  ctdClinPharmRep: string;
  ctdProtocol: string;
  ctdClinicalPKreport: string;

  itemid: string;
  type: string;
  ongItem: CompletedStudies;
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
            this.router.navigate(['/displayClinicPKData', this.CompoundID, this.CompoundTitle, "studiesCompleted"]);
          }
        },
        (error) => {
          this.error = 'Problem accessing the Service';
          console.log(this.error);
        });
  }


  postDatatocompletedStudies(form: NgForm): void {
    if (this.CompoundID !== '') {
      this._appService.getService().subscribe(
        (res) => {
          // console.log(res.length);
          // console.log(res);
          if (res.length !== 0) {
            // console.log('res' + res.d.GetContextWebInformation.FormDigestValue);
            // console.log('Inside Click');
            const url = '/_api/web/lists/getbytitle(\'CompletedStudies\')/items';
            this._appService.addDatatoList(url, {
              CompoundId: this.CompoundID,
              Title: this.ctdStudyName,
              ctdStudyNumbe: this.ctdStudyNumber,
              ctdStudyConclusion: this.ctdStudyConclusion,
              ctdClinicalPKrep: this.ctdClinicalPKrep,
              ctdClinPharmRep: this.ctdClinPharmRep,
              ctdProtocol: this.ctdProtocol,
              ctdClinicalPKreport: this.ctdClinicalPKreport
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

  editCompletedStudies(form: NgForm): void {
    if (this.itemid !== '') {
      this._appService.getService().subscribe(
        (res) => {
          if (res.length !== 0) {
            const url = '/_api/web/lists/getbytitle(\'CompletedStudies\')/items(' + this.itemid + ')';
            this._appService.editDatatoList(url, {
              Title: this.ctdStudyName,
              ctdStudyNumbe: this.ctdStudyNumber,
              ctdStudyConclusion: this.ctdStudyConclusion,
              ctdClinicalPKrep: this.ctdClinicalPKrep,
              ctdClinPharmRep: this.ctdClinPharmRep,
              ctdProtocol: this.ctdProtocol,
              ctdClinicalPKreport: this.ctdClinicalPKreport
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
    const select = '?$select=Id,Title,ctdStudyName,ctdStudyConclusion,ctdClinicalPKrep,ctdClinicalPKreport,ctdClinPharmRep,Created,ctdProtocol,Editor/Title,Modified,Compound/Id,Compound/Title';
    const expand = '&$expand=Compound/Id,Editor/Title,Compound/Title';
    const filter = '&$filter=(Id eq ' + id + ')';
    const order = '&$orderby=Created desc';
    const url = '/_api/web/lists/getbytitle(\'CompletedStudies\')/items' + select + expand + filter + order;
    this._appService.getListItem(url)
      .subscribe(
        (ctd) => {
          if (ctd == null) {
          } else {
            console.log(ctd);
            this.ongItem = ctd.d.results;
            this.setFormData(this.ongItem);
            this.studiesobjLength = ctd.d.results.length
          }
        },
        (error) => {
          this.error = 'Problem accessing the Service';
        });
  }

  setFormData(data: CompletedStudies): void {
    this.ctdStudyName = data[0].Title;//.toString();
    this.ctdStudyNumber = data[0].ctdStudyNumber;//.toString();
    this.ctdStudyConclusion = data[0].ctdStudyConclusion;//.toString();
    this.ctdClinicalPKrep = data[0].ctdClinicalPKrep;//.toString();
    this.ctdClinPharmRep = data[0].ctdClinPharmRep;//.toString();
    this.ctdProtocol = data[0].ctdProtocol;//.toString();
    this.ctdClinicalPKreport = data[0].ctdClinicalPKreport;//.toString();
    this.CompoundID = data[0].Compound.Id;//.toString();
    this.CompoundTitle = data[0].Compound.Title;//.toString();
  }


}
