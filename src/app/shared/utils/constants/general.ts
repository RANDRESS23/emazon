export const EMPTY_STRING = '';
export const ZERO = 0;
export const TRUE_TEXT = 'true';
export const TOAST_VISIBILITY_DURATION = 3000;
export const NAME_REGEX = "^[A-Za-záéíóúÁÉÍÓÚñÑüÜ\\s]+$";
export const DOCUMENT_REGEX = "^\\d{7,10}$";
export const PHONE_REGEX = "^\\+?\\d{1,12}$";
export const EMAIL_REGEX = "^[\\w!#$%&'*+/=?`{|}~^.-]+@[\\w.-]+\\.[a-zA-Z]{2,}$";
export const PASSWORD_REGEX = "^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)(?=.*[!@#$%^&*()_+])[A-Za-z\\d!@#$%^&*()_+]{8,}$";
export const QUANTITY_REGEX = "^[1-9][0-9]*$";

export const SUCCESS_ICON_PATH = '/assets/icons/success-icon.svg';
export const ERROR_ICON_PATH = '/assets/icons/error-icon.svg';
export const WARNING_ICON_PATH = '/assets/icons/warning-icon.svg';
export const ARROW_LEFT_ICON_PATH = '/assets/icons/arrow-left-icon.svg';
export const ARROW_RIGHT_ICON_PATH = '/assets/icons/arrow-right-icon.svg';
export const CLOSE_ICON_PATH = '/assets/icons/close-icon.svg';
export const CLOSE_ICON_ALT = 'Icono de cerrar';

export const TOKEN_KEY_LOCAL_STORAGE: string = 'token';
export const LOGED_SUCCESSFULLY_TEXT: string = 'Inicio de sesión exitoso';
export const SIGN_UP_SUCCESSFULLY_TEXT: string = 'Regstro exitoso';
export const SIGN_OUT_BUTTON_TEXT: string = 'Cerrar sesión';
export const LOGIN_BUTTON_TEXT: string = 'Iniciar sesión';

export const MENU_ITEMS_ADMIN: Record<string, string>[] = [
  {
    label: 'Inicio',
    path: '/perfil/admin/inicio',
    icon: 'home'
  },
  {
    label: 'Categorías',
    path: '/perfil/admin/panel-categoria',
    icon: 'category'
  },
  {
    label: 'Marcas',
    path: '/perfil/admin/panel-marca',
    icon: 'brand'
  },
  {
    label: 'Productos',
    path: '/perfil/admin/panel-producto',
    icon: 'product'
  },
  {
    label: 'Auxiliares de Bodega',
    path: '/perfil/admin/panel-auxiliar-bodega',
    icon: 'addUser'
  }
]
export const MENU_ITEMS_WAREHOUSE_ASSISTANT: Record<string, string>[] = [
  {
    label: 'Inicio',
    path: '/perfil/auxiliar-bodega/inicio',
    icon: 'home'
  },
  {
    label: 'Suministros',
    path: '/perfil/auxiliar-bodega/panel-suministro',
    icon: 'supply'
  }
]
export const MENU_ITEMS_CLIENT: Record<string, string>[] = [
  {
    label: 'Inicio',
    path: '',
    icon: 'home'
  },
]

export const EMAIL_INPUT_LABEL = 'Correo electrónico';
export const EMAIL_INPUT_LABEL2 = 'Correo';
export const EMAIL_INPUT_NAME = 'email';

export const PASSWORD_INPUT_LABEL = 'Contraseña';
export const PASSWORD_INPUT_LABEL2 = 'Contraseña';
export const PASSWORD_INPUT_NAME = 'password';

export const SIGN_IN_BUTTON_TEXT = 'Iniciar sesión';
export const SIGN_UP_BUTTON_TEXT = 'Registrarse';
export const LOADING_BUTTON_TEXT = 'Cargando...';
export const CANCEL_BUTTON_TEXT = 'Cancelar';

export const SERVER_ERROR_TEXT = 'Error inesperado en el servidor';

export const NAME_INPUT_LABEL = 'Nombres completos';
export const NAME_INPUT_LABEL2 = 'Nombres';
export const NAME_INPUT_NAME = 'name';

export const LAST_NAME_INPUT_LABEL = 'Apellidos completos';
export const LAST_NAME_INPUT_LABEL2 = 'Apellidos';
export const LAST_NAME_INPUT_NAME = 'lastName';

export const DOCUMENT_INPUT_LABEL = 'Documento de identidad';
export const DOCUMENT_INPUT_LABEL2 = 'Documento';
export const DOCUMENT_INPUT_NAME = 'document';

export const PHONE_INPUT_LABEL = 'Número de celular';
export const PHONE_INPUT_LABEL2 = 'Celular';
export const PHONE_INPUT_NAME = 'phone';

export const BIRTHDATE_INPUT_LABEL = 'Fecha de nacimiento';
export const BIRTHDATE_INPUT_LABEL2 = 'Fecha de nacimiento';
export const BIRTHDATE_INPUT_NAME = 'birthdate';

export const REQUIRED_FIELD_ERROR_TEXT = 'El campo es requerido';
export const MAX_LENGTH_FIELD_ERROR_TEXT = 'El campo debe tener un máximo de caracteres de';
export const MIN_VALUE_FIELD_ERROR_TEXT = 'El valor tiene que ser mayor o igual a 1';
export const PATTERN_ERRORS = {
  name: 'Los nombres solo puede contener letras',
  lastName: 'Los apellidos solo puede contener letras',
  document: 'El documento debe tener entre 7 y 10 dígitos',
  phone: 'El número de celular debe tener un máximo de 13 dígitos, y puede contener el simbolo "+"',
  email: 'El correo debe tener un formato válido',
  password: 'La contraseña debe tener al menos 8 caracteres, una letra mayúscula, una letra minúscula, un número y un carácter especial'
}