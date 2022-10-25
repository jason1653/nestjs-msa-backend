import { Test, TestingModule } from '@nestjs/testing';
import { ClientsModule, Transport, ClientProxy } from '@nestjs/microservices';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;
  let client: ClientProxy;

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
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    console.log('OK');
    it('getHello()', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });

    it('getAnalytics()', () => {
      const result = () => {
        return appController.getAnalytics();
      };

      expect(result).toBe('test');
      // expect(appController.getAnalytics()).toBe('test');
    });
  });
});
