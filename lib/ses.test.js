/* global describe, it, expect, jest */

const { SES } = require('..')

const ses = new SES()

describe('ses', () => {
  it('should have unit-tests', () => {
    expect(1 + 1).toBe(2)
  })

  it('should be able to send an email', async () => {
    ses.client.sendEmail = jest.fn((params, cb) => {
      expect(params).toMatchSnapshot()
      cb(null, true)
    })
    await new Promise((resolve) => {
      ses.sendEmail(
        'konsumer@jetboystudio.com',
        'konsumer@jetboystudio.com',
        'TESTING',
        'This is a test.',
        '<p>This is a test.</p>',
        (err, res) => {
          expect(ses.client.sendEmail.mock.calls.length).toBe(1)
          expect(err).toBe(null)
          expect(res).toBe(true)
          resolve()
        }
      )
    })
  })
})
