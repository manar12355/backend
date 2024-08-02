import { PartialType } from '@nestjs/mapped-types';
import { CreateUsermanagmentDto } from './create-usermanagment.dto';

export class UpdateUsermanagmentDto extends PartialType(CreateUsermanagmentDto) {}
