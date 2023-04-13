export enum HttpStatusCode {
  ok = 200,
  badRequest = 400,
}

export type HttpResponse<ResponseType> = {
  statusCode: HttpStatusCode;
  body?: ResponseType;
};
