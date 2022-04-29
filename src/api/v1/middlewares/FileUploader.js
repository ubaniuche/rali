import { BadRequestError } from "../helpers/exceptions"
import ServerResponse from "../helpers/ServerResponse"

const ALLOWED_MIME_TYPES = [ 'image/jpeg', 'image/png' ]

const PUBLIC_DIRECTORY = __dirname + '/../public/'

export default class FileUploader {
    static uploadSingle (fieldName) {
        return (req, res, next) => {
            try {
                if (!req.files) throw new BadRequestError(`No file uploaded`)
                
                const image = req.files[`${fieldName}`]
                
                if (!image) throw new BadRequestError(`${fieldName} must contain an image type`)

                if (!ALLOWED_MIME_TYPES.includes(image.mimetype)) throw new BadRequestError(`${fieldName} must be of either jpeg or png format`)

                const uploadPath = PUBLIC_DIRECTORY + Date.now() + image.name

                image.mv(uploadPath, (error) => { if (error) throw new Error(error) })

                req.body.image_url = uploadPath

                next()

            } catch (error) {
                return ServerResponse.failure(req, res, error)
            }
        }
    }
}