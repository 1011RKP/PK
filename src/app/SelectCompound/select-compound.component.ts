import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Program, Compound } from '../data';
import { AppService } from '../app.service';
import { OrderByPipe } from '../customPipe';

@Component({
  selector: 'app-select-compound',
  templateUrl: './select-compound.component.html',
  styleUrls: ['./select-compound.component.css']
})
export class SelectCompoundComponent implements OnInit {
  selectedCompound: Compound;
  allCompound: Compound[];
  cacadedCompound: Compound[];
  error: string;
  pleaseSelectCompound: any = '-- Select Compound --';

  @Output()
  OnprogramselectionChangedEvent: EventEmitter<Compound> = new EventEmitter<Compound>();

  constructor(
    private _appService: AppService) { }

  ngOnInit() {
    this.getCompound();
  }

  onprogramselectionChanged() {
    this.OnprogramselectionChangedEvent.emit(this.selectedCompound);
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

  onSelect(program: string) {
    this.selectedCompound = this.pleaseSelectCompound;
    if (this.allCompound.length !== 0) {
      this.cacadedCompound = this.allCompound;
      if (this.cacadedCompound.length !== 0) {
        this.OnprogramselectionChangedEvent.emit(null);
      } else {
        this.OnprogramselectionChangedEvent.emit(null);
      }
    }
  }

}
