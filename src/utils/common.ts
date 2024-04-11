import fs from 'fs'
import path from 'path'
import sharp from 'sharp'

export const getFilepath = (filename: string, width: number, height: number, dirname: 'full' | 'thumb'): string => {
  if (dirname === 'full') {
    return `${path.join(__dirname, `../../assets/${dirname}/`) + filename}.jpg`
  }
  return `${path.join(__dirname, `../../assets/${dirname}/`) + filename}_thumb_${width}_${height}.jpg`
}

export const checkImageRequestIsEx = (imgPath: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    fs.access(imgPath, fs.constants.F_OK, (err) => {
      if (err) {
        reject(new Error('Image not found'))
      }
      resolve('Image found')
    })
  })
}

export const isValidImageSize = (size: number): boolean => !isNaN(size) && size > 0

export const handleResizeImage = async (
  imagePath: string,
  outputPath: string,
  imageWidth: number,
  imageHeight: number
): Promise<void> => {
  try {
    await sharp(imagePath).resize(imageWidth, imageHeight, { fit: 'cover' }).toFile(outputPath)
  } catch (e) {
    throw new Error('Failed to resize the image')
  }
}
