export interface EventoEntity {
    idEvento: number;
    nomEvento : string;
    fecha     : string;
    ubicacion : string;
    detalles  : string;
    estatus   : number;
    costo     : number;
    cantBoleto: number;
    imagen: Blob;
    idOrganizador: number
}