import {EventEmitter, Injectable, Output} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import consts from '@core/consts';

@Injectable({providedIn: 'root'})
export class GlobalVariableService {
  @Output() navbarTitle: EventEmitter<string> = new EventEmitter();
  @Output() language: EventEmitter<string> = new EventEmitter();

  private sectionSubject: BehaviorSubject<string>;
  public section: Observable<string>;

  constructor() {
    this.sectionSubject = new BehaviorSubject<string>(JSON.parse(localStorage.getItem(consts.section)));
    this.section = this.sectionSubject.asObservable();
  }

  setNavbarTitle(data: string) {
    this.navbarTitle.emit(data);
  }

  setLanguage(data: string) {
    this.language.emit(data);
  }

  getNavbarTitle(): EventEmitter<string> {
    return this.navbarTitle;
  }

  getLanguage(): EventEmitter<string> {
    return this.language;
  }

  get sectionValue(): string {
    return this.sectionSubject.value;
  }

  setSection(section: string) {
    localStorage.setItem(consts.section, JSON.stringify(section));
    this.sectionSubject.next(section);
  }
}
