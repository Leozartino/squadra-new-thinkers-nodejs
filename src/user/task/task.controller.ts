import { Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';
import { User } from '../user.model';
import { DeleteTaskDto } from './dto/delete-task.dto';
import { Task } from './task.model';
import { TaskService } from './task.service';

@Controller('users/:id/tasks')
export class TaskController {
    constructor(private taskService: TaskService) { }

    @Post()
    createUser(@Body() task: Task, @Param('id') userId: number) {
        return this.taskService.createTask(task, userId);
    }

    @Get()
    findTasks(@Param('id') userId: number) {
        return this.taskService.findTasks(userId);
    }

    @Delete()
    async deleteTask(@Param('id') userId: number, @Query() deleteTaskDto: DeleteTaskDto) {
        return this.taskService.deleteTask(userId, deleteTaskDto);
    }
}
