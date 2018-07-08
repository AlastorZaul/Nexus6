import { Component, OnInit } from "@angular/core";
import * as app from "application";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import { commentaire } from "~/modele/commentaire";

@Component({
    selector: "Featured",
    moduleId: module.id,
    templateUrl: "./featured.component.html"
})
export class FeaturedComponent implements OnInit {

    commentaire:commentaire;

    constructor() {
        // Use the component constructor to inject providers.
    }

    ngOnInit(): void {
        // Init your component properties here.
    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }

    envoyer(){
        console.log(this.commentaire);
    }
}
