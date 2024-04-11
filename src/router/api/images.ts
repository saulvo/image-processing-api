import express, { NextFunction, Request, Response } from 'express'
import { checkImageRequestIsEx, getFilepath, handleResizeImage, isValidImageSize } from '../../utils'

const imageRouter = express.Router()

imageRouter.use(async (req: Request, res: Response, next: NextFunction) => {
  const query = req.query
  const { filename, width, height } = query

  try {
    const imageWidth = parseInt(width as string, 10)
    const imageHeight = parseInt(height as string, 10)
    const filePath = getFilepath(filename as string, imageWidth, imageHeight, 'thumb')
    await checkImageRequestIsEx(filePath)
    return res.status(200).sendFile(filePath)
  } catch (err) {
    next()
  }
})

imageRouter.get('/', async (req: express.Request, res: express.Response): Promise<void> => {
  const query = req.query
  const { filename, width, height } = query

  try {
    if (!filename) {
      throw new Error('filename parameter is required')
    }

    const imageWidth = parseInt(width as string, 10)
    if (!isValidImageSize(imageWidth)) {
      throw new Error('Invalid width')
    }

    const imageHeight = parseInt(height as string, 10)
    if (!isValidImageSize(imageHeight)) {
      throw new Error('Invalid height')
    }
    const imagePath = getFilepath(filename as string, imageWidth, imageHeight, 'full')
    const outputPath = getFilepath(filename as string, imageWidth, imageHeight, 'thumb')

    await checkImageRequestIsEx(imagePath)
    await handleResizeImage(imagePath, outputPath, imageWidth, imageHeight)
    return res.status(200).sendFile(outputPath)
  } catch (err: any) {
    res.status(400).send(`${err.message}`)
  }
})

export default imageRouter
