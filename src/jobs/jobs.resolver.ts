import {Args, Mutation,  Resolver} from '@nestjs/graphql';
import {Job} from './job';
import {JobService} from './jobs.service';
import {JobCreateInput} from './dto/job-create.input';
import {UseGuards} from '@nestjs/common';
import {JwtGuard} from '../common/jwt.guard';

@Resolver(() => Job)
@UseGuards(JwtGuard)
export class JobResolver {
  constructor(private readonly jobService: JobService) {
  }

  @Mutation(() => Job,{name:'createJob'})
  create(@Args('job') dto: JobCreateInput): Promise<Job> {
    return this.jobService.create(dto);
  }

}
