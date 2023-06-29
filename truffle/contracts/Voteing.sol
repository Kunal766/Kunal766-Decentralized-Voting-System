// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.2 <0.9.0;

contract vote {
    address public admin;
    address[] public voterlist;
    mapping(address => bool) public isVoted;
    string[] public options;
    mapping(string => uint) public votes;

    string public winner = "kunal";
    uint private maxVote = 0;


    constructor() {
        admin = msg.sender;
        voterlist.push(0x107dB54211D55001D2b3D66ea0b67b50dA9c3d38);
        voterlist.push(0x18e7aa6e40af711Ae27E1643A4A08e13588c5B83);
        options.push("Modi");
        options.push("Rahul");

        for (uint i = 0; i < voterlist.length; i++) {
            isVoted[voterlist[i]] = true;
        }

        for (uint i = 0; i < options.length; i++) {
            votes[options[i]] = 0;
        }
    }

    function optionsList() public view returns (string[] memory) {
        return options;
    }

    modifier onlyadmin() {
        require(msg.sender == admin, "You are not the admin");
        _;
    }

    function addOption(string memory _option) public onlyadmin {
        options.push(_option);
        votes[_option] = 0;
    }

    function addVoter(address _voter) public onlyadmin {
        voterlist.push(_voter);
        isVoted[_voter] = true;
    }

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

    function Vote(
        address _signer,
        bytes32 _messageHash,
        bytes memory _signature,
        string memory option
    ) public {
        require(isVoted[_signer]);
        require(verifySignature(_signer, _messageHash, _signature));
        votes[option]++;
        if (maxVote < votes[option]) {
            maxVote = votes[option];
            winner = option;
        }
        isVoted[_signer] = false;
    }

}
