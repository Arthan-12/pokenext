import { HTTP_STATUS_CODE } from '../enums/status-code-enum';

export const ErrorService = {
  setErrorStatus(errorCode: number) {
    if (errorCode === HTTP_STATUS_CODE.REQUEST_NOT_FOUND) {
      console.error('Pokémon não encontrado!');
    }
  },
};
