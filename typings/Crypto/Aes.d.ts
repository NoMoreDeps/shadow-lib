export declare class AES {
    /** Sbox is pre-computed multiplicative inverse in GF(2^8) used in SubBytes*/
    protected Sbox: Array<number>;
    /** Rcon is Round Constant used for the Key Expansion [1st col is 2^(r-1) in GF(2^8)] [§5.2] */
    protected Rcon: Array<Array<number>>;
    protected Cipher(input: Array<number>, w: Array<Array<number>>): any[];
    /** apply SBox to state S [§5.1.1] */
    protected SubBytes(s: Array<Array<number>>, Nb: number): number[][];
    /** shift row r of state S left by r bytes [§5.1.2] */
    protected ShiftRows(s: Array<Array<number>>, Nb: number): number[][];
    /** combine bytes of each col of state S [§5.1.3] */
    protected MixColumns(s: Array<Array<number>>, Nb: number): number[][];
    /** xor Round Key into state S [§5.1.4] */
    protected AddRoundKey(state: Array<Array<number>>, w: Array<Array<number>>, rnd: number, Nb: number): number[][];
    /** generate Key Schedule (byte-array Nr+1 x Nb) from Key [§5.2] */
    protected KeyExpansion(key: Array<number>): any[];
    /** apply SBox to 4-byte word w */
    protected SubWord(w: Array<number>): number[];
    /** rotate 4-byte word w left by one byte */
    protected RotWord(w: Array<number>): number[];
    /**
     * Encrypt a text using AES encryption in Counter mode of operation
     *  - see http://csrc.nist.gov/publications/nistpubs/800-38a/sp800-38a.pdf
     *
     * Unicode multi-byte character safe
     *
     * @param plaintext source text to be encrypted
     * @param password  the password to use to generate a key
     * @param nBits     number of bits to be used in the key (128, 192, or 256)
     * @return          encrypted text
     */
    protected encrypt(plaintext: string, password: string, nBits: number): string;
    /**
     * Decrypt a text encrypted by AES in counter mode of operation
     *
     * @param ciphertext source text to be encrypted
     * @param password   the password to use to generate a key
     * @param nBits      number of bits to be used in the key (128, 192, or 256)
     * @return           decrypted text
     */
    protected decrypt(ciphertext: string | Array<string>, password: string, nBits: number): string;
    /**128 bits shortcut */
    to128(textToEncrypt: string, password: string): string;
    from128(encryptedText: string, password: string): string;
    /**192 bits shortcut */
    to192(textToEncrypt: string, password: string): string;
    from192(encryptedText: string, password: string): string;
    /**256 bits shortcut */
    to256(textToEncrypt: string, password: string): string;
    from256(encryptedText: string, password: string): string;
}
