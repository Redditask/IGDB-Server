export class CustomResponseDto {
  constructor(status: number, message: string) {
    this.status = status;
    this.message = message;
  }

  private status: number;
  private message: string;
}
