export interface ApiResponse {
    list: EventosResponse[]; // An array of EventosResponse

  }

export interface EventosResponse {
    idEvento: number;
    idOrganizador?:number;
    nomEvento: string;
    fecha: Date;
    estatus: number;
    costo: number;
    cantBoletos: number;
    ubicacion: string;
    detalles: string;
    imagen: string;
    imagenFile: null;
    numEven: number;

}