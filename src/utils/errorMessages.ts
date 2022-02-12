export const errorMessages = (msg: string): string | null => {
  let message = null;
  switch (msg) {
    case 'error.service.process.priority.exists':
      message = 'Такий пріоритет вже існує';
      break;
    default:
      message = null;
  }

  return message;
};
