import {Role} from "@/views/permission-manage/types/role";

export interface User {
    id: string;
    username: string;
    password: number;
    roleState: boolean;
    // default: boolean;
    userDefault: boolean;
    region: any;
    roleId: number;
    role?: Partial<Role>;
}
