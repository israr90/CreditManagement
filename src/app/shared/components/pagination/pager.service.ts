import { Injectable, Inject } from '@angular/core';
// import { Http, Response } from '@angular/http';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { Router } from '@angular/router';
// import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/catch';
// import 'rxjs/add/observable/throw';

import { filter, map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';



import * as _ from 'underscore';

@Injectable({
  providedIn: 'root'
})
export class PagerService {

  constructor() { }

    getPager(totalItems: number, currentPage: number = 1, pageSize: number = 10) {
        // calculate total pages
        let totalPages = Math.ceil(totalItems / pageSize);

        let startPage: number, endPage: number;
        // if (totalPages <= 10) {
        //     // less than 10 total pages so show all
        //     startPage = 1;
        //     endPage = totalPages;
        // } else {
        //     // more than 10 total pages so calculate start and end pages
        //     if (currentPage <= 6) {
        //         startPage = 1;
        //         endPage = 10;
        //     } else if (currentPage + 4 >= totalPages) {
        //         startPage = totalPages - 9;
        //         endPage = totalPages;
        //     } else {
        //         startPage = currentPage - 5;
        //         endPage = currentPage + 4;
        //     }
        // }

        if (totalPages <= 10) {
            startPage = 1;
            endPage = totalPages;
        } else {
            if (currentPage <= 3) {
                startPage = 1;
                endPage = 10;
            } else if (currentPage + 1 >= totalPages) {
                startPage = totalPages - 9;
                endPage = totalPages;
            } else {
                startPage = currentPage;
                endPage = currentPage + 10;
            }
        }

        // calculate start and end item indexes
        let startIndex = (currentPage - 1) * pageSize;
        let endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

        // create an array of pages to ng-repeat in the pager control
        let pages = _.range(startPage, endPage + 1);

        // return object with all pager properties required by the view
        return {
            totalItems: totalItems,
            currentPage: currentPage,
            pageSize: pageSize,
            totalPages: totalPages,
            startPage: startPage,
            endPage: endPage,
            startIndex: startIndex,
            endIndex: endIndex,
            pages: pages
        };
    }

}
