import {Args, Mutation, Parent, Query, ResolveField, Resolver} from '@nestjs/graphql';
import {Job} from './job';
import {JobService} from './jobs.service';
import {JobCreateInput} from './dto/job-create.input';
import {UseGuards} from '@nestjs/common';
import {AdminJwtGuard} from '../auth/jwt.guard';

@Resolver(() => Job)
@UseGuards(AdminJwtGuard)
export class JobResolver {
  constructor(private readonly jobService: JobService) {
  }

  @Mutation(() => Job,{name:'createJob'})
  create(@Args('job') dto: JobCreateInput): Promise<Job> {
    return this.jobService.create(dto);
  }

}
