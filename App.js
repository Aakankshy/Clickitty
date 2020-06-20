'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Test = function (_React$Component) {
	_inherits(Test, _React$Component);

	function Test(props) {
		_classCallCheck(this, Test);

		var _this = _possibleConstructorReturn(this, (Test.__proto__ || Object.getPrototypeOf(Test)).call(this, props));

		_this.state = {
			isCorrectSoFar: true,
			matchedSubstring: "",
			startTime: null,
			typingSpeed: null,
			userInput: ""
		};
		_this.handleInput = _this.handleInput.bind(_this);
		return _this;
	}

	_createClass(Test, [{
		key: "handleInput",
		value: function handleInput(event) {
			var inputIsCorrect = this.props.text.startsWith(event.target.value);
			var inputText = event.target.value.replace(/^\n+|\n+$/g, '');
			var beginningTime = inputText === "" ? null : this.state.startTime || new Date();

			this.setState({
				isCorrectSoFar: inputIsCorrect,
				startTime: beginningTime,
				userInput: inputText,
				typingSpeed: null
			});

			var newMatchedSubstring = event.target.value;
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
					var timeTaken = new Date() - this.state.startTime;
					var result = this.props.text.length / (timeTaken / 1000 / 60) / 5;

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
	}, {
		key: "render",
		value: function render() {
			return React.createElement(
				"div",
				{ className: "test-container" },
				React.createElement(
					"div",
					{ className: "text-container" },
					this.props.text
				),
				React.createElement("textarea", { className: "userinput-container" + (this.state.isCorrectSoFar ? "" : " invalid-input"), value: this.state.userInput, type: "text", autoFocus: true, onChange: this.handleInput }),
				React.createElement(
					"div",
					{ className: "wpm-container" + (!this.state.startTime ? "" : " currently-typing") },
					this.state.typingSpeed ? this.state.typingSpeed.toFixed(2) + " WPM" : this.state.startTime ? "..." : ""
				)
			);
		}
	}]);

	return Test;
}(React.Component);

var App = function (_React$Component2) {
	_inherits(App, _React$Component2);

	function App(props) {
		_classCallCheck(this, App);

		var _this2 = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

		_this2.state = {
			currentQuote: ""
		};
		_this2.setCurrentQuote = _this2.setCurrentQuote.bind(_this2);
		return _this2;
	}

	_createClass(App, [{
		key: "setCurrentQuote",
		value: function setCurrentQuote() {
			this.setState({
				currentQuote: corpus[Math.floor(Math.random() * corpus.length)]
			});
		}
	}, {
		key: "componentDidMount",
		value: function componentDidMount() {
			this.setCurrentQuote();
		}
	}, {
		key: "render",
		value: function render() {
			return React.createElement(
				"div",
				{ className: "app" },
				React.createElement(Test, {
					text: this.state.currentQuote,
					emitCompletion: this.setCurrentQuote
				}),
				React.createElement("img", { className: "icon-container", src: "./icon.png" })
			);
		}
	}]);

	return App;
}(React.Component);

ReactDOM.render(React.createElement(
	React.StrictMode,
	null,
	React.createElement(App, null)
), document.querySelector('#root'));