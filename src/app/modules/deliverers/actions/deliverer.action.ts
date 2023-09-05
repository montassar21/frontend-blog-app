import { DelivererActionTypes } from "../enums/deliverer.enum";
import { Action, ActionCreator } from '@ngrx/store'
import { DeliverersModel } from "../models/deliverers.model";


export class FetchDeliverers implements Action {
  readonly type = DelivererActionTypes.FETCH_DELIVERER;
  constructor(public payload?: any) {}
}

export class FetchDeliverersSuccess implements Action {
  readonly type = DelivererActionTypes.FETCH_DELIVERER_SUCCESS;
  constructor(public payload: any) {}
}

export class FetchDeliverersFailure implements Action {
  readonly type = DelivererActionTypes.FETCH_DELIVERER_FAILURE;
  constructor(public error: any) {}
}

export class CreateDeliverer implements Action {
  readonly type = DelivererActionTypes.CREATE_DELIVERER;
  constructor(public payload?: any) {}
}

export class CreateDeliverersSuccess implements Action {
  readonly type = DelivererActionTypes.CREATE_DELIVERER_SUCCESS;
  constructor(public payload: DeliverersModel) {}
}

export class CreateDeliverersFailure implements Action {
  readonly type = DelivererActionTypes.CREATE_DELIVERER_FAILURE;
  constructor(public error: any) {}
}

export class UpdateDeliverer implements Action {
  readonly type = DelivererActionTypes.UPDATE_DELIVERER;
  constructor(public id:string,public payload?: any) {}
}

export class UpdateDeliverersSuccess implements Action {
  readonly type = DelivererActionTypes.UPDATE_DELIVERER_SUCCESS;
  constructor(public payload: DeliverersModel) {}
}

export class UpdateDeliverersFailure implements Action {
  readonly type = DelivererActionTypes.UPDATE_DELIVERER_FAILURE;
  constructor(public error: any) {}
}

export class DeleteDeliverer implements Action {
  readonly type = DelivererActionTypes.DELETE_DELIVERER;
  constructor(public id:string) {}
}

export class DeleteDeliverersSuccess implements Action {
  readonly type = DelivererActionTypes.DELETE_DELIVERER_SUCCESS;
  constructor(public payload: DeliverersModel) {}
}

export class DeleteDeliverersFailure implements Action {
  readonly type = DelivererActionTypes.DELETE_DELIVERER_FAILURE;
  constructor(public error: any) {}
}

export type DelivererTypes = FetchDeliverers | FetchDeliverersSuccess | FetchDeliverersFailure |
  CreateDeliverer | CreateDeliverersSuccess | CreateDeliverersFailure |
  UpdateDeliverer | UpdateDeliverersSuccess | UpdateDeliverersFailure |
  DeleteDeliverer | DeleteDeliverersSuccess | DeleteDeliverersFailure
