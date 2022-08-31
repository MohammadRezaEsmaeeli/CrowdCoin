import React, { Component } from "react";
import { Table, Button, Input, Message } from "semantic-ui-react";
import web3 from "../ethereum/web3";
import Project from "../ethereum/project";

class RequestRow extends Component {
	// static async getInitialProps(props) {
	// 	console.log("this runs");
	// 	const { address } = props.query;
	// 	const accounts = await web3.eth.getAccounts();
	// 	this.setState({ accounts: accounts, owner: accounts[0] });

	// 	return { props: { address: address, accounts: accounts } };
	// }

	componentDidUpdate(preProps, pervState) {
		if (pervState.hiestBid !== this.state.hiestBid) {
			fetch("/api/bid", {
				method: "GET",

				headers: {
					"Content-Type": "application/json",
				},
			})
				.then((response) => response.json())
				.then((data) => this.setState({ hiestBid: data.bid }));
		}
	}

	async componentDidMount() {
		console.log("this did  run");
		// const { address } = props.query;
		const accounts = await web3.eth.getAccounts();
		this.setState({ accounts: accounts, owner: accounts[0] });
	}

	state = {
		stockAmount: "",
		owner: "",
		accounts: [],
		errorMessage: "",
		bid: "",
		hiestBid: "",
	};

	onBuy = async () => {
		const project = Project(this.props.address);
		const { id, request } = this.props;

		try {
			const accounts = await web3.eth.getAccounts();
			this.setState({ owner: accounts[0] });
			const stockPrice = await project.methods.pricePerStock().call();
			const val = this.state.stockAmount * stockPrice;

			console.log(" buyer" + accounts[0]);
			console.log("stock " + this.state.stockAmount);
			console.log(id);
			console.log(stockPrice);
			console.log("seller" + request.seller);

			await project.methods
				.buy(request.seller, this.state.stockAmount, id)
				.send({
					from: accounts[0],
					value: val,
				});
		} catch (err) {
			this.setState({ errorMessage: err.message });
		}
	};

	onCancle = async () => {
		const project = Project(this.props.address);

		try {
			const accounts = await web3.eth.getAccounts();
			this.setState({ owner: accounts[0] });

			await project.methods.cancelSaleRequest(this.props.id).send({
				from: accounts[0],
			});
		} catch (err) {
			this.setState({ errorMessage: err.message });
		}
	};
	onActive = async () => {
		const project = Project(this.props.address);

		try {
			const accounts = await web3.eth.getAccounts();
			this.setState({ owner: accounts[0] });

			await project.methods.activeSaleRequest(this.props.id).send({
				from: accounts[0],
			});
		} catch (err) {
			this.setState({ errorMessage: err.message });
		}
	};

	onBid = async () => {
		try {
			const accounts = await web3.eth.getAccounts();
			const reqBody = {
				bid: this.state.bid,
				bider: accounts[0],
				requestID: this.props.id,
				projectAddress: this.props.address,
			};
			fetch("/api/bid", {
				method: "POST",
				body: JSON.stringify(reqBody),
				headers: {
					"Content-Type": "application/json",
				},
			})
				.then((response) => response.json())
				.then((data) => console.log(data));
		} catch (err) {
			this.setState({ errorMessage: err.message });
		}
	};

	render() {
		const { Row, Cell } = Table;
		const { id, request } = this.props;
		console.log("seller " + request.seller);
		// console.log("owner " + this.props.accounts[0]);

		// const accounts = await web3.eth.getAccounts();

		console.log(this.state.accounts[0]);
		// fetch("/api/bid", {
		// 	method: "GET",

		// 	headers: {
		// 		"Content-Type": "application/json",
		// 	},
		// })
		// 	.then((response) => response.json())
		// 	.then((data) => this.setState({ hiestBid: data.bid }));

		const isOwner = request.seller + "" === this.state.accounts[0] + "";
		console.log(request.stockCount + "  " + request.completed || !isOwner);
		const disabale = request.completed || !isOwner;

		console.log(request.stockCount + "  " + disabale);

		return (
			<Row
				disabled={request.completed}
				positive={!request.completed && !request.canceled}
			>
				<Cell>{id}</Cell>
				<Cell>{request.seller}</Cell>
				<Cell>{request.stockCount}</Cell>
				<Cell>
					<Input
						type="text"
						value={this.state.bid}
						onChange={(event) =>
							this.setState({ bid: event.target.value })
						}
					/>
				</Cell>
				{request.completed ||
				this.state.stockAmount - request.stockCount > 0 ? (
					<Cell>
						<Button
							color="green"
							disabled={disabale}
							basic
							onClick={this.onBuy}
						>
							فروش
						</Button>
					</Cell>
				) : (
					<Cell>
						<Button
							style={{ fontFamily: "Vazir" }}
							color="green"
							basic
							onClick={this.onBuy}
							disabled={disabale}
						>
							فروش
						</Button>
					</Cell>
				)}
				{(request.completed || request.seller !== this.state.owner) &&
				request.canceled ? (
					<Cell>
						{" "}
						<Button
							style={{ fontFamily: "Vazir" }}
							color="teal"
							basic
							onClick={this.onActive}
							disabled={disabale}
						>
							{" "}
							فعال سازی درخواست
						</Button>
					</Cell>
				) : (
					<Cell>
						{" "}
						<Button
							style={{ fontFamily: "Vazir" }}
							color="teal"
							basic
							onClick={this.onCancle}
							disabled={disabale}
						>
							{" "}
							لغو درخواست{" "}
						</Button>
					</Cell>
				)}
				<Cell>{this.state.hiestBid || "5"}</Cell>
				<Cell>
					{" "}
					<Button
						style={{ fontFamily: "Vazir" }}
						color="teal"
						basic
						onClick={this.onBid}
						disabled={request.completed}
					>
						{" "}
						ثبت پیشنهاد{" "}
					</Button>
				</Cell>
				{/* <Message error header='Oops!!' content={this.state.errorMessage} /> */}
				{/* {  request.seller != accounts[0] && !request.canceled ? null: ( 
                <Cell> <Button color='teal' basic onClick={this.onActive}> Active </Button></Cell>
                 )} */}
			</Row>
		);
	}
}
export default RequestRow;
