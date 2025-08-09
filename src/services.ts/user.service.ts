import { UserRepository } from "../repositories/user.repository";
import createUser, { userPayload } from "../types/user.type";

export class UserService {
    constructor(private userRepository: UserRepository) { }

    async createUser(args: userPayload) {
        const res = await this.userRepository.insertUser(args);
        return res;
    }

    async getUserById(args: userPayload) {
        if (!args.id) throw new Error('ID not found');
        const res = await this.userRepository.findById(args);
        return res;
    }
}