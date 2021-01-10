import { browser, logging } from 'protractor';
import { protractor } from 'protractor/built/ptor';
import { AsignacionCitaPage } from './asignacion-cita.po';


describe('Flujos asignacion de cita', () => {
    const EC = protractor.ExpectedConditions;
    let citaPage: AsignacionCitaPage;

    beforeEach(async () => {
        citaPage = new AsignacionCitaPage();
    });

    it('iniciar app e ir al menu asignacion de cita', async () => {
        await citaPage.obtenerBotonMenuAsignacion().click();
        expect((await browser.getCurrentUrl()).toString()).toEqual('http://localhost:4200/citas/listar');
    });

    it('Verificar lista de citas', async () => {
        await citaPage.obtenerBotonMenuAsignacion().click();
        await browser.sleep(1000);
        const tamanoTabla = (await citaPage.obtenerTabla());
        expect(tamanoTabla).toBeGreaterThan(0);
    });

    it('Asignar cita', async () => {
        await citaPage.obtenerBotonMenuAsignacion().click();
        await citaPage.obtenerBotonAsignarCita().click().then(async _ => {
            await citaPage.obtenerLista('idEspecialista').click();
            citaPage.seleccionarOpcion(' CAROLINA RUIZ ');
            await citaPage.obtenerLista('idTipoCita').click().then(() => {
                citaPage.seleccionarOpcion('CITA GENERAL ');
            });
            await citaPage.obtenerLista('idUsuario').click();
            citaPage.seleccionarOpcion(' Usuario: GLORIA BEODYA '');
            citaPage.obtenerCampo('fechaCita').sendKeys('05/01/2020');
            await citaPage.modalHora().click();
            await citaPage.botonSeleccionarHora().click();
        }).then(async _ => {
            await browser.sleep(1000);
            await citaPage.obtenerBotonGuardar().click();
            const snackBar = citaPage.obtenerMensajeModal();
            await browser.wait(EC.visibilityOf(snackBar), 10000);
            snackBar.getText().then((val) => {
                expect(val).toEqual('Se ha asignado cita con éxito');
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
