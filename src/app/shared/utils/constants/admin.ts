import { ProductResponse } from "@utils/interfaces/product";
import { BrandResponse } from "../interfaces/brand";
import { CategoryResponse } from "../interfaces/category";
import { WarehouseAssistantResponse } from "@utils/interfaces/warehouse-assistant";

export const ADD_CATEGORY_BUTTON_TEXT = 'Añadir categoría';
export const ADD_BRAND_BUTTON_TEXT = 'Añadir marca';
export const ADD_PRODUCT_BUTTON_TEXT = 'Añadir producto';
export const ADD_WAREHOUSE_ASSISTANT_BUTTON_TEXT = 'Añadir auxiliar de bodega';
export const ADD_CATEGORY_CLOSE_ICON_PATH = '/assets/icons/close-icon.svg';
export const ADD_CATEGORY_CLOSE_ICON_ALT = 'Icono de cerrar';

export const SAVE_CATEGORY_BUTTON_TEXT = 'Guardar categoría';
export const SAVE_BRAND_BUTTON_TEXT = 'Guardar marca';
export const SAVE_PRODUCT_BUTTON_TEXT = 'Guardar producto';
export const SAVE_WAREHOUSE_ASSISTANT_BUTTON_TEXT = 'Guardar usuario';
export const SIGN_IN_BUTTON_TEXT = 'Iniciar sesión';
export const LOADING_BUTTON_TEXT = 'Cargando...';
export const CANCEL_BUTTON_TEXT = 'Cancelar';

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
export const BRAND_PRODUCT_INPUT_NAME = 'brand';

export const CATEGORIES_PRODUCT_INPUT_LABEL = 'Categorías producto';
export const CATEGORIES_PRODUCT_INPUT_LABEL2 = 'categorías';
export const CATEGORIES_PRODUCT_INPUT_NAME = 'categories';

export const NAME_WAREHOUSE_ASSISTANT_INPUT_LABEL = 'Nombres completos';
export const NAME_WAREHOUSE_ASSISTANT_INPUT_LABEL2 = 'Nombres';
export const NAME_WAREHOUSE_ASSISTANT_INPUT_NAME = 'name';

export const LAST_NAME_WAREHOUSE_ASSISTANT_INPUT_LABEL = 'Apellidos completos';
export const LAST_NAME_WAREHOUSE_ASSISTANT_INPUT_LABEL2 = 'Apellidos';
export const LAST_NAME_WAREHOUSE_ASSISTANT_INPUT_NAME = 'lastName';

export const DOCUMENT_WAREHOUSE_ASSISTANT_INPUT_LABEL = 'Documento de identidad';
export const DOCUMENT_WAREHOUSE_ASSISTANT_INPUT_LABEL2 = 'Documento';
export const DOCUMENT_WAREHOUSE_ASSISTANT_INPUT_NAME = 'document';

export const PHONE_WAREHOUSE_ASSISTANT_INPUT_LABEL = 'Número de celular';
export const PHONE_WAREHOUSE_ASSISTANT_INPUT_LABEL2 = 'Celular';
export const PHONE_WAREHOUSE_ASSISTANT_INPUT_NAME = 'phone';

export const BIRTHDATE_WAREHOUSE_ASSISTANT_INPUT_LABEL = 'Fecha de nacimiento';
export const BIRTHDATE_WAREHOUSE_ASSISTANT_INPUT_LABEL2 = 'Fecha de nacimiento';
export const BIRTHDATE_WAREHOUSE_ASSISTANT_INPUT_NAME = 'birthdate';

export const EMAIL_WAREHOUSE_ASSISTANT_INPUT_LABEL = 'Correo electrónico';
export const EMAIL_WAREHOUSE_ASSISTANT_INPUT_LABEL2 = 'Correo';
export const EMAIL_WAREHOUSE_ASSISTANT_INPUT_NAME = 'email';

export const PASSWORD_WAREHOUSE_ASSISTANT_INPUT_LABEL = 'Contraseña';
export const PASSWORD_WAREHOUSE_ASSISTANT_INPUT_LABEL2 = 'Contraseña';
export const PASSWORD_WAREHOUSE_ASSISTANT_INPUT_NAME = 'password';

export const REQUIRED_FIELD_ERROR_TEXT = 'El campo es requerido';
export const MAX_LENGTH_FIELD_ERROR_TEXT = 'El campo debe tener un máximo de caracteres de';
export const MIN_VALUE_FIELD_ERROR_TEXT = 'El valor tiene que ser mayor o igual a 1';
export const SERVER_ERROR_TEXT = 'Error inesperado al guardar en el servidor';
export const PATTERN_ERRORS = {
  name: 'Los nombres solo puede contener letras',
  lastName: 'Los apellidos solo puede contener letras',
  document: 'El documento debe tener entre 7 y 10 dígitos',
  phone: 'El número de celular debe tener un máximo de 13 dígitos, y puede contener el simbolo "+"',
  email: 'El correo debe tener un formato válido',
  password: 'La contraseña debe tener al menos 8 caracteres, una letra mayúscula, una letra minúscula, un número y un carácter especial'
}

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