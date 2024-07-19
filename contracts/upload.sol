// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract upload{
    // Store accounts and uploaded file list
    mapping (address => string[]) private store_address;

    // Save the account and file info on the blockchain
    event FileUpload(address indexed user, string ipfsHash);
    event FileRemove(address indexed user, string ipfsHash);

    // Uploading file
    function uploadFile(string memory ipfs_hash) public {
        store_address[msg.sender].push(ipfs_hash);
        // Emit the event
        emit FileUpload(msg.sender, ipfs_hash);
    }

    // Removing file
    function removeFile(string memory ipfs_hash) public {
        string[] storage files = store_address[msg.sender];
        bool found = false;
        uint index;

        // Find the index of the file to be removed
        for (uint i = 0; i < files.length; i++) {
            if (keccak256(abi.encodePacked(files[i])) == keccak256(abi.encodePacked(ipfs_hash))) {
                found = true;
                index = i;
                break;
            }
        }

        require(found, "File not found");

        // Remove the file by shifting elements to the left
        for (uint i = index; i < files.length - 1; i++) {
            files[i] = files[i + 1];
        }

        // Remove the last element
        files.pop();

        // Emit the event
        emit FileRemove(msg.sender, ipfs_hash);
    }

    // Getting file
    function getFile(address user) public view returns (string[] memory) {
        return store_address[user];
    }
}
