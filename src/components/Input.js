import React from 'react';
import styles from './styles/RegisterPage.module.css';

export default class Input extends React.Component {
    componentDidUpdate(prevProps) {
        // meta comes from the redux form that wraps Registration Form
        if (!prevProps.meta.active && this.props.meta.active) {
            this.input.focus();
        }
    }
    render() {
        // whatever prop is passed in determines the html tag
        // or it will be an input tag
        const Element = this.props.element || 'input';

        // defines error for use later
        // if the tag is touches and there is an error
        // this is it
        let error;
        let warning;
        if (this.props.meta.touched && this.props.meta.error) {
            error = <div className={styles.error}>{this.props.meta.error}</div>;
            return <div>
                <label htmlFor={this.props.input.name}>
                    {this.props.label}
                    {error}
                    {warning}
                </label>
                <Element
                    {...this.props.input}
                    id={this.props.input.name}
                    type={this.props.type}
                    ref={input => (this.input = input)}
                    placeholder={this.props.placeholder}
                    className={styles.inputs}
                    style={{ border: '1px solid red'}}
                >
                    {this.props.children}
                </Element>
            </div>;
        }

        // same thing here for warning
        if (this.props.meta.touched && this.props.meta.warning) {
            warning = <div>{this.props.meta.warning}</div>;
        }

        return (
            <div>
                <label htmlFor={this.props.input.name}>
                    {this.props.label}
                    {error}
                    {warning}
                </label>
                <Element
                    {...this.props.input}
                    id={this.props.input.name}
                    type={this.props.type}
                    ref={input => (this.input = input)}
                    placeholder={this.props.placeholder}
                    className={styles.inputs}
                >
                    {this.props.children}
                </Element>
            </div>
        );
    }
}
