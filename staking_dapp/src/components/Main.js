import Reac, { Component } from 'react'
import Tether_logo from '../Tether_logo.png'

class Main extends Component {
	render() {
		return (
			<div id="content" className="mt-3">

				<table className="table table-borderless text-muted text-center">
					<thead>
						<tr>
							<th scope="col">Staking Balance</th>
							<th scope="col">Reward Balance</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>{window.web3.utils.fromWei(this.props.stakingdappbalance, 'Ether')} mTether</td>
							<td>{window.web3.utils.fromWei(this.props.dummytokenbalance, 'Ether')} Dummy token</td>
						</tr>
					</tbody>
				</table>

				<div className="card mb-4" >
					<div className="card-body">
						
						<form className="mb-3" onSubmit={(event) => {
							event.preventDefault()
							let amount
							amount = this.input.value.toString()
							amouint = window.web3.utils.toWeio(amount, 'Ether')
							this.props.stakeTokens(amount)
						}}>
						<div>
							<label className="float-left"><b>Stake Tokens</b></label>
							<span className="float-right text-muted">
							Balance: {window.web3.utils.fromWei( this.props.tethertokenbalance, 'Ether')
							</span>
						</div>
						<div className="input-group mb-4">
							<input
								type="text"
								ref={(input) => { this.input = input })
								className="form-control folrm-control-lg"
								placeholder="0"
								required />
							<div className="input-group-append">
								<div className="input-group-text">
									<img src={Tether_logo} height='32' alt=""/>
									&nbsp;&nbsp;&nbsp; mTether
								</div>
							</div>
						</div>
						<button type="submit" className="btn btn-primary btn-block btn-lg">STAKE!</button>
					</form>
					<button
						type="submit"
						className="btn btn-link btn-block btn-sm"
						onClick={(event) => {
							event.preventDefault()
							this.props.unstakeTokens()
						}}>
							UN-STAKE...
						</button>
					</div>
				</div>
			</div>
		);
	}
}

export default Main;
