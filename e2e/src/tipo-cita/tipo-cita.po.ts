import { element, by, browser, ElementFinder } from 'protractor';

export class TipoCitaPage {

    async irAInicio(): Promise<unknown> {
        return browser.get(browser.baseUrl);
    }

    obtenerBotonTipoCita(): ElementFinder {
        return element(by.css('mat-nav-list mat-list-item[ng-reflect-router-link="/tipo-citas"]'));
    }


    async obtenerTabla(): Promise<number> {
        return element(by.css('[mat-table]')).all(by.css('tbody tr[mat-row]')).count();
    }

}
