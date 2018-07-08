import { Component, OnInit } from "@angular/core";
import * as app from "application";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import { DataService } from "~/services/data.service";

import { Film } from "~/modele/films";
import { Personnages } from "~/modele/personnages";

@Component({
    selector: "Browse",
    moduleId: module.id,
    templateUrl: "./browse.component.html"
})
export class BrowseComponent implements OnInit {
    /**
     * Liste des personnages du film Blade Runner
     */
    persos:Array<Personnages>;
    /**
     * @constructor
     * @param dataServ - Service de données qui télécharge les données externes ou locales
     */
    constructor(public dataServ:DataService) {}
    /**
     * Synchroniser les données depuis le service data
     */
    ngOnInit(): void {
        // Les données des personnages
        // this.dataServ.getPersos().subscribe(
        //     <Personnages>(data) => {
        //         this.persos = data;
        //         console.log(this.persos);
        //     });
        this.persos = this.dataServ.getPersos();
    }
    /**
     * Gestionnaire de menu latéral
     */
    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }
}
