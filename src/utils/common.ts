import fs from 'fs'
import path from 'path'
import sharp, { OutputInfo } from 'sharp'

export const getFilepath = (filename: string, width: number, height: number, dirname: 'full' | 'thumb'): string => {
  if (dirname === 'full') {
    return `${path.join(__dirname, `../../assets/${dirname}/`) + filename}.jpg`
  }
  return `${path.join(__dirname, `../../assets/${dirname}/`) + filename}_thumb_${width}_${height}.jpg`
}

export const checkImageRequestIsEx = (imgPath: string): Promise<string> => fs.promises.readFile(imgPath, 'utf8')

export const isValidImageSize = (size: number): boolean => !isNaN(size) && size > 0

export const handleResizeImage = (
  imagePath: string,
  outputPath: string,
  imageWidth: number,
  imageHeight: number
): Promise<OutputInfo> => sharp(imagePath).resize(imageWidth, imageHeight, { fit: 'cover' }).toFile(outputPath)
