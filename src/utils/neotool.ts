/**
 * verifyPublicKey 验证公钥
 * @param publicKey 公钥
 */
export const verifyPublicKey = ( publicKey: string ) =>
{
    const array: Uint8Array = Neo.Cryptography.Base58.decode( publicKey );
    // var hexstr = array.toHexString();
    // var salt = array.subarray(0, 1);
    // var hash = array.subarray(1, 1 + 20);
    const check = array.subarray( 21, 21 + 4 ); //

    const checkdata = array.subarray( 0, 21 );//
    let hashd = Neo.Cryptography.Sha256.computeHash( checkdata );//
    hashd = Neo.Cryptography.Sha256.computeHash( hashd );//
    hashd = hashd.slice( 0, 4 );//
    const checked = new Uint8Array( hashd );//

    let error = false;
    for ( let i = 0; i < 4; i++ )
    {
        if ( checked[i] !== check[i] )
        {
            error = true;
            break;
        }
    }
    return !error;
}