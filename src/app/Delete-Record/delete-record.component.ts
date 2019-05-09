import { Component, OnInit, Input, Output, EventEmitter, ViewContainerRef } from '@angular/core';
import { Compound, CompletedStudies, OngoingStudies, NCAPBCAPK, Constents, NCA, PBPK, PopPK } from '../data';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { AppService } from '../app.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-delete-record',
  templateUrl: './delete-record.component.html',
  styleUrls: ['./delete-record.component.css']
})
export class DeleteRecordComponent implements OnInit {

  ctdItem: CompletedStudies;
  ncapbcapkItem: NCAPBCAPK;
  deleteresponse: string;
  @Input()
  stdData: OngoingStudies;
  @Input()
  ctdData: CompletedStudies;
  @Input()
  //ncaData: NCAPBCAPK;
  NCAData: NCA;
  @Input()
  PBPKData: PBPK;
  @Input()
  PopPKData: PopPK;
  @Input()
  EventType: string;

  @Output()
  OnDeleteClickEvent: EventEmitter<string> = new EventEmitter<string>();

  constructor(
    private router: Router,
    private dynamicRoute: ActivatedRoute,
    private _appService: AppService) {

  }

  ngOnInit() {
  }
  deletStdOngoingRecord() {
    console.log(this.stdData);
    if (this.stdData) {
      this._appService.getService().subscribe(
        (res) => {
          if (res !== null) {
            const url = '/_api/web/lists/getbytitle(\'OngoingStudies\')/items(' + this.stdData.Id + ')';
            this._appService.deleteDatafromList(url, res.d.GetContextWebInformation.FormDigestValue)
              .subscribe(
                (dataresponse) => {
                  this.deleteresponse = 'deleted';
                  this.OnDeleteClickEvent.emit(this.deleteresponse);
                  this.router.navigate(['/displayClinicPKData', this.stdData.Compound.Id, this.stdData.Compound.Title, "studiesOngoing"]);
                },
                (error) => {
                  this.deleteresponse = 'notdeleted';
                });
          } else {
            this.deleteresponse = 'notdeleted';
          }
        },
        (error) => {
          this.deleteresponse = 'notdeleted';
        });
    }
  }

  deletCtdOngoingRecord() {
    console.log(this.ctdData);
    if (this.ctdData) {
      this._appService.getService().subscribe(
        (res) => {
          if (res !== null) {
            const url = '/_api/web/lists/getbytitle(\'CompletedStudies\')/items(' + this.ctdData.Id + ')';
            this._appService.deleteDatafromList(url, res.d.GetContextWebInformation.FormDigestValue)
              .subscribe(
                (dataresponse) => {
                  this.deleteresponse = 'deleted';
                  this.OnDeleteClickEvent.emit(this.deleteresponse);
                  this.router.navigate(['/displayClinicPKData', this.ctdData.Compound.Id, this.ctdData.Compound.Title, "studiesCompleted"]);
                },
                (error) => {
                  this.deleteresponse = 'notdeleted';
                });
          } else {
            this.deleteresponse = 'notdeleted';
          }
        },
        (error) => {
          this.deleteresponse = 'notdeleted';
        });
    }
  }

  deletNCARecord() {
    console.log(this.NCAData);
    if (this.NCAData) {
      this._appService.getService().subscribe(
        (res) => {
          if (res !== null) {
            const url = '/_api/web/lists/getbytitle(\'NCA\')/items(' + this.NCAData.Id + ')';
            this._appService.deleteDatafromList(url, res.d.GetContextWebInformation.FormDigestValue)
              .subscribe(
                (dataresponse) => {
                  this.deleteresponse = 'deleted';
                  this.OnDeleteClickEvent.emit(this.deleteresponse);
                  this.router.navigate(['/displayClinicPKData', this.NCAData.Compound.Id, this.NCAData.Compound.Title, "NCAandPBKB"]);
                },
                (error) => {
                  this.deleteresponse = 'notdeleted';
                });
          } else {
            this.deleteresponse = 'notdeleted';
          }
        },
        (error) => {
          this.deleteresponse = 'notdeleted';
        });
    }
  }

  deletPBPKRecord() {
    console.log(this.PBPKData);
    if (this.PBPKData) {
      this._appService.getService().subscribe(
        (res) => {
          if (res !== null) {
            const url = '/_api/web/lists/getbytitle(\'PBPK\')/items(' + this.PBPKData.Id + ')';
            this._appService.deleteDatafromList(url, res.d.GetContextWebInformation.FormDigestValue)
              .subscribe(
                (dataresponse) => {
                  this.deleteresponse = 'deleted';
                  this.OnDeleteClickEvent.emit(this.deleteresponse);
                  this.router.navigate(['/displayClinicPKData', this.PBPKData.Compound.Id, this.PBPKData.Compound.Title, "NCAandPBKB"]);
                },
                (error) => {
                  this.deleteresponse = 'notdeleted';
                });
          } else {
            this.deleteresponse = 'notdeleted';
          }
        },
        (error) => {
          this.deleteresponse = 'notdeleted';
        });
    }
  }

  deletPopPKRecord() {
    console.log(this.PopPKData);
    if (this.PopPKData) {
      this._appService.getService().subscribe(
        (res) => {
          if (res !== null) {
            const url = '/_api/web/lists/getbytitle(\'PopPK\')/items(' + this.PopPKData.Id + ')';
            this._appService.deleteDatafromList(url, res.d.GetContextWebInformation.FormDigestValue)
              .subscribe(
                (dataresponse) => {
                  this.deleteresponse = 'deleted';
                  this.OnDeleteClickEvent.emit(this.deleteresponse);
                  this.router.navigate(['/displayClinicPKData', this.PopPKData.Compound.Id, this.PopPKData.Compound.Title, "NCAandPBKB"]);
                },
                (error) => {
                  this.deleteresponse = 'notdeleted';
                });
          } else {
            this.deleteresponse = 'notdeleted';
          }
        },
        (error) => {
          this.deleteresponse = 'notdeleted';
        });
    }
  }

}
