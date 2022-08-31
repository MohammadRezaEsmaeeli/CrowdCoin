import React from "react";
import Image from "next/image";
import Header from "./Header";
import { Container } from "semantic-ui-react";
// import 'semantic-ui-css/semantic.min.css';
import Head from "next/head";
import classes from "./layout.module.css";

export default (props) => {
	return (
		<div style={{ backgroundColor: "#f2f2f2" }}>
			<Container>
				<Head>
					<link
						async
						rel="stylesheet"
						href="https://cdn.jsdelivr.net/npm/semantic-ui@2/dist/semantic.min.css"
					/>
				</Head>
				<Header />

				{props.children}

				{/* <footer>
                <div>
                <button class="ui facebook circular icon button"><i aria-hidden="true" class="facebook icon"></i></button><button class="ui twitter circular icon button"><i aria-hidden="true" class="twitter icon"></i></button><button class="ui linkedin circular icon button"><i aria-hidden="true" class="linkedin icon"></i></button><button class="ui google plus circular icon button"><i aria-hidden="true" class="google plus icon"></i></button>
                </div>
            </footer> */}
			</Container>
		</div>
	);
};

// export default layout;
