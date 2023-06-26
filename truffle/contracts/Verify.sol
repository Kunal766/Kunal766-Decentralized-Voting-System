// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

contract VerifySignature {
    function verifySignature(
        address _signer,
        bytes32 _messageHash,
        bytes memory _signature
    ) public pure returns (bool) {
        bytes32 r;
        bytes32 s;
        uint8 v;
        if (_signature.length != 65) {
            return false;
        }
        assembly {
            r := mload(add(_signature, 32))
            s := mload(add(_signature, 64))
            v := byte(0, mload(add(_signature, 96)))
        }
        if (v < 27) {
            v += 27;
        }
        if (v != 27 && v != 28) {
            return false;
        }
        bytes32 hash = keccak256(
            abi.encodePacked("\x19Ethereum Signed Message:\n32", _messageHash)
        );
        address signer = ecrecover(hash, v, r, s);
        return signer == _signer;
    }
}
