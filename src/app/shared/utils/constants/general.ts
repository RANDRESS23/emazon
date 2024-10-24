export const EMPTY_STRING = '';
export const ZERO = 0;
export const NAME_REGEX = "^[A-Za-záéíóúÁÉÍÓÚñÑüÜ\s]+$";
export const DOCUMENT_REGEX = "^\\d{7,10}$";
export const PHONE_REGEX = "^\\+?\\d{1,12}$";
export const EMAIL_REGEX = "^[\\w!#$%&'*+/=?`{|}~^.-]+@[\\w.-]+\\.[a-zA-Z]{2,}$";
export const PASSWORD_REGEX = "^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)(?=.*[!@#$%^&*()_+])[A-Za-z\\d!@#$%^&*()_+]{8,}$";

export const SUCCESS_ICON_PATH = '/assets/icons/success-icon.svg';
export const ERROR_ICON_PATH = '/assets/icons/error-icon.svg';
export const WARNING_ICON_PATH = '/assets/icons/warning-icon.svg';
export const ARROW_LEFT_ICON_PATH = '/assets/icons/arrow-left-icon.svg';
export const ARROW_RIGHT_ICON_PATH = '/assets/icons/arrow-right-icon.svg';

export const TOKEN_KEY_LOCAL_STORAGE: string = 'token';
export const LOGED_SUCCESSFULLY_TEXT: string = 'Inicio de sesión exitoso';
export const SIGN_OUT_BUTTON_TEXT: string = 'Cerrar sesión';

export const MENU_ITEMS_ADMIN: Record<string, string>[] = [
  {
    label: 'Inicio',
    path: '/perfil/admin/inicio'
  },
  {
    label: 'Categorías',
    path: '/perfil/admin/panel-categoria'
  },
  {
    label: 'Marcas',
    path: '/perfil/admin/panel-marca'
  },
  {
    label: 'Productos',
    path: '/perfil/admin/panel-producto'
  },
  {
    label: 'Auxiliares de Bodega',
    path: '/perfil/admin/panel-auxiliar-bodega'
  }
]
export const MENU_ITEMS_WAREHOUSE_ASSISTANT: Record<string, string>[] = [
  {
    label: 'Inicio',
    path: '/perfil/auxiliar-bodega/inicio'
  },
  {
    label: 'Suministros',
    path: '/perfil/auxiliar-bodega/panel-suministro'
  }
]