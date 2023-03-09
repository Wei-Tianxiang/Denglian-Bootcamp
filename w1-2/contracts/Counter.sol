//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Counter {
    address public owner;

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function.");
        _;
    }

    uint256 private count;

    function increment() external onlyOwner {
        count += 1;
    }

    function decrement() external onlyOwner {
        count -= 1;
    }

    function reset() external onlyOwner {
        count = 0;
    }

    function getCount() external view onlyOwner returns (uint256) {
        return count;
    }

    function setCount(uint256 _count) external onlyOwner {
        count = _count;
    }

    function add(uint256 _count) external onlyOwner {
        count += _count;
    }

    function sub(uint256 _count) external onlyOwner {
        count -= _count;
    }
}
