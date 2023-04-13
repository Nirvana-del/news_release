import { In } from "typeorm";
import { RoleSubKeyRepository } from "../data-source";
import { SubRightRepository } from "../data-source";
import { RightRepository } from "../data-source";
import { RoleRightKeyRepository } from "../data-source";
import { RoleRightKey } from "../entity/RoleRightKey";
import { RoleSubKey } from "../entity/RoleSubKey";

export class Tool {
    public static async getRightsAndSubRights(roleId: string){
        const rightKeyMap = await RoleRightKeyRepository.find({
            where: {
              roleId,
            },
          });
          const subKeyMap = await RoleSubKeyRepository.find({
            where: {
              roleId,
            },
          });
          const rightKeyList = rightKeyMap.map((rightKey: RoleRightKey) => rightKey.rightId);
    
          const subKeyList = subKeyMap.map((subKey: RoleSubKey) => subKey.subRightId);
    
          const rightList = await RightRepository.find({
            where: {
              id: In(rightKeyList),
            },
          });
          const subList = await SubRightRepository.find({
            where: {
              id: In(subKeyList),
            },
          });
          return {
            rightList,
            subList
          }
    }
}