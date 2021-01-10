import { element, by, ElementFinder, browser } from 'protractor';

export class TipoCitaFormularioPage {

    async irAListar(): Promise<number> {
        return browser.get(browser.baseUrl + '/tipo-citas/listar');
    }

    obtenerBotonCrearTipo(): ElementFinder {
        return element(by.css('[mat-button][routerLink="/tipo-citas/guardar"]'));
    }

    obtenerCampo(nombreCampo: string): ElementFinder {
        return element(by.css('[matInput][formControlName="' + nombreCampo + '"]'));
    }

    obtenerBotonGuardar(): ElementFinder {
        return element(by.css('button[type="submit"][color="primary"]'));
    }

    obtenerMensajeModal(): ElementFinder {
        return element(by.tagName('simple-snack-bar'));

    }

}
