import { MatDialogConfig } from '@angular/material/dialog';

export class AppConstants {
  public static PATH_TIPO_CITA = 'tipo-citas';
  public static PATH_ESPECIALISTA = 'especialistas';
  public static PATH_CITA = 'citas';
  public static PATH_USUARIO = 'usuarios';
}

export const DIALOG_CONFIG: MatDialogConfig = {
  disableClose: true,
  position: { right: '0px' },
  maxWidth: '100vw',
  minWidth: '50vw',
};
