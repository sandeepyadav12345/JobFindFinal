import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {AdminSchema} from './admin';
import {AdminService} from './admin.service';
import {Constants} from '../common/constants';

@Module({
  imports: [MongooseModule.forFeature([{name: Constants.AdminRef, schema: AdminSchema}])],
  providers: [AdminService],
  exports: [AdminService]
})
export class AdminModule {
}
