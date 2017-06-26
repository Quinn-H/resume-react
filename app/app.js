import React from "react";
import ReactDOM from "react-dom";
import StyleEditor from "./StyleEditor.js";
import ResumeEditor from "./ResumeEditor.js";
import "./style/reset.css";
import Prism from "prismjs";

class ReactClass extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			style: "",
		};
		this.interval = 50;
		this.resumeEditorContent = `
# Quinn Hu


## Skills

* Frond-End Development
* Node.js
* Database

## Experience

#### Enspiral Dev Academy：Web Develpoer - Trainee

#### The University of Arizona ITSD：Web developer - Trainee

#### Freelance IT Technician

## Project

### [Goflat](http://www.goflat.co.nz/)

* A flat management app build with React

### [CodePunch](https://morning-sea-23201.herokuapp.com/)

* A realtime coding collaboration app build with Socket.io

### [Mydog game](https://radiant-earth-57007.herokuapp.com/)

* A virtual pet Game build with JavaScript

### [Blog](https://www.quinnhu.me)

* My blog build with React

## Education

1. **Auckland University of Technology**

	* Graduate Diploma in Computer and Information Science

2. **University of Arizona**

	* Bachelor of General Studies in Industry and Economics

## Volunteer

Charity-IT, Wellington, NZ
ImpactNpo, Auckland, NZ

## Link

**GitHub: **https://github.com/Quinn-H
**Linkedin: **https://www.linkedin.com/in/quinnhu/

> Thank you for watching！`;
		
		this.styleEditorContent = [`/*
* Inspired by http://strml.net/,
* 
* Hello, I'm Quinn
* 
* I will typing my resume here
* Hope you enjoy :)
*/

/* Let's do it！First, add transition to all elements */
* {
  -webkit-transition: all 1s;
  transition: all 1s;
}
/* Let's add background color */
html {
  color: rgb(222,222,222); background: #425261; 
}
/* oh, It need some decoration */
.styleEditor {
  position: fixed; left: 0; top: 0;
  background-color: #303030;
  padding: .5em;
  border: 1px solid;
  margin: .5em;
  overflow: auto;
  width: 45vw; height: 90vh;
}
/* Let's make it colorful */
.token.comment{ color: #857F6B; font-style: italic; }
.token.selector{ color: #E86E75; }
.token.property{ color: #F78C6C; }
.token.punctuation{ color: #88DCFE; }
.token.function{ color: #82AAFF; }

/* Make it even cooler */
html{
  -webkit-perspective: 1000px;
          perspective: 1000px;
}
.styleEditor {
  position: fixed; left: 0; top: 0; 
  -webkit-transition: none; 
  transition: none;
  -webkit-transform: rotateY(10deg) translateZ(-100px) ;
          transform: rotateY(10deg) translateZ(-100px) ;
}

/* Next, I need make a editor to write my resume */
.resumeEditor{
  position: fixed; right: 0; top: 0;
  padding: .5em;  margin: .5em;
  width: 48vw; height: 90vh; 
  border: 1px solid;
  background: white; color: #222;
  overflow: auto;
}

/* Ok, I will start typing my resume  */
`,
`
/* Let's transfer Markdown to HTML!
 *           3          
 *           2          
 *           1          
 *          Voilà！
 */
`,
`
/* Add some decoration to my resume */
.resumeEditor{
  padding: 2em;
}
.resumeEditor h1{
  display: block;
  width: 80px;
  margin: 0 auto;
}
.resumeEditor h2{
  display: inline-block;
  border-bottom: 1px solid;
  margin: 1em 0 .5em;
}
.resumeEditor h3{
	display: inline-block;
	margin: 0.5em 0;
}
.resumeEditor a{
	color: #000;
}
.resumeEditor ul{
	list-style: none;
}
.resumeEditor ul>li::before {
	content: "•";
	margin-left: 0.5em;
	margin-right: 0.5em;
}
.resumeEditor blockquote {
  margin: 1em;
  padding: .5em;
  background: #ddd;
}
/*
* I hope you enjoyed this.
* Please contact me if you have any question
*/
`];
	}

	addToStyle(char) {
		this.setState({
			style: this.state.style + char,
		});
	}

	replaceStyle(style) {
		this.setState({
			style: style,
		});
	}

	replaceStyleEditorContent() {
		
	}

	showStyleEditorContent(n) {
		let lastContentLength = 0;
		if (n !== 0) {lastContentLength = this.state.style.length;}
		let style = this.styleEditorContent[n];
		let len = style.length;
		return new Promise((resolve, reject) => {
			let showStyle = function () {
				let currentLen = this.state.style.length - lastContentLength;
				if (currentLen < len) {
					let char = style.substring(currentLen, currentLen+1);
					this.refs.StyleEditor.addToContent(char);
					this.addToStyle(char);
					setTimeout(showStyle, this.interval);
				} else {
					resolve();
				}
			}.bind(this);
			showStyle();
		});
	}

	showResumeContent() {
		let content = this.resumeEditorContent;
		let len = content.length;
		return new Promise((resolve, reject) => {
			let showContent = function() {
				let currentLen = this.refs.ResumeEditor.getCurrentContentLength();
				if (currentLen < len) {
					let char = content.substring(currentLen, currentLen+1);
					this.refs.ResumeEditor.addToContent(char);
					setTimeout(showContent, this.interval);
				} else {
					resolve();
				}
			}.bind(this);
			showContent();
		});
	}

	setResumeMarkdown() {
		return new Promise((resolve, reject) => {
			setTimeout(this.refs.ResumeEditor.setIsMarkdown(true), this.interval);
			resolve();
		}); 
	}

	async startShow() {
		await this.showStyleEditorContent(0).then(function() {console.log('done! show Content 0')});
		await this.showResumeContent();
		await this.showStyleEditorContent(1).then(function() {console.log('done! show Content 1')});
		await this.setResumeMarkdown();
		await this.showStyleEditorContent(2).then(function() {console.log('done! show Content 2')});
	}

	componentDidMount() {
		this.startShow();
		console.log(111);
		// this.refs.StyleEditor.replaceContent(this.content[0]);
		// this.replaceStyle(this.content[0]); 
		// this.refs.ResumeEditor.replaceContent("");
	}

	render() {
		return (
			<div>
				<StyleEditor ref="StyleEditor" />
				<ResumeEditor ref="ResumeEditor" />
				<style>{this.state.style}</style>
			</div>);
	}
}
ReactDOM.render(<ReactClass />, document.getElementById("content"));