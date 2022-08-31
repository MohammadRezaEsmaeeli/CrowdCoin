import React, { Component } from "react";
import { Form, Button, Message, Input } from "semantic-ui-react";
import Layout from "../../../components/Layout";
import Project from "../../../ethereum/project";
import web3 from "../../../ethereum/web3";
import { Link, Router } from "../../../routes";

class RequestNew extends Component {
	state = {
		stockCounts: "",
		loading: false,
		errorMessage: "",
	};

	static async getInitialProps(props) {
		const { address } = props.query;

		return { address };
	}

	onSubmit = async (event) => {
		event.preventDefault();

		const { stockCounts } = this.state;

		this.setState({ loading: true, errorMessage: "" });

		const project = Project(this.props.address);
		try {
			const accounts = await web3.eth.getAccounts();

			await project.methods
				.createSaleRequest(stockCounts)
				.send({ from: accounts[0] });
			//await project.methods.createRequest(description, web3.utils.toWei(value, 'ether'), recipient).send({from: accounts[0]});
			Router.pushRoute(`/projects/${this.props.address}/requests`);
		} catch (err) {
			this.setState({ errorMessage: err.message });
		}

		this.setState({ loading: false });
	};

	render() {
		return (
			<Layout>
				<Link route={`/projects/${this.props.adderss}/requests`}>
					<a style={{ fontFamily: "Vazir" }}>(-- بازگشت</a>
				</Link>
				<div style={{ textAlign: "right" }}>
					<h3
						style={{
							fontFamily: "Vazir",
							color: "brown",
							textAlign: "center",
						}}
					>
						ایجاد درخواست فروش
					</h3>
					<Form
						onSubmit={this.onSubmit}
						error={!!this.state.errorMessage}
					>
						<Form.Field>
							<label style={{ fontFamily: "Vazir" }}>
								تعداد سهام موردنظر برای فروش
							</label>
							<Input
								value={this.state.stockCounts}
								onChange={(event) =>
									this.setState({
										stockCounts: event.target.value,
									})
								}
							/>
						</Form.Field>

						<Message
							error
							header="Oops!!"
							content={this.state.errorMessage}
						/>
						<Button
							positive
							loading={this.state.loading}
							style={{ fontFamily: "Vazir", textAlign: "center" }}
						>
							{" "}
							! ایجاد{" "}
						</Button>
					</Form>
				</div>
			</Layout>
		);
	}
}

export default RequestNew;
