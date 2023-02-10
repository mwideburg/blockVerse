import { ObjectTypes } from "../enums/ObjectType.enum"

export class CreateWorldObjectRequestDto{
    length?: number
    width?: number
    depth?: number
    height?: number
    x: number
    y: number
    z: number
    objectType: ObjectTypes
}