import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventsController } from './events.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from './event.entity';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'admin123',
    database: 'events',
    autoLoadEntities: true,
    entities: [Event],
    synchronize: true,
  }),
  TypeOrmModule.forFeature([Event])
  ],
  
  controllers: [AppController, EventsController],
  providers: [AppService],
})
export class AppModule {}
