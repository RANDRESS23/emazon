import { ListOfWarehouseAssistantComponent } from './list-of-warehouse-assistant.component';
import { WarehouseAssistantService } from '@src/app/core/services/warehouse-assistant/warehouse-assistant.service';
import { PageWarehouseAssistants } from '@utils/interfaces/warehouse-assistant';
import { of, throwError } from 'rxjs';

describe('ListOfWarehouseAssistantComponent', () => {
  let component: ListOfWarehouseAssistantComponent;
  let warehouseAssistantService: WarehouseAssistantService;

  beforeEach(async () => {
    warehouseAssistantService = {
      getAllWarehouseAssistants: jest.fn(),
    } as unknown as jest.Mocked<WarehouseAssistantService>;

    component = new ListOfWarehouseAssistantComponent(warehouseAssistantService);
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should load warehouse assistants on init', () => {
    // Mock de la respuesta del servicio
    const mockResponse: PageWarehouseAssistants = {
      pageNumber: 1,
      pageSize: 10,
      totalElements: 50,
      totalPages: 5,
      content: [
        {
          userId: '1',
          name: 'John',
          lastName: 'Doe',
          document: '123456789',
          phone: '1234567890',
          birthdate: '2000-01-01',
          email: 'john@example.com',
          password: 'Password123!',
          role: { roleId: '1', name: 'Admin', description: '', permissionList: [] }
        }
      ]
    };

    // Mock del servicio para devolver la respuesta
    (warehouseAssistantService.getAllWarehouseAssistants as jest.Mock).mockReturnValue(of(mockResponse));

    // Llamar al ngOnInit que debería cargar los datos
    component.ngOnInit();

    // Verificar que los datos fueron cargados correctamente
    expect(warehouseAssistantService.getAllWarehouseAssistants).toHaveBeenCalledWith(
      component.pageNumber, component.size, component.sortOrder, component.sortBy
    );
    expect(component.listOfWarehouseAssistants).toEqual(mockResponse.content);
    expect(component.totalPages).toBe(mockResponse.totalPages);
    expect(component.totalElements).toBe(mockResponse.totalElements);
  });

  it('should change the page and load warehouse assistants', () => {
    // Mock de la respuesta del servicio
    const mockResponse: PageWarehouseAssistants = {
      pageNumber: 2,
      pageSize: 10,
      totalElements: 50,
      totalPages: 5,
      content: [
        {
          userId: '2',
          name: 'Jane',
          lastName: 'Doe',
          document: '987654321',
          phone: '9876543210',
          birthdate: '1990-01-01',
          email: 'jane@example.com',
          password: 'Password456!',
          role: { roleId: '2', name: 'User', description: '', permissionList: [] }
        }
      ]
    };

    // Mock del servicio para devolver la nueva página
    (warehouseAssistantService.getAllWarehouseAssistants as jest.Mock).mockReturnValue(of(mockResponse));

    // Cambiar la página
    component.changePage(2);

    // Verificar que la página fue cambiada y que los datos fueron cargados
    expect(component.pageNumber).toBe(2);
    expect(warehouseAssistantService.getAllWarehouseAssistants).toHaveBeenCalledWith(
      2, component.size, component.sortOrder, component.sortBy
    );
    expect(component.listOfWarehouseAssistants).toEqual(mockResponse.content);
  });

  it('should show an error if getWarehouseAssistants fails', () => {
    // Mock del error
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    (warehouseAssistantService.getAllWarehouseAssistants as jest.Mock).mockReturnValue(throwError({ status: 500 }));

    // Intentar cargar los datos y capturar el error
    component.getWarehouseAssistants(1, 10, 'asc', 'name');

    // Verificar que el error fue manejado correctamente
    expect(consoleSpy).toHaveBeenCalledWith({ error: { status: 500 } });
  });

  it('should update sort and size when showFilterOrders is called', () => {
    // Mock de la respuesta del servicio
    const mockResponse: PageWarehouseAssistants = {
      pageNumber: 1,
      pageSize: 20,
      totalElements: 50,
      totalPages: 3,
      content: [
        {
          userId: '1',
          name: 'John',
          lastName: 'Doe',
          document: '123456789',
          phone: '1234567890',
          birthdate: '2000-01-01',
          email: 'john@example.com',
          password: 'Password123!',
          role: { roleId: '1', name: 'Admin', description: '', permissionList: [] }
        }
      ]
    };

    // Mock del servicio para devolver la respuesta filtrada
    (warehouseAssistantService.getAllWarehouseAssistants as jest.Mock).mockReturnValue(of(mockResponse));

    // Cambiar el filtro
    const filterEvent = [20, 'desc', 'lastName'];
    component.showFilterOrders(filterEvent);

    // Verificar que el tamaño, orden y campo de orden fueron actualizados
    expect(component.size).toBe(20);
    expect(component.sortOrder).toBe('desc');
    expect(component.sortBy).toBe('lastName');
    expect(warehouseAssistantService.getAllWarehouseAssistants).toHaveBeenCalledWith(
      component.pageNumber, 20, 'desc', 'lastName'
    );
  });
});