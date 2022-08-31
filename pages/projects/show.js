import Reacr, { Component } from "react";
import { Card, Grid, Button } from "semantic-ui-react";
import Layout from "../../components/Layout";
import Project from "../../ethereum/project";
// import web3 from '../../ethereum/web3';
// import ContributeForm from '../../components/ContributeForm';
import { Link } from "../../routes";

class ProjectShow extends Component {
	static async getInitialProps(props) {
		const project = Project(props.query.address);
		const summary = await project.methods.getSummery().call();

		return {
			address: props.query.address,
			// minimumContribution: summary[0],
			// balance: summary[1],
			// requestsCount: summary[2],
			// approversCount: summary[3],
			// manager: summary[4]

			projectName: summary[0],
			pricePerStock: summary[1],
			stockCount: summary[2],
			sharholdersCount: summary[3],
			manager: summary[4],
			description: summary[5],
			owner: summary[6],
			initalPricePerStock: summary[7],
		};
	}

	renderCards() {
		const {
			address,
			projectName,
			pricePerStock,
			stockCount,
			sharholdersCount,
			manager,
			description,
			owner,
			initalPricePerStock,
		} = this.props;

		const items = [
			{
				header: projectName,
				// meta: 'نام پروژه',

				description: "نام پروژه",
			},
			{
				header: owner,
				// meta: 'ایجاد کننده',

				description: "ایجاد کننده ",
			},

			{
				header: manager,
				// meta: 'آدرس مدیر',
				style: { overflowWrap: "break-word" },
				description: "آدرس مدیر",
			},
			{
				header: stockCount,
				// meta: 'تعداد سهام',
				description: "تعداد سهام",
			},
			{
				header: pricePerStock,
				// meta: 'ارزش هر سهم',
				description: "ارزش هر سهم",
			},
			{
				header: sharholdersCount,
				// meta: 'تعداد سهام داران',

				description: "تعداد سهام داران",
			},
			{
				header: description,
				// meta: 'توضیحات',
				style: { overflowWrap: "break-word", fontFamily: "Vazir" },
				description: "توضیحات",
			},
			{
				header: initalPricePerStock,
				// meta: 'قیمت اولیه هر سهم',
				description: "قیمت اولیه هر سهم",
			},
			// {
			// header: web3.utils.fromWei(balance, 'ether'),
			// meta: 'Campaign Balanc (ether)',
			// description: 'this camoaian has this much mony to spand'
			// }
		];

		return (
			<Card.Group
				className="teal"
				style={{ fontFamily: "Vazir" }}
				items={items}
			/>
		);
	}

	render() {
		return (
			<Layout>
				<h3
					style={{
						fontFamily: "Vazir",
						color: "brown",
						textAlign: "center",
					}}
				>
					جزئیات پروژه
				</h3>
				<Grid>
					<Grid.Row>
						<Grid.Column width={10}>
							{this.renderCards()}
						</Grid.Column>
						<Grid.Column width={6}>
							<Link
								route={`/projects/${this.props.address}/requests/new`}
							>
								<a>
									<Button
										style={{ fontFamily: "Vazir" }}
										positive
									>
										ایجاد درخواست فروش
									</Button>
								</a>
							</Link>
						</Grid.Column>
					</Grid.Row>
					<Grid.Row>
						<Grid.Column>
							<Link
								route={`/projects/${this.props.address}/requests`}
							>
								<a>
									<Button
										style={{
											fontFamily: "Vazir",
											textAlign: "right",
										}}
										positive
									>
										{" "}
										مشاهده درخواست ها
									</Button>
								</a>
							</Link>
						</Grid.Column>
					</Grid.Row>
				</Grid>
			</Layout>
		);
	}
}

export default ProjectShow;
