import { forwardRef, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserModule } from '../user.module';
import { TaskController } from './task.controller';
import { Task } from './task.model';
import { TaskService } from './task.service';

@Module({
    imports: [forwardRef(() => UserModule), SequelizeModule.forFeature([Task])],
    controllers: [TaskController],
    providers: [TaskService],
    exports: [TaskService]
})
export class TaskModule { }
