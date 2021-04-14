import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from './dto/create-user.dto';
import { FindUsersDto } from './dto/find-users.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { DeleteTaskDto } from './task/dto/delete-task.dto';
import { Task } from './task/task.model';
import { TaskService } from './task/task.service';
import { User } from './user.model';

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User)
        private userModel: typeof User,
    ) { }

    async createUser(user: CreateUserDto) {
        // SELECT * FROM "Users" WHERE email = user.email
        const existentUser = await this.userModel.findOne({
            where: { email: user.email }
        });

        if (existentUser) {
            throw new ConflictException('Email já cadastrado');
        }

        return this.userModel.create(user);
    }

    updateUser(id: number, updateUserDto: UpdateUserDto) {
        return this.userModel.update(updateUserDto, { where: { id } });
    }

    findUsers(findUsersDto: FindUsersDto): Promise<User[]> {
        const where: any = {};

        if (findUsersDto.name) {
            where.name = findUsersDto.name;
        }

        if (findUsersDto.email) {
            where.email = findUsersDto.email;
        }

        return this.userModel.findAll({ where });
    }

    findUserById(id: number) {
        return this.userModel.findOne({ where: { id } });
    }

    deleteUser(id: number) {
        return this.userModel.destroy({ where: { id } });
    }

}
