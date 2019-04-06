import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-navigation",
  templateUrl: "./navigation.component.html",
  styleUrls: ["./navigation.component.scss"]
})
export class NavigationComponent implements OnInit {
  constructor(private _router: Router) {}

  ngOnInit() {}

  changeCountryRegion(country: string) {
    this._router.navigate([`/country/${country}`]);
  }

  run(event: KeyboardEvent) {
    const searchQuery = event.srcElement as HTMLInputElement;
    this._router.navigate([`/q/${searchQuery.value}`]);
  }
}
