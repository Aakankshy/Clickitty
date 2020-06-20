'use strict';

class Test extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isCorrectSoFar: true,
			matchedSubstring: "",
			startTime: null,
			typingSpeed: null,
			userInput: ""
		};
		this.handleInput = this.handleInput.bind(this);
	}

	handleInput(event) {
		const inputIsCorrect = this.props.text.startsWith(event.target.value);
		const inputText = event.target.value.replace(/^\n+|\n+$/g, '');
		const beginningTime = inputText === ""
			? null
			: (this.state.startTime || new Date());

		this.setState({
			isCorrectSoFar: inputIsCorrect,
			startTime: beginningTime,
			userInput: inputText,
			typingSpeed: null
		});

		let newMatchedSubstring = event.target.value;
		if (!inputIsCorrect) {
			newMatchedSubstring = "";
			for (var i = 0; i < event.target.value.length; i++) {
  			if (event.target.value[i] === this.props.text[i]) {
					newMatchedSubstring += event.target.value[i];
				} else {
					break;
				}
			}
			this.setState({
				matchedSubstring: newMatchedSubstring
			});
		} else {
			if (event.target.value === this.props.text) {
				let timeTaken = (new Date()) - this.state.startTime
				let result = (this.props.text.length/(timeTaken/1000/60))/5;

				this.setState({
					isCorrectSoFar: true,
					matchedSubstring: "",
					startTime: null,
					typingSpeed: result,
					userInput: ""
				}, this.props.emitCompletion);
			}
		}
	}

	render() {
		return (
			<div className="test-container">
				<div className="text-container">{this.props.text}</div>
				<textarea className={"userinput-container" + (this.state.isCorrectSoFar ? "" : " invalid-input")} value={this.state.userInput} type="text" autoFocus onChange={this.handleInput}/>
				<div className={"wpm-container" + (!this.state.startTime ? "" : " currently-typing")}>
					{(this.state.typingSpeed)
						? this.state.typingSpeed.toFixed(2) + " WPM"
						: this.state.startTime ? "..." : ""}
				</div>
			</div>
		);
	}
}

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			currentQuote: ""
		}
		this.setCurrentQuote = this.setCurrentQuote.bind(this);
	}

	setCurrentQuote() {
		this.setState({
			currentQuote: corpus[Math.floor(Math.random()*(corpus.length))]
		});
	}

	componentDidMount() {
		this.setCurrentQuote();
	}

	render() {
		return (
			<div className="app">
				<Test
					text={this.state.currentQuote}
					emitCompletion={this.setCurrentQuote}
				/>
			<img className="icon-container" src="./icon.png"/>
			</div>
		);
	}
}

ReactDOM.render(
	<React.StrictMode>
		<App/>
	</React.StrictMode>,
	document.querySelector('#root')
);
