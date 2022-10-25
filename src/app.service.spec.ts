import { Test, TestingModule } from '@nestjs/testing';
import { ClientsModule, Transport, ClientProxy } from '@nestjs/microservices';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CreateUserRequest } from './create-user-request.dto';
import { NotFoundError } from 'rxjs';
import { NotFoundException } from '@nestjs/common';

describe('AppService', () => {
  let appService: AppService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [
        ClientsModule.register([
          {
            name: 'COMMUNICATION',
            transport: Transport.TCP,
          },
          {
            name: 'ANALYTICS',
            transport: Transport.TCP,
            options: { port: 3001 },
          },
        ]),
      ],
      providers: [AppService],
    }).compile();

    appService = app.get<AppService>(AppService);
  });

  describe('createUser', () => {
    it('createUser를 실행한다.', () => {
      const createUserRequest: CreateUserRequest = {
        email: 'test@naver.com',
        password: '1111',
      };
      appService.createUser(createUserRequest);
    });

    it('getUser를 가져온다', async () => {
      const result = () => {
        return appService.getAnalytics();
      };

      console.log(result);

      //   await expect(result).rejects.toThrow(
      //     new NotFoundException('유저 정보를 찾을 수 없습니다'),
      //   );
    });
  });
});
