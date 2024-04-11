import path from 'path'
import request from 'supertest'
import app from '../index'
import { getFilepath, handleResizeImage } from '../utils'

describe('1. Test endpoint response', function (): void {
  it('Gets the /api/images endpoint', async function (): Promise<void> {
    const response = await request(app).get('/api/images').query({
      filename: 'encenadaport',
      width: '100',
      height: '100',
      test: 'yes'
    })

    expect(response.status).toEqual(200)
  })
})

describe('2. Image transform function should resolve or reject', (): void => {
  it('Expect transform function to not throw an error', async (): Promise<void> => {
    const imagePath = getFilepath('encenadaport', 100, 100, 'full')
    const outputPath = getFilepath('test_thumb_100_100', 100, 100, 'thumb')
    await handleResizeImage(imagePath, outputPath, 100, 100)
  })

  it('Expect transform function to throw an error', async (): Promise<void> => {
    const imagePath = getFilepath('dont-exist', 100, 100, 'full')
    const outputPath = getFilepath('test_thumb_100_100', 100, 100, 'thumb')

    let error

    try {
      await handleResizeImage(imagePath, outputPath, 100, 100)
    } catch (e) {
      error = e
    }
    const expectedError = new Error('Failed to resize the image')
    expect(error).toEqual(expectedError)
  })
})
