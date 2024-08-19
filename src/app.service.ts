// This file contains the bussiness logic and calls the repository which in turn makes the queries to the database
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
