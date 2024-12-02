const ReportTemplate = () => {
	const styles = {
		page: {
			marginLeft: '0em',
			marginRight: '0rem',
			'page-break-after': 'always',
		},
		columnLayout: {
			display: 'flex',
			justifyContent: 'space-between',
			margin: '3rem 0 5rem 0',
			gap: '2rem',
		},
		column: {
			display: 'flex',
			flexDirection: 'column',
		},
		spacer2: {
			height: '2rem',
		},
		fullWidth: {
			width: '100%',
		},
		marginb0: {
			marginBottom: 0,
		},
	};
	return (
		<>
			<div style={styles.page}>
				<div>
					<h1 style={styles.introText}>
						Report Heading That Spans More Than Just One Line
					</h1>
				</div>
			</div>
			<div style={styles.page}>
				<div>
					<h2 style={styles.introText}>
						Report Heading That Spans More Than Just One Line
					</h2>
				</div>
			</div>
		</>
	);
};

export default ReportTemplate;