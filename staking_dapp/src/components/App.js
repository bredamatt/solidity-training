import logo from '../logo.svg';
import './App.css';
import Web3 from 'web3';

import Tether from '../build/Tether.json';
import Dummy from '..//build/Dummy.json';
import StakingDapp from '../build/Staking_Dapp.json';
import React, {Component} from 'react';

class CApp extends Component {
	async componentWillMount(){
		await this.loadWeb3()
		await this.loadBlockchainData()
	}

	async loadBlockchainData(){
		const web3 = window.web3

		const accounts = await web3.eth.getAccounts()
		this.setState({account : accounts[0]})

		const networkId = await web3.eth.net.getId()
		const TetherData = Tether.networks[networkId]
		if(TetherData){
			const tetherToken = new web3.eth.Contract(Tether.abi, TetherData.address)
			this.setState({tetherToken})
			let tethertokenbalance = await tetherToken.methods.balance(this.state.account).call()
			this.setState({tethertokenbalance : tethertokenbalance.toString()})
		}

		const DummyData = Dummy.networks[networkId]
		if(DummyData){
			const dummyToken = new web3.eth.Contract(Dummy.abi, DummyData.address)
			this.setState({dummyToken})
			let dummytokenbalance = await dummyToken.methods.balance(this.state.account).call()
			this.setState({dummytokenbalance : dummytokenbalance.toString()})
		}

		const StakingDappData = StakingDapp.networks[networkId]
		if(StakingDappData){
			const stakingdappToken = new web3.eth.Contract(StakingDapp.abi, StakingDappData.address)
			this.setState({stakingdappToken})
			let stakingdappbalance = await stakingdappToken.methods.stakingBalance(this.state.account).call()
			this.setState({stakingdappbalance : stakingdappbalance.toString()})
		}
	}

	async loadWeb3(){
		if (window.ethereum){
			window.web3 = new Web3(window.ethereum)
			await window.ethereum.enable()
		}
		else if (window.web3){
			window.web3 = new Web3(window.web3.currentProvider)
		}
		else{
			window.alert('Non-Ethereum browser detected. Consider switching to a browser which supports MetaMask.')
		}
	}

	stateTokens = (amount) =>{
		this.setState({loading: true})
		this.state.tetherToken.methods.approve(this.state.stakingdapp.address, amount).send({from: this.state.account}).on("transactionHash", (hash) => {
			this.state.stakingdapp.methods.stateTokens(amount).send({from: this.state.account}).on("transactionHash", (hash) => {
				this.setState({loading: false})
			})
		})
	}

	unstateTokens = (amount) =>{
		this.setState({loading: true})
		this.state.stakingdapp.methods.unstateTokens().send({from: this.state.account}).on("transactionHash", (hash) => {
			this.setState({loading: false})
		})
	}

	constructor(props){
		super(props)
		this.state = {
			account: '0x0',
			tetherToken: {},
			dummyToken: {},
			stakingdapp: {},
			tethertokenbalance: '0',
			loading : true
		}
	}
	
	render(){
		return App()
	}
}

function App(){
  let content
  if(this.state.loading){
	content = <p id='loader' className="text-center">Loading...</p>
  } else {
	content = <Main
	  tethertokenbalance = {this.state.tethertokenbalance}
	  dummytokenbalance  = {this.state.dummytokenbalance}
	  stakingdappbalance = {this.state.stakingdappbalance}
	  stakeTokens	     = {this.stakeTokens}
	  unstakeTokens      = {this.unstakeTokens}
	  />
  }
  return (
	  <div>
	  	<Navbar account={this.state.account} />
	  	<div className="container-fluid mt-5">
	  		<div className="row">
	  			<main role="main" className="col-lg-12 ml-autgo mr-auto" style={{ maxWidth: '600px'  }}>
	  				<div className="content mr-auto ml-auto">
	  					<a
	  						href="https://www.blockchain-council.org/"
	  						target="_blank"
	  						rel="noopener noreferrer"
	  					>
	  					</a>

	  					{content}

	  				</div>
	  			</main>
	  		</div>
	  	</div>
	  </div>
  );
}
// <div className="App">
//      <header className="App-header">
//        <img src={logo} className="App-logo" alt="logo" />
//        <p>
//          Edit <code>src/App.js</code> and save to reload.
//        </p>
//        <a
//          className="App-link"
//          href="https://reactjs.org"
//          target="_blank"
//          rel="noopener noreferrer"
//        >
//          Learn React
//        </a>
//      </header>
//    </div>
//  );
//}

export default CApp;
