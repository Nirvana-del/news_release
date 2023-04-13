import { SubRight } from '../entity/SubRight';
import { Right } from '../entity/Right';
import { Tool } from '../utils/Tool';

export default class RoleRightKeyService {
  public static async permissionTree(roleId: string): Promise<Right[]> {
    const { rightList, subList} = await Tool.getRightsAndSubRights(roleId);
    rightList.forEach((right: Right) => {
      const newArr = [] as SubRight[];
      subList.forEach((subRight: SubRight) => {
        if (subRight.rightId === right.id) {
          newArr.push(subRight);
        }
      });
      right.children = newArr;
    });
    return rightList;
  }
}
