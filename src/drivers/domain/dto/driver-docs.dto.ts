import { DriverDocuments } from "../driver-docs.model"

export interface DriverDocumentsIn{
    driver_id:string
    national_id:string
    drivers_license:string
    defensive_drivers_license:string
    police_clearance:string
    vehicle_technical_certificate:string
    vehicle_insurance_registration:string
}

export interface DriverDocumentsOut{
    national_id:string
    drivers_license:string
    defensive_drivers_license:string
    police_clearance:string
    vehicle_technical_certificate:string
    vehicle_insurance_registration:string
}

export function NewDriverDocuments({driver_id, national_id, drivers_license, defensive_drivers_license,vehicle_technical_certificate,
    police_clearance ,vehicle_insurance_registration}:DriverDocumentsIn ):DriverDocuments{
    const documents = new DriverDocuments()
    documents.national_id=national_id
    documents.drivers_license=drivers_license
    documents.defensive_drivers_license = defensive_drivers_license
    documents.vehicle_technical_certificate = vehicle_technical_certificate
    documents.vehicle_insurance_registration = vehicle_insurance_registration
    documents.police_clearance=police_clearance
    documents.driver_id =driver_id
    return documents
}

export function toDriverDocumentsOut({national_id, drivers_license, defensive_drivers_license,vehicle_technical_certificate 
    ,vehicle_insurance_registration, police_clearance}:DriverDocuments):DriverDocumentsOut{
    const  documentsOut:DriverDocumentsOut ={
        national_id,
        drivers_license,
        defensive_drivers_license,
        vehicle_technical_certificate,
        vehicle_insurance_registration,
        police_clearance
    }
    return   documentsOut
}