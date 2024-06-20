import { DecimalPipe } from "@angular/common";
import { Injectable, PipeTransform } from "@angular/core";
import { BehaviorSubject, Observable, Subject, debounceTime, delay, of, switchMap, tap } from "rxjs";
import { SortDirection } from "../_directives/sortable.directive";

interface SearchResult {
  datenSort: any[];
  total: number;
}

interface State {
  page: number;
  pageSize: number;
  searchTerm: string;
  sortColumn: string;
  sortDirection: SortDirection;
}

function compare(v1, v2) {
  return v1 < v2 ? -1 : v1 > v2 ? 1 : 0;
}


function sort(data: any[], column: string, direction: string): any[] {
  if (direction === '') {
    return data;
  } else {
    return [...data].sort((a, b) => {
      const res = compare(a[column], b[column]);
      return direction === 'asc' ? res : -res;
    });
  }
}

function matchesKunden(data: any, term: string, pipe: PipeTransform) {
  return data.kundenname.toLowerCase().includes(term.toLowerCase()) ||
    data.objektidents.some(element => {
      return (
        element.identnummer.toString().includes(term) ||
        element.objektart.toLowerCase().includes(term.toLowerCase()) ||
        element.leitstelle.toLowerCase().includes(term.toLowerCase()) ||
        (element.adresse && element.adresse.strasse.toLowerCase().includes(term.toLowerCase())) ||
        (element.adresse && element.adresse.ort.toLowerCase().includes(term.toLowerCase())) ||
        (element.adresse && element.adresse.plz.toLowerCase().includes(term.toLowerCase()))
      );
    });
}

function matchesLeitstellen(data: any, term: string, pipe: PipeTransform) {
  return data.leitstelle.toLowerCase().includes(term.toLowerCase()) ||
    data.kennwort.toLowerCase().includes(term.toLowerCase()) ||
    data.telefon.toLowerCase().includes(term.toLowerCase());    
}

function matchesLieferranten(data: any, term: string, pipe: PipeTransform) {
  return data.ansprechpartner.toLowerCase().includes(term.toLowerCase()) ||
    data.kundennummer.toLowerCase().includes(term.toLowerCase()) ||
    data.lieferantenname.toLowerCase().includes(term.toLowerCase()) ||
    data.supporttelefon.toLowerCase().includes(term.toLowerCase());
}

function matchesUsers(data: any, term: string, pipe: PipeTransform) {
  return data.vorname.toLowerCase().includes(term.toLowerCase()) ||
  data.nachname.toLowerCase().includes(term.toLowerCase()) ||
  data.email.toLowerCase().includes(term.toLowerCase());
}

@Injectable({
  providedIn: 'root'
})
export class SarchandfilterService {
  private _loading$ = new BehaviorSubject<boolean>(true);
  private _search$ = new Subject<void>();
  private _daten$ = new BehaviorSubject<any[]>([]);
  private _total$ = new BehaviorSubject<number>(0);
  private data: any[] = [];
  private typ: string;
  private _state: State = {
    page: 1,
    pageSize: 10,
    searchTerm: '',
    sortColumn: '',
    sortDirection: ''
  };
  private currentSortColumn: string | null = null;
  private isSortAscending: boolean = true;

  constructor(private pipe: DecimalPipe) {}

  setData(data: any[], typ: string) {
    this.data = data;
    this.typ = typ;
    this._search$.pipe(
      tap(() => this._loading$.next(true)),
      debounceTime(200),
      switchMap(() => this._search()),
      delay(200),
      tap(() => this._loading$.next(false))
    ).subscribe(result => {
      this._daten$.next(result.datenSort);
      this._total$.next(result.total);
    });
 
    this._search$.next();
  }

  get daten$() { return this._daten$.asObservable(); }
  get total$() { return this._total$.asObservable(); }
  get loading$() { return this._loading$.asObservable(); }
  get page() { return this._state.page; }
  get pageSize() { return this._state.pageSize; }
  get searchTerm() { return this._state.searchTerm; }

  set page(page: number) { this._set({ page }); }
  set pageSize(pageSize: number) { this._set({ pageSize }); }
  set searchTerm(searchTerm: string) { this._set({ searchTerm }); }
  set sortColumn(sortColumn: string) { this._set({ sortColumn }); }
  set sortDirection(sortDirection: SortDirection) { this._set({ sortDirection }); }


  private _set(patch: Partial<State>) {
    Object.assign(this._state, patch);
    this._search$.next();
  }

  private _search(): Observable<SearchResult> {
    const { sortColumn, sortDirection, pageSize, page, searchTerm } = this._state;
    // 1. sort
    let datenSort = sort(this.data, sortColumn, sortDirection);
    
    // 2. filter
  switch (this.typ) {
    case 'Kunden':
      datenSort = datenSort.filter(daten => matchesKunden(daten, searchTerm, this.pipe));
      break;  
    case 'Leitstellen':
      datenSort = datenSort.filter(daten => matchesLeitstellen(daten, searchTerm, this.pipe));
      break;  
    case 'Lieferanten':
      datenSort = datenSort.filter(daten => matchesLieferranten(daten, searchTerm, this.pipe));
      break;
    case 'Users':
      datenSort = datenSort.filter(daten => matchesUsers(daten, searchTerm, this.pipe));
      break;
  
    default:
      break;
  }    
    const total = datenSort.length;

    // 3. paginate
    datenSort = datenSort.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);
   

    return of({ datenSort, total });
  }
 
  sort(column: string, data: any[]): any[] {
    if (this.currentSortColumn === column) {
      this.isSortAscending = !this.isSortAscending;
    } else {
      this.currentSortColumn = column;
      this.isSortAscending = true;
    }
  
    data.sort((a, b) => {
      if (a[column.toLowerCase()] < b[column.toLowerCase()]) {
        return this.isSortAscending ? -1 : 1;
      }
      if (a[column.toLowerCase()] > b[column.toLowerCase()]) {
        return this.isSortAscending ? 1 : -1;
      }
      return 0;
    });
    return data;
  }

}