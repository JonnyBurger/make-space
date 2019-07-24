/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const React = require('react');
const {Fragment} = React;
const CompLibrary = require('../../core/CompLibrary.js');
//const MarkdownBlock = CompLibrary.MarkdownBlock; /* Used to read markdown */
const Container = CompLibrary.Container;
const GridBlock = CompLibrary.GridBlock;
const siteConfig = require(process.cwd() + '/siteConfig.js');

function imgUrl(img) {
	return siteConfig.baseUrl + 'img/' + img;
}

function docUrl(doc, language) {
	return siteConfig.baseUrl + 'docs/' + (language ? language + '/' : '') + doc;
}

/*
function pageUrl(page, language) {
	return siteConfig.baseUrl + (language ? language + '/' : '') + page;
}
*/

class Button extends React.Component {
	render() {
		return (
			<div className="pluginWrapper buttonWrapper">
				<a className="button" href={this.props.href} target={this.props.target}>
					{this.props.children}
				</a>
			</div>
		);
	}
}

Button.defaultProps = {
	target: '_self'
};

const SplashContainer = props => (
	<div className="homeContainer">
		<div className="homeSplashFade">
			<div className="wrapper homeWrapper">{props.children}</div>
		</div>
	</div>
);

const Logo = props => (
	<div className="projectLogo">
		<img src={props.img_src} />
	</div>
);

const ProjectTitle = () => (
	<Fragment>
		<h2 className="projectTitle" style={{marginBottom: 0}}>
			{siteConfig.title}
			<small style={{marginBottom: 20}}>{siteConfig.tagline}</small>
		</h2>
		Try it out now. Simply type:{'   '}
		<code className="code-block">npx make-space</code>
		<div style={{marginBottom: 10}} />
	</Fragment>
);

const PromoSection = props => (
	<div className="section promoSection">
		<div className="promoRow">
			<div className="pluginRowBlock">{props.children}</div>
		</div>
	</div>
);

class HomeSplash extends React.Component {
	render() {
		let language = this.props.language || '';
		return (
			<SplashContainer>
				<Logo img_src={imgUrl('trashcan.png')} />
				<div className="inner">
					<ProjectTitle />
					<PromoSection>
						<Button href={docUrl('get-started.html', language)}>
							Get started
						</Button>
						<Button href={docUrl('strategies.html', language)}>
							Strategies
						</Button>
					</PromoSection>
				</div>
			</SplashContainer>
		);
	}
}

const Block = props => (
	<Container
		padding={['bottom', 'top']}
		id={props.id}
		background={props.background}
	>
		<GridBlock align="center" contents={props.children} layout={props.layout} />
	</Container>
);

const Features = () => (
	<Block layout="fourColumn">
		{[
			{
				content: 'Finds clutter on your Mac and sends it into the void.',
				image: imgUrl('trashcan.png'),
				imageAlign: 'top',
				title: 'Cleans like a black hole'
			},
			{
				content:
					'Less than 1 MB of space required - downloads and runs in just 5 seconds!',
				image: imgUrl('trashcan.png'),
				imageAlign: 'top',
				title: 'Launches like a rocket'
			}
		]}
	</Block>
);

/*
const FeatureCallout = () => (
	<div
		className="productShowcaseSection paddingBottom"
		style={{textAlign: 'center'}}
	>
		<h2>Feature Callout</h2>
		<MarkdownBlock>These are features of this project</MarkdownBlock>
	</div>
);

const LearnHow = () => (
	<Block background="light">
		{[
			{
				content: 'Talk about learning how to use this',
				image: imgUrl('trashcan.png'),
				imageAlign: 'right',
				title: 'Learn How'
			}
		]}
	</Block>
);

const TryOut = () => (
	<Block id="try">
	{[
			{
				content: 'Talk about trying this out',
				image: imgUrl('trashcan.png'),
				imageAlign: 'left',
				title: 'Try it Out'
			}
		]}
		</Block>
		);

		const Description = () => (
			<Block background="dark">
			{[
				{
					content: 'This is another description of how this project is useful',
					image: imgUrl('trashcan.png'),
					imageAlign: 'right',
					title: 'Description'
				}
			]}
			</Block>
			);

			const Showcase = props => {
				if ((siteConfig.users || []).length === 0) {
					return null;
				}
				const showcase = siteConfig.users
				.filter(user => {
					return user.pinned;
				})
				.map((user, i) => {
					return (
						<a href={user.infoLink} key={i}>
						<img src={user.image} alt={user.caption} title={user.caption} />
						</a>
						);
					});

					return (
		<div className="productShowcaseSection paddingBottom">
		<h2>{"Who's Using This?"}</h2>
		<p>This project is used by all these people</p>
		<div className="logos">{showcase}</div>
		<div className="more-users">
		<a className="button" href={pageUrl('users.html', props.language)}>
		More {siteConfig.title} Users
		</a>
		</div>
		</div>
		);
	};
*/

class Index extends React.Component {
	render() {
		let language = this.props.language || '';

		return (
			<div>
				<HomeSplash language={language} />
				<div className="mainContainer">
					<Features />
					{/*
					<FeatureCallout />
					<LearnHow />
					<TryOut />
					<Description />
					<Showcase language={language} />
					*/}
				</div>
			</div>
		);
	}
}

module.exports = Index;
