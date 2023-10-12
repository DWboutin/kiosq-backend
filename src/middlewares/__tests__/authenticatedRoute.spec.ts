import { authenticatedRoute } from '@/middlewares/authenticatedRoute'
import { EnvVariableGetter } from '@/utils/EnvVariableGetter'
import { generateJWTToken } from '@/utils/generateJWTTokens'
import { readJWTToken } from '@/utils/readJWTToken'
import { Mock, afterEach, beforeEach, describe, expect, it, mock, spyOn } from 'bun:test'
import { NextFunction, Request, Response } from 'express'

describe('middlewares', () => {
  describe('authenticatedRoute', () => {
    let req: Request
    let res: Response
    let next: NextFunction

    beforeEach(() => {
      req = {} as any as Request
      res = {
        status: mock(() => res),
        json: mock(() => {}),
      } as any as Response
      next = mock(() => {})
    })

    it('should set req.user and call next if token is valid', async (done) => {
      const accessTokenSecret = EnvVariableGetter.get('JWT_ACCESS_SECRET')
      const token = await generateJWTToken({ id: 'test' }, '1d', accessTokenSecret)

      req.headers = { authorization: `Bearer ${token}` } as any
      await authenticatedRoute(req, res, next)

      expect(next).toHaveBeenCalled()
      expect(req).toHaveProperty('user')
      expect(req.user).toHaveProperty('id', 'test')

      done()
    })

    it('should send a 401 status on wrong token', async (done) => {
      req.headers = { authorization: `Bearer test-token` } as any
      await authenticatedRoute(req, res, next)

      expect(next).not.toHaveBeenCalled()
      expect(res.status).toHaveBeenCalled()
      expect(res.json).toHaveBeenCalled()

      done()
    })
  })
})
