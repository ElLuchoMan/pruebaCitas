import { browser, ElementFinder, element, by } from 'protractor';


export class AsignacionCitaPage {

    async irAInicio(): Promise<unknown> {
        return browser.get(browser.baseUrl);
    }

    obtenerBotonMenuAsignacion(): ElementFinder {
        return element(by.css('mat-nav-list mat-list-item[ng-reflect-router-link="/citas"]'));
    }

    obtenerBotonAsignarCita(): ElementFinder {
        return element(by.css('[mat-button][routerLink="/citas/asignar"]'));
    }


    async obtenerTabla(): Promise<number> {
        return element(by.css('[mat-table]')).all(by.css('tbody tr[mat-row]')).count();
    }

    obtenerCampo(nombreCampo: string): ElementFinder {
        return element(by.css('[matInput][formControlName="' + nombreCampo + '"]'));
    }

    modalHora(): ElementFinder {
        return element(by.css('.mat-form-field-suffix mat-icon[matsuffix]')); // .toggle-picker
    }

    botonSeleccionarHora(): ElementFinder {
        return element(by.cssContainingText('button.timepicker-button span', 'Ok'));
    }

    obtenerLista(nombreLista: string): ElementFinder {
        return element(by.css('mat-select[formControlName="' + nombreLista + '"]'));
    }

    seleccionarOpcion(opcion: string): void {
        element(by.cssContainingText('span.mat-option-text', opcion)).click();
    }

    obtenerBotonGuardar(): ElementFinder {
        return element(by.css('button[type="submit"][color="primary"]'));
    }

    obtenerMensajeModal(): ElementFinder {
        return element(by.tagName('simple-snack-bar'));

    }
}
