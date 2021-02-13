const NodeRSA = require('node-rsa')
const key = new NodeRSA({b: 1024});

publicKeyStr = '-----BEGIN PUBLIC KEY-----\n' +
'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCJR3HiWUjhjqB6KyrQ/eSIrXcc\n' +
'uBeL9YZoYbO7yONjVktw0//LGOG+LN9Cyq15USuMO5G/S9aw6Ry5yYCbf5qg1h3R\n' +
'9rrs3bBOEACcP37itsguMTbu1VqCKpE7e5CycehtrrJl/d7zHl9snSolaP7Hmr46\n' +
'nAJGLXOcX2zmlbNZgQIDAQAB\n' +
'-----END PUBLIC KEY-----'


privateKeyStr =  '-----BEGIN RSA PRIVATE KEY-----\n' +
'MIICXQIBAAKBgQCJR3HiWUjhjqB6KyrQ/eSIrXccuBeL9YZoYbO7yONjVktw0//L\n'+
'GOG+LN9Cyq15USuMO5G/S9aw6Ry5yYCbf5qg1h3R9rrs3bBOEACcP37itsguMTbu\n'+
'1VqCKpE7e5CycehtrrJl/d7zHl9snSolaP7Hmr46nAJGLXOcX2zmlbNZgQIDAQAB\n'+
'AoGAH4Mq/U6JkF1xMRofpgHiKA3Jven0XchqpiNnYr/mkrMIdknz+ecoSsN6LJbh\n'+
'42til7pE5qi+C7Y3Rd6fixJrqBB4Nh0uWr0EcP6nQTUlBAKVb3+oV89DdS36aMVY\n'+
'ewNiu3FR6h9u6lUC0SjVhI81h0dD0Hcod1tUbnUHmapTWxECQQDhTCwYoS1X/VPC\n'+
'TJzsMeYqB7t1L8p5jLBiUa03BRLV8GPHxSR8D0OuE2Q82mlWJm5TeWqm1hu8dH9d\n'+
'AffQfd4PAkEAm/yfTzhPxFWxFC6oDoPlnjhqNR8twjBw5gAjeYxduQD5s4NaZYu5\n'+
'ch2BipqEPw2aVkJMZtQcw23lX7Payz/fbwJBANvM9tBontZTPh43pHkDDaw/svFX\n'+
'WNBRI9woFzewaXnzd0V03m1ybvMr1AVSiKYWBFjIAfcWuCSZ+4//1YfA5J0CQQCX\n'+
'0H6cc4nu5Be8NMyLlANewjlcCkRWwx6eO3RLUDnHXROpiyXnvt12GxGA/HHJjEux\n'+
'uETzr21vJv4e7sT7G+cxAkBPSTnqEOCi8a2xlUHEv2Lbgrh5tbSfRKjySOaQULkY\n'+
'wKmvIyceg+WcHF1zyMNpCZwtb1GWTDUsUaNcOU0VCcbK\n'+
'-----END RSA PRIVATE KEY-----'


publicKey = new NodeRSA(publicKeyStr)
privateKey = new NodeRSA(privateKeyStr)



module.exports = {publicKey, privateKey}