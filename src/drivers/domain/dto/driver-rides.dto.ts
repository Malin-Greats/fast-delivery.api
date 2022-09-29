export interface IDriverID{
    driver_id:string
}
export interface  IDriverChangeRideState extends IDriverID{
    ride_id:string
}
export interface  IDriverChangeRequestState extends IDriverID{
    request_id:string
}