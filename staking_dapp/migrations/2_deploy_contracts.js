const Dummy_Token = artifacts.require("Dummy");
const Tether_Token = artifacts.require("Tether");
const Staking_Dapp = artifacts.require("Staking_Dapp");

module.exports = async function(deployer, network, accounts){

	// Deploy Tether Contract
	await deployer.deploy(Tether_Token)
	const tether_token = await Tether_Token.deployed()

	// Deploy Dummy Contract
	await deployer.deploy(Dummy_Token)
	const dummy_token = await Dummy_Token.deployed()
	
	// Deploy Staking Dapp Contract
	await deployer.deploy(Staking_Dapp, dummy_token.address, tether_token.address)
	const staking_dapp = await Staking_Dapp.deployed()

	// Transfer Dummy tokens to the staking dapp so it can reward stakers
	await dummy_token.transfer(staking_dapp.address, '1000000000000000000000000')

	// Transer Tether tokens to the 1st Ganache account
	await tether_token.transfer(accounts[1], '1000000000000000000000000')
}
