import {Injectable} from '@nestjs/common';
import {Job} from './job';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {BaseService} from '../common/base.service';
import {Constants} from '../common/constants';
import { JobCreateInput } from './dto/job-create.input';

@Injectable()
export class JobService extends BaseService<Job> {
  constructor(@InjectModel(Constants.JobRef) jobModel: Model<Job>) {
    super(jobModel);
  }

  async create( dto: JobCreateInput): Promise<Job> {
    return super.createOne({...dto} as Job);
  }

}
