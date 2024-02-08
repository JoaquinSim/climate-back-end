import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    ParseUUIDPipe,
    Patch,
    Post,
    Put,
    UploadedFile,
    UseGuards,
    UseInterceptors
} from '@nestjs/common';
import {ApiOperation, ApiTags} from '@nestjs/swagger';
import { LoginDto } from '../dto/auth/login.dto';
import { AuthService } from '../services/login.service';
import { ResponseHttpModel } from 'src/shared/models/response-http.model';

@ApiTags('Auth')

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {
    }

    @ApiOperation({summary: 'Login'})
    //@PublicRoute()
    @Post('login')
    @HttpCode(HttpStatus.CREATED)
    async login(@Body() payload: LoginDto): Promise<ResponseHttpModel> {
        
        const serviceResponse = await this.authService.login(payload);

        return {
            data: serviceResponse.data,
            message: 'Correct Access',
            title: 'Welcome',
        };
    }
}