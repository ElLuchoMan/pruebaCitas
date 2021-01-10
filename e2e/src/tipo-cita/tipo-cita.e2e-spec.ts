import { browser, logging } from 'protractor';
import { TipoCitaPage } from './tipo-cita.po';


describe('Flujo listar tipos de cita', () => {
    let tipoCitaPage: TipoCitaPage;

    beforeEach(async () => {
        tipoCitaPage = new TipoCitaPage();
        await tipoCitaPage.irAInicio();
    });

    it('iniciar app e ir al menu tipo de cita', async () => {
        await tipoCitaPage.obtenerBotonTipoCita().click();
        expect((await browser.getCurrentUrl()).toString()).toEqual('http://localhost:4200/tipo-citas/listar');
    });

    it('Verificar lista de tipos', async () => {
        await tipoCitaPage.obtenerBotonTipoCita().click();
        const tamanoTabla = (await tipoCitaPage.obtenerTabla());
        expect(tamanoTabla).toBeGreaterThan(0);
    });


    afterEach(async () => {
        // Assert that there are no errors emitted from the browser
        const logs = await browser.manage().logs().get(logging.Type.BROWSER);
        expect(logs).not.toContain(jasmine.objectContaining({
            level: logging.Level.SEVERE,
        } as logging.Entry));
    });

});
