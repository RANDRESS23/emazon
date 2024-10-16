import { BrandResponse } from "../interfaces/brand";
import { CategoryResponse } from "../interfaces/category";

export const EMPTY_STRING = '';
export const ZERO = 0;

export const ADD_CATEGORY_BUTTON_TEXT = 'Añadir categoría';
export const ADD_BRAND_BUTTON_TEXT = 'Añadir marca';
export const ADD_PRODUCT_BUTTON_TEXT = 'Añadir producto';
export const ADD_CATEGORY_CLOSE_ICON_PATH = '/assets/icons/close-icon.svg';
export const ADD_CATEGORY_CLOSE_ICON_ALT = 'Icono de cerrar';

export const SAVE_CATEGORY_BUTTON_TEXT = 'Guardar categoría';
export const SAVE_BRAND_BUTTON_TEXT = 'Guardar marca';
export const SAVE_PRODUCT_BUTTON_TEXT = 'Guardar producto';
export const SAVING_BUTTON_TEXT = 'Guardando...';
export const CANCEL_BUTTON_TEXT = 'Cancelar';

export const REGISTER_NEW_CATEGORY_TEXT = 'Registrar nueva';
export const REGISTER_NEW_CATEGORY_TEXT_PRIMARY = 'categoría';
export const REGISTER_NEW_BRAND_TEXT = 'Registrar nueva';
export const REGISTER_NEW_BRAND_TEXT_PRIMARY = 'marca';
export const REGISTER_NEW_PRODUCT_TEXT = 'Registrar nuevo';
export const REGISTER_NEW_PRODUCT_TEXT_PRIMARY = 'producto';

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

export const REQUIRED_FIELD_ERROR_TEXT = 'El campo es requerido';
export const MAX_LENGTH_FIELD_ERROR_TEXT = 'El campo debe tener un máximo de caracteres de';
export const MIN_VALUE_FIELD_ERROR_TEXT = 'El valor tiene que ser mayor o igual a 1';
export const SERVER_ERROR_TEXT = 'Error inesperado al guardar en el servidor';

export const SUCCESS_ICON_PATH = '/assets/icons/success-icon.svg';
export const ERROR_ICON_PATH = '/assets/icons/error-icon.svg';
export const WARNING_ICON_PATH = '/assets/icons/warning-icon.svg';
export const ARROW_LEFT_ICON_PATH = '/assets/icons/arrow-left-icon.svg';
export const ARROW_RIGHT_ICON_PATH = '/assets/icons/arrow-right-icon.svg';

export const CATEGORY_SAVED_TEXT = 'La categoría fue guardada con éxito';
export const BRAND_SAVED_TEXT = 'La marca fue guardada con éxito';
export const PRODUCT_SAVED_TEXT = 'El producto fue guardado con éxito';

export const TABLE_HEADERS_CATEGORY = ['ID', 'Nombre', 'Descripción'];
export const TABLE_HEADERS_BRAND = ['ID', 'Nombre', 'Descripción'];
export const CATEGORY_KEYS: (keyof CategoryResponse)[] = ['categoryId', 'name', 'description'];
export const BRAND_KEYS: (keyof BrandResponse)[] = ['brandId', 'name', 'description'];

export const INITIAL_PAGE_TABLE = 0;
export const INITIAL_TOTAL_PAGE_TABLE = 0;
export const INITIAL_TOTAL_ELEMENTS_TABLE = 0;
export const INITIAL_SIZE_ELEMENTS_TABLE = 10;
export const INITIAL_SORT_ORDER_ELEMENTS_TABLE = 'asc';

export const LABEL_SHOW_BY_DROPDOWN = 'Mostrar';
export const LABEL_SORT_BY_DROPDOWN = 'Ordenar';
export const OPTIONS_SHOW_BY_DROPDOWN: Record<string, string | number>[] = [{ label: '10', value: 10 }, { label: '20', value: 20 }, { label: '50', value: 50 }];
export const OPTIONS_SORT_BY_DROPDOWN: Record<string, string | number>[] = [{ label: 'Ascendente', value: 'asc' }, { label: 'Descendete', value: 'desc' }];