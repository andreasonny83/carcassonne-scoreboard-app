declare module 'jwk-to-pem' {
  export interface JWK {
    kty: string;
    n: string;
    e: string;
  }

  export default function jwkToPem(jwk: JWK): string;
}
