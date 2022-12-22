import {Link} from 'react-router-dom'

function Button(props) {

    if (props.href) {
        return (
            <a 
                className={`button button--${props.size || 'default'} ${props.inverse && 'button-inverse'} ${props.danger && 'button-danger'}`}
                href={props.href}>
                    {props.children}
            </a>
        )
        // for use with href
    }

    if (props.to) {
        return (
            <Link
                to={props.to}
                exact={props.exact}
                className={`button button--${props.size || 'default'} ${props.inverse && 'button-inverse'} ${props.danger && 'button-danger'}`}>
                    {props.children}
                </Link>
        )
        // possibly for an edit link for user to make changes to their profile, etc.
    }

    return (
        <button
        className={`button button--${props.size || 'default'} ${props.inverse && 'button-inverse'} ${props.danger && 'button-danger'}`}
        type={props.type}
        onClick={props.onClick}
        disabled={props.disabled}>
            {props.children}
        </button>
        // for adding products to cart, etc.
    )
}

export default Button