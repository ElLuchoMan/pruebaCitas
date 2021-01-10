import { TipoCita } from './../../../tipo-cita/shared/model/tipo-cita';
import { Especialista } from '@feature/especialista/shared/model/especialista';

export interface Cita {
    codigoCita: number;
    fechaCita: Date;
	especialista: Especialista;
    tipoCita: TipoCita;

}
