import React, { Component } from "react";
import Layout from "../../../components/Layout";
import { Button, Table } from "semantic-ui-react";
import { Link } from "../../../routes";
import Project from "../../../ethereum/project";
import RequestRow from "../../../components/RequestRow";

class RequestIndex extends Component {
	static async getInitialProps(props) {
		const { address } = props.query;

		const project = Project(address);

		const requestCounts = await project.methods
			.getSaleRequestsCount()
			.call();

		const requests = await Promise.all(
			Array(parseInt(requestCounts))
				.fill()
				.map((element, index) => {
					return project.methods.saleRequests(index).call();
				})
		);

		return { address, requests, requestCounts };
	}

	renderRows() {
		return this.props.requests.map((request, index) => {
			return (
				<RequestRow
					key={index}
					id={index}
					request={request}
					address={this.props.address}
				/>
			);
		});
	}

	render() {
		const { Header, Row, HeaderCell, Body } = Table;

		return (
			<Layout>
				<h3
					style={{
						fontFamily: "Vazir",
						textAlign: "center",
						color: "brown",
					}}
				>
					لیست درخواست ها
				</h3>
				<Link route={`/projects/${this.props.address}/requests/new`}>
					<a>
						<Button
							positive
							floated="right"
							style={{ marginBottom: 10, fontFamily: "Vazir" }}
						>
							اضافه کردن درخواست
						</Button>
					</a>
				</Link>

				<Table>
					<Header>
						<Row>
							<HeaderCell style={{ fontFamily: "Vazir" }}>
								ردیف
							</HeaderCell>
							<HeaderCell style={{ fontFamily: "Vazir" }}>
								فروشنده
							</HeaderCell>
							<HeaderCell style={{ fontFamily: "Vazir" }}>
								سهم موجود برای فروش
							</HeaderCell>
							<HeaderCell style={{ fontFamily: "Vazir" }}>
								تعداد سهم موردنیاز
							</HeaderCell>
							<HeaderCell style={{ fontFamily: "Vazir" }}>
								خرید
							</HeaderCell>
							<HeaderCell style={{ fontFamily: "Vazir" }}>
								لغو/فعال سازی درخواست
							</HeaderCell>
							<HeaderCell style={{ fontFamily: "Vazir" }}>
								بالاترین پیشنهاد
							</HeaderCell>
							<HeaderCell style={{ fontFamily: "Vazir" }}>
								ثبت پیشنهاد{" "}
							</HeaderCell>
						</Row>
					</Header>
					<Body>{this.renderRows()}</Body>
				</Table>
				<div style={{ fontFamily: "Vazir", textAlign: "right" }}>
					تعداد {this.props.requestCounts} درخواست یافت شد
				</div>
			</Layout>
		);
	}
}

export default RequestIndex;
