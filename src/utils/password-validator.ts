export function validatePassword(value: string): string {
  switch (true) {
    case value.length < 3:
      return 'A senha deve conter no mínimo 3 caracteres';
    case !/[a-z]/.test(value):
      return 'A senha deve conter no mínimo 1 letra minúscula';
    case !/[A-Z]/.test(value):
      return 'A senha deve conter no mínimo 1 letra maiúscula';
    case !/[0-9]/.test(value):
      return 'A senha deve conter no mínimo 1 número';
    case !/[^a-zA-Z0-9]/.test(value):
      return 'A senha deve conter no mínimo 1 caractere especial';
    default:
      return 'A senha deve conter letras, números e caracteres especiais';
  }
}
