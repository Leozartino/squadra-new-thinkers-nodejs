import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UserService } from '../user.service';
import { DeleteTaskDto } from './dto/delete-task.dto';
import { Task } from './task.model';

@Injectable()
export class TaskService {

    constructor(
        private userService: UserService,

        @InjectModel(Task)
        private taskModel: typeof Task,
    ) { }

    async createTask(task: Task, userId: number) {
        const user = await this.userService.findUserById(userId);

        if (!user) {
            throw new BadRequestException('O usuário não foi cadastrado');
        }

        let dataAtual = new Date();
        return this.taskModel.create({ "userId": +userId, "date": dataAtual, ...task });
    }

    findTasks(userId: number) {
        return this.taskModel.findAll({ where: { userId } });
    }

    deleteTask(userId: number, deleteTaskDto: DeleteTaskDto) {
        const where: any = {};
        where.userId = userId;

        if (deleteTaskDto.taskId) {
            where.id = deleteTaskDto.taskId;
        }

        return this.taskModel.destroy({ where });
    }
}
