class AppError {
  public readonly message: string;

  public readonly status_code: number;

  constructor(message: string, status_code = 400) {
    this.message = message;
    this.status_code = status_code;
  }
}

export default AppError;
