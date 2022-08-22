import {Injectable} from '@nestjs/common';
import {Admin} from './admin';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {BaseService} from '../common/base.service';
import {Constants} from '../common/constants';
import {ObjectId} from 'mongodb';

@Injectable()
export class AdminService extends BaseService<Admin> {
  constructor(@InjectModel(Constants.AdminRef) adminModel: Model<Admin>) {
    super(adminModel);
  }

  public async getOneByIdOrFail(id: ObjectId): Promise<Admin> {
    return super.getOneOrFail({_id: id});
  }

  public async getOneById(id: ObjectId): Promise<Admin> {
    return super.getOne({_id: id});
  }

  public getOneByEmail(email: string): Promise<Admin> {
    return super.getOne({email});
  }

  public create(admin: Admin): Promise<Admin> {
    return super.createOne(admin);
  }

  public async getByIds(ids: ObjectId[]): Promise<Admin[]> {
    return super.getMany({_id: {$in: ids}});
  }
}
