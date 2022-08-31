import React, { Component } from "react";
import { Form, Button, Message, Input } from "semantic-ui-react";
import Layout from "../../components/Layout";
import Factory from "../../ethereum/factory";
import web3 from "../../ethereum/web3";
import { Link, Router } from "../../routes";

class ProjectNew extends Component {
	state = {
		projectName: "",
		stockCounts: "",
		initalPricePerStocks: "",
		onwerName: "",
		description: "",
		loading: false,
		errorMessage: "",
	};

	onSubmit = async (event) => {
		event.preventDefault();

		const {
			projectName,
			stockCounts,
			initalPricePerStocks,
			onwerName,
			description,
		} = this.state;

		this.setState({ loading: true, errorMessage: "" });

		try {
			const accounts = await web3.eth.getAccounts();

			await Factory.methods
				.creatProject(
					projectName,
					stockCounts,
					initalPricePerStocks,
					onwerName,
					description
				)
				.send({ from: accounts[0] });
			//await project.methods.createRequest(description, web3.utils.toWei(value, 'ether'), recipient).send({from: accounts[0]});
			Router.pushRoute(`/`);
		} catch (err) {
			this.setState({ errorMessage: err.message });
		}

		this.setState({ loading: false });
	};

	render() {
		return (
			<Layout>
				<Link route={`/`}>
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
						ایجاد پروژه
					</h3>
					<Form
						onSubmit={this.onSubmit}
						error={!!this.state.errorMessage}
					>
						<Form.Field>
							<label style={{ fontFamily: "Vazir" }}>
								نام پروژه
							</label>
							<Input
								value={this.state.projectName}
								onChange={(event) =>
									this.setState({
										projectName: event.target.value,
									})
								}
							/>
						</Form.Field>
						<Form.Field>
							<label style={{ fontFamily: "Vazir" }}>
								تعداد سهام
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
						<Form.Field>
							<label style={{ fontFamily: "Vazir" }}>
								قیمت اولیه سهم
							</label>
							<Input
								value={this.state.initalPricePerStocks}
								onChange={(event) =>
									this.setState({
										initalPricePerStocks:
											event.target.value,
									})
								}
							/>
						</Form.Field>
						<Form.Field>
							<label style={{ fontFamily: "Vazir" }}>
								{" "}
								نام صاحب پروژه
							</label>
							<Input
								value={this.state.onwerName}
								onChange={(event) =>
									this.setState({
										onwerName: event.target.value,
									})
								}
							/>
						</Form.Field>
						<Form.Field>
							<label style={{ fontFamily: "Vazir" }}>
								توضیحات
							</label>
							<Input
								value={this.state.description}
								onChange={(event) =>
									this.setState({
										description: event.target.value,
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
							style={{ fontFamily: "Vazir" }}
							positive
							loading={this.state.loading}
						>
							! ایجاد پروژه
						</Button>
					</Form>
				</div>
			</Layout>
		);
	}
}

export default ProjectNew;
