import {BadRequestException, ForbiddenException, Injectable, UnauthorizedException} from '@nestjs/common';
import {Admin} from '../admin/admin';
import {JwtService} from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import {AdminService} from '../admin/admin.service';
import {AdminRegisterInput} from './dto/adminregister.input';
import {AdminLoginInput} from './dto/adminlogin.input';
import {ObjectId} from 'mongodb';
import { ConfigService } from '@nestjs/config';
import { AdminUpdateInput } from './dto/admin-update.input';
import {  Tokens } from './dto/token.type';


@Injectable()
export class AuthService {
  constructor(private readonly adminService: AdminService,
    
    private configService: ConfigService,
              private readonly jwtService: JwtService) {
  }

  public async register(dto: AdminRegisterInput): Promise<Tokens> {
    const admin = await this.adminService.getOneByEmail(dto.email);
    if (admin) throw new BadRequestException(`admin with email '${dto.email}' already exists`);
    dto.password = await this.encodePassword(dto.password);
    const newAdmin = await this.adminService.create(dto as Admin);
    const tokens = await this.getTokens(newAdmin._id);
    await this.updateRefreshToken(newAdmin._id, tokens.refreshToken);
    return tokens;
  }

 
  public async login(dto: AdminLoginInput):Promise<Tokens> {
    const admin = await this.adminService.getOneByEmail(dto.email);
    if (!admin) throw new BadRequestException(`Incorrect email`);
    const isPassCorrect = await bcrypt.compare(dto.password, admin.password);
    if (!isPassCorrect) throw new BadRequestException('Incorrect password');
   // return this.jwtService.sign({sub: admin._id});
   const tokens = await this.getTokens(admin._id);
    await this.updateRefreshToken(admin._id, tokens.refreshToken);
    return tokens;
  }

  async getTokens(adminId: string) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {

          sub: adminId,
      
        },
        {
          secret: this.configService.get<string>('ACCESS_SECRET'),
          expiresIn: '15m',
        },
      ),
      this.jwtService.signAsync(
        {
          sub: adminId,
          
        },
        {
          secret: this.configService.get<string>('REFRESH_TOKEN_SECRET'),
          expiresIn: '7d',
        },
      ),
    ]);

    return {
      accessToken:accessToken,
      refreshToken:refreshToken,
    }
      
  }

  async updateRefreshToken(adminId: ObjectId, refreshToken: string) {

    await this.adminService.update(adminId, refreshToken);
  }

  async refreshTokens(adminId: ObjectId, refreshToken: string): Promise<Tokens> {
    const admin = await this.adminService.getOneByIdOrFail(adminId);
    if (!admin || !admin.refreshToken)
      throw new ForbiddenException('Access Denied');
    // const refreshTokenMatches = await argon2.verify(
    //   admin.refreshToken,
    //   refreshToken,
    // );
    if (admin.refreshToken != refreshToken) throw new ForbiddenException('Access Denied');
    const tokens = await this.getTokens(admin._id);
    await this.updateRefreshToken(admin._id, tokens.refreshToken);
    return tokens;
  }


  async logout(adminId: ObjectId ) {
    const refreshToken = null;
     await this.adminService.update(adminId,  refreshToken);
     return "logged out successfully";
  }

  public validateAdmin(id: ObjectId): Promise<Admin> {
    return this.adminService.getOneByIdOrFail(id)
       .catch(() => {
         throw new UnauthorizedException();
       });
  }

  private async encodePassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
  }
}
