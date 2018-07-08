import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { Personnages } from "../modele/personnages";
import { Film } from '~/modele/films';

import { knownFolders, File, Folder } from "file-system";

/**
 * Service de récupération des données sur Blade Runner
 */
@Injectable()
export class DataService {
  /**
   * Le tableau des données sur les personnages
   */
  persos: Array<Personnages>;
  /**
   * Des infos sur le film en général
   */
  film: Film;

  documents;
  dossier:Folder;
  fichier:File;
  /**
   * @constructor
   * @param http - Adjonction d'un client HTTP pour les requêtes
   */
  constructor(private http: HttpClient) {
    this.documents = knownFolders.documents();
    this.dossier = this.documents.getFolder("" || "donnees");
    this.fichier = this.dossier.getFile(("persos") + ".json");

  }
  /**
   * Récupérer les données JSON initiales depuis le système de fichier local
   * Si pas de fichier on le télécharge
   * Sinon on lit les données
   */
  getPersos():Array<Personnages> {
    console.log("Taille du fichier", this.fichier.size);
    if(this.fichier.size == 0){
      console.log("Fichier", this.fichier);
      this.http.get<Array<Personnages>>("http://www.exlineo.com/dev/ns/json/persos.json").subscribe(
        <Personnages>(data) => {
          console.log(data);
          this.persos = data;
          this.fichier.writeText(JSON.stringify(data) || "")
          .then(result => {
            console.log("Données enregistrées "+this.fichier.path);
          })
          .catch(err => {
              console.log(err);
          });
      });
    }else{
      this.fichier.readText()
      .then(
        <Personnages>(res) => {
        this.persos = JSON.parse(res);
        console.log("Données lues", res);
      }).catch(err => {
          console.log(err.stack);
      });
    }
    return this.persos;
    // return this.http.get<Array<Personnages>>("http://www.exlineo.com/dev/ns/json/persos.json");
  }
  /**
   * Récupérer les infos sur le film
   */
  getFilm() {
    if(this.fichier = this.dossier.getFile(("film") + ".json")){
      console.log("Fichier", this.fichier); 
    };
    
    return this.http.get<Film>("http://www.exlineo.com/dev/ns/json/film.json");
  }
  /**
   * Ecrire des données locales
   * @param fichier - Le nom du fichier à écrire
   */
  ecritFichier(fichier: string) {

  }
  /**
   * Lire un fichier local
   * @param fichier - Le nom d'un fichier à lire
   */
  litFichier(fichier: string) {
    console.log(knownFolders.documents());
  }
}
