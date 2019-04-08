import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Article } from "../insterfaces/article";
import { environment } from "./../../environments/environment";

export class DataResponse<T> {
  totalResults?: number;
  articles?: T[];
}

@Injectable({
  providedIn: "root"
})
export class NewsService {
  constructor(private _http: HttpClient) {}

  getAllNews(countryName?: string): Observable<DataResponse<Article>> {
    const country =
      countryName === "undefined" || countryName === "" || countryName === null
        ? "us"
        : countryName;
    return this._http
      .get(`${environment.host}/top-headlines?country=${country}`, {
        headers: this.getHeaders()
      })
      .pipe(
        map(articles => {
          return <DataResponse<Article>>articles;
        })
      );
  }

  getTopFourNews(countryName?: string): Observable<DataResponse<Article>> {
    const country =
      countryName === "undefined" || countryName === "" || countryName === null
        ? "us"
        : countryName;
    return this._http
      .get(
        `${
          environment.host
        }/top-headlines?country=${country}&sortBy=popularity&pageSize=4`,
        {
          headers: this.getHeaders()
        }
      )
      .pipe(
        map(articles => {
          return <DataResponse<Article>>articles;
        })
      );
  }

  getSearchedNews(query: string): Observable<DataResponse<Article>> {
    return this._http
      .get(`${environment.host}/everything?q=${query}`, {
        headers: this.getHeaders()
      })
      .pipe(
        map(articles => {
          return <DataResponse<Article>>articles;
        })
      );
  }

  getTopics(category: string): Observable<DataResponse<Article>> {
    return this._http
      .get(`${environment.host}/top-headlines?category=${category}`, {
        headers: this.getHeaders()
      })
      .pipe(
        map(articles => {
          return <DataResponse<Article>>articles;
        })
      );
  }

  getHeaders() {
    const headers: {
      [header: string]: string | string[];
    } = {};

    const apiToken = "0ec4f684c21e4a9587b9ac16156e01ae";
    if (apiToken !== null) {
      headers["X-Api-Key"] = apiToken;
    }

    const setHeaders = new HttpHeaders(headers);
    return setHeaders;
  }
}
