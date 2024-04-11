import express, { NextFunction, Request, Response } from 'express'
import { checkImageRequestIsEx, getFilepath, handleResizeImage, isValidImageSize } from '../../utils'

const imageRouter = express.Router()

imageRouter.use(async (req: Request, res: Response, next: NextFunction) => {
  const query = req.query
  const { filename, width, height } = query

  if (!filename) {
    res.status(400).send('filename parameter is required')
  }
  if (!width) {
    res.status(400).send('width parameter is required')
  }
  if (!height) {
    res.status(400).send('height parameter is required')
  }

  const imageWidth = parseInt(width as string, 10)
  if (!isValidImageSize(imageWidth)) {
    res.status(400).send('Invalid width')
  }

  const imageHeight = parseInt(height as string, 10)
  if (!isValidImageSize(imageHeight)) {
    res.status(400).send('Invalid height')
  }

  try {
    const filePath = getFilepath(filename as string, imageWidth, imageHeight, 'thumb')
    // Check if the file exists
    await checkImageRequestIsEx(filePath)
    return res.status(200).sendFile(filePath)
  } catch (err) {
    // If the file doesn't exist, continue to the next middleware
    next()
  }
})

imageRouter.get('/', async (req: express.Request, res: express.Response): Promise<void> => {
  const query = req.query
  const { filename, width, height } = query

  if (!filename) {
    res.status(400).send('Invalid file name')
  }

  const imageWidth = parseInt(width as string, 10)
  if (!isValidImageSize(imageWidth)) {
    res.status(400).send('Invalid width')
  }

  const imageHeight = parseInt(height as string, 10)
  if (!isValidImageSize(imageHeight)) {
    res.status(400).send('Invalid height')
  }

  const imagePath = getFilepath(filename as string, imageWidth, imageHeight, 'full')
  const outputPath = getFilepath(filename as string, imageWidth, imageHeight, 'thumb')

  try {
    // Check if the file exists
    await checkImageRequestIsEx(imagePath)
  } catch (err) {
    // If the file doesn't exist, send a 404 response
    res.status(404).send('Sorry, the image you are looking for is not found')
  }

  try {
    // Resize the image
    await handleResizeImage(imagePath, outputPath, imageWidth, imageHeight)
    return res.status(200).sendFile(outputPath)
  } catch (err) {
    // If the image is not resized successfully, send a 401 response
    res.status(401).send('Failed to resize the image')
  }
})

export default imageRouter
