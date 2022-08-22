import {BadRequestException, Injectable, UnauthorizedException} from '@nestjs/common';
import {Admin} from '../admin/admin';
import {JwtService} from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import {AdminService} from '../admin/admin.service';
import {AdminRegisterInput} from './dto/adminregister.input';
import {AdminLoginInput} from './dto/adminlogin.input';
import {ObjectId} from 'mongodb';


@Injectable()
export class AuthService {
  constructor(private readonly adminService: AdminService,
  
              private readonly jwtService: JwtService) {
  }

  public async register(dto: AdminRegisterInput): Promise<Admin> {
    const admin = await this.adminService.getOneByEmail(dto.email);
    if (admin) throw new BadRequestException(`admin with email '${dto.email}' already exists`);
    dto.password = await this.encodePassword(dto.password);
    return this.adminService.create(dto as Admin);
  }

 
  public async login(dto: AdminLoginInput): Promise<string> {
    const admin = await this.adminService.getOneByEmail(dto.email);
    if (!admin) throw new BadRequestException(`Incorrect email`);
    const isPassCorrect = await bcrypt.compare(dto.password, admin.password);
    if (!isPassCorrect) throw new BadRequestException('Incorrect password');
    return this.jwtService.sign({sub: admin._id});
  }

  public validateAdmin(id: ObjectId): Promise<Admin> {
    return this.adminService.getOneByIdOrFail(id);
      //  .catch(() => {
      //    throw new UnauthorizedException();
      //  });
  }

  private async encodePassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
  }
}
