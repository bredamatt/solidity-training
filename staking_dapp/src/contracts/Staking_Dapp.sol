pragma solidity >= 0.8.0 < 0.9.0;

import "./Dummy_Token.sol";
import "./Tether_Token.sol";

contract Staking_Dapp{
	string public name = "Staking Dapp";
	address public owner;
	Dummy public dummy_token;
	Tether public tether_token;

	address[] public stakers;
	mapping(address => uint) public stakingBalance;
	mapping(address => bool) public hasstaked;
	mapping(address => bool) public isstaking;

	constructor(Dummy _dummyToken, Tether _tetherToken) public{
		dummy_token = _dummyToken;
		tether_token = _tetherToken;
		owner = msg.sender;
	}

	function stakeTokens(uint _amount) public{
		require(_amount > 0, "amount cannot be zero"); // Error handling for case when amount is 0
		
		tether_token.transferfrom(msg.sender, address(this), _amount); // Transferred tether to contract address

		stakingBalance[msg.sender] = stakingBalance[msg.sender] + _amount; // Update the staking balance

		if(!hasstaked[msg.sender]){
			stakers.push(msg.sender); // Update staking status
		}

		isstaking[msg.sender] = true;
		hasstaked[msg.sender] = true;
	}

	function unstakeTokens() public{
		uint balance = stakingBalance[msg.sender]; // fetch staking balance 

		require(balance > 0, "Staking balance is zero"); // error handling if staking balance is 0

		tether_token.transfer(msg.sender, balance); // transferred back tether to tgoken

		stakingBalance[msg.sender] = 0; // update the staking balance

		isstaking[msg.sender] = false; // update the staking status
	}

	function issuedummy() public{
		
		require(msg.sender == owner, "caller must be the owner for this function");

		for(uint i = 0; i < stakers.length; i++){
			address recipient = stakers[i];
			uint balance = stakingBalance[recipient];
			if(balance > 0){
				dummy_token.transfer(recipient, balance);
			}
		}
	}
}
