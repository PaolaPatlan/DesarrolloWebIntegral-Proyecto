export class Response<T>{
    status: string;
    message: string;
    count: number;
    data: T;
    list: T[];
}