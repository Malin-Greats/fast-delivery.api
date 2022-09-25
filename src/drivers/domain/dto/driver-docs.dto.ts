import { DriverDocuments } from "../driver-docs.model"

export interface DriverDocumentsIn{
    driver_id:string
    personalID:string
    drivers_license:string
    background_check:string
    profile_photo:string
}

export interface DriverDocumentsOut{
    personalID:string
    drivers_license:string
    background_check:string
    profile_photo:string
}

export function NewDriverDocuments({driver_id, personalID, drivers_license, background_check, profile_photo}:DriverDocumentsIn):DriverDocuments{
    const documents = new DriverDocuments()
    documents.driver_id=driver_id
    documents.drivers_license=drivers_license
    documents.profile_photo=profile_photo
    documents.personalID=personalID
    documents.background_check=background_check
    return documents
}

export function toDriverDocumentsOut({ personalID, drivers_license, background_check, profile_photo}:DriverDocuments):DriverDocumentsOut{
    const  documentsOut:DriverDocumentsOut ={
        personalID,
        drivers_license,
        background_check,
        profile_photo
    }
    return   documentsOut
}