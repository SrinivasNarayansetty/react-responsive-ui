import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

// http://wd.dizaina.net/en/experiments/ios7-style-switch/

// An iOS-style switch
export default class Switch extends PureComponent
{
	state = {}

	static propTypes =
	{
		// HTML form input `name` attribute
		name      : PropTypes.string,

		// Disables the switch
		disabled  : PropTypes.bool,

		// Either `true` or `false`
		value     : PropTypes.bool.isRequired,

		// Is called when the switch is switched
		onChange  : PropTypes.func.isRequired,

		// (exotic use case)
		// Falls back to a plain HTML input
		// when javascript is disabled (e.g. Tor)
		fallback  : PropTypes.bool.isRequired,

		// A label
		children  : PropTypes.node,

		// CSS style object
		style     : PropTypes.object,

		// CSS class
		className : PropTypes.string
	}

	static defaultProps =
	{
		value    : false,
		fallback : false
	}

	constructor()
	{
		super()

		this.toggle = this.toggle.bind(this)
	}

	// Client side rendering, javascript is enabled
	componentDidMount()
	{
		const { fallback } = this.props

		if (fallback)
		{
			this.setState({ javascript: true })
		}
	}

	render()
	{
		const
		{
			value,
			fallback,
			disabled,
			indicateInvalid,
			error,
			style,
			className,
			children
		}
		= this.props

		const markup =
		(
			<label
				className={ classNames('rrui__switch',
				{
					'rrui__rich'             : fallback,
					'rrui__input'            : children,
					'rrui__switch--label'    : children,
					'rrui__switch--disabled' : disabled
				},
				className) }
				style={ style }>

				{ children }

				<div
					className={ classNames('rrui__switch__switch',
					{
						// CSS selector performance optimization
						'rrui__switch__switch--label' : children
					}) }>

					<input
						type="checkbox"
						value={ value }
						onChange={ this.toggle }
						style={ input_style }/>

					<div
						className={ classNames('rrui__switch__groove',
						{
							// CSS selector performance optimization
							'rrui__switch__groove--on' : value
						}) }/>

					<div
						className={ classNames('rrui__switch__knob',
						{
							// CSS selector performance optimization
							'rrui__switch__knob--on' : value
						}) }/>
				</div>
			</label>
		)

		return markup
	}

	// supports disabled javascript
	render_static()
	{
		const { name, disabled, value } = this.props

		const markup =
		(
			<div className="rrui__rich__fallback">
				<input
					type="checkbox"
					name={ name }
					disabled={ disabled }
					value={ value }/>
			</div>
		)

		return markup
	}

	toggle(event)
	{
		const { onChange, disabled, value } = this.props

		if (disabled)
		{
			return
		}

		onChange(!value)
	}
}

const input_style =
{
	position : 'absolute',
	opacity  : 0
}