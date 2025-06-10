import { Inject, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { UsersService } from "src/users/services/users.service";
import * as bcrypt from "bcrypt";
import { Prisma } from "generated/prisma";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
    @Inject()
    private readonly users: UsersService
    
    @Inject()
    private readonly jwt: JwtService

    async signIn(data: Prisma.usersCreateInput): Promise<{access_token: string}> {
        const user = await this.users.userFind(data.email);
        
        if(!user){
            throw new NotFoundException("User not found")
        }

        const passwordMatch = await bcrypt.compareSync(data.password_hash, user.password_hash);
        if(!passwordMatch){
            throw new UnauthorizedException("Invalid credentials");
        }

        const payload = {sub: user.id, user: user.email};

        // const { password_hash, ...result } = user

        return { access_token: await this.jwt.signAsync(payload) };
    } 

}