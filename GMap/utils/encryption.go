package utils

import (
	"bytes"
	"crypto/aes"
	"crypto/cipher"
	"crypto/rand"
	"encoding/hex"
	"errors"

	// "fmt"
	"io"
)

var encrypt_iv = "w4MES8aqbg-91sM3"
var encrypt_key = "CqTl98O6uxGyGNzO"

func encryptText(plaintext string) (string, error) {
	plaintextBytes := []byte(plaintext)

	// Generate a new initialization vector (IV) for AES-CBC encryption
	//iv := make([]byte, aes.BlockSize)
	key := []byte(encrypt_iv)
	iv := []byte(encrypt_key)
	if _, err := io.ReadFull(rand.Reader, iv); err != nil {
		return "", err
	}

	block, err := aes.NewCipher(key)
	if err != nil {
		return "", err
	}

	// Pad the plaintext to a multiple of the block size
	plaintextBytes = pad(plaintextBytes, aes.BlockSize)

	ciphertext := make([]byte, aes.BlockSize+len(plaintextBytes))
	copy(ciphertext[:aes.BlockSize], iv)

	cbc := cipher.NewCBCEncrypter(block, iv)
	cbc.CryptBlocks(ciphertext[aes.BlockSize:], plaintextBytes)

	return hex.EncodeToString(ciphertext), nil
}

func decryptText(ciphertext string) (string, error) {
	ciphertextBytes, err := hex.DecodeString(ciphertext)
	if err != nil {
		return "", err
	}

	if len(ciphertextBytes) < aes.BlockSize {
		return "", errors.New("ciphertext too short")
	}

	//iv := ciphertextBytes[:aes.BlockSize]
	key := []byte(encrypt_iv)
	iv := []byte(encrypt_key)
	ciphertextBytes = ciphertextBytes[aes.BlockSize:]

	block, err := aes.NewCipher(key)
	if err != nil {
		return "", err
	}

	if len(ciphertextBytes)%aes.BlockSize != 0 {
		return "", errors.New("ciphertext is not a multiple of the block size")
	}

	cbc := cipher.NewCBCDecrypter(block, iv)
	cbc.CryptBlocks(ciphertextBytes, ciphertextBytes)

	plaintextBytes, err := unpad(ciphertextBytes)
	if err != nil {
		return "", err
	}

	return string(plaintextBytes), nil
}

func pad(src []byte, blockSize int) []byte {
	padding := blockSize - len(src)%blockSize
	padtext := bytes.Repeat([]byte{byte(padding)}, padding)
	return append(src, padtext...)
}

func unpad(src []byte) ([]byte, error) {
	length := len(src)
	padding := int(src[length-1])
	if padding > length {
		return nil, errors.New("invalid padding")
	}
	return src[:length-padding], nil
}
