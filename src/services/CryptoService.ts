import * as cryptojs from 'crypto-js';
import dotenv from 'dotenv';

dotenv.config()

export class CryptoService {

    private readonly keyUtf8: string = process.env.KEY_UTF8
    private readonly ivUtf8: string = process.env.IV_UTF8

    encrypt(value: string): string {
        return cryptojs.AES.encrypt(value, this.keyUtf8, { iv: this.ivUtf8 }).toString()
    }

    decrypt(value: string): string {
        return cryptojs.AES.decrypt(value, this.keyUtf8, { iv: this.ivUtf8 }).toString(cryptojs.enc.Utf8);
    }
}
