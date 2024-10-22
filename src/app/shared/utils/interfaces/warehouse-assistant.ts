export interface WarehouseAssistantRequest {
  name: string;
  lastName: string;
  document: string;
  phone: string;
  birthdate: string | Date;
  email: string;
  password: string;
}

export interface Permission {
  permissionId: string;
  name: string;
}

export interface Role {
  roleId: string;
  name: string;
  description: string;
  permissionList: Permission[];
}

export interface WarehouseAssistantResponse extends WarehouseAssistantRequest {
  userId: string;
  role: Role;
}

export interface PageWarehouseAssistants {
  pageNumber: number,
	pageSize: number,
	totalElements: number,
	totalPages: number,
	content: WarehouseAssistantResponse[]
}