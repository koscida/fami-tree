import routes from "./nav.js";

function Home() {
	return (
		<>
			<ul>
				{routes.map((r) => (
					<li>
						<a href={r.path}>{r.name}</a>
					</li>
				))}
			</ul>
		</>
	);
}

export default Home;
