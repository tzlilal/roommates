import { RoommateDetail } from './settings/roommate-detail/roommate-detail.model';
import { UserDetail } from './settings/user-detail/user-detail.model';

export class User {
    constructor(
                public email: string,
                public password: string,
                public firstName?: string,
                public lastName?: string,
                public _id?: string,
                public registryDate?: Date,
                public isActive?: boolean,
                public phoneNumber?: string,
                public userDetail?: UserDetail,
                public roommateDetail?: RoommateDetail,   
                public users?: any[],   
                public imagePath?: string,   
            ) {}
}