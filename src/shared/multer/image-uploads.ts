import {Request, response, Response, Router} from 'express'
import multer from 'multer'
import * as fs from 'fs'
import * as path from 'path'
import AppError from '../errors/error';
import logger from '../errors/logger';

export const UPLOAD_PROFILE_PATH = 'public/images/profile';
export const UPLOAD_VEHICLE_PATH = 'public/images/vehicle';
export const UPLOAD_DOCS_PATH = 'public/images/documents';
export const UPLOAD_RIDE_TYPES_PATH = 'public/images/ride_types';

export const  profileUrl='http://localhost:5000/images/profile/'
export const  vehicleImgUrl='http://localhost:5000/images/vehicles/'
export const  rideTypesImgUrl='http://localhost:5000/images/ride-types/'
export const  driverDocumentsImgUrl='http://localhost:5000/images/documents/'

const storageProfile = multer.diskStorage({
  destination: function (req:Request, file, cb) {
    cb(null, UPLOAD_PROFILE_PATH)
  },
  filename: function (req,file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, `${file.fieldname }-${uniqueSuffix}`)
  }
})


const storageRideTypes = multer.diskStorage({
  destination: function (req:Request, file, cb) {
    cb(null, UPLOAD_RIDE_TYPES_PATH)
  },
  filename: function (req,file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, `ride_types-${uniqueSuffix}`)
  }
})

const storageVehicle = multer.diskStorage({
    destination: function (req:Request, file, cb) {
      cb(null, UPLOAD_VEHICLE_PATH)
    },
    filename: function (req,file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, `${file.fieldname }-${uniqueSuffix}`)
    }
  })

  const storageDocuments = multer.diskStorage({
    destination: function (req:Request, file, cb) {
        try {
            cb(null, UPLOAD_DOCS_PATH)
        } catch (error) {
            throw error
        }
    },
    filename: function (req,file, cb) {
        try {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
            cb(null, `${file.fieldname }-${uniqueSuffix}`)
        } catch (error) {
            throw error
        }
    }
  })

  export function imagesRouter(){
    const router = Router()
    router.get("/profile/:imageId",async (req:Request, res:Response)=>{
        const id =req.params.imageId
          const raw  =fs.createReadStream(path.join(UPLOAD_PROFILE_PATH,id ))
          raw.on("error", function(err){
            const newErr =<{code:string, path:string}><unknown>err
            if (newErr.code ==="ENOENT"){
              return res.status(400).json ({errors: new AppError(`File doesn't exist. Path: ${newErr.path}`), success:false})
            }
            return res.status(400).json (err)
          })
          raw.pipe(res);
    })
    .get("/vehicles/:imageId",async (req:Request, res:Response)=>{
        const id =req.params.imageId
        try {
          fs.createReadStream(path.join(UPLOAD_VEHICLE_PATH,id )).pipe(res);
        } catch (error) {
          return res.status(500).json (error)
        }
    })
    .get("/documents/:imageId",async (req:Request, res:Response)=>{
        const id =req.params.imageId
        try {
          fs.createReadStream(path.join(UPLOAD_DOCS_PATH,id )).pipe(res);
        } catch (error) {
          return res.status(500).json (error)
        }
    })
    .get("/ride-types/:imageId",async (req:Request, res:Response)=>{
      const id =req.params.imageId
          const raw  =fs.createReadStream(path.join(UPLOAD_RIDE_TYPES_PATH,id ))
          raw.on("error", function(err){
            const newErr =<{code:string, path:string}><unknown>err
            if (newErr.code ==="ENOENT"){
              return res.status(400).json ({errors: new AppError(`File doesn't exist. Path: ${newErr.path}`), success:false})
            }
            return res.status(400).json (err)
          })
          raw.pipe(res);
  })
    return Router().use("/",router)
  }


export function removeFile(path:string):void{
  if (fs.existsSync(path)){
      fs.unlink(path, function (err) {
          logger.info(`File with path: ${path}  deleted!`);
      })
  }
}
export const UploadProfile = multer({ storage: storageProfile })
export const UploadDocuments = multer({ storage: storageDocuments })
export const UploadVehicle = multer({ storage: storageVehicle })
export const UploadRideTypes = multer({ storage: storageRideTypes })