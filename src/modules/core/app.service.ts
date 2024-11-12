import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  public getStatus() {
    return { status: 'ok' };
  }
}
