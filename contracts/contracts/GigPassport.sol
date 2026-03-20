// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract GigPassport {
    struct Passport {
        bytes32 dataHash;
        string[] platforms;
        uint256 totalDays;
        uint256 createdAt;
        uint256 updatedAt;
        bool isVerified;
    }

    mapping(address => Passport) public passports;
    mapping(address => uint256[]) public earningRecords;
    uint256 public totalWorkers;

    event PassportCreated(address indexed worker, bytes32 dataHash, uint256 timestamp);
    event EarningRecorded(address indexed worker, uint256 amount, uint256 day);

    modifier onlyPassportHolder() {
        require(passports[msg.sender].createdAt > 0, "No passport found");
        _;
    }

    function createPassport(bytes32 _dataHash, string[] memory _platforms) external {
        require(passports[msg.sender].createdAt == 0, "Passport exists");
        require(_platforms.length > 0, "Need platform");
        passports[msg.sender] = Passport(_dataHash, _platforms, 0, block.timestamp, block.timestamp, false);
        totalWorkers++;
        emit PassportCreated(msg.sender, _dataHash, block.timestamp);
    }

    function recordEarning(uint256 _dailyEarning) external onlyPassportHolder {
        earningRecords[msg.sender].push(_dailyEarning);
        passports[msg.sender].totalDays++;
        passports[msg.sender].updatedAt = block.timestamp;
        emit EarningRecorded(msg.sender, _dailyEarning, block.timestamp);
    }

    function getPassport(address _worker) external view returns (Passport memory) {
        return passports[_worker];
    }

    function getEarningCount(address _worker) external view returns (uint256) {
        return earningRecords[_worker].length;
    }
}
