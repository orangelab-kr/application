export type CommonResponse<T = {}> =
  | (T & CommonSuccessResponse)
  | (T & CommonFailureResponse);

export interface CommonSuccessResponse {
  opcode: 0;
}

export interface CommonFailureResponse {
  opcode: number;
  message?: string;
}
