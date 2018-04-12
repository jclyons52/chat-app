import { Component } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

@Component()
export class AuthService {
    async createToken() {
        const expiresIn = 60 * 60;
        const secretOrKey = 'secret';
        const user = { email: 'john@doe.com' };
        const token = jwt.sign(user, secretOrKey, { expiresIn });
        return {
            expires_in: expiresIn,
            access_token: token,
        };
    }

    async validateUser(signedUser): Promise<boolean> {
        return true;
    }
}