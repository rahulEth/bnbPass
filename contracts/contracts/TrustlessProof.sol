// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

contract TrustlessProof {
    // Structure to store proof data
    struct Proof {
        address owner;
        string publicKey;
        string dataHash;
        uint256 timestamp;
    }

    // Mapping from a unique identifier to the proof
    mapping(bytes32 => Proof) public proofs;

    // Event emitted when a new proof is stored
    event ProofStored(bytes32 indexed proofId, address indexed owner, string publicKey, string dataHash, uint256 timestamp);

    // Function to store a new proof
    function storeProof(string memory publicKey, address owner, string memory dataHash) public {
        // Generate a unique identifier for the proof
        bytes32 proofId = keccak256(abi.encodePacked(publicKey, dataHash));

        // Ensure the proof does not already exist
        require(proofs[proofId].timestamp == 0, "Proof already exists");

        // Store the proof
        proofs[proofId] = Proof({
            owner: owner,
            publicKey: publicKey,
            dataHash: dataHash,
            timestamp: block.timestamp
        });
        
        // Emit the event
        emit ProofStored(proofId, msg.sender, publicKey, dataHash, block.timestamp);
    }

    // Function to retrieve a proof by its unique identifier
    function getProof(bytes32 proofId) public view returns (address owner, string memory publicKey, string memory dataHash, uint256 timestamp) {
        Proof memory proof = proofs[proofId];
        require(proof.timestamp != 0, "Proof does not exist");
        return (proof.owner, proof.publicKey, proof.dataHash, proof.timestamp);
    }
}
