/* global describe, it, expect, jest */

const { DynamoDB } = require('..')

const ddb = new DynamoDB()

describe('dynamodb', () => {
  it('should have unit-tests', () => {
    expect(1 + 1).toBe(2)
  })

  it('should be able to put an item', async () => {
    ddb.client.putItem = jest.fn((params, cb) => {
      expect(params).toMatchSnapshot()
      cb(null, true)
    })
    await new Promise((resolve) => {
      ddb.putItem('TEST', { id: 'TEST' }, (err, res) => {
        expect(ddb.client.putItem.mock.calls.length).toBe(1)
        expect(err).toBe(null)
        expect(res).toBe(true)
        ddb.client.putItem.mockReset()
        resolve()
      })
    })
  })

  it('should be able to put an item, with promise', async () => {
    ddb.client.putItem = jest.fn((params, cb) => {
      expect(params).toMatchSnapshot()
      cb(null, true)
    })
    const res = await ddb.putItem('TEST', { id: 'TEST' })
    expect(ddb.client.putItem.mock.calls.length).toBe(1)
    expect(res).toBe(true)
    ddb.client.putItem.mockReset()
  })
})
