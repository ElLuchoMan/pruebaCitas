import { logging, browser } from 'protractor';
import { protractor } from 'protractor/built/ptor';
import { TipoCitaFormularioPage } from './tipo-cita-formulario.po';


describe('Flujo crear tipo de cita', () => {

    const EC = protractor.ExpectedConditions;
    let formularioPage: TipoCitaFormularioPage;

    beforeEach(async () => {
        formularioPage = new TipoCitaFormularioPage();
        await formularioPage.irAListar();
    });

    it('crear nuevo tipo de cita', async () => {
        await formularioPage.obtenerBotonCrearTipo().click().then(_ => {
            formularioPage.obtenerCampo('nombre').sendKeys('Cita Ejemplo');
            formularioPage.obtenerCampo('sede').sendKeys('Sede Ejemplo');
            formularioPage.obtenerCampo('descripcionBreve').sendKeys('prueba e2e');
        }).then(async _ => {
            await browser.sleep(1500);
            await formularioPage.obtenerBotonGuardar().click();
            const snackBar = formularioPage.obtenerMensajeModal();
            await browser.wait(EC.visibilityOf(snackBar), 30000);
            snackBar.getText().then((val) => {
                expect(val).toEqual('Se ha creado tipo de cita con éxito');
            });
        });
    });

    afterEach(async () => {
        // Assert that there are no errors emitted from the browser
        const logs = await browser.manage().logs().get(logging.Type.BROWSER);
        expect(logs).not.toContain(jasmine.objectContaining({
            level: logging.Level.SEVERE,
        } as logging.Entry));
    });

});
