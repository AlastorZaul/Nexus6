import { Component, OnInit } from "@angular/core";
import * as app from "application";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import { DataService } from "~/services/data.service";

import { Film } from "~/modele/films";
/**
 * Composant de démarrage
 * @class
 */
@Component({
    selector: "Film",
    moduleId: module.id,
    templateUrl: "./home.component.html"
})
export class HomeComponent implements OnInit {
    /**
     * Description du film Blade Runner
     */
    film:Film;
    /**
     * @constructor
     * @param dataServ - Service de données qui télécharge les données externes ou locales
     */
    constructor(public dataServ:DataService) {
    }
    /**
     * Initialisation des données du composant
     */
    ngOnInit(): void {
        // Les données du film
        this.dataServ.getFilm().subscribe(
            <Film>(data) => {
                this.film = data;
                console.log(this.film);
            });
    }
    /**
     * Gestion du menu latéral
     */
    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }
}
