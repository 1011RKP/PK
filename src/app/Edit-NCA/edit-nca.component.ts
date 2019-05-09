import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AppService } from '../app.service';
import { Compound, NCA } from '../data';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-nca',
  templateUrl: './edit-nca.component.html',
  styleUrls: ['./edit-nca.component.css']
})
export class EditNCAComponent implements OnInit {

  ncaStudyNumber: string;
  ncaSource: string;
  ncaFormalAnalysis: string;
  ncaSecondarydrug: string;
  ncaStudypopulation: string;
  ncaCmax: string;
  ncaTmax: string;
  ncaToneandhalf: string;
  ncaCminorCtau: string;
  ncaAUC0t: string;
  ncaAUC0inf: string;

  itemid: string;
  type: string;
  ongItem: NCA;
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
      this.getNCA(itemid);
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
            this.router.navigate(['/displayClinicPKData', this.CompoundID, this.CompoundTitle, "NCAandPBKB"]);
          }
        },
        (error) => {
          this.error = 'Problem accessing the Service';
          console.log(this.error);
        });
  }

  posNCA(form: NgForm): void {
    if (this.CompoundID !== '') {
      this._appService.getService().subscribe(
        (res) => {
          // console.log(res.length);
          // console.log(res);
          if (res.length !== 0) {
            // console.log('res' + res.d.GetContextWebInformation.FormDigestValue);
            // console.log('Inside Click');
            const url = '/_api/web/lists/getbytitle(\'NCA\')/items';
            this._appService.addDatatoList(url, {
              CompoundId: this.CompoundID,
              Title: this.ncaStudyNumber,
              ncaSource: this.ncaSource,
              ncaFormalAnalysis: this.ncaFormalAnalysis,
              ncaSecondarydrug: this.ncaSecondarydrug,
              ncaStudypopulation: this.ncaStudypopulation,
              ncaCmax: this.ncaCmax,
              ncaTmax: this.ncaTmax,
              ncaToneandhalf: this.ncaToneandhalf,
              ncaCminorCtau: this.ncaCminorCtau,
              ncaAUC0t: this.ncaAUC0t,
              ncaAUC0inf: this.ncaAUC0inf
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

  editNCA(form: NgForm): void {
    if (this.itemid !== '') {
      this._appService.getService().subscribe(
        (res) => {
          if (res.length !== 0) {
            const url = '/_api/web/lists/getbytitle(\'NCA\')/items(' + this.itemid + ')';
            this._appService.editDatatoList(url, {
              Title: this.ncaStudyNumber,
              ncaSource: this.ncaSource,
              ncaFormalAnalysis: this.ncaFormalAnalysis,
              ncaSecondarydrug: this.ncaSecondarydrug,
              ncaStudypopulation: this.ncaStudypopulation,
              ncaCmax: this.ncaCmax,
              ncaTmax: this.ncaTmax,
              ncaToneandhalf: this.ncaToneandhalf,
              ncaCminorCtau: this.ncaCminorCtau,
              ncaAUC0t: this.ncaAUC0t,
              ncaAUC0inf: this.ncaAUC0inf
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

  getNCA(id: string): void {
    const select = '?$select=Id,Title,ncaSource,ncaFormalAnalysis,ncaSecondarydrug,ncaStudypopulation,ncaCmax,ncaTmax,ncaToneandhalf,ncaCminorCtau,ncaAUC0t,ncaAUC0inf,Created,Editor/Title,Modified,Compound/Id,Compound/Title';
    const expand = '&$expand=Compound/Id,Editor/Title,Compound/Title';
    const filter = '&$filter=(Id eq ' + id + ')';
    const order = '&$orderby=Created desc';
    const url = '/_api/web/lists/getbytitle(\'NCA\')/items' + select + expand + filter + order;
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

  setFormData(data: NCA): void {
    this.ncaStudyNumber = data[0].Title;
    this.ncaSource = data[0].ncaSource;
    this.ncaFormalAnalysis = data[0].ncaFormalAnalysis;
    this.ncaSecondarydrug = data[0].ncaSecondarydrug;
    this.ncaStudypopulation = data[0].ncaStudypopulation;
    this.ncaCmax = data[0].ncaCmax;
    this.ncaTmax = data[0].ncaTmax;
    this.ncaToneandhalf = data[0].ncaToneandhalf;
    this.ncaCminorCtau = data[0].ncaCminorCtau;
    this.ncaAUC0t = data[0].ncaAUC0t;
    this.ncaAUC0inf = data[0].ncaAUC0inf;
    this.CompoundID = data[0].Compound.Id;//.toString();
    this.CompoundTitle = data[0].Compound.Title;//.toString();

  }

}
