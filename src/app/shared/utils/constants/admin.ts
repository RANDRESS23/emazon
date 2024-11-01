import { ProductResponse } from "@utils/interfaces/product";
import { BrandResponse } from "../interfaces/brand";
import { CategoryResponse } from "../interfaces/category";
import { WarehouseAssistantResponse } from "@utils/interfaces/warehouse-assistant";
import { ProductSupply } from "@utils/interfaces/supply";

export const ADD_CATEGORY_BUTTON_TEXT = 'Añadir categoría';
export const ADD_BRAND_BUTTON_TEXT = 'Añadir marca';
export const ADD_PRODUCT_BUTTON_TEXT = 'Añadir producto';
export const ADD_WAREHOUSE_ASSISTANT_BUTTON_TEXT = 'Añadir auxiliar de bodega';

export const SAVE_CATEGORY_BUTTON_TEXT = 'Guardar categoría';
export const SAVE_BRAND_BUTTON_TEXT = 'Guardar marca';
export const SAVE_PRODUCT_BUTTON_TEXT = 'Guardar producto';
export const SAVE_WAREHOUSE_ASSISTANT_BUTTON_TEXT = 'Guardar usuario';

export const REGISTER_NEW_CATEGORY_TEXT = 'Registrar nueva';
export const REGISTER_NEW_CATEGORY_TEXT_PRIMARY = 'categoría';
export const REGISTER_NEW_BRAND_TEXT = 'Registrar nueva';
export const REGISTER_NEW_BRAND_TEXT_PRIMARY = 'marca';
export const REGISTER_NEW_PRODUCT_TEXT = 'Registrar nuevo';
export const REGISTER_NEW_PRODUCT_TEXT_PRIMARY = 'producto';
export const REGISTER_NEW_WAREHOUSE_ASSISTANT_TEXT = 'Registrar';
export const REGISTER_NEW_WAREHOUSE_ASSISTANT_TEXT_PRIMARY = 'auxiliar de bodega';

export const MAX_LENGTH_CATEGORY_NAME_FIELD = 50;
export const MAX_LENGTH_CATEGORY_DESCRIPTION_FIELD = 90;
export const MAX_LENGTH_BRAND_NAME_FIELD = 50;
export const MAX_LENGTH_BRAND_DESCRIPTION_FIELD = 120;
export const MAX_LENGTH_PRODUCT_NAME_FIELD = 50;
export const MAX_LENGTH_PRODUCT_DESCRIPTION_FIELD = 120;

export const NAME_CATEGORY_INPUT_LABEL = 'Nombre categoría';
export const NAME_CATEGORY_INPUT_PLACEHOLDER = 'Nombre';
export const NAME_CATEGORY_INPUT_NAME = 'name';
export const DESCRIPTION_CATEGORY_TEXTAREA_LABEL = 'Descripción categoría';
export const DESCRIPTION_CATEGORY_TEXTAREA_PLACEHOLDER = 'Descripción';
export const DESCRIPTION_CATEGORY_TEXTAREA_NAME = 'description';

export const NAME_BRAND_INPUT_LABEL = 'Nombre marca';
export const NAME_BRAND_INPUT_PLACEHOLDER = 'Nombre';
export const NAME_BRAND_INPUT_NAME = 'name';
export const DESCRIPTION_BRAND_TEXTAREA_LABEL = 'Descripción marca';
export const DESCRIPTION_BRAND_TEXTAREA_PLACEHOLDER = 'Descripción';
export const DESCRIPTION_BRAND_TEXTAREA_NAME = 'description';

export const NAME_PRODUCT_INPUT_LABEL = 'Nombre producto';
export const NAME_PRODUCT_INPUT_PLACEHOLDER = 'Nombre';
export const NAME_PRODUCT_INPUT_NAME = 'name';
export const DESCRIPTION_PRODUCT_TEXTAREA_LABEL = 'Descripción producto';
export const DESCRIPTION_PRODUCT_TEXTAREA_PLACEHOLDER = 'Descripción';
export const DESCRIPTION_PRODUCT_TEXTAREA_NAME = 'description';

export const QUANTITY_PRODUCT_INPUT_LABEL = 'Cantidad de productos';
export const QUANTITY_PRODUCT_INPUT_PLACEHOLDER = 'Cantidad';
export const QUANTITY_PRODUCT_INPUT_NAME = 'quantity';

export const PRICE_PRODUCT_INPUT_LABEL = 'Precio producto';
export const PRICE_PRODUCT_INPUT_PLACEHOLDER = 'Precio';
export const PRICE_PRODUCT_INPUT_NAME = 'price';

export const BRAND_PRODUCT_INPUT_LABEL = 'Marca producto';
export const BRAND_PRODUCT_INPUT_LABEL2 = 'marca';
export const BRAND_PRODUCT_INPUT_NAME = 'brandId';
export const BRAND_NAME = 'brand';

export const CATEGORIES_PRODUCT_INPUT_LABEL = 'Categorías producto';
export const CATEGORIES_PRODUCT_INPUT_LABEL2 = 'categorías';
export const CATEGORIES_PRODUCT_INPUT_NAME = 'categoriesId';
export const CATEGORIES_NAME = 'categories';

export const CATEGORY_SAVED_TEXT = 'La categoría fue guardada con éxito';
export const BRAND_SAVED_TEXT = 'La marca fue guardada con éxito';
export const PRODUCT_SAVED_TEXT = 'El producto fue guardado con éxito';
export const WAREHOUSE_ASSISTANT_SAVED_TEXT = 'El auxiliar de bodega fue registrado con éxito';

export const TABLE_HEADERS_CATEGORY = [
  {
    label: 'ID',
    isCentered: true,
  },
  {
    label: 'Nombre',
    isCentered: false,
  },
  {
    label: 'Descripción',
    isCentered: false,
  }
];
export const TABLE_HEADERS_BRAND = [
  {
    label: 'ID',
    isCentered: true,
  },
  {
    label: 'Nombre',
    isCentered: false,
  },
  {
    label: 'Descripción',
    isCentered: false,
  }
];
export const TABLE_HEADERS_PRODUCT = [
  {
    label: 'ID',
    isCentered: true,
  },
  {
    label: 'Nombre',
    isCentered: false,
  },
  {
    label: 'Descripción',
    isCentered: false,
  },
  {
    label: 'Cantidad',
    isCentered: true,
  },
  {
    label: 'Precio',
    isCentered: true,
  },
  {
    label: 'Marca',
    isCentered: false,
  },
  {
    label: 'Categorías',
    isCentered: false,
  }
]
export const TABLE_HEADERS_PRODUCT_SUPPLY = [
  {
    label: 'ID',
    isCentered: true,
  },
  {
    label: 'Nombre',
    isCentered: false,
  },
  {
    label: 'Cantidad',
    isCentered: true,
  },
  {
    label: 'Acciones',
    isCentered: true,
  }
]
export const TABLE_HEADERS_WAREHOUSE_ASSISTANT = [
  {
    label: 'ID',
    isCentered: true,
  },
  {
    label: 'Nombres',
    isCentered: false,
  },
  {
    label: 'Apellidos',
    isCentered: false,
  },
  {
    label: 'Documento',
    isCentered: false,
  },
  {
    label: 'email',
    isCentered: false,
  },
  {
    label: 'phone',
    isCentered: false,
  },
  {
    label: 'birthdate',
    isCentered: false,
  }
]
export const CATEGORY_KEYS: (keyof CategoryResponse)[] = ['categoryId', 'name', 'description'];
export const BRAND_KEYS: (keyof BrandResponse)[] = ['brandId', 'name', 'description'];
export const PRODUCT_KEYS: (keyof ProductResponse)[] = ['productId', 'name', 'description', 'quantity', 'price', 'brand', 'categories'];
export const PRODUCT_SUPPLY_KEYS: (keyof ProductSupply)[] = ['productId', 'name', 'quantity', 'accion'];
export const WAREHOUSE_ASSISTANT_KEYS: (keyof WarehouseAssistantResponse)[] = ['userId', 'name', 'lastName', 'document', 'email', 'phone', 'birthdate'];

export const INITIAL_PAGE_TABLE = 0;
export const INITIAL_TOTAL_PAGE_TABLE = 0;
export const INITIAL_TOTAL_ELEMENTS_TABLE = 0;
export const INITIAL_SIZE_ELEMENTS_TABLE = 10;
export const INITIAL_SORT_ORDER_ELEMENTS_TABLE = 'asc';
export const INITIAL_SORT_BY_ELEMENTS_TABLE = 'name';

export const LABEL_SHOW_BY_DROPDOWN = 'Mostrar';
export const LABEL_SORT_ORDER_DROPDOWN = 'Ordenar';
export const LABEL_SORT_BY_DROPDOWN = 'Ordenar por';
export const OPTIONS_SHOW_BY_DROPDOWN: Record<string, string | number>[] = [{ label: '10', value: 10 }, { label: '20', value: 20 }, { label: '50', value: 50 }];
export const OPTIONS_SORT_ORDER_DROPDOWN: Record<string, string | number>[] = [{ label: 'Ascendente', value: 'asc' }, { label: 'Descendete', value: 'desc' }];
export const PRODUCT_OPTIONS_SORT_BY_DROPDOWN: Record<string, string | number>[] = [{ label: 'Nombre producto', value: 'name' }, { label: 'Nombre marca', value: 'brand' }, { label: 'Nombre categoría', value: 'categories' }];
export const WAREHOUSE_ASSISTANT_OPTIONS_SORT_BY_DROPDOWN: Record<string, string | number>[] = [{ label: 'Nombre', value: 'name' }, { label: 'Documento', value: 'document' }, { label: 'Correo', value: 'email' }];