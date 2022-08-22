import { Module} from '@nestjs/common';
import {JobService} from './jobs.service';
import {MongooseModule} from '@nestjs/mongoose';
import {Constants} from '../common/constants';
import {JobSchema} from './job';
import {JobResolver} from './jobs.resolver';

@Module({
  imports: [
    MongooseModule.forFeature([{name: Constants.JobRef, schema: JobSchema}]),
  
  ],
  providers: [JobResolver, JobService],
  exports: [JobService]
})
export class JobModule {
}
