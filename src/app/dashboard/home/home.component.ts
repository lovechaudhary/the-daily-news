import { Component, OnInit, NgZone } from "@angular/core";
import { NewsService } from "src/app/services/news.service";
import { Article } from "src/app/insterfaces/article";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
  public isLoading = false;
  public isCategory = false;
  public isSearch = false;
  public searchString: string;
  public categoryString: string;
  month: string;
  day: number;
  year: number;

  news: Article[] = [];
  topFour: Article[] = [];

  constructor(
    private _newsService: NewsService,
    private _zone: NgZone,
    private _activatedRoute: ActivatedRoute,
    private _router: Router
  ) {}

  ngOnInit() {
    this.isLoading = true;

    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ];
    const month = new Date().getUTCMonth();
    this.month = monthNames[month];
    this.day = new Date().getUTCDate();
    this.year = new Date().getUTCFullYear();

    this._activatedRoute.params.subscribe(param => {
      let countryName: string;
      if (param.length !== 0) {
        countryName = "us";
        for (let field in param) {
          if (field === "query") {
            this.isCategory = false;
            this.isSearch = true;
            this.searchString = param.query;
            this._newsService.getSearchedNews(param.query).subscribe(
              news => {
                this._zone.run(() => {
                  this.news = news.articles;
                });
                this.isLoading = false;
              },
              error => {
                if (error) {
                  console.log(error);
                }
                this.isLoading = false;
              }
            );
            break;
          } else if (field === "country") {
            this.isCategory = false;
            this.isSearch = false;
            countryName = param.country;
          } else if (field === "category") {
            this.isCategory = true;
            this.isSearch = false;
            this.categoryString = param.category;
            this._newsService.getTopics(param.category).subscribe(
              news => {
                this._zone.run(() => {
                  this.news = news.articles;
                });
                this.isLoading = false;
              },
              error => {
                if (error) {
                  console.log(error);
                }
                this.isLoading = false;
              }
            );
            break;
          }
        }
      } else {
        this.isCategory = false;
        this.isSearch = false;
        countryName = "us";
      }
      this._newsService.getAllNews(countryName).subscribe(
        news => {
          this._zone.run(() => {
            this.news = news.articles;
          });
          this.isLoading = false;
        },
        error => {
          if (error) {
            console.log(error.message);
          }
          this.isLoading = false;
        }
      );

      this._newsService.getTopFourNews(countryName).subscribe(
        topFourNews => {
          this._zone.run(() => {
            this.topFour = topFourNews.articles;
          });
          this.isLoading = false;
        },
        error => {
          if (error) {
            console.log(error.message);
          }
          this.isLoading = false;
        }
      );
    });
  }

  categoryLink(category: string) {
    this._router.navigate([`/category/${category}`]);
  }
}
