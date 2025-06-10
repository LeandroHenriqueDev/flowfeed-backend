import { Body, Controller, Get, HttpCode, HttpStatus, Inject, Post } from "@nestjs/common";
import { Prisma } from "generated/prisma";
import { AuthService } from "./auth.service";


@Controller('auth')
export class AuthController {

    @Inject()
    private readonly auth: AuthService;

    @Post('signin')
    @HttpCode(HttpStatus.OK)
    signin(@Body() body: Prisma.usersCreateInput ) {
        return this.auth.signIn(body)
    }

}