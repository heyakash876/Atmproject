// SPDX-License-Identifier:MIT
pragma solidity ^0.8.9;

//import "hardhat/console.sol";

contract Assessment {
    address payable public owner;
    uint256 public balance;
    mapping(address => uint256) private userAccount;
     mapping(address => uint256) private balances;
    event Deposit(uint256 amount);
    event Withdraw(uint256 amount);
    event BalanceMultiplied(uint256 previousBalance, uint256 newBalance);
    mapping(address => bool) private activeAccounts;

    constructor(uint initBalance) payable {
        owner = payable(msg.sender);
        balance = initBalance;
    }

    function getBalance() public view returns (uint256) {
        return balance;
    }

    function deposit(uint256 _amount) public payable {
        uint _previousBalance = balance;

        // makes sure this is the owner
        require(msg.sender == owner, "You are not the owner of this account");

        // perform transaction
        balance += _amount;

        // assert transaction completed successfully
        assert(balance == _previousBalance + _amount);

        // emit the event
        emit Deposit(_amount);
    }

  

    // custom error
    error InsufficientBalance(uint256 balance, uint256 withdrawAmount);

    function withdraw(uint256 _withdrawAmount) public {
        require(msg.sender == owner, "You are not the owner of this account");
        uint _previousBalance = balance;
        if (balance < _withdrawAmount) {
            revert InsufficientBalance({
                balance: balance,
                withdrawAmount: _withdrawAmount
            });
        }

        // withdraw the given amount
        balance -= _withdrawAmount;

        // assert the balance is correct
        assert(balance == (_previousBalance - _withdrawAmount));

        // emit the event
        emit Withdraw(_withdrawAmount);
    }

    function multiplyBalance(uint256 _multiplier) public {
        // make sure this is the owner
        require(msg.sender == owner, "You are not the owner of this account");

        uint256 _previousBalance = balance;

        // multiply the balance
        balance *= _multiplier;

        // assert the balance is correct
        assert(balance == _previousBalance * _multiplier);

        // emit the event
        emit BalanceMultiplied(_previousBalance, balance);
    }
    function canAfford(uint256 amount) public view returns (bool) {
        return balances[msg.sender] >= amount; 
    }
     function isActiveAccount() public view returns (bool) {
        return activeAccounts[msg.sender];
    }
}

