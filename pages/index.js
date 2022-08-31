import React, { Component } from "react";
import { Card, Button } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import Layout from "../components/Layout";
import { Link } from "../routes";
// import Project from '../ethereum/project';

import classes from "./index.module.css";

import factory from "../ethereum/factory"; //-------------------Create factory

class ProjectIndex extends Component {
	static async getInitialProps() {
		//--------------------------------------------Create factory----------------------------------------------------------

		const projects = await factory.methods.getDeployedProjects().call();
		console.log(projects);

		return { projects };
	}

	renderProjects() {
		const items = this.props.projects.map((address) => {
			//const project = Project(address);
			//const summery = await project.methods.getSummery().call();
			return {
				header: address,
				description: (
					<Link route={`/projects/${address}`}>
						<a style={{ fontFamily: "Vazir" }}>
							مشاهده جزئیات پروژه
						</a>
					</Link>
				),
				fluid: true,
			};
		});

		return <Card.Group className="teal" items={items} />;
	}

	render() {
		return (
			<Layout>
				<div className={classes.div1}>
					<h3
						className={classes.title}
						style={{ fontFamily: "Vazir" }}
					>
						پــــــــروژه هـــــــا
					</h3>
					<Link route="/projects/new">
						<a>
							<Button
								style={{ fontFamily: "Vazir" }}
								floated="right"
								content="ایجاد پروژه جدید"
								icon="add circle"
								positive
							/>
						</a>
					</Link>
					{this.renderProjects()}
				</div>
			</Layout>
		);
	}
}

export default ProjectIndex;
