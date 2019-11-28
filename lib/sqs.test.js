/* global describe, it, expect, jest */

const { SQS } = require('..')

const sqs = new SQS()

describe('sqs', () => {
  it('should have unit-tests', () => {
    expect(1 + 1).toBe(2)
  })

  it('should be able to send a message', async () => {
    sqs.client.sendMessage = jest.fn((params, cb) => {
      expect(params).toMatchSnapshot()
      cb(null, true)
    })
    await new Promise((resolve) => {
      sqs.sendMessage('TEST', 'testing', (err, res) => {
        expect(sqs.client.sendMessage.mock.calls.length).toBe(1)
        expect(err).toBe(null)
        expect(res).toBe(true)
        sqs.client.sendMessage.mockReset()
        resolve()
      })
    })
  })
})
