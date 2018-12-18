import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap, filter } from 'rxjs/operators';

import { PlantDataset } from './plantdataset';
import { MessagesService } from './messages.service';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
    providedIn: 'root'
})
export class PlantDatasetService {
    private apiUrl = 'https://jsonplaceholder.typicode.com/albums/3/photos';

    constructor(private http: HttpClient,
        private messagesService: MessagesService) { }

    getAll(): Observable<PlantDataset[]> {
        return this.http.get<PlantDataset[]>(this.apiUrl, httpOptions)
            .pipe(
                tap(_ => this.log('PlantDatasetService: fetched datasets')),
                catchError(this.handleError('getDatasets', []))
            );
    }

    search(propName: string, propValue: string): Observable<PlantDataset[]> {
        this.log('filter by ' + propName + ' starts with ' + propValue);
        return this.http.get<PlantDataset[]>(this.apiUrl)
            .pipe(
                tap(_ => this.log('PlantDatasetService: fetched datasets')),
                map(datasets => {
                    // can add more filter (this.filterBy(dataset, propName, propValue) || this.filterBy(dataset, propName, 'bla'))
                    return datasets.filter(dataset => this.filterBy(dataset, propName, propValue));
                }),
                catchError(this.handleError('search', []))
            );
    }

    private filterBy(dataset: PlantDataset, propName: string, propValue: string) {
        // search if the value is found in any part of the text, or if a word starts with the value
        const regexpr = new RegExp('\\b' + propValue.toString() + '[^\\b]*?\\b', 'i');
        return regexpr.test(dataset[propName].toString());
    }

    /**
     * Handle Http operation that failed.
     * Let the app continue.
     * @param operation - name of the operation that failed
     * @param result - optional value to return as the observable result
     */
    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {

            // TODO: send the error to remote logging infrastructure
            console.error(error); // log to console instead

            // TODO: better job of transforming error for user consumption
            this.log(`${operation} failed: ${error.message}`);

            // Let the app keep running by returning an empty result.
            return of(result as T);
        };
    }

    /** Log a PlantDatasetService message with the MessageService */
    private log(message: string) {
        this.messagesService.add(`PlantDatasetService: ${message}`);
        console.log(`PlantDatasetService: ${message}`);
    }
}
