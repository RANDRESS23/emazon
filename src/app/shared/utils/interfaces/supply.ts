export interface Accion {
  icon: string;
  accion: (value: any) => void;
}

export interface State {
  stateId: number;
  name: string;
}

export interface ProductSupply {
  productId: number;
  name: string;
  quantity: number;
  accion: Accion;
}

export interface SupplyRequest {
  productId: number;
  extraQuantity: string | number;
}

export interface ProductSupplyRequest {
  productId: number;
  quantity: number;
  isAddProductQuantity: boolean;
}

export interface ProductSupplyResponse {
  supplyId: number;
  productId: number;
  extraQuantity: number;
  auxBodegaId: number;
  date: string;
  hour: string;
  state: State;
  failureReason: string;
}