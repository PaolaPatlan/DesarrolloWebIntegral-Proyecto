export class EventoRequest {
    nomEvento : any;
    fecha     : any;
    ubicacion : any;
    detalles  : any;
    estatus   : any;
    costo     : any;
    cantBoletos: any;
    nombreImagen:any;
    tipoImagen:any;
    bytesImagen: Uint8Array;
    multipartFile: File;
    imagen: Uint8Array;
    idOrganizador: any
}