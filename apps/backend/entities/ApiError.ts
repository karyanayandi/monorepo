class ApiError extends Error {
  code: number;
  status: boolean;

  constructor(code: number, message: string) {
    super(message);
    this.code = code;
    this.status = false;
  }
}

export default ApiError;
