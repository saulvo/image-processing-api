import path from 'path'
import request from 'supertest'
import app from '../index'
import { handleResizeImage } from '../utils'

describe('1. Test endpoint response', function (): void {
  it('Gets the /api/images endpoint', async function (): Promise<void> {
    const response = await request(app).get('/api/images').query({
      filename: 'test',
      width: '100',
      height: '100',
      test: 'yes'
    })

    expect(response.status).toEqual(200)
  })
})

describe('2. Image transform function should resolve or reject', (): void => {
  it('Expect transform function to not throw an error', async (): Promise<void> => {
    const imgPath = `${path.join(__dirname, '../../assets/full/')}palmtunnel.jpg`
    const filePath = `${path.join(__dirname, '../../assets/thumb/')}test_thumb_100_100.jpg`
    await handleResizeImage(imgPath, filePath, 100, 100)
  })

  it('Expect transform function to throw an error', async (): Promise<void> => {
    const imgPath = `${path.join(__dirname, '../../assets/full/')}dont-exist.jpg`
    const filePath = `${path.join(__dirname, '../../assets/thumb/')}test_thumb_100_100.jpg`

    let error

    try {
      await handleResizeImage(imgPath, filePath, 100, 100)
    } catch (e) {
      error = e
    }
    const expectedError = new Error('failed to resize image')
    expect(error).toEqual(expectedError)
  })
})
