import { RideTypeIn } from "../domain/dto/ride-type.model";
import { RideType } from "../domain/ride-type.model";
import { IRideTypeRepository } from "../ports/ride-type/ride-type-repository.port";
import { IRideTypeService } from "../ports/ride-type/ride-type-service.port";

export class RideTypeService implements IRideTypeService{

    constructor(private _rideTypeRepo:IRideTypeRepository){}

    async addRideType(rideTypeIn: RideTypeIn): Promise<RideType> {
        const newType = await this._rideTypeRepo.create(rideTypeIn)
        return newType
    }

    async updateRideType(id: string, rideTypeIn: RideTypeIn): Promise<RideType> {
        const typeUpdated =  this._rideTypeRepo.update(id, rideTypeIn)
        return typeUpdated
    }

    async deleteRideType(id: string): Promise<RideType> {
        const typeDeleted = this._rideTypeRepo.delete(id)
        return typeDeleted
    }

    async findRideTypeById(id: string): Promise<RideType> {
        const typeFound = this._rideTypeRepo.findById(id)
        return typeFound
    }

    async findAllRideTypes(): Promise<RideType[]> {
        const types = this._rideTypeRepo.findAll()
        return types
    }

}