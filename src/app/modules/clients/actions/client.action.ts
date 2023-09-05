import { ClientActionTypes } from "../enums/client.enum";
import { Action, ActionCreator } from '@ngrx/store'
import { ClientsModel } from "../models/clients.model";


export class FetchClients implements Action {
  readonly type = ClientActionTypes.FETCH_CLIENT;
  constructor(public payload?: any) {}
}

export class FetchClientsSuccess implements Action {
  readonly type = ClientActionTypes.FETCH_CLIENT_SUCCESS;
  constructor(public payload: any) {}
}

export class FetchClientsFailure implements Action {
  readonly type = ClientActionTypes.FETCH_CLIENT_FAILURE;
  constructor(public error: any) {}
}

export class CreateClient implements Action {
  readonly type = ClientActionTypes.CREATE_CLIENT;
  constructor(public payload?: any) {}
}

export class CreateClientsSuccess implements Action {
  readonly type = ClientActionTypes.CREATE_CLIENT_SUCCESS;
  constructor(public payload: ClientsModel) {}
}

export class CreateClientsFailure implements Action {
  readonly type = ClientActionTypes.CREATE_CLIENT_FAILURE;
  constructor(public error: any) {}
}

export class UpdateClient implements Action {
  readonly type = ClientActionTypes.UPDATE_CLIENT;
  constructor(public id:string,public payload?: any) {}
}

export class UpdateClientsSuccess implements Action {
  readonly type = ClientActionTypes.UPDATE_CLIENT_SUCCESS;
  constructor(public payload: ClientsModel) {}
}

export class UpdateClientsFailure implements Action {
  readonly type = ClientActionTypes.UPDATE_CLIENT_FAILURE;
  constructor(public error: any) {}
}

export class DeleteClient implements Action {
  readonly type = ClientActionTypes.DELETE_CLIENT;
  constructor(public id:string) {}
}

export class DeleteClientsSuccess implements Action {
  readonly type = ClientActionTypes.DELETE_CLIENT_SUCCESS;
  constructor(public payload: ClientsModel) {}
}

export class DeleteClientsFailure implements Action {
  readonly type = ClientActionTypes.DELETE_CLIENT_FAILURE;
  constructor(public error: any) {}
}

export type ClientTypes = FetchClients | FetchClientsSuccess | FetchClientsFailure |
  CreateClient | CreateClientsSuccess | CreateClientsFailure |
  UpdateClient | UpdateClientsSuccess | UpdateClientsFailure |
  DeleteClient | DeleteClientsSuccess | DeleteClientsFailure
